import { mkdir, rm, writeFile, readFile, cp } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { routes } from '../src/routes.js';

const root = new URL('..', import.meta.url).pathname;
const out = join(root, 'dist');
const config = JSON.parse(await readFile(join(root, 'site.config.json'), 'utf8'));

await rm(out, { recursive: true, force: true });
const pages = routes(config);
for (const page of pages) {
  const file = join(out, page.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, page.html);
}
await mkdir(join(out, 'assets'), { recursive: true });
await cp(join(root, 'src/style.css'), join(out, 'assets/style.css'));
await cp(join(root, 'src/lib'), join(out, 'assets/lib'), { recursive: true });

const urls = pages.map((p) => `<url><loc>${config.siteUrl}${p.path}</loc></url>`).join('\n');
await writeFile(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${config.siteUrl}/sitemap.xml\n`);
console.log(`built ${pages.length} pages into dist/`);
