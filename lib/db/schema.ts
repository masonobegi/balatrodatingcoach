/**
 * Database schema.
 *
 * Postgres, because an order ledger needs real concurrent-write correctness and
 * because every cheap managed option worth using speaks it — which keeps the
 * migration path at "dump and restore" rather than "rewrite".
 *
 * Money is integer cents throughout. Never floats.
 */

import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import type { ChartConfig, PeopleMap } from "../chart/types";

/**
 * A chart a visitor has built. Deliberately anonymous: no account is required
 * to build one, because requiring a signup before the customer has seen
 * anything of value is the single most reliable way to lose them.
 *
 * `token` is the public, unguessable id used in share links. The share link is
 * the growth loop — a customer sends it to relatives to check names, and those
 * relatives are themselves buyers — so it must work with no login, forever.
 */
export const charts = pgTable(
  "charts",
  {
    id: varchar("id", { length: 32 }).primaryKey(),
    token: varchar("token", { length: 32 }).notNull(),
    config: jsonb("config").$type<ChartConfig>().notNull(),
    people: jsonb("people").$type<PeopleMap>().notNull(),
    /** Set once the builder is emailed a save link. */
    email: varchar("email", { length: 320 }),
    /** Which chart this one was duplicated from, for share-loop attribution. */
    parentChartId: varchar("parent_chart_id", { length: 32 }),
    source: varchar("source", { length: 32 }).notNull().default("manual"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
    lastViewedAt: timestamp("last_viewed_at", { withTimezone: true }),
    viewCount: integer("view_count").notNull().default(0),
  },
  (t) => [
    uniqueIndex("charts_token_idx").on(t.token),
    index("charts_email_idx").on(t.email),
    index("charts_created_idx").on(t.createdAt),
    index("charts_parent_idx").on(t.parentChartId),
  ],
);

export const orders = pgTable(
  "orders",
  {
    id: varchar("id", { length: 32 }).primaryKey(),
    /** Human-facing reference, e.g. KIN-4F2A9C. */
    reference: varchar("reference", { length: 16 }).notNull(),
    chartId: varchar("chart_id", { length: 32 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    customerName: varchar("customer_name", { length: 200 }),

    status: varchar("status", { length: 24 }).notNull().default("pending"),
    fulfillmentStatus: varchar("fulfillment_status", { length: 24 })
      .notNull()
      .default("unfulfilled"),

    /** Frozen copy of the priced order, so history survives price changes. */
    items: jsonb("items").$type<unknown>().notNull(),
    /** Frozen copy of the chart at purchase time — the customer bought *this*. */
    chartSnapshot: jsonb("chart_snapshot").$type<{ config: ChartConfig; people: PeopleMap }>(),

    subtotal: integer("subtotal").notNull(),
    discount: integer("discount").notNull().default(0),
    shipping: integer("shipping").notNull().default(0),
    tax: integer("tax").notNull().default(0),
    total: integer("total").notNull(),
    /** Modelled, for the margin column in the admin dashboard. */
    assumedCogs: integer("assumed_cogs").notNull().default(0),

    discountCode: varchar("discount_code", { length: 40 }),
    stripeSessionId: varchar("stripe_session_id", { length: 255 }),
    stripePaymentIntentId: varchar("stripe_payment_intent_id", { length: 255 }),

    shippingAddress: jsonb("shipping_address").$type<unknown>(),
    /** Provider order id once submitted for printing. */
    fulfillmentId: varchar("fulfillment_id", { length: 128 }),
    trackingUrl: text("tracking_url"),
    artworkUrl: text("artwork_url"),

    /** Attribution captured at checkout. */
    utmSource: varchar("utm_source", { length: 80 }),
    utmMedium: varchar("utm_medium", { length: 80 }),
    utmCampaign: varchar("utm_campaign", { length: 120 }),

    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    fulfilledAt: timestamp("fulfilled_at", { withTimezone: true }),
  },
  (t) => [
    uniqueIndex("orders_reference_idx").on(t.reference),
    uniqueIndex("orders_session_idx").on(t.stripeSessionId),
    index("orders_email_idx").on(t.email),
    index("orders_status_idx").on(t.status),
    index("orders_created_idx").on(t.createdAt),
    index("orders_chart_idx").on(t.chartId),
  ],
);

/**
 * Product analytics, kept in our own Postgres.
 *
 * A separate analytics SaaS is the obvious choice, and it is the wrong one at
 * this size: the founder needs *one* place that answers "is this working", and
 * the funnel questions that matter here (does a gift buyer finish typing 15
 * names?) are specific enough that a generic tool would need custom events
 * anyway. Owning the table also means the admin dashboard can join events
 * against orders, which no hosted tool will do on a free plan.
 */
export const events = pgTable(
  "events",
  {
    id: varchar("id", { length: 32 }).primaryKey(),
    name: varchar("name", { length: 64 }).notNull(),
    /** Anonymous first-party visitor id from a first-party cookie. */
    visitorId: varchar("visitor_id", { length: 32 }).notNull(),
    sessionId: varchar("session_id", { length: 32 }),
    chartId: varchar("chart_id", { length: 32 }),
    orderId: varchar("order_id", { length: 32 }),
    path: text("path"),
    referrer: text("referrer"),
    utmSource: varchar("utm_source", { length: 80 }),
    utmMedium: varchar("utm_medium", { length: 80 }),
    utmCampaign: varchar("utm_campaign", { length: 120 }),
    /** Revenue in cents for purchase events, so revenue reporting is one query. */
    value: integer("value"),
    props: jsonb("props").$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("events_name_created_idx").on(t.name, t.createdAt),
    index("events_visitor_idx").on(t.visitorId),
    index("events_created_idx").on(t.createdAt),
    index("events_chart_idx").on(t.chartId),
  ],
);

export const subscribers = pgTable(
  "subscribers",
  {
    id: varchar("id", { length: 32 }).primaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    source: varchar("source", { length: 40 }).notNull().default("unknown"),
    chartId: varchar("chart_id", { length: 32 }),
    unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
    /** Random token used for one-click unsubscribe links (CAN-SPAM). */
    unsubToken: varchar("unsub_token", { length: 32 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("subscribers_email_idx").on(t.email),
    uniqueIndex("subscribers_unsub_idx").on(t.unsubToken),
  ],
);

export const discountCodes = pgTable(
  "discount_codes",
  {
    code: varchar("code", { length: 40 }).primaryKey(),
    percentOff: integer("percent_off").notNull(),
    /** Null means unlimited. */
    maxRedemptions: integer("max_redemptions"),
    redemptions: integer("redemptions").notNull().default(0),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    active: boolean("active").notNull().default(true),
    note: text("note"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
);

/**
 * Emails we have sent, so lifecycle sends are idempotent. Without this, a
 * webhook retry sends a second order confirmation, and the abandoned-builder
 * job mails the same person every time it runs.
 */
export const emailLog = pgTable(
  "email_log",
  {
    id: varchar("id", { length: 32 }).primaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    template: varchar("template", { length: 40 }).notNull(),
    /** Dedupe key, e.g. `order_confirmation:KIN-4F2A9C`. */
    dedupeKey: varchar("dedupe_key", { length: 200 }).notNull(),
    providerId: varchar("provider_id", { length: 128 }),
    error: text("error"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("email_log_dedupe_idx").on(t.dedupeKey)],
);

/** Stripe event ids we have already processed, for webhook idempotency. */
export const processedWebhooks = pgTable("processed_webhooks", {
  id: varchar("id", { length: 255 }).primaryKey(),
  type: varchar("type", { length: 80 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Chart = typeof charts.$inferSelect;
export type NewChart = typeof charts.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type Event = typeof events.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
export type DiscountCode = typeof discountCodes.$inferSelect;
