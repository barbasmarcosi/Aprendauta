# Validación de Aprendauta v2 · calidad, docentes y protección de menores

**Estado:** protocolo futuro. No constituye consentimiento, revisión ética ni evidencia de impacto.

## A. Hipótesis diferenciadas

| Identificador | Hipótesis | Qué podría refutarla | Cómo se estudia |
| --- | --- | --- | --- |
| H-UX1 | El desafío narrativo aclara por qué aprender porcentajes | Personas adultas no entienden meta/CTA, o llegan a una respuesta sin razonar | Prueba de tareas con adultos, registro de confusiones |
| H-UX2 | Manipular una barra ayuda a relacionar parte, todo y porcentaje | La representación induce interpretaciones erróneas o distrae | Entrevistas docentes, comparación de explicaciones |
| H-PED1 | Feedback alternativo ofrece ayuda distinta tras error | Repite un consejo o filtra solución | Auditoría de reglas con errores sintéticos y docentes |
| H-PED2 | Puede resolverse transferencia sin apoyo | Acertar solo mientras está el manipulador | Problemas nuevos independientes, y eventualmente diferidos |
| H-EQ1 | Modalidades táctil, teclado y lector de pantalla ofrecen aprendizaje equivalente | Una vía requiere visión/color o produce desorientación | QA asistivo y revisores competentes |
| H-SAFE1 | El flujo evita presión, estigmas y datos innecesarios | Rankings, mensajes culpabilizantes o datos persistidos | Revisión de texto, red y almacenamiento |

**No extrapolar** resultados de evaluaciones en adultos a menores; una demo que gusta no demuestra aprendizaje.

## B. Puertas de calidad y salida

### G0 · Antes de implementar
- [ ] Aprobadas competencias y prerrequisitos tentativos por revisión técnica interna.
- [ ] Borradores de misión, escenas, variantes y ayudas; términos claros para revisión docente.
- [ ] Política de separación de exploración y evaluación acordada.
- [ ] Solución sin IA, sin cuentas ni persistencia; costos acotados y disponibilidad offline.

### G1 · Antes de publicar una nueva demo técnica
- [ ] `npm test` sin fallos; cálculos exactos + frontera/decimales y todas las ramas de reglas.
- [ ] Flujo completo con entrada correcta, incorrecta, vacía y «No sé».
- [ ] No aparecen pistas/soluciones ni resultados durante evaluación independiente.
- [ ] La barra/fracción/tabla coincide siempre con el precio calculado.
- [ ] No hay excepciones JavaScript, scroll horizontal ni bloqueo de teclado.
- [ ] UI probada en al menos móvil angosto y escritorio; rotación y zoom.
- [ ] Manifiesto/servicio offline probados desde HTTPS, no solo archivos abiertos localmente.
- [ ] Sin rastreadores, cookies de seguimiento, registros de respuestas ni llamadas API de alumnos.
- [ ] Publicación identificada por SHA/Actions; posibilidad de volver a una versión sana.
- [ ] Capturas/QA usan solo datos ficticios y **no incluyen menores**.

### G2 · Revisión pedagógica externa (personas adultas)
- [ ] Docentes de fin de primaria y comienzo de secundaria revisan la corrección y pertinencia.
- [ ] Verifican si los gráficos comunican qué es el «todo» y el «resto».
- [ ] Revisan alternativas de ayuda ante descuentos, tasas y bases diferentes.
- [ ] Discuten si el inicio despierta curiosidad sin contaminar el modo evaluativo.
- [ ] Revisan lenguaje, motivación, errores que desaniman y riesgo de inducción de respuesta.
- [ ] Clasifican observaciones: bloqueo, importante, oportunidad; registro sin identificadores.
- [ ] Se corrigen bloqueos matemáticos, accesibles y de seguridad antes de seguir.

**Meta organizativa, no evidencia de representatividad:** solicitar revisión cualitativa de 3–5 docentes; número revisable y sin implicar análisis estadístico.

