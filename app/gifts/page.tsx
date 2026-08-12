import type { Metadata } from "next";
import Link from "next/link";

import { ChartPreview } from "@/components/chart-preview";
import { sampleChart } from "@/lib/chart/sample";
import { formatMoneyShort, PRINT_VARIANTS } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "A family tree as a gift",
  description:
    "What to put on a family tree chart for Christmas, a milestone birthday, an anniversary, or after a death in the family — and how far back to go.",
  alternates: { canonical: "/gifts" },
};

/**
 * The occasion page.
 *
 * Nearly every order is a gift, and the buyer's real question is not "which
 * size" but "is this an appropriate thing to give this particular person".
 * So the page answers that per occasion, including the difficult one — a chart
 * given after a death — where getting the tone wrong would be worse than not
 * selling at all.
 */
const OCCASIONS = [
  {
    id: "christmas",
    title: "Christmas",
    who: "Parents and grandparents",
    body: "The most common reason people order. A four-generation chart puts the recipient's own grandparents on the wall, which is usually the point at which someone gets quiet and then starts telling stories.",
    tip: "Order by the first week of December. Ask a sibling to check the maiden names before you do — it is the most common thing to get wrong.",
    subtitle: "Christmas 2026",
    generations: 4,
  },
  {
    id: "milestone-birthday",
    title: "A milestone birthday",
    who: "70th, 80th, 90th",
    body: "Centre the chart on the person having the birthday and work backwards. At eighty, their grandparents were born in the 1870s, and seeing those dates set down in print lands differently than hearing them.",
    tip: "The 18×24 is the usual choice here. Big enough to read from a chair.",
    subtitle: "On her 80th birthday",
    generations: 5,
  },
  {
    id: "memorial",
    title: "After a death in the family",
    who: "A quiet thing to do together",
    body: "Building one of these in the weeks after a funeral gives a family something to do together that is neither admin nor grief. People phone each other to check names. It is often the first easy conversation after a hard month.",
    tip: "Centre it on the person who died and go back from them. Keep the wording plain — a name and two years is usually enough.",
    subtitle: "1931 – 2026",
    generations: 4,
  },
  {
    id: "anniversary",
    title: "A golden or silver anniversary",
    who: "Two families, joined",
    body: "Centre the chart on one of the couple and their line runs back from there. Some people order two — one for each side — and hang them as a pair.",
    tip: "Two copies of different charts do not share the multi-copy discount, but two copies of the same chart do.",
    subtitle: "Fifty years",
    generations: 4,
  },
  {
    id: "new-baby",
    title: "A new baby",
    who: "The newest name",
    body: "Centre it on the child. It is the only chart where the middle is the youngest person, and it is a lovely thing to hang in a nursery and then not touch for thirty years.",
    tip: "Three generations is plenty. The 12×18 suits a nursery wall.",
    subtitle: "Born 2026",
    generations: 3,
  },
  {
    id: "reunion",
    title: "A family reunion",
    who: "One chart, several households",
    body: "Build one chart and order a copy for each household. This is where the multi-copy pricing does real work — the second is 25% off and the third onwards 35%.",
    tip: "Send the private link round beforehand and let everyone correct it. You will end up with a better chart than you could have made alone.",
    subtitle: "The Doyle Reunion",
    generations: 5,
  },
];

export default function GiftsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="label">Gift guide</p>
        <h1 className="rule-accent mt-3 text-4xl sm:text-5xl">
          Giving a family tree
        </h1>
        <p className="prose-kin mt-6">
          Nearly everyone who orders one of these is giving it to someone else. Here is
          what to put on it, how far back to go, and when to order — by occasion.
        </p>
      </div>

      <div className="mt-20 space-y-24">
        {OCCASIONS.map((o, i) => (
          <section
            key={o.id}
            id={o.id}
            className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
              i % 2 === 1 ? "lg:[&>figure]:order-1" : ""
            }`}
          >
            <div>
              <p className="label">{o.who}</p>
              <h2 className="mt-2.5 text-3xl">{o.title}</h2>
              <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-soft">
                {o.body}
              </p>
              <p className="mt-5 border-l-2 border-walnut pl-4 text-[0.9375rem] leading-relaxed text-ink-muted">
                {o.tip}
              </p>
              <Link href="/build" className="btn btn-secondary mt-7">
                Start this chart
              </Link>
            </div>

            <figure>
              <ChartPreview
                doc={sampleChart({
                  generations: o.generations,
                  subtitle: o.subtitle,
                  theme: i % 3 === 0 ? "heirloom" : i % 3 === 1 ? "botanical" : "slate",
                })}
                className="mx-auto max-w-xs"
              />
            </figure>
          </section>
        ))}
      </div>

      <div className="mt-24 border-t border-rule pt-12 text-center">
        <h2 className="text-3xl">Prices</h2>
        <p className="mt-3 text-[0.9375rem] text-ink-soft">
          {Object.values(PRINT_VARIANTS)
            .map((v) => `${v.label} ${formatMoneyShort(v.price)}`)
            .join(" · ")}
        </p>
        <Link href="/build" className="btn btn-primary mt-7">
          Make a chart
        </Link>
      </div>
    </div>
  );
}
