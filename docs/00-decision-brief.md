# Decision Brief — the business we are building

This is the single source of truth. Every other document and every line of code
descends from this file.

---

## The business

**Kinline** — beautifully designed, archival-quality family tree charts, built in
the browser in about five minutes and delivered as a framed or unframed print.

**We are a gift company, not a genealogy company.** That distinction is the
entire strategy and it is not cosmetic. See "The objection that shaped this" below.

---

## Who buys

**Primary buyer — "the organiser daughter."** 35–60, usually female, buying a
gift for a parent or grandparent. She knows her grandparents' names. She has
never heard of a GEDCOM file and never will. She is buying an *emotional object*
for a specific occasion, not a research tool.

Occasions, in rough order of volume:

1. Christmas (single largest — this is why launch timing matters)
2. Mother's Day / Father's Day
3. Milestone birthdays (70th, 80th, 90th)
4. Memorial / after a death in the family
5. Golden & silver wedding anniversaries
6. New baby (the first chart that includes the newest name)
7. Family reunions

**Secondary buyer — "the family historian."** 55–75, already has a tree in
Ancestry / MyHeritage / FamilySearch. Smaller segment, higher generation counts,
arrives via GEDCOM upload. We serve them because it is cheap to serve them, not
because they are the market.

---

## The objection that shaped this

Adversarial review raised what it called the **GEDCOM-literacy squeeze**, and it
is correct:

> The ability to export a GEDCOM and the ability to self-serve a print are the
> same competence. Anyone who can locate their platform's export function and
> hand a 4 MB file to a stranger's website can also drop an SVG at Costco,
> Staples, or an online large-format printer for a fraction of our price.

Free, open-source GEDCOM-to-SVG fan chart renderers have existed since 2016
(`nliautaud/gedcom-svg-fanchart`), and a full multi-layout generator shipped free
in June 2026 (`AleBeda/genechart`). A GEDCOM-first product sells to precisely the
people most able and most inclined to bypass it.

**Our answer is to not build that product.** Manual entry is the primary path.
The gift buyer cannot bypass us, because the thing she lacks is not a file — it
is design judgement and a printer. GEDCOM upload remains as a secondary
convenience for the historian segment; it costs us little and cannibalises
nothing.

A second review finding also shaped the catalogue: on a rejected candidate, a
cheap print-ready digital file was found to *cannibalise* the physical print,
because the file simply is the poster. **We therefore never sell a print-ready
digital file as a standalone product.** It exists only as a post-purchase add-on
and as a bundled sweetener on the largest size.

---

## Why this business has a reason to exist

**Why not Amazon?** Amazon cannot sell a chart of *your* ancestors. The product
does not exist until the customer creates it. There is no SKU to search for, no
price to compare, and no competitor listing that is the same object. This is the
strongest available answer to the Amazon question, and it is structural rather
than a matter of positioning.

**Why not the incumbents?** The GEDCOM-to-print incumbents — MyCanvas
(fan posters from $50), WebTreePrint, AncestryPrinting, FamilyTreeChart — are
functional, engineer-built, and visually dated. They sell *output*. They all
require a file the gift buyer does not have. None of them is a design-led brand,
and none targets the gift occasion.

**Why not an Etsy seller?** They exist and do this by hand: you message a seller,
send names over chat, wait days for a mock-up, request revisions. Reviews in
adjacent personalised-print categories consistently praise sellers for
*communication and revisions* — which is another way of saying the process is
manual and slow. We give an instant live preview of the actual poster and
same-day production. Their labour is our software.

**Where the software genuinely wins.** Auto-laying out a legible chart is a real
engineering problem, not a veneer. A six-generation fan chart is 63 people; seven
is 127. Names must be set on curved paths, scaled per ring, hyphenated,
truncated with taste, and balanced when branches are missing — which they always
are. Shopify cannot do this at any price. This is the rare case where custom
development is the product rather than a cost centre.

---

## The growth loop that makes this work

The share link is the acquisition engine, and it is native to the product rather
than bolted on:

1. She builds the chart and hits a wall — she is unsure of a great-grandmother's
   maiden name.
2. She shares the link to ask relatives to check it. **This is a genuine need,
   not a growth hack.** Every builder hits it.
3. Relatives open the link and see a beautiful chart of *their own family*.
4. Relatives buy copies. Siblings, aunts, cousins — all valid buyers of the
   identical artefact.

One chart can yield many orders, which is also the primary AOV lever
(volume pricing on additional copies). Genealogy is inherently multiplayer, and
this is the only mechanic in the whole plan that gets cheaper as it grows.

---

## Catalogue and pricing

| Product | Price |
|---|---|
| Fan chart or vertical tree, 12×18 | $49 |
| — 18×24 | $79 |
| — 24×36 | $119 |
| Framed (any size) | +$50 |
| Extra copies, same design (2nd) | −25% |
| Extra copies, same design (3rd+) | −35% |
| Gift wrap + handwritten-style card | +$8 |
| High-resolution digital file | +$15 **post-purchase add-on only**, free with 24×36 |

Target AOV ≈ **$95**. Target gross margin ≈ **60–68%** on unframed, lower on
framed. Precise unit economics, including the honest downside case, are in
`docs/03-unit-economics.md`.

---

## Honest assessment

$1,000/month is **~11 orders/month at a $95 AOV**. That is a genuinely modest
bar — roughly one order every three days — and it is achievable. It is not,
however, achievable by building a nice website and waiting. Nothing in the
research suggested the software is the hard part.

Across 30 researched candidates, **none scored above 50/100** on probability of
clearing $1,000/month in six months, and the verification pass could not confirm
external demand or supplier numbers because the research tooling hit hard limits.
Two consequences follow, and both are load-bearing:

- The **single largest unvalidated assumption** is that a gift buyer will type in
  15 names to build a chart. Everything depends on it. The cheapest test of it is
  in `docs/09-first-30-days.md` and it costs about $50 and one week.
- **Real supplier pricing was never verified.** Every COGS figure in this repo is
  a labelled modelling assumption. A ~30-minute check against live Prodigi and
  Gelato pricing must happen before any money is spent on acquisition, because
  a framed COGS above ~$45 changes the pricing architecture rather than the
  spreadsheet.

Kill criteria — the numbers at which this should be abandoned rather than
rationalised — are defined in `docs/12-failure-detection.md`. They are written to
be checked, and they are deliberately harsh.
