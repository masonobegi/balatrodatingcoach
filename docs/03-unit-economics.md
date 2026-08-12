# Phase 3 — Unit Economics

> ## ⚠️ Superseded on one point: framing is disabled at launch
>
> This document was written while framed prints were still in the catalogue at a
> flat +$50. **They are not.** `FRAMING_ENABLED` in `lib/pricing.ts` is `false`,
> and the storefront sells unframed prints only.
>
> The reasoning is in this repo's own analysis, and `docs/03-unit-economics.md`
> derives it independently: incremental gross profit on a frame is
> `$45.95 − 1.12Δ`, giving break-even at a frame delta of **$41–45** against a
> modelled delta of **$38 at 18×24 and $48 at 24×36**. Recovered third-party
> audits put a framed A2 near **€48** (€38 of it the frame) against **€10** for
> fine-art paper, and recorded **$23.07 of shipping on a single mug** — glazed,
> heavy goods are where print-on-demand margin dies, before adding breakage and
> replacement cost.
>
> Moving framed attach from 0% to 75% was calculated to change gross profit per
> order by **$1.92** while costing **16 margin points**. Framed earns less
> absolute profit on a larger, more fragile parcel.
>
> Every framed code path is live and tested. Re-enable the flag once real
> delivered framed cost is confirmed below ~$45. Until then, read framed figures
> below as modelling, not as the live catalogue.



**Kinline — family tree charts sold as framed/unframed art prints, fulfilled print-on-demand.**

---

## 0. How to read this document

Every number below is one of three things, and it is labelled:

| Label | Meaning |
|---|---|
| `[FIXED]` | A price we set, or a fee schedule published by a vendor we have chosen (Stripe). Not in doubt. |
| `[ASSUMPTION]` | A modelled number. Reasoned, stated, and **wrong until verified**. |
| `[RULE OF THUMB]` | A category-level heuristic. Directionally useful, never load-bearing on its own. |

**No number in this document was verified against a live supplier price list, a live
ad account, or any measured conversion data.** Research tooling was exhausted before
supplier pricing could be pulled. The COGS figures are inherited from Phase 2 §7 so the
two documents stay consistent — inheriting an assumption does not make it a fact.

**The bar, stated plainly:** $1,000/month revenue is **~10 orders/month** at the Base-case
AOV. Ten orders. That is a modest bar and it should be described as a modest bar. The
interesting question is not whether ten orders is achievable — it is whether the gift
buyer will type in 15 names at all, and whether anything about this business scales past
ten orders without paid acquisition that the margin cannot pay for.

**Three findings you should read even if you read nothing else:**

1. **The framing upsell is worth approximately nothing at the modelled cost, and is
   loss-making if the modelled cost is $3–7 wrong in the bad direction.** Break-even on
   the +$50 framing uplift sits at a **$41–$45 incremental delivered cost**; we model
   $38.70. See §5. This is the single most important number to verify.
2. **Paid acquisition does not work at any conversion rate we can honestly assume.**
   Break-even CAC is ~$49–64; modelled CAC at a $2.00 CPC and a 1.19% conversion rate is
   **$168**. See §9.
3. **The multi-copy discount ladder is margin-*accretive*; the framing upsell is
   margin-*dilutive*.** They are the two big AOV levers and they pull in opposite
   directions on margin. See §11.

---

## 1. Input assumptions — the whole model in one table

Change a number here and every table downstream moves. This is the sheet to re-run.

### 1.1 Prices `[FIXED]`

| Item | 12×18 | 18×24 | 24×36 |
|---|---|---|---|
| Unframed | $49 | $79 | $119 |
| Framed (+$50 flat) | $99 | $129 | $169 |
| 2nd copy, same design (−25%) | $36.75 | $59.25 | $89.25 |
| 3rd+ copy, same design (−35%) | $31.85 | $51.35 | $77.35 |
| Gift wrap + card | +$8 | +$8 | +$8 |
| Hi-res digital (post-purchase only) | +$15 | +$15 | free |
| Rush production + shipping | +$15 | +$15 | +$15 |

Shipping is free on every order and is **inside** the COGS numbers below (Phase 2 §8.1).

### 1.2 Landed COGS `[ASSUMPTION — modelled, never quoted]`

Inherited verbatim from Phase 2 §7. Print + inbound shipping to the customer's door.

| SKU | Print / print+frame | Ship | **Landed COGS** | Print only (no ship) |
|---|---|---|---|---|
| 12×18 unframed | $10 | $8 | **$18** | $10 |
| 18×24 unframed | $17 | $10 | **$27** | $17 |
| 24×36 unframed | $26 | $14 | **$40** | $26 |
| 12×18 framed | $32 | $18 | **$50** | — |
| 18×24 framed | $42 | $23 | **$65** | — |
| 24×36 framed | $58 | $30 | **$88** | — |

Derived — **framing increment Δ** (framed landed − unframed landed):

| Size | Δ (incremental delivered cost of the frame) | Price uplift charged |
|---|---|---|
| 12×18 | **$32** | $50 |
| 18×24 | **$38** | $50 |
| 24×36 | **$48** | $50 |

Note immediately that **24×36 framing already costs more to deliver ($48) than the
$41–45 break-even band** derived in §5. The flat +$50 uplift is wrong at the top of the
ladder before we have verified anything.

### 1.3 Variable cost rates

