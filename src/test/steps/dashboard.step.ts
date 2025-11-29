import { expect } from '@playwright/test';
import { Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { DashboardPage } from '../pages/dashboard.page';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'playwright.env' });

let dashboardPage: DashboardPage;


When('hago click en el apartado de {string}', async function (option) {
    dashboardPage = new DashboardPage(pageFixture.page);
    await dashboardPage.clickOptionDashboard(option);
});
