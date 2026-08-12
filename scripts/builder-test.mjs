/**
 * Drives the builder in a real browser.
 *
 * The journey test covers HTTP; this covers the part that only exists once
 * React is running — live preview on keystroke, progressive generation
 * disclosure, autosave, and the client-side GEDCOM import.
 *
 *   node scripts/builder-test.mjs [baseUrl]
 */

import { chromium } from "playwright";
import { existsSync, writeFileSync, mkdirSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3000";
const CHROME = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

let passed = 0;
let failed = 0;
const failures = [];

function check(name, ok, detail = "") {
  if (ok) {
    passed++;
    console.log(`  ok   ${name}`);
  } else {
    failed++;
    failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
    console.log(`  FAIL ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

const GEDCOM = `0 HEAD
1 GEDC
2 VERS 5.5.1
0 @I1@ INDI
1 NAME Margaret Anne /Doyle/
1 BIRT
2 DATE 14 MAR 1952
1 FAMC @F1@
0 @I2@ INDI
1 NAME John Henry /Doyle/
1 BIRT
2 DATE ABT 1921
1 FAMC @F2@
0 @I3@ INDI
1 NAME Bridget /O'Connell/
1 BIRT
2 DATE 1923
0 @I4@ INDI
1 NAME Patrick /Doyle/
1 BIRT
2 DATE 1895
0 @I5@ INDI
1 NAME Nora /Fitzgerald/
1 BIRT
2 DATE 1898
0 @F1@ FAM
1 HUSB @I2@
1 WIFE @I3@
1 CHIL @I1@
0 @F2@ FAM
1 HUSB @I4@
1 WIFE @I5@
1 CHIL @I2@
0 TRLR
`;

const gedPath = join(tmpdir(), "kinline-test.ged");
writeFileSync(gedPath, GEDCOM);

const browser = await chromium.launch({
  executablePath: existsSync(CHROME) ? CHROME : undefined,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();

const consoleErrors = [];
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text());
});
page.on("pageerror", (e) => consoleErrors.push(String(e)));

console.log("\nBuilder — manual entry");

await page.goto(`${BASE}/build`, { waitUntil: "networkidle" });

const firstInput = page.getByPlaceholder("First name").first();
await firstInput.waitFor({ timeout: 10000 });
check("builder mounts with one generation visible", (await page.getByPlaceholder("First name").count()) === 1);

// Typing must update the SVG preview without a round trip.
const before = await page.locator(".chart-frame svg").innerHTML();
await firstInput.fill("Margaret");
await page.getByPlaceholder("Last name").first().fill("Doyle");
await page.waitForTimeout(350);
const after = await page.locator(".chart-frame svg").innerHTML();

check("preview re-renders as you type", before !== after);
check("the typed name appears in the artwork", after.includes("Margaret"));
check("progress counter updates", /1\s*names? so far|>1<\/strong>/.test(await page.locator("body").innerHTML()));

// Progressive disclosure.
await page.getByRole("button", { name: /Add their parents/i }).click();
await page.waitForTimeout(200);
check("revealing a generation adds two more slots", (await page.getByPlaceholder("First name").count()) === 3);

await page.getByPlaceholder("First name").nth(1).fill("John Henry");
await page.getByPlaceholder("Last name").nth(1).fill("Doyle");
await page.waitForTimeout(200);
check("second person renders too", (await page.locator(".chart-frame svg").innerHTML()).includes("John Henry"));

// Autosave, then the share link that the growth loop depends on.
await page.waitForTimeout(1800);
const shareInput = page.locator('input[aria-label="Shareable chart link"]');
const hasShare = (await shareInput.count()) > 0;
check("chart autosaves and offers a share link", hasShare);

if (hasShare) {
  const url = await shareInput.inputValue();
  check("share link points at /chart/{token}", /\/chart\/[A-Z0-9]{20}/.test(url), url);
}

// Style controls must reach the artwork.
console.log("\nStyle controls");
await page.getByRole("button", { name: "Tree", exact: true }).click();
await page.waitForTimeout(300);
const treeSvg = await page.locator(".chart-frame svg").innerHTML();
check("switching to the tree changes the layout", treeSvg.includes("<rect") && treeSvg !== after);

await page.getByRole("button", { name: "Fan", exact: true }).click();
await page.waitForTimeout(250);

await page.getByRole("button", { name: /Midnight/i }).click();
await page.waitForTimeout(250);
check(
  "theme change repaints the artwork",
  (await page.locator(".chart-frame svg").innerHTML()).includes("#151A22"),
);

// Checkout gate.
console.log("\nCheckout gate");
const cta = page.getByRole("link", { name: /Continue to checkout|Add a few more names/ });
check("CTA is present", (await cta.count()) > 0);

console.log("\nGEDCOM import");
await page.getByText(/Already have your tree in Ancestry/i).click();
await page.waitForTimeout(200);

await page.setInputFiles('input[type="file"]', gedPath);
await page.waitForTimeout(700);

const rootButtons = page.locator("button", { hasText: /Margaret Anne Doyle/ });
check("parsed file offers root candidates", (await rootButtons.count()) > 0);

if ((await rootButtons.count()) > 0) {
  await rootButtons.first().click();
  await page.waitForTimeout(500);
  const imported = await page.locator(".chart-frame svg").innerHTML();
  check("import fills the chart from the file", imported.includes("Bridget"));
  check("import reaches the grandparent generation", imported.includes("Fitzgerald"));
  check(
    "import titles the chart from the surname",
    (await page.locator('input[aria-label="Chart title"]').inputValue()).includes("Doyle"),
  );
}

console.log("\nConsole");
const ignorable = /favicon|404 \(Not Found\)/i;
const real = consoleErrors.filter((e) => !ignorable.test(e));
check("no unexpected console errors", real.length === 0, real.slice(0, 2).join(" | "));

await browser.close();

console.log(`\n${"─".repeat(60)}`);
console.log(`${passed} passed, ${failed} failed`);
if (failures.length > 0) {
  console.log("\nFailures:");
  for (const f of failures) console.log(`  · ${f}`);
}
process.exit(failed > 0 ? 1 : 0);
