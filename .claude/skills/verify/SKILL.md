---
name: verify
description: Build PaceKit and prove a change on the real static site by serving dist/ under its GitHub Pages base path and fetching pages over HTTP. Use to verify any change to pages, routes, lib math, assets, sitemap, or monetization slots.
---

# Verify PaceKit

PaceKit is a static site. The real artifact is `dist/` served under the
`/pacekit` base path, exactly as GitHub Pages serves it.

## Launch

```bash
npm run check                       # tests + build + dist lint
ROOT=$(mktemp -d) && ln -s "$PWD/dist" "$ROOT/pacekit"
PORT=$((8100 + RANDOM % 800))
python3 -m http.server -d "$ROOT" "$PORT" >/dev/null 2>&1 &
SERVER=$!
```

Two instances can run side by side: each gets its own temp root and port.

## Doctor

```bash
curl -sf "http://localhost:$PORT/pacekit/" | grep -q '<h1>' && echo up
```

## Drive

Fetch the pages the change touches and assert on their HTML:

```bash
curl -s "http://localhost:$PORT/pacekit/pace/marathon/4h00/" | grep -o '<p class="answer">.*</p>'
curl -s -o /dev/null -w '%{http_code}\n' "http://localhost:$PORT/pacekit/assets/lib/pace.js"
```

Every asset or link a page references must return 200 under the base path.
For the home calculator's client JS, run the same math the page imports
with `node -e` against `src/lib/*.js`; the browser loads those exact files.

## Evidence

Quote the command, the HTTP status, and the matched HTML fragment. For new
pages, also show the page's `<title>` and that it appears in
`/pacekit/sitemap.xml`.

## Cleanup

```bash
kill $SERVER; rm -rf "$ROOT"
```
