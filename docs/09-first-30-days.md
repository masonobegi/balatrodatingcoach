# Phase 9 — First 30 days

**Kinline. The plan for turning a repo full of assumptions into either a running business or an honest, cheap "no".**

---

## 0. How to read this document

This is a work plan, not a strategy document. Every other doc in this repo argues about what
*should* be true. This one says what you do on Tuesday.

Three labels are used, same as everywhere else in the repo:

| Label | Meaning |
|---|---|
| `[FIXED]` | A published price, a contractual constraint, or a decision already made in Phases 0–8. |
| `[ASSUMPTION]` | A modelled number. Reasoned, stated, and **wrong until you verify it**. |
| `[RULE OF THUMB]` | A category heuristic. Directionally useful, never load-bearing alone. |

**The thesis of this month, in one sentence:** you have already written ~2,000 lines of chart
renderer and 160KB of planning against a business whose single largest assumption — *will a gift
buyer type in 15 names?* — has never been tested on a human being, and the entire purpose of the
next seven days is to test it for about $50 before you write the checkout.

**The bar you are aiming at.** $1,000/month is **~11 orders/month at a $95 AOV**. One order every
three days. That is a modest bar and it should never be described as anything else. Thirty days is
*not enough time to hit it*, and this plan does not pretend otherwise — Day 30 is judged on leading
indicators, not on revenue. See §9.

**The two things that must happen in Week 1, before anything else:**

1. **The 15-Names Test** (§3.2) — ~$50, one week, tests the assumption everything rests on.
2. **Supplier sample orders from Prodigi *and* Gelato** (§3.3) — ordered on **Day 1**, because
   they take 5–10 days to arrive and no COGS number in this repo has ever been verified against a
   live price list. You cannot price the catalogue until these land.

Everything else in this document is subordinate to those two.

---

## 1. The shape of the month

| Week | Days | Theme | The one thing that must be true at the end |
|---|---|---|---|
| **1** | 1–7 | **Test, don't build.** Throwaway prototype + demand test + supplier samples ordered. | You know whether a real stranger will type in the names, and your samples are in transit. |
| **2** | 8–14 | **Build the real builder + verify the economics.** Samples land; COGS becomes fact. | The builder is real, the supplier is chosen, and the price ladder has been re-run on verified costs. |
| **3** | 15–21 | **Checkout, fulfilment, and one real order — placed by you.** | You have bought your own product with a real card and held the result. |
| **4** | 22–30 | **Launch small, to real people, for real money.** | At least one stranger has paid. |

### 1.1 Calendar, if you start today

Today is **Wednesday 12 August 2026**. Anchoring Day 1 to today:

| Week | Dates (2026) |
|---|---|
| Week 1 | Wed 12 Aug – Tue 18 Aug |
| Week 2 | Wed 19 Aug – Tue 25 Aug |
| Week 3 | Wed 26 Aug – Tue 1 Sep |
| Week 4 | Wed 2 Sep – Thu 10 Sep (Day 30) |

**Why the date matters and is not decoration.** Christmas is the single largest occasion in this
business (Phase 2 §2). Gift-search traffic in this category begins to lift around **1 November**
`[RULE OF THUMB]` and the print-on-demand Christmas order-by cutoff will land around
**12–15 December** once you add production time to carrier time (Phase 2 §8.4). Finishing this plan
on **10 September** leaves roughly **7 weeks** of runway before the season starts and **14 weeks**
before the cutoff. That buffer is the entire reason for the 30-day discipline. Spend six weeks
coding the builder instead and you arrive at the season with an untested product and no photographs.

Only two items in the whole month are genuinely date-sensitive:

- **Order supplier samples on Day 1.** Not Day 3. Shipping time is the long pole and it is not
  compressible.
- **Do not field the demand study on a Friday night.** Field it Sunday evening or a weekday morning
  so responses land while you are awake to watch them.

### 1.2 Time budget

This plan assumes **~25 hours/week** — roughly a serious evenings-and-weekends commitment, or three
full days a week. Be honest with yourself about this number now, because it is the input that
breaks everything downstream.

| Week | Dev hours | Business/ops hours | Total |
|---|---|---|---|
| 1 | 14 | 11 | 25 |
| 2 | 18 | 8 | 26 |
| 3 | 17 | 8 | 25 |
| 4 | 8 | 17 | 25 |
| **Total** | **57** | **44** | **~101** |

**If you have 10 hours/week, this is a 75-day plan, not a 30-day plan.** That lands you at
~25 October — still (just) before the season, with zero buffer for anything going wrong. In that
case cut scope, not weeks: ship the fan chart only, one size, unframed only, no framing SKU, no
GEDCOM path. Do not cut Week 1.

### 1.3 Money budget

| Item | Modelled cost | Label | Notes |
|---|---|---|---|
| Domain (.com, 1 yr) | $15 | `[ASSUMPTION]` | Registrar-dependent; $10–45 |
| Email hosting on the domain (1 mo) | $1–7 | `[ASSUMPTION]` | Zoho Mail Lite ≈ $1.25/user/mo; Google Workspace ≈ $7 |
| **15-Names Test — participant panel** | **$50** | `[ASSUMPTION]` | See §3.2.6 for the maths and the fallback if it lands over |
| Prodigi samples (18×24 unframed + 12×18 framed) | ~$80 | `[ASSUMPTION]` | Phase 2 §9.1 modelled $60–120 for both suppliers combined; assume worse |
| Gelato samples (same two SKUs) | ~$80 | `[ASSUMPTION]` | |
| Local "bypass benchmark" print (§3.3.4) | ~$15 | `[ASSUMPTION]` | Costco/Staples/local large-format, 18×24 |
| Vercel Pro (from Week 3) | $20 | `[FIXED]` | Hobby forbids commercial payment processing |
| Neon Postgres Launch | $5 | `[FIXED]` | |
| Cloudflare R2 | ~$0.50 | `[FIXED]` | |
| Resend | $0 | `[FIXED]` | Free tier, 3k emails/mo |
| Your own test order through your own store | ~$32 net cash out | `[ASSUMPTION]` | You pay $85ish, most returns to you minus Stripe fees + real COGS |
| **Subtotal** | **~$300** | | |
| Contingency / reprints / a second sample | $50–150 | | |
| **Total** | **$350–450** | | Excludes entity formation (§7.2) |

**What is deliberately *not* in this budget: acquisition spend.** Phase 3 §9 concluded that paid
acquisition does not work at any conversion rate we can honestly assume (break-even CAC ~$49–64;
modelled CAC $168). That conclusion is correct on the modelled numbers, but it has an uncomfortable
consequence which is discussed honestly in §10.5: **you will exit 30 days knowing whether the
product works and knowing nothing about how anyone finds it.** There is a recommended $100–150
channel probe in Week 4 (§6.4) to partially close that gap.

---

## 2. Week 1 — Test, don't build

**Rule for the week: no production code.** Everything you write this week is throwaway and you
should mark it as such (a `prototype/` directory, deleted on Day 15). The temptation to "just build
the real builder, it's basically the same thing" is the exact failure mode this document exists to
prevent. It is not the same thing. The real builder needs persistence, resumability, a share model,
mobile polish, error states, and a design system. The prototype needs none of that and building it
properly costs you the week.

You already have `lib/chart/` — a fan layout, a tree layout, an SVG renderer, font metrics, and a
text fitter. That is the hard part and it is done. The prototype is a form plus a call into it.

---

### 2.1 Day 1 (Wed) — the accounts sprint and the sample order

**Target: 6 hours. Everything in this section happens today, in this order.**

