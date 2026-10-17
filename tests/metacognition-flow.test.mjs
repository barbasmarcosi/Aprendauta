import test from 'node:test';
import assert from 'node:assert/strict';
import { createSequence } from '../src/engine.mjs';

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
const descendants = node => [node, ...node.children.flatMap(descendants)];
const select = (root, pred) => descendants(root).find(pred);
const buttonNamed = (root, text) => select(root, x => x.tag === 'button' && x.textContent.includes(text));

test('optional confidence preserves input; assessment keys unlock only after completion', async () => {
  const main = new FakeNode('main');
  const host = new FakeNode('div');
  main.append(host);
  globalThis.document = { createElement: tag => new FakeNode(tag),
    querySelector: q => q === '#app' ? host : q === '#content' ? main : select(main, x => x.id === q.slice(1)) };
  globalThis.window = { scrollTo() {} };
  await import('../src/app.mjs');
  buttonNamed(host, 'Empezar').click();
  for (const [i, exercise] of createSequence('A').entries()) {
    const confidence = select(host, x => x.tag === 'fieldset' && x.className === 'confidence-panel');
    assert.equal(Boolean(confidence), exercise.phase !== 'practice', exercise.id);
    if (i === 0) {
      const input = select(host, x => x.tag === 'input');
      input.value = String(exercise.expected);
      buttonNamed(host, 'Alta').click();
      assert.equal(input.value, String(exercise.expected));
      assert.equal(buttonNamed(host, 'Alta').attributes['aria-pressed'], 'true');
      buttonNamed(host, 'Alta').click();
      assert.equal(buttonNamed(host, 'Alta').attributes['aria-pressed'], 'false');
      buttonNamed(host, 'Baja').click();
    } else if (exercise.phase !== 'practice') {
      assert.equal(buttonNamed(host, 'Alta').attributes['aria-pressed'], 'false');
      if (exercise.phase === 'transfer') buttonNamed(host, 'Alta').click();
    }
    const input = select(host, x => x.tag === 'input');
    input.value = String(exercise.expected);
    select(host, x => x.tag === 'form').submit();
    assert.equal(Boolean(select(host, x => x.className === 'skill-review')), false);
    assert.equal(Boolean(select(host, x => x.tag === 'details')), false);
    (buttonNamed(host, 'Continuar') || buttonNamed(host, 'Ver mi recorrido')).click();
  }
  const review = select(host, x => x.className === 'skill-review');
  assert.ok(review);
  assert.equal(descendants(review).filter(x => x.className === 'skill-tile').length, 3);
  assert.ok(select(review, x => x.textContent === 'Confianza: Baja'));
  assert.ok(select(review, x => x.textContent === 'Confianza: Alta'));
  assert.equal(descendants(host).filter(x => x.tag === 'details').length, 6);
  buttonNamed(host, 'Volver a empezar').click();
  buttonNamed(host, 'Empezar').click();
  assert.equal(buttonNamed(host, 'Baja').attributes['aria-pressed'], 'false');
});
