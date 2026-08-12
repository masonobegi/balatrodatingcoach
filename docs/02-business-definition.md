# Phase 2 — Business Definition

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



Descends from `docs/00-decision-brief.md`. That file is the source of truth for
*what* the business is. This file defines it *completely* — brand, buyers,
catalogue, SKUs, prices, costs, shipping, fulfilment, returns, offers, email,
retention — at the level of detail you can act on tomorrow.

**Reading rules for this document**

- Every number that did not come from a signed contract or a live price list is
  labelled `[ASSUMPTION]` or `[RULE OF THUMB]` with its reasoning basis.
- **No supplier pricing in this document is verified.** Prodigi and Gelato
  pricing was never confirmed (the research pass hit hard tooling limits). Every
  COGS line is a model, not a quote. The 30-minute verification job is listed in
  §16.
- The bar is $1,000/month. At a $95 AOV that is **~11 orders/month** — roughly
  one order every three days. That is a modest bar and this document does not
  pretend otherwise.

---

## 1. Brand concept and the name

### 1.1 What the brand is

Kinline sells **an heirloom, not a chart**. The chart is the mechanism; the
product is the moment a 78-year-old unwraps a framed object with her parents',
grandparents' and great-grandparents' names set in type she'd expect to see in a
museum. The design quality is not decoration on top of the product — it *is* the
product, because the underlying data (15 names) is something the customer
already owns and could write on a napkin.

Three brand commitments, in priority order:

1. **Design-led, not data-led.** We never show the customer a database. No
   "records", no "sources", no "matches", no research jargon.
2. **Finished, not editable.** Competitors sell software you operate. We sell a
   thing that arrives in a box. The builder is a five-minute means to that end
   and should feel like filling in a card, not using an app.
3. **Occasion-native.** Every surface (homepage, email, packaging, copy) assumes
   this is a gift with a date attached.

### 1.2 Name rationale — "Kinline"

| Criterion | Assessment |
|---|---|
| Meaning | *Kin* (family, blood relation — warm, old, Anglo-Saxon) + *line* (lineage, bloodline, and literally the drawn line on the chart). The compound reads instantly without explanation. |
| Pronounceable/spellable on hearing | Yes. Two common English syllables, no ambiguous spelling. Critical because the growth loop is word-of-mouth between relatives who hear the name spoken at a family gathering. |
| Not genealogy-coded | Contains no "ancestry", "roots", "heritage", "tree", "genealogy", "DNA" — deliberately. Those words position us against Ancestry and MyHeritage, a fight we lose and don't want. |
| Gift-shelf plausible | Sits comfortably next to a stationery/print brand name. Passes the "would this look right stamped on the back of a framed print" test. |
| Trademark/domain risk | **Unverified.** `kinline.com` availability, USPTO/UKIPO clearance in Class 16 (paper goods/prints) and Class 42 (SaaS) must be checked before any spend on brand assets. Treat as an open action, not a settled fact. |

**Tagline candidates** (pick one, do not use all): "Your family, properly
printed." / "Five minutes. Three generations. One heirloom." / "The gift nobody
else can buy them."

Deliberately rejected: anything with "story", "journey", "legacy" — the
personalised-gift category is saturated with them and they signal a low-price
Etsy/Amazon listing rather than an archival print.

---

## 2. Customer personas

These are written as people because the copy, the builder UX and the ad
creative all get judged against them. Both are **composites reasoned from the
brief**, not from interviews. `[ASSUMPTION]` — no customer research exists yet.
Persona validation is the cheapest and highest-value thing in the first 30 days.

### 2.1 PRIMARY — Rachel Doyle, 47, Columbus OH. "The organiser daughter."

| Dimension | Detail |
|---|---|
| Situation | Mother, Eileen, turns 80 in March. Rachel is the sibling who organises everything: the venue, the cake, the group photo, the WhatsApp group with her brother and two cousins. |
| What she knows | Her four grandparents' names and roughly where they were from. Two of eight great-grandparents. She'd have to text her aunt for the rest. |
| What she does NOT know | What a GEDCOM is. That fan charts have a name. That there is a difference between giclée and inkjet. She will never learn any of this and we must never require it. |
| Where she is | Instagram and Facebook (the last two demographics where 45+ women are reachable at scale), Pinterest for gift ideas, Google for "80th birthday gift for mom". Not on Reddit r/Genealogy. |
| Budget | Comfortable at $80–$150 for a *significant* gift for a parent's milestone. The gift's job is to be the one everyone photographs. `[ASSUMPTION — reasoned from the milestone-gift occasion, not measured]` |
| What she fears | (a) It arrives looking cheap. (b) A name is spelled wrong and it's now a permanent artefact of her carelessness. (c) It doesn't arrive in time. Every one of these is a policy decision later in this document. |
| Job to be done | "Give my mother something that proves I paid attention, in one evening, without asking her for anything." |
| Why she abandons | The form feels like homework; she doesn't know a great-grandmother's maiden name and there's no graceful way to leave it blank; she can't see what it will look like until the end. |
| Her killer objection | *"Do I have to fill in everyone?"* The answer must be a loud, early, visible **no** — the chart must look beautiful with gaps. |

**The single largest unvalidated assumption in the whole business is that Rachel
will type in ~15 names.** Not that she'd like the poster — that she'll do the
data entry. Everything downstream is contingent on it.

