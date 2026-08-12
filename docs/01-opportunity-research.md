# Phase 1 — Opportunity research & selection record

**Purpose of this document.** This is the audit trail for *why Kinline was chosen*. It is deliberately
written so that a sceptical reader — most likely the founder, six months from now, looking at a business
that is not working — can reconstruct the reasoning, find the load-bearing assumption that broke, and
tell the difference between "the analysis was wrong" and "the analysis was fine, the execution wasn't."

Read §7 (Limits of this research) before you act on anything above it. The selection is defensible on
*structure*. It is not supported by *evidence*. Those are different things and this document keeps them
separate.

**Status of every number below:** unless a figure is explicitly sourced, it is a modelling assumption
produced by reasoning from the brief, and is labelled `[ASSUMPTION]` or `[JUDGEMENT]`. No market size,
search volume, conversion rate, CAC, or supplier price in this document was verified against an external
source. See §7.

---

## 1. What we were selecting for

The founder's constraint set, stated up front because it drove everything:

| Constraint | Value | Consequence for selection |
|---|---|---|
| Revenue target | $1,000/month | ~11 orders/month at a $95 AOV. A modest bar — one order every three days. |
| Time to target | 6 months | Rules out anything with a long trust-accrual or SEO-maturation curve. |
| Startup capital | Low (< ~$1,000 all-in) | Rules out inventory, tooling, moulds, minimum order quantities. |
| Operator | Solo, technical, no existing audience | Rules out anything needing a founder-audience cold start or daily manual labour per order. |
| Ongoing labour | Must not scale linearly with orders | Rules out the Etsy-style bespoke-design model as a *business*, though it validates the *demand*. |

**Do not let the $1,000/month target inflate in the retelling.** It is eleven orders a month. It is the
kind of number a single well-received post can produce in a week and then never produce again. The hard
part is not reaching it once; it is reaching it *repeatably*, and every candidate below was scored on the
repeatable version.

### 1.1 Scoring rubric

Seven dimensions, weighted to 100. Weights reflect what actually kills small e-commerce businesses, in
the order they kill them.

| # | Dimension | Max | What a high score means |
|---|---|---:|---|
| D | Demand certainty | 25 | People are already buying this *specific* thing, in volume, at this price. |
| X | Differentiation / bypass resistance | 20 | The customer cannot easily get the same outcome elsewhere, cheaper, or by themselves. |
| E | Unit economics | 15 | Gross margin ≥60% at realistic COGS, with room for shipping and returns. |
| A | Acquisition | 15 | A plausible, cheap, non-paid channel exists that a solo operator can run. |
| F | Fulfilment & ops | 10 | Print-on-demand or equivalent; no inventory, no per-order manual labour. |
| L | Legal / platform risk | 10 | No IP exposure, no third-party API dependency, no data liability. |
| R | Repeat / expansion | 5 | A reason for the same customer, or their network, to buy again. |

**A note on the D column that matters more than the rest of the rubric.** No candidate scored above
**10/25** on demand certainty, because the research pass could not verify demand for *any* of them (§7).
The D column is therefore not "how much demand exists" — it is "how strong is the *inference* that demand
exists, given category maturity and the presence of incumbents." That is a much weaker claim and it is
the reason the maximum total score across all 30 candidates was 48/100.

---

## 2. Business-model families surveyed

Eight families were surveyed before individual candidates were generated. The family-level verdict did
most of the filtering work; several strong-looking individual candidates were rejected because their
*family* had a structural defect the candidate inherited.

