import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const rootDir = new URL("..", import.meta.url).pathname;
const outDir = join(rootDir, "docs/review-screenshots");
const reportPath = join(rootDir, "docs/design-review-report.md");

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 800 },
];

const ROUTES = {
  home: {
    path: "/",
    slug: "home",
    sections: [
      { slug: "hero", selector: "#home" },
      { slug: "strip", selector: '[data-testid="services-strip"]' },
      { slug: "about", selector: "#about" },
      { slug: "services", selector: "#services" },
      { slug: "industries", selector: "#industries" },
      { slug: "why-us", selector: "#why-us" },
      { slug: "cta", selector: '[data-testid="cta-banner"]' },
      { slug: "contact", selector: "#contact" },
      { slug: "footer", selector: '[data-testid="footer"]' },
    ],
  },
  careers: {
    path: "/careers",
    slug: "careers",
    sections: [
      { slug: "hero", selector: '[data-testid="careers-hero"]' },
      { slug: "image", selector: '[data-testid="careers-image"]' },
      { slug: "perks", selector: '[data-testid="careers-perks"]' },
      { slug: "requirements", selector: '[data-testid="careers-requirements"]' },
      { slug: "apply", selector: "#apply" },
      { slug: "footer", selector: '[data-testid="footer"]' },
    ],
  },
};

const issues = [];
const screenshots = [];

function track(page, label) {
  page.on("console", (msg) => {
    if (msg.type() === "error" && !msg.text().includes("favicon")) {
      issues.push(`[${label}] [console] ${msg.text().slice(0, 300)}`);
    }
  });
  page.on("pageerror", (err) => issues.push(`[${label}] [pageerror] ${err.message.slice(0, 300)}`));
}

async function scrollAndSettle(page) {
  await page.evaluate(async () => {
    const step = Math.max(window.innerHeight * 0.75, 400);
    let y = 0;
    const max = document.body.scrollHeight;
    while (y < max) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
      y += step;
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForFunction(() => window.scrollY <= 1, null, { timeout: 5000 });
  await page.waitForTimeout(300);
}

async function runAuditOnPage(page) {
  return page.evaluate(() => {
    const problems = [];
    if (!document.querySelector("h1")) problems.push("missing h1");

    if (document.documentElement.scrollWidth > window.innerWidth + 4) {
      problems.push(`horizontal overflow (${document.documentElement.scrollWidth}px)`);
    }

    const header = document.querySelector("header");
    const h1 = document.querySelector("main h1");
    if (header && h1) {
      const hr = header.getBoundingClientRect();
      const h1r = h1.getBoundingClientRect();
      if (h1r.top < hr.bottom - 4) problems.push("h1 under fixed header");
    }

    const touchTargets = [...document.querySelectorAll("button, a")].filter((el) => {
      if (el.closest('[aria-hidden="true"]')) return false;
      if (el.classList.contains("nav-link") || el.classList.contains("skip-link")) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44);
    });
    if (touchTargets.length > 6) {
      problems.push(`${touchTargets.length} touch targets under 44px`);
    }

    const brokenImages = [...document.querySelectorAll("img")].filter(
      (img) => img.getBoundingClientRect().width > 0 && img.naturalWidth === 0
    );
    if (brokenImages.length) problems.push(`${brokenImages.length} broken images`);

    return {
      problems,
      lang: document.documentElement.lang,
      title: document.title,
    };
  });
}

async function setLanguage(page, lang) {
  const btn = page.getByRole("button", { name: lang === "en" ? "EN" : "ES", exact: true });
  await btn.first().click();
  await page.waitForTimeout(500);
}

async function captureScrollSlices(page, routeDir, prefix) {
  const steps = await page.evaluate(async () => {
    const vh = window.innerHeight;
    const step = Math.floor(vh * 0.85);
    const max = document.body.scrollHeight;
    const positions = [];
    for (let y = 0; y < max; y += step) positions.push(y);
    if (positions[positions.length - 1] !== max - vh) positions.push(Math.max(0, max - vh));
    return positions;
  });

  let i = 0;
  for (const y of steps) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(200);
    const file = join(routeDir, "scroll", `${prefix}-slice-${String(i).padStart(2, "0")}.png`);
    await page.screenshot({ path: file, fullPage: false });
    screenshots.push(file);
    i += 1;
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

async function reviewRoute(browser, route, viewport, lang) {
  const { path, slug, sections } = route;
  const label = `${slug}-${viewport.name}-${lang}`;
  const routeDir = join(outDir, slug, viewport.name, lang);

  await mkdir(join(routeDir, "full"), { recursive: true });
  await mkdir(join(routeDir, "sections"), { recursive: true });
  await mkdir(join(routeDir, "scroll"), { recursive: true });

  const page = await browser.newPage({
    viewport: { width: viewport.width, height: viewport.height },
  });
  track(page, label);

  await page.goto(`${base}${path}`, { waitUntil: "networkidle", timeout: 45000 });

  if (lang === "en") {
    await setLanguage(page, "en");
  }

  await scrollAndSettle(page);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForFunction(() => window.scrollY <= 1, null, { timeout: 5000 });

  const audit = await runAuditOnPage(page);
  if (audit.problems.length) {
    issues.push(`${label}: ${audit.problems.join("; ")} (page lang=${audit.lang})`);
  }

  const fullFile = join(routeDir, "full", `${label}-full.png`);
  await page.screenshot({ path: fullFile, fullPage: true });
  screenshots.push(fullFile);

  for (const { slug: sectionSlug, selector } of sections) {
    const locator = page.locator(selector).first();
    if ((await locator.count()) === 0) {
      issues.push(`${label}: missing section ${selector}`);
      continue;
    }
    await locator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    const sectionFile = join(routeDir, "sections", `${label}-${sectionSlug}.png`);
    await locator.screenshot({ path: sectionFile });
    screenshots.push(sectionFile);
  }

  if (viewport.name === "mobile") {
    await captureScrollSlices(page, routeDir, label);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.close();
}

await mkdir(outDir, { recursive: true });
await mkdir(join(rootDir, "docs"), { recursive: true });

const browser = await chromium.launch({ headless: true });

for (const lang of ["es", "en"]) {
  for (const viewport of VIEWPORTS) {
    await reviewRoute(browser, ROUTES.home, viewport, lang);
    await reviewRoute(browser, ROUTES.careers, viewport, lang);
  }
}

await browser.close();

const timestamp = new Date().toISOString();
const report = `# Design review report

Generated: ${timestamp}
Base URL: ${base}

## Summary

${issues.length ? `**${issues.length} issue(s) found:**\n\n${issues.map((i) => `- ${i}`).join("\n")}` : "**No automated issues** (overflow, console, touch targets, broken images)."}

## Captures

Total screenshots: ${screenshots.length}

| Route | Viewport | Lang | Paths |
|-------|----------|------|-------|
| home | mobile/desktop | es/en | \`docs/review-screenshots/home/{viewport}/{lang}/{full,sections,scroll}/\` |
| careers | mobile/desktop | es/en | \`docs/review-screenshots/careers/{viewport}/{lang}/...\` |

Run again: \`npm run design:review\`

## Screenshot index (sample)

${screenshots.slice(0, 20).map((p) => `- ${p.replace(rootDir, "")}`).join("\n")}
${screenshots.length > 20 ? `\n... and ${screenshots.length - 20} more` : ""}
`;

await writeFile(reportPath, report, "utf8");

console.log("--- Design review ---");
console.log(issues.length ? issues.join("\n") : "No automated issues.");
console.log(`Report: ${reportPath}`);
console.log(`Screenshots: ${outDir}/ (${screenshots.length} files)`);
