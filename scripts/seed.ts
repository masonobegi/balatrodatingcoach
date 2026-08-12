/**
 * Seeds the discount codes the launch plan refers to.
 *
 *   npm run db:seed
 *
 * Idempotent — existing codes are left alone, so re-running never resets a
 * redemption count.
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { discountCodes } from "../lib/db/schema.ts";

const url = process.env.DATABASE_URL;

if (!url) {
  console.error("DATABASE_URL is not set. Nothing to seed.");
  process.exit(1);
}

/**
 * Deliberately few, and none of them large.
 *
 * This audience is buying an emotional object, not hunting a bargain, and
 * discount-led positioning would undercut the "made to be kept" promise the
 * whole brand rests on. These exist for the three cases where a code does real
 * work: recovering an abandoned builder, honouring a community partnership, and
 * making good on a mistake.
 */
const CODES = [
  {
    code: "WELCOME10",
    percentOff: 10,
    maxRedemptions: null,
    note: "Abandoned-builder recovery email. The only evergreen code.",
  },
  {
    code: "SOCIETY15",
    percentOff: 15,
    maxRedemptions: 200,
    note: "Genealogical society newsletters — see docs/08-acquisition.md.",
  },
  {
    code: "SORRY25",
    percentOff: 25,
    maxRedemptions: 100,
    note: "Service recovery. Hand out individually, never publish.",
  },
];

const client = postgres(url, { max: 1, prepare: false });
const db = drizzle(client);

try {
  for (const entry of CODES) {
    const inserted = await db
      .insert(discountCodes)
      .values({ ...entry, active: true })
      .onConflictDoNothing()
      .returning();

    console.log(
      inserted.length > 0
        ? `  created  ${entry.code}  ${entry.percentOff}% off`
        : `  exists   ${entry.code}  (left untouched)`,
    );
  }
  console.log("\nSeed complete.");
} catch (error) {
  console.error("\nSeed failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await client.end();
}
