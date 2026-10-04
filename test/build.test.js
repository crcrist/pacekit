import { test } from 'node:test';
import assert from 'node:assert/strict';
import { routes, goalTimes } from '../src/routes.js';

const config = { siteName: 'PaceKit', siteUrl: 'https://example.com', basePath: '', monetize: {} };

test('every route path is unique and slash-terminated', () => {
  const paths = routes(config).map((r) => r.path);
  assert.equal(new Set(paths).size, paths.length);
  for (const p of paths) assert.ok(p.endsWith('/'), p);
});

test('marathon goal range is 2:30 to 6:30 in 5 minute steps', () => {
  const times = goalTimes('marathon');
  assert.equal(times[0], 9000);
  assert.equal(times.at(-1), 23400);
  assert.equal(times.length, 49);
});

test('4h marathon page states the pace', () => {
  const page = routes(config).find((r) => r.path === '/pace/marathon/4h00/');
  assert.match(page.html, /9:09 per mile/);
});

test('monetization slots stay empty when unconfigured', () => {
  const html = routes(config)[0].html;
  assert.doesNotMatch(html, /adsbygoogle|ko-fi/);
});
