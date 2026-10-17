# Metacognición y revisión por competencias — v3

**Estado:** demostrador sin datos de menores, estudios de eficacia ni validación docente. Implementación reversible, sin cuentas, IA generativa, analítica ni persistencia.

## Cambios implementados

1. En diagnóstico y desafíos finales es posible registrar voluntariamente **confianza baja, media o alta** antes de enviar una respuesta. Se puede retirar la selección.
2. La confianza no modifica la corrección, ni brinda ayuda o pistas. La práctica asistida no recoge confianza para evitar mezclas con las observaciones independientes.
3. Al finalizar, aparece una comparación **descriptiva** por las tres habilidades: fracciones y porcentajes, porcentaje de una cantidad, descuentos y precio final. Por cada habilidad se informa acierto/error y confianza declarada al comenzar y terminar.
4. Las soluciones de **ambas etapas independientes** se muestran únicamente tras completar todos los ejercicios.
5. El estado vive solo en memoria mientras dura la sesión. No se envían ni se persisten respuestas, valores, identidades o niveles de confianza.

## Límites

- La confianza **no es** un diagnóstico de capacidad ni un perfil psicológico.
- Con un único ejercicio por competencia y momento **no se puede medir la mejora individual**; los formularios A/B todavía no están equiparados.
- No hay prueba diferida ni resultados de retención.
- Una respuesta incorrecta con alta confianza no prueba un sesgo estable. Una correcta con baja confianza no prueba ignorancia.
- La recopilación de confianza podría modificar las respuestas; es una hipótesis de diseño por validar.

## Preguntas para revisión docente

- ¿Conviene preguntar confianza antes o después de entregar la respuesta?
- ¿Las tres opciones son comprensibles y no generan ansiedad o evaluaciones injustas?
- ¿El cuadro comparativo fomenta autorreflexión o etiquetas?
- ¿El vocabulario y los botones son suficientemente accesibles?
- ¿Se presentan adecuadamente las diferencias A/B sin hacer inferencias causales?

## Invariantes técnicos

- No hay pistas ni gráficos durante ninguna evaluación independiente.
- No se borra la respuesta al elegir confianza; se puede deshacer la elección.
- Las seis soluciones de ambas evaluaciones se desbloquean solamente al final.
- La confianza se reinicia en cada pregunta y al comenzar nuevamente.
- Los registros de práctica guiada no se presentan como desempeño independiente.
- No se transmiten ni almacenan datos personales.

## Evidencia y límites del QA

- **16 tests Node.js** en el workspace de desarrollo (12 originales + 4 nuevos), cubren selección voluntaria, fases, ambas formas y visibilidad de soluciones.
- Se recorrieron ambas formas en **Chromium móvil 390×844 y escritorio 1440×900**, nueve ejercicios cada una; sin excepciones JavaScript o scroll horizontal en esos tamaños.
- **Restricción de entorno:** Chromium bloqueó la navegación HTTP a localhost, por lo que la prueba visual utilizó módulos concatenados en una página aislada. No valida resolución de imports HTTP en hosting real.
- La publicación en GitHub y las comprobaciones locales de código no representan validación pedagógica ni ensayo con niños.

**Siguiente puerta:** revisión con docentes, adecuación de vocabulario y accesibilidad, y planificación de evaluación con instrumentos revisados. Ningún piloto infantil sin controles formales de seguridad y autorizaciones.
