import test from 'node:test';
import assert from 'node:assert/strict';
import { createSequence, checkAnswer } from '../src/engine.mjs';
import { PRACTICE_PATTERNS, diagnosePracticeAnswer, validatePracticePatterns } from '../src/diagnostics.mjs';

for (const form of ['A', 'B']) {
  const exercises = createSequence(form);
  test(`patterns are scoped, coherent and validated (${form})`, () => {
    assert.equal(validatePracticePatterns(exercises), true);
    for (const exercise of exercises) {
      if (exercise.phase !== 'practice') {
        assert.equal(diagnosePracticeAnswer(exercise, checkAnswer(exercise, '1')), null);
      } else {
        for (const rule of PRACTICE_PATTERNS[exercise.id]) {
          const diagnosis = diagnosePracticeAnswer(exercise, checkAnswer(exercise, String(rule.observed)));
          assert.equal(diagnosis?.kind, 'possible-pattern', `${exercise.id} ${rule.code}`);
          assert.equal(diagnosis?.code, rule.code);
          assert.ok(diagnosis?.prompt);
          assert.ok(diagnosis?.alternative);
        }
        assert.equal(diagnosePracticeAnswer(exercise, checkAnswer(exercise, String(exercise.expected))), null);
        assert.equal(diagnosePracticeAnswer(exercise, checkAnswer(exercise, '1+2')), null);
        const unknown = diagnosePracticeAnswer(exercise, checkAnswer(exercise, '-987'));
        assert.equal(unknown.kind, 'unclassified');
        assert.match(unknown.message, /no podemos saber/);
      }
    }
  });
}
test('malformed rules cannot silently infer a correct response', () => {
  assert.throws(() => validatePracticePatterns([{ id: 'p1', phase: 'practice', expected: 20 }]), /Pattern matches correct answer/);
});
test('unsupported practice items receive only neutral non-inferential support', () => {
  const exercise = { id: 'custom', phase: 'practice', expected: 10 };
  assert.equal(diagnosePracticeAnswer(exercise, checkAnswer(exercise, '2')).kind, 'unclassified');
});
