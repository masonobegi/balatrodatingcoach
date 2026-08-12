# Phase 10 — Six-month roadmap

**Window: August 2026 → January 2027, with February 2027 planned as the verdict month.**

---

## 0. How to read this document

Four things before the tables.

1. **$1,000/month is ~11 orders at a $95 AOV.** One order every three days. This is a
   modest bar and this document will not dress it up as a heroic one. The interesting
   question is not whether you can hit $1,000 in a December — Christmas will do that for
   you — it is whether you can hit it in a **February**, when nothing is helping.
2. **Every number below is a target, not a forecast.** Revenue, traffic, conversion and
   AOV are all `[ASSUMPTION]` and inherit from `docs/03-unit-economics.md` §6 and §8.
   None has been measured. The seasonality multipliers in §1 are inference about when
   people shop for sentimental gifts, not data.
3. **The plan is built around Q4 and around surviving what follows it.** Launching on
   12 August 2026 is close to the best available timing for a gifting product: you get
   roughly ten weeks to build proof, then the largest gifting window of the year, then a
   collapse. **The January collapse is in the plan. It is not a kill signal.** §14 says
   exactly what would be.
4. **Two gates come before everything.** Real supplier pricing (`docs/03` §13 item 1) and
   the builder-completion gate (`docs/03` §13 item 2 / `docs/08` §3.6). Both sit in Month 1.
   If either fails, months 2–6 of this document are void and you should be reading
   `docs/02` §17 instead.

**Calendar alignment with `docs/08`.** `docs/08-acquisition.md` §5.2 labels August 2026 as
"M0" because it is pre-revenue. This document labels it **Month 1**, because it is a month
of work. The offset is one month throughout:

| This document | `docs/08` §5.2 | Calendar |
|---|---|---|
| Month 1 | M0 | Aug 2026 |
| Month 2 | M1 | Sep 2026 |
| Month 3 | M2 | Oct 2026 |
| Month 4 | M3 | Nov 2026 |
| Month 5 | M4 | Dec 2026 |
| Month 6 | M5 | Jan 2027 |
| Month 7 (verdict) | M6 | Feb 2027 |

---

## 1. The calendar this plan is actually running against

### 1.1 Assumed demand seasonality

`[ASSUMPTION — inference from when people shop for sentimental, personalised, made-to-order
gifts. Not measured. 1.0 = an ordinary month.]`

| Month | Index | Why |
|---|---|---|
| Aug 2026 | 0.7 | Dead month for gifting. Correct month to build. |
| Sep | 0.8 | Grandparents Day (13 Sep). Gift-guide editors are commissioning. |
| Oct | 1.1 | Christmas shopping genuinely begins mid-October for made-to-order goods. |
| Nov | **1.8** | The true peak for a product with a production lead time. |
| Dec | **2.0**, compressed | See §1.2 — earned in ~15 days, not 31. |
| Jan 2027 | **0.5** | The collapse. Post-Christmas, no occasion, credit-card hangover. |
| Feb | 0.7 | Milestone birthdays and memorial only. **The honest baseline.** |
| Mar (out of window) | 0.9 | UK Mothering Sunday ~7 Mar. |

### 1.2 The December compression — the most operationally important fact in this plan

Christmas order-by dates (`docs/08` §17): **~11 Dec standard, ~15 Dec express.** December
is therefore not a 31-day selling month. It is roughly **15 sellable days** followed by a
fortnight of support, late-panic digital rescues and nothing else.

| | Nov 2026 | Dec 2026 |
|---|---|---|
| Revenue target | $2,900 | $3,570 |
| Sellable days | 30 | ~15 |
| **Revenue per sellable day** | **$97** | **$238** |

Two consequences you must design for now, not in December:

- **A supplier slip in the first two weeks of December is the single most expensive
  operational event in the six months**, because "in time for Christmas or your money back"
  means you refund the price and eat the COGS. Hold back a guarantee reserve (§11.3).
- **November is the month that must not be underworked.** More Christmas orders for a
  made-to-order product land in November than most founders expect, because the customer
  is doing the lead-time arithmetic herself.

### 1.3 Hard lead times — the things that cannot be done late

| Item | Must be done by | Consequence of missing it |
|---|---|---|
| Gift-guide pitches to ~60 blogs (`docs/07` §8) | **31 Aug 2026** | Editors build Christmas lists Sep–Oct. Missing it costs the links *and* the in-season traffic. Next window: Aug 2027. |
| Product photography exists (8–12 real prints on real walls) | 31 Aug 2026 | Blocks gift guides, Pinterest, Meta creative, testimonials — i.e. every channel. |
| Genealogical-society November newsletter placements booked | ~30 Sep 2026 | Society newsletters have 4–8 week lead times. Book in Sep for Nov. |
| Pinterest at 60+ pins live | 30 Sep 2026 | Pins take 4–8 weeks to gain traction `[RULE OF THUMB]`. Pins seeded in October arrive in December, half a season late. |
| Christmas order-by dates published sitewide | 1 Nov 2026 | The deadline *is* the offer. Publishing it late forfeits the urgency. |
| Q4 supplier capacity/SLA confirmed in writing | 1 Nov 2026 | POD partners degrade in December. Find out in November. |
| UK Mothering Sunday content live | 25 Jan 2027 | ~7 Mar 2027 occasion, 6-week lead. This is why January is a *building* month. |

---

## 2. The six months in one table

