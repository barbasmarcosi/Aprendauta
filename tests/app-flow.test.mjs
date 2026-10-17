import test from 'node:test';
import assert from 'node:assert/strict';
import { EXERCISES } from '../src/engine.mjs';

// Minimal deterministic fake DOM: tests navigation logic, not browser layout/accessibility.
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

test('entire eight-exercise journey keeps independent questions free of hints', async () => {
  const main = new FakeNode('main');
  const host = new FakeNode('div');
  main.append(host);
  globalThis.document = {
    createElement: tag => new FakeNode(tag),
    querySelector: query => query === '#app' ? host : query === '#content' ? main : select(main, x => x.id === query.slice(1)),
  };
  globalThis.window = { scrollTo() {} };
  await import('../src/app.mjs');
  assert.ok(buttonNamed(host, 'Empezar'));
  buttonNamed(host, 'Empezar').click();
  let count = 0;
  for (const exercise of EXERCISES) {
    assert.ok(select(host, x => x.tag === 'h1' && x.textContent === exercise.prompt), exercise.id);
    const hint = buttonNamed(host, 'pista');
    assert.equal(Boolean(hint), exercise.phase === 'practice', exercise.id);
    if (exercise.phase === 'practice' && count === 2) {
      hint.click();
      assert.ok(select(host, x => x.tag === 'p' && x.textContent.includes('Pista 1.')));
    }
    const input = select(host, x => x.tag === 'input');
    assert.ok(input);
    input.value = String(exercise.expected);
    select(host, x => x.tag === 'form').submit();
    const nextButton = buttonNamed(host, 'Continuar') || buttonNamed(host, 'Ver mi recorrido');
    assert.ok(nextButton);
    nextButton.click();
    count++;
  }
  assert.equal(count, 8);
  assert.ok(select(host, x => x.tag === 'h1' && x.textContent.includes('seguir aprendiendo')));
  assert.equal(descendants(host).filter(x => x.tag === 'strong' && x.textContent === '3 / 3').length, 2);
  assert.ok(buttonNamed(host, 'Volver a empezar'));
  buttonNamed(host, 'Volver a empezar').click();
  assert.ok(buttonNamed(host, 'Empezar'));
});
