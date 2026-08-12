import Stripe from "stripe";

import { env, capabilities } from "./env";

/**
 * Stripe client.
 *
 * Stripe rather than a merchant of record: Lemon Squeezy, Paddle, and Polar all
 * decline physical goods, so the "let someone else own sales tax" option is not
 * available to this business at any price. Stripe Tax (0.5% on registered
 * jurisdictions) covers the calculation once the founder registers somewhere.
 *
 * Returns null when unconfigured so the store can run a simulated checkout —
 * the full journey is walkable before any account exists.
 */
let cached: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (cached === undefined) {
    cached = env.stripeSecretKey
      ? new Stripe(env.stripeSecretKey, {
          // Pinned so a Stripe-side default bump cannot change behaviour under
          // us. Must match the version the installed SDK types were built for.
          apiVersion: "2026-07-29.dahlia",
          typescript: true,
          maxNetworkRetries: 2,
          timeout: 20_000,
        })
      : null;
  }
  return cached;
}

export const paymentsLive = capabilities.payments;
