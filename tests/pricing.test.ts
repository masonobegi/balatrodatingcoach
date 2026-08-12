import test from "node:test";
import assert from "node:assert/strict";

import {
  ASSUMED_SHIPPING_COST,
  FRAMING_ENABLED,
  FREE_SHIPPING_THRESHOLD,
  GIFT_WRAP_PRICE,
  PRINT_VARIANTS,
  SHIPPING_FLAT,
  cogsFor,
  discountForCopyIndex,
  formatMoney,
  grossProfit,
  isFramed,
  priceOrder,
  stripeFee,
  unitPriceFor,
} from "../lib/pricing.ts";

test("copy discounts follow the published ladder", () => {
  assert.equal(discountForCopyIndex(0), 0);
  assert.equal(discountForCopyIndex(1), 0.25);
  assert.equal(discountForCopyIndex(2), 0.35);
  assert.equal(discountForCopyIndex(9), 0.35, "the ladder plateaus rather than running to zero");
});

test("a single unframed print prices as published", () => {
  const p = priceOrder({ items: [{ size: "18x24", framed: false, quantity: 1 }], giftWrap: false, digitalFile: false });
  assert.equal(p.lines.length, 1);
  assert.equal(p.subtotal, 7900);
  assert.equal(p.shipping, 0, "18x24 clears the free-shipping threshold on its own");
  assert.equal(p.total, 7900);
});

test("the entry size does not clear free shipping but the mid size does", () => {
  const small = priceOrder({ items: [{ size: "12x18", framed: false, quantity: 1 }], giftWrap: false, digitalFile: false });
  assert.ok(small.subtotal < FREE_SHIPPING_THRESHOLD);
  assert.equal(small.shipping, SHIPPING_FLAT);
  assert.ok(small.freeShippingShortfall > 0);

  const mid = priceOrder({ items: [{ size: "18x24", framed: false, quantity: 1 }], giftWrap: false, digitalFile: false });
  assert.ok(mid.subtotal >= FREE_SHIPPING_THRESHOLD);
  assert.equal(mid.shipping, 0);
  assert.equal(mid.freeShippingShortfall, 0);
});

test("additional copies are discounted most-expensive-first", () => {
  // A cheap second copy must never cause the expensive first copy to be the
  // one discounted — that would quietly reduce revenue on every mixed order.
  const p = priceOrder({
    items: [
      { size: "12x18", framed: false, quantity: 1 },
      { size: "24x36", framed: false, quantity: 1 },
    ],
    giftWrap: false,
    digitalFile: false,
  });

  const full = p.lines.find((l) => l.discountPercent === 0);
  const discounted = p.lines.find((l) => l.discountPercent === 25);
  assert.equal(full?.size, "24x36", "the most expensive copy is charged in full");
  assert.equal(discounted?.size, "12x18");
  assert.equal(p.subtotal, 11900 + Math.round(4900 * 0.75));
});

test("three copies of the same chart apply both discount tiers", () => {
  const p = priceOrder({ items: [{ size: "18x24", framed: false, quantity: 3 }], giftWrap: false, digitalFile: false });
  assert.deepEqual(
    p.lines.map((l) => l.discountPercent),
    [0, 25, 35],
  );
  assert.equal(p.subtotal, 7900 + Math.round(7900 * 0.75) + Math.round(7900 * 0.65));
  assert.ok(p.total < 7900 * 3, "the family gets a real saving");
});

test("the digital file is never sold standalone and rides free with the largest size", () => {
  const withLarge = priceOrder({
    items: [{ size: "24x36", framed: false, quantity: 1 }],
    giftWrap: false,
    digitalFile: true,
  });
  const included = withLarge.addons.find((a) => /digital/i.test(a.label));
  assert.ok(included, "the digital file is listed");
  assert.equal(included.total, 0, "included free with 24x36");
  assert.equal(withLarge.subtotal, 11900, "and adds nothing to the price");

  const withSmall = priceOrder({
    items: [{ size: "12x18", framed: false, quantity: 1 }],
    giftWrap: false,
    digitalFile: true,
  });
  const charged = withSmall.addons.find((a) => /digital/i.test(a.label));
  assert.equal(charged?.total, 1500, "otherwise it is a paid add-on");
});

test("gift wrap is added and costed", () => {
  const bare = priceOrder({ items: [{ size: "18x24", framed: false, quantity: 1 }], giftWrap: false, digitalFile: false });
  const wrapped = priceOrder({ items: [{ size: "18x24", framed: false, quantity: 1 }], giftWrap: true, digitalFile: false });
  assert.equal(wrapped.subtotal - bare.subtotal, GIFT_WRAP_PRICE);
  assert.ok(wrapped.assumedCogs > bare.assumedCogs, "wrap has a real cost");
});

