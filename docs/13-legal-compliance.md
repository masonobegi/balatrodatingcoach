# Phase 13 — Legal & Compliance

**Kinline — personalised family tree charts sold as framed/unframed art prints, fulfilled print-on-demand, US-first.**

---

## 0. Read this first

**I am not a lawyer and this is not legal advice.** This document is an operator's map of
what a business shaped like this one has to deal with, so that you know what to do
yourself, what to buy a $50 tool for, and — critically — what to stop and pay a
professional for. Where I am uncertain I say so. Where I state a number, it is labelled.

### 0.1 Labels used throughout

| Label | Meaning |
|---|---|
| `[DIY]` | You can do this yourself in an afternoon with no professional help. |
| `[CHEAP TOOL]` | Buy a template/service for tens to low hundreds of dollars. Do not pay a lawyer. |
| `[NEEDS PROFESSIONAL]` | Get a lawyer or CPA. The cost of getting it wrong exceeds the fee. |
| `[SETTLED]` | The rule is clear and well established. I am confident. |
| `[UNSETTLED]` | Genuinely contested, state-specific, or changing. Do not rely on me. |
| `[VERIFY]` | A specific fact/number I am recalling and you must check before acting. |
| `[ASSUMPTION]` | A modelled figure. Reasoned, stated, wrong until you confirm it. |

**No fee, threshold, or filing cost in this document was verified against a live
government fee schedule.** I have no working web search in this session. Every dollar
figure below is either a well-known standing number I am confident in, or explicitly
marked `[VERIFY]`. Do not put any of them in a budget without checking.

### 0.2 The honest summary

For a solo founder doing **~11 orders a month at a $95 AOV**, the legal surface of this
business is small and cheap. Realistically: **an LLC, an EIN, one state sales-tax
registration, four site policies, correct email authentication, and a deliberate decision
about how you handle other people's family data.** Total cash cost to be properly set up
is on the order of **$300–$900 in year one** (§13), plus roughly **$1,500–$3,000 if and
when you clear the "Kinline" trademark with counsel** (§11.3).

Three things are genuinely worth more attention than they usually get in a doc like this:

1. **You are collecting personal data about living third parties who never consented and
   will never hear from you.** Every family tree product does this and almost none of them
   think about it. Today, at your size, you are almost certainly out of scope of every US
   state privacy statute. The exposure is *product-design* exposure, not
   compliance-checklist exposure, and the cheap fixes are all design decisions you make
   before you write the schema (§10).
2. **Accessibility litigation is the highest-probability legal cost you will actually
   incur**, and it is close to unrelated to your revenue. A serial-plaintiff demand letter
   does not care that you did $12k last year (§9).
3. **The "Kinline" name is completely uncleared.** Nobody has searched it. Do the free
   knockout search this week before you buy brand assets (§11.3).

---

## 1. Priority order — what to do, and when

This is the actionable table. Everything else in the document is the reasoning behind it.

### 1.1 Before you take the first dollar

| # | Item | Label | Cost | Section |
|---|---|---|---|---|
| 1 | Free USPTO knockout search on "Kinline" | `[DIY]` | $0 | §11.3 |
| 2 | Form a single-member LLC in your **home** state | `[DIY]` / `[CHEAP TOOL]` | $50–$500 `[VERIFY]` | §2 |
| 3 | Get an EIN from the IRS (free, online, 10 minutes) | `[DIY]` | $0 | §2.4 |
| 4 | Business bank account + dedicated card | `[DIY]` | $0 | §2.5 |
| 5 | Home-state sales tax permit / seller's permit | `[DIY]` | $0–$100 `[VERIFY]` | §3.2 |
| 6 | Resale certificate on file with Prodigi/Gelato | `[DIY]` | $0 | §3.6 |
| 7 | Terms of Service, Privacy Policy, Refund & Returns, Shipping/Delivery | `[CHEAP TOOL]` | $0–$200 | §4 |
| 8 | SPF + DKIM + DMARC on the sending domain (Resend) | `[DIY]` | $0 | §8 |
| 9 | Proof-approval checkbox with timestamp logging before print | `[DIY]` | $0 | §5.4 |
| 10 | Decide the data-minimisation schema (§10.3) before writing migrations | `[DIY]` | $0 | §10 |

Items 1, 9 and 10 are the ones people skip. They are the three cheapest and three of the
most consequential.

### 1.2 Once you are shipping regularly (roughly orders 1–100)

| Item | Label | Trigger |
|---|---|---|
| Accessibility pass: keyboard nav, labels, contrast, focus, chart text-alternative | `[DIY]` | Before you run any paid traffic or press |
| CAN-SPAM compliant email footer (postal address + working unsubscribe) | `[DIY]` | First marketing email |
| Delete/export request path for tree data (even if manual, via email) | `[DIY]` | First 50 charts stored |
| Christmas order-by date published + delay-notice email template | `[DIY]` | September |
| Written retention policy for abandoned drafts | `[DIY]` | First 100 charts stored |

### 1.3 Later, and only on a trigger

| Item | Label | Trigger — do NOT do it earlier |
|---|---|---|
| Attorney trademark clearance + USPTO filing | `[NEEDS PROFESSIONAL]` | ~$3–5k cumulative revenue, or before spending >$2k on brand assets |
| CPA on multi-state sales tax + POD nexus | `[NEEDS PROFESSIONAL]` | Approaching $100k sales into any single non-home state, or the printer is in a different state from you |
| Lawyer-reviewed ToS (not template) | `[NEEDS PROFESSIONAL]` | Meaningful revenue, or you add photo uploads / public sharing |
| S-corp election | `[NEEDS PROFESSIONAL]` (CPA) | Net profit sustainably >$40–50k `[RULE OF THUMB]` |
| Business owner's policy (liability insurance) | `[CHEAP TOOL]` | When you have assets worth defending, or a retailer/partner demands a COI |
| DMCA agent registration with the Copyright Office | `[DIY]` | Only if you host user-uploaded images or public share pages |
| GDPR/UK programme, VAT/IOSS, EU consumer law | `[NEEDS PROFESSIONAL]` | Before selling into the EU/UK. Not at launch. |

---

## 2. Business entity

### 2.1 Do you need an LLC to start? No. Should you? Probably yes.

`[SETTLED]` You can legally sell as a **sole proprietor** in every US state with zero
formation paperwork. Stripe will onboard you on your SSN. Nothing stops you.

What a sole proprietorship does not do: it does not separate your personal assets from the
business's liabilities. For this specific business the plausible liabilities are small but
not zero — a customer dispute, a supplier dispute, an accessibility demand letter (§9), a
privacy complaint about third-party family data (§10). None of these will bankrupt you.
All of them are more comfortable when the counterparty is an entity and not your house.

`[ASSUMPTION]` My view: form the LLC before the first sale **if your state's total
first-year cost is under ~$300**. The reason is not mainly liability at 11 orders/month —
it is that re-papering Stripe, the bank, the POD supplier account and the domain from
"you" to "Kinline LLC" later is an annoying afternoon you can avoid for the price of a
filing fee.

