import { NextResponse } from "next/server";
import type Stripe from "stripe";

import { claimWebhook, getOrderBySessionId, redeemDiscount, updateOrder } from "@/lib/db/repo";
import { env } from "@/lib/env";
import { getStripe } from "@/lib/stripe";
import { sendOrderConfirmation } from "@/lib/email/send";
import { submitForFulfillment } from "@/lib/fulfillment";

export const runtime = "nodejs";

/**
 * Stripe webhook.
 *
 * The signature check is the security boundary for the entire store: without
 * it, anyone who finds this URL can mark orders paid. The raw body is required
 * for verification, which is why this route reads `request.text()` and never
 * `request.json()`.
 *
 * Stripe retries on any non-2xx, and will send the same event more than once
 * even on success, so every handler is idempotent via `claimWebhook`.
 */
export async function POST(request: Request) {
  const stripe = getStripe();
  const signature = request.headers.get("stripe-signature");

  if (!stripe || !env.stripeWebhookSecret) {
    // Never accept unverifiable payment events. Answering 503 rather than 200
    // means Stripe keeps retrying, so nothing is lost once configured.
    return NextResponse.json({ error: "Webhooks are not configured" }, { status: 503 });
  }
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const raw = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, env.stripeWebhookSecret);
  } catch (error) {
    return NextResponse.json(
      { error: `Signature verification failed: ${error instanceof Error ? error.message : ""}` },
      { status: 400 },
    );
  }

  // Idempotency. A duplicate delivery must not send a second confirmation
  // email or submit a second print order.
  const first = await claimWebhook(event.id, event.type);
  if (!first) return NextResponse.json({ received: true, duplicate: true });

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        if (session.payment_status !== "paid") break;
        await markPaid(session);
        break;
      }

      case "checkout.session.async_payment_succeeded": {
        await markPaid(event.data.object);
        break;
      }

      case "checkout.session.async_payment_failed":
      case "checkout.session.expired": {
        const session = event.data.object;
        const order = await getOrderBySessionId(session.id);
        if (order && order.status === "pending") {
          await updateOrder(order.id, {
            status: session.status === "expired" ? "abandoned" : "failed",
          });
        }
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object;
        const intent =
          typeof charge.payment_intent === "string" ? charge.payment_intent : null;
        if (intent) await markRefundedByIntent(intent);
        break;
      }

      default:
        break;
    }
  } catch (error) {
    // Returning 500 makes Stripe retry, which is what we want for a transient
    // database or provider failure. The claim above is already committed, so
    // guard the side effects themselves rather than relying on a replay.
    console.error("[stripe-webhook] handler failed", event.type, error);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function markPaid(session: Stripe.Checkout.Session) {
  const order = await getOrderBySessionId(session.id);
  if (!order || order.status === "paid") return;

  const address = session.collected_information?.shipping_details ?? null;

  const updated = await updateOrder(order.id, {
    status: "paid",
    paidAt: new Date(),
    stripePaymentIntentId:
      typeof session.payment_intent === "string" ? session.payment_intent : null,
    customerName: address?.name ?? session.customer_details?.name ?? null,
    shippingAddress: address,
    // Stripe Tax populates this once the founder registers a jurisdiction.
    tax: session.total_details?.amount_tax ?? 0,
  });

  if (!updated) return;
  if (updated.discountCode) await redeemDiscount(updated.discountCode);

  // Neither of these may take down the webhook: the payment has already
  // happened and the order is recorded. A failed email or a failed print
  // submission is an operational problem, visible in the admin dashboard.
  await sendOrderConfirmation(updated).catch((e) =>
    console.error("[stripe-webhook] confirmation email failed", e),
  );
  await submitForFulfillment(updated).catch((e) =>
    console.error("[stripe-webhook] fulfillment submission failed", e),
  );
}

async function markRefundedByIntent(paymentIntentId: string) {
  const { listOrders } = await import("@/lib/db/repo");
  const recent = await listOrders(500);
  const order = recent.find((o) => o.stripePaymentIntentId === paymentIntentId);
  if (order) await updateOrder(order.id, { status: "refunded" });
}
