"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Order lookup by reference.
 *
 * No account, because there is no account. The reference is unguessable and
 * arrives in the confirmation email, which makes it exactly as strong as a
 * password reset link and considerably less annoying than an account nobody
 * wanted for a one-off purchase.
 */
export function OrderLookup() {
  const router = useRouter();
  const [reference, setReference] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = reference.trim().toUpperCase();
    if (!value) return;

    setBusy(true);
    setError(null);

    const res = await fetch(`/api/orders/${encodeURIComponent(value)}`);
    if (res.ok) {
      router.push(`/order/${value}`);
      return;
    }

    setError(
      "We couldn't find an order with that reference. Check the confirmation email — it starts with KIN-.",
    );
    setBusy(false);
  };

  return (
    <form onSubmit={submit} className="mx-auto max-w-sm">
      <label htmlFor="reference" className="label mb-1.5 block">
        Order reference
      </label>
      <input
        id="reference"
        className="field font-mono"
        placeholder="KIN-4F2A9C"
        value={reference}
        onChange={(e) => setReference(e.target.value.toUpperCase())}
        autoComplete="off"
        required
      />
      {error ? (
        <p role="alert" className="mt-2.5 text-sm text-danger">
          {error}
        </p>
      ) : null}
      <button type="submit" className="btn btn-primary mt-4 w-full" disabled={busy}>
        {busy ? "Looking…" : "Find my order"}
      </button>
    </form>
  );
}
