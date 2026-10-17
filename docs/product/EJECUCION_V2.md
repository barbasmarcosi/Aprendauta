# Plan de ejecución v2 · De ejercicios a descubrimiento

**Estado:** aprobado para planificar/descomponer; **no** significa funcionalidades implementadas, evaluación educativa superada ni autorización para trabajo con menores. **Fecha:** 17/10/2026.

## Orden de trabajo y dependencias

| Paquete | Prioridad | Dependencias | Entregable verificable | Puerta |
| --- | --- | --- | --- | --- |
| **E0 · Diseño pedagógico** | P0 | Ninguna | Guion «Detective de ofertas» y microcopy sin jerga; separación explorar/revisión | G0 |
| **E1 · Misión mínima interactiva** | P0 | E0 | Predicción → manipulador accesible → explicación → desafío sin ayuda → cierre | G1 |
| **E2 · Ayuda multimodal** | P0 | E1 | Motor determinista de feedback contextual, cambio de representación y «No sé» | G1/G2 |
| **E3 · UX, agencia y lenguaje** | P1 | E1 | Elección guiada, volver en práctica, resumen por comprensión, no rachas | G1/G3 |
| **E4 · Evaluación aislada** | P0 | E0/E1 | Modo revisión con inicio independiente, A/B separados, no filtración, tests | G1/G2 |
| **E5 · Accesibilidad/PWA/calidad** | P0 transversal | E1–E4 | Teclado/táctil/voz, zoom/offline/QA móvil y despliegue por SHA | G1/G3 |
| **E6 · Validación externa adulta** | P0 para pasar a piloto | E0–E5 | Revisión docente, registro de hallazgos y decisión documentada | G2/G3 |
| **E7 · Evaluación con menores (NO GO)** | Bloqueada | E6 y controles legales/infantiles | Protocolo ético, autorizaciones, evaluación de privacidad | G4 |

G0–G4 están definidos en [VALIDACION_V2.md](VALIDACION_V2.md). **E7 no se implementa ni se ejecuta** durante el desarrollo del demostrador.

## Backlog ejecutable en GitHub