The ordering is not arbitrary: the domain gates the email, the email gates the supplier accounts,
and the supplier accounts gate the sample order, which is the item with the longest lead time.

| # | Task | Time | Blocks |
|---|---|---|---|
| 1 | Register the domain. Point DNS at Cloudflare. | 30 min | Everything |
| 2 | Set up email on the domain (`hello@`, `support@`). | 30 min | Supplier + Stripe accounts |
| 3 | USPTO/EUIPO knockout search on "Kinline" (Class 16 printed matter, Class 42 software). | 30 min | Brand asset spend, *not* launch |
| 4 | Create Prodigi account + Gelato account. | 30 min | The sample order |
| 5 | **Produce the sample print file** (§2.1.1). | 90 min | The sample order |
| 6 | **Place both sample orders.** | 45 min | The whole pricing gate |
| 7 | Claim social handles: Pinterest (business), Instagram, Facebook Page, TikTok, X. | 45 min | Nothing today; prevents name loss |
| 8 | Google Search Console, Bing Webmaster Tools, Google Ads account (no spend — for Keyword Planner). | 30 min | The Day 6 keyword pass |
| 9 | Put a one-page "coming soon" up at the domain with a real contact email. | 30 min | Stripe review in Week 2 |

Item 9 is small and worth doing today: Stripe's review process can ask to see the site, and a live
page with a contact address and a plain description of what you sell is faster to approve than a
404.

#### 2.1.1 The sample print file — build a press test, not a pretty picture

Do not send the supplier a nice-looking chart. Send a chart **plus a QA strip**, because these two
prints are the only chance you get to learn the physical limits of the product before you commit to
a catalogue.

Extend `scripts/preview.ts` to emit an 18×24 and a 12×18 print file at 300 dpi (18×24 at 300 dpi is
5400×7200 px — check `@resvg/resvg-js` memory behaviour at that size before you assume it works;
if it chokes, emit vector PDF instead, which the fine-art suppliers generally prefer anyway).

The file must contain, in a strip along the bottom edge (croppable, but leave it in — you are the
customer):

| Element | Why |
|---|---|
| Name text set at 5pt, 6pt, 7pt, 8pt, 9pt | **The single most valuable output of this exercise.** A 6-generation fan is 63 names; the minimum legible printed type size determines how many generations fit on each paper size, which is a catalogue decision worth real money. |
| A long hyphenated surname and a name with diacritics at each size | Your text fitter (`lib/chart/text.ts`) truncates and hyphenates; check what that looks like in ink |
| 100% black patch, 90%, 75%, 50%, 25%, 10%, 5% grey patches | Tells you whether your background tints survive; 5% grey often prints as white |
| Hairline rules at 0.25pt, 0.5pt, 0.75pt, 1pt | Fan chart ring dividers. 0.25pt frequently disappears |
| A small colour bar (whatever accent colours your themes use) | Colour accuracy vs. what you designed on screen |
| Your two candidate themes side by side | Paper warmth changes theme choice more than you expect |

Use a **real family tree** in the sample — your own, or a public-domain one — with realistic gaps
(a missing great-grandmother, a name you only have an initial for). A sample chart with all 15 slots
neatly filled is a lie you will tell yourself for three months.

#### 2.1.2 Placing the sample orders

Order **the same two SKUs from both suppliers**, from the same file:

| SKU | Why this one |
|---|---|
| **18×24 unframed** | The volume SKU. Phase 3's AOV model leans on it. |
| **12×18 framed** | The cheapest way to inspect frame quality, glazing, moulding, and framed packaging. The framing upsell is Phase 3's #1 flagged risk (break-even at $41–45 incremental delivered cost against a $38.70 model). |

Four prints total, ~$160 `[ASSUMPTION]`.

**Ship them to a residential address as a normal retail customer would.** You are testing the
unboxing a grandmother gets, not the sample a merchant gets. Note specifically:

- Is the packaging white-label, or does it carry the supplier's branding? *This is disqualifying for
  a gift shipped directly to the recipient, which is a large fraction of gift orders.*
- Tube or flat? A rolled 24×36 that will not lie flat is a returns problem.
- Is there a packing slip with someone else's brand on it?

---

### 2.2 Days 2–3 (Thu–Fri) — build the throwaway prototype

**Target: 12 hours. Scope is brutal and the scope is the point.**

#### 2.2.1 What the prototype is

A single page, at a temporary URL, with no accounts, no payment, no navigation. Vercel **Hobby** is
acceptable here because there is no commercial transaction — move to Pro before any checkout code
exists `[FIXED — Vercel Hobby terms forbid commercial payment processing]`.

| In scope | Out of scope |
|---|---|
| Name fields for 4 generations (15 slots), progressively revealed | Accounts, login, save/resume |
| **Live preview of the actual poster**, updating as they type | Themes, layout choice, tree layout |
| Graceful "unknown" state — the chart must look *good* with gaps | Sizes, framing, any pricing |
| An explicit **"I'm done / I can't do any more"** button, visible at all times | Share links |
| Mobile-first layout that actually works on a 390px viewport | Desktop polish |
| Event instrumentation (§2.2.2) | Anything that looks like a real brand |
| A short privacy notice (you are collecting behavioural data from UK/EU participants) | Terms, returns, legal pages |

Two of these are non-negotiable for the test's validity and it is worth being explicit about why:

**The live preview must be there.** The preview is the emotional payoff and the only reason anyone
would keep typing. A test without it measures data entry, which nobody enjoys, and would fail for
reasons that tell you nothing.

**Unknowns must look designed, not broken.** If a participant quits because the chart looks damaged
when their great-grandmother's slot is empty, you have measured a design defect and mislabelled it a
demand defect. Ship a deliberate empty state — a soft ruled placeholder, "unknown", something that
reads as intentional.

#### 2.2.2 Instrumentation — the whole test lives or dies here

One Postgres table. **Store name lengths, never names.** You have no reason to hold a stranger's
family data for a throwaway test, and not holding it removes a GDPR question entirely.

```sql
create table test_event (
  id          bigserial primary key,
  session_id  uuid        not null,
  ts          timestamptz not null default now(),
  event       text        not null,   -- see below
  field_key   text,                   -- 'self','father','mother','ff','fm','mf','mm','fff',...
  value_len   int,                    -- LENGTH ONLY. Never the value.
  meta        jsonb                   -- { device, viewport, arm, prolific_pid }
);
create index on test_event (session_id, ts);
```

Events to emit:

| Event | Emitted when | Carries |
|---|---|---|
| `session_start` | Page load | device, viewport, arm (`paid` / `unpaid` / `pilot`) |
| `field_focus` | First keystroke in a slot | `field_key` |
| `field_commit` | Blur with non-empty value | `field_key`, `value_len` |
| `field_unknown` | "I don't know" clicked on a slot | `field_key` |
| `field_clear` | Committed value later emptied | `field_key` |
| `gen_reached` | First commit in generation N | N |
| `preview_render` | Preview redrawn | slots filled |
| `escape_click` | The "I'm done / I can't" button | slots filled at that moment |
| `session_end` | Unload or explicit finish | slots filled, elapsed ms |
| `free_text` | Final question answered | `value_len` + the text (this one you *do* store) |

Final question, mandatory, one field, no options:

> **"What, if anything, made you want to stop? Be blunt — we are not offended."**

Fifteen honest answers to that question will teach you more than the numbers. Read every one.

---

### 2.3 Day 4 (Sat) — pilot with three humans in the room

**Target: 3 hours.** Before you spend the $50, watch three people use it while sitting next to them.
Ideally three people who match the persona (women 35–60 who are not engineers). If you cannot find
three, two will do; zero will not.

