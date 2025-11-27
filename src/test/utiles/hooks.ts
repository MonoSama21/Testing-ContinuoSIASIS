import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { Before, After } from '@cucumber/cucumber';
import { pageFixture } from "./pageFixture";

let browser: Browser
let context: BrowserContext
let page: Page

Before(async function () {
  
    browser = await chromium.launch({
        headless: false, //TRUE: EJECUTA LOS TEST CON EL NAVEGADOR  FALSE: EJECUTA LOS TEST SIN EL NAVEGADOR 
        channel: 'msedge' //SE ESPECIFICA EL NAVEGADOR 
    }); 

    context = await browser.newContext()
    page = await context.newPage()
    pageFixture.page = await page; 
    page.setViewportSize({
        width: 1500, //ANCHO DE LA PÁGINA
        height: 700, //LARGO LA PÁGINA 
    }); 

})

After(async function ({pickle}) {
    const img = await pageFixture.page.screenshot({path: `screenshots/${pickle.name}.png`});
    await this.attach(img, 'image/png');
    //await pageFixture.page.close();
})