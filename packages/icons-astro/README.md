# @master/icons-astro

Master Icons components for Astro: optically sized interface icons with 16, 20 and 24 px drawings and sharp, soft and rounded corners.

Documentation and the full collection: [icons.master.co](https://icons.master.co/guide/astro).

This package contains only the Astro adapter. It depends on the matching `@master/icons` core for shared geometry and requires `astro` as its only framework peer. It does not install the other icon adapters.

```sh
npm install @master/icons-astro
```

The matching `@master/icons` core is installed with it.

```js
import { SearchIcon } from '@master/icons-astro';
import { SearchIcon as SmallSearch } from '@master/icons-astro/16/soft';
```

Dynamic components select among 16, 20 and 24 px optical sizes and sharp, soft and rounded corners. Fixed imports contain one optical size and corner with its supported stroke widths, and still accept a display `size`. Both entries accept numeric `strokeWidth` in 0.25 increments to select precomputed stroke geometry. Unused icons can be tree-shaken. Direct component imports are also available at `@master/icons-astro/icons/search` and `@master/icons-astro/16/soft/search`.

For one original drawing at its native stroke width, import the component by default:

```js
import SearchIcon from '@master/icons-astro/native/16/soft/search';
```

Native entries support all sizes and corners. Choose a dynamic or fixed entry to use `strokeWidth`.

Native components are compiled by your application’s Astro tooling. See the [usage guide](https://icons.master.co/guide/astro) and the [core README](https://github.com/master-co/icons/tree/main/packages/icons#readme) for props, accessibility, direction and framework examples. Geometry and its applicable artwork notices are supplied by `@master/icons`; code is MIT licensed.

Sources are in the [master-co/icons](https://github.com/master-co/icons) repository; `dist/` is generated.
