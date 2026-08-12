# Phase 8 — Customer acquisition

Descends from `docs/00-decision-brief.md`. Sits alongside `docs/07-seo-engine.md`
(earned search, which contributes ~nothing in the first six months and says so).
This document covers **everything else**: the share loop, social, paid, community,
partnerships and email.

**Reading rules for this document**

- Today is **12 August 2026**. Month 0 is now. Christmas 2026 is ~19 weeks out.
  Every calendar in here is anchored to that.
- **No number below came from a live tool.** WebSearch budget was exhausted in
  Phase 1 and the egress proxy blocked marketplace and supplier domains
  (`docs/01` §7). Every CPM, CTR, conversion rate, group size and response rate
  is labelled `[ASSUMPTION]` or `[RULE OF THUMB]` with its reasoning basis.
  **Do not budget against any of them.** They exist to be replaced by your own
  first 30 days of data.
- The bar is **$1,000/month ≈ 11 orders at $95 AOV**. That is a modest bar. It is
  roughly one order every 2.7 days. Nothing in this document should be written or
  read as though it were a heroic goal — and the plan should be embarrassed if it
  needs a large budget to clear it.
- The single largest unvalidated assumption in the entire business is: **will a
  gift buyer type in 15 names?** Every channel in this document delivers traffic
  to that question. If the answer is no, no amount of acquisition fixes it, and
  the correct response is to stop spending, not to spend more.

---

## 0. The five things that matter, in order

If everything else in this document is ignored, do these:

| # | Thing | Why it beats the alternatives | Cost |
|---|---|---|---|
| 1 | **Instrument and tune the share loop** (§2) | It is free, native to the product, and it is the only mechanic that makes CAC affordable. One chart producing 1.6 orders instead of 1.0 raises the CAC ceiling by 60% across *every other channel in this document*. | $0 + engineering |
| 2 | **Hand-build 20 charts for strangers** (§3) | The first 20 conversations tell you whether the 15-names assumption holds, what names people get stuck on, and what words they use. This is research disguised as sales. | ~30 h |
| 3 | **Pinterest, treated as a real channel** (§8) | Near-perfect demographic match, buying-intent-native, content compounds for years, and it is the only free channel with a plausible path to double-digit monthly orders. | ~4 h/wk |
| 4 | **The occasion calendar** (§17) | This business is not evenly distributed across the year. Christmas is most of it. Missing a lead-time window costs twelve months. | Planning |
| 5 | **One honest Meta ads test with a hard kill criterion** (§13) | Not because it will work — the arithmetic in §13.2 suggests it probably won't at Q4 prices — but because you need to *know*, and $600 buys the answer. | $600 cap |

Everything else is secondary. Resist adding a sixth.

---

## 1. The arithmetic that governs every decision below

### 1.1 What one order is worth

From `docs/02` §6.4 and §7: modelled AOV **$94.90**, blended gross margin
**~57–60%** after the reprint provision.

| Line | Value | Source |
|---|---|---|
| Modelled AOV | $94.90 | `docs/02` §6.4 `[ASSUMPTION]` |
| Blended GM after reprint provision | 57% | `docs/02` §7.3 `[ASSUMPTION]` |
| **Contribution per order** | **~$54** | Derived |
| Downside AOV (small-SKU skew) | $62 → ~$35 contribution | `docs/02` §6.4 |
| Upside AOV (framing-heavy) | $118 → ~$67 contribution | `docs/02` §6.4 |

### 1.2 What one *chart* is worth — the number that actually matters

`docs/02` §15.3 states it plainly: LTV here is earned within 90 days and mostly
**from other people**. The unit of acquisition is therefore the chart, not the
customer.

Let **M** = orders per chart-that-orders-at-least-once (the loop multiplier).

| M `[ASSUMPTION — unvalidated, measure this first]` | Contribution per acquired chart | Breakeven CAC | Target CAC (50% of contribution) |
|---|---|---|---|
| 1.0 (no loop at all) | $54 | $54 | **$27** |
| 1.3 | $70 | $70 | **$35** |
| 1.6 (planning case) | $86 | $86 | **$43** |
| 2.2 (strong loop) | $119 | $119 | **$59** |

**Read this table before every paid-channel decision.** The difference between a
$27 and a $59 CAC ceiling is the difference between "Meta ads are impossible" and
"Meta ads are workable". That difference is decided by §2, not by the ad account.

### 1.3 What the bar costs

| Target | Orders/mo at $95 | Charts needed at M=1.6 | Paid budget at $43 CAC | Paid budget at $27 CAC |
|---|---|---|---|---|
| $1,000/mo | 11 | ~7 | ~$300 | ~$189 |
| $5,000/mo | 53 | ~33 | ~$1,420 | ~$891 |

At M=1.6 and a $43 CAC, a $5,000 month costs ~$1,420 in acquisition and returns
~$2,840 in contribution before fixed costs. That is a real business but a thin
one, and it is **entirely contingent on M**. If M comes back at 1.0, paid cannot
carry the plan and this document's centre of gravity moves permanently to
Pinterest, societies, and the loop.

### 1.4 The funnel model everything is measured against

`[ASSUMPTION — these are planning priors, not observations. Replace each with
real data in week 2 of live traffic.]`

| Step | Prior | Why this prior |
|---|---|---|
| Landing page → builder started | 25–40% | Interactive-demo-first pages typically convert to "start" far better than to "buy". High variance. |
| Builder started → ≥5 names entered | 45–65% | **This is the assumption.** Drop-off here is the kill signal for the whole business. |
| ≥5 names → chart saved (email captured) | 60–75% | She's invested; saving is low-friction and self-serving. |
| Chart saved → order (within 30 days) | 10–20% | Considered purchase, gift-occasion-gated, $49–$169. Christmas lifts this; February crushes it. |
| **Cold visitor → order** | **1.5–4%** | Compounded. Note the width — this is honest, not lazy. |

A cold visitor worth $54 × 2.5% = **~$1.35 per landing-page visit**. Any channel
delivering traffic for less than that is worth scaling; any channel above it is
not, before loop effects. Write that number on the wall and update it monthly.

---

## 2. The share-link growth loop — lead with this

This is the highest-leverage mechanic in the business, it is free, and it is
native rather than bolted on. It gets its own section at the top because if you
only optimise one thing for the first 90 days, optimise this.

### 2.1 Why it exists without being engineered into existence

Every person who builds a family tree hits the same wall: a great-grandmother's
maiden name, a birth year nobody's sure of, whether Uncle Frank was born before
or after the war. **She has a genuine, self-interested reason to send the chart
to relatives** — not to market to them, but because she needs the answer. The
relatives who open it see a beautiful chart of *their own family*, already 80%
complete, with their own name on it.

That is the entire loop. It requires no incentive, no referral code, and no
persuasion, because the sharing motive is real. Incentivised referral programmes
in gift categories generally underperform because the sharer looks mercenary.
Here the sharer looks like the family organiser, which is what she already is.

### 2.2 The loop, step by step, with the instrumentation each step needs

| # | Step | Event to log | Target `[ASSUMPTION]` | What a bad number means |
|---|---|---|---|---|
| 1 | Chart saved with ≥1 blank or uncertain field | `chart_saved`, `chart_has_gaps` | 55–70% of saved charts have gaps | Almost none → either the builder isn't reaching far enough back, or people are inventing data |
| 2 | Share link created | `share_link_created` | **35%+ of gapped charts** | <15% → the share prompt is invisible or badly worded. Highest-priority fix. |
| 3 | Link opened by ≥1 person | `share_opened` (dedupe by device) | 2.5–4 unique openers per shared link | <1.5 → she's sharing 1:1, not to a family thread. Add "share to group chat" affordances. |
| 4 | Opener contributes a correction/name | `share_contribution`, email captured | 15–25% of openers | Low → the contribute UX is too heavy. It must be one tap, no account. |
| 5 | Opener starts their **own** chart | `builder_started_from_share` | 8–15% of openers | Low → the shared view isn't selling. Add "make one for your side of the family". |
| 6 | Opener orders a copy of *this* chart | `order_from_share` | 3–6% of openers | This is the direct monetisation of the loop |
| 7 | **Orders per chart (M)** | Derived | **1.6 planning case** | The single most important number in the business |

### 2.3 The K-factor arithmetic, honestly

Naive viral coefficient: `K = shares_per_chart × openers_per_share × new_chart_rate_per_opener`.

| Scenario | Share rate | Openers/share | Opener→own chart | K | Reading |
|---|---|---|---|---|---|
| Pessimistic | 0.20 | 1.8 | 5% | **0.018** | Loop is noise. M ≈ 1.05. |
| Planning | 0.35 | 3.0 | 10% | **0.105** | Not viral. But M ≈ 1.5–1.7 from *copies*, which is where the value is. |
| Optimistic | 0.50 | 4.0 | 15% | **0.30** | Still not self-sustaining growth, but a 43% traffic multiplier on every paid dollar. |

**Say this out loud: K will not exceed 1. This is not a viral product and any
plan that assumes it is, is wrong.** The loop's value is not exponential growth —
it is (a) the copy-order multiplier M, which raises the CAC ceiling, and (b) free
qualified traffic that costs nothing and arrives pre-warmed by a family member.
Those are worth a great deal. Exponential growth is not on the table.

### 2.4 The share surface — what it must actually look like

The shared page is a **landing page that happens to contain their family**. It is
the single highest-converting page the business will ever have. Design rules:

