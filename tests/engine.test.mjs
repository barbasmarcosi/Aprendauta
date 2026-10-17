import test from 'node:test';
import assert from 'node:assert/strict';
import { ASSESSMENT_FORMS, createSequence, EXERCISES, PHASES, parseNumericAnswer, checkAnswer, getSummary, getExercise, isIndependentPhase } from '../src/engine.mjs';

test('two assessment forms contain three paired skills with disjoint items', () => {
  const a = createSequence('A');
  const b = createSequence('B');
  assert.equal(a.length, 9);
  assert.equal(b.length, 9);
  assert.deepEqual(a.map(x => x.phase), ['diagnosis', 'diagnosis', 'diagnosis', 'practice', 'practice', 'practice', 'transfer', 'transfer', 'transfer']);
  assert.deepEqual(b.map(x => x.phase), a.map(x => x.phase));
  for (const seq of [a, b]) {
    assert.equal(new Set(seq.map(x => x.id)).size, 9);
    assert.deepEqual(seq.slice(0, 3).map(x => x.skill), seq.slice(-3).map(x => x.skill));
    assert.ok(seq.every(x => PHASES.some(p => p.id === x.phase)));
    assert.ok(seq.slice(0, 3).every(d => seq.slice(-3).every(t => t.prompt !== d.prompt)));
  }
  assert.deepEqual(a.slice(0, 3).map(x => x.id), b.slice(-3).map(x => x.id).map(x => x.replace(/^transfer-/, 'diagnosis-')));
  assert.throws(() => createSequence('C'), RangeError);
});

test('assessment is independent while practice supplies visuals and graduated hints', () => {
  for (const startForm of Object.keys(ASSESSMENT_FORMS)) {
    const seq = createSequence(startForm);
    for (const exercise of seq) {
      if (exercise.phase === 'practice') {
        assert.equal(exercise.hints.length, 2);
        assert.equal(exercise.steps.length, 3);
        assert.ok(exercise.reflection);
        assert.ok(exercise.visual?.alt);
        assert.ok(exercise.visual?.caption);
        assert.ok(exercise.visual.numerator < exercise.visual.denominator);
      } else {
        assert.equal(exercise.hints, undefined);
        assert.equal(exercise.visual, undefined);
        assert.equal(exercise.steps, undefined);
        assert.ok(isIndependentPhase(exercise.phase));
      }
    }
  }
});

test('numeric input accepts commas but avoids ambiguous thousands', () => {
  for (const [input, expected] of [['25', 25], [' 25 % ', 25], ['12,5', 12.5], ['$ 600', 600], ['.5', .5], ['0,5', .5]]) {
    assert.equal(parseNumericAnswer(input), expected, input);
  }
  for (const input of ['', '20.000', '1 000', '40+20', 'NaN', 'Infinity', '2e3', '<script>', '23% de 100']) {
    assert.equal(parseNumericAnswer(input), null, input);
  }
  assert.equal(parseNumericAnswer(25), null);
});

test('every authored solution and all assessment answers are marked deterministically', () => {
  for (const form of ['A', 'B']) {
    for (const exercise of createSequence(form)) {
      assert.equal(checkAnswer(exercise, String(exercise.expected)).correct, true, exercise.id);
      assert.equal(checkAnswer(exercise, String(exercise.expected + 1)).correct, false, exercise.id);
      assert.equal(checkAnswer(exercise, '<svg>').valid, false);
    }
  }
});

test('phase summary does not count guided practice as independent performance', () => {
  const summary = getSummary([
    { phase: 'diagnosis', correct: false },
    { phase: 'practice', correct: true, hintsUsed: 2 },
    { phase: 'transfer', correct: true },
    { phase: 'transfer', correct: false },
  ]);
  assert.deepEqual(summary, {
    diagnosis: { correct: 0, total: 1 }, practice: { correct: 1, total: 1 }, transfer: { correct: 1, total: 2 },
  });
});

test('sequence ends cleanly and constant default form remains supported', () => {
  assert.equal(getExercise(EXERCISES.length), null);
  assert.equal(getExercise(0)?.id, 'diagnosis-a-equivalencias');
  assert.equal(getExercise(0, createSequence('B'))?.id, 'diagnosis-b-equivalencias');
});
