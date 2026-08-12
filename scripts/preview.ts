/**
 * Renders sample charts to PNG so the layout engine can be inspected by eye.
 * Development aid only — nothing in the app imports this.
 *
 *   npx tsx scripts/preview.ts [outDir]
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";
import { resolve } from "node:path";

import { DEFAULT_CONFIG, type ChartDocument, type PeopleMap, totalSlots } from "../lib/chart/types.ts";
import { renderChartSVG } from "../lib/chart/render-svg.ts";

const OUT = process.argv[2] ?? "/tmp/kinline-preview";
mkdirSync(OUT, { recursive: true });

const SURNAMES = [
  "Doyle", "Vance", "O'Donnell", "Marchetti", "Whitfield", "Okonkwo",
  "Lindqvist", "Ferreira", "Nakamura", "Abernathy", "Ó Braonáin", "Castellanos",
];
const GIVENS = [
  "Margaret", "John Henry", "Aoife", "Bartholomew", "Li Wei", "Anne-Marie",
  "Ptolemy", "Rose", "Ezekiel", "Ingrid", "Máire", "Constance",
];

function people(count: number, sparse = false): PeopleMap {
  const out: PeopleMap = {};
  for (let n = 1; n <= count; n++) {
    // Leave realistic holes — real families always have them.
    if (sparse && n > 3 && n % 5 === 0) continue;
    out[n] = {
      given: GIVENS[n % GIVENS.length] ?? "Pat",
      surname: SURNAMES[n % SURNAMES.length] ?? "Smith",
      birthYear: String(1782 + n * 4),
      deathYear: n % 3 === 0 ? String(1849 + n * 4) : undefined,
      place: "Cork, Ireland",
    };
  }
  return out;
}

const CASES: { name: string; doc: ChartDocument }[] = [
  {
    name: "fan-4gen-heirloom-18x24",
    doc: {
      config: { ...DEFAULT_CONFIG, style: "fan", generations: 4, size: "18x24",
        theme: "heirloom", title: "The Doyle Family", subtitle: "Christmas 2026" },
      people: people(totalSlots(4)),
    },
  },
  {
    name: "fan-5gen-sparse-botanical",
    doc: {
      config: { ...DEFAULT_CONFIG, style: "fan", generations: 5, size: "18x24",
        theme: "botanical", title: "Ancestors of Margaret Doyle", subtitle: "Cork · Ireland" },
      people: people(totalSlots(5), true),
    },
  },
  {
    name: "fan-6gen-midnight-24x36",
    doc: {
      config: { ...DEFAULT_CONFIG, style: "fan", generations: 6, size: "24x36",
        theme: "midnight", title: "Six Generations", subtitle: "For Nana, on her 80th" },
      people: people(totalSlots(6)),
    },
  },
  {
    name: "fan-7gen-slate-24x36",
    doc: {
      config: { ...DEFAULT_CONFIG, style: "fan", generations: 7, size: "24x36",
        theme: "slate", title: "The Whitfield Line", subtitle: "1782 – 2026", showDates: true },
      people: people(totalSlots(7)),
    },
  },
  {
    name: "tree-4gen-heirloom-18x24",
    doc: {
      config: { ...DEFAULT_CONFIG, style: "tree", generations: 4, size: "18x24",
        theme: "heirloom", title: "The Vance Family", subtitle: "Est. 1804" },
      people: people(totalSlots(4)),
    },
  },
  {
    name: "tree-3gen-slate-12x18",
    doc: {
      config: { ...DEFAULT_CONFIG, style: "tree", generations: 3, size: "12x18",
        theme: "slate", title: "Our Family", subtitle: "" },
      people: people(totalSlots(3)),
    },
  },
];

for (const c of CASES) {
  const svg = renderChartSVG(c.doc);
  writeFileSync(`${OUT}/${c.name}.svg`, svg);
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: 900 },
    font: {
      fontFiles: [resolve(process.cwd(), "assets/fonts/EBGaramond.ttf")],
      loadSystemFonts: false,
      defaultFontFamily: "EB Garamond",
    },
  })
    .render()
    .asPng();
  writeFileSync(`${OUT}/${c.name}.png`, png);
  console.log(`${c.name}  svg=${(svg.length / 1024).toFixed(1)}kb  png=${(png.length / 1024).toFixed(0)}kb`);
}

console.log(`\nWrote ${CASES.length} previews to ${OUT}`);
