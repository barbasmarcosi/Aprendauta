# Verificación técnica · Aprendauta V2

- `node --check src/diagnostics.mjs` y `node --check src/app.mjs` sin errores.
- **12/12 pruebas automatizadas locales** en Node.js 22; incluyen patrones esperados, casos inválidos, respuestas desconocidas y aislamiento de evaluaciones autónomas.
- Chromium: recorrido completo de 9 preguntas en **escritorio 1440×1000** y **móvil 390×844**, sin excepciones de JS ni scroll horizontal.
- Entorno de prueba: Chromium no puede cargar localhost ni file:// por política; pruebas de navegador inyectan los módulos como código concatenado. Esto no verifica el loader real del despliegue.
- **Pendiente:** auditoría de accesibilidad, validación docente, verificación de dificultad A/B, evidencia de aprendizaje, test de empaquetado/despliegue.
- No se usaron datos reales de menores ni llamadas a proveedores IA.
