import test from 'node:test';
import assert from 'node:assert/strict';
import { createSequence } from '../src/engine.mjs';

// DOM simulado: prueba la lógica y accesibilidad declarativa, no el render en navegador.
class FakeNode {
  constructor(tag) { this.tag = tag; this.children = []; this.listeners = {}; this.style = {}; this.attributes = {}; this.value = ''; this.textContent = ''; }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children = [...nodes]; }
  addEventListener(name, fn) { this.listeners[name] = fn; }
  setAttribute(name, value) { this.attributes[name] = value; }
  focus() {}
  click() { this.listeners.click?.(); }
  submit() { this.listeners.submit?.({ preventDefault() {} }); }
}
function descendants(node) { return [node, ...node.children.flatMap(descendants)]; }
function select(root, pred) { return descendants(root).find(pred); }
function buttonNamed(root, contains) { return select(root, x => x.tag === 'button' && x.textContent.includes(contains)); }

// Un mismo módulo de app renderiza ambas versiones una tras otra.
test('both AB and BA journeys keep independent tasks protected and explain practice', async () => {
  const main = new FakeNode('main');
  const host = new FakeNode('div');
  main.append(host);
  globalThis.document = {
    createElement: tag => new FakeNode(tag),
    querySelector: q => q === '#app' ? host : q === '#content' ? main : select(main, x => x.id === q.slice(1)),
  };
  globalThis.window = { scrollTo() {} };
  await import('../src/app.mjs');
  for (const [run, form] of [['A', 'A'], ['B', 'B']]) {
    if (run === 'B') buttonNamed(host, 'alternar formularios').click();
    assert.ok(buttonNamed(host, 'Empezar'));
    buttonNamed(host, 'Empezar').click();
    for (const [i, exercise] of createSequence(form).entries()) {
      assert.ok(select(host, x => x.tag === 'h1' && x.textContent === exercise.prompt), exercise.id);
      const visual = select(host, x => x.tag === 'figure' && x.className === 'learning-visual');
      const hint = buttonNamed(host, 'pista');
      assert.equal(Boolean(hint), exercise.phase === 'practice', exercise.id);
      assert.equal(Boolean(visual), exercise.phase === 'practice', exercise.id);
      if (exercise.phase === 'practice') {
        assert.ok(visual.attributes['aria-label']);
        if (i === 3) {
          hint.click();
          assert.ok(select(host, x => x.tag === 'p' && x.textContent.includes('Pista 1.')));
        }
      }
      const input = select(host, x => x.tag === 'input');
      input.value = String(exercise.expected);
      select(host, x => x.tag === 'form').submit();
      const next = buttonNamed(host, 'Continuar') || buttonNamed(host, 'Ver mi recorrido');
      assert.ok(next, exercise.id);
      if (exercise.phase !== 'practice') {
        assert.equal(Boolean(select(host, x => x.tag === 'li' && x.textContent.includes(exercise.explanation))), false);
      } else {
        assert.ok(select(host, x => x.tag === 'h2' && x.textContent === 'Entendé el procedimiento'));
      }
      next.click();
    }
    assert.ok(select(host, x => x.tag === 'h1' && x.textContent.includes('seguir aprendiendo')));
    assert.equal(descendants(host).filter(x => x.tag === 'strong' && x.textContent === '3 / 3').length, 3);
    assert.ok(buttonNamed(host, 'Volver a empezar'));
    buttonNamed(host, 'Volver a empezar').click();
  }
});
