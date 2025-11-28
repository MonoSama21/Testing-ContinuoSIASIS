import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { pageFixture } from "./pageFixture";

let browser: Browser;
let context: BrowserContext;

// Set the default timeout for all hooks and steps to 30 seconds.
setDefaultTimeout(30 * 1000);

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: true, //TRUE: EJECUTA LOS TEST CON EL NAVEGADOR  FALSE: EJECUTA LOS TEST SIN EL NAVEGADOR 
    channel: 'msedge' //SE ESPECIFICA EL NAVEGADOR 
  });
});

Before(async function () {
    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page; 
    await page.setViewportSize({
        width: 1500, //ANCHO DE LA PÁGINA
        height: 700, //LARGO LA PÁGINA 
    }); 
});

After(async function ({pickle}) {
    await pageFixture.page.close();
})