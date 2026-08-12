/**
 * Fan chart layout.
 *
 * The fan is the signature piece: the root person sits in a central medallion
 * and each generation is a concentric ring, subdivided into 2^(g-1) equal
 * wedges. Ancestor `n` always occupies the same wedge whether or not we know
 * who they were, so gaps in the family read as quiet empty cells rather than
 * as a broken layout. This is the single most important property of the
 * design — real families are full of holes, and a layout that reflows around
 * them looks wrong to the person who knows the family.
 *
 * ANGLE CONVENTION (used consistently across this file):
 *   θ is measured in degrees from 12 o'clock, increasing clockwise.
 *   point(r, θ) = (cx + r·sin θ, cy − r·cos θ)
 * Screen y grows downward, so increasing θ is a clockwise sweep and SVG arcs
 * from θ₁ → θ₂ (θ₂ > θ₁) take sweep-flag 1.
 */

import {
  type ChartConfig,
  type PeopleMap,
  type Person,
  fullName,
  generationRange,
  isEmptyPerson,
  isMaternal,
  lifespan,
  slotsInGeneration,
} from "./types";
import { fitFontSize, fitName, measureText, truncate, wrapText } from "./text";

export interface Wedge {
  n: number;
  gen: number;
  d: string;
  maternal: boolean;
  empty: boolean;
}

export interface TextLine {
  text: string;
  size: number;
  role: "name" | "meta";
  /** Offset along the reading direction's perpendicular, from the block centre. */
  dy: number;
}

export interface RadialLabel {
  kind: "radial";
  n: number;
  transform: string;
  lines: TextLine[];
  anchor: "start" | "middle";
}

export interface ArcLabel {
  kind: "arc";
  n: number;
  /** One path per line, since each line sits at its own radius. */
  paths: { id: string; d: string; line: TextLine }[];
}

export interface PlainLabel {
  kind: "plain";
  n: number;
  x: number;
  y: number;
  lines: TextLine[];
}

export type LabelBlock = RadialLabel | ArcLabel | PlainLabel;

export interface FanLayout {
  kind: "fan";
  width: number;
  height: number;
  cx: number;
  cy: number;
  rootRadius: number;
  maxRadius: number;
  wedges: Wedge[];
  labels: LabelBlock[];
}

const DEG = Math.PI / 180;

function point(cx: number, cy: number, r: number, deg: number): [number, number] {
  const t = deg * DEG;
  return [cx + r * Math.sin(t), cy - r * Math.cos(t)];
}

function fmt(n: number): string {
  return Number.isFinite(n) ? n.toFixed(2) : "0";
}

/** Annular wedge between two radii and two angles. */
function wedgePath(
  cx: number, cy: number,
  rInner: number, rOuter: number,
  a1: number, a2: number,
): string {
  const large = Math.abs(a2 - a1) > 180 ? 1 : 0;

  // A full ring has no wedge boundaries; emit two half-annuli instead so the
  // path closes cleanly rather than degenerating to a zero-length arc.
  if (Math.abs(a2 - a1) >= 359.999) {
    const [ox1, oy1] = point(cx, cy, rOuter, 0);
    const [ox2, oy2] = point(cx, cy, rOuter, 180);
    const [ix1, iy1] = point(cx, cy, rInner, 0);
    const [ix2, iy2] = point(cx, cy, rInner, 180);
    return [
      `M ${fmt(ox1)} ${fmt(oy1)}`,
      `A ${fmt(rOuter)} ${fmt(rOuter)} 0 1 1 ${fmt(ox2)} ${fmt(oy2)}`,
      `A ${fmt(rOuter)} ${fmt(rOuter)} 0 1 1 ${fmt(ox1)} ${fmt(oy1)}`,
      `M ${fmt(ix1)} ${fmt(iy1)}`,
      `A ${fmt(rInner)} ${fmt(rInner)} 0 1 0 ${fmt(ix2)} ${fmt(iy2)}`,
      `A ${fmt(rInner)} ${fmt(rInner)} 0 1 0 ${fmt(ix1)} ${fmt(iy1)}`,
      "Z",
    ].join(" ");
  }

  const [x1, y1] = point(cx, cy, rInner, a1);
  const [x2, y2] = point(cx, cy, rInner, a2);
  const [x3, y3] = point(cx, cy, rOuter, a2);
  const [x4, y4] = point(cx, cy, rOuter, a1);

  return [
    `M ${fmt(x1)} ${fmt(y1)}`,
    `A ${fmt(rInner)} ${fmt(rInner)} 0 ${large} 1 ${fmt(x2)} ${fmt(y2)}`,
    `L ${fmt(x3)} ${fmt(y3)}`,
    `A ${fmt(rOuter)} ${fmt(rOuter)} 0 ${large} 0 ${fmt(x4)} ${fmt(y4)}`,
    "Z",
  ].join(" ");
}