### 2.2 SECONDARY — Martin Prentice, 68, retired teacher, Portland OR. "The family historian."

| Dimension | Detail |
|---|---|
| Situation | Eleven years into an Ancestry subscription. 2,400 people in his tree. Wants a physical artefact for the family reunion in July and, privately, for himself. |
| What he has | A GEDCOM export, and the competence to produce one. |
| Why he matters | Higher generation counts → skews to 24×36 and framed → higher AOV. Buys multiple copies for relatives without being prompted. |
| Why he is NOT the market | He is exactly the person who can bypass us: export → free open-source SVG renderer (`nliautaud/gedcom-svg-fanchart`, 2016; `AleBeda/genechart`, June 2026) → local large-format printer. The GEDCOM-literacy squeeze is real and it is *his* squeeze. |
| How we serve him | GEDCOM upload exists, is unadvertised on the homepage, and costs us almost nothing to maintain. We take his money when he can't be bothered to self-serve. We do not build the product around him, price for him, or buy ads against him. |
| What would make him churn to a free tool | Any friction in the upload, or a price above ~$150 for the large framed piece. He is price-sensitive in a way Rachel is not, because he knows what the alternative costs. |

### 2.3 The persona split, made explicit

| | Rachel (primary) | Martin (secondary) |
|---|---|---|
| Share of orders `[ASSUMPTION]` | 85% | 15% |
| Entry path | Manual entry | GEDCOM upload |
| Generations | 3–4 (7–15 people) | 5–7 (31–127 people) |
| Price sensitivity | Low (occasion-priced) | High (knows the alternative) |
| Marketing spend against them | ~all of it | ~none |
| Can bypass us? | No — she lacks design judgement and a printer | Yes — trivially |

---

## 3. Positioning statement

> **For the person organising the family gift** — a milestone birthday, a first
> Christmas without a parent, a golden anniversary — **who wants to give
> something that can't be bought off a shelf**, *Kinline* **is a family tree
> print you design yourself in five minutes and hang for the next forty years.**
>
> Unlike genealogy-print services, which require a file you don't have and
> produce output that looks like it came from a database, and unlike
> personalised-gift marketplaces, where you message a stranger and wait days for
> a mock-up, **Kinline shows you the actual poster as you type and ships it the
> same week.**

**The one-line version, for ads:** *A gift they can't buy for themselves and
nobody else can buy them.*

**What we are positioned against (in order):** the generic engraved/personalised
gift, not Ancestry. Rachel's alternative purchase is a photo book, a piece of
jewellery, or a personalised cutting board — not a genealogy subscription.

---

## 4. Core value proposition

| Layer | Statement | Why it's defensible |
|---|---|---|
| Functional | A legible, correctly typeset family tree of *your* family, printed on archival paper, in your hands in ~7 days. | Automatic layout of a 3–7 generation chart — curved-path text, per-ring type scaling, hyphenation, tasteful truncation, balancing around missing branches — is a genuine engineering problem. Shopify cannot do it at any price. |
| Emotional | Proof you paid attention. The gift that makes a room go quiet. | Nothing in the category competes on this. Incumbents sell output. |
| Social | Sharable mid-build to relatives, who each see a beautiful chart of *their own* family. | The growth loop. It gets cheaper as it grows — the only mechanic here that does. |
| Risk-removal | Live preview of the actual artefact before paying; free reprint if a name is wrong. | Directly answers Rachel's two fears. See §10. |

**The value proposition in one sentence Rachel would say back to you:** *"You
type in your grandparents' names and it turns into a really beautiful poster."*
If she can't say that after four seconds on the homepage, the homepage is wrong.

---

## 5. Product catalogue and SKU structure

### 5.1 What is actually manufactured

One paper. One frame. Two layouts. Three sizes. **Choice is a conversion tax on
a gift buyer** — Rachel does not want to evaluate paper weights, she wants to be
told what's best.

| Attribute | Options | Note |
|---|---|---|
| Layout | `FAN` (fan chart), `VER` (vertical tree) | Fan expected to dominate `[ASSUMPTION]` — it is the visually distinctive one and the one that photographs well. Vertical serves people who want it to read like a document. |
| Size (in) | `1218`, `1824`, `2436` | 18×24 is the default/recommended. |
| Finish | `UF` (unframed, rolled in tube), `FR` (framed) | Frame: single colour at launch (black or natural oak — pick ONE, whichever the supplier does best). A second frame colour is a post-validation decision. |
| Paper | Museum-grade matte fine-art giclée, ~200–250gsm | Not a customer-facing choice. One paper, described well. |
| Colourway | 2–3 designer presets (e.g. Ink, Sepia, Bone) | Presets only. Never a colour picker — customers pick badly and then blame the print. |

### 5.2 SKU structure

```
KIN-{LAYOUT}-{SIZE}-{FINISH}[-{FRAMECOLOUR}]
```

