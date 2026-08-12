import type { Metadata } from "next";
import Link from "next/link";

import { unsubscribe } from "@/lib/db/repo";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * One-click unsubscribe.
 *
 * No confirmation step, no "are you sure", no login. CAN-SPAM requires that
 * opting out be honoured without making the person jump through hoops, and the
 * 2024 bulk-sender rules made one-click the practical standard. Anything more
 * elaborate here would be both rude and a deliverability risk.
 */
export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>;
}) {
  const { t } = await searchParams;
  const done = t ? await unsubscribe(t) : false;

  return (
    <div className="mx-auto max-w-lg px-5 py-28 text-center sm:px-8">
      <h1 className="rule-accent text-3xl">
        {done ? "You're unsubscribed" : "We couldn't find that link"}
      </h1>
      <p className="prose-kin mt-6">
        {done
          ? "You won't get any more marketing email from us. Order confirmations and shipping updates for anything you buy will still arrive, because you need those."
          : "That unsubscribe link may have already been used, or it may be incomplete. Email us and we'll take care of it by hand."}
      </p>
      <Link href="/" className="btn btn-secondary mt-9">
        Back to Kinline
      </Link>
    </div>
  );
}
