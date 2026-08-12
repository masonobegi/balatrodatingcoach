import type { Metadata } from "next";

import { ContentPage, Section } from "@/components/content-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refunds",
  description:
    "Made-to-order charts are not generally returnable, but we reprint wrong names once, free, and replace anything damaged.",
  alternates: { canonical: "/refunds" },
};

/** NOT LEGAL ADVICE — see docs/13-legal-compliance.md. */
export default function RefundsPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Refunds"
      intro="The honest position, stated plainly, so nobody has to guess before ordering."
      updated="12 August 2026"
      cta={false}
    >
      <Section title="The short version">
        <p>
          Wrong name — we reprint once, free. Damaged or defective — we replace it. Changed
          your mind about a personalised print of your own family — we can't take it back,
          because there is nobody else on earth who wants it.
        </p>
      </Section>

      <Section title="If a name is wrong">
        <p>
          Email us within 30 days of delivery with your order reference and the
          correction. We reprint and reship once, free of charge, whether the mistake was
          ours or yours.
        </p>
        <p>
          We do this deliberately. Half of all family surnames are spelled two or three
          different ways across a couple of generations and a couple of countries, and the
          fear of getting one wrong is a real reason people hesitate. We would rather
          absorb the occasional reprint than have you not order.
        </p>
      </Section>

      <Section title="If it arrives damaged">
        <p>
          Send us a photograph within 30 days and we replace it. Do not send it back —
          posting a damaged print costs more than reprinting it and helps nobody.
        </p>
      </Section>

      <Section title="If it never arrives">
        <p>
          Tell us. If tracking shows it lost in transit, we reprint and reship at no cost
          to you.
        </p>
      </Section>

      <Section title="If you change your mind">
        <p>
          Once a chart has gone to press we cannot refund it, because it is a
          personalised, made-to-order item. If you catch us before it goes to press we
          will cancel and refund in full — so if you have second thoughts, email quickly
          and there is a good chance we can help.
        </p>
      </Section>

      <Section title="How to reach us">
        <p>
          <a href={`mailto:${SITE.email}`} className="underline">
            {SITE.email}
          </a>
          , with your order reference. A person reads it, usually within a day.
        </p>
      </Section>
    </ContentPage>
  );
}