If your state's first-year cost is large (California is the notorious case, below), it is
defensible to start as a sole proprietor with a DBA and form the LLC when revenue is real.
Say that out loud rather than pretending the LLC is mandatory. It is not.

### 2.2 Where to form `[SETTLED]`

**Form in the state you live in.** Do not form in Delaware or Wyoming.

The Delaware/Wyoming advice circulating online is for venture-backed startups and for
holding companies, not for a solo e-commerce operator. If you live in State X and run the
business from State X, you are "doing business" in State X, so a Wyoming LLC must
additionally **foreign-qualify** in State X — you pay both states, file both annual
reports, and pay a registered agent in Wyoming. You get no tax benefit; a single-member
LLC is a disregarded entity and the income lands on your personal return in your home
state regardless.

California specifically: the **$800 minimum franchise tax** `[VERIFY — figure and any
first-year exemption]` applies to LLCs *doing business in California*, including
out-of-state LLCs. Forming in Wyoming does not escape it. If you live in California,
budget the $800/year or start as a sole proprietor.

### 2.3 Rough formation costs `[VERIFY — every one of these]`

| Item | Typical range | Notes |
|---|---|---|
| State LLC filing fee | $50–$500 | Varies enormously by state. Check your Secretary of State directly. |
| Registered agent | $0–$150/yr | $0 if you use your own address — but it becomes public record. Pay $50–150 if you work from home and care. |
| Annual report / franchise fee | $0–$800/yr | $0 in some states; CA $800; a handful charge several hundred. |
| Formation service (LegalZoom/Northwest/etc.) | $0–$300 + state fee | `[CHEAP TOOL]` Optional. The state's own online form is usually 20 minutes. |
| Operating agreement (single-member) | $0 | `[DIY]` Free templates are fine for a single-member LLC. Some banks ask for one. |
| EIN | $0 | `[DIY]` Directly from irs.gov. Never pay for this. |

`[DIY]` for the whole block. A solo single-member LLC does not need a lawyer to form.

### 2.4 EIN `[DIY]` `[SETTLED]`

Free, online, immediate. Get one even as a sole proprietor — it lets you put an EIN rather
than your SSN on supplier and payment forms.

### 2.5 The part people get wrong `[SETTLED]`

The liability shield is defeated by commingling funds. If you form an LLC, you must:

- open a separate business bank account and route all Kinline money through it;
- never pay personal expenses from it;
- keep the Stripe account, the POD supplier account, and the domain in the LLC's name.

An LLC you treat as a personal wallet provides approximately the protection of a sole
proprietorship. This is `[DIY]` discipline, not a legal expense.

### 2.6 S-corp election `[NEEDS PROFESSIONAL]` — but not yet

`[RULE OF THUMB]` The S-corp election saves self-employment tax on the portion of profit
taken as distributions rather than salary, but adds payroll administration
(`[ASSUMPTION]` ~$500–$1,500/yr in payroll service and extra CPA time). It generally does
not pay for itself below roughly **$40–50k of net profit**. At $1,000/month revenue this
is irrelevant. Revisit with a CPA when profit is real.

---

## 3. US sales tax

This is the section most likely to be over-worried and under-executed. The correct posture
at your size is: **one state, one registration, one small quarterly filing.**

### 3.1 The two kinds of nexus `[SETTLED]`

| Type | What creates it | Applies to Kinline? |
|---|---|---|
| **Physical nexus** | Presence in a state: you, an employee, an office, inventory, sometimes a contractor or third-party fulfiller | Yes — your home state, from day one |
| **Economic nexus** | Exceeding a sales/transaction threshold into a state you have no presence in (post-*Wayfair*, 2018) | Not for years, at this volume |

### 3.2 Home state `[DIY]` `[SETTLED]`

You have physical nexus where you live and work. In practice this means: register for a
sales tax permit / seller's permit in your home state, collect tax on sales shipped to
addresses in that state, and file on the schedule they assign you (usually quarterly or
annually at low volume).

Exception: if you live in one of the states with no statewide sales tax — **Alaska,
Delaware, Montana, New Hampshire, Oregon** `[VERIFY — Alaska has local-level sales taxes
via the Alaska Remote Seller Sales Tax Commission, so "no sales tax" is not fully true
there]` — there may be nothing to register for. Confirm with your state's revenue
department, not with me.

### 3.3 Economic nexus elsewhere — the honest maths

`[VERIFY — thresholds change constantly and several states have repealed their transaction
counts]` The common pattern is **$100,000 in sales into that state per year**, sometimes
with an alternative **200 separate transactions** trigger. A minority of states use
$250,000 or $500,000; a few kept the transaction count, several dropped it.

What that means at Kinline volume:

| Scenario | Annual revenue | Plausible share into the single biggest non-home state `[ASSUMPTION]` | Sales into that state | Crosses $100k? | Crosses 200 transactions? |
|---|---|---|---|---|---|
| $1k/mo (the bar) | $12,000 | 12% | $1,440 | No | No (~15 orders) |
| $5k/mo | $60,000 | 12% | $7,200 | No | No (~76 orders) |
| $25k/mo | $300,000 | 12% | $36,000 | No | **Yes** (~380 orders) — only in states that kept the count |
| $50k/mo | $600,000 | 12% | $72,000 | Close | Yes |

The 12% figure is an `[ASSUMPTION]`: California is roughly 12% of the US population and
would plausibly be your largest destination state. I have no measured order-destination
data. The conclusion is robust to the assumption being wrong by a factor of two: **you do
not have a multi-state sales tax problem at $1k/month, and probably not at $10k/month.**

The one that bites earlier than people expect is the **200-transaction** trigger in states
that still use it — a $95 AOV means 200 transactions is only ~$19,000 of sales. Watch
transaction counts by state, not just dollars, once you are past ~$20k/month.

### 3.4 Stripe Tax — what it does and does not do `[SETTLED]`

| Stripe Tax does | Stripe Tax does not |
|---|---|
| Calculate the correct rate at checkout for jurisdictions you have registered in | Register you anywhere |
| Track your sales by state and warn you when you approach a threshold | File returns or remit money |
| Handle product tax codes (once **you** set them) | Decide whether your product is taxable |
| Charge 0.5% of the transaction on registered jurisdictions `[FIXED — per Phase 2/3]` | Cover you if you configure it wrong |

`[DIY]` Set the product tax code deliberately. A framed or unframed paper print is
tangible personal property and generally taxable. The **$15 hi-res digital file is a
different animal** — digital goods are taxed differently state by state `[UNSETTLED —
genuinely state-specific]`. Because we sell it only as a post-purchase add-on and bundled
free with the 24×36, the dollars at stake are small, but set its tax code separately rather
than letting it inherit the poster's.

Cost check: 0.5% on a $95 order is **$0.48**. On $12,000/year of home-state-taxable sales
that is $60/year. Cheap. Turn it on.

Filing: at one state and low volume, filing yourself through the state's online portal is
`[DIY]`, on the order of 20–30 minutes a quarter. Do not buy Avalara. TaxJar/Avalara-class
tools become worth it somewhere north of ~5 registered states `[ASSUMPTION]`.

