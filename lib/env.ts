/**
 * Environment configuration.
 *
 * Every external service is optional at boot. The store runs, renders, builds
 * charts, and walks a simulated checkout with no credentials at all — which
 * means the whole customer journey can be reviewed before a single account is
 * opened, and a missing key degrades one feature instead of crashing the site.
 *
 * `npm run check:env` prints exactly what is configured and what each gap
 * disables. See docs/14-deployment.md.
 */

function read(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

export const env = {
  databaseUrl: read("DATABASE_URL"),

  stripeSecretKey: read("STRIPE_SECRET_KEY"),
  stripeWebhookSecret: read("STRIPE_WEBHOOK_SECRET"),

  resendApiKey: read("RESEND_API_KEY"),
  emailFrom: read("EMAIL_FROM") ?? "Kinline <orders@kinline.co>",
  supportEmail: read("SUPPORT_EMAIL") ?? "hello@kinline.co",

  r2AccountId: read("R2_ACCOUNT_ID"),
  r2AccessKeyId: read("R2_ACCESS_KEY_ID"),
  r2SecretAccessKey: read("R2_SECRET_ACCESS_KEY"),
  r2Bucket: read("R2_BUCKET"),
  r2PublicUrl: read("R2_PUBLIC_URL"),

  prodigiApiKey: read("PRODIGI_API_KEY"),
  prodigiSandbox: read("PRODIGI_SANDBOX") !== "false",

  adminPassword: read("ADMIN_PASSWORD"),
  sessionSecret: read("SESSION_SECRET"),

  siteUrl:
    read("NEXT_PUBLIC_SITE_URL") ??
    (read("VERCEL_PROJECT_PRODUCTION_URL")
      ? `https://${read("VERCEL_PROJECT_PRODUCTION_URL")}`
      : "http://localhost:3000"),

  nodeEnv: process.env.NODE_ENV ?? "development",
} as const;

export const isProduction = env.nodeEnv === "production";

export const capabilities = {
  database: Boolean(env.databaseUrl),
  payments: Boolean(env.stripeSecretKey),
  webhooks: Boolean(env.stripeWebhookSecret),
  email: Boolean(env.resendApiKey),
  storage: Boolean(env.r2AccessKeyId && env.r2SecretAccessKey && env.r2Bucket),
  fulfillment: Boolean(env.prodigiApiKey),
  admin: Boolean(env.adminPassword),
} as const;

export type Capability = keyof typeof capabilities;

/** What breaks, in plain language, when a capability is missing. */
export const CAPABILITY_NOTES: Record<Capability, string> = {
  database: "Charts and orders are held in memory and vanish on restart. Set DATABASE_URL.",
  payments: "Checkout runs in simulation and no money moves. Set STRIPE_SECRET_KEY.",
  webhooks: "Stripe events are not verified, so orders are not confirmed automatically. Set STRIPE_WEBHOOK_SECRET.",
  email: "Transactional email is logged to the console instead of sent. Set RESEND_API_KEY.",
  storage: "Artwork is rendered on demand rather than archived. Set the R2_* variables.",
  fulfillment: "Paid orders queue for manual fulfilment instead of auto-submitting. Set PRODIGI_API_KEY.",
  admin: "The admin dashboard is unreachable. Set ADMIN_PASSWORD.",
};

/**
 * Guards a production deploy against the misconfigurations that silently lose
 * money — taking real card payments without a verified webhook being the one
 * that matters, since the order would never be recorded or fulfilled.
 */
export function productionReadiness(): { ok: boolean; problems: string[] } {
  const problems: string[] = [];
  if (!isProduction) return { ok: true, problems };

  if (!capabilities.database) problems.push("DATABASE_URL is not set — orders would be lost on restart.");
  if (capabilities.payments && !capabilities.webhooks) {
    problems.push(
      "STRIPE_SECRET_KEY is set but STRIPE_WEBHOOK_SECRET is not — payments would succeed without any order being recorded.",
    );
  }
  if (!capabilities.admin) problems.push("ADMIN_PASSWORD is not set — you could not see your own orders.");
  if (!env.sessionSecret) problems.push("SESSION_SECRET is not set — admin sessions cannot be signed.");
  return { ok: problems.length === 0, problems };
}
