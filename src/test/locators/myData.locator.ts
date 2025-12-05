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

    get lblGender(){
        return this.page.locator("//label[contains(.,'Género')]/div/span")
    }

    get imgPhoto(){
        return this.page.locator('//img[@alt="Foto Perfil"]').nth(1);
    }

    get inputPhone(){
        return this.page.locator('//input[@name="Celular"]');
    }

    get inputEmail(){  
        return this.page.locator('//input[@name="Correo_Electronico"]');
    }

    get lblPhone(){
        return this.page.locator("//label[contains(.,'Celular')]/div/span")
    }

    get lblEmail(){
        return this.page.locator("//label[contains(.,'Correo Electronico')]/div/span")
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

    get modalSaveChangesPhoto(){
        return this.page
        .getByRole("alert")
        .locator('p:text("Se actualizo correctamente la Foto")')
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

    get btnModalChangePhotoEnabled(){
        return this.page.getByRole('dialog').getByRole('button', { name: 'Cambiar Foto' })
    }

    get lblUserNamesAndLastNames(){
        return this.page.locator("//div[contains(@class,'text-center') and contains(@class,'text-[1rem]')]");    
    }

    get lblHeaderUser(){
        return this.page.locator("header h1.text-blanco");
    }

    get lblUser(){
        return this.page.locator("//label[contains(.,'Nombre de Usuario')]/div/span");
    }

    get lblClassroomAssigned(){
        return this.page.locator("//label[contains(.,'Nivel')]/div/span");
    }

    get lblGradeAssigned(){
        return this.page.locator("//label[contains(.,'Grado')]/div/span");
    }

    get lblSectionAssigned(){
        return this.page.locator("//label[contains(.,'Sección')]/div/span");
    }

    get iconPasswordChange(){
        return this.page.locator('.cursor-pointer.flex').first()
    }

    get inputCurrentPassword(){
        return this.page.locator('#contraseñaActual');
    }

    get inputNewPassword(){
        return this.page.locator('#nuevaContraseña');
    }

    get btnChangePassword(){
        return this.page.getByRole('button', { name: 'Cambiar Contraseña' });
    }

    get modalPasswordChangeSuccess(){
        return this.page.locator('div.bg-verde-principal:has(svg path[d*="M5 13l4 4L19 7"])');
    }

    get modalPasswordChangeSuccessText(){
        return this.page.locator('p:has-text("Se actualizo la contraseña correctamente")');
    }
}