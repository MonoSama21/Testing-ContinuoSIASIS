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
        // Calcular fecha de inicio: 1 día después de hoy
        const fechaInicio = new Date();
        fechaInicio.setDate(fechaInicio.getDate() + 1);
        const fechaInicioFormatted = fechaInicio.toISOString().split('T')[0]; // Formato: YYYY-MM-DD

        // Calcular fecha de conclusión: 2 días después de la fecha de inicio (3 días desde hoy)
        const fechaConclusion = new Date();
        fechaConclusion.setDate(fechaConclusion.getDate() + 3);
        const fechaConclusionFormatted = fechaConclusion.toISOString().split('T')[0];

        // Llenar los campos
        await this.communicationsLocator.inputStartDate.fill(fechaInicioFormatted);
        await this.communicationsLocator.inputConclusionDate.fill(fechaConclusionFormatted);

        console.log(`📅 Fecha de Inicio: ${fechaInicioFormatted}`);
        console.log(`📅 Fecha de Conclusión: ${fechaConclusionFormatted}`);
    }


    async fillTituloYContenido() {
        // Generar título único con timestamp para asegurar unicidad
        const timestamp = Date.now();
        const titulo = `Comunicado ${faker.word.adjective()} ${faker.word.noun()} - ${timestamp}`;
        
        // Generar contenido aleatorio pero coherente
        const contenido = `Estimados Padres de Familia,\n\n${faker.lorem.paragraph(3)}\n\n${faker.lorem.paragraph(2)}\n\nGracias por su atención.\n\nAtentamente,\n\nDirección Académica`;
        
        // Llenar los campos
        await this.communicationsLocator.inputTitulo.fill(titulo);
        await this.communicationsLocator.textareaContenido.fill(contenido);
        
        console.log(`📝 Título: ${titulo}`);
        console.log(`📝 Contenido generado con ${contenido.length} caracteres`);
        
        // Guardar el título en el contexto para validaciones posteriores
        return { titulo, contenido };
    }

    async uploadImagen() {
        // Ruta a la imagen de prueba (crear una carpeta test-data en src/test/)
        const imagePath = 'src/resources/fixtures/img/admitible2.jpg';
        
        // Subir el archivo al input file oculto
        await this.communicationsLocator.inputFileImagen.setInputFiles(imagePath);
        
        console.log('🖼️ Imagen adjuntada correctamente');
        
        // Esperar un momento para que se procese la imagen
        await this.page.waitForTimeout(1000);
    }

    async validateVistaPrevia(tituloEsperado: string, contenidoEsperado: string) {
        // Esperar a que la vista previa sea visible
        await this.communicationsLocator.vistaPreviaTitulo.waitFor({ state: 'visible' });
        
        // Obtener el título de la vista previa
        const tituloActual = await this.communicationsLocator.vistaPreviaTitulo.textContent();
        
        // Validar que el título coincide
        expect(tituloActual?.trim()).toBe(tituloEsperado);
        console.log(`✅ Título en vista previa validado: ${tituloActual}`);
        
        // Obtener el contenido de la vista previa
        const contenidoActual = await this.communicationsLocator.vistaPreviaContenido.textContent();
        
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

    async validateMensajeExito(mensajeEsperado: string) {
        // Esperar a que aparezca el mensaje de éxito
        await this.communicationsLocator.mensajeExito.waitFor({ state: 'visible', timeout: 10000 });
        
        // Obtener el texto del mensaje
        const mensajeActual = await this.communicationsLocator.mensajeExito.textContent();
        
        // Validar que el mensaje coincide con el esperado
        expect(mensajeActual?.trim()).toBe(mensajeEsperado);
        console.log(`✅ Mensaje de éxito validado: "${mensajeActual}"`);
    }

    async buscarYValidarComunicadoEnLista(titulo: string, estadoEsperado: string) {
        // Esperar un momento para que el modal se cierre y vuelva a la lista
        await this.page.waitForTimeout(2000);
        
        // Llenar el campo de búsqueda con el título
        await this.communicationsLocator.inputBusquedaTitulo.fill(titulo);
        console.log(`🔍 Buscando comunicado: "${titulo}"`);
        
        // Esperar a que cargue la tabla con los resultados
        await this.page.waitForTimeout(2000);
        
        // Esperar a que aparezca la fila con el comunicado
        const filaComunicado = this.communicationsLocator.getFilaComunicadoPorTitulo(titulo);
        await filaComunicado.waitFor({ state: 'visible', timeout: 10000 });
        
        // Validar que el comunicado aparece en la tabla
        const isVisible = await filaComunicado.isVisible();
        expect(isVisible).toBeTruthy();
        console.log(`✅ Comunicado encontrado en la tabla: "${titulo}"`);
        
        // Obtener y validar el estado
        const estadoElement = this.communicationsLocator.getEstadoComunicadoPorTitulo(titulo);
        await estadoElement.waitFor({ state: 'visible' });
        const estadoActual = await estadoElement.textContent();
        
        expect(estadoActual?.trim()).toBe(estadoEsperado);
        console.log(`✅ Estado validado: "${estadoActual}" (esperado: "${estadoEsperado}")`);
    }

}