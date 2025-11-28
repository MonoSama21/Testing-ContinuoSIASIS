import { expect } from '@playwright/test';
import { Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { DashboardPage } from '../pages/dashboard.page';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'playwright.env' });

let dashboardPage: DashboardPage;


When('hago click en el apartado de {string}', async function (option) {
    dashboardPage = new DashboardPage(pageFixture.page);
    await dashboardPage.clickOptionDashboard(option);
    const resp = await pageFixture.page.request.get("https://siasis-dev-ins2.vercel.app/auxiliares?_rsc=8e1aq");
    expect(resp.status()).toBe(200);
    console.log("✅ La respuesta de la API es 200 OK");
});

Then('se muestra en pantalla la lista de auxiliares disponibles', async function () {
    await pageFixture.page.waitForSelector('div[class*="w-[285px]"][class*="h-[355px]"]');
    const tarjetas = await pageFixture.page.locator('div[class*="w-[285px]"][class*="h-[355px]"]').all();
    const cantidad = tarjetas.length;
    console.log("Cantidad de auxiliares mostrados:", cantidad);
    expect(cantidad).toBeGreaterThan(0);
});

Then('se muestra los nombres y apellidos del auxiliar', async function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
});

Then('se muestra el numero de contacto del axuliar', async function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
});

Then('se muestra el estado del auxiliar \\(activo\\/inactivo)', async function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
});

Then('se muestra el correo del auxiliar', async function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
});

Then('se muestra la foto de cada auxiliar', async function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
});