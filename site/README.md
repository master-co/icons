# Master Icons website

Run from the repository root with Node.js 24 or later and Bun 1.4.4 (Node.js 26 recommended):

```sh
bun install --frozen-lockfile
bun run dev
bun run check
bun run test:site
bun run test:site:dev
bun run test:site:hmr
```

`dev` runs through Turbo, prepares the core plus the Svelte and Astro packages used by this site, and watches their sources. `build:icons` builds all six packages. `build:site` automatically prepares its dependencies and writes static output to `site/out`. Commands run inside `site/` also delegate to the same Turbo graph. `PUBLIC_URL` controls the canonical origin and participates in the build cache key; its default is `http://localhost:4321`. The site is hosted at https://icons.master.co; see [Hosting](#hosting).

Turbo caches package exports, shared stroke geometry, public assets, bilingual guides and static output in `.turbo/cache/`. Keys include declared source files, generators, licenses, relevant dependencies and the Node.js version. Cache hits restore generated outputs, including missing files. Generated SVGs and distributions are excluded from their own task inputs. Generated files are owned by the generators; edit their sources, not their output. Icon, generator, license and guide changes trigger serialized Turbo runs. The persistent dev server itself is not cached; ordinary page edits continue through Vite HMR.

Vite does not watch the generated `public/` tree or Turbo logs. Restoring tens of thousands of SVGs must not enqueue a separate HMR operation for every file. The dev runner sends one reload notification after preparation completes, and a development-only static handler reads assets directly from disk so new or removed files are served correctly without restarting. The dev smoke tests exercise language switching in both directions; the HMR regression also checks a batch of 500 generated files and the completion notification.

The core `generate` task caches geometry and SVG archives. Its `build` task always synchronizes the checked-in SVGs from those archives, preserving unchanged file mtimes. This avoids Turbo feeding tracked output files back into the generator's cache key and also repairs missing SVGs on a cache hit. Framework integration dependencies live in the `tests/` workspace so an adapter edit does not invalidate unrelated tasks through root dependencies.

On a package cache miss, unchanged generated modules keep their mtimes and changed files are replaced atomically; removed names are pruned after successful generation. Shared geometry/stroke/public generation is locked across processes, while each framework has an independent lock. Locks are released on exit and recovered after an interrupted process. Source watchers ignore access-only filesystem events and survive atomic editor saves.

To force fresh site assets and upstream builds, run `bun run turbo run prepare-site --filter=@master/icons-site --force` from the repository root. Removing `.turbo/` clears the local task cache. Each cache miss generates the affected stage in full while retaining unchanged package-file mtimes; the older `work/cache/` content cache is used only by standalone generator scripts and cannot skip a Turbo cache miss. `bun run test:turbo` verifies task ordering, selective invalidation and missing-output restoration in a disposable checkout. CI persists Turbo's local cache with GitHub Actions cache; external remote caching is disabled.

