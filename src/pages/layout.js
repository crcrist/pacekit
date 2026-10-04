export function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function adsenseTag(client) {
  if (!client) return '';
  return `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${escapeHtml(client)}" crossorigin="anonymous"></script>`;
}

function supportFooter(monetize) {
  if (!monetize.kofiUser) return '';
  return `<p class="support">Free and ad-light. <a href="https://ko-fi.com/${escapeHtml(monetize.kofiUser)}" rel="noopener">Buy me a coffee</a> if it helped.</p>`;
}

export function layout({ config, title, description, path, body }) {
  const canonical = `${config.siteUrl}${path}`;
  const base = config.basePath;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${escapeHtml(canonical)}">
<link rel="stylesheet" href="${base}/assets/style.css">
${adsenseTag(config.monetize.adsenseClient)}
</head>
<body>
<header><a class="brand" href="${base}/">${escapeHtml(config.siteName)}</a></header>
<main>
${body}
</main>
<footer>
${supportFooter(config.monetize)}
<p>Some links may be affiliate links. Paces are estimates, not medical advice.</p>
</footer>
</body>
</html>
`;
}
