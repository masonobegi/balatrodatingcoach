import type { Metadata } from "next";
import Link from "next/link";

import { ContentPage, Section } from "@/components/content-page";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT, formatMoneyShort } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Shipping & returns",
  description:
    "How Kinline charts are printed, packed and posted, what shipping costs, and what happens if something is wrong.",
  alternates: { canonical: "/shipping-and-returns" },
};

export default function ShippingPage() {
  return (
    <ContentPage
      eyebrow="Help"
      title="Shipping & returns"
      intro="Printed to order at the production partner nearest you, then posted rolled in a rigid tube."
    >
      <Section title="What it costs">
        <p>
          Free over {formatMoneyShort(FREE_SHIPPING_THRESHOLD)}. Below that, a flat{" "}
          {formatMoneyShort(SHIPPING_FLAT)}.
        </p>
      </Section>

      <Section title="How long it takes">
        <p>
          Nothing is made until you order it, so there is a production step before
          anything ships — usually a few working days — and then normal postage on top.
        </p>
        <p>
          <strong>For Christmas, order by the first week of December.</strong> Production
          queues and postal networks both slow down in the middle of the month, and a
          chart that arrives on the 27th is a worse gift than one that arrives on the 3rd.
        </p>
      </Section>

      <Section title="How it arrives">
        <p>
          Rolled in a rigid tube. Unroll it and leave it flat under a few heavy books for
          a day before framing; it will settle completely.
        </p>
        <p>
          Every size we print is a standard frame size, so any off-the-shelf frame will
          fit.
        </p>
      </Section>

      <Section title="Where we ship">
        <p>
          The United States, Canada, the United Kingdom, Ireland, Australia and New
          Zealand. Orders print at the partner closest to the delivery address, so an
          international order is not necessarily a slow one.
        </p>
        <p>
          Any customs or import charges are the recipient's responsibility. If you are
          sending a gift abroad, that is worth knowing before you order.
        </p>
      </Section>

      <Section title="If something is wrong">
        <p>
          Wrong name — we reprint once, free, within 30 days. Damaged or lost — we replace
          it. The full detail is on the{" "}
          <Link href="/refunds" className="underline">
            refunds page
          </Link>
          .
        </p>
      </Section>
    </ContentPage>
  );
}
