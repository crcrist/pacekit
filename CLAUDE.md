# PaceKit

Static running-pace site deployed to GitHub Pages. Revenue comes from
SEO traffic to goal-pace pages, monetized via the slots in
`site.config.json` (Amazon tag, Ko-fi, AdSense). Empty values render
nothing.

## Layout

- `src/lib/` pure math, also shipped to the browser as ES modules
- `src/pages/` HTML templates, `src/routes.js` lists every page
- `scripts/build.js` writes `dist/`, `scripts/check-dist.js` lints it

## Rules

- Zero runtime or dev dependencies. Node built-ins only.
- Every page: one `<h1>`, unique title, description, canonical URL.
- New page types must be added to `routes()` so they reach the sitemap.
- Test behavior through `routes()` output or lib functions.

## Pre-review checks

Run on the committed head before pushing: `npm run check`.
Prove page changes with the `verify` skill (`.claude/skills/verify/`).

## PR flow

One issue per PR, branch off `main`, squash merge. CI (`ci`) must be
green. PR body says `Closes #N` and quotes verify evidence.