| SKU | Description | Price |
|---|---|---|
| `KIN-FAN-1218-UF` | Fan chart, 12×18, unframed | $49 |
| `KIN-FAN-1824-UF` | Fan chart, 18×24, unframed | $79 |
| `KIN-FAN-2436-UF` | Fan chart, 24×36, unframed | $119 |
| `KIN-VER-1218-UF` | Vertical tree, 12×18, unframed | $49 |
| `KIN-VER-1824-UF` | Vertical tree, 18×24, unframed | $79 |
| `KIN-VER-2436-UF` | Vertical tree, 24×36, unframed | $119 |
| `KIN-FAN-1218-FR-BLK` | Fan chart, 12×18, framed | $99 |
| `KIN-FAN-1824-FR-BLK` | Fan chart, 18×24, framed | $129 |
| `KIN-FAN-2436-FR-BLK` | Fan chart, 24×36, framed | $169 |
| `KIN-VER-*-FR-BLK` | Vertical, framed (3 sizes) | $99 / $129 / $169 |
| `KIN-ADD-WRAP` | Gift wrap + handwritten-style card | +$8 |
| `KIN-ADD-DIGITAL` | Hi-res print-ready file | +$15 — **post-purchase add-on only**; free with any 24×36 |
| `KIN-ADD-RUSH` | Expedited production + shipping | +$15 (see §8) |

12 physical SKUs, 3 add-ons. The design variants (colourway, generation count,
titles) are **attributes of the order, not SKUs** — they don't change cost and
shouldn't multiply the catalogue.

### 5.3 The digital file — why it is crippled on purpose

A print-ready digital file **is** the poster. Sold standalone at $15 it
cannibalises a $79 physical order and hands the customer a file they can print
at Costco for $12. So:

- Never on the product page. Never in the main navigation. Never in an ad.
- Offered **only** on the post-purchase thank-you page and in the shipping
  confirmation email, to someone who has already bought a physical print.
- Free with 24×36 — because at that price point the customer has already bought
  the largest physical object we sell, so the file cannot cannibalise anything,
  and it makes the top tier feel complete.

This is a deliberate margin sacrifice to protect the core product. It is correct.

---

## 6. Pricing — and the reasoning behind every number

### 6.1 The price ladder

| SKU tier | Price | Reasoning |
|---|---|---|
| 12×18 unframed | **$49** | The entry point and the *anchor breaker*. Its job is to make the site feel accessible in the ad-click moment and then lose the comparison to 18×24 on the product page. At 12×18 a 4-generation fan is legible but tight — genuinely the "small" option, which makes the upsell honest rather than manipulative. |
| 18×24 unframed | **$79** | **The intended default.** Priced at 1.6× the entry for ~1.8× the area — a visible bargain in the size comparison. This is the SKU the whole page should steer toward, because AOV maths depend on it (§6.4). |
| 24×36 unframed | **$119** | The historian/reunion SKU and the "I want the real one" SKU. 2.4× the entry price for 4× the area. Includes the digital file, which costs us ~$0 and adds ~$15 of perceived value at the exact moment the customer is deciding between $79 and $119. |
| Framed | **+$50** | Rachel is buying a *gift*. An unframed rolled poster is not a gift — it's an errand she has handed to her 80-year-old mother. Framing converts the product into something that can be unwrapped and hung the same afternoon. Expect this to be the single biggest AOV lever after size. |
| 2nd copy, same design | **−25%** ($37 / $59 / $89) | Zero design cost, zero support cost, one extra print. The discount is generous because the marginal order is nearly pure margin and because multi-copy is how one chart becomes many orders. |
| 3rd+ copy | **−35%** ($32 / $51 / $77) | Targets the sibling set and the reunion. See bundles, §12.2. |
| Gift wrap + card | **+$8** | Priced to be a trivial "yes" at checkout. Modelled cost ~$2–3, so it's ~65% margin, but its real job is to make the box arrive gift-ready so Rachel doesn't have to do anything. |
| Digital file | **+$15** | Priced *low enough to be an easy post-purchase yes* and *high enough that nobody would seek it out instead of a print*. Never standalone. |

### 6.2 Why these prices and not lower

The temptation to price at $29/$49/$79 should be resisted:

1. **The gift occasion sets the reference price, not the paper.** Rachel is
   comparing against a $120 piece of jewellery, not a $12 Costco poster. A
   milestone-birthday gift priced at $29 signals *tat*.
2. **Margin funds the reprint policy** (§10), which is the thing that makes this
   business survivable at small scale.
3. **We cannot win a price war and shouldn't start one.** Our advantage is that
   there is no comparable listing (§13). Pricing near a commodity print invites
   the comparison we are structurally immune to.
4. **11 orders/month at $95 is the goal. 24 orders/month at $45 is the same
   revenue and four times the support load.** At this scale, price beats volume
   every time.

### 6.3 Where this pricing is weak

**The flat +$50 framing uplift is the most fragile number in the catalogue.**
Frame cost scales with size (glazing, moulding length, and especially the
shipping of a rigid glazed 24×36 object) while our uplift does not.

| Sensitivity | Consequence | Trigger to act |
|---|---|---|
| Framed 24×36 landed COGS > $85 | Framed 24×36 gross margin falls under ~45%, below the framed target | Move to a **tiered** uplift: +$40 / +$50 / +$70. Decide this the day supplier pricing is verified, before launch. |
| Framed 12×18 landed COGS < $28 | The flat +$50 is over-earning on small and can subsidise the large | Keep flat; it simplifies the page and the small size is the volume tier |

Do not launch the framed line until real supplier pricing is in hand.

### 6.4 The AOV model — and what has to be true for $95

| Line | Attach / mix `[ASSUMPTION]` | Contribution to AOV |
|---|---|---|
| 12×18 unframed | 30% of base | $14.70 |
| 18×24 unframed | 45% of base | $35.55 |
| 24×36 unframed | 25% of base | $29.75 |
| **Base print AOV** | | **$80.00** |
| Framed attach | 25% × $50 | +$12.50 |
| Gift wrap attach | 30% × $8 | +$2.40 |
| **Modelled AOV** | | **$94.90** |

