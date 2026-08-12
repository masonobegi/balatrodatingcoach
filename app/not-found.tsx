import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-5 py-28 text-center sm:px-8">
      <p className="label">Not found</p>
      <h1 className="rule-accent mt-3 text-4xl">This page isn't here</h1>
      <p className="prose-kin mt-6">
        It may have moved, or the link may be incomplete. If you were following a chart
        link someone sent you, ask them to send it again — chart links are long and get
        cut off by some messaging apps.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-secondary">
          Home
        </Link>
        <Link href="/build" className="btn btn-primary">
          Make a chart
        </Link>
      </div>
    </div>
  );
}
