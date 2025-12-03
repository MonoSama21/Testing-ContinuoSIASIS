import { Page } from '@playwright/test'

export class CommunicationsLocator {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    get btnRegisterCommunication(){
        return this.page.getByRole('button', { name: 'Registrar Comunicado' });
    }

    get inputStartDate(){
        return this.page.locator('input[type="date"]').first();
    }

    get inputConclusionDate(){
        return this.page.locator('input[type="date"]').nth(1);
    }

    get lblRegisterCommunicationTitle(){
        return this.page.locator("//h1[text()='REGISTRAR COMUNICADOS']");
    }

    get inputTitle(){
        return this.page.locator('input[type="text"]');
    }

    get textareaContent(){
        return this.page.locator('textarea');
    }

    get inputFileImg(){
        return this.page.locator('input[type="file"]');
    }

    // Vista Previa
    get previewTitle(){
        return this.page.locator('div.relative.bg-white h4.text-xl');
    }

    get previewContent(){
        return this.page.locator('div.text-sm.text-gray-700');
    }

    get vistaPreviewFechas(){
        return this.page.locator('div.border-t p.text-xs');
    }

    // Mensaje de éxito
    get successMessage(){
        return this.page.locator('div.bg-green-100.border-green-400');
    }

    // Búsqueda y Tabla
    get inputSearchTitle(){
        return this.page.locator('input[type="text"].border-2.border-red-600');
    }

    get tablaComunicados(){
        return this.page.locator('table tbody');
    }

    getStatementRowTitle(titulo: string){
        return this.page.locator(`tr:has-text("${titulo}")`);
    }

    getStatementStatusTitle(titulo: string){
        return this.page.locator(`tr:has-text("${titulo}") span.inline-flex`);
    }
}