Extra copies and the post-purchase digital file are *excluded* from this model —
they are upside, and folding them in to reach the target would be flattering
the number.

**The honest downside case.** If the mix skews to the entry SKU (say 55% at
12×18) and framing attaches at only 12%:

| Scenario | AOV | Orders needed for $1,000/mo |
|---|---|---|
| Modelled | $95 | **11** |
| Downside (small-skew, low frame attach) | ~$62 | **17** |
| Upside (historian-heavy, 40% frame attach) | ~$118 | **9** |

Seventeen orders a month is still not a heroic number. But the difference
between 11 and 17 is entirely determined by how hard the product page pushes
18×24 and framing — which makes merchandising, not traffic, the first thing to
get right.

**$1,000/month in revenue is not $1,000/month in profit.** At a 60% blended
gross margin and 11 orders, contribution is ~$630/month, minus ~$26/month fixed
infra, minus every dollar of paid acquisition. If CAC is $30, contribution drops
to ~$300/month. Say this out loud whenever anyone calls $1k/mo "the bar".

---

## 7. Expected product costs — ALL ASSUMPTIONS

> **Nothing below is a quote.** These are modelled landed costs (print + inbound
> shipping to the customer) for a fine-art giclée print-on-demand supplier,
> reasoned from typical POD list pricing for museum-grade matte paper and
> framed prints. `[ASSUMPTION — modelled, not verified]`. Verify against live
> Prodigi and Gelato pricing before spending a dollar on acquisition.

### 7.1 Unframed

| SKU | Price | Print `[A]` | Ship `[A]` | Landed COGS | Stripe (2.9%+$0.30) | Gross profit | GM% |
|---|---|---|---|---|---|---|---|
| 12×18 UF | $49 | $10 | $8 | $18 | $1.72 | $29.28 | **60%** |
| 18×24 UF | $79 | $17 | $10 | $27 | $2.59 | $49.41 | **63%** |
| 24×36 UF | $119 | $26 | $14 | $40 | $3.75 | $75.25 | **63%** |

### 7.2 Framed

| SKU | Price | Print+frame `[A]` | Ship `[A]` | Landed COGS | Stripe | Gross profit | GM% |
|---|---|---|---|---|---|---|---|
| 12×18 FR | $99 | $32 | $18 | $50 | $3.17 | $45.83 | **46%** |
| 18×24 FR | $129 | $42 | $23 | $65 | $4.04 | $59.96 | **46%** |
| 24×36 FR | $169 | $58 | $30 | $88 | $5.20 | $75.80 | **45%** |

Framed margins are structurally ~17 points below unframed. That is expected and
acceptable **in percentage terms** because the absolute contribution is higher
or equal ($45–$76 vs $29–$75) — but note that framed 24×36 earns roughly the
same *dollars* as unframed 24×36 while carrying far more breakage risk. That is
the argument for the tiered framing uplift in §6.3.

### 7.3 Add-ons and other variable costs

| Item | Cost `[ASSUMPTION]` | Note |
|---|---|---|
| Gift wrap + card | $2.50 | Supplier-side option if available; otherwise a real operational problem — see §9.3 |
| Digital file | ~$0.01 | R2 storage + zero egress |
| Stripe Tax | 0.5% of order in registered jurisdictions | Only where registered |
| Reprint provision | ~7% × COGS ≈ $2.10/order | §10 |
| Payment disputes/fraud | 0.3% of revenue `[RULE OF THUMB]` | Low-fraud category; personalised goods reduce chargeback incentive |

**Blended gross margin at the modelled mix: ~57–60% after reprint provision.**
Slightly below the 60–68% target in the brief. The gap closes if either (a)
supplier pricing is better than modelled, or (b) framing moves to tiered
uplift. Do not assume (a).

---

## 8. Shipping strategy

### 8.1 The decision: free standard shipping on every order, no threshold

| Option | Verdict | Reasoning |
|---|---|---|
| Charge shipping at checkout | **No** | Shipping cost surprise is the single most reliable cart-abandon trigger `[RULE OF THUMB — universal ecommerce finding]`. On a gift purchase where the buyer has already spent 5–10 minutes typing family names, an $11 surprise at step 4 is unforgivable value destruction. |
| Free shipping over $75 threshold | **No — but it's the real alternative** | It would push 12×18 buyers toward 18×24 or an add-on, which is exactly our AOV goal. But it puts a shipping charge on our cheapest, most conversion-fragile SKU at the exact moment the entry-price promise from the ad is being tested. |
| **Free standard shipping on all orders** | **Yes** | Only three sizes; shipping is already in the modelled COGS; the price ladder is simple enough to say "$49, shipping included" in an ad. Simplicity is worth more than the AOV nudge at 11 orders/month. |

**If you ever want the threshold back**, the right move is not to add shipping to
$49 — it's to raise 12×18 to $55 and keep free shipping. Same economics, no
conversion tax.

### 8.2 Shipping tiers offered

