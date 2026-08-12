import type { Metadata, Viewport } from "next";
import Link from "next/link";

import "./globals.css";
import { SITE, FOOTER_LINKS, NAV_LINKS } from "@/lib/site";
import { Analytics } from "@/components/analytics";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    images: [{ url: "/api/og", width: 1200, height: 630, alt: SITE.tagline }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: ["/api/og"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link href="/" className="font-display text-2xl tracking-tight text-ink">
          {SITE.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/orders" className="hidden text-sm text-ink-muted hover:text-ink sm:block">
            Orders
          </Link>
          <Link href="/build" className="btn btn-primary !py-2.5 !px-4 text-sm">
            Start a chart
          </Link>
        </div>
      </div>

      {/* Mobile nav: a single scrollable row rather than a hamburger, because
          every destination here is one tap and hiding them costs conversions. */}
      <nav
        aria-label="Sections"
        className="flex gap-5 overflow-x-auto border-t border-rule px-5 py-2.5 md:hidden"
      >
        {NAV_LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="whitespace-nowrap text-sm text-ink-soft"
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-paper-deep">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl">{SITE.name}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              Archival family tree charts, printed to order and sent flat in a tube.
            </p>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <p className="label">{group.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ink-soft hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="rule my-10" />

        <div className="flex flex-col justify-between gap-3 text-xs text-ink-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.legalEntity}. Printed to order.
          </p>
          <p>Made for the people who keep the family stories.</p>
        </div>
      </div>
    </footer>
  );
}
