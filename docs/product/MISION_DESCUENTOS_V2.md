# Especificación de misión v2 · «Detective de ofertas»

**Estado:** diseño pedagógico y de UX para prototipo, aún no desarrollado ni validado.

## 1. Propuesta de situación

«En la feria del barrio hay dos ofertas. ¿Cómo sabrías cuál conviene sin que te lo diga nadie?»

Dos productos ficticios con precios de lista claros (por ejemplo, $20.000 con 20 % de descuento y $18.000 con 10 %). **Importa el precio final, no solo el número grande en el cartel.** Cuidado con precios irreales o sesgo hacia alumnado con mayor poder adquisitivo: pedir revisión contextual docente, ofrecer una variante no comercial sobre recursos/porciones.

### Microhistoria / pantallas

**Pantalla 1 — Invitación:** imagen o composición simple de dos carteles, mensaje de una línea, botón «Quiero descubrirlo». Que el texto breve conviva con alternativa sin imagen.

**Pantalla 2 — Tu predicción:** «Si aumentamos el descuento de esta oferta, ¿qué pasa con lo que pagás?» Opciones *Baja*, *Sube*, *No sé*. Se registra solo temporalmente. No emitir juicio instantáneo; invitar a experimentar.

**Pantalla 3 — Laboratorio:** control discreto de porcentaje (0, 5, 10…50), barra de parte/descuento y precio restante; mostrar precio original, ahorro y total de forma congruente. Visualizar en tiempo real **solo durante exploración**.

**Pantalla 4 — Descubrimiento:** «Un 20 % de descuento significa dejar de pagar 20 de cada 100 pesos del precio original». Mostrar representaciones equivalentes: barra / 100 casilleros / fracción / cuenta. Preguntar «¿el 20 % siempre son los mismos pesos?» y dar contraejemplo con precio base diferente.

**Pantalla 5 — Tu turno:** presentar precio y porcentaje nuevos; respuesta o estrategia elegida, sin revelar resultado. Si hay dificultad: pregunta → pista conceptual → representación alternativa → problema intermedio → explicación y nuevo problema. Si quiere, botón «No sé todavía».

**Pantalla 6 — Desafío independiente:** usar un contexto no idéntico (no repetir los valores mostrados), sin slider, soluciones ni hints. Confirmar el envío antes de pasar; no permitir editar después. Al finalizar mostrar revisión.

**Pantalla 7 — Cierre:** «Ya podés preguntarte cuál es el precio de referencia y distinguir rebaja de precio final». Mostrar lo que logró **en esta sesión** y una invitación opcional: «Buscá un porcentaje en una noticia o folleto y pensá qué significa»; no pedir que lo suba.

## 2. Estados y transiciones

`intro → prediction → exploration → reflection → guided_attempt → guided_feedback/retry → independent_challenge → debrief → finish`.

- `prediction`: `baja|sube|no-se` o `skip`; nunca penaliza.
- `exploration`: el manipulador actualiza una única fuente de verdad; cambiar control no afecta ninguna evaluación.
- `guided_attempt`: aceptar valores numéricos con separador decimal local; ejemplos creados por docente, validador exacto/tolerancia explícita.
- `guided_feedback`: en error, aplicar reglas publicadas **sin afirmar causa psicológica**; ofrecer explicación diferente. No repetir la misma ayuda tres veces.
- `independent_challenge`: sin ayudas, manipulador, solución previa ni adaptaciones que filtren respuestas. `no-se` es una respuesta válida no acertada, sin castigo emocional.
- `finish`: se pueden leer soluciones **después** de concluir; volver a explorar con ejemplo nuevo.
- `reset`: volver a cero y limpiar estado temporal. Interrupción: no persistir por defecto; avisar antes de salir si se perderá avance.

## 3. Demostración conceptual concreta

Para un precio base de $20.000:

| Descuento | Ahorro | Precio final |
| ---: | ---: | ---: |
| 0 % | $0 | $20.000 |
| 10 % | $2.000 | $18.000 |
| 20 % | $4.000 | $16.000 |
| 35 % | $7.000 | $13.000 |
| 50 % | $10.000 | $10.000 |

