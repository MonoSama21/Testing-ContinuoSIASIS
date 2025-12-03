import { expect } from '@playwright/test';
import { Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { CommunicationsPage } from '../pages/communications.page';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'playwright.env' });
import { DashboardPage } from '../pages/dashboard.page';

let communicationsPage: CommunicationsPage;
let dashboardPage: DashboardPage;

Then('se muestra en pantalla la lista de auxiliares disponibles', async function () {
    communicationsPage = new CommunicationsPage(pageFixture.page);
    
});


When('hago click en el boton {string}', async function (string) {
    communicationsPage = new CommunicationsPage(pageFixture.page);
    await communicationsPage.clickBtnRegisterCommunication();
});


When('completo los campos de fecha de inicio y fecha de conclusión con una fecha mayor a la actual', async function () {
    communicationsPage = new CommunicationsPage(pageFixture.page);
    await communicationsPage.fillStartAndConclusionDates();

});

When('completo los campos de titulo y Contenido', async function () {
    communicationsPage = new CommunicationsPage(pageFixture.page);
    const { titulo, contenido } = await communicationsPage.fillTituloYContenido();
    // Guardar en el contexto de Cucumber para validaciones posteriores
    this.comunicadoTitulo = titulo;
    this.comunicadoContenido = contenido;
});


When('adjunto una imagen al comunicado', async function () {
    communicationsPage = new CommunicationsPage(pageFixture.page);
    await communicationsPage.uploadImagen();
});


When('visualizo la vista previa del comunicado', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
});


Then('la vista previa muestra correctamente el titulo, contenido y fecha', async function () {
    communicationsPage = new CommunicationsPage(pageFixture.page);
    await communicationsPage.validateVistaPrevia(this.comunicadoTitulo, this.comunicadoContenido);
});

When('confirmo el registro del comunicado', async function () {
    await communicationsPage.clickBtnRegisterCommunication();
});


Then('el sistema muestra un mensaje de exito {string}', async function (mensajeEsperado: string) {
    communicationsPage = new CommunicationsPage(pageFixture.page);
    await communicationsPage.validateMensajeExito(mensajeEsperado);
});


Then('el comunicado aparece en la lista con estado {string}', async function (estadoEsperado: string) {

    communicationsPage = new CommunicationsPage(pageFixture.page);
    await communicationsPage.buscarYValidarComunicadoEnLista(this.comunicadoTitulo, estadoEsperado);
});