Rules:

- **Say nothing.** No "you just click there". Every word you say is a word the paid participants
  will not have.
- Write down every place they hesitate for more than three seconds.
- Fix only the show-stoppers on Day 5 morning: things that block completion, not things that annoy
  you aesthetically.

Common show-stoppers to expect `[ASSUMPTION — from general usability experience, not from this
product]`: unclear which slot is whose parent; no way to say "I don't know"; mobile keyboard covering
the preview; no indication of how many more fields there are.

That last one matters enormously and deserves a decision now: **do you show the participant that
there are 15 slots, or do you reveal them progressively?** Show the full scope. If a visible 15-slot
form causes abandonment, that is a finding you need — hiding the work to improve your completion
rate is how you fool yourself for four months.

---

### 2.4 Day 5 (Sun) — field the test

**Target: 2 hours to launch it, then leave it alone.**

Full specification of the test is §3.2. Launch it Sunday evening; responses on a consumer panel
typically arrive within hours `[ASSUMPTION]`.

Simultaneously launch the free arm: post the link in 2–3 places where the persona actually is —
family-history Facebook groups (ask the moderators first; unasked promo posts get you banned and
banned is expensive), a relevant subreddit if the rules allow, and your own social accounts. Frame
it as *"I'm building this, would you try it and tell me where it breaks"* — which is true.

---

### 2.5 Day 6 (Mon) — keyword pass while the data comes in

**Target: 2 hours.** This is Phase 7 §2 and it is currently undone. Run the 18-term seed list
through Google Keyword Planner, Bing Webmaster Tools, Google autocomplete, Etsy autocomplete,
Pinterest autocomplete, and Amazon autocomplete. Record volume bands and — more usefully — the exact
phrasing real people use.

Kill signal, from Phase 7 §10: if purchase-intent terms return negligible volume across **all six**
tools, organic search is not a channel here, and discovery rests entirely on paid (which the margin
cannot fund) plus the share loop (which cannot cold-start). That is a finding worth having in
Week 1 rather than Month 5.

---

### 2.6 Day 7 (Tue) — read the data, write the verdict, commit it

**Target: 3 hours.** Compute the five metrics in §3.2.5, compare them to the thresholds you
pre-registered on Day 5 (§3.2.4), read all fifteen free-text answers, and write a verdict of no more
than one page into the repo.

**Then act on the verdict.** The whole point of the week is that the verdict changes what happens
next, and if you have already decided to proceed regardless, you have spent $50 on theatre.

---

## 3. Week 1's two load-bearing experiments, in full

### 3.1 Why these two and nothing else

Everything else in this repo can be wrong by 30% and the business survives. These two cannot:

| Assumption | If it is wrong | Cost to test now | Cost to discover in month 4 |
|---|---|---|---|
| A gift buyer will type in 15 names | There is no product. The renderer, the brand, the SEO plan — all of it is worthless. | ~$50 + 1 week | ~6 weeks of build + whatever you spent on brand and ads |
| Landed COGS is roughly what Phase 2/3 modelled | The price ladder is wrong, the framing upsell may be loss-making, and every margin number in Phase 3 is fiction | ~$160 + shipping time | You find out via a negative-margin month, having advertised the wrong prices |

---

### 3.2 The 15-Names Test

#### 3.2.1 The question, stated precisely

Not "do people like family trees" — they do, and knowing it is worth nothing. The question is:

> **Will a woman aged 35–60 who has never heard of a GEDCOM file, given a live preview of a
> beautiful chart and no assistance, enter enough of her own ancestors' names to produce a
> saleable chart — and how far back does she get before she stops?**

The second half of that question is as important as the first, because it determines the *product*,
not just its viability. If everyone stops at grandparents, Kinline is a 7-name product with a
share-to-fill-the-gaps loop, not a 15-name product. That is still a business. It is a different
business from the one currently specified.

#### 3.2.2 Design

| Parameter | Value | Reasoning |
|---|---|---|
| Method | Unmoderated remote behavioural test on a paid panel (Prolific or equivalent) | Cheapest way to reach real strangers in the persona. Moderated tests cost 10× and n=5. |
| n (paid arm) | **15** | Budget-determined, see §3.2.6 |
| n (unpaid arm) | 5–15, uncontrolled | Free. Worse sampling, better honesty (nobody paid them) |
| n (pilot arm) | 3 | Observed in person, Day 4 |
| Screener | Female, 35–60, US or UK, **not** currently using Ancestry/MyHeritage/FamilySearch | The last clause matters: a genealogy hobbyist passing this test proves nothing about the gift buyer |
| Task length | Advertised as ~10 minutes | |
| Payment | **Full payment regardless of completion, stated prominently before they start** | This is the most important design decision in the test — see below |
| Incentive framing | No mention of a purchase, a price, or a gift | Asking "would you buy this for $79" produces stated-preference garbage. Do not ask. |

**Why you pay them in full whether or not they finish.** A paid participant who *must* complete to
get paid will always complete — you would be measuring compliance, not willingness, and the result
would be a comforting number that means nothing. By paying in full up front and putting a prominent
"I'm done / I can't do any more" button on the page, quitting becomes free, and the abandonment data
becomes real. This single design choice is the difference between a test and a placebo.

**Task instructions** (give them exactly this, and nothing more):

> We're building a tool that turns your family tree into a printed chart. Please try it with **your
> own real family** — go back as far as you actually can from memory. Don't look anything up, don't
> phone anyone.
>
> **You will be paid in full whether you finish or not.** If at any point you'd rather stop, press
> "I'm done" — that's genuinely useful to us, and it's not a failure.
>
> When you're finished (or when you stop), there's one question at the end.

#### 3.2.3 The three arms and what each is for

| Arm | n | Cost | Answers |
|---|---|---|---|
| **Pilot** (in person, Day 4) | 3 | $0 | Where does it break? Watching beats logging. |
| **Paid panel** (Days 5–7) | 15 | ~$50 | Will a stranger in the persona do it, unassisted? |
| **Unpaid / organic** (Days 5–7) | 5–15 | $0 | Will someone with *no* incentive at all do it? A single unpaid completion from a stranger is worth several paid ones. |

#### 3.2.4 Pre-register the thresholds — Day 5, before any data arrives

Write the following table into the repo and **commit it before you launch the study**. Adjusting a
threshold after seeing the data is the single easiest way to spend the next four months building
something the test already told you not to build.

Definitions (slots: `self`, 2 parents, 4 grandparents, 8 great-grandparents = 15):

- **M1 — Grandparent completion.** All 4 grandparent slots *resolved* (typed or explicitly marked
  unknown) **and** ≥5 of the 7 generation-1-to-3 slots actually typed.
- **M2 — Great-grandparent attempt.** ≥1 name typed in generation 4.
- **M3 — Full chart.** All 15 slots resolved **and** ≥10 typed.
- **M4 — Median time** from first keystroke to M1.
- **M5 — Escape-hatch rate before M1.**

| Metric | **PASS** | **AMBIGUOUS** | **FAIL** |
|---|---|---|---|
| M1 — grandparent completion | ≥ 11/15 (73%) | 7–10/15 | ≤ 6/15 (40%) |
| M2 — great-grandparent attempt | ≥ 9/15 | 5–8/15 | ≤ 4/15 |
| M3 — full 15 | ≥ 5/15 | 2–4/15 | ≤ 1/15 |
| M4 — median time to M1 | ≤ 6 min | 6–12 min | > 12 min |
| M5 — quit before M1 | ≤ 2/15 | 3–5/15 | ≥ 6/15 |

