import { DISTANCES } from '../lib/distances.js';
import { layout } from './layout.js';

export function homePage(config) {
  const base = config.basePath;
  const options = Object.entries(DISTANCES)
    .map(([slug, d]) => `<option value="${d.meters}" data-slug="${slug}">${d.label}</option>`)
    .join('');
  const links = Object.entries(DISTANCES)
    .map(([slug, d]) => `<li><a href="${base}/pace/${slug}/">${d.label} goal pace charts</a></li>`)
    .join('');
  const body = `<h1>Running pace calculator</h1>
<form id="calc">
  <label>Distance <select name="meters">${options}</select></label>
  <label>Goal time <input name="time" value="4:00:00" inputmode="numeric" pattern="[0-9:]+"></label>
  <button>Calculate</button>
</form>
<p id="result" aria-live="polite"></p>
<h2>Goal pace charts</h2>
<ul>${links}</ul>
<script type="module">
import { parseTime, formatTime } from '${base}/assets/lib/time.js';
import { pacePerMile, pacePerKm } from '${base}/assets/lib/pace.js';
const form = document.getElementById('calc');
const out = document.getElementById('result');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  try {
    const meters = Number(form.meters.value);
    const secs = parseTime(form.time.value);
    out.textContent = formatTime(pacePerMile(secs, meters)) + ' /mi · ' + formatTime(pacePerKm(secs, meters)) + ' /km';
  } catch (err) {
    out.textContent = err.message;
  }
});
</script>`;
  return layout({
    config,
    title: 'Running Pace Calculator – 5K, 10K, Half & Marathon | PaceKit',
    description: 'Free running pace calculator. Turn any goal time into pace per mile and per km, with split charts for the 5K, 10K, half marathon and marathon.',
    path: '/',
    body,
  });
}
