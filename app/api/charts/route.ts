import { NextResponse } from "next/server";

import { createChart, getChartById, updateChart } from "@/lib/db/repo";
import { clientKey, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import { saveChartSchema } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * Create or update a chart.
 *
 * Anonymous by design — requiring an account before the customer has seen
 * anything of value is the surest way to lose them, and the share loop depends
 * on charts being reachable without a login.
 *
 * The trade is that anyone holding a chart id can overwrite that chart. The id
 * is unguessable (~100 bits) and never appears in a share link — sharing uses a
 * separate token that grants read-only access — so possession of the id means
 * possession of the draft, which is the same thing as being its author.
 */
export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request, "charts"), 120, 60_000);
  if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = saveChartSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid chart", details: parsed.error.issues.slice(0, 5) },
      { status: 400 },
    );
  }

  const { id, config, people } = parsed.data;

  if (id) {
    const existing = await getChartById(id);
    if (existing) {
      const updated = await updateChart(id, { config, people });
      if (updated) {
        return NextResponse.json({ id: updated.id, token: updated.token });
      }
    }
    // The id is unknown — most likely a stale local draft pointing at a chart
    // from a wiped dev database. Fall through and create a fresh one rather
    // than failing the save and losing the customer's typing.
  }

  const created = await createChart({ config, people, source: "manual" });
  return NextResponse.json({ id: created.id, token: created.token }, { status: 201 });
}
