import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminLogin } from "@/components/admin/login";
import { OrderActions } from "@/components/admin/order-actions";
import { ChartPreview } from "@/components/chart-preview";
import { isAdminRequest } from "@/lib/admin-auth";
import { getChartById, getOrderByReference } from "@/lib/db/repo";
import { fulfillmentBriefFor, skuFor } from "@/lib/fulfillment";
import { formatMoney, stripeFee } from "@/lib/pricing";
import type { PaperSize } from "@/lib/chart/types";

export const metadata: Metadata = {
  title: "Order",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminOrderPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  if (!(await isAdminRequest())) return <AdminLogin />;

  const { reference } = await params;
  const order = await getOrderByReference(reference);
  if (!order) notFound();

  const chart = await getChartById(order.chartId);
  const snapshot = order.chartSnapshot;
  const items = order.items as {
    lines?: { label: string; size: PaperSize; framed: boolean; total: number }[];
    addons?: { label: string; total: number }[];
  };

  const fees = stripeFee(order.total);
  const profit = order.total - order.assumedCogs - fees;
  const address = order.shippingAddress as
    | { name?: string; address?: Record<string, string | null> }
    | null;

  return (
    <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <Link href="/admin" className="text-sm text-ink-muted hover:text-ink">
        ← Dashboard
      </Link>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="font-mono text-2xl">{order.reference}</h1>
        <p className="text-sm text-ink-muted">
          {order.status} · {order.fulfillmentStatus}
        </p>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <div className="space-y-8">
          <section>
            <h2 className="label">Items</h2>
            <table className="mt-3 w-full text-sm">
              <tbody>
                {(items.lines ?? []).map((l, i) => (
                  <tr key={i} className="border-b border-rule">
                    <td className="py-2">{l.label}</td>
                    <td className="py-2 font-mono text-xs text-ink-muted">
                      {skuFor(l.size, l.framed)}
                    </td>
                    <td className="py-2 text-right">{formatMoney(l.total)}</td>
                  </tr>
                ))}
                {(items.addons ?? []).map((a, i) => (
                  <tr key={`a${i}`} className="border-b border-rule text-ink-muted">
                    <td className="py-2" colSpan={2}>
                      {a.label}
                    </td>
                    <td className="py-2 text-right">
                      {a.total === 0 ? "Included" : formatMoney(a.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section>
            <h2 className="label">Money</h2>
            <dl className="mt-3 space-y-1.5 text-sm">
              <Row label="Customer paid" value={formatMoney(order.total)} />
              <Row label="Modelled COGS" value={`−${formatMoney(order.assumedCogs)}`} muted />
              <Row label="Stripe fee" value={`−${formatMoney(fees)}`} muted />
              <Row
                label="Modelled gross profit"
                value={`${formatMoney(profit)} (${
                  order.total > 0 ? Math.round((profit / order.total) * 100) : 0
                }%)`}
                strong
              />
            </dl>
            <p className="mt-2 text-xs text-ink-muted">
              COGS is a modelling assumption, not a supplier invoice. Replace the values in
              lib/pricing.ts once real costs are known.
            </p>
          </section>

          <section>
            <h2 className="label">Ship to</h2>
            {address?.address ? (
              <address className="mt-3 text-sm not-italic leading-relaxed">
                {address.name ?? order.customerName}
                <br />
                {address.address.line1}
                <br />
                {address.address.line2 ? (
                  <>
                    {address.address.line2}
                    <br />
                  </>
                ) : null}
                {address.address.city} {address.address.state} {address.address.postal_code}
                <br />
                {address.address.country}
              </address>
            ) : (
              <p className="mt-3 text-sm text-ink-muted">
                No address captured{order.status !== "paid" ? " (not paid yet)" : ""}.
              </p>
            )}
            <p className="mt-3 text-sm">{order.email}</p>
          </section>

          {order.notes ? (
            <section>
              <h2 className="label">Notes</h2>
              <pre className="mt-3 whitespace-pre-wrap rounded-sm bg-paper-deep p-3 text-xs">
                {order.notes}
              </pre>
            </section>
          ) : null}

          <section>
            <h2 className="label">Fulfilment brief</h2>
            <pre className="mt-3 whitespace-pre-wrap rounded-sm bg-paper-deep p-3 text-xs">
              {fulfillmentBriefFor(order)}
            </pre>
          </section>
        </div>

        <div className="space-y-6">
          {snapshot ? (
            <div>
              <h2 className="label mb-3">Artwork as purchased</h2>
              <ChartPreview doc={snapshot} shadow={false} />
            </div>
          ) : null}

          {chart ? (
            <div className="space-y-2">
              <a
                href={`/api/render/${chart.token}?format=svg`}
                className="btn btn-secondary w-full"
                target="_blank"
                rel="noreferrer"
              >
                Download SVG
              </a>
              <a
                href={`/api/render/${chart.token}?format=png`}
                className="btn btn-secondary w-full"
                target="_blank"
                rel="noreferrer"
              >
                Download 300 DPI PNG
              </a>
              <p className="text-xs text-ink-muted">
                Downloads are unwatermarked because you are signed in.
              </p>
            </div>
          ) : null}

          <OrderActions
            reference={order.reference}
            fulfillmentStatus={order.fulfillmentStatus}
            trackingUrl={order.trackingUrl}
          />
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  muted,
  strong,
}: {
  label: string;
  value: string;
  muted?: boolean;
  strong?: boolean;
}) {
  return (
    <div
      className={`flex justify-between ${muted ? "text-ink-muted" : ""} ${
        strong ? "border-t border-rule pt-2 font-semibold" : ""
      }`}
    >
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
