/**
 * Screenshots pages from the running dev server.
 * Development aid only.
 *
 *   node scripts/shoot.mjs <outDir> <path> [path...]
 */

import { chromium } from "playwright";
import { mkdirSync, existsSync } from "node:fs";

const [outDir, ...paths] = process.argv.slice(2);
if (!outDir || paths.length === 0) {
  console.error("usage: node scripts/shoot.mjs <outDir> <path> [path...]");
  process.exit(1);
}
mkdirSync(outDir, { recursive: true });

const base = process.env.BASE_URL ?? "http://localhost:3000";

// The preinstalled Chromium may not match the build this Playwright expects,
// so point at it directly rather than downloading a second copy.
const CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const browser = await chromium.launch({
  executablePath: existsSync(CHROME) ? CHROME : undefined,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

for (const spec of paths) {
  // "path@mobile" renders at a phone viewport.
  const [path, mode = "desktop"] = spec.split("@");
  const viewport =
    mode === "mobile" ? { width: 390, height: 844 } : { width: 1280, height: 900 };

  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: mode === "mobile" ? 2 : 1,
    isMobile: mode === "mobile",
  });
  const page = await context.newPage();

  const errors = [];
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  page.on("pageerror", (e) => errors.push(String(e)));

  const res = await page.goto(`${base}${path}`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(400);

  const name = `${(path === "/" ? "home" : path.replace(/\W+/g, "-").replace(/^-|-$/g, "")) || "root"}-${mode}`;
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: mode !== "mobile" });

  console.log(
    `${name}  HTTP ${res?.status()}  ${errors.length ? `CONSOLE ERRORS: ${errors.slice(0, 3).join(" | ")}` : "clean"}`,
  );
  await context.close();
}

await browser.close();
