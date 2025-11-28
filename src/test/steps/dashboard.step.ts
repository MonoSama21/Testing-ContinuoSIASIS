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
    // Seleccionamos todas las tarjetas
    const tarjetas = pageFixture.page.locator('div[class*="w-[285px]"][class*="h-[355px]"]');
    const totalTarjetas = await tarjetas.count();

    expect(totalTarjetas).toBeGreaterThan(0);
    console.log("Tarjetas encontradas:", totalTarjetas);

    for (let i = 0; i < totalTarjetas; i++) {

        const tarjeta = tarjetas.nth(i);

        // Selecciona SOLO el nombre del auxiliar (único span con font-semibold dentro)
        const nombreSpan = tarjeta.locator('span.font-semibold').first();

        const nombre = await nombreSpan.textContent();

        console.log(`Nombre encontrado en tarjeta ${i + 1}: ${nombre}`);

        expect(nombre?.trim().length).toBeGreaterThan(0);
    }
});

Then('se muestra el numero de contacto del axuliar', async function () {
// Seleccionamos todas las tarjetas
const tarjetas = pageFixture.page.locator('div[class*="w-[285px]"][class*="h-[355px]"]');
const totalTarjetas = await tarjetas.count();

expect(totalTarjetas).toBeGreaterThan(0);
console.log("Tarjetas encontradas:", totalTarjetas);

for (let i = 0; i < totalTarjetas; i++) {

    const tarjeta = tarjetas.nth(i);

    // ================================
    // VALIDAR NÚMERO DE CONTACTO
    // ================================
    const telefonoSpan = tarjeta.locator('div.flex.items-center span[title]');

    await expect(telefonoSpan).toBeVisible({ timeout: 5000 });
    const telefono = await telefonoSpan.textContent();

    console.log(`Número de contacto encontrado en tarjeta ${i + 1}: ${telefono}`);

    // Validar que el número sea peruano: 9 dígitos iniciando en 9
    expect(telefono?.trim()).toMatch(/^9\d{8}$/);
}

});

Then('se muestra el estado del auxiliar', async function () {
    // Seleccionamos todas las tarjetas
const tarjetas = pageFixture.page.locator('div[class*="w-[285px]"][class*="h-[355px]"]');
const totalTarjetas = await tarjetas.count();

expect(totalTarjetas).toBeGreaterThan(0);
console.log("Tarjetas encontradas:", totalTarjetas);

for (let i = 0; i < totalTarjetas; i++) {

    const tarjeta = tarjetas.nth(i);

    // ================================
    // VALIDAR ESTADO DEL AUXILIAR
    // ================================
    const estadoSpan = tarjeta.locator('span.text-verde-principal');
    await expect(estadoSpan).toBeVisible({ timeout: 5000 });

    const estado = await estadoSpan.textContent();
    console.log(`Estado encontrado en tarjeta ${i + 1}: ${estado}`);

    // Validar que el estado sea "Activo" o "Inactivo"
    expect(estado?.trim()).toMatch(/Estado:\s*(Activo|Inactivo)/);
}

});

Then('se muestra el correo del auxiliar', async function () {
        // Seleccionamos todas las tarjetas
const tarjetas = pageFixture.page.locator('div[class*="w-[285px]"][class*="h-[355px]"]');
const totalTarjetas = await tarjetas.count();

expect(totalTarjetas).toBeGreaterThan(0);
console.log("Tarjetas encontradas:", totalTarjetas);

for (let i = 0; i < totalTarjetas; i++) {

    const tarjeta = tarjetas.nth(i);

    // ================================
    // VALIDAR CORREO DEL AUXILIAR
    // ================================
    const correoSpan = tarjeta.locator('span[title*="@"]');
    await expect(correoSpan).toBeVisible({ timeout: 5000 });

    const correo = await correoSpan.textContent();
    console.log(`Correo encontrado en tarjeta ${i + 1}: ${correo}`);
    expect(correo?.trim()).toMatch(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

}
});

Then('se muestra la foto de cada auxiliar', async function () {
        // Seleccionamos todas las tarjetas
const tarjetas = pageFixture.page.locator('div[class*="w-[285px]"][class*="h-[355px]"]');
const totalTarjetas = await tarjetas.count();

expect(totalTarjetas).toBeGreaterThan(0);
console.log("Tarjetas encontradas:", totalTarjetas);

for (let i = 0; i < totalTarjetas; i++) {

    const tarjeta = tarjetas.nth(i);

// ================================
// VALIDAR FOTO DEL AUXILIAR
// ================================
const foto = tarjeta.locator('img.Foto-Perfil-Usuario');
await expect(foto).toBeVisible({ timeout: 5000 });

const src = await foto.getAttribute('src');
console.log(`Foto encontrada en tarjeta ${i + 1}: ${src}`);

expect(src).toBeTruthy();

// Validar que sea foto real O foto por defecto
const esFotoReal = /^https?:\/\//.test(src || "");
const esFotoPorDefecto = src === "/images/svg/No-Foto-Perfil.svg";

// Al menos una debe cumplirse
expect(esFotoReal || esFotoPorDefecto).toBeTruthy();

}
});