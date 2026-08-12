import { createHmac } from "node:crypto";

import { env } from "./env";
import { safeEqual } from "./ids";

/**
 * Signed artwork URLs.
 *
 * The print partner fetches the print-ready file over HTTPS, so it needs a
 * public URL. Rather than depend on object storage for that — one more service,
 * one more set of credentials, one more thing to configure before the first
 * order can be fulfilled automatically — the app serves the artwork itself at a
 * URL that carries an HMAC of the order reference.
 *
 * That keeps it unguessable without a database lookup or a schema change, and
 * it means automatic fulfilment works with nothing configured beyond the print
 * partner's API key. R2 remains useful later for archiving, but it is no longer
 * on the critical path.
 *
 * The signature is bound to the order reference, so a leaked URL exposes one
 * order's artwork and nothing else.
 */

function secret(): string {
  return env.sessionSecret ?? env.adminPassword ?? "insecure-development-secret";
}

export function signArtwork(reference: string): string {
  return createHmac("sha256", secret())
    .update(`artwork:${reference}`)
    .digest("base64url")
    .slice(0, 32);
}

export function verifyArtworkSignature(reference: string, signature: string): boolean {
  if (!signature) return false;
  return safeEqual(signature, signArtwork(reference));
}

/** Absolute URL, because the print partner fetches it from their own network. */
export function artworkUrlFor(reference: string): string {
  return `${env.siteUrl}/api/artwork/${encodeURIComponent(reference)}?sig=${signArtwork(reference)}`;
}
