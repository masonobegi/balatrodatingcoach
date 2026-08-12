# Where spending more actually returns something

You said the $100/month ceiling can go if the return is better. It can — but
**not on infrastructure**, and the distinction matters more than the number.

At zero customers, another dollar of hosting buys nothing. The store is not slow,
not falling over, and not constrained by its plan. Infrastructure is the one
line where you are already at the efficient point, and paying more would be
buying capacity for traffic that does not exist.

Here is the honest ranking of what a marginal dollar buys, best first.

---

## 1 · Physical samples — ~$120, do this first

**The single highest-return spend in this entire plan.**

Every cost-of-goods figure in this repository is a modelling assumption. The
research tooling could not reach a single supplier's live pricing. You are
currently planning a business on numbers I derived rather than measured.

Order the same chart, at 18×24, from **Prodigi**, **Gelato**, and one local
giclée printer. Roughly $40 each delivered.

What that $120 buys:

- **The real margin.** If delivered cost lands above ~$30, the $79 price is
  wrong and everything downstream of it moves.
- **The quality answer.** This product's entire pitch is "made to be kept". If
  the paper feels thin or the type is muddy at small sizes, you find out for
  $40 rather than after fifty customers do.
- **Your first photographs.** You cannot photograph a product you have never
  held, and every real-world shot you will ever need starts here.
- **The framing decision.** Framing ships disabled because a framed A2 modelled
  near €48 against €10 for paper. One framed sample settles whether that flag
  should flip.

Nothing else on this list is worth doing before this.

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

**Roughly $500 of useful spend exists between here and a validated business**,
and about $470 of it is samples, entity, and seeded product. The remaining ~$30
is a month of hosting.

If you want to spend more than $100/month and get a return, the answer is not a
bigger server. It is: buy the samples this week, give ten charts away to people
with an audience, and keep infrastructure boring and cheap until there are
customers whose experience it could improve.