| Tier | Price | Promise `[ASSUMPTION — POD standard]` |
|---|---|---|
| Standard | Free | Production 2–4 business days + transit 3–6 business days = **5–10 business days** |
| Expedited (`KIN-ADD-RUSH`) | $15 | Priority production + expedited carrier = **3–6 business days**. Only offer if the supplier genuinely supports priority production; otherwise this is a lie and it will produce refunds. |

### 8.3 Geography at launch

**United States only at launch.** Reasons: single currency, one tax regime to
register in, one set of carrier expectations, and the POD network is densest
there. UK/EU/CA is a phase-2 decision, and it is genuinely cheap to add because
Prodigi/Gelato print locally — but the tax and consumer-law surface (UK Consumer
Contracts Regulations, EU distance selling, VAT/OSS) is not free, and adding it
before validating that Rachel types in 15 names is optimising the wrong thing.

### 8.4 Christmas — the deadline is a product feature

Christmas is the largest occasion by volume. The mechanic that matters is a
**visible, counted-down order-by date** on every page from ~1 November.

| Product | Order-by date `[ASSUMPTION — derived from §8.2 lead times + 5 business-day carrier buffer]` |
|---|---|
| Framed, standard | ~8 December |
| Unframed, standard | ~11 December |
| Any, expedited | ~16 December |
| Digital file (post-purchase only) | n/a — never marketed as a "too late for Christmas" fallback (see §14) |

Publish dates conservatively and beat them. A missed Christmas delivery on a
gift for a grandmother is not a refund event — it is a permanent brand event
that gets described to twelve relatives.

---

## 9. Fulfilment strategy

### 9.1 Provider: Prodigi primary, Gelato as failover

| Criterion | Prodigi | Gelato |
|---|---|---|
| Fine-art / giclée depth | Strong — museum-grade papers (incl. Hahnemühle-class stocks) are core to the offering | Present, generally shallower on fine-art stocks |
| Framing | Yes, multiple mouldings | Yes |
| Global lab network | Yes, incl. US + UK | Yes, broader country coverage |
| API quality | Well-documented order API, sandbox available | Good API, more commerce-platform-centric |
| Minimums / subscription | None | Some pricing tiers behind a subscription |
| **Verdict** | **Primary.** We are selling an *archival* product; paper quality is the brand. | **Failover + phase-2 international.** Register an account and map SKUs so a switch is a config change, not a rebuild. |

**Critical:** everything in that table is reasoned from category knowledge and is
`[ASSUMPTION]`. It must be replaced with a live comparison of (a) per-SKU price,
(b) actual paper stock names, (c) framed shipping cost, (d) stated production
SLAs, before choosing. **Order physical samples of the same file from both, at
18×24 unframed and 12×18 framed** (~$60–120 all-in `[ASSUMPTION]`). You cannot
sell an heirloom you have never held.

### 9.2 Architectural rule: never couple to one supplier

Store a supplier-agnostic internal SKU and map it to supplier SKUs in a config
table. A print supplier going down or repricing in November — with Christmas
running — is a foreseeable event, and the failover must be an environment
variable, not a sprint.

### 9.3 The gift-wrap problem

Gift wrap + card is an $8 upsell we can only fulfil if **the supplier offers it**
or **we touch the parcel**. If Prodigi/Gelato cannot do gift packaging and
inserted cards:

- Do **not** self-fulfil wrap at launch. It reintroduces inventory, a workspace,
  and per-order human labour — destroying the "software does the Etsy seller's
  labour" thesis.
- Substitute a **printed card produced as a second print item** in the same
  order (a small card SKU from the same supplier, printed with the customer's
  message), and drop "wrap".
- If neither is possible, cut the SKU. Losing $2.40 of AOV is cheaper than
  becoming a fulfilment operation.

### 9.4 What "same-day production" means and what we actually promise

Marketing says *we ship this week*, not *same day*. The supplier's production SLA
is the constraint and it is not ours to shorten. Never promise a date we do not
control. Under-promise by 2–3 days on every order confirmation.

---

## 10. Returns, refunds, and the typo-forgiveness policy

### 10.1 The legal baseline

Personalised/bespoke goods are generally exempt from statutory cancellation
rights — the US has no federal right of return at all, and the UK's Consumer
Contracts Regulations 2013 explicitly exempt goods made to the consumer's
specification. **We are entitled to a no-returns policy.** `[Legal position
stated from general knowledge — confirm with a lawyer before publishing terms.]`

### 10.2 Why we should be far more generous than we're required to be

| Reason | Mechanism |
|---|---|
| Fear of a permanent typo is a top-3 purchase blocker for Rachel | A visible "we'll reprint it free if a name is wrong" removes the objection *before* the sale. This is a conversion feature that happens to be a policy. |
| Our COGS is 20–35% of price | We can afford to eat a reprint; a competitor selling at $25 cannot. Generosity here is a moat funded by margin. |
| The product's whole point is emotional | A customer whose grandmother's name is misspelled and who is told "personalised goods are final sale" produces the worst review in the category, at the worst time of year. |
| Reprint cost ≈ COGS only | The design already exists. A reprint costs one print + one shipment. No labour. |

### 10.3 The published policy

> **The Kinline promise.** If your print arrives damaged, or the printing is
> defective, we reprint and reship it free — no return needed. And if you spot a
> spelling mistake within 30 days of delivery, even if it came from the details
> you entered, we will reprint it once, free. Just tell us what to fix.
>
> We can't accept returns for change of mind, because every print is made
> uniquely for your family.

