/**
 * Database connection.
 *
 * Neon over its serverless HTTP driver, which suits Vercel's request-scoped
 * functions: no connection pool to exhaust, no socket to keep warm. Falls back
 * to a plain TCP driver for any other Postgres (local development, or a future
 * move off Neon), so the connection layer is not a lock-in point.
 *
 * When DATABASE_URL is absent, `db` is null and the repository layer switches
 * to an in-memory store. See lib/db/repo.ts.
 */

import { drizzle as drizzleHttp } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/postgres-js";
import { neon } from "@neondatabase/serverless";
import postgres from "postgres";

import { env } from "../env";
import * as schema from "./schema";

type Database =
  | ReturnType<typeof drizzleHttp<typeof schema>>
  | ReturnType<typeof drizzlePg<typeof schema>>;

function create(): Database | null {
  const url = env.databaseUrl;
  if (!url) return null;

  if (/neon\.tech|neon\.build/.test(url)) {
    return drizzleHttp(neon(url), { schema });
  }
  return drizzlePg(postgres(url, { max: 1, prepare: false }), { schema });
}

let cached: Database | null | undefined;

export function getDb(): Database | null {
  if (cached === undefined) cached = create();
  return cached;
}

export const hasDatabase = Boolean(env.databaseUrl);
export { schema };
