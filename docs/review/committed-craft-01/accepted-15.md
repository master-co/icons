# Accepted refinement of 15 existing icons

Approved by the user on 2026-11-17 after viewing the before/after comparison at native sizes with enlarged detail: 「這 15 顆精修可以，幫我把這次的修改 commit。」

The changes follow master-icons skill 0.5.11. The before drawings are the actual working-tree drawings preserved when the refinement started, in `references/committed-craft-01/master-before.json`. The 15 approved drawings match the isolated commit build exactly. New icons and unrelated work in progress are excluded.

| Icons | Refinement |
| --- | --- |
| link, unlink | Tangent capsule curves; shared rotated link geometry; separated break marks at every native size. |
| keyboard-return | Raise the arrow and shorten its wings to clear the bottom of the key. |
| check-circle | Pull the check endpoint inward at 16px and 20px. |
| subscript, superscript | Use a curved typographic x with a waist and directed terminals. |
| list-plus, list-minus | Move the action to the middle of the right column and shorten content rows. |
| file-question | Lower and shorten the question head; raise its tail to preserve spacing. |
| file-code, file-json | Narrow the internal brackets to increase side clearance. |
| folder-up, folder-down | Shorten the arrow's lower extent to clear the folder floor. |
| calendar-plus | Reduce the cross in each native master to increase header clearance. |
| volume | Restore the outer wave at 16px so it differs from volume-low. |

Individual decisions, reference provenance, before/after hashes and evidence paths are recorded in `docs/refinement-ledger.json`. Only these 15 records have newly recorded user approval. Review evidence covers 16/20/24px, sharp/soft/rounded, light/dark backgrounds, low contrast and adjacent text.

The active Tabler comparison for volume is the double-wave `volume.svg` from the same pinned source commit. The former single-wave reference is preserved in `references/committed-craft-01/previous-volume-reference.json`. No third-party path was copied into the icon geometry.

The commit was assembled and checked independently of the larger working tree:

- `bun run build:icons`: 480 existing names, 4,320 SVGs.
- `bun run build:review` and `bun run validate`: passed, including review hashes, reference provenance and licensed downloads.
- Contour, junction, paint and occlusion tests: 14 passed.
- All SVG differences from the parent commit belong to the 15 approved names and match the reviewed working-tree SVGs byte for byte.

The retained reviews and broader local audit remain separate from this focused commit.