### 3.5 The merchant-of-record escape hatch is closed `[SETTLED]`

For digital products you could hand the entire tax problem to a merchant of record —
**Lemon Squeezy, Paddle, Polar** — who becomes the legal seller and handles registration,
collection, remittance, and global VAT for a percentage fee. That is a genuinely great
deal, and **it is not available to us: all three support digital goods only, not physical
shipped products.** This was verified in the stack decision (see Phase 2) and it is a
structural constraint, not a pricing preference.

Consequence: **Kinline is the seller of record.** The POD supplier is a vendor, not a
merchant. You own the tax obligation, the refund, the chargeback, and the customer
relationship. There is no way to buy your way out of §3.

One honest footnote: **marketplaces are the exception.** Under marketplace-facilitator laws
`[SETTLED]`, Etsy/Amazon collect and remit sales tax as the facilitator. If you ever run
Etsy as a validation or acquisition channel, sales tax on those orders is genuinely not
your problem. That is a real (if modest) argument for the channel, and it is worth stating
because it is the only legitimate MoR-shaped relief available to a physical-goods seller.

### 3.6 The print-on-demand nexus question `[UNSETTLED]` `[NEEDS PROFESSIONAL]`

Two separate issues, often conflated:

**(a) Resale certificates — settled and actionable now.** When Prodigi or Gelato prints and
ships on your behalf, they are selling to you for resale. Without a valid resale
certificate on file, some suppliers will charge you sales tax on your COGS, which lands
straight on your gross margin. `[DIY]` Get your home-state seller's permit, then ask the
supplier for their resale-certificate process during onboarding. Do this before the first
production order. If your COGS is ~$35 and you get taxed at ~8% on it, that is ~$2.80 an
order — against Phase 3's already-thin framing economics, that matters.

**(b) Does a third-party printer create nexus for you in the printer's state?**
`[UNSETTLED]` — this is exactly the kind of question where state rules differ and where I
should not pretend to know. The historical drop-shipment rules in several states are
genuinely messy, and the analysis turns on whether the fulfiller is acting as your agent,
whether you hold title, and each state's specific treatment. It matters more if the printer
is in a different state from you.

`[NEEDS PROFESSIONAL]` — but a cheap one. This is a single question for a state-and-local
tax CPA, answerable in one paid hour `[ASSUMPTION: $200–$400]`. Ask it once you know which
supplier and which production facility you are actually using. Do not spend money on it
before supplier selection is locked, and do not let it block launch — the downside at 11
orders/month is small and correctable.

---

## 4. Required site policies

Four documents. All `[CHEAP TOOL]` at launch, `[NEEDS PROFESSIONAL]` later.

| Policy | Legally required? | Label | Notes |
|---|---|---|---|
| **Privacy Policy** | Effectively yes | `[CHEAP TOOL]` | Required by CalOPPA for any site with California visitors, by state privacy laws, and by Stripe/Google/Meta as a platform condition. Non-optional in practice. |
| **Terms of Service** | Not by statute | `[CHEAP TOOL]` | Not strictly required, but it is where your limitation of liability, personalisation warranty, IP licence and dispute terms live. Do not skip it — this is the doc that saves you. |
| **Refund / Returns policy** | Effectively yes | `[DIY]` + review | Must be clearly and conspicuously disclosed *before purchase* for a restrictive policy to hold. Also a card-network and Stripe expectation. |
| **Shipping & delivery** | Effectively yes | `[DIY]` | Drives FTC 30-day-rule compliance (§5.2) and prevents Christmas disasters. |

### 4.1 Getting them

`[CHEAP TOOL]` Options in rough order of cost: a Shopify/Termly/Iubenda-style generator
($0–$200/yr); a purchased ecommerce policy template pack; or a lawyer-drafted set
(`[ASSUMPTION]` $1,500–$4,000). At 11 orders/month a generator plus careful hand-editing of
the personalisation and family-data clauses is the right call.

**The generated text will not cover the two things that are actually specific to Kinline.**
Write these paragraphs yourself and have them reviewed when you can afford it:

1. **The personalisation clause** (§5) — made-to-order, customer-approved proof,
   no returns for customer data errors.
2. **The family-data clause** (§10) — what you do with names of living third parties, the
   warranty the customer gives you, and the explicit statement that you do not claim
   ownership of their family data.

### 4.2 Make acceptance provable `[DIY]` `[SETTLED]`

Browsewrap ("by using this site you agree…" in the footer) is weakly enforceable at best.
Use **clickwrap**: an explicit checkbox or a "By placing your order you agree to the Terms
and Refund Policy" line immediately adjacent to the pay button, with the version and
timestamp stored against the order. This is a small engineering task and it is the
difference between having terms and having enforceable terms.

Store, per order: policy version hash, timestamp, IP. Retain for at least 2 years (§5.4).

---

## 5. Refunds, returns, and made-to-order goods

### 5.1 There is no US cooling-off right for online purchases `[SETTLED]`

A persistent myth says customers have an automatic right to return online purchases. In the
US, **they do not**. The FTC's Cooling-Off Rule applies to door-to-door and off-premises
sales of $25+, not to e-commerce. Return rights come from the merchant's own posted policy,
from state-specific disclosure rules (several states require you to *post* your policy
clearly, and impose a default return right if you fail to), and from card-network
chargeback rules.

Therefore: **"Personalised, made-to-order items are not returnable" is an enforceable US
policy provided it is clearly and conspicuously disclosed before purchase.** `[SETTLED]`
That is the legal position.

### 5.2 The FTC Mail, Internet, or Telephone Order Merchandise Rule `[SETTLED]` — this one actually binds you

Often called the "30-day rule". In substance:

- You must have a **reasonable basis** to believe you can ship within the time you state.
- If you state no time, the default is **30 days**.
- If you cannot meet it, you must **notify the customer, give a revised date, and offer the
  option to cancel for a full refund**.
- Refunds on cancellation must be prompt.

This is the rule most likely to be breached by a print-on-demand gift business at
Christmas. Concrete `[DIY]` actions:

| Action | Why |
|---|---|
| State **production time and shipping time separately** ("3–5 business days to produce, 3–7 in transit") | Honest, and it is what "reasonable basis" looks like |
| Publish a **Christmas order-by date** and stop promising delivery past it | The single highest-risk moment of the year for this business |
| Build the **delay-notice email** template before you need it | You will need it in December |
| Log supplier-quoted lead times per order | Evidence of reasonable basis |

### 5.3 The policy I would actually write

Legal minimums and good business are not the same thing here. You are a **gift company**;
the buyer's emotional stake is high and a bad resolution is a story she tells her whole
family. A maximally strict policy will cost you more in chargebacks, refund-request
friction and word-of-mouth than it saves in reprints.

