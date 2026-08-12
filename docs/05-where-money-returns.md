# Where spending more actually returns something

You said the $100/month ceiling can go if the return is better. It can — but
**not on infrastructure**, and the distinction matters more than the number.

At zero customers, another dollar of hosting buys nothing. The store is not slow,
not falling over, and not constrained by its plan. Infrastructure is the one
line where you are already at the efficient point, and paying more would be
buying capacity for traffic that does not exist.

Here is the honest ranking of what a marginal dollar buys, best first.

---

## 1 · Verify supplier cost — **$0, and nothing gets delivered**

**The highest-return hour in this plan, and it costs nothing.**

Every cost-of-goods figure in this repository is a modelling assumption; the
research tooling could not reach a single supplier's live pricing. But
confirming that number does **not** require receiving anything:

1. Create a free Prodigi and Gelato account.
2. Add an 18×24 (A2) fine-art print to the basket.
3. Enter a US delivery address and go to the checkout screen.
4. Read the total. Do not pay.

That gives you real product cost plus real shipping — the two numbers the whole
model rests on. Twenty minutes, no account fees, no parcel. Then update
`PRINT_VARIANTS` in `lib/pricing.ts`.

If delivered cost lands above ~$30 at 18×24, the $79 price is wrong and
everything downstream moves. That is worth knowing before anything else.

## 1b · Judge print quality — one print, once, and not to your address

Cost verification is free; **quality** genuinely needs a physical object. The
pitch is "made to be kept", and you cannot assert that about paper you have
never touched.

You do not need it in your house, and you do not need three:

- **Best option — send it to someone who wants one.** Build a real chart of your
  own family and have the single sample shipped directly to a parent,
  grandparent, or sibling. It is a genuine gift, it costs ~$25, it proves the
  supplier end to end, and the recipient's honest reaction is the most useful
  customer research available to you. Ask them to photograph it — that is your
  product photography.
- Or have it delivered to a friend, or to your office.
- If it must come to you, it is one poster tube. Look at it, photograph it,
  recycle the tube.

Judge four things: paper weight and texture, whether small type in the outer
ring is crisp, colour accuracy against the on-screen preview, and packaging.

**Do not order framed samples.** Framing is disabled, and a framed sample is a
bulky object you would have to store to test a product you are not selling.

## 2 · Domain and business entity — ~$150 one-off

The domain is ~$12. An LLC is $50–500 depending on state and is genuinely
optional at zero revenue — see `docs/13-legal-compliance.md`, and take a CPA's
view rather than mine. Budget for it, do not rush it.

Also here: **clear the name**. "Kinline" has not been checked against USPTO
TESS. It costs nothing but an hour, and it costs a great deal to discover later.

## 3 · Seeding product into the right hands — ~$200

The best distribution money you can spend, and it is spent in product rather
than ads.

Genealogical societies are the underrated channel in `docs/08-acquisition.md`:
there are thousands of them, each with a newsletter, each run by volunteers who
are genuinely pleased when someone makes something good for their members. Give
away five to ten charts to society newsletter editors and Facebook group
admins — people with real standing in a real community — with no obligation
attached.

At ~$21 modelled cost per chart, ten charts is ~$210 and buys warm introductions
that no ad can. This is the closest thing to a solution for the cold-start
problem, which red-team review named as the thing most likely to kill this.

## 4 · Your own time on distribution — free, and the actual constraint

Worth stating plainly because it is the real answer to "what buys the most
return": **the binding constraint is distribution, not money and not software.**

Adversarial review was blunt about it — *the business dies of distribution before
the free-substitute problem gets a chance to kill it, which is why "build it
better" is the wrong response.* The store is built. Spending more on it is the
comfortable move, not the correct one.

## 5 · Paid ads — **not yet**, and this is a real recommendation to hold

Break-even CAC is **$63**. Modelled paid CAC for cold traffic in this category
is **$84–392**. On those numbers, paid acquisition loses money on every order,
and spending more simply loses money faster.

Paid becomes worth testing only once two things are true:

1. Organic conversion is measured and above ~1.5%, so you know the page works.
2. Multi-copy attach is measured, because the share loop is what could make a
   $63 break-even CAC into a $120 one — and that is the number that would make
   Meta viable.

When you do test, cap it at **$300 total** across two weeks with a written kill
criterion, per `docs/08-acquisition.md`. Not a dollar more before the funnel is
proven.

## 6 · Infrastructure — last, and only when something is actually breaking

In rough order of when it would matter:

| Spend | When it earns its cost |
|---|---|
| Resend Pro, $20/mo | Above 3,000 emails/month. Not before. |
| Railway scale-up | When response times degrade, which they will not for a long time |
| Lifecycle email platform | Above ~1,000 contacts, when segmentation starts paying |
| Cloudflare in front | When you have enough traffic for a CDN to matter |

---

## The summary

**Roughly $400 of useful spend exists between here and a validated business**,
and almost all of it is entity, domain, and seeded product. Supplier-cost
verification is free. One quality sample is ~$25 and can be a gift to a relative
rather than a parcel you have to store.

If you want to spend more than $100/month and get a return, the answer is not a
bigger server. It is: confirm real supplier cost this week, send one chart to a
relative, give ten more away to people with an audience, and keep infrastructure
boring and cheap until there are customers whose experience it could improve.

**Nothing in this business requires you to hold stock.** Every print is made
after it is paid for and shipped from the lab straight to the customer. You
never receive, store, pack, or post anything — and the two features that would
have broken that (framing and hand-wrapped gift packaging) are both switched
off in code for exactly that reason.
