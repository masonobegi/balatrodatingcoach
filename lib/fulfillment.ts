/**
 * Fulfilment.
 *
 * Deliberately an interface with two implementations rather than a direct
 * Prodigi client. Supplier pricing is the single least-verified number in this
 * business — no live quote was obtainable during research — so the founder may
 * well end up on Gelato, Cloudprinter, or a local giclée printer after the
 * sample comparison in week one. Swapping provider must be one new file, not a
 * refactor of the order flow.
 *
 * Until an API key exists, orders queue as `awaiting_manual` and appear in the
 * admin dashboard with everything needed to place them by hand. That is not a
 * degraded mode — placing the first dozen orders by hand is the *right* way to
 * run this, because it is how you find out what the provider actually gets
 * wrong before volume makes it expensive.
 */

import { env, capabilities } from "./env";
import { updateOrder } from "./db/repo";
import type { Order } from "./db/schema";
import { PAPER_SIZES, type PaperSize } from "./chart/types";

export interface FulfillmentRequest {
  reference: string;
  size: PaperSize;
  framed: boolean;
  quantity: number;
  artworkUrl: string;
  recipient: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postcode: string;
    country: string;
  };
}

export interface FulfillmentResult {
  ok: boolean;
  providerOrderId?: string;
  status: "submitted" | "awaiting_manual" | "failed";
  message?: string;
}

/**
 * Prodigi SKUs for fine-art paper. These are placeholders keyed to the
 * closest ISO size and MUST be confirmed against the live catalogue before the
 * first real order — a wrong SKU prints the wrong thing at the wrong cost.
 */
const PRODIGI_SKUS: Record<PaperSize, { unframed: string; framed: string; note: string }> = {
  "12x18": { unframed: "GLOBAL-FAP-A3", framed: "GLOBAL-CFPM-A3", note: "≈ A3" },
  "18x24": { unframed: "GLOBAL-FAP-A2", framed: "GLOBAL-CFPM-A2", note: "≈ A2" },
  "24x36": { unframed: "GLOBAL-FAP-A1", framed: "GLOBAL-CFPM-A1", note: "≈ A1" },
};

export function skuFor(size: PaperSize, framed: boolean): string {
  const entry = PRODIGI_SKUS[size];
  return framed ? entry.framed : entry.unframed;
}

export function fulfillmentBriefFor(order: Order): string {
  const items = order.items as { lines?: { label: string; size: PaperSize; framed: boolean }[] };
  const lines = (items.lines ?? [])
    .map((l) => `  · ${PAPER_SIZES[l.size]?.label ?? l.size} — SKU ${skuFor(l.size, l.framed)}`)
    .join("\n");
  return `Order ${order.reference}\n${lines}\nArtwork: ${order.artworkUrl ?? "(render from admin)"}`;
}

async function submitToProdigi(req: FulfillmentRequest): Promise<FulfillmentResult> {
  const base = env.prodigiSandbox
    ? "https://api.sandbox.prodigi.com/v4.0"
    : "https://api.prodigi.com/v4.0";

  try {
    const res = await fetch(`${base}/Orders`, {
      method: "POST",
      headers: {
        "X-API-Key": env.prodigiApiKey ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchantReference: req.reference,
        shippingMethod: "Standard",
        // Where the provider reports status and tracking back to. This is what
        // turns fulfilment into set-and-forget: without it somebody has to
        // watch their dashboard and copy tracking numbers across by hand.
        ...(env.prodigiWebhookKey
          ? {
              callbackUrl: `${env.siteUrl}/api/webhooks/prodigi?key=${encodeURIComponent(
                env.prodigiWebhookKey,
              )}`,
            }
          : {}),
        recipient: {
          name: req.recipient.name,
          address: {
            line1: req.recipient.line1,
            line2: req.recipient.line2,
            postalOrZipCode: req.recipient.postcode,
            countryCode: req.recipient.country,
            townOrCity: req.recipient.city,
            stateOrCounty: req.recipient.state,
          },
        },
        items: [
          {
            merchantReference: req.reference,
            sku: skuFor(req.size, req.framed),
            copies: req.quantity,
            sizing: "fillPrintArea",
            assets: [{ printArea: "default", url: req.artworkUrl }],
          },
        ],
      }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return {
        ok: false,
        status: "failed",
        message: `Prodigi responded ${res.status}: ${text.slice(0, 300)}`,
      };
    }

    const json = (await res.json()) as { order?: { id?: string } };
    return { ok: true, status: "submitted", providerOrderId: json.order?.id };
  } catch (error) {
    return {
      ok: false,
      status: "failed",
      message: error instanceof Error ? error.message : "unknown error",
    };
  }
}

/**
 * Called after payment is confirmed. Never throws — a fulfilment failure must
 * not fail the webhook, because the money has already moved and the order is
 * recorded. Failures surface in the admin dashboard instead.
 */
export async function submitForFulfillment(order: Order): Promise<FulfillmentResult> {
  if (!capabilities.fulfillment) {
    await updateOrder(order.id, { fulfillmentStatus: "awaiting_manual" });
    return {
      ok: true,
      status: "awaiting_manual",
      message: "No fulfilment provider configured — queued for manual placement.",
    };
  }

  const address = order.shippingAddress as
    | { name?: string; address?: Record<string, string | null> }
    | null;
  const a = address?.address;

  if (!a?.line1 || !a?.country) {
    await updateOrder(order.id, {
      fulfillmentStatus: "awaiting_manual",
      notes: [order.notes, "No usable shipping address on the order."]
        .filter(Boolean)
        .join("\n"),
    });
    return { ok: false, status: "awaiting_manual", message: "Missing shipping address" };
  }

  if (!order.artworkUrl) {
    await updateOrder(order.id, {
      fulfillmentStatus: "awaiting_manual",
      notes: [order.notes, "Artwork was not archived; render and place manually."]
        .filter(Boolean)
        .join("\n"),
    });
    return { ok: false, status: "awaiting_manual", message: "No artwork URL" };
  }

  const items = order.items as { lines?: { size: PaperSize; framed: boolean }[] };
  const first = items.lines?.[0];
  if (!first) return { ok: false, status: "failed", message: "Order has no printable line" };

  const result = await submitToProdigi({
    reference: order.reference,
    size: first.size,
    framed: first.framed,
    quantity: items.lines?.length ?? 1,
    artworkUrl: order.artworkUrl,
    recipient: {
      name: address?.name ?? order.customerName ?? "Customer",
      line1: a.line1,
      line2: a.line2 ?? undefined,
      city: a.city ?? "",
      state: a.state ?? undefined,
      postcode: a.postal_code ?? "",
      country: a.country,
    },
  });

  await updateOrder(order.id, {
    fulfillmentStatus: result.ok ? "submitted" : "awaiting_manual",
    fulfillmentId: result.providerOrderId ?? null,
    notes: result.message
      ? [order.notes, result.message].filter(Boolean).join("\n")
      : order.notes,
  });

  return result;
}
