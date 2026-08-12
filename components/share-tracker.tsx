"use client";

import { useEffect } from "react";

import { track } from "@/lib/analytics";

/**
 * Records that a shared link was opened.
 *
 * This is the only way to measure whether the growth loop actually fires. The
 * question it answers — do relatives who open a shared chart go on to buy? — is
 * a documented kill criterion, so the event needs to exist from day one rather
 * than being added once someone wonders.
 */
export function ShareTracker({ chartId }: { chartId: string }) {
  useEffect(() => {
    track("share_link_opened", { chartId });
  }, [chartId]);

  return null;
}
