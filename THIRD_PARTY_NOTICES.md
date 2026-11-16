# Third-party notices

Master Icons' new source code and drawings use MIT. All icons are alpha design studies, not affiliated with or endorsed by the reference projects.

## Hugeicons Free — MIT

Copyright (c) 2025 Hugeicons. Full license: `licenses/hugeicons-MIT.txt`.

The 12 pilot subjects are documented as study/redraw work after Hugeicons Free: arrow-right, check, search, home, folder, file-text, calendar, settings, bell, user, heart, star. Their native optical coordinates and corner treatments were reconstructed, not mechanically converted from arbitrary SVGs. Attribution is retained conservatively for these studies. Individual SVG downloads include the full MIT notice; packages and ZIP downloads include the license files.

Upstream repository: https://github.com/hugeicons/hugeicons

Pinned commit: `834e28d965946c1ee60d080027fe9dae4adc58d0`.

No Hugeicons Pro artwork is included. Of the remaining drawings, 266 are authored from Master geometry primitives and two are Lucide-informed adapted redraws described below. `dist/catalog.json` identifies the provenance of every subject; `references/manifest.json` preserves the historical 48 comparison files; `references/current.json` combines 420 UI comparisons, 20 organization comparisons and 120 productivity comparisons from their versioned manifests, including semantic versus structure-only matches.

## Lucide — ISC; two adapted redraws

Copyright (c) 2026 Lucide Icons and Contributors. Full license and inherited Feather notices: `licenses/lucide.txt`.

Craft 01 redraws **megaphone** and **handshake** after Lucide's curved horn/grip and interlocking-hand constructions, at the user's request. Master rewrites their curves, proportions, corner treatments and native-size details. Attribution is retained conservatively for this deliberate adaptation. Individual SVG downloads include the complete upstream license; React packages and SVG archives include the license file and these notices. The original assets remain in the comparison workspace.

Pinned commit: `55782beff3a0133df79c417eb68f96e8f19e2404`. Original paths: `icons/megaphone.svg`, `icons/handshake.svg` in `lucide-icons/lucide`.

## Comparison-only assets

These unmodified originals are stored in `references/` for the local design study. The comparison page changes displayed color and dimensions only. These references are **excluded from the distributable icon library package** and are not Master icons.

| Project | Commit | License copy |
| --- | --- | --- |
| Tabler | `4581ad20d8d13e24f6c3be75caaea1c4ad6c4b35` | `licenses/tabler.txt` (MIT) |
| Iconoir | `39834e3f193bc0cca2c36bebb6a650471977433d` | `licenses/iconoir.txt` (MIT) |
| Lucide | `55782beff3a0133df79c417eb68f96e8f19e2404` | `licenses/lucide.txt` (ISC and inherited Feather MIT notices) |

Original notices are preserved in full. Do not remove these license copies when distributing the comparison workspace. Except for the two adapted redraws explicitly listed above, references are comparison-only assets.

## Research versus attribution

Studying a library or selecting a subject for a pilot review does not by itself assign authorship to that library. The initial notices above are preserved explicitly in `src/provenance.mjs`, independently of the pilot selection. Independently authored additions do not acquire third-party attribution merely by being compared. Per-icon source labels are not displayed in the product UI; applicable notices and comparison-asset credits remain in their appropriate files.
