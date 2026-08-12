/**
 * Catalogue and price computation. Money is in integer cents everywhere.
 *
 * Two rules here are commercial decisions, not implementation details, and
 * both trace to docs/00-decision-brief.md:
 *
 *  1. The high-resolution digital file is NOT a standalone product. A
 *     print-ready file *is* the poster, so selling it cheaply alongside the
 *     print destroys the reason to buy the print. It exists only as a
 *     post-purchase add-on and as a sweetener bundled with the largest size.
 *
 *  2. Additional copies of the *same* chart are steeply discounted. One family
 *     tree serves a whole family, and the share-link loop is expected to bring
 *     siblings and cousins to the same artefact. Multi-copy orders are the
 *     primary lever on average order value.
 */

import { PAPER_SIZES, type PaperSize } from "./chart/types";

export const CURRENCY = "usd";

export interface PrintVariant {
  size: PaperSize;
  label: string;
  /** Unframed price, cents. */
  price: number;
  framedPrice: number;
  /** Modelled cost of goods — UNVERIFIED, see docs/03-unit-economics.md. */
  assumedCogs: number;
  assumedFramedCogs: number;
  blurb: string;
}

/**
 * FRAMING IS OFF AT LAUNCH. This is a commercial decision, not a stub.
 *
 * Research recovered third-party audits of Prodigi's real costs: fine-art
 * paper runs A3 €7 / A2 €10 / A1 €14, but a *framed* A2 lands near €48 — €38
 * of which is the frame — and one audit recorded $23.07 of shipping on a single
 * mug. Glazed, heavy goods are where print-on-demand margin dies, and they add
 * breakage, replacement, and return cost on top.
 *
 * Run the two side by side at 18×24:
 *   unframed $79  − COGS ~$11 − ship ~$10 − fees ~$2.60  ≈ $55  (70%)
 *   framed  $129  − COGS ~$53 − ship ~$20 − fees ~$4.00  ≈ $52  (40%)
 *
 * Framed earns *less absolute profit* on a much larger, more fragile parcel.
 * Selling it at launch would import the worst operational risk in the category
 * in exchange for nothing. Customers are pointed at standard frame sizes
 * instead, which they can buy locally for $20.
 *
 * Every framed code path below is live and tested. Flip this flag once real
 * delivered framed cost is confirmed under ~$45 — see docs/03-unit-economics.md.
 */
export const FRAMING_ENABLED = false;

export const PRINT_VARIANTS: Record<PaperSize, PrintVariant> = {
  "12x18": {
    size: "12x18",
    label: PAPER_SIZES["12x18"].label,
    price: 4900,
    framedPrice: 11400,
    // ≈ A3 fine-art paper, €7 ex-tax. [ASSUMPTION — medium confidence]
    assumedCogs: 800,
    assumedFramedCogs: 4200,
    blurb: "Good for a desk, a hallway, or a shelf lean. Up to four generations reads comfortably.",
  },
  "18x24": {
    size: "18x24",
    label: PAPER_SIZES["18x24"].label,
    price: 7900,
    framedPrice: 14400,
    // ≈ A2 fine-art paper, €10 ex-tax. [ASSUMPTION — medium confidence]
    assumedCogs: 1100,
    assumedFramedCogs: 5300,
    blurb: "The one most people choose. Five generations stays perfectly legible at arm's length.",
  },
  "24x36": {
    size: "24x36",
    label: PAPER_SIZES["24x36"].label,
    price: 11900,
    framedPrice: 18400,
    // ≈ A1 fine-art paper, €14 ex-tax. [ASSUMPTION — medium confidence]
    assumedCogs: 1550,
    assumedFramedCogs: 7500,
    blurb: "A statement piece. The only size that carries seven generations, and it includes the digital file.",
  },
};

export const FRAME_UPCHARGE = 6500;

/**
 * GIFT WRAP IS OFF, and for a structural reason rather than a pricing one.
 *
 * Wrapping a print and writing a card by hand requires the parcel to route
 * through the operator: lab → operator → wrap → re-ship. That is inventory,
 * storage, labour, and a second shipping leg, and it breaks the one property
 * that makes this business runnable by one person with no space — nothing
 * physical ever touches them.
 *
 * The gifting need it was meant to serve is already met, and met better, by the
 * chart's own subtitle line: "For Nana, Christmas 2026" is printed *into* the
 * artwork, costs nothing, ships direct, and outlives any card.
 *
 * Re-enable only with a fulfilment partner that inserts a printed gift note at
 * the lab. Never by handling parcels yourself.
 */
export const GIFT_WRAP_ENABLED = false;
export const GIFT_WRAP_PRICE = 800;

export const DIGITAL_FILE_PRICE = 1500;

/**
 * Free shipping sits just under the 18×24 price, so the mid size — the one we
 * want people to choose — always clears it while the entry size does not.
 */
export const FREE_SHIPPING_THRESHOLD = 7500;
export const SHIPPING_FLAT = 700;
/**
 * Modelled outbound shipping for a rolled print in a tube. [ASSUMPTION]
 * Glazed/framed parcels cost materially more, which is part of why framing is
 * off at launch.
 */
export const ASSUMED_SHIPPING_COST = 1000;
export const ASSUMED_FRAMED_SHIPPING_COST = 2000;

/** Volume discount on additional copies of the same chart. */
export const COPY_DISCOUNTS = [0, 0.25, 0.35] as const;

