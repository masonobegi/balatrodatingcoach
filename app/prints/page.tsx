import type { Metadata } from "next";
import Link from "next/link";

import { ChartPreview } from "@/components/chart-preview";
import { sampleChart } from "@/lib/chart/sample";
import { THEME_LIST } from "@/lib/chart/themes";
import { PAPER_SIZES } from "@/lib/chart/types";
import {
  COPY_DISCOUNTS,
  FREE_SHIPPING_THRESHOLD,
  PRINT_VARIANTS,
  formatMoneyShort,
} from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Prints & pricing",
  description:
    "Three sizes of archival family tree chart, giclée printed on heavy cotton-blend paper and shipped rolled. $49 to $119, with free shipping over $75.",
  alternates: { canonical: "/prints" },
};

export default function PrintsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="label">Prints & pricing</p>
        <h1 className="rule-accent mt-3 text-4xl sm:text-5xl">What you get</h1>
        <p className="prose-kin mt-6">
          One chart, printed properly. No subscription, no account, no upsell you have to
          decline three times.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {Object.values(PRINT_VARIANTS).map((v) => (
          <div key={v.size} className="card flex flex-col p-7">
            <p className="font-display text-2xl">{PAPER_SIZES[v.size].label}</p>
            <p className="mt-1 font-display text-4xl text-walnut">
              {formatMoneyShort(v.price)}
            </p>
            <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
              {v.blurb}
            </p>
            <Link href="/build" className="btn btn-secondary mt-6">
              Start this size
            </Link>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-2xl text-center text-sm text-ink-muted">
        <p>
          Free shipping over {formatMoneyShort(FREE_SHIPPING_THRESHOLD)}. Extra copies of
          the same chart are {Math.round(COPY_DISCOUNTS[1] * 100)}% off the second and{" "}
          {Math.round(COPY_DISCOUNTS[2] * 100)}% off the third onwards. Sending it as a
          gift? Put the dedication on the chart itself — there's a line for it under the
          title.
        </p>
      </div>

      {/* --------------------------------------------------------- The paper */}
      <section className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="label">The print</p>
          <h2 className="mt-3 text-3xl">Made to be kept</h2>
          <dl className="mt-7 space-y-5">
            {[
              {
                t: "Heavy archival paper",
                d: "A cotton-blend fine-art stock with a slight texture, printed giclée. It is the paper galleries use for limited runs, and it does not yellow.",
              },
              {
                t: "Pigment inks",
                d: "Rated to resist fading for decades indoors. The whole point of this object is that it outlives the person who ordered it.",
              },
              {
                t: "Standard sizes",
                d: "Every size is one you can frame off the shelf. We would rather you spent $20 at a shop down the road than $60 with us.",
              },
              {
                t: "Shipped rolled",
                d: "In a rigid tube, flat-packed against creasing. Give it a day under something heavy before framing.",
              },
            ].map((row) => (
              <div key={row.t} className="border-b border-rule pb-5">
                <dt className="font-display text-xl">{row.t}</dt>
                <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {row.d}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ChartPreview
          doc={sampleChart({ generations: 5, size: "24x36", subtitle: "Five generations" })}
          className="mx-auto max-w-sm"
        />
      </section>

      {/* ------------------------------------------------------------ Themes */}
      <section className="mt-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="label">Colourways</p>
          <h2 className="rule-accent mt-3 text-3xl">Four ways to print it</h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {THEME_LIST.map((t) => (
            <figure key={t.name}>
              <ChartPreview
                doc={sampleChart({ theme: t.name, generations: 4, subtitle: "" })}
                shadow={false}
                className="ring-1 ring-rule"
              />
              <figcaption className="mt-3">
                <p className="font-display text-lg">{t.label}</p>
                <p className="mt-0.5 text-sm text-ink-muted">{t.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <div className="mt-20 text-center">
        <Link href="/build" className="btn btn-primary">
          Start your chart
        </Link>
        <p className="mt-3 text-sm text-ink-muted">
          Free to build. You see the finished poster before you pay.
        </p>
      </div>
    </div>
  );
}
