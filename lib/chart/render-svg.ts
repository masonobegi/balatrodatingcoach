/**
 * SVG poster renderer.
 *
 * One renderer serves both the live preview in the builder and the print-ready
 * artwork sent to the fulfilment provider. That is deliberate: the customer is
 * approving the exact artefact that gets printed, which removes the entire
 * class of "it didn't look like that on screen" support tickets that plague
 * made-to-order print businesses.
 *
 * Coordinates are in hundredths of an inch, so an 18×24" poster is a
 * 1800×2400 viewBox. Working in real-world units means margins and type sizes
 * are specified the way a print designer would specify them, and the 300 DPI
 * raster step is a pure scale factor with no unit conversion to get wrong.
 */

import {
  type ChartDocument,
  PAPER_SIZES,
  countFilled,
} from "./types";
import { layoutFan, type FanLayout, type LabelBlock } from "./layout-fan";
import { layoutTree, type TreeLayout } from "./layout-tree";
import { getTheme, type Theme } from "./themes";
import { esc, fitFontSize, measureText } from "./text";

/** Units per inch. */
const U = 100;

export interface RenderOptions {
  /** Emit a diagonal watermark. Used for free/unpaid previews. */
  watermark?: boolean;
  /** Emit width/height attributes as well as a viewBox. */
  absoluteSize?: boolean;
}

/**
 * The poster typeface is self-hosted and pinned. The preview a customer
 * approves must be the artwork that goes to press, so falling back to whatever
 * serif the renderer happens to have is not acceptable — it changes the metrics
 * the layout was computed against. `assets/fonts/EBGaramond.ttf` is handed to
 * the rasteriser server-side and the same face is served to the browser from
 * /fonts. The fallbacks exist only for the moment before the webfont lands.
 */
const SERIF = "'EB Garamond',Garamond,'Palatino Linotype',Palatino,Georgia,serif";

export function renderChartSVG(doc: ChartDocument, opts: RenderOptions = {}): string {
  const { config, people } = doc;
  const paper = PAPER_SIZES[config.size] ?? PAPER_SIZES["18x24"];
  const theme = getTheme(config.theme);

  const W = paper.w * U;
  const H = paper.h * U;

  // Margins scale with the sheet, with a wider foot — the classical
  // proportion for a framed print, and it leaves room for the subtitle.
  const mx = W * 0.075;
  const mTop = H * 0.062;
  const mBottom = H * 0.085;

  const contentW = W - mx * 2;

  const hasTitle = Boolean(config.title.trim());
  const hasSubtitle = Boolean(config.subtitle.trim());

  const titleSize = fitFontSize(config.title, contentW * 0.94, W * 0.062, W * 0.03);
  const titleBlockH = hasTitle ? titleSize * 1.5 + H * 0.022 : 0;
  const subtitleSize = W * 0.021;
  const subtitleBlockH = hasSubtitle ? subtitleSize * 2.4 : 0;

  const chartTop = mTop + titleBlockH;
  const chartH = H - chartTop - mBottom - subtitleBlockH;

  const bodyLayout =
    config.style === "tree"
      ? layoutTree(config, people, { width: contentW, maxHeight: chartH })
      : layoutFan(config, people, { width: contentW, maxHeight: chartH });

  const body =
    bodyLayout.kind === "tree" ? renderTree(bodyLayout, theme) : renderFan(bodyLayout, theme);

  // Centre the drawn chart vertically inside its box.
  const bodyOffsetY = chartTop + Math.max(0, (chartH - bodyLayout.height) / 2);

  const parts: string[] = [];

  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}"` +
      (opts.absoluteSize ? ` width="${paper.w}in" height="${paper.h}in"` : "") +
      ` role="img" aria-label="${esc(chartAriaLabel(doc))}">`,
  );

  parts.push(`<rect width="${W}" height="${H}" fill="${theme.paper}"/>`);

  // A hairline keyline inset from the trim. Frames crop unpredictably, so it
  // sits well inside the safe area.
  const kx = mx * 0.52;
  parts.push(
    `<rect x="${kx}" y="${kx}" width="${W - kx * 2}" height="${H - kx * 2}" ` +
      `fill="none" stroke="${theme.rule}" stroke-width="${U * 0.012}"/>`,
  );

  if (hasTitle) {
    const y = mTop + titleSize;
    parts.push(
      `<text x="${W / 2}" y="${y}" text-anchor="middle" font-family="${SERIF}" ` +
        `font-size="${titleSize}" fill="${theme.ink}" letter-spacing="${titleSize * 0.012}">` +
        esc(config.title.trim()) +
        `</text>`,
    );
    const ruleY = y + titleSize * 0.52;
    const ruleW = Math.min(contentW * 0.34, measureText(config.title, titleSize) * 0.6);
    parts.push(
      `<line x1="${W / 2 - ruleW / 2}" y1="${ruleY}" x2="${W / 2 + ruleW / 2}" y2="${ruleY}" ` +
        `stroke="${theme.accent}" stroke-width="${U * 0.018}"/>`,
    );
  }

  parts.push(`<g transform="translate(${mx} ${bodyOffsetY})">${body}</g>`);

  if (hasSubtitle) {
    const y = H - mBottom + subtitleSize * 0.4;
    parts.push(
      `<text x="${W / 2}" y="${y}" text-anchor="middle" font-family="${SERIF}" ` +
        `font-size="${subtitleSize}" fill="${theme.muted}" ` +
        `letter-spacing="${subtitleSize * 0.14}">` +
        esc(config.subtitle.trim().toUpperCase()) +
        `</text>`,
    );
  }

  if (opts.watermark) parts.push(watermark(W, H, theme));

  parts.push("</svg>");
  return parts.join("");
}

