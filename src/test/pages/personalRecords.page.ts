import { expect, Page } from '@playwright/test';
import { PersonalRecordsLocator } from '../locators/personalRecords.locator';
import { pageFixture } from '../utiles/pageFixture';

export class PersonalRecordsPage {

    readonly page: Page;
    readonly personalRecordsLocator: PersonalRecordsLocator;

    constructor(page: Page) {
        this.page = page;
        this.personalRecordsLocator = new PersonalRecordsLocator(page);
    }

    async clickTypePersonal(optionPersonal: string) {
        let value: string = "";

        switch (optionPersonal) {
            case "Profesor de Primaria":
                value = "PP";
                break;
            case "Profesor de Secundaria":
                value = "PS";
                break;
            case "Auxiliar":
                value = "A";
                break;
            case "Personal Administrativo":
                value = "PA";
                break;
            default:
                throw new Error(`Opción no reconocida: ${optionPersonal}`);
        }

        // ESTE ES EL MÉTODO CORRECTO PARA <select>
        await this.personalRecordsLocator.selectTypePersonal.selectOption(value);
    }

    async selectRandomPersonal() {

        // 1. Abrir dropdown
        await this.personalRecordsLocator.dropdownPersonal.click();

        // 2. Esperar que las opciones aparezcan
        await this.personalRecordsLocator.dropdownListItems.first().waitFor();

        // 3. Contar opciones
        const count = await this.personalRecordsLocator.dropdownListItems.count();
        console.log("➤ Número de opciones encontradas:", count);
        if (count === 0) {
            throw new Error("No se encontraron opciones en el dropdown.");
        }

        // 4. Generar índice aleatorio
        const randomIndex = Math.floor(Math.random() * count);

        // 5. Capturar locator de la opción
        const option = this.personalRecordsLocator.dropdownListItems.nth(randomIndex);

        // 6. Obtener el nombre
        const selectedName = await option.locator('.font-medium').innerText();

        // 7. Imprimir en consola
        console.log("➤ Opción seleccionada:", selectedName);

        // 8. Click a la opción
        await option.click();

        // 9. Devolver el nombre si lo quieres usar luego
        return selectedName;
    }

    async selectRandomMonthGreaterThanJune() {

        // Valores permitidos
        const allowedValues: string[] = ["7", "8", "9", "10", "11"];

        // Elegir uno aleatorio
        const randomValue = allowedValues[Math.floor(Math.random() * allowedValues.length)];

        await this.personalRecordsLocator.selectMonth.selectOption(randomValue);
    }

    async clickSearchButton() {
        await this.personalRecordsLocator.btnSearch.click();
    }

}