# Estado del arte y problema educativo — exploración v0

**Fecha de revisión:** 17 de octubre de 2026. **Estado:** primera revisión de fuentes; no es revisión sistemática ni validación con docentes.

## 1. Hallazgo y problema candidato

**Hipótesis:** existe oportunidad para ayudar a estudiantes al final de primaria y comienzo de secundaria a **comprender y aplicar proporciones, fracciones y porcentajes**, no solamente ejecutar cuentas mecánicas. Una secuencia corta y verificable permite observar el razonamiento, retirar ayudas progresivamente y evaluar resolución autónoma de contextos nuevos.

**Por qué matemática:** 
- PISA 2022, Argentina (estudiantes de **15 años**): **27 % alcanzó al menos el nivel 2** en matemática. Es un dato poblacional de esa cohorte, no específico de proporciones ni del rango 11–14. [OCDE, nota país](https://www.oecd.org/en/publications/pisa-2022-results-volume-i-and-ii-country-notes_ed6fbcc5-en/argentina_09c7d993-en.html).
- Aprender **2023, sexto grado primaria**: **48,5 %** de estudiantes se ubicó en Básico o Debajo del Básico en matemática. [Secretaría de Educación](https://www.argentina.gob.ar/noticias/educacion-dio-conocer-los-resultados-de-las-pruebas-aprender-2023).
- Aprender **2024, último año secundaria**: **14,2 %** alcanzó nivel Satisfactorio en matemática; **54,6 %** se ubicó Debajo del Básico y **31,2 %** en Básico. [Secretaría de Educación, junio de 2025](https://www.argentina.gob.ar/noticias/prueba-aprender-secundaria-el-58-de-los-estudiantes-alcanza-el-nivel-satisfactorio-en).
- Aprender **2025, sexto grado primaria**: el operativo se realizó en noviembre de 2025 con 752.936 participantes. El análisis posterior de Argentinos por la Educación señala **mejoras respecto de 2023**, aunque persisten **brechas socioeconómicas**; por eso no hay que describir los resultados de 2023 como si fueran los más recientes. [Ficha oficial](https://www.argentina.gob.ar/node/484370) · [Argentinos por la Educación, análisis 2025](https://argentinosporlaeducacion.org/informe/aprender-2025-resultados-de-6-grado-para-la-primaria-argentina/).

**Límite de interpretación:** PISA y Aprender miden cohortes, constructos, escalas y años diferentes; sus porcentajes **no** se suman, comparan directamente ni prueban causalidad. Ninguna cifra demuestra que un tutor digital vaya a mejorar resultados.

**Por qué empezar con porcentajes:** son importantes para consumos, descuentos, estadísticas y ciudadanía; admiten problemas auténticos, modelos deterministas y corrección reproducible. Esta elección es una **hipótesis de producto**, no una prioridad curricular validada con la comunidad.

## 2. Evidencia pedagógica a traducir en decisiones

| Hallazgo externo | Calidad y limitaciones | Consecuencia propuesta |
| --- | --- | --- |
| La [EEF](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/metacognition-and-self-regulation) sintetiza **355 estudios** sobre metacognición y autorregulación; estima un impacto promedio equivalente a **+8 meses** en los contextos estudiados. | Evidencia de síntesis amplia, pero resultados heterogéneos; muchas intervenciones no fueron evaluadas independientemente. No es un pronóstico para Aprendauta. | Integrar preguntas explícitas sobre estrategia, explicación del error y retirada de andamiaje dentro de una materia concreta. |
| [EEF: feedback](https://educationendowmentfoundation.org.uk/index.php/education-evidence/teaching-learning-toolkit/feedback) encuentra un efecto promedio equivalente a **+6 meses** en intervenciones estudiadas. | Efectos contextuales; la retroalimentación digital no necesariamente replica el impacto presencial. | Dar feedback procesable, no solo «correcto/incorrecto». |
| [Dunlosky y cols. (2013)](https://doi.org/10.1177/1529100612453266) asignan mayor utilidad global a **pruebas de práctica y práctica distribuida** en su revisión de técnicas de estudio. | Revisión general con variaciones por edad, materia y condiciones. No reemplaza pruebas del producto. | Separar intentos de práctica de evaluaciones autónomas; planear repaso diferido tras el demostrador. |
| La [guía EEF de matemática para 9–14 años](https://educationendowmentfoundation.org.uk/education-evidence/evidence-reviews/mathematics-in-key-stages-2-and-3) revisa evidencia para la enseñanza en edades próximas al recorte propuesto. | Contexto del Reino Unido; aplicación a currículos argentinos exige ajuste y validación. | Priorizar conceptos, representaciones y justificación, no únicamente ejercicios repetitivos. |
| [UNESCO (2023, actualizada 2026)](https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research?hub=253682) propone protección de datos, validación humana y uso de IA generativa sensible a la edad. | Orientación institucional, no estudio de eficacia de un producto. | Primer demostrador **sin IA generativa**; IA futura opcional y con controles específicos para menores. |

**Precaución:** los «meses adicionales» de las síntesis EEF representan promedios de intervenciones investigadas y no se trasladan matemáticamente a una app, grupo ni contexto argentino.

## 3. Alternativas antes de construir

| Herramienta | Qué ofrece, según documentación disponible | Decisión provisional |
| --- | --- | --- |
| [Kolibri](https://learningequality.org/kolibri/about-kolibri/) ([código](https://github.com/learningequality/kolibri)) | Plataforma gratuita **offline-first** orientada a enseñanza con conectividad limitada; repositorio público con licencia MIT. | **Estudiar integración/reutilización** si el problema real pasa por distribución escolar offline. No clonar un LMS. |
| [H5P](https://h5p.org/) ([licencias](https://h5p.org/licensing)) | Tipos de contenido interactivo reutilizables; distintas piezas pueden tener condicionantes de licencia, incluida una biblioteca PHP GPL. | **Probar autoría/importación** de actividades; auditar compatibilidad y accesibilidad antes de integrar. |
| [Moodle + H5P](https://docs.moodle.org/500/en/Interactive_Content_-_H5P_activity) | Ecosistema de LMS con actividades H5P. | **Evaluar uso institucional** si docentes requieren aulas, usuarios y reportes; no implementar LMS propio prematuramente. |
| [ASSISTments](https://www.assistments.org/) | Herramienta conocida de práctica y apoyo a docentes. | **Pendiente de revisión técnica y de licencia**. No asumir apertura del código o capacidad de integración. |

**Elegimos implementar solamente un circuito pedagógico comprobable** (diagnóstico → práctica con pistas → transferencia autónoma). Esa lógica de dominio es reducida, portable y funciona sin proveedor de IA. Comparar opciones de hospedaje, uso offline y contenidos antes de agregar infraestructura institucional.

## 4. Preguntas que requieren docentes

1. ¿Qué errores aparecen al convertir fracción ↔ porcentaje y al calcular descuentos?
2. ¿Qué aprendizajes previos deben dominar estudiantes de 11–14 años?
3. ¿Los números y contextos propuestos son significativos, apropiados e inclusivos?
4. ¿Qué tipos de explicación y representación ayudan a comprender en lugar de memorizar?
5. ¿Cómo diseñar dos versiones equivalentes de una evaluación sin filtrar respuestas?
6. ¿Qué dificultades de accesibilidad, conectividad y seguimiento encuentran?
7. ¿Qué recursos existentes usan y qué deberíamos **reutilizar**?
8. ¿Qué evidencia mínima justificaría un piloto controlado?

## 5. Decisión

**Proseguir con un demostrador mínimo de porcentajes, sin menores, sin cuentas ni IA, y someterlo a revisión.** La aprobación de pruebas unitarias verifica funciones del software, **no su eficacia educativa**. La entrada de estudiantes reales queda bloqueada hasta completar seguridad infantil, revisión pedagógica y autorizaciones.

## Bibliografía / trazabilidad

Fuentes consultadas el 17-10-2026: OCDE PISA 2022, Secretaría de Educación Aprender 2023/2024/2025, informe Argentinos por la Educación Aprender 2025, EEF Metacognition and Self-regulation (actualización 2025), EEF Feedback, EEF Mathematics KS2–3, Dunlosky et al. (2013), UNESCO Guidance for Generative AI (2023, página actualizada 2026), Learning Equality Kolibri, H5P y Moodle Docs. Las URLs directas aparecen en cada fila; se revisará la literatura primaria, tamaño de efecto y aplicabilidad local antes del piloto.
