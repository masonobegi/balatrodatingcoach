import { createHmac } from "node:crypto";
import { cookies } from "next/headers";

import { env } from "./env";
import { safeEqual } from "./ids";

/**
 * Admin authentication.
 *
 * A single shared password and a signed cookie. There is exactly one operator,
 * so accounts, roles, and a password-reset flow would all be machinery with no
 * user — and every one of them would be another thing to get wrong. If a second
 * person ever needs access, this is the file to replace.
 *
 * The cookie carries an expiry inside the signed payload, so it cannot be
 * extended by editing the cookie's own attributes.
 */

const COOKIE = "kin_admin";
const TTL_MS = 1000 * 60 * 60 * 12;

function secret(): string {
  // Falls back to the password so a deploy that sets only ADMIN_PASSWORD still
  // has a signing key. productionReadiness() nags for a real SESSION_SECRET.
  return env.sessionSecret ?? env.adminPassword ?? "insecure-development-secret";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function issueToken(): string {
  const expires = String(Date.now() + TTL_MS);
  return `${expires}.${sign(expires)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (!safeEqual(signature, sign(expires))) return false;
  const at = Number(expires);
  return Number.isFinite(at) && at > Date.now();
}

export function checkPassword(candidate: string): boolean {
  if (!env.adminPassword) return false;
  return safeEqual(candidate, env.adminPassword);
}

export async function isAdminRequest(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(COOKIE)?.value);
}

export async function setAdminCookie(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, issueToken(), {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TTL_MS / 1000,
  });
}

export async function clearAdminCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export const ADMIN_COOKIE = COOKIE;
