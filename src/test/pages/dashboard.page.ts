import { expect, Page } from '@playwright/test';
import { DashboardLocator } from '../locators/dashboard.locator';
import { pageFixture } from '../utiles/pageFixture';

export class DashboardPage {

    readonly page: Page;
    readonly dashboardLocator: DashboardLocator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardLocator = new DashboardLocator(page);
    }

    // Calcula el día actual (lunes, martes, etc)
    getCurrentDay(): string {
        const dias = [
            "domingo", "lunes", "martes", "miércoles",
            "jueves", "viernes", "sábado"
        ];

        const hoy = new Date();
        return dias[hoy.getDay()];
    }

    async clickOptionAssistants() {
        await this.dashboardLocator.optionAssistants.click();
    }

    async clickOptionDashboard(option: string) {
        await this.dashboardLocator.optionsDashboard.isVisible();
        switch (option) {
            case "Auxiliares":
                await this.dashboardLocator.optionAssistants.click();
                console.log("✅ Se hizo click en Auxiliares");
                //await this.validateStatusAPIAssistants();
                break;
            case "Personal Administrativo":
                await this.dashboardLocator.optionAdministrativeStaff.click();
                console.log("✅ Se hizo click en Personal Administrativo");
                break;
            case "Registros de Personal":
                await this.dashboardLocator.optionPersonalRecords.click();
                console.log("✅ Se hizo click en Registros de Personal");
                break;
            default:
                console.log(`❌ Opción no reconocida: ${option}`);
                break;
        }
    }

    async validateStatusAPIAssistants() {
        const response = await this.page.request.get("https://siasis-dev-ins2.vercel.app/auxiliares?_rsc=8e1aq");
        expect(response.status()).toBe(200);
        console.log("✅ La respuesta de la API es 200 OK");
    }

    async clickLogOut() {
        
        //await this.dashboardLocator.optionsDashboard.waitFor({ state: 'visible' });     // Asegurar que el dashboard cargó
        await this.dashboardLocator.iconDeploymentMenu.waitFor({ state: 'visible' }); // Asegurar que el ícono de despliegue esté visible
        await this.dashboardLocator.iconDeploymentMenu.click();                         // Abrir el menú
        await this.page.waitForSelector('#Menu-deplegable', { state: 'visible' });      // 🔥 Esperar a que el menú desplegable exista y sea visible
        await this.dashboardLocator.btnLogOut.click();                                  // Clic en "Cerrar Sesión"
        console.log("🔴 Sesión cerrada correctamente");
    }

    async clickEditProfile() {
        await this.dashboardLocator.iconDeploymentMenu.waitFor({ state: 'visible' }); // Asegurar que el ícono de despliegue esté visible
        await this.dashboardLocator.iconDeploymentMenu.click();                         // Abrir el menú
        await this.page.waitForSelector('#Menu-deplegable', { state: 'visible' });      // 🔥 Esperar a que el menú desplegable exista y sea visibl
        await this.dashboardLocator.btnEditProfile.click();                             // Clic en "Editar Perfil"
        console.log("✅ Se hizo click en Editar Perfil");
    }

    async validateModalNonWorkingDayIsVisible() {
        await this.dashboardLocator.modalNonWorkingDay.isVisible();
        const textModal = await this.dashboardLocator.modalNonWorkingDay.innerText();
        console.log("El texto del modal es:", textModal);
    }

    // Valida que el sistema muestre el día correcto
    async validateNonWorkingDayMessage(expectedDay: string) {
        const text = (await this.dashboardLocator.lblNonWorkingDay.textContent())?.toLowerCase() || "";
        expect(text).toContain(expectedDay.toLowerCase());
        console.log("✔ Se validó correctamente el día en pantalla", text);
    }

}