| Family | Core thesis | Why it looked attractive | Structural failure mode found | Verdict |
|---|---|---|---|---|
| **Endurance-sports personalisation** | Runners/cyclists buy artefacts of their achievements | High emotional charge, affluent buyer, clear occasion (race day) | Saturated by licensed incumbents; race names are trademarked in the poster class; Strava API terms now forbid displaying activity data to other users. See §5.4. | **Rejected as a family** |
| **Pet personalisation** | Pets are family; memorial and portrait demand is real | Genuinely large, emotionally durable category | The most crowded personalisation category on earth. Every differentiation we could invent was either already sold on Etsy or created a perpetual service liability (§5.2). | **Rejected as a family** |
| **Family / home keepsakes** | Heritage, milestones, memorial, ancestry as decor | Gift occasions recur annually; buyer is not price-led; low IP risk | Incumbents exist but are engineer-built and file-gated; the file gate is both the incumbents' weakness and a trap (see the GEDCOM-literacy squeeze, `docs/00-decision-brief.md`) | **Selected — Kinline** |
| **Enthusiast micro-communities** | Hobby subcultures buy identity objects (D&D, birding, quilting, coffee) | Cheap to reach via existing forums/subreddits; buyers are self-identifying | Small absolute size; community norms are hostile to commercial entry; and the D&D case carried direct IP exposure (§5.1) | **Mostly rejected; one survivor (Life List Press) ranked mid-table** |
| **Consumables / repeat purchase** | Recurring revenue beats one-shot sales | Repeat purchase is the cleanest path to a durable $1k/mo | Requires inventory, food-safety/labelling compliance, and physical handling. Directly violates the capital and labour constraints. | **Rejected as a family** |
| **Digital-first hybrids** | Sell a file, or a file plus a physical object | Near-100% margin on the digital component | **The cannibalisation finding.** Where the digital file *is* the product (a printable poster), offering it cheaply destroys the physical sale. This finding is the reason Kinline sells no standalone print-ready file. | **Rejected as a primary model; retained as a post-purchase add-on pattern** |
| **B2B / occupational** | Businesses have budget and buy unemotionally | Higher order values, less price sensitivity, less competition | Solo founder with no industry relationships; sales cycles measured in weeks; cold outbound is the only channel and it is labour that does not compound. | **Rejected as a family** |
| **Tool-led-growth e-commerce** | A genuinely useful free tool acquires customers who then buy a physical output | The acquisition channel is the product; no ad spend required | Only works when the tool's output is *inherently* a physical object people want, and when the tool is hard enough to build that it isn't commoditised in a weekend. Almost nothing qualifies. | **Selected as the *mechanism* — Kinline is a family-keepsake business executed as tool-led growth** |

**The two families that survived are the two that combine.** Kinline is a *family/home keepsake* sold via
*tool-led growth*. That combination is where the score came from; neither family scored well alone.

---

## 3. Candidate shortlist

30 candidates were generated. **17 survived first-pass screening and were evaluated on the full criteria
set; those are recorded below. The other 13 were eliminated at screening and were not individually
documented — that is itself a defect in this record (§7.5).**

One-line descriptions below are the working definitions used *during* evaluation. They are compressed and
should not be read as product specs.

### 3.1 Customer, problem, product, price, margin

| Candidate | Customer | Problem | Product | Price point `[ASSUMPTION]` | Gross margin `[ASSUMPTION]` |
|---|---|---|---|---:|---:|
| **Kinline** (selected) | "Organiser daughter", 35–60, buying for a parent/grandparent | Wants a meaningful gift for an occasion; has names in her head, no design skill, no printer | Browser-built fan/vertical family tree chart, printed & framed | $49–$169 | 60–68% unframed |
| Heirloom Cookbook | Adult child / sibling group | Family recipes exist on index cards and are being lost | Layout tool → printed recipe book | $60–$120 | 45–55% |
| Inkloom | Bereaved family member; also anniversary buyers | A handwritten note from someone who has died is the most precious object in the house and is fragile | Handwriting/signature → engraved or printed keepsake | $45–$95 | 60–70% |
| BirthPrint | New parents, grandparents | Birth announcement as decor | Birth-stats poster (name, time, weight) | $35–$65 | 65–70% |
| Life List Press | Birders, 45–70 | A life list is a lifetime's work living in an app | Life list → typographic poster | $55–$95 | 60–68% |
| TraceLab | Parents & primary teachers | Kids need handwriting practice on *their own* words/names | Generated handwriting worksheets (digital + print) | $9–$29 | 85%+ digital |
| Everpaw | Pet owner after a pet dies | Wants a memorial marker that carries the pet's story | QR-linked memorial plaque + hosted memorial page | $39–$79 | *claimed* 65%, **actually far lower** (§5.2) |
| Character Sheet Poster Press | D&D/TTRPG players, 20–40 | Wants their character to exist as an object | Typographic character-sheet poster | $35–$60 | 60–65% |
| SplitPrint / Finisher Store | Marathon/ultra finishers | Wants the race route as art | GPX → route poster | $45–$90 | 60–68% |
| Deskmat Forge | Keyboard/desk-setup enthusiasts | Wants a desk mat that matches a custom build | Custom-printed large desk mat | $39–$69 | 45–55% |
| QuiltFit | Quilters, 50–75 | Fabric-yardage and block layout maths is error-prone | Quilt layout tool + printed pattern | $19–$49 | 70%+ |
| CrewKit | Small trade/field crews (B2B) | Onboarding kit and PPE ordering is ad-hoc | Curated kit bundling + reorder | $150–$400 | 25–35% |
| Blendcraft | Coffee/tea drinkers | Wants a blend to their taste | Custom-blended consumable | $18–$32 | 40–50% |
| LabelWise | Small food producers (B2B) | Compliance-correct labels are hard | Label generator + print | $60–$200 | 55–65% |
| Pull | Espresso enthusiasts | Dialling in a shot is fiddly | Subscription beans + guidance | $22/mo | 30–40% |
| TruckLetter | Owner-operator truckers (B2B) | DOT-compliant door lettering | Door decal generator + print | $60–$120 | 50–60% |
| SplitLab | Runners | Pace/split planning | Race-pace tool with print upsell | $0–$29 | n/a — tool with no product |

