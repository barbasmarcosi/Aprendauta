# Protección de menores, privacidad y uso responsable — v0

**Estado:** requisitos preliminares; todavía no constituyen una evaluación legal, de impacto de privacidad o auditoría de seguridad. **No habilitan ensayos con menores reales.**

## Principios no negociables

1. **Seguridad por defecto.** La experiencia está diseñada expresamente para la edad y el contexto de aprendizaje.
2. **Minimización de datos.** No recolectar nombres, escuela, ubicación, fotos, voz, contactos ni datos sensibles cuando no sean indispensables.
3. **Sin explotación comercial.** No vender información educativa, perfilar para publicidad ni monetizar el comportamiento infantil.
4. **Supervisión humana apropiada.** Los responsables y docentes conservan capacidad de revisión y respuesta.
5. **Transparencia.** Indicar cuándo interviene una IA, sus límites y qué información se almacena.
6. **Derechos del estudiante.** Prever acceso, corrección, borrado y tratamiento apropiado de información, conforme a legislación aplicable.
7. **Menos exposición, no más.** Evitar interacción social abierta, mensajes privados y funcionalidades que incentiven compartir datos personales.

## Amenazas a contemplar

- Respuestas incorrectas, sesgadas o no adecuadas para la edad.
- Divulgación accidental de información identificable.
- Instrucciones maliciosas insertadas en contenidos o entradas (prompt injection).
- Sobredependencia cognitiva o relación emocional inapropiada con asistentes.
- Acoso, contacto entre desconocidos, manipulación y contenido dañino.
- Acceso de adultos no autorizados a datos o actividad de estudiantes.
- Inferencias excesivas sobre capacidad, salud, emociones o entorno familiar.

## Controles previos a cualquier piloto real

- Identificar responsable del tratamiento y jurisdicciones aplicables; recibir asesoramiento legal apropiado.
- Documentar base legal, consentimiento/autorizaciones cuando corresponda y condiciones de participación escolar/familiar.
- Hacer evaluación de riesgos de seguridad infantil y privacidad; registrar mitigaciones y riesgo residual.
- Definir qué datos se tratan, para qué, retención, borrado y quién puede acceder.
- Exigir autenticación y permisos por rol cuando existan cuentas; probar aislamiento entre usuarios.
- Tener plan de incidentes, canal de reportes y responsables humanos identificados.
- Auditar contenido con especialistas y probar respuestas ante entradas adversariales y situaciones de riesgo.
- Garantizar posibilidad de usar el producto con IA desactivada y sin compartir datos innecesarios con proveedores.
- Probar accesibilidad con personas usuarias representativas.
- Obtener las autorizaciones institucionales y familiares correspondientes antes de estudiar resultados.

## Política inicial de interacción

- El sistema es una **herramienta educativa**, no amigo, terapeuta, reemplazo de adultos ni autoridad absoluta.
- No solicitar secretos, datos de contacto, fotografías ni información íntima.
- No prometer confidencialidad absoluta ni recomendar ocultar problemas a adultos responsables.
- Ante indicios de daño, abuso o riesgo inminente, priorizar una respuesta apropiada a la edad que oriente a buscar ayuda de un adulto confiable o servicios pertinentes; definir protocolos contextualizados antes del despliegue.
- No ofrecer diagnósticos de salud física o mental ni instrucciones peligrosas.

## Reglas de ingeniería

- No registrar prompts completos con datos infantiles por defecto.
- Usar datos sintéticos en desarrollo, test y demos.
- Secretos fuera del repositorio, cifrado en tránsito, permisos mínimos y registros de acceso.
- Versionar y revisar contenido y configuración pedagógica; disponer de interruptor para deshabilitar IA.
- Evaluar periódicamente proveedores, transferencias internacionales y políticas de retención.

## Bloqueo explícito

**El proyecto no avanzará a pilotos con menores hasta que estos controles se hayan implementado y revisado por responsables competentes.**
