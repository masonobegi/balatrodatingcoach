import type { Metadata } from "next";
import Link from "next/link";

import { ChartPreview } from "@/components/chart-preview";
import { ContentPage, Section } from "@/components/content-page";
import { sampleChart } from "@/lib/chart/sample";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Type in the names you know, choose a shape and size, and we print your family tree on archival paper. No software, no research, about five minutes.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <ContentPage
      eyebrow="How it works"
      title="Names in, chart out"
      intro="There is no research step and no software to learn. You will know within about a minute whether this is going to work for you."
    >
      <Section title="1 · Start with one person">
        <p>
          Every chart is drawn around a single person at the centre — usually whoever it
          is a gift for, or the oldest person in the family. Their parents sit in the
          first ring, grandparents in the next, and so on outwards.
        </p>
        <p>
          You do not have to decide this perfectly. Changing the centre later is one
          click.
        </p>
      </Section>

      <Section title="2 · Fill in what you know, skip what you don't">
        <p>
          Fields appear one generation at a time, so you are never staring at fifty empty
          boxes. <strong>Three generations is seven people</strong> — the person the
          chart is for, their two parents, their four grandparents — and that is a
          finished chart. Most of us can do it from memory in a couple of minutes.
        </p>
        <p>
          Going one further is fifteen names, and that is where the phone calls usually
          start. It is entirely optional, and a three-generation chart is not a lesser
          object — it just has larger type.
        </p>
        <p>
          Anything you leave blank stays blank on the chart. The space is kept, so the
          shape stays true and the gap reads as part of the design — which is exactly how
          these charts have been drawn for centuries.
        </p>
      </Section>

      <div className="not-prose">
        <ChartPreview
          doc={sampleChart({ generations: 5, subtitle: "Gaps and all" })}
          className="mx-auto max-w-sm"
        />
        <p className="mt-3 text-center text-sm text-ink-muted">
          Two great-great-grandparents unknown. It still reads as finished.
        </p>
      </div>

      <Section title="3 · Ask a relative, if you get stuck">
        <p>
          Every chart has a private link. Send it to a sibling, an aunt, or whoever in
          your family remembers things, and they can look at what you have and tell you
          what's missing. The link keeps working as you edit — it always shows the
          current version.
        </p>
        <p>
          This is how most charts get finished. Maiden names are the usual sticking
          point.
        </p>
      </Section>

      <Section title="4 · Choose how it looks">
        <p>
          A circular fan holds up to seven generations in the space of a poster. A
          classic tree reads beautifully at three or four. Four colourways, three sizes,
          and a line of your own wording at the top and bottom.
        </p>
        <p>
          The preview is the real artwork. What you approve is exactly what goes to the
          printer — there is no separate proofing step because there is nothing to proof.
        </p>
      </Section>

      <Section title="5 · We print and post it">
        <p>
          Giclée printed with pigment inks on heavy cotton-blend fine-art paper, then
          rolled into a rigid tube. It is printed at whichever production partner is
          closest to the delivery address.
        </p>
        <p>
          Allow a few days for production plus normal postage. If a name turns out to be
          wrong, tell us within 30 days and we reprint it once, free.
        </p>
      </Section>

      <Section title="Already have a family tree on a genealogy site?">
        <p>
          Export a GEDCOM file from Ancestry, MyHeritage, FamilySearch, Gramps, or
          anything else that produces one, and upload it in the builder. We will read the
          names and dates and offer you the people in your file who make the most
          complete chart.
        </p>
        <p>
          It is a shortcut for people who already have the data.{" "}
          <Link href="/build" className="underline">
            Typing it in
          </Link>{" "}
          is the normal way, and it is not much slower for four generations.
        </p>
      </Section>
    </ContentPage>
  );
}
