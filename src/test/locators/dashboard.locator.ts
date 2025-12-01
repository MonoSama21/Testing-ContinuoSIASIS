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

    get optionAdministrativeStaff(){
        return this.page.getByRole('button', { name: 'Personal Administrativo' });
    }

    get optionPersonalRecords(){
        return this.page.getByRole('button', { name: 'Registros' }).first();
    }

    get iconDeploymentMenu() {
        return this.page.locator('#despliegue-icon');
    }

    get btnLogOut(){
        return this.page.getByText('Cerrar Sesión', { exact: true });
    }

    get btnEditProfile(){
        return this.page.getByText('Editar Perfil', { exact: true });
    }

    get modalNonWorkingDay(){
        return this.page.locator("#mensaje-informativo-asistencia");
    }

    get lblNonWorkingDay() {
        return this.page.locator('//p[@class="text-gray-800 font-medium leading-tight"]'); 
    }
}