Preparation also writes what coding agents read (`scripts/llms.ts`): `public/llms.txt` and `public/tw/llms.txt` index every guide by category with its description, `public/guide/<slug>.md` and `public/tw/guide/<slug>.md` hold each guide as portable Markdown (heading ids become anchors, the setup prompt becomes a fenced block and site links become absolute `.md` links on https://icons.master.co), and `llms-full.txt` joins them. A Traditional Chinese page without a translation falls back to English. They are generated with the guides and never committed.

`assets/favicon.svg` and `assets/favicon.ico` are copied from the Master project's `site/public/` (identical to `brand/icon/`); preparation copies these tracked sources into the ignored public directory.

The site pins Master Site 0.3.0, Master CSS 2.1.7, Master UI 0.0.11, Astro 7.4.2, Svelte 5.57.2 and Vite 8.3.5. Shared sections own the document shell, navigation, theme, search and locale controls. Product pages own their content and icon explorer. The homepage uses `@master/icons-astro`. The explorer fetches the cached per-icon definition (`/data/{name}.json`) only for the visible page and draws every icon inline with a recursive Svelte SVG component that scopes its mask IDs per instance; it never loads SVG images, CSS masks or per-icon component modules. The grid, the detail dialog and its downloads share those definitions. Each card also links to a bilingual static detail page. Its default preview, import example and SVG download are usable in the initial HTML. The page loads its own definition for interactive controls. Each definition carries the `header` notice of its published SVG file, so a downloaded SVG equals the file in `@master/icons` (or in a weight's ZIP set) byte for byte; the site itself publishes no SVG files. The framework selector generates React, Vue, Svelte, Preact and Astro examples; custom strokes use the same component imports with `strokeWidth`, selecting the shared, precomputed geometry.

Master Site 0.2.15 includes incremental development updates. Ordinary Astro, Svelte, CSS and MDX edits use HMR; localized frontmatter refreshes its virtual metadata module. Route additions/removals, dynamic params and changes in published locale availability still rebuild the route inventory.

Keep the Master CSS preset/foundation in `styles/globals.css` and site layout in `styles/icons.css`. `styles/site.ts` imports them and each Master UI component the site uses as separate modules, never through a CSS `@import`: a stylesheet that two stylesheets `@import` is delivered in both, while a module is delivered once however many components load it. Imported separately, so a layout edit does not recompile the global entry or invalidate all styles that use its definitions. Add a component import when introducing another UI family; the shared shell and documents load their own styles.

`test:site:hmr` creates a disposable consumer under `work/`, starts with an empty Vite cache, and edits only that copy. It checks visible CSS/Svelte/Astro/MDX updates, translated metadata, draft restoration, route creation/removal, zero ordinary-edit restarts, and only visible icon-module requests. It prints timings without imposing machine-dependent timing thresholds. Turbo prepares the required assets automatically. Use `MASTER_ICONS_TEST_PORT=4339 bun run test:site` to run the static browser tests on a separate port without reusing an existing development server.

English uses unprefixed routes; Traditional Chinese uses `/tw` and `zh-TW`. Documents use sibling `content.mdx` and `content.tw.mdx` with identical explicit heading IDs. Product interface strings belong to `i18n/en.json` and `i18n/tw.json`. Search indexes derive from these same editions.

A reviewer other than the translator must compare the complete translation with its source and inspect rendered pages before recording a review:

```sh
bun run --cwd site i18n:audit
cd site
node --import tsx scripts/i18n.ts review guide/getting-started/content.mdx ui/product ui/shell
```

Supply the exact resource IDs reported by the audit. Preparation and production builds never approve translations. A changed source or translation invalidates its recorded review and makes production builds fail.

The review workspace remains separate. Its source comparisons, research files and offline payload must not be copied to `site/public` or package archives. Generated public assets are replaced from the current icon package during preparation.

The project `.nvmrc` selects Node 26; CI checks Node 26. `test:site:dev` and `test:site:hmr` run on pull requests and manual CI runs only; they never gate a release.

## Hosting

https://icons.master.co is served by Cloudflare Pages through its Git integration. GitHub holds no Cloudflare credential and never uploads the site.

After a push to `main` releases the packages and the registry serves them, or after a push that releases nothing, the `deploy-site` job of `.github/workflows/release.yml` fast-forwards the `pages-stable` branch to that commit. A pending release that failed to publish holds the site until it ships. Never push to or move `pages-stable` by hand; rerun the failed job instead.

The Pages project is connected to `master-co/icons` with:

| Setting | Value |
| --- | --- |
| Production branch | `pages-stable` |
| Preview deployments | None |
| Build command | `bun run build:site:cloudflare-pages` |
| Build output directory | `site/out` |
| Root directory | (repository root) |
| Build variables | `BUN_VERSION=1.4.4`, `NODE_VERSION=24.22.1`, `SKIP_DEPENDENCY_INSTALL=1` (the build script installs the locked dependencies itself) |
| Custom domain | `icons.master.co` |

`scripts/build-site-hosted.sh` sets `PUBLIC_URL=https://icons.master.co` and `PUBLIC_VERSION` to the newest version npm serves for `@master/icons`, installs the locked dependencies and runs `bun run build:site`. The output includes two HTML editions and one shared PNG per independent icon. The site stays within the 20,000-file Pages budget. Every SVG renders in the browser from `/data`, so neither native masters nor custom stroke weights add files, and the twelve ZIP download sets are GitHub release assets rather than site files: `aronrepo.config.js` attaches them to every release under names without a version, and the site links to `https://github.com/master-co/icons/releases/latest/download/<name>`. `assets/_redirects` sends `/download` and `/tw/download` to the download guide.

## Search discovery and launch measurement

The production build writes `/robots.txt`, `/sitemap.xml` and a top-level `404.html` for Cloudflare Pages. The sitemap uses the canonical URL of each indexable HTML page. Every independent drawing has an English and Traditional Chinese URL. Public identity aliases have permanent redirect rules in the generated `_redirects`. Brand outlines have their own URLs. The catalog and the per-language `/icons.md` directories include alias component names.

In Google Search Console, export the property's Web Search performance for the 28 complete days before deployment. Record the deployment date and submit `https://icons.master.co/sitemap.xml` after confirming that it serves XML on the custom domain. Inspect a regular icon, a brand outline, a translated page and an alias. At four and eight weeks, compare consecutive 28-day windows using the same property and search type.

Filter landing pages separately with `^https://icons[.]master[.]co/icons/[^/?]+$` and `^https://icons[.]master[.]co/tw/icons/[^/?]+$`. Record indexed pages, distinct icon pages with impressions, and clicks and impressions for queries excluding the Master Icons brand. Use the unfiltered property and the existing library pages for the prelaunch baseline. Page indexing and the Performance report measure different things, and Search Console omits anonymized queries from query breakdowns.
