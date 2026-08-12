import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage, QA } from "@/components/content-page";
import { SITE } from "@/lib/site";
import { formatMoneyShort, FREE_SHIPPING_THRESHOLD } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "How long a family tree chart takes to make, what happens if you don't know a name, how it ships, and what to do if something is spelled wrong.",
  alternates: { canonical: "/faq" },
};

const FAQS = [
  {
    q: "What if I don't know all the names?",
    a: "Almost nobody does. Leave anything you're unsure of blank and the chart keeps that person's place — an empty space on a family tree is normal, and on a fan chart the gaps look deliberate rather than broken. Most gift charts have real holes in the outer ring.",
  },
  {
    q: "How long does it take to make one?",
    a: "About five minutes for three or four generations, if you're working from memory. Longer if you start phoning relatives, which many people end up doing.",
  },
  {
    q: "Do I need genealogy software or an Ancestry account?",
    a: "No. You type in names. If you already keep a tree in Ancestry, MyHeritage or FamilySearch you can upload a GEDCOM export instead and we'll fill the chart in for you, but that is a shortcut, not a requirement.",
  },
  {
    q: "Can I see it before I pay?",
    a: "Yes, and this is the whole point. The preview in the builder is the actual artwork at actual proportions — not a mock-up. Nothing is hidden behind payment.",
  },
  {
    q: "What if I spell a name wrong?",
    a: "Tell us within 30 days and we reprint it once, free. Family names are genuinely hard, half of them are spelled three different ways across two countries, and we would rather you had it right than have you feel stupid about it.",
  },
  {
    q: "How is it printed?",
    a: "Giclée, with pigment inks on a heavy cotton-blend fine-art paper. It ships rolled in a rigid tube. Leave it flat under something heavy for a day before framing.",
  },
  {
    q: "Does it come framed?",
    a: "Not at the moment. Every size we print is a standard frame size, so you can buy a frame off the shelf for a fraction of what we would have to charge to ship glass across the country without breaking it. If enough people ask, we'll revisit it.",
  },
  {
    q: "How much is shipping?",
    a: `Free over ${formatMoneyShort(FREE_SHIPPING_THRESHOLD)}, otherwise a flat ${formatMoneyShort(700)}. We print and ship from the nearest production partner to you, which keeps both the cost and the carbon down.`,
  },
  {
    q: "Can I order more than one copy?",
    a: "Yes, and most people do — one chart usually ends up on several walls. The second copy is 25% off and the third onwards is 35% off, as long as they're the same chart.",
  },
  {
    q: "Can I send it straight to the person it's for?",
    a: "Yes. Enter their address at checkout. Add gift wrap and we'll include a card written by hand — you tell us what to write after you order.",
  },
  {
    q: "Who can see my chart?",
    a: "Only people you send the link to. Charts aren't listed, indexed, or searchable, and we don't publish them or add anyone to a public database. The link contains a long random code that can't be guessed.",
  },
  {
    q: "Can I change it after I've ordered?",
    a: "We print what you approved at checkout, so tell us quickly. Email us with your order reference and if it hasn't gone to press we'll swap the artwork.",
  },
];

export default function FaqPage() {
  return (
    <>
      <ContentPage
        eyebrow="Help"
        title="Questions"
        intro="The things people actually ask before ordering."
      >
        {FAQS.map((f) => (
          <QA key={f.q} q={f.q}>
            <p>{f.a}</p>
          </QA>
        ))}

        <p className="text-[0.9375rem] text-ink-soft">
          Anything else — <a href={`mailto:${SITE.email}`} className="underline">email us</a>. A
          person reads it.{" "}
          <Link href="/shipping-and-returns" className="underline">
            Shipping and returns
          </Link>{" "}
          has the fine print.
        </p>
      </ContentPage>

      {/* Rich result eligibility. The markup mirrors the visible copy exactly —
          Google penalises FAQ schema that does not match what a user sees. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
