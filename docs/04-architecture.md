# Phase 4 — Technical architecture

Every price below was verified against vendor pricing during research unless
marked otherwise. Print-on-demand costs were **not** verifiable and are labelled
`[ASSUMPTION]` wherever they appear.

---

## The stack

| Layer | Choice | Cost | Why this and not the alternative |
|---|---|---|---|
| Framework | Next.js 16, React 19, TypeScript | — | One deployable unit for storefront, API, and admin. The chart engine is pure TypeScript, so the *same* renderer runs in the browser for live preview and on the server for print. |
| Hosting | **Vercel Pro, 1 seat** | **$20/mo** | Hobby is not merely cheaper — it is contractually unavailable. Vercel's Fair Use terms restrict Hobby to non-commercial use and require Pro for "any method of requesting or processing payment from visitors." The risk is unannounced suspension, not a bill. |
| Database | **Neon Postgres, Launch** | **$5/mo** | The free tier suspends compute when the project exhausts its monthly CU-hours, and it does *not* wake on the next connection — that is a store down for the rest of the billing period. $5 buys out of the worst failure mode on this list. |
| ORM | Drizzle | — | SQL-shaped, no runtime, generates plain migrations. |
| Payments | **Stripe** | 2.9% + $0.30 | Not a preference — a constraint. Lemon Squeezy, Paddle, and Polar all decline physical goods, so the merchant-of-record route that would have absorbed sales tax is closed. |
| Sales tax | Stripe Tax | 0.5% of *registered* volume | Free nexus-threshold monitoring is the highest-leverage free thing on this list. Only charges where you are actually registered. |
| Email | **Resend** | Free to 3k/mo → $20 | React-shaped templates in the same codebase, and automations for the abandoned-builder flow. Postmark has better deliverability but no automation; SES is correct at ~10k orders, not at zero. |
| Artwork storage | Cloudflare R2 | ~$0 at launch | Zero egress. The single most important cost decision in the stack. |
| Analytics | **Our own Postgres** | $0 | See below. |
| Rasterisation | resvg (in-process) | $0 | Native module, marked `serverExternalPackages`. |
| Typeface | EB Garamond, self-hosted | $0 | SIL Open Font License. No CDN request, no consent question, deterministic metrics. |

**Fixed cost at launch: ~$26/month.** A quarter of the ceiling.

### Why analytics are self-hosted

The brief asked not to need five services open to know whether the business is
working. PostHog's free tier would do the job, but the questions that decide
this business — *does a gift buyer finish typing fifteen names?*, *do relatives
who open a share link buy?* — are specific enough to need custom events either
way. Owning the table means the dashboard can join events against orders, which
no hosted free plan will do, and it removes a vendor from the privacy policy and
the cookie question. Cost: one table and about 200 lines.

---

## Monthly cost at each scale

Assumes ~$95 AOV. Variable costs exclude COGS, which is in
`docs/03-unit-economics.md`.

### Fixed software cost — this is what the <$100 constraint should be judged on

| Service | 0 orders | 100/mo | 1,000/mo | 10,000/mo |
|---|---|---|---|---|
| Vercel Pro | $20 | $20 | $20 | ~$75 |
| Neon | $5 | $5 | ~$10 | ~$35 |
| Resend | $0 | $0 | $20 | *migrate to SES ~$10* |
| Lifecycle email (5k+ contacts) | — | — | ~$40 | ~$300+ |
| Cloudflare R2 | ~$0 | ~$0 | ~$1 | ~$5 |
| Background worker | — | — | $5 | ~$20 |
| Domain (amortised) | $1.25 | $1.25 | $1.25 | $1.25 |
| **Total fixed** | **~$26** | **~$26** | **~$97** | **~$446** |

At the $95k/month revenue mark (1,000 orders), fixed infrastructure is still
under $100/month with no architectural change. That is the answer to "does this
survive success".

### Variable cost

| Line | 100/mo | 1,000/mo | 10,000/mo |
|---|---|---|---|
| Stripe (2.9% + $0.30) | ~$306 | ~$3,060 | ~$30,600 |
| Stripe Tax (0.5%, registered only) | ~$5 | ~$190 | ~$3,300 |
| Chargebacks/fraud [ASSUMPTION 0.3%] | ~$29 | ~$285 | ~$2,850 |

---

## The bill-explosion risk

