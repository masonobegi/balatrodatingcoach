import type { ChartDocument, PeopleMap } from "./types";
import { DEFAULT_CONFIG } from "./types";

/**
 * The demo family used on the homepage, the empty builder, and OG images.
 *
 * Deliberately not the founder's own family and deliberately mixed in origin,
 * so a visitor of any background can picture their names in it. The gaps are
 * intentional too — real trees have holes, and showing one honestly is
 * reassuring rather than off-putting.
 */
const SAMPLE_PEOPLE: PeopleMap = {
  1: { given: "Margaret", surname: "Doyle", birthYear: "1931", deathYear: "2019", place: "Cork, Ireland" },

  2: { given: "John Henry", surname: "Doyle", birthYear: "1898", deathYear: "1974" },
  3: { given: "Bridget", surname: "O'Connell", birthYear: "1902", deathYear: "1988" },

  4: { given: "Patrick", surname: "Doyle", birthYear: "1869", deathYear: "1941" },
  5: { given: "Nora", surname: "Fitzgerald", birthYear: "1873", deathYear: "1952" },
  6: { given: "Thomas", surname: "O'Connell", birthYear: "1871", deathYear: "1935" },
  7: { given: "Anne", surname: "Marchetti", birthYear: "1877", deathYear: "1961" },

  8: { given: "Michael", surname: "Doyle", birthYear: "1840", deathYear: "1901" },
  9: { given: "Ellen", surname: "Whitfield", birthYear: "1844", deathYear: "1899" },
  10: { given: "James", surname: "Fitzgerald", birthYear: "1841", deathYear: "1910" },
  11: { given: "Catherine", surname: "Burke", birthYear: "1847", deathYear: "1912" },
  12: { given: "Séamus", surname: "O'Connell", birthYear: "1839", deathYear: "1904" },
  13: { given: "Mary", surname: "Nakamura", birthYear: "1845", deathYear: "1921" },
  // 14 and 15 are unknown — the chart keeps their places.
};

export function sampleChart(overrides: Partial<ChartDocument["config"]> = {}): ChartDocument {
  return {
    config: {
      ...DEFAULT_CONFIG,
      style: "fan",
      generations: 4,
      size: "18x24",
      theme: "heirloom",
      title: "The Doyle Family",
      subtitle: "For Nana, Christmas 2026",
      showDates: true,
      ...overrides,
    },
    people: SAMPLE_PEOPLE,
  };
}

export { SAMPLE_PEOPLE };
