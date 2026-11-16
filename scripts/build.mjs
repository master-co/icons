// Compatibility entry for research scripts; published assets belong to the icons workspace.
import { execFileSync } from 'node:child_process';
import { repoRoot, packageRoot } from './lib/paths.mjs';
execFileSync(process.execPath, ['scripts/build.mjs'], {cwd: packageRoot, stdio: 'inherit'});
process.chdir(repoRoot);
await import('./build-review.mjs');
