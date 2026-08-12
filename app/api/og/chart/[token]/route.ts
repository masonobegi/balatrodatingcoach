import { getChartByToken } from "@/lib/db/repo";
import { renderChartSVG } from "@/lib/chart/render-svg";
import { getTheme } from "@/lib/chart/themes";
import { renderToPng } from "@/lib/render-png";
import { esc } from "@/lib/chart/text";
import { countFilled } from "@/lib/chart/types";

export const runtime = "nodejs";

/**
 * Open Graph card for a shared chart.
 *
 * Shared links land in group chats and Facebook, where the preview card is most
 * of the click decision — and a card showing the *actual family chart* is a far
 * stronger invitation than a logo. We compose a 1200×630 landscape card around
 * the real artwork rather than cropping the portrait poster, which would cut
 * the outer generations off.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const chart = await getChartByToken(token);
  if (!chart) return new Response("Not found", { status: 404 });

  const theme = getTheme(chart.config.theme);
  const title = chart.config.title.trim() || "A family tree chart";
  const filled = countFilled(chart.people, chart.config.generations);

  // The poster, minus its own titling — the card supplies that.
  const inner = renderChartSVG(
    { config: { ...chart.config, title: "", subtitle: "" }, people: chart.people },
    { watermark: false },
  );
  const innerBody = inner.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "");
  const viewBox = /viewBox="([^"]+)"/.exec(inner)?.[1] ?? "0 0 1800 2400";
  const [, , vbW = "1800", vbH = "2400"] = viewBox.split(/\s+/);

  // Fit the portrait artwork into the right-hand half of the card.
  const targetH = 560;
  const scale = targetH / Number(vbH);
  const drawnW = Number(vbW) * scale;

  const card = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="${theme.paper}"/>
<g transform="translate(${1200 - drawnW - 60} 35) scale(${scale})">${innerBody}</g>
<text x="70" y="250" font-family="EB Garamond, Georgia, serif" font-size="62" fill="${theme.ink}">${esc(
    title.slice(0, 28),
  )}</text>
<line x1="70" y1="292" x2="230" y2="292" stroke="${theme.accent}" stroke-width="4"/>
<text x="70" y="345" font-family="EB Garamond, Georgia, serif" font-size="30" fill="${theme.muted}">${filled} ${
    filled === 1 ? "name" : "names"
  } · ${chart.config.generations} generations</text>
<text x="70" y="565" font-family="EB Garamond, Georgia, serif" font-size="26" fill="${theme.muted}" letter-spacing="4">KINLINE</text>
</svg>`;

  const png = await renderToPng(card, 1200);
  if (!png) return new Response("Unable to render", { status: 500 });

  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      // Charts are edited, so this must not be cached forever — but a share
      // card being a few minutes stale is fine and saves the render.
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