| Situation | Policy | Reasoning |
|---|---|---|
| Damaged in transit, print defect, colour/quality error | **Free reprint or full refund, no return required** | Supplier's fault; most POD suppliers reprint at their cost — confirm this in the supplier agreement `[VERIFY with Prodigi/Gelato]`. Returning a damaged poster costs more than reprinting it. |
| Wrong item shipped | **Free reprint, no return required** | Same. |
| Customer typo'd a name, caught **before production** | **Free correction** | Costs you nothing. |
| Customer typo'd a name, caught **after production** | **One goodwill reprint at cost, or 50% off a replacement** | Firmly not free — otherwise the proof-approval step is theatre — but not "tough luck" either. |
| Buyer's remorse, "didn't like it", "wrong size" | **No return.** Made-to-order, disclosed pre-purchase. | This is the clause the policy exists for. |
| Never arrived | **Reprint or refund** after carrier trace | Chargeback-proofing. |

Add a **hard cancellation cut-off**: full refund any time before the order is released to
production; after that, §5.3 applies. Show the customer where that line is.

### 5.4 The proof-approval step is your single best legal control `[DIY]`

Before an order is released to production, require an explicit, unbundled action:

> ☐ I have checked every name, date and spelling on this chart. I understand it will be
> printed exactly as shown and cannot be returned or refunded for spelling or data errors.

Store, against the order: the checkbox event, the timestamp, and **a rendered snapshot of
the exact artwork the customer approved** (a PNG/PDF in R2 — you already have R2 with zero
egress, so this is nearly free).