Conversion, AOV and gross-profit-per-order all vary by month for reasons stated in each
section — Q4 skews toward framed, rush and gift-wrapped orders (higher AOV, *lower*
percentage margin — see `docs/03` §6.4); January skews toward unframed self-purchase.

| # | Month | Visitors | Visitors/day | Conv. | Orders | AOV | **Revenue** | GP/order | **Gross profit** | **Spend cap** |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Aug 2026 | ~300 | 10 | n/a | 0–3 paid (+20 free) | $79 | **$0–$150** | — | **$0** | **$250** |
| 2 | Sep 2026 | 1,200 | 40 | 0.60% | 7 | $88 | **$634** | $48 | **$339** | **$250** |
| 3 | Oct 2026 | 1,700 | 55 | 0.80% | 14 | $92 | **$1,288** | $51 | **$708** | **$700** |
| 4 | Nov 2026 | 2,900 | 97 | 1.00% | 29 | $100 | **$2,900** | $53 | **$1,537** | **$600** |
| 5 | Dec 2026 | 3,300 | 106* | 1.05% | 35 | $102 | **$3,570** | $53 | **$1,855** | **$400** |
| 6 | Jan 2027 | 2,000 | 65 | 0.55% | 11 | $82 | **$902** | $47 | **$514** | **$150** |
| | **6-month total** | **11,400** | | **0.84%** | **96** | **$97** | **$9,294** | | **$4,953** | **$2,350** |
| 7 | Feb 2027 | 2,300 | 82 | 0.65% | 15 | $85 | **$1,275** | $48 | **$714** | **$300** |

\* December's daily rate is not flat: expect ~200/day to 15 Dec and near-zero after.

**Six-month cash position, pre-salary:**

| Line | Amount |
|---|---|
| Gross profit | $4,953 |
| − Fixed infrastructure (6 × $27) | −$162 |
| − Discretionary spend caps (§11) | −$2,350 |
| **= Net, before paying yourself anything** | **≈ $2,441** |
| Founder hours `[ASSUMPTION 22 h/wk × 26 wk]` | ~570 h |
| **Implied hourly rate** | **≈ $4.30/h** |

That number is the honest one and you should look at it squarely. **This is not a
six-month income. It is a six-month option purchase** — you spend ~570 hours and ~$2,350
to buy a validated answer to "does this work in February", plus an asset that starts the
2027 season with photography, testimonials, ranked pages and a Pinterest account with
history. Judge the six months on whether that option is worth having, not on the $2,441.

**When $1,000/month is cleared:**

| Metric | First cleared | Cleared in |
|---|---|---|
| $1,000 revenue/month | **Month 3 (Oct)** | Months 3, 4, 5 — and again in Month 7 |
| $1,000 gross profit/month | **Month 4 (Nov)** | Months 4, 5 |
| $1,000 revenue in a month with **no** seasonal help | **Month 7 (Feb)** | The only one that proves anything |

---

## 3. Standing rules for all six months

These do not change month to month. Violating one invalidates the month's data.

| # | Rule | Source |
|---|---|---|
| 1 | **Never sell a print-ready digital file standalone.** Post-purchase add-on, or free with 24×36. | `docs/00`, `docs/02` §5.3 |
| 2 | **Never run a percentage discount on the print.** Add value (free framing upgrade, free wrap) instead. | `docs/02` §11.3 |
| 3 | **Never extend a spend cap because it is "nearly working."** The caps are the entire value of the experimental design. | `docs/08` §22 |
| 4 | **Friends-and-family orders are logged separately and excluded from every conversion metric.** | `docs/08` §3.1 |
| 5 | **Shared-link traffic is reported as its own channel, never averaged into site conversion.** | `docs/03` §8.3 |
| 6 | **Memorial is never proactively advertised.** Findable, never pushed. | `docs/08` §22 |
| 7 | Six weekly numbers only: charts started; % reaching ≥5 names; charts saved; share links per saved chart; orders and **orders per chart (M)**; blended CAC. | `docs/08` §21.1 |
| 8 | **No paid spend until conversion ≥2%, CPC ≤$1.50 and M ≥1.5 are simultaneously measured** — except the single capped Meta test in Month 3. | `docs/03` §9.3 |

---

## 4. Month 1 — August 2026 · **Validate, then launch**

*Theme: answer the two questions that can void the business, and get the August-only
lead-time work out of the door before the month ends.*

### 4.1 Targets

| Target | Value | Note |
|---|---|---|
| Revenue | **$0** committed; $150 stretch | Revenue in Month 1 is a distraction. Do not chase it. |
| Visitors | ~300 | Recruited, direct, and your own network. Not a channel number. |
| Conversion | **Not measured** | There is barely a funnel yet. |
| Customers | **20 concierge charts**, 0–3 paid | Strangers only (`docs/08` §3.1) |
| **The real metric** | **% of chart-starters reaching ≥5 names** | This is the business |
| Spend cap | **$250** | |

### 4.2 The two blocking gates

| Gate | Cost | Pass | Fail action |
|---|---|---|---|
| **G1 — Supplier pricing.** Pull live Prodigi + Gelato pricing for all six SKUs to a US residential address, including shipping. Confirm (a) framed delivered cost, (b) whether N prints ship in one tube, (c) gift-wrap availability. | Free, ~30 min | Framed 18×24 delivered Δ ≤ $45 | Δ > $45 → **framing pricing is wrong before launch.** Tier the frame uplift or drop framed SKUs. Do not launch the +$50 flat. (`docs/03` §5) |
| **G2 — The 15-names gate.** Of 20 strangers who *start* a chart, how many enter ≥5 names? | ~$135 of prints | **≥10** | **<5 → stop. Stop acquisition, stop content, stop this roadmap.** The problem is the product. (`docs/08` §3.6) |

