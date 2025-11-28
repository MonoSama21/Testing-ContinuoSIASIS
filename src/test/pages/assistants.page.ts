import { expect, Page } from '@playwright/test';
import { AssistantsLocator } from '../locators/assistants.locator';

export class AssistantsPage {

    readonly page: Page;
    readonly assistantsLocator: AssistantsLocator;

    constructor(page: Page) {
        this.page = page;
        this.assistantsLocator = new AssistantsLocator(page);
    }





}