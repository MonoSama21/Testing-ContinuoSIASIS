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

    async fillCredentials(role: string) {
        let username = '';
        let password = '';
        switch (role) {
            case 'DIRECTIVO':
                username = process.env.DIRECTIVO_USERNAME || '';
                password = process.env.DIRECTIVO_PASSWORD || '';
                break;
            case 'PROFESOR_PRIMARIA':
                username = process.env.PROFESOR_PRIMARIA_USERNAME || '';
                password = process.env.PROFESOR_PRIMARIA_PASSWORD || '';
                break;
            case 'PROFESOR_SECUNDARIA':
                username = process.env.PROFESOR_SECUNDARIA_USERNAME || '';
                password = process.env.PROFESOR_SECUNDARIA_PASSWORD || '';
                break;
            case 'AUXILIAR':
                username = process.env.AUXILIAR_USERNAME || '';
                password = process.env.AUXILIAR_PASSWORD || '';
                break;
            case 'RESPONSABLE':
                username = process.env.RESPONSABLE_USERNAME || '';
                password = process.env.RESPONSABLE_PASSWORD || '';
                break;
            case 'OTRO':
                username = process.env.OTRO_USERNAME || '';
                password = process.env.OTRO_PASSWORD || '';
                break;
            default:
                console.log('Rol no reconocido');
                return;
        }
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
        console.log(`Ingreso usuario: ${username} y contraseña: ${password}`);
    }

    async fillCredentialsInvalidate() {
        await this.fillUsername("Invalido");
        await this.fillPassword("Invalido");
        await this.clickLoginButton();
    }

    async validateModalInvalidCredentialsIsVisible() {
        await this.page.waitForTimeout(2000);
        expect(await this.loginLocator.modalInvalidCredentials).toBeVisible();
    }

    async validateImgLogoIsVisible() {
        await this.page.waitForTimeout(2000);
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

    async validateLoginSuccess() {
        await this.page.waitForTimeout(2000);
        expect(await this.loginLocator.messageWelcomeLogin).toBeVisible(); 
    }
};