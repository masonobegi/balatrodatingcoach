import { getChartByToken } from "@/lib/db/repo";
import { renderChartSVG } from "@/lib/chart/render-svg";
import { renderToPng } from "@/lib/render-png";
import { PAPER_SIZES, PRINT_DPI } from "@/lib/chart/types";
import { clientKey, rateLimit, tooManyRequests } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Print-ready artwork.
 *
 * `?format=svg` returns vector, which is what a print provider should ideally
 * receive. `?format=png` rasterises at 300 DPI — a 24×36" sheet is 7200×10800
 * pixels, which is why this route carries an extended duration.
 *
 * Unwatermarked artwork is the product, so this is gated: only an admin session
 * may pull a clean full-resolution file. Everyone else gets a watermark. The
 * gate is deliberately not "is this chart paid for", because the same endpoint
 * serves the founder placing an order by hand.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const limit = rateLimit(clientKey(request, "render"), 30, 60_000);
  if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

  const { token } = await params;
  const chart = await getChartByToken(token);
  if (!chart) return new Response("Not found", { status: 404 });

  const url = new URL(request.url);
  const format = url.searchParams.get("format") === "png" ? "png" : "svg";

  const { isAdminRequest } = await import("@/lib/admin-auth");
  const admin = await isAdminRequest();

  const svg = renderChartSVG(
    { config: chart.config, people: chart.people },
    { watermark: !admin, absoluteSize: true },
  );

  const filename = `kinline-${chart.config.size}-${token.slice(0, 8)}`;

  if (format === "svg") {
    return new Response(svg, {
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Content-Disposition": `inline; filename="${filename}.svg"`,
        "Cache-Control": "private, no-store",
      },
    });
  }

  const paper = PAPER_SIZES[chart.config.size];
  const widthPx = paper.w * PRINT_DPI;

  const png = await renderToPng(svg, widthPx);
  if (!png) return new Response("Unable to render artwork", { status: 500 });

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="${filename}-${PRINT_DPI}dpi.png"`,
      "Cache-Control": "private, no-store",
    },
  });
}
