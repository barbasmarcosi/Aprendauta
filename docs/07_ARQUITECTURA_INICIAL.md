# Arquitectura inicial: principios antes que tecnologías

**Estado:** propuesta exploratoria, no decisión cerrada ni sistema implementado.

## Objetivo técnico

Una plataforma modular donde la pedagogía y el contenido tengan trazabilidad, sea posible evaluar aprendizaje sin IA y se pueda elegir o reemplazar proveedores sin rehacer el dominio educativo.

## Módulos conceptuales

1. **Currículo y competencias:** conceptos, prerrequisitos y objetivos observables.
2. **Biblioteca de actividades:** contenido estructurado, licencias, versiones, dificultad, soluciones verificadas y accesibilidad.
3. **Sesión de aprendizaje:** secuencia de explicación, intento, pistas y retroalimentación.
4. **Evaluación autónoma:** actividades nuevas, sin pistas ni modelo generativo, para medir dominio.
5. **Adaptación:** reglas simples primero; recomendaciones auditables y anulables.
6. **Asistencia IA opcional:** proveedor intercambiable, alcance acotado, filtros y validación de respuestas.
7. **Experiencia para estudiantes/docentes:** interfaces claras con permisos separados y control de exposición de información.
8. **Analítica mínima:** métricas pedagógicas agregadas, privacidades y retención definidas.

## Separar contenido, decisiones y motores

- Un ejercicio debe tener una especificación verificable independiente de su representación visual.
- El motor de evaluación debe poder operar sin invocar IA.
- Las decisiones adaptativas deben guardar una explicación comprensible para revisión de docentes.
- El modelo generativo no debe convertirse en fuente de verdad para validar respuestas matemáticas deterministas.
- Versionar contenidos, reglas y rúbricas para reproducir evaluaciones.

## Criterios para elegir tecnologías

- Accesibilidad y experiencia móvil primero.
- Buen soporte de pruebas automatizadas y comunidad activa.
- Desarrollo y operación económicos, evitando complejidad distribuida prematura.
- Reutilizar componentes educativos y estándares interoperables donde realmente ayuden.
- Posibilidad de ejecución de bajo consumo y, cuando sea razonable, uso con conectividad limitada.
- Privacidad y seguridad aplicables a usuarios menores de edad.

## Investigación y decisiones pendientes

Comparar opciones de frontend, backend, autoría curricular, interactividad, almacenamiento y herramientas de adaptación con un prototipo medible. Investigar iniciativas como Kolibri, Moodle, Khan Academy, H5P, ASSISTments y estándares para interoperabilidad; **mencionarlos no implica que se hayan evaluado ni elegido**.

## Estrategia de construcción

Preferir un demostrador vertical pequeño, determinista y cubierto por tests antes de conectar LLMs. No incorporar microservicios, memoria persistente de conversaciones infantiles ni orquestación multiagente como requisito previo.

Cualquier servicio real deberá cumplir primero [las salvaguardas infantiles](04_PROTECCION_INFANCIA_Y_DATOS.md).