| Rule | Reason |
|---|---|
| No login, no email gate to *view* | Any friction here kills the loop. Gate contribution, never viewing. |
| The chart renders full, beautiful, and print-accurate above the fold on mobile | 70%+ of opens will be mobile from a group chat `[ASSUMPTION]` |
| Their own name is visible and highlighted | "This is my family" is the entire emotional hook |
| One primary CTA: **"Add what you know"** | The reason they were sent the link. Honour it first. |
| Two secondary CTAs, below: **"Order a copy"** and **"Start your own side of the family"** | Monetisation and loop, in that order |
| Sender's name shown ("Rachel sent you this") | Trust transfer; this is not a cold page |
| `noindex` on all `/c/*` paths | `docs/07` §5.1 — non-negotiable, privacy and index-bloat |
| Share text pre-written, occasion-neutral | "Can you check if I got Nan's maiden name right?" outperforms anything we'd write as marketing `[ASSUMPTION]` |

### 2.5 The share prompt — exact copy to test

The prompt fires when a chart is saved with ≥1 empty field.

| Variant | Copy | Hypothesis |
|---|---|---|
| A (control) | "Share your chart" | Baseline. Generic, no motive. |
| B (the need) | "Not sure about a name? Send it to a relative and let them fill in the gaps." | Names the real motive; should beat A substantially |
| C (the person) | "Your aunt probably knows Nan's maiden name. Send her the chart." | Specific > general; may feel presumptuous |
| D (the count) | "3 names are missing. Ask the family." | Concrete gap count creates a task |

### 2.6 Loop experiments

| ID | Hypothesis | Method | Spend cap | Success | **Failure → stop** |
|---|---|---|---|---|---|
| **L1** | Naming the motive in the share prompt beats a generic label | A/B copy test §2.5, B vs A | $0, 2 h | B ≥ +40% relative share-link creation over ≥150 saved charts | B ≤ A after 150 charts → keep A, stop testing copy, the problem is placement not wording |
| **L2** | Openers convert to their own charts at ≥8% | Instrument step 5 | $0 | ≥8% over 200 openers | <4% over 200 openers → the shared view is not selling; rebuild it once. If still <4%, treat the loop as a *copy-sales* mechanic only and drop the acquisition claim from all forecasts |
| **L3** | The second-copy discount ladder (−25%/−35%) drives multi-copy orders without discounting the first | Offer surfaced on the share page and in post-purchase email | $0 | ≥20% of orders are 2nd+ copies of an existing chart | <8% after 50 orders → M is ~1.0; **rewrite §1.2 and cut paid budgets by half** |
| **L4** | A physical trigger in the parcel produces shares | Insert card: "Want one for your side of the family? Scan this." with a chart-specific QR | ~$0.15/order | ≥5% of parcels produce a scan | <1.5% over 60 orders → drop the insert, it's landfill |
| **L5** | Reminding non-buyers at occasions reactivates saved charts | Occasion email to saved-not-bought cohort | $0 | ≥6% order rate on the Christmas send | <2% → saved charts are a vanity asset, stop counting them as pipeline |

**L3 is the most important experiment in this document.** It measures M directly,
and M sets the budget for every paid channel. Run it from order #1.

---

## 3. The first 10 customers

The first 10 are **not revenue, they are an instrument.** $500 of revenue is
irrelevant; what they buy you is the answer to "will she type in 15 names?" and a
vocabulary you don't currently have.

### 3.1 Rules

1. **They must be strangers.** Your mother buying one teaches you nothing except
   that your mother loves you. Friends-and-family orders are allowed but are
   logged separately and excluded from every conversion metric.
2. **Watch at least 5 of them use the builder**, live, over a screen share, in
   silence. You are permitted to say "what are you thinking?" and nothing else.
3. **Do it by hand.** Concierge, unscalable, personal. The point is the transcript.
4. **Cap it at 20 charts / 3 weeks.** Beyond that you are running an Etsy shop,
   which is the thing we built software to avoid.

### 3.2 The concierge play — where to find them

The highest-yield source of first customers is people **already publicly asking
for this**. They exist daily.

| Source | What to look for | The approach |
|---|---|---|
| Facebook genealogy groups (§9) | "Does anyone know a good way to *print* a family tree?" / "I want to make a nice chart for my mum's 80th" | Comment publicly with genuine help (no link). Then DM: "I'm building a tool for exactly this — can I make yours for free and you tell me if it's any good?" |
| r/Genealogy, r/AncestryDNA (§10) | Same question, weekly | Same. **Never** a top-level promotional post. |
| Etsy reviews of hand-made chart sellers | Buyers describing what they wanted and didn't get | Not contactable directly. Read them for language, not leads. |
| Your own extended network's *second* ring | "Anyone's parent has a big birthday coming up?" posted on your personal profile | Warm intro to a stranger; counts as a stranger |
| Local genealogical society meetings (§12) | The person who brings a hand-drawn chart | In person. Offer to make it properly, free. |

### 3.3 The concierge script (public comment, then DM)

> **Public comment (no link, ever):**
> "Depends how far back you're going — if it's 4 generations, a fan chart reads
> much better than a vertical tree because the outer ring gets crowded fast. If
> you post the number of generations I can tell you what size print you'd need
> for it to be legible."

Answer the question fully. If they engage, and only then:

> **DM:**
> "Hi — you asked about printing a family tree in [group]. I'm building a tool
> that does this properly (fan or vertical, print quality, no software to learn).
> It's not launched. Would you let me build yours for free? I'd want 20 minutes
> of your honest reaction, including if you hate it. No catch, no obligation to
> buy anything."

### 3.4 What "free" means and what it costs

| Offer | Our cost | Give it to |
|---|---|---|
| Free 18×24 unframed print | ~$27 landed `[ASSUMPTION]` | The first **5** who complete a full session with you watching |
| Free digital proof only | ~$0 | The next 15 |
| Cost-price print ($30) | $0 net | Anyone who insists on paying |

Budget: **~$135 of print cost for the whole first-customer programme.** That is
the cheapest market research available and it is not optional.

### 3.5 The 10 questions to ask every single one

These are the deliverable of this phase — more valuable than the orders.

1. Whose chart is this and what's the occasion?
2. Before you found me, what were you going to do instead?
3. How many names did you know off the top of your head? Where did you stop?
4. What did you have to look up, and where did you look?
5. Did you have to ask a relative? Who? How did you ask them?
6. What would you have paid for this? What's too expensive?
7. Framed or unframed — and why?
8. Where will it go in the house?
9. What nearly made you give up?
10. Who else in your family would want a copy? Would you send them the link?

Q3 and Q10 are the business. Q3 tests the core assumption; Q10 tests M.

### 3.6 Gate

| Check | Pass | Fail action |
|---|---|---|
| Of 20 people who *start* a chart, how many enter ≥5 names? | ≥10 | <5 → **stop acquisition work entirely.** The problem is the product, and no channel in this document can rescue it. Return to `docs/02` §17. |
| How many said yes to Q10 (would share)? | ≥12 | <6 → M is likely ~1.0; rebuild all budgets on the $27 CAC ceiling |
| How many, offered a real price, said they'd buy? | ≥8 | <4 → the price or the object is wrong, not the traffic |

---

## 4. Customers 10 → 50

Now you have testimonials, five photographs of a real print in a real house, and
a vocabulary. Switch from concierge to channels. Target: **50 cumulative orders
by end of Month 3** (Oct 2026), which puts you into Christmas with proof.

| Channel | Expected share of the 40 `[ASSUMPTION]` | Why |
|---|---|---|
| Pinterest (§8) | 10–14 | Slow start, compounds; pins take 4–8 weeks to gain traction `[RULE OF THUMB]` |
| Facebook groups, non-promotional participation (§9) | 6–10 | Direct DMs from helpfulness, plus permitted vendor threads |
| The share loop (§2) | 6–12 | Multiplied off the first 20; free |
| Genealogical societies (§12) | 3–6 | Newsletter mentions have long lead times; start now for Nov placement |
| Short-form video (§11) | 2–8 | Very high variance. One video can carry the month or nothing happens. |
| Meta ads test (§13) | 2–5 | Test only, not scaled |
| Micro-influencer gifting (§14) | 2–6 | Lead time 3–5 weeks from outreach to post |

**Prerequisites before this phase starts** — none of the above works without:

| Asset | Why | Effort |
|---|---|---|
| 8–12 genuine photographs of prints in real homes | Every channel here is visual. Renders convert worse than photographs of paper on a wall `[ASSUMPTION]` | 1 day + $200 of prints |
| 3 written testimonials with first name, age bracket, occasion | Trust for a $79 unknown-brand purchase | Free, from §3 |
| A 40-second builder screen recording, silent, captioned | The single most reusable creative asset in the business — pin, Reel, ad, email, landing page | 3 h |
| The share page (§2.4) built and instrumented | Otherwise you spend money and learn nothing about M | Engineering |

---

## 5. Customers 50 → 100 and the first $1,000 month

$1,000/month is 11 orders. If Christmas is anywhere in the window, this bar should
fall over without heroics; the real question is whether it holds in **February**.

### 5.1 Two different $1k months

| | Christmas $1k month (Nov/Dec 2026) | February $1k month (Feb 2027) |
|---|---|---|
| Difficulty | Low — occasion demand does the work | **The real test** |
| What it proves | Almost nothing about the business | That non-seasonal demand exists |
| Primary channels | Pinterest (peaks Oct–Dec), Meta ads, gift guides, societies' Nov newsletters | Share loop, Pinterest evergreen, memorial/birthday occasions |
| Trap | Reading a Christmas month as product-market fit | Reading a February trough as failure |

**Plan to the February number.** If Dec does $3,000 and Feb does $400, the
business is a seasonal one — which is survivable but changes everything about
cash flow, ad pacing and how much of the year you can afford to be idle. Decide
that in January, not the following November.

### 5.2 The path

