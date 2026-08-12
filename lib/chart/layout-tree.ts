/**
 * Vertical pedigree ("tree") layout.
 *
 * Generations are rows, oldest at the top, narrowing to the root at the bottom
 * — the shape most people picture when they hear "family tree". Row g holds
 * 2^(g-1) cells at fixed positions, so, as with the fan, unknown ancestors
 * leave a quiet gap instead of reflowing the chart.
 *
 * The top row doubles in width with every generation, so this style stops
 * being legible on a poster past five generations (16 cells across a 24"
 * sheet is already tight). `MAX_TREE_GENERATIONS` enforces that, and the
 * builder steers customers to the fan when they want more depth.
 */

import {
  type ChartConfig,
  type PeopleMap,
  type Person,
  childOf,
  fullName,
  generationRange,
  isEmptyPerson,
  isMaternal,
  lifespan,
  slotsInGeneration,
} from "./types";
import { fitFontSize, fitName, truncate } from "./text";

export const MAX_TREE_GENERATIONS = 5;

export interface TreeCell {
  n: number;
  gen: number;
  x: number;
  y: number;
  w: number;
  h: number;
  maternal: boolean;
  empty: boolean;
  lines: { text: string; size: number; role: "name" | "meta"; dy: number }[];
}

export interface TreeConnector {
  /** Child Ahnentafel number the line descends to. */
  n: number;
  d: string;
}

export interface TreeLayout {
  kind: "tree";
  width: number;
  height: number;
  cells: TreeCell[];
  connectors: TreeConnector[];
}

export interface TreeOptions {
  width: number;
  maxHeight: number;
}

function fmt(n: number): string {
  return Number.isFinite(n) ? n.toFixed(2) : "0";
}

export function layoutTree(
  config: ChartConfig,
  people: PeopleMap,
  opts: TreeOptions,
): TreeLayout {
  const G = Math.min(config.generations, MAX_TREE_GENERATIONS);
  const widest = slotsInGeneration(G);

  const colGap = opts.width / widest * 0.16;
  const cellW = opts.width / widest - colGap;

  /*
   * A pyramid tree is inherently wide and short — the top row doubles with
   * every generation while the height stays fixed at G rows — so on a portrait
   * sheet the cells alone never fill the page. The row *gap* is what takes up
   * the slack, and long orthogonal connectors are a classical look rather than
   * a compromise. Cells therefore keep a sane card aspect, and the gap expands
   * to fill what remains, bounded so the generations never look disconnected.
   */
  const cellH = Math.min(cellW * 0.75, opts.maxHeight / (G * 1.9));
  const slack = G > 1 ? (opts.maxHeight - G * cellH) / (G - 1) : 0;
  const rowGap = Math.max(cellH * 0.5, Math.min(cellH * 2.4, slack));
  const pitch = cellH + rowGap;
  const height = G * cellH + (G - 1) * rowGap;

  const cells: TreeCell[] = [];
  const byNumber = new Map<number, TreeCell>();

  for (let g = 1; g <= G; g++) {
    const [first] = generationRange(g);
    const slots = slotsInGeneration(g);
    const rowIndex = G - g; // generation G is the top row
    const y = rowIndex * pitch;
    const colSpan = opts.width / slots;

    for (let i = 0; i < slots; i++) {
      const n = first + i;
      const person = people[n];
      const empty = isEmptyPerson(person);
      const cx = (i + 0.5) * colSpan;
      const w = Math.min(cellW, colSpan * 0.9);
      const x = cx - w / 2;

      const cell: TreeCell = {
        n, gen: g, x, y, w, h: cellH,
        maternal: isMaternal(n),
        empty,
        lines: empty || !person ? [] : cellLines(person, w, cellH, config),
      };
      cells.push(cell);
      byNumber.set(n, cell);
    }
  }

  // Connectors: an elbow from the top edge of each child to the bottom edge of
  // each known parent. Drawn child-up so a missing parent simply has no line.
  const connectors: TreeConnector[] = [];
  for (const cell of cells) {
    if (cell.gen === 1) continue;
    const child = byNumber.get(childOf(cell.n));
    if (!child) continue;
    if (cell.empty && child.empty) continue;

    const px = cell.x + cell.w / 2;
    const py = cell.y + cell.h; // bottom of the parent cell
    const kx = child.x + child.w / 2;
    const ky = child.y; // top of the child cell
    const midY = (py + ky) / 2;

    connectors.push({
      n: cell.n,
      d: `M ${fmt(px)} ${fmt(py)} L ${fmt(px)} ${fmt(midY)} L ${fmt(kx)} ${fmt(midY)} L ${fmt(kx)} ${fmt(ky)}`,
    });
  }

  return { kind: "tree", width: opts.width, height, cells, connectors };
}

function cellLines(
  person: Person, w: number, h: number, config: ChartConfig,
): TreeCell["lines"] {
  const inner = w * 0.88;

  // Size from the *actual* name rather than from a guessed character count.
  // A fixed width fraction sets type for the worst case every time, so short
  // names come out needlessly small — and most names are short.
  const lineCount = 1 + (config.showDates ? 1 : 0) + (config.showPlaces && person.place ? 1 : 0);
  const ceiling = Math.min(h / (lineCount * 1.5), inner * 0.16);
  const preferred = fitName({ given: person.given, surname: person.surname }, inner, ceiling);
  const nameSize = fitFontSize(preferred, inner, ceiling, ceiling * 0.6);
  const metaSize = nameSize * 0.7;

  const out: TreeCell["lines"] = [
    {
      text: fitName({ given: person.given, surname: person.surname }, inner, nameSize),
      size: nameSize,
      role: "name",
      dy: 0,
    },
  ];

  const meta = config.showDates ? lifespan(person) : "";
  if (meta) out.push({ text: meta, size: metaSize, role: "meta", dy: 0 });

  const place =
    config.showPlaces && person.place ? truncate(person.place, inner, metaSize) : "";
  if (place) out.push({ text: place, size: metaSize, role: "meta", dy: 0 });

  const lineH = nameSize * 1.22;
  const span = (out.length - 1) * lineH;
  out.forEach((l, i) => { l.dy = i * lineH - span / 2; });
  return out;
}

/** Exported for tests. */
export const _internal = { cellLines, fullName };
