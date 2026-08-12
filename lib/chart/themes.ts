/**
 * Print themes.
 *
 * These are ink-on-paper palettes, not UI palettes. They are chosen to survive
 * a giclée press and to sit on a real wall next to real furniture — which
 * rules out saturated colour and pure black. Every "black" here is warm or
 * cool but never #000, and every "white" carries a tint, because untinted
 * white on archival stock reads as a printing error.
 */

import type { ThemeName } from "./types";

export interface Theme {
  name: ThemeName;
  label: string;
  description: string;
  paper: string;
  ink: string;
  muted: string;
  rule: string;
  accent: string;
  /** Ring/cell fills, alternating by generation for legibility. */
  fillA: string;
  fillB: string;
  /** Fill for a slot whose ancestor is unknown. */
  fillEmpty: string;
  /** Subtle warm/cool shift applied to maternal lines. */
  maternalTint: string;
}

export const THEMES: Record<ThemeName, Theme> = {
  heirloom: {
    name: "heirloom",
    label: "Heirloom",
    description: "Warm ivory and walnut. Reads as an old letterpress broadside.",
    paper: "#FAF6EF",
    ink: "#23201B",
    muted: "#6E6355",
    rule: "#DCD2C2",
    accent: "#7A5C3E",
    fillA: "#F5EFE4",
    fillB: "#FBF8F2",
    fillEmpty: "#F7F4EE",
    maternalTint: "#F3EDE6",
  },
  midnight: {
    name: "midnight",
    label: "Midnight",
    description: "Deep navy with brass. The most striking on a dark wall.",
    paper: "#151A22",
    ink: "#F2EDE3",
    muted: "#9BA3B0",
    rule: "#2B3441",
    accent: "#C6A664",
    fillA: "#1B2029",
    fillB: "#191E26",
    fillEmpty: "#171C24",
    maternalTint: "#1D232C",
  },
  botanical: {
    name: "botanical",
    label: "Botanical",
    description: "Soft sage and forest green. Quiet, and good in a hallway.",
    paper: "#F4F6F1",
    ink: "#1E2A22",
    muted: "#5F6F63",
    rule: "#CDDAC9",
    accent: "#35624A",
    fillA: "#EDF2EA",
    fillB: "#F6F8F3",
    fillEmpty: "#F1F4EE",
    maternalTint: "#EAF0E7",
  },
  slate: {
    name: "slate",
    label: "Slate",
    description: "Cool greys, minimal. The most modern of the four.",
    paper: "#FFFFFF",
    ink: "#1A1D21",
    muted: "#6C737C",
    rule: "#E1E5EA",
    accent: "#3B4756",
    fillA: "#F4F6F8",
    fillB: "#FFFFFF",
    fillEmpty: "#FAFBFC",
    maternalTint: "#F2F5F8",
  },
};

export const THEME_LIST = Object.values(THEMES);

export function getTheme(name: ThemeName | string | undefined): Theme {
  if (name && name in THEMES) return THEMES[name as ThemeName];
  return THEMES.heirloom;
}
