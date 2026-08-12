import type { Metadata } from "next";

import { ContentPage, Section } from "@/components/content-page";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What Kinline collects, why, and what we do not do with it.",
  alternates: { canonical: "/privacy" },
};

/**
 * NOT LEGAL ADVICE — see docs/13-legal-compliance.md.
 *
 * This policy is written to describe what the code in this repository actually
 * does, which is the part most template policies get wrong. It must be reviewed
 * by a lawyer before launch, and re-checked whenever data handling changes.
 *
 * The genuinely unusual issue for this business is third-party personal data:
 * a family tree is, by definition, information about living relatives who never
 * visited the site and never consented. That is addressed head-on below rather
 * than buried, because it is the question a thoughtful customer will actually
 * have.
 */
export default function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="Legal"
      title="Privacy"
      intro="The short version: we collect what an order needs, we use first-party analytics only, and we never publish or sell your family's names."
      updated="12 August 2026"
      cta={false}
    >
      <Section title="What we collect">
        <p>
          <strong>The names you type.</strong> The people on your chart, their years, and
          any place names you add. This is the product — without it there is nothing to
          print.
        </p>
        <p>
          <strong>Your email address</strong>, when you check out or ask us to save a
          chart.
        </p>
        <p>
          <strong>Your delivery address</strong>, collected by Stripe at payment and
          passed to whoever prints and posts your order.
        </p>
        <p>
          <strong>Anonymous usage events.</strong> Page views and a handful of steps like
          "opened the builder" or "started checkout", tied to a random identifier stored
          in your browser. It is not linked to your name, and it is not shared with
          anyone.
        </p>
        <p>
          We do not collect card details. Stripe handles payment and we never see the
          numbers.
        </p>
      </Section>

      <Section title="About your relatives' names">
        <p>
          A family tree is information about other people, most of whom never visited this
          site. We take that seriously, so we hold it narrowly: charts are never
          published, never indexed by search engines, never added to any searchable
          database, and never sold or shared with other customers or genealogy services.
        </p>
        <p>
          A chart is reachable only through its private link, which contains a long random
          code that cannot be guessed. Anyone you send that link to can see the chart, so
          send it to people you would be happy to show it to.
        </p>
        <p>
          If you are on someone else's chart and want to be removed, email{" "}
          <a href={`mailto:${SITE.email}`} className="underline">
            {SITE.email}
          </a>{" "}
          and we will help.
        </p>
      </Section>

      <Section title="Cookies and tracking">
        <p>
          We use no advertising cookies, no third-party analytics script, and no
          cross-site tracking. Our analytics are first-party: a random identifier in your
          browser's local storage that lets us count how many people finished building a
          chart. There is no profile behind it.
        </p>
        <p>
          Signing in to the dashboard sets one cookie, which only the site operator uses.
        </p>
      </Section>

      <Section title="Who we share data with">
        <p>
          Only the companies needed to fulfil your order: our payment processor (Stripe),
          our print and delivery partner, our email provider, and our hosting and database
          providers. Each receives the minimum needed to do its job. None of them may use
          your data for their own marketing.
        </p>
        <p>We do not sell personal information, and we never have.</p>
      </Section>

      <Section title="How long we keep it">
        <p>
          Charts are kept until you ask us to delete them — people come back to these
          years later, and losing someone's family tree to a retention policy would be its
          own kind of harm. Order records are kept as long as tax and accounting rules
          require. Analytics events are kept in aggregate.
        </p>
      </Section>

      <Section title="Your rights">
        <p>
          Wherever you live, you can ask us for a copy of what we hold about you, ask us
          to correct it, or ask us to delete it. Email{" "}
          <a href={`mailto:${SITE.email}`} className="underline">
            {SITE.email}
          </a>
          . We will not charge you and we will not make it difficult.
        </p>
        <p>
          Residents of California and other US states with privacy statutes have specific
          rights, including the right not to be discriminated against for exercising them.
          We honour those requests from everyone, regardless of where you live, because
          maintaining two standards would be more work than doing it properly once.
        </p>
      </Section>

      <Section title="Marketing email">
        <p>
          If we email you about anything other than an order you placed, every message
          carries a working unsubscribe link and our postal address. Unsubscribing is
          honoured immediately and does not affect order emails.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Questions about any of this go to{" "}
          <a href={`mailto:${SITE.email}`} className="underline">
            {SITE.email}
          </a>
          .
        </p>
      </Section>
    </ContentPage>
  );
}
