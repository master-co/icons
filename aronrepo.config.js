const sizes = [16, 20, 24]
const corners = ['sharp', 'soft', 'rounded']

/** @type {import('aronrepo').AronrepoConfig} */
export default {
  release: {
    // Only the owner raises minor and major versions, with Bump(Minor) and Bump(Major) commits.
    mode: 'explicit',
    // Release paths derive from the public workspace packages (packages/*).
    // Download sets are named without a version, so the site links to releases/latest/download/<name>.
    // `bun run build:icons` builds the nine native sets and `bun run build:strokes` the three custom-weight sets.
    assets: [
      ...sizes.flatMap(size => corners.map(corner => ({ path: `packages/icons/dist/downloads/master-icons-${size}-${corner}.zip`, name: `master-icons-${size}-${corner}.zip` }))),
      ...sizes.map(size => ({ path: `work/stroke-assets/release/master-icons-${size}-strokes.zip`, name: `master-icons-${size}-strokes.zip` }))
    ]
  }
}
