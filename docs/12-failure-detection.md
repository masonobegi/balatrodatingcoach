# Phase 12 — Failure detection & kill criteria

**Kinline. The numbers at which this business gets changed, redirected, or stopped — written
down before the data arrives, so that the data gets to decide.**

---

## 0. How to read this document

Same three labels as everywhere else in this repo:

| Label | Meaning |
|---|---|
| `[FIXED]` | A price, a published fee, or a decision already made in Phases 0–9. |
| `[ASSUMPTION]` | A modelled number. Reasoned, stated, **wrong until measured**. |
| `[RULE OF THUMB]` | A category heuristic. Directionally useful, never load-bearing alone. |
| `[DERIVED]` | Arithmetic performed on numbers already in this repo. Check the maths; it is checkable. |

**Every threshold in this document is a threshold on a number that does not exist yet.** That is
the point. A kill criterion invented after you see the data is not a kill criterion, it is a
negotiation. These are written on 12 August 2026, before the first visitor, and committed to git so
that the timestamp is not a matter of memory.

### 0.1 The three verdicts

| Verdict | Means | Costs | Rule |
|---|---|---|---|
| **ITERATE** | The mechanism is roughly right and a specific, named, cheap change should move a specific, named number. | ≤ 1 week and ≤ $100 per iteration | **Maximum three iterations per failure mode.** Each must state its expected delta *before* it ships, and must be measured over a fresh sample. Three failed iterations on the same metric is not bad luck; it is the metric telling you something. |
| **PIVOT** | The core is wrong but adjacent demand is real and evidenced. | ≤ 3 weeks and ≤ $300 to test | Only permitted when there is *positive evidence* for the adjacent thing (see §12 for what counts). "Pivot" without evidence is just a slower kill. |
| **KILL** | Stop. Write it up. Close the repo. | Zero further spend | Requires that the criterion was pre-registered, its minimum sample was reached, and the review date has passed. |

### 0.2 The founder's stated intent, restated as a mechanism

You said you would rather abandon a bad idea after three weeks than rationalise it for six months.
Three weeks is the *right instinct* and the *wrong unit* for most of these metrics, because at
10–20 orders a month several of the numbers below are physically unreadable in three weeks. So the
mechanism is:

- **Three weeks is the maximum time any single failure mode may sit unexamined.** Every metric here
  has a review date no more than 21 days after the previous one.
- **Where a number cannot be read in three weeks, the three-week check is on the *leading* input,
  not the lagging outcome.** You cannot read repeat-purchase rate in November; you can read whether
  a single customer has come back for a second occasion, and you can read the share-link creation
  rate that predicts it.
- **The expensive failure is not "killed too early". It is "kept alive on a metric that was never
  going to be readable".** The dashboard in §11 is built to make that impossible.

### 0.3 Rules of evidence — read this before acting on any threshold below

**No threshold in this document may be actioned below its minimum sample.** A red number on n=12
is a mood, not a finding.

Binomial standard error at the sample sizes you will actually have `[DERIVED — standard binomial]`:

| n (builder starts) | 95% CI half-width at p ≈ 0.27 | What you can distinguish |
|---|---|---|
| 15 | ±22 pp | 10% from 70%. Nothing finer. (This is the 15-Names Test — `docs/09` §3.2.7 says the same.) |
| 50 | ±12 pp | Catastrophe from health |
| 100 | ±9 pp | 27% from 10% (yes), 27% from 20% (no) |
| 200 | ±6 pp | 27% from 15% |
| 400 | ±4 pp | 27% from 20% |

Practical consequence: **the completion-rate thresholds in §3 are set far apart on purpose.** They
are green ≥27%, fatal <10% — a gap that n=100 can resolve. Anything requiring you to distinguish 24%
from 27% is not a decision this business will ever have the traffic to make, and any plan that
depends on it is a bad plan.

Minimum samples, by metric:

| Metric | Minimum n before it may be actioned | Why |
|---|---|---|
| Builder start → chart complete | 100 starts | §0.3 table |
| Chart complete → order | 60 completed charts | Below this, one bad week dominates |
| Checkout start → payment | 30 checkout starts | Technical failures show up immediately; behavioural ones don't |
| Orders per chart (M) | 50 orders **or** 100 saved charts | `docs/08` §19 L3 |
| Share-link creation rate | 100 saved charts with gaps | |
| Blended CAC | 20 paid-attributed orders | Below this, CAC is noise ± the price of one order |
| Repeat purchase | 12 months, or don't quote it | Occasions are annual |
| Refund / damage rate | 40 shipped orders | |
| Qualitative themes | 40 substantive conversations | §10 |

---

## 1. The gate calendar

Day 1 = **Wed 12 Aug 2026** (from `docs/09` §1.1). Every review below is a calendar appointment, not
an intention. Put them in a calendar today with alarms.

| Gate | Day | Date | What is judged | Where defined |
|---|---|---|---|---|
| **G1 — the 15-Names Test** | 7 | Tue 18 Aug 2026 | Will a stranger type in the names at all? | `docs/09` §3.2.4 (thresholds pre-registered there) |
| **G2 — the pricing gate** | 14 | Tue 25 Aug 2026 | Real supplier COGS lands; catalogue is re-run or repriced | §7 below, `docs/09` §4.3 |
| **G3 — the 30-day review** | 30 | Thu 10 Sep 2026 | Leading indicators; has a stranger paid? | `docs/09` §9.2 |
| **G4 — first funnel read** | 60 | Sat 10 Oct 2026 | Builder completion on real traffic; free-channel signal | §3, §8 |
| **G5 — the 90-day revenue gate** | 90 | Mon 9 Nov 2026 | First honest revenue judgement — **with the Christmas caveat** | §2, §11 |
| **G6 — season execution** | 120 | Wed 9 Dec 2026 | Operations, refunds, margin on real orders | §7, §13 |
| **G7 — the trough** | 150 | Fri 8 Jan 2027 | What the business looks like with no occasion tailwind | §13 |
| **G8 — the verdict** | 180 | Sun 7 Feb 2027 *(review Mon 8 Feb)* | Continue / pivot / kill, on non-seasonal demand | §12, §14 |
| **G9 — February close** | ~200 | Mon 1 Mar 2027 | The honest month. `docs/08` §5.1. | §13 |

**G5 sits inside the Christmas lift, and this is a trap.** A green G5 proves almost nothing
(`docs/08` §5.1). A *red* G5 during the largest occasion of the year is, by contrast, extremely
informative — it is much stronger evidence than a red G8. Read G5 asymmetrically: it can kill, it
cannot exonerate.

---

## 2. The bar, restated so nobody inflates it

| Statement | Orders/mo | Revenue/mo | Source |
|---|---|---|---|
| "$1,000/month" as usually said | **~11** at $95 AOV | $1,000 | `docs/00` |
| Same, at the Base-case AOV | ~10 at $104.34 | $1,000 | `docs/03` §7.1 |
| **$1,000/month of gross profit** — the number that actually pays for anything | **~18** | **~$1,900** | `docs/03` §7.2 |

