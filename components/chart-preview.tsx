import { renderChartSVG } from "@/lib/chart/render-svg";
import type { ChartDocument } from "@/lib/chart/types";

/**
 * Renders a chart inline as SVG.
 *
 * The markup comes from our own renderer, which XML-escapes every piece of
 * customer text (see lib/chart/text.ts `esc`), so `dangerouslySetInnerHTML` is
 * carrying generated output rather than user input. Inlining rather than using
 * an <img> matters: it is the same code path the press gets, so the preview is
 * the product, and it stays crisp at any size with no image bill.
 */
export function ChartPreview({
  doc,
  watermark = false,
  className = "",
  shadow = true,
}: {
  doc: ChartDocument;
  watermark?: boolean;
  className?: string;
  shadow?: boolean;
}) {
  const svg = renderChartSVG(doc, { watermark });

  return (
    <div
      className={`chart-frame ${shadow ? "ring-1 ring-rule" : ""} ${className}`}
      style={
        shadow
          ? { boxShadow: "0 18px 44px -28px rgb(35 32 27 / 0.45)" }
          : undefined
      }
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
