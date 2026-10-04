# PaceKit

Free running pace calculators and goal-pace split charts for the 5K,
10K, half marathon, and marathon. Built as a static site on GitHub Pages.

```bash
npm run check   # tests, build, lint dist/
npm run build   # writes dist/
```

## Monetization

Fill in `site.config.json` → `monetize`:

- `amazonTag` – Amazon Associates tracking ID for gear links
- `kofiUser` – Ko-fi username for the support footer
- `adsenseClient` – `ca-pub-...` once AdSense approves the site

Empty values render nothing, so the site works before any accounts exist.
