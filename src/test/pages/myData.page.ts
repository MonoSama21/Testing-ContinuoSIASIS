import { expect, Page } from '@playwright/test';
import { MyDataLocator } from '../locators/myData.locator';
import { pageFixture } from '../utiles/pageFixture';
import { faker } from '@faker-js/faker';

export class MyDataPage {

    readonly page: Page;
    readonly myDatLocator: MyDataLocator;

    // DATOS ORIGINALES PARA EL ROL DIRECTIVO
    readonly ORIGINAL_NAME_DIRECTIVO     = "Elena Serafina";
    readonly ORIGINAL_LASTNAME_DIRECTIVO = "Cullanco Espilco";
    readonly ORIGINAL_PHONE_DIRECTIVO    = "989729659";
    readonly ORIGINAL_GENDER_DIRECTIVO   = "Femenino";
    readonly ORIGINAL_DNI_DIRECTIVO      = "15430124";

    //DATOS ORIGINALES PARA EL ROL PROFESOR_PRIMARIA
    readonly ORIGINAL_PHONE_PROFESOR_PRIMARIA = "946879371";
    readonly ORIGINAL_EMAIL_PROFESOR_PRIMARIA = "Profesora_mary@hotmail.com";
    
    generatedName: string = "";
    generatedLastName: string = "";
    firstGeneratedName: string = "";
    firstGeneratedLastName: string = "";



    constructor(page: Page) {
        this.page = page;
        this.myDatLocator = new MyDataLocator(page);
    }

    async clickBtnEditDates() {
        await this.myDatLocator.btnEditDates.click();
        console.log("✅ Se hizo click en Editar Datos");
    }
    
    async editDataName() {
        const fullName = faker.person.firstName() + " " + faker.person.middleName();
        this.generatedName = fullName;
        this.firstGeneratedName = fullName.split(" ")[0]; // primer nombre

        await this.myDatLocator.inputNames.fill(fullName);
        console.log("✅ Nombre generado:", fullName);
        console.log("➡ Primer nombre:", this.firstGeneratedName);
    }

    async editDataLastName() {
        const fullLastName = faker.person.lastName() + " " + faker.person.lastName();
        this.generatedLastName = fullLastName;
        this.firstGeneratedLastName = fullLastName.split(" ")[0]; // primer apellido

        await this.myDatLocator.inputLastNames.fill(fullLastName);
        console.log("✅ Apellidos generados:", fullLastName);
        console.log("➡ Primer apellido:", this.firstGeneratedLastName);
    }

    async editDataPhone(){
        const randomPhone = faker.helpers.replaceSymbols("9########");
        await this.myDatLocator.inputPhone.fill(randomPhone);
        console.log("✅ Se editó el número de teléfono correctamente con:", randomPhone);
    }

    async editDataDNI(){
        const dni = faker.string.numeric(8);
        await this.myDatLocator.inputDNI.fill(dni);
        console.log("✅ Se editó el número de DNI correctamente con:", dni);
    }

    async clickBtnSaveChanges(){
        await this.myDatLocator.btnSaveChanges.click();
        console.log("✅ Se hizo click en Guardar Cambios");
    }


    async editDataInformationPersonal(){
        await this.editDataName();
        await this.editDataLastName();
        await this.editDataPhone();
        await this.editDataDNI();
    }

    async validateModalSaveChangesIsVisible(){  
        await this.myDatLocator.modalSaveChanges.isVisible();
        const texto = await this.myDatLocator.modalSaveChanges.textContent();
        if (texto === 'Datos actualizados correctamente') {
            console.log('El modal de datos actualizados correctamente se muestra correctamente.');
        } else {
            throw new Error('El texto del modal no es el esperado.');
        }
        // Obtener texto del lbl del usuario
        const lblUser = await this.myDatLocator.lblUserNamesAndLastNames.textContent();
        const lblFormatted = lblUser?.trim();

        console.log("📌 Texto mostrado en el perfil:", lblFormatted);
        console.log("📌 Valores generados:", this.generatedName, this.generatedLastName);

        // Validación
        expect(lblFormatted).toContain(this.generatedName);
        expect(lblFormatted).toContain(this.generatedLastName);

        console.log("✔ Se validó que el nombre y apellido actualizados aparecen correctamente en el perfil.");
    }

    async validateHeaderUserName() {
        const headerText = await this.myDatLocator.lblHeaderUser.textContent();
        const headerFormatted = headerText?.replace(/\s+/g, ' ').trim();

        console.log("📌 Texto del header:", headerFormatted);
        console.log("📌 Debe mostrar:", this.firstGeneratedName, this.firstGeneratedLastName);

        await expect(this.myDatLocator.lblHeaderUser).toContainText(this.firstGeneratedName);
        await expect(this.myDatLocator.lblHeaderUser).toContainText(this.firstGeneratedLastName);

        console.log("✔ El header muestra correctamente el primer nombre y primer apellido.");
    }

    

    async restoreOriginalDataExecutive(){
        try {
            await this.clickBtnEditDates();
            await this.myDatLocator.inputNames.fill(this.ORIGINAL_NAME_DIRECTIVO);
            await this.myDatLocator.inputLastNames.fill(this.ORIGINAL_LASTNAME_DIRECTIVO);
            await this.myDatLocator.inputPhone.fill(this.ORIGINAL_PHONE_DIRECTIVO);
            await this.myDatLocator.inputDNI.fill(this.ORIGINAL_DNI_DIRECTIVO);
            await this.clickBtnSaveChanges();
            await expect(this.myDatLocator.inputNames).not.toBeVisible();
            await this.validateModalSaveChangesIsVisible();

        } catch (error) {
            throw new Error(`Error al restaurar los datos originales: ${error}`);
        }
    }

    async validateRestoreOriginalDataExecutive(){
        try{
            await expect(this.myDatLocator.lblNames).toHaveText(this.ORIGINAL_NAME_DIRECTIVO);
            await expect(this.myDatLocator.lblLastNames).toHaveText(this.ORIGINAL_LASTNAME_DIRECTIVO);
            await expect(this.myDatLocator.lblPhone).toHaveText(this.ORIGINAL_PHONE_DIRECTIVO);
            await expect(this.myDatLocator.lblDNI).toHaveText(this.ORIGINAL_DNI_DIRECTIVO);
            console.log("✔ Se validó correctamente los datos originales");
        } catch (error){
            throw new Error(`Error al validar los datos originales: ${error}`);
        }
    }

    async clickBtnChangePhoto(){
        await this.myDatLocator.btnChangePhoto.click();
    }

    async uploadingPhotoNotAllowed(){
        await this.page.setInputFiles('#foto', 'src/resources/fixtures/img/pesado.jpg');
    }

    async validateModalPhotoNotAllowedIsVisible(){
        const locator = this.myDatLocator.modalPhotoNotAllowed;

        await expect(locator).toBeVisible();
        await expect(locator).toContainText("La imagen no debe superar los 5MB");
        
        console.log("✔ El modal muestra correctamente el mensaje de límite de 5MB");
    }

    async validateDisabledBtnChangePhoto(){
        await expect(this.myDatLocator.btnModalChangePhoto).toBeDisabled();
        console.log("El boton de Cambiar Foto dentro del modal está deshabilitado")
    }


};