| Month | Cumulative orders | Monthly revenue target | The one thing to get right that month |
|---|---|---|---|
| M0 — Aug 2026 | 0–10 | $0 (free/cost-price) | The 15-names gate (§3.6). Gift-guide pitches out the door — window closing. |
| M1 — Sep 2026 | 10–22 | ~$600 | Pinterest live with 60+ pins. Society newsletter placements booked for Nov. |
| M2 — Oct 2026 | 22–40 | ~$1,200 | Meta ads test runs and concludes. Influencer gifts delivered and filmed. |
| M3 — Nov 2026 | 40–75 | ~$2,800 | Christmas order-by dates published everywhere. Cyber Week offer live. |
| M4 — Dec 2026 | 75–115 | ~$3,500 | Deadline urgency. Digital-file rescue for late orders (post-purchase only). |
| M5 — Jan 2027 | 115–125 | ~$900 | Post-Christmas trough. Do not panic-spend. Build. |
| M6 — Feb 2027 | 125–140 | **~$1,200** | **The honest verdict on the business.** |

`[ASSUMPTION — this ramp is a plan, not a forecast. It assumes the §3.6 gate
passes and Pinterest behaves like a normal visual-commerce channel. Treat any
month within ±50% as on-plan; a month at 20% of plan is a signal, not noise.]`

---

## 6. The $5,000 month

53 orders. ~1.8 per day. This is where the channel mix has to change, because
concierge and community goodwill do not produce 53 orders a month.

### 6.1 What has to be true

| Condition | Why it's required | If false |
|---|---|---|
| **M ≥ 1.4** | Otherwise the CAC ceiling ($27) is below realistic paid CPA and the business cannot buy growth | Growth is capped at organic pace; $5k is a Christmas-only number |
| **One channel produces ≥15 orders/mo repeatably** | Portfolios of 5-order channels don't scale; they consume all your time | You are running a hobby with good margins |
| **Pinterest has ≥150 pins with a compounding impression curve** | Pinterest's payoff is 3–9 months out `[RULE OF THUMB]` | Start it earlier than you want to |
| **Supplier pricing verified and margins hold at volume** | `docs/01` §7.4 — still open | Every number in §1 is wrong |
| **Fulfilment SLA holds at 2/day** | POD is fine at this volume; the risk is your support load | Support time eats the founder |

### 6.2 The mix at $5,000/month

| Channel | Orders/mo `[ASSUMPTION]` | Cost | Notes |
|---|---|---|---|
| Share loop / copies | 12–16 | $0 | Grows mechanically with base |
| Pinterest organic | 10–16 | ~4 h/wk | The load-bearing free channel |
| Meta ads (if E-M1 passed) | 8–14 | $400–$700 | Only if CPA < $43 |
| Google Search — brand + 6 exact-match terms | 3–6 | $150–$250 | Small, cheap, high intent |
| Email (occasion reactivation) | 4–8 | ~$20/mo | Compounds with saved-chart base |
| Societies, influencers, partnerships | 3–8 | $200 | Lumpy, seasonal |
| Organic search (`docs/07`) | 1–4 | — | Not before month 9 |

At the top of those ranges: ~72 orders. At the bottom: ~41. The plan should
target the middle and treat the Pinterest and Meta lines as the two that decide it.

### 6.3 The scaling failure mode to watch

Meta CPA typically degrades as spend rises within a narrow audience
`[RULE OF THUMB]`. A $10/day test that hits $35 CPA very often becomes $70 CPA at
$60/day, because the cheapest-to-reach fraction of the audience is exhausted.
**Do not model paid scaling linearly.** Step budgets up 40–50% at a time and
re-check CPA at each step, with a written rule: if CPA rises above the §1.2
ceiling for 7 consecutive days, step back down and hold.

---

## 7. Channel portfolio — the triage

| Channel | Demo fit (Rachel 35–60F) | Demo fit (Martin 55–75) | Cost | Time to first order | Ceiling | Verdict |
|---|---|---|---|---|---|---|
| **Share loop** | Native | Native | $0 | Immediate | Multiplier, not source | **Do first, always** |
| **Pinterest** | Excellent | Poor | $0 | 4–10 wks | High | **Primary free channel** |
| **Facebook groups** | Good | Excellent | $0 | Days | Medium, effort-bound | **Do, carefully** |
| **Genealogical societies** | Poor | Excellent | ~$0–$300 | 4–10 wks | Medium, very underrated | **Do — highest ROI per hour after Pinterest** |
| **Meta ads** | Excellent | Good | $$ | Days | High if CPA works | **Test with a hard cap** |
| **Short-form video** | Moderate | Poor | $0 + time | Unpredictable | Very high variance | **Do — format fits, demo doesn't** |
| **Micro-influencers** | Good | Good | $ or gifts | 3–6 wks | Medium | **Do at small scale** |
| **Google Search** | Good | Excellent | $ | Days | Low volume, high intent | **Do small, brand-first** |
| **Email** | Excellent | Excellent | ~$0 | N/A | Compounds | **Do — it's already built** |
| **Reddit** | Weak | Moderate | $0 | Rare | Low | **Participate; do not "market"** |
| **Partnerships** | Varies | Varies | $0 | 6–12 wks | Medium | **Two only; don't collect logos** |
| **Affiliate** | — | — | % | Slow | Low at this scale | **Defer past $5k/mo** |
| **TV/print/radio, trade shows** | — | — | $$$ | — | — | **No** |

---

## 8. Pinterest — the primary free channel

Pinterest deserves the most detailed treatment in this document. The demographic
match is close to exact: the platform skews heavily female and mid-life, and the
dominant use-case is *planning a purchase or a project*, which is precisely what
"find a gift for Mum's 70th" is. Content has an unusually long half-life relative
to feed platforms — pins surface months and years after publication
`[RULE OF THUMB — widely reported by practitioners; unverified here]`.

### 8.1 The mental model

Pinterest is not social media. **Treat it as a visual search engine with a
seasonal demand curve.** You are not building an audience; you are populating an
index with keyworded images that get discovered by people searching for a gift,
typically 4–10 weeks before the occasion. Follower count is close to irrelevant.

Consequences:
- Keywords in pin titles, descriptions, board names and board descriptions matter
  more than aesthetics-for-their-own-sake (though aesthetics decide the click).
- **Publish seasonal content 45–60 days early.** Christmas pins go up in
  September and October, not December `[RULE OF THUMB]`.
- Every pin needs a distinct destination URL where possible; identical-image,
  identical-URL spam is throttled.

### 8.2 Board structure

Build these 12 boards in week 1. Each gets a keyword-rich description of 2–3
sentences (a real sentence, not a keyword list).

| # | Board name | Target searcher | Pins to seed |
|---|---|---|---|
| 1 | Family Tree Chart Ideas | Broad category entry | 20 |
| 2 | Gifts for Grandparents | Occasion, highest commercial intent | 15 |
| 3 | 80th Birthday Gift Ideas | Milestone birthdays (also make 70th/90th pins, one board) | 15 |
| 4 | Christmas Gifts for Mum & Dad | Q4 workhorse | 20 |
| 5 | Mother's Day Gifts That Aren't Flowers | Strong differentiator hook | 12 |
| 6 | Memorial & Remembrance Gift Ideas | Sensitive, high intent, low competition | 10 |
| 7 | Golden & Silver Anniversary Gifts | 50th/25th | 10 |
| 8 | Family Reunion Ideas | Adjacent, high-share | 12 |
| 9 | Genealogy for Beginners | Martin + top-of-funnel | 15 |
| 10 | Gallery Wall & Heirloom Decor | Interiors crossover — big Pinterest vertical | 15 |
| 11 | Fan Charts & Pedigree Chart Design | Category education, links to free tools (`docs/07` §4.5) | 10 |
| 12 | New Baby & First Family Portrait Ideas | Occasion #6 | 8 |

**Do not** create a "Our Products" board. Products live inside occasion boards
where the search happens.

### 8.3 What a pin actually looks like

| Element | Spec | Notes |
|---|---|---|
| Aspect ratio | **2:3**, 1000×1500 px | Taller gets truncated; wider loses feed real estate |
| Top third | **The emotional payload** — a real photograph of a framed chart on a real wall, or hands holding it | Not a flat render. Not a mockup with a fake shadow. |
| Text overlay | 4–7 words, high contrast, readable at 1.5 cm tall on a phone | e.g. "Her whole family, on one page" |
| Bottom strip | Small `kinline.com` wordmark | Discreet; the pin must not look like an ad |
| Colour | Warm neutrals, cream, ink, one muted accent | Matches the product; also happens to perform well in the home-decor vertical `[ASSUMPTION]` |
| Title | 40–60 chars, keyword-led | "80th Birthday Gift for Grandma — Family Tree Print" |
| Description | 2 sentences, natural language, includes the occasion + the object + the benefit | Written for a human; Pinterest reads it for retrieval |
| Destination | The matching occasion landing page from `docs/07` §6, **never** the homepage | Occasion→occasion match is the whole conversion mechanism |

**Five pin archetypes to rotate:**

1. **The wall shot.** Framed chart above a sideboard in a real home. Highest
   click-through prior `[ASSUMPTION]`; it lets her imagine it in her house.
2. **The reveal.** A photo or 3-frame grid of an older person opening it. Highest
   save-rate prior; the emotion is the product.
3. **The before/after.** Left: scribbled notes on paper / a screenshot of a
   spreadsheet. Right: the finished chart. This sells the *transformation*, which
   is what she's actually buying.
4. **The infographic.** "How to make a family tree chart in 5 steps" — text pin,
   no product, links to an article. This is the traffic pin, not the sales pin.
   Roughly 30% of your pins should be these; they earn the impressions that make
   the product pins visible.
5. **The idea-pin/video.** 6–10 second silent screen recording of the builder
   filling in names, ending on the finished chart. Native video is favoured in
   the feed `[RULE OF THUMB]`.

### 8.4 Cadence

| Phase | Fresh pins/day | Weekly hours | Notes |
|---|---|---|---|
| Weeks 1–2 (setup) | 8–10 | 6 | Front-load: build 12 boards + 120 seed pins from ~20 base images × text variants |
| Weeks 3–12 | 3–5 | 3–4 | Scheduled in batches on Sunday. "Fresh" = new image or new text treatment, not the same pin re-pinned. |
| Steady state | 2–3 | 2 | Plus a seasonal surge 60 days before each occasion |

