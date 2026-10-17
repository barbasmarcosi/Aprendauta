# Aprendauta · Plan de evolución de la experiencia de aprendizaje (v2)

**Estado:** propuesta de implementación para revisión, **no funcionalidades ya construidas**. **Fecha:** 17/10/2026.
**Foco:** convertir el demostrador de porcentajes en una experiencia educativa que despierte curiosidad, permita experimentar, ayude de distintas maneras y compruebe comprensión autónoma.

## 1. Tesis y criterio rector

Hoy el recorrido ofrece nueve ejercicios lineales, una práctica guiada con figuras y reglas deterministas de feedback, evaluaciones independientes y una PWA estática. La base técnica es aprovechable, pero **un recorrido de preguntas no equivale a una aventura de descubrimiento**.

> Diseñar experiencias donde el estudiante quiera entender **por qué** ocurre algo, pueda comprobar sus ideas y luego resolver situaciones nuevas por sí mismo.

El resultado de éxito no es más tiempo en pantalla ni mayor uso de IA: es autonomía, transferencia, comprensión y confianza bien calibrada. Motivación y atractivo visual son medios, no métricas sustitutivas.

## 2. Evidencia y límites de esta planificación

**Observaciones verificables de la demo actual (fuente: `src/app.mjs`, `src/engine.mjs`):**
- Entrada directa a preguntas de evaluación; hay portada, pero no una situación manipulable que despierte curiosidad.
- Tres fases y nueve ejercicios; `state.index` avanza linealmente, sin elección de misiones.
- Tres ilustraciones de contenido en práctica; no son manipulables.
- Un máximo de dos intentos y pistas en práctica; reglas de error para algunas respuestas típicas, no adaptación multinivel.
- Evaluaciones inicial/final sin pistas; devolución descriptiva diferida y resultados por competencias.
- Botón técnico «alternar formularios A/B», vocabulario técnico en el cierre.
- Sin cuentas, backend, modelos, analítica ni progreso persistente; Pages/PWA preparada para distribución.

**Auditoría exploratoria en navegador:** se recorrieron los nueve ejercicios con respuestas correctas e incorrectas y se revisaron ayudas/resumen. Es una inspección heurística simulando la perspectiva de 11–14 años, **no** una prueba de usabilidad con chicos ni una evaluación pedagógica externa. Hallazgos subjetivos como «aburrido», «ansioso» o «motivador» son **hipótesis**, no datos observados en estudiantes.

**Precisión sobre accesibilidad:** `aria-hidden="true"` en las partes decorativas de un gráfico no es por sí mismo un defecto si la figura presenta una alternativa accesible (el código actual utiliza `figure` con `aria-label` y leyenda). Debe verificarse el resultado real con lectores de pantalla, no asumir que es inaccesible ni que está resuelto.

## 3. Objetivos pedagógicos del primer incremento

**P1 · Comprender el todo y la parte.** Explicar que un porcentaje depende de un valor de referencia.
**P2 · Predecir y contrastar.** Anticipar qué pasa al modificar un descuento; justificar la predicción.
**P3 · Comparar estrategias.** Resolver el mismo problema con barra, fracción y cálculo.
**P4 · Aprender del error.** Reconocer cuándo confundió rebaja, importe y precio final sin recibir un juicio sobre su capacidad.
**P5 · Transferir de modo independiente.** Resolver una situación nueva sin interacción manipulable, pistas ni IA.

La unidad de porcentajes, población sugerida de 11–14 años y nivel de dificultad siguen siendo **hipótesis a validar con docentes**.

## 4. Recorrido objetivo: primero descubrir, después demostrar

| Momento | Experiencia visible para estudiante | Protección pedagógica |
| --- | --- | --- |
| A · Intriga | Situación cercana: «¿Qué oferta te conviene?», sin ecuaciones iniciales | No revelar la solución del desafío independiente |
| B · Predicción | «Si el descuento sube, ¿el precio final sube o baja?» | Elegir/justificar antes de mostrar resultado |
| C · Exploración | Manipular porcentaje y ver barra, monto ahorrado y precio final cambiar | Ejemplo de práctica explícitamente marcado; valores distintos de evaluación |
| D · Mini desafío | Resolver un precio nuevo; elegir «probar», «pedir pista» o «ver otra explicación» | Feedback gradual, sin clasificar al alumno |
| E · Explicación | Conectar visual ↔ fracción ↔ ecuación, volver a intentar | Retirar soporte en pasos sucesivos |
| F · Transferencia | Problema nuevo sin ayuda, con opción «No sé todavía» | Evaluación separada, no contaminada por práctica |
| G · Cierre | «Descubriste que el descuento es una parte del precio» + razones y opciones siguientes | Mostrar evidencia descriptiva y límites, no una promesa de mejora |

### Separación estricta entre aprender y medir

El demostrador actual realiza **diagnóstico antes de practicar**. No es correcto trasladar la actividad manipulable antes del diagnóstico **si luego se pretende interpretar el diagnóstico como línea de base no intervenida**.

Solución de producto:
- **Modo Explorar (predeterminado en la demo):** empezar con intriga y manipulación. El eventual primer desafío posterior ya NO se presenta como pretest; la pantalla final habla de desafíos resueltos, no de «antes vs. después».
- **Modo Revisión/Evaluación (solo personas adultas autorizadas):** entrada neutral sin instrucción; línea de base independiente A/B; práctica; transferencia independiente con conjunto no expuesto; sin mostrar soluciones hasta finalizar. Las métricas se tratan como exploratorias hasta validar equivalencia y protocolo. No mezclar datos de ambos modos.
- El selector técnico A/B desaparece de la interfaz del alumno: queda controlado desde un modo de revisión o configuración de desarrollo, **nunca como botón de aprendizaje**.

