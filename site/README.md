# Master Icons website

Run from the repository root with Node.js 24 or later and Bun 1.4.4 (Node.js 26 recommended):

```sh
bun install --frozen-lockfile
bun run dev
bun run check
bun run test:site
bun run test:site:dev
```

`dev` builds the core plus the Svelte and Astro packages used by this site, and watches their sources. `build:icons` builds all six packages. `build:site` requires `build:icons` first and writes static output to `site/out`. `PUBLIC_URL` controls the canonical origin; its default is `http://localhost:4321`. This repository does not configure hosting or npm publication.

Development reuses content caches for each package’s exports, stroke geometry, public assets and bilingual guides under `work/cache/`. Keys include source bytes and filenames, generators, licenses and the lockfile; unchanged saves do not regenerate files. Each hit checks the complete output inventory, so deleting a generated file triggers repair. Generated files are owned by the generators; edit their sources, not their output. Icon, generator, license and guide changes are watched and rebuilds are serialized. Unchanged category/search files keep their mtimes to avoid unnecessary HMR.

On a package cache miss, unchanged generated modules keep their mtimes and changed files are replaced atomically; removed names are pruned after successful generation. Shared geometry/stroke/public generation is locked across processes, while each framework has an independent lock. Locks are released on exit and recovered after an interrupted process. Source watchers ignore access-only filesystem events and survive atomic editor saves.

`build:icons` remains an unconditional release build. To refresh all site assets, run `bun run --cwd site prepare-site --force`; removing `work/cache/` also clears all development caches. The first run after a cache invalidation still generates the affected stage in full. Stage timings and cache hits are printed during preparation.

`assets/favicon.svg` and `assets/favicon.ico` are copied from the Master project's `site/public/` (identical to `brand/icon/`); preparation copies these tracked sources into the ignored public directory.

The site pins Master Site 0.2.18, Master CSS 2.1.7, Master UI 0.0.11, Astro 7.4.2, Svelte 5.57.2 and Vite 8.3.5. Shared sections own the document shell, navigation, theme, search and locale controls. Product pages own their content and icon explorer. Package exports remain independent of the website; the explorer fetches one icon definition when opening its details.

Master Site 0.2.15 includes incremental development updates. Ordinary Astro, Svelte, CSS and MDX edits use HMR; localized frontmatter refreshes its virtual metadata module. Route additions/removals, dynamic params and changes in published locale availability still rebuild the route inventory.

English uses unprefixed routes; Traditional Chinese uses `/tw` and `zh-TW`. Documents use sibling `content.mdx` and `content.tw.mdx` with identical explicit heading IDs. Product interface strings belong to `i18n/en.json` and `i18n/tw.json`. Search indexes derive from these same editions.

A reviewer other than the translator must compare the complete translation with its source and inspect rendered pages before recording a review:

```sh
bun run --cwd site i18n:audit
cd site
node --import tsx scripts/i18n.ts review guide/getting-started/content.mdx ui/product ui/shell
```

Supply the exact resource IDs reported by the audit. Preparation and production builds never approve translations. A changed source or translation invalidates its recorded review and makes production builds fail.

The review workspace remains separate. Its source comparisons, research files and offline payload must not be copied to `site/public` or package archives. Generated public assets are replaced from the current icon package during preparation.

The project `.nvmrc` selects Node 26; CI checks Node 24 and 26.
