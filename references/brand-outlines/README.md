# Brand outline sources

`wechat.svg` is the unchanged Tencent TDesign path (MIT; see `licenses/tdesign-MIT.txt`).

`tabler/` preserves selected unmodified Tabler source files at commit `85e870dbe8680c2d6deefd062122d30ef1544a41`, Copyright (c) 2020-2026 Paweł Kuna, MIT (`licenses/tabler-brands-MIT.txt`). Comparison-only files are also retained; their presence does not mean they are shipped.

`authoring/` contains the reviewed editable stroke geometry and per-brand decisions. The existing pinned Simple Icons source (CC0-1.0) supplies the brand identity reference, identified by `source.identitySource` in `packages/icons/src/brands.json`. Master adaptations are MIT. These are unofficial icon interpretations, not official brand assets.

`finished/` is generated source-space reference ink, used for optical placement and provenance; it is not the final native-size stroke weight. `outlineSvg` retains editable geometry in the authoring records so package generation can bake every supported weight; the runtime receives only ready-to-render paths. Run `node scripts/build-brand-outlines.mjs` from the repository root to rebuild the 18 social outlines and their catalog records. This does not modify the original brand marks. The compound paths use `evenodd`; omitting it can fill their holes. CurrentColor, corner and stroke behavior is verified in the brand package tests.

Review at native sizes and in rows: `docs/review/brand-outline-craft-05/index.html`. Earlier drafts and rejected directions: `docs/review/brand-outlines/candidates/`, plus the first-stage SVGs in the review folder. The current decision document is `docs/review/brand-outline-craft-05/decisions.md`. The previous selection document remains historical. Master has no outline export, per the user’s latest direction.

`data-ink="inside"` establishes the reference ink inside the original boundary; above that reference weight, ink expands on both sides to protect counters. Facebook, TikTok and Vimeo use centre-line contours to retain their narrow counters at the calibrated weight; `scripts/lib/brand-ink.mjs` bakes it to a standard filled SVG. Other paths are editable centre-line strokes or solid brand details. This authoring attribute is not shipped in the package SVGs.

Primary outline widths are calibrated in native output units after accounting for each brand’s optical transform (16/20/24 defaults: 1.25/1.5/1.75). Source stroke widths establish the reference geometry, not different public stroke weights; solid eyes, lettering and source details keep their identity. `data-cut` names the background path to subtract from and `data-clearance` sets the true outside offset from foreground ink. Pinterest uses this to cut its left loop from the long stem at every width. Only identity aliases are grouped in the list; original/outline remain linked in detail views.

`outlineSvgs` stores reviewed native-size authoring variants when needed. SoundCloud uses three bars at 16px and four at 20/24px; `source.opticalSources` pins the extra source and its hash. WeChat uses the same true outside-clearance mechanism as Pinterest to keep its front bubble separate from the rear contour.
