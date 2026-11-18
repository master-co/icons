# Master Icons

Softly rounded, minimal SVG icons drawn for dashboards, apps and web interfaces.

Master Icons focuses on outline, proportion, white space and the trade-offs small sizes demand. It has **946 named icons and 8,514 SVG files**. Read the documentation and browse the collection at [icons.master.co](https://icons.master.co).

```sh
npm install @master/icons-react   # or -vue, -svelte, -preact, -astro; @master/icons for plain SVG and JavaScript
```

## Design and output

- **Native optical sizes**: 16, 20 and 24 px each have their own stroke and coordinates, so dense drawings can drop or rearrange details at small sizes.
- **Three corner styles**: soft by default, or sharp and rounded. Corners change construction, not only line joins; circles and some simple strokes may share geometry.
- **Monochrome outlines**: drawn in `currentColor` to follow text and interface colors, covering navigation, forms, files, editing, media, accounts and common commerce.
- **SVG and framework components**: JavaScript, React, Vue, Svelte, Preact and Astro entries, plus fixed size and corner entries to import only what an app uses.
- **Stroke width**: 0.75–2.5 in steps of 0.25, with cutouts and masks redrawn for each width rather than thickened in place.

These are design goals, not a claim that every icon, display size or background has reached the same finish. The checks run on each batch and their limits are recorded in the [validation log](docs/validation.md) and the batch reports, which cover only the versions and scope they record.

Brands and platforms has 89 brand mark names and 18 outline versions, 107 entries in all. OpenAI and ChatGPT share the Blossom mark under both names. The outline versions of 18 social brands, including GitHub, Telegram, WeChat, Discord and YouTube, are listed in the collection, and each detail switches between the monochrome mark and the outline. Frameworks use `BrandGithubIcon` and `BrandGithubOutlineIcon`; JavaScript uses `BrandGithub` and `BrandGithubOutline`. Marks keep their fixed geometry; outlines accept `strokeWidth`. See the [brand outline review](docs/review/brand-outline-craft-05/index.html) and the [source notices](THIRD_PARTY_NOTICES.md).

## Using icons

```tsx
import { SearchIcon } from '@master/icons-react';
import { SearchIcon as SmallSearch } from '@master/icons-react/16/soft';

export function SearchExamples() {
  return <>
    <SearchIcon size={20} corner="rounded" label="Search" />
    <button aria-label="Search"><SmallSearch /></button>
  </>;
}
```

A dynamic entry carries all nine drawings of each icon; a fixed entry carries only the selected size and corner. Bundlers that tree-shake remove unused icons. Every framework has its own `@master/icons-*` package that depends only on the shared core and its framework peer. See the [package documentation](packages/icons/README.md).

To render SVG markup directly:

```js
import { Search, renderSvg } from '@master/icons';

const svg = renderSvg(Search, { size: 20, corner: 'soft', label: 'Search' });
```

| Option | Default | Behavior |
| --- | --- | --- |
| `size` | `24` | Display size, a positive finite number |
| `opticalSize` | `auto` | The nearest 16, 20 or 24 master; 18 and 22 pick the larger |
| `corner` | `soft` | `sharp`, `soft` or `rounded` |
| `strokeWidth` | native | Native units in steps of 0.25, clamped to the master's range |
| `color` | `currentColor` | Follows the text color |
| `label` | none | Without it the SVG is `aria-hidden`; with it the SVG gets `role="img"` |
| `direction` | `ltr` | `rtl` mirrors only the left/right arrows and chevrons, double chevrons, undo and redo |

Fixed entries do not accept `corner` or `opticalSize`; `size` only scales the drawing, and CSS width and height never switch the optical master. SVG files are at `packages/icons/icons/{16|20|24}/{sharp|soft|rounded}/` and in the package as `@master/icons/svg/...`. Inline SVG inherits the text color; an external SVG in `<img>` does not.

### For AI agents

- **Agent skill**: [`skills/master-icons/`](skills/master-icons/SKILL.md) covers choosing the package and entry, optical sizes, stroke width and accessibility, with `scripts/search.mjs` to look up real names in the installed catalog so agents never invent one. It ships in `@master/icons` at `node_modules/@master/icons/skills/master-icons/`; copy it into your agent's skills folder.
- **llms.txt**: https://icons.master.co/llms.txt (Chinese at `/tw/llms.txt`), the full text at `/llms-full.txt`, and a Markdown edition of every guide, such as `/guide/react.md`.

## Development

Development needs Node.js 24 or later and Bun 1.4.4. The icon packages need Node.js 22 or later; frameworks and the site have their own toolchain requirements.

```sh
bun install --frozen-lockfile
bun run dev              # bilingual site: http://127.0.0.1:4321
bun run dev:review       # review tool, in another terminal: http://127.0.0.1:4173
```

The site has English and Traditional Chinese (`/tw`) editions with search, categories, size and corner previews, code copying and downloads; see the [site documentation](site/README.md).

```sh
bun run build                  # packages, review tool and site
bun run check                  # build, asset validation, package tests and type checks
bun x --no-install playwright install chromium firefox webkit
bun run test:browser            # review tool and the file:// offline flow
bun run test:site               # site flows
bun run test:site:dev           # development server routes
bun run test:site:hmr           # HMR regressions in an isolated copy
bun run test:frameworks:browser # Vue, Svelte and Preact in browsers
bun run test:turbo              # task graph, cache invalidation and output restoration
bun run check:reproducible
bun run check:package
```

`build:icons`, `build:review` and `build:site` build one part; Turbo first runs the upstream tasks each needs. The site builds only the core, Svelte and Astro packages; `build:icons` builds all six. `dist/preview.html` is the offline review page, with sources and before/after comparisons; upstream comparison drawings never ship in the site or the packages.

Task outputs are cached by Turbo (`turbo.json`) in `.turbo/cache/`, keyed by sources, generators, licenses, relevant dependencies and the Node.js version; the site build also tracks `PUBLIC_URL`. The dev server and browser tests are not cached; source watching re-runs generation through Turbo, and ordinary page edits use Vite HMR. The core `generate` task caches geometry, types and ZIP sets; `build` always syncs the tracked SVGs from those archives, keeping unchanged files' mtimes. `bun run build:icons --force` forces a rebuild, and deleting `.turbo/` clears the cache.

| Path | Purpose |
| --- | --- |
| `packages/icons/` | Shared geometry sources, runtime, SVGs and integration tests |
| `packages/icons-{react,vue,svelte,preact,astro}/` | Framework packages, component sources and generated output |
| `site/` | Bilingual website |
| `preview/` | Review tool and usage scenarios |
| `tests/` | Cross-package tests, framework dependencies and review browser tests |
| `skills/master-icons/` | Agent skill for using the icons in an application; ships in `@master/icons` |
| `.agents/skills/icon-craft/` | Skill for drawing, refining and reviewing icons in this repository |
| `references/` | Pinned comparison assets and historical baselines |
| `docs/` | Design system, research, decisions and review evidence |
| `scripts/` | Build orchestration, validation and review tools |

## Versions and releases

The six packages share one version, taken from `v*` tags and commit types ([Aronrepo](https://github.com/1aron/aronrepo), `explicit` mode); `version` in `package.json` is a `0.0.0` placeholder. `main` is the only release branch: every push runs `.github/workflows/release.yml`, which runs the full CI, publishes with npm provenance and creates the tag and GitHub release (`aronrepo release`), verifies what the registry serves (`scripts/verify-package.mjs`), and fast-forwards `pages-stable`, which Cloudflare Pages builds for [icons.master.co](https://icons.master.co). GitHub holds no Cloudflare credential.

Commits and pull request titles follow the policy in [AGENTS.md](AGENTS.md) (`Type(Scope): Summary`), enforced by the commit hook, the PR title check and CI. Only maintainers raise minor and major versions with `Bump(Minor)` and `Bump(Major)`; every other release type ships a patch. Run `bun x aronrepo explain` to see the next version and why.

## Contributing

Before adding or refining icons, read the [design system](docs/design-system.md) and the [icon-craft skill](.agents/skills/icon-craft/SKILL.md). The skill records the drawing contract, source comparison, optical handling and review steps; agents that support skills can use it directly in this repository.

Drawing is AI-assisted in geometry authoring and artwork checks. Review records separate engineering results, visual review and the reviewer; an AI check does not mean a maintainer has signed off every icon.

Each change states its purpose and the concrete problem, keeps the real before state, and is compared at all three sizes and corners, on light and dark backgrounds, beside text and within its family. Dashes, opacity and fading strokes are allowed where needed, never to hide an outline defect. See the [review report](docs/review/ui-v1/index.html) and the [validation log](docs/validation.md) for known limits.

After a build, render a focused review sheet:

```sh
node .agents/skills/icon-craft/scripts/render-review.mjs --repo . --icons user,users,bell,bell-off --out work/detail-review
```

## Sources and license

The work studied open-source sets such as Lucide, Tabler, Heroicons, Phosphor, Radix, Feather, Iconoir and Hugeicons Free, and every icon is drawn and refined in Master's geometry system. Research comparisons and actual adaptations are recorded separately.

Master's code and interface artwork are licensed under the [MIT License](LICENSE). Adapted drawings keep their upstream MIT, ISC or Apache 2.0 notices in each SVG, the packages and the ZIP sets; names, pinned versions, modifications and licenses are in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

The `teapot` drawing adapts the lid of an OpenMoji emoji; it and its modifications are licensed under **CC BY-SA 4.0**, not MIT. See the [teapot notice](licenses/teapot-openmoji-CC-BY-SA-4.0.txt).

Brand artwork comes from Simple Icons, official vectors, a documented Dcard trace and Master's own mark, under terms recorded apart from the code license; see the [brand sources](THIRD_PARTY_NOTICES.md#brand-silhouettes--brands-01) and [batch notes](docs/brands-03.md). Brand names and marks belong to their owners and the code license grants no trademark rights.

Comparison drawings in `references/` belong to their upstream projects, keep their own licenses and are not in the packages. Master Icons is not affiliated with or endorsed by any referenced project.
