"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { track } from "@/lib/analytics";

function PageViews() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    // Admin traffic is our own and would distort every funnel number.
    if (pathname?.startsWith("/admin")) return;
    track("page_view");
  }, [pathname, search]);

  return null;
}

export function Analytics() {
  return (
    <Suspense fallback={null}>
      <PageViews />
    </Suspense>
  );
}
