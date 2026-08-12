# Phase 7 — Organic acquisition / the SEO engine

Descends from `docs/00-decision-brief.md`. Sits alongside the paid and social
acquisition documents; this file covers **earned search traffic only**.

**Reading rules for this document**

- **No keyword volume in this repo has ever been verified.** The research pass
  exhausted its search budget before obtaining a single volume figure
  (`docs/01-opportunity-research.md` §7). Every difficulty and volume band below
  is a **prior to be overwritten in week 1**, labelled `[PRIOR]`. Do not budget
  against any of them.
- Every other number that is not from a live tool is labelled `[ASSUMPTION]` or
  `[RULE OF THUMB]` with its reasoning basis.
- The bar is $1,000/month ≈ **11 orders/month at $95 AOV**. This document opens
  by stating plainly that SEO will contribute close to none of that in the first
  six months, and then explains why it is still worth doing.
- Today is **August 2026**. Month 0 is now. That timing is load-bearing
  throughout: Christmas 2026 is ~19 weeks out, and **nothing written from today
  will rank in time for it.** The organic target is Christmas *2027*.

---

## 1. The honest timeline — what SEO is and is not for

### 1.1 The plain statement

**A brand-new domain will not produce meaningful organic revenue inside six
months.** Not because the content will be bad, but because ranking is gated on
signals that take calendar time to accrue: crawl history, link acquisition, user
interaction data on the SERP, and whatever the ranking systems use as a proxy
for "this site is a real business." A site registered in August 2026 competing
for "family tree gift" against Etsy, Amazon, Ancestry and a decade-old
personalised-gift blog network is not going to win that query in 2026, and
possibly not ever.

If the plan requires 11 orders/month by February 2027, **those orders come from
paid, social, Pinterest, and the share loop.** SEO is not in that number. Any
document that implies otherwise is lying to you.

### 1.2 So what is it actually for?

Six jobs, ranked by how much they matter in the first year:

| # | Job | Why it matters before it ranks |
|---|---|---|
| 1 | **Conversion support for bought traffic** | Rachel sees an Instagram ad for a brand she's never heard of, and before spending $79 on a heirloom she Googles "kinline reviews" / "is kinline legit". If that search returns nothing — or returns nothing *we control* — the paid channel converts worse. Brand SERP hygiene is an SEO job that pays on day one. |
| 2 | **Content is a multi-channel asset, not a ranking play** | Every occasion page written for search is also: a Pinterest pin, an email, an ad landing page, an Instagram carousel script, and the thing you send to a gift-guide blogger. Judge the roadmap on that basis, not on month-6 sessions. |
| 3 | **Compounding towards Christmas 2027** | Seasonal content needs to have existed through at least one full cycle before it ranks in the next. Publishing the Christmas cluster in Aug–Sep 2026 is not for Christmas 2026; it is so the pages are 15 months old in November 2027. `[RULE OF THUMB]` — seasonal pages typically perform in their second season, not their first. |
| 4 | **The cheapest possible service of the historian segment** | The GEDCOM cohort actively searches ("export GEDCOM from Ancestry", "print my Ancestry tree"). Two pages serve them. We don't build a product for them (`docs/00-decision-brief.md`), but we'll take the traffic. |
| 5 | **Link and citation surface** | Gift-guide roundups, genealogy society newsletters and Pinterest all need something to link *to* that isn't a product page. Articles and free tools are the link targets. |
| 6 | **A defensible asset if paid fails** | If CAC comes back unaffordable, an organic base is the only channel with a zero marginal cost. It's a hedge, and hedges are bought before you need them. |

### 1.3 Expected trajectory — explicitly a guess

`[PRIOR — no keyword data exists; these numbers exist to be replaced by Search
Console reality, not to be planned against]`

| Month (from first publish) | Indexed pages | GSC impressions/mo | Clicks/mo | Organic orders/mo | What "on track" looks like |
|---|---|---|---|---|---|
| 1 | 6–10 | 0–200 | 0–5 | 0 | Pages indexed at all. Check coverage, not traffic. |
| 2 | 10–14 | 100–800 | 5–25 | 0 | Brand queries appear. Long-tail impressions begin. |
| 3 | 14–18 | 300–2,000 | 20–60 | 0–1 | Any non-brand query in positions 20–50. |
| 4 | 18–22 | 500–3,000 | 40–120 | 0–1 | One long-tail query inside the top 20. |
| 5 | 20–24 | 800–4,000 | 60–200 | 1–2 | Christmas-cluster pages accumulating impressions. |
| 6 | 22–26 | 1,000–6,000 | 80–300 | 1–3 | Trend is monotonic and the *queries are the right ones*. |

**Read the query list, not the click count.** 300 clicks from "free family tree
template" is worse than 20 clicks from "80th birthday gift for grandma", because
the first cohort will never buy a $79 print. The failure mode this document
guards against most carefully is ranking for the wrong intent.

---

## 2. Before any of this: get real keyword data (week 1, ~2 hours, $0)

This is the single highest-value task in the document and it is currently
undone. Everything in §3 is inference.

