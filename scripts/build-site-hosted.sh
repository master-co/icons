#!/usr/bin/env bash
# The Cloudflare Pages build command for pages-stable: `bun run build:site:cloudflare-pages`.
# The release workflow moves pages-stable only after a release is on the registry (or when a push releases
# nothing), so the site documents the newest version users can install.
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

export PUBLIC_URL=https://icons.master.co
# The newest published release; a build fails rather than documenting a version nobody can install.
PUBLIC_VERSION=$(npm view @master/icons version)
if [[ ! "$PUBLIC_VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "The registry serves no stable @master/icons release: '$PUBLIC_VERSION'" >&2
  exit 1
fi
export PUBLIC_VERSION

bun install --frozen-lockfile
bun run build:site