test("framing is disabled and cannot be re-enabled through the API", () => {
  // The flag is a commercial decision (see lib/pricing.ts). While it is off, a
  // framed request must be priced AND costed as unframed — a mismatch between
  // those two is how you sell a $79 print and pay $53 to make it.
  assert.equal(FRAMING_ENABLED, false);
  assert.equal(isFramed(true), false);

  const framed = priceOrder({ items: [{ size: "18x24", framed: true, quantity: 1 }], giftWrap: false, digitalFile: false });
  const unframed = priceOrder({ items: [{ size: "18x24", framed: false, quantity: 1 }], giftWrap: false, digitalFile: false });

  assert.equal(framed.total, unframed.total);
  assert.equal(framed.assumedCogs, unframed.assumedCogs);
  assert.equal(framed.lines[0]?.framed, false);
  assert.ok(!framed.lines[0]?.label.includes("framed"));
  assert.equal(unitPriceFor("18x24", true), PRINT_VARIANTS["18x24"].price);
  assert.equal(cogsFor("18x24", true), PRINT_VARIANTS["18x24"].assumedCogs);
});

test("discount codes apply before shipping is decided", () => {
  // A discount that drops the order under the threshold must also reinstate
  // the shipping charge, or a large enough code ships free at our expense.
  const p = priceOrder({
    items: [{ size: "18x24", framed: false, quantity: 1 }],
    giftWrap: false,
    digitalFile: false,
    discountPercent: 50,
  });
  assert.equal(p.discount, 3950);
  assert.equal(p.shipping, SHIPPING_FLAT, "50% off drops it below the free-shipping line");
  assert.equal(p.total, 3950 + SHIPPING_FLAT);
});

test("discount percentages are clamped to a sane range", () => {
  const over = priceOrder({ items: [{ size: "18x24", framed: false, quantity: 1 }], giftWrap: false, digitalFile: false, discountPercent: 999 });
  assert.equal(over.discount, 7900);
  assert.ok(over.total >= 0, "never negative");

  const under = priceOrder({ items: [{ size: "18x24", framed: false, quantity: 1 }], giftWrap: false, digitalFile: false, discountPercent: -50 });
  assert.equal(under.discount, 0);
});

test("quantities are bounded and non-positive quantities produce nothing", () => {
  const zero = priceOrder({ items: [{ size: "18x24", framed: false, quantity: 0 }], giftWrap: false, digitalFile: false });
  assert.equal(zero.lines.length, 0);
  assert.equal(zero.total, 0);
  assert.equal(zero.shipping, 0, "no physical goods means no shipping charge");

  const huge = priceOrder({ items: [{ size: "18x24", framed: false, quantity: 9999 }], giftWrap: false, digitalFile: false });
  assert.equal(huge.lines.length, 50, "capped so one request cannot mint an enormous order");
});

test("shipping cost is counted once per order, not once per copy", () => {
  const one = priceOrder({ items: [{ size: "18x24", framed: false, quantity: 1 }], giftWrap: false, digitalFile: false });
  const three = priceOrder({ items: [{ size: "18x24", framed: false, quantity: 3 }], giftWrap: false, digitalFile: false });

  const productCogs = PRINT_VARIANTS["18x24"].assumedCogs;
  assert.equal(one.assumedCogs, productCogs + ASSUMED_SHIPPING_COST);
  assert.equal(three.assumedCogs, productCogs * 3 + ASSUMED_SHIPPING_COST);
});

test("stripe fees match the published US card rate", () => {
  assert.equal(stripeFee(0), 0);
  assert.equal(stripeFee(10000), 320); // 2.9% + $0.30
  assert.equal(stripeFee(7900), Math.round(7900 * 0.029) + 30);
});

test("gross profit stays above the level that can fund acquisition", () => {
  // Break-even CAC was modelled at $49–64 (docs/03-unit-economics.md). A single
  // mid-size print must clear a meaningful share of that on its own.
  const p = priceOrder({ items: [{ size: "18x24", framed: false, quantity: 1 }], giftWrap: false, digitalFile: false });
  const profit = grossProfit(p);

  assert.ok(profit > 4000, `expected >$40 gross profit, got ${formatMoney(profit)}`);
  const marginPct = (profit / p.total) * 100;
  assert.ok(marginPct > 55, `expected >55% margin, got ${marginPct.toFixed(1)}%`);
});

test("a multi-copy order earns more absolute profit than a single", () => {
  const single = grossProfit(priceOrder({ items: [{ size: "18x24", framed: false, quantity: 1 }], giftWrap: false, digitalFile: false }));
  const triple = grossProfit(priceOrder({ items: [{ size: "18x24", framed: false, quantity: 3 }], giftWrap: false, digitalFile: false }));
  assert.ok(triple > single * 2, "the multi-copy lever is worth pulling even after discounts");
});

test("money formatting is exact at the cent", () => {
  assert.equal(formatMoney(0), "$0.00");
  assert.equal(formatMoney(7900), "$79.00");
  assert.equal(formatMoney(5925), "$59.25");
  assert.equal(formatMoney(1), "$0.01");
});
