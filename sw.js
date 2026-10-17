/* Aprendauta: almacena exclusivamente recursos públicos y estáticos de la aplicación.
   Nunca guarda respuestas, entradas, perfiles, información personal ni llamadas API. */
const CACHE_NAME = 'aprendauta-static-v1';
const CACHE_PREFIX = 'aprendauta-static-';
const ASSETS = [
  './', './index.html', './styles.css',
  './src/app.mjs', './src/engine.mjs', './src/diagnostics.mjs', './src/pwa.mjs',
  './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(async keys => {
      for (const key of keys) {
        if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) await caches.delete(key);
      }
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const scope = new URL(self.registration.scope);
  if (url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;
  event.respondWith(
    caches.match(request, { ignoreSearch: false }).then(hit => hit || fetch(request))
  );
});