**Nothing in months 2–6 is authorised until G1 and G2 both return an answer.** They are
free or nearly free and they gate every dollar and hour that follows.

### 4.3 Marketing activities

| Activity | Detail | Deadline |
|---|---|---|
| Concierge recruitment | 20 strangers from FB genealogy groups, r/Genealogy, local society (`docs/08` §3.2–3.3). Public helpful comment first, DM second, never a link in the comment. | Rolling |
| **Watch 5 sessions live, in silence** | Screen share. You may say "what are you thinking?" and nothing else. | By 31 Aug |
| The 10 questions | Ask every single one of the 20 (`docs/08` §3.5). Q3 and Q10 are the business. | Rolling |
| **Gift-guide pitching** | ~60 mid-tier gift/lifestyle/parenting blogs, with the photo pack. **This window closes and does not reopen for 12 months.** | **31 Aug** |
| Product photography | 8–12 photographs of real prints on real walls. Blocks everything downstream. | 31 Aug |
| Pinterest + Instagram accounts created, first 20 pins seeded | Not a growth push — an existence push. | 31 Aug |
| Grandparents Day (13 Sep) campaign built | Ships 1 Sep. Order-by 2 Sep — so it is really an early-Sep push with an August build. | 31 Aug |

### 4.4 Product improvements

| Item | Why it is in Month 1 |
|---|---|
| Builder instrumented: starts, person-count reached, drop-off position, time-per-field | Without this, G2 is an opinion |
| Fan chart layout, 4 generations, genuinely good | The one layout that must be excellent at launch |
| Save + resume with email capture | The chart is the asset; an abandoned chart with an email is recoverable |
| Share page (`docs/08` §2.4), instrumented, `noindex` on `/c/*` | The growth loop cannot be measured retroactively |
| Stripe Checkout + a real 300 DPI print pipeline, end to end | |
| **One real test order placed with the supplier, to your own address** | You must hold the object before you sell it |
| "How did you hear about us?" free-text field at checkout | Your best attribution instrument at this volume (`docs/08` §21) |

### 4.5 Experiments

| ID | Hypothesis | Cap | Success | Failure |
|---|---|---|---|---|
| **R1** | A stranger will enter ≥5 names unprompted | $135 of prints | ≥10 of 20 | <5 → halt everything (G2) |
| **R2** | She will share the link to ask a relative | $0 | ≥12 of 20 say yes to Q10 | <6 → M ≈ 1.0; rebuild all budgets on a $27 CAC ceiling (`docs/08` §3.6) |
| **R3** | The price is not the objection | $0 | ≥8 of 20 say they'd buy at real prices | <4 → the object or the price is wrong, not the traffic |

### 4.6 Spending limit — $250 hard

| Line | Amount |
|---|---|
| Free/cost-price prints for the concierge programme | $135 |
| Infrastructure (Vercel, Neon, domain) | $27 |
| Photography props/frames/contingency | $88 |
| **Total cap** | **$250** |

**Zero advertising spend this month.** Not "low" — zero.

### 4.7 Success criteria

- G1 answered with real supplier numbers, and the pricing architecture confirmed or revised.
- G2 passed: ≥10 of 20 reach ≥5 names.
- Photography exists. Gift-guide pitches sent by 31 Aug.
- ≥3 written testimonials with first name, age bracket and occasion.
- You can recite, from memory, what the buyer actually calls this product. (If you still
  use your own words for it, you did not listen.)

### 4.8 Failure criteria

| Signal | Action |
|---|---|
| <5 of 20 reach ≥5 names | **Stop.** Return to `docs/02` §17. This roadmap is void. |
| Framed 18×24 delivered Δ > $45 | Launch unframed-only; re-derive pricing before Month 2 (`docs/03` §5.1) |
| Gift-guide pitches not sent by 31 Aug | Q4 loses its highest-ROI link and traffic source. Accept it, note it, do not "catch up in October" — you cannot. |
| You cannot recruit 20 strangers in three weeks | Weak signal on demand, strong signal on your channel access. Investigate before spending. |

---

## 5. Month 2 — September 2026 · **Acquire, and fix conversion**

*Theme: switch from concierge to channels. The traffic is small enough that conversion
work is cheap and the Q4 infrastructure must be finished while the volume is forgiving.*

### 5.1 Targets

| Target | Value |
|---|---|
| Revenue | **$634** |
| Visitors | **1,200** (40/day) |
| Conversion | **0.60%** visitor → purchase |
| Orders | **7** |
| AOV | $88 |
| Gross profit | $339 |
| Builder completion (start → ≥8 people) | ≥22% |
| Spend cap | **$250** |

Conversion at 0.60% is deliberately near `docs/03`'s Conservative case (0.51%), not Base.
A brand-new site with no reviews, no history and unrecognised payment trust does not
convert at Base in its first month of real traffic.

### 5.2 Marketing activities

