// Compatibility entry for research scripts; published assets belong to the icons workspace.
import { execFileSync } from 'node:child_process';
import { repoRoot } from './lib/paths.mjs';
execFileSync(process.execPath, ['scripts/build-icons.mjs'], {cwd: repoRoot, stdio: 'inherit'});
process.chdir(repoRoot);
await import('./build-review.mjs');
