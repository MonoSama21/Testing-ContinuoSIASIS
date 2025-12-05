const fs = require('fs');
const { JSDOM } = require('jsdom');

// Leer el archivo HTML del reporte
const htmlContent = fs.readFileSync('target/cucumber-report.html', 'utf-8');
const dom = new JSDOM(htmlContent);
const document = dom.window.document;

// Obtener todos los enlaces de escenarios (que contienen los datos)
const scenarioLinks = document.querySelectorAll('a[data-toggle="collapse"]');

console.log(`📊 Encontrados ${scenarioLinks.length} escenarios en el reporte`);

let tableRows = '';
let totalPassed = 0;
let totalFailed = 0;
let totalPending = 0;

scenarioLinks.forEach((link, index) => {
  // Obtener el nombre del escenario desde el div con clase "ellipsis"
  const nameElement = link.querySelector('.ellipsis');
  const scenarioName = nameElement ? nameElement.getAttribute('data-text') || nameElement.textContent.trim() : 'N/A';
  
  console.log(`  [${index + 1}] Procesando: ${scenarioName}`);
  
  // Obtener los labels de estado (success, danger, warning) dentro del link
  const successLabel = link.querySelector('.label-success');
  const dangerLabel = link.querySelector('.label-danger');
  const warningLabel = link.querySelector('.label-warning');
  
  // Determinar el estado del escenario
  let status = '';
  let statusColor = '';
  let statusIcon = '';
  
  if (dangerLabel) {
    // Si tiene algún step fallido (rojo), el escenario FAILED
    status = 'FAILED';
    statusColor = '#dc3545';
    statusIcon = '❌';
    totalFailed++;
  } else if (warningLabel && !successLabel) {
    // Si solo tiene steps pendientes (amarillo), está PENDING
    status = 'PENDING';
    statusColor = '#ffc107';
    statusIcon = '⏸️';
    totalPending++;
  } else if (successLabel) {
    // Si tiene steps exitosos y no tiene fallos, está PASSED
    status = 'PASSED';
    statusColor = '#28a745';
    statusIcon = '✅';
    totalPassed++;
  } else {
    status = 'UNKNOWN';
    statusColor = '#6c757d';
    statusIcon = '❓';
  }
  
  // Crear fila de la tabla
  tableRows += `
    <tr>
      <td style="padding: 12px; border: 1px solid #ddd; text-align: left;">${scenarioName}</td>
      <td style="padding: 12px; border: 1px solid #ddd; text-align: center; color: ${statusColor}; font-weight: bold;">
        ${statusIcon} ${status}
      </td>
    </tr>
  `;
});

// Crear el HTML de la tabla completa
const tableHtml = `
<div style="margin: 20px 0;">
  <h3 style="color: #333;">📋 Resultados de Ejecución</h3>
  
  <div style="display: flex; gap: 10px; margin-bottom: 15px;">
    <span style="padding: 8px 15px; background: #d4edda; color: #155724; border-radius: 4px; font-weight: bold;">
      ✅ Passed: ${totalPassed}
    </span>
    <span style="padding: 8px 15px; background: #f8d7da; color: #721c24; border-radius: 4px; font-weight: bold;">
      ❌ Failed: ${totalFailed}
    </span>
    <span style="padding: 8px 15px; background: #fff3cd; color: #856404; border-radius: 4px; font-weight: bold;">
      ⏸️ Pending: ${totalPending}
    </span>
  </div>
  
  <table style="width: 100%; border-collapse: collapse; margin-top: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <thead>
      <tr style="background: #f8f9fa;">
        <th style="padding: 12px; border: 1px solid #ddd; text-align: left; font-weight: bold;">Caso de Prueba</th>
        <th style="padding: 12px; border: 1px solid #ddd; text-align: center; font-weight: bold;">Estado</th>
      </tr>
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  </table>
</div>
`;

// Guardar la tabla HTML para el correo
fs.writeFileSync('test-results-table.html', tableHtml);

// Crear tabla en formato Markdown para GitHub Actions Summary
let markdownTable = `## 📊 Resultados de Ejecución

### Resumen
- ✅ **Passed:** ${totalPassed}
- ❌ **Failed:** ${totalFailed}
- ⏸️ **Pending:** ${totalPending}
- 📦 **Total:** ${totalPassed + totalFailed + totalPending}

### Detalle de Casos de Prueba

| Caso de Prueba | Estado |
|----------------|--------|
`;

// Recrear las filas en formato Markdown
const scenarioLinksAgain = document.querySelectorAll('a[data-toggle="collapse"]');
scenarioLinksAgain.forEach(link => {
  const nameElement = link.querySelector('.ellipsis');
  const scenarioName = nameElement ? nameElement.getAttribute('data-text') || nameElement.textContent.trim() : 'N/A';
  
  const successLabel = link.querySelector('.label-success');
  const dangerLabel = link.querySelector('.label-danger');
  const warningLabel = link.querySelector('.label-warning');
  
  let status = '';
  if (dangerLabel) {
    status = '❌ FAILED';
  } else if (warningLabel && !successLabel) {
    status = '⏸️ PENDING';
  } else if (successLabel) {
    status = '✅ PASSED';
  } else {
    status = '❓ UNKNOWN';
  }
  
  markdownTable += `| ${scenarioName} | ${status} |\n`;
});

// Guardar la tabla Markdown
fs.writeFileSync('test-results-summary.md', markdownTable);

console.log('\n✅ Tabla de resultados generada exitosamente');
console.log(`📊 Total: ${totalPassed + totalFailed + totalPending} escenarios`);
console.log(`   ✅ Passed: ${totalPassed}`);
console.log(`   ❌ Failed: ${totalFailed}`);
console.log(`   ⏸️ Pending: ${totalPending}`);

// Si no se encontraron escenarios, mostrar advertencia
if (totalPassed + totalFailed + totalPending === 0) {
  console.log('\n⚠️ ADVERTENCIA: No se encontraron escenarios en el reporte HTML');
  console.log('   Verifica que target/cucumber-report.html se haya generado correctamente');
}
