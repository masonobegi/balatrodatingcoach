import { renderChartSVG } from "@/lib/chart/render-svg";
import { sampleChart } from "@/lib/chart/sample";
import { getTheme } from "@/lib/chart/themes";
import { renderToPng } from "@/lib/render-png";
import { SITE } from "@/lib/site";
import { esc } from "@/lib/chart/text";

export const runtime = "nodejs";
// The card never changes, so let the CDN keep it.
export const revalidate = 86400;

/** The default social card: the brand, and an actual chart. */
export async function GET() {
  const theme = getTheme("heirloom");
  const doc = sampleChart({ title: "", subtitle: "", generations: 4 });

  const inner = renderChartSVG(doc);
  const innerBody = inner.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  const viewBox = /viewBox="([^"]+)"/.exec(inner)?.[1] ?? "0 0 1800 2400";
  const [, , vbW = "1800", vbH = "2400"] = viewBox.split(/\s+/);

  const targetH = 590;
  const scale = targetH / Number(vbH);
  const drawnW = Number(vbW) * scale;

  const card = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="${theme.paper}"/>
<g transform="translate(${1200 - drawnW - 70} 20) scale(${scale})">${innerBody}</g>
<text x="80" y="235" font-family="EB Garamond, Georgia, serif" font-size="78" fill="${theme.ink}">${esc(SITE.name)}</text>
<line x1="80" y1="280" x2="240" y2="280" stroke="${theme.accent}" stroke-width="5"/>
<text x="80" y="345" font-family="EB Garamond, Georgia, serif" font-size="34" fill="${theme.ink}">Your family tree,</text>
<text x="80" y="390" font-family="EB Garamond, Georgia, serif" font-size="34" fill="${theme.ink}">drawn properly.</text>
<text x="80" y="470" font-family="EB Garamond, Georgia, serif" font-size="25" fill="${theme.muted}">Built in five minutes · Printed on archival paper</text>
</svg>`;

  const png = await renderToPng(card, 1200);
  if (!png) return new Response("Unable to render", { status: 500 });

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, immutable",
    },
  });
}
