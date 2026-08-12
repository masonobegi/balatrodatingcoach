import { NextResponse } from "next/server";

import { getOrderByReference, updateOrder } from "@/lib/db/repo";
import { env } from "@/lib/env";
import { sendShippingNotice } from "@/lib/email/send";
import { safeEqual } from "@/lib/ids";
import { clientKey, rateLimit, tooManyRequests } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * Fulfilment status callbacks.
 *
 * This is the last manual step removed. Without it, someone has to watch the
 * partner's dashboard and paste a tracking URL into ours for every order; with
 * it, the customer is emailed their tracking link automatically the moment the
 * parcel leaves the lab.
 *
 * AUTHENTICATION: Prodigi's callbacks do not carry a signature, so the shared
 * secret lives in the URL itself — the callback URL registered on each order is
 * `/api/webhooks/prodigi?key=<PRODIGI_WEBHOOK_KEY>`. That is weaker than an
 * HMAC and is treated as such: the endpoint can only ever move an order forward
 * to "shipped" and attach a tracking URL. It cannot refund, cancel, alter
 * money, or expose customer data, so the worst a leaked key buys is a spurious
 * shipping email.
 *
 * PAYLOAD SHAPE IS UNVERIFIED. It could not be confirmed against live provider
 * documentation during research, so parsing is deliberately defensive: several
 * plausible field names are checked, anything unrecognised is logged and
 * acknowledged rather than erroring, and an unparseable payload still leaves
 * the order fulfillable by hand from the dashboard. Confirm the real shape
 * against the provider's docs before launch and delete the alternatives.
 */

interface ProdigiCallback {
  order?: {
    merchantReference?: string;
    status?: { stage?: string };
    shipments?: Array<{
      carrier?: { name?: string; service?: string };
      tracking?: { url?: string; number?: string };
      trackingUrl?: string;
    }>;
  };
  // Some providers wrap the payload; accept the bare form too.
  merchantReference?: string;
}

function extractReference(body: ProdigiCallback): string | null {
  return body.order?.merchantReference ?? body.merchantReference ?? null;
}

function extractTracking(body: ProdigiCallback): string | null {
  const shipment = body.order?.shipments?.[0];
  if (!shipment) return null;
  const candidate = shipment.tracking?.url ?? shipment.trackingUrl ?? null;
  if (!candidate) return null;
  try {
    const url = new URL(candidate);
    // Rendered as a link in a customer email — never accept javascript: or data:
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function isShipped(body: ProdigiCallback): boolean {
  const stage = body.order?.status?.stage?.toLowerCase() ?? "";
  if (stage === "complete" || stage === "shipped" || stage === "dispatched") return true;
  return (body.order?.shipments?.length ?? 0) > 0;
}

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request, "prodigi-webhook"), 120, 60_000);
  if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

  const key = new URL(request.url).searchParams.get("key") ?? "";
  const expected = env.prodigiWebhookKey;

  if (!expected) {
    // Nothing configured means nothing to verify against, and accepting
    // unauthenticated status changes would let anyone mark orders shipped.
    return NextResponse.json({ error: "Callbacks are not configured" }, { status: 503 });
  }
  if (!safeEqual(key, expected)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  let body: ProdigiCallback;
  try {
    body = (await request.json()) as ProdigiCallback;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const reference = extractReference(body);
  if (!reference) {
    console.warn("[prodigi-webhook] no merchant reference in payload", JSON.stringify(body).slice(0, 400));
    // 200 so the provider stops retrying something we will never understand;
    // the order remains fulfillable by hand from the dashboard.
    return NextResponse.json({ received: true, matched: false });
  }

  const order = await getOrderByReference(reference);
  if (!order) {
    console.warn("[prodigi-webhook] unknown order reference", reference);
    return NextResponse.json({ received: true, matched: false });
  }

  const tracking = extractTracking(body);
  const shipped = isShipped(body);

  // Idempotent by state rather than by event id: providers resend, and a second
  // "shipped" callback must not send a second email. sendShippingNotice is
  // itself deduped, so this is belt and braces.
  if (order.fulfillmentStatus === "shipped") {
    return NextResponse.json({ received: true, alreadyShipped: true });
  }

  if (!shipped) {
    const stage = body.order?.status?.stage ?? "unknown";
    await updateOrder(order.id, { fulfillmentStatus: `provider:${stage}`.slice(0, 24) });
    return NextResponse.json({ received: true, stage });
  }

  const updated = await updateOrder(order.id, {
    fulfillmentStatus: "shipped",
    fulfilledAt: new Date(),
    trackingUrl: tracking,
  });

  if (updated) {
    await sendShippingNotice(updated).catch((e) =>
      console.error("[prodigi-webhook] shipping email failed", e),
    );
  }

  return NextResponse.json({ received: true, shipped: true, tracking: Boolean(tracking) });
}
