# Deployment

Nothing here needs a credit card except the domain, Vercel Pro, and Neon
(~$26/month combined). Work top to bottom; each step says what breaks if you
skip it.

---

## 0 · Run it locally first (5 minutes, no accounts)

```bash
npm install
npm run dev            # http://localhost:3000
```

The store runs with **no environment variables at all**. Charts and orders live
in memory, checkout is simulated, email prints to the console. Walk the whole
journey before opening a single account:

```bash
ADMIN_PASSWORD=test npm run dev
node scripts/journey.mjs        # 58 checks across the full journey
npm test                        # 33 unit tests
npm run preview                 # sample charts → PNG, to look at
```

---

## 1 · Domain

Buy one. Cloudflare Registrar sells at cost (~$10–12/yr for `.com`).

**Before you buy, check the name is clear.** `Kinline` has *not* been cleared —
search the USPTO TESS database and a plain web search for existing use in
printing, genealogy, or software. If it is taken, the name lives in exactly one
place (`lib/site.ts`) plus the watermark string in `lib/chart/render-svg.ts`.
Changing it is a ten-minute job now and a painful one after launch.

---

## 2 · Database — Neon (~$5/mo)

1. Create a project at neon.tech, region nearest your customers.
2. **Take the Launch plan, not Free.** The free tier suspends compute when the
   project exhausts its monthly CU-hours and does *not* wake on the next
   connection — that is a store down for the rest of the billing period.
3. Copy the **pooled** connection string → `DATABASE_URL`.
4. Generate and apply the schema:

```bash
npm run db:generate     # writes SQL to drizzle/
npm run db:migrate
```

*Skip this and every order vanishes on the next deploy.*

---

## 3 · Payments — Stripe

1. Create an account, activate it (business details and a bank account).
2. **API keys** → copy the secret key → `STRIPE_SECRET_KEY`.
3. **Webhooks** → add endpoint `https://yourdomain.com/api/webhooks/stripe`,
   subscribe to:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `checkout.session.async_payment_failed`
   - `checkout.session.expired`
   - `charge.refunded`
4. Copy the signing secret → `STRIPE_WEBHOOK_SECRET`.
5. **Stripe Tax** → enable monitoring. It is free until you register somewhere,
   and it will tell you when you cross a nexus threshold.

Locally: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`.

> **The one that actually loses money:** a live `STRIPE_SECRET_KEY` with no
> `STRIPE_WEBHOOK_SECRET` means customers are charged and **no order is ever
> recorded or fulfilled**. `productionReadiness()` in `lib/env.ts` refuses to
> consider the deploy healthy in that state. Do not override it.

---

## 4 · Email — Resend (free to 3,000/mo)

1. Add your domain and set the DNS records it gives you.
2. **Set up SPF, DKIM, and DMARC.** Gmail and Yahoo bulk-sender rules mean an
   unauthenticated domain lands in spam. Start DMARC at `p=none`.
3. API key → `RESEND_API_KEY`. Set `EMAIL_FROM` and `SUPPORT_EMAIL`.

*Skip this and order confirmations are logged to the server console instead of
reaching customers.*

---

## 5 · Hosting — Vercel Pro ($20/mo)

1. Import the GitHub repo.
2. **Pro, not Hobby.** Hobby's Fair Use terms forbid "any method of requesting
   or processing payment from visitors". The risk is unannounced suspension.
3. Add every variable from `.env.example` under Production.
4. Set `NEXT_PUBLIC_SITE_URL` to your real domain — Stripe redirect URLs and
   canonical tags are built from it.
5. Generate a session secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Set it as `SESSION_SECRET`, and pick a real `ADMIN_PASSWORD`.

---

## 6 · Fulfilment — deliberately last

**Do not automate this before the first dozen orders.** Without
`PRODIGI_API_KEY`, paid orders queue as `awaiting_manual` in the dashboard with
a fulfilment brief and download links for print-ready SVG and 300 DPI PNG. That
is the right way to start: placing the first orders by hand is how you find out
what the provider actually gets wrong, while it is still cheap to find out.

**Before any of that, verify the numbers.** Every COGS figure in this repo is a
modelling assumption. Order the same chart from **Prodigi and Gelato**, compare
quality and true delivered cost, then update `PRINT_VARIANTS` in
`lib/pricing.ts`. Also confirm the SKUs in `lib/fulfillment.ts` against the live
catalogue — they are placeholders keyed to the nearest ISO size, and a wrong SKU
prints the wrong thing at the wrong cost.

When you are ready: set `PRODIGI_API_KEY`, leave `PRODIGI_SANDBOX=true`, place a
sandbox order end to end, then flip to `false`.

---

## 7 · Pre-launch checklist

- [ ] `npm run build` passes
- [ ] `npm test` — 33 passing
- [ ] `node scripts/journey.mjs https://yourdomain.com` — 58 passing
- [ ] A real card buys a real chart, and the order appears in `/admin`
- [ ] The confirmation email arrives in a Gmail **inbox**, not spam
- [ ] Share a chart link into iMessage/WhatsApp — the preview card renders
- [ ] `/admin` is unreachable without the password
- [ ] Terms, privacy, and refunds reviewed by a lawyer (see
      `docs/13-legal-compliance.md`)
- [ ] Business entity and home-state sales tax registration considered
- [ ] Samples ordered from two suppliers; `lib/pricing.ts` updated with real
      costs

---

## Operating it

**Daily (2 min):** `/admin` → fulfil anything `awaiting_manual` → paste tracking
→ "Mark shipped & email customer".

**Weekly (10 min):** `/admin?days=7`. Builder completion first — below 25% is a
kill signal. Then share links opened vs. purchases from them, then margin.

**Monthly:** reconcile modelled COGS against real supplier invoices. If margin
has drifted below 55%, reprice.