| Line | Value | Label | Basis |
|---|---|---|---|
| Stripe processing | 2.9% + $0.30 per charge | `[FIXED]` | Published US card rate |
| Stripe Tax | 0.5% of order value | `[FIXED]` | Usage-based, registered jurisdictions only |
| Sales tax collected on top of price | 3% of order value | `[ASSUMPTION]` | Most early orders fall outside states where we have economic nexus; home state charges from order 1. Matters because **Stripe's 2.9% applies to the tax-inclusive charge**, so tax collection is a small real cost even though the tax itself is pass-through. |
| Disputes / fraud | 0.3% of revenue | `[RULE OF THUMB]` | Personalised goods have low chargeback incentive; a chargeback is ~$15 + the order |
| Reprint / damage reserve — unframed | 4% of COGS | `[ASSUMPTION]` | Rolled tube, low breakage |
| Reprint / damage reserve — framed | 12% of COGS | `[ASSUMPTION]` | Glazing + bulk + corner damage. Phase 2 used a flat ~7%; splitting it is more honest because the risk is concentrated entirely in the framed SKUs. |
| Gift wrap cost | $2.50 | `[ASSUMPTION]` | Only real if the supplier offers it; otherwise this line does not exist |
| Digital file cost | ~$0.01 | `[ASSUMPTION]` | R2 storage, zero egress |
| Rush cost | $12 | `[ASSUMPTION]` | Priority production + expedited carrier |
| Extra copy in the **same** package | print-only cost, no extra shipping | `[ASSUMPTION]` | **Only true if the supplier will put N prints in one tube.** Verify. |

### 1.4 Fixed monthly costs `[FIXED — from Phase 2 stack decisions]`

| Item | At launch | At ~$50k/mo |
|---|---|---|
| Vercel Pro | $20 | $20 |
| Neon Postgres Launch | $5 | $19 |
| Resend | $0 (free 3k) | $20 |
| Cloudflare R2 | ~$0.50 | ~$5 |
| Domain (amortised) | ~$1.50 | ~$1.50 |
| Misc / monitoring | $0 | ~$30 |
| **Total** | **~$27/mo** | **~$97/mo** |

Founder salary is **$0** in every table in this document. Every "profit" figure below is
profit before paying yourself. At 40 orders/month with ~5 minutes of chart QA per order
that is ~3.3 hours/month of unpaid labour; at 266 orders/month it is ~22 hours/month plus
support.

---

## 2. The formula (so you can rebuild this in a spreadsheet)

```
charged        = price × (1 + tax_rate)                     # tax_rate = 3%
stripe_fee     = 0.029 × charged + 0.30
stripe_tax_fee = 0.005 × price
disputes       = 0.003 × price
fees           = stripe_fee + stripe_tax_fee + disputes

cogs           = landed_cost(+ Δ if framed) + extras
reserve        = 0.04 × unframed_cogs + 0.12 × framed_cogs

gross_profit   = price − fees − cogs − reserve
gross_margin   = gross_profit / price

break_even_CAC = gross_profit                                # per order, before fixed costs
orders_for_$1k_revenue = 1000 / AOV
orders_for_$1k_GP      = 1000 / gross_profit_per_order
traffic_required       = orders / conversion_rate
```

---

## 3. Single-SKU economics — UNFRAMED

One unit, no add-ons, no extra copies.

| SKU | Price | Charged (incl. 3% tax) | Stripe | Stripe Tax | Disputes | COGS | Reserve (4%) | **Gross profit** | **GM%** |
|---|---|---|---|---|---|---|---|---|---|
| 12×18 UF | $49 | $50.47 | $1.76 | $0.25 | $0.15 | $18.00 | $0.72 | **$28.12** | **57.4%** |
| 18×24 UF | $79 | $81.37 | $2.66 | $0.40 | $0.24 | $27.00 | $1.08 | **$47.62** | **60.3%** |
| 24×36 UF | $119 | $122.57 | $3.86 | $0.60 | $0.36 | $40.00 | $1.60 | **$72.58** | **61.0%** |

Unframed lands at the **bottom edge of the 60–68% target band**, and the entry SKU misses
it entirely at 57.4%. The $0.30 Stripe flat fee is 0.6% of a $49 order and 0.25% of a $119
order — a small but real reason the entry SKU is structurally weaker.

**Implication for the price ladder:** the 12×18 at $49 earns $28.12. If a customer buys
only that, a single $30 paid click has consumed the whole order. The 12×18 is an
acquisition SKU, not a profit SKU, and should be treated that way in ad copy (never
advertise "from $49" if the ad costs $30 a customer).

---

## 4. Single-SKU economics — FRAMED

| SKU | Price | Charged | Stripe | Stripe Tax | Disputes | COGS | Reserve (12%) | **Gross profit** | **GM%** |
|---|---|---|---|---|---|---|---|---|---|
| 12×18 FR | $99 | $101.97 | $3.26 | $0.50 | $0.30 | $50.00 | $6.00 | **$38.94** | **39.3%** |
| 18×24 FR | $129 | $132.87 | $4.15 | $0.65 | $0.39 | $65.00 | $7.80 | **$51.01** | **39.5%** |
| 24×36 FR | $169 | $174.07 | $5.35 | $0.85 | $0.51 | $88.00 | $10.56 | **$63.73** | **37.7%** |

Now put the two tables side by side, which is the comparison that actually matters:

| Size | Unframed GP | Framed GP | **Extra GP the frame buys** | Extra price charged |
|---|---|---|---|---|
| 12×18 | $28.12 | $38.94 | **+$10.82** | +$50 |
| 18×24 | $47.62 | $51.01 | **+$3.39** | +$50 |
| 24×36 | $72.58 | $63.73 | **−$8.85** | +$50 |

