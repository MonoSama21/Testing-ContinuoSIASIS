import { expect, Page } from '@playwright/test';
import { LoginLocator } from '../locators/login.locator';
import { pageFixture } from '../utiles/pageFixture';

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
        await this.loginLocator.inputUsername.waitFor({ state: 'visible' });
        await this.loginLocator.inputUsername.isEnabled();
        await this.loginLocator.inputUsername.fill(username);
    }

    async fillPassword(password: string) {
        await this.loginLocator.inputPassword.waitFor({ state: 'visible' });
        await this.loginLocator.inputPassword.isEnabled();
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
            case 'TUTOR':
                username = process.env.TUTOR_USERNAME || '';
                password = process.env.TUTOR_PASSWORD || '';
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
        
        // Validar que ambos campos tengan el valor correcto antes de hacer click
        const usernameValue = await this.loginLocator.inputUsername.inputValue();
        const passwordValue = await this.loginLocator.inputPassword.inputValue();
        
        if (usernameValue !== username || passwordValue !== password) {
            console.log(`⚠️ Los campos no contienen los valores esperados. Reintentando...`);
            await this.loginLocator.inputUsername.clear();
            await this.loginLocator.inputPassword.clear();
            await this.fillUsername(username);
            await this.fillPassword(password);
            
            // Validar nuevamente
            const usernameValueRetry = await this.loginLocator.inputUsername.inputValue();
            const passwordValueRetry = await this.loginLocator.inputPassword.inputValue();
            
            if (usernameValueRetry !== username || passwordValueRetry !== password) {
                throw new Error(`❌ No se pudo completar correctamente los campos de login después de reintentar.`);
            }
        }
        
        await this.clickLoginButton();
        console.log(`Ingreso usuario: ${username} y contraseña: ${password}`);
    }

    async fillCredentialsInvalidate() {
        let username = process.env.CREDENTIALS_INVALIDS_USERNAME || '';
        let password = process.env.CREDENTIALS_INVALIDS_PASSWORD || '';
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

    async validateModalInvalidCredentialsIsVisible() {
        await this.page.waitForTimeout(2000);
        expect(await this.loginLocator.modalInvalidCredentials).toBeVisible();
        const texto = await this.loginLocator.modalInvalidCredentials.textContent();
        if (texto === 'Usuario•Credenciales inválidas') {
            console.log('El modal de credenciales inválidas se muestra correctamente.');
        } else {
            throw new Error('El texto del modal no es el esperado.');
        }
    }

    async validateImgLogoIsVisible() {
        await this.page.waitForTimeout(2000);
        expect(await this.loginLocator.imgSchoolLogin).toBeVisible(); 
        await this.loginLocator.inputPassword.isEnabled();
        await this.loginLocator.inputPassword.isEnabled();
        await this.loginLocator.btnLogin.isEnabled();
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
            case 'TUTOR':
                await this.loginLocator.optionSecondarySchoolTutorTeacher.click();
                console.log("Seleccionado Tutor");
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
            case 'RESPONSABLE':
                await this.loginLocator.optionResponsible.click();
                console.log("Seleccionado Responsable");
            default:
                console.log("Opción no válida");
                break;
            
        }
    }

    async validateLoginSuccess() {
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(3000);
        await this.loginLocator.messageWelcomeLogin.isVisible();
        await this.loginLocator.imgLogoUNDC.isVisible();
        console.log("Ingreso exitoso al sistema");
    }

    async validateModalLoginOptionsRoleIsVisible(){
        await this.page.waitForLoadState('networkidle');
        await this.loginLocator.modalInvalidCredentials.isVisible();
        await this.loginLocator.optionAssistant.isVisible();
        await this.loginLocator.optionExecutive.isVisible();
        await this.loginLocator.optionOther.isVisible();
        await this.loginLocator.optionResponsible.isVisible();
        await this.loginLocator.optionSecondarySchoolTutorTeacher.isVisible();
        await this.loginLocator.optionTeacherPrimary.isVisible();
        console.log("Se valida correctamente el direccionamiento al Login al momento de cerrar sesión");
    }
};