### 3.2 Competition, demand, virality, repeat, fulfilment

| Candidate | Competition | Search demand — **UNVERIFIED**, basis of estimate | Social/share potential | Repeat potential | Fulfilment difficulty |
|---|---|---|---|---|---|
| **Kinline** | 4+ functional incumbents (MyCanvas, WebTreePrint, AncestryPrinting, FamilyTreeChart.com) + many manual Etsy sellers. **None design-led, all file-gated.** | Inferred from incumbent survival + Etsy seller density. **No keyword data obtained.** | **High and native** — the "check this is right" share is a genuine need, not a growth hack | Moderate — extra copies to relatives; annual gift occasions | Low — POD, flat pack |
| Heirloom Cookbook | Blurb, Shutterfly, many Etsy templates | Inferred; category clearly exists | Moderate — recipe collection is collaborative | Low | **High** — book binding, page-count variance, proofing |
| Inkloom | Dense Etsy presence; jewellery engravers | Inferred from Etsy density | Low — grief is private | Low | Medium — engraving vendor, not POD |
| BirthPrint | **Extremely dense.** Commodity Etsy/Amazon category | Inferred as high but worthless — high demand meets zero differentiation | Moderate | Low | Low |
| Life List Press | Sparse — a genuine gap | Inferred as **low absolute volume**; birding is a small market | Moderate within a tight community | Moderate — the list grows, the poster ages | Low |
| TraceLab | Free worksheet generators everywhere | Inferred as high | Low | High (school year) | Low (digital) |
| Everpaw | Human QR-memorial vendors exist; pet variant thinner | Inferred | Moderate | **Negative** — see §5.2 | Medium + **perpetual hosting** |
| Character Sheet Poster Press | Etsy sellers; official WotC merch | Inferred as decent | **High** — TTRPG players share obsessively | Moderate — new characters | Low |
| SplitPrint / Finisher Store | **Saturated.** "Mark Your Moment" (licensed official race partner), Positive Prints, RunMapArt, Scottsy, Amazon listings, many Etsy sellers | Inferred as high — which is *why* it is saturated | High | Moderate — one per race | Low |
| Deskmat Forge | Many; commodity | Inferred as moderate | Moderate | Low | Medium — soft goods |
| QuiltFit | Pattern designers; quilting software | Inferred as low | Low | Moderate | Low |
| CrewKit | Distributors with real relationships | Low, B2B search is thin | None | High | **High** — inventory |
| Blendcraft | Large roasters | Moderate | Low | High | **High** — food handling |
| LabelWise | Compliance software vendors | Low | None | Moderate | Medium |
| Pull | Enormous | High | Low | High | **High** — perishable inventory |
| TruckLetter | Local sign shops | Low | None | Low | Medium |
| SplitLab | Free tools everywhere | Moderate | Low | High | n/a |

