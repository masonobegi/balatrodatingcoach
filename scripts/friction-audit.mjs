/**
 * Counts what a customer actually faces in the builder.
 *
 * "Seven names" is the claim. This measures the real number of input boxes,
 * taps, and keystrokes required to reach a finished chart, because those are
 * what people quit over — not the number in the marketing copy.
 */

import { chromium } from "playwright";
import { existsSync, mkdirSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = process.argv[3] ?? "/tmp/friction";
mkdirSync(OUT, { recursive: true });

const CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const browser = await chromium.launch({
  executablePath: existsSync(CHROME) ? CHROME : undefined,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

for (const mode of ["desktop", "mobile"]) {
  const context = await browser.newContext({
    viewport: mode === "mobile" ? { width: 390, height: 844 } : { width: 1280, height: 1000 },
    deviceScaleFactor: mode === "mobile" ? 2 : 1,
    isMobile: mode === "mobile",
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/build`, { waitUntil: "networkidle" });

  const countInputs = async () =>
    page.locator('input[type="text"], input:not([type]), input[inputmode="numeric"]').count();

  const initial = await countInputs();
  console.log(`\n[${mode}] on arrival: ${initial} input boxes visible`);

  // Reveal to three generations — the default finished chart.
  let reveals = 0;
  for (let i = 0; i < 2; i++) {
    const btn = page.getByRole("button", { name: /^Add /i }).first();
    if ((await btn.count()) === 0) break;
    await btn.click();
    reveals++;
    await page.waitForTimeout(150);
  }

  const full = await countInputs();
  const namesNeeded = 7;
  console.log(`[${mode}] after ${reveals} taps (3 generations): ${full} input boxes`);
  console.log(`[${mode}] boxes per person: ${(full / namesNeeded).toFixed(1)}`);

  await page.screenshot({ path: `${OUT}/builder-3gen-${mode}.png`, fullPage: mode === "desktop" });
  await context.close();
}

await browser.close();
