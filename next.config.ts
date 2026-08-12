import type { NextConfig } from "next";

/**
 * Image optimization is deliberately left ON for the small set of marketing
 * images we control, but every user-generated / generated-artwork image is
 * served straight from R2 with `unoptimized`. Vercel bills image optimization
 * per source image and it is the single largest bill-explosion risk in this
 * stack (see docs/04-architecture.md).
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /**
   * The rasteriser reads the poster font from disk at runtime. Next traces
   * imports, not `fs` calls, so the file has to be declared or these routes
   * ship without their typeface and refuse to render.
   */
  outputFileTracingIncludes: {
    "/api/render/[token]": ["./assets/fonts/**"],
    "/api/og/chart/[token]": ["./assets/fonts/**"],
    "/api/og": ["./assets/fonts/**"],
  },
  /**
   * resvg ships a native binary, which cannot be placed in an ESM chunk. It has
   * to stay a runtime require rather than being bundled.
   */
  serverExternalPackages: ["@resvg/resvg-js"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**.r2.dev" }],
    // Cap the variants Vercel will generate. Fewer sizes = fewer billed
    // transformations.
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [256, 512],
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