Explicitly: **no return shipment required.** Asking a customer to repack and
ship back a 24×36 framed print costs more than the reprint and generates a
support thread.

### 10.4 What it costs

| Event | Rate `[ASSUMPTION]` | Basis | Cost per order at $30 avg COGS |
|---|---|---|---|
| Damaged/defective in transit | 3% | POD large-format prints are shipped in tubes/rigid packs; glazed framed items are materially worse | $0.90 |
| Customer typo, claimed within 30 days | 4% | Reduced by the proof step in §10.5 | $1.20 |
| **Total reprint provision** | **7%** | | **~$2.10/order (~2.2% of AOV)** |

Framed items should carry a higher provision (glass/acrylic breakage) —
model 6% defect on framed `[ASSUMPTION]`. If real framed damage rates exceed
~8%, switch the framed line to acrylic glazing or drop 24×36 framed.

### 10.5 The controls that make generosity safe

1. **Mandatory proof step.** Before payment, show a full-resolution render and
   require an explicit checkbox: *"I've checked every name and spelling."* This
   converts most typo claims into goodwill reprints rather than disputes, and
   gives an unambiguous record.
2. **Once per order.** The typo reprint is one free reprint per order; a second
   is charged at the extra-copy price (−25%).
3. **30-day window**, from delivery, stated plainly.
4. **Track it.** Reprint rate is a KPI. If typo reprints run above ~8%, the
   builder's proof step is failing and that is a product bug, not a policy cost.

---

## 11. The initial offer

**Do not discount the print.** A percentage off a gift signals the gift is
cheap, and it trains a discount expectation into a business whose entire thesis
is margin. Add value instead.

### 11.1 Launch offer (first ~100 orders)

> **Free gift wrap and handwritten-style card** (worth $8) **plus a free
> hi-res digital file** (worth $15) **with every 18×24 and 24×36.**

| Component | Our cost `[ASSUMPTION]` | Perceived value |
|---|---|---|
| Gift wrap + card | $2.50 | $8 |
| Digital file | ~$0.01 | $15 |
| **Total** | **~$2.50** | **$23** |

$23 of perceived value for $2.50, and it does two useful jobs: it steers the mix
away from 12×18 (protecting AOV per §6.4) and it gets the digital file into
customers' hands so we learn whether it cannibalises reorders.

### 11.2 The guarantee, which is part of the offer

- *"In time for Christmas, or your money back."* Backed by the published order-by
  dates in §8.4, with a real buffer.
- *"Free reprint if a name is wrong."* (§10.3)

The guarantee is more persuasive than any discount to a buyer whose top two
fears are lateness and a permanent error.

### 11.3 What is NOT in the launch offer

No sitewide % discount. No "first order 15% off" popup. No BOGO. Each of these
would fund itself out of the margin that pays for the reprint policy — the one
thing competitors can't copy at their price points.

---

## 12. Bundles, upsells and cross-sells

### 12.1 Upsells (same product, more of it)

| Upsell | Where it appears | Mechanic |
|---|---|---|
| Size (12×18 → 18×24 → 24×36) | On the preview, before checkout | Show the chart *at scale against a wall/sofa silhouette*. Rachel underestimates how small 12×18 is. Label 18×24 "Most popular". |
| Framing | Preview + checkout | Toggle showing the framed render, not a text option. Copy: "arrives ready to hang". |
| Expedited | Checkout, only when the order-by date is close | Contextual, not always-on. |

### 12.2 Bundles

| Bundle | Contents | Price | Rationale |
|---|---|---|---|
| **Sibling set** | 3 × same design, 18×24 unframed | $189 (vs $237 — an effective −20%) | Directly monetises the "one chart, many orders" loop in a single transaction. |
| **Both sides** | 2 charts — maternal line + paternal line | 2nd chart −25% | Nearly every buyer has two grandparent lines and charts one. This is the most natural second purchase in the business. |
| **The pair** | 1 framed for the recipient + 1 unframed for the buyer | Frame uplift on one only | Rachel wants one too. She won't ask. |
| **Reunion pack** | 5+ copies, same design | −35% each | Serves Martin and the reunion occasion. Marginal orders are near-pure margin. |

### 12.3 Cross-sells and post-purchase

| Offer | Timing | Notes |
|---|---|---|
| Extra copies for relatives | Checkout AND thank-you page | The **single highest-value moment in the funnel**. She has just approved a design she loves and is thinking about who else would want it. |
| Hi-res digital file $15 | Thank-you page + shipping-confirmation email only | Post-purchase only, always. |
| "The other side of the family" −25% | 14 days after delivery | She has now seen the physical object and knows it's good. |
| Gift wrap | Checkout | One-click. |

---

## 13. Why buy from this store instead of Amazon (and instead of MyCanvas or an Etsy seller)

### 13.1 Amazon

**Amazon cannot sell a chart of your ancestors.** The product does not exist
until the customer creates it. Concretely:

| Amazon's advantage | Does it apply here? |
|---|---|
| Price comparison | **No.** There is no comparable listing. No SKU, no competing offer for *the Doyle family fan chart*. |
| Prime delivery speed | Partially — but a milestone birthday is on a known date, planned weeks ahead. Two-day shipping is not the deciding factor for a gift bought for a date in March. |
| Trust / reviews | **Yes, this is Amazon's real advantage** and it is our real weakness. We answer it with a guarantee (§11.2), a reprint promise (§10), and visible reviews from actual customers as soon as we have them. |
| Selection | **Inverted.** Amazon sells *blank* family tree posters you fill in with a pen, and generic personalised gifts. Our selection is a chart of one specific family, which is a selection of one. |

