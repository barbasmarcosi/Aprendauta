/* La instalación PWA es opcional; el aprendizaje funciona aun sin service worker. */
if ('serviceWorker' in navigator && window.isSecureContext) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(error => {
      console.warn('Aprendauta: no se pudo preparar el modo sin conexión.', error);
    });
  });
}
