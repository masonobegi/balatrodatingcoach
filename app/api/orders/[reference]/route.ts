import { NextResponse } from "next/server";

import { getOrderByReference } from "@/lib/db/repo";
import { clientKey, rateLimit, tooManyRequests } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * Existence check for the order-lookup form.
 *
 * Returns only whether the reference resolves — never any order content — so
 * that guessing references leaks nothing beyond "this reference exists". Rate
 * limited because that is still an enumeration surface, however thin.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ reference: string }> },
) {
  const limit = rateLimit(clientKey(request, "order-lookup"), 20, 60_000);
  if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

  const { reference } = await params;
  const order = await getOrderByReference(reference.trim().toUpperCase());

  if (!order) return NextResponse.json({ found: false }, { status: 404 });
  return NextResponse.json({ found: true });
}
