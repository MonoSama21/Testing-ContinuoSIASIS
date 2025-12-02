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

When('solo se pueden editar los campos de celular y correo Electrónico', async function () {
    await myDataPage.validateEditablePhoneAndEmail();
});

When('edito los campos disponibles', async function () {
    await myDataPage.editDataPhoneAndEmail();
});

Then('verifico que se han guardado los cambios asi como el mensaje de confirmacion', async function () {
    await myDataPage.validateModalSaveChangesIsVisible();
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

When('subo una foto de tamaño no mayor a 5MB', async function () {
    await myDataPage.uploadingPhotoAllowed();
});

When('realizo el cambio de foto', async function () {
    await myDataPage.clickBtnEnabledModalChangePhoto();
});

Then('se valida el cambio correctamente tanto en el modal como en el header', async function () {
    await myDataPage.validateModalSaveChangesPhotoIsVisible();
});

Then('aparece un modal indicando que la imagen no debe superar los 5MB', async function () {
    await myDataPage.validateModalPhotoNotAllowedIsVisible();
});

Then('el boton del modal para cambiar foto debe permanecer desahabilitado', async function () {
    await myDataPage.validateDisabledBtnChangePhoto();
});

Then('se muestra en la pantalla su DNI, Nombres, Apellidos, Género, Foto y Celular', async function () {
    myDataPage = new MyDataPage(pageFixture.page);
    await myDataPage.validatePersonalInformation();
});

Then('se muestra los datos de contacto como celular y correo Electrónico', async function () {
    await myDataPage.validateContactInformation();
});

Then('se muestra la informacion de usuario como nombre de usuario', async function () {
    await myDataPage.validateUserInformation();
});