This one record answers the most common chargeback reason codes ("product not as
described", "not received") in the merchant's favour better than any policy text. Combine
it with: proof of delivery from the carrier, the clickwrap acceptance record (§4.2), and
the personalisation evidence itself.

`[VERIFY]` Card-network dispute windows run up to roughly 120 days from the transaction or
delivery date in the common cases, with longer tails in some scenarios. **Retain order,
proof, and acceptance records for 2 years.** Storage cost is trivial; the record is not
reconstructable after the fact.

### 5.5 EU/UK — deliberately out of scope at launch

If you ever ship to the EU/UK: the Consumer Rights Directive's 14-day withdrawal right has
an explicit exemption for **goods made to the consumer's specifications or clearly
personalised** `[SETTLED in principle, VERIFY the drafting]`, so Kinline products are
plausibly exempt — but you still owe the full pre-contract information set, the exemption
must be properly notified, and you inherit GDPR (§10.5) and VAT/IOSS obligations.

**Recommendation: US-only at launch, US + Canada as the first expansion.** Note that Canada
brings **CASL** for email, which is materially stricter than CAN-SPAM (express or
implied opt-in consent required, with real penalties) — so "US + Canada" is not free either.
Sell to the US until there is a reason not to.

---

## 6. US state privacy laws

### 6.1 Are you in scope? Almost certainly not, today `[SETTLED for the thresholds, VERIFY the current list]`

`[VERIFY — the number of states with comprehensive privacy laws has been growing every
legislative session and my knowledge has a cutoff]`

| Law | Applicability thresholds (as I recall them) | Kinline at $12k–$120k/yr |
|---|---|---|
| **CCPA/CPRA** (California) | ≥$25M annual gross revenue; **or** buys/sells/shares PI of 100,000+ consumers or households; **or** ≥50% of revenue from selling/sharing PI | **Out of scope** on all three prongs, by a wide margin |
| Virginia, Colorado, Connecticut, Oregon, and most others | Typically 100,000 consumers/yr; **or** 25,000 consumers + >25–50% of revenue from sale of PI | **Out of scope** |
| **Texas (TDPSA)** | **No revenue or volume threshold.** Applies to persons doing business in Texas who process PI — but with an exemption for **small businesses as defined by the SBA**, except that sale of sensitive data requires consent | **The one to watch.** Out of scope while you are SBA-small and do not sell data — but the structure is different from the others |
| Florida (FDBPA) | Very high revenue threshold (~$1B) | Out of scope |

**The direction of travel matters more than today's answer.** Thresholds are trending down
and Texas/Nebraska-style laws with no numeric threshold are the newer model. Build as if
you will be in scope eventually — it costs almost nothing to do so (§10.3) and retrofitting
deletion into a schema that never contemplated it is expensive.

### 6.2 What to do anyway `[DIY]`

Even out of scope, do these. They are cheap, they are what the Privacy Policy will say, and
they are what a customer emailing "please delete my grandmother's details" needs.

- A **plain-English privacy policy** listing categories collected, purposes, who you share
  with (Stripe, the POD supplier, Resend, Vercel, Neon, R2), and retention.
- A working **privacy@kinline.com** inbox and a documented internal process for access,
  correction and deletion requests — manual is fine at this volume.
- A **retention policy**: delete abandoned/never-purchased chart drafts after N months
  (`[ASSUMPTION]` 12 months is defensible and generous), delete on request, delete
  share-links on expiry.
- **Never sell or share personal information for cross-context behavioural advertising.**
  This single decision keeps you out of the most burdensome parts of every state law
  (opt-out links, Global Privacy Control handling, data-broker registration) permanently.
  It is also, for a business built on other people's family data, the ethically obvious
  call and a genuine marketing asset.

### 6.3 Does a US-only store need a cookie banner? `[SETTLED — no, with a condition]`

**No US law requires a cookie consent banner.** The GDPR/ePrivacy consent banner is a
European construct. US state laws regulate the *sale/sharing* of personal information and
require an opt-out mechanism — a "Do Not Sell or Share My Personal Information" link and
honouring Global Privacy Control signals — **only if you sell or share**.

Kinline's stack decision already resolves this: **analytics are self-hosted in Postgres.**
If you use no third-party advertising or analytics cookies:

- no consent banner is required;
- no "Do Not Sell or Share" link is required;
- you do not need a consent management platform (a recurring $10–100/mo you simply do not
  spend);
- and your pages load faster, which is a conversion argument, not a legal one.

**The condition:** the moment you install a Meta Pixel, Google Ads remarketing tag, TikTok
pixel or a third-party session-replay tool, you have plausibly moved into "sharing for
cross-context behavioural advertising" under CCPA/CPRA, and you need the opt-out link, GPC
handling, and disclosure. `[UNSETTLED]` — the boundaries of "sharing" here are still being
litigated.

Related and worth flagging: **California's Invasion of Privacy Act (CIPA)** has been the
basis for a large volume of plaintiff-side claims against websites using session-replay
tools, chat widgets and advertising pixels, on a wiretapping theory `[UNSETTLED — courts
have split and the trend may have moved since my cutoff]`. This is a second, independent
reason to keep third-party trackers off the site.

Phase 3 established that paid acquisition does not work at Kinline's margins anyway. The
privacy consequence is a free bonus: **not running pixels you cannot afford to run also
removes an entire compliance surface.** Say it in the privacy policy; the target buyer
(35–60, giving you her grandmother's name) will read it as trustworthiness.

---

## 7. CAN-SPAM (marketing email) `[DIY]` `[SETTLED]`

The federal rules are short and genuinely easy to comply with.

| Requirement | What it means for Kinline |
|---|---|
| No false or misleading header info | From/reply-to must be real and yours |
| No deceptive subject lines | The subject must reflect the content |
| Identify the message as an ad | If it is promotional, don't disguise it as transactional |
| Include a **valid physical postal address** | A PO Box or a commercial mail-receiving agency box is acceptable. If you work from home and do not want your address in every email, **get a PO Box before you send the first campaign.** |
| Clear, conspicuous **opt-out mechanism** | One-click unsubscribe link (see also §8) |
| **Honour opt-outs within 10 business days** | Resend/your ESP handles the suppression list — verify it is actually wired up |
| No selling/transferring an address after opt-out | Don't. |

`[SETTLED]` **Transactional and relationship messages are exempt** from most of these:
order confirmations, shipping notices, proof-approval requests, delivery updates. They must
still have accurate headers. Keep the two streams cleanly separated in your sending
infrastructure — do not sneak promotions into shipping confirmations, because that
reclassifies the message.

`[VERIFY]` Statutory penalties are per-email and inflation-adjusted annually; the figure is
in the tens of thousands of dollars per violating message (my recollection is roughly
$51,000–$53,000 currently). The number is large enough that "per email" is the operative
phrase. There is **no small-business exemption**.

One Kinline-specific trap: **the growth loop is a sharing loop, not an email loop.** When a
builder shares a chart link with relatives, do not harvest those relatives' addresses into
a marketing list. If a relative gives you their address to receive the chart link, that is
a transactional purpose. Adding them to a promotional list without consent is exactly the
kind of thing that generates spam complaints from people who never heard of you — which
under §8 is far more damaging than the CAN-SPAM exposure.

---

## 8. Gmail / Yahoo bulk-sender requirements `[DIY]` `[SETTLED]` — do this before the first email

Since February 2024, Gmail and Yahoo enforce sender requirements, and Microsoft announced
comparable requirements for Outlook `[VERIFY current state of Microsoft's rollout]`. These
are not laws; they are deliverability gates, and they are harder-edged than the law because
non-compliance means your Christmas campaign silently lands in spam.

| Requirement | Applies to | Kinline action |
|---|---|---|
| **SPF** and **DKIM** on the sending domain | All senders | Resend gives you the DNS records. 15 minutes. Non-negotiable. |
| **DMARC** record, minimum `p=none` | Bulk senders (≥5,000 messages/day to Gmail addresses) `[VERIFY threshold]` | Publish it anyway from day one — it costs nothing and you want the reports |
| **Alignment** — the From: domain must align with SPF and/or DKIM | Bulk senders | Send from `hello@kinline.com`, not from a shared ESP domain |
| **One-click unsubscribe** (RFC 8058 `List-Unsubscribe` + `List-Unsubscribe-Post`) | Bulk senders, marketing mail | Resend supports it; enable it. Also honour opt-outs within 2 days — stricter than CAN-SPAM's 10 business days. |
| **Spam complaint rate below 0.3%** (target <0.1%) | All | Watch it in Google Postmaster Tools (free) |
| Valid forward and reverse DNS, TLS in transit | All | Handled by Resend |

`[DIY]` The whole block is a DNS afternoon. Recommended DMARC path: publish `p=none` with
a reporting address at launch, read reports for a few weeks, then move to `p=quarantine`
once you are confident nothing legitimate is failing alignment.

`[ASSUMPTION]` You will not hit 5,000 messages/day to Gmail for a very long time — 11
orders/month is nowhere near it, and even a 5,000-person list sent weekly averages far
below the daily threshold. **Do it all anyway.** The cost is zero and the alternative is
discovering in week one of December that your one big send went to spam.

Also set up **Google Postmaster Tools** (free) on the sending domain and check it before
any large campaign.

---

## 9. ADA / WCAG accessibility `[NEEDS ATTENTION]` — the most likely legal cost you will actually pay

### 9.1 The legal position, stated honestly `[UNSETTLED]`

- The ADA Title III applies to "places of public accommodation". Whether — and when — a
  website alone is one has **split the federal circuits for years and is not settled**.
- The DOJ's 2024 web accessibility rule adopting **WCAG 2.1 Level AA** applies to **state
  and local government entities (Title II)**, *not* to private businesses `[VERIFY —
  confirm no subsequent Title III rulemaking]`.
- There is therefore **no binding federal technical standard for a private e-commerce
  site.** WCAG 2.1/2.2 AA is nonetheless the de facto benchmark courts, plaintiffs and
  settlement agreements use.
- Several states — **New York, California, Florida** most notably — supply additional
  hooks (state civil rights and unfair-practices statutes), which is why filings
  concentrate there.

### 9.2 Why it is a real operational risk anyway `[SETTLED as a phenomenon]`

The exposure is not really about losing a trial. It is about **serial plaintiffs and
pre-suit demand letters**. A small number of firms file at high volume against small
e-commerce sites; the economics are built around a nuisance-value settlement plus
attorney's fees that is cheaper than defending. Federal web-accessibility filings have run
at high annual volume for several years, with a large additional layer of state-court
filings and demand letters that never reach a docket `[INDUSTRY REPORTING — I do not have a
verified current figure and will not invent one; assume "thousands per year, growing"]`.

Your revenue is not a defence. A $12k/year store gets the same letter as a $12M one.

### 9.3 Why Kinline is more exposed than a normal Shopify store

**The product is an interactive graphical builder.** A form and a product grid are easy to
make accessible. A drag-and-edit SVG fan chart is genuinely hard. That is the bad news.

The good news is that Kinline has an unusually cheap mitigation available: **you already
hold the tree as structured relational data.** A screen-reader-accessible **text/table view
of the chart** — "Generation 3: Margaret Ellen Doyle, b. 1911, mother of…" — is a
straightforward render off the same records, and it is a far more meaningful accommodation
than any ARIA patch on the canvas. It also has non-accessibility value: it is a proofing
view, it is printable, and it is indexable-adjacent content for the share page.

### 9.4 What to actually do `[DIY]`, in order

| # | Action | Effort |
|---|---|---|
| 1 | Semantic HTML, real `<label>`s on every input, correct heading order | Ongoing discipline, ~0 marginal cost |
| 2 | Full keyboard operability of the builder — every action reachable without a mouse, visible focus rings | 1–3 days of real work |
| 3 | Colour contrast ≥ 4.5:1 for body text, 3:1 for large text and UI. **Check this on the marketing site too** — a design-led brand's muted grey-on-cream is the classic failure | 1 day |
| 4 | Text/table alternative view of the chart (§9.3) | 1–2 days, high value |
| 5 | Alt text and accessible names on the SVG chart and all imagery | Hours |
| 6 | Run axe DevTools / Lighthouse (free) on every page; fix everything flagged | Hours, recurring |
| 7 | Publish an **accessibility statement** with a contact address and a commitment to respond | 1 hour |
| 8 | Respond to any accessibility complaint fast and in good faith | — |

Items 1–3 and 6–7 are the ones that materially change the risk profile. A statement plus a
demonstrably responsive contact address is meaningful evidence of good faith.

### 9.5 Do not buy an accessibility overlay `[SETTLED enough to state plainly]`

Overlay widgets (the JavaScript "one line of code makes you compliant" products) are widely
criticised by disability advocates, have themselves been named in litigation, and do not
prevent claims. `[VERIFY]` My recollection is that the FTC brought and settled an action
against one such vendor over deceptive accessibility claims. Spend the money on items 1–4
instead.

`[NEEDS PROFESSIONAL]` — only if you receive a demand letter. Do not ignore it, do not
respond yourself, and do not panic-settle. Get a lawyer who has handled these; the first
consultation is usually short and the response is largely templated.

---

## 10. IP and personal data — the part specific to this business

### 10.1 The issue, stated clearly

Kinline's core dataset is **names, birth years, death years, relationships and possibly
locations of real people, supplied by one family member about the rest of the family**.

Some of those people are dead. Some are alive, did not consent, do not know Kinline exists,
and never will. This is inherent to the product — you cannot build a family tree without
recording third parties — and it is the single most underappreciated legal and ethical
issue in the genealogy-adjacent category.

`[SETTLED]` **Deceased people are generally not "personal data"** under US state privacy
laws and are explicitly outside GDPR (Recital 27). That is genuinely helpful: on a
four-generation chart, most subjects are deceased. **The risk concentrates entirely in the
living generations** — the buyer, her siblings, her children, her cousins, and the elderly
parent the gift is for.

`[SETTLED]` Under US state privacy statutes you would be the **business/controller** of
that living-person data — you decide the purposes and means. The fact that you got it from
someone else does not make you a mere processor. And per §6.1 you are almost certainly below
every applicability threshold today. **This is a design problem now and a compliance
problem later.**

### 10.2 What could actually go wrong

Ranked by my estimate of likelihood, not severity:

| Risk | Likelihood `[ASSUMPTION]` | Mitigation |
|---|---|---|
| An estranged/angry relative emails demanding you delete their details | Moderate — families are complicated and this product is used at funerals and after divorces | A working deletion path (§10.3) and a human reply. Costs nothing if built in. |
| A share link gets forwarded beyond the family and exposes living people's details | Moderate | Unlisted, revocable, expiring links; `noindex`; no public directory (§10.4) |
| You accidentally collect sensitive-category data via a free-text field | Moderate if you build free-text | Don't build the field (§10.3) |
| A state AG or regulator takes interest | Very low at this size | Thresholds (§6.1) |
| A GDPR complaint from an EU resident | Very low if US-only; **material if you expand** | Stay US-only at launch (§10.5) |

None of these are business-ending. Several are brand-damaging for a company whose entire
proposition is *trust with your family's memory*.

### 10.3 The schema decisions that eliminate most of this `[DIY]` — make them before the first migration

This is the highest-leverage section in the document, because all of it is free if done now
and expensive if done later.

| Decision | Rationale |
|---|---|
| **Collect the minimum**: name, birth year, death year, relationship. Not full DOB, not address, not place of birth beyond a town if the design uses it | Data you never collect cannot leak, cannot be subject to a deletion request, and cannot be a "sensitive category" |
| **Years, not full dates**, for living people | A full DOB plus a mother's maiden name is a materially more attractive dataset to an attacker. A chart does not need the day. |
| **No cause-of-death field. No health, disability, or medical notes field.** | Health data is a special/sensitive category under GDPR and several US state laws. A single free-text "notes" box invites customers to type exactly this. Don't build it. |
| **No religion, ethnicity, or "origin" field** as structured data | Same reasoning. Sensitive categories carry consent requirements you do not want. |
| **No free-text notes field at all in v1** | It is the single largest uncontrolled-data risk. If you must, cap it hard, label it clearly, and exclude it from any share view. |
| **Hard delete, not soft delete**, when a deletion is requested | A `deleted_at` timestamp is not deletion. Build the real path once. |
| **Retention job**: purge unpurchased drafts after N months `[ASSUMPTION: 12]` | Reduces the corpus, reduces the risk, reduces storage. |
| **Never train on, aggregate, resell, or cross-link customer trees** | See §10.4. This one is close to existential. |
| **Never add face recognition or photo auto-tagging** if you add photo uploads | Illinois **BIPA** provides statutory damages of $1,000 per negligent and $5,000 per reckless/intentional violation `[VERIFY — figures are well known but confirm current law after the 2024 amendments on per-scan accrual]`. A private right of action plus per-violation damages is a category of risk wildly out of proportion to a poster business. |
| **18+ to hold an account**, stated in the ToS | Avoids COPPA-adjacent questions entirely. Children *appear in* trees — that is unavoidable and is not COPPA (which governs collection *from* children) — but they should never be the account holder. |

### 10.4 The feature you must never build `[SETTLED as a strategic call]`

**Do not make trees searchable, public, or cross-linkable between customers.**

The moment Kinline lets a stranger search other people's family trees, it stops being a
gift company and becomes a **people-search product**. That drags you toward: data-broker
registration regimes (California's Delete Act and DROP, plus Texas, Oregon and Vermont
broker registries `[VERIFY current list and thresholds]`), a completely different risk
posture on third-party personal data, and an ethical position you cannot defend to the
35–60-year-old daughter who trusted you with her mother's maiden name.

The Phase 2 growth loop does **not** require it. The loop is: she shares a *specific link*
with *her own relatives* to check spellings, and they buy copies. That works with unlisted,
revocable, expiring links. It does not need a public index — and a public index would
actively harm the loop by making the artefact less intimate.

Concrete link design `[DIY]`: unguessable token, `noindex, nofollow` on share pages, an
expiry (`[ASSUMPTION]` 90 days, renewable by the owner), a visible revoke control for the
owner, and a share view that shows the chart without exposing raw exportable data.

### 10.5 GDPR — the reason to stay US-only at launch `[SETTLED in principle]`

If you sell into the EU/UK, GDPR applies. The specific problem for a family tree product is
**Article 14**: when you obtain personal data from someone other than the data subject, you
must generally inform the data subject — identity of the controller, purposes, retention,
their rights — normally within a month.

For a great-aunt in Cork whose name your customer typed in and about whom you hold nothing
but a name and a birth year, that notice obligation is **practically impossible to satisfy**
and the available exemptions (disproportionate effort, no contact details) are arguable
rather than clean `[UNSETTLED]`. There is a household/personal-activity exemption in GDPR,
but it applies to the individual doing genealogy for themselves — **not to you, because you
are processing commercially.**

`[NEEDS PROFESSIONAL]` before any EU/UK launch. This is not a "add a cookie banner and
you're fine" situation; it is a genuine structural question for the product. **Do not sell
to the EU/UK at launch.** Geo-restrict checkout and say so in the ToS.

### 10.6 What the customer warrants, and what you licence `[CHEAP TOOL]` — write this clause carefully

In the ToS:

**The customer warrants** that they have the right to provide the information they enter;
that they will not enter data they are not entitled to share; that any uploaded GEDCOM is
theirs to use (Ancestry/MyHeritage export terms are between the customer and that
service, not between you and it); and they indemnify you for claims arising from what they
submitted.

**You take a narrow licence** — strictly to store, render, print, fulfil, and support the
order, plus a defined retention period so reorders work. Explicitly **not** a licence to
publish, aggregate, resell, market with, or train on.

**State plainly that you do not claim ownership of the customer's family data.** This is
both correct and commercially valuable — a well-known genealogy company took serious
reputational damage over a broadly-worded ownership clause. Put it in plain English above
the legalese: *"Your family's information is yours. We use it to make and deliver your
chart, and for nothing else."*

**You do own** the chart designs, templates, typography choices, ornament, layout system
and the software. The customer gets a personal-use licence in the delivered artefact and,
where purchased, the hi-res digital file — personal use, not commercial reproduction or
resale. Note this is a soft control: a $15 digital file is trivially reprintable, which is
exactly why Phase 2 restricts it to a post-purchase add-on. The licence text manages
expectation; it is not enforcement.

### 10.7 Trademark: "Kinline" is UNCLEARED `[NEEDS PROFESSIONAL]` — see §11.3

Flagged here because it is an IP item; the detail is in §11.3. **Nobody has searched this
name.** Do not print anything with it on until you have at least done the free search.

---

## 11. Trademark

### 11.1 Your position today `[SETTLED]`

Using a name in commerce gives you **common-law rights** in your actual geographic and
product market, without any filing. That is real but thin: it is hard to enforce, does not
cover the whole US, and does not protect you from a prior user or a registrant elsewhere.

A federal registration gives nationwide constructive priority, the ® symbol, a basis for
enforcement and for platform takedowns, and — the reason it matters at your stage —
**protection against having to rename**.

### 11.2 The asymmetry that determines the timing

| Revenue at which you are forced to rename | Cost of renaming `[ASSUMPTION]` |
|---|---|
| $1,000/mo | Low. New domain, redo the logo, redirect. Maybe $500 and a weekend. |
| $10,000/mo | Moderate. Add: SEO equity loss, printed inserts, customer confusion. Low thousands. |
| $50,000/mo | High. Add: backlink equity, brand recognition in a gift category built on trust, packaging inventory. |

Because Kinline's acquisition strategy (Phase 7/8) is SEO-led, brand equity accrues into a
domain over time — which means **the cost of a forced rename rises faster here than for a
paid-acquisition business.** That argues for clearing earlier than a generic "wait until
you're bigger" rule.

### 11.3 What to do, and when

**This week, `[DIY]`, $0 — the knockout search.** One to two hours:

1. Search the USPTO trademark database for "Kinline" and near-misses: Kin Line, Kinlin,
   Kynline, Kinlane, KinLink, Kindline. Genealogy and print-adjacent names cluster hard
   around `kin-`, `kindred-`, `lineage-`, `roots-`, `heritage-` — a conflict is genuinely
   plausible, not a formality.
2. Search in the classes that matter: **Class 16** (paper goods, printed matter, art
   prints), **Class 42** (SaaS — the builder), and **Class 35** (retail services) `[VERIFY
   class selection with counsel before filing]`.
3. Plain Google, plus domain and social handle availability, plus your state's business
   name register — common-law users do not appear in the USPTO database and can still
   block you.

If that turns up a live registration for a similar mark in a related class, **stop and pick
a different name now**, before you have anything to lose. That decision is free today.

**Later, `[NEEDS PROFESSIONAL]` — the clearance opinion and filing.**

| Item | Cost `[VERIFY / ASSUMPTION]` | Notes |
|---|---|---|
| Attorney knockout + clearance search and opinion | `[ASSUMPTION]` $500–$1,500 | The valuable part. A search you can interpret is worth more than a filing you can't defend. |
| USPTO application filing fee, per class | `[VERIFY]` ~$350/class base under the fee structure introduced in 2025, with surcharges for custom identifications and insufficient information | The USPTO restructured fees; do not budget from an older number |
| Attorney filing and prosecution | `[ASSUMPTION]` $500–$1,500 | Office actions cost extra |
| **Realistic all-in, two classes, with counsel** | **`[ASSUMPTION]` $1,500–$3,000** | |

**Trigger:** do it at roughly **$3,000–$5,000 cumulative revenue**, or immediately before
spending more than ~$2,000 on brand assets (packaging, printed inserts, a designed
identity), whichever comes first. Filing at $0 revenue on an unvalidated business is
spending scarce cash on an option you may never exercise; filing after you have real SEO
equity is leaving a rename risk uninsured. Between those is right.

`[DIY]` You can file yourself through the USPTO's TEAS system. I would not, for a name you
intend to build a brand on — identification-of-goods drafting is where self-filed
applications get into trouble, and the failure mode is a registration narrower than you
think you have.

### 11.4 Trademark risk in SEO copy `[SETTLED]` — this is a live risk given the SEO-led strategy

Phase 7's SEO engine will generate a lot of copy. Some of it will want to name competitors
and platforms. The rules:

**Permitted (nominative fair use)** — truthful, factual reference where you need the name to
describe what you do, no more of the mark than necessary, and nothing suggesting
sponsorship or endorsement:

- "Import a GEDCOM file exported from Ancestry.com, MyHeritage, or FamilySearch."
- A factual comparison table, if every claim in it is accurate and current.
- "GEDCOM" used descriptively for the file format `[UNSETTLED but low risk — GEDCOM is a
  FamilySearch specification and the term is used industry-wide as the de facto name of the
  format; descriptive use is standard practice]`.

**Do not:**

- Put a competitor's mark in a **page title, H1, URL slug, or domain**. "Ancestry family
  tree posters" as a page title is the classic mistake.
- Use any competitor **logo, wordmark styling, or brand colours**.
- Imply affiliation, partnership, endorsement, or official compatibility certification.
- Bid on competitor brand terms in paid search. `[UNSETTLED legally — keyword bidding on
  another's mark has produced mixed outcomes]` but Phase 3 already established paid
  acquisition doesn't work at these margins, so this is moot. Don't.
- Use marks in meta titles/descriptions, alt text, or structured data.
- Say "the Ancestry alternative" as a **brand position**. Say what you are instead.

**Do:** put a one-line disclaimer at the foot of any compatibility or comparison page —
*"Ancestry, MyHeritage and FamilySearch are trademarks of their respective owners. Kinline
is not affiliated with, endorsed by, or sponsored by any of them."*

`[DIY]` Add this to the SEO content brief as a hard rule, not a guideline. The realistic
downside is not usually a lawsuit — it is a takedown, an ad account suspension, or a
deindexing at exactly the wrong time of year.

---

## 12. Smaller items, briefly

| Item | Label | Position |
|---|---|---|
| **PCI DSS** | `[DIY]` `[SETTLED]` | Stripe Checkout is hosted — card data never touches your servers, so you fall under **SAQ A**, the minimal self-assessment. **Do not** build custom card fields or self-host the payment form; that changes your SAQ level materially. |
| **DMCA safe harbour** | `[DIY]` | Only relevant if you host user-uploaded content (photos) or public pages. Registering a designated agent with the Copyright Office is cheap `[VERIFY — my recollection is $6 per designation, renewable every 3 years]` and required to claim the safe harbour. Not needed for a text-only, non-public v1. |
| **Right of publicity** | `[DIY]` awareness | Using a real person's name/likeness commercially can implicate state right-of-publicity law. Printing a customer's own family chart for that customer is not that. **Using a real family's chart in your own marketing is** — get written permission for every testimonial chart and every sample image, or use fully fictional sample data. Build the sample charts with invented names from day one. |
| **Business insurance** | `[CHEAP TOOL]` | A Business Owner's Policy (general liability) is `[ASSUMPTION]` a few hundred dollars a year. Product liability on paper prints is close to nil. Not urgent at 11 orders/month; get it when you have assets to defend or a partner asks for a certificate. E&O/professional liability is not applicable. |
| **Supplier agreement** | `[DIY]` read it | Read Prodigi's/Gelato's terms specifically for: who bears reprint cost on defects, what SLA they commit to, whether they can raise prices without notice, and what happens at Christmas peak. Phase 3's margins are thin enough that the reprint clause is a real number. |
| **Gift card / stored value** | — | Do not issue gift cards. State escheat/unclaimed-property rules and expiry restrictions are a genuine administrative burden for a solo operator. If you want a gift mechanic, sell the chart and let the buyer gift the physical object. |
| **Accessibility of the digital file** | `[DIY]` | The $15 hi-res file is an image; nothing required. Don't over-think it. |
| **Advertising claims** | `[DIY]` `[SETTLED]` | FTC truth-in-advertising: "archival-quality", "museum-grade", "100-year" claims must be substantiable — take them from the supplier's own spec sheet and be prepared to point at it. Do not invent a longevity number. No fake reviews, no fake scarcity timers, no invented "was $X" reference prices (the FTC's rules on fake reviews and deceptive pricing are enforced). |
| **Subscription/auto-renew law** | n/a | No recurring billing in the model. Keep it that way and an entire regulatory area (ROSCA, California's auto-renewal law) stays irrelevant. |

---

## 13. Cost summary

### 13.1 Year-one setup, realistic range

| Item | Low | High | Label |
|---|---|---|---|
| LLC formation (state fee) | $50 | $500 | `[VERIFY]` |
| Registered agent (year 1) | $0 | $150 | `[VERIFY]` |
| EIN | $0 | $0 | `[SETTLED]` |
| Sales tax permit | $0 | $100 | `[VERIFY]` |
| Policy templates / generator | $0 | $200 | `[ASSUMPTION]` |
| PO Box (for CAN-SPAM address) | $80 | $200 | `[ASSUMPTION]` |
| SPF/DKIM/DMARC, Postmaster Tools, axe DevTools | $0 | $0 | `[SETTLED]` |
| **Setup subtotal** | **$130** | **$1,150** | |
| CA franchise tax, **if you live in California** | +$800 | +$800 | `[VERIFY]` |

### 13.2 Recurring

| Item | Annual | Label |
|---|---|---|
| Registered agent | $0–$150 | `[VERIFY]` |
| State annual report / franchise fee | $0–$800 | `[VERIFY — state-specific]` |
| Stripe Tax at $12k/yr home-state-taxable sales (0.5%) | ~$60 | `[FIXED rate]` |
| Policy generator subscription (if used) | $0–$200 | `[ASSUMPTION]` |
| CPA for the annual return (Schedule C, single-member LLC) | $300–$800 | `[ASSUMPTION]` |
| **Recurring subtotal** | **~$360–$2,010** | |

### 13.3 Triggered, later

| Item | Cost | Trigger |
|---|---|---|
| Trademark clearance + registration, 2 classes | `[ASSUMPTION]` $1,500–$3,000 | $3–5k cumulative revenue |
| SALT CPA hour on POD nexus | `[ASSUMPTION]` $200–$400 | Supplier locked in, printer in another state |
| Lawyer-reviewed ToS/Privacy | `[ASSUMPTION]` $1,500–$4,000 | Meaningful revenue, or photo uploads / public sharing added |
| Accessibility demand-letter response | `[ASSUMPTION]` $2,000–$15,000+ | If it happens. Budget nothing; know the number exists. |
| Business owner's policy | `[ASSUMPTION]` $300–$800/yr | When there are assets to defend |

Against Phase 3's economics, **the fixed legal cost of running Kinline is roughly one to
four orders per month.** That is not the thing that decides whether this business works.

---

## 14. What genuinely requires a professional

Everything else in this document is `[DIY]` or `[CHEAP TOOL]`. These five are not:

| # | Question | Who | When |
|---|---|---|---|
| 1 | Does third-party POD fulfilment create sales tax nexus for me in the printer's state? (§3.6) | SALT-capable CPA | After supplier selection; one paid hour |
| 2 | Is "Kinline" clear to use and register? (§11.3) | Trademark attorney | At $3–5k cumulative revenue, or before major brand spend |
| 3 | Response to any accessibility demand letter (§9.5) | Litigation counsel with ADA web experience | Only if it happens. Do not self-respond. |
| 4 | GDPR Article 14 and the third-party-family-data problem (§10.5) | Privacy counsel | Only before an EU/UK launch. Not at US launch. |
| 5 | S-corp election and entity tax structure (§2.6) | CPA | Net profit sustainably >$40–50k |

---

## 15. Where I am least confident

Stated plainly, because this document will be acted on:

1. **Every fee figure.** I have no web access in this session. LLC filing fees, USPTO fee
   schedules, sales tax thresholds, CAN-SPAM penalty amounts and DMCA agent fees all change.
   Treat every dollar figure here as a prompt to look it up, not as a budget line.
2. **The current list of state privacy laws and their thresholds** (§6.1). This area
   legislates every year and my knowledge has a cutoff. The *structural* analysis — that you
   are far below the volume thresholds, and that Texas-style no-threshold laws are the model
   to watch — I stand behind. The specific list, I do not.
3. **The POD nexus question** (§3.6). I flagged it as unsettled because it genuinely is, and
   because drop-shipment rules differ by state in ways I cannot reliably reconstruct. This
   is the item most likely to produce an unpleasant surprise, and it is also the cheapest to
   resolve. Resolve it.
4. **Accessibility litigation volume** (§9.2). I know the phenomenon is real and growing. I
   deliberately did not give you a filing count because I would be guessing, and a fabricated
   statistic in a document you will act on is worse than an admitted gap.
5. **The GDPR Article 14 analysis** (§10.5). I am confident the problem is real and that the
   household exemption does not save a commercial processor. I am not confident about which
   exemptions a competent privacy lawyer would successfully rely on. Nobody should conclude
   from this document that EU sales are impossible — only that they are not a launch
   decision.

Two places where I think **this plan is weak**, as opposed to merely uncertain:

- **The family-data position is a policy, not a control.** §10.3 and §10.4 describe good
  decisions, but nothing enforces them except your own discipline. The first time a growth
  idea requires cross-linking trees or emailing the relatives who opened a share link, the
  commercial pressure will point one way and this document the other. Write the rule into
  the ToS and the privacy policy now, so that breaking it later requires you to publicly
  change your terms rather than quietly change a query.
- **The refund policy in §5.3 is more generous than the legal minimum and I have not
  costed it against Phase 3's margins.** A goodwill reprint on a customer-caused typo costs
  roughly a full COGS with no revenue. If the typo rate is materially above `[ASSUMPTION]`
  2–3% of orders, that policy stops being cheap goodwill and starts eating the gross margin
  the framing upsell already fails to defend. Track the reprint rate from order one, and
  treat §5.3 as revisable once you have a real number.
