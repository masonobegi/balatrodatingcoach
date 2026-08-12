import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CheckoutForm } from "@/components/checkout/checkout-form";
import { ChartPreview } from "@/components/chart-preview";
import { getChartById } from "@/lib/db/repo";
import { countFilled } from "@/lib/chart/types";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ chart?: string; cancelled?: string }>;
}) {
  const params = await searchParams;
  if (!params.chart) notFound();

  const chart = await getChartById(params.chart);
  if (!chart) notFound();

  const filled = countFilled(chart.people, chart.config.generations);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <Link href="/build" className="text-sm text-ink-muted hover:text-ink">
        ← Back to editing
      </Link>

      <h1 className="mt-4 text-3xl sm:text-4xl">Your chart</h1>
      <p className="mt-2 text-[0.9375rem] text-ink-soft">
        {filled} {filled === 1 ? "name" : "names"} ·{" "}
        {chart.config.style === "fan" ? "Fan chart" : "Family tree"} ·{" "}
        {chart.config.generations} generations
      </p>

      <div className="mt-9 grid gap-12 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-16">
        <div className="lg:order-2">
          <CheckoutForm
            chartId={chart.id}
            defaultSize={chart.config.size}
            cancelled={params.cancelled === "1"}
          />
        </div>

        <div className="lg:order-1">
          <div className="lg:sticky lg:top-6">
            <ChartPreview doc={{ config: chart.config, people: chart.people }} />
            <p className="mt-4 text-center text-sm text-ink-muted">
              This is the artwork we print. Nothing is added or moved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
