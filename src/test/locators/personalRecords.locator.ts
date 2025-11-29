import { Locator, Page } from '@playwright/test'

export class PersonalRecordsLocator {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    //LOCATORS PARA TIPO DE PERSONAL
    get selectTypePersonal(){
        return this.page.locator('//select').first();
    }

    getOptionTypePersonal(value: string) {
        return this.page.locator(`//option[@value='${value}']`);
    }

    //LOCATOS PARA SELECCIONAR USUARIO
    get dropdownPersonal() {
        return this.page.locator('#SIASIS-SDU_Seccion-Consulta-Registros-Mensuales-Personal-Eventos-Prioritarios');
    }

    // localiza todos los LI del menú
    get dropdownListItems() {
        return this.page.locator('//ul/li[contains(@class, "cursor-pointer")]');
    }

    // nombre dentro del LI
    getNameInside(li: Locator) {
        return li.locator('.font-medium');
    }


    //LOCATORS PARA MES A CONSUTLAR
    get selectMonth(){
        return this.page.locator('//select').nth(1);
    }

    // Opciones del SELECT (todas menos la primera "Seleccionar mes")
    getmonthOptions(value: string) {
        return this.page.locator(`//option[@value='${value}']`);
    }

    //LOCATOR BOTON BUSCAR
    get btnSearch(){
        return this.page.getByRole('button', { name: 'Buscar' });
    }
}