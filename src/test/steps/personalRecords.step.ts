import { expect } from '@playwright/test';
import { Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { PersonalRecordsPage } from '../pages/personalRecords.page';

let personalRecordsPage: PersonalRecordsPage;

When('en el campo tipo de personal selecciono un {string}', async function (optionPersonal) {
    personalRecordsPage = new PersonalRecordsPage(pageFixture.page);
    await personalRecordsPage.clickTypePersonal(optionPersonal);
});

When('selecciono un usuario', async function () {
    await personalRecordsPage.selectRandomPersonal();
});

When('selecciono un mes superior a Junio', async function () {
    await personalRecordsPage.selectRandomMonthGreaterThanJune();
});

When('doy click en el boton de Buscar', async function () {
    await personalRecordsPage.clickSearchButton();
});