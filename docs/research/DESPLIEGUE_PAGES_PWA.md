# Aprendauta: PWA y GitHub Pages

## Por qué Pages

La demo es **100 % estática**: HTML, CSS, módulos JavaScript y contenido educativo determinista. No hay servidor, cuentas ni llamadas a modelos; GitHub Pages ofrece HTTPS y alojamiento gratuito compatible con este alcance.

## Publicación automatizada con Actions

**URL pública comprobada:** https://barbasmarcosi.github.io/Aprendauta/

Cada `push` a la rama `gh-pages` dispara [`.github/workflows/deploy-pages.yml`](https://github.com/barbasmarcosi/Aprendauta/blob/gh-pages/.github/workflows/deploy-pages.yml). El workflow:

1. Descarga únicamente `gh-pages` y ejecuta las pruebas con Node.js 22.
2. Empaqueta la demo estática en `_site` (sin tests, investigaciones ni documentos internos).
3. Publica el artefacto mediante `actions/configure-pages`, `upload-pages-artifact` y `deploy-pages`.
4. Muestra la URL pública y el resultado de la ejecución.

Primera publicación correcta: [workflow #1](https://github.com/barbasmarcosi/Aprendauta/actions/runs/39069809211), **19/19 tests** y despliegue exitoso. Un intento inicial de cambiar la configuración administrativa con el token de Actions devolvió HTTP 403; se retiró del workflow porque **no es necesario** para publicar. El acceso público y los recursos estáticos fueron verificados posteriormente.

**Importante:** `main` permanece intacta. Los PR pedagógicos siguen abiertos en borrador y la rama `gh-pages` es únicamente un canal de publicación experimental, sin cuentas ni datos de menores.

# Aprendauta: PWA y GitHub Pages

## Por qué Pages

La demo es **100 % estática**: HTML, CSS, módulos JavaScript y contenido educativo determinista. No hay servidor, cuentas ni llamadas a modelos; GitHub Pages ofrece HTTPS y alojamiento gratuito compatible con este alcance.

## Cómo publicar la versión experimental sin tocar `main`

1. En el repositorio, abrir **Settings → Pages**.
2. En **Build and deployment**, elegir **Deploy from a branch**.
3. Elegir la rama **`gh-pages`** y carpeta **`/(root)`**; guardar.
4. Esperar a que GitHub confirme la publicación y abrir la URL mostrada en esa misma pantalla.
5. La dirección esperada para este repositorio es `https://barbasmarcosi.github.io/Aprendauta/`, pero **no debe darse por activa hasta verificar un HTTP 200**.

La rama `gh-pages` fue preparada a partir del código de la demo, no de `main`. El trabajo de desarrollo continúa por PR y **no se fusiona automáticamente**.

## PWA

- `manifest.webmanifest`: nombre, alcance `./`, modo independiente, iconos PNG de 192 y 512 px.
- `src/pwa.mjs`: registra el service worker **solo en contexto seguro**.
- `sw.js`: precarga únicamente los archivos públicos de la demo, dentro del alcance del repositorio.
- No hay precache de entradas de ejercicios, perfiles, respuestas ni datos personales.
- En un dispositivo compatible, después de visitar la página por HTTPS se puede **instalar** desde el menú del navegador.
- Cuando el service worker haya finalizado su instalación, los recursos ya visitados están disponibles sin conexión. La primera visita exige conexión.

### Prueba manual de aceptación

- Abrir la URL publicada por HTTPS; confirmar que aparecen la portada y los nueve ejercicios.
- Inspeccionar en DevTools: **Application → Manifest** y **Service Workers**; verificar ausencia de fallos en la precarga.
- En móvil, intentar **Agregar a pantalla de inicio / Instalar aplicación**; comprobar icono, nombre y modo standalone.
- Tras abrirla con conexión, cerrar, activar modo avión y volver a abrir desde el icono: la demo debe seguir navegable.
- Escribir respuestas, terminar sesión y recargar: **ninguna respuesta debe persistir**.
- Verificar que la interfaz muestre siempre que es un demostrador no validado para menores.
- Repetir en un navegador móvil y otro de escritorio; las opciones de instalación dependen de plataforma.

### Actualizaciones

Cada release que modifique recursos precargados debe incrementar `CACHE_NAME`. El despliegue no requiere ningún secreto de GitHub ni configuración de un backend.

## Límites de la entrega

Tener manifiesto, íconos y service worker no equivale automáticamente a una PWA aprobada por todas las plataformas. **Instalabilidad, HTTPS, respuesta de archivos, caché offline y experiencia real se verifican con el hosting publicado.**

No implementar almacenamiento de progreso infantil ni seguimiento hasta completar la revisión pedagógica y las puertas de privacidad/seguridad.
