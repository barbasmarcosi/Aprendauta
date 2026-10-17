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
const select = (node, pred) => descendants(node).find(pred);
const buttonNamed = (root, text) => select(root, x => x.tag === 'button' && x.textContent.includes(text));
const hasSupport = host => !!select(host, x => x.className === 'diagnostic-support');

test('feedback follows wrong practice attempts, is reversible and never leaks into assessments', async () => {
  const main = new FakeNode('main');
  const host = new FakeNode('div');
  main.append(host);
  globalThis.document = { createElement: tag => new FakeNode(tag),
    querySelector: q => q === '#app' ? host : q === '#content' ? main : select(main, x => x.id === q.slice(1)) };
  globalThis.window = { scrollTo() {} };
  await import('../src/app.mjs');
  buttonNamed(host, 'Empezar').click();
  for (const exercise of createSequence('A')) {
    if (exercise.phase === 'practice') {
      const wrong = {p1:'20',p2:'0,6',p3:'80'}[exercise.id];
      select(host, x => x.tag === 'input').value = wrong;
      select(host, x => x.tag === 'form').submit();
      assert.ok(hasSupport(host), `${exercise.id}: support not rendered`);
      assert.ok(select(host, x => x.tag === 'h2' && x.textContent.startsWith('¿')), 'specific prompt');
      assert.ok(buttonNamed(host, 'Explorar otra estrategia'));
      buttonNamed(host, 'Explorar otra estrategia').click();
      assert.ok(select(host, x => x.className === 'alternate-strategy'));
      assert.equal(select(host, x => x.tag === 'input').value, wrong, 'input preserved after rerender');
    } else {
      assert.equal(hasSupport(host), false);
      assert.equal(Boolean(buttonNamed(host, 'Explorar otra estrategia')), false);
    }
    select(host, x => x.tag === 'input').value = String(exercise.expected);
    select(host, x => x.tag === 'form').submit();
    assert.equal(hasSupport(host), false, 'success clears targeted support');
    (buttonNamed(host, 'Continuar') || buttonNamed(host, 'Ver mi recorrido')).click();
  }
  assert.ok(select(host, x => x.tag === 'h1' && x.textContent.includes('seguir aprendiendo')));
});
