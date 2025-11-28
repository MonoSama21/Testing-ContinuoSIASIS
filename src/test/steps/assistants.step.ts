import { expect } from '@playwright/test';
import { Given, When, Then} from '@cucumber/cucumber';
import { pageFixture } from '../utiles/pageFixture';
import { AssistantsPage } from '../pages/assistants.page';
import * as dotenv from 'dotenv';
dotenv.config({ path: 'playwright.env' });

let assistantsPage: AssistantsPage;


