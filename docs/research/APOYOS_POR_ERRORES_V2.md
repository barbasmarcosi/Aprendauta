# Apoyos por indicios de errores en porcentajes — v2

**Estado: prototipo para revisión docente, no diagnóstico educativo validado.**

## Qué hace

Durante **práctica guiada**, una respuesta numérica equivocada puede coincidir con resultados de procedimientos comunes. El programa compara ese valor con una lista de **ejemplos redactados manualmente** y ofrece una hipótesis prudente de la confusión, una pregunta de control y una estrategia de representación alternativa. Si no reconoce el número, utiliza feedback general sin inventar una explicación.

**No infiere la causa real**, no describe rasgos del alumno, no adapta su perfil a futuro y no guarda registros. Dos estudiantes podrían dar exactamente la misma respuesta por razones distintas: por eso las intervenciones dicen «quizás», «podría» o «coincide con». No hay IA, modelo predictivo ni seguimiento.

## Tabla de reglas iniciales

| Actividad | Posibles valores observados | Hipótesis que conviene comprobar |
| --- | --- | --- |
| p1: 20 % de 150 libros | 20, 150, 3000, 0,2 | Confundir la tasa con la cantidad; tomar el total por la parte; usar 20 como multiplicador; quedarse en la forma decimal |
| p2: 3 de cada 5 | 0,6; 40; 3 | Quedarse en la forma decimal; tomar el complemento; tomar el numerador aislado |
| p3: precio $400 y rebaja 20 % | 80, 400, 480, 380, 20 | Entregar descuento y no importe final; ignorar descuento; sumarlo; restar 20 pesos; responder solo la tasa |

Una coincidencia **es un indicio y nunca un diagnóstico**. El código de cada regla es interno al contenido, no una etiqueta persistente del estudiante.

## Restricciones activas

- Solo opera si el ejercicio tiene `phase=practice`, y la respuesta es **numérica, válida e incorrecta**.
- Se ofrece una pregunta específica en el primer intento incorrecto; el segundo intento completa la práctica, y recién entonces se publica la solución desarrollada.
- No se muestra en diagnóstico inicial ni en transferencia final, aunque la respuesta coincida con la tabla.
- Las representaciones, pistas y apoyo alternativo aparecen **sin responder automáticamente** el problema.
- Respuestas no conocidas reciben orientación neutral; jamás se inventan motivos psicológicos o cognitivos.
- La información se mantiene solo en memoria durante la sesión: sin perfil, servidor, cookies ni logs de entradas.
- Se testea que ningún valor de una regla sea correcto y que no existan reglas duplicadas para el mismo ejercicio.

## Criterios de revisión con docentes

1. Resolver cada problema y explicar al menos dos procedimientos correctos.
2. Mostrar cada valor de error «observado» de la tabla: ¿es un procedimiento plausible o estamos sobreinterpretando?
3. Revisar cada pregunta: ¿ayuda a identificar el paso problemático sin revelar la respuesta?
4. Revisar la explicación alternativa: ¿es apropiada para primaria avanzada / secundaria inicial?
5. Probar casos desconocidos, entradas ambiguas y respuestas correctas: ¿el sistema evita encasillar?
6. Verificar el bloqueo de cualquier apoyo durante las actividades independientes.
7. Definir qué errores requieren intervención humana y qué cambios serían prioritarios.

## Limitaciones y siguiente experimento

El feedback por reglas no prueba que se aprenda más. Un estudio posterior puede contrastar feedback genérico contra pregunta contextual con otro intento, en actividades equivalentes y una medida autónoma posterior; requiere consentimiento, protección infantil y revisión docente.

## Referencias

- [EEF: Responding to assessment / Addressing misconceptions](https://educationendowmentfoundation.org.uk/newsletter/improving-mathematics-in-key-stages-2-and-3-email-course-1).
- [EEF: Eedi diagnostic questions](https://educationendowmentfoundation.org.uk/projects-and-evaluation/projects/diagnostic-questions/); su evaluación sufrió limitaciones y no pudo estimar el impacto previsto sobre rendimiento.
- [EEF: Digital Feedback in Primary Maths](https://educationendowmentfoundation.org.uk/projects-and-evaluation/projects/digital-feedback-in-primary-maths); un ensayo reportó resultado promedio **0 meses**, así que no asumimos eficacia por incorporar software.
