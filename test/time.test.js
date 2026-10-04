import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseTime, formatTime } from '../src/lib/time.js';

test('parseTime handles h:mm:ss, mm:ss and seconds', () => {
  assert.equal(parseTime('4:00:00'), 14400);
  assert.equal(parseTime('25:30'), 1530);
  assert.equal(parseTime('90'), 90);
});

test('parseTime rejects junk', () => {
  assert.throws(() => parseTime('abc'));
  assert.throws(() => parseTime('1:2:3:4'));
  assert.throws(() => parseTime(''));
});

test('formatTime round-trips', () => {
  assert.equal(formatTime(14400), '4:00:00');
  assert.equal(formatTime(549.3), '9:09');
  assert.equal(formatTime(59.6), '1:00');
});
