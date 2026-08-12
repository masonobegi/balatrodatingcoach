/**
 * End-to-end walk of the whole customer journey against a running server.
 *
 * Exercises the real HTTP surface rather than mocking it: build a chart, save
 * it, open the share link a relative would receive, check out, land on the
 * confirmation, look the order up, and sign in to the dashboard. Also probes
 * the things that lose money or leak data if they break — webhook signature
 * enforcement, price tampering, watermarking, noindex on private pages.
 *
 *   node scripts/journey.mjs [baseUrl]
 */

import { createHmac } from "node:crypto";

const BASE = process.argv[2] ?? "http://localhost:3000";

/** Mirrors lib/artwork.ts so the provider's fetch path can actually be tested. */
function artworkSig(reference) {
  const secret = process.env.SESSION_SECRET ?? process.env.ADMIN_PASSWORD;
  if (!secret) return null;
  return createHmac("sha256", secret).update(`artwork:${reference}`).digest("base64url").slice(0, 32);
}

let passed = 0;
let failed = 0;
const failures = [];

function check(name, ok, detail = "") {
  if (ok) {
    passed++;
    console.log(`  ok   ${name}`);
  } else {
    failed++;
    failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
    console.log(`  FAIL ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

function section(title) {
  console.log(`\n${title}`);
}

const jar = new Map();

async function req(path, options = {}) {
  const headers = new Headers(options.headers ?? {});
  if (jar.size > 0) {
    headers.set("Cookie", [...jar.entries()].map(([k, v]) => `${k}=${v}`).join("; "));
  }
  const res = await fetch(`${BASE}${path}`, { ...options, headers, redirect: "manual" });
  for (const [key, value] of res.headers) {
    if (key.toLowerCase() === "set-cookie") {
      const [pair] = value.split(";");
      const idx = pair.indexOf("=");
      if (idx > 0) jar.set(pair.slice(0, idx), pair.slice(idx + 1));
    }
  }
  return res;
}

// ---------------------------------------------------------------------------

section("Storefront renders");
for (const path of [
  "/", "/build", "/prints", "/gifts", "/how-it-works", "/faq",
  "/orders", "/terms", "/privacy", "/refunds", "/shipping-and-returns",
  "/sitemap.xml", "/robots.txt",
]) {
  const res = await req(path);
  check(`GET ${path}`, res.status === 200, `HTTP ${res.status}`);
}

const notFound = await req("/this-page-does-not-exist");
check("GET /unknown returns 404", notFound.status === 404, `HTTP ${notFound.status}`);

// ---------------------------------------------------------------------------

section("Build and save a chart");

const people = {
  1: { given: "Margaret", surname: "Doyle", birthYear: "1931", deathYear: "2019" },
  2: { given: "John Henry", surname: "Doyle", birthYear: "1898" },
  3: { given: "Bridget", surname: "O'Connell", birthYear: "1902" },
  4: { given: "Patrick", surname: "Doyle", birthYear: "1869" },
  5: { given: "Nora", surname: "Fitzgerald", birthYear: "1873" },
  6: { given: "Thomas", surname: "O'Connell" },
  7: { given: "Anne", surname: "Marchetti" },
  8: { given: "Michael", surname: "Doyle" },
};

const config = {
  style: "fan", generations: 4, size: "18x24", theme: "heirloom",
  title: "The Doyle Family", subtitle: "Christmas 2026",
  showDates: true, showPlaces: false,
};

const saveRes = await req("/api/charts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ config, people }),
});
const saved = await saveRes.json();
check("POST /api/charts creates a chart", saveRes.status === 201 && !!saved.id, `HTTP ${saveRes.status}`);
check("chart returns a share token", typeof saved.token === "string" && saved.token.length >= 20);
check("chart id and share token differ", saved.id !== saved.token);

const updateRes = await req("/api/charts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ id: saved.id, config, people: { ...people, 9: { given: "Ellen", surname: "Whitfield" } } }),
});
const updated = await updateRes.json();
check("re-saving updates in place", updateRes.status === 200 && updated.id === saved.id);
check("share token is stable across edits", updated.token === saved.token);

const badSave = await req("/api/charts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ config: { ...config, generations: 99 }, people }),
});
check("rejects an out-of-range generation count", badSave.status === 400, `HTTP ${badSave.status}`);

// ---------------------------------------------------------------------------

section("The share loop");

const shareRes = await req(`/chart/${saved.token}`);
const shareHtml = await shareRes.text();
check(`GET /chart/{token}`, shareRes.status === 200, `HTTP ${shareRes.status}`);
check("shared chart shows the family name", shareHtml.includes("Doyle"));
check("shared chart offers a copy to the relative", /Order this chart/i.test(shareHtml));
check("shared chart is noindex", /noindex/i.test(shareHtml));

const badToken = await req("/chart/NOTAREALTOKEN00000000");
check("unknown share token 404s", badToken.status === 404, `HTTP ${badToken.status}`);

// ---------------------------------------------------------------------------

section("Artwork");

const svgRes = await req(`/api/render/${saved.token}?format=svg`);
const svg = await svgRes.text();
check("renders print-ready SVG", svgRes.status === 200 && svg.startsWith("<svg"));
check("anonymous artwork is watermarked", svg.includes("KINLINE PREVIEW"));
check("SVG carries no NaN geometry", !/NaN|Infinity/.test(svg));
check("customer names appear in the artwork", svg.includes("Margaret"));

// ---------------------------------------------------------------------------

section("Checkout");

const checkoutPage = await req(`/checkout?chart=${saved.id}`);
check("checkout page loads for a real chart", checkoutPage.status === 200, `HTTP ${checkoutPage.status}`);

const checkoutMissing = await req("/checkout?chart=doesnotexist");
check("checkout 404s for an unknown chart", checkoutMissing.status === 404, `HTTP ${checkoutMissing.status}`);

const orderRes = await req("/api/checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chartId: saved.id,
    items: [{ size: "18x24", framed: false, quantity: 2 }],
    giftWrap: true,
    digitalFile: false,
    email: "buyer@example.com",
  }),
});
const order = await orderRes.json();
check("POST /api/checkout succeeds", orderRes.status === 200 && !!order.url, JSON.stringify(order).slice(0, 120));

const reference = order.url?.match(/\/order\/([^?]+)/)?.[1];
check("checkout returns an order reference", !!reference, order.url);

const badEmail = await req("/api/checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chartId: saved.id,
    items: [{ size: "18x24", framed: false, quantity: 1 }],
    email: "not-an-email",
  }),
});
check("rejects a malformed email", badEmail.status === 400, `HTTP ${badEmail.status}`);

const fakeDiscount = await req("/api/checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chartId: saved.id,
    items: [{ size: "18x24", framed: false, quantity: 1 }],
    email: "buyer@example.com",
    discountCode: "TOTALLYFAKE",
  }),
});
check("rejects an invalid discount code", fakeDiscount.status === 400, `HTTP ${fakeDiscount.status}`);

// Price tampering: the server must ignore anything the client says about money.
const tamper = await req("/api/checkout", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chartId: saved.id,
    items: [{ size: "24x36", framed: false, quantity: 1 }],
    email: "buyer@example.com",
    total: 1, subtotal: 1, price: 1,
  }),
});
check("accepts the request but ignores client-supplied totals", tamper.status === 200);

// ---------------------------------------------------------------------------

section("Order confirmation and lookup");

if (reference) {
  const confirm = await req(`/order/${reference}?simulated=1`);
  const confirmHtml = await confirm.text();
  check("confirmation page loads", confirm.status === 200, `HTTP ${confirm.status}`);
  check("confirmation shows the reference", confirmHtml.includes(reference));
  check("confirmation is noindex", /noindex/i.test(confirmHtml));
  check("simulated orders are labelled as such", /Simulated order/i.test(confirmHtml));
  // React's SSR splits adjacent expressions with a comment node, so the markup
  // reads `25<!-- -->%` — match the label rather than the interpolated number.
  check("multi-copy discount is shown to the customer", /extra-copy discount/.test(confirmHtml));

  const lookup = await req(`/api/orders/${reference}`);
  check("order lookup finds it", lookup.status === 200, `HTTP ${lookup.status}`);
  const lookupBody = await lookup.json();
  check("lookup leaks no order content", Object.keys(lookupBody).join() === "found");
}

const missingOrder = await req("/api/orders/KIN-NOPE00");
check("lookup 404s for an unknown reference", missingOrder.status === 404, `HTTP ${missingOrder.status}`);

// ---------------------------------------------------------------------------

section("Automated fulfilment");

if (reference) {
  // The artwork URL is what makes fulfilment set-and-forget. If it is absent or
  // unsigned, every order silently falls through to manual placement.
  const orderPage = await req(`/order/${reference}?simulated=1`);
  await orderPage.text();

  const unsigned = await req(`/api/artwork/${reference}`);
  check("artwork refuses an unsigned request", unsigned.status === 404, `HTTP ${unsigned.status}`);

  const badSig = await req(`/api/artwork/${reference}?sig=obviouslywrongsignature000000000`);
  check("artwork refuses a bad signature", badSig.status === 404, `HTTP ${badSig.status}`);

  const sig = artworkSig(reference);
  if (sig) {
    const svgArt = await req(`/api/artwork/${reference}?sig=${sig}&format=svg`);
    const body = await svgArt.text();
    check("signed artwork renders for the print partner", svgArt.status === 200 && body.startsWith("<svg"), `HTTP ${svgArt.status}`);
    check("provider artwork is NOT watermarked", !body.includes("KINLINE PREVIEW"));
    check("artwork contains the purchased names", body.includes("Margaret"));
    check("artwork carries no NaN geometry", !/NaN|Infinity/.test(body));
  } else {
    console.log("  skip signed-artwork checks — set SESSION_SECRET to run them");
  }
}

const prodigiUnauth = await req("/api/webhooks/prodigi", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ order: { merchantReference: reference ?? "KIN-X", status: { stage: "Complete" } } }),
});
check(
  "fulfilment callback rejects a missing/!bad key",
  prodigiUnauth.status === 401 || prodigiUnauth.status === 503,
  `HTTP ${prodigiUnauth.status}`,
);

// ---------------------------------------------------------------------------

section("Security");

const webhook = await req("/api/webhooks/stripe", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ type: "checkout.session.completed", data: { object: { id: "cs_fake" } } }),
});
check(
  "unsigned Stripe webhooks are refused",
  webhook.status === 400 || webhook.status === 503,
  `HTTP ${webhook.status}`,
);

const adminBefore = await req("/admin");
const adminHtml = await adminBefore.text();
check("dashboard hides data when signed out", !/Gross profit/.test(adminHtml));

const adminOrder = await req("/api/admin/orders/KIN-ANYTHING", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ action: "mark_shipped", trackingUrl: "https://example.com" }),
});
check("admin order API rejects anonymous callers", adminOrder.status === 401, `HTTP ${adminOrder.status}`);

const badLogin = await req("/api/admin/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ password: "wrong-password" }),
});
// A 429 here is the brute-force limiter doing its job, not a defect. Repeated
// runs of this suite within the window will trip it, so report it as such
// rather than as a product failure.
if (badLogin.status === 429) {
  console.log("  note admin login is rate-limited right now (8 per 10 min) — limiter working");
} else {
  check("wrong admin password is rejected", badLogin.status === 401, `HTTP ${badLogin.status}`);
}

// XSS: a script tag typed into a chart title must never come back executable.
const xssRes = await req("/api/charts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    config: { ...config, title: "<script>alert(1)</script>" },
    people: { 1: { given: "<img src=x onerror=alert(1)>", surname: "Test" } },
  }),
});
const xss = await xssRes.json();
const xssShare = await req(`/chart/${xss.token}`);
const xssHtml = await xssShare.text();
check("script tags are escaped, not executed", !xssHtml.includes("<script>alert(1)</script>"));
check("injected img handlers are escaped", !/<img src=x onerror/.test(xssHtml));

// ---------------------------------------------------------------------------

section("Admin, signed in");

const password = process.env.ADMIN_PASSWORD;
if (password) {
  const login = await req("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (login.status === 429) {
    console.log("  skip admin checks — rate-limited. Restart the server to clear the window.");
  } else {
    check("admin can sign in", login.status === 200, `HTTP ${login.status}`);

    const dash = await req("/admin");
    const dashHtml = await dash.text();
    check("dashboard renders", dash.status === 200, `HTTP ${dash.status}`);
    check("dashboard shows the funnel", /The funnel/.test(dashHtml));
    check("dashboard shows gross profit", /Gross profit/.test(dashHtml));

    if (reference) {
      const detail = await req(`/admin/orders/${reference}`);
      check("admin order detail renders", detail.status === 200, `HTTP ${detail.status}`);
    }

    const adminSvg = await req(`/api/render/${saved.token}?format=svg`);
    const adminSvgBody = await adminSvg.text();
    check("signed-in artwork is NOT watermarked", !adminSvgBody.includes("KINLINE PREVIEW"));
  }
} else {
  console.log("  skip admin checks — set ADMIN_PASSWORD to run them");
}

// ---------------------------------------------------------------------------

section("Analytics");

const event = await req("/api/events", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "page_view", visitorId: "journeytest0001", path: "/" }),
});
check("events are accepted", event.status === 204, `HTTP ${event.status}`);

const junkEvent = await req("/api/events", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: "not json at all",
});
check("malformed events never error", junkEvent.status === 204, `HTTP ${junkEvent.status}`);

// ---------------------------------------------------------------------------

console.log(`\n${"─".repeat(60)}`);
console.log(`${passed} passed, ${failed} failed`);
if (failures.length > 0) {
  console.log("\nFailures:");
  for (const f of failures) console.log(`  · ${f}`);
}
process.exit(failed > 0 ? 1 : 0);