**Read that last column again.** At the modelled costs, selling a framed 24×36 makes us
**$8.85 less gross profit** than selling an unframed 24×36 — while shipping a heavy,
fragile, high-refund-risk object. At 18×24, our intended default SKU, the frame adds
**$3.39**. The framing upsell — described in Phase 2 §6.1 as "the single biggest AOV lever
after size" — is, on these numbers, an AOV lever that is almost entirely **not** a profit
lever.

---

## 5. THE BREAKPOINT — the most important number in this document

**Define Δ = the incremental delivered cost of framing** (framed landed COGS minus
unframed landed COGS, including the extra shipping the frame causes).

Incremental economics of the +$50 framing uplift on an 18×24:

| Line | Amount |
|---|---|
| Incremental price | +$50.00 |
| Incremental Stripe (2.9% of $51.50 tax-inclusive) | −$1.49 |
| Incremental Stripe Tax (0.5% of $50) | −$0.25 |
| Incremental disputes (0.3% of $50) | −$0.15 |
| Incremental damage reserve (12% of framed COGS vs 4% of $27) | −$(2.16 + 0.12Δ) |
| Incremental COGS | −Δ |
| **Incremental gross profit** | **$45.95 − 1.12Δ** |

Set to zero:

| Damage reserve on framed goods | Break-even Δ |
|---|---|
| 12% (modelled) | **Δ = $41.03** |
| 6% (optimistic — acrylic glazing, careful packing) | **Δ = $44.88** |
| 0% (fantasy — no breakage ever) | **Δ = $48.11** |

> ### The breakpoint, stated for the founder
>
> **If the delivered incremental cost of framing lands at or above ~$45, the framing
> upsell earns nothing. If it lands at or above ~$41 on realistic damage assumptions, it
> earns nothing. We model $38.70 blended. The entire framing business sits inside a
> $3–$7 margin of safety on a number that has never been quoted.**
>
> Equivalently, in total-cost terms: on the $129 framed 18×24, if the **all-in delivered
> framed cost** reaches **$85**, gross profit falls to **$28.61 (22.2%)** — less than the
> modelled cost of acquiring one customer through paid media in Q4. At that point the
> framed SKU cannot absorb any paid acquisition at all and is a pure conversion device,
> not a source of profit.
>
> **This is the first thing to verify. Not the second. Before writing acquisition copy,
> before spending a dollar on ads, before finalising the price ladder: get a real Prodigi
> and Gelato quote for a framed 18×24 delivered to a US residential address, and get the
> framed 24×36 too.**

Sensitivity — framed 18×24 at $129 across Δ:

| Δ (frame increment) | Landed framed COGS | Reserve @12% | Gross profit | GM% | vs unframed 18×24 ($47.62) |
|---|---|---|---|---|---|
| $25 | $52 | $6.24 | $65.57 | 50.8% | +$17.95 |
| $30 | $57 | $6.84 | $59.97 | 46.5% | +$12.35 |
| $35 | $62 | $7.44 | $54.37 | 42.1% | +$6.75 |
| **$38 (modelled)** | **$65** | **$7.80** | **$51.01** | **39.5%** | **+$3.39** |
| $41 | $68 | $8.16 | $47.65 | 36.9% | +$0.03 |
| $45 | $72 | $8.64 | $43.17 | 33.5% | −$4.45 |
| $50 | $77 | $9.24 | $37.57 | 29.1% | −$10.05 |
| $58 | $85 | $10.20 | $28.61 | 22.2% | −$19.01 |

### 5.1 What to do about it, depending on what the quote says

| Verified Δ at 18×24 | Verdict | Action |
|---|---|---|
| < $30 | Framing is a genuine profit lever | Keep flat +$50; push framing hard in the gift narrative |
| $30–$40 | Framing is a conversion lever, marginally profitable | Keep it, but stop describing it as an AOV strategy. Move to tiered uplift **+$40 / +$55 / +$75** to fix the 24×36 |
| $41–$48 | Framing is roughly free money-in-money-out | **Tiered uplift is mandatory.** Consider dropping framed 24×36 entirely |
| > $48 | Framing destroys profit | Raise framing to +$70/+$85/+$110 (test conversion impact) or drop framing and ship a "frame it yourself, here are the exact dimensions" card |

Note the second-order effect: **raising the framing price lowers framed attach, which
raises blended margin %** (see §11.2). The framed SKU is not obviously worth defending.

---

## 6. Blended order economics — the three scenarios

### 6.1 Scenario definitions

Everything that differs between the three scenarios, in one place. **All attach rates and
mixes are `[ASSUMPTION]` — none is measured.**

| Input | Conservative | Base | Strong | Reasoning basis |
|---|---|---|---|---|
| Size mix 12×18 / 18×24 / 24×36 | 45 / 35 / 20 | 30 / 45 / 25 | 25 / 45 / 30 | Base matches Phase 2 §6.4. Conservative assumes buyers anchor to the advertised entry price; Strong assumes the size-comparison UI works |
| Framed attach | 15% | 25% | 35% | Phase 2 assumed 25%. No data exists |
| Gift wrap attach | 25% | 30% | 35% | Trivial checkout yes at $8 |
| 2nd-copy attach | 6% | 10% | 18% | The least-evidenced line in the model |
| 3rd+ copy attach | 1.5% | 3% | 7% | Sibling sets and reunions |
| Digital add-on attach (of eligible orders) | 8% | 10% | 12% | Post-purchase email offer only |
| Rush attach | 3% | 5% | 7% | Seasonally spiky; Christmas skews this up hard |
| Visitor → purchase conversion | 0.51% | 1.19% | 2.22% | Decomposed in §8 |

