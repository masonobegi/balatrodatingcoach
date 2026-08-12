import type { MetadataRoute } from "next";

import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Shared charts contain living people's names. They already carry
        // noindex headers; this is belt and braces, and it also keeps
        // one-off transactional URLs out of crawl budget.
        disallow: ["/admin", "/api/", "/chart/", "/checkout", "/order/", "/unsubscribe"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