**Overall rule:**

- **PASS** = M1 passes **and** M4 does not fail.
- **FAIL** = M1 fails **or** M5 fails.
- Anything else = **AMBIGUOUS**, which is the most likely outcome and has its own playbook below.

#### 3.2.5 What each verdict means and what you do on Day 8

| Verdict | Interpretation | Day 8 action |
|---|---|---|
| **PASS** | The core assumption survives its first contact with reality. Not proven — survived. | Proceed with Weeks 2–4 exactly as written. |
| **AMBIGUOUS** — people type freely but stall at generation 4 | This is the **knowledge wall**, not a willingness problem. It is the outcome the business was designed for, and it validates the share loop rather than invalidating the product. | Two changes, both cheap and both promotions of things already in the plan: (1) the **default product becomes a 3-generation, 7-name chart**, with generation 4 as an optional extension, and the 12×18 is repositioned around it; (2) the **share-to-ask link becomes a Week 2 P0**, not a Week 3 nice-to-have — it is now the mechanism that completes the chart, and it was always the growth engine. |
| **AMBIGUOUS** — people are willing but slow (M4 6–12 min) | Data entry UX is the constraint. Fixable. | Week 2 dev priority shifts to entry speed: keyboard-first flow, autocomplete on surnames already entered, one-tap "same surname as father". |
| **FAIL** | The gift buyer will not do the work. As specified, there is no product. | **Do not build the checkout.** Run the $0 follow-up in §3.2.7 before you conclude anything final. |

#### 3.2.6 The $50, in detail

`[ASSUMPTION — panel pricing changes; verify on the day you book it]`

Modelled on Prolific's published structure as understood at time of writing: a minimum hourly rate
around **£9/hr**, plus a platform service fee around **33%** on top of participant pay, plus VAT
where applicable.

| Line | Modelled | Note |
|---|---|---|
| Task length advertised | 10 min | Keep it honest; over-running annoys panels and gets you flagged |
| Participant pay @ £9/hr | £1.50 each | |
| Platform fee @ 33% | £0.50 each | |
| Cost per participant | **£2.00 ≈ $2.60** | at ~1.30 USD/GBP `[ASSUMPTION]` |
| × 15 participants | **£30 ≈ $39** | |
| Screening / representative-sample premium | +$5–15 | Varies by plan |
| **Total** | **~$45–55** | |

**If it prices out above $60:** run **12** participants, not 15, and take the loss in precision.
Do not run 8 — below about 10 the test stops being able to detect even a catastrophe.

**If the panel is unavailable in your region**, in descending order of preference:
(1) any equivalent research panel with a screener; (2) a $10 gift card offered in three relevant
Facebook groups (worse sampling — self-selected people who are interested in family history, which
is exactly the bias you are trying to avoid, so weight the result down heavily); (3) more in-person
sessions with strangers, which is free and slow.

#### 3.2.7 The honest statistics — read this before you over-interpret the result

**n=15 is a smoke alarm, not a thermometer.**

With 15 participants, a measured completion rate of 60% carries roughly a ±25 percentage-point
confidence interval `[standard binomial]`. This test **cannot** tell you whether the true rate is
45% or 70%. It **can** tell you, with real confidence, whether it is 10% or 70% — and that is the
only distinction that matters right now, because 10% kills the business and 70% funds it.

Two further limitations you must hold in your head when reading the result:

1. **A paid participant is not a buyer.** Completing a task for money proves *capability and
   tolerance*, not purchase intent. Nothing in Week 1 tests whether anyone will pay. That is Week 4's
   job and it is a much harder test.
2. **Panels skew desktop; your buyer is probably on a phone.** Log `device` on every session. If
   your paid arm is 80% desktop, deliberately push at least 5 of the unpaid arm onto mobile, and
   read the mobile completion rate separately even though the n is tiny.

#### 3.2.8 If it fails — the $0 follow-up before you quit

A FAIL on the 15-name task does not automatically mean a FAIL on the business. Before abandoning,
spend one day and no money:

**Re-run the identical test with the burden halved** — 3 generations, 7 slots, on the pilot arm plus
whatever unpaid participants you can find. If a 7-name chart passes comfortably, then Kinline is a
7-name product: a grandparents chart, priced the same, with the share loop as the route to
generation 4 for the people who want it. That is a legitimate and possibly better business.

If **even 7 names fails**, you are done, and you are done having spent about $400 and one week
instead of six weeks and a brand identity. Write it up in `docs/12-failure-detection.md`, close the
repo, and take the finding seriously the first time.

---

### 3.3 Supplier verification — the sample orders

#### 3.3.1 Why this is Week 1 and not Week 3

Every COGS figure in Phases 2 and 3 is `[ASSUMPTION]`. Phase 3's headline finding is that the +$50
framing uplift breaks even at a **$41–45 incremental delivered cost** and is modelled at **$38.70** —
a margin of $3–7 on a number nobody has verified. At 24×36 the modelled framing increment is already
**$48**, i.e. **loss-making before verification**. You cannot publish a price list until these
numbers are real, and the prints take 5–10 days to arrive. Hence Day 1.

#### 3.3.2 The reconciliation table — fill this in when they land

Print this out. **"True delivered cost" is not the price on the product page** — it is everything you
actually pay to put the object in a customer's hands.

| Field | Prodigi 18×24 unframed | Gelato 18×24 unframed | Prodigi 12×18 framed | Gelato 12×18 framed |
|---|---|---|---|---|
| List unit price | | | | |
| Shipping charged to me | | | | |
| Per-order handling fee | | | | |
| FX / currency conversion cost | | | | |
| Tax charged (and is it recoverable?) | | | | |
| **TRUE delivered cost** | | | | |
| Model said (Phase 3 §1.2) | $27 | $27 | $50 | $50 |
| **Variance vs. model** | | | | |
| Order placed (date/time) | | | | |
| Dispatched | | | | |
| Delivered | | | | |
| **Elapsed calendar days, door to door** | | | | |
| Paper stock name + gsm | | | | |
| Colour accuracy vs. screen proof (1–5) | | | | |
| **Text crispness at 6pt (1–5)** | | | | |
| Smallest type size still legible at arm's length | | | | |
| Hairline: does 0.25pt survive? | | | | |
| 5% grey: does it print, or vanish? | | | | |
| Packaging: tube/flat, condition on arrival | | | | |
| **White-label? (any supplier branding?)** | | | | |
| Frame: moulding material, glazing (acrylic/glass), hardware | — | — | | |
| **Would you give this to your own mother? Y/N** | | | | |

#### 3.3.3 The decision rule

Choose in this order, and note that the first criterion is not the one POD comparison articles use:

1. **Text crispness at small sizes.** A fan chart is 90% small type. A supplier whose 6pt is mushy
   costs you a generation of chart depth on every size, which is a catalogue-level loss. This is the
   deciding criterion and almost nobody else buying POD prints cares about it.
2. **"Would you give this to your own mother?"** If the answer is no, the price is irrelevant.
3. **True delivered cost**, from the table above.
4. **Elapsed door-to-door days**, because Christmas cutoffs are a published promise (Phase 2 §8.4).
5. **White-label packaging**, which is a hard requirement for direct-to-recipient gift shipping.

Phase 2 §9.1 nominated Prodigi as primary on reasoning alone. **Treat that as a hypothesis, not a
decision.** If Gelato's 6pt type is visibly better, Gelato wins and the doc gets updated.

