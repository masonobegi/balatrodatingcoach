import type { Metadata } from "next";
import Link from "next/link";

import { ChartPreview } from "@/components/chart-preview";
import { sampleChart } from "@/lib/chart/sample";
import { PRINT_VARIANTS, formatMoneyShort } from "@/lib/pricing";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

const OCCASIONS = [
  { label: "Christmas", note: "The chart most people give." },
  { label: "A big birthday", note: "70th, 80th, 90th." },
  { label: "After a death", note: "A quiet way to gather a family." },
  { label: "A golden anniversary", note: "Two lines, joined." },
  { label: "A new baby", note: "The first chart with the newest name." },
  { label: "A family reunion", note: "One chart, a copy for each household." },
];

export default function HomePage() {
  const hero = sampleChart();

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="mx-auto max-w-6xl px-5 pt-14 pb-20 sm:px-8 sm:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            <p className="label">Printed to order · Ships flat in a tube</p>
            <h1 className="mt-5 text-[2.75rem] leading-[1.08] sm:text-6xl">
              Your family tree,
              <br />
              drawn properly.
            </h1>
            <p className="prose-kin mt-6 max-w-lg">
              You need seven names: yourself or whoever it's for, their parents, and
              their grandparents. Type them in and watch the chart take shape. We print
              it on heavy archival paper and send it to your door.
            </p>
            <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-ink-muted">
              No research, no genealogy software, no file to upload — this is not a
              family history project. Most people finish from memory in about two
              minutes, and you can always add another generation if you know it.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/build" className="btn btn-primary">
                Start your chart — it's free to try
              </Link>
              <Link href="/prints" className="btn btn-secondary">
                See sizes & prices
              </Link>
            </div>

            <p className="mt-5 text-sm text-ink-muted">
              Build it and see the finished poster before you pay anything.
            </p>
          </div>

          <div className="relative">
            <ChartPreview doc={hero} className="mx-auto max-w-md lg:max-w-none" />
            <p className="mt-4 text-center text-xs text-ink-muted">
              An 18″ × 24″ fan chart, four generations. Set in EB Garamond.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ The pitch */}
      <section className="border-y border-rule bg-paper-deep">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
          <h2 className="text-3xl sm:text-4xl">
            Everyone means to write it down. Almost nobody does.
          </h2>
          <p className="prose-kin mt-6">
            The names live in one or two people in every family, and they are usually the
            oldest. Kinline exists to get them onto paper while that is still easy — not
            as a research project, but as something you can hang in a hallway and point
            at.
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------- How it works */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <p className="label text-center">How it works</p>
        <h2 className="rule-accent mt-3 text-center text-3xl sm:text-4xl">
          Three steps, one evening
        </h2>

        <ol className="mt-14 grid gap-10 sm:grid-cols-3">
          {[
            {
              n: "01",
              title: "Seven names",
              body: "Whoever the chart is for, their two parents, their four grandparents. That is a finished chart. Leave anything you don't know blank — the chart keeps their place.",
            },
            {
              n: "02",
              title: "Choose how it looks",
              body: "A circular fan or a classic tree, four colourways, three sizes. The preview is the actual artwork, so what you approve is what gets printed.",
            },
            {
              n: "03",
              title: "We print and post it",
              body: "Giclée-printed on heavy archival paper, rolled in a tube, and sent to you or straight to whoever it's for. Standard frame sizes, so framing is easy.",
            },
          ].map((step) => (
            <li key={step.n}>
              <p className="font-display text-4xl text-walnut">{step.n}</p>
              <h3 className="mt-3 text-xl">{step.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 text-center">
          <Link href="/build" className="btn btn-primary">
            Start your chart
          </Link>
        </div>
      </section>

      {/* -------------------------------------------------------------- Styles */}
      <section className="border-y border-rule bg-paper-deep">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <p className="label text-center">Two shapes</p>
          <h2 className="rule-accent mt-3 text-center text-3xl sm:text-4xl">
            A fan, or a tree
          </h2>
          <p className="prose-kin mx-auto mt-6 max-w-2xl text-center">
            The fan holds more people in less wall — up to seven generations, 127 names.
            The tree is the shape everyone pictures, and it reads beautifully at four.
          </p>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-14">
            <figure>
              <ChartPreview
                doc={sampleChart({ style: "fan", generations: 5, theme: "botanical", subtitle: "Five generations" })}
                className="mx-auto max-w-sm"
              />
              <figcaption className="mt-4 text-center text-sm text-ink-muted">
                The fan · shown in Botanical
              </figcaption>
            </figure>
            <figure>
              <ChartPreview
                doc={sampleChart({ style: "tree", generations: 4, theme: "heirloom", subtitle: "Four generations" })}
                className="mx-auto max-w-sm"
              />
              <figcaption className="mt-4 text-center text-sm text-ink-muted">
                The tree · shown in Heirloom
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Pricing */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <p className="label text-center">Sizes</p>
        <h2 className="rule-accent mt-3 text-center text-3xl sm:text-4xl">
          Three sizes, one price each
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {Object.values(PRINT_VARIANTS).map((v) => (
            <div key={v.size} className="card flex flex-col p-7">
              <p className="font-display text-2xl">{v.label}</p>
              <p className="mt-1 font-display text-3xl text-walnut">
                {formatMoneyShort(v.price)}
              </p>
              <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-ink-soft">
                {v.blurb}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-muted">
          Free shipping over {formatMoneyShort(7500)}. Extra copies of the same chart are
          25% off the second and 35% off the third onwards — most families order more
          than one.
        </p>
      </section>

      {/* ------------------------------------------------------------ Occasions */}
      <section className="border-y border-rule bg-paper-deep">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <p className="label text-center">When people give these</p>
          <h2 className="rule-accent mt-3 text-center text-3xl sm:text-4xl">
            Mostly as a gift
          </h2>
          <ul className="mx-auto mt-12 grid max-w-3xl gap-x-10 gap-y-5 sm:grid-cols-2">
            {OCCASIONS.map((o) => (
              <li key={o.label} className="flex items-baseline gap-3 border-b border-rule pb-4">
                <span className="font-display text-lg">{o.label}</span>
                <span className="text-sm text-ink-muted">{o.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- Reassurance */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-3">
          {[
            {
              title: "It's smaller than it sounds",
              body: "This is one line going backwards — no siblings, no cousins, no in-laws. Seven names makes a complete chart. Fifteen if you go one generation further, and most people stop before that.",
            },
            {
              title: "Typos are on us",
              body: "Get a name wrong? Tell us within 30 days and we reprint it once, free. Family names are hard and we would rather you had it right.",
            },
            {
              title: "Your names stay yours",
              body: "We don't publish charts, sell data, or add anyone to a public database. A chart is reachable only by its private link.",
            },
          ].map((c) => (
            <div key={c.title}>
              <h3 className="text-xl">{c.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- Final call */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-8">
          <h2 className="text-3xl sm:text-4xl">Start with the names you know</h2>
          <p className="prose-kin mt-5">
            You can always add more later. The chart saves itself, and you can send the
            link to a relative to fill in the gaps.
          </p>
          <div className="mt-8">
            <Link href="/build" className="btn btn-primary">
              Make my chart
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
