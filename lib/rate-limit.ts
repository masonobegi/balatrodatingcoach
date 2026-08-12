/**
 * In-process rate limiting.
 *
 * A single fixed-window counter per key, held in module memory. On Vercel that
 * means per-instance rather than global, so it is a speed bump rather than a
 * guarantee — but the thing it is defending against is one script hammering one
 * endpoint, and for that a per-instance limit is most of the value at none of
 * the cost. Introducing Redis for this at launch would add a service, a bill,
 * and a failure mode to protect a store with no traffic.
 *
 * Swap the store for Upstash if abuse ever becomes real; the call sites do not
 * change.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
let lastSweep = Date.now();

function sweep(now: number) {
  // Amortised cleanup so an attacker cannot grow the map without bound.
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, b] of buckets) if (b.resetAt < now) buckets.delete(key);
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = buckets.get(key);
  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }
  return { ok: true, remaining: limit - existing.count, retryAfterSeconds: 0 };
}

/**
 * Best-effort client address. Vercel sets x-forwarded-for; the left-most entry
 * is the client. Falls back to a constant so a missing header degrades to a
 * shared bucket rather than to no limit at all.
 */
export function clientKey(request: Request, scope: string): string {
  const fwd = request.headers.get("x-forwarded-for") ?? "";
  const ip = fwd.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  return `${scope}:${ip}`;
}

export function tooManyRequests(retryAfterSeconds: number): Response {
  return new Response(JSON.stringify({ error: "Too many requests" }), {
    status: 429,
    headers: {
      "Content-Type": "application/json",
      "Retry-After": String(retryAfterSeconds),
    },
  });
}