Whatever you choose, honour Phase 2 §9.2: store an internal SKU, map it to supplier SKUs in config,
so failover is an environment variable and not a sprint. Do this in Week 2 while you still remember
why.

#### 3.3.4 The bypass benchmark — $15 that tests the whole positioning

Take the *same file* to Costco, Staples, or a local large-format printer and have it printed at
18×24 for ~$15. Put it next to the supplier samples on a table.

This is the physical version of the GEDCOM-literacy squeeze from the decision brief. If you cannot
tell the difference from four feet away, then **"archival quality" is a story rather than a fact**,
and the pricing rests entirely on design judgement plus convenience — which is defensible, but it
changes the copy on every page and it means the paper upgrade is not worth paying for. Better to know
that on Day 12 than to build a brand on a claim your own eyes disprove.

#### 3.3.5 Also verify, while you are in the supplier dashboards

| Item | Why it matters | Where it bites |
|---|---|---|
| Do they offer gift wrap / an insert card? | The $8 SKU does not exist otherwise | Phase 2 §9.3 |
| Will they put **N prints in one package**? | Phase 3's multi-copy discount ladder assumes extra copies carry print-only cost with no extra shipping. If they ship separately, the 2nd/3rd copy discounts are margin-negative. | Phase 3 §1.4 — **this is the second-most-important unverified assumption after framing** |
| Sandbox/test API credentials | You will need them eventually, not this month | |
| Stated production SLA vs. what actually happened | Your Christmas promise depends on it | Phase 2 §8.4 |
| Minimum order / subscription tiers | Gelato has tiered pricing | Phase 2 §9.1 |

---

## 4. Week 2 (Days 8–14) — build the real builder, verify the economics

**Dev 18h / business 8h.** Delete `prototype/` on Day 15, not before — you may want to re-read the
code.

### 4.1 Development

| Day | Task | Definition of done |
|---|---|---|
| 8 | Data model + migrations. `chart`, `person`, `chart_event`. Chart keyed by an unguessable token — **no accounts, no passwords, no login** in month 1. | `npm run db:migrate` clean; a chart survives a page refresh |
| 9 | Builder v1: entry flow rebuilt with Week 1's findings applied. Autosave on every commit. | A chart can be built, closed, and resumed from the token URL |
| 9–10 | The unknown/gap state, designed properly. | A chart with 6 of 15 slots filled looks *deliberate* and worth printing |
| 10–11 | **Share link** — read-only view + "help me fill the gaps" + a "get your own copy" CTA. Promote to Day 9 if Week 1 returned the knowledge-wall verdict. | A relative can open the link on a phone, add a name, and the owner sees it |
| 11–12 | Design pass: typography, the two themes, the fan chart's small-type hierarchy, informed by what actually came back from the printer | You would hang it |
| 13 | Print-file generation: chart → 300 dpi print file → Cloudflare R2, with the supplier's bleed/margin spec applied | A file lands in R2 that the supplier accepts without complaint |
| 14 | Supplier SKU abstraction (Phase 2 §9.2) + mobile QA on a real phone, not a simulator | Config swap changes supplier |

**Explicitly not this week:** GEDCOM upload (the parser in `lib/chart/gedcom.ts` stays; it does not
get a route in the primary flow — see the decision brief on why a GEDCOM-first product sells to the
people most able to bypass you), user accounts, an admin dashboard, the supplier API integration,
multi-currency, and the blog.

### 4.2 Business

| Day | Task | Note |
|---|---|---|
| 8 | **Apply for the Stripe account.** | Do this on Day 8, not Day 20. Verification can take days and new accounts often sit on a 7–14 day rolling payout hold `[ASSUMPTION — varies by account]`. |
| 8 | Decide the entity: sole proprietor vs. LLC. Get an EIN if forming (free, online, usually instant, US). | You *can* start as a sole proprietor with a personal bank account. An LLC costs ~$50–500 depending on state `[ASSUMPTION]` and takes days. Not launch-blocking; do it before real volume. |
| 9 | Business bank account (if forming an entity). | Blocks Stripe payouts, not Stripe signup |
| 10 | Write the policies: returns (including the typo-forgiveness policy, Phase 2 §10.3), terms, privacy, shipping/delivery times. | Stripe review may ask for these |
| 12–13 | **Samples land. Fill in §3.3.2 in full.** | |
| 14 | **THE PRICING GATE — see §4.3** | |

### 4.3 The Day 14 pricing gate

Re-run Phase 3's model with the four verified numbers. Then apply these rules mechanically:

| Finding | Action | Why |
|---|---|---|
| Framing increment Δ **> $45** at any size | **Raise the framing uplift or drop that framed SKU.** | Phase 3 §5: break-even sits at $41–45. Above it you are paying for the privilege of shipping glass. |
| Framing Δ > $48 at 24×36 (the modelled value) | **Drop 24×36 framed from the launch catalogue.** | It is already modelled as loss-making at a flat +$50. Do not launch a SKU you know loses money. |
| Extra copies ship **separately** | **Cut the 2nd/3rd copy discounts to −15%/−20%**, or make them same-package-only | The whole ladder assumed shared shipping |
| Unframed 18×24 landed cost **> $35** | Raise the 18×24 price, or make 12×18 the hero SKU | 18×24 at $79 with $35 COGS is a 56% gross margin before Stripe — under the 60–68% target |
| Everything within ±15% of model | Publish the price ladder as written | |

**Do not launch on unverified COGS.** If the samples have not arrived by Day 14, the gate slips to
Day 18 and the Week 3 plan compresses. That is acceptable. Guessing is not.

---

## 5. Week 3 (Days 15–21) — checkout, fulfilment, and your own first order

**Dev 17h / business 8h.** Move to Vercel Pro before the first line of Stripe code — Hobby
contractually forbids commercial payment processing `[FIXED]`. Move Neon to the Launch plan
($5/mo) before any real order — free-tier compute can suspend until the next billing period, and a
suspended database during a checkout is an order you never see `[FIXED]`.

### 5.1 The build

| Day | Task | Definition of done |
|---|---|---|
| 15 | Product selection UI: size, framed/unframed, quantity, gift wrap. Pricing from `lib/pricing.ts`. | Prices match the Day 14 verified ladder |
| 16 | Stripe Checkout session + webhook + `order` table. Idempotent webhook handling. | A test-mode payment writes exactly one order row |
| 17 | Resend: order confirmation email with a preview image of the chart, and a shipped email with tracking. Verify the sending domain (SPF/DKIM/DMARC in Cloudflare DNS). | Both emails land in a Gmail inbox, not spam |
| 18 | Order status page at the token URL. | A customer can see where their order is without emailing you |
| 19 | **The fulfilment runbook** (§5.2) — written, not coded. | You can fulfil an order by hand in under 10 minutes |
| 20 | Landing page + the 5 highest-priority pages from Phase 7 §6. Legal pages published. Stripe Tax registered in your home state only. | Site reads like a business, not a demo |
| 21 | End-to-end rehearsal in Stripe test mode, then live. | |

### 5.2 Fulfil by hand. Do not build the supplier API integration this month.

At 11 orders/month, a supplier API integration is **negative-value work**: it costs 2–3 days,
introduces a failure mode you cannot debug at 2am in December, and saves roughly 90 minutes a month.
Build it at ~30 orders/month, when the manual process actually hurts.

**The manual runbook (target: under 10 minutes per order):**

1. Order-received email fires to you.
2. Open the chart at its admin URL. **Proof it as a human** — check for empty slots, obviously
   mistyped names ("Elizbeth"), an overflowing surname, a broken ring. Budget 5 minutes.
