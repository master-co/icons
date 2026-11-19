---
name: master-icons
description: Use Master Icons (@master/icons and its React, Vue, Svelte, Preact and Astro packages) in an application. Covers choosing the package and entry, optical sizes, corners, stroke width, accessibility, and finding real icon names in the catalog. Use when adding, replacing or reviewing icons in app code that uses or should use Master Icons; not for drawing or contributing icons to the library.
license: MIT
metadata:
  author: master-co
  homepage: https://icons.master.co
---

# Use Master Icons

Master Icons are optically sized interface icons: every icon has separate drawings for 16, 20 and 24 px, each in three corner styles (`sharp`, `soft`, `rounded`). Icons draw in `currentColor`.

Full documentation for agents: https://icons.master.co/llms.txt (each guide is also available as Markdown, for example https://icons.master.co/guide/getting-started.md).

## Never invent an icon name

Icon names are not guessable from other libraries. Before you import an icon whose exact name you have not seen in this project or the catalog, search the catalog:

```sh
node node_modules/@master/icons/skills/master-icons/scripts/search.mjs search
node node_modules/@master/icons/skills/master-icons/scripts/search.mjs "arrow left" --limit 5
```

The script prints each match's name (`folder-search`), its component (`FolderSearchIcon`) and its category. It reads `node_modules/@master/icons/dist/catalog.json` from the current directory or its parents; pass `--catalog <path>` otherwise, or `--json` for machine-readable output. If nothing fits, say so and propose the closest match instead of making up a name. The same data is importable as `@master/icons/catalog`.

## Packages

Install exactly one package, for the framework the app already uses. Each framework package brings the `@master/icons` core with it.

| Framework | Package |
| --- | --- |
| React 18 or 19 | `@master/icons-react` |
| Vue 3.5 or later | `@master/icons-vue` |
| Svelte 5 | `@master/icons-svelte` |
| Preact 11 | `@master/icons-preact` |
| Astro 7 (Node.js 24+) | `@master/icons-astro` |
| No framework (SVG strings, plain JavaScript) | `@master/icons` |

Install only these names, with the project's package manager; never a package with a similar name.

## Entries

Dynamic and fixed entries export framework components by name (`SearchIcon`). The core exports geometry by plain name (`Search`) with `renderSvg`.

- **Dynamic** (`@master/icons-react`): each icon carries all nine drawings and accepts `size`, `corner` and `strokeWidth`.
- **Fixed** (`@master/icons-react/20/soft`): each icon carries one size and corner with its supported stroke widths.
- **Native** (`@master/icons-react/native/20/soft/search`): a default export for one original drawing. Prefer this leaf when the app uses the original stroke. Choose a fixed or dynamic import to set `strokeWidth`.

```tsx
import { SearchIcon } from '@master/icons-react';
<SearchIcon size={20} label="Search" />

import Search20 from '@master/icons-react/native/20/soft/search';
<button aria-label="Search"><Search20 /></button>
```

```js
import { Search, renderSvg } from '@master/icons';
const svg = renderSvg(Search, { size: 16, corner: 'soft' });
```

Plain SVG files are at `@master/icons/svg/<size>/<corner>/<name>.svg`.

## Size and corners

- Pick the size with `size` (16, 20 or 24; default 24). It selects the nearest optical drawing. Never resize an icon with CSS `width`/`height` or `transform`; a scaled drawing loses its optical tuning.
- 24 suits a general interface; 16 or 20 suit dense ones. Keep one corner style per interface; `soft` is the default.

## Stroke width

- Without `strokeWidth`, each size keeps its native stroke. Set `strokeWidth` only within its size's range, in steps of 0.25:
  - 16 px: 0.75–1.5
  - 20 px: 1–2
  - 24 px: 1.25–2.5
- Out-of-range values are clamped. `strokeWidth` chooses precomputed geometry, so never override `stroke-width` in CSS or on the SVG.

## Accessibility

- An icon next to visible text is decorative: no `label`.
- An icon-only button or link carries its accessible name on the control (`aria-label` on the `<button>`), not on the icon.
- A meaningful standalone icon gets `label`, which renders `role="img"` and `aria-label`.
- Never remove an existing control's accessible name when swapping icons.

## Adopting in an existing app

- Inspect first: package manager, framework, existing icon library, and the project's lint/build/test commands.
- Leave another icon library in place unless the user names icons to replace. To replace, map each one with the search script, show the mapping before editing, and remove the old dependency only after nothing imports it.
- Run the project's checks afterwards.
