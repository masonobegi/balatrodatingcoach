import { verifyArtworkSignature } from "@/lib/artwork";
import { getOrderByReference } from "@/lib/db/repo";
import { renderChartSVG } from "@/lib/chart/render-svg";
import { renderToPng } from "@/lib/render-png";
import { PAPER_SIZES, PRINT_DPI } from "@/lib/chart/types";
import { clientKey, rateLimit, tooManyRequests } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 120;

/**
 * Print-ready artwork for the fulfilment partner.
 *
 * Public but signed: the partner's servers fetch this from their own network,
 * so it cannot sit behind our admin session. The HMAC is bound to the order
 * reference, so a leaked URL exposes exactly one order's artwork.
 *
 * Renders from the order's frozen `chartSnapshot`, never from the live chart.
 * If the customer keeps editing their draft after buying — and they do — the
 * press must still receive the artwork they paid for.
 *
 * Never watermarked. This *is* the product.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ reference: string }> },
) {
  const limit = rateLimit(clientKey(request, "artwork"), 60, 60_000);
  if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

  const { reference } = await params;
  const signature = new URL(request.url).searchParams.get("sig") ?? "";

  if (!verifyArtworkSignature(reference, signature)) {
    return new Response("Not found", { status: 404 });
  }

  const order = await getOrderByReference(reference);
  if (!order) return new Response("Not found", { status: 404 });

  const snapshot = order.chartSnapshot;
  if (!snapshot) return new Response("No artwork on this order", { status: 409 });

  const svg = renderChartSVG(snapshot, { watermark: false, absoluteSize: true });

  const format = new URL(request.url).searchParams.get("format");
  if (format === "svg") {
    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Cache-Control": "private, max-age=3600",
      },
    });
  }

  const paper = PAPER_SIZES[snapshot.config.size];
  const png = await renderToPng(svg, paper.w * PRINT_DPI);
  if (!png) return new Response("Unable to render artwork", { status: 500 });

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `inline; filename="${reference}-${PRINT_DPI}dpi.png"`,
      // The snapshot is immutable, so this is safe to cache — and the partner
      // may fetch it more than once.
      "Cache-Control": "private, max-age=86400",
    },
  });
}
