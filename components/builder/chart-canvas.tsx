"use client";

import { useMemo } from "react";

import { renderChartSVG } from "@/lib/chart/render-svg";
import type { ChartDocument } from "@/lib/chart/types";
import { countFilled } from "@/lib/chart/types";

/**
 * Live preview.
 *
 * The renderer is pure TypeScript with no Node dependencies, so the browser
 * runs the *same* code the press does. That means no preview endpoint, no
 * round-trip per keystroke, no image bill, and — the part that matters
 * commercially — no gap between what the customer approves and what arrives.
 */
export function ChartCanvas({
  doc,
  className = "",
}: {
  doc: ChartDocument;
  className?: string;
}) {
  const filled = countFilled(doc.people, doc.config.generations);

  const svg = useMemo(
    () => renderChartSVG(doc, { watermark: false }),
    [doc],
  );

  return (
    <figure className={className}>
      <div
        className="chart-frame ring-1 ring-rule"
        style={{ boxShadow: "0 18px 44px -30px rgb(35 32 27 / 0.5)" }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <figcaption className="sr-only">
        Live preview of your family tree chart, {filled} names entered.
      </figcaption>
      {filled === 0 ? (
        <p className="mt-3 text-center text-sm text-ink-muted">
          Start typing and your chart appears here.
        </p>
      ) : null}
    </figure>
  );
}
