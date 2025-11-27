import { expect, Page } from '@playwright/test';
import { LoginLocator } from '../locators/login.locator';

export class LoginPage {

    readonly page: Page;
    readonly loginLocator: LoginLocator;

    constructor(page: Page) {
        this.page = page;
        this.loginLocator = new LoginLocator(page);
    }

    async navigateToUrl(url: string) {
        await this.page.goto(url);
    }

    async fillUsername(username: string) {
        await this.loginLocator.inputUsername.fill(username);
    }

    async fillPassword(password: string) {
        await this.loginLocator.inputPassword.fill(password);
    }

    async clickLoginButton() {
        await this.loginLocator.btnLogin.click();
    }

    async fillCredentials(username: string, password: string) {


        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    async validateImgLogoIsVisible() {
        expect(await this.loginLocator.imgSchoolLogin).toBeVisible(); 
    }

    async clickRoleOption(optionRole: string) {
        switch (optionRole) {
            case 'DIRECTIVO':
                await this.loginLocator.optionExecutive.click();
                console.log("Seleccionado Directivo");
                break;
            case 'PROFESOR_PRIMARIA':
                await this.loginLocator.optionTeacherPrimary.click();
                console.log("Seleccionado Profesor Primaria");
                break
            case 'PROFESOR_SECUNDARIA':
                await this.loginLocator.optionSecondarySchoolTutorTeacher.click();
                console.log("Seleccionado Profesor Secundaria");
                break;
            case 'AUXILIAR':
                await this.loginLocator.optionAssistant.click();
                console.log("Seleccionado Auxiliar");
                break;
            case 'AUXILIAR':
                await this.loginLocator.optionAssistant.click();
                console.log("Seleccionado Auxiliar");
                break;
            case 'RESPONSABLE':
                await this.loginLocator.optionResponsible.click();
                console.log("Seleccionado Responsable");
                break;
            case 'OTRO':
                await this.loginLocator.optionOther.click();
                console.log("Seleccionado Otro");
                break;
            default:
                console.log("Opción no válida");
                break;
            
        }
    }

};