/**
 * Repository layer.
 *
 * Every function works with or without a database. With DATABASE_URL set, it
 * talks to Postgres; without, it uses an in-memory store so the entire customer
 * journey — build, share, check out, confirm, admin — can be exercised before
 * any account exists. The memory store is explicitly not durable, and the admin
 * dashboard says so on screen.
 */

import { and, count, desc, eq, gte, sql } from "drizzle-orm";

import { getDb } from ".";
import {
  type Chart,
  type DiscountCode,
  type NewChart,
  type NewOrder,
  type Order,
  charts,
  discountCodes,
  emailLog,
  events,
  orders,
  processedWebhooks,
  subscribers,
} from "./schema";
import { newId, newToken, newUnsubToken } from "../ids";

// ---------------------------------------------------------------------------
// In-memory fallback
// ---------------------------------------------------------------------------

interface MemoryStore {
  charts: Map<string, Chart>;
  orders: Map<string, Order>;
  events: Array<typeof events.$inferSelect>;
  subscribers: Map<string, typeof subscribers.$inferSelect>;
  discounts: Map<string, DiscountCode>;
  emails: Set<string>;
  webhooks: Set<string>;
}

const globalForMemory = globalThis as unknown as { __kinlineMemory?: MemoryStore };

function memory(): MemoryStore {
  globalForMemory.__kinlineMemory ??= {
    charts: new Map(),
    orders: new Map(),
    events: [],
    subscribers: new Map(),
    discounts: new Map([
      [
        "WELCOME10",
        {
          code: "WELCOME10",
          percentOff: 10,
          maxRedemptions: null,
          redemptions: 0,
          expiresAt: null,
          active: true,
          note: "Seeded default — email capture incentive",
          createdAt: new Date(),
        },
      ],
    ]),
    emails: new Set(),
    webhooks: new Set(),
  };
  return globalForMemory.__kinlineMemory;
}

export const isMemoryMode = () => getDb() === null;

// ---------------------------------------------------------------------------
// Charts
// ---------------------------------------------------------------------------

export async function createChart(input: Omit<NewChart, "id" | "token">): Promise<Chart> {
  const row: Chart = {
    id: newId(),
    token: newToken(),
    config: input.config,
    people: input.people,
    email: input.email ?? null,
    parentChartId: input.parentChartId ?? null,
    source: input.source ?? "manual",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastViewedAt: null,
    viewCount: 0,
  };

  const db = getDb();
  if (!db) {
    memory().charts.set(row.id, row);
    return row;
  }
  await db.insert(charts).values(row);
  return row;
}

export async function getChartById(id: string): Promise<Chart | null> {
  const db = getDb();
  if (!db) return memory().charts.get(id) ?? null;
  const rows = await db.select().from(charts).where(eq(charts.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getChartByToken(token: string): Promise<Chart | null> {
  const db = getDb();
  if (!db) {
    for (const c of memory().charts.values()) if (c.token === token) return c;
    return null;
  }
  const rows = await db.select().from(charts).where(eq(charts.token, token)).limit(1);
  return rows[0] ?? null;
}

export async function updateChart(
  id: string,
  patch: Partial<Pick<Chart, "config" | "people" | "email">>,
): Promise<Chart | null> {
  const db = getDb();
  if (!db) {
    const existing = memory().charts.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...patch, updatedAt: new Date() };
    memory().charts.set(id, updated);
    return updated;
  }
  const rows = await db
    .update(charts)
    .set({ ...patch, updatedAt: new Date() })
    .where(eq(charts.id, id))
    .returning();
  return rows[0] ?? null;
}

/** Records a view on a shared chart. Fire-and-forget; never block a render. */
export async function recordChartView(id: string): Promise<void> {
  const db = getDb();
  if (!db) {
    const existing = memory().charts.get(id);
    if (existing) {
      memory().charts.set(id, {
        ...existing,
        viewCount: existing.viewCount + 1,
        lastViewedAt: new Date(),
      });
    }
    return;
  }
  await db
    .update(charts)
    .set({ viewCount: sql`${charts.viewCount} + 1`, lastViewedAt: new Date() })
    .where(eq(charts.id, id));
}

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------

export async function createOrder(input: NewOrder): Promise<Order> {
  const row = {
    ...input,
    id: input.id ?? newId(),
    createdAt: input.createdAt ?? new Date(),
  } as Order;

  const db = getDb();
  if (!db) {
    memory().orders.set(row.id, row);
    return row;
  }
  await db.insert(orders).values(row);
  return row;
}

export async function getOrderByReference(reference: string): Promise<Order | null> {
  const db = getDb();
  if (!db) {
    for (const o of memory().orders.values()) if (o.reference === reference) return o;
    return null;
  }
  const rows = await db.select().from(orders).where(eq(orders.reference, reference)).limit(1);
  return rows[0] ?? null;
}

export async function getOrderBySessionId(sessionId: string): Promise<Order | null> {
  const db = getDb();
  if (!db) {
    for (const o of memory().orders.values()) if (o.stripeSessionId === sessionId) return o;
    return null;
  }
  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.stripeSessionId, sessionId))
    .limit(1);
  return rows[0] ?? null;
}