| Source | Cost | What it gives | Caveat |
|---|---|---|---|
| **Google Keyword Planner** (free Google Ads account, no spend required) | $0 | Volume bands + competition for seed terms | Bands are wide without active spend; treat as order-of-magnitude only |
| **Bing Webmaster Tools keyword research** | $0 | Actual numbers, no ad account | Bing volume ≈ a fraction of Google's; useful for *relative* comparison |
| **Google autocomplete + "People also ask" + "Related searches"** | $0 | The real phrasing gift buyers use | No volumes, but the best source of long-tail phrasing |
| **Etsy search autocomplete** | $0 | **Commercial-intent proxy.** Etsy's suggestions are ranked by purchase behaviour, not curiosity. This is arguably better signal than Google for our buyer. | Etsy-specific phrasing |
| **Pinterest search autocomplete / trends** | $0 | Gift-occasion phrasing from exactly our demographic | Pinterest is a discovery channel in its own right (separate doc) |
| **Amazon autocomplete** | $0 | What people type when they intend to *buy* a family-tree object | Mostly returns generic wall art; that itself is informative |

**Seed list to run through all six (verbatim):**

```
family tree print          family tree chart              family tree poster
family tree gift           ancestry fan chart             fan chart print
family tree wall art       personalised family tree       framed family tree
family tree gift for mum   family tree gift for grandma   80th birthday gift for grandma
family tree for christmas  memorial gift family           golden anniversary gift parents
print my ancestry tree     family tree chart maker        blank family tree chart
```