| Activity | Detail |
|---|---|
| **Pinterest to 60+ pins** by 30 Sep | The channel that actually matters. Board structure per `docs/08` §8.2. |
| Grandparents Day push (13 Sep) | Order-by 2 Sep. Small occasion, perfect rehearsal for Christmas mechanics. |
| **Book society newsletter placements for November** | 4–8 week lead. Doing this in October is doing it too late. |
| Facebook groups | Continued honest participation. No links. Ask admins for permitted vendor threads (`docs/08` §9.3). |
| Instagram/TikTok 30-day calendar (`docs/08` §18) | Primarily to make the creative that Q4 needs. |
| Micro-influencer outreach begins | 3–5 week lead from outreach to post. Gifts must land in October to post in November. |
| First 8 SEO pages published (`docs/07` §6) | Autumn 2026 content is aimed at autumn 2027. Expect nothing this season. |

### 5.3 Product improvements

| Item | Why now |
|---|---|
| **Vertical tree layout** | Second layout doubles the addressable taste; some families read badly as fans |
| Size-comparison UI (chart shown at scale against a sofa/wall) | The single most likely lever on the size mix, which drives AOV harder than framing |
| Abandoned-builder email (24 h, 72 h) | Saved charts are the cheapest revenue in the business |
| Trust surface: reviews, guarantee, returns, real address, order-by promise | A $79 purchase from an unknown brand fails on trust before it fails on price |
| Multi-copy in cart, with **"same address" vs "different addresses"** made explicit | Split shipping costs ~7.5 margin points (`docs/03` §11.1) — you must be able to see it |

### 5.4 Experiments

| ID | Hypothesis | Cap | Success | Failure → action |
|---|---|---|---|---|
| **S1** | Landing page leads with *the object*, not the tool | $0 | Builder-start rate ≥20% | <12% → the hero is wrong; test the 22 s build video as hero |
| **S2** | Framed option shown vs hidden changes conversion, not just AOV | $0 | Framed-shown variant converts ≥ unframed-only | Framed-shown converts *worse* → framing is a liability, not a lever (`docs/03` §6.5) |
| **S3** | Share prompt at the maiden-name wall beats a generic share button | $0 | ≥0.4 share links per saved chart | <0.15 → the loop is not native; rebuild all acquisition on paid-free organic only |

### 5.5 Spending limit — $250 hard

| Line | Amount |
|---|---|
| Prints for photography, influencer gifts, society samples | $200 |
| Infrastructure | $27 |
| Contingency | $23 |

**Still zero advertising spend.**

### 5.6 Success / failure

| | Criterion |
|---|---|
| **Success** | ≥5 paid orders from strangers; ≥60 pins live; ≥2 November newsletter placements booked; builder completion ≥22%; ≥0.3 share links per saved chart |
| **Failure** | **0–1 paid orders from strangers** → the object does not sell itself; stop channel work and run 10 more watched sessions. **Builder completion <15%** → conversion work is pointless; the builder is the problem. **0 society placements booked** → November's baseline traffic will not exist; compensate now or accept a smaller Q4. |

---

## 6. Month 3 — October 2026 · **Find the repeatable channel, then stop looking**

*Theme: Christmas demand starts mid-month. This is the last month in which experiments are
cheap. By 31 October you must know which two channels you are running in November, and you
must stop testing the rest.*

### 6.1 Targets

| Target | Value |
|---|---|
| Revenue | **$1,288** — first month clearing $1,000 |
| Visitors | **1,700** (55/day) |
| Conversion | **0.80%** |
| Orders | **14** |
| AOV | $92 (framing attach begins to lift) |
| Gross profit | $708 |
| Orders per chart (M) | ≥1.15 measured |
| Spend cap | **$700** |

### 6.2 Marketing activities

| Activity | Detail |
|---|---|
| **Christmas campaign live 1 Oct** (`docs/08` §17) | Not late October. Made-to-order shoppers start early. |
| **The single capped Meta test** (`docs/08` §13.4) | $560 hard cap across three stages. This is the *only* authorised paid experiment in six months. |
| Influencer gifts delivered and filmed | 3–5 week lead means October delivery for November posts |
| Pinterest to 150+ pins, seasonal boards surfaced | Pins seeded in Sep start producing now |
| Gift-guide follow-ups | Second touch on the ~60 blogs; inclusions land Oct–Nov |
| Society newsletters confirmed for November | Copy submitted, unique codes issued |

### 6.3 Product improvements

| Item | Why now |
|---|---|
| Gift wrap + card at checkout | Q4 attach lever, trivial to add, $8 at ~$2.50 cost |
| **Order-by-date banner infrastructure** (dated, sitewide, with a real buffer) | Must exist before it is needed, not during |
| Rush option (+$15) plumbed | December's highest-intent buyers are late buyers |
| Gift receipt / delayed reveal / ship-to-recipient | She is buying for someone else. The whole product is a gift. |
| Capacity and QA batching: 5 min of chart QA per order | At 35 orders/month this is 3 hours. At 100 it is not. Batch now. |

### 6.4 Experiments

| ID | Hypothesis | Cap | Success | Failure → action |
|---|---|---|---|---|
| **O1 (= `docs/08` M1)** | Meta can acquire a chart-builder below the CAC ceiling | **$560, absolute** | Blended CPA ≤ $43 for 7 consecutive days at ≥$30/day | CPA > $85 at end of Stage 2 → **shut Meta off for the year.** Do not revisit in Q4 "because it's Christmas". |
| **O2** | Multi-copy prompt at the confirmation step lifts orders per chart | $0 | ≥8% second-copy attach | <3% → the AOV model's $9.44 multi-copy line is fiction; re-plan on $95 AOV (`docs/03` §6.2) |
| **O3** | Occasion landing pages outconvert the generic homepage | $0 | Occasion page builder-start ≥1.3× homepage | Flat → occasion pages are SEO assets only, not paid destinations |

