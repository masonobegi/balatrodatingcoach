/**
 * Text measurement and graceful degradation for chart labels.
 *
 * The renderer runs server-side and emits SVG, so there is no canvas and no
 * browser font metrics. Rather than estimate, the advance widths in
 * ./font-metrics.ts are *measured* off the actual poster typeface by
 * scripts/calibrate-widths.ts. Measurement matters here: the first, guessed
 * table was ~20% too wide across the lowercase range, which silently shrank
 * every name on every chart to buy clearance that was never needed.
 *
 * Kerning and ligatures are still unmodelled, so real rendered text runs
 * fractionally narrower than predicted. That is the safe direction — the error
 * buys clearance rather than spending it — and consumers leave headroom on top.
 */

import { DEFAULT_W, W } from "./font-metrics";

/** Width of `text` at `fontSize`, in the same units as fontSize. */
export function measureText(text: string, fontSize: number): number {
  let em = 0;
  for (const ch of text) em += W[ch] ?? DEFAULT_W;
  return em * fontSize;
}

/** Largest font size at which `text` fits within `maxWidth`, capped at `max`. */
export function fitFontSize(text: string, maxWidth: number, max: number, min: number): number {
  if (!text) return max;
  const at1 = measureText(text, 1);
  if (at1 === 0) return max;
  return Math.max(min, Math.min(max, maxWidth / at1));
}

export interface NameParts {
  given: string;
  surname: string;
}

/**
 * Progressively abbreviate a name until it fits, in the order a typographer
 * would: drop middle names, then initialise the given name, then truncate the
 * surname. We never truncate the surname before initialising the given name —
 * on an ancestor chart the surname is the load-bearing information.
 */
export function fitName(parts: NameParts, maxWidth: number, fontSize: number): string {
  const given = parts.given.trim();
  const surname = parts.surname.trim();

  const candidates: string[] = [];
  const push = (s: string) => {
    const t = s.trim().replace(/\s+/g, " ");
    if (t && !candidates.includes(t)) candidates.push(t);
  };

  push([given, surname].filter(Boolean).join(" "));

  // Drop middle names: "Mary Ellen Ruth" -> "Mary"
  const givenTokens = given.split(/\s+/).filter(Boolean);
  if (givenTokens.length > 1) {
    push([givenTokens[0], surname].filter(Boolean).join(" "));
  }

  // Initialise the given name: "Margaret" -> "M."
  if (givenTokens.length > 0 && givenTokens[0]) {
    push([`${givenTokens[0][0]}.`, surname].filter(Boolean).join(" "));
  }

  // Surname alone.
  if (surname) push(surname);

  for (const c of candidates) {
    if (measureText(c, fontSize) <= maxWidth) return c;
  }

  // Everything overflows — hard-truncate the last candidate with an ellipsis.
  const last = candidates[candidates.length - 1] ?? "";
  return truncate(last, maxWidth, fontSize);
}

/**
 * Fit a name by shrinking the type before sacrificing any of it.
 *
 * `fitName` alone abbreviates at a fixed size, which produces a perverse
 * result: remove the dates from a chart, the name size grows to fill the freed
 * space, and a name that previously fitted whole is now abbreviated at the
 * larger size. More room, less name.
 *
 * A reader would rather see "Thomas O'Connell" slightly smaller than
 * "T. O'Connell" slightly larger, so size gives way first. Abbreviation only
 * begins once the full name would need to drop below `minSize`, where it would
 * start to look like a mistake next to its neighbours.
 */
export function fitNameAdaptive(
  parts: NameParts,
  maxWidth: number,
  preferredSize: number,
  minSize: number,
): { text: string; size: number } {
  const full = [parts.given.trim(), parts.surname.trim()].filter(Boolean).join(" ");
  if (!full) return { text: "", size: preferredSize };

  const widthAtOne = measureText(full, 1);
  if (widthAtOne <= 0) return { text: full, size: preferredSize };

  const sizeThatFits = maxWidth / widthAtOne;
  if (sizeThatFits >= preferredSize) return { text: full, size: preferredSize };
  if (sizeThatFits >= minSize) return { text: full, size: sizeThatFits };

  return { text: fitName(parts, maxWidth, preferredSize), size: preferredSize };
}

export function truncate(text: string, maxWidth: number, fontSize: number): string {
  if (measureText(text, fontSize) <= maxWidth) return text;
  const ellipsis = "…";
  const ellipsisW = measureText(ellipsis, fontSize);
  let out = "";
  let w = 0;
  for (const ch of text) {
    const cw = (W[ch] ?? DEFAULT_W) * fontSize;
    if (w + cw + ellipsisW > maxWidth) break;
    out += ch;
    w += cw;
  }
  return out ? out.trimEnd() + ellipsis : "";
}

/** Greedy word wrap to at most `maxLines`; the last line is ellipsised. */
export function wrapText(
  text: string,
  maxWidth: number,
  fontSize: number,
  maxLines: number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const attempt = line ? `${line} ${word}` : word;
    if (measureText(attempt, fontSize) <= maxWidth) {
      line = attempt;
      continue;
    }
    if (line) lines.push(line);
    line = word;
    if (lines.length === maxLines - 1) break;
  }
  if (line && lines.length < maxLines) lines.push(line);

  if (lines.length === maxLines) {
    const consumed = lines.join(" ").split(/\s+/).length;
    if (consumed < words.length) {
      const lastIdx = lines.length - 1;
      const lastLine = lines[lastIdx];
      if (lastLine !== undefined) {
        lines[lastIdx] = truncate(`${lastLine}…`, maxWidth, fontSize);
      }
    }
  }
  return lines;
}

/** XML-escape for safe interpolation into SVG text nodes. */
export function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