No se compararán tasas de acierto entre pruebas distintas para afirmar «aprendiste X %».

## 5. Primer vertical slice: «Detective de ofertas»

Una sola misión completa antes de construir un catálogo de contenidos.
- Una feria anuncia precios y descuentos. El objetivo es averiguar **qué pagás realmente**, no acumular puntos.
- Manipulador de descuentos 0–50 % en incrementos discretos, con un valor de referencia claro; permite predicciones y contraste.
- Estado visible: precio original, ahorro, precio final y porcentaje. Reforzar la igualdad `precio_final = precio_original × (1 − descuento/100)`.
- Después introducir descuentos con cantidades y contextos nuevos: transferencia sin slider ni feedback inmediato.
- Incluir un ejemplo donde dos descuentos porcentuales sobre precios **distintos** muestren por qué el mayor porcentaje no siempre implica pagar menos.
- Utilizar **valores definidos por contenido y solución determinista**, nunca validación matemática hecha por LLM.

No es una economía simulada, tienda real, adquisición ni sistema de compras.

## 6. Diseño: emoción sin manipulación

- **Entrada:** un reto concreto, una pregunta corta y una acción evidente. Estimar una duración orientativa únicamente tras medir recorridos de prueba, evitando precisión inventada.
- **Agencia:** opciones «Probá con barras», «Pensalo con fracciones», «Ver un ejemplo diferente», «No sé todavía».
- **Ritmo:** permitir pausas, reiniciar ejemplos y revisar explicaciones de práctica. No retroceder sobre evaluaciones ya enviadas para cambiarlas.
- **Feedback:** reconocer ideas y estrategias específicas («Notaste que el ahorro aumenta») en lugar de halagos genéricos o «¡sos un genio!».
- **Error seguro:** sin penalizaciones por pedir pistas, etiquetas «mal alumno» ni humillación. «Esa respuesta coincide con la rebaja; ¿cuánto queda por pagar?».
- **Cierre:** una idea aprendida, una pregunta nueva del mundo real y posibilidad de volver a explorar; sin pantallas que promuevan uso infinito.
- **Visual:** colores consistentes, jerarquía clara, poco texto por pantalla, objetivos táctiles adecuados, contraste y animaciones opcionales que respeten movimiento reducido.
- **Opciones futuras:** temas elegibles (deportes, ciencia, música, compras) solo si sirven a la misma competencia, tienen contenidos revisados y no añaden sesgos culturales.

## 7. Qué se conserva y qué NO se construye ahora

**Se conserva:** PWA + GitHub Pages, HTML/CSS/ES modules, motor de corrección determinista, conjuntos A/B de revisión, reglas de ayuda específicas como hipótesis, contenido versionado y pruebas unitarias.

**Se pospone:** chatbot libre, agentes, paneles administrativos grandes, gamificación de rachas, rankings, puntos por tiempo conectado, múltiples materias, cuentas infantiles, seguimiento comercial, redes sociales, microservicios, APIs pagas.

No necesitamos cambiar de framework para probar este diseño. Cualquier dependencia nueva debe justificar accesibilidad, mantenimiento, licencias, tamaño y costo operativo.

## 8. Cambios concretos esperados (en orden)

1. Diseño del flujo y eliminación de jerga de investigación en la pantalla del alumno.
2. Motor de interacción **predecir → manipular → explicar → resolver** con controles accesibles.
3. Tutoría adaptativa determinista, reversible y **sin diagnóstico del estudiante**.
4. Misiones con elección acotada y cierre que invita a transferir fuera de la aplicación.
5. Pruebas de accesibilidad, QA móvil/PWA, revisión docente; solo entonces considerar otro dominio.
6. Diseño de evaluación responsable y preparación de controles infantiles antes de cualquier sesión con menores.

**Lecturas relacionadas:** [guion de misión](MISION_DESCUENTOS_V2.md), [contratos y decisiones técnicas](ARQUITECTURA_INTERACTIVA_V2.md), [roadmap de ejecución](EJECUCION_V2.md), [validación y puertas de calidad](VALIDACION_V2.md), [principios educativos](../02_PRINCIPIOS_PEDAGOGICOS.md), [seguridad](../04_PROTECCION_INFANCIA_Y_DATOS.md).

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
| --- | --- |
| Slider que muestra resultado antes de pensar | Predicción previa obligatoria en tarea exploratoria, luego manipulación; transferencia sin controles |
| Disfrazar un examen de videojuego | Evaluación no predeterminada como puerta de entrada; desafío con sentido y elección |
| Sobreestimación de aprendizaje | Distintos ítems y modo de evaluación aislado; no atribuciones causales |
| Exceso de estímulos | Animaciones discretas, reducción de movimiento y opción sin interacción compleja |
| Dependencia de pistas | Ayuda graduada con retirada progresiva; permitir «No sé todavía» sin castigo |
| Accesibilidad aparente | Pruebas por teclado, lector de pantalla, zoom, sin color como único canal |
| Sesgos en contextos | Revisión docente y de lenguaje; versiones culturalmente pertinentes |
| Inferencias psicológicas | Confianza voluntaria solo como observación puntual, sin perfil ni almacenamiento |
| Recopilar datos infantiles al persistir progreso | No hacerlo en este incremento; análisis legal y consentimiento primero |
