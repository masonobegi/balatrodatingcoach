import { generationOf, type AhnentafelNumber } from "./types";

/**
 * Human-readable labels for Ahnentafel slots.
 *
 * "Ancestor 23" means nothing to a gift buyer; "Great-grandmother — mother's
 * father's mother" is the phrase she can actually check against what she knows.
 * The second half is the path, which is what disambiguates the eight
 * great-grandparents from one another.
 */

const GENERATION_TITLE: Record<number, { m: string; f: string }> = {
  1: { m: "Root", f: "Root" },
  2: { m: "Father", f: "Mother" },
  3: { m: "Grandfather", f: "Grandmother" },
  4: { m: "Great-grandfather", f: "Great-grandmother" },
  5: { m: "2× great-grandfather", f: "2× great-grandmother" },
  6: { m: "3× great-grandfather", f: "3× great-grandmother" },
  7: { m: "4× great-grandfather", f: "4× great-grandmother" },
};

export function isFemaleSlot(n: AhnentafelNumber): boolean {
  return n > 1 && n % 2 === 1;
}

export function relationTitle(n: AhnentafelNumber): string {
  if (n === 1) return "This chart is for";
  const gen = generationOf(n);
  const t = GENERATION_TITLE[gen];
  if (!t) return `Ancestor ${n}`;
  return isFemaleSlot(n) ? t.f : t.m;
}

/**
 * The lineage path from the root, e.g. "mother's father's mother".
 * Returns "" for the root and for the immediate parents, where the title
 * already says everything.
 */
export function relationPath(n: AhnentafelNumber): string {
  if (n <= 3) return "";
  const steps: string[] = [];
  let current = n;
  while (current > 1) {
    steps.unshift(isFemaleSlot(current) ? "mother" : "father");
    current = Math.floor(current / 2);
  }
  // Drop the final step — it is the person themselves, named by the title.
  steps.pop();
  if (steps.length === 0) return "";
  return `${steps.map((s) => `${s}'s`).join(" ")} side`;
}

/** e.g. "Great-grandmother · mother's father's side" */
export function fullRelationLabel(n: AhnentafelNumber): string {
  const path = relationPath(n);
  return path ? `${relationTitle(n)} · ${path}` : relationTitle(n);
}

export const GENERATION_HEADINGS: Record<number, { title: string; hint: string }> = {
  1: {
    title: "Who is this chart for?",
    hint: "Usually the person receiving it, or the oldest person in the family. Everything else is drawn around them.",
  },
  2: {
    title: "Their parents",
    hint: "Use the name a woman was born with where you can — that is what makes a family tree readable further back.",
  },
  3: {
    title: "Their grandparents",
    hint: "Most people can get this far from memory. Four names.",
  },
  4: {
    title: "Great-grandparents",
    hint: "This is where the gaps usually start. Leave anything you're unsure of blank — the chart keeps their place.",
  },
  5: {
    title: "2× great-grandparents",
    hint: "Sixteen slots. Fill in what you have; nobody fills in all of these from memory.",
  },
  6: {
    title: "3× great-grandparents",
    hint: "Thirty-two slots. Usually only reachable if someone in the family has done research.",
  },
  7: {
    title: "4× great-grandparents",
    hint: "Sixty-four slots. The outermost ring of the largest chart.",
  },
};