- **E0** — [#12 Diseño de misión y contenido](https://github.com/barbasmarcosi/Aprendauta/issues/12)
- **E1** — [#13 Misión interactiva](https://github.com/barbasmarcosi/Aprendauta/issues/13)
- **E2** — [#14 Ayuda y errores](https://github.com/barbasmarcosi/Aprendauta/issues/14)
- **E3** — [#15 UX y lenguaje](https://github.com/barbasmarcosi/Aprendauta/issues/15)
- **E4** — [#16 Evaluación independiente](https://github.com/barbasmarcosi/Aprendauta/issues/16)
- **E5** — [#17 Accesibilidad y PWA](https://github.com/barbasmarcosi/Aprendauta/issues/17)
- **E6** — [#18 Revisión docente](https://github.com/barbasmarcosi/Aprendauta/issues/18)

**Control de dependencias:** E0 → E1 → (E2, E3, E4); E5 acompaña toda la implementación; E6 requiere evidencias de los anteriores. E7 permanece bloqueado y depende del [issue #4 de seguridad infantil](https://github.com/barbasmarcosi/Aprendauta/issues/4).

## 1. Primer incremento que se debería implementar

**Objetivo único:** una misión «Detective de ofertas» con un ejemplo interactivo accesible y un problema independiente distinto. El resultado debe poder revisarse sin IA, en Pages y sin cuentas.

**Secuencia técnica recomendada:**
1. Crear pruebas de funciones matemáticas con casos 0/10/20/35/50 %, porcentajes límite y distintos precios base.
2. Extraer un `computeDiscount` determinista para que resultados y barra compartan una única fuente de verdad.
3. Implementar componente de manipulación con mouse, touch y teclado + vista solo texto.
4. Implementar predicción previa y una pregunta de reflexión; guardar solo estado temporal de pantalla.
5. Implementar desafío independiente no expuesto con calificación aislada del manipulador.
6. Habilitar «No sé todavía» y reintento guiado con representación alternativa en práctica; no filtrar solución.
7. Crear cierre comprensible para estudiantes con explicación y siguiente desafío opcional.
8. Verificar accesibilidad, UX móvil y modo avión después de publicar en `gh-pages`.
9. Registrar observaciones de personas adultas y revisar contenidos con docentes antes de afirmar valor pedagógico.

**Criterio de demo presentable:** una persona adulta puede completar la misión en móvil y teclado, justificar qué representa un 20 %, equivocarse sin estigmas y resolver un problema nuevo sin ver la respuesta. Eso sigue sin demostrar mejora de aprendizaje.

## 2. Qué no integrar en este incremento

- No desplegar un backend, servicio de identidad, perfiles, bases de datos o LLM.
- No cambiar de framework solo por estética; no crear una biblioteca genérica de minijuegos.
- No introducir rachas, temporizadores, tablas de posiciones, monedas ni publicidad.
- No convertir el control de precio en simulación de compras ni rastrear comportamiento.
- No abrir pruebas con niños por el hecho de que exista una URL accesible.

## 3. Criterios para aceptar trabajos por paquete

### E0 · Diseño pedagógico
- Define un objetivo por escena, lenguaje apropiado, representación alternativa no visual y reglas de no-ayuda.
- La intriga inicial no adelanta respuestas a tareas independientes.
- Identifica ejemplos de práctica frente a ítems evaluativos distintos.
- Se ofrece un contexto no comercial para revisión.

### E1 · Misión mínima interactiva
- Caso de prueba matemático y visual para cada porcentaje representativo; valores monetarios consistentes.
- Sin API, sin IA, sin mutación de estado de evaluaciones.
- Vía equivalente desde teclado y alternativa solo texto.
- En móvil pequeño, no hay controles fuera de pantalla, sobreposición ni scroll horizontal.
- La etapa independiente queda sin pista, slider, respuesta visible ni corrección precoz.

### E2 · Ayuda multimodal
- Error reconocido dispara **posible** confusión, nunca diagnóstico certero.
- Al fallar un enfoque, siguiente paso cambia estrategia o ejemplo, no repite el mismo texto.
- Elegir «no sé» nunca penaliza ni produce mensaje humillante.
- Pistas se registran solo en práctica (memoria temporal).

### E3 · UX, agencia y lenguaje
- El alumno no ve «A/B», «metacognición», «impacto causal» ni lenguaje de investigación.
- Decisiones comprensibles; ofrece volver/reexplorar en práctica y cierre sin bucles compulsivos.
- Animación opcional sin ocultar aprendizaje a quien activa `prefers-reduced-motion`.
- Se mantiene advertencia visible de prototipo no validado en la demo pública.

### E4 · Evaluación independiente
- Dos modalidades separadas: explorar no construye baseline; revisar tiene evaluación previa sin lección.
- Preguntas y parámetros de evaluación aislados del contenido manipulado.
- Enviar una respuesta bloquea su edición; soluciones solo al finalizar.
- No comparar resultado de práctica asistida con independencia como si fueran equivalentes.
- A/B no se presentan como equiparados.

### E5 · Calidad técnica
- Todos los tests preexistentes siguen verdes; tests nuevos cubren reglas, estados y navegación.
- QA manual web/iOS/Android según disponibilidad; lector de pantalla real pendiente hasta contar con recursos.
- PWA offline segura, sin persistencia de respuestas, rutas relativas en Pages.
- Cada cambio publicado asociado a commit y ejecución de Actions; no publicar cambios de documentación en la demo innecesariamente.

### E6 · Revisión externa
- Registrar por ítem errores matemáticos, ambigüedades y confusiones por edad.
- Cualquier corrección crítica de contenido se efectúa antes de una nueva evaluación.
- Documentar desacuerdos y decisiones con evidencia, sin nombres de estudiantes.
- No anunciar eficacia sin un estudio ético posterior.

## 4. Hitos y criterios de salida

**Hito H1 · Producto que invita a explorar:** E0 + E1; misión completa en demo técnica; G1 cumplida.

**Hito H2 · Acompañamiento sin dependencia:** E2 + E3 + E4; ayuda flexible y desafíos independientes protegidos; G1 nuevamente cumplida.

**Hito H3 · Calidad de producto:** E5; G3 técnica y revisión de accesibilidad pendientes de personas competentes, hasta completarse.

**Hito H4 · Calidad educativa preliminar:** E6; G2 con docentes y limitaciones documentadas.

**Hito H5 · Piloto futuro:** solo si G4 se cumple por completo y hay autorización. No forma parte de este ciclo.

No asignar fechas arbitrarias ni porcentajes de avance. El progreso se informa por entregables observables y pruebas.

## 5. Estrategia de PR y despliegue

- Mantener **`main` intacta**. Esta planificación deriva de `feature/pwa-github-pages-v1` / PR #10.
- Crear un PR por paquete o incremento vertical integrado, en ramas separadas y con evidencias de QA.
- Reutilizar el entorno Pages existente solo para demos técnicas ya verificadas en rama `gh-pages`.
- **No fusionar** automáticamente PR de planificación ni código, y no cambiar ramas base sin verificar SHA.
- Toda PR nueva debe indicar: hipótesis, capacidad real implementada, tests, riesgo de accesibilidad y protección infantil, SHA y URL de prueba si la hubiera.

## 6. Trazabilidad

- [Visión y decisiones](PLAN_EXPERIENCIA_V2.md)
- [Guion/ítems de la misión](MISION_DESCUENTOS_V2.md)
- [Diseño técnico](ARQUITECTURA_INTERACTIVA_V2.md)
- [Puertas de aceptación](VALIDACION_V2.md)
- [Issues originales de requisitos y contenido](https://github.com/barbasmarcosi/Aprendauta/issues/3)
- [Issue de protección infantil](https://github.com/barbasmarcosi/Aprendauta/issues/4)

Los issues nuevos del backlog deben enlazarse a este documento; la agenda se puede reorganizar sin alterar la misión.
