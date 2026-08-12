import { env } from "./env";

/**
 * Brand constants and voice.
 *
 * COPYWRITING VOICE — hold to this everywhere:
 *   Warm, plain, unhurried, specific. Write the way a good shopkeeper talks.
 *   Never exclamation marks. Never "unleash", "elevate", "transform", "magic".
 *   Never urgency theatre or fake scarcity — this audience distrusts it and the
 *   purchase is emotional, not impulsive.
 *   Say the concrete thing: "five minutes and the names you already know",
 *   not "effortless family history at your fingertips".
 *   Sentences may be long. Ideas may be quiet. Confidence reads as calm.
 */
export const SITE = {
  name: "Kinline",
  tagline: "Family tree charts, made to be framed",
  description:
    "Build your family tree in about five minutes and we print it as an archival chart. No software, no research, no file to upload — just the names you already know.",
  url: env.siteUrl,
  email: env.supportEmail,
  /** Registered trading name goes here once the founder forms an entity. */
  legalEntity: "Kinline",
} as const;

export const NAV_LINKS = [
  { href: "/build", label: "Make a chart" },
  { href: "/prints", label: "Prints & pricing" },
  { href: "/gifts", label: "Gift guide" },
  { href: "/how-it-works", label: "How it works" },
] as const;

export const FOOTER_LINKS = [
  {
    heading: "Shop",
    links: [
      { href: "/build", label: "Make a chart" },
      { href: "/prints", label: "Prints & pricing" },
      { href: "/gifts", label: "Gift guide" },
      { href: "/orders", label: "Track an order" },
    ],
  },
  {
    heading: "Help",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/faq", label: "Questions" },
      { href: "/shipping-and-returns", label: "Shipping & returns" },
      { href: `mailto:${SITE.email}`, label: "Email us" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "/refunds", label: "Refunds" },
    ],
  },
] as const;
