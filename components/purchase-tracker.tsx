"use client";

import { useEffect, useRef } from "react";

import { track } from "@/lib/analytics";

/**
 * Fires the purchase event once the customer lands back on the confirmation
 * page.
 *
 * Deduped in localStorage by order reference, because this page is refreshed,
 * bookmarked, and re-opened from the receipt email — and a purchase counted
 * three times makes conversion rate, revenue, and CAC all wrong at once.
 *
 * Server-side truth still lives in the orders table; this event exists so the
 * funnel has a terminal step that shares an identifier with the steps before it.
 */
export function PurchaseTracker({
  orderId,
  reference,
  value,
}: {
  orderId: string;
  reference: string;
  value: number;
}) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const key = `kin_purchase_${reference}`;
    try {
      if (window.localStorage.getItem(key)) return;
      window.localStorage.setItem(key, "1");
    } catch {
      // Storage blocked — better to risk a duplicate than to lose the event.
    }

    track("purchase", { orderId, value, props: { reference } });
  }, [orderId, reference, value]);

  return null;
}