Use Pinterest's native scheduler (free) before paying for a third-party tool.
Do not buy a scheduler until you have proof the channel works.

### 8.5 Pinterest experiments

| ID | Hypothesis | Method | Cap | Success | **Failure → stop** |
|---|---|---|---|---|---|
| **P1** | Pinterest sends qualified traffic to this product | 120 seed pins, 8 weeks, tracked with a UTM per board | 40 h | ≥400 outbound clicks/mo by week 8 **and** builder-start rate ≥20% | <100 clicks/mo at week 8 with correct SEO on pins → reduce to 1 pin/day maintenance and reallocate hours to §12 |
| **P2** | Real-home photographs beat renders | 20 pins each, matched titles | $200 print/photo cost | Photo pins ≥1.5× the click rate | Renders win → cheaper content, good news, scale renders |
| **P3** | Occasion-matched landing pages beat homepage | Split destination on 40 pins | $0 | Occasion pages ≥1.4× builder-start rate | No difference → collapse the page set, save the build time (`docs/07` §6) |
| **P4** | Idea/video pins outperform static for saves | 15 each | 6 h | Video ≥2× saves | No lift → drop video pins, they cost 4× to make |

---

## 9. Facebook Groups — enormous, tool-tolerant, easy to get banned from

Genealogy is one of the largest hobby communities on Facebook and the groups are
genuinely large — tens of thousands to hundreds of thousands of members each
`[ASSUMPTION — not verified in this environment; count them yourself in week 1]`.
Critically, these groups are **tool-tolerant**: members constantly ask each other
which software, which site, which printing service. That is not true of most
hobby communities and it is the whole opportunity.

### 9.1 The kinds of groups, ranked

| Type | Example shape | Size | Fit | Notes |
|---|---|---|---|---|
| **General genealogy megagroups** | "Genealogy Beginners", "Genealogy Help & Chat" | Very large | Martin-heavy | High volume of "how do I print/display this?" questions. Strict anti-promo rules. |
| **DNA-results groups** | AncestryDNA / 23andMe / MyHeritage user groups | Very large | Mixed | Lots of newcomers who just discovered relatives — emotionally primed, chart-naive |
| **Country/region/county groups** | "Irish Genealogy", "Genealogy of Yorkshire", "Cajun Family Trees" | Medium | Martin | Great for the origin pages (`docs/07` §4.4). Very tight-knit; be a member first. |
| **Surname groups** | "The O'Sullivan Family Worldwide" | Small | Mixed | Hundreds of them. Low volume each, but a chart of *that surname* is a natural fit. |
| **Family reunion planning groups** | "Family Reunion Ideas & Planning" | Medium | **Rachel** | Underrated. Reunions want a big printed chart on the wall. Multi-copy orders. |
| **Gift-idea / "what should I buy" groups** | "Gift Ideas for Everyone" | Medium | Rachel | Often permissive on vendor posts; lower intent |
| **Bereavement / memorial groups** | Grief support communities | Medium | Rachel | **Do not market here. Ever.** Participate only as a human, if at all. The reputational downside is unbounded and the behaviour is indefensible. |
| **Scrapbooking / heritage crafts** | Memory-keeping communities | Medium | Rachel | Adjacent aesthetic; receptive to a beautiful physical object |

### 9.2 Etiquette — the rules that keep you from being banned

Admins in these groups are volunteer, protective, and fast on the ban button.
Being banned is permanent and costs you the group forever.

| Rule | Practice |
|---|---|
| **Read the pinned rules before posting anything.** | Most groups state their promo policy explicitly. Many allow it on a named day ("Vendor Friday", "Self-Promo Saturday") or in a monthly thread. Use those and only those. |
| **DM the admin before your first promotional anything.** | Short, honest, and offer them something. See script §9.3. Admins who say yes will often *defend* you later. |
| **30 days of genuine participation before any mention of the product.** | Answer questions, no links, no signature. This is not a growth hack, it's the entry price. |
| **Never post a link into a thread you didn't create unless asked.** | "DM me" is also link-dropping. If someone asks what you use, answer honestly and disclose ("I'm biased, I built it"). |
| **Always disclose.** | "Full disclosure, I make this." One sentence. It converts *better* than pretending, because these communities smell astroturf instantly. |
| **Your profile is a legitimate landing page.** | Cover photo, bio line, one link. If your comments are consistently helpful, people click the name. This is the main permitted mechanism. |
| **Give the group something free that isn't the product.** | The cousin calculator (`docs/07` §4.5), a free printable blank fan chart PDF, a "how to interview an elderly relative" one-pager. Admins accept these; members share them. |
| **Never argue with an admin.** | Apologise, delete, move on. |
| **Never DM group members cold at scale.** | Reply to *their* public request only. Cold DM blasts get accounts restricted and are the fastest way to become the thing you're competing against. |

### 9.3 Admin outreach — exact message

> Subject/opening: **Question about your group's rules on tools**
>
> "Hi [name] — I've been in [group] for a few weeks and I've noticed the
> 'how do I print/display my tree' question comes up regularly.
>
> I've built a tool that does that (charts you build in the browser, printed as a
> proper archival print). I don't want to break your rules, so I'm asking first
> rather than posting.
>
> Two things I can offer either way:
> 1. A free printable blank fan chart PDF your members can use, with no branding
>    requirement and no email capture — yours to post as a group resource.
> 2. A free 18×24 print I'll cover entirely, if you ever want a giveaway for the
>    group.
>
> If promotional posts aren't welcome, that's completely fine and I'll keep just
> answering questions. Just wanted to ask properly. — [name]"

Expected response rate `[ASSUMPTION]`: 25–40% reply, 10–20% say yes to something.
That is fine. Send 20, not 200.

### 9.4 Facebook Group experiments

| ID | Hypothesis | Method | Cap | Success | **Failure → stop** |
|---|---|---|---|---|---|
| **F1** | Helpful non-promotional participation produces inbound DMs | Join 12 groups, answer ≥5 questions/wk each week for 4 weeks, zero links | 12 h | ≥10 inbound profile-driven enquiries in 4 weeks | <3 → the profile isn't converting or the groups are wrong; fix profile once, then reduce to 4 groups |
| **F2** | Admin outreach yields sanctioned placement | 20 admin DMs (§9.3) | 4 h | ≥3 sanctioned posts/giveaways/resource placements | 0 of 20 → the category is closed to vendors; stop, keep only F1 participation |
| **F3** | Free blank fan chart PDF is an accepted give | Offer to 20 groups | 3 h to make | Accepted by ≥5 groups; ≥200 downloads | <50 downloads → the give has no pull; stop making assets |
| **F4** | Reunion-planning groups convert better than genealogy groups | Track source of enquiries | $0 | Reunion groups ≥2× enquiries per hour spent | No difference → consolidate effort into the largest 4 groups |

---

## 10. Reddit — participate honestly, expect little

Be straight about this: **Reddit is a poor acquisition channel for this business
and a good listening channel.** Budget ≤2 hours a week and do not expect it to
produce meaningful orders.

### 10.1 The rules, honestly

| Sub | Reality | What's actually allowed |
|---|---|---|
| **r/Genealogy** | Large, active, and explicitly hostile to commercial solicitation. Rules generally prohibit self-promotion, advertising and soliciting business. | Answering questions as a knowledgeable person. If someone asks "what should I use to print a chart", a *disclosed* mention is sometimes tolerated — and sometimes removed. Assume removal. |
| **r/AncestryDNA, r/23andMe, r/MyHeritage** | Similar posture, more newcomer traffic | Same. Genuinely useful answers only. |
| **r/GiftIdeas, r/gifts** | Recommendation-seeking is the *point* of the sub, but self-promo rules still apply | Replying to a specific request with disclosure is the only defensible move |
| **r/somethingimade, r/crafts, r/DesignPorn** | Show-and-tell is welcome; selling is not | A genuinely beautiful finished print, posted honestly ("I built a tool to make these; here's my grandmother's"), sometimes lands. Sometimes gets removed as advertising. |
| **Small local/regional subs** | Rules vary wildly, often more permissive | Occasionally worth a genuine post around a local occasion |

**Universal rules:** most subs require account age and comment karma before you
can post; moderators check post history and will ban an account whose entire
history is one topic; deleted-and-reposted content gets you shadowbanned; paid
Reddit ads are a separate matter and are **not** recommended here (targeting is
weak for a 35–60F gift buyer).

### 10.2 What to actually do

1. Use one real, disclosed account. Not a burner. Never multiple accounts — vote
   manipulation and sockpuppeting are the two things that get you site-banned.
2. Answer 3–5 questions a week with real expertise (chart legibility, generation
   counts, how to interview relatives, why fan charts crowd at 5 generations).
3. Post at most **one** show-and-tell per quarter, in a craft/design sub, with
   full disclosure, and accept removal without complaint.
4. **Read r/Genealogy weekly as research.** The recurring frustrations posted
   there are your landing-page copy and your Pinterest infographic topics. This is
   the actual value of Reddit to this business.

### 10.3 Experiment

| ID | Hypothesis | Method | Cap | Success | **Failure → stop** |
|---|---|---|---|---|---|
| **R1** | Disclosed helpful participation on Reddit produces measurable traffic | 8 weeks, 2 h/wk, one profile link | 16 h | ≥30 sessions and ≥1 order attributable | <10 sessions in 8 weeks → drop to research-only reading, 20 min/wk. **Expect this outcome.** |

---

## 11. Short-form video — TikTok, Reels, YouTube Shorts

Weak demographic fit; **very** strong format fit. TikTok skews younger than
Rachel, though the 35–55 cohort on Reels and Facebook video is substantial
`[ASSUMPTION]`. The reason to do it anyway: two formats native to this product —
**the build screen recording** and **the emotional reveal** — are among the most
reliably performing structures in short-form. And a video that works becomes a
paid ad creative, which is where the real value lands.

