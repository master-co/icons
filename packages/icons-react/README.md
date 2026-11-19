# @master/icons-react

Master Icons components for React: optically sized interface icons with 16, 20 and 24 px drawings and sharp, soft and rounded corners.

Documentation and the full collection: [icons.master.co](https://icons.master.co/guide/react).

This package contains only the React adapter. It depends on the matching `@master/icons` core for shared geometry and requires `react` as its only framework peer. It does not install the other icon adapters.

```sh
npm install @master/icons-react
```

The matching `@master/icons` core is installed with it.

```js
import { SearchIcon } from '@master/icons-react';
import { SearchIcon as SmallSearch } from '@master/icons-react/16/soft';
```

Dynamic components select among 16, 20 and 24 px optical sizes and sharp, soft and rounded corners. Fixed imports contain one optical size and corner with its supported stroke widths, and still accept a display `size`. Both entries accept numeric `strokeWidth` in 0.25 increments to select precomputed stroke geometry. Unused icons can be tree-shaken. Direct component imports are also available at `@master/icons-react/icons/search` and `@master/icons-react/16/soft/search`.

For one original drawing at its native stroke width, import the component by default:

```js
import SearchIcon from '@master/icons-react/native/16/soft/search';
```

Native entries support all sizes and corners. Choose a dynamic or fixed entry to use `strokeWidth`.

See the [usage guide](https://icons.master.co/guide/react) and the [core README](https://github.com/master-co/icons/tree/main/packages/icons#readme) for props, accessibility, direction and framework examples. Geometry and its applicable artwork notices are supplied by `@master/icons`; code is MIT licensed.

Sources are in the [master-co/icons](https://github.com/master-co/icons) repository; `dist/` is generated.
