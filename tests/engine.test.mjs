import test from 'node:test';
import assert from 'node:assert/strict';
import { EXERCISES, PHASES, parseNumericAnswer, checkAnswer, getSummary, getExercise } from '../src/engine.mjs';

test('all exercise IDs are unique and phases are valid', () => {
  assert.equal(new Set(EXERCISES.map(x => x.id)).size, EXERCISES.length);
  assert.equal(EXERCISES.length, 8);
  assert.deepEqual(EXERCISES.map(x => x.phase), [
    'diagnosis', 'diagnosis', 'practice', 'practice', 'practice', 'transfer', 'transfer', 'transfer'
  ]);
  assert.ok(EXERCISES.every(x => PHASES.some(p => p.id === x.phase)));
});

test('hints only exist in practice, transfer never supplies hints', () => {
  assert.ok(EXERCISES.filter(x => x.phase === 'practice').every(x => x.hints?.length === 2));
  assert.ok(EXERCISES.filter(x => x.phase !== 'practice').every(x => x.hints === undefined));
});

test('numeric parser accepts comma decimal and optional currency or percent', () => {
  for (const [input, expected] of [['25', 25], [' 25 % ', 25], ['12,5', 12.5], ['$ 600', 600], ['.5', .5], ['0,5', .5]]) {
    assert.equal(parseNumericAnswer(input), expected, input);
  }
});

test('numeric parser rejects ambiguous or malformed inputs', () => {
  for (const input of ['', '20.000', '1 000', '40+20', 'NaN', 'Infinity', '2e3', '<script>', '23% de 100']) {
    assert.equal(parseNumericAnswer(input), null, input);
  }
  assert.equal(parseNumericAnswer(25), null);
});

test('grades example results deterministically, rejecting malformed values', () => {
  for (const exercise of EXERCISES) {
    assert.deepEqual(checkAnswer(exercise, String(exercise.expected)).correct, true, exercise.id);
    assert.deepEqual(checkAnswer(exercise, String(exercise.expected + 1)).correct, false, exercise.id);
  }
  assert.deepEqual(checkAnswer(EXERCISES[0], 'texto').valid, false);
});

test('summary splits independent assessment from guided practice', () => {
  const summary = getSummary([
    { phase: 'diagnosis', correct: false },
    { phase: 'practice', correct: true, hintsUsed: 2 },
    { phase: 'transfer', correct: true },
    { phase: 'transfer', correct: false },
  ]);
  assert.deepEqual(summary, {
    diagnosis: { correct: 0, total: 1 },
    practice: { correct: 1, total: 1 },
    transfer: { correct: 1, total: 2 },
  });
});

test('sequence ends without falling back to another exercise', () => {
  assert.equal(getExercise(EXERCISES.length), null);
  assert.equal(getExercise(0)?.id, 'd1');
});
