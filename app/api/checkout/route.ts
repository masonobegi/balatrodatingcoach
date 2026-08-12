import { NextResponse } from "next/server";

import { artworkUrlFor } from "@/lib/artwork";
import { addSubscriber, createOrder, redeemDiscount, updateOrder } from "@/lib/db/repo";
import { env } from "@/lib/env";
import { prepareOrder, toStripeLineItems } from "@/lib/orders";
import { clientKey, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import { getStripe } from "@/lib/stripe";
import { checkoutSchema } from "@/lib/validation";
import { sendOrderConfirmation } from "@/lib/email/send";

export const runtime = "nodejs";

/**
 * Starts a checkout.
 *
 * With Stripe configured this creates a Checkout Session and returns its URL.
 * Without Stripe, it marks the order paid locally and returns the confirmation
 * page — a simulation, clearly labelled as one everywhere it surfaces, so the
 * whole journey can be tested before any account exists. The simulated branch
 * refuses to run in production; see the guard below.
 */
export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request, "checkout"), 20, 60_000);
  if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid order" },
      { status: 400 },
    );
  }

  const result = await prepareOrder(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  const { order, priced, chart } = result.prepared;
  const stripe = getStripe();

  // Capture the email before payment. Someone who abandons at the card step is
  // the most recoverable customer there is, and this is the only chance to
  // reach them.
  await addSubscriber(order.email, "checkout", chart.id);

  if (!stripe) {
    if (env.nodeEnv === "production") {
      return NextResponse.json(
        { error: "Payments are not configured. Set STRIPE_SECRET_KEY." },
        { status: 503 },
      );
    }

    const created = await createOrder({
      ...order,
      status: "paid",
      paidAt: new Date(),
      artworkUrl: artworkUrlFor(order.reference),
      stripeSessionId: `sim_${order.id}`,
      notes: "SIMULATED ORDER — Stripe was not configured when this was placed.",
    });
    if (order.discountCode) await redeemDiscount(order.discountCode);
    await sendOrderConfirmation(created);

    return NextResponse.json({
      url: `/order/${created.reference}?simulated=1`,
      simulated: true,
    });
  }

  const created = await createOrder(order);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: toStripeLineItems(priced, chart.config.title),
      customer_email: order.email,
      client_reference_id: created.id,
      // Physical goods: collect an address, and let Stripe do the address form.
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "IE", "AU", "NZ"],
      },
      phone_number_collection: { enabled: false },
      allow_promotion_codes: false,
      metadata: {
        orderId: created.id,
        reference: created.reference,
        chartId: chart.id,
      },
      success_url: `${env.siteUrl}/order/${created.reference}?session={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.siteUrl}/checkout?chart=${chart.id}&cancelled=1`,
      // Give an abandoned session a chance to be recovered by Stripe's own
      // recovery email before it expires.
      expires_at: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    });

    await updateOrder(created.id, { stripeSessionId: session.id });

    return NextResponse.json({ url: session.url, orderId: created.id });
  } catch (error) {
    await updateOrder(created.id, {
      status: "failed",
      notes: `Stripe session creation failed: ${
        error instanceof Error ? error.message : "unknown"
      }`,
    });
    return NextResponse.json(
      { error: "We could not start checkout. Please try again in a moment." },
      { status: 502 },
    );
  }
}
