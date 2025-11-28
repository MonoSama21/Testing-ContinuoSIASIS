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
                break;
            default:
                break;
        }
    }

}