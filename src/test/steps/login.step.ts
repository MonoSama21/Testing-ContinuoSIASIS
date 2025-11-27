import { expect } from '@playwright/test';
import { Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { LoginPage } from '../pages/login.page';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'playwright.env' });

let loginPage: LoginPage;
let selectedRole = '';


Given('I navigate to ecommerce website', async ({ pages }) => {
    await pages.login.navigateToUrl("");
});

Given('I click on My account', async ({ pages }) => {
    await pages.login.clickOnMyAccount();
});


Given('estoy en la pagina de login', async function () {
    await pageFixture.page.goto("https://siasis-dev.vercel.app/login")
});


When('selecciono el rol {string}', async function (role) {
    selectedRole = role;
    loginPage = new LoginPage(pageFixture.page);
    await loginPage.clickRoleOption(role);
});




When('ingreso mi nombre de usuario y contraseña validos', async function () {
    await loginPage.validateImgLogoIsVisible();
    let username = '';
    let password = '';
    switch (selectedRole) {
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

    await loginPage.fillCredentials(username, password);

});


Then('accedo al sistema como {string}', async function (string) {
    console.log("Accedio al sistema");
});
