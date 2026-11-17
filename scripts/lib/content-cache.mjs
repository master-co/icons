import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rename, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';

// Hash names and bytes, not mtimes: touching a source must not rebuild it, while
// renames, removals and same-size edits must invalidate the result.
export async function contentKey(paths) {
  const hash = createHash('sha256');
  async function visit(path, name) {
    const info = await stat(path);
    hash.update(JSON.stringify([name, info.isDirectory() ? 'directory' : 'file']));
    if (info.isDirectory()) {
      for (const entry of (await readdir(path)).sort()) await visit(join(path, entry), `${name}/${entry}`);
    } else {
      const body = await readFile(path);
      hash.update(String(body.length) + ':').update(body);
    }
  }
  for (let i = 0; i < paths.length; i++) await visit(paths[i], String(i));
  return hash.digest('hex');
}

// Generated trees are owned by their generator. Check the complete inventory so
// removing even one nested output invalidates the cache, without reading 100k files.
async function outputInventory(paths) {
  const result = [];
  for (const path of paths) {
    const info = await stat(path);
    const entries = info.isDirectory()
      ? (await readdir(path, { recursive: true, withFileTypes: true }))
        .map(entry => [relative(path, join(entry.parentPath, entry.name)), entry.isDirectory() ? 'd' : 'f'])
        .sort(([a], [b]) => a.localeCompare(b))
      : [['.', 'f']];
    result.push(entries);
  }
  return createHash('sha256').update(JSON.stringify(result)).digest('hex');
}

export async function contentCache({ inputs, outputs, file, force = false }) {
  const key = await contentKey(inputs);
  let hit = false;
  if (!force) {
    try {
      const saved = JSON.parse(await readFile(file, 'utf8'));
      hit = saved.key === key && saved.outputs === await outputInventory(outputs);
    } catch (error) {
      if (error.code !== 'ENOENT' && !(error instanceof SyntaxError)) throw error;
    }
  }
  // A failed/partial regeneration must never leave a valid completion marker.
  if (!hit) await rm(file, { force: true });
  return {
    key, hit,
    async commit() {
      // A source saved during generation belongs to the next build.
      if (await contentKey(inputs) !== key) return;
      await mkdir(dirname(file), { recursive: true });
      const temporary = `${file}.${process.pid}.tmp`;
      await writeFile(temporary, JSON.stringify({ key, outputs: await outputInventory(outputs) }));
      await rename(temporary, file);
    }
  };
}

export async function writeIfChanged(file, body) {
  const next = Buffer.from(body);
  try { if ((await readFile(file)).equals(next)) return; }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  await mkdir(dirname(file), { recursive: true });
  const temporary=`${file}.${process.pid}.tmp`;
  await writeFile(temporary, next);
  await rename(temporary,file);
}
