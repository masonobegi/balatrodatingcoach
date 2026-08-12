import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_CONFIG,
  type ChartDocument,
  type PeopleMap,
  childOf,
  countFilled,
  fatherOf,
  generationOf,
  lifespan,
  motherOf,
  slotsInGeneration,
  totalSlots,
} from "../lib/chart/types.ts";
import { fitName, measureText, truncate, wrapText } from "../lib/chart/text.ts";
import { layoutFan, sweepForGenerations } from "../lib/chart/layout-fan.ts";
import { layoutTree, MAX_TREE_GENERATIONS } from "../lib/chart/layout-tree.ts";
import { renderChartSVG } from "../lib/chart/render-svg.ts";
import { buildAncestry, parseGedcom, suggestRoots } from "../lib/chart/gedcom.ts";

// ---------------------------------------------------------------------------
// Ahnentafel arithmetic
// ---------------------------------------------------------------------------

test("ahnentafel numbering is internally consistent", () => {
  assert.equal(fatherOf(1), 2);
  assert.equal(motherOf(1), 3);
  assert.equal(childOf(2), 1);
  assert.equal(childOf(3), 1);
  assert.equal(childOf(7), 3);

  for (let n = 1; n < 200; n++) {
    assert.equal(childOf(fatherOf(n)), n, `father round-trip for ${n}`);
    assert.equal(childOf(motherOf(n)), n, `mother round-trip for ${n}`);
  }

  assert.equal(generationOf(1), 1);
  assert.equal(generationOf(2), 2);
  assert.equal(generationOf(3), 2);
  assert.equal(generationOf(4), 3);
  assert.equal(generationOf(15), 4);
  assert.equal(slotsInGeneration(4), 8);
  assert.equal(totalSlots(4), 15);
  assert.equal(totalSlots(7), 127);
});

// ---------------------------------------------------------------------------
// Text fitting
// ---------------------------------------------------------------------------

test("fitName degrades in the right order and never overflows", () => {
  const parts = { given: "Margaret Elizabeth", surname: "Vanderbilt" };
  const size = 10;

  const wide = fitName(parts, 1000, size);
  assert.equal(wide, "Margaret Elizabeth Vanderbilt");

  // Middle name is the first thing to go.
  const medium = fitName(parts, measureText("Margaret Vanderbilt", size) + 1, size);
  assert.equal(medium, "Margaret Vanderbilt");

  // Then the given name is initialised — surname survives longest, because on
  // an ancestor chart the surname is the load-bearing information.
  const narrow = fitName(parts, measureText("M. Vanderbilt", size) + 1, size);
  assert.equal(narrow, "M. Vanderbilt");

  // Every result must actually fit the box it was given.
  for (const w of [40, 60, 80, 120, 200, 400]) {
    const out = fitName(parts, w, size);
    assert.ok(
      measureText(out, size) <= w + 0.01,
      `"${out}" (${measureText(out, size).toFixed(1)}) should fit ${w}`,
    );
  }
});

test("truncate and wrapText respect their bounds", () => {
  const size = 10;
  const t = truncate("Wolfeschlegelsteinhausenbergerdorff", 60, size);
  assert.ok(measureText(t, size) <= 60.01);
  assert.ok(t.endsWith("…"));

  const lines = wrapText("Cork Ireland and then some more places", 60, size, 2);
  assert.ok(lines.length <= 2);
  for (const l of lines) assert.ok(measureText(l, size) <= 60.01, `line "${l}" fits`);
});

test("measureText is monotonic and zero for empty input", () => {
  assert.equal(measureText("", 12), 0);
  assert.ok(measureText("mm", 12) > measureText("ii", 12));
  assert.ok(measureText("abc", 24) > measureText("abc", 12));
});

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function samplePeople(count: number): PeopleMap {
  const surnames = ["Doyle", "Vance", "O'Donnell", "Marchetti", "Whitfield", "Ó Braonáin"];
  const givens = ["Margaret", "John Henry", "Aoife", "Bartholomew", "Li", "Anne-Marie"];
  const people: PeopleMap = {};
  for (let n = 1; n <= count; n++) {
    people[n] = {
      given: givens[n % givens.length] ?? "Pat",
      surname: surnames[n % surnames.length] ?? "Smith",
      birthYear: String(1780 + n * 3),
      deathYear: String(1840 + n * 3),
      place: "Cork, Ireland",
    };
  }
  return people;
}

