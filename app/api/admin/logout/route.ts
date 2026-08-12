import { NextResponse } from "next/server";

import { clearAdminCookie } from "@/lib/admin-auth";
import { env } from "@/lib/env";

export const runtime = "nodejs";

export async function POST() {
  await clearAdminCookie();
  return NextResponse.redirect(new URL("/admin", env.siteUrl), { status: 303 });
}