### 6.2 AOV build

| Line | Conservative | Base | Strong |
|---|---|---|---|
| Base print ASP (size mix × unframed prices) | $73.50 | $80.00 | $83.50 |
| + Framing (attach × $50) | $7.50 | $12.50 | $17.50 |
| + Gift wrap (attach × $8) | $2.00 | $2.40 | $2.80 |
| + 2nd copy (attach × 75% of ASP) | $3.31 | $6.00 | $11.27 |
| + 3rd+ copy (attach × 65% of ASP) | $0.72 | $1.56 | $3.80 |
| + Digital (attach × eligible share × $15) | $0.96 | $1.13 | $1.26 |
| + Rush (attach × $15) | $0.45 | $0.75 | $1.05 |
| **AOV** | **$88.44** | **$104.34** | **$121.18** |

> **Reconcile against Phase 2:** Phase 2 §6.4 modelled AOV at **$94.90** using only size
> mix + framing + gift wrap. This document adds multi-copy, digital and rush, which is why
> the Base case reads $104.34. **Of that $104.34, $9.44 (9%) comes from multi-copy attach
> — the assumption with the least support anywhere in the plan.** Strip multi-copy out
> entirely and Base AOV is $96.78, within a dollar of Phase 2.
>
> **Plan on $95. Treat $104 as what happens if multi-copy works.**

### 6.3 COGS build

| Line | Conservative | Base | Strong |
|---|---|---|---|
| Unframed landed print (size mix) | $25.55 | $27.55 | $28.65 |
| + Framing increment (attach × Δ by mix) | $5.60 | $9.68 | $13.83 |
| + Extra copies (attach × print-only cost, same package) | $1.17 | $2.23 | $4.49 |
| + Gift wrap (attach × $2.50) | $0.63 | $0.75 | $0.88 |
| + Rush (attach × $12) | $0.36 | $0.60 | $0.84 |
| + Digital | $0.01 | $0.01 | $0.01 |
| **Blended COGS / order** | **$33.32** | **$40.82** | **$48.70** |

### 6.4 Gross profit per order

| Line | Conservative | Base | Strong |
|---|---|---|---|
| AOV | $88.44 | $104.34 | $121.18 |
| Charged incl. 3% tax | $91.09 | $107.47 | $124.82 |
| Stripe (2.9% + $0.30) | −$2.94 | −$3.42 | −$3.92 |
| Stripe Tax (0.5%) | −$0.44 | −$0.52 | −$0.61 |
| Disputes / fraud (0.3%) | −$0.27 | −$0.31 | −$0.36 |
| COGS | −$33.32 | −$40.82 | −$48.70 |
| Reprint / damage reserve | −$2.09 | −$2.96 | −$3.86 |
| **Gross profit / order** | **$49.38** | **$56.31** | **$63.73** |
| **Gross margin** | **55.8%** | **54.0%** | **52.6%** |

**Notice the direction of the margin column.** The "better" scenario has the *worse*
percentage margin, because the thing that improves it — framing attach — is the thing
that costs the most to deliver. Gross profit *dollars* still rise. This is fine, but it
means **any dashboard that tracks gross margin % as the health metric will punish you for
succeeding.** Track gross profit per order and gross profit per visitor.

### 6.5 The unframed-only counterfactual

| Order type (Base mix, no framing at all) | AOV | COGS | GP | GM% |
|---|---|---|---|---|
| Base blended (25% framed) | $104.34 | $40.82 | $56.31 | 54.0% |
| Same, with framing removed entirely | $91.84 | $31.14 | $55.67 | 60.6% |

Removing framing entirely costs **$0.64 of gross profit per order** and gains **6.6 points
of margin**, plus removes the largest source of breakage, refunds and customer-service
load. That is a genuinely open question, not a rhetorical one. The counter-argument is
conversion: an unframed rolled poster is a chore handed to an 80-year-old, and framing may
be doing more work as a *conversion* device than the AOV table can see. **You cannot
resolve this with arithmetic — you resolve it by offering both and measuring conversion
with and without a framed option shown.**

---

## 7. Orders and revenue required

### 7.1 For $1,000 monthly REVENUE

| Scenario | AOV | Orders needed | Orders/day |
|---|---|---|---|
| Conservative | $88.44 | **11.3 → 12** | 0.4 |
| Base | $104.34 | **9.6 → 10** | 0.3 |
| Strong | $121.18 | **8.3 → 9** | 0.3 |

**Ten orders a month.** One order every three days. Say this out loud whenever the goal
starts sounding heroic.

### 7.2 For $1,000 monthly GROSS PROFIT

This is the number that matters, because $1,000 of revenue leaves ~$540 of gross profit
in the Base case, and gross profit is what pays for anything.

| Scenario | GP/order | Orders needed | Revenue at that order count |
|---|---|---|---|
| Conservative | $49.38 | **20.3 → 21** | $1,857 |
| Base | $56.31 | **17.8 → 18** | $1,878 |
| Strong | $63.73 | **15.7 → 16** | $1,939 |

**$1,000/month of gross profit requires roughly $1,900/month of revenue and ~18 orders.**
That is the honest restatement of the goal. It is still modest. It is roughly double what
"$1k/month" sounds like.

### 7.3 Net of fixed costs

$1,000 gross profit − $27 fixed = **$973/month before founder time**. At ~5 min QA/order
plus support, 18 orders is maybe 3 hours. So ~$300/hour of founder time at the $1k GP
level, which is genuinely good — *if* the acquisition is free. §9 is where that falls
apart.