### G3 · Accesibilidad y UX profesional
- [ ] Revisiones con teclado y lector de pantalla real, no solo inspección de atributos ARIA.
- [ ] Captions y `aria-label` comprobados con voz; elementos decorativos ocultos si existe alternativa equivalente.
- [ ] Manipulador con control accesible alternativo y valores anunciados sin ruido continuo.
- [ ] Tamaños táctiles/zoom, relación contraste y movimiento reducido verificados.
- [ ] Foco y navegación back/forward coherentes; no poder alterar respuestas evaluativas ya enviadas.
- [ ] Advertencias técnicas separadas de interfaz infantil, sin ocultar transparencia.
- [ ] «Modo seguro de fallo»: si una visual no carga, se puede aprender y contestar por texto.

### G4 · Puerta obligatoria para cualquier interacción real con menores

**Bloqueada actualmente.** Requiere los controles de [protección de infancia](../04_PROTECCION_INFANCIA_Y_DATOS.md) y el issue de seguridad infantil existente:
- [ ] Revisión jurídica de tratamiento/consentimiento aplicable, finalidad y responsables.
- [ ] Análisis de riesgos de privacidad y seguridad infantil con mitigaciones comprobadas.
- [ ] Autorizaciones institucionales/familiares necesarias, información comprensible y derecho a retirarse.
- [ ] Protocolo de incidentes, responsables humanos y supervisión.
- [ ] Revisión de equidad, accesibilidad y adecuación de edad/currículo.
- [ ] Instrumentos de evaluación independientes de la práctica, y diseño ético del estudio.
- [ ] Evaluación de retención diferida y comparación pertinente cuando esté justificada.

**Un despliegue público en Pages no equivale a autorización para probar con alumnos.**

## C. Rúbrica de tareas para personas adultas

Para la misión de descuentos, pedir al evaluador adulto:
1. Explicar de qué se trata la misión antes de interactuar.
2. Predecir qué cambia si varía descuento o precio base.
3. Usar control con táctil y solo teclado y explicar qué representa la barra.
4. Introducir deliberadamente `importe_rebaja`, `precio_original` y un valor no esperado.
5. Pedir pista, probar otra representación y describir qué aporta cada una.
6. Resolver un problema nuevo sin ayuda y examinar devolución.
7. Instalar la PWA, probar modo avión y comprobar que no guarda respuestas.
8. Identificar frases que un adolescente podría malinterpretar o que le generarían presión.

Registrar: tarea, acción, problema observado, impacto en comprensión, gravedad, sugerencia. **Sin nombres ni datos escolares en issues públicos.**

## D. Criterios de aprobación en revisión

**Bloqueo:** cálculo o representación incorrecta, filtrar soluciones independientes, falta de equivalencia accesible, fuga de datos, contenidos inadecuados, errores que impiden completar misión.

**Importante:** confusión repetida, pérdida de progreso sorpresiva, feedback poco útil, jerga o sobrecarga informativa.

**Mejora:** afinado visual, microanimación opcional, diversificación de contextos.

No compensar errores matemáticos con buena estética. No calificar «cumplido» hasta contar con evidencia concreta (tests, capturas, informe adulto o revisión docente). Separar cobertura de tests de validez educativa.

## E. Cómo evaluar aprendizaje sin inflar resultados

- Para evaluación válida mantener línea de base **anterior a toda explicación** y desafíos de transferencia sin ayuda, distintos a los manipulados.
- Medir también explicación/razonamiento con rúbrica docente, no solo precisión de un número.
- Introducir test diferido antes de afirmar retención.
- A/B por diseño ≠ equivalencia calibrada; no afirmar ganancia causal con nueve ítems.
- Evitar elogios dirigidos a inteligencia/persona; celebrar acciones, estrategias y perseverancia.
- Reportar resultados desfavorables y limitaciones, no solo conversiones o satisfacción.

## F. Resumen de evidencia requerida por PR futuro

```text
Cambio:
Hipótesis educativa:
Casos de prueba automatizados:
Prueba móvil/desktop:
QA accesibilidad:
Revisión de contenido/semántica:
Ausencia de ayudas en evaluación:
Privacidad/red/almacenamiento:
SHA de la demo:
Limitaciones:
Decisión: aprobar / corregir / bloquear
```

[Protocolo docente ya disponible](../research/PROTOCOLO_REVISION_DOCENTE_V1.md) · [Impacto educativo](../05_EVALUACION_DE_IMPACTO.md).
