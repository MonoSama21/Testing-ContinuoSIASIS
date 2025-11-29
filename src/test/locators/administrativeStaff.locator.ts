import { Page } from '@playwright/test'

export class AdministrativeStaffLocator {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    
    get optionsDashboard(){
        return this.page.locator('#sidebar');
    }

    get tarjetsAdministrativeStaff(){
        return this.page.locator('div[class*="w-[285px]"][class*="h-[355px]"]');
    }
    
    // Nombre y apellido (span font-semibold)
    get nameSpan() {
        return this.page.locator('span.font-semibold');
    }

    // Teléfono dentro del bloque de contacto
    get phoneSpan() {
        return this.page.locator('div.flex.items-center span[title]');
    }

    // Estado del personal administrativo
    get stateSpan() {
        return this.page.locator('span.text-verde-principal');
    }

    // Foto del personal administrativo
    get photoImg() {
        return this.page.locator('img.Foto-Perfil-Usuario');
    }
}