**Invariantes matemáticos:** `ahorro + final = original`; porcentajes en `[0,100]`; los montos no pueden volverse negativos; controlar unidades/redondeo explícitamente. Usar cantidades fáciles al principio; contemplar divisiones no exactas como extensión.

La representación siempre debe expresar el **mismo total** que el cálculo. El color no es el único indicador del resultado. Los textos y cifras no se actualizan de una forma que sobrecargue un lector de pantalla.

## 4. Catálogo de ayuda revisable

| Evento | Hipótesis acotada | Pregunta / acción siguiente |
| --- | --- | --- |
| Respondió «20» al calcular 20 % de 150 | Quizás confundió tasa con cantidad | «¿Buscamos 20 libros o 20 de cada 100?» + cinco grupos |
| Respondió el importe del descuento en lugar del precio final | Quizás olvidó restar al total | «¿Te piden lo que se ahorra o lo que se paga?» + barra restante |
| Respondió el precio original | Quizás no aplicó rebaja | «¿Qué cambia cuando hay descuento?» + comparación antes/después |
| Respondió un precio mayor que el original | Posible confusión entre aumento y descuento | Representación gráfica y estimación del tamaño |
| Error no reconocido | No inferir su razonamiento | «¿Qué representa tu número?» + opción de otro ejemplo |
| Pide ayuda sin respuesta previa | Necesita andamiaje, no etiqueta | Dar pista conceptual sin obligarlo a fallar primero |
| Declara «No sé todavía» | Incertidumbre normal | Ofrecer ejemplo guiado en práctica; registrar no resuelto en evaluación |

Reglas sujetas a [validación pedagógica](VALIDACION_V2.md). No hay LLM de juez. La confianza opcional no cambia las soluciones ni se convierte en diagnóstico.

## 5. Dos modalidades, jamás confundirlas

- **Explorar:** la misión empieza con predicción y experimento; no generar afirmaciones de progreso «antes/después».
- **Evaluación para adultos:** diagnóstico sin lección previa → práctica → transferencia con par de ítems no expuestos; no mostrar respuestas tempranas, permitir seguimiento de resultados **solo en memoria**. Las formas A/B son candidatas no calibradas.

Un estudiante puede sentirse capaz de resolver algo después de practicar; eso no significa que haya desarrollado retención ni autonomía transferible. La prueba diferida es futura y requiere protocolo validado.

## 6. Contratos de contenido por ítem (campos mínimos)

`missionId, competencyId, learningObjective, prerequisiteIds, phase, context, prompt, unit, referenceWhole, expected, solutionMethod, alternativeMethods, visualModel, feedbackRules, graduatedHints, noHelpPolicy, accessibilityText, sourceAndLicense, authoringVersion`.

- `expected` deriva de parámetros numéricos seguros, no se copia manualmente en lugares distintos.
- `noHelpPolicy`: cerrado en evaluación independiente; jamás reutilizar una instancia de ejercicio explorada.
- El contenido tiene que funcionar también en una experiencia **solo texto y teclado**.
- Toda variación en dificultad y equivalencia A/B requiere criterio docente, no solo parámetros aleatorios.

## 7. Casos incómodos a resolver

- Cambio de porcentaje con foco en control; feedback no debe repetir un anuncio por cada unidad.
- Rotación del teléfono o zoom del 200–400 %; números largos deben caber sin desplazamiento horizontal.
- Preferencia `prefers-reduced-motion`, contraste fuerte y modo sin gráficos complejos.
- Sin conexión tras instalación PWA; no introducir assets externos imprescindibles.
- Intentar volver desde el navegador a una evaluación enviada no permite alterar una calificación.
- Al cerrar por accidente, el recorrido se pierde por privacidad; advertirlo **sin diálogos molestos por cada cambio**.
- Si la persona elige no responder, no forzarla a entregar datos/confianza.

## 8. Puntos de aprobación por un docente

Revisar corrección numérica, contexto, sesgos, claridad de «todo/parte», adecuación por edad, pistas, contraejemplos, dificultad del desafío independiente, alternativas para discapacidad visual, límites del uso de compra/consumo como única temática y ausencia de soluciones filtradas.
