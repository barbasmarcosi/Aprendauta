# Evidencia técnica del demostrador v1

**Fecha:** 17/10/2026. **Alcance:** pruebas técnicas locales, no validación pedagógica.

## Ejecutar

Requisitos: Node.js 20+ para pruebas, navegador moderno con módulos ECMAScript para la app, y servidor estático local para abrir la página.

```bash
npm test
python3 -m http.server 8080
# Abrir http://localhost:8080
```

No instala dependencias npm ni requiere servicios de IA.

## Verificaciones

- **7 pruebas con Node.js**: secuencias A/B, separación de competencias, corrección determinista, parser de números, integridad de pistas y visualizaciones, resúmenes independientes y navegación con DOM simulado.
- **Prueba de recorrido Chromium/Playwright local**: 9 actividades A→B, versiones desktop y mobile, pistas disponibles solamente en práctica, representaciones sólo en práctica, respuestas y explicaciones retenidas hasta el final; 0 errores de JS y 0 desbordes horizontales en las dos resoluciones probadas.
- La comprobación en navegador se ejecutó inyectando en una página vacía el HTML, CSS y módulos JS locales **agrupados en memoria** porque la política del entorno bloqueó navegación por HTTP local y `file://`. No valida el servidor real, rutas de módulos ni experiencia con lectores de pantalla.

## Límites

- Los ítems, explicaciones, diagramas y niveles no han recibido revisión de docentes.
- No se han realizado pruebas de accesibilidad con tecnología asistiva ni auditoría WCAG completa.
- El DOM simulado no sustituye un navegador; el navegador local no sustituye pruebas de despliegue.
- Se probaron valores correctos y varios casos inválidos; se requieren más verificaciones de respuestas incorrectas, foco, teclado y restauración ante errores.
- Estas pruebas **no autorizan el uso con menores** ni permiten inferir mejora de aprendizaje.