/** Arc path at a fixed radius, direction chosen so text is never upside down. */
function arcPath(
  cx: number, cy: number, r: number, a1: number, a2: number,
): string {
  const mid = (a1 + a2) / 2;
  const norm = ((mid % 360) + 360) % 360;
  // Between 4 and 8 o'clock, a left-to-right arc would render text inverted.
  const flip = norm > 90 && norm < 270;
  const [from, to] = flip ? [a2, a1] : [a1, a2];
  const [x1, y1] = point(cx, cy, r, from);
  const [x2, y2] = point(cx, cy, r, to);
  const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
  const sweep = flip ? 0 : 1;
  return `M ${fmt(x1)} ${fmt(y1)} A ${fmt(r)} ${fmt(r)} 0 ${large} ${sweep} ${fmt(x2)} ${fmt(y2)}`;
}

/**
 * Sweep angle. Classic fan charts use clean fractions of a circle — a half,
 * three-quarter, or full round — and anything between reads as a mistake, so
 * those are the only three candidates.
 *
 * The choice is driven by how much of the sheet the fan fills. A 180° fan is
 * twice as wide as it is tall, which on a portrait poster leaves roughly half
 * the sheet empty; the fan cannot grow to fill it because it is already
 * width-bound. Opening the sweep is the only way to use that height. We take
 * the *smallest* sweep that fills enough of the sheet, because a half fan is
 * the most classical of the three and gives each wedge the most room.
 */
const SWEEP_CANDIDATES = [180, 270, 360] as const;
const TARGET_FILL = 0.72;

/** Vertical extent of a fan of this sweep, as a multiple of its radius. */
function verticalExtent(sweep: number): number {
  if (sweep >= 360) return 2;
  if (sweep <= 180) return 1;
  return 1 + Math.abs(Math.cos((sweep / 2) * DEG));
}

/** Deeper charts need more sweep or the outer wedges become unreadable slivers. */
function minimumSweep(generations: number): number {
  if (generations <= 5) return 180;
  if (generations === 6) return 270;
  return 360;
}

export function sweepForGenerations(generations: number): number {
  return minimumSweep(generations);
}

export function chooseSweep(generations: number, boxW: number, boxH: number): number {
  const floor = minimumSweep(generations);
  const options = SWEEP_CANDIDATES.filter((s) => s >= floor);
  const widthBoundRadius = boxW / 2;

  for (const sweep of options) {
    const r = Math.min(widthBoundRadius, boxH / verticalExtent(sweep));
    const height = verticalExtent(sweep) * r;
    if (height >= TARGET_FILL * boxH) return sweep;
  }
  return options[options.length - 1] ?? 360;
}

/**
 * Ring thickness multiplier.
 *
 * Rings are near-uniform, with only a slight taper. An earlier version tapered
 * hard, which was exactly backwards: the outer rings are the ones that fall
 * back to *radial* text, and radial text is bounded by ring thickness rather
 * than by arc length. Thinning them starved the labels that had least room.
 */
function ringWeight(gen: number): number {
  return Math.max(0.92, 1.04 - 0.02 * gen);
}

export interface FanOptions {
  /** Width of the drawable area. Height is derived from the sweep. */
  width: number;
  maxHeight: number;
}

