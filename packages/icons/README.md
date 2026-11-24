# Master Icons

Optically sized interface icons with 16, 20 and 24 px drawings and sharp, soft and rounded corners.

Documentation and the full collection: [icons.master.co](https://icons.master.co).

This is the framework-neutral core: icon data, the SVG renderer, the catalog and SVG files. For components, install the package for your framework instead; it brings this core with it.

```sh
npm install @master/icons         # SVG and JavaScript
npm install @master/icons-react   # or -vue, -svelte, -preact, -astro
```

The core package requires Node.js 22 or later; framework tools may require a newer version.

```js
import { Search, renderSvg } from '@master/icons';
const svg = renderSvg(Search, { size: 20, corner: 'soft', label: 'Search' });
```

```tsx
import { SearchIcon } from '@master/icons-react';
<SearchIcon size={20} corner="rounded" label="Search" />

import { SearchIcon as SmallSearch } from '@master/icons-react/16/soft';
<button aria-label="Search"><SmallSearch /></button>
```

SVG files are available at `@master/icons/svg/{16|20|24}/{sharp|soft|rounded}/{name}.svg`. Inline SVG inherits `currentColor`; an external SVG in an `<img>` does not inherit text color.

## Framework packages

All frameworks use the same drawings and expose the same icon names. Install only the `@master/icons-{framework}` package you use. Each adapter depends on this shared core and has exactly one required framework peer; the core has no framework dependencies.

| Framework | Entry | Supported peer | Validation version |
| --- | --- | --- | --- |
| React | `@master/icons-react` | 18 / 19 | 19.3.1 |
| Vue | `@master/icons-vue` | 3.5+ within Vue 3 | 3.5.45 |
| Svelte | `@master/icons-svelte` | 5 | 5.57.2 |
| Preact | `@master/icons-preact` | 11 | 11.2.0 |
| Astro | `@master/icons-astro` | 7 | 7.4.2 |

Each framework package also has all nine fixed variants at `@master/icons-{framework}/{16|20|24}/{sharp|soft|rounded}`. A generic icon includes nine optical size and corner combinations with their supported stroke widths; a fixed icon includes only its selected size and corner with the supported widths. Both forms tree-shake unused icons.

All five packages expose individual native-stroke icons at `@master/icons-{framework}/native/{16|20|24}/{sharp|soft|rounded}/{name}`.

```js
import SearchIcon from '@master/icons-svelte/native/16/soft/search';
```

Each native leaf exports its component as default and loads one original drawing. It accepts a display `size` and the adapter's SVG props. Use a fixed or dynamic entry to select a custom `strokeWidth`.

### Vue

```vue
<script setup lang="ts">
import { SearchIcon } from '@master/icons-vue';
import { SearchIcon as SmallSearch } from '@master/icons-vue/16/soft';
</script>

<template>
  <SearchIcon :size="20" corner="rounded" label="Search" />
  <SmallSearch class="icon" />
</template>
```

Vue accepts `opticalSize` in JavaScript and `optical-size` in templates. SVG attributes and event listeners are forwarded to the SVG root. Icons are functional components; a Vue component ref is not an SVG element ref.

### Svelte

```svelte
<script lang="ts">
  import { SearchIcon } from '@master/icons-svelte';
  import { SearchIcon as SmallSearch } from '@master/icons-svelte/16/soft';
  let element = $state<SVGSVGElement>();
</script>

<SearchIcon size={20} corner="rounded" label="Search" bind:ref={element} />
<SmallSearch class="icon" />
```

Svelte entries ship native `.svelte` sources for your Svelte 5 tooling to compile for SSR and the browser. Use Svelte 5 event props such as `onclick`; `bind:ref` exposes the SVG element.

### Preact

```tsx
import { SearchIcon } from '@master/icons-preact';
import { SearchIcon as SmallSearch } from '@master/icons-preact/16/soft';

<SearchIcon size={20} corner="rounded" label="Search" />;
<SmallSearch class="icon" />;
```

Use your application's Preact JSX configuration. SVG props, events and SVG refs are supported without a React dependency.

### Astro

```astro
---
import { SearchIcon } from '@master/icons-astro';
import { SearchIcon as SmallSearch } from '@master/icons-astro/16/soft';
---

<SearchIcon size={20} corner="rounded" label="Search" />
<SmallSearch class:list={['icon', { active: true }]} />
```

Astro entries ship native `.astro` components. They render inline SVG without client-side icon JavaScript and accept Astro SVG attributes, `class:list` and a default slot. They do not require a framework integration or a `client:*` directive.

## Shared behavior

`size` defaults to 24, `corner` to `soft` and `direction` to `ltr`. Automatic optical selection chooses the nearest of 16, 20 and 24; ties choose the larger. Fixed entries do not accept `corner` or `opticalSize`; changing `size` only scales the selected drawing. CSS width/height do not change the optical drawing.

`strokeWidth` selects precomputed geometry for both dynamic and fixed icons. Values use native viewBox units in 0.25 increments and clamp to 0.75–1.5 (16 px), 1–2 (20 px), or 1.25–2.5 (24 px). Invalid nonpositive, nonfinite or non-quarter-step values throw. Omit it for the original drawing. Cutouts and masks are redrawn for the selected width rather than thickened in place; brand silhouettes keep their shape. See [stroke width](https://icons.master.co/guide/stroke-width). Use `:stroke-width="2"` in Vue templates and `strokeWidth={2}` in JSX, Svelte and Astro. The [collection](https://icons.master.co/icons) copies framework component usage, including this prop when needed.

Unlabeled icons are decorative (`aria-hidden`). `label` adds `role="img"` and an accessible name; `aria-label` and `aria-labelledby` are also supported by framework components. `direction="rtl"` mirrors only directional icons. Standard SVG attributes may override defaults, and design options are consumed rather than forwarded as DOM attributes.

This core package exports data, the SVG renderer, the catalog (`@master/icons/catalog`) and SVG files. Framework components live in the separate `@master/icons-*` packages. Research references and review tools are not distributed in this package.

## Brand icons

Brand icons use the `brand-` prefix, for example `BrandMasterIcon`, `BrandGithubIcon`, and `BrandFigmaIcon`. Import them from the same framework and fixed-size entries as UI icons. OpenAI and ChatGPT expose two names for the same official Blossom. They inherit `currentColor`; corner and stroke settings preserve the original silhouette, while the 18 `-outline` versions, such as `BrandGithubOutlineIcon`, accept `strokeWidth`. The 16 / 20 / 24 masters adjust placement and occupied size, not the trademark geometry. Brand names and marks belong to their respective owners.

## License

Master draws its interface icons for 16, 20 and 24 px, with design references including Lucide, Tabler, Heroicons, Phosphor, Radix, Feather, Iconoir and Hugeicons Free. Master's code and original drawings use the [MIT license](https://icons.master.co/LICENSE.txt). See the [third-party notices](https://icons.master.co/THIRD_PARTY_NOTICES.md) for adapted drawings, brand artwork and research credits.
