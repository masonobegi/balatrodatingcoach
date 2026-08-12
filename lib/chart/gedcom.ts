/**
 * Minimal GEDCOM 5.5.1 reader — enough to fill an ancestor chart, and no more.
 *
 * This is the *secondary* input path, for the family-historian segment who
 * already keep a tree in Ancestry / MyHeritage / FamilySearch. The primary path
 * is manual entry, because the gift buyer this business is built for has never
 * heard of GEDCOM. See docs/00-decision-brief.md for why that ordering matters
 * commercially — it is not an implementation detail.
 *
 * We deliberately ignore most of the specification. A chart needs names, years,
 * a birth place, and parent links. Sources, notes, media, and events are parsed
 * past rather than modelled. Being a bad general-purpose GEDCOM library is the
 * correct trade here.
 */

import type { PeopleMap, Person } from "./types";
import { totalSlots } from "./types";

interface GedLine {
  level: number;
  tag: string;
  xref?: string;
  value: string;
}

interface Individual {
  id: string;
  given: string;
  surname: string;
  birthYear?: string;
  deathYear?: string;
  place?: string;
  /** Family in which this person is a child. */
  famc?: string;
}

interface Family {
  id: string;
  husband?: string;
  wife?: string;
  children: string[];
}

export interface GedcomParseResult {
  individuals: Individual[];
  families: Map<string, Family>;
  byId: Map<string, Individual>;
  warnings: string[];
}

/** Hard ceiling so a malicious or enormous upload cannot exhaust memory. */
export const MAX_GEDCOM_BYTES = 8 * 1024 * 1024;
const MAX_LINES = 400_000;

function parseLine(raw: string): GedLine | null {
  const line = raw.replace(/\r$/, "").trim();
  if (!line) return null;

  // "0 @I1@ INDI" | "1 NAME John /Smith/" | "2 DATE 1 JAN 1900"
  const m = /^(\d+)\s+(?:(@[^@]+@)\s+)?([A-Za-z0-9_]+)(?:\s(.*))?$/.exec(line);
  if (!m) return null;
  const [, levelStr, xref, tag, value] = m;
  return {
    level: Number(levelStr),
    xref,
    tag: (tag ?? "").toUpperCase(),
    value: (value ?? "").trim(),
  };
}

function extractYear(dateValue: string): string | undefined {
  // GEDCOM dates are gloriously varied: "1887", "ABT 1887", "12 MAR 1887",
  // "BET 1886 AND 1888". Take the last plausible 4-digit year.
  const years = dateValue.match(/\b(1\d{3}|20\d{2})\b/g);
  if (!years || years.length === 0) return undefined;
  return years[years.length - 1];
}

function splitName(value: string): { given: string; surname: string } {
  // "John Henry /Smith/" -> given "John Henry", surname "Smith"
  const m = /^(.*?)\/([^/]*)\/(.*)$/.exec(value);
  if (m) {
    return {
      given: (m[1] ?? "").trim(),
      surname: (m[2] ?? "").trim(),
    };
  }
  // No slashes — assume the last token is the surname.
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { given: "", surname: "" };
  if (parts.length === 1) return { given: parts[0] ?? "", surname: "" };
  return {
    given: parts.slice(0, -1).join(" "),
    surname: parts[parts.length - 1] ?? "",
  };
}

