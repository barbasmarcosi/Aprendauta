import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const file = path => readFileSync(new URL('../' + path, import.meta.url));
const text = path => file(path).toString('utf8');

test('PWA manifest has relative Pages scope and two actual PNG icons', () => {
  const manifest = JSON.parse(text('manifest.webmanifest'));
  assert.equal(manifest.start_url, './');
  assert.equal(manifest.scope, './');
  assert.equal(manifest.display, 'standalone');
  for (const size of [192, 512]) {
    const icon = manifest.icons.find(i => i.sizes === size + 'x' + size);
    assert.ok(icon);
    assert.equal(icon.type, 'image/png');
    const png = file(icon.src.replace('./', ''));
    assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
  }
});

test('HTML points to local manifest and has service worker registration script', () => {
  const html = text('index.html');
  assert.match(html, /href="\.\/manifest\.webmanifest"/);
  assert.match(html, /src="\.\/src\/pwa\.mjs"/);
  assert.match(html, /src="\.\/src\/app\.mjs"/);
  assert.match(text('src/pwa.mjs'), /serviceWorker\.register\('\.\/sw\.js'/);
});

test('offline cache includes every application module but no dynamic answers', () => {
  const serviceWorker = text('sw.js');
  for (const path of ['./index.html', './styles.css', './src/app.mjs',
    './src/engine.mjs', './src/diagnostics.mjs', './src/pwa.mjs',
    './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png']) {
    assert.ok(serviceWorker.includes("'" + path + "'"), path);
  }
  assert.match(serviceWorker, /request\.method !== 'GET'/);
  assert.match(serviceWorker, /url\.origin !== scope\.origin/);
  assert.doesNotMatch(serviceWorker, /localStorage|sessionStorage|indexedDB|POST\/api/);
});
