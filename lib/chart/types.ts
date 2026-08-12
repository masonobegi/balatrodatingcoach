/**
 * Core data model for an ancestor (pedigree) chart.
 *
 * People are stored by **Ahnentafel number**, the standard genealogical
 * numbering for ancestor charts:
 *
 *   1        = the root person (whoever the chart is centred on)
 *   2n       = the father of n
 *   2n + 1   = the mother of n
 *
 * So generation g occupies numbers [2^(g-1), 2^g - 1] and contains 2^(g-1)
 * slots. This makes every layout question — which ring, which slice, which row
 * — pure arithmetic on the key, with no tree walking and no ambiguity about
 * missing branches. A gap in the family is simply an absent key.
 */

export type AhnentafelNumber = number;

export interface Person {
  /** Given name(s) as the customer typed them, e.g. "Mary Ellen". */
  given: string;
  /** Family name, e.g. "O'Donnell". Maiden names are conventional for women. */
  surname: string;
  /** Four-digit year, or empty. We deliberately do not model full dates. */
  birthYear?: string;
  deathYear?: string;
  /** Free text, e.g. "Cork, Ireland". Shown only when there is room. */
  place?: string;
}

export type PeopleMap = Record<AhnentafelNumber, Person>;

export type ChartStyle = "fan" | "tree";

export type PaperSize = "12x18" | "18x24" | "24x36";

export type ThemeName = "heirloom" | "midnight" | "botanical" | "slate";

export interface ChartConfig {
  style: ChartStyle;
  /** Number of generations shown, inclusive of the root. 3–7. */
  generations: number;
  size: PaperSize;
  theme: ThemeName;
  /** Headline above the chart, e.g. "The Family of Margaret Doyle". */
  title: string;
  /** Small line beneath the chart, e.g. "Christmas 2026". */
  subtitle: string;
  /** Show birth/death years under each name. */
  showDates: boolean;
  /** Show place under each name where the ring is wide enough to take it. */
  showPlaces: boolean;
}

export interface ChartDocument {
  config: ChartConfig;
  people: PeopleMap;
}

export const MIN_GENERATIONS = 3;
export const MAX_GENERATIONS = 7;

export const PAPER_SIZES: Record<PaperSize, { w: number; h: number; label: string }> = {
  // Inches. Portrait orientation throughout — these are wall pieces.
  "12x18": { w: 12, h: 18, label: '12" × 18"' },
  "18x24": { w: 18, h: 24, label: '18" × 24"' },
  "24x36": { w: 24, h: 36, label: '24" × 36"' },
};

/** Print resolution used when rasterising for the fulfilment provider. */
export const PRINT_DPI = 300;

/**
 * Slots in generation `g` (1-indexed: generation 1 is the root alone).
 */
export function slotsInGeneration(g: number): number {
  return 2 ** (g - 1);
}

/** First and last Ahnentafel number in generation `g`. */
export function generationRange(g: number): [number, number] {
  return [2 ** (g - 1), 2 ** g - 1];
}

/** Generation containing Ahnentafel number `n` (1-indexed). */
export function generationOf(n: AhnentafelNumber): number {
  return Math.floor(Math.log2(n)) + 1;
}

/** Total slots across `generations` generations. */
export function totalSlots(generations: number): number {
  return 2 ** generations - 1;
}

export function fatherOf(n: AhnentafelNumber): AhnentafelNumber {
  return n * 2;
}

export function motherOf(n: AhnentafelNumber): AhnentafelNumber {
  return n * 2 + 1;
}

export function childOf(n: AhnentafelNumber): AhnentafelNumber {
  return Math.floor(n / 2);
}

/** True for maternal slots. Used only for subtle visual differentiation. */
export function isMaternal(n: AhnentafelNumber): boolean {
  return n > 1 && n % 2 === 1;
}

export function isEmptyPerson(p: Person | undefined): boolean {
  if (!p) return true;
  return !p.given.trim() && !p.surname.trim();
}

export function fullName(p: Person): string {
  return [p.given.trim(), p.surname.trim()].filter(Boolean).join(" ");
}

/**
 * "1887–1949", "b. 1887", "d. 1949", or "".
 */
export function lifespan(p: Person): string {
  const b = (p.birthYear || "").trim();
  const d = (p.deathYear || "").trim();
  if (b && d) return `${b}–${d}`;
  if (b) return `b. ${b}`;
  if (d) return `d. ${d}`;
  return "";
}

export function countFilled(people: PeopleMap, generations: number): number {
  let n = 0;
  for (let i = 1; i <= totalSlots(generations); i++) {
    if (!isEmptyPerson(people[i])) n++;
  }
  return n;
}

export const DEFAULT_CONFIG: ChartConfig = {
  style: "fan",
  /*
   * Three generations — seven people — is the default, and that is a
   * conversion decision rather than an aesthetic one.
   *
   * Three generations is the root, both parents and all four grandparents:
   * names almost everyone has from memory, in about two minutes. Rendered, it
   * is a complete, framable object with big legible type.
   *
   * Four generations asks for fifteen. The eight great-grandparents are
   * exactly where recall fails, and a chart carrying a full outer ring of
   * empty wedges reads as *unfinished* rather than as designed negative space
   * — it makes the customer feel they failed rather than that they are done.
   * Starting at three and letting them add a generation is strictly better
   * than starting at four and letting them feel short.
   */
  generations: 3,
  size: "18x24",
  theme: "heirloom",
  title: "",
  subtitle: "",
  /*
   * Years are OFF by default, and this is the single biggest friction decision
   * in the builder.
   *
   * With years on, every person asks for four boxes — first name, last name,
   * born, died — so a seven-name chart presents twenty-eight inputs. Measured
   * in the real page it was thirty. "Seven names" is an easy promise; thirty
   * boxes is homework, and the gap between the two is where people quit.
   *
   * The second problem is worse than the arithmetic. A gift buyer usually does
   * not know her grandmother's birth year. Asking for it does not just cost a
   * keystroke — it tells her she is unqualified to make this, at the exact
   * moment we need her to feel she already has everything required.
   *
   * Off, it is two boxes per person and the names set larger. Anyone who wants
   * dates can switch them on in one click, and the historian segment always
   * will.
   */
  showDates: false,
  showPlaces: false,
};

export function emptyDocument(): ChartDocument {
  return { config: { ...DEFAULT_CONFIG }, people: {} };
}
