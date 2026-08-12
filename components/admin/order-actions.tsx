"use client";

import { useState } from "react";

export function OrderActions({
  reference,
  fulfillmentStatus,
  trackingUrl,
}: {
  reference: string;
  fulfillmentStatus: string;
  trackingUrl: string | null;
}) {
  const [tracking, setTracking] = useState(trackingUrl ?? "");
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const call = async (action: string, payload: Record<string, unknown> = {}) => {
    setBusy(action);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/orders/${reference}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...payload }),
      });
      const json = (await res.json()) as { error?: string; message?: string };
      if (!res.ok) {
        setMessage(json.error ?? "That didn't work.");
      } else {
        setMessage(json.message ?? "Done.");
        setTimeout(() => window.location.reload(), 700);
      }
    } catch {
      setMessage("Network error.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="card p-5">
      <h2 className="label">Actions</h2>

      <div className="mt-4 space-y-2">
        <button
          type="button"
          className="btn btn-secondary w-full"
          disabled={busy !== null}
          onClick={() => call("submit_fulfillment")}
        >
          {busy === "submit_fulfillment" ? "Submitting…" : "Send to print provider"}
        </button>

        <div>
          <label htmlFor="tracking" className="label mb-1.5 block">
            Tracking URL
          </label>
          <input
            id="tracking"
            className="field !text-sm !font-sans"
            placeholder="https://…"
            value={tracking}
            onChange={(e) => setTracking(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary mt-2 w-full"
            disabled={busy !== null || !tracking.trim()}
            onClick={() => call("mark_shipped", { trackingUrl: tracking.trim() })}
          >
            {busy === "mark_shipped" ? "Saving…" : "Mark shipped & email customer"}
          </button>
        </div>

        <button
          type="button"
          className="btn-quiet w-full text-sm"
          disabled={busy !== null}
          onClick={() => call("resend_confirmation")}
        >
          Resend the confirmation email
        </button>
      </div>

      <p className="mt-3 text-xs text-ink-muted">
        Current fulfilment status: <strong>{fulfillmentStatus}</strong>
      </p>

      {message ? (
        <p className="mt-3 text-sm" role="status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