function doc(overrides: Partial<ChartDocument["config"]>, count: number): ChartDocument {
  const config = { ...DEFAULT_CONFIG, ...overrides };
  return { config, people: samplePeople(count) };
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

test("fan layout produces one wedge per non-root slot at every depth", () => {
  for (let g = 3; g <= 7; g++) {
    const d = doc({ generations: g }, totalSlots(g));
    const layout = layoutFan(d.config, d.people, { width: 1000, maxHeight: 1400 });
    assert.equal(
      layout.wedges.length,
      totalSlots(g) - 1,
      `generation depth ${g} should yield ${totalSlots(g) - 1} wedges`,
    );
    // Root label plus one label per filled non-root slot.
    assert.equal(layout.labels.length, totalSlots(g));
    assert.ok(layout.maxRadius > 0);
    assert.ok(layout.height > 0 && layout.height <= 1400.01);
  }
});

test("fan layout leaves gaps for unknown ancestors rather than reflowing", () => {
  const d = doc({ generations: 4 }, 15);
  delete d.people[11];
  delete d.people[12];
  const layout = layoutFan(d.config, d.people, { width: 1000, maxHeight: 1400 });

  assert.equal(layout.wedges.length, 14, "wedge count is fixed by depth, not by data");
  const empties = layout.wedges.filter((w) => w.empty).map((w) => w.n).sort((a, b) => a - b);
  assert.deepEqual(empties, [11, 12]);
  // No label is emitted for an empty slot.
  assert.ok(!layout.labels.some((l) => l.n === 11 || l.n === 12));
});

test("fan sweep widens with depth and every path is finite", () => {
  assert.equal(sweepForGenerations(4), 180);
  assert.equal(sweepForGenerations(5), 180);
  assert.equal(sweepForGenerations(6), 270);
  assert.equal(sweepForGenerations(7), 360);

  const d = doc({ generations: 7 }, totalSlots(7));
  const layout = layoutFan(d.config, d.people, { width: 2200, maxHeight: 2800 });
  for (const w of layout.wedges) {
    assert.ok(!/NaN|Infinity|undefined/.test(w.d), `wedge ${w.n} path is finite: ${w.d}`);
  }
});

test("tree layout caps depth and connects every child to known parents", () => {
  const d = doc({ style: "tree", generations: 7 }, totalSlots(7));
  const layout = layoutTree(d.config, d.people, { width: 1000, maxHeight: 1400 });

  assert.equal(
    layout.cells.length,
    totalSlots(MAX_TREE_GENERATIONS),
    "tree depth is capped for legibility",
  );
  // Every non-root cell gets a connector down to its child.
  assert.equal(layout.connectors.length, totalSlots(MAX_TREE_GENERATIONS) - 1);
  for (const c of layout.connectors) {
    assert.ok(!/NaN|Infinity/.test(c.d), `connector ${c.n} path is finite`);
  }
  for (const cell of layout.cells) {
    assert.ok(cell.w > 0 && cell.h > 0, `cell ${cell.n} has positive size`);
    assert.ok(cell.x >= -0.01 && cell.x + cell.w <= 1000.01, `cell ${cell.n} stays in bounds`);
  }
});

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

test("renders well-formed SVG for every style, size, theme and depth", () => {
  const sizes = ["12x18", "18x24", "24x36"] as const;
  const themes = ["heirloom", "midnight", "botanical", "slate"] as const;

  for (const style of ["fan", "tree"] as const) {
    for (const size of sizes) {
      for (const theme of themes) {
        for (const generations of [3, 5, 7]) {
          const d = doc(
            { style, size, theme, generations, title: "The Doyle Family", subtitle: "Christmas 2026" },
            totalSlots(generations),
          );
          const svg = renderChartSVG(d);

          assert.ok(svg.startsWith("<svg "), "starts with an svg element");
          assert.ok(svg.endsWith("</svg>"), "is closed");
          assert.ok(!/NaN|Infinity|undefined|null/.test(svg), `${style}/${size}/${theme}/${generations} has no bad numbers`);
          // Balanced tags for the elements we generate.
          for (const tag of ["text", "g", "defs", "textPath"]) {
            const open = (svg.match(new RegExp(`<${tag}[\\s>]`, "g")) || []).length;
            const close = (svg.match(new RegExp(`</${tag}>`, "g")) || []).length;
            assert.equal(open, close, `<${tag}> balanced in ${style}/${generations}`);
          }
        }
      }
    }
  }
});

test("escapes XML metacharacters in customer-supplied text", () => {
  const d = doc({ title: `Smith & Sons <script>alert("x")</script>` }, 3);
  d.people[1] = { given: `Ma"rk & <b>`, surname: "O'Hara" };
  const svg = renderChartSVG(d);

  assert.ok(!svg.includes("<script>"), "no raw script tag survives");
  assert.ok(svg.includes("&amp;"), "ampersands are escaped");
  assert.ok(svg.includes("&lt;"), "angle brackets are escaped");
  assert.ok(!/<b>/.test(svg), "no injected markup");
});

test("watermark appears only when asked for", () => {
  const d = doc({}, 7);
  assert.ok(!renderChartSVG(d).includes("KINLINE PREVIEW"));
  assert.ok(renderChartSVG(d, { watermark: true }).includes("KINLINE PREVIEW"));
});

test("renders an entirely empty chart without throwing", () => {
  const empty: ChartDocument = { config: { ...DEFAULT_CONFIG }, people: {} };
  const svg = renderChartSVG(empty);
  assert.ok(svg.startsWith("<svg "));
  assert.ok(!/NaN/.test(svg));
  assert.equal(countFilled(empty.people, 4), 0);
});

// ---------------------------------------------------------------------------
// GEDCOM
// ---------------------------------------------------------------------------

const GEDCOM_FIXTURE = `0 HEAD
1 SOUR Ancestry.com
1 GEDC
2 VERS 5.5.1
0 @I1@ INDI
1 NAME Margaret Anne /Doyle/
1 SEX F
1 BIRT
2 DATE 14 MAR 1952
2 PLAC Cork, Ireland
1 FAMC @F1@
0 @I2@ INDI
1 NAME John Henry /Doyle/
1 BIRT
2 DATE ABT 1921
1 DEAT
2 DATE 1990
1 FAMC @F2@
0 @I3@ INDI
1 NAME Bridget /O'Connell/
1 BIRT
2 DATE BET 1922 AND 1924
0 @I4@ INDI
1 NAME Patrick /Doyle/
1 BIRT
2 DATE 1895
0 @I5@ INDI
1 NAME Nora /Fitzgerald/
0 @F1@ FAM
1 HUSB @I2@
1 WIFE @I3@
1 CHIL @I1@
0 @F2@ FAM
1 HUSB @I4@
1 WIFE @I5@
1 CHIL @I2@
0 TRLR
`;

test("parses a realistic GEDCOM export", () => {
  const parsed = parseGedcom(GEDCOM_FIXTURE);
  assert.equal(parsed.individuals.length, 5);
  assert.equal(parsed.families.size, 2);

  const margaret = parsed.byId.get("@I1@");
  assert.ok(margaret);
  assert.equal(margaret.given, "Margaret Anne");
  assert.equal(margaret.surname, "Doyle");
  assert.equal(margaret.birthYear, "1952");
  assert.equal(margaret.place, "Cork, Ireland");

  // "ABT 1921" and "BET 1922 AND 1924" must both yield a usable year.
  assert.equal(parsed.byId.get("@I2@")?.birthYear, "1921");
  assert.equal(parsed.byId.get("@I2@")?.deathYear, "1990");
  assert.equal(parsed.byId.get("@I3@")?.birthYear, "1924");
});

test("builds an ancestry into the correct ahnentafel slots", () => {
  const parsed = parseGedcom(GEDCOM_FIXTURE);
  const people = buildAncestry(parsed, "@I1@", 4);

  assert.equal(people[1]?.surname, "Doyle");
  assert.equal(people[2]?.given, "John Henry");
  assert.equal(people[3]?.surname, "O'Connell");
  assert.equal(people[4]?.given, "Patrick");
  assert.equal(people[5]?.surname, "Fitzgerald");
  // Bridget's parents are absent from the file, so those slots stay empty.
  assert.equal(people[6], undefined);
  assert.equal(people[7], undefined);
});

test("suggestRoots ranks the most chartable person first", () => {
  const parsed = parseGedcom(GEDCOM_FIXTURE);
  const roots = suggestRoots(parsed);
  assert.ok(roots.length > 0);
  assert.equal(roots[0]?.id, "@I1@", "Margaret has the deepest ancestry");
  assert.match(roots[0]?.label ?? "", /Margaret Anne Doyle/);
});

test("survives malformed and hostile GEDCOM input", () => {
  assert.doesNotThrow(() => parseGedcom(""));
  assert.doesNotThrow(() => parseGedcom("not a gedcom at all\njust text\n"));
  assert.doesNotThrow(() => parseGedcom("0 @I1@ INDI\n1 NAME /Unclosed\n"));

  const empty = parseGedcom("");
  assert.equal(empty.individuals.length, 0);
  assert.ok(empty.warnings.length > 0);

  // A parent cycle must terminate rather than exhaust the slot ceiling.
  const cyclic = `0 HEAD
0 @I1@ INDI
1 NAME A /One/
1 FAMC @F1@
0 @I2@ INDI
1 NAME B /Two/
1 FAMC @F2@
0 @F1@ FAM
1 HUSB @I2@
1 CHIL @I1@
0 @F2@ FAM
1 HUSB @I1@
1 CHIL @I2@
0 TRLR
`;
  const parsed = parseGedcom(cyclic);
  let people: ReturnType<typeof buildAncestry> = {};
  assert.doesNotThrow(() => {
    people = buildAncestry(parsed, "@I1@", 7);
  });
  assert.ok(Object.keys(people).length <= totalSlots(7));
});

test("lifespan formats the partial-date cases", () => {
  assert.equal(lifespan({ given: "A", surname: "B", birthYear: "1900", deathYear: "1970" }), "1900–1970");
  assert.equal(lifespan({ given: "A", surname: "B", birthYear: "1900" }), "b. 1900");
  assert.equal(lifespan({ given: "A", surname: "B", deathYear: "1970" }), "d. 1970");
  assert.equal(lifespan({ given: "A", surname: "B" }), "");
});