### 6.5 Spending limit — $700 hard

| Line | Amount |
|---|---|
| Meta test (hard cap, three staged gates) | $560 |
| Influencer gift prints (4 × ~$27–65) | $110 |
| Infrastructure | $27 |
| **Total** | **$697** |

**If the Meta Stage 1 gate fails, the remaining $350 is not respent elsewhere. It is not
spent at all.** A failed test that returns its unspent budget is a successful test.

### 6.6 Success / failure

| | Criterion |
|---|---|
| **Success** | ≥$1,000 revenue; ≥12 orders; conversion ≥0.75%; **two channels identified that produced ≥3 orders each**; M ≥1.15; all Q4 checkout mechanics shipped and tested with a real order |
| **Failure** | **<$700 revenue** → you enter Q4 without a working channel; cancel the November scale-up and treat Q4 as a data-collection season, not a revenue season. **No channel produced ≥3 orders** → you have traffic without a source; November will be a coin flip. **Meta CPA >$85** → paid is dead for the year (expected outcome — `docs/03` §9.2 says exactly one cell in the CPA grid clears break-even). |

---

## 7. Month 4 — November 2026 · **Scale only what already worked**

*Theme: this is the month the six months are for. Do more of the two things that worked in
October and nothing else. November is not a month for new ideas.*

### 7.1 Targets

| Target | Value |
|---|---|
| Revenue | **$2,900** |
| Visitors | **2,900** (97/day) |
| Conversion | **1.00%** — Base-case territory, justified by occasion intent |
| Orders | **29** |
| AOV | $100 (framed 25%, wrap 30%, multi-copy begins) |
| Gross profit | $1,537 — first $1,000 **gross profit** month |
| Spend cap | **$600** |

### 7.2 Marketing activities

| Activity | Detail |
|---|---|
| **Order-by dates published everywhere by 1 Nov** | Homepage, product, cart, email footer, Pinterest descriptions. "In time for Christmas, or your money back." |
| Society newsletters land | Unique codes per society — the only reliable attribution for these |
| **Cyber Week 27–30 Nov: value-add, never % off** | Free framing upgrade or free wrap+rush. A discount signals the gift is cheap and funds itself out of the reprint reserve. |
| Influencer posts go live | Timed for the 15–30 Nov shopping window |
| Pinterest: seasonal boards to the top, 250+ pins, daily fresh pins | Pinterest peaks Oct–Dec |
| Gift-guide inclusions monitored and amplified | Any inclusion becomes a Pinterest pin, an IG post and an email |
| **Doubling down** | Whatever the two October winners were, take 80% of the marketing hours. Everything else gets maintenance. |

### 7.3 Product improvements

**Freeze the builder on 1 November.** Only these ship:

| Item | Why it is exempt from the freeze |
|---|---|
| Order-by countdown, live and honest | The deadline is the offer |
| Rush option surfaced prominently after ~25 Nov | Converts the anxious late buyer |
| Checkout speed and mobile polish only | Q4 traffic is mobile and impatient |
| Supplier SLA monitoring + a manual "at risk order" list | You must know a slip is happening before the customer does |
| Support macros for the eight predictable Q4 questions | Volume is support, not engineering |

Everything else — new layouts, GEDCOM import, features you had ideas about in October —
waits until January. **Shipping a builder change in Q4 risks the only revenue window you
have this year to fix something nobody complained about.**

### 7.4 Experiments

Two only. November is for executing, not learning.

| ID | Hypothesis | Cap | Success | Failure → action |
|---|---|---|---|---|
| **N1** | Cyber Week value-add beats no offer | $0 (margin cost only) | Cyber Week week ≥1.6× the prior week's orders | <1.2× → offers do not move this buyer; occasion urgency does. Save the margin in December. |
| **N2** | The share loop compounds under seasonal traffic | $0 | M ≥1.3 in November | M ≤1.05 under peak traffic → **the growth loop is not real.** This is the most consequential negative result available and it should reshape 2027 entirely. |

### 7.5 Spending limit — $600 hard

| Line | Amount |
|---|---|
| Influencer gift prints (final wave) | $200 |
| Society newsletter placement fees / sample prints | $150 |
| Replacement and goodwill prints (Q4 reserve) | $150 |
| Google brand-defence search ads (~$60) | $60 |
| Infrastructure | $27 |

**No new Meta spend unless O1 passed outright.** If it passed, and only then, the funded
column of `docs/08` §20 unlocks — but funded by November's *own* gross profit, not by
raising the cap here.

### 7.6 Success / failure

| | Criterion |
|---|---|
| **Success** | ≥$2,500 revenue; ≥25 orders; conversion ≥0.9%; zero missed production deadlines; M ≥1.25; at least one gift-guide inclusion live |
| **Failure** | **<$1,500 revenue in the peak pre-Christmas month** → the seasonal thesis is not working and December will not rescue it; cut December spend to zero and reallocate the time to the February question. **Any supplier slip >3 days** → change the published order-by date immediately, before it costs you refunds. **M <1.05** → treat the loop as dead in all 2027 planning. |

---

## 8. Month 5 — December 2026 · **Harvest, protect the promise, lift AOV**

*Theme: 15 sellable days at ~$238/day, then a fortnight of operations. Do not run
acquisition experiments into a deadline. The AOV levers are the only levers left.*

