import { expect, Page } from '@playwright/test';
import { DashboardLocator } from '../locators/dashboard.locator';

export class DashboardPage {

    readonly page: Page;
    readonly dashboardLocator: DashboardLocator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardLocator = new DashboardLocator(page);
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

}