This is a **structural** answer, not a positioning claim, and it is the strongest
single fact in the business plan. It is also the reason not to list on Amazon
ourselves: our product cannot be a listing.

### 13.2 MyCanvas / WebTreePrint / AncestryPrinting / FamilyTreeChart

| | Them | Kinline |
|---|---|---|
| Entry requirement | A GEDCOM file, or an account on a genealogy platform | Type in your grandparents' names |
| Who can buy | People who already do genealogy | Anyone with a family |
| Design | Engineer-built, functional, visually dated; sells *output* | Design-led; sells an heirloom |
| Occasion | None — it's a utility | Christmas, 80th, memorial, anniversary |
| Preview | Generate, then look | Live, as you type |
| Their real risk to us | They already have the genealogy audience | They cannot reach Rachel, because Rachel is not looking for a genealogy product |

The honest counterpoint: **any of them could hire a designer.** Our defence is
not that the layout engine is unbuildable, it's that they are pointed at the
wrong customer and their existing distribution reinforces the wrong positioning.
That is a real but non-permanent moat, and worth saying plainly.

### 13.3 Etsy sellers

| | Etsy seller | Kinline |
|---|---|---|
| Process | Message the seller, send names over chat, wait days for a mock-up, request revisions | Live preview of the actual poster, checkout in one session |
| Turnaround | Days to weeks | Order today, produced this week |
| Cost structure | Human labour per order | Software; marginal cost ≈ printing |
| Scaling | Doesn't — the seller is the bottleneck | Scales to 500 orders/month with no extra headcount |
| Their advantage | **Etsy's own gift-search traffic**, which is enormous and exactly our audience | We must buy or earn that traffic |

Their labour is our software. But note the asymmetry honestly: they have
distribution and we have unit economics. A serious consideration for phase 2 is
**listing on Etsy ourselves** as a traffic source (accepting ~6.5% + fees and a
worse handoff into the builder). Not at launch — Etsy's terms around
custom/digital-tool-driven listings need checking first.

---

## 14. What we deliberately DO NOT sell

| Not sold | Why not |
|---|---|
| **A standalone print-ready digital file** | It *is* the poster. It cannibalises the physical product and hands the customer the ability to print for $12. Post-purchase add-on only, free with 24×36. Non-negotiable. |
| **A GEDCOM-first product** | Sells to precisely the people most able to bypass us (the GEDCOM-literacy squeeze). Upload stays as an unadvertised convenience. |
| **A subscription** | There is nothing recurring to deliver. A subscription would be a rental of software we've promised feels like a card, not an app. |
| **Mugs, tote bags, t-shirts, cushions, keyrings** | Every one destroys the archival/heirloom positioning and drags us into the commodity personalised-gift market where Amazon wins on price and speed. |
| **Canvas, acrylic, metal, wood prints** | Multiplies SKUs and supplier risk, splits the "one perfect paper" story. Revisit only after 200+ orders. |
| **DNA kits, research services, "we'll find your ancestors"** | We would become a genealogy company with per-order human labour. This is the exact business we decided not to be. |
| **Surname histories, "family crests", coats of arms** | These are largely pseudo-genealogy — a surname does not entitle a family to a coat of arms. Selling them is lucrative and corrosive; one credible accusation of selling made-up heritage poisons an heirloom brand permanently. |
| **Custom/bespoke design work, "we'll design it for you"** | Human labour per order. It is the Etsy seller's business model and we exist because it doesn't scale. |
| **Photo-collage family trees** | Requires photo upload, cropping, quality handling and dramatically harder layout. Good phase-2 candidate; a launch-scope disaster. |
| **Blank fill-in-by-hand posters** | Amazon owns this at $18 and it is a different, worse product. |
| **International shipping at launch** | Tax and consumer-law surface before we've validated the core assumption. Phase 2. |
| **A free tier / free downloadable preview at print resolution** | Same cannibalisation logic as the digital file. The on-screen preview is deliberately watermarked and screen-resolution. |

---

## 15. Email capture, repeat purchase, and retention

### 15.1 Email capture — the builder *is* the capture

The highest-intent email capture in this business is not a popup. It's the
moment Rachel has typed nine names and does not want to lose them.

| Mechanism | Trigger | Expected quality |
|---|---|---|
| **"Save your chart"** | After the 3rd–5th name entered | Highest-intent capture available. She is asking us to store her work. `[ASSUMPTION]` this outperforms any discount popup by a wide margin. |
| **Share-link recipient capture** | Relative opens the shared chart and wants their own copy or to add a name | This is the growth loop's monetisation point. Capture email when they contribute a correction. |
| **Order** | Checkout | Transactional; separate marketing consent checkbox. |
| **Occasion reminder opt-in** | Footer + post-purchase | "Remind me before Mother's Day / before Christmas." Low volume, very high intent. |
| **NOT used:** 10%-off entry popup | — | Funds itself out of the margin that pays for the reprint promise (§11.3). |

### 15.2 Email flows

