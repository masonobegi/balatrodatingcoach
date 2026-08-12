import { randomBytes, randomUUID, timingSafeEqual } from "node:crypto";

/**
 * Crockford base32 without I, L, O, U — no character pairs that a customer can
 * misread when they read an order reference down the phone, and no accidental
 * profanity.
 */
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

function encode(bytes: Buffer): string {
  let out = "";
  for (const b of bytes) out += ALPHABET[b % ALPHABET.length];
  return out;
}

export function newId(): string {
  return randomUUID().replace(/-/g, "").slice(0, 24);
}

/**
 * Share-link token. 20 base32 characters is ~100 bits — these links are the
 * only protection on a chart containing living relatives' names, so they must
 * be unguessable rather than merely unique.
 */
export function newToken(): string {
  return encode(randomBytes(20));
}

export function newOrderReference(): string {
  return `KIN-${encode(randomBytes(6))}`;
}

export function newUnsubToken(): string {
  return encode(randomBytes(16));
}

/** Constant-time string comparison for secrets. */
export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) {
    // Still compare, to keep the timing profile flat.
    timingSafeEqual(ab, ab);
    return false;
  }
  return timingSafeEqual(ab, bb);
}