export function parseGedcom(text: string): GedcomParseResult {
  const warnings: string[] = [];
  const clean = text.replace(/^﻿/, "");
  const rawLines = clean.split("\n");

  if (rawLines.length > MAX_LINES) {
    warnings.push(
      `File has ${rawLines.length.toLocaleString()} lines; only the first ${MAX_LINES.toLocaleString()} were read.`,
    );
  }

  const individuals: Individual[] = [];
  const byId = new Map<string, Individual>();
  const families = new Map<string, Family>();

  let current: { type: "INDI"; rec: Individual } | { type: "FAM"; rec: Family } | null = null;
  // Tracks which level-1 event block (BIRT/DEAT) a level-2 DATE/PLAC belongs to.
  let eventContext: "BIRT" | "DEAT" | null = null;
  let sawHeader = false;

  const limit = Math.min(rawLines.length, MAX_LINES);
  for (let i = 0; i < limit; i++) {
    const parsed = parseLine(rawLines[i] ?? "");
    if (!parsed) continue;
    const { level, tag, xref, value } = parsed;

    if (level === 0) {
      eventContext = null;
      if (tag === "HEAD") sawHeader = true;
      if (tag === "INDI" && xref) {
        const rec: Individual = { id: xref, given: "", surname: "" };
        current = { type: "INDI", rec };
        individuals.push(rec);
        byId.set(xref, rec);
      } else if (tag === "FAM" && xref) {
        const rec: Family = { id: xref, children: [] };
        current = { type: "FAM", rec };
        families.set(xref, rec);
      } else {
        current = null;
      }
      continue;
    }

    if (!current) continue;

    if (current.type === "INDI") {
      const ind = current.rec;
      if (level === 1) {
        eventContext = null;
        switch (tag) {
          case "NAME": {
            // Only the first NAME wins; later ones are aliases.
            if (!ind.given && !ind.surname) {
              const { given, surname } = splitName(value);
              ind.given = given;
              ind.surname = surname;
            }
            break;
          }
          case "BIRT":
            eventContext = "BIRT";
            break;
          case "DEAT":
            eventContext = "DEAT";
            break;
          case "FAMC":
            if (!ind.famc && value) ind.famc = value;
            break;
        }
      } else if (level === 2 && eventContext) {
        if (tag === "DATE") {
          const year = extractYear(value);
          if (year) {
            if (eventContext === "BIRT") ind.birthYear ??= year;
            else ind.deathYear ??= year;
          }
        } else if (tag === "PLAC" && eventContext === "BIRT") {
          ind.place ??= value;
        }
      } else if (level >= 2 && tag === "GIVN" && !ind.given) {
        ind.given = value;
      } else if (level >= 2 && tag === "SURN" && !ind.surname) {
        ind.surname = value;
      }
      continue;
    }

    // FAM
    const fam = current.rec;
    if (level === 1) {
      if (tag === "HUSB" && value) fam.husband = value;
      else if (tag === "WIFE" && value) fam.wife = value;
      else if (tag === "CHIL" && value) fam.children.push(value);
    }
  }

  if (!sawHeader) warnings.push("No GEDCOM header found — the file may not be a GEDCOM export.");
  if (individuals.length === 0) warnings.push("No individuals found in the file.");

  return { individuals, families, byId, warnings };
}

function toPerson(ind: Individual): Person {
  return {
    given: ind.given,
    surname: ind.surname,
    birthYear: ind.birthYear,
    deathYear: ind.deathYear,
    place: ind.place,
  };
}

/**
 * Walk ancestors breadth-first from `rootId`, filling Ahnentafel slots.
 * Cycles (which malformed files do contain) are bounded by the slot ceiling
 * and guarded by a visited-set per path depth.
 */
export function buildAncestry(
  parsed: GedcomParseResult,
  rootId: string,
  generations: number,
): PeopleMap {
  const people: PeopleMap = {};
  const max = totalSlots(generations);

  const queue: Array<{ n: number; id: string; seen: Set<string> }> = [
    { n: 1, id: rootId, seen: new Set([rootId]) },
  ];

  while (queue.length > 0) {
    const item = queue.shift();
    if (!item) break;
    const { n, id, seen } = item;
    if (n > max) continue;

    const ind = parsed.byId.get(id);
    if (!ind) continue;
    people[n] = toPerson(ind);

    if (!ind.famc) continue;
    const fam = parsed.families.get(ind.famc);
    if (!fam) continue;

    if (fam.husband && !seen.has(fam.husband) && n * 2 <= max) {
      queue.push({ n: n * 2, id: fam.husband, seen: new Set([...seen, fam.husband]) });
    }
    if (fam.wife && !seen.has(fam.wife) && n * 2 + 1 <= max) {
      queue.push({ n: n * 2 + 1, id: fam.wife, seen: new Set([...seen, fam.wife]) });
    }
  }

  return people;
}

export interface RootCandidate {
  id: string;
  label: string;
  /** How many ancestor slots this root can fill — the useful ranking signal. */
  depth: number;
}

/**
 * Rank people by how complete a chart they would produce. A GEDCOM commonly
 * contains hundreds of people and the customer should be offered the handful
 * that actually make a good chart, youngest-and-most-documented first.
 */
export function suggestRoots(parsed: GedcomParseResult, limit = 40): RootCandidate[] {
  const scored: RootCandidate[] = parsed.individuals.map((ind) => {
    const people = buildAncestry(parsed, ind.id, 6);
    const depth = Object.keys(people).length;
    const years = [ind.birthYear, ind.deathYear].filter(Boolean).join("–");
    const name = [ind.given, ind.surname].filter(Boolean).join(" ") || "(unnamed)";
    return { id: ind.id, label: years ? `${name} (${years})` : name, depth };
  });

  scored.sort((a, b) => b.depth - a.depth || a.label.localeCompare(b.label));
  return scored.slice(0, limit);
}
