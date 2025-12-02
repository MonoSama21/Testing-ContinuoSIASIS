import { Page } from '@playwright/test'

export class MyDataLocator {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    get btnEditDates(){
        return this.page.getByRole('button', { name: 'Editar Datos' });
    }

    get inputNames(){
        return this.page.locator('//input[@name="Nombres"]');
    }

    get lblNames(){
        return this.page.locator('//label[contains(.,"Nombres")]/div/span');
    }
    
    get inputLastNames(){
        return this.page.locator('//input[@name="Apellidos"]');
    }

    get lblLastNames(){ 
        return this.page.locator("//label[contains(.,'Apellidos')]/div/span")
    }

    get inputPhone(){
        return this.page.locator('//input[@name="Celular"]');
    }

    get lblPhone(){
        return this.page.locator("//label[contains(.,'Celular')]/div/span")
    }


    get inputDNI(){
        return this.page.locator('//input[@name="Identificador_Nacional"]');
    }

    get lblDNI(){
        return this.page.locator("//label[contains(.,'DNI')]/div/span")
    }
    
    get btnSaveChanges(){
        return this.page.getByRole('button', { name: 'Guardar Cambios' });
    }
    
    get modalSaveChanges(){
        return this.page
        .getByRole("alert")
        .locator('p:text("Datos actualizados correctamente")')
        .first();
    }

    get btnChangePhoto(){
        return this.page.locator('//button[@title="Guarda tu cambios"]').nth(1);
    }

    get modalPhotoNotAllowed(){
        return this.page.locator('//div[@role="alert"]');
    }

    get btnModalChangePhoto(){
        return this.page.locator('//button[@title="La imagen se esta subiendo"]');
    }

    get lblUserNamesAndLastNames(){
        return this.page.locator("//div[contains(@class,'text-center') and contains(@class,'text-[1rem]')]");    
    }

    

}