3. If something is wrong, email the customer before printing. *This is the single highest-value
   thing you do per order and it is exactly the labour that Etsy sellers charge for.*
4. Download the print file from R2.
5. Upload to the supplier dashboard, paste the shipping address, select the SKU, confirm.
6. Paste the supplier order ID into the order row.
7. When the supplier dispatches, paste the tracking number in; the shipped email fires.

Keep a physical or spreadsheet log of every order for the first 30. The pattern of what goes wrong is
the specification for the automation you build in month 3.

### 5.3 Buy your own product — Day 17, not Day 29

Place a **real order** through your own checkout, with a **real card**, for a **real chart of your
own family**, at the price on the page. Let it flow through the real fulfilment path to a real
address.

Order it on Day 17 so it arrives before Day 30. You need to have received the thing a customer
receives before you ask a stranger for $79. Net cash cost is roughly $32 `[ASSUMPTION]` — Stripe's
fees plus the actual COGS; the rest of the money is you paying yourself.

Check specifically: does the confirmation email look like a gift purchase or a receipt? Is the
delivery date honest? Does the package arrive in a state you would be happy for a grandmother to
open?

### 5.4 Photography — Days 20–21

You now own four to five physical prints. Photograph them properly, because every channel in Phase 7
and Phase 8 needs images and you cannot buy stock photos of your own product.

| Shot | Why |
|---|---|
| Framed print on a wall, in a real room, natural light | The hero image everywhere |
| Someone holding the print, hands visible | Scale. Buyers consistently misjudge poster size. |
| Close-up of the small type on the paper | The entire quality claim, in one image |
| The unboxing: tube/package, the print emerging | Answers "what will actually turn up?" |
| All three sizes side by side against a sofa or a doorway | The size guide that prevents returns |
| Vertical crops of every one of the above | Pinterest and Instagram are vertical `[FIXED — platform formats]` |

Phone camera, window light, a plain wall. Do not hire a photographer in month 1.

---

## 6. Week 4 (Days 22–30) — launch small, to real people, for real money

**Dev 8h / business 17h.** The ratio flips this week. If you find yourself coding on Day 26, you are
hiding.

### 6.1 The launch is small on purpose

You are not doing a "launch". You are attempting to get **the first stranger to pay**. Everything
else this week serves that.

| Day | Task |
|---|---|
| 22 | Warm list: personally message 20–30 people. Not a broadcast post — individual messages. |
| 23 | Pinterest: 15–20 pins from the Week 3 photography, boards organised by occasion (Christmas gift for grandma, 80th birthday, memorial, golden anniversary). Pinterest is the highest-fit organic channel for this buyer `[ASSUMPTION — demographic fit, not measured]`. |
| 24 | Post in 3 Facebook groups **with moderator permission**. Family history groups, gift groups, local community groups. |
| 25 | **Watch 3 more people build a chart**, this time on the *real* product, with the price visible. Note where they hesitate at the price. |
| 26 | Instagram + personal accounts. Write the "why I built this" post — it is the only story you have and it is a good one. |
| 27–29 | Respond to everything within an hour. Fulfil every order by hand. Fix whatever broke. |
| 30 | **The review (§9).** |

### 6.2 Charge full price. Do not give prints away.

A free print teaches you nothing. It measures politeness. If you want to lower the barrier, use the
launch offer already specified in Phase 2 §11.1 — free gift wrap and free digital file on 18×24 and
24×36, which costs you ~$2.50 and reads as $23 of value — but the print itself is full price.

The one exception worth making: if someone gives you 30 minutes of recorded, brutal feedback, give
them a print. You are buying research, not selling a poster.

### 6.3 The share loop, activated deliberately

Every customer who completes a chart should be prompted — once, gently, at the right moment — to
share the link to ask relatives to check the names. This is the growth engine and it is native to the
product (decision brief, "The growth loop"). Instrument it from Day 22:

| Metric | What it tells you |
|---|---|
| Share links created / charts started | Does the wall actually get hit? |
| Share link opens per link | Does anyone in the family care? |
| **Charts started by a share-link recipient** | Whether the loop exists at all |
| **Orders from a share-link recipient** | The only number that makes this a loop rather than a feature |

Thirty days is too short to see a loop. It is not too short to see whether the first step happens.

### 6.4 The channel probe — an honest deviation from Phase 3

Phase 3 §9 concluded that paid acquisition does not work at modelled numbers (break-even CAC
$49–64; modelled CAC $168). That conclusion is sound *on the model*, but taking it as a reason to
spend $0 means exiting the month with **zero evidence about any acquisition channel** — which is the
weakest structural point of this whole plan (§10.5).

**Recommendation: spend $100–150 in Week 4 on a deliberate probe, not on customer acquisition.**

| Split | Spend | Measures |
|---|---|---|
| Pinterest promoted pins | $75 | CPC, and click → builder-start rate |
| Meta (Facebook/Instagram) interest-targeted | $75 | CPC, and click → builder-start rate |

You are buying **two numbers**: a real CPC in this category, and the click-to-builder-start rate.
You are **not** measuring CAC — at this spend you will get 50–100 clicks and perhaps zero orders, and
that is expected. It cannot confirm CAC, but it can *refute* the model: a $0.40 Pinterest CPC would
make Phase 3's $2.00 CPC assumption wrong by 5×, and that changes the entire acquisition conclusion.
Take the money from the contingency line in §1.3.

---

## 7. Accounts and credentials

### 7.1 The table

| # | Account | Cost | Day | Lead time | **Blocks launch?** | Notes |
|---|---|---|---|---|---|---|
| 1 | **Domain registrar** | $10–45/yr | 1 | Minutes | **YES — hard** | Everything hangs off it |
| 2 | **Cloudflare** (DNS + R2) | $0 + ~$0.50/mo R2 | 1 | Minutes | **YES — hard** | R2 needs a card on file. Zero egress fees is why it is here. |
| 3 | **Email on the domain** | $1–7/mo | 1 | Under an hour | **YES — soft** | Needed for supplier + Stripe accounts and for `support@`. Zoho Lite is the cheap option. |
| 4 | **Prodigi** | $0 | 1 | Minutes | **YES — one of #4/#5** | Cannot fulfil without a supplier |
| 5 | **Gelato** | $0 | 1 | Minutes | **YES — one of #4/#5** | Register both regardless; failover is a config change (Phase 2 §9.2) |
| 6 | **Stripe** | 2.9% + $0.30 | 8 | **Days — apply early** | **YES — hard** | Needs legal name, address, bank account, tax ID (SSN or EIN). Expect a rolling payout hold on new accounts `[ASSUMPTION]` |
| 7 | **Neon Postgres (Launch, $5)** | $5/mo | 15 | Minutes | **YES — hard** | Free tier compute can suspend until next billing period. Not acceptable behind a checkout. |
| 8 | **Vercel Pro** | $20/mo | 15 | Minutes | **YES — hard** | Hobby contractually forbids commercial payment processing |
| 9 | **Resend** | $0 (3k/mo) | 17 | Minutes + DNS propagation | **YES — hard** | An order with no confirmation email is a support ticket. Verify the domain; set SPF/DKIM/DMARC. |
| 10 | Business bank account | $0 | 9 | Days | **YES — soft** | Blocks Stripe *payouts*, not Stripe signup |
| 11 | EIN (if forming an entity, US) | $0 | 8 | Usually instant | No | Needed for the LLC route |
| 12 | LLC / entity formation | $50–500 `[ASSUMPTION]` | 8 | Days–weeks | No | Sole proprietor is legal for launch. Form before real volume. |
| 13 | Panel/research account (Prolific or equiv.) | $50 | 5 | Minutes; study approval may take hours | No — but blocks **Week 1** | The whole Week 1 test |
| 14 | Pinterest **Business** | $0 | 1 | Minutes | No | Highest-fit organic channel for this buyer |
| 15 | Instagram | $0 | 1 | Minutes | No | Claim the handle Day 1 regardless |
| 16 | Facebook Page | $0 | 1 | Minutes | No | Also the prerequisite for a Meta ad account (§6.4) |
| 17 | TikTok / X handles | $0 | 1 | Minutes | No | Defensive registration only |
| 18 | Google Search Console | $0 | 1 | Minutes + DNS verify | No | |
| 19 | Bing Webmaster Tools | $0 | 1 | Minutes | No | Real keyword numbers without an ad account (Phase 7 §2) |
| 20 | Google Ads account (no spend) | $0 | 1 | Minutes | No | Keyword Planner access only |
| 21 | Stripe Tax registration, home state | $0 + 0.5% | 20 | Varies by state | **YES — soft** | Register your home state only. Do not over-engineer nexus at 11 orders/month. |

