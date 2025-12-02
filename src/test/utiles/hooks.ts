import { Browser, BrowserContext, chromium } from "@playwright/test";
import { Before, After, BeforeAll, AfterAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
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
    width: 1500,
    height: 800,
  });
});

// CIERRA TODO EL ESCENARIO (PÁGINA + CONTEXT) Y TOMA SCREENSHOT SI FALLA
After(async function (scenario) {
  // Si el escenario falla, tomar captura de pantalla y adjuntarla al reporte
  if (scenario.result?.status === Status.FAILED && pageFixture.page) {
    const screenshot = await pageFixture.page.screenshot({
      fullPage: true,
      type: 'png'
    });
    this.attach(screenshot, 'image/png');
    console.log(`📸 Captura tomada para el escenario fallido: ${scenario.pickle.name}`);
  }

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
