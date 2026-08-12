/**
 * First-party analytics client.
 *
 * Events go to our own /api/events and land in our own Postgres. No third-party
 * script, no cross-site identifier, no advertising cookie. That is partly a
 * performance and cost decision and partly a legal one: a first-party,
 * non-tracking identifier used only to count funnel steps avoids the consent
 * banner a US store would otherwise be arguing about, and there is no vendor to
 * add to a privacy policy.
 *
 * The visitor id is a random opaque string in localStorage. It is never joined
 * to a name or address anywhere in the schema.
 */

const VISITOR_KEY = "kin_vid";
const SESSION_KEY = "kin_sid";

export type EventName =
  | "page_view"
  | "builder_started"
  | "person_named"
  | "builder_completed"
  | "preview_rendered"
  | "share_link_copied"
  | "share_link_opened"
  | "chart_duplicated"
  | "size_selected"
  | "checkout_started"
  | "checkout_abandoned"
  | "purchase"
  | "email_captured"
  | "gedcom_uploaded"
  | "gedcom_failed";

function randomId(): string {
  const bytes = new Uint8Array(12);
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function stored(key: string, storage: Storage): string {
  try {
    const existing = storage.getItem(key);
    if (existing) return existing;
    const next = randomId();
    storage.setItem(key, next);
    return next;
  } catch {
    // Private mode, or storage disabled. Fall back to a per-page-load id so
    // counts stay directionally right instead of throwing.
    return randomId();
  }
}

export function visitorId(): string {
  if (typeof window === "undefined") return "server";
  return stored(VISITOR_KEY, window.localStorage);
}

export function sessionId(): string {
  if (typeof window === "undefined") return "server";
  return stored(SESSION_KEY, window.sessionStorage);
}

function utm(): Record<string, string | undefined> {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utmSource: p.get("utm_source") ?? undefined,
    utmMedium: p.get("utm_medium") ?? undefined,
    utmCampaign: p.get("utm_campaign") ?? undefined,
  };
}

export interface TrackOptions {
  chartId?: string;
  orderId?: string;
  /** Cents, for purchase events. */
  value?: number;
  props?: Record<string, unknown>;
}

export function track(name: EventName, options: TrackOptions = {}): void {
  if (typeof window === "undefined") return;

  const body = JSON.stringify({
    name,
    visitorId: visitorId(),
    sessionId: sessionId(),
    path: window.location.pathname,
    referrer: document.referrer || undefined,
    ...utm(),
    ...options,
  });

  try {
    // sendBeacon survives the page unload that follows a checkout redirect,
    // which is exactly when the most valuable event fires.
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/events", new Blob([body], { type: "application/json" }));
      return;
    }
  } catch {
    // fall through to fetch
  }

  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // Analytics must never break the store.
  });
}