### 7.2 The seven hard blockers, isolated

If any one of these is missing, you cannot take money: **domain, Cloudflare, Stripe, Neon Launch,
Vercel Pro, Resend, and a supplier account.** Total recurring cost: **~$26/mo** `[FIXED — Phase 2
stack decisions]`. Everything else in the table can be missing on launch day without stopping a sale.

### 7.3 Two cash-flow facts nobody mentions until it is a problem

1. **You pay the supplier before Stripe pays you.** The supplier charges your card at order time;
   Stripe pays out on a rolling delay (commonly 2–7 days, often longer for a new account
   `[ASSUMPTION]`). At 11 orders/month the float is roughly **$300–400** — trivial. At 100
   orders/month it is $3,000–4,000, which is not. Note it now; it does not bite this month.
2. **Stripe's 2.9% applies to the tax-inclusive charge**, so collected sales tax costs you ~2.9% of
   the tax even though the tax is pass-through (Phase 3 §1.3). Small, real, already in the model.

---

## 8. What you must NOT do in the first 30 days

Written down because each of these will feel productive at the moment you start it.

| Do not | Why | When it becomes right |
|---|---|---|
| Build the supplier API integration | 2–3 days of work to save ~90 min/month, plus a new December failure mode | ~30 orders/month |
| Build user accounts / login | Token URLs work. Passwords are support tickets. | When customers ask for it |
| Put GEDCOM upload in the primary flow | The decision brief's central finding: GEDCOM-literate users are the ones most able to bypass you | Never as primary; a quiet secondary route in month 2+ |
| Build an admin dashboard | You have 11 orders. Use the database. | ~50 orders/month |
| Hire a designer or a brand agency | You have not proven anyone will type in the names | After a PASS *and* a stranger's payment |
| Write 20 SEO articles | Phase 7 is explicit that SEO is a 6–12 month channel. Writing 20 now delays launch by two weeks and ranks nothing before Christmas. | Weeks 5–12, at the pace in Phase 7 §6 |
| Register in multiple states for sales tax | Nexus thresholds are nowhere near reachable at this volume | When you approach a state's economic nexus threshold |
| Launch internationally | Shipping cost and duty complexity for zero incremental proof | Phase 2 §8.3 |
| Add a second product (mugs, cards, canvases) | Dilutes the one thing you are testing | Not this year |
| Redesign the fan chart for the fourth time | It is done. `lib/chart/` works. | Ship it and let customers tell you |
| Give prints away to friends for feedback | Measures politeness, not demand | Only in exchange for recorded, brutal feedback |

---

## 9. Day 30 — the review

### 9.1 The honest framing

**Thirty days cannot tell you whether this business works.** $1,000/month is 11 orders and you will
have been live for roughly one week. Judging on revenue at Day 30 would mean judging on a sample of
approximately three. So the Day 30 review is about **leading indicators and whether the assumptions
survived**, and the revenue judgement happens at Day 90 against the kill criteria in
`docs/12-failure-detection.md`.

### 9.2 The scorecard

| # | Question | **Green** | **Amber** | **Red** |
|---|---|---|---|---|
| 1 | Did the 15-Names Test pass? | PASS per §3.2.4 | AMBIGUOUS, with the product pivoted accordingly | FAIL, and the 7-name fallback also failed |
| 2 | Is COGS verified? | All 4 sample SKUs reconciled; ladder re-run | Samples landed but one SKU unresolved | Still modelling. **You cannot launch.** |
| 3 | Is the framing upsell viable? | Δ ≤ $41 at all launched sizes | Δ $41–48 at one size, that size dropped | Δ > $48 across the board — cut framing entirely |
| 4 | Has a **stranger** paid? | ≥1 order from someone you are not related to and have never met | Orders only from friends/family | Zero orders of any kind |
| 5 | Builder start → chart completion rate | ≥ 50% | 25–50% | < 25% |
| 6 | Chart completion → checkout start | ≥ 20% `[ASSUMPTION — no benchmark exists for this product]` | 8–20% | < 8% |
| 7 | Did anyone create a share link unprompted? | ≥ 25% of completed charts | 10–25% | ~0% — the growth loop is a hypothesis, not a mechanism |
| 8 | Did you receive your own product and would you gift it? | Unreserved yes | Yes, with fixable complaints | No |
| 9 | Does search demand exist (Phase 7 §2)? | Non-trivial volume in ≥2 of 6 tools | 1 of 6 | None anywhere |
| 10 | Are you still willing to do this for six more months? | Yes | | No — and that is a legitimate, non-shameful answer |

### 9.3 How to read the scorecard

| Pattern | Verdict |
|---|---|
| #1 green, #2 green, #4 green | **Continue.** Move to the Phase 7/8 acquisition plan. Set the Day 90 revenue gate. |
| #1 green, #2 green, #4 amber | **Continue, cautiously.** The product works; distribution is unproven. Weeks 5–8 go entirely to acquisition, zero to features. |
| #1 green, #4 red, #5 green | People build charts and nobody buys. **The most dangerous outcome**, because it looks like traction. The problem is price, trust, or the moment of the ask. Do not build features. Interview 10 people who completed a chart and did not buy. |
| #1 amber (knowledge wall) | **Continue with the 7-name product.** Ship the share loop as the primary mechanism, not a feature. |
| #1 red | **Stop.** You spent ~$400 and one month. Write it up honestly. |
| #2 red at Day 30 | You are not launched and you have burned the buffer. Fix the supplier verification this week or accept you miss the Christmas season, which for this business is most of the year's revenue. |
| #10 red | Stop, regardless of everything above. This business needs a founder who will hand-proof charts at 11pm in December. |

---

## 10. Where this plan is weak — stated plainly

**10.1 A paid participant is not a buyer, and n=15 is a smoke alarm.** The Week 1 test measures
willingness-to-type-under-payment. It says nothing about willingness-to-pay, and it cannot
distinguish a 45% completion rate from a 70% one. It can only detect a catastrophe. That is worth
$50; it is not worth believing beyond its resolution.

**10.2 Warm-list orders in Week 4 are nearly worthless as evidence.** Friends and family buy out of
loyalty. The scorecard's #4 tries to control for this by requiring a *stranger*, but 30 days may
plausibly produce zero strangers even in a healthy business, and that is why #4-amber is not a kill
signal. This means the plan's single most important business question — *will anyone who does not
know you pay $79?* — is genuinely not answered by Day 30. It is answered at Day 90.

