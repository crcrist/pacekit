import { readFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const dist = new URL('../dist', import.meta.url).pathname;
const problems = [];

async function walk(dir) {
  for (const name of await readdir(dir)) {
    const full = join(dir, name);
    if ((await stat(full)).isDirectory()) await walk(full);
    else if (name.endsWith('.html')) await checkPage(full);
  }
}

async function checkPage(file) {
  const html = await readFile(file, 'utf8');
  const rel = file.slice(dist.length);
  if (!/<title>[^<]{10,}<\/title>/.test(html)) problems.push(`${rel}: missing title`);
  if (!/<meta name="description" content="[^"]{30,}">/.test(html)) problems.push(`${rel}: missing description`);
  if (!/<link rel="canonical"/.test(html)) problems.push(`${rel}: missing canonical`);
  if ((html.match(/<h1>/g) || []).length !== 1) problems.push(`${rel}: expected exactly one h1`);
  if (/undefined|NaN/.test(html)) problems.push(`${rel}: contains undefined/NaN`);
}

await walk(dist);
for (const required of ['sitemap.xml', 'robots.txt', 'assets/style.css']) {
  await stat(join(dist, required)).catch(() => problems.push(`missing ${required}`));
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log('dist ok');
