# Master Icons website

Run from the repository root with Node.js 24 or later and Bun 1.4.4 (Node.js 26 recommended):

```sh
bun install --frozen-lockfile
bun run dev
bun run check
bun run test:site
bun run test:site:dev
```

`dev` builds the package and watches its source. `build:site` requires `build:icons` first and writes static output to `site/out`. `PUBLIC_URL` controls the canonical origin; its default is `http://localhost:4321`. This repository does not configure hosting or npm publication.

The site pins Master Site 0.2.14, Master CSS 2.1.5, Master UI 0.0.8, Astro 7.4.2, Svelte 5.57.2 and Vite 8.3.5. Shared sections own the document shell, navigation, theme, search and locale controls. Product pages own their content and icon explorer. Package exports remain independent of the website; the explorer fetches one icon definition when opening its details.

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
