/**
 * Database connection.
 *
 * Two drivers, chosen from the connection string:
 *
 *  · **Neon** hosts get its serverless HTTP driver — no pool to exhaust and no
 *    socket to keep warm, which is what request-scoped serverless functions
 *    need.
 *  · **Anything else** (Railway Postgres, local, a future move) gets a normal
 *    TCP pool. On a persistent Node server a real pool is strictly better: the
 *    connection is reused across requests instead of paying setup per query.
 *
 * The pool size follows from that. A serverless function should hold one
 * connection because there may be hundreds of instances; a single long-running
 * container should hold several because there is only one of it. Getting this
 * backwards is a silent performance bug rather than an error, so it is derived
 * rather than hard-coded.
 *
 * When DATABASE_URL is absent, `getDb()` returns null and the repository layer
 * switches to an in-memory store. See lib/db/repo.ts.
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

/**
 * True when we are running as one persistent process rather than as
 * per-request serverless instances. Railway, Render, Fly, and `next start`
 * locally all set a PORT and are long-lived; Vercel's functions are not.
 */
function isPersistentServer(): boolean {
  if (process.env.VERCEL) return false;
  return Boolean(process.env.RAILWAY_ENVIRONMENT || process.env.PORT);
}

function create(): Database | null {
  const url = env.databaseUrl;
  if (!url) return null;

  if (/neon\.tech|neon\.build/.test(url)) {
    return drizzleHttp(neon(url), { schema });
  }

  return drizzlePg(
    postgres(url, {
      max: isPersistentServer() ? 10 : 1,
      idle_timeout: 20,
      connect_timeout: 10,
      // Postgres-side prepared statements break through connection poolers
      // such as PgBouncer, which Railway and Supabase both put in front of
      // Postgres. Off is the portable choice.
      prepare: false,
    }),
    { schema },
  );
}

let cached: Database | null | undefined;

export function getDb(): Database | null {
  if (cached === undefined) cached = create();
  return cached;
}

export const hasDatabase = Boolean(env.databaseUrl);
export { schema };