**Eleven orders a month. One order every three days.** This is a modest bar and it must be described
as a modest bar in every review. The reason for saying it at each gate is not modesty theatre — it
is that a modest bar failing is a *stronger* signal than an ambitious bar failing. If eleven orders
a month is out of reach after six months of work, that is information, not bad luck.

Gross profit per order, Base case, at modelled COGS: **$56.31** `[ASSUMPTION — docs/03 §6.4]`. Every
CAC number below is measured against that.

---

## 3. FAILURE MODE 2 (taken first, because it is the business) — people start the chart builder and abandon it

> **This is the assumption everything else rests on.** `docs/00`, `docs/02` §17, `docs/03` §13,
> `docs/08` §23, `docs/09` §0 all say the same sentence: *will a gift buyer type in 15 names?*
> Every other failure mode in this document is recoverable. This one, in its fatal form, is not.

### 3.1 Definitions — fix these before you measure anything

Three documents in this repo quote completion rates against three different definitions, and
comparing them without reconciling them will produce a confident wrong decision. The canonical
definitions, from here on:

| Symbol | Event | Definition | Not |
|---|---|---|---|
| **V** | `session_start` | Unique session on any non-`/c/*` page | Bots; share-link views (those are a separate funnel, §9) |
| **S** | `builder_started` | **First keystroke committed into a name field.** | A page load. A click on "Start". Instrumenting S as a page view will flatter you by 30–50% and is the single easiest way to lie to yourself. |
| **C5** | `chart_reached_5` | ≥5 slots typed (self + 2 parents + ≥2 grandparents) | Slots marked "unknown" |
| **C7** | `chart_reached_7` | 3 generations resolved: all 4 grandparent slots typed or explicitly unknown, ≥5 of 7 typed | — |
| **C8** | `chart_saved_saleable` | ≥8 people resolved **and** the chart saved | An unsaved session |
| **CO** | `checkout_started` | Stripe Checkout session created | Clicking "Order" |
| **O** | `order_paid` | Payment succeeded | |

Reconciliation of the existing priors, so the repo is internally consistent `[DERIVED]`:

| Step | Prior | Source | Note |
|---|---|---|---|
| V → S | 22% | `docs/03` §8.2 Base | `docs/08` §1.4 says 25–40% for landing→start; 22% is the more conservative and is used here |
| S → C5 | 55% | `docs/08` §1.4 (45–65%) | |
| C5 → C8 | ~49% | — | The implied bridge |
| **S → C8** | **27%** | `docs/03` §8.2 Base | 0.55 × 0.49 = 0.27 ✓ the two documents agree once the definitions are separated |
| C8 → O | 20% | `docs/03` §8.2 | |

`docs/09` §9.2 row 5 ("≥50% green") is a **C5** threshold, not a C8 threshold. They are not
comparable. This document supersedes that row's ambiguity.

### 3.2 Why the threshold is what it is — the traffic translation

A completion rate is not intuitively good or bad. What makes it fatal is what it does to the
**traffic requirement**, and traffic is already the most strained assumption in the plan
(`docs/03` §10.2: the Base case needs *120 organic visitors/day by month 6*).

Holding V→S at 22% and C8→O at 20% `[ASSUMPTION]`, flexing S→C8 `[DERIVED]`:

| S → C8 | Visitor → order | Visitors/mo for **$1k revenue** (10 orders) | /day | Visitors/mo for **$1k gross profit** (18 orders) | /day |
|---|---|---|---|---|---|
| 40% | 1.76% | 544 | 18 | 1,023 | 34 |
| 33% (Strong) | 1.45% | 660 | 22 | 1,240 | 41 |
| **27% (Base)** | **1.19%** | **806** | **27** | **1,515** | **50** |
| 20% (Conservative) | 0.88% | 1,089 | 36 | 2,045 | 68 |
| 15% | 0.66% | 1,452 | 48 | 2,727 | 91 |
| **10%** | **0.44%** | **2,177** | **73** | **4,091** | **136** |
| 5% | 0.22% | 4,355 | 145 | 8,182 | 273 |

**Read the bottom rows against the plan's own traffic ambition.** At S→C8 = 10%, reaching $1,000 of
*gross profit* per month requires 136 organic visitors/day — which is the number `docs/03` §10.2
already flags as the load-bearing claim of the entire Base case, now required just to clear a modest
bar. At 5% it requires 273/day. **There is no marketing plan in `docs/07` or `docs/08` that produces
273 organic visitors/day.** That is why 10% is the fatal line and not an arbitrary one.

### 3.3 The thresholds

| Metric | Green (ITERATE on other things) | Amber (ITERATE here, urgently) | Red (PIVOT candidate) | **Fatal (KILL)** | Min n | Review |
|---|---|---|---|---|---|---|
| **S → C5** | ≥50% | 30–50% | 20–30% | **<20%** | 100 starts | G4 (10 Oct), then every 3 weeks |
| **S → C8** | ≥27% | 15–27% | 10–15% | **<10%** | 100 starts | G4, then every 3 weeks |
| **S → C7** (if the 7-name product is adopted) | ≥45% | 30–45% | 20–30% | **<20%** | 100 starts | as above |
| Median slots typed **by quitters** | ≥7 | 5–6 | 4 | **≤3** | 50 quits | G4 |
| Median time to C7 | ≤6 min | 6–12 min | 12–18 min | >18 min | 40 completions | G4 |
| Mobile S → C8 (read separately) | ≥20% | 12–20% | 8–12% | **<8%** | 80 mobile starts | G4 |

**Fatal is not a single red reading.** Fatal = below the fatal line, at or above minimum n, **after
the full remediation ladder in §3.5 has been run**. That is the only ceremony this criterion gets.
It is also the only ceremony it needs.

### 3.4 The diagnostic that decides ITERATE vs KILL

The single most important number in this document is not the completion rate. It is **where the
quitters stop**, because it separates two failures that look identical on a dashboard and have
opposite prescriptions.

| Where they stop | Diagnosis | Verdict | Action |
|---|---|---|---|
| Page loaded, **zero keystrokes** | Not a builder failure at all. The landing promise, the mobile load, or the traffic quality is wrong. | Not F2. Goes to §5/§8. | Fix the page or the channel. Do **not** touch the builder. |
| Quit at 1–3 slots (self, parents) | **Willingness failure.** She knows these names perfectly well. She stopped because she does not want to do this. | **KILL candidate** | This is the fatal pattern. No UX change fixes "I don't want to". One entry-speed iteration, then stop. |
| Quit at 4–7 slots (mid-grandparents) | Mixed: partly knowledge, partly friction | ITERATE | Entry speed first (§3.5 R1), then the 7-name default (R2) |
| Quit at exactly 7 (grandparents resolved, gen-4 empty) | **The knowledge wall.** This is the outcome the business was *designed for*. It validates the share loop; it does not invalidate the product. | **ITERATE — and this is good news** | Ship the 7-name default product + share-to-ask as P0. `docs/09` §3.2.5. |
| Quit mid gen-4 | Knowledge wall, softer | ITERATE | Share loop; "mark unknown" affordance must be one tap |
| Reached C8 but never saved | Email gate friction, or she doesn't understand that saving preserves work | ITERATE | Save without email; capture email at share or checkout instead |