**Kill signal.** If the entire cluster of purchase-intent terms ("family tree
print/poster/chart gift" and variants) returns negligible volume across *all six
tools*, then organic search is not a channel here at all — and per
`docs/01-opportunity-research.md` §7.4 check #3, that materially weakens the
whole plan, because it means discovery rests entirely on paid + the share loop,
and the share loop cannot cold-start. That finding would be worth knowing in
week 1, not month 5.

---

## 3. Keyword clusters by intent

Columns: **Value** = expected revenue per 100 visitors, qualitatively.
**Difficulty** and **Volume** are `[PRIOR]` bands, reasoned from who currently
occupies these SERPs, not measured.

### 3.1 Transactional — she wants to buy the object now

| Example query | Volume `[PRIOR]` | Difficulty `[PRIOR]` | Value | Our page |
|---|---|---|---|---|
| `family tree print` | Med | High — Etsy/Amazon own it | Very high | `/` |
| `family tree poster` | Med | High | Very high | `/vertical-family-tree` |
| `family tree chart print` | Low-Med | Med | Very high | `/fan-chart` |
| `ancestry fan chart poster` | Low | Med | Very high | `/fan-chart` |
| `framed family tree chart` | Low | Med | Very high | `/sizes-and-framing` |
| `personalised family tree print uk` | Low | Med | Very high | Geo variant — defer, see §5.4 |
| `custom family tree poster with names` | Low | Low-Med | Very high | `/fan-chart` |

**Honest read:** the head of this cluster is owned by marketplaces and we will
not take it in year 1. The *tail* of it (4+ words, with modifiers like "with
names", "custom", "framed", "for grandparents") is where a new domain has any
chance at all, and it converts better anyway.

### 3.2 Commercial investigation — she's decided on the category, not the vendor

| Example query | Volume `[PRIOR]` | Difficulty `[PRIOR]` | Value | Our page |
|---|---|---|---|---|
| `best family tree chart maker` | Low-Med | Med-High | High | Article #13 |
| `where to print a family tree chart` | Low | Low-Med | High | Article #14 |
| `how much does a family tree poster cost` | Low | Low | High | `/sizes-and-framing` |
| `what size family tree poster do i need` | Low | Low | High | Article #11 |
| `family tree chart 4 generations vs 5 generations` | Very low | Very low | Med-High | Article #11 |
| `is a fan chart or vertical tree better` | Very low | Very low | High | Article #9 |

This cluster is **the best risk-adjusted place a new domain can play.** Low
volume, low competition, high intent, and every one of these questions is one we
answer better than anyone because we make the object.

### 3.3 Comparison — vendor-versus-vendor

| Example query | Volume `[PRIOR]` | Difficulty `[PRIOR]` | Value | Our page |
|---|---|---|---|---|
| `mycanvas alternative` | Very low | Low | High | Article #13 |
| `mycanvas family tree poster review` | Low | Low-Med | Med | Article #13 |
| `ancestry poster printing options` | Low | Med | Med | Article #13 |
| `etsy family tree print vs custom site` | Very low | Very low | Med | Fold into #13 |
| `familytreechart.com review` | Very low | Low | Med | Fold into #13 |

**Rule for this cluster: be genuinely fair or don't publish.** A comparison page
that concludes "we win on all eight axes" reads as an advert and converts worse
than an honest one. MyCanvas genuinely beats us on: deep-generation charts
(7+ gens from a GEDCOM), book products, and Ancestry integration. Say so. The
sentence "if you already have a 2,000-person tree in Ancestry and want all of it
on one wall, use MyCanvas — we're built for a five-minute gift" costs us nothing
(that customer was never ours, per `docs/00-decision-brief.md`) and buys the
page its credibility.

### 3.4 Problem-based — she's hit the wall the product exists to solve

| Example query | Volume `[PRIOR]` | Difficulty `[PRIOR]` | Value | Our page |
|---|---|---|---|---|
| `how do i find my great grandmother's maiden name` | Med | High — genealogy sites own it | Low-Med | Article #12 |
| `what to ask relatives about family history` | Low-Med | Med | Med | Article #12 |
| `how many generations in a family tree chart` | Low | Low | High | Article #11 |
| `what do i do if i don't know a grandparent's name` | Very low | Very low | High | Article #12 |
| `how to spell an old irish surname correctly` | Very low | Low | Low | §4.4 origin pages |
| `second cousin once removed meaning` | **High** | High | **Low** | Tool #1 (link magnet, not a conversion page) |

**The trap in this cluster:** "how do I find my ancestors" is a *genealogy
research* query. It is high volume, dominated by Ancestry/FamilySearch/Findmypast
with twenty years of authority, and the person typing it wants to do research,
not buy a gift. **We chase almost none of it.** The exception is the narrow band
where the problem is specifically "I am building a chart right now and a box is
empty" — which is our buyer, mid-build, and is a conversion moment.

### 3.5 Informational — the category-definition tail

| Example query | Volume `[PRIOR]` | Difficulty `[PRIOR]` | Value | Our page |
|---|---|---|---|---|
| `what is a fan chart genealogy` | Low-Med | Low-Med | Med-High | Article #9 |
| `fan chart vs pedigree chart` | Low | Low | Med | Fold into #9 |
| `how many ancestors do i have in 6 generations` | Low-Med | Low | Med | Tool #2 |
| `what is a pedigree chart` | Med | Med-High | Low | **Do not target** |
| `family tree symbols meaning` | Low | Med | Low | **Do not target** |

Article #9 ("what is a fan chart") is disproportionately important: **we are
selling an object most buyers cannot name.** Owning the definition of the
category is how a brand becomes the default answer for it, and the query is
cheap because no incumbent has bothered to answer it for a non-genealogist.

### 3.6 Long-tail occasion — the highest-value cluster we own

| Example query | Volume `[PRIOR]` | Difficulty `[PRIOR]` | Value | Our page |
|---|---|---|---|---|
| `80th birthday gift for grandma` | **High** | **High** — gift-blog territory | High | Article #7 |
| `90th birthday gift for grandfather` | Med | Med-High | High | Article #7 variant |
| `gift for grandparents who have everything` | High | High | High | Article #8 |
| `christmas gift for parents who have everything` | **Very high** | **Very high** | High | Article #8 |
| `golden wedding anniversary gift for parents` | Med | Med-High | High | Article #18 |
| `sympathy gift for a family who lost a parent` | Med | Med | Med-High | Article #15 |
| `family reunion gift ideas` | Low-Med | Med | Med | Later |
| `meaningful gift for mum mothers day` | High | Very high | High | Article #16 |
| `gift for someone into genealogy` | Low | Low | High | Later |

**This is where the money is and it is also the hardest.** These SERPs are
occupied by editorial gift-guide sites with enormous authority that refresh the
same URL annually. A new domain does not beat *Good Housekeeping* at "christmas
gifts for parents".

The realistic play is **twofold and neither half is pure SEO**:
1. Write our own occasion pages anyway — they are the landing pages for paid and
   Pinterest, they capture the deep tail ("80th birthday gift for grandma who
   likes family history"), and they are the seed for Christmas 2027.
2. **Get into other people's gift guides.** One inclusion in a mid-tier gift
   roundup in October delivers more traffic in one week than our own occasion
   page will in year 1, plus a link. This is covered in §8 and it is the highest
   ROI activity in this whole document.

### 3.7 Product-specific and navigational

| Example query | Volume `[PRIOR]` | Difficulty | Value | Our page |
|---|---|---|---|---|
| `kinline` | Zero → grows with spend | Trivial | Critical | `/` |
| `kinline reviews` / `is kinline legit` | Zero → grows | Trivial | **Critical** | `/reviews`, `/about` |
| `kinline shipping time` / `kinline returns` | Zero → grows | Trivial | High | `/shipping`, `/returns` |
| `kinline vs mycanvas` | Zero → grows | Trivial | High | Article #13 |

Ignore this cluster at your peril. **Every dollar of paid spend manufactures
brand searches**, and a brand SERP showing only our homepage plus a Trustpilot
page with two reviews is a conversion leak on a $79–$169 purchase from an
unknown vendor. We must own: homepage, about (with a real human name and face),
reviews, shipping, returns, and ideally one press/blog mention.

### 3.8 Deliberately NOT targeted — and why

| Cluster | Example | Why we refuse it |
|---|---|---|
| Genealogy research head terms | `free family tree`, `how to trace my ancestry`, `best genealogy site` | Wrong persona, unwinnable SERP, and pursuing it turns us into the genealogy company we decided not to be. |
| Free-template seekers | `free family tree template`, `family tree template word`, `printable family tree pdf` | **High volume, near-zero commercial value.** These people want free. Ranking here fills analytics with non-buyers and trains the site's topical identity toward "free templates." One bounded exception in §4.5. |
| GEDCOM/software terms | `best gedcom software`, `gedcom viewer` | The GEDCOM-literacy squeeze (`docs/00-decision-brief.md`): this audience self-serves. Two service pages only (#19), no cluster. |
| DNA | `ancestry dna results explained` | Not our product, huge authority requirement, and adjacent to health/YMYL scrutiny. |
| Name-meaning / surname-origin | `smith surname origin`, `meaning of the name O'Brien` | See §4.3 — we have no unique data and would be a late, thin clone. |
| Local/geo doorway | `family tree printing chicago` | We are print-on-demand with no local presence. These are doorway pages by definition. |
| Year-spun duplicates | `family tree gifts 2027` | Update the existing page's date, never mint a new URL per year. |

---

## 4. Programmatic SEO — the decision

### 4.1 Verdict

> **We do not build a programmatic SEO surface. Not at launch, and not as the
> plan-B channel. The sanctioned templated surface for year 1 is 11 URLs total.**

`docs/01-opportunity-research.md` §5.5 killed an entire candidate business
(TraceLab) specifically because its whole acquisition plan was mass-generated
per-name pages, and the pattern carried forward was: *do not select a channel a
third party can switch off overnight.* It would be incoherent to reject a
business for that reason and then adopt the same tactic here.

### 4.2 The argument, in full

| # | Reason | Weight |
|---|---|---|
| 1 | **It is the exact pattern the ranking systems target.** Mass-produced near-identical pages differing only by a substituted noun is the textbook doorway/thin-content shape, and it is explicitly what the helpful-content and scaled-content-abuse systems were built to demote. This is not a risk of a penalty; it is a description of the penalty's definition. | Decisive |
| 2 | **A brand-new domain is the worst possible launcher for pSEO.** pSEO at scale works — when it works — on domains with existing authority and crawl budget. A domain with zero links and zero history publishing 5,000 templated pages in month 2 is the highest-signal spam pattern available. `[RULE OF THUMB]` | Decisive |
| 3 | **Site-wide contamination.** The damage is not confined to the generated pages. A site whose page count is 98% templated has a topical identity of "templated page farm", and that can drag the 20 pages we actually care about. | High |
| 4 | **We have no proprietary data to make pages non-thin.** The honest test of a programmatic page is: *what is on this page that exists nowhere else?* For every surname/city/name variant we could generate, the answer is "nothing." That is the whole argument. | Decisive |
| 5 | **It contradicts the brand.** We are selling design judgement and archival quality to a 47-year-old buying for her mother's 80th. A 4,000-page auto-generated content farm is the aesthetic opposite of the product. | Medium |
| 6 | **Opportunity cost.** Every hour on generation infrastructure is an hour not spent on the builder — and the builder is the unvalidated core of the business (`docs/02-business-definition.md` §17). | High |

### 4.3 Surname pages — the tempting one, rejected explicitly

The obvious pSEO surface for this business is `/surnames/{name}` — "The
O'Sullivan family name: origin, meaning, and a free family tree chart" — at
10,000+ pages.

**Rejected. Reasoning:**

| Test | Result |
|---|---|
| Do we own unique data? | No. Surname etymology is public-domain scholarship we would be paraphrasing. |
| Is the SERP available? | No. `ancestry.com`, `houseofnames`, `forebears.io`, `surnamedb` and Wikipedia have occupied it for 15+ years with actual datasets. |
| Is the intent commercial? | **No.** Someone searching their surname's meaning is curious, not buying an $79 heirloom. Wrong intent *and* unwinnable. |
| Would the page be non-thin? | No. Strip the substituted surname and every page is byte-identical. This is the definition. |
| Verdict | **No. Not at 10,000 pages, not at 200, not "hand-reviewed."** |

The bounded-hand-reviewed variant ("just the top 200 surnames, each edited") is
also rejected: 200 hand-edited pages is 200+ hours of work aimed at a
zero-commercial-intent query on a SERP we cannot win. The bounded version doesn't
fix the two decisive problems, it only makes the failure cheaper.

### 4.4 What *is* sanctioned: 8 origin pages — templated in structure, hand-written in substance

`/guides/charting-an-irish-family` and seven siblings: Italian, Polish, German,
Ashkenazi Jewish, Scottish, Spanish/Mexican, Scandinavian.

This looks superficially like the rejected surface. It is not, and the
difference is the test in §4.2 reason #4 — **each page contains something that
is true only of that page, and each maps to a real behaviour of our product.**

| Element | Why it is genuinely different per page |
|---|---|
| Naming conventions | Spanish/Mexican families carry two surnames per person (paterno + materno) — **which changes the chart layout**. Scandinavian patronymics mean a grandmother's surname is literally derived from her father's given name. Ashkenazi families often name after a deceased relative, producing repeated given names across generations that look like data-entry errors on a chart. Icelandic families have no inherited surname at all. These are not paraphrases of each other. |
| Product behaviour | Each page states what our renderer does about it: double-surname line breaks, diacritic support (ó, ł, ø, ü, ż), long-name truncation rules, and how we set a maiden name for a patronymic. This is documentation of a real feature, which no competitor page can copy. |
| The anglicisation problem | "Which spelling goes on the print — the one on the ship manifest, the one on the gravestone, or the one my mother uses?" This is a real decision every immigrant-descended buyer faces, and our answer (a policy, plus the free-reprint promise in `docs/02` §10) differs per tradition. |
| A rendered example | An actual chart image demonstrating that tradition's convention. Unique image asset per page. |

**Bound: exactly 8 pages. Hand-written. ~900–1,300 words each. Published in
month 4+, one at a time, only after the core roadmap is live.** If any of them
cannot be filled with page-specific substance by a human, it does not get
published. Eight is the number where genuine substance exists; there is no
ninth-through-fortieth that passes the test.

### 4.5 What is also sanctioned: 3 free tools

Tools are the correct "programmatic-adjacent" surface because their value is
**functional**, not textual — a calculator is not thin just because its shell is
templated, since the page does something for the visitor.

| # | Tool | URL | Why it earns its place | Cannibalisation check |
|---|---|---|---|---|
| 1 | **Cousin relationship calculator** ("what is a second cousin once removed?") | `/tools/cousin-calculator` | The single best link magnet available to this business. High, permanent, evergreen search volume `[PRIOR]`; the query is perennially confusing; existing answers are ugly text tables. It is on-brand (family *relationships*, not genealogy research) and it is the kind of page bloggers and forums link to unprompted. Low conversion — that is fine, its job is links and brand-familiarity. | None. |
| 2 | **Ancestor counter** ("how many ancestors in N generations?") | `/tools/ancestor-counter` | Trivial to build (2^n − 2), genuinely asked, and it does direct product work: it makes the 5-vs-6 generation decision concrete (30 people vs 62), which is the *exact* decision that determines whether she buys 12×18 or 24×36. Links straight into the sizing page. | None. |
| 3 | **Free blank printable fan chart (PDF)** | `/tools/blank-family-tree-chart` | The one sanctioned incursion into the "free template" cluster. Justification: it is the highest-volume adjacent query we can win, and it is a *lead magnet with a natural upgrade path* — she prints it, fills it in by hand at her aunt's kitchen table, and now has exactly the 15 names our builder needs. Email capture on download. | **Constrained on purpose:** blank only, no typesetting of her names, US Letter + A4 only (never 18×24 or 24×36), plain functional layout, visibly not the product. This keeps it a napkin, not a substitute — and it is consistent with the standing rule that we never hand over a print-ready file containing the customer's names (`docs/00-decision-brief.md`; `docs/02` §5.3). If download-to-order conversion is ~0 after 90 days, deindex it. |

### 4.6 The sanctioned surface, totalled

| Surface | URLs | Generated? | Gate |
|---|---|---|---|
| Origin/tradition guides | 8 | No — hand-written | After core roadmap is live (month 4+) |
| Free tools | 3 | No — functional pages | #1 and #2 in months 2–3; #3 month 3 |
| **Total templated-looking URLs, year 1** | **11** | — | — |
| Surname pages | **0** | — | Rejected outright |
| Geo/city pages | **0** | — | Rejected outright |
| Per-year gift pages | **0** | — | Update in place |

Eleven. Not eleven thousand. If a future version of this plan proposes a
programmatic surface, it must first answer §4.2 reason #4 — *what is on this page
that exists nowhere else* — with a specific, verifiable answer.

---

## 5. Technical foundation — the parts that actually matter here

### 5.1 Indexation policy (the highest-stakes technical decision in this doc)

The builder will generate a large number of URLs containing **the real names of
living private people**. If those are indexable we simultaneously create (a) an
enormous accidental thin-content farm, (b) a privacy incident, and (c) a
GDPR/CCPA problem. This must be right on day one, because retracting indexed
personal data is far harder than never publishing it.

| URL pattern | Index? | Mechanism | Why |
|---|---|---|---|
| `/`, `/fan-chart`, `/vertical-family-tree`, `/sizes-and-framing`, `/gifts/*`, `/guides/*`, `/tools/*` | **Index** | Default | The 20–30 pages we're actually optimising |
| `/about`, `/reviews`, `/shipping`, `/returns`, `/contact` | **Index** | Default | Trust surfaces; they serve brand SERP (§3.7) |
| `/build`, `/build/*` | **noindex** | `robots` meta + `Disallow` | Application, not content. Nothing to rank. |
| `/c/{token}` (share links) | **noindex, nofollow** | `X-Robots-Tag` header **and** meta, plus `Disallow` in robots.txt | **Contains living people's names.** Header-level because a `Disallow`-only page can still be indexed URL-only. |
| `/chart/{id}` (saved charts) | **noindex** | Same as above | Same reason |
| `/checkout`, `/order/*`, `/account/*` | **noindex** | Meta | Standard |
| `/api/*` | **noindex** | Header | Standard |

Additional hard rules:
- Share links get `Referrer-Policy: no-referrer` so family names never leak into
  third-party analytics via the referer chain.
- Share links should be **long unguessable tokens**, not sequential ids.
- Cloudflare R2-hosted rendered chart images of real families must **not** be
  crawlable — put them behind a path excluded in `robots.txt`, separate from
  marketing imagery.
- Next.js 16 App Router: this is `export const metadata = { robots: { index:
  false } }` per route plus a `app/robots.ts` — set it when the route is created,
  not in a later "SEO pass."

### 5.2 Structured data

| Schema | Where | Note |
|---|---|---|
| `Organization` + `WebSite` | `/` | Brand SERP hygiene, sitelinks, logo |
| `Product` + `AggregateOffer` | `/fan-chart`, `/vertical-family-tree` | Our price is configuration-dependent → use `lowPrice`/`highPrice`, not a single `price`. Do not markup a price the page doesn't show. |
| `AggregateRating` / `Review` | Product pages | **Only once real reviews exist.** Marking up ratings we don't have is a manual-action risk and a straightforwardly dishonest thing to do. |
| `BreadcrumbList` | All non-home | Cheap, still used |
| `Article` | `/guides/*` | Standard |
| Merchant listing fields (`shippingDetails`, `hasMerchantReturnPolicy`) | Product pages | Genuinely useful for e-commerce results; free delivery and the generous returns policy (`docs/02` §10) are competitive facts worth surfacing. **`[VERIFY]`** — check current Google docs at implementation time; this area changes. |
| `FAQPage` | — | **Skip.** FAQ rich results were withdrawn for most commercial sites; markup remains valid but expect no visual gain. Don't spend time on it. |

### 5.3 Performance & Core Web Vitals — proportionate effort

Next.js on Vercel gives us a good baseline for free. The one genuine risk is
that a page embedding a complex rendered chart (large SVG or a big image) tanks
LCP on mobile. Rules: hero chart images as pre-rendered WebP/AVIF from R2 with
explicit dimensions, `priority` on the LCP image only, no client-side rendering
of the chart on marketing pages, and no font flash (self-host the display face,
`font-display: swap`). Beyond that, do not spend days chasing a green Lighthouse
score — it is not why we're not ranking.

### 5.4 Geography

Launch is single-market with one domain and one currency (see `docs/02` §8.3).
**Do not build `/uk/` and `/us/` variants at launch** — duplicate-content
management and hreflang for a site with zero authority is effort spent on a
problem we don't have. Revisit only when a second market has real order volume.

---

## 6. The first content roadmap — 20 pages, in order

Ordering rules encoded below:
- **Money pages before articles.** An article that ranks with nothing good to
  link to is wasted.
- **Seasonal content ships 10–14 weeks before its occasion**, minimum — and
  understand that in 2026 this buys the paid/Pinterest landing page, not a
  ranking. `[RULE OF THUMB]`
- Every article links to **exactly one money page within the first 200 words**,
  plus contextual links after.
- Hub-and-spoke: `/gifts` is the hub for occasion pages; `/fan-chart` is the
  commercial hub everything eventually points to.

| # | URL | Target query | Intent | Words | Links **in** | Links **out** | Why it earns its place | Ship |
|---|---|---|---|---|---|---|---|---|
| 1 | `/` | `family tree print`, brand | Transactional | 700–1,000 on-page | Everything | #2, #3, #4, #5 | The money page. Must state occasion, 5-minute promise, delivery date and the reprint guarantee above the fold. | M0 wk1 |
| 2 | `/fan-chart` | `ancestry fan chart poster`, `fan chart print` | Transactional | 900–1,200 | #1, #9, #11, #13, all guides | #4, #6 | The flagship product page and the destination of ~everything. Fan is the visually distinctive layout (`docs/02` §5.1). | M0 wk1 |
| 3 | `/vertical-family-tree` | `family tree poster`, `vertical family tree chart` | Transactional | 800–1,000 | #1, #9 | #4 | Second layout; also catches "poster" phrasing which likely out-volumes "fan chart". | M0 wk1 |
| 4 | `/sizes-and-framing` | `what size family tree poster`, `framed family tree chart`, `how much does a family tree poster cost` | Commercial | 800–1,100 | #2, #3, #11, Tool 2 | #2 | Answers the three pre-purchase objections (size, frame, price) in one indexable place. Doubles as the page linked from every "how much" query. | M0 wk1 |
| 5 | `/gifts` | `family tree gift` | Transactional hub | 600–800 | #1, all occasion pages | #6, #7, #8, #15, #16, #18 | The internal-linking spine. Without a hub, occasion pages are orphans and the cluster never coheres. | M0 wk2 |
| 6 | `/gifts/family-tree-gift-for-grandparents` | `family tree gift for grandparents`, `gift for grandma who has everything` | Long-tail occasion | 1,000–1,400 | #5, #7, #8 | #2, #4 | The single most common recipient in the whole business. Also the best paid/Pinterest landing page we will have. | M0 wk2 |
| 7 | `/gifts/80th-birthday-gift-for-grandma` | `80th birthday gift for grandma`, `90th birthday gift ideas` | Long-tail occasion | 1,200–1,600 | #5, #6 | #2, #4 | Milestone birthdays are occasion #3 by volume and the least seasonal — this page can earn all year while the Christmas cluster sleeps. Covers 70/80/90 in one URL, not three. | M0 wk2 |
| 8 | `/gifts/christmas-gift-for-parents-who-have-everything` | `christmas gift for parents who have everything` | Long-tail occasion | 1,200–1,600 | #5, #6 | #2, #4 | Christmas is the largest occasion. **This page will not rank for Christmas 2026** — it ships now to be the paid/Pinterest/email landing page, and to be 15 months old in Nov 2027. | M0 wk3 |
| 9 | `/guides/what-is-a-fan-chart` | `what is a fan chart`, `fan chart vs pedigree chart` | Informational | 1,000–1,400 | #2, #3, #11 | #2 | **We sell an object most buyers cannot name.** Owning the category definition is how the brand becomes its default answer, and no incumbent has explained it to a non-genealogist. Cheapest realistic top-10 in the roadmap. | M1 |
| 10 | `/tools/cousin-calculator` | `second cousin once removed` | Informational (link magnet) | 400 + tool | #9, #12, footer | #5 | Best available link magnet: permanent, high-volume, genuinely confusing, and current answers are ugly tables. Its job is links and familiarity, **not** conversion — do not judge it on orders. | M1 |
| 11 | `/guides/how-many-generations-family-tree-chart` | `how many generations in a family tree chart`, `4 vs 5 generation chart` | Commercial investigation | 900–1,200 | #4, #9, Tool 2 | #4, #2 | This is the actual buying decision in disguise — generation count determines size which determines price ($49 → $119). Converts far above its volume. | M1 |
| 12 | `/guides/what-to-do-when-you-dont-know-a-name` | `don't know great grandmother's maiden name`, `what to ask relatives about family history` | Problem-based | 1,200–1,600 | #6, #9, #10 | `/build`, #2 | **This is the growth loop written as an article.** The wall she hits is the share moment (`docs/00-decision-brief.md`), so the page's CTA is "share your chart and ask them" — it teaches the loop to people who haven't started a chart yet. | M2 |
| 13 | `/guides/family-tree-chart-printing-compared` | `mycanvas alternative`, `best family tree chart maker` | Comparison | 1,400–1,900 | #2, #14 | #2, #4 | Highest commercial intent in the roadmap. Must be genuinely fair (§3.3) — concede MyCanvas's deep-generation/GEDCOM strength explicitly. Also pre-empts `kinline vs X` brand queries. | M2 |
| 14 | `/guides/where-to-print-a-family-tree-chart` | `where to print a family tree chart`, `can i print a family tree at staples` | Commercial investigation | 1,000–1,300 | #13, #4 | #4, #2 | Meets the GEDCOM-literacy squeeze head-on instead of hiding from it: yes, you can take a file to a print shop; here is exactly what that gets you (paper weight, colour management, no design, no reprint promise). Confronting the objection in public converts better than avoiding it. | M2 |
| 15 | `/gifts/memorial-family-tree-gift` | `sympathy gift for family who lost a parent`, `memorial gift for a family` | Long-tail occasion | 900–1,200 | #5 | #2 | Occasion #4 by volume, year-round, and the highest emotional-intent buyer we have. **Tone rules:** no urgency, no discount, no "shop now". Get this wrong and it is actively damaging. | M3 |
| 16 | `/gifts/mothers-day-family-tree-gift` | `meaningful mothers day gift for mum`, `mothers day gift for grandma` | Long-tail occasion | 1,000–1,400 | #5, #6 | #2, #4 | Occasion #2. Ships in month 3 to be live ~10+ weeks before the March/May peaks and to have a season behind it by 2028. | M3 |
| 17 | `/tools/blank-family-tree-chart` | `free printable family tree chart`, `blank family tree template` | Informational / lead magnet | 500 + PDF | #12, #9, footer | `/build`, #2 | The one sanctioned "free template" page (§4.5). Email capture on download; the filled-in sheet is the exact 15 names the builder needs. Constrained to be a napkin, not a substitute. | M3 |
| 18 | `/gifts/golden-anniversary-gift-for-parents` | `golden wedding anniversary gift for parents`, `50th anniversary gift ideas` | Long-tail occasion | 900–1,200 | #5 | #2, #4 | Occasion #5. Distinct chart variant (two lineages joining) so the page has real product substance, not just a swapped occasion word. | M4 |
| 19 | `/guides/print-your-ancestry-tree` | `print my ancestry tree`, `export gedcom from ancestry` | Informational (secondary persona) | 900–1,200 | #13, #14 | `/build`, #2 | Cheapest possible service of the historian segment (`docs/00-decision-brief.md`). One page, honest about what we do and don't do with a GEDCOM. We take the traffic; we do not build the product. | M4 |
| 20 | `/stories/{first-customer}` | Brand / long-tail | Brand + trust | 700–1,000 | #1, #5, `/reviews` | #2 | A real chart, a real family, a real photo on a real wall. Photo-on-wall UGC is expected to be our highest-converting creative (`docs/02` §15.2), and this is the page that houses it. Also feeds the brand SERP (§3.7). | M4 |

**Also required in month 0, not "content" but load-bearing:** `/about` (a real
human name and photo — this is a $169 purchase from an unknown vendor),
`/reviews`, `/shipping` (with the Christmas cut-off date), `/returns`,
`/contact`. These do more for the brand SERP than any article on the list.

### 6.1 What this costs, honestly

| Item | Estimate `[ASSUMPTION — reasoned from typical drafting effort, not measured]` |
|---|---|
| Money pages (#1–5) | 4–6 h each incl. copy iteration → ~25 h |
| Articles (#6–9, 11–16, 18–20) | 3–5 h each incl. images → ~55 h |
| Tools (#10, 17) | 4–8 h each build → ~15 h |
| **Total** | **~95 hours** |

That is roughly **12 working days**, competing directly with building the chart
renderer — which is the unvalidated core of the business. **Recommendation: ship
#1–#8 before launch (~45 h) and treat #9 onward as post-launch background work
at one page per week.** If forced to choose between article #16 and fixing the
builder's name-truncation logic, fix the builder.

**On AI-drafted content:** using a model to draft is fine and sensible. Shipping
20 undifferentiated model-written articles is the same failure as §4.2 in a
smaller costume. The test is unchanged — *what is on this page that exists
nowhere else?* For us that means: our own rendered chart images, our actual
policies and prices, the specific decisions our product makes, and real customer
photographs. Every page on the roadmap has at least one of those or it doesn't
ship.

---

## 7. Seasonality and lead times

`[ASSUMPTION — occasion ordering is from docs/00; the search-peak windows are
inference from when people shop for these occasions, not measured data]`

| Occasion | Search peak window | Content must be live by | Reasoning |
|---|---|---|---|
| Christmas | mid-Oct → 15 Dec | **31 Aug** | Gift-guide editors build lists in Sep–Oct. Missing that window costs both the ranking attempt *and* the roundup inclusions, which matter more. |
| Mother's Day (UK Mar / US May) | 4 weeks prior | 1 Jan / 1 Mar | Personalised gifts need lead time, so intent starts earlier than for generic gifts. |
| Father's Day (Jun) | 3 weeks prior | 1 Apr | Lower volume for this product `[ASSUMPTION]` — don't over-invest. |
| Milestone birthdays | Flat year-round | Anytime | The only non-seasonal cluster; the reason #7 ranks high in the roadmap. |
| Memorial | Flat, non-seasonal | Anytime | Never promoted seasonally. Ever. |
| Golden/silver anniversary | Mild summer skew | 1 Apr | Low volume, high AOV. |
| Family reunion | Apr–Jul | 1 Mar | Post-validation. |

**The compounding rule:** publish seasonal pages ~12 months before you expect
them to rank, not 12 weeks. Everything shipped in autumn 2026 is aimed at
autumn 2027.

---

## 8. Links — the part that actually decides whether any of this ranks

Content without links does not rank on a new domain, and this is where most
solo-founder SEO plans quietly fail. Ranked by realistic ROI:

| Tactic | Effort | Realistic outcome | Honest assessment |
|---|---|---|---|
| **Gift-guide roundup pitches** (Aug–Sep, for Christmas) | 15–25 h; a list of 60 mid-tier gift/lifestyle/parenting blogs + a clean product photo pack | 3–10 inclusions `[ASSUMPTION]` | **The highest-ROI activity in this document, by a distance.** Delivers a link *and* direct in-season traffic *and* social proof. Being new is not a blocker; being late is. Requires product photography to exist by August. |
| **Genealogy society newsletters** (county/state/regional; hundreds of them, actively looking for content) | 5–10 h | A handful of newsletter mentions and links | Off-persona audience (historians, not gift buyers) but the links are topically relevant and easy. Offer the cousin calculator, not a discount code. |
| **The cousin calculator as a citable resource** | Built anyway (#10) | Slow, passive accrual | The only genuinely passive link source here. Works over years. |
| **Digital PR / data story** | 20 h+ | Low probability | We have no proprietary dataset. Skip until we do. |
| **Reddit / Facebook genealogy groups** | Low | ~0 links; possible bans | Nofollowed, and self-promotion is unwelcome. Answer questions or stay out. |
| **Paid link buying / guest-post networks** | $ | Negative expected value | No. |
| **Supplier/partner links** (framers, photographers, funeral directors for #15) | 5 h | 1–3 links | Sensitive for the memorial segment — approach as a partnership, not a link grab. |

**Do not fabricate a link target.** If a page has no plausible reason for anyone
to link to it, that page is a conversion asset, not a ranking asset, and should
be judged accordingly.

---

## 9. Measurement

| Horizon | Primary metric | Secondary | Explicitly ignore |
|---|---|---|---|
| Month 1 | Pages indexed (GSC Coverage) | Crawl errors, `noindex` correctness on `/c/*` | All traffic numbers |
| Months 2–3 | **Non-brand impressions** in GSC | Query list composition — are they the right *intent*? | Position averages (noisy at low volume) |
| Months 4–6 | Queries in positions 11–30 (the on-deck cohort) | Clicks, click-through rate | Revenue attribution — too sparse to read |
| Months 7–12 | Organic sessions → builder-start rate | Assisted conversions from organic | Vanity keyword rankings |

Self-hosted analytics in Postgres (`docs/00`) means the join that matters is
cheap: **organic landing page → builder started → chart saved → order.** Track
builder-start rate by landing page from day one; it tells you which content
attracts buyers versus browsers long before order volume is readable.

**Sanity check on GSC:** verify the property, submit the sitemap, and check the
`/c/*` share-link paths are absent from the index every month for the first six.
That last check is the one that matters most, and it is the one people forget.

---

## 10. Gates and kill criteria for the SEO programme

| Gate | Check at | Pass | Fail action |
|---|---|---|---|
| Does search demand exist at all? | Week 1 (§2) | Purchase-intent terms show non-trivial volume in ≥2 of 6 tools | Cut the roadmap to #1–#5 + `/about` + trust pages. Redirect all effort to paid/Pinterest/share loop. |
| Are we ranking for *any* non-brand query? | Month 4 | ≥3 non-brand queries in top 30 | Stop publishing new articles. Improve the 8 that exist. Publishing more of something that isn't working is the classic failure. |
| Are the queries the right intent? | Month 6 | Majority of impressions are gift/purchase-intent, not free-template/research | Deindex or rewrite the pages pulling wrong-intent traffic — including tool #17 if it's the culprit. |
| Is organic producing builder starts? | Month 9 | Organic builder-start rate within 50% of paid's | Content is attracting readers, not buyers. Rewrite for commercial intent. |
| Is it worth continued time? | Month 12 | ≥1–2 organic orders/week `[ASSUMPTION]` | Freeze at maintenance. SEO is not the channel; say so and stop spending hours on it. |

---

## 11. Where this plan is weakest — stated plainly

1. **It is built on zero keyword data.** Every cluster, difficulty band and
   priority in §3 is inference from who currently occupies those SERPs. §2 costs
   two hours and could invalidate large parts of §3 and §6. Do it before writing
   a single article.
2. **The occasion cluster may be structurally unwinnable.** Gift-guide SERPs are
   held by publishers with enormous authority who refresh the same URLs annually.
   If that holds, our occasion pages are landing pages for paid traffic with an
   SEO upside of approximately zero — which changes their *justification* but not
   the decision to build them, since we need the landing pages regardless. Watch
   for this and stop calling it SEO if it proves true.
3. **95 hours competes directly with the builder**, which is the unvalidated core
   of the whole business (`docs/02` §17). The mitigation (ship 8 pages, defer the
   rest) is real but weakens the compounding argument that justifies content in
   the first place.
4. **The link plan depends on one seasonal window.** Gift-guide pitching in
   Aug–Sep is the highest-ROI item here and it is annual. Miss it and the next
   opportunity is twelve months away — with the current date at 12 Aug 2026, that
   window is open *now* and closing.
5. **The 8 origin pages (§4.4) are the closest thing here to a slippery slope.**
   The reasoning that makes 8 defensible ("each page has substance no other page
   has") is the same reasoning a future version will use to justify 40. It does
   not extend. If page 9 requires inventing substance, the surface is finished.
6. **Nothing here validates the core assumption.** SEO cannot tell us whether a
   gift buyer will type in 15 names. Only `docs/09-first-30-days.md` can, and no
   amount of content is a substitute for running that test.
