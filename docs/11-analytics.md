# Phase 11 — Analytics

One dashboard at `/admin`. No second service to open.

---

## What is measured, and why each one earns its place

| Event | Fires when | The question it answers |
|---|---|---|
| `page_view` | Any non-admin page | Traffic, sources, landing pages |
| `builder_started` | Builder mounts | Do visitors even try? |
| `person_named` | First name entered | Is the empty state the barrier, or the effort? |
| `builder_completed` | 7+ names entered | **The one that matters.** See below. |
| `size_selected` | Size changed | Which size people gravitate to before price |
| `share_link_copied` | Share link copied | Does the growth loop fire at all? |
| `share_link_opened` | A shared chart is viewed | Do relatives actually open them? |
| `checkout_started` | Checkout begun | Build → intent |
| `purchase` | Confirmation page, deduped | Revenue, conversion, attribution |
| `gedcom_uploaded` / `gedcom_failed` | GEDCOM path | Is the secondary path worth its maintenance? |
| `email_captured` | Email given | List growth |

### Why `builder_completed` is 7 names, not "all of them"

Nobody fills every slot. A four-generation chart is fifteen people and a typical
gift chart has real gaps in the outer ring. Defining completion as 100% would
make the metric permanently near zero and therefore useless.

Seven names — the root, both parents, all four grandparents — is the point at
which a chart is worth printing. That threshold is the operational definition of
**the single largest unvalidated assumption in this business: will a gift buyer
type in fifteen names?** Every other number is downstream of it.

---

## The funnel

```
Visitors
  └─ Opened the builder          ← is the homepage doing its job?
      └─ Typed a first name      ← is the empty state intimidating?
          └─ Built a real chart  ← THE ASSUMPTION
              └─ Started checkout ← is the price the problem?
                  └─ Purchased    ← is the checkout the problem?
```

Each step is measured against the step above, so a collapse is attributable to
one transition rather than to "conversion". The dashboard flags builder
completion below 25% in red, because that is a documented kill signal
(`docs/12-failure-detection.md`).

---

## The metrics the brief asked for

| Asked for | Where |
|---|---|
| Visitors, sources, landing pages | Dashboard headline + source table |
| Product views, add-to-cart | Reframed as builder-started / builder-completed — this store has no cart, and pretending otherwise would measure a funnel we do not have |
| Checkout initiation & completion | Funnel steps 5 and 6 |
| Conversion rate | Headline, purchases ÷ visitors |
| Revenue | Headline, from the orders table (not events) |
| Average order value | Headline |
| **Gross margin** | Headline — revenue − modelled COGS − Stripe fees |
| CAC | **Not automated.** See below. |
| Repeat purchase rate | Orders are keyed by email; low priority until there is repeat volume |
| Email signup rate | `email_captured` ÷ visitors |

### Why CAC is not automated

It would require ad-platform integrations that cost more to build and maintain
than they are worth at this volume, and the unit economics already concluded
that **paid acquisition is not viable at launch** — break-even CAC is $49–64
against a modelled paid CAC of $84–392.

The dashboard therefore reports *revenue and orders by source*, which is what
actually decides where to spend time. Divide spend by orders by hand on the
weeks paid experiments are running. When paid becomes viable, this becomes worth
building; before then it is instrumentation for a channel we are not using.

---

## Attribution

UTM parameters are captured on every event and **frozen onto the order** at
checkout, so attribution survives the customer clearing storage, switching
device, or returning weeks later. The source table joins events to orders on
that frozen value.

Referrer hostnames are normalised (`www.` stripped) and empty referrers become
`direct`.

---

## Privacy

Deliberately unusual, and it is a feature rather than a compromise:

- **No third-party analytics script.** No PostHog, no GA4, no Meta pixel.
- **First-party random identifier** in `localStorage`. Never joined to a name,
  an email, or an address anywhere in the schema.
- **No cross-site tracking, no advertising cookies.** A US store on this
  footing does not have the consent-banner argument to have, and there is no
  vendor to disclose in the privacy policy.
- Admin traffic is excluded so the founder's own visits do not distort the
  funnel.

The cost of this choice is real: no session replay, no heatmaps, no funnel
exploration UI. For a store answering six specific questions, that is a good
trade. If session replay becomes the bottleneck, add PostHog then — and update
the privacy policy and cookie posture at the same time.

---

## Reliability

Analytics must never break the store:

- `/api/events` **always** returns 204, whatever happens inside it
- `sendBeacon` where available, so the purchase event survives the checkout
  redirect that would kill a normal `fetch`
- `purchase` deduped in `localStorage` by order reference — the confirmation
  page is refreshed, bookmarked, and reopened from the receipt email, and a
  purchase counted three times makes conversion, revenue, and CAC all wrong at
  once
- Memory-mode event buffer is bounded so a long dev session cannot grow without
  limit
- Rate limited at 300/min per IP

---

## Weekly review

Ten minutes, `/admin?days=7`:

1. **Builder completion.** Below 25%? That is the assumption failing. Nothing
   else matters this week.
2. **Traffic vs. last week**, and which source moved.
3. **Share links opened, and purchases from them.** This is the growth loop. If
   links get opened but never convert, the loop is decorative.
4. **Gross margin.** Drifting below 55% means supplier costs have moved away
   from the model.
5. **Orders awaiting fulfilment.** Operational, but it is what customers feel.
