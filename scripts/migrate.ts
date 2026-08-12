/**
 * Applies committed SQL migrations.
 *
 *   npm run db:migrate
 *
 * Safe to run repeatedly — Drizzle records what it has applied. Run it after
 * every deploy that changes lib/db/schema.ts.
 */

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const url = process.env.DATABASE_URL;

if (!url) {
  console.error(
    "DATABASE_URL is not set.\n\n" +
      "The store runs without a database (everything is held in memory), but\n" +
      "there is nothing to migrate until you point it at Postgres. See\n" +
      "docs/14-deployment.md.",
  );
  process.exit(1);
}

// A dedicated single connection: migrations are serial by nature and this
// avoids holding a pool open for a one-shot process.
const client = postgres(url, { max: 1, prepare: false });

try {
  console.log("Applying migrations from ./drizzle …");
  await migrate(drizzle(client), { migrationsFolder: "./drizzle" });
  console.log("Done. Schema is up to date.");
} catch (error) {
  console.error("\nMigration failed:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  await client.end();
}
