# Kinline

**Archival family tree charts, built in the browser in about five minutes and
printed to order.**

A complete e-commerce business: storefront, chart engine, checkout, fulfilment,
admin dashboard, and the strategy behind all of it.

```bash
npm install && npm run dev      # runs with zero configuration
```

No credentials needed to try it. Charts and orders live in memory, checkout is
simulated, email prints to the console. Walk the entire customer journey before
opening a single account.

---

## Founder dashboard

| | |
|---|---|
| **What we're selling** | Personalised family tree charts — a circular fan or a classic pedigree tree — giclée printed on archival paper. $49 / $79 / $119. |
| **Who we're selling to** | The organiser daughter: 35–60, buying a gift for a parent or grandparent. She knows her grandparents' names and has never heard of a GEDCOM file. Secondary: the 55–75 family historian who already keeps a tree online. |
| **Why they'll buy** | Amazon cannot sell a chart of *your* ancestors. The product does not exist until the customer creates it — no SKU, no price comparison, no equivalent listing. The incumbents (MyCanvas, WebTreePrint, AncestryPrinting) are engineer-built, visually dated, and all require a file the gift buyer does not have. Etsy sellers do this by hand over chat across several days. |
| **Price / AOV** | $79 hero SKU. **Blended AOV $89** at the modelled mix. |
| **Gross margin** | **71%** — $63 gross profit per order after COGS, shipping and Stripe fees. |
| **Break-even CAC** | **$63** |
| **Monthly fixed costs** | **~$12** (Railway app + Postgres, domain amortised). Under $100 even at $95k/mo revenue. |
| **Orders for $1,000 revenue** | **12/month** — about one every 2½ days. ~560 visitors/month at 2% conversion. |
| **Orders for $1,000 gross profit** | **16/month** (≈$1,430 revenue). The distinction matters; don't confuse the two. |
| **Primary acquisition** | The share loop (free) → Facebook genealogy groups and local genealogical societies. |
| **Secondary** | Pinterest, then Q4 gift-guide placement. |
| **Biggest assumption** | **A gift buyer will type in fifteen names.** Everything is downstream of this. Instrumented as `builder_completed`; below 25% sustained is a kill signal. |
| **Biggest risk** | **Distribution, not product.** Red-team review was blunt: *"the business dies of distribution before the free-substitute problem gets a chance to kill it — which is why 'build it better' is the wrong response."* The share loop only fires *after* someone builds a chart, so it cannot solve the cold start. |
| **Validation status** | **Zero customers. Nothing validated.** Demand, supplier pricing, and conversion are all unverified — the research tooling hit hard limits and could not confirm external numbers. Treat every figure above as a modelling assumption. |

### Honest assessment

Across 30 researched candidates, **none scored above 50/100** on probability of
clearing $1,000/month in six months, and adversarial review put every finalist
at **9–12%**. That is the base rate, and this business does not escape it by
being well built.

What is genuinely in its favour: the bar is low (12 orders a month), the margin
is high enough to absorb mistakes, fixed costs are ~$12/month so failure is
cheap, launch timing captures Q4 — the single best gifting window — and the
software is a real differentiator rather than a cost centre.

What is genuinely against it: no audience, no proven demand, unverified supplier
costs, and an acquisition plan whose best mechanic cannot start until strangers
are already using the product.

### Next 5 things to do

1. **Test the assumption before building anything else.** Put the builder in
   front of ten people in the target demographic and watch where they stop.
   ~$50 and one week. `docs/09-first-30-days.md` has the protocol.
2. **Confirm real supplier cost — free, nothing delivered.** Add an A2 fine-art
   print to a Prodigi and a Gelato basket, enter a US address, read the checkout
   total, don't pay. Twenty minutes. Then update `PRINT_VARIANTS` in
   `lib/pricing.ts`. Every COGS number here is currently a guess.
3. **Clear the name.** "Kinline" has not been checked against USPTO TESS. It
   lives in one file (`lib/site.ts`); changing it now is trivial.
4. **Buy the domain and deploy to Railway.** `docs/14-deployment.md`, about an hour.
5. **Join three genealogy Facebook groups and read for a week before posting.**
   The cold-start problem is the real problem, and it is solved with people, not
   code.

---

## The documents