export function discountForCopyIndex(index: number): number {
  if (index <= 0) return 0;
  if (index === 1) return COPY_DISCOUNTS[1];
  return COPY_DISCOUNTS[2];
}

export interface LineItemSpec {
  size: PaperSize;
  framed: boolean;
  quantity: number;
}

export interface OrderSpec {
  items: LineItemSpec[];
  giftWrap: boolean;
  digitalFile: boolean;
  /** Validated discount code percentage, 0–100. */
  discountPercent?: number;
}

export interface PricedLine {
  size: PaperSize;
  framed: boolean;
  label: string;
  unitPrice: number;
  copyIndex: number;
  discountPercent: number;
  total: number;
}

export interface PricedOrder {
  lines: PricedLine[];
  addons: { label: string; total: number }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  /** Modelled COGS for margin reporting in the admin dashboard. */
  assumedCogs: number;
  freeShippingShortfall: number;
}

/** Framed selections are ignored while framing is disabled. */
export function isFramed(requested: boolean): boolean {
  return FRAMING_ENABLED && requested;
}

export function unitPriceFor(size: PaperSize, framed: boolean): number {
  const v = PRINT_VARIANTS[size];
  return isFramed(framed) ? v.framedPrice : v.price;
}

export function cogsFor(size: PaperSize, framed: boolean): number {
  const v = PRINT_VARIANTS[size];
  return isFramed(framed) ? v.assumedFramedCogs : v.assumedCogs;
}

export function shippingCostFor(framed: boolean): number {
  return isFramed(framed) ? ASSUMED_FRAMED_SHIPPING_COST : ASSUMED_SHIPPING_COST;
}

/**
 * Copies are discounted most-expensive-first, so a customer adding a cheap
 * second copy never sees their expensive first copy silently discounted
 * instead. That ordering is also the one that maximises perceived value.
 */
export function priceOrder(spec: OrderSpec): PricedOrder {
  const expanded: { size: PaperSize; framed: boolean }[] = [];
  for (const item of spec.items) {
    const qty = Math.max(0, Math.min(50, Math.floor(item.quantity)));
    // Normalise once, here, so a framed request submitted directly to the API
    // while framing is disabled cannot be priced as unframed but fulfilled as
    // framed — or vice versa.
    const framed = isFramed(item.framed);
    for (let i = 0; i < qty; i++) expanded.push({ size: item.size, framed });
  }

  expanded.sort((a, b) => unitPriceFor(b.size, b.framed) - unitPriceFor(a.size, a.framed));

  const lines: PricedLine[] = [];
  let subtotal = 0;
  let assumedCogs = 0;

  expanded.forEach((item, index) => {
    const unitPrice = unitPriceFor(item.size, item.framed);
    const pct = discountForCopyIndex(index);
    const total = Math.round(unitPrice * (1 - pct));
    subtotal += total;
    assumedCogs += cogsFor(item.size, item.framed);
    lines.push({
      size: item.size,
      framed: item.framed,
      label: `${PRINT_VARIANTS[item.size].label}${item.framed ? ", framed" : ""}`,
      unitPrice,
      copyIndex: index,
      discountPercent: Math.round(pct * 100),
      total,
    });
  });

  const addons: { label: string; total: number }[] = [];
  // Normalised here, like framing, so a request made directly to the API while
  // the add-on is disabled cannot be charged for something nobody will do.
  if (spec.giftWrap && GIFT_WRAP_ENABLED) {
    addons.push({ label: "Gift wrap & handwritten card", total: GIFT_WRAP_PRICE });
    subtotal += GIFT_WRAP_PRICE;
    assumedCogs += 250;
  }

  // The digital file rides along free with the largest size.
  const includesDigital = expanded.some((i) => i.size === "24x36");
  if (spec.digitalFile && !includesDigital) {
    addons.push({ label: "High-resolution digital file", total: DIGITAL_FILE_PRICE });
    subtotal += DIGITAL_FILE_PRICE;
  } else if (includesDigital) {
    addons.push({ label: "High-resolution digital file (included)", total: 0 });
  }

  const discountPercent = Math.max(0, Math.min(100, spec.discountPercent ?? 0));
  const discount = Math.round(subtotal * (discountPercent / 100));
  const afterDiscount = subtotal - discount;

  const hasPhysical = expanded.length > 0;
  const shipping =
    !hasPhysical || afterDiscount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  // One parcel per order — copies of the same chart ship together, which is
  // part of why multi-copy orders carry such good margin.
  if (hasPhysical) {
    assumedCogs += shippingCostFor(expanded.some((i) => i.framed));
  }

  return {
    lines,
    addons,
    subtotal,
    discount,
    shipping,
    total: afterDiscount + shipping,
    assumedCogs,
    freeShippingShortfall: Math.max(0, FREE_SHIPPING_THRESHOLD - afterDiscount),
  };
}

/** Stripe's published US card rate. */
export function stripeFee(totalCents: number): number {
  if (totalCents <= 0) return 0;
  return Math.round(totalCents * 0.029) + 30;
}

export function grossProfit(order: PricedOrder): number {
  return order.total - order.assumedCogs - stripeFee(order.total);
}

export function formatMoney(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function formatMoneyShort(cents: number): string {
  return cents % 100 === 0 ? `$${cents / 100}` : formatMoney(cents);
}