### 3.3 Capital, CAC, differentiation, risk, why-not-Amazon

| Candidate | Startup capital `[ASSUMPTION]` | CAC difficulty | Differentiation | Principal risk | Why not Amazon? |
|---|---|---:|---|---|---|
| **Kinline** | ~$300 (domain, Vercel, Neon, sample prints) | **Hard** — no cheap paid channel proven; depends on the share loop | Design-led brand + manual entry + auto-layout engine | **Will a gift buyer type in 15 names?** | **Structural.** Amazon cannot sell a chart of *your* ancestors. The product does not exist until the customer creates it. No SKU, no comparison, no equivalent listing. |
| Heirloom Cookbook | ~$400 | Hard | Layout automation | Proofing loop reintroduces manual labour per order | Structural, same as Kinline |
| Inkloom | ~$300 | Medium | Craft quality | Grief-timed demand is unpredictable and unadvertisable | Weak-to-structural — Amazon *does* list handwriting jewellery |
| BirthPrint | ~$200 | **Very hard** | **None found** | Commodity; competes on price | **Fails.** Amazon sells this exact product today. |
| Life List Press | ~$300 | Medium | Genuine gap | Market too small for $1k/mo repeatably | Structural |
| TraceLab | ~$150 | Medium (SEO) | Programmatic SEO at scale | **Thin-content penalty** kills the only channel (§5.5) | Structural but irrelevant — competitor is *free*, not Amazon |
| Everpaw | ~$400 | Medium | QR memorial page | **Perpetual liability funded once** (§5.2) | Structural |
| Character Sheet Poster Press | ~$300 | Medium | Typography | **IP exposure + digital cannibalisation** (§5.1) | Structural on the art, but WotC merch competes |
| SplitPrint / Finisher Store | ~$300 | **Very hard** | **None available** | **Trademark + licensed incumbent + API terms** (§5.4) | Fails — Amazon carries route-poster listings |
| Deskmat Forge | ~$500 | Hard | Weak | Commodity, soft-goods POD margins | Fails |
| QuiltFit | ~$200 | Hard | Real domain maths | Market small; buyers price-sensitive | Structural |
| CrewKit | **$3,000+** | Hard | Curation | Inventory + relationships | Fails |
| Blendcraft | **$2,000+** | Hard | Blend profile | Food compliance | Fails |
| LabelWise | ~$400 | Hard | Compliance rules | Liability if a label is wrong | Structural |
| Pull | **$3,000+** | Very hard | None | Perishables, churn | Fails |
| TruckLetter | ~$300 | Hard | Compliance presets | Local sign shops win on immediacy | Structural |
| SplitLab | ~$150 | Medium | None | **No product to sell** | n/a |

---

## 4. Ranking

| Rank | Candidate | D /25 | X /20 | E /15 | A /15 | F /10 | L /10 | R /5 | **Total /100** | Disposition |
|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 1 | **Kinline** | 9 | 15 | 8 | 4 | 5 | 5 | 2 | **48** | **Selected** |
| 2 | Heirloom Cookbook | 8 | 13 | 7 | 4 | 4 | 6 | 2 | **44** | Runner-up; killed on fulfilment |
| 3 | Inkloom | 8 | 11 | 8 | 5 | 5 | 4 | 2 | **43** | Held in reserve |
| 4 | Life List Press | 5 | 9 | 7 | 4 | 6 | 5 | 2 | **38** | Rejected — market too small |
| 5 | BirthPrint | 9 | 7 | 8 | 6 | 6 | 4 | 1 | **41** | Rejected — zero differentiation |
| 6 | TraceLab | 8 | 6 | 9 | 4 | 6 | 2 | 2 | **37** | Killed (§5.5) |
| 7 | Everpaw | 8 | 9 | 5 | 5 | 5 | 3 | 1 | **36** | Killed (§5.2) |
| 8 | Character Sheet Poster Press | 9 | 7 | 6 | 6 | 5 | 1 | 1 | **35** | Killed (§5.1) |
| 9 | SplitPrint / Finisher Store | 10 | 3 | 7 | 5 | 5 | 2 | 1 | **33** | Killed (§5.4) |
| 10 | Deskmat Forge | 8 | 4 | 6 | 5 | 5 | 3 | 1 | **32** | Rejected |
| 11 | QuiltFit | 5 | 8 | 6 | 3 | 5 | 3 | 1 | **31** | Rejected |
| 12 | CrewKit | 4 | 7 | 7 | 3 | 4 | 4 | 1 | **30** | Rejected — capital |
| 13 | Blendcraft | 6 | 4 | 5 | 4 | 3 | 4 | 3 | **29** | Rejected — capital, compliance |
| 14 | LabelWise | 5 | 5 | 6 | 4 | 4 | 3 | 1 | **28** | Rejected |
| 15 | Pull | 7 | 2 | 4 | 3 | 3 | 4 | 3 | **26** | Rejected |
| 16 | TruckLetter | 4 | 4 | 6 | 3 | 4 | 3 | 1 | **25** | Rejected |
| 17 | SplitLab | 5 | 4 | 3 | 3 | 4 | 2 | 1 | **22** | Rejected — not a business |

