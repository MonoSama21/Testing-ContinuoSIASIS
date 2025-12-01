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
});


When('realizo el cierre de sesion', async function () {
    dashboardPage = new DashboardPage(pageFixture.page);
    await dashboardPage.clickLogOut();
});

When('en la barra de navegacion selecciono el apartado de Editar Perfil', async function () {
    dashboardPage = new DashboardPage(pageFixture.page);
    await dashboardPage.clickEditProfile();
});

When('estoy en un día no laborable', async function () {
    dashboardPage = new DashboardPage(pageFixture.page);
    const diaActual = dashboardPage.getCurrentDay();
    // Guardar el valor en el contexto de Cucumber
    this.context = { diaActual };
    console.log("📌 Día no laborable detectado:", diaActual);
});


Then('aparece un modal indicando que no se puede registrar la asistencia', async function () {
    dashboardPage = new DashboardPage(pageFixture.page);
    await dashboardPage.validateModalNonWorkingDayIsVisible();
});


Then('aparece un texto que indica el dia no laboral en el que estamos', async function () {
    const { diaActual } = this.context;
    dashboardPage = new DashboardPage(pageFixture.page);
    await dashboardPage.validateNonWorkingDayMessage(diaActual);
    console.log("✅ Validado correctamente el día en pantalla:", diaActual);
});