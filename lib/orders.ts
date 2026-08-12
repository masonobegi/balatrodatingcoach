/**
 * Order construction, shared by the live Stripe path and the simulated one.
 *
 * Prices are always recomputed here from the chart id and the requested
 * quantities. The client never sends an amount, and any amount it did send
 * would be ignored — a storefront that trusts a browser-supplied price is the
 * oldest hole in e-commerce.
 */

import { getChartById, getDiscountCode, isDiscountUsable } from "./db/repo";
import { newId, newOrderReference } from "./ids";
import { priceOrder, type PricedOrder } from "./pricing";
import type { CheckoutInput } from "./validation";
import type { NewOrder } from "./db/schema";
import type { ChartConfig, PeopleMap } from "./chart/types";

export interface PreparedOrder {
  order: NewOrder;
  priced: PricedOrder;
  chart: { id: string; token: string; config: ChartConfig; people: PeopleMap };
}

export type PrepareResult =
  | { ok: true; prepared: PreparedOrder }
  | { ok: false; error: string; status: number };

export async function prepareOrder(input: CheckoutInput): Promise<PrepareResult> {
  const chart = await getChartById(input.chartId);
  if (!chart) return { ok: false, error: "That chart could not be found.", status: 404 };

  const filled = Object.keys(chart.people ?? {}).length;
  if (filled < 1) {
    return { ok: false, error: "Add at least one name before checking out.", status: 400 };
  }

  let discountPercent = 0;
  let discountCode: string | undefined;
  if (input.discountCode) {
    const found = await getDiscountCode(input.discountCode);
    if (isDiscountUsable(found)) {
      discountPercent = found.percentOff;
      discountCode = found.code;
    } else {
      return { ok: false, error: "That discount code is not valid.", status: 400 };
    }
  }

  const priced = priceOrder({
    items: input.items,
    giftWrap: input.giftWrap,
    digitalFile: input.digitalFile,
    discountPercent,
  });

  if (priced.total <= 0) {
    return { ok: false, error: "That order came to nothing. Please try again.", status: 400 };
  }

  const order: NewOrder = {
    id: newId(),
    reference: newOrderReference(),
    chartId: chart.id,
    email: input.email.trim().toLowerCase(),
    status: "pending",
    fulfillmentStatus: "unfulfilled",
    items: { lines: priced.lines, addons: priced.addons },
    // Freeze the chart as it was bought. If the customer keeps editing the
    // draft afterwards, we still print — and can still prove — what they paid
    // for. Without this, an edit after purchase silently changes the artwork.
    chartSnapshot: { config: chart.config, people: chart.people },
    subtotal: priced.subtotal,
    discount: priced.discount,
    shipping: priced.shipping,
    tax: 0,
    total: priced.total,
    assumedCogs: priced.assumedCogs,
    discountCode: discountCode ?? null,
    utmSource: input.utmSource ?? null,
    utmMedium: input.utmMedium ?? null,
    utmCampaign: input.utmCampaign ?? null,
  };

  return {
    ok: true,
    prepared: {
      order,
      priced,
      chart: {
        id: chart.id,
        token: chart.token,
        config: chart.config,
        people: chart.people,
      },
    },
  };
}

/** Stripe line items built from our own priced result. */
export function toStripeLineItems(priced: PricedOrder, chartTitle: string) {
  const items = priced.lines.map((line) => ({
    quantity: 1,
    price_data: {
      currency: "usd",
      unit_amount: line.total,
      product_data: {
        name: `Family tree chart — ${line.label}`,
        description:
          [
            chartTitle || "Custom chart",
            line.discountPercent > 0 ? `${line.discountPercent}% additional-copy discount` : null,
          ]
            .filter(Boolean)
            .join(" · ")
            .slice(0, 240) || undefined,
      },
    },
  }));

  for (const addon of priced.addons) {
    if (addon.total <= 0) continue;
    items.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: addon.total,
        product_data: { name: addon.label, description: undefined },
      },
    });
  }

  if (priced.shipping > 0) {
    items.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: priced.shipping,
        product_data: { name: "Shipping", description: undefined },
      },
    });
  }

  return items;
}
