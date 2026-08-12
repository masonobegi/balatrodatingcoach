# Phase 6 — Design

The reference is a fine-press print studio, not a software company.

Two buyers are deciding, in about two seconds, whether this looks like somewhere
it is safe to spend $79 on something irreplaceable: a 35–60 year old buying a
gift for a parent, and a 55–75 year old family historian. Neither is impressed
by a product that looks like a startup. Both are reassured by something that
looks like it has existed for a while.

---

## Brand personality

**Heirloom, archival, quiet, warm, unhurried.**

| We are | We are not |
|---|---|
| A press that makes one thing well | A platform, a suite, a solution |
| Warm and plain-spoken | Clever, breezy, exclamatory |
| Confident enough to be calm | Urgent, scarce, discounted |
| Specific | Aspirational |

The test applied to every screen: *would this look out of place framed on the
wall of a good stationery shop?* If yes, it is wrong.

---

## Typography

**EB Garamond** for everything expressive; a system sans for interface chrome.

Garamond is a genuine heirloom typeface with four centuries of use in exactly
this context — family records, memorials, dedications. It is self-hosted under
the SIL Open Font License, which means no CDN request, no third-party cookie
question, and no dependency that can change under us.

That last point is not aesthetic. **The poster typeface is pinned and shipped**
(`assets/fonts/EBGaramond.ttf`). The layout engine computes name placement
against that font's measured metrics, so a rasteriser silently substituting
DejaVu would change every glyph width the layout was calculated from. The
preview a customer approves has to be the artwork that prints, and that requires
one font, everywhere, deterministically.

| Role | Face | Notes |
|---|---|---|
| Display, headings, prices | EB Garamond 400 | Tight leading (1.15), slight negative tracking |
| Long-form body (`.prose-kin`) | EB Garamond | 19px, 1.65 leading — set for a 60-year-old reading on a laptop |
| Interface, forms, tables | System sans | Better at small sizes on screen |
| Labels (`.label`) | System sans 600 | 11px, uppercase, 0.14em tracking |
| Chart labels | EB Garamond | Sizes derived from geometry, never hard-coded |

Input fields use Garamond deliberately — the builder is almost entirely names,
and names look like names in a serif.

---

## Colour

Ink on paper. No pure black, no pure white: untinted white on archival stock
reads as a printing error, and #000 reads as a screen.

| Token | Value | Use |
|---|---|---|
| `paper` | `#FBF8F2` | Page ground |
| `paper-deep` | `#F3EDE2` | Alternating bands, footer |
| `paper-raised` | `#FFFDF9` | Cards, inputs |
| `ink` | `#23201B` | Primary text, primary button |
| `ink-soft` | `#4A423A` | Body copy |
| `ink-muted` | `#7D7266` | Secondary, captions |
| `rule` | `#E3DACE` | Hairlines — the main structural device |
| `walnut` | `#7A5C3E` | The single accent: prices, ornament rules, focus |
| `sage` | `#35624A` | Success |
| `danger` | `#8C3A2E` | Errors — oxblood, not fire-engine red |

One accent, used sparingly. Adding a second would be the fastest way to make
this look like a template.

### Print themes

Separate from the UI palette, because they have to survive a giclée press and
sit on a real wall next to real furniture: **Heirloom** (warm ivory/walnut),
**Midnight** (navy/brass), **Botanical** (sage/forest), **Slate** (cool
greys/minimal). Defined in `lib/chart/themes.ts`.

---

## UI style

- **Radii 2–3px.** Pill buttons and `rounded-2xl` cards read as "app".
- **No shadows, no gradients, no glass, no glow.** Hairline rules do the work.
  The one exception is a soft shadow under a chart preview, which reads as a
  physical print lifted off the page — the only place depth is truthful.
- **Generous vertical rhythm.** Crowding reads as cheap.
- **Buttons move colour on hover, never elevation.** A press has no z-axis.
- **The recurring ornament** is a short centred walnut rule under a heading
  (`.rule-accent`). One motif, used consistently, is a brand; three is a
  scrapbook.

---

## Product presentation

**The chart is the photography.** There are no lifestyle shots, no mocked-up
frames on stucco walls, no stock photography of a smiling family — all of which
would be both expensive and obviously fake for a business with no inventory.

Instead every chart on every page is rendered live by the production renderer
from a sample family. The homepage hero, the four colourway swatches, the six
occasion illustrations on the gift guide: all real output. That is honest, it
costs nothing, it is impossible to get out of sync with the product, and it
scales to any size without an image bill.

The sample family (`lib/chart/sample.ts`) is mixed in origin so any visitor can
picture their own names in it, and **has deliberate gaps** — two unknown
great-great-grandparents. Showing an incomplete tree as the flagship image is a
choice: it pre-answers the most common objection ("I don't know all the names")
before it is raised.

---

## Copywriting voice

Write the way a good shopkeeper talks.

**Never:** exclamation marks · "unleash", "elevate", "transform", "magic",
"seamless" · urgency theatre or fake scarcity · "Sign up now!" · em-dash-heavy
breathlessness.

**Always:** the concrete thing. "About five minutes and the names you already
know", not "effortless family history at your fingertips". Sentences may be
long. Ideas may be quiet. Confidence reads as calm.

Worked examples from the build:

| Instead of | We wrote |
|---|---|
| "3 of 15 names completed!" | "3 names so far" |
| "Add another generation (8 more slots)" | "Add their great-grandparents +8" |
| "Unlock your preview" | "Build it and see the finished poster before you pay anything" |
| "All sales final" | "There is nobody else on earth who wants a chart of your family" |
| "We value your privacy" | "We don't publish charts, sell data, or add anyone to a public database" |

The counter change is worth calling out: naming a denominator turns a gift into
an assignment, and the biggest risk in this business is a buyer deciding this is
too much work.

---

## Mobile

First-class, not adapted. The gift buyer is on a phone.

The builder's mobile ordering was the one genuinely hard call. The preview must
come first — it is the reason anyone keeps going — but a full-width poster
preview pushes the first input below the fold, and style controls have no
business appearing before a single name has been typed. The right column becomes
`display: contents` on small screens so its two halves take their own places in
the flex order: **compact preview → name fields → controls → buy**. On desktop
it collapses back into a sticky right rail.

Other mobile decisions: a scrollable nav row instead of a hamburger (every
destination is one tap; hiding them costs conversions), 16px minimum input font
to stop iOS zoom, and numeric `inputMode` on year fields.

---

## Accessibility

Treated as a legal exposure as much as a usability one — ADA/WCAG demand-letter
activity against e-commerce is real and growing, and an invisible focus ring is
among the easiest findings to document.

- Visible `:focus-visible` ring on every interactive element, walnut, 2px offset
- Skip link to `#main`
- Every input labelled, visually or via `sr-only`
- Live regions on the save indicator and quantity stepper
- Charts carry a descriptive `aria-label` naming the family and generation count
- `prefers-reduced-motion` honoured globally
- Body text meets WCAG AA on paper; `ink-muted` is reserved for supporting text
- Semantic `fieldset`/`legend` per person in the builder
