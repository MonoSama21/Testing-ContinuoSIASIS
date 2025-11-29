import { expect, Page } from '@playwright/test';
import { AdministrativeStaffLocator } from '../locators/administrativeStaff.locator';

export class AdministrativeStaffPage {

    readonly page: Page;
    readonly administrativeStaffLocator: AdministrativeStaffLocator;

    constructor(page: Page) {
        this.page = page;
        this.administrativeStaffLocator = new AdministrativeStaffLocator(page);
    }

    async validateQuantityAdministrativeStaff() {
        await this.administrativeStaffLocator.tarjetsAdministrativeStaff.first().waitFor({ state: 'visible' });         // Esperamos a que aparezca al menos una tarjeta
        const tarjetas = await this.administrativeStaffLocator.tarjetsAdministrativeStaff.all();         // Obtenemos todas las tarjetas
        const cantidad = tarjetas.length;
        console.log("Cantidad de personal administrativos mostrados:", cantidad);
        expect(cantidad).toBeGreaterThan(0);    
    }    
}