import Link from "next/link";

/**
 * Shared shell for prose pages — help, policies, guides.
 *
 * Policy pages are where a store either looks like a business or looks like a
 * weekend project, and the difference is mostly typography and specificity. So
 * they get the same care as the storefront rather than being dumped into an
 * unstyled `<div>`.
 */
export function ContentPage({
  eyebrow,
  title,
  intro,
  updated,
  children,
  cta = true,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  updated?: string;
  children: React.ReactNode;
  cta?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <header className="text-center">
        {eyebrow ? <p className="label">{eyebrow}</p> : null}
        <h1 className="rule-accent mt-3 text-4xl sm:text-5xl">{title}</h1>
        {intro ? <p className="prose-kin mt-6">{intro}</p> : null}
        {updated ? (
          <p className="mt-5 text-sm text-ink-muted">Last updated {updated}</p>
        ) : null}
      </header>

      <div className="mt-14 space-y-10">{children}</div>

      {cta ? (
        <div className="mt-20 border-t border-rule pt-10 text-center">
          <Link href="/build" className="btn btn-primary">
            Start your chart
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 text-[0.9375rem] leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}

export function QA({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-rule pb-6">
      <h2 className="font-display text-xl">{q}</h2>
      <div className="mt-2 space-y-2.5 text-[0.9375rem] leading-relaxed text-ink-soft">
        {children}
      </div>
    </div>
  );
}
