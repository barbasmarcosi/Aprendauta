import test from 'node:test';
import assert from 'node:assert/strict';
import { createSequence, CONFIDENCE_LEVELS, confidenceLabel, getSkillReview } from '../src/engine.mjs';

test('optional confidence levels have distinct ids and an honest unanswered state', () => {
  assert.deepEqual(CONFIDENCE_LEVELS.map(x => x.id), ['low','medium','high']);
  assert.equal(confidenceLabel(null), 'No indicada');
  assert.equal(confidenceLabel('mystery'), 'No indicada');
  assert.equal(confidenceLabel('high'), 'Alta');
});

test('skill review describes initial and final answers separately, for both forms', () => {
  for (const form of ['A','B']) {
    const exercises = createSequence(form);
    const records = exercises.map(x => ({ id:x.id, phase:x.phase, correct:x.phase === 'diagnosis',
      confidence:x.phase === 'diagnosis' ? 'high' : 'low' }));
    const review = getSkillReview(records, exercises);
    assert.equal(review.length, 3);
    assert.deepEqual(review.map(r => r.skill), exercises.slice(0,3).map(e => e.skill));
    assert.ok(review.every(r => r.diagnosis.correct && r.diagnosis.confidence === 'Alta'));
    assert.ok(review.every(r => !r.transfer.correct && r.transfer.confidence === 'Baja'));
  }
});

test('missing records and unanswered confidence remain neutral', () => {
  const exercises = createSequence('A');
  const records = [{ id:exercises[0].id, phase:'diagnosis', correct:false }];
  const review = getSkillReview(records, exercises);
  assert.deepEqual(review[0].diagnosis, { correct:false, confidence:'No indicada' });
  assert.equal(review[0].transfer, null);
  assert.equal(review[1].diagnosis, null);
});
