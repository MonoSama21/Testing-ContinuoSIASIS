import { Browser, BrowserContext, chromium } from "@playwright/test";
import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { pageFixture } from "./pageFixture";

let browser: Browser;
let context: BrowserContext;

setDefaultTimeout(30 * 1000);

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: true, // IMPORTANTE para GitHub Actions
  });
});

Before(async function () {
  context = await browser.newContext();
  const page = await context.newPage();
  pageFixture.page = page;

  await page.setViewportSize({
    width: 1600,
    height: 800,
  });
});

// CIERRA TODO EL ESCENARIO (PÁGINA + CONTEXT)
After(async function () {
  if (pageFixture.page) {
    await pageFixture.page.close();
  }
  if (context) {
    await context.close();
  }
});

// CIERRA EL BROWSER AL FINAL
AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
});
