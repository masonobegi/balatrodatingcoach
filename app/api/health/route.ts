import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";

import { getDb } from "@/lib/db";
import { capabilities, productionReadiness } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Health check for the platform's restart policy.
 *
 * Deliberately more than a 200: it actually round-trips the database, so a
 * deploy carrying a broken connection string fails the healthcheck and is
 * rolled back rather than quietly serving a storefront that cannot record an
 * order. Configuration problems that would lose money are reported as
 * unhealthy for the same reason.
 *
 * Reports capability names only — never values, never a connection string.
 */
export async function GET() {
  const readiness = productionReadiness();
  const db = getDb();

  let database: "ok" | "unreachable" | "not-configured" = "not-configured";
  if (db) {
    try {
      await db.execute(sql`select 1`);
      database = "ok";
    } catch {
      database = "unreachable";
    }
  }

  const healthy = readiness.ok && database !== "unreachable";

  return NextResponse.json(
    {
      status: healthy ? "ok" : "degraded",
      database,
      capabilities,
      problems: readiness.problems,
    },
    { status: healthy ? 200 : 503 },
  );
}
