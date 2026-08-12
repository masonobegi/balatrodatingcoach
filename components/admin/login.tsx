"use client";

import { useState } from "react";

import { capabilities } from "@/lib/env";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.reload();
      return;
    }
    const json = (await res.json().catch(() => ({}))) as { error?: string };
    setError(json.error ?? "That password was not right.");
    setBusy(false);
  };

  return (
    <div className="mx-auto max-w-sm px-5 py-24">
      <h1 className="text-3xl">Dashboard</h1>

      {!capabilities.admin ? (
        <p className="mt-6 rounded-sm border border-danger/40 bg-danger/5 p-4 text-sm">
          No <code>ADMIN_PASSWORD</code> is set, so there is nothing to sign in with. Set
          it in your environment and restart.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="password" className="label mb-1.5 block">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error ? (
            <p role="alert" className="text-sm text-danger">
              {error}
            </p>
          ) : null}
          <button type="submit" className="btn btn-primary w-full" disabled={busy}>
            {busy ? "Checking…" : "Sign in"}
          </button>
        </form>
      )}
    </div>
  );
}