### 11.1 Rules of the format

- **Hook in the first 1.5 seconds**, visual and verbal simultaneously.
- **Vertical 9:16**, captions burned in (most viewing is silent).
- **45–75 seconds** for reveals; **15–25 seconds** for build recordings.
- Post the same asset to TikTok, Reels and Shorts. Do not make three versions.
- **Consent is mandatory for reveal footage.** A crying grandmother filmed
  without permission is a lawsuit and a reputational fire. Get it in writing.
- Volume matters more than polish: expect ~1 in 15 to do anything `[RULE OF THUMB]`.

### 11.2 Ten videos, scripted

| # | Title | Hook (first line, on screen + spoken) | Structure | Length | CTA |
|---|---|---|---|---|---|
| **V1** | The 5-minute build | "I made my nan's entire family tree in the time it took her to make tea." | Screen record: type 3 names → 8 → 15. Chart blooms outward as names land. Cut to printed piece on a table. | 22 s | "Link's in bio if you want to make one." |
| **V2** | The reveal | *No words for 2 seconds* — an 84-year-old's hands untying string on brown paper. | Silent unwrap, her face, she starts naming people out loud, someone off-camera is crying. Text overlay only at the end: "She's the one at the centre." | 55 s | None. Let it breathe. Pin the link in comments. |
| **V3** | The wall of shame | "Google 'family tree chart' and this is what you get." | Screen record of genuinely dated competitor output (fair comment, don't name them), then cut to ours. | 18 s | "It's 2026." |
| **V4** | The maiden name wall | "Every single person doing their family tree hits the exact same wall." | Build a chart, stop at great-grandmother, blank field. Show sending the share link to a family group chat. Show three replies filling it in. | 35 s | "You don't have to know everything. Ask the family." |
| **V5** | What 4 generations actually looks like | "You have 8 great-grandparents. Can you name one?" | Count on screen: 2 parents, 4 grandparents, 8 great-grandparents, 16. Overlay filling in a fan chart as it counts. End on the sparse reality of most people's knowledge. | 30 s | "Start with the eight you know." |
| **V6** | The interview | "Ask your grandparents these 5 questions before it's too late." | Pure value, no product. Five questions on screen, one per beat. Product appears for 2 s at the end only. | 45 s | "Write the answers down somewhere permanent." |
| **V7** | Fan vs vertical | "Why your family tree looks terrible past 4 generations." | Genuinely useful design explanation: vertical trees crowd exponentially, fan charts distribute the load radially. Show both at 5 generations. | 40 s | "Design nerdery, but it's why fan charts exist." |
| **V8** | Cost of the alternative | "An Etsy seller quoted me £180 and three weeks for this." | Show the manual back-and-forth process (chat messages, mockup revisions), then the 5-minute build. | 28 s | "Same object. Different Tuesday." |
| **V9** | The memorial one | "We made this the week after my grandad died." (Only if genuine and consented.) | Quiet, slow, restrained. A chart with his name and dates. No sales language whatsoever. | 40 s | Nothing. No CTA at all. |
| **V10** | Typo terror | "I nearly printed my own mother's name wrong." | The proof step: on-screen check, the reprint guarantee card. Sells the guarantee, which is the real objection. | 25 s | "If we get a name wrong we reprint it free." |

**Notes on the set:** V2 and V9 are the emotionally strongest and the hardest to
produce (they need real consented moments; do not stage them — staged grief reads
as fake and will be called out). V1, V4 and V7 you can make today alone at a desk.
V6 and V7 are the ones likeliest to be *saved and shared*, which matters more than
views. Start with V1, V4, V5, V7, V10 — all producible in one afternoon.

### 11.3 Experiment

| ID | Hypothesis | Method | Cap | Success | **Failure → stop** |
|---|---|---|---|---|---|
| **S1** | Short-form produces traffic at this demographic | Post 20 videos over 6 weeks (V1–V10 plus variants), cross-posted 3 platforms | 25 h | ≥1 video >20k views **and** ≥150 total link clicks | 20 videos, all <3k views, <30 clicks → stop posting to a schedule. Keep making them **only** as paid ad creative (§13). |
| **S2** | The build recording outperforms the reveal for clicks | Compare V1-family vs V2-family | $0 | Clear 2× winner in click rate | Ambiguous after 20 videos → stop A/B-ing format, produce whichever is cheaper |

---

## 12. Local genealogical societies — the most underrated channel here

There are thousands of county, state, regional, ethnic and surname genealogical
societies. Nearly all of them have: a **newsletter**, a **monthly meeting that
needs a speaker**, a **raffle**, and a **membership that is exactly Martin**.
They are chronically short of content and delighted to be taken seriously.

This channel is off-persona (Martin, not Rachel) — but Martin's charts have more
generations, higher AOV, and **Martin's relatives are Rachels**.

### 12.1 The four offers, in order of ease

| Offer | Their cost | Our cost | Realistic yield `[ASSUMPTION]` |
|---|---|---|---|
| **Free raffle/door prize** — an 18×24 print voucher for their monthly meeting | Nothing | ~$27 + a mention in the newsletter | 1–3 orders per society, plus goodwill |
| **A free resource for the newsletter** — a 600-word article ("How to design a chart people will actually read") with a byline and one link | Nothing; fills a page they need to fill | 2 h once, reused 30× | 0–2 orders per placement |
| **A 30-minute Zoom talk** to their monthly meeting | Nothing; fills a slot they struggle to fill | 30 min live + prep once | 2–6 orders per talk — **the highest-yield version** |
| **Newsletter sponsorship** — a small paid ad | $25–$100/issue `[ASSUMPTION — verify per society]` | Cash | Only worth it after the free versions prove yield |

The talk is the good one. You are not pitching; you are teaching chart design —
legibility, generation counts, why fan charts exist, what archival paper means,
how to check a chart before printing it permanently. The product appears in one
slide near the end with a society-specific discount code, which also gives you
clean attribution.

### 12.2 Outreach — exact email

> **Subject: Speaker offer for a future meeting — chart design for genealogists**
>
> "Hello [Society],
>
> I design family tree charts for print, and I'd be glad to give your members a
> 30-minute talk (Zoom or in person if I'm near [region]) on something most
> genealogy talks skip: **how to design a chart that's actually readable**.
>
> Rough outline — why vertical trees fall apart past four generations, how to
> pick a size so the outer ring stays legible, what archival paper and pigment
> ink actually mean, and how to proof a chart before you commit it to print.
>
> No charge, and nothing to sell on the call. I'd mention what I do at the end
> and leave a discount code for members if that's welcome; if you'd rather I
> didn't, I'll skip it.
>
> I can also send an 18×24 print to use as a raffle prize at any meeting, at my
> cost, whether or not the talk is of interest.
>
> Happy to send the slides in advance. — [name], kinline.com"

### 12.3 Working the list

| Step | Detail |
|---|---|
| Build the list | Directories of societies exist via national federations and state archives; also search "[county] genealogical society newsletter". Target **60 societies** in week 1. `[Not verified in this environment — build the list yourself.]` |
| Sequence | Email 20/week. Follow up **once** after 12 days. Never a third time. |
| Lead time | Newsletters are typically monthly with a 3–6 week copy deadline `[ASSUMPTION]`. **To be in a November newsletter you must email in September.** |
| Track | A unique code per society (`GS-YORK25`) — this is your only clean attribution and it costs nothing |
| Expected `[ASSUMPTION]` | 60 emails → 15–25 replies → 5–10 raffle placements → 2–5 talks booked |

### 12.4 Experiment

| ID | Hypothesis | Method | Cap | Success | **Failure → stop** |
|---|---|---|---|---|---|
| **G1** | Societies will accept free content and prizes | 60 emails over 3 weeks | 8 h | ≥10 acceptances of any kind | <3 acceptances → the framing is wrong; rewrite once, resend to 30 new societies. Still <3 → drop the channel. |
| **G2** | A society talk produces orders | Deliver 3 talks, unique code each | 6 h | ≥3 orders per talk average | <1 order per talk → stop doing talks, keep sending raffle prizes (cheap, passive) |
| **G3** | Paid newsletter sponsorship beats free placement | 4 paid placements after G1 | $300 | CPA < $43 | CPA > $80 → free placements only, permanently |

---

## 13. Meta ads — the best paid fit, tested with a hard cap

Meta (Facebook + Instagram) is the correct paid channel for this demographic:
detailed interest and life-event targeting, an audience that skews exactly right
on Facebook feed, and creative formats that suit an emotional physical object.
It is also expensive in Q4 and **the arithmetic below is not encouraging**.

### 13.1 Honest CPA arithmetic before spending a dollar

`[ASSUMPTION — all inputs are planning priors from general DTC experience, not
measurements. Replace with real numbers after 7 days of spend.]`

| Input | Pessimistic | Mid | Optimistic |
|---|---|---|---|
| Q4 US CPM, 35–60F, feed | $40 | $28 | $18 |
| CTR (link) | 0.7% | 1.1% | 1.8% |
| Implied CPC | $5.71 | $2.55 | $1.00 |
| Landing → builder start | 22% | 30% | 40% |
| Builder start → order | 6% | 10% | 16% |
| **Visitor → order** | **1.3%** | **3.0%** | **6.4%** |
| **CPA** | **$439** | **$85** | **$16** |

Against a CAC ceiling of $43 (at M=1.6), **only the optimistic column works.**
The mid case is double the ceiling. This is not a reason to skip the test — it is
a reason to run it with a strict budget, a written kill criterion, and no
expectation that it becomes the growth engine. Do not let a hopeful ad manager
(including yourself at 11pm) convert "learning budget" into "we're scaling".

Also: run the test **outside** peak Q4 if you can. October CPMs are materially
below December CPMs `[RULE OF THUMB]`, and a channel that fails in October
definitely fails in December.

### 13.2 Targeting matrix to test

Four audiences, one campaign, `Advantage+` off initially so you can read the data.

| Audience | Definition | Hypothesis |
|---|---|---|
| **A1 — Broad + creative-led** | US/UK, F, 35–60, no interests, let the algorithm find them off the creative | Modern Meta often beats manual targeting when the creative is self-selecting. The chart *is* self-selecting. |
| **A2 — Genealogy interest** | Interests: Ancestry.com, MyHeritage, Genealogy, FamilySearch, 23andMe | Higher intent but skews Martin (older, may self-serve) |
| **A3 — Gift-occasion behaviour** | F 35–60 + "Friends of people with birthdays in [month]" + engaged shoppers + parents of adult children where available | Closest to the actual buyer |
| **A4 — Lookalike (later)** | 1% LAL of chart-savers, once ≥200 exist | Cannot run in month 1; note the prerequisite |

**Do not run retargeting until there is traffic to retarget** — but build the
pixel and the saved-chart custom audience on day one. Retargeting abandoned
builders is likely to be the *only* profitable Meta activity at this scale, and
it needs 30 days of accumulated audience before it can start.

### 13.3 Creative to test

Six creatives, three concepts × two formats. Creative variance dwarfs targeting
variance in this category `[ASSUMPTION]` — put the effort here.

| ID | Concept | Format | Primary text (first line) |
|---|---|---|---|
| **C1** | The build | 20 s silent screen recording (V1) | "Fifteen names. Five minutes. One heirloom." |
| **C2** | The build | Static: before/after (notes → chart) | "You know more of your family tree than you think." |
| **C3** | The reveal | 45 s consented reveal video (V2) | "She sat with it for twenty minutes." |
| **C4** | The reveal | Static: framed chart on a wall, real home | "Her whole family, on one page." |
| **C5** | The occasion | Static: gift-wrapped + card, Christmas dressing | "In time for Christmas, or your money back." |
| **C6** | The objection | Static: the reprint guarantee, plainly typeset | "If we spell a name wrong, we reprint it free." |

### 13.4 The budget ladder and kill rules

| Stage | Daily | Duration | Total | Advance if | Kill if |
|---|---|---|---|---|---|
| **Stage 0 — pixel + audiences** | $0 | Ongoing | $0 | Always | — |
| **Stage 1 — creative sort** | $30/day across 6 creatives, 1 audience (A1) | 7 days | $210 | ≥1 creative with CPC < $1.60 **and** builder-start rate ≥25% | No creative under $3.00 CPC → **stop. The creative is the problem, not the channel.** Make new creative before spending again. |
| **Stage 2 — audience sort** | $30/day, winning creative × A1/A2/A3 | 7 days | $210 | ≥1 audience with CPA < $70 (accepting that's above ceiling, at low volume) | All audiences CPA > $150 → stop Meta for the year; spend the remainder on §12 and print costs |
| **Stage 3 — retarget** | $10/day, saved-chart + builder-abandon audiences | 14 days | $140 | CPA < $43 | CPA > $60 → keep at $5/day as a floor, do not scale |
| **Total test cap** | | | **$560** | | **Hard cap. Do not extend it because "it's nearly working."** |

### 13.5 Experiment record

| ID | Hypothesis | Cap | Success | **Failure → stop** |
|---|---|---|---|---|
| **M1** | Meta can acquire a chart-builder below the CAC ceiling | $560 | Blended CPA ≤ $43 at ≥$30/day for 7 consecutive days | CPA > $85 at the end of Stage 2 → **shut it off completely**, write up why, revisit only after M (§2) is measured and if M ≥ 1.6 |
| **M2** | Retargeting abandoned builders is profitable even if cold is not | included above | Retarget CPA < $30 | >$60 → cold-only conclusion stands, Meta is not a channel for this business at this stage |
| **M3** | Emotional reveal creative beats functional build creative | included | One concept ≥1.6× the other on CPA | Ambiguous → default to the cheaper-to-produce concept (the build recording) |

---

## 14. Micro-influencers

### 14.1 Who, exactly

| Tier | Size | Where | Pay or gift? | Expected `[ASSUMPTION]` |
|---|---|---|---|---|
| **Nano** | 2k–15k followers | Genealogy IG/TikTok, "gifts for grandparents" accounts, family-history bloggers | **Gift only.** A free framed 18×24 of their own family (~$65 cost) is a genuinely good deal at this tier. | 30–50% of those who accept will post; 200–2,000 views each |
| **Micro** | 15k–60k | Genealogy YouTubers, heritage/craft creators, "gift guide" accounts | **Gift + $75–$200 flat** for a dedicated segment, or 15% affiliate | 60–80% post if paid; 1k–15k views |
| **Mid** | 60k–250k | Larger family-history YouTubers | **Paid, $300–$1,500** — out of budget until $5k/mo | Skip for now |
| **Never** | Anyone with engagement rate < 1% or an audience that isn't US/UK/CA/AU | | | Follower count is not the metric; comments-from-real-people is |

**The best-fit creator archetype is not a "genealogy influencer" at all** — it's a
mid-sized creator whose living grandparent appears regularly in their content.
The reveal video makes itself, and their audience already loves the grandmother.
Search for that pattern deliberately.

### 14.2 The offer

| Element | Detail | Why |
|---|---|---|
| The gift | A **framed 18×24 of their own family**, built by us from names they send | Cost ~$65. The whole point: they cannot make this themselves, and they will want to keep it. |
| The ask | One post/video of their choosing. **No approval rights, no script, no obligation.** | Creators refuse controlling deals; unconstrained content is also better content |
| The affiliate | 15% on tracked sales for 90 days, optional, opt-in | Costs nothing if nothing sells |
| The extra | A code giving *their* audience free gift wrap + digital file (value $23, cost $2.50) rather than a discount | `docs/02` §11 — never discount the print |
| Consent | Explicit written permission to reuse their footage as a paid ad | **This is the real value of the deal.** Creator-shot reveal footage is the best ad creative you will ever have, and it costs $65. |

### 14.3 Outreach message — verbatim

> "Hi [name] — [one specific, true sentence about their content, e.g. 'the video
> with your grandad describing his first job stuck with me'].
>
> I make printed family tree charts — you type in the names you know, we design
> and print it properly (archival paper, framed if you want).
>
> I'd like to make one of **your** family and send it to you, framed, free.
> No obligation to post anything. If you do want to post, I'd love it, but
> there's no script, no approval, no deal attached. If you'd rather it just went
> to your grandmother instead of you, I'll send it straight to her.
>
> All I need is the names — parents, grandparents, great-grandparents, however
> far you get.
>
> If you'd rather not, no problem at all, and I won't follow up. — [name]"

**Why it's shaped like this:** it leads with proof you watched their content, it
offers something with real personal value, it removes the obligation that makes
creators ignore gifting emails, and it names the family-member option — which is
what turns a product gift into a story they *want* to film. Follow up once, after
10 days, one line. Never twice.

### 14.4 Experiment

| ID | Hypothesis | Method | Cap | Success | **Failure → stop** |
|---|---|---|---|---|---|
| **I1** | Gifting produces posts | 25 outreach messages, up to 10 gifts sent | $650 print cost | ≥5 posts published, ≥1 with >10k views | <2 posts from 10 gifts → the offer isn't compelling; stop gifting, revisit only with a paid offer |
| **I2** | Influencer traffic converts | Unique code each | $0 | ≥15 orders total across all posts | <4 orders → treat influencer work purely as **ad-creative sourcing**, not acquisition — which is still worth $65/creator |
| **I3** | Creator footage outperforms our own as paid creative | Run in Meta Stage 1 | included in §13 | Creator creative wins on CPC | Ours wins → stop gifting for footage, keep for reach only |

---

## 15. Google Search ads

Small, cheap, high intent. Not a growth engine at this scale; a defensive and
capture play.

| Campaign | Budget/day | Match | Terms | Purpose |
|---|---|---|---|---|
| **Brand defence** | $2 | Exact | `kinline`, `kinline family tree`, `kinline reviews` | Stop competitors buying your name; capture the "is this legit" search that follows every ad click (`docs/07` §1.2). Cheap and mandatory. |
| **High-intent product** | $10–15 | Exact + phrase | `family tree print`, `family tree poster`, `printed family tree chart`, `fan chart print`, `family tree wall art personalised` | The people typing this have already decided on the category |
| **Occasion** | $5–10 (seasonal) | Phrase | `gift for grandma 80th birthday`, `50th anniversary gift for parents`, `christmas gift for grandparents` | Higher volume, much lower intent, more expensive. Test after the product campaign. |
| **Never bid on** | — | — | `free family tree template`, `gedcom`, `ancestry login`, competitor brand names | Wrong intent (free-seekers), wrong persona (self-servers), or expensive brand fights |

`[ASSUMPTION]` Expect CPCs in the $0.60–$2.50 range for the product terms and
$1.50–$5 for the occasion terms. Search volume for the exact product terms is
likely **low** — this campaign might spend $150/month and produce 3–5 orders.
That's a good outcome; don't try to make it bigger by loosening match types,
which is the classic way to burn a small search budget.

| ID | Hypothesis | Cap | Success | **Failure → stop** |
|---|---|---|---|---|
| **GA1** | High-intent search converts above ceiling | $300 over 30 days | CPA < $43 | CPA > $70 → keep brand defence at $2/day, pause everything else |
| **GA2** | Occasion terms are affordable | $200 over 30 days | CPA < $60 | CPA > $100 → pause; these terms belong to publishers and big retailers |

---

## 16. Email, partnerships, and affiliate

### 16.1 Email

The flows are already specified in `docs/02` §15.2. The acquisition-relevant
points:

| Flow | Acquisition role | Priority |
|---|---|---|
| **Abandoned builder (24 h)** | The highest-ROI automation in the business. Her work is 80% done; the email contains a rendered image of *her* chart. | **Build first, before any paid spend.** Spending on ads without this is pouring traffic through a hole. |
| **Share nudge** | Powers §2 at its natural moment | Build second |
| **Occasion reminder** | Reactivates the saved-chart base — this is the asset that makes month 12 easier than month 3 | Build third |
| **Post-delivery photo request** | Sources the UGC that feeds Pinterest and Meta creative | Build fourth |

Resend's free tier (3,000/mo) covers all of this well past $5k/mo. There is no
list-building play here beyond the builder itself — **do not build a lead magnet
funnel**; the builder is a better magnet than any PDF, because it captures at the
moment of highest investment.

### 16.2 Partnerships — pick two, not ten

| Partner type | The deal | Realism |
|---|---|---|
| **Family reunion organisers** | A large chart for the reunion wall + a per-attendee copy offer. Multi-copy orders are the ideal shape. | **Best fit.** Reunions are planned 6–12 months ahead — start now for summer 2027. |
| **Local framers & interiors shops** | They frame; we print. Referral both ways. | Low volume, high trust, easy |
| **Funeral directors / celebrants** | Memorial charts. **Extremely sensitive.** Only as a genuine service offering, never as a lead-gen arrangement, never with commission on the bereaved. | High emotional value, high reputational risk. If it feels like selling to grieving people, it is. Walk away. |
| **Retirement communities & senior living activity coordinators** | Chart-building as a resident activity | Interesting, slow, worth one pilot |
| **Photographers doing family portraits** | Natural adjacency; complementary object | Easy conversation, unproven yield |
| **Ancestry/MyHeritage themselves** | No. They have their own print products. | Not available |

Rule: **two partnerships, run properly, beat ten announced.** Every partnership
costs setup time and produces nothing without a named person who wants it to work.

### 16.3 Affiliate/referral

| Programme | Design | When |
|---|---|---|
| **Customer referral** | **Not a discount.** The referrer gets a free hi-res digital file (cost ~$0.01, perceived $15) or free gift wrap when someone they shared with orders. The second-copy ladder (−25%/−35%, `docs/02` §5) already does the real work. | Launch with the share loop |
| **Creator affiliate** | 15%, 90-day cookie, manual tracking via codes at this volume | With §14 |
| **Formal affiliate network** | No. The fees and management overhead exceed the return below ~$20k/mo. | Defer |

---

## 17. Occasion-triggered campaigns — the calendar that runs the year

This business is occasion-driven. Missing a lead-time window costs twelve months.
All lead times assume POD production plus standard shipping `[ASSUMPTION — verify
against real Prodigi/Gelato SLAs, `docs/01` §7.4]`.

| Occasion | Date | Campaign starts | Order-by (published) | Channel emphasis | Hook |
|---|---|---|---|---|---|
| **Grandparents Day (US)** | Sun 13 Sep 2026 | 10 Aug | 2 Sep | Pinterest, FB groups | "The one gift they can't buy themselves" |
| **Gift-guide pitching** | — | **NOW (Aug)** | — | Email to 60 blogs | `docs/07` §8 — window is open and closing |
| **Christmas** | 25 Dec 2026 | **1 Oct** | ~11 Dec standard, 15 Dec express | Everything | "In time for Christmas, or your money back" |
| **Cyber Week** | 27–30 Nov 2026 | 20 Nov | — | Meta, email | Value-add (free framing upgrade), **not** % off |
| **Late-panic window** | 12–23 Dec | — | — | Email, search | Digital file **as a post-purchase rescue only** — never a standalone SKU (`docs/02` §5.3) |
| **New Year "start your tree"** | 1–15 Jan 2027 | 28 Dec | — | Pinterest, short-form | Resolution framing; low commercial intent, good top-of-funnel |
| **Mothering Sunday (UK)** | ~7 Mar 2027 `[verify]` | 25 Jan | 25 Feb | Pinterest UK, Meta UK | "Not flowers again" |
| **Mother's Day (US)** | Sun 9 May 2027 | 25 Mar | 28 Apr | Everything | "Her mother, and her mother's mother" |
| **Father's Day (US)** | Sun 20 Jun 2027 | 5 May | 9 Jun | Meta, search | "The line he never wrote down" |
| **Reunion season** | Jun–Aug 2027 | Feb 2027 | Rolling | Partnerships, FB reunion groups | Multi-copy offer |
| **Milestone birthdays** | Year-round | Always on | Rolling | Search, Pinterest, email | Evergreen; the February revenue floor |
| **Memorial** | Year-round | Always on | Rolling | Search only. **Never advertised proactively.** | Restraint is the strategy |

**Two standing rules:** (1) Never run a percentage discount on the print
(`docs/02` §11.3) — add value instead. (2) Publish order-by dates prominently and
build a real buffer into them; the guarantee is the offer.

---

## 18. First 30 days — posting calendar for the primary social account

**Primary account: Instagram** (feed + Reels), because it double-serves as the ad
creative library and the credibility check when someone Googles the brand. TikTok
and YouTube Shorts receive the same video assets with zero extra work. **Pinterest
runs in parallel on its own cadence** (§8.4) and is the channel that actually
matters — the Instagram calendar exists so the brand looks real and the creative
gets made.

Assumes Day 1 = the day photography exists. Roughly 45–60 minutes/day.

| Day | Format | Content | Hook / caption opener | Purpose | Pinterest that day |
|---|---|---|---|---|---|
| 1 | Carousel | The finished product, 5 angles, real wall | "This is my grandmother's family, on one page." | Establish the object | 10 seed pins |
| 2 | Reel (V1) | 22 s build recording | "Fifteen names. Five minutes." | The mechanic | 8 |
| 3 | Static | Close-up: paper texture, ink, deckled edge | "It matters that it's paper you can feel." | Quality signal | 8 |
| 4 | Story only | Poll: "Can you name all 4 of your great-grandmothers?" | — | Audience research, free | 8 |
| 5 | Reel (V5) | "You have 8 great-grandparents. Name one." | "Most people stop at three." | Reach play | 8 |
| 6 | Carousel | Fan vs vertical, side by side at 5 generations | "Why your tree looks terrible past 4 generations." | Save-bait, expertise | 8 |
| 7 | Static | Founder, face, 3 sentences on why | "I built this because my grandad died in 2019 and nobody wrote anything down." (only if true) | Trust | 8 |
| 8 | Reel (V4) | The maiden-name wall + share link | "Everyone hits the same wall." | **Seeds the loop** | 5 |
| 9 | Static | Testimonial #1, typeset, with the product photo | "'She cried. I did not expect that.'" | Proof | 5 |
| 10 | Carousel | "5 questions to ask your grandparents" | "Ask these before it's too late." | Pure value; most-shared post of the month `[ASSUMPTION]` | 5 |
| 11 | Story | BTS: packing an order | — | Realness | 5 |
| 12 | Reel (V7) | Chart design explainer | "There's a reason fan charts exist." | Expertise | 5 |
| 13 | Static | Framed vs unframed comparison | "Framed is £50 more and about four hours of your life." | Merchandising (drives AOV) | 5 |
| 14 | Carousel | Grandparents Day (US, 13 Sep) occasion post | "The one gift they can't buy themselves." | Occasion | 5 |
| 15 | Reel (V10) | The typo/guarantee video | "I nearly printed my own mother's name wrong." | Kills the top objection | 5 |
| 16 | Static | UGC: a customer's photo on their wall | "@[name]'s hallway." | Social proof, zero cost | 4 |
| 17 | Story | Q&A sticker: "Ask me anything about family trees" | — | Content mining | 4 |
| 18 | Reel (V8) | The Etsy comparison | "£180 and three weeks. Or five minutes." | Competitive framing | 4 |
| 19 | Carousel | "How far back can you actually get?" — realistic expectations by country | "Four generations is normal. Don't feel bad." | Removes the shame that stops people starting | 4 |
| 20 | Static | Detail shot: a name, a date, a place | "Bridget Kelly, 1901, Co. Mayo." | Emotional, quiet | 4 |
| 21 | Reel (V2 if consented, else V1 variant) | The reveal | *No caption for 3 seconds.* | The strongest asset you have | 4 |
| 22 | Static | Testimonial #2 | — | Proof | 4 |
| 23 | Carousel | "What to do when nobody remembers" — practical research tips | "Start with the death certificate." | Value, links to `docs/07` article | 4 |
| 24 | Story | Countdown/reminder to a saved-chart offer | — | Reactivation | 4 |
| 25 | Reel (V6) | The interview questions video | "Ask your grandparents these 5 things." | Reach | 4 |
| 26 | Static | Size guide, laid out on a wall to scale | "18×24 is the one people order twice." | Merchandising | 4 |
| 27 | Carousel | Memorial framing, restrained, no CTA | "Some of these are made after a funeral." | Serves a real segment with dignity | 3 |
| 28 | Reel (V3) | Competitor-era comparison | "Google 'family tree chart' and this is what you get." | Positioning | 3 |
| 29 | Static | The share link explained, screenshot of a family group chat | "Ask the family. That's the whole trick." | **Loop again — bookend the month** | 3 |
| 30 | Carousel | Month-one recap: charts built, names entered, oldest ancestor found | "In 30 days, 61 people mapped 900 relatives." (only real numbers) | Momentum, honest | 3 |

**Rules for the calendar:** never post a number you haven't measured; never post a
memorial video with a sales CTA; every Reel is cross-posted to TikTok and Shorts
the same day; if a post underperforms, do not delete it — the archive is the ad
creative library.

**What to ignore for the first 30 days:** follower count, likes, and any advice
about "posting consistently to build an audience". The Instagram account is not
the channel. It is a credibility asset and a creative factory.

---

## 19. Master experiment register

Every experiment in this document, with its cap and its stop rule, in one table.
Nothing gets run that isn't on this list; nothing continues past its failure line.

| ID | Channel | Spend cap | Time cap | Success | Failure → action |
|---|---|---|---|---|---|
| L1 | Share prompt copy | $0 | 2 h | B ≥ +40% share creation | Keep A, stop copy testing |
| L2 | Share→own chart | $0 | — | ≥8% of openers | <4% → loop is copies-only |
| **L3** | **Multi-copy rate (M)** | $0 | — | ≥20% of orders are 2nd+ copies | <8% → halve all paid budgets |
| L4 | Parcel insert | $0.15/order | 2 h | ≥5% scan rate | <1.5% → drop insert |
| L5 | Occasion reactivation email | $0 | 3 h | ≥6% order rate | <2% → saved charts aren't pipeline |
| P1 | Pinterest viability | $0 | 40 h | ≥400 clicks/mo by wk 8 | <100 → maintenance mode |
| P2 | Photo vs render pins | $200 | 8 h | Photos ≥1.5× | Renders win → cheaper content |
| P3 | Occasion landing pages | $0 | 4 h | ≥1.4× builder start | Collapse page set |
| P4 | Video vs static pins | $0 | 6 h | ≥2× saves | Drop video pins |
| F1 | FB group participation | $0 | 12 h | ≥10 inbound enquiries | Cut to 4 groups |
| F2 | Admin outreach | $0 | 4 h | ≥3 sanctioned placements | Category closed; participation only |
| F3 | Free chart PDF | $0 | 3 h | ≥200 downloads | Stop making assets |
| F4 | Reunion vs genealogy groups | $0 | — | ≥2× per hour | Consolidate |
| R1 | Reddit | $0 | 16 h | ≥30 sessions, ≥1 order | Research-only, 20 min/wk |
| S1 | Short-form viability | $0 | 25 h | 1 video >20k views + 150 clicks | Make videos only as ad creative |
| S2 | Build vs reveal format | $0 | — | Clear 2× winner | Default to cheaper format |
| G1 | Society outreach | $0 | 8 h | ≥10 acceptances | Rewrite once, then drop |
| G2 | Society talks | $150 prints | 6 h | ≥3 orders/talk | Raffle prizes only |
| G3 | Paid newsletter ads | $300 | 2 h | CPA < $43 | Free placements only |
| **M1** | **Meta cold** | **$560** | 4 wks | CPA ≤ $43 | Shut off entirely |
| M2 | Meta retargeting | incl. | 2 wks | CPA < $30 | Floor at $5/day |
| M3 | Meta creative concept | incl. | — | 1.6× winner | Cheapest concept |
| GA1 | Google high-intent | $300 | 4 wks | CPA < $43 | Brand defence only |
| GA2 | Google occasion | $200 | 4 wks | CPA < $60 | Pause |
| I1 | Influencer gifting | $650 | 10 h | ≥5 posts | Stop gifting |
| I2 | Influencer conversion | $0 | — | ≥15 orders | Treat as creative sourcing |
| I3 | Creator footage as ads | incl. | — | Creator creative wins | Stop gifting for footage |
| | **Total cash at risk** | **~$2,360** | **~150 h** | | |

**$2,360 and 150 hours buys a complete, honest answer on every acquisition channel
available to this business.** If none of them clears the bar, that is a real
finding and it is worth every dollar — it saves you from spending $20,000 to
discover the same thing more slowly.

---

## 20. Budget scenarios

| | Bootstrap ($0/mo) | Modest ($400/mo) | Funded ($1,200/mo) |
|---|---|---|---|
| Share loop | ✅ | ✅ | ✅ |
| Pinterest | ✅ (4 h/wk) | ✅ | ✅ |
| FB groups + societies | ✅ (6 h/wk) | ✅ | ✅ |
| Short-form | ✅ (4 h/wk) | ✅ | ✅ (+ editor) |
| Free/cost prints for §3 and §12 | $135 | $300 | $600 |
| Meta | ✗ | Test only, then off unless M1 passes | $700/mo if M1 passes |
| Google | ✗ | Brand defence $60/mo | $250/mo |
| Influencer gifting | ✗ | 4 gifts/quarter | 10 gifts/quarter |
| **Realistic time to $1k/mo** `[ASSUMPTION]` | 5–8 months | 3–5 months | 2–4 months, **if and only if M1 passes** |

Note the funded column is not much faster than the modest one. That is the honest
shape of this business: **paid money does not buy much speed here unless the Meta
CPA arithmetic (§13.1) lands in its optimistic column.** The bootstrap path is
slower but nearly as likely to arrive, which is an argument for spending less than
you can afford until M is measured.

---

## 21. Measurement and attribution

At 11–53 orders/month, attribution is statistically hopeless with any standard
tool. Do the cheap, robust thing:

| Method | Use for | Note |
|---|---|---|
| **UTM on every link** | Channel-level truth | Self-hosted analytics in Postgres (`docs/00`) makes the join to orders free |
| **Unique codes** (societies, influencers, groups) | Anything offline or dark-social | The only reliable attribution for community channels |
| **"How did you hear about us?" — one optional free-text field at checkout** | Everything else | At this volume, **the single most useful attribution instrument you have.** People answer honestly. Read every one. |
| **Orders per chart (M)** | The business's health | The headline metric. Report it monthly next to revenue. |
| **Builder-start rate by landing page** | Traffic quality | Distinguishes browsers from buyers long before orders are readable |

**Do not** buy an attribution platform. Do not run multi-touch models on 20
conversions. The variance swamps the signal and you will make confident wrong
decisions.

### 21.1 The weekly dashboard — six numbers

| Metric | Why it's on the list |
|---|---|
| Charts started | Top of the real funnel |
| % of started charts reaching ≥5 names | **The core assumption, measured weekly** |
| Charts saved | The reactivation asset |
| Share links created / saved chart | Loop health |
| Orders, and **orders per chart (M)** | The business |
| Blended CAC (all spend ÷ new-chart orders) | Against the §1.2 ceiling |

If a metric isn't on this list, don't put it on the dashboard.

---

## 22. Things never to do

| Never | Why |
|---|---|
| Sell a print-ready digital file standalone | It IS the poster. `docs/02` §5.3. Post-purchase add-on or bundled with 24×36 only. |
| Run a sitewide % discount on the print | Funds itself out of the margin that pays for the reprint guarantee, and signals the gift is cheap. `docs/02` §11.3. |
| Proactively advertise into grief | Memorial charts serve a real need and should be findable. They must never be pushed. The line is: they come to us. |
| Cold-DM group members at scale | Gets accounts restricted and makes you the thing you're competing against |
| Post promotional content without disclosure | These communities detect astroturf instantly and the ban is permanent |
| Extend a spend cap because it's "nearly working" | The caps in §19 are the entire value of the experimental design |
| Chase TikTok follower count | The demographic isn't there. The videos are ad creative and reach plays, not audience-building. |
| Buy an attribution platform, a Pinterest scheduler, or an email tool before proving the channel | Tool purchases are the most common form of pretending to work |
| Model paid scaling linearly | §6.3 |
| Treat a Christmas month as product-market fit | §5.1 |

---

## 23. Where this plan is weakest — stated plainly

1. **Every conversion rate, CPM and response rate in this document is invented
   from general experience, not measured.** The §13.1 CPA table spans $16 to $439
   — a 27× range — which is an honest reflection of how little is known and a
   dishonest basis for any budget. The first 30 days of real data should replace
   most of this document's numbers, and several of its conclusions.

2. **The whole plan is downstream of a question no channel can answer: will she
   type in 15 names?** §3.6 is the only gate that matters, and it comes before
   everything else here. If it fails, sections 8–17 are wasted paper. The
   temptation to start Pinterest before running §3 should be resisted, because
   Pinterest will produce enough encouraging vanity metrics to obscure a failing
   product.

3. **Pinterest is load-bearing and unproven.** It carries the largest share of
   free orders in every scenario in §5 and §6, on the strength of a demographic
   argument and nothing else. If P1 fails, there is no free channel of comparable
   ceiling to replace it, and the plan quietly becomes "paid or nothing" — which
   §13.1 suggests may not work. **This is the single biggest structural risk in
   the document** and it deserves to be tested early rather than in month four.

4. **M (orders per chart) is assumed at 1.6 and could easily be 1.0.** Every CAC
   ceiling, every budget and the entire argument for paid acquisition rests on it.
   L3 measures it, but L3 needs ~50 orders to read, which means the number that
   governs the budget arrives *after* much of the budget has been spent. There is
   no clean way around this; the mitigation is to spend the minimum until it reads.

5. **The time budget is not credible for one person.** Pinterest (4 h/wk) +
   Facebook groups (6 h/wk) + short-form (4 h/wk) + societies + ads management +
   support + the concierge programme is comfortably a full-time job, and it
   competes directly with the ~95 hours of content in `docs/07` and with building
   the product itself. Something in here will not get done. Decide *now* which
   thing it is, rather than discovering it in October. The honest recommendation:
   **cut Reddit and short-form to zero if forced, keep Pinterest and societies.**

6. **The Christmas 2026 window may already be too tight.** Gift-guide pitching
   should have gone out in July; it is 12 August. The Christmas campaign needs to
   start 1 October, which leaves seven weeks to build the product, run §3, source
   photography, and seed Pinterest. If the product isn't ready by mid-September,
   **the correct decision is to treat Christmas 2026 as a small test and aim the
   real launch at Mother's Day 2027** — a worse but survivable outcome, and far
   better than a rushed Christmas that produces bad prints and bad reviews.

7. **No supplier pricing has been verified** (`docs/01` §7.4). If landed COGS is
   20% worse than modelled, contribution per order drops to ~$40, the CAC ceiling
   at M=1.6 falls to ~$32, and Meta becomes unambiguously unaffordable. Verify
   before Stage 1 of §13, not after.
