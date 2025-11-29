import { expect } from '@playwright/test';
import { Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { AdministrativeStaffPage } from '../pages/administrativeStaff.page';

let administrativeStaffPage: AdministrativeStaffPage;

Then('se muestra en pantalla la lista de personal administrativo disponibles', async function () {
    administrativeStaffPage = new AdministrativeStaffPage(pageFixture.page);
    await administrativeStaffPage.validateQuantityAdministrativeStaff();
});