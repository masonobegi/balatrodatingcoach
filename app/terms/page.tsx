import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage, Section } from "@/components/content-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms you agree to when you order from Kinline.",
  alternates: { canonical: "/terms" },
};

/** NOT LEGAL ADVICE — must be reviewed by a lawyer. See docs/13-legal-compliance.md. */
export default function TermsPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Terms"
      intro="Plain terms for a small shop that prints family trees."
      updated="12 August 2026"
      cta={false}
    >
      <Section title="Who we are">
        <p>
          {SITE.legalEntity} sells made-to-order printed charts. Contact us at{" "}
          <a href={`mailto:${SITE.email}`} className="underline">
            {SITE.email}
          </a>
          .
        </p>
      </Section>

      <Section title="What you're buying">
        <p>
          A physical print, made to order from the chart you build and approve at
          checkout. We print what you approved. If you keep editing your chart afterwards,
          those edits do not change an order already placed.
        </p>
      </Section>

      <Section title="The names you enter">
        <p>
          You are responsible for the information you put on a chart, and you confirm you
          are entitled to use it. Do not upload anything you do not have the right to use,
          and do not use the service to harass anyone or to publish someone else's
          personal information against their wishes.
        </p>
        <p>
          You keep ownership of the names and data you enter. You give us permission to
          use them only to build, print, and deliver your order, and to keep your chart
          available to you.
        </p>
        <p>
          The chart design, layout engine, typography, and artwork templates remain ours.
          Buying a print does not transfer those.
        </p>
      </Section>

      <Section title="Prices and payment">
        <p>
          Prices are in US dollars and shown before you pay. Payment is handled by Stripe.
          Sales tax, where it applies, is calculated at checkout. We may change prices at
          any time, but never for an order already placed.
        </p>
      </Section>

      <Section title="Delivery">
        <p>
          Each item is printed to order, so allow a few days for production plus postage.
          Delivery estimates are estimates, not guarantees. Risk passes to you on
          delivery.
        </p>
      </Section>

      <Section title="Returns, and the typo policy">
        <p>
          Personalised, made-to-order goods are not generally returnable, and that applies
          here — we cannot resell a chart of your family.
        </p>
        <p>
          But we also know family names are hard. If a name is wrong, tell us within 30
          days and we will reprint it once, free, whether the mistake was ours or yours.
          If your print arrives damaged or defective, we replace it. See{" "}
          <Link href="/refunds" className="underline">
            refunds
          </Link>{" "}
          for the detail.
        </p>
      </Section>

      <Section title="Availability">
        <p>
          We try to keep the site working and your charts safe, but we do not promise
          uninterrupted service. Keep your own note of anything irreplaceable.
        </p>
      </Section>

      <Section title="Liability">
        <p>
          Nothing here limits liability for fraud, death, or personal injury caused by
          negligence, or anything else that cannot be limited by law. Beyond that, our
          liability for any order is limited to what you paid for it.
        </p>
      </Section>

      <Section title="Changes">
        <p>
          We may update these terms. The version in force is the one published when you
          place your order.
        </p>
      </Section>
    </ContentPage>
  );
}
