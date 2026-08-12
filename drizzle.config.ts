import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  // Migrations are generated as plain SQL and committed, so what runs against
  // production is reviewable in a diff rather than derived at deploy time.
  strict: true,
  verbose: true,
} satisfies Config;
