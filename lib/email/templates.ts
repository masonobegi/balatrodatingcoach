import type { Order } from "../db/schema";
import { formatMoney } from "../pricing";
import { SITE } from "../site";

/**
 * Email templates as plain functions returning HTML and text.
 *
 * Hand-written HTML rather than a component library: there are four emails, and
 * every mail client renders tables differently enough that a framework would
 * hide the problem rather than solve it. Layout stays single-column with inline
 * styles, which is the only thing that survives Outlook and Gmail alike.
 *
 * Every marketing send must carry a physical address and an unsubscribe link
 * (CAN-SPAM). Transactional sends — receipts, shipping — are exempt from the
 * unsubscribe requirement but must not carry promotional content.
 */

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

const INK = "#23201b";
const MUTED = "#7d7266";
const PAPER = "#fbf8f2";
const RULE = "#e3dace";
const WALNUT = "#7a5c3e";

function shell(bodyHtml: string, footerHtml = ""): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>${SITE.name}</title></head>
<body style="margin:0;padding:0;background:${PAPER};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};">
<tr><td align="center" style="padding:32px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fffdf9;border:1px solid ${RULE};border-radius:3px;">
<tr><td style="padding:28px 32px 0;">
<p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;color:${INK};">${SITE.name}</p>
</td></tr>
<tr><td style="padding:20px 32px 32px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:${INK};">
${bodyHtml}
</td></tr>
</table>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
<tr><td style="padding:18px 32px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:${MUTED};">
${footerHtml}
<p style="margin:8px 0 0;">${SITE.name} · <a href="mailto:${SITE.email}" style="color:${MUTED};">${SITE.email}</a></p>
</td></tr>
</table>
</td></tr></table></body></html>`;
}

function button(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:22px 0;"><tr>
<td style="background:${INK};border-radius:2px;">
<a href="${href}" style="display:inline-block;padding:12px 22px;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;font-weight:600;color:${PAPER};text-decoration:none;">${label}</a>
</td></tr></table>`;
}

function lineItemsHtml(order: Order): string {
  const items = order.items as { lines?: { label: string; total: number }[]; addons?: { label: string; total: number }[] };
  const rows: string[] = [];

  for (const l of items.lines ?? []) {
    rows.push(
      `<tr><td style="padding:6px 0;color:${INK};">${escapeHtml(l.label)}</td><td align="right" style="padding:6px 0;color:${INK};">${formatMoney(l.total)}</td></tr>`,
    );
  }
  for (const a of items.addons ?? []) {
    rows.push(
      `<tr><td style="padding:6px 0;color:${MUTED};">${escapeHtml(a.label)}</td><td align="right" style="padding:6px 0;color:${MUTED};">${a.total === 0 ? "Included" : formatMoney(a.total)}</td></tr>`,
    );
  }
  if (order.shipping > 0) {
    rows.push(
      `<tr><td style="padding:6px 0;color:${MUTED};">Shipping</td><td align="right" style="padding:6px 0;color:${MUTED};">${formatMoney(order.shipping)}</td></tr>`,
    );
  }
  if (order.discount > 0) {
    rows.push(
      `<tr><td style="padding:6px 0;color:${WALNUT};">Discount</td><td align="right" style="padding:6px 0;color:${WALNUT};">−${formatMoney(order.discount)}</td></tr>`,
    );
  }

  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0;border-top:1px solid ${RULE};border-bottom:1px solid ${RULE};font-size:14px;">
${rows.join("")}
<tr><td style="padding:10px 0;font-weight:700;border-top:1px solid ${RULE};">Total</td>
<td align="right" style="padding:10px 0;font-weight:700;border-top:1px solid ${RULE};">${formatMoney(order.total)}</td></tr>
</table>`;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function orderConfirmation(order: Order): RenderedEmail {
  const url = `${SITE.url}/order/${order.reference}`;
  const name = order.customerName?.split(" ")[0] ?? "there";

  return {
    subject: `Your chart is on its way — ${order.reference}`,
    html: shell(
      `<p style="margin:0 0 14px;">Hello ${escapeHtml(name)},</p>
<p style="margin:0 0 14px;">Thank you — your family tree chart is confirmed and going into production. We print to order, so it takes a few days before it ships.</p>
<p style="margin:0 0 6px;font-size:13px;color:${MUTED};">Order ${order.reference}</p>
${lineItemsHtml(order)}
${button(url, "View your order")}
<p style="margin:14px 0 0;font-size:14px;color:${MUTED};">Spotted a name that isn't right? Reply to this email within 30 days and we'll reprint it once, free. Family names are hard and we would rather you had it right.</p>`,
    ),
    text: `Hello ${name},

Thank you — your family tree chart is confirmed and going into production.

Order ${order.reference}
Total ${formatMoney(order.total)}

View your order: ${url}

Spotted a name that isn't right? Reply within 30 days and we'll reprint it once, free.

${SITE.name} · ${SITE.email}`,
  };
}

export function shippingNotice(order: Order): RenderedEmail {
  const url = order.trackingUrl ?? `${SITE.url}/order/${order.reference}`;
  const name = order.customerName?.split(" ")[0] ?? "there";

  return {
    subject: `Your chart has shipped — ${order.reference}`,
    html: shell(
      `<p style="margin:0 0 14px;">Hello ${escapeHtml(name)},</p>
<p style="margin:0 0 14px;">Your chart is on its way. It travels rolled in a tube, so give it a day flat under something heavy before framing.</p>
${button(url, order.trackingUrl ? "Track your parcel" : "View your order")}
<p style="margin:14px 0 0;font-size:14px;color:${MUTED};">It's printed at a standard size, so any off-the-shelf frame in that size will fit.</p>`,
    ),
    text: `Hello ${name},

Your chart has shipped. It travels rolled in a tube — give it a day flat under something heavy before framing.

${url}

${SITE.name} · ${SITE.email}`,
  };
}

/**
 * Sent to someone who built a chart and stopped. This is a MARKETING send, so
 * it carries an unsubscribe link.
 */
export function chartSaved(args: {
  token: string;
  filled: number;
  unsubToken: string;
}): RenderedEmail {
  const url = `${SITE.url}/chart/${args.token}`;
  return {
    subject: "Your family tree chart is saved",
    html: shell(
      `<p style="margin:0 0 14px;">Your chart is saved with ${args.filled} ${args.filled === 1 ? "name" : "names"} on it. Nothing expires — come back whenever you like.</p>
${button(url, "Open your chart")}
<p style="margin:14px 0 0;font-size:14px;color:${MUTED};">If you're stuck on a name, send that link to a relative. Most people fill the last few gaps by asking someone older.</p>`,
      `<p style="margin:0;"><a href="${SITE.url}/unsubscribe?t=${args.unsubToken}" style="color:${MUTED};">Unsubscribe</a></p>`,
    ),
    text: `Your chart is saved with ${args.filled} ${args.filled === 1 ? "name" : "names"} on it.

Open it: ${url}

Stuck on a name? Send that link to a relative.

Unsubscribe: ${SITE.url}/unsubscribe?t=${args.unsubToken}
${SITE.name} · ${SITE.email}`,
  };
}
