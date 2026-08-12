"use client";

import { useMemo, useState } from "react";

import type { PaperSize } from "@/lib/chart/types";
import { PAPER_SIZES } from "@/lib/chart/types";
import {
  FREE_SHIPPING_THRESHOLD,
  GIFT_WRAP_PRICE,
  PRINT_VARIANTS,
  formatMoney,
  formatMoneyShort,
  priceOrder,
} from "@/lib/pricing";
import { track } from "@/lib/analytics";

/**
 * Checkout.
 *
 * One page, no account, no multi-step wizard. Address and card are collected by
 * Stripe Checkout, which removes a form we would otherwise have to build,
 * secure, and keep PCI-compliant — and which customers already recognise.
 *
 * Prices are computed here for display and independently recomputed on the
 * server from the chart id. Anything this component sends about money is
 * advisory.
 */
export function CheckoutForm({
  chartId,
  defaultSize,
  cancelled,
}: {
  chartId: string;
  defaultSize: PaperSize;
  cancelled: boolean;
}) {
  const [size, setSize] = useState<PaperSize>(defaultSize);
  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const priced = useMemo(
    () => priceOrder({ items: [{ size, framed: false, quantity }], giftWrap, digitalFile: false }),
    [size, quantity, giftWrap],
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chartId,
          items: [{ size, framed: false, quantity }],
          giftWrap,
          digitalFile: false,
          email,
          discountCode: code.trim() || undefined,
        }),
      });

      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !json.url) {
        setError(json.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      track("checkout_started", { chartId, value: priced.total, props: { size, quantity } });
      window.location.href = json.url;
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-7">
      {cancelled ? (
        <p className="card border-walnut/40 bg-paper-deep p-4 text-sm">
          No payment was taken. Your chart is exactly as you left it.
        </p>
      ) : null}

      <section>
        <h2 className="label mb-3">Size</h2>
        <div className="grid gap-2">
          {Object.values(PRINT_VARIANTS).map((v) => (
            <label
              key={v.size}
              className={`flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 transition-colors ${
                size === v.size ? "border-ink bg-paper-deep" : "border-rule hover:border-rule-strong"
              }`}
            >
              <input
                type="radio"
                name="size"
                className="sr-only"
                checked={size === v.size}
                onChange={() => setSize(v.size)}
              />
              <span className="flex-1">
                <span className="block font-display text-lg">{PAPER_SIZES[v.size].label}</span>
                <span className="block text-sm text-ink-muted">{v.blurb}</span>
              </span>
              <span className="font-display text-xl">{formatMoneyShort(v.price)}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <h2 className="label mb-3">How many copies?</h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn btn-secondary !px-4"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Fewer copies"
          >
            −
          </button>
          <span className="w-10 text-center font-display text-2xl" aria-live="polite">
            {quantity}
          </span>
          <button
            type="button"
            className="btn btn-secondary !px-4"
            onClick={() => setQuantity((q) => Math.min(20, q + 1))}
            aria-label="More copies"
          >
            +
          </button>
          <p className="ml-2 text-sm text-ink-muted">
            Second copy 25% off, third onwards 35% off.
          </p>
        </div>
      </section>

      <section>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={giftWrap}
            onChange={(e) => setGiftWrap(e.target.checked)}
            className="mt-1 h-4 w-4 accent-[var(--color-walnut)]"
          />
          <span>
            <span className="block text-[0.9375rem] font-semibold">
              Gift wrap and a handwritten card — {formatMoneyShort(GIFT_WRAP_PRICE)}
            </span>
            <span className="block text-sm text-ink-muted">
              Wrapped in tissue and tied, with a card we write by hand. Tell us what to
              write after checkout.
            </span>
          </span>
        </label>
      </section>

      <section className="space-y-3">
        <div>
          <label htmlFor="email" className="label mb-1.5 block">
            Email for your receipt
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            className="field"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <details>
          <summary className="cursor-pointer text-sm text-ink-muted">
            Have a discount code?
          </summary>
          <input
            className="field mt-2"
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            aria-label="Discount code"
          />
        </details>
      </section>

      <section className="card p-5">
        <dl className="space-y-1.5 text-sm">
          {priced.lines.map((l, i) => (
            <div key={i} className="flex justify-between">
              <dt className="text-ink-soft">
                {l.label}
                {l.discountPercent > 0 ? (
                  <span className="text-walnut"> −{l.discountPercent}%</span>
                ) : null}
              </dt>
              <dd>{formatMoney(l.total)}</dd>
            </div>
          ))}
          {priced.addons.map((a, i) => (
            <div key={i} className="flex justify-between text-ink-muted">
              <dt>{a.label}</dt>
              <dd>{a.total === 0 ? "Included" : formatMoney(a.total)}</dd>
            </div>
          ))}
          <div className="flex justify-between text-ink-muted">
            <dt>Shipping</dt>
            <dd>{priced.shipping === 0 ? "Free" : formatMoney(priced.shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-rule pt-2.5 text-base font-semibold">
            <dt>Total</dt>
            <dd>{formatMoney(priced.total)}</dd>
          </div>
        </dl>

        {priced.freeShippingShortfall > 0 ? (
          <p className="mt-3 text-sm text-walnut">
            {formatMoney(priced.freeShippingShortfall)} more for free shipping.
          </p>
        ) : null}

        <p className="mt-2 text-xs text-ink-muted">
          Sales tax, if any, is calculated at payment.
        </p>
      </section>

      {error ? (
        <p role="alert" className="rounded-sm border border-danger/40 bg-danger/5 p-3 text-sm text-danger">
          {error}
        </p>
      ) : null}

      <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
        {submitting ? "Taking you to payment…" : `Pay ${formatMoney(priced.total)}`}
      </button>

      <p className="text-center text-xs text-ink-muted">
        Card details are handled by Stripe. We never see them.
      </p>
    </form>
  );
}
