# Master Icons

Optically sized interface icons with 16, 20 and 24px drawings and sharp, soft and rounded corners. MIT licensed; applicable upstream notices are included.

This package remains **private alpha** (`0.1.0-alpha.0`) and is not published to npm. In this repository, use `"@master/icons": "workspace:*"`. For another project, run `bun pm pack --filename ../../work/master-icons-alpha.tgz` from this directory and install the archive. Requires Node.js 22+; React 18 or 19 is an optional peer.

```js
import { Search, renderSvg } from '@master/icons';
const svg = renderSvg(Search, { size: 20, corner: 'soft', label: 'Search' });
```

```tsx
import { SearchIcon } from '@master/icons/react';
<SearchIcon size={20} corner="rounded" label="Search" />

import { SearchIcon as SmallSearch } from '@master/icons/react/16/soft';
<button aria-label="Search"><SmallSearch /></button>
```

SVG files are available at `@master/icons/svg/{16|20|24}/{sharp|soft|rounded}/{name}.svg`. Inline SVG inherits `currentColor`; an external SVG in an `<img>` does not inherit text color.

`size` defaults to 24, `corner` to `soft` and `direction` to `ltr`. Automatic optical selection chooses the nearest of 16, 20 and 24; ties choose the larger. Fixed React entries only scale when `size` changes. Unlabeled icons are decorative (`aria-hidden`); `label` adds `role="img"` and an accessible name. Standard SVG props, events and refs are supported by the React components.

The package exports data, the renderer, React components, the catalog and SVG files. Svelte can consume SVG or the renderer; a public Svelte component API is not included. Research references and review tools are not distributed in this package.

## Brand icons

72 named brand icons (71 distinct silhouettes) use the `brand-` prefix, for example `BrandMasterIcon`, `BrandGithubIcon`, and `BrandFigmaIcon`. Import them from the same framework and fixed-size entries as UI icons. OpenAI and ChatGPT expose two names for the same official Blossom. They inherit `currentColor`; corner and stroke settings preserve the original silhouette. The 16 / 20 / 24 masters adjust placement and occupied size, not the trademark geometry. Brand artwork provenance and applicable notices are in `dist/catalog.json` and `THIRD_PARTY_NOTICES.md`; the code license does not grant trademark rights.