**Vercel image optimisation.** It is billed per source image and is the
best-known way to turn a traffic spike into a surprise invoice.

This store is structurally immune, and that was deliberate rather than lucky:
**charts are SVG, not images.** The preview, the product pages, the gift guide,
and the homepage hero are all vector markup generated at request time from data
already in memory. There is no image pipeline to bill. `next.config.ts` caps
device sizes anyway, and any future user-uploaded photography must go to R2 with
`unoptimized`.

Second risk: **resvg on a 24×36" sheet at 300 DPI is a 7200×10800 raster**,
which is memory-hungry and slow. It is confined to two routes, both admin- or
share-card-scoped, never on a customer's critical path, and rate limited.

---

## What breaks first, and the migration path

| Breaks at | Symptom | Fix | Rewrite? |
|---|---|---|---|
| ~50 orders/day | Fulfilment by hand stops being sane | Set `PRODIGI_API_KEY`; the adapter already exists | No |
| ~200 concurrent | Neon Launch compute saturates | Raise the Neon tier (a slider) | No |
| ~1,000 orders/mo | Webhook work outgrows a request | Move `submitForFulfillment` to a queue | No — one call site |
| ~5,000 contacts | Resend marketing gets expensive | Move lifecycle email to a dedicated ESP | No |
| ~10,000 orders/mo | Resend transactional gets expensive | Swap to SES behind `lib/email/send.ts` | No |
| Rate limiting | In-process counters are per-instance | Swap the store for Upstash; call sites unchanged | No |

Nothing on that list is a rewrite, and that is the point of the boundaries:
`lib/fulfillment.ts`, `lib/email/send.ts`, `lib/db/repo.ts`, and
`lib/rate-limit.ts` each hide a vendor behind a function.

**The deliberate lock-in is Postgres**, which is why Turso and Cloudflare D1
were rejected despite being cheaper. Both are SQLite. Concurrent-write
correctness on an order ledger is the whole job, and changing engine later
genuinely *is* the rewrite this architecture exists to avoid. Every remaining
option speaks Postgres, so moving is dump-and-restore.

---

## Security

| Concern | Handling |
|---|---|
| Payment integrity | Prices are **always** recomputed server-side from the chart id. Client-supplied amounts are ignored. Covered by a journey test. |
| Webhook forgery | Stripe signature verified against the raw body. Unconfigured secret returns 503 so Stripe retries rather than losing the event. |
| Replay / duplicate delivery | Every Stripe event id is claimed once (`processed_webhooks`); every email send is claimed once (`email_log`). A retry cannot double-charge, double-mail, or double-print. |
| Chart privacy | Share tokens are ~100 bits of entropy. Chart pages are `noindex`, excluded from the sitemap, and disallowed in robots.txt. |
| XSS | All customer text is XML-escaped in the renderer. Covered by both unit and journey tests. |
| Artwork theft | Anonymous renders are watermarked; only an admin session gets clean full-resolution files. |
| Abuse | Per-IP fixed-window limits on every write route; admin login limited to 8 attempts per 10 minutes. |
| Admin auth | Single password, HMAC-signed cookie with the expiry inside the signed payload. Constant-time comparison. |
| Headers | HSTS, `X-Content-Type-Options`, `X-Frame-Options: DENY`, strict referrer policy. |

**Known limitation, accepted deliberately:** anyone holding a chart *id* can
overwrite that chart, because there are no accounts. The id is unguessable and
never appears in a share link — sharing uses a separate read-only token — so
possession of the id is equivalent to being the author. Adding accounts would
cost more conversion than this risk is worth at this stage.

---

## Running with nothing configured

Every external dependency degrades instead of failing:

| Missing | Behaviour |
|---|---|
| `DATABASE_URL` | In-memory store. Dashboard shows a warning. |
| `STRIPE_SECRET_KEY` | Checkout simulated, labelled on screen, **refuses to run in production**. |
| `STRIPE_WEBHOOK_SECRET` | Webhooks return 503 rather than trusting unsigned events. |
| `RESEND_API_KEY` | Emails logged to console. |
| `PRODIGI_API_KEY` | Orders queue as `awaiting_manual` with a fulfilment brief. |
| `ADMIN_PASSWORD` | Dashboard explains what to set. |

This is why the full journey can be reviewed before a single account is opened,
and it is what `scripts/journey.mjs` exercises.
