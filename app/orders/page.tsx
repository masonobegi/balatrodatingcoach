import type { Metadata } from "next";

import { ContentPage } from "@/components/content-page";
import { OrderLookup } from "@/components/order-lookup";

export const metadata: Metadata = {
  title: "Track an order",
  description: "Look up a Kinline order with its reference number.",
  alternates: { canonical: "/orders" },
};

export default function OrdersPage() {
  return (
    <ContentPage
      eyebrow="Orders"
      title="Track an order"
      intro="Enter the reference from your confirmation email — it looks like KIN-4F2A9C."
      cta={false}
    >
      <OrderLookup />
    </ContentPage>
  );
}
