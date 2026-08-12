import { NextResponse } from "next/server";

import { checkPassword, setAdminCookie } from "@/lib/admin-auth";
import { clientKey, rateLimit, tooManyRequests } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  // A single shared password is the only credential in the system, so this is
  // the one endpoint where brute force is worth taking seriously.
  const limit = rateLimit(clientKey(request, "admin-login"), 8, 10 * 60_000);
  if (!limit.ok) return tooManyRequests(limit.retryAfterSeconds);

  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ error: "That password was not right." }, { status: 401 });
  }

  await setAdminCookie();
  return NextResponse.json({ ok: true });
}
