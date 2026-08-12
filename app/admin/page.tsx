import type { Metadata } from "next";
import Link from "next/link";

import { AdminLogin } from "@/components/admin/login";
import { isAdminRequest } from "@/lib/admin-auth";
import { capabilities, CAPABILITY_NOTES, type Capability } from "@/lib/env";
import {
  countCharts,
  getFunnel,
  getSources,
  isMemoryMode,
  listOrders,
} from "@/lib/db/repo";
import { formatMoney, stripeFee } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * The founder's one screen.
 *
 * The brief was explicit: do not make me open five services to find out whether
 * this is working. So everything that decides "keep going or stop" lives here —
 * funnel, revenue, modelled margin, traffic sources, orders needing action —
 * and each number is framed against the target it is supposed to hit rather
 * than presented raw.
 */
export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string }>;
}) {
  if (!(await isAdminRequest())) return <AdminLogin />;

  const { days } = await searchParams;
  const window = Math.max(1, Math.min(365, Number(days) || 30));

  const [funnel, sources, orders, chartsBuilt] = await Promise.all([
    getFunnel(window),
    getSources(window),
    listOrders(50),
    countCharts(window),
  ]);

  const paid = orders.filter((o) => o.status === "paid");
  const revenue = paid.reduce((s, o) => s + o.total, 0);
  const cogs = paid.reduce((s, o) => s + o.assumedCogs, 0);
  const fees = paid.reduce((s, o) => s + stripeFee(o.total), 0);
  const grossProfit = revenue - cogs - fees;
  const aov = paid.length > 0 ? Math.round(revenue / paid.length) : 0;
  const margin = revenue > 0 ? Math.round((grossProfit / revenue) * 100) : 0;

  const conversion =
    funnel.visitors > 0 ? (funnel.purchased / funnel.visitors) * 100 : 0;
  const builderCompletion =
    funnel.builderStarted > 0
      ? (funnel.builderCompleted / funnel.builderStarted) * 100
      : 0;

  const needsAction = orders.filter(
    (o) => o.status === "paid" && o.fulfillmentStatus !== "shipped",
  );

  const missing = (Object.keys(capabilities) as Capability[]).filter(
    (k) => !capabilities[k],
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="text-3xl">Dashboard</h1>
        <div className="flex items-center gap-2 text-sm">
          {[7, 30, 90].map((d) => (
            <Link
              key={d}
              href={`/admin?days=${d}`}
              className={`rounded-sm px-2.5 py-1 ${
                window === d ? "bg-ink text-paper" : "text-ink-muted hover:text-ink"
              }`}
            >
              {d}d
            </Link>
          ))}
          <form action="/api/admin/logout" method="post">
            <button className="btn-quiet text-sm" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </div>

      {isMemoryMode() ? (
        <p className="mt-5 rounded-sm border border-danger/40 bg-danger/5 p-4 text-sm">
          <strong>No database connected.</strong> Everything below is held in memory and
          disappears when the server restarts. Set <code>DATABASE_URL</code> before taking
          real orders.
        </p>
      ) : null}

      {missing.length > 0 ? (
        <details className="mt-5 rounded-sm border border-rule bg-paper-deep p-4 text-sm">
          <summary className="cursor-pointer font-semibold">
            {missing.length} service{missing.length === 1 ? "" : "s"} not configured
          </summary>
          <ul className="mt-3 space-y-1.5 text-ink-soft">
            {missing.map((k) => (
              <li key={k}>
                <strong className="capitalize">{k}</strong> — {CAPABILITY_NOTES[k]}
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      {/* ------------------------------------------------------------ Headline */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Revenue"
          value={formatMoney(revenue)}
          note={`${paid.length} paid order${paid.length === 1 ? "" : "s"}`}
          target="Goal: $1,000/mo"
        />
        <Stat
          label="Gross profit"
          value={formatMoney(grossProfit)}
          note={`${margin}% margin · modelled COGS`}
          target="Healthy: 60%+"
        />
        <Stat
          label="Average order"
          value={aov ? formatMoney(aov) : "—"}
          note="Multi-copy orders lift this"
          target="Goal: $95"
        />
        <Stat
          label="Conversion"
          value={`${conversion.toFixed(2)}%`}
          note={`${funnel.visitors} visitors`}
          target="Goal: 1.5–2.5%"
        />
      </section>

      {/* -------------------------------------------------------------- Funnel */}
      <section className="mt-10">
        <h2 className="text-xl">The funnel</h2>
        <p className="mt-1 text-sm text-ink-muted">
          The step that matters most is <strong>started → completed</strong>. That is the
          biggest untested assumption in this business: whether a gift buyer will type in
          fifteen names.
        </p>

        <div className="card mt-4 divide-y divide-rule">
          <FunnelRow label="Visitors" value={funnel.visitors} of={funnel.visitors} />
          <FunnelRow label="Opened the builder" value={funnel.builderStarted} of={funnel.visitors} />
          <FunnelRow label="Typed a first name" value={funnel.firstNameEntered} of={funnel.builderStarted} />
          <FunnelRow
            label="Built a real chart (7+ names)"
            value={funnel.builderCompleted}
            of={funnel.builderStarted}
            highlight
          />
          <FunnelRow label="Started checkout" value={funnel.checkoutStarted} of={funnel.builderCompleted} />
          <FunnelRow label="Purchased" value={funnel.purchased} of={funnel.checkoutStarted} />
        </div>

        <p className="mt-3 text-sm text-ink-muted">
          {chartsBuilt} chart{chartsBuilt === 1 ? "" : "s"} saved in this window.
          Builder completion is{" "}
          <strong className={builderCompletion < 25 ? "text-danger" : "text-success"}>
            {builderCompletion.toFixed(0)}%
          </strong>
          . Below 25% sustained is a documented kill signal — see
          docs/12-failure-detection.md.
        </p>
      </section>

      {/* ------------------------------------------------------------- Sources */}
      <section className="mt-10">
        <h2 className="text-xl">Where people came from</h2>
        {sources.length === 0 ? (
          <p className="mt-3 text-sm text-ink-muted">No traffic recorded yet.</p>
        ) : (
          <div className="card mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-rule text-left">
                  <th className="label p-3">Source</th>
                  <th className="label p-3 text-right">Visitors</th>
                  <th className="label p-3 text-right">Orders</th>
                  <th className="label p-3 text-right">Revenue</th>
                  <th className="label p-3 text-right">Conv.</th>
                </tr>
              </thead>
              <tbody>
                {sources.slice(0, 12).map((s) => (
                  <tr key={s.source} className="border-b border-rule last:border-0">
                    <td className="p-3">{s.source}</td>
                    <td className="p-3 text-right">{s.visitors}</td>
                    <td className="p-3 text-right">{s.purchases}</td>
                    <td className="p-3 text-right">{formatMoney(s.revenue)}</td>
                    <td className="p-3 text-right">
                      {s.visitors > 0 ? `${((s.purchases / s.visitors) * 100).toFixed(1)}%` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* -------------------------------------------------------------- Orders */}
      <section className="mt-10">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl">Orders</h2>
          {needsAction.length > 0 ? (
            <p className="text-sm font-semibold text-walnut">
              {needsAction.length} need{needsAction.length === 1 ? "s" : ""} fulfilling
            </p>
          ) : null}
        </div>

        {orders.length === 0 ? (
          <p className="mt-3 text-sm text-ink-muted">No orders yet.</p>
        ) : (
          <div className="card mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-rule text-left">
                  <th className="label p-3">Reference</th>
                  <th className="label p-3">Placed</th>
                  <th className="label p-3">Email</th>
                  <th className="label p-3">Status</th>
                  <th className="label p-3">Fulfilment</th>
                  <th className="label p-3 text-right">Total</th>
                  <th className="label p-3"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-rule last:border-0">
                    <td className="p-3 font-mono text-xs">{o.reference}</td>
                    <td className="p-3 whitespace-nowrap text-ink-muted">
                      {o.createdAt.toISOString().slice(0, 10)}
                    </td>
                    <td className="p-3 max-w-[14rem] truncate">{o.email}</td>
                    <td className="p-3">
                      <StatusPill status={o.status} />
                    </td>
                    <td className="p-3 text-ink-muted">{o.fulfillmentStatus}</td>
                    <td className="p-3 text-right">{formatMoney(o.total)}</td>
                    <td className="p-3 text-right">
                      <Link href={`/admin/orders/${o.reference}`} className="underline">
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  note,
  target,
}: {
  label: string;
  value: string;
  note: string;
  target: string;
}) {
  return (
    <div className="card p-5">
      <p className="label">{label}</p>
      <p className="mt-2 font-display text-3xl">{value}</p>
      <p className="mt-1 text-sm text-ink-muted">{note}</p>
      <p className="mt-2 text-xs text-ink-muted">{target}</p>
    </div>
  );
}

function FunnelRow({
  label,
  value,
  of,
  highlight = false,
}: {
  label: string;
  value: number;
  of: number;
  highlight?: boolean;
}) {
  const pct = of > 0 ? (value / of) * 100 : 0;
  return (
    <div className="flex items-center gap-4 p-3">
      <div className="flex-1">
        <p className={highlight ? "font-semibold" : ""}>{label}</p>
        <div className="mt-1.5 h-1.5 w-full rounded-sm bg-paper-deep">
          <div
            className="h-1.5 rounded-sm bg-walnut"
            style={{ width: `${Math.min(100, pct)}%` }}
          />
        </div>
      </div>
      <p className="w-16 text-right font-display text-xl">{value}</p>
      <p className="w-14 text-right text-sm text-ink-muted">{pct.toFixed(0)}%</p>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const tone =
    status === "paid"
      ? "text-success"
      : status === "failed" || status === "refunded"
        ? "text-danger"
        : "text-ink-muted";
  return <span className={`text-xs font-semibold uppercase tracking-wide ${tone}`}>{status}</span>;
}
