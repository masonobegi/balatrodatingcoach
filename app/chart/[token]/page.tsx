import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ChartPreview } from "@/components/chart-preview";
import { ShareTracker } from "@/components/share-tracker";
import { getChartByToken, recordChartView } from "@/lib/db/repo";
import { countFilled } from "@/lib/chart/types";
import { PRINT_VARIANTS, formatMoneyShort } from "@/lib/pricing";

export const dynamic = "force-dynamic";

/**
 * The shared chart page.
 *
 * This is the growth engine, not a courtesy feature. Someone building a chart
 * hits a wall on a great-grandmother's maiden name, sends this link to a
 * relative to check it, and that relative opens a beautiful chart of *their own
 * family*. They are a warm, pre-qualified buyer who arrived for free.
 *
 * So the page has two jobs and holds them in that order: help the visitor read
 * the chart, then offer them a copy of it — and only then offer them one of
 * their own. Leading with "make your own" would waste the fact that the thing
 * on screen is already about them.
 */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const chart = await getChartByToken(token);
  if (!chart) return { title: "Chart not found" };

  const title = chart.config.title.trim() || "A family tree chart";
  const filled = countFilled(chart.people, chart.config.generations);

  return {
    title,
    description: `${title} — ${filled} ${filled === 1 ? "name" : "names"} across ${chart.config.generations} generations.`,
    // Shared links land in messages and group chats, where the preview card is
    // most of the click decision.
    openGraph: {
      title,
      description: `${filled} ${filled === 1 ? "name" : "names"} across ${chart.config.generations} generations.`,
      images: [{ url: `/api/og/chart/${token}`, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", images: [`/api/og/chart/${token}`] },
    // A private family chart must never be indexed.
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function SharedChartPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const chart = await getChartByToken(token);
  if (!chart) notFound();

  // Fire and forget — a view counter must never delay the render.
  void recordChartView(chart.id).catch(() => {});

  const filled = countFilled(chart.people, chart.config.generations);
  const title = chart.config.title.trim() || "A family tree chart";
  const variant = PRINT_VARIANTS[chart.config.size];

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <ShareTracker chartId={chart.id} />

      <div className="text-center">
        <p className="label">Someone in your family made this</p>
        <h1 className="rule-accent mt-3 text-3xl sm:text-4xl">{title}</h1>
        <p className="mt-5 text-[0.9375rem] text-ink-soft">
          {filled} {filled === 1 ? "name" : "names"} across {chart.config.generations}{" "}
          generations.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-lg">
        <ChartPreview doc={{ config: chart.config, people: chart.people }} />
      </div>

      <div className="mx-auto mt-14 max-w-2xl">
        <div className="card p-7 text-center">
          <h2 className="text-2xl">Want a copy of this one?</h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
            We print it on heavy archival paper and post it to you. Extra copies of the
            same chart are 25% off the second and 35% off the third onwards — most
            families order a few and hand them round.
          </p>
          <Link href={`/checkout?chart=${chart.id}`} className="btn btn-primary mt-6">
            Order this chart — from {formatMoneyShort(variant.price)}
          </Link>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-xl">Spotted something wrong?</h2>
          <p className="mx-auto mt-2.5 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
            Tell whoever sent you this — they can edit it and the link stays the same.
            Maiden names and dates are what people usually get stuck on.
          </p>
        </div>

        <hr className="rule my-10" />

        <div className="text-center">
          <p className="text-[0.9375rem] text-ink-soft">
            Or start one for your own side of the family.
          </p>
          <Link href="/build" className="btn btn-secondary mt-4">
            Make my own chart
          </Link>
          <p className="mt-3 text-sm text-ink-muted">
            Free to build. Most people finish in about five minutes.
          </p>
        </div>
      </div>
    </div>
  );
}
