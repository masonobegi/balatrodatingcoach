import { NextResponse } from "next/server";

import { recordEvent } from "@/lib/db/repo";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { eventSchema } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * Analytics ingest.
 *
 * Always answers 204, whatever happens. Analytics that can fail a page, block a
 * beacon on unload, or surface an error to a customer is worse than no
 * analytics — and the most valuable event we collect (purchase) fires during a
 * redirect, when there is nobody left to handle a rejection.
 */
export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request, "events"), 300, 60_000);
  if (!limit.ok) return new NextResponse(null, { status: 204 });

  try {
    const parsed = eventSchema.safeParse(await request.json());
    if (!parsed.success) return new NextResponse(null, { status: 204 });

    await recordEvent(parsed.data);
  } catch {
    // Swallowed deliberately. See above.
  }

  return new NextResponse(null, { status: 204 });
}
