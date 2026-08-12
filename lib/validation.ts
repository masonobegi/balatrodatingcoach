import { z } from "zod";

import { MAX_GENERATIONS, MIN_GENERATIONS, totalSlots } from "./chart/types";

/**
 * Input validation.
 *
 * Charts are written by anonymous visitors with no account, so these schemas
 * are the only thing standing between the public and the database. Limits are
 * chosen to be generous for real families and hostile to abuse: a name field
 * long enough for "María de los Ángeles Fernández de la Vega" but not long
 * enough to be a storage medium.
 */

const trimmed = (max: number) => z.string().trim().max(max);

export const personSchema = z.object({
  given: trimmed(80).default(""),
  surname: trimmed(80).default(""),
  birthYear: trimmed(4).regex(/^\d{0,4}$/, "Years are up to four digits").optional(),
  deathYear: trimmed(4).regex(/^\d{0,4}$/, "Years are up to four digits").optional(),
  place: trimmed(120).optional(),
});

export const chartConfigSchema = z.object({
  style: z.enum(["fan", "tree"]),
  generations: z.number().int().min(MIN_GENERATIONS).max(MAX_GENERATIONS),
  size: z.enum(["12x18", "18x24", "24x36"]),
  theme: z.enum(["heirloom", "midnight", "botanical", "slate"]),
  title: trimmed(60).default(""),
  subtitle: trimmed(60).default(""),
  showDates: z.boolean(),
  showPlaces: z.boolean(),
});

/**
 * People arrive as an object keyed by Ahnentafel number. Keys are validated as
 * integers inside the addressable range so a caller cannot use the map as an
 * arbitrary key-value store.
 */
export const peopleSchema = z
  .record(z.string(), personSchema)
  .refine(
    (people) => Object.keys(people).length <= totalSlots(MAX_GENERATIONS),
    { message: "Too many people for a chart" },
  )
  .transform((people) => {
    const out: Record<number, z.infer<typeof personSchema>> = {};
    const max = totalSlots(MAX_GENERATIONS);
    for (const [key, value] of Object.entries(people)) {
      const n = Number(key);
      if (!Number.isInteger(n) || n < 1 || n > max) continue;
      if (!value.given && !value.surname) continue;
      out[n] = value;
    }
    return out;
  });

export const saveChartSchema = z.object({
  id: z.string().max(32).optional(),
  config: chartConfigSchema,
  people: peopleSchema,
});

export const eventSchema = z.object({
  name: z.string().min(1).max(64),
  visitorId: z.string().min(1).max(32),
  sessionId: z.string().max(32).optional(),
  chartId: z.string().max(32).optional(),
  orderId: z.string().max(32).optional(),
  path: z.string().max(512).optional(),
  referrer: z.string().max(1024).optional(),
  utmSource: z.string().max(80).optional(),
  utmMedium: z.string().max(80).optional(),
  utmCampaign: z.string().max(120).optional(),
  value: z.number().int().min(0).max(10_000_000).optional(),
  props: z.record(z.string(), z.unknown()).optional(),
});

export const checkoutSchema = z.object({
  chartId: z.string().min(1).max(32),
  items: z
    .array(
      z.object({
        size: z.enum(["12x18", "18x24", "24x36"]),
        framed: z.boolean().default(false),
        quantity: z.number().int().min(1).max(20),
      }),
    )
    .min(1)
    .max(10),
  giftWrap: z.boolean().default(false),
  digitalFile: z.boolean().default(false),
  email: z.string().email().max(320),
  discountCode: z.string().max(40).optional(),
  utmSource: z.string().max(80).optional(),
  utmMedium: z.string().max(80).optional(),
  utmCampaign: z.string().max(120).optional(),
});

export const emailCaptureSchema = z.object({
  email: z.string().email().max(320),
  source: z.string().max(40).default("unknown"),
  chartId: z.string().max(32).optional(),
});

export type SaveChartInput = z.infer<typeof saveChartSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
