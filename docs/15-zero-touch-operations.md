# Zero-touch operations

**Requirement: the business must be fully online for the operator.** No stock,
no storage, no packing, no post office, no physical object passing through their
hands — at launch or at scale.

This document audits every operational touchpoint against that requirement. It
is a checklist to hold future decisions to, not a reassurance.

---

## Every touchpoint, audited

| Touchpoint | Who does the physical part | Operator action | Online? |
|---|---|---|---|
| Customer builds a chart | — | none | ✅ |
| Payment | Stripe | none | ✅ |
| Artwork generation | The app, from the stored chart | none | ✅ |
| **Printing** | Print partner's lab | none | ✅ |
| **Packing** | Print partner | none | ✅ |
| **Shipping** | Print partner → customer, direct | none | ✅ |
| **Order sent to the lab** | Automatic on payment | **none** | ✅ |
| Artwork delivery to the lab | Lab fetches a signed URL | **none** | ✅ |
| Tracking | Provider callback | **none** | ✅ |
| Order confirmation email | Resend, automatic | **none** | ✅ |
| Shipping email | Automatic on provider callback | **none** | ✅ |
| **Wrong name → reprint** | Print partner reprints | click | ✅ |
| **Damaged → replacement** | Print partner reprints | click | ✅ |
| **Returns** | **None exist. See below.** | none | ✅ |
| Refunds | Stripe dashboard | click | ✅ |
| Customer support | Email | typing | ✅ |
| Sales tax | Stripe Tax + online filing | typing | ✅ |
| Business entity | State website / online formation service | typing | ✅ |
| Banking | Online business bank | typing | ✅ |
| Marketing | Facebook groups, Pinterest, email | typing | ✅ |
| Seeding charts to community figures | Print partner ships direct to them | click | ✅ |

There is no row in this table where the operator touches an object, and — once
`PRODIGI_API_KEY` and `PRODIGI_WEBHOOK_KEY` are set — no row where they take an
action at all.

## The fully automatic path

A paid order runs start to finish with nobody involved:

```
customer pays
  → Stripe webhook records the order and freezes the chart snapshot
  → a signed artwork URL is stamped onto the order
  → the order is submitted to the print partner automatically
  → the partner fetches the print-ready 300 DPI file from that URL
  → the partner prints, packs and ships direct to the customer
  → the partner's callback marks it shipped
  → the customer is emailed their tracking link
```

Two things make this work without extra services. The **artwork URL is served
by this app**, signed with an HMAC bound to the order reference, so no object
storage is needed on the critical path. And it renders from the order's
**frozen chart snapshot**, not the live chart — customers do keep editing their
draft after buying, and the press must receive what they paid for.

Your only involvement is replying to email.

## Returns do not exist, by policy

Worth stating separately because it is the usual way a "fully online" store
quietly becomes a physical one.

`/refunds` says, in the customer's own words: **"Do not send it back — posting a
damaged print costs more than reprinting it and helps nobody."**

For a personalised chart of one specific family, that is not generosity, it is
arithmetic. A returned chart has zero resale value — there is precisely one
household on earth that wants it. Paying return postage to receive a worthless
object, and then storing it, would be worse for us *and* slower for the
customer.

So every failure mode resolves to a reprint or a refund, both of which are a
click:

| Problem | Resolution | Object comes to the operator? |
|---|---|---|
| Name spelled wrong | Reprint once, free | No |
| Arrived damaged | Photo, then replace | No |
| Never arrived | Reprint and reship | No |
| Changed their mind before press | Cancel and refund | No |
| Changed their mind after press | Refund declined, per policy | No |

## What was removed to protect this

Two catalogue items would have broken it, and both are disabled in code:

- **Framing** (`FRAMING_ENABLED = false`) — bulky, fragile, and already failing
  on margin.
- **Gift wrap and a handwritten card** (`GIFT_WRAP_ENABLED = false`) — the
  subtle one. It reads like a small add-on but requires the parcel to route
  lab → operator → wrap → write → re-ship. Inventory, storage, labour, and a
  second shipping leg, for $8.

Both remain fully implemented and tested behind their flags, so either can be
re-enabled the day a fulfilment partner can do it **at the lab**.

## The standing test

Any future product idea must pass this before it is built:

> **Does this require the operator to receive, hold, alter, or post a physical
> object?**
>
> If yes, it is not this business — or it is only this business once a partner
> does that step at their own facility.

Ideas that pass: more sizes, more colourways, more chart styles, digital
add-ons, a second product printed by the same partner.

Ideas that fail: framing in-house, hand-wrapping, hand-written cards, signed or
numbered editions, kits, anything with an accessory, anything requiring quality
inspection before dispatch.

## The one genuine exception, and how to discharge it

**Judging print quality once.** The brand claims "made to be kept". That claim
cannot honestly be made about paper nobody has touched, and no spec sheet
substitutes for holding it.

This is a one-off at setup, not an operating step, and it never has to arrive at
the operator's address:

1. **Ship it to a relative as a real gift.** Build a genuine chart of the
   operator's own family and have the single sample delivered straight to a
   parent or grandparent. It costs ~$25, tests the partner end to end, and their
   unprompted reaction is better research than any survey. Ask for photographs —
   that becomes the first real product photography, which the store currently
   lacks.
2. **Or send it to a friend, or an office**, and ask for close-up photos of the
   outer-ring type.
3. **Or skip it**, and accept a stated risk: the first paying customer becomes
   the quality test. Cheap in money, expensive in reputation, and it forfeits
   the product photography either way. Not recommended, but it is a legitimate
   choice and it keeps the setup 100% online.

**Verifying supplier *cost* requires nothing physical at all** — add an A2
fine-art print to a Prodigi and a Gelato basket, enter an address, read the
checkout total, do not pay. That is the number the whole model rests on, and it
is free. See `docs/05-where-money-returns.md`.

---

## Where this could break later

Honest failure modes to watch, none of which are live today:

- **A print partner that requires physical onboarding** (a signed contract by
  post, a physical proof sign-off). Prodigi and Gelato are both fully
  self-serve; a local giclée printer may not be.
- **A bank or state that demands wet-ink documents.** Some states still do for
  entity formation. Check before choosing where to incorporate.
- **Success.** At meaningful volume there is real pull toward better packaging,
  inserts, and framing, because they raise AOV. Every one of them ends with
  boxes somewhere. The answer is a fulfilment partner, never a spare room.
