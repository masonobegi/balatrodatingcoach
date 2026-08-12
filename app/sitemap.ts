import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

/**
 * Only public, indexable pages.
 *
 * Charts, checkout, orders, and the dashboard are all excluded: a family chart
 * is private data about living people, and listing one in a sitemap would be
 * the fastest possible way to get it indexed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number; frequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, frequency: "weekly" },
    { path: "/build", priority: 0.9, frequency: "monthly" },
    { path: "/prints", priority: 0.9, frequency: "monthly" },
    { path: "/gifts", priority: 0.8, frequency: "monthly" },
    { path: "/how-it-works", priority: 0.7, frequency: "monthly" },
    { path: "/faq", priority: 0.6, frequency: "monthly" },
    { path: "/shipping-and-returns", priority: 0.4, frequency: "yearly" },
    { path: "/terms", priority: 0.2, frequency: "yearly" },
    { path: "/privacy", priority: 0.2, frequency: "yearly" },
    { path: "/refunds", priority: 0.3, frequency: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${SITE.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.frequency,
    priority: r.priority,
  }));
}
