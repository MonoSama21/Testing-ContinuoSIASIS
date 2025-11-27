import { Page } from '@playwright/test'

export class LoginLocator {
    readonly page: Page;


    constructor(page: Page) {
        this.page = page;
    }

    get optionExecutive(){
        return this.page.getByText('Directivo');
    }
    
    get optionTeacherPrimary(){
        return this.page.getByText('Profesor (Primaria)');
    }

    get optionAssistant(){
        return this.page.getByText('Auxiliar');
    }

    get optionSecondarySchoolTutorTeacher(){
        return this.page.getByText('Profesor/Tutor (Secundaria)');
    }

    get optionResponsible(){
        return this.page.getByText('Responsable (Padre/Apoderado)');
    }

    get optionOther(){
        return this.page.getByText('Otro');
    }

    get inputUsername(){
        return this.page.locator('//input[@name="Nombre_Usuario"]');
    }

    get inputPassword(){
        return this.page.locator('//input[@name="Contraseña"]');
    }

    get btnLogin(){
        return this.page.getByRole('button', { name: 'Ingresar' });
    }

    get imgSchoolLogin(){
        return this.page.locator('//img[@alt="Colegio Asuncion 8 Logo"]');
    }

}