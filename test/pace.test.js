import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DISTANCES } from '../src/lib/distances.js';
import { pacePerMile, pacePerKm, mileSplits, predictTime } from '../src/lib/pace.js';
import { formatTime } from '../src/lib/time.js';

const marathon = DISTANCES.marathon.meters;

test('4-hour marathon is 9:09/mi and 5:41/km', () => {
  assert.equal(formatTime(pacePerMile(14400, marathon)), '9:09');
  assert.equal(formatTime(pacePerKm(14400, marathon)), '5:41');
});

test('marathon has 26 full mile splits ending before the finish', () => {
  const splits = mileSplits(14400, marathon);
  assert.equal(splits.length, 26);
  assert.ok(splits.at(-1).elapsed < 14400);
});

test('Riegel predicts a slower-than-linear marathon from a half', () => {
  const half = DISTANCES['half-marathon'].meters;
  const predicted = predictTime(6300, half, marathon);
  assert.ok(predicted > 12600 && predicted < 13500);
});