| | |
|---|---|
| [`00-decision-brief.md`](docs/00-decision-brief.md) | **Start here.** What we're building and why. |
| [`01-opportunity-research.md`](docs/01-opportunity-research.md) | All 30 candidates, the ranking, and the limits of the research. |
| [`02-business-definition.md`](docs/02-business-definition.md) | Brand, catalogue, pricing, fulfilment, retention. |
| [`03-unit-economics.md`](docs/03-unit-economics.md) | Conservative / base / strong, with the arithmetic shown. |
| [`04-architecture.md`](docs/04-architecture.md) | Stack, costs at 0→10k orders, security, scaling. |
| [`05-where-money-returns.md`](docs/05-where-money-returns.md) | **What a marginal dollar actually buys** — ranked, and it is not hosting. |
| [`06-design-system.md`](docs/06-design-system.md) | Typography, colour, voice, mobile, accessibility. |
| [`07-seo-engine.md`](docs/07-seo-engine.md) | Keyword clusters and why programmatic SEO was rejected. |
| [`08-acquisition.md`](docs/08-acquisition.md) | Campaigns with hooks, spend caps, and failure criteria. |
| [`09-first-30-days.md`](docs/09-first-30-days.md) | Week-by-week, development *and* business. |
| [`10-six-month-roadmap.md`](docs/10-six-month-roadmap.md) | Monthly targets, limits, and success/failure criteria. |
| [`11-analytics.md`](docs/11-analytics.md) | What is measured and why. |
| [`12-failure-detection.md`](docs/12-failure-detection.md) | **Kill criteria.** The numbers that mean stop. |
| [`13-legal-compliance.md`](docs/13-legal-compliance.md) | Entity, tax, policies, and what needs a lawyer. |
| [`14-deployment.md`](docs/14-deployment.md) | Exactly what to do, in order. |

---

## The chart engine

The defensible asset, in `lib/chart/`.

Ancestors are keyed by **Ahnentafel number** (father of *n* is 2*n*, mother is
2*n*+1), so layout is arithmetic on the key. The practical consequence: an
unknown ancestor leaves a designed gap instead of reflowing the chart. Real
families are full of holes, and a chart that rearranges around them looks wrong
to the person who knows the family.

- **Fan layout** — concentric rings, sweep chosen to fill the sheet (180° / 270°
  / 360°), tangential text on wide wedges and radial on narrow ones, with
  flipping so nothing reads upside down. Up to 7 generations / 127 people.
- **Tree layout** — classic pyramid, capped at 5 generations for legibility.
- **Name degradation** — drops middle names, then initialises the given name,
  and only truncates the surname last. On an ancestor chart the surname is the
  load-bearing information.
- **Measured type metrics** — `scripts/calibrate-widths.ts` rasterises one and
  eleven copies of each glyph and divides the difference, recovering true
  advance widths. The first *guessed* table was ~20% too wide across the
  lowercase range and was silently shrinking every name on every chart.
- **One renderer, both surfaces** — pure TypeScript with no Node dependencies,
  so the browser preview and the print file come from the same code. What the
  customer approves is what prints.

```bash
npm run preview        # renders sample charts to PNG
```

---

## Commercial decisions encoded in code

**Framing is disabled** (`FRAMING_ENABLED` in `lib/pricing.ts`). Supplier audits
put a framed A2 near €48 against €10 for paper, and the economics derive
break-even at a frame delta of ~$41–45 against a modelled $38–48. Framed earns
*less absolute profit* on a larger, more fragile parcel. The code paths are live
and tested; it is one flag once real costs are known.

**The print-ready digital file is never sold standalone.** A print-ready file
*is* the poster, so a cheap tier would remove the reason to buy the print. It
exists only as a post-purchase add-on and free with the largest size.

**Gift wrap is disabled** (`GIFT_WRAP_ENABLED`). Wrapping by hand would route
every parcel through the operator — inventory, labour, storage, and a second
shipping leg. The dedication line printed into the artwork serves the same need
and costs nothing. **Nothing physical ever touches the operator**; every print
ships from the lab straight to the customer.

**No account is ever required.** Not for building, sharing, buying, or tracking.
The share loop depends on charts being reachable without a login.

---

## Testing

```bash
npm test                    # 33 unit tests — chart engine + pricing
npm run test:journey        # 58 end-to-end checks against a running server
npm run test:builder        # 16 browser checks — live preview, GEDCOM import
npm run build               # production build
```

The journey suite covers the funnel plus the things that lose money or leak
data: webhook signature enforcement, price tampering, artwork watermarking, XSS
in customer-supplied names, and `noindex` on private chart pages.

---

## Project layout

```
app/            routes — storefront, builder, checkout, admin, API
components/     UI, split by surface
lib/chart/      the layout + rendering engine
lib/db/         schema and repository (Postgres, or in-memory without it)
lib/pricing.ts  catalogue, discounts, margin
docs/           the business
scripts/        calibration, previews, screenshots, journey test
```
