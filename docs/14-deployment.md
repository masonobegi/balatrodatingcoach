# Deployment

Deploys to **Railway** (app + Postgres in one project, ~$12/month) plus a
domain. Work top to bottom; each step says what breaks if you skip it.

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

## 2 · App and database — Railway (~$12/mo)

Railway hosts both, in one project, on a private network. That means no egress
charge between app and database and a single bill.

1. **New Project → Deploy from GitHub repo** → pick this repository.
   `railway.toml` is already committed, so the build and start commands, the
   healthcheck, and the restart policy are configured.
2. **New → Database → Add PostgreSQL** in the same project.
3. In the app service's **Variables**, reference the database rather than
   pasting a URL:

   ```
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   ```

   Railway resolves that at deploy time and keeps it correct if credentials
   rotate.
4. **Settings → Networking → Generate Domain** (or add your own).
5. Add the rest of the variables from `.env.example`, and set
   `NEXT_PUBLIC_SITE_URL` to the real domain.
6. Apply the schema. Either run it locally against the public connection
   string, or use `railway run`:

   ```bash
   railway run npm run db:migrate
   railway run npm run db:seed      # discount codes
   ```

The healthcheck at `/api/health` round-trips the database, so a deploy with a
broken connection string fails and rolls back rather than serving a store that
cannot record an order.

*Skip the migration and every request that touches the database errors.*

> **Neon instead?** Also fine — set `DATABASE_URL` to a Neon pooled string and
> `lib/db/index.ts` switches to Neon's HTTP driver automatically. Railway
> Postgres is the default recommendation only because the account already
> exists and co-locating is simpler.

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

## 5 · Domain and secrets

1. Point your domain at the Railway service (**Settings → Networking → Custom
   Domain**) and add the CNAME it gives you.
2. Generate a session secret:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
   ```

   Set it as `SESSION_SECRET`, and pick a real `ADMIN_PASSWORD`.
3. Confirm `NEXT_PUBLIC_SITE_URL` matches the live domain exactly — Stripe
   redirect URLs, canonical tags, and share links are all built from it.

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

When you are ready, this is what makes it set-and-forget:

1. Set `PRODIGI_API_KEY` and leave `PRODIGI_SANDBOX=true`.
2. Generate a callback secret and set `PRODIGI_WEBHOOK_KEY`:

   ```bash
   node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"
   ```

3. Place a sandbox order end to end and confirm the provider fetched the
   artwork, then flip `PRODIGI_SANDBOX=false`.

With both set, a paid order runs start to finish without you: payment →
artwork URL stamped → order submitted to the lab → lab prints and ships →
callback marks it shipped and emails the customer their tracking link. You are
only involved if someone emails you.

**No object storage is required for this.** The partner fetches the print file
from a signed URL this app serves (`/api/artwork/{reference}?sig=…`), rendered
from the frozen chart snapshot so later edits by the customer cannot change
what goes to press.

> **Verify the callback payload shape.** The provider's callback format could
> not be confirmed during research, so the handler parses defensively and
> acknowledges anything it does not recognise rather than erroring. Place one
> sandbox order, read the callback in your logs, and tighten
> `app/api/webhooks/prodigi/route.ts` to the real shape.

---

## 7 · Pre-launch checklist

- [ ] `npm run build` passes
- [ ] `npm test` — 33 passing
- [ ] `npm run test:builder` — 16 passing (needs a running server)
- [ ] `node scripts/journey.mjs https://yourdomain.com` — 58 passing
- [ ] `curl https://yourdomain.com/api/health` returns `"status":"ok"`
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
