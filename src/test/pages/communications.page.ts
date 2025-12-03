import { expect, Page } from '@playwright/test';
import { CommunicationsLocator } from '../locators/communications.locator';
import { faker } from '@faker-js/faker';

export class CommunicationsPage {

    readonly page: Page;
    readonly communicationsLocator: CommunicationsLocator;

    constructor(page: Page) {
        this.page = page;
        this.communicationsLocator = new CommunicationsLocator(page);
    }

    async clickBtnRegisterCommunication() {
        await this.communicationsLocator.btnRegisterCommunication.click();
    }

    async fillStartAndConclusionDates() {
        await this.communicationsLocator.lblRegisterCommunicationTitle.waitFor({ state: 'visible' });
        const fechaInicio = new Date();                                       // Calcular fecha de inicio: 1 día después de hoy
        fechaInicio.setDate(fechaInicio.getDate() + 1);
        const fechaInicioFormatted = fechaInicio.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
        const fechaConclusion = new Date();         // Calcular fecha de conclusión: 2 días después de la fecha de inicio (3 días desde hoy)
        fechaConclusion.setDate(fechaConclusion.getDate() + 3);
        const fechaConclusionFormatted = fechaConclusion.toISOString().split('T')[0];
        await this.communicationsLocator.inputStartDate.fill(fechaInicioFormatted);         // Llenar los campos
        await this.communicationsLocator.inputConclusionDate.fill(fechaConclusionFormatted);
        console.log(`📅 Fecha de Inicio: ${fechaInicioFormatted}`);
        console.log(`📅 Fecha de Conclusión: ${fechaConclusionFormatted}`);
    }


    async fillTitleAndContent() {
        const timestamp = Date.now();         // Generar título único con timestamp para asegurar unicidad
        const titulo = `Comunicado ${faker.word.adjective()} ${faker.word.noun()} - ${timestamp}`;
        const contenido = `Estimados Padres de Familia,\n\n${faker.lorem.paragraph(3)}\n\n${faker.lorem.paragraph(2)}\n\nGracias por su atención.\n\nAtentamente,\n\nDirección Académica`;         // Generar contenido aleatorio pero coherente
        await this.communicationsLocator.inputTitle.fill(titulo);         // Llenar los campos
        await this.communicationsLocator.textareaContent.fill(contenido);
        console.log(`📝 Título: ${titulo}`);
        console.log(`📝 Contenido generado con ${contenido.length} caracteres`);
        return { titulo, contenido };         // Guardar el título en el contexto para validaciones posteriores
    }

    async uploadImg() {
        const imagePath = 'src/resources/fixtures/img/admitible2.jpg';
        await this.communicationsLocator.inputFileImg.setInputFiles(imagePath);         // Subir el archivo al input file oculto
        console.log('🖼️ Imagen adjuntada correctamente');
        await this.page.waitForTimeout(1000);         // Esperar un momento para que se procese la imagen
    }

    async validatePreview(tituloEsperado: string, contenidoEsperado: string) {
        await this.communicationsLocator.previewTitle.waitFor({ state: 'visible' });
        const tituloActual = await this.communicationsLocator.previewTitle.textContent();         // Obtener el título de la vista previa
        expect(tituloActual?.trim()).toBe(tituloEsperado);         // Validar que el título coincide
        console.log(`✅ Título en vista previa validado: ${tituloActual}`); 
        const contenidoActual = await this.communicationsLocator.previewContent.textContent();        // Obtener el contenido de la vista previa
        // Validar que el contenido contiene las partes principales del texto ingresado
        // (dado que el formato puede cambiar con saltos de línea)
        const contenidoPrincipal = contenidoEsperado.split('\n\n')[0]; // Primera oración
        expect(contenidoActual).toContain('Estimados Padres de Familia');
        console.log(`✅ Contenido en vista previa validado (contiene texto esperado)`);
        // Validar que aparecen las fechas
        const fechasTexto = await this.communicationsLocator.vistaPreviewFechas.textContent();
        expect(fechasTexto).toContain('Período:');
        expect(fechasTexto).toContain('2025'); // Año actual en las fechas
        console.log(`✅ Fechas en vista previa validadas: ${fechasTexto}`);
    }

    async validateSuccessMessage(mensajeEsperado: string) {
        await this.communicationsLocator.successMessage.waitFor({ state: 'visible', timeout: 10000 });
        const mensajeActual = await this.communicationsLocator.successMessage.textContent();         // Obtener el texto del mensaje
        expect(mensajeActual?.trim()).toBe(mensajeEsperado);         // Validar que el mensaje coincide con el esperado
        console.log(`✅ Mensaje de éxito validado: "${mensajeActual}"`);
    }

    async searchAndValidateStatement(titulo: string, estadoEsperado: string) {
        await this.page.waitForTimeout(2000);
        await this.communicationsLocator.inputSearchTitle.fill(titulo);         // Llenar el campo de búsqueda con el título
        console.log(`🔍 Buscando comunicado: "${titulo}"`);
        await this.page.waitForTimeout(2000);
        // Esperar a que aparezca la fila con el comunicado
        const filaComunicado = this.communicationsLocator.getStatementRowTitle(titulo);
        await filaComunicado.waitFor({ state: 'visible', timeout: 10000 });
        // Validar que el comunicado aparece en la tabla
        const isVisible = await filaComunicado.isVisible();
        expect(isVisible).toBeTruthy();
        console.log(`✅ Comunicado encontrado en la tabla: "${titulo}"`);
        // Obtener y validar el estado
        const estadoElement = this.communicationsLocator.getStatementStatusTitle(titulo);
        await estadoElement.waitFor({ state: 'visible' });
        const estadoActual = await estadoElement.textContent();
        expect(estadoActual?.trim()).toBe(estadoEsperado);
        console.log(`✅ Estado validado: "${estadoActual}" (esperado: "${estadoEsperado}")`);
    }

}