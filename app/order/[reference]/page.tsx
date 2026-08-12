import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ChartPreview } from "@/components/chart-preview";
import { PurchaseTracker } from "@/components/purchase-tracker";
import { getOrderByReference } from "@/lib/db/repo";
import { formatMoney } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Your order",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const STATUS_COPY: Record<string, { title: string; body: string }> = {
  pending: {
    title: "We're waiting on your payment",
    body: "If you've just paid, this page will catch up within a minute or so. Nothing further is needed from you.",
  },
  paid: {
    title: "Your chart is confirmed",
    body: "It goes into production next. We print to order, so allow a few days before it ships.",
  },
  failed: {
    title: "That payment didn't go through",
    body: "No money was taken. Your chart is saved — you can try again whenever you like.",
  },
  abandoned: {
    title: "This checkout expired",
    body: "No money was taken and your chart is saved. Start again whenever you're ready.",
  },
  refunded: {
    title: "This order was refunded",
    body: "The refund should appear on your statement within a few working days.",
  },
};

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: Promise<{ reference: string }>;
  searchParams: Promise<{ simulated?: string }>;
}) {
  const { reference } = await params;
  const { simulated } = await searchParams;

  const order = await getOrderByReference(reference);
  if (!order) notFound();

  const copy = STATUS_COPY[order.status] ?? STATUS_COPY.pending;
  const items = order.items as {
    lines?: { label: string; total: number; discountPercent: number }[];
    addons?: { label: string; total: number }[];
  };
  const snapshot = order.chartSnapshot;

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8 sm:py-16">
      {order.status === "paid" ? (
        <PurchaseTracker orderId={order.id} reference={order.reference} value={order.total} />
      ) : null}

      {simulated === "1" ? (
        <p className="mb-8 rounded-sm border border-walnut bg-paper-deep p-4 text-sm">
          <strong>Simulated order.</strong> Stripe is not configured in this environment,
          so no payment was taken and nothing will be printed. The rest of the flow is
          real — this is what a customer sees.
        </p>
      ) : null}

      <p className="label">Order {order.reference}</p>
      <h1 className="rule-accent mt-3 text-3xl sm:text-4xl">{copy?.title}</h1>
      <p className="prose-kin mx-auto mt-6 max-w-xl text-center">{copy?.body}</p>

      {snapshot ? (
        <div className="mx-auto mt-12 max-w-sm">
          <ChartPreview doc={snapshot} />
        </div>
      ) : null}

      <div className="card mx-auto mt-12 max-w-md p-6">
        <h2 className="label">What you ordered</h2>
        <dl className="mt-4 space-y-2 text-sm">
          {(items.lines ?? []).map((l, i) => (
            <div key={i} className="flex justify-between">
              <dt className="text-ink-soft">
                {l.label}
                {/* Show the additional-copy saving explicitly. It is the main
                    lever on order value, and a discount the customer never
                    sees is a discount that buys nothing. */}
                {l.discountPercent > 0 ? (
                  <span className="text-walnut"> — {l.discountPercent}% extra-copy discount</span>
                ) : null}
              </dt>
              <dd>{formatMoney(l.total)}</dd>
            </div>
          ))}
          {(items.addons ?? []).map((a, i) => (
            <div key={i} className="flex justify-between text-ink-muted">
              <dt>{a.label}</dt>
              <dd>{a.total === 0 ? "Included" : formatMoney(a.total)}</dd>
            </div>
          ))}
          {order.shipping > 0 ? (
            <div className="flex justify-between text-ink-muted">
              <dt>Shipping</dt>
              <dd>{formatMoney(order.shipping)}</dd>
            </div>
          ) : null}
          {order.discount > 0 ? (
            <div className="flex justify-between text-walnut">
              <dt>Discount</dt>
              <dd>−{formatMoney(order.discount)}</dd>
            </div>
          ) : null}
          {order.tax > 0 ? (
            <div className="flex justify-between text-ink-muted">
              <dt>Tax</dt>
              <dd>{formatMoney(order.tax)}</dd>
            </div>
          ) : null}
          <div className="flex justify-between border-t border-rule pt-2.5 font-semibold">
            <dt>Total</dt>
            <dd>{formatMoney(order.total)}</dd>
          </div>
        </dl>

        {order.trackingUrl ? (
          <a href={order.trackingUrl} className="btn btn-secondary mt-5 w-full">
            Track your parcel
          </a>
        ) : null}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-ink-muted">
          A receipt is on its way to {order.email}. Spotted a name that isn't right?{" "}
          <a href={`mailto:hello@kinline.co?subject=Order ${order.reference}`} className="underline">
            Tell us within 30 days
          </a>{" "}
          and we'll reprint it once, free.
        </p>
        <Link href="/build" className="btn btn-secondary mt-6">
          Make another chart
        </Link>
      </div>
    </div>
  );
}
