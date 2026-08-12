import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * SVG → PNG rasterisation.
 *
 * The poster typeface is passed in explicitly and system fonts are switched
 * off. That is the whole point: the customer approved a preview rendered in EB
 * Garamond, and a rasteriser silently substituting DejaVu because the font was
 * not found would change every glyph width the layout was computed against.
 * Better to fail loudly than to print the wrong thing.
 *
 * resvg is a native module. It is loaded lazily so that a platform without a
 * matching binary degrades to "no PNG" rather than crashing the whole route —
 * the storefront itself never needs rasterisation, only share cards and
 * print-ready artwork do.
 */

/**
 * The font must be on disk in the serverless bundle, which is why
 * next.config.ts declares `outputFileTracingIncludes` for the routes that
 * rasterise — Next cannot infer a runtime file read.
 */
const FONT_PATH = join(process.cwd(), "assets/fonts/EBGaramond.ttf");

export async function renderToPng(svg: string, widthPx: number): Promise<Buffer | null> {
  if (!existsSync(FONT_PATH)) {
    console.error(`[render-png] poster font missing at ${FONT_PATH}`);
    return null;
  }

  try {
    const { Resvg } = await import("@resvg/resvg-js");
    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: Math.round(widthPx) },
      font: {
        fontFiles: [FONT_PATH],
        loadSystemFonts: false,
        defaultFontFamily: "EB Garamond",
      },
    });
    return Buffer.from(resvg.render().asPng());
  } catch (error) {
    console.error("[render-png] rasterisation failed", error);
    return null;
  }
}