function chartAriaLabel(doc: ChartDocument): string {
  const n = countFilled(doc.people, doc.config.generations);
  const title = doc.config.title.trim() || "Family tree chart";
  return `${title} — ${doc.config.style === "tree" ? "pedigree tree" : "fan chart"} showing ${n} ${
    n === 1 ? "person" : "people"
  } across ${doc.config.generations} generations`;
}

function watermark(W: number, H: number, theme: Theme): string {
  const size = W * 0.075;
  const rows: string[] = [];
  for (let i = -1; i < 6; i++) {
    rows.push(
      `<text x="${W / 2}" y="${(H / 5) * i + H * 0.18}" text-anchor="middle" ` +
        `font-family="${SERIF}" font-size="${size}" fill="${theme.ink}" ` +
        `opacity="0.11" letter-spacing="${size * 0.3}">KINLINE PREVIEW</text>`,
    );
  }
  return `<g transform="rotate(-28 ${W / 2} ${H / 2})" aria-hidden="true">${rows.join("")}</g>`;
}

// ---------------------------------------------------------------------------
// Fan
// ---------------------------------------------------------------------------

function renderFan(layout: FanLayout, theme: Theme): string {
  const out: string[] = [];
  const hair = layout.maxRadius * 0.0035;

  // Wedges first, then all text, so no fill ever paints over a name.
  for (const w of layout.wedges) {
    const fill = w.empty
      ? theme.fillEmpty
      : w.maternal
        ? theme.maternalTint
        : w.gen % 2 === 0
          ? theme.fillA
          : theme.fillB;
    out.push(
      `<path d="${w.d}" fill="${fill}" stroke="${theme.rule}" stroke-width="${hair}"/>`,
    );
  }

  // Root medallion.
  out.push(
    `<circle cx="${layout.cx}" cy="${layout.cy}" r="${layout.rootRadius}" ` +
      `fill="${theme.fillB}" stroke="${theme.accent}" stroke-width="${hair * 2.4}"/>`,
  );

  const defs: string[] = [];
  for (const label of layout.labels) {
    out.push(renderLabel(label, theme, defs));
  }

  return (defs.length ? `<defs>${defs.join("")}</defs>` : "") + out.join("");
}

function renderLabel(label: LabelBlock, theme: Theme, defs: string[]): string {
  const color = (role: "name" | "meta") => (role === "name" ? theme.ink : theme.muted);

  if (label.kind === "plain") {
    const lines = label.lines
      .map(
        (l) =>
          `<tspan x="${label.x}" dy="0" y="${label.y + l.dy}" font-size="${l.size}" ` +
          `fill="${color(l.role)}"${l.role === "meta" ? ` letter-spacing="${l.size * 0.06}"` : ""}>` +
          esc(l.text) +
          `</tspan>`,
      )
      .join("");
    return `<text text-anchor="middle" dominant-baseline="central" font-family="${SERIF}">${lines}</text>`;
  }

  if (label.kind === "radial") {
    const lines = label.lines
      .map(
        (l) =>
          `<tspan x="0" y="${l.dy}" font-size="${l.size}" fill="${color(l.role)}">` +
          esc(l.text) +
          `</tspan>`,
      )
      .join("");
    return (
      `<text transform="${label.transform}" text-anchor="${label.anchor}" ` +
      `dominant-baseline="central" font-family="${SERIF}">${lines}</text>`
    );
  }

  // Arc
  const out: string[] = [];
  for (const p of label.paths) {
    defs.push(`<path id="${p.id}" d="${p.d}" fill="none"/>`);
    out.push(
      `<text font-family="${SERIF}" font-size="${p.line.size}" fill="${color(p.line.role)}" ` +
        `dominant-baseline="central">` +
        `<textPath href="#${p.id}" startOffset="50%" text-anchor="middle">` +
        esc(p.line.text) +
        `</textPath></text>`,
    );
  }
  return out.join("");
}

// ---------------------------------------------------------------------------
// Tree
// ---------------------------------------------------------------------------

function renderTree(layout: TreeLayout, theme: Theme): string {
  const out: string[] = [];
  const hair = Math.max(1, layout.width * 0.0016);

  for (const c of layout.connectors) {
    out.push(
      `<path d="${c.d}" fill="none" stroke="${theme.rule}" stroke-width="${hair * 1.4}" ` +
        `stroke-linejoin="round"/>`,
    );
  }

  for (const cell of layout.cells) {
    const fill = cell.empty
      ? theme.fillEmpty
      : cell.maternal
        ? theme.maternalTint
        : theme.fillA;
    const stroke = cell.empty ? theme.rule : theme.accent;
    out.push(
      `<rect x="${cell.x}" y="${cell.y}" width="${cell.w}" height="${cell.h}" rx="${cell.h * 0.06}" ` +
        `fill="${fill}" stroke="${stroke}" stroke-width="${cell.empty ? hair : hair * 1.6}"/>`,
    );

    if (cell.empty) continue;

    const cx = cell.x + cell.w / 2;
    const cy = cell.y + cell.h / 2;
    const lines = cell.lines
      .map(
        (l) =>
          `<tspan x="${cx}" y="${cy + l.dy}" font-size="${l.size}" ` +
          `fill="${l.role === "name" ? theme.ink : theme.muted}"` +
          `${l.role === "meta" ? ` letter-spacing="${l.size * 0.06}"` : ""}>` +
          esc(l.text) +
          `</tspan>`,
      )
      .join("");
    out.push(
      `<text text-anchor="middle" dominant-baseline="central" font-family="${SERIF}">${lines}</text>`,
    );
  }

  return out.join("");
}