export function layoutFan(
  config: ChartConfig,
  people: PeopleMap,
  opts: FanOptions,
): FanLayout {
  const G = config.generations;
  const sweep = chooseSweep(G, opts.width, opts.maxHeight);
  const a0 = -sweep / 2;

  // Relative ring geometry, normalised so the outermost radius is 1.
  const weights: number[] = [];
  for (let g = 2; g <= G; g++) weights.push(ringWeight(g));
  const rootWeight = 1.15;
  const totalWeight = rootWeight + weights.reduce((a, b) => a + b, 0);

  // Fit the fan into the available box. A 180° fan is twice as wide as it is
  // tall; a 360° fan is square.
  const boxW = opts.width;
  const boxH = opts.maxHeight;
  const halfSweep = sweep / 2;
  // Extents as multiples of maxRadius. Any sweep of 180° or more spans the
  // full diameter horizontally.
  const xExtent = sweep >= 180 ? 2 : 2 * Math.sin(halfSweep * DEG);
  const yExtent = verticalExtent(sweep);

  const maxRadius = Math.min(boxW / xExtent, boxH / yExtent);
  const unit = maxRadius / totalWeight;
  const rootRadius = rootWeight * unit;

  const radii: number[] = [rootRadius];
  for (const w of weights) {
    const prev = radii[radii.length - 1] ?? 0;
    radii.push(prev + w * unit);
  }

  const cx = boxW / 2;
  // The fan's bounding box always starts one radius above the centre, whatever
  // the sweep — for a half fan that puts the root on the bottom edge, for a
  // full round it puts it in the middle.
  const cy = maxRadius;

  const width = boxW;
  const height = yExtent * maxRadius;

  const wedges: Wedge[] = [];
  const labels: LabelBlock[] = [];

  // ---- Root medallion -----------------------------------------------------
  const root = people[1];
  if (!isEmptyPerson(root) && root) {
    labels.push(rootLabel(root, cx, cy, rootRadius, config));
  }

  // ---- Generation rings ---------------------------------------------------
  for (let g = 2; g <= G; g++) {
    const [first] = generationRange(g);
    const slots = slotsInGeneration(g);
    const sliceAngle = sweep / slots;
    const rInner = radii[g - 2] ?? 0;
    const rOuter = radii[g - 1] ?? 0;
    const thickness = rOuter - rInner;
    const rMid = (rInner + rOuter) / 2;
    const arcLen = sliceAngle * DEG * rMid;

    // Tangential text reads better when the wedge is much wider than it is
    // deep; radial text wins on the narrow outer rings.
    const useArc = arcLen > thickness * 2.2;

    for (let i = 0; i < slots; i++) {
      const n = first + i;
      const a1 = a0 + i * sliceAngle;
      const a2 = a1 + sliceAngle;
      const person = people[n];
      const empty = isEmptyPerson(person);

      wedges.push({
        n, gen: g, maternal: isMaternal(n), empty,
        d: wedgePath(cx, cy, rInner, rOuter, a1, a2),
      });

      if (empty || !person) continue;

      labels.push(
        useArc
          ? arcLabel(person, n, cx, cy, rInner, rOuter, a1, a2, sliceAngle, config)
          : radialLabel(person, n, cx, cy, rInner, rOuter, a1, a2, config),
      );
    }
  }

  return { kind: "fan", width, height, cx, cy, rootRadius, maxRadius, wedges, labels };
}

// ---------------------------------------------------------------------------

function rootLabel(
  person: Person, cx: number, cy: number, r: number, config: ChartConfig,
): PlainLabel {
  const inner = r * 1.62; // usable chord across the medallion
  const nameSize = fitFontSize(fullName(person), inner, r * 0.34, r * 0.15);
  const nameLines = wrapText(fullName(person), inner, nameSize, 2);
  const metaSize = nameSize * 0.62;

  const lines: TextLine[] = [];
  const meta = config.showDates ? lifespan(person) : "";
  const place = config.showPlaces && person.place ? truncate(person.place, inner, metaSize) : "";
  const metaCount = (meta ? 1 : 0) + (place ? 1 : 0);
  const totalLines = nameLines.length + metaCount;
  const lineH = nameSize * 1.16;
  let cursor = -((totalLines - 1) * lineH) / 2;

  for (const t of nameLines) {
    lines.push({ text: t, size: nameSize, role: "name", dy: cursor });
    cursor += lineH;
  }
  if (meta) {
    lines.push({ text: meta, size: metaSize, role: "meta", dy: cursor + nameSize * 0.1 });
    cursor += lineH * 0.85;
  }
  if (place) {
    lines.push({ text: place, size: metaSize, role: "meta", dy: cursor + nameSize * 0.1 });
  }

  return { kind: "plain", n: 1, x: cx, y: cy, lines };
}