### 8.1 Targets

| Target | Value |
|---|---|
| Revenue | **$3,570** (~$3,300 of it before 15 Dec) |
| Visitors | **3,300** (~200/day to 15 Dec, near-zero after) |
| Conversion | **1.05%** |
| Orders | **35** |
| AOV | $102 — highest of the year (rush + wrap + framed + multi-copy all peak) |
| Gross profit | $1,855 — note margin % *falls* to ~52%; this is correct (`docs/03` §6.4) |
| Spend cap | **$400** |

### 8.2 Marketing activities

| Activity | Detail |
|---|---|
| Deadline urgency, escalating: 11 Dec standard → 15 Dec express | Honest countdowns with a real buffer. Never publish a date you cannot hold. |
| **Late-panic window 12–23 Dec** | The hi-res digital file as a **post-purchase rescue only** — never a standalone SKU. She buys the print, receives a printable file to wrap on the 25th, print ships in January. |
| Multi-copy push to everyone who already ordered | "Your siblings will ask. 25% off the second copy, same package." This is the best AOV lever and it *improves* margin when copies ship together (`docs/03` §11.1). |
| Everything pauses 24 Dec–1 Jan | Genuinely stop. You will need December's energy in January. |

### 8.3 Product improvements

| Item | Why |
|---|---|
| Digital-rescue flow (post-purchase, automated) | Otherwise it is manual labour on your busiest days |
| "Gift arriving after Christmas" printable card | Converts the late buyer honestly instead of over-promising |
| Post-purchase digital add-on email (+$15, free with 24×36) | Pure margin, zero COGS |
| Refund/reprint workflow that takes 90 seconds | You will use it. The guarantee is worthless if honouring it is slow. |

### 8.4 Experiments

| ID | Hypothesis | Cap | Success | Failure → action |
|---|---|---|---|---|
| **D1** | The post-purchase digital add-on attaches | $0 | ≥10% of eligible orders | <4% → remove the line from the AOV model (worth ~$1.13/order — small either way) |
| **D2** | The digital rescue converts otherwise-lost late traffic | $0 | ≥5 orders from 12–23 Dec | 0 orders → next year, close ordering on 11 Dec and save the operational complexity |
| **D3** | A December buyer will return in January for the other side of the family | $0 (measure only) | ≥2 second purchases by 31 Jan | 0 → the 15% repeat assumption (`docs/03` §9.5) is unsupported; plan 2027 on zero repeat |

### 8.5 Spending limit — $400 hard

| Line | Amount |
|---|---|
| **Guarantee / reprint reserve** (~10% of December gross profit) | $190 |
| Goodwill and expedited reships | $100 |
| Google brand defence | $60 |
| Infrastructure | $27 |

**Zero net-new acquisition spend after 10 December.** Traffic bought after the order-by
date cannot buy anything.

### 8.6 Success / failure

| | Criterion |
|---|---|
| **Success** | ≥$3,000 revenue; ≥28 orders; **zero broken Christmas promises**; ≥3 unprompted testimonials or gift-recipient photos; AOV ≥$95 |
| **Failure** | **<$1,800 revenue in the single best gifting month of the year with a live site, photography, testimonials and Q4 traffic** → this is the strongest negative signal in the entire six months. It does not mean stop in December; it means January's review is a genuine go/no-go, not a planning session. **Any customer who paid for Christmas delivery and did not get it** → refund immediately and in full, publicly and without argument. |

---

## 9. Month 6 — January 2027 · **The collapse, and the rebuild**

*Theme: revenue falls off a cliff. This is expected, it is normal, and it is not evidence
of anything. January is a building month with a small revenue floor under it.*

### 9.1 Say this plainly

> **January revenue will fall 60–80% from December. That is the shape of every gifting
> business. It is not a kill signal and it must not be treated as one.**

The specific trap: December feels like product-market fit, January feels like failure, and
both feelings are wrong. December was demand you rented from a holiday. January is the
first honest look at what you actually own.

| Comparison | Reads as | Actually means |
|---|---|---|
| Jan $902 vs Dec $3,570 (−75%) | Catastrophe | **On plan.** Seasonality index 2.0 → 0.5. |
| Jan $902 vs Sep $634 (+42%) | Modest | **This is the number that matters.** January must beat September. |
| Jan traffic 2,000 vs Sep 1,200 | Traffic held | Correct: Pinterest and SEO compound; *intent* collapsed, not reach |
| Jan conversion 0.55% vs Dec 1.05% | Halved | Expected. No occasion, no deadline, no gift urgency. |

**The January test, stated once:** *does January beat September?* September is your last
pre-Christmas non-seasonal month. If January clears it, Q4 built something that persisted.
If January is *below* September, Q4 bought a spike and left nothing behind — which is a
real finding and the one this month exists to produce.

### 9.2 Targets

| Target | Value |
|---|---|
| Revenue | **$902** (deliberately below $1,000 — do not force it) |
| Visitors | **2,000** (65/day) |
| Conversion | **0.55%** |
| Orders | **11** |
| AOV | $82 (unframed skew, no wrap, no rush) |
| Gross profit | $514 |
| Spend cap | **$150** |

### 9.3 Marketing activities