export async function updateOrder(id: string, patch: Partial<Order>): Promise<Order | null> {
  const db = getDb();
  if (!db) {
    const existing = memory().orders.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...patch };
    memory().orders.set(id, updated);
    return updated;
  }
  const rows = await db.update(orders).set(patch).where(eq(orders.id, id)).returning();
  return rows[0] ?? null;
}

export async function listOrders(limit = 100, status?: string): Promise<Order[]> {
  const db = getDb();
  if (!db) {
    return [...memory().orders.values()]
      .filter((o) => !status || o.status === status)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
  const where = status ? eq(orders.status, status) : undefined;
  return db
    .select()
    .from(orders)
    .where(where)
    .orderBy(desc(orders.createdAt))
    .limit(limit);
}

export async function findOrdersByEmail(email: string): Promise<Order[]> {
  const normalized = email.trim().toLowerCase();
  const db = getDb();
  if (!db) {
    return [...memory().orders.values()]
      .filter((o) => o.email.toLowerCase() === normalized && o.status === "paid")
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
  return db
    .select()
    .from(orders)
    .where(and(eq(orders.email, normalized), eq(orders.status, "paid")))
    .orderBy(desc(orders.createdAt));
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export interface EventInput {
  name: string;
  visitorId: string;
  sessionId?: string | null;
  chartId?: string | null;
  orderId?: string | null;
  path?: string | null;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  value?: number | null;
  props?: Record<string, unknown> | null;
}

export async function recordEvent(input: EventInput): Promise<void> {
  const row = {
    id: newId(),
    name: input.name,
    visitorId: input.visitorId,
    sessionId: input.sessionId ?? null,
    chartId: input.chartId ?? null,
    orderId: input.orderId ?? null,
    path: input.path ?? null,
    referrer: input.referrer ?? null,
    utmSource: input.utmSource ?? null,
    utmMedium: input.utmMedium ?? null,
    utmCampaign: input.utmCampaign ?? null,
    value: input.value ?? null,
    props: input.props ?? null,
    createdAt: new Date(),
  };

  const db = getDb();
  if (!db) {
    const store = memory();
    store.events.push(row);
    // Bound memory in dev so a long session cannot grow without limit.
    if (store.events.length > 20_000) store.events.splice(0, 5_000);
    return;
  }
  await db.insert(events).values(row);
}

export interface FunnelCounts {
  visitors: number;
  builderStarted: number;
  firstNameEntered: number;
  builderCompleted: number;
  checkoutStarted: number;
  purchased: number;
  revenue: number;
}

const FUNNEL_EVENTS = [
  "page_view",
  "builder_started",
  "person_named",
  "builder_completed",
  "checkout_started",
  "purchase",
] as const;

export async function getFunnel(sinceDays = 30): Promise<FunnelCounts> {
  const since = new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000);
  const db = getDb();

  if (!db) {
    const rows = memory().events.filter((e) => e.createdAt >= since);
    const uniq = (name: string) =>
      new Set(rows.filter((e) => e.name === name).map((e) => e.visitorId)).size;
    return {
      visitors: new Set(rows.map((e) => e.visitorId)).size,
      builderStarted: uniq("builder_started"),
      firstNameEntered: uniq("person_named"),
      builderCompleted: uniq("builder_completed"),
      checkoutStarted: uniq("checkout_started"),
      purchased: uniq("purchase"),
      revenue: rows
        .filter((e) => e.name === "purchase")
        .reduce((sum, e) => sum + (e.value ?? 0), 0),
    };
  }

  const rows = await db
    .select({
      name: events.name,
      visitors: sql<number>`count(distinct ${events.visitorId})`,
      value: sql<number>`coalesce(sum(${events.value}), 0)`,
    })
    .from(events)
    .where(gte(events.createdAt, since))
    .groupBy(events.name);

  const byName = new Map(rows.map((r) => [r.name, r]));
  const pick = (n: (typeof FUNNEL_EVENTS)[number]) => Number(byName.get(n)?.visitors ?? 0);

  const [{ total } = { total: 0 }] = await db
    .select({ total: sql<number>`count(distinct ${events.visitorId})` })
    .from(events)
    .where(gte(events.createdAt, since));

  return {
    visitors: Number(total ?? 0),
    builderStarted: pick("builder_started"),
    firstNameEntered: pick("person_named"),
    builderCompleted: pick("builder_completed"),
    checkoutStarted: pick("checkout_started"),
    purchased: pick("purchase"),
    revenue: Number(byName.get("purchase")?.value ?? 0),
  };
}

export interface SourceRow {
  source: string;
  visitors: number;
  purchases: number;
  revenue: number;
}

export async function getSources(sinceDays = 30): Promise<SourceRow[]> {
  const since = new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000);
  const db = getDb();

  const normalize = (e: { utmSource: string | null; referrer: string | null }) => {
    if (e.utmSource) return e.utmSource;
    if (!e.referrer) return "direct";
    try {
      return new URL(e.referrer).hostname.replace(/^www\./, "");
    } catch {
      return "direct";
    }
  };

  if (!db) {
    const rows = memory().events.filter((e) => e.createdAt >= since);
    const map = new Map<string, { visitors: Set<string>; purchases: number; revenue: number }>();
    for (const e of rows) {
      const key = normalize(e);
      const entry = map.get(key) ?? { visitors: new Set<string>(), purchases: 0, revenue: 0 };
      entry.visitors.add(e.visitorId);
      if (e.name === "purchase") {
        entry.purchases += 1;
        entry.revenue += e.value ?? 0;
      }
      map.set(key, entry);
    }
    return [...map.entries()]
      .map(([source, v]) => ({
        source,
        visitors: v.visitors.size,
        purchases: v.purchases,
        revenue: v.revenue,
      }))
      .sort((a, b) => b.visitors - a.visitors);
  }

  const rows = await db
    .select({
      source: sql<string>`coalesce(nullif(${events.utmSource}, ''), 'direct')`,
      visitors: sql<number>`count(distinct ${events.visitorId})`,
      purchases: sql<number>`count(*) filter (where ${events.name} = 'purchase')`,
      revenue: sql<number>`coalesce(sum(${events.value}) filter (where ${events.name} = 'purchase'), 0)`,
    })
    .from(events)
    .where(gte(events.createdAt, since))
    .groupBy(sql`1`)
    .orderBy(sql`2 desc`);

  return rows.map((r) => ({
    source: r.source,
    visitors: Number(r.visitors),
    purchases: Number(r.purchases),
    revenue: Number(r.revenue),
  }));
}

export async function countCharts(sinceDays = 30): Promise<number> {
  const since = new Date(Date.now() - sinceDays * 24 * 60 * 60 * 1000);
  const db = getDb();
  if (!db) {
    return [...memory().charts.values()].filter((c) => c.createdAt >= since).length;
  }
  const [row] = await db
    .select({ n: count() })
    .from(charts)
    .where(gte(charts.createdAt, since));
  return Number(row?.n ?? 0);
}

// ---------------------------------------------------------------------------
// Subscribers, discounts, idempotency
// ---------------------------------------------------------------------------

export async function addSubscriber(
  email: string,
  source: string,
  chartId?: string,
): Promise<void> {
  const normalized = email.trim().toLowerCase();
  const row = {
    id: newId(),
    email: normalized,
    source,
    chartId: chartId ?? null,
    unsubscribedAt: null,
    unsubToken: newUnsubToken(),
    createdAt: new Date(),
  };

  const db = getDb();
  if (!db) {
    if (!memory().subscribers.has(normalized)) memory().subscribers.set(normalized, row);
    return;
  }
  await db.insert(subscribers).values(row).onConflictDoNothing();
}

export async function unsubscribe(token: string): Promise<boolean> {
  const db = getDb();
  if (!db) {
    for (const [key, s] of memory().subscribers) {
      if (s.unsubToken === token) {
        memory().subscribers.set(key, { ...s, unsubscribedAt: new Date() });
        return true;
      }
    }
    return false;
  }
  const rows = await db
    .update(subscribers)
    .set({ unsubscribedAt: new Date() })
    .where(eq(subscribers.unsubToken, token))
    .returning();
  return rows.length > 0;
}

export async function getDiscountCode(code: string): Promise<DiscountCode | null> {
  const normalized = code.trim().toUpperCase();
  const db = getDb();
  if (!db) return memory().discounts.get(normalized) ?? null;
  const rows = await db
    .select()
    .from(discountCodes)
    .where(eq(discountCodes.code, normalized))
    .limit(1);
  return rows[0] ?? null;
}

export function isDiscountUsable(d: DiscountCode | null): d is DiscountCode {
  if (!d || !d.active) return false;
  if (d.expiresAt && d.expiresAt.getTime() < Date.now()) return false;
  if (d.maxRedemptions !== null && d.redemptions >= d.maxRedemptions) return false;
  return true;
}

export async function redeemDiscount(code: string): Promise<void> {
  const normalized = code.trim().toUpperCase();
  const db = getDb();
  if (!db) {
    const d = memory().discounts.get(normalized);
    if (d) memory().discounts.set(normalized, { ...d, redemptions: d.redemptions + 1 });
    return;
  }
  await db
    .update(discountCodes)
    .set({ redemptions: sql`${discountCodes.redemptions} + 1` })
    .where(eq(discountCodes.code, normalized));
}

/** Returns true the first time a given key is seen, false on every repeat. */
export async function claimEmailSend(
  dedupeKey: string,
  email: string,
  template: string,
): Promise<boolean> {
  const db = getDb();
  if (!db) {
    if (memory().emails.has(dedupeKey)) return false;
    memory().emails.add(dedupeKey);
    return true;
  }
  const rows = await db
    .insert(emailLog)
    .values({ id: newId(), email, template, dedupeKey })
    .onConflictDoNothing()
    .returning();
  return rows.length > 0;
}

/** Returns true the first time a Stripe event id is seen. */
export async function claimWebhook(id: string, type: string): Promise<boolean> {
  const db = getDb();
  if (!db) {
    if (memory().webhooks.has(id)) return false;
    memory().webhooks.add(id);
    return true;
  }
  const rows = await db
    .insert(processedWebhooks)
    .values({ id, type })
    .onConflictDoNothing()
    .returning();
  return rows.length > 0;
}
