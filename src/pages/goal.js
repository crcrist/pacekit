import { DISTANCES } from '../lib/distances.js';
import { formatTime } from '../lib/time.js';
import { pacePerMile, pacePerKm, mileSplits } from '../lib/pace.js';
import { layout, escapeHtml } from './layout.js';

export function goalSlug(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${m}min`;
}

export function goalPath(distanceSlug, seconds) {
  return `/pace/${distanceSlug}/${goalSlug(seconds)}/`;
}

export function goalPage(config, distanceSlug, seconds) {
  const d = DISTANCES[distanceSlug];
  const goal = formatTime(seconds);
  const mile = formatTime(pacePerMile(seconds, d.meters));
  const km = formatTime(pacePerKm(seconds, d.meters));
  const rows = mileSplits(seconds, d.meters)
    .map((s) => `<tr><td>${s.mile}</td><td>${formatTime(s.elapsed)}</td></tr>`)
    .join('');
  const body = `<h1>${escapeHtml(goal)} ${escapeHtml(d.label)} pace</h1>
<p class="answer">To run a ${escapeHtml(d.label.toLowerCase())} in <strong>${goal}</strong> you need to average <strong>${mile} per mile</strong> (${km} per km).</p>
<h2>Mile splits</h2>
<table><thead><tr><th>Mile</th><th>Elapsed</th></tr></thead><tbody>${rows}</tbody></table>
<p><a href="${config.basePath}/pace/${distanceSlug}/">All ${escapeHtml(d.label)} goal times</a></p>`;
  return layout({
    config,
    title: `${goal} ${d.label} Pace: ${mile}/mi Splits Chart | PaceKit`,
    description: `A ${goal} ${d.label.toLowerCase()} needs ${mile} per mile or ${km} per km. Full mile-by-mile split chart.`,
    path: goalPath(distanceSlug, seconds),
    body,
  });
}

export function distanceIndexPage(config, distanceSlug, goals) {
  const d = DISTANCES[distanceSlug];
  const items = goals
    .map((s) => `<li><a href="${config.basePath}${goalPath(distanceSlug, s)}">${formatTime(s)} – ${formatTime(pacePerMile(s, d.meters))}/mi</a></li>`)
    .join('');
  return layout({
    config,
    title: `${d.label} Pace Chart by Goal Time | PaceKit`,
    description: `Pace per mile and split charts for every ${d.label.toLowerCase()} goal time.`,
    path: `/pace/${distanceSlug}/`,
    body: `<h1>${escapeHtml(d.label)} pace chart</h1><ul class="goals">${items}</ul>`,
  });
}