| Activity | Detail |
|---|---|
| "New Year, start your tree" 1–15 Jan | Low commercial intent, good top-of-funnel. Do not expect orders. |
| Reactivate every saved-but-unpurchased chart from Q4 | The cheapest list you own |
| Email the entire December customer base once: the *other* side of the family | Maternal and paternal charts are two products (`docs/03` §9.5) |
| **UK Mothering Sunday content live by 25 Jan** | ~7 Mar occasion, 6-week lead |
| Reunion-season partnership outreach begins | Jun–Aug 2027 season needs a February start (`docs/08` §17) |
| Pinterest continues at full cadence | Evergreen boards; Q4 seasonal boards demoted, not deleted |
| **Zero paid spend** | |

### 9.4 Product improvements — January is the engineering month

| Item | Why |
|---|---|
| Fix everything Q4 broke, from your own support log | You now have a real list instead of guesses |
| The conversion work you froze on 1 Nov | Ten weeks of hypotheses, now testable safely |
| Occasion-reminder emails (birthday, anniversary, memorial date) | The only mechanism that manufactures demand in a trough |
| GEDCOM import, if and only if it is genuinely cheap | Secondary segment, cheap to serve, cannibalises nothing (`docs/00`) |
| Second-chart prompt inside the product | Tests the repeat assumption directly |

### 9.5 Experiments

| ID | Hypothesis | Cap | Success | Failure → action |
|---|---|---|---|---|
| **J1** | Saved-chart reactivation converts | $0 | ≥5% of reactivated charts order | <1% → saved charts are not an asset; stop treating the email list as one |
| **J2** | Occasion reminders manufacture off-season demand | $0 | ≥3 orders attributable | 0 → 2027 revenue is genuinely seasonal; plan cash accordingly |
| **J3** | Non-gift positioning ("for your own wall") works in a trough | $0 | ≥20% of Jan orders self-purchase | <5% → the business is gift-only and the annual shape is fixed |

### 9.6 Spending limit — $150 hard

Infrastructure $27, goodwill/reprints $50, contingency $73. **Nothing else.** The single
most common January failure is panic-spending against a seasonal trough — buying traffic
in the month with the worst conversion of the year, at post-Q4 CPC levels, to prove to
yourself that December was real.

### 9.7 Success / failure

| | Criterion |
|---|---|
| **Success** | **Revenue > September's** (>$634); ≥8 orders; conversion ≥0.5%; ≥3 orders from non-seasonal occasions (birthday, memorial, anniversary); the frozen product backlog cleared |
| **Failure** | **Revenue < 50% of September** (<$317) → Q4 built nothing durable; February is a formal go/no-go against `docs/12-failure-detection.md`. **Zero non-seasonal-occasion orders** → the business is a Q4 business; that is survivable but it changes cash planning, ad pacing and how much of the year you can afford to be idle. Decide that now, not next November. **Any panic spend above the $150 cap** → a process failure worth naming, because it is the failure mode this month is designed around. |

---

## 10. Month 7 — February 2027 · **The verdict** *(outside the six-month window; the plan is built to it)*

The task defined a six-month window; February sits one month beyond it. It is included
because **February is the only month in this plan that proves anything.** A $1,000 December
is a holiday. A $1,000 February is a business.

| Target | Value |
|---|---|
| Revenue | **$1,275** |
| Visitors | **2,300** (82/day) |
| Conversion | **0.65%** |
| Orders | **15** |
| AOV | $85 |
| Gross profit | $714 |
| Spend cap | **$300** |

| The question | Threshold | If yes | If no |
|---|---|---|---|
| Did February clear $1,000 of revenue with no seasonal help? | $1,000 | **You have a business.** Commit to 2027: Mother's Day (US, 9 May) is the second-largest window and needs content live by 1 Mar. | Not yet a kill — but the honest read is that this is a **Q4 business with a thin off-season**, and 2027 must be planned and cash-flowed as one. |
| Did February beat October (the last comparable non-peak month)? | $1,288 | Compounding is real | Growth was seasonal, not structural |
| Is M ≥1.3? | 1.3 | The loop works; acquisition arithmetic is survivable | The loop is decoration; every 2027 budget rebuilds on a $27 CAC ceiling (`docs/08` §1.2) |
| Is builder completion ≥25%? | 25% | The core assumption held | Product risk remains the binding constraint after seven months of evidence |

February activities: UK Mothering Sunday campaign live (order-by 25 Feb), US Mother's Day
content built for a 1 Mar launch, reunion-season partnerships, and the full six-month
review against `docs/12-failure-detection.md`.

---

## 11. Spend ledger and the caps

### 11.1 The six-month ledger

| Month | Prints/gifts | Paid ads | Infra | Reserve/goodwill | **Cap** | Cumulative |
|---|---|---|---|---|---|---|
| 1 — Aug | $135 | $0 | $27 | $88 | **$250** | $250 |
| 2 — Sep | $200 | $0 | $27 | $23 | **$250** | $500 |
| 3 — Oct | $110 | **$560** | $27 | $3 | **$700** | $1,200 |
| 4 — Nov | $350 | $60 | $27 | $163 | **$600** | $1,800 |
| 5 — Dec | $0 | $60 | $27 | $313 | **$400** | $2,200 |
| 6 — Jan | $0 | $0 | $27 | $123 | **$150** | **$2,350** |
| 7 — Feb | $100 | $60 | $27 | $113 | **$300** | $2,650 |

**Total at-risk cash over six months: $2,350.** Against a modelled $4,953 of gross profit.
The business is cash-positive from roughly mid-November on the plan's own numbers, and the
maximum drawdown before that is about **$1,200 (end of October)** — the real number to hold
in your head, because it is the most you can lose before revenue arrives.

### 11.2 The three rules that make the caps mean something

1. **A failed experiment returns its unspent budget to zero, not to another line.**
2. **Caps are never raised mid-month.** If October's Meta test looks promising at $560,
   it stops at $560 and resumes in November out of November's cap, if at all.
3. **Free prints are marketing spend, not COGS.** They come out of the cap. Otherwise the
   concierge programme quietly becomes unlimited.

### 11.3 The December guarantee reserve

"In time for Christmas or your money back" is a real liability. Assume a `[ASSUMPTION]`
5% failure rate on ~35 December orders ≈ 2 orders, each costing the refunded price plus
sunk COGS ≈ $140. Reserve **$190** (~10% of December gross profit) and do not count it as
profit until 31 December.

---

## 12. Consolidated experiment register

| ID | Month | Question | Cap | Kills / rewrites |
|---|---|---|---|---|
| R1 | 1 | Will she type 15 names? | $135 | The whole business |
| R2 | 1 | Will she share the link? | $0 | The growth loop and every CAC budget |
| R3 | 1 | Is the price the objection? | $0 | The pricing architecture |
| S1 | 2 | Does the landing page lead with the object? | $0 | The homepage |
| S2 | 2 | Does framing help conversion or only AOV? | $0 | Whether framed SKUs exist |
| S3 | 2 | Is the share prompt native? | $0 | The loop mechanic |
| O1 | 3 | Can Meta acquire below the CAC ceiling? | **$560** | Paid acquisition for the year |
| O2 | 3 | Does multi-copy attach? | $0 | ~9% of modelled AOV |
| O3 | 3 | Do occasion pages outconvert the homepage? | $0 | The SEO/landing-page split |
| N1 | 4 | Value-add offer vs no offer | margin | Cyber Week 2027 |
| N2 | 4 | Does the loop compound under peak traffic? | $0 | The 2027 acquisition plan |
| D1 | 5 | Digital add-on attach | $0 | A small AOV line |
| D2 | 5 | Digital rescue in the late window | $0 | Whether to sell past 11 Dec |
| D3 | 5 | Repeat purchase | $0 | The 15% repeat assumption |
| J1 | 6 | Saved-chart reactivation | $0 | Whether saved charts are an asset |
| J2 | 6 | Occasion reminders in a trough | $0 | Whether off-season demand is manufacturable |
| J3 | 6 | Self-purchase positioning | $0 | Whether this is gift-only |

**Total experimental cash across six months: $695.** Everything else is time.

---

## 13. Variance rules — what counts as off-plan

At 7–35 orders a month, monthly variance is enormous and mostly noise. Reacting to it is
the most likely way to wreck this plan.

| Deviation | Read as | Action |
|---|---|---|
| Within ±50% of the month's revenue target | **Noise** | Change nothing |
| 20–50% of target, one month | Weak signal | Investigate the funnel step, do not change strategy |
| <20% of target, one month | Signal | Diagnose against the six weekly numbers before acting |
| <50% of target, **two consecutive months** | **Real** | Formal review against `docs/12-failure-detection.md` |
| Any month where builder completion <15% | **Product, not marketing** | Stop all acquisition work. No channel fixes this. |
| Any month where M <1.05 | The loop is not real | Rebuild every budget on the $27 CAC ceiling |

**Two months are exempt from all of the above.** August (no revenue by design) and January
(seasonal trough by design). Judging either on revenue produces a wrong answer.

---

## 14. Where this plan is weakest — stated plainly

1. **The seasonality multipliers in §1.1 are invented.** They are an informed guess about
   how sentimental made-to-order gifts sell across a year, made without a single data
   point. If Q4 lift is 1.3× rather than 1.8–2.0×, months 4 and 5 miss by roughly half and
   the six-month total lands near $6,000 rather than $9,300 — which changes the January
   conversation from "expected trough" to "go/no-go".

2. **Nov + Dec are 70% of the six-month revenue ($6,470 of $9,294).** The plan is therefore
   a bet on two months, executed by one person, dependent on a print supplier whose Q4
   reliability is unverified and whose pricing is unverified. A single bad week in
   late November takes out roughly a quarter of the whole plan, and there is no
   diversification available at this scale.

3. **The conversion ramp — 0.60% → 0.80% → 1.00% → 1.05% — is asserted, not derived.**
   Some of the rise is real (occasion intent, accumulated trust, better product), but a
   material part is just an assumption that things improve. If conversion is flat at 0.60%
   all the way through, six-month revenue is roughly $6,400 and January is around $500.
   That variant should be modelled in the spreadsheet before it is discovered in November.

4. **"January must beat September" is the best test available and it is still weak.** It
   compares one 11-order month with one 7-order month. Four orders of difference is not
   statistical evidence of anything. It is used because it is the only structurally sound
   comparison available inside the window — but it should be held loosely, and February's
   number should carry more weight than January's.

5. **The plan assumes ~570 unpaid founder-hours are available and sustained**, including
   through a December in which the founder is also a customer-service department during
   their own holiday season. Nothing in this document accounts for illness, a job, or
   losing interest in month 4 — which is, empirically, the most common outcome for
   solo projects and is not modelled anywhere.

6. **Everything still rests on the Month 1 gate.** If <5 of 20 strangers type in five
   names, sections 5 through 13 are wasted paper. The gate costs $135 and three weeks.
   Run it before believing any other number in this file.
