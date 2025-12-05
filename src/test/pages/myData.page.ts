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

    //DATOS ORIGINALES PARA EL ROL AUXILIAR
    readonly ORIGINAL_PHONE_AUXILIAR = "950034094";
    readonly ORIGINAL_EMAIL_AUXILIAR = "Bicagonzales168@gmail.com";
    
    generatedName: string = "";
    generatedLastName: string = "";
    firstGeneratedName: string = "";
    firstGeneratedLastName: string = "";
    generatedNewPassword: string = "";



    constructor(page: Page) {
        this.page = page;
        this.myDatLocator = new MyDataLocator(page);
    }

    async clickBtnEditDates() {
        await this.myDatLocator.btnEditDates.click();
        console.log("✅ Se hizo click en Editar Datos");
    }

    async validateEditablePhone(){
        await this.myDatLocator.inputPhone.isVisible();
        console.log("✔ Se validó que el campo Celular es editable");
    }
    
    async validateEditableEmail(){
        await this.myDatLocator.iconPasswordChange.isVisible();
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

    async validateModalSaveChangesPhotoIsVisible(){  
        await this.myDatLocator.modalSaveChangesPhoto.isVisible();
        const texto = await this.myDatLocator.modalSaveChangesPhoto.textContent();
        if (texto == "Se actualizo correctamente la Foto") {
            console.log('El modal de foto actualizada correctamente se muestra correctamente.');
        } else {
            throw new Error('El texto del modal no es el esperado.');
        }
 
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

    async uploadingPhotoAllowed(){
        await this.page.setInputFiles('#foto', 'src/resources/fixtures/img/admitible2.jpg');
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

    async clickBtnModalChangePhoto(){
        await this.myDatLocator.btnModalChangePhoto.isEnabled();
        await this.myDatLocator.btnModalChangePhoto.click();
    }

    async clickBtnEnabledModalChangePhoto(){
        await this.myDatLocator.btnModalChangePhotoEnabled.isEnabled();
        await this.myDatLocator.btnModalChangePhotoEnabled.click();
    }

    async validatePersonalInformation(){
        await this.myDatLocator.inputDNI.isVisible();
        await this.myDatLocator.inputNames.isVisible();
        await this.myDatLocator.inputLastNames.isVisible();
        await this.myDatLocator.lblGender.isVisible();
        await this.myDatLocator.imgPhoto.isVisible();
        await this.myDatLocator.lblPhone.isVisible();
        console.log("✔ Se validó que los campos DNI, Nombres, Apellidos, Género, Foto, Celular, Correo Electrónico son visibles");
    }

    async validateContactInformation(){
        await this.myDatLocator.lblPhone.isVisible();
        await this.myDatLocator.lblEmail.isVisible();
        console.log("✔ Se validó que los campos Celular y Correo Electrónico son visibles");
    }

    async validateUserInformation(){
        await this.myDatLocator.lblUser.isVisible();
        console.log("✔ Se validó que el campo Nombre de Usuario es visible");
    }

    async validateEditablePhoneAndEmail(){
        await this.myDatLocator.inputPhone.isVisible();
        await this.myDatLocator.inputEmail.isVisible();
        console.log("✔ Se validó que los campos Celular y Correo Electrónico son editables");
    }

    async editDataPhoneAndEmail(){
        const randomPhone = faker.helpers.replaceSymbols("9########");
        const randomEmail = faker.internet.email();
        await this.myDatLocator.inputPhone.fill(randomPhone);
        await this.myDatLocator.inputEmail.fill(randomEmail);
        console.log("✅ Se editó el número de teléfono correctamente con:", randomPhone);
        console.log("✅ Se editó el correo electrónico correctamente con:", randomEmail);
    }

    async validateClassroomInformation(){
        await this.myDatLocator.lblClassroomAssigned.isVisible();
        const classroom = await this.myDatLocator.lblClassroomAssigned.textContent();
        expect(classroom?.trim()).not.toBe('');
        expect(classroom?.trim()).toBeTruthy();
        console.log("✔ Se validó que el campo Aula Asignada es visible y contiene:", classroom?.trim());
        
        await this.myDatLocator.lblGradeAssigned.isVisible();
        const grade = await this.myDatLocator.lblGradeAssigned.textContent();
        expect(grade?.trim()).not.toBe('');
        expect(grade?.trim()).toBeTruthy();
        console.log("✔ Se validó que el campo Grado Asignado es visible y contiene:", grade?.trim());
        
        await this.myDatLocator.lblSectionAssigned.isVisible();
        const section = await this.myDatLocator.lblSectionAssigned.textContent();
        expect(section?.trim()).not.toBe('');
        expect(section?.trim()).toBeTruthy();
        console.log("✔ Se validó que el campo Sección Asignada es visible y contiene:", section?.trim());
    }

    async clickIconChangePassword(){
        await this.myDatLocator.iconPasswordChange.click();
        console.log("✅ Se hizo click en el icono de cambio de contraseña");
    }

    async fillCurrentPassword(role: string){
        let currentPassword = '';
        switch (role) {
            case 'DIRECTIVO':
                currentPassword = process.env.DIRECTIVO_PASSWORD || '';
                break;
            case 'PROFESOR_PRIMARIA':
                currentPassword = process.env.PROFESOR_PRIMARIA_PASSWORD || '';
                break;
            case 'PROFESOR_SECUNDARIA':
                currentPassword = process.env.PROFESOR_SECUNDARIA_PASSWORD || '';
                break;
            case 'AUXILIAR':
                currentPassword = process.env.AUXILIAR_PASSWORD || '';
                break;
            case 'RESPONSABLE':
                currentPassword = process.env.RESPONSABLE_PASSWORD || '';
                break;
            case 'TUTOR':
                currentPassword = process.env.TUTOR_PASSWORD || '';
                break;
            case 'OTRO':
                currentPassword = process.env.OTRO_PASSWORD || '';
                break;
            default:
                console.log('Rol no reconocido');
                return;
        }

        await this.myDatLocator.inputCurrentPassword.fill(currentPassword);
        console.log("✅ Se ingresó la contraseña actual");
    }

    async fillNewPassword(){
        const randomNumber = faker.number.int({ min: 1, max: 9 });
        const restOfPassword = faker.string.alphanumeric(9);
        const newPassword = randomNumber + restOfPassword;
        
        this.generatedNewPassword = newPassword; // Guardar para restaurar después
        await this.myDatLocator.inputNewPassword.fill(newPassword);
        console.log("✅ Se ingresó la nueva contraseña:", newPassword);
        console.log("💾 Contraseña guardada para restauración posterior");
    };

    async clickBtnChangePassword(){
        await this.myDatLocator.btnChangePassword.click();
        console.log("✅ Se hizo click en el botón Cambiar Contraseña");
    }

    async validatePasswordChangeSuccess(){
        // Esperar a que aparezca el modal de éxito
        await this.myDatLocator.modalPasswordChangeSuccessText.waitFor({ state: 'visible', timeout: 10000 });
        
        // Validar que contiene el texto esperado
        await expect(this.myDatLocator.modalPasswordChangeSuccessText).toContainText('Se actualizo la contraseña correctamente');
        
        console.log("✅ Modal de éxito validado: Contraseña actualizada correctamente");
    }

    async restoreOriginalPassword(role: string){
        // Hacer click en el icono de cambio de contraseña nuevamente
        await this.clickIconChangePassword();
        
        // Usar la contraseña generada como contraseña actual
        await this.myDatLocator.inputCurrentPassword.fill(this.generatedNewPassword);
        console.log("🔑 Contraseña actual (generada previamente):", this.generatedNewPassword);
        
        // Restaurar a la contraseña original del usuario
        let originalPassword = '';
        switch (role) {
            case 'DIRECTIVO':
                originalPassword = process.env.DIRECTIVO_PASSWORD || '';
                break;
            case 'PROFESOR_PRIMARIA':
                originalPassword = process.env.PROFESOR_PRIMARIA_PASSWORD || '';
                break;
            case 'PROFESOR_SECUNDARIA':
                originalPassword = process.env.PROFESOR_SECUNDARIA_PASSWORD || '';
                break;
            case 'AUXILIAR':
                originalPassword = process.env.AUXILIAR_PASSWORD || '';
                break;
            case 'RESPONSABLE':
                originalPassword = process.env.RESPONSABLE_PASSWORD || '';
                break;
            case 'TUTOR':
                originalPassword = process.env.TUTOR_PASSWORD || '';
                break;
            case 'OTRO':
                originalPassword = process.env.OTRO_PASSWORD || '';
                break;
            default:
                console.log('Rol no reconocido');
                return;
        }
        await this.myDatLocator.inputNewPassword.fill(originalPassword);
        console.log("🔑 Nueva contraseña (original):", originalPassword);
        
        // Hacer click en cambiar contraseña
        await this.clickBtnChangePassword();
        
        await this.page.waitForTimeout(6000);
        // Validar que se cambió correctamente
        await this.validatePasswordChangeSuccess();
        
        console.log("✅ Contraseña restaurada a la original correctamente");
    }


}
