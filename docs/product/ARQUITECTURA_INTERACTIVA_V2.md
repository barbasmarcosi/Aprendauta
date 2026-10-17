# Diseño técnico de experiencia interactiva y adaptación v2

**Naturaleza:** propuesta de implementación; no supone migrar de stack ni incorporar IA.

## Decisión preferida

Mantener la PWA estática en GitHub Pages y los módulos JavaScript existentes hasta demostrar que hay una necesidad real de complejidad adicional. Extraer los conceptos de misión, representación, adaptación y evaluación como **dominio puro**, con pruebas independientes de la interfaz.

No incorporar backend, base de datos ni servicios generativos en la primera misión.

## Capas

```text
Contenidos versionados (misiones, objetivos, números, ayudas, licencias)
                    |
      Motor matemático determinista
                    |
  Motor de secuencia / política de ayuda — funciones puras
         |                           |
  Manipuladores accesibles     Evaluación aislada
         |                           |
       UI / PWA estática / estado de sesión solo en memoria
```

### Contratos / límites sugeridos

**`MissionDefinition`**: id, versión, objetivos, rango etario *provisional*, escenas, prerrequisitos, mapas visuales, variantes de práctica, banco aislado de transferencia, licencias.

**`SessionState`**: modo `explore|review`, etapa, predicción opcional, intento actual, modo de visualización, ayudas solicitadas, registros efímeros de práctica o evaluación. No contiene nombre, edad exacta, escuela, ubicación, voz o fotos.

**`MathModel`**: `computeDiscount(totalCents, percentageBasisPoints)` o contrato exacto equivalente que evite inconsistencias de redondeo; `computePercentage(part, whole)`; mismo resultado sirve para texto, barra y corrector. Validar límites y evitar `whole=0`.

**`FeedbackRule`**: patrón de respuesta, id de habilidad, **mensaje condicional** y estrategia alternativa asociada. Ninguna regla devuelve «el alumno cree X» como certeza.

**`ScaffoldingPolicy`**: pistas en orden pedagógico; adaptaciones de contexto e interfaz; límites predecibles, con salida `no-se` y opción de retirar ayudas; jamás se aplica durante evaluación autónoma.

**`AssessmentProtocol`**: conjunto de ejercicios independiente de la exposición; identificación de formulario; bloqueo de ayuda/soluciones antes de enviar; revisión descriptiva al concluir. No inferir mejora de un único par de ejercicios.

**`AccessibleManipulative`**: valor, rango/step, leyenda textual, entrada alternativa de teclado, representación para lector de pantalla y una sola fuente de verdad.

## Propuesta de organización, no obligación de carpetas

```text
src/
  domain/percentages.mjs
  domain/missions.mjs
  domain/scaffolding.mjs
  content/offer-mission.mjs
  ui/mission-flow.mjs
  ui/visual-controls.mjs
  ui/assessment-view.mjs
tests/
  domain/
  ui/
  a11y/
```

Migrar en incrementos pequeños: no reescribir `src/engine.mjs` y `src/app.mjs` en bloque sin pruebas de regresión.

## Invariantes que nunca deben romperse

1. La evaluación independiente **no expone** respuesta, visual manipulable, diagnóstico por error ni pistas antes de ser enviada.
2. No utilizar eventos de `explore` como `baseline`.
3. No usar LLM como autoridad para corrección matemática.
4. Todas las visualizaciones deben derivar del modelo matemático único.
5. No registrar ni enviar entradas individuales, confianza, errores o trayectorias por defecto; sin `localStorage`, IndexedDB, analytics ni llamadas externas.
6. Diseño usable con teclado, pantalla táctil, texto y lector de pantalla; animaciones respetan movimiento reducido.
7. Mismo contenido matemático cuando no hay red (PWA), sin recursos remotos críticos.
8. Contenido y reglas versionados con tests; cambios matemáticos revisados por docente.
9. El sistema indica «No sé» como una elección legítima, sin perfiles de habilidad persistentes.
10. Una actividad destinada a adolescentes **no se ofrece como producto aprobado para menores** hasta superar los controles institucionales, legales y de seguridad.

## Estrategia de pruebas

- **Unitarias:** porcentajes, redondeo, límites, independencia de estado, patrones de respuesta, selección de ayudas.
- **Integración:** manipular → predecir → intentar → ayuda → responder → transferir; versiones A/B no filtradas.
- **Accesibilidad:** teclado, foco, lector de pantalla real, contraste, 200/400 % zoom, `prefers-reduced-motion`, gráficos con descripciones no redundantes, objetivos táctiles.
- **PWA/Pages:** HTTP real de HTML/módulos/íconos, actualización de caché con nueva versión, uso offline tras instalación, protección de respuestas efímeras.
- **Regresión pedagógica:** ningún cambio de UX debe exponer respuestas evaluativas ni recalificar una respuesta enviada.
- **Sin telemetría invasiva:** QA adulto con capturas sintéticas y guion de observación; no depender de analítica de comportamiento infantil.

## Entrega/branching

- `main` intacta hasta autorización explícita para fusionar.
- Documentación y features aisladas en ramas, PR en borrador.
- Sitio experimental: publicar únicamente cambios verificados en `gh-pages` mediante Actions con `npm test`; conservar HEAD verificado antes de cada release y enlace de ejecución.
- Evitar Action runs redundantes: probar local primero, desplegar un incremento agrupado y rastreable. No activar CD para cada cambio de documentación.
- El demo debe mostrar «prototipo no validado para uso con menores» en interfaz visible.

## Decisiones abiertas

- ¿Modo evaluación visible como opción docente o reservado a URL de revisión / build de desarrollo?
- ¿Qué alternativa no comercial se ofrece junto a «Detective de ofertas»?
- ¿Hasta qué punto preservar estado local sin recolectar datos infantiles? Por ahora: **ninguno**.
- ¿Qué evidencia justifica personalización más compleja? Priorizar políticas deterministas y revisión de docente.
- ¿Qué biblioteca, si alguna, permite ahorrar trabajo sin comprometer accesibilidad y licencia? Investigar y **probar** antes de adoptar.