---

## 8. Conversion rate

### 8.1 Why this product's conversion is structurally different

Kinline is not an add-to-cart product. There is a **build step** between landing and
purchase in which the customer types in up to 15 names. That is a large, unusual friction
that sits *before* the price is committed to. It cuts both ways:

- **Down:** most visitors will never finish. Configurator/personalisation products
  typically convert below site-wide ecommerce averages. `[RULE OF THUMB]`
- **Up:** anyone who *does* finish has sunk 5–10 minutes of emotional labour into a chart
  of their own dead grandparents. Completion-to-purchase should be far above a normal
  cart-to-purchase rate.

### 8.2 Funnel decomposition `[ASSUMPTION — every step]`

| Step | Conservative | Base | Strong |
|---|---|---|---|
| Visitor → starts the builder | 15% | 22% | 28% |
| Starts → completes a meaningful chart (≥8 people) | 20% | 27% | 33% |
| Completes → purchases | 17% | 20% | 24% |
| **Visitor → purchase** | **0.51%** | **1.19%** | **2.22%** |

`[RULE OF THUMB]` Site-wide ecommerce conversion is commonly cited at 1.5–2.5%. Base at
1.19% sits deliberately below that because of the build step. Strong at 2.22% assumes the
builder is genuinely good and traffic is high-intent occasion traffic, not cold browsing.

**The middle row is the product-risk row.** "Will she type in 15 names?" is literally the
20%/27%/33% cell. If that number is 5%, the business does not exist, and no amount of ad
optimisation fixes it. **Instrument this step before anything else:** log builder starts,
person-count reached, and drop-off position. It is the cheapest experiment in the plan and
it can be run with a landing page and a builder, before a single print is ever sold.

### 8.3 The share-loop funnel is a different funnel

A relative arriving on a shared link sees a chart of **their own family**, already built,
with no work required. That visitor should convert at a multiple of a cold visitor.

| Shared-link visitor → purchase `[ASSUMPTION]` | Conservative | Base | Strong |
|---|---|---|---|
| Conversion | 4% | 8% | 14% |

If true, shared-link traffic is worth **7–12× a cold visitor** and should be measured as a
separate channel from day one. Do not average it into site-wide conversion — doing so will
make cold acquisition look better than it is and hide the only thing that actually works.

### 8.4 Traffic required

| Target | Conservative (0.51%) | Base (1.19%) | Strong (2.22%) |
|---|---|---|---|
| Visitors for $1,000 **revenue**/mo | **2,216** (73/day) | **807** (27/day) | **374** (12/day) |
| Visitors for $1,000 **gross profit**/mo | **3,980** (131/day) | **1,496** (50/day) | **707** (23/day) |

**27 visitors a day for $1,000/month of revenue in the Base case.** This is the most
encouraging number in the document. One Pinterest pin that works, or one Reel of the
build-and-reveal, produces that. The risk is not traffic volume — it is the 27% cell in
§8.2 and the CAC problem in §9.

---

## 9. CAC and break-even CAC

### 9.1 Break-even and target CAC

Break-even CAC = gross profit per order (spend all contribution on acquisition, earn zero,
pay nothing toward fixed costs or yourself).

| Scenario | GP/order = **break-even CAC** | Target CAC at 50% of GP | Target CAC at 33% of GP |
|---|---|---|---|
| Conservative | **$49.38** | $24.69 | $16.29 |
| Base | **$56.31** | $28.16 | $18.58 |
| Strong | **$63.73** | $31.87 | $21.03 |

By SKU, break-even CAC on a single-item order:

| SKU | Break-even CAC |
|---|---|
| 12×18 unframed | $28.12 |
| 18×24 unframed | $47.62 |
| 24×36 unframed | $72.58 |
| 12×18 framed | $38.94 |
| 18×24 framed | $51.01 |
| 24×36 framed | $63.73 |

### 9.2 Modelled paid CAC

CAC = CPC ÷ conversion rate. `[RULE OF THUMB]` Meta/Pinterest CPCs for a US gift product
run roughly $1.00–$3.00 and inflate materially in Q4 — which is exactly when our largest
occasion sits. **We have no ad account data. This grid is a shape, not a forecast.**

| CPC ↓ / Conversion → | 0.51% (Cons) | 1.19% (Base) | 2.22% (Strong) |
|---|---|---|---|
| $1.00 | $196 | $84 | **$45** |
| $1.50 | $294 | $126 | $68 |
| $2.00 | $392 | **$168** | $90 |
| $2.50 | $490 | $210 | $113 |
| $3.00 | $588 | $252 | $135 |

Break-even CAC is **$49–$64**. Exactly **one cell** in that grid ($1.00 CPC at 2.22%
conversion, = $45) clears break-even, and it clears it with $11–19 left over — before
fixed costs and before paying yourself.

> **Paid acquisition does not work for Kinline at launch. Not "is expensive" — does not
> work.** Every realistic cell is 1.5× to 10× break-even CAC. Any plan that reaches
> $1,000/month via paid ads is, on these numbers, a plan to lose money faster.

### 9.3 The share loop is what makes acquisition arithmetic survivable

Define **orders per acquired builder** = total orders generated by one acquired chart,
including relatives who buy their own copy after receiving the share link.

| Orders per acquired builder `[ASSUMPTION]` | Conservative | Base | Strong |
|---|---|---|---|
| Multiplier | 1.05 | 1.25 | 1.70 |

Effective CAC = paid CAC ÷ multiplier:

| Case | Paid CAC | Multiplier | Effective CAC | Break-even CAC | Verdict |
|---|---|---|---|---|---|
| Base, $2.00 CPC | $168 | 1.25 | **$134** | $56.31 | Loses $78/order |
| Base, $1.50 CPC | $126 | 1.25 | **$101** | $56.31 | Loses $45/order |
| Strong, $1.50 CPC | $68 | 1.70 | **$40** | $63.73 | Works, thinly |
| Strong, $1.00 CPC | $45 | 1.70 | **$26** | $63.73 | Works |

**Three things must be simultaneously true before a dollar of paid spend is defensible:**
conversion ≥ ~2%, CPC ≤ ~$1.50, and share multiplier ≥ ~1.5. All three are measurable
with organic traffic first. **Measure, then buy. Never the reverse.**

### 9.4 Therefore the acquisition plan has to be earned, not bought

The channels that carry this at launch are the ones with no CAC: the share loop, Pinterest
(long-lived, occasion-indexed, visual), short-form video of the build-and-reveal, occasion
SEO ("80th birthday gift for grandma", "memorial gift ideas"), and gift-guide placements.
Paid becomes a *scaling* instrument later, once the §9.3 conditions are measured — not a
launch instrument. This is a constraint the unit economics impose; it is not a preference.

### 9.5 Repeat purchase

`[ASSUMPTION]` 15% of customers buy again within 12 months — the next occasion, or the
other side of the family (a maternal chart and a paternal chart are two products). Second
purchase carries **zero CAC**.

| Scenario | GP/order | × 1.15 repeat | Effective 12-month GP per acquired customer |
|---|---|---|---|
| Conservative | $49.38 | | $56.79 |
| Base | $56.31 | | $64.76 |
| Strong | $63.73 | | $73.29 |

Combined with the share multiplier, Base-case lifetime gross profit per *acquired builder*
is roughly $64.76 × 1.25 ≈ **$81**. That is the true ceiling on CAC — and it is still
below the $168 modelled paid CAC. The conclusion in §9.2 survives even with generous
loyalty and virality assumptions.

---

## 10. Six-month monthly path

Traffic ramps below are `[ASSUMPTION]`. They assume a **non-Q4 launch with no paid spend**.
A launch timed into October–November pulls the curve forward by roughly two months on
seasonality alone; a January launch pushes it back by three or four.

### 10.1 Conservative — 0.51% conversion, $88.44 AOV, $49.38 GP/order

| Month | Visitors | Orders | Revenue | Gross profit | − Fixed $27 | Net |
|---|---|---|---|---|---|---|
| 1 | 250 | 1.3 | $113 | $63 | $27 | **$36** |
| 2 | 400 | 2.0 | $180 | $101 | $27 | **$74** |
| 3 | 600 | 3.1 | $271 | $151 | $27 | **$124** |
| 4 | 850 | 4.3 | $384 | $214 | $27 | **$187** |
| 5 | 1,100 | 5.6 | $496 | $277 | $27 | **$250** |
| 6 | 1,400 | 7.1 | $631 | $353 | $27 | **$326** |
| **Total** | | **23.5** | **$2,075** | **$1,159** | $162 | **$997** |

**Month 6 revenue is $631. The $1,000/month bar is not cleared inside six months.** On
this trajectory it clears around month 9–10. That is not a failure state — it is the
realistic shape of an unfunded organic launch — but it must not be dressed up. Six months
of work produces roughly **$997 of cumulative profit before paying yourself anything**.

### 10.2 Base — 1.19% conversion, $104.34 AOV, $56.31 GP/order

| Month | Visitors | Orders | Revenue | Gross profit | − Fixed $27 | Net |
|---|---|---|---|---|---|---|
| 1 | 400 | 4.8 | $497 | $268 | $27 | **$241** |
| 2 | 700 | 8.3 | $869 | $469 | $27 | **$442** |
| 3 | 1,100 | 13.1 | $1,366 | $737 | $27 | **$710** |
| 4 | 1,700 | 20.2 | $2,111 | $1,139 | $27 | **$1,112** |
| 5 | 2,500 | 29.8 | $3,104 | $1,675 | $27 | **$1,648** |
| 6 | 3,600 | 42.8 | $4,470 | $2,412 | $27 | **$2,385** |
| **Total** | | **119.0** | **$12,417** | **$6,700** | $162 | **$6,538** |

- **$1,000/month revenue crossed in month 3.**
- **$1,000/month gross profit crossed in month 4.**
- Month 6 requires **120 visitors/day organically**. That is the load-bearing assumption
  of the Base case — not the conversion rate, not the COGS. Ask honestly whether Pinterest
  + short-form + share loop gets to 120/day by month 6 with no ad spend.

### 10.3 Strong — 2.22% conversion, $121.18 AOV, $63.73 GP/order

| Month | Visitors | Orders | Revenue | Gross profit | − Fixed | Net |
|---|---|---|---|---|---|---|
| 1 | 700 | 15.5 | $1,884 | $990 | $27 | **$963** |
| 2 | 1,400 | 31.1 | $3,767 | $1,981 | $27 | **$1,954** |
| 3 | 2,600 | 57.7 | $6,996 | $3,679 | $27 | **$3,652** |
| 4 | 4,500 | 99.9 | $12,106 | $6,367 | $47 | **$6,320** |
| 5 | 7,500 | 166.5 | $20,177 | $10,611 | $47 | **$10,564** |
| 6 | 12,000 | 266.4 | $32,283 | $16,978 | $97 | **$16,881** |
| **Total** | | **637** | **$77,213** | **$40,606** | $272 | **$40,334** |

