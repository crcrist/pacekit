import { DISTANCES } from './lib/distances.js';
import { parseTime } from './lib/time.js';
import { homePage } from './pages/home.js';
import { goalPage, goalPath, distanceIndexPage } from './pages/goal.js';

export function goalTimes(distanceSlug) {
  const { from, to, step } = DISTANCES[distanceSlug].goals;
  const times = [];
  for (let t = parseTime(from); t <= parseTime(to); t += step) times.push(t);
  return times;
}

export function routes(config) {
  const pages = [{ path: '/', html: homePage(config) }];
  for (const slug of Object.keys(DISTANCES)) {
    const goals = goalTimes(slug);
    pages.push({ path: `/pace/${slug}/`, html: distanceIndexPage(config, slug, goals) });
    for (const seconds of goals) {
      pages.push({ path: goalPath(slug, seconds), html: goalPage(config, slug, seconds) });
    }
  }
  return pages;
}