*(Rows 4 and 5 are ordered by disposition quality rather than raw score: BirthPrint scores 41 but is
unwinnable, whereas Life List Press at 38 is winnable and merely small. The rubric does not capture that
distinction, which is a rubric defect worth knowing about.)*

**The headline finding of Phase 1 is the top of this column: 48/100.** Nothing scored above 50. This is
not false modesty in the scoring — it is the honest output of a rubric where 25 points are reserved for
demand evidence that was never obtained.

---

## 5. Why the strongest alternatives died

These write-ups matter more than the ranking, because each contains a *transferable* failure pattern that
Kinline's design now explicitly avoids.

### 5.1 Character Sheet Poster Press — killed by digital-tier cannibalisation + IP exposure

Typographic posters of a player's D&D character. Attractive: high emotional attachment, a share-happy
community, cheap acquisition via existing subreddits and Discords, and genuinely fun to design.

Two independent kills:

1. **Digital-tier cannibalisation.** The natural catalogue included a cheap print-ready PDF alongside the
   physical print. But for a poster, *the file is the product*. A $9 PDF does not upsell a $49 print — it
   replaces it, for a customer segment (technically confident, price-sensitive, 20–40) that will happily
   walk it to a local printer. There is no version of the tiering that survives this.
2. **IP exposure.** The value of the poster comes from the character existing inside a licensed
   ruleset — class names, spell names, statistics blocks, the visual grammar of the official character
   sheet. A commercial product built on that surface is exposed to the rightsholder's discretion, and
   that exposure sits on the founder personally.

**Pattern carried into Kinline:** *never sell a print-ready digital file standalone.* This is now a
catalogue rule in `docs/00-decision-brief.md`, not a preference. The file is a post-purchase add-on and a
sweetener on the 24×36 only.

### 5.2 Everpaw — killed by a perpetual liability funded by a one-time payment

A QR-coded pet memorial plaque for a garden or urn; scanning it opens a hosted page with the pet's photos
and story. Emotionally strong, and it was the highest-scoring pet candidate.

The kill is arithmetic, not aesthetic:

| Item | Value | Basis |
|---|---:|---|
| Price | $59 | `[ASSUMPTION]` |
| Claimed gross margin | 65% | Original model |
| **Omitted** | Hosting, domain, image storage, and page availability **in perpetuity** | — |
| Implied obligation | The page must outlive the pet, the plaque, and plausibly the business | Structural |

The customer's entire emotional premise is *permanence*. A one-time $59 payment cannot fund an unbounded
service obligation, and the failure mode is uniquely brutal: the business quietly folds, the QR codes
resolve to nothing, and grieving customers discover their memorial has been deleted. The margin was also
overstated — it counted the plaque COGS and ignored the recurring cost entirely, so the true lifetime
margin is not 65% but *unknown and possibly negative* on a long-lived customer.

**Pattern carried into Kinline:** a one-time purchase must deliver a one-time, finite obligation. Kinline
ships a printed object. The share link is a *convenience* during the build, and its loss degrades nothing
the customer paid for. If share links were ever load-bearing to the value proposition, this failure mode
would return — worth remembering before building "permanent family archive" features.

### 5.3 Inkloom & Heirloom Cookbook — the near misses