**10.3 The 30-day schedule assumes ~25 h/week and a competent full-stack developer who already owns
the renderer.** Both are currently true, but the first is fragile. At 10 h/week this is 75 days and
the Christmas buffer disappears.

**10.4 The supplier samples might not arrive inside Week 1, and the pricing gate slips.** The plan
handles the slip, but the temptation at Day 14 with no samples will be to publish the modelled price
ladder "provisionally" and fix it later. Prices published are prices you have to honour. Do not.

**10.5 The biggest structural gap: you will exit 30 days knowing whether the product works and
knowing almost nothing about how anyone finds it.** Phase 3 ruled out paid acquisition on modelled
numbers, Phase 7 says SEO takes 6–12 months, and the share loop cannot cold-start by definition. So
the plan's acquisition content is a Pinterest board, three Facebook posts, and hope. The $100–150
probe in §6.4 is a partial patch — it buys a real CPC and a real click-to-start rate, which is enough
to *refute* the model but not to confirm it. **If you have to choose between the probe and the
contingency budget, run the probe.** An unbeatable product nobody can find is the most common way
this specific business dies, and it is the failure mode this plan is least equipped to see coming.

**10.6 The Day 14 pricing gate may fire and there is no plan B for the framing SKU.** If Δ exceeds
$48 everywhere, the instruction is "cut framing" — but framing is a meaningful chunk of the modelled
AOV, and cutting it means the $95 AOV target needs re-deriving from the multi-copy ladder alone. That
re-derivation is not in this document and it should be done the day the gate fires, not improvised.

---

## 11. The checklist

Tick it. If a line cannot be ticked, it is not done, and moving on because "it's basically done" is
the specific behaviour this document exists to prevent.

### Week 1 — Days 1–7

**Day 1 — accounts and samples**

- [ ] Domain registered, DNS on Cloudflare
- [ ] Email working on the domain (`hello@`, `support@`)
- [ ] Trademark knockout search done on "Kinline" (Class 16, Class 42)
- [ ] Prodigi account created
- [ ] Gelato account created
- [ ] Sample print file generated at 300 dpi, **with the QA strip** (type sizes, greys, hairlines, colour bar)
- [ ] **Prodigi sample ordered — 18×24 unframed + 12×18 framed, to a residential address**
- [ ] **Gelato sample ordered — same two SKUs, same file**
- [ ] Social handles claimed: Pinterest Business, Instagram, Facebook Page, TikTok, X
- [ ] Google Search Console, Bing Webmaster Tools, Google Ads (no spend) set up
- [ ] "Coming soon" page live with a real contact email

**Days 2–3 — prototype**

- [ ] Prototype builder deployed to a temporary URL (Vercel Hobby is fine — no payments)
- [ ] 15 name slots, all visible (scope not hidden)
- [ ] Live poster preview updating as they type
- [ ] "I don't know" available on every slot
- [ ] Empty/unknown state looks *designed*, not broken
- [ ] Persistent "I'm done / I can't do any more" button
- [ ] Works on a real 390px phone
- [ ] `test_event` table live; all 10 events firing; **name lengths only, never names**
- [ ] Final free-text question wired up
- [ ] Short privacy notice on the page

**Day 4 — pilot**

- [ ] 3 people observed in person, in silence
- [ ] Hesitation points written down
- [ ] Show-stoppers fixed (and only show-stoppers)

**Day 5 — field it**

- [ ] **Pass/fail thresholds committed to the repo BEFORE launching the study**
- [ ] Panel study live: 15 participants, female 35–60, US/UK, screened out of Ancestry/MyHeritage/FamilySearch
- [ ] Full payment regardless of completion stated prominently in the brief
- [ ] Free arm posted in 2–3 groups (moderator permission obtained)

**Day 6 — keywords**

- [ ] 18 seed terms run through all six tools; volumes and real phrasing recorded

**Day 7 — verdict**

- [ ] M1–M5 computed
- [ ] All 15 free-text answers read
- [ ] Mobile vs. desktop completion compared
- [ ] **One-page verdict written and committed: PASS / AMBIGUOUS / FAIL**
- [ ] Week 2 plan adjusted to match the verdict

### Week 2 — Days 8–14

- [ ] **Stripe application submitted (Day 8)**
- [ ] Entity decision made; EIN obtained if forming
- [ ] Business bank account opened (if applicable)
- [ ] Data model + migrations live; charts resume from a token URL
- [ ] Builder v1 shipped with Week 1's findings applied
- [ ] Unknown/gap state designed properly
- [ ] Share link works end to end on a phone
- [ ] Design pass done, informed by the physical prints
- [ ] Print-file generation → R2, with the chosen supplier's bleed spec
- [ ] Supplier SKU abstraction in config (failover = env var)
- [ ] Policies written: returns, terms, privacy, shipping
- [ ] **Samples received; §3.3.2 reconciliation table filled in completely, both suppliers**
- [ ] **Bypass benchmark print obtained and compared side by side**
- [ ] Gift-wrap capability confirmed or the $8 SKU deleted
- [ ] **Multi-print-in-one-package confirmed, or the copy discounts cut**
- [ ] White-label packaging confirmed
- [ ] **Supplier chosen, on text crispness first**
- [ ] **DAY 14 PRICING GATE: Phase 3 re-run on verified COGS; ladder published or repriced**

### Week 3 — Days 15–21

- [ ] Vercel on **Pro**; Neon on **Launch**
- [ ] `prototype/` deleted
- [ ] Product selection UI (size, framing, quantity, wrap) on verified prices
- [ ] Stripe Checkout + idempotent webhook + `order` table
- [ ] Resend domain verified (SPF/DKIM/DMARC); confirmation and shipped emails land in a Gmail inbox
- [ ] Order status page at the token URL
- [ ] **Fulfilment runbook written; a full order fulfilled by hand in under 10 minutes**
- [ ] Landing page + 5 priority pages + legal pages live
- [ ] Stripe Tax registered, home state only
- [ ] **Own order placed on Day 17 with a real card through the real checkout**
- [ ] Own order received and inspected
- [ ] Photography done: hero, in-hand, close-up type, unboxing, size comparison — all with vertical crops

### Week 4 — Days 22–30

- [ ] 20–30 individual messages sent (not a broadcast)
- [ ] 15–20 Pinterest pins live, boards by occasion
- [ ] 3 Facebook group posts, moderator-approved
- [ ] 3 more people watched building on the **real** product, with prices visible
- [ ] "Why I built this" post published
- [ ] Share-loop metrics instrumented (created / opened / started / ordered)
- [ ] Channel probe live: $75 Pinterest + $75 Meta; CPC and click→start recorded
- [ ] Every order fulfilled by hand, every enquiry answered within an hour
- [ ] **Day 30 scorecard (§9.2) completed, all ten rows**
- [ ] **Verdict written: continue / continue-cautiously / pivot to 7-name / stop**
- [ ] Day 90 revenue gate scheduled against `docs/12-failure-detection.md`

---

## 12. One page, if you only read one page

| Day | The only thing that matters |
|---|---|
| **1** | Order the supplier samples. Everything else on Day 1 is subordinate to this. |
| **5** | Commit the pass/fail thresholds, then field the test. |
| **7** | Read the verdict honestly and let it change the plan. |
| **14** | Do not publish a price until COGS is verified. |
| **17** | Buy your own product with your own card. |
| **22** | Stop coding. Start asking people for money. |
| **30** | Fill in the scorecard without flattering yourself. |

The month costs roughly **$350–450** and about **100 hours**. The alternative — building for six
weeks and testing afterwards — costs the Christmas season, which for this business is most of the
year.