**Do not treat this as a forecast.** This is what the arithmetic produces *if* traffic
compounds like that, and traffic compounding like that is a claim about content
distribution, not about unit economics. Three caveats:

1. **12,000 organic visits/month by month 6 is a strong claim.** If it needs paid traffic
   at $2.00 CPC, the spend is $24,000 against $32,283 of revenue and $16,978 of gross
   profit — an immediate loss. **The Strong case is only strong if it is organic.**
2. **Operational load at 266 orders/month is real**: ~22 hours/month of chart QA at 5
   min/order, plus support, plus the framed-order damage claims (12% reserve = ~$3,900 of
   reprints over the six months).
3. **Cash timing:** the POD supplier charges at order placement; Stripe pays out on a
   rolling 2-day basis. Working-capital exposure is roughly one to two days of COGS —
   small, but check the supplier does not require prepaid credit.

### 10.4 Cross-scenario summary

| | Conservative | Base | Strong |
|---|---|---|---|
| Month 6 revenue | $631 | $4,470 | $32,283 |
| Month 6 gross profit | $353 | $2,412 | $16,978 |
| Month $1k revenue first cleared | not in 6 mo (~M9–10) | **M3** | **M1** |
| Month $1k gross profit first cleared | not in 6 mo (~M12) | **M4** | **M1** |
| 6-month cumulative net (pre-salary) | $997 | $6,538 | $40,334 |

---

## 11. The two AOV levers, modelled explicitly

### 11.1 Multi-copy — the good lever

Base case, 18×24 unframed, varying copy count. Extra copies at −25% (2nd) and −35% (3rd+).

| Order | Revenue | Fees | COGS | Reserve | **Gross profit** | **GM%** | GP per copy |
|---|---|---|---|---|---|---|---|
| 1 copy | $79.00 | $3.30 | $27.00 | $1.08 | **$47.62** | 60.3% | $47.62 |
| 2 copies, **one address** | $138.25 | $5.53 | $44.00 | $1.76 | **$86.96** | 62.9% | $43.48 |
| 3 copies, **one address** | $189.60 | $7.48 | $61.00 | $2.44 | **$118.68** | 62.6% | $39.56 |
| 2 copies, **two addresses** | $138.25 | $5.53 | $54.00 | $2.16 | **$76.56** | 55.4% | $38.28 |
| 3 copies, **three addresses** | $189.60 | $7.48 | $81.00 | $3.24 | **$97.88** | 51.6% | $32.63 |

**Two findings:**

1. **Multi-copy raises blended margin when copies ship together** (60.3% → 62.9%), because
   the marginal cost of the second print is $17 while the marginal revenue is $59.25. The
   −25% discount is generous *and* accretive. Good design.
2. **Split shipping costs ~7.5 margin points and ~$5 of GP per copy.** It is not a
   profitability cliff — an extra copy at −25% shipped separately still earns $28.94 of
   contribution — but the discount ladder was priced assuming a shared package.
   **Verify that the supplier will roll multiple prints into one tube.** If they will not,
   either (a) charge $9 shipping on additional addresses, or (b) reduce the second-copy
   discount to −15%.

Break-even on a separately shipped extra copy: the copy must be priced above **~$29
(−63% off $79)** to break even. So even the worst case is not loss-making — this is a
margin-dilution question, not a survival question. Do not over-engineer it.

**The share loop beats the multi-copy discount outright:**

| Path to three prints of the same chart | Revenue | Gross profit |
|---|---|---|
| One order, 3 copies, discounted, one address | $189.60 | **$118.68** |
| One order, 3 copies, discounted, three addresses | $189.60 | **$97.88** |
| **Three separate full-price orders (relatives)** | **$237.00** | **$142.86** |

A relative who buys their own copy at full price after receiving the share link is worth
**20–46% more gross profit** than the same print sold as a discounted extra copy — and
carries zero acquisition cost. **This is the arithmetic reason to invest engineering time
in the share flow rather than in bundle discounting.** The discount ladder exists to catch
the buyer who wants to handle it all in one transaction; the share loop is the actual
growth engine.

### 11.2 Blended margin as the discount mix shifts

Base case, holding everything else constant, varying the share of orders that include
extra copies (split 4:1 between 2nd-copy-only and 3rd+):

| Extra-copy attach | AOV | COGS | Gross profit | **GM%** | Orders for $1k GP |
|---|---|---|---|---|---|
| 0% | $96.78 | $38.59 | $51.36 | **53.1%** | 20 |
| **13% (Base)** | **$104.34** | **$40.82** | **$56.31** | **54.0%** | **18** |
| 25% | $111.38 | $42.88 | $60.94 | **54.7%** | 17 |
| 40% | $120.14 | $45.45 | $66.70 | **55.5%** | 15 |

**Margin rises with discount attach.** This is counter-intuitive and it is correct: the
discount is applied to a unit whose incremental cost is only the print. Push multi-copy.

### 11.3 Framing attach — the bad lever, quantified

Same treatment, varying framed attach at the modelled Δ of $38.70 blended:

| Framed attach | AOV | COGS | Gross profit | **GM%** |
|---|---|---|---|---|
| 0% | $91.84 | $31.14 | $55.67 | **60.6%** |
| **25% (Base)** | **$104.34** | **$40.82** | **$56.31** | **54.0%** |
| 50% | $116.84 | $50.49 | $56.96 | **48.8%** |
| 75% | $129.34 | $60.17 | $57.59 | **44.5%** |

**Moving framed attach from 0% to 75% moves gross profit per order by $1.92 while costing
16 points of margin** and adding meaningful breakage, refund and support exposure. At the
modelled costs, framing is close to economically neutral in dollars. If the verified Δ is
worse than $41 it becomes negative.

### 11.4 Lever value ranked — gross profit added per 5 percentage points of attach

| Lever | +5pts of attach adds to AOV | adds to COGS | **adds to gross profit** | Effective margin on the lever |
|---|---|---|---|---|
| Extra copies (−25%) | +$3.00 | +$0.86 | **+$1.99** | 66% |
| Digital file (+$15) | +$0.56 | ~$0.00 | **+$0.53** | 95% |
| Gift wrap (+$8) | +$0.40 | +$0.13 | **+$0.24** | 60% |
| Rush (+$15) | +$0.75 | +$0.60 | **+$0.11** | 15% |
| **Framing (+$50)** | **+$2.50** | **+$1.94** | **+$0.44** | **18%** |

**Priority order for AOV work: multi-copy first, digital add-on second, gift wrap third.
Framing and rush are conversion/service features that happen to carry revenue — do not
build the AOV strategy on them.**

---

## 12. Sensitivity: what happens when the COGS assumptions are wrong

Since supplier pricing has never been verified, this is the table that determines whether
the plan is robust or brittle. Base case, flexing blended COGS.

| COGS error | Blended COGS | Gross profit/order | GM% | Orders for $1k GP | Break-even CAC |
|---|---|---|---|---|---|
| −20% (supplier better than modelled) | $32.66 | $65.16 | 62.4% | 16 | $65.16 |
| −10% | $36.74 | $60.74 | 58.2% | 17 | $60.74 |
| **0% (modelled)** | **$40.82** | **$56.31** | **54.0%** | **18** | **$56.31** |
| +10% | $44.90 | $51.89 | 49.7% | 20 | $51.89 |
| +25% | $51.03 | $45.25 | 43.4% | 23 | $45.25 |
| +40% | $57.15 | $38.62 | 37.0% | 26 | $38.62 |

A 25% COGS miss moves the $1k-gross-profit bar from 18 orders to 23 — a 28% increase in
the work required. Survivable. A 40% miss puts gross margin at 37% and break-even CAC at
$38.62, which closes off paid acquisition permanently.

**Reading:** the model is **not fragile to moderate COGS error in aggregate**. It is
fragile to one specific input — the framing increment — because that single line has a
hard cliff at $41–45 rather than a gentle slope (§5).

---

## 13. What has to be verified, in priority order

| # | Number | Why it matters | How to verify | Cost |
|---|---|---|---|---|
| 1 | **Framed 18×24 and 24×36 delivered cost** | Cliff at Δ = $41–45. Determines whether framing is a business or a liability, and whether the flat +$50 must become tiered | Prodigi + Gelato live pricing, US residential address, incl. shipping | Free, 30 min |
| 2 | **Builder completion rate** ("will she type 15 names?") | It is the 20/27/33% cell in §8.2. If it is 5%, nothing else matters | Ship the builder behind a landing page with no checkout; instrument starts, person-count, drop-off | ~2 weeks of build |
| 3 | Unframed 12×18 / 18×24 / 24×36 delivered cost | Sets the 57–61% margin floor | Same supplier pull | Free |
| 4 | Whether the supplier ships N prints in one tube | Worth ~7.5 margin points on multi-copy orders (§11.1) | Supplier docs / support ticket | Free |
| 5 | Real CPC and click→builder-start rate | §9.2 says paid is dead; a $1.00 CPC with 2%+ conversion would reopen it | $200 test budget after #2 is measured | $200 |
| 6 | Shared-link conversion rate | The 7–12× multiplier is the whole growth thesis | Track shared-link sessions as a distinct channel from day one | Free |
| 7 | Framed damage/reprint rate | Swings the framing break-even by $4 | 20-order sample; cannot be known in advance | Time |
| 8 | Whether the supplier offers gift wrap at all | If not, the $8 add-on either disappears or becomes self-fulfilled labour | Supplier docs | Free |

**Items 1 and 2 are free or nearly free and gate everything else. Do not spend money on
acquisition, branding, or the vertical-tree layout until both are answered.**

---

## 14. Honest summary

- **$1,000/month of revenue is ~10 orders. $1,000/month of gross profit is ~18 orders and
  ~$1,900 of revenue.** Both are modest. Use the second one as the real target.
- **Unframed unit economics are sound** — 57–61% gross margin, which lands at the bottom
  of the 60–68% target band from the brief. The Phase 2 target band was slightly
  optimistic; call it 54–61% blended.
- **Framed unit economics are the whole risk.** 38–40% margin at the modelled cost, and
  the +$50 flat uplift is already provably wrong at 24×36 (Δ = $48 modelled vs a $41–45
  break-even). **The delivered incremental cost of a frame is the single most important
  unverified number in this business.**
- **Paid acquisition is not viable at launch.** Break-even CAC $49–64 against a modelled
  CAC of $84–392. Even with generous share-loop and repeat assumptions, lifetime gross
  profit per acquired builder is ~$81. Growth has to be earned.
- **The multi-copy ladder is the best AOV lever and it improves margin.** The share loop
  is better still — a relative's full-price order is worth 20–46% more gross profit than a
  discounted extra copy in the same box.
- **The Base case clears $1k revenue in month 3 and $1k gross profit in month 4, on the
  strength of one assumption: 120 organic visitors/day by month 6.** The Conservative case
  does not clear $1k of revenue inside six months at all.
- **Everything above rests on a completion rate nobody has measured.** The economics are
  fine. The demand is unproven. Do not confuse the two.