**Inkloom** (turning a deceased relative's handwriting into a keepsake) scored 43 and remains the
strongest reserve idea. It died on two points: demand is *event-triggered by bereavement*, which cannot
be advertised into, cannot be scheduled, and has no Christmas peak; and fulfilment requires an engraving
vendor rather than commodity print-on-demand, which raises COGS and reduces vendor substitutability.

**Heirloom Cookbook** scored 44 — the closest runner-up. It died on **fulfilment and proofing**. Books
have variable page counts, binding constraints, and a customer expectation of proof review before print.
That proofing loop is exactly the manual per-order labour that the Etsy sellers perform and that Kinline
exists to eliminate. A recipe book with 40 recipes also demands vastly more typing than 15 names — and if
the central Kinline assumption (will she type 15 names?) is shaky, the cookbook version of it is far
shakier.

### 5.4 SplitPrint / Finisher Store — killed three separate times

GPX race-route posters. This scored the highest *demand* mark of any candidate (10/25 — meaning the
inference of demand was the most confident of a weak set), and the lowest differentiation mark (3/20).

| Kill | Detail |
|---|---|
| **Saturation** | Positive Prints, RunMapArt, Scottsy, direct Amazon listings, and a long tail of Etsy sellers all occupy this. |
| **A licensed incumbent** | "Mark Your Moment" is an *official licensed partner* of major races. Competing means competing with the race organiser's own sanctioned merchandise. |
| **Trademark in exactly our class** | Race names are registered trademarks *in the poster/print class* — the BAA holds "Boston Marathon" registrations covering posters and lithographic prints. The poster is worthless without the race name on it, and putting the race name on it is the infringement. There is no design-around. |
| **Platform dependency** | Strava's API terms now forbid third-party applications displaying activity data to other users. Any route product must therefore be built on user-uploaded GPX, which removes the one-click convenience that would have been the differentiator. |

**Pattern carried into Kinline:** check whether the *thing that makes the product valuable* is somebody
else's property. For Kinline it is the customer's own family names — unownable, untrademarkable, and
unique per order. This is the single cleanest structural property in the whole plan.

### 5.5 TraceLab — killed by channel fragility

Personalised handwriting-practice worksheets. Excellent margin (85%+ digital), genuine demand, trivially
cheap to build. The entire acquisition plan was programmatic SEO — thousands of generated pages of the
form "handwriting worksheet for the name *Amelia*."

That is textbook thin, mass-generated content: the exact pattern search engines have spent years
demoting, applied *site-wide*. It is not a channel with a risk attached; it is a channel that is one
ranking update from zero, with no fallback, in a category where the direct competitor is free.

**Pattern carried into Kinline:** do not select a business whose sole acquisition channel is one that can
be switched off by a third party. Note honestly that Kinline is not fully clean here — the share loop
depends on people opening links, largely via messaging apps and social platforms. It is more robust than
programmatic SEO, but it is not owned.

---

## 6. Why Kinline won

Six reasons, ordered by how much weight they actually carry:

1. **The "why not Amazon" answer is structural rather than positional.** Most personalised-product
   businesses answer "why not Amazon?" with "we're nicer / better designed / more thoughtful," which is a
   preference, not a defence. Kinline's answer is that the product *does not exist* until the customer
   builds it. There is no SKU, no comparison shopping, no equivalent listing. Only three candidates had
   an answer this clean, and the other two (Heirloom Cookbook, Life List Press) failed elsewhere.

2. **The thing being sold is unownable by anyone else.** No trademark, no license, no rightsholder. After
   watching SplitPrint die on the BAA's poster-class registrations and Character Sheet Poster Press die
   on licensed game content, the absence of any IP counterparty is worth a great deal.

3. **The software is the moat, and the moat is real engineering.** Auto-laying out a legible six- or
   seven-generation chart (63 and 127 people respectively) with names on curved paths, per-ring scaling,
   hyphenation, tasteful truncation, and balance across missing branches is a genuine problem. Etsy
   sellers solve it with hours of human labour per order. That labour is our software, and it does not
   scale with order volume. Almost no candidate had this property — most were "put text on a template."

4. **The growth loop is a real user need, not a growth hack.** Every builder hits a wall on a
   great-grandmother's maiden name and *needs* to ask relatives. The share that results exposes the
   product to people who are, by definition, in the same family and therefore valid buyers of the
   identical artefact. This is the only mechanic in the plan that gets cheaper as it grows.

5. **Occasions recur on a calendar.** Christmas, Mother's/Father's Day, milestone birthdays, anniversaries.
   The business does not need to invent demand timing; it needs to be present when it arrives. This also
   makes launch timing a real variable rather than a nicety.

6. **Fulfilment is boring.** Flat, rigid, print-on-demand, no inventory, no perishables, no compliance
   regime, no minimum order quantities. Six candidates died on this dimension alone.

### 6.1 What Kinline explicitly does *not* win on

Recorded here so the record is not a sales document:

- **Acquisition scored 4/15 — the lowest meaningful score in its own row.** There is no proven cheap
  channel. The share loop is a hypothesis about human behaviour, not a tested funnel, and it only fires
  *after* someone has already built a chart. **The loop cannot solve the cold start.** Where the first
  50 builders come from is genuinely unanswered.
- **Demand was never verified.** 9/25.
- **Christmas concentration is a risk, not just an opportunity.** A large share of expected volume sits in
  a few weeks, which means a bad November is a bad year, and it compresses the learning cycle.
- **Legal scored 5/10, not 10/10.** Charts contain data about living private individuals, shared by link.
  That is a real privacy surface, particularly for EU/UK buyers, and it has not been designed for yet.
- **Gift-only positioning caps the ceiling.** Deliberately walking away from the genealogist market is the
  right call for *this* business, but it is a decision to serve the shallower, less committed buyer.

---

## 7. LIMITS OF THIS RESEARCH — read this before spending money

**This is the most important section in the document. The selection above is a structural argument, not
an evidence-based one. The evidence base is close to empty.**

### 7.1 What was NOT verified

| Claim class | Status | Consequence if wrong |
|---|---|---|
| **Search demand for any candidate** | **NOT VERIFIED.** WebSearch budget was exhausted during the research pass. Zero keyword volumes were obtained for any of the 30 candidates. | The entire D column is inference from incumbent survival. If nobody is searching, the business has no discovery channel at all. |
| **Competitor pricing, revenue, or volume** | **NOT VERIFIED.** The egress proxy blocked marketplace and supplier domains. | Incumbent prices quoted (e.g. "MyCanvas fan posters from $50") come from the brief, not from a live check. Our $49–$119 ladder may be mispositioned. |
| **Etsy seller volume in this category** | **NOT VERIFIED.** Marketplace domains blocked. | The claim "Etsy sellers do this by hand, slowly" is the core competitive premise and rests on unverified recall. |
| **Print-on-demand supplier pricing (Prodigi, Gelato)** | **NOT VERIFIED — this is the big one.** Supplier domains blocked. | **Every COGS and margin figure in this repo is a modelling assumption.** If framed COGS exceeds ~$45, the pricing architecture changes, not just the spreadsheet. |
| **Shipping costs and delivery times by region** | **NOT VERIFIED.** | Directly hits margin and the Christmas cutoff promise. |
| **CAC in this category** | **NOT VERIFIED and not estimable.** No figure is offered, because any figure would be invented. | If paid acquisition is needed and CAC exceeds ~$40, the $95 AOV model does not work. |
| **Conversion rate from builder → buyer** | **NOT VERIFIED.** This is the single most important number in the business and it is unknown. | Everything downstream of it is arithmetic on a guess. |
| **Whether a gift buyer will type in 15 names** | **NOT VERIFIED. THE LARGEST UNVALIDATED ASSUMPTION IN THE ENTIRE PLAN.** | If she won't, there is no business. Not a smaller business — no business. |

### 7.2 The one assumption everything rests on

Manual entry is not a feature choice; it is the response to the GEDCOM-literacy squeeze, and it is
therefore load-bearing for the entire strategy. If gift buyers abandon at name 6 of 15, then:

- the differentiation argument (15/20 — the highest score in the entire rubric) collapses, because the
  only way to serve the remaining users is GEDCOM upload,
- and a GEDCOM-first product sells to exactly the people best equipped to bypass it (free open-source
  renderers have existed since 2016; `AleBeda/genechart` shipped free in June 2026),
- which means the business reverts to competing with free tools plus Costco.

There is no partial failure here. **Test this before writing the layout engine.** The cheapest test is in
`docs/09-first-30-days.md`.

### 7.3 Known biases in this record

- **Survivorship bias in the incumbent argument.** "Four incumbents exist, therefore demand exists" is
  weak. Incumbents can survive on a small historian niche that has nothing to do with our gift buyer.
- **The rubric was designed by the same process that generated the candidates**, and its weights were
  chosen with the eventual winner already visible. Reweighting acquisition upward would demote Kinline.
- **Kinline is the candidate the founder finds most interesting to build.** Auto-layout is a genuinely
  satisfying engineering problem. That is a real source of motivated reasoning and it should be named.
- **All 30 candidates are physical-personalisation businesses.** The family survey did not seriously
  consider services, software, or content. The search space was narrower than "all businesses."

### 7.4 What must be verified before any money is spent

In strict order. Do not skip to 4.

| # | Verify | Method | Cost | Time | Kill / change threshold |
|---:|---|---|---:|---:|---|
| 1 | **Will she type 15 names?** | Fake-door: static landing page + a bare-bones entry form, ~$50 of traffic from a relevant paid or community source. Measure *completion*, not clicks. | ~$50 | 1 week | Under ~40% completion of a 15-name form → stop and redesign the input before building anything `[ASSUMPTION — threshold is a judgement call, not a benchmark]` |
| 2 | **Real POD pricing** | Open Prodigi and Gelato live pricing for 12×18, 18×24, 24×36, framed and unframed, plus shipping to US/UK. | $0 | 30 min | Framed COGS > ~$45 → the +$50 framing upcharge is broken; repricing required |
| 3 | **Actual search demand** | Any keyword tool, on "family tree chart print", "family tree poster gift", "ancestry wall art" and the equivalents. | $0 | 30 min | Effectively no volume → discovery must come entirely from the share loop, which cannot cold-start |
| 4 | **Etsy reality check** | Search the category. Count sellers, read the 1–3★ reviews, note turnaround times and whether the process is genuinely manual. | $0 | 1 hr | If instant-preview automated sellers already exist at scale → the core differentiation claim is false |
| 5 | **Incumbent output quality** | Actually order one competitor print. | ~$60 | 2 weeks | If it arrives beautiful, "visually dated incumbents" is wrong and the design-led wedge narrows |
| 6 | **Share-loop plausibility** | Ask 10 people who have built any family tree whether they shared it to check facts. | $0 | 2 hrs | If fewer than half did → the growth loop is a fiction and acquisition has no plan |

Items 2 and 3 cost nothing and take under an hour combined. **There is no defensible reason to write
production code before they are done.**

### 7.5 Defects in this record itself

- 13 of the 30 candidates were eliminated at screening without written justification. They cannot be
  audited and cannot be revisited without redoing the work.
- Candidate one-line descriptions in §3 are compressed from the research pass and may not match the
  original specs precisely; treat them as labels, not definitions.
- Score assignments are single-rater judgements made in one pass, with no calibration set and no second
  rater. Treat differences of fewer than ~5 points between candidates as noise.
- The `[ASSUMPTION]` price and margin columns in §3.1 were assigned quickly to enable ranking. They are
  adequate for comparing candidates against each other; they are **not** adequate for planning a
  business. Only Kinline's numbers were carried forward, and even those are re-derived from scratch in
  `docs/03-unit-economics.md`.

---

## 8. Conclusion of Phase 1

Kinline was selected because it has the best *structural* argument of 30 candidates: an unownable input,
a why-not-Amazon answer that is a property of the product rather than a claim about the brand, software
that replaces genuine human labour, a growth loop that is a real user need, and boring fulfilment.

It scored 48/100. It scored 9/25 on demand certainty and 4/15 on acquisition. **The correct summary is
not "we found a great business" — it is "we found the least-bad structure available, and we have not yet
established that anyone wants it."**

The next document, `docs/02-*`, proceeds on the assumption that the six checks in §7.4 return acceptable
answers. If they do not, this record exists so the decision can be reversed cheaply rather than defended
expensively. Reversing it in week two costs a weekend. Reversing it in month five costs the six months.