| Flow | Trigger | Content | Why |
|---|---|---|---|
| Abandoned builder | Chart saved, no order in 24h | One-click link back to the exact chart, rendered as an image in the email | The single most valuable automation here. Her work is already 80% done. |
| Abandoned builder #2 | +72h | The guarantee (reprint promise + delivery date), not a discount | Addresses her actual objection |
| Order confirmation | Purchase | Show the design she approved, restate the delivery window conservatively | Reduces "where is it" tickets |
| Shipping confirmation | Fulfilled | Tracking + **digital file add-on** | Post-purchase upsell moment |
| Delivered +3 days | Delivery | Ask for a photo of it on the wall; review request | Photo-on-wall UGC is the highest-converting creative in this category `[ASSUMPTION]` |
| Delivered +14 days | — | "The other side of the family" −25% | Natural second purchase |
| Occasion reminder | Seasonal | "Mother's Day is in 3 weeks — your saved chart is still here" | Reactivates saved-but-unbought charts, which will be the largest asset we accumulate |
| Share nudge | Chart saved with ≥1 blank field | "Not sure of a name? Send this to your aunt." | Powers the growth loop at its natural moment |

Resend free tier (3,000/mo) covers all of this well past the $1k/mo bar.

### 15.3 Repeat purchase — the honest version

**This is not a high-repeat business per customer, and the plan must not pretend
otherwise.** A family tree does not change often. The realistic repeat sources,
ranked:

| Source | Realistic frequency `[ASSUMPTION]` | Notes |
|---|---|---|
| **Extra copies of the same chart** (within 90 days) | The dominant one | Not really "repeat purchase" — it's the growth loop. Most of the LTV above the first order arrives here. |
| **The other side of the family** | Meaningful minority | Every buyer has 2–4 grandparent lines and charts one |
| **Life events** — new baby, marriage, a death | Slow but real | "Update your chart" reprint at −35%; the design already exists, so this is a near-zero-cost order |
| **Next occasion, different recipient** | Occasional | Christmas buyer → Mother's Day buyer |
| **Genuine long-run repeat** | Low | Do not build a loyalty programme for it |

**Stated plainly: LTV in this business is mostly earned within 90 days of the
first order, and mostly from other people, not the same person.** That has a
direct consequence for acquisition — the payback calculation should be run on
*the chart*, not the customer. If one chart reliably produces 1.6 orders
`[ASSUMPTION — unvalidated, and the number to measure first]`, then affordable
CAC is ~1.6× what a single-order model would suggest. If it produces 1.0, the
growth loop doesn't exist and the whole acquisition plan needs rewriting.

### 15.4 Retention — what actually keeps people

Retention here is not a login habit. It is:

1. **The saved chart.** A stored, un-purchased chart is a durable asset we can
   re-activate at every occasion, indefinitely, for the cost of an email. Charts
   saved-but-not-bought should be tracked as a headline metric, not treated as a
   failure.
2. **The physical object on a wall**, seen by every visiting relative. This is
   the highest-leverage retention surface we have and it costs nothing —
   provided the print is genuinely good. It is also the argument for spending on
   paper quality rather than on ads.
3. **Discreet attribution on the print.** A small, tasteful `kinline.com` set on
   the back of the print or on the reverse of the frame — never on the face of
   the artwork. On the face it cheapens an heirloom and we lose more than we
   gain.
4. **Being right.** Correct spelling, correct dates, on-time delivery. In a
   memorial or milestone context this is the entire relationship.

---

## 16. Open items that must be closed before spending money

| # | Item | Owner | Blocks |
|---|---|---|---|
| 1 | **Verify Prodigi + Gelato live pricing** for all 6 unframed and 6 framed SKUs, incl. shipping | Founder | All of §7, the framing uplift decision (§6.3), and any ad spend. ~30 minutes. |
| 2 | **Order physical samples** from both suppliers | Founder | Provider choice. ~$60–120 `[ASSUMPTION]`. You cannot sell an heirloom you haven't held. |
| 3 | **Test the core assumption: will a gift buyer type in 15 names?** | Founder | Everything. Cheapest version is in `docs/09-first-30-days.md`. |
| 4 | Trademark + domain clearance for "Kinline" (Class 16, Class 42) | Founder | Brand asset spend |
| 5 | Confirm supplier gift-wrap/card capability | Founder | The $8 SKU (§9.3) |
| 6 | Legal review of returns/personalised-goods terms | Lawyer | Publishing terms |
| 7 | Confirm framed-item damage rates after first ~30 framed orders | Founder | Whether 24×36 framed survives (§10.4) |

---

## 17. Where this plan is weakest — stated plainly

1. **The 15-names assumption is unvalidated and load-bearing.** If Rachel won't
   do the data entry, no amount of design, pricing or fulfilment work saves this.
   Test it before building the checkout.
2. **Every COGS number here is modelled.** If real framed COGS is 25% above
   model, framed margin drops below 40% and the flat +$50 uplift has to be
   rebuilt — which changes the price architecture, not the spreadsheet.
3. **Traffic has no plan in this document.** This defines the business, not the
   acquisition. The share loop is a *multiplier* on orders, not a source of the
   first order, and the first order has to come from somewhere paid or earned.
   Nothing in the research suggested the software was the hard part.
4. **The growth-loop multiplier (orders per chart) is a guess.** It is the single
   number that determines affordable CAC, and we have no basis for it yet.
5. **The moat against incumbents is positioning, not technology.** MyCanvas
   could hire a designer. Our protection is that they are pointed at genealogists
   and their distribution reinforces it — which is real, and impermanent.
