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




When('pongo mi dispositivo como un celular', async function () {
    // Configurar viewport de móvil
    await pageFixture.page.setViewportSize({
        width: 430,
        height: 800
    });
    
    // Inyectar JavaScript para modificar las propiedades de detección móvil
    await pageFixture.page.addInitScript(() => {
        // Modificar navigator para simular móvil
        Object.defineProperty(navigator, 'userAgent', {
            get: () => 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
        });
        
        Object.defineProperty(navigator, 'platform', {
            get: () => 'iPhone'
        });
        
        Object.defineProperty(navigator, 'maxTouchPoints', {
            get: () => 5
        });
        
        // Simular que hay soporte táctil
        (window as any).ontouchstart = () => {};
    });
    
    // Configurar User Agent en headers HTTP también
    await pageFixture.page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
    });
    
    // Recargar la página para aplicar todos los cambios
    await pageFixture.page.reload();
    
    console.log("📱 Viewport: 430x800");
    console.log("📱 User Agent: iPhone");
    console.log("📱 Touch support: Habilitado");
    console.log("📱 Navigator properties: Modificadas");
});


When('doy click en el boton de Registrar Asistencia', async function () {
    console.log("🔘 Intentando registrar asistencia...");
});