> **State it plainly: knowledge-wall abandonment is a product spec, not a failure. Willingness
> abandonment is the end of the business.** The metric that separates them is *median slots typed by
> quitters*: ≥7 means she tried and ran out of family; ≤3 means she tried it on and put it down.

### 3.5 The remediation ladder — three iterations, then a verdict

Each rung ships in ≤1 week, is measured over **≥100 fresh starts**, and must produce its stated
minimum delta. A rung that produces less than its minimum delta is complete and does not get a
second attempt.

| # | Iteration | Cost | Expected delta `[ASSUMPTION]` | Minimum acceptable delta | If it fails |
|---|---|---|---|---|---|
| **R1** | **Entry speed.** Keyboard-first flow (Tab/Enter never touches the mouse), surname autocomplete from names already entered, one-tap "same surname as father", autosave every field, no account required. | ~12 h dev | +8–15 pp on S→C5 | **+5 pp** | Speed is not the constraint. Go to R2 and stop optimising the form. |
| **R2** | **Reduce the ask.** Default product becomes the **7-name, 3-generation chart**; generation 4 becomes an explicit optional extension. Reprice the 12×18 around it. (`docs/09` §3.2.5 already sanctions this.) | ~16 h dev + copy | S→C7 lands ≥15 pp above the old S→C8 | **+10 pp vs S→C8** | The burden was never the problem. Go to R3. |
| **R3** | **Remove the typing.** One of: (a) upload a photo of a handwritten list, we transcribe; (b) paste from an email/notes app; (c) GEDCOM (already built, historian segment only); (d) a "we'll type it for you" concierge offer at checkout. | ~20 h, or $0 for (d) done by hand | +10 pp, or ≥5 concierge orders | **+5 pp or 5 concierge orders in 3 weeks** | The data entry is not recoverable as a self-serve product. |

**After R3:**

| State after R3 | Verdict |
|---|---|
| S→C8 (or S→C7) back into amber or green | **CONTINUE.** Re-baseline the funnel and move on to §5. |
| Still red (10–15%) **but** quitter-median ≥7 and share-link creation ≥25% | **ITERATE once more, on the loop, not the builder** — the crowd is doing the data entry. See §9 and pivot P-B. |
| Still red **and** quitter-median ≤3 | **KILL or pivot to P-A (concierge).** The willingness assumption failed. |
| Fatal (<10%) at n≥300 cumulative starts | **KILL.** Write it up per §15. |

### 3.6 The cheap version of this test, available before any of it

G1 (Day 7, `docs/09` §3.2) costs ~$50 and answers the 10%-versus-70% question three weeks before any
real traffic exists. **A FAIL at G1 is a kill at Day 7 for ~$400 total.** The single most valuable
thing in this entire repo is that this test happens before the checkout gets built.

---

## 4. Failure mode 1 — traffic exists but nobody buys

