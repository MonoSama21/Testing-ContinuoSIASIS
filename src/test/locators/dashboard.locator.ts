import { Page } from '@playwright/test'

export class DashboardLocator {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    get optionsDashboard(){
        return this.page.locator('#sidebar');
    }

    get optionClassrooms(){
        return this.page.getByText('//li[@title="Aulas"]');
    }

    get optionAssistants(){
        return this.page.getByRole('button', { name: 'Auxiliares' });
    }
}