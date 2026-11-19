import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { catalog } from '../packages/icons/src/catalog.mjs';
import { sizes, corners } from '../packages/icons/src/geometry.mjs';
import { writeIfChanged } from './lib/content-cache.mjs';

const manifestPath = resolve('package.json');
const command = process.argv[2];
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const framework = manifest.name?.match(/^@master\/icons-(react|vue|svelte|preact|astro)$/)?.[1];
if (!framework || !['add', 'remove'].includes(command)) {
  throw new Error('Usage from a framework package: node ../../scripts/framework-package-exports.mjs add|remove');
}

// Keep the workspace manifest small and give each packed leaf an exact name.
// A wildcard pointing to the common declaration would also type-check typos.
if (command === 'add') {
  const extension = framework === 'svelte' || framework === 'astro' ? framework : 'js';
  for (const size of sizes) for (const corner of corners) for (const { name } of catalog) {
    const path = `./native/${size}/${corner}/${name}`;
    const target = `./dist/${path.slice(2)}.${extension}`;
    manifest.exports[path] = {
      types: './dist/native.d.ts',
      ...(framework === 'svelte' ? { svelte: target } : {}),
      import: target,
      default: target,
    };
  }
} else {
  for (const path of Object.keys(manifest.exports)) {
    if (path.startsWith('./native/')) delete manifest.exports[path];
  }
}
await writeIfChanged(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
