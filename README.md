# Aprendauta

**Explorar. Comprender. Pensar. Crear.**

> Educación abierta para construir el futuro.

Aprendauta es una iniciativa educativa **sin fines de lucro como propósito rector**, concebida para ayudar a estudiantes de primaria y secundaria a desarrollar conocimientos profundos, pensamiento crítico y autonomía para aprender a lo largo de toda la vida.

## Nuestra misión

**Ayudar a formar personas capaces de comprender el mundo, pensar por sí mismas, aprender durante toda su vida y construir libremente su futuro, independientemente de cómo evolucionen la tecnología, la sociedad y el trabajo.**

El objetivo no es solo aprobar exámenes ni obtener respuestas rápidas: es que los chicos **salgan preparados para el futuro**.

## Qué queremos construir

Una experiencia de aprendizaje accesible, atractiva, segura y adaptable al nivel de cada estudiante que:

- Consolide lectura, escritura, matemática, ciencias y otras bases esenciales.
- Enseñe a formular buenas preguntas, razonar, contrastar fuentes y reconocer errores.
- Personalice el acompañamiento sin confundir personalización con aislamiento.
- Ofrezca pistas, práctica y retroalimentación antes que respuestas automáticas.
- Promueva creatividad, colaboración, ciudadanía y alfabetización digital e inteligencia artificial.
- Fortalezca gradualmente la independencia del estudiante, incluso **sin asistencia de IA**.
- Incluya a docentes y familias como aliados, respetando las necesidades y la privacidad de cada estudiante.

## Principio de diseño central

**El éxito de Aprendauta se mide por lo que cada estudiante puede comprender, explicar, crear y resolver por sí mismo; no por el tiempo que pasa usando la plataforma.**

La inteligencia artificial es un medio, no el fin. Aprendauta nunca debe sustituir el pensamiento propio ni presentar sus respuestas como autoridad incuestionable.

## Estado

**Fase fundacional.** Estamos definiendo principios pedagógicos, seguridad infantil, alcance de un piloto y criterios para medir aprendizaje real. No existe aún un producto listo para estudiantes.

## Compromisos iniciales

- **Educación y evidencia:** priorizar métodos pedagógicos verificables y evaluar resultados sin exagerarlos.
- **Protección de menores:** privacidad por diseño, minimización de datos, supervisión apropiada y salvaguardas antes de trabajar con estudiantes reales.
- **Equidad:** accesibilidad, inclusión y atención a conectividad limitada.
- **Agencia:** la ayuda debe disminuir a medida que crece la autonomía.
- **Transparencia:** distinguir hipótesis, decisiones de diseño y resultados medidos.
- **Sostenibilidad social:** evitar dependencias innecesarias y diseñar para costos operativos razonables.

## Documentación fundacional

- [Manifiesto](docs/01_MANIFIESTO.md)
- [Principios pedagógicos](docs/02_PRINCIPIOS_PEDAGOGICOS.md)
- [Primer MVP y alcance provisional](docs/03_MVP_Y_ALCANCE.md)
- [Protección de menores y datos](docs/04_PROTECCION_INFANCIA_Y_DATOS.md)
- [Evaluación de impacto y aprendizaje autónomo](docs/05_EVALUACION_DE_IMPACTO.md)
- [Hoja de ruta](docs/06_ROADMAP.md)
- [Arquitectura inicial](docs/07_ARQUITECTURA_INICIAL.md)
- [Decisiones y supuestos abiertos](docs/08_DECISIONES_ABIERTAS.md)
- [Cómo contribuir](CONTRIBUTING.md)

El trabajo fundacional se revisa en el [PR #1](https://github.com/barbasmarcosi/Aprendauta/pull/1). Las tareas iniciales quedan registradas en [Issues](https://github.com/barbasmarcosi/Aprendauta/issues).

## Demostrador de porcentajes

Ya existe una **primera experiencia técnica** de matemáticas, sin IA, usuarios, analítica ni almacenamiento. Tiene tres etapas: dos preguntas iniciales, tres ejercicios guiados con pistas y tres problemas independientes.

**Ejecutar localmente** (requiere Node.js para tests y Python 3 para el servidor de archivos):

```bash
npm test
python3 -m http.server 8080
```

Abrí `http://localhost:8080` en el navegador. No requiere instalación de dependencias JavaScript, backend ni API. Para revisar el enfoque y las fuentes:

- [Estado del arte y selección del problema](docs/research/ESTADO_DEL_ARTE.md)
- [Especificación pedagógica y límites](docs/research/ESPECIFICACION_PORCENTAJES_V0.md)
- [Registro de herramientas para reutilizar](docs/research/EVALUACION_FUENTES_Y_REUSO.md)
- [Guía de verificación local](docs/research/COMO_PROBAR_EL_DEMOSTRADOR.md)

**Advertencia:** que el software funcione no demuestra que sea eficaz para enseñar. Este prototipo todavía no está aprobado para uso con menores.

## Participar

Este repositorio recogerá decisiones, propuestas y avances del proyecto. Las contribuciones técnicas, pedagógicas y comunitarias serán bienvenidas una vez definidas las pautas de colaboración y protección infantil.

**Nota sobre licencias:** la disponibilidad pública del código no equivale automáticamente a una licencia de uso o redistribución. La licencia del proyecto se definirá expresamente antes de aceptar contribuciones o publicar versiones reutilizables.