| Metric | Green | Amber | Red | Fatal | Min n | Review |
|---|---|---|---|---|---|---|
| Visitor → order (all non-share traffic) | ≥1.2% | 0.5–1.2% | 0.2–0.5% | **<0.2%** sustained | 1,500 visitors | G4, G5, G8 |
| Visitor → S (builder start) | ≥22% | 12–22% | 6–12% | **<6%** | 500 visitors | G4 |
| Orders from **strangers** (not friends, family, or people you DM'd) | ≥60% of orders | 30–60% | 10–30% | **0 by G5** | 20 orders | G5 |

**Decomposition rule: never diagnose "nobody buys" at the top level.** Multiply out V→S, S→C8, C8→O
and find which one is below prior. Only one of them can be the problem, and each has a different
owner:

| Weak step | It is not a demand problem, it is a… | Section |
|---|---|---|
| V → S low | traffic-quality or landing-page problem | §8 |
| S → C8 low | product problem | §3 |
| C8 → O low | price / trust / timing problem | §5 |

**Fatal case:** 1,500+ visitors, V→S green, S→C8 green, C8→O red, after both remediation rounds in
§5. That is people happily using a free toy and declining to buy the object. `docs/09` §9.3 calls it
"the most dangerous outcome, because it looks like traction". It is the outcome most likely to
consume six months, because the engagement metrics stay warm the whole time.

**Prescribed action at G5 if this pattern holds:** stop all feature work, interview 10 completers who
did not buy (script: `docs/08` §3.5), and run the §5.4 price probe. If the probe does not move it,
KILL — the toy is not the product and the product does not sell.

---

## 5. Failure mode 3 — people complete a chart but don't check out

| Metric | Green | Amber | Red | Fatal | Min n | Review |
|---|---|---|---|---|---|---|
| C8 → CO (checkout started) | ≥20% | 8–20% | 4–8% | **<4%** | 60 charts | G4, G5 |
| CO → O (payment completed) | ≥55% `[RULE OF THUMB]` | 40–55% | 25–40% | **<25%** | 30 checkouts | Weekly |
| C8 → O within 30 days | ≥12% | 6–12% | 3–6% | **<3%** | 60 charts | G5, G8 |
| Saved-chart reactivation (occasion email) | ≥6% | 3–6% | 1–3% | **<1%** | 150 sends | G6 |

**CO → O below 40% is almost always a bug, not a behaviour.** Shipping is free and included in the
price (`docs/03` §1.2), so the single largest cause of standard checkout abandonment does not exist
here. Check, in this order: Stripe Checkout on mobile Safari, the tax line appearing as a surprise,
the delivery-date estimate, and whether the preview image survives into checkout. Fix within 48
hours; this is never a strategy question.

**C8 → CO is the behaviour question.** Four candidate causes, and they are distinguishable:

| Cause | Signal | Iteration | Cap |
|---|---|---|---|
| **Price shock** | Price first seen late; drop concentrated at the size-selection step | Show the price band on the landing page and above the builder from the first screen. Never discount sitewide (`docs/08` §22). | 1 wk |
| **Trust** | Long dwell on FAQ / shipping / returns pages; "is this legit" searches in GSC | Real photographs of prints in real homes, 3 named testimonials, reprint guarantee stated at checkout, physical address, a face | 1 wk |
| **Timing** | She saves, doesn't buy, and the occasion is 6–14 weeks out | This is not a failure. Save + occasion reminder is the correct mechanism. Measure the 30-day and 60-day windows separately. | — |
| **The object underwhelms at print size** | High builder engagement, low preview-to-checkout, complaints about crowding/legibility | Print-accurate preview at 100%, a "how it looks on a wall" scale render, better typography on the long-surname cases | 2 wks |

### 5.4 The price probe — the only sanctioned price test

Do **not** run a sitewide discount (`docs/08` §22, `docs/02` §11.3 — it funds itself out of the
reprint margin and signals the gift is cheap). The sanctioned probe:

1. Ask the 10 non-buyer interviewees the price question *last*, and ask what they expected to pay
   before you say a number.
2. Test an **entry-only** change: a 12×18 at $39 for two weeks, in one channel, unframed only. This
   costs $10 of margin per order (`docs/03` §3: GP falls $28.12 → ~$18.5) and answers whether $49
   was the wall.
3. If C8→O does not move by ≥50% relative at $39, **price is not the problem** and no further price
   testing is permitted. Restore $49 and go to trust or object quality.

**Fatal:** C8→O <3% over ≥150 completed charts, after the trust iteration and after the price probe.
Verdict: the object is not wanted at any price that supports a business. **KILL.**

---

## 6. Failure mode 4 — CAC structurally above break-even

Break-even CAC = contribution per acquired **chart**, not per order, because one chart can produce
several orders (`docs/08` §1.2). At the modelled GP/order of $56.31 `[ASSUMPTION]`:

| M (orders per chart) | Contribution per acquired chart | Break-even CAC | Target CAC (50%) | Kill CAC (sustained) |
|---|---|---|---|---|
| 1.0 (no loop) | $56 | $56 | **$28** | >$56 |
| 1.25 | $70 | $70 | **$35** | >$70 |
| 1.6 (planning case) | $90 | $90 | **$45** | >$90 |
| 2.2 (strong loop) | $124 | $124 | **$62** | >$124 |

**Until M is measured (min n = 50 orders), you must budget at M = 1.0 and a $28 target CAC.** Using
the planning case before it is measured is how ad budgets get spent against a multiplier that turns
out to be 1.05.

| Metric | Green | Amber | Red | Fatal | Min n | Review |
|---|---|---|---|---|---|---|
| Meta blended CPA (test) | ≤$45 | $45–70 | $70–85 | **>$85 at end of Stage 2** | `docs/08` §13.4 | Weekly during test |
| Blended CAC (all spend ÷ all orders) | ≤$28 | $28–56 | $56–90 | **>contribution/chart, 2 consecutive months** | 20 paid orders | Monthly |
| Share of orders that require paid | ≤30% | 30–50% | 50–70% | **>70% at G8** | 30 orders | G5, G8 |

**The hard caps are already set and are not negotiable:** Meta $560 total (`docs/08` §13.4), Google
$500, influencer gifting $650, total cash at risk across all channels ~$2,360 (`docs/08` §19).
"Extend the cap because it's nearly working" is explicitly forbidden (`docs/08` §22) and is the most
common way this specific failure mode becomes a six-month failure mode.

> ### The structural kill, and it is the deepest one in this document
>
> Paid acquisition being unaffordable is **survivable** — `docs/03` §9.4 already assumes it, and the
> whole plan is built on free channels. Free channels producing nothing is **survivable** if paid
> works. **Both at once is terminal**, because there is then no route by which a stranger arrives at
> the site.
>
> **Fatal combination, checked at G8 (8 Feb 2027):** non-paid, non-personal-network sessions
> <500/month (§8) **AND** blended CAC > contribution per chart at n≥20 paid orders. If both are
> true, **KILL or pivot to P-C (B2B)** — where acquisition is a relationship rather than an auction.
> No amount of product work changes this pair.

---

## 7. Failure mode 5 — gross margin insufficient once real supplier pricing lands

This is the **only** failure mode that can be resolved for free, in thirty minutes, before anything
else — and it has not been done. Every COGS figure in this repo is modelled (`docs/00`, `docs/03`
§0). Sample orders go out **Day 1** and the gate is **G2, Day 14**.

### 7.1 Unframed — the floor

18×24 unframed at $79. GP = $75.70 − 1.04 × (landed COGS) `[DERIVED from docs/03 §3]`.

| Verified landed COGS, 18×24 UF | GP | GM% | Verdict | Action |
|---|---|---|---|---|
| ≤$27 (modelled) | $47.62 | 60.3% | On plan | Proceed |
| $28–34 | $40–46 | 51–58% | Acceptable | Proceed; trim the 12×18 or raise it to $55 |
| $35–41 | $33–39 | 42–50% | **Amber** | Reprice ladder up one step ($59/$89/$129) and re-test conversion |
| $42–48 | $26–32 | 33–41% | **Red** | Only the 24×36 remains viable. Consider a two-SKU catalogue. |
| >$48 | <$26 | <33% | **Fatal** | See below |

**Why >$48 is fatal rather than just a repricing:** to hold a 55% gross margin at a $40 landed cost,
the 18×24 must be priced at **~$102** `[DERIVED]`. That is above the framed price point the
catalogue currently anchors on and outside the impulse-gift band the entire positioning assumes. At
that point Kinline is not a $79 gift, and the buyer described in `docs/00` is not the buyer.
**Verdict: KILL, or pivot to P-A (concierge) where a $179 price is justified by labour rather than
by paper.**

Before declaring fatal, one iteration is permitted and required: **quote a third supplier** (a
second POD with fine-art capability, or a local giclée printer with trade pricing). One supplier's
price list is not the market.

### 7.2 Framed — the cliff

From `docs/03` §5: break-even on the flat +$50 framing uplift sits at **Δ = $41–45** depending on the
damage reserve. Δ is the incremental delivered cost of framing.

| Verified Δ at 18×24 | Verdict | Action | Review |
|---|---|---|---|
| <$30 | Framing is a real profit lever | Keep flat +$50, push it | G2 |
| $30–40 | Conversion lever, marginal profit | Keep; stop calling it an AOV strategy; move to tiered +$40/+$55/+$75 | G2 |
| $41–48 | Earns approximately nothing | **Tiered uplift mandatory.** Drop framed 24×36. | G2 |
| >$48 | Destroys profit | **Cut framing entirely.** Ship a "frame it yourself — here are the exact dimensions" card. | G2 |

Cutting framing costs $0.64 of GP per order and gains 6.6 margin points (`docs/03` §6.5). **It is not
a business kill under any value of Δ.** Do not let a bad framing quote read as a bad business.

### 7.3 Margin failure discovered *after* launch

| Metric | Green | Amber | Red | Fatal | Review |
|---|---|---|---|---|---|
| Realised GM% on shipped orders | ≥52% | 45–52% | 38–45% | **<38% for 2 months** | Monthly from G4 |
| Reprint + refund rate (unframed) | ≤4% | 4–8% | 8–12% | **>12%** | G6 |
| Reprint + refund rate (framed) | ≤12% | 12–18% | 18–25% | **>25%** | G6 |
| Supplier defect rate (your own inspection) | ≤3% | 3–8% | 8–15% | **>15%** | G6 |

A >15% supplier defect rate is a **supplier** kill, not a business kill — switch, then re-measure.
A >12% unframed refund rate after a supplier switch is a **product** kill: the object does not
survive contact with the customer's expectations.

---

## 8. Failure mode 6 — organic/social content gets no traction

Pinterest is load-bearing and unproven; `docs/08` §23 names it the biggest structural risk in the
acquisition plan. SEO is explicitly *not* in the first-year revenue number (`docs/07` §1.1) and must
never be killed for failing to produce revenue it was never expected to produce.

| Channel | Metric | Green | Amber | Red / action | Review |
|---|---|---|---|---|---|
| **Pinterest** | Outbound clicks/mo by week 8 | ≥400 | 150–400 | **<100 → maintenance mode**, 30 min/wk, no new production (`docs/08` §19 P1) | Week 8 (Oct), G5 |
| **Pinterest** | Clicks → builder start | ≥20% | 10–20% | <10% → the pins are attracting browsers; change the pin promise, not the volume | G5 |
| **Short-form video** | 1 video >20k views + 150 clicks in 25 h of production | hit | — | miss → **stop**; make video only as ad creative (`docs/08` §19 S1) | G5 |
| **Facebook groups** | Inbound enquiries per 12 h invested | ≥10 | 4–10 | <4 → cut to 4 groups, 2 h/wk | G5 |
| **Societies** | Acceptances per 20 outreach emails | ≥10 | 4–10 | <3 → rewrite once, then drop the channel | G5 |
| **SEO** | Non-brand queries in top 30 at month 4 | ≥3 | 1–2 | 0 → stop publishing, improve the 8 pages that exist (`docs/07` §10) | Dec 2026 |
| **SEO** | Query *intent* mix at month 6 | majority purchase-intent | — | majority free-template/research → deindex or rewrite the offenders | Feb 2027 |
| **All free channels combined** | Non-paid, non-personal-network sessions/mo | ≥1,500 | 500–1,500 | **<500 at G8 → see §6 structural kill** | G5, G8 |

**Do not kill a content channel for being slow.** Pinterest pins take 4–8 weeks `[RULE OF THUMB]`;
seasonal SEO pages perform in their second season (`docs/07` §1.2). Kill them for being *flat over
their own stated lead time*, which is what the review dates above encode.

**The honest failure here is time, not traffic.** `docs/08` §23.5 already concedes the channel plan
is not credible for one person. If at any 3-week check you have logged <10 hours/week against a plan
that assumes 25, the correct action is to **cut channels to Pinterest + societies + the loop** —
not to run five channels badly and conclude that none of them works.

---

## 9. Failure mode 7 — the share-link loop doesn't fire

The loop is the only mechanic that gets cheaper as it grows and the only thing that lifts the CAC
ceiling (`docs/00`, `docs/08` §2). It is also unmeasurable at low volume: **M needs 50 orders or 100
saved charts before it means anything.**

| Step | Metric | Green | Amber | Red | Action on red | Min n |
|---|---|---|---|---|---|---|
| 1 | Saved charts with ≥1 gap | 55–70% | 40–55% | <40% | Either the builder stops too early or people are inventing data. Check gen-4. | 60 charts |
| 2 | Share links created / gapped chart | ≥35% | 15–35% | **<15%** | Prompt is invisible or badly worded. Run L1 copy test (`docs/08` §2.5), then move placement. Two attempts only. | 100 charts |
| 3 | Unique openers per link | 2.5–4 | 1.5–2.5 | **<1.5** | She's forwarding 1:1, not to a family thread. Add group-chat affordances, WhatsApp/iMessage share sheet. | 50 links |
| 4 | Openers contributing a name | 15–25% | 8–15% | <8% | Contribution UX too heavy. Must be one tap, no account, no email. | 100 openers |
| 5 | Openers starting their **own** chart | 8–15% | 4–8% | **<4%** | Rebuild the share page once. Still <4% → loop is a **copy-sales** mechanic only; delete the acquisition claim from every forecast. | 200 openers |
| 6 | Openers ordering a copy | 3–6% | 1.5–3% | <1.5% | The order CTA is buried under the contribute CTA, or the price isn't visible on the share page | 200 openers |
| 7 | **M — orders per chart** | ≥1.5 | 1.15–1.5 | **≤1.1** | Rewrite `docs/08` §1.2, halve all paid budgets, reset target CAC to $28 | 50 orders |

**A dead loop is a forecast kill, not a business kill.** At M = 1.0 the business still works if free
traffic works — it just works at a $28 CAC ceiling, which means it is an organic business forever.
Say that out loud rather than quietly keeping the M = 1.6 budgets.

**Escalation to business kill:** M ≤ 1.1 **and** share-link creation <15% after both copy and
placement iterations **and** free sessions <500/mo (§8). At that point there is no loop, no free
traffic, and (per §6) no affordable paid — go to §14.

**Share-link visitors are a separate funnel and must never be averaged into site-wide conversion**
(`docs/03` §8.3). Doing so inflates cold-traffic performance and hides the only thing that works.
Expected share-visitor conversion is 4–14% `[ASSUMPTION]` versus ~1.2% cold. If shared-link
conversion is **not** at least 2× cold conversion at n≥100 share visitors, the share page design is
wrong — that is the highest-leverage page in the business (`docs/08` §2.4).

---

## 10. Failure mode 8 — customers buy but never return; and failure mode 9 — feedback reveals a fundamental problem

### 10.1 Repeat purchase — mostly not a 6-month metric

`docs/03` §9.5 assumes 15% repeat within 12 months. Occasions are annual; you cannot read this before
August 2027. Anyone quoting a repeat rate in November 2026 is quoting noise.

The readable proxies:

| Proxy | Green | Amber | Red | Review |
|---|---|---|---|---|
| Multi-copy orders (2nd+ copy of same chart) | ≥20% of orders | 8–20% | **<8% → halve paid budgets** (`docs/08` §19 L3) | G5, G8 |
| Occasion reactivation email → order | ≥6% | 2–6% | <2% → saved charts are a vanity asset; stop counting them as pipeline | G6 |
| Second chart from the same customer (the other side of the family) | ≥8% within 90 days | 3–8% | <3% | G8 |
| NPS-ish: "would you buy another for someone else?" asked in the post-delivery email | ≥50% yes | 25–50% | <25% | G6 |

**Verdict if repeat is genuinely dead (M12, repeat <5% AND M <1.15):** this is not a kill, it is a
reclassification. The business is a **pure acquisition treadmill with a hard CAC ceiling of $56 and
no free traffic subsidy from either loyalty or the loop**. Every month starts at zero. That is a
legitimate small business and an illegitimate growth business. Decide, explicitly and in writing,
whether you want to run it on those terms — and price your own hours into that decision, because
`docs/03` §7.3's "$300/hour of founder time" figure assumes acquisition is free.

### 10.2 Qualitative failure — when the feedback says you built the wrong thing

Numbers tell you *that* something failed; conversations tell you *what to build instead*. This is the
failure mode most likely to be missed, because it never turns a dashboard red.

**Mechanism:** every substantive conversation — support email, interview, DM, group reply, checkout
free-text "how did you hear about us", refund reason — gets tagged with exactly one primary theme in
a Postgres table. Ten seconds per message. Review the tag distribution at every gate.

| Theme | What they're saying | Threshold | Verdict if it clears the threshold |
|---|---|---|---|
| **A. Wants the object, blocked by data entry** | "I'd love this but I don't know my great-grandparents" | ≥30% of 40 | Confirms the knowledge wall → 7-name product + share loop. **Good news.** |
| **B. Wants research done** | "Can you find my ancestors?" / "I don't know where to start" | ≥30% of 40 | **The market wants a different business.** See below. |
| **C. Wants a different artefact** | "Do you do photo trees / a book / a canvas / just my grandparents' names in nice type?" | ≥30% of 40 | Pivot candidate — if it is renderable by the existing engine, test it in 2 weeks (§12) |
| **D. Price** | "Beautiful, too expensive" | ≥30% of 40 | Run the §5.4 probe. Do not assume they're right; stated price sensitivity is unreliable `[RULE OF THUMB]` |
| **E. Trust / timing** | "Will it arrive by the 20th?" / "Never heard of you" | ≥30% of 40 | Operational and trust fixes; not a strategy signal |

> **On theme B — "people want research help, not a print" — the answer is NO, and the reasoning
> must be written down now so it isn't relitigated at 11pm in December.**
>
> Genealogical research is **unbounded labour** (one difficult surname can absorb ten hours), has
> **no software leverage** (the searching is the product, and Ancestry owns the records), and puts
> you in direct competition with subscription incumbents holding the data. A print takes bounded,
> predictable work. A research request does not, and you cannot price it without either underpricing
> your time or quoting a number nobody pays.
>
> **The one adjacent thing that IS permitted is bounded typing, not unbounded searching:** she sends
> the names she already has, in whatever form, and we enter them. That is pivot P-A. The boundary
> between "I'll type your 15 names" (10 minutes, fixed) and "I'll find your 15 names" (unbounded) is
> the boundary between a business and a trap. Never cross it, including for one nice customer.

**If theme B clears 30% and P-A does not sell (§12): KILL.** The demand that exists is for a
business you have correctly decided not to build.

---

## 11. The dashboard of doom

One table. Checked every **Monday morning**, takes 10 minutes, comes from self-hosted analytics in
Postgres (`docs/00`). If a metric is not here, it does not go on the dashboard (`docs/08` §21.1).

| # | Metric | Source | 🟢 Green | 🟡 Amber | 🔴 Red | Consecutive reds → action |
|---|---|---|---|---|---|---|
| 1 | Builder starts (S) this week | events | ≥60 | 20–60 | <20 | 3 → traffic problem, go to §8 |
| 2 | **S → C8 %** | events | ≥27% | 15–27% | <15% | 2 (at n≥100 cum.) → open §3.5 ladder |
| 3 | **Median slots typed by quitters** | events | ≥7 | 5–6 | ≤4 | 2 → §3.4 diagnostic; ≤3 is the kill pattern |
| 4 | Charts saved | events | ≥15 | 5–15 | <5 | 3 → §3 |
| 5 | Share links / gapped chart | events | ≥35% | 15–35% | <15% | 3 (n≥100) → §9 step 2 |
| 6 | Share-link openers per link | events | ≥2.5 | 1.5–2.5 | <1.5 | 3 → §9 step 3 |
| 7 | C8 → CO % | events | ≥20% | 8–20% | <8% | 3 (n≥60) → §5 |
| 8 | CO → O % | Stripe | ≥55% | 40–55% | <40% | **1 → treat as a bug, fix in 48 h** |
| 9 | Orders | Stripe | ≥3 | 1–2 | 0 | 4 → §4 |
| 10 | **M (orders per chart, trailing 90 d)** | derived | ≥1.5 | 1.15–1.5 | ≤1.1 | read monthly, n≥50 orders |
| 11 | Blended CAC (all spend ÷ orders) | ledger | ≤$28 | $28–56 | >$56 | 8 weeks → all paid off |
| 12 | Realised GM% on shipped orders | ledger | ≥52% | 45–52% | <45% | 4 → §7.3 |
| 13 | Free sessions (non-paid, non-network) | analytics | ≥350/wk | 120–350 | <120 | 6 → §8, then §6 structural kill |
| 14 | Refund + reprint rate | ledger | ≤5% | 5–10% | >10% | 3 → supplier switch |
| 15 | Founder hours worked | your own log | ≥20 | 10–20 | <10 | 3 → **re-plan the calendar honestly** (§13.3) |

**Rules for the dashboard:**

1. **A red cell with n below its §0.3 minimum is coloured grey, not red.** Grey means "cannot be
   read yet", and grey cells may not be argued about.
2. **Row 3 is the row that decides the business.** If you only look at one cell, look at that one.
3. **Nothing is added to this table without removing something.** Fifteen rows is already at the
   limit of what gets checked weekly.
4. **Write the numbers down each week even when nothing changes.** The trend is the product; a single
   week is noise at this volume.

---

## 12. The decision tree

Run top to bottom at every gate. Stop at the first line that matches.

```
START — is the 15-Names gate (G1) passed?
│
├─ FAIL, and 7-name fallback also failed .............................. KILL  [Day 7, ~$400 spent]
├─ FAIL, 7-name fallback passed ......................... ITERATE → ship 7-name product
└─ PASS / AMBIGUOUS ↓
   │
   Is verified COGS inside the band? (G2, Day 14)
   ├─ 18×24 UF landed > $48 and no third supplier is cheaper ......... KILL or PIVOT P-A
   ├─ Framing Δ > $48 ..................................... ITERATE → cut framing, continue
   └─ Otherwise ↓
      │
      Is there traffic at all? (≥400 sessions/mo by G4)
      ├─ NO ............................. §8 channel triage; not yet a business verdict
      └─ YES ↓
         │
         S → C8 at n ≥ 100?
         ├─ < 10% (fatal) ↓
         │   └─ median slots typed by quitters ≤ 3? ..................... KILL
         │      else (≥7 — knowledge wall) ......... ITERATE R2 (7-name) then re-enter tree
         ├─ 10–27% ......................... ITERATE ladder §3.5 (R1→R2→R3, 3 weeks max)
         │   └─ still <15% after R3 ......................... PIVOT P-A or P-B
         └─ ≥ 27% ↓
            │
            C8 → O at n ≥ 60?
            ├─ < 3% after trust iteration AND price probe ................ KILL
            ├─ 3–12% ................................. ITERATE §5 (trust, then object)
            └─ ≥ 12% ↓
               │
               Where do the orders come from?
               ├─ Free traffic ≥ 500 sessions/mo ................ CONTINUE — scale §8
               ├─ Free < 500/mo AND blended CAC ≤ contribution/chart ... CONTINUE (paid works,
               │                                                          rare — verify M first)
               └─ Free < 500/mo AND CAC > contribution/chart ....... KILL or PIVOT P-C
                                                                     [the structural kill, §6]
```

Overlay, applied at G5 and G8 regardless of where the tree lands:

| Overlay check | If true |
|---|---|
| It is December and the numbers are green | **Discount the result.** Christmas proves the occasion, not the business (`docs/08` §5.1). The verdict is G8/G9, in February. |
| It is January and the numbers are red | **Do not kill on a trough month alone.** Compare to December, not to the plan. Kill on February. |
| A theme in §10.2 clears 30% | Read that row's verdict *before* reading the tree. Qualitative overrides. |
| Founder hours <10/wk for 3 weeks | The plan, not the business, is failing. Re-plan (§13.3) before any kill decision. |

---

## 13. What a PIVOT looks like — and what does not count as one

### 13.0 The test a pivot must pass

A change only counts as a pivot (rather than a new business wearing this one's clothes) if it:

1. **reuses ≥60% of the existing codebase** — the chart renderer, the print pipeline, Stripe
   Checkout, the share page;
2. **keeps either the same buyer or the same artefact, never neither**; and
3. **is testable for ≤$300 in ≤3 weeks**, with its own pre-registered kill criterion.

Three candidates pass. Several obvious ideas do not, and §13.4 says why.

### 13.1 P-A — Kinline Concierge ("send us what you've got, we'll build it")

| | |
|---|---|
| **Trigger** | §3 fatal on *willingness* (quitter median ≤3), or §7.1 fatal on unframed COGS, or §10.2 theme B ≥30% |
| **What it is** | She photographs a handwritten list, forwards an email, sends a voice note, or does a 10-minute call. You type the names in. She approves a preview. It prints. |
| **Reuses** | Renderer, print pipeline, checkout, share page, all photography and positioning. ~85% of the codebase. |
| **Invalidates** | "Built in the browser in five minutes." The software-leverage story. Scalability. |
| **Price** | $149 / $179 / $229 by size, framed +$60 `[ASSUMPTION]` |
| **Economics** `[DERIVED]` | $179 with $27 landed COGS + $7 fees + $1 reserve ≈ **$144 contribution**, minus ~25 min of your labour. At a notional $40/hr that's $17 → **~$127/order**. Eight orders/month = $1,000+ and ~3.5 hours of work. |
| **Ceiling** | Your hours. ~40 orders/month is a full week of typing. This does not become a big business without re-solving the automation problem you just failed at. |
| **Test** | 3 weeks, $0 in software. Offer it at checkout and to the 10 non-buyer interviewees. Fulfil by hand in a spreadsheet. |
| **Kill criterion for the pivot** | <8 paid concierge orders at full price in 6 weeks → KILL the whole thing. |
| **Honest warning** | This is the Etsy model the brief describes as "their labour is our software", run in reverse. It is defensible **only as a time-boxed stepping stone**: sell it manually, watch which 3 things you do every time, automate those, and re-attempt self-serve within 6 months. If after 6 months you are still typing, you have bought yourself a job, and it is a job that pays ~$40/hr with no equity value. Put that date in the calendar at the moment you start. |

### 13.2 P-B — The reunion / family-event kit (one chart, many copies, one buyer with a budget)

| | |
|---|---|
| **Trigger** | §3 red-but-not-fatal *and* share-page contribution rate ≥25%, or M ≥2 on the few orders that exist, or Facebook reunion groups outperforming genealogy groups ≥2× (`docs/08` §19 F4) |
| **What it is** | A reunion organiser (or the family of an 80th-birthday honoree, or a memorial service) commissions one chart and orders 10–40 copies — plus place cards, an A5 handout, a name-badge sheet generated from the same data. The share link becomes the *collection* mechanism: every attendee fills in their own branch. |
| **Why it is strong** | It **converts the fatal data-entry problem into a crowd task**. No single person types 40 names; 12 relatives type 4 each. And it is the one configuration where the multi-copy ladder — already the best AOV lever and margin-*accretive* (`docs/03` §11.1) — is the whole product rather than an upsell. |
| **Reuses** | Renderer, share page, multi-copy pricing, print pipeline. New: bulk quoting, one-to-many shipping, a simple organiser view. ~70% reuse. |
| **Economics** `[ASSUMPTION]` | 20 × 12×18 at $25/copy = $500 revenue; COGS 20 × $10 + ~$30 consolidated shipping = $230; fees ~$16 → **~$254 contribution per event**. Four events/month clears $1,000 of revenue and ~$1,000 of GP. |
| **Buyer & channel** | Reunion organisers, findable in the Facebook reunion groups already in `docs/08` §9 and via genealogical societies (§12) — both channels already scoped, both free. |
| **Risks** | Long lead times (reunions are planned 6–12 months ahead — the pipeline is slow to start and then predictable); heavy seasonality (summer, not Christmas — which is actually a *hedge* against the Christmas concentration); one-shot buyers with near-zero repeat. |
| **Test** | 3 weeks, ≤$150. Post an offer in 6 reunion groups, email 20 societies, quote 5 events by hand. |
| **Kill criterion for the pivot** | <2 booked events from 25 qualified conversations in 6 weeks → drop it. |

### 13.3 P-C — The memorial channel (funeral directors and celebrants as the intermediary)

| | |
|---|---|
| **Trigger** | §6 structural kill — the product and margin are fine but no consumer acquisition channel exists at an affordable cost |
| **What it is** | A family chart produced for a funeral or memorial service — one framed display piece plus 20–60 A5 handouts for attendees — ordered by the funeral director or celebrant, not by the bereaved directly. 48-hour turnaround. |
| **Why the occasion fits** | It is occasion #4 by volume in `docs/00`, and it is the only occasion with (i) genuine urgency, (ii) an existing professional intermediary who already sells add-ons, (iii) the whole extended family assembled in one room looking at it, and (iv) low price sensitivity. It also naturally seeds the share loop with 40 relatives at once. |
| **How it respects the tone rule** | `docs/08` §22 forbids advertising into grief, and that stands. Here the *director* is the customer and the entry point; the bereaved family is never targeted by us. This is exactly the "they come to us" line, mediated by a professional. |
| **Reuses** | Renderer, print pipeline, checkout. New: a partner portal, trade pricing, a turnaround SLA, a much quieter design register. ~65% reuse. |
| **Economics** `[ASSUMPTION]` | Trade price ~$120 for the display piece (director marks up) + $2.50/handout × 40 = $220 order; COGS ~$85 → **~$120 contribution**, but repeatable: a director doing 60 services/year converting 15% = 9 orders/year from one relationship. 10 active partners ≈ 90 orders/year. |
| **Risks** | It is a **different company**: B2B relationship sales, not a design-led consumer brand. Sales cycles of 4–10 weeks. Reputational exposure if a print is late or wrong on the worst day of someone's life — the SLA is not optional. |
| **Test** | 3 weeks, ≤$200 (sample prints + postage). Contact 20 funeral homes and independent celebrants within driving distance; offer 3 free samples. |
| **Kill criterion for the pivot** | <2 willing to trial from 20 contacted in 6 weeks → drop it. |

### 13.4 Things that look like pivots and are not — decided in advance

| Idea | Why not |
|---|---|
| **GEDCOM-first product for the historian segment** | The GEDCOM-literacy squeeze (`docs/00`). The people able to give you a file are the people able to bypass you, and free open-source renderers already exist. Rejected at the top of the repo; it does not become correct because the primary path is struggling. |
| **Genealogy research as a service** | Unbounded labour, no software leverage, competes with the record-holders. §10.2. |
| **A general personalised-print catalogue** (birth stats, wedding vows, map prints) | It reuses the pipeline and abandons the entire defensibility argument. `docs/00`'s "why not Amazon" answer is that the product does not exist until the customer creates *their family*. Generic personalised prints have no such protection and put you head-to-head with Etsy and Amazon at zero moat. This is the most tempting bad pivot in the list precisely because the code fits. |
| **Selling the print-ready digital file standalone** | The file **is** the poster; it cannibalises the physical product. Post-purchase add-on or bundled with 24×36 only (`docs/00`, `docs/02` §5.3). Non-negotiable under any level of desperation. |
| **A subscription** | Nothing recurs. Ancestors do not update monthly. |
| **"Add AI"** | There is no failure mode in this document to which a model is the answer. If it appears in a rescue plan, the rescue plan is procrastination. |

---

## 14. What is NOT evidence of failure

Half of a kill criterion's value is preventing a *false* kill. None of the following, alone,
justifies stopping:

| Not a failure | Why | What to do instead |
|---|---|---|
| A bad week at n=3 orders | At 11 orders/month the weekly variance is ±100% | Read the trailing 4 weeks |
| A January trough after a December peak | This business is seasonal by construction (`docs/08` §5.1) | Compare Jan to Dec, and judge on February |
| SEO producing zero revenue at month 4 | It was never expected to (`docs/07` §1.1) | Judge SEO on indexation and query intent, not orders |
| One angry customer / one damaged print | The reprint reserve exists for exactly this | Reprint, apologise, log the defect, move on |
| Pinterest flat at week 3 | Pins take 4–8 weeks `[RULE OF THUMB]` | Judge at week 8 |
| Low traffic while the funnel is green | That is a distribution problem with a known playbook | §8, not §3 |
| The framing quote coming back bad | Framing is worth $0.64/order (`docs/03` §6.5) | Cut framing, keep the business |
| Friends and family being the first buyers | They always are | Just don't count them (dashboard row 9 excludes them at G5) |
| Nobody buying in the first two weeks of being live | Considered purchase, gift-occasion-gated | Judge at n≥60 completed charts |

---

## 15. The anti-rationalisation protocol

The failure mode this document exists to prevent is not a bad number. It is a good explanation for a
bad number, repeated monthly.

| Rule | Mechanism |
|---|---|
| **Pre-register** | These thresholds are committed to git on 12 Aug 2026. `git log` is the audit trail. A threshold changed after data arrives must be committed as a separate change with the reason written above it, and the original left visible in history. |
| **One extension, ever, per criterion** | Maximum 2 weeks, and it must be written down *before* the review date passes, with the specific reason and the specific thing that will be different. An extension requested after the date is not an extension, it is a refusal. |
| **The third-excuse rule** | If you explain the same red cell for a third consecutive weekly review, the explanation is wrong. Act on the number instead. |
| **The external witness** | Send the §11 dashboard to one named person every Monday. Not for advice — for the fact that you have to send it. This costs nothing and is the most effective single item on this list. |
| **The restart sentence** | At every gate, answer in writing: *"Knowing exactly what I know now, and having spent nothing, would I start this today?"* If the honest answer is no, the money already spent is not an argument. It is gone either way. |
| **No definition changes mid-flight** | If a metric's definition must change (e.g. C8 → C7 after R2), version it, and never compare across versions. Re-baseline from zero. |
| **Kill means kill** | A killed criterion does not get revisited "when things calm down". Closing the repo is the action. |

### 15.1 What continuing wrongly actually costs

| Scenario | Cash | Hours | Notes |
|---|---|---|---|
| Kill at G1 (Day 7) | ~$400 | ~25 h | The cheapest possible outcome and a genuinely good one |
| Kill at G3 (Day 30) | ~$450 | ~100 h | `docs/09` §1.3 budget |
| Kill at G5 (Day 90) | ~$1,200 | ~350 h | Includes some ad testing and print samples |
| Kill at G8 (Day 180) | ~$2,800 | ~700 h | Roughly the full `docs/08` §19 experiment budget |
| **Rationalising past G8 to Aug 2027** | ~$4,000 | **~1,300 h** | At a notional $40/h that is **~$52,000 of your life** against a business that is not clearing $1,000/month |

**The gap between killing at G5 and killing eleven months later is roughly 950 hours.** That is the
number the three-week discipline is actually buying, and it dwarfs every dollar figure in this repo.

### 15.2 The kill write-up (1 page, mandatory, and it is an asset)

If any KILL fires, write and publish: what was assumed; what was measured; the exact numbers; what
it cost; what you would do differently; what you would need to see to reconsider. This takes two
hours. It is the highest-value artefact a failed project produces — it is honest content, it is
credibility, and it is the thing that stops you rebuilding the same business in eighteen months
having forgotten why it didn't work.

---

## 16. Where this document is weakest — stated plainly

1. **Every threshold is calibrated against modelled priors, not measured ones.** The 27% completion
   green line is `docs/03`'s Base assumption, which came from reasoning, not observation. If the
   true achievable rate for a good builder in this category is 45%, then 27% is a mediocre product
   being congratulated; if it is 15%, then 27% is unreachable and the amber band is a trap. The
   first 200 real starts should re-baseline every number in §3.

2. **The fatal line at S→C8 = 10% is derived from a traffic requirement that is itself an
   assumption.** It says 10% is fatal because 136 organic visitors/day is implausible. If a single
   Pinterest pin or one video changes what is plausible, the fatal line moves. Recheck the §3.2
   table against *actual* traffic at G5 rather than treating it as fixed.

3. **Several criteria cannot fire before the Christmas window closes.** M needs 50 orders; repeat
   needs 12 months; blended CAC needs 20 paid orders. The plan is to be inside the season by
   November, and the season is the only time those samples accumulate quickly — which means the most
   expensive decisions get made on the thinnest data, in the busiest month. There is no clean fix.
   The mitigation is that the *cheap* criteria (G1, G2, §3) all fire before any real money moves.

4. **The seasonality overlay may swallow the verdict.** G5 is inflated by Christmas, G7 is deflated
   by January, and G8/G9 in February is the only honest read — which is Day 180+, six months in.
   A founder who genuinely wants to decide in three weeks will have to accept that the *product*
   questions resolve in three weeks and the *business* question does not resolve until February.
   Conflating them in either direction is the error.

5. **The three pivots are unresearched.** P-A's $179 price, P-B's $254-per-event contribution and
   P-C's funeral-home conversion rate are all `[ASSUMPTION]` with no external validation whatsoever —
   the same tooling limits that left supplier pricing unverified apply here. They are directions to
   test cheaply, not plans. Do not let a pivot inherit less scepticism than the original idea got.

6. **There is no criterion here for "this is working but you hate it".** `docs/09` §9.2 row 10 has
   it and this document does not, because it cannot be measured. It remains a legitimate,
   non-shameful kill reason, and it should be asked at every gate alongside the numbers.
