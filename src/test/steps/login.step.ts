import { expect } from '@playwright/test';
import { Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { LoginPage } from '../pages/login.page';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'playwright.env' });

let loginPage: LoginPage;
let selectedRole = '';


Given('estoy en la pagina de login', async function () {
    await pageFixture.page.goto("https://siasis-cert.vercel.app/login")
});

When('selecciono el rol {string}', async function (role) {
    selectedRole = role;
    loginPage = new LoginPage(pageFixture.page);
    await loginPage.clickRoleOption(role);
});

When('ingreso mi nombre de usuario y contraseña validos', async function () {
    await loginPage.validateImgLogoIsVisible();
    await loginPage.fillCredentials(selectedRole);

});

Then('accedo al sistema como {string}', async function (string) {
    await loginPage.validateLoginSuccess();
    console.log(`Ingreso exitoso como ${string}`);    
});

When('ingreso mi nombre de usuario y contraseña invalidos', async function () {
    await loginPage.validateImgLogoIsVisible();
    await loginPage.fillCredentialsInvalidate();
});

Then('aparece un modal indicando que las credenciales son incorrectas', async function () {
    await loginPage.validateModalInvalidCredentialsIsVisible();
});

Then('verifico que he salido correctamente al ver la página de login', async function () {
    await loginPage.validateModalLoginOptionsRoleIsVisible();
});