function buildLines(
  person: Person, maxWidth: number, nameSize: number, config: ChartConfig,
): TextLine[] {
  const metaSize = nameSize * 0.66;
  const name = fitName({ given: person.given, surname: person.surname }, maxWidth, nameSize);
  const meta = config.showDates ? lifespan(person) : "";
  const place =
    config.showPlaces && person.place ? truncate(person.place, maxWidth, metaSize) : "";

  const out: TextLine[] = [{ text: name, size: nameSize, role: "name", dy: 0 }];
  if (meta) out.push({ text: meta, size: metaSize, role: "meta", dy: 0 });
  if (place) out.push({ text: place, size: metaSize, role: "meta", dy: 0 });

  // Centre the block on dy = 0.
  const lineH = nameSize * 1.02;
  const span = (out.length - 1) * lineH;
  out.forEach((l, i) => { l.dy = i * lineH - span / 2; });
  return out;
}

function radialLabel(
  person: Person, n: number,
  cx: number, cy: number,
  rInner: number, rOuter: number,
  a1: number, a2: number,
  config: ChartConfig,
): RadialLabel {
  const mid = (a1 + a2) / 2;
  const norm = ((mid % 360) + 360) % 360;
  // Text running outward inverts on the left half of the fan.
  const flip = norm > 180;

  const pad = (rOuter - rInner) * 0.08;
  const usable = rOuter - rInner - pad * 2;
  const arcAt = (deg: number, r: number) => deg * DEG * r;
  // Perpendicular room is the arc length at the inner radius — the tightest
  // point of the wedge, and the one a stacked label block has to clear.
  const perp = arcAt(a2 - a1, rInner) * 0.86;

  // Two competing bounds: the label block must fit across the ring (usable)
  // and its stacked lines must fit within the wedge's narrow end (perp).
  const lineCount = 1 + (config.showDates ? 1 : 0) + (config.showPlaces && person.place ? 1 : 0);
  const nameSize = Math.min(usable * 0.3, (perp / Math.max(1, lineCount)) * 0.78);
  const lines = buildLines(person, usable, nameSize, config);

  const startR = flip ? rOuter - pad : rInner + pad;
  const [x, y] = point(cx, cy, startR, mid);
  const rot = flip ? mid + 90 : mid - 90;

  return {
    kind: "radial", n, anchor: "start",
    transform: `translate(${fmt(x)} ${fmt(y)}) rotate(${fmt(rot)})`,
    lines,
  };
}

function arcLabel(
  person: Person, n: number,
  cx: number, cy: number,
  rInner: number, rOuter: number,
  a1: number, a2: number,
  sliceAngle: number,
  config: ChartConfig,
): ArcLabel {
  const thickness = rOuter - rInner;
  const rMid = (rInner + rOuter) / 2;
  const chord = sliceAngle * DEG * rMid * 0.88;

  const lineCount = 1 + (config.showDates ? 1 : 0) + (config.showPlaces && person.place ? 1 : 0);
  // Arc labels stack radially, so the ring thickness bounds the whole block.
  const nameSize = Math.min((thickness / Math.max(1, lineCount)) * 0.62, chord * 0.16);
  const lines = buildLines(person, chord, nameSize, config);

  // Lines stack radially outward from the wedge centre.
  const lineH = nameSize * 1.16;
  const span = (lines.length - 1) * lineH;

  const paths = lines.map((line, i) => {
    // Radially, later lines sit closer to the outer edge. Text sits *on* the
    // baseline path, so nudge outward by roughly the cap height.
    const r = rMid - span / 2 + i * lineH + line.size * 0.34;
    return {
      id: `a${n}_${i}`,
      d: arcPath(cx, cy, r, a1, a2),
      line: { ...line, dy: 0 },
    };
  });

  return { kind: "arc", n, paths };
}

/** Exported for tests. */
export const _internal = { wedgePath, arcPath, point, measureText };
