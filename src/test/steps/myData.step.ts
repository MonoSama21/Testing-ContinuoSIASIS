import { expect } from '@playwright/test';
import { Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { MyDataPage } from '../pages/myData.page';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'playwright.env' });

let myDataPage: MyDataPage;



When('doy click en el boton de Editar Datos', async function () {
    myDataPage = new MyDataPage(pageFixture.page);
    await myDataPage.clickBtnEditDates();
});

When('edito mi informacion personal', async function () {
    await myDataPage.editDataInformationPersonal();
});

When('guardo los cambios realizados', async function () {
    await myDataPage.clickBtnSaveChanges();
});

Then('verifico que se han guardado los cambios', async function () {
    await myDataPage.validateModalSaveChangesIsVisible();
    await myDataPage.validateHeaderUserName();
});

Then('restauro los datos originales', async function () {
    await myDataPage.restoreOriginalDataExecutive();
});

Then('verifico que los datos originales son correctos', async function () {
    await myDataPage.validateRestoreOriginalDataExecutive();
});


When('hago click en Cambiar Foto', async function () {
    await myDataPage.clickBtnChangePhoto();

});

When('subo una foto de tamaño mayor a 5MB', async function () {
    await myDataPage.uploadingPhotoNotAllowed();
});

Then('aparece un modal indicando que la imagen no debe superar los 5MB', async function () {
    await myDataPage.validateModalPhotoNotAllowedIsVisible();
});

Then('el boton del modal para cambiar foto debe permanecer desahabilitado', async function () {
    await myDataPage.validateDisabledBtnChangePhoto();
});