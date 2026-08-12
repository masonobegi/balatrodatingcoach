import { NextResponse } from "next/server";

import { isAdminRequest } from "@/lib/admin-auth";
import { getOrderByReference, updateOrder } from "@/lib/db/repo";
import { sendOrderConfirmation, sendShippingNotice } from "@/lib/email/send";
import { submitForFulfillment } from "@/lib/fulfillment";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ reference: string }> },
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { reference } = await params;
  const order = await getOrderByReference(reference);
  if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  let body: { action?: string; trackingUrl?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  switch (body.action) {
    case "submit_fulfillment": {
      const result = await submitForFulfillment(order);
      return NextResponse.json({
        message:
          result.status === "submitted"
            ? `Submitted. Provider reference ${result.providerOrderId ?? "unknown"}.`
            : result.message ?? "Queued for manual placement.",
      });
    }

    case "mark_shipped": {
      const url = (body.trackingUrl ?? "").trim();
      // Only accept a real http(s) URL — this value is rendered as a link in a
      // customer-facing email and on the order page.
      let parsed: URL;
      try {
        parsed = new URL(url);
      } catch {
        return NextResponse.json({ error: "That isn't a valid URL." }, { status: 400 });
      }
      if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
        return NextResponse.json({ error: "Tracking links must be http(s)." }, { status: 400 });
      }

      const updated = await updateOrder(order.id, {
        fulfillmentStatus: "shipped",
        fulfilledAt: new Date(),
        trackingUrl: parsed.toString(),
      });
      if (updated) {
        const result = await sendShippingNotice(updated);
        return NextResponse.json({
          message: result.sent
            ? "Marked shipped and emailed the customer."
            : result.skipped === "unconfigured"
              ? "Marked shipped. Email is not configured, so nothing was sent."
              : "Marked shipped. The shipping email had already been sent.",
        });
      }
      return NextResponse.json({ error: "Could not update the order." }, { status: 500 });
    }

    case "resend_confirmation": {
      const result = await sendOrderConfirmation(order);
      return NextResponse.json({
        message: result.sent
          ? "Confirmation sent."
          : result.skipped === "duplicate"
            ? "Already sent once — not sending again."
            : "Email is not configured, so nothing was sent.",
      });
    }

    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}
