import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, readFile, rename, rm, stat, utimes, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { contentCache, writeIfChanged } from '../../../scripts/lib/content-cache.mjs';

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'icons-content-cache-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  const source = join(root, 'src'), output = join(root, 'out');
  await mkdir(source);
  await mkdir(join(output, 'nested'), { recursive: true });
  await writeFile(join(source, 'icon'), 'one');
  await writeFile(join(output, 'nested/icon.svg'), '<svg/>');
  const options = { inputs: [source], outputs: [output], file: join(root, 'cache/state.json') };
  return { source, output, options };
}

test('content cache ignores touches but detects equal-size edits, renames and removals', async t => {
  const { source, options } = await fixture(t);
  const file = join(source, 'icon'), original = await stat(file);
  const initial = await contentCache(options);
  assert.equal(initial.hit, false);
  await initial.commit();
  await utimes(file, new Date(), new Date());
  assert.equal((await contentCache(options)).hit, true);
  await writeFile(file, 'two');
  await utimes(file, original.atime, original.mtime);
  const changed = await contentCache(options);
  assert.equal(changed.hit, false);
  await changed.commit();
  await rename(file, join(source, 'renamed'));
  const renamed = await contentCache(options);
  assert.equal(renamed.hit, false);
  await renamed.commit();
  await rm(join(source, 'renamed'));
  assert.equal((await contentCache(options)).hit, false);
});

test('missing nested outputs and forced/failed builds invalidate completion', async t => {
  const { output, options } = await fixture(t);
  await (await contentCache(options)).commit();
  await rm(join(output, 'nested/icon.svg'));
  assert.equal((await contentCache(options)).hit, false);
  await assert.rejects(readFile(options.file), { code: 'ENOENT' });
  await writeFile(join(output, 'nested/icon.svg'), '<svg/>');
  // Restoring a partial build cannot resurrect the old completion marker.
  const repaired = await contentCache(options);
  assert.equal(repaired.hit, false);
  await repaired.commit();
  assert.equal((await contentCache({ ...options, force: true })).hit, false);
  assert.equal((await contentCache(options)).hit, false);
});

test('a save during generation cannot commit a stale result', async t => {
  const { source, options } = await fixture(t);
  const building = await contentCache(options);
  await writeFile(join(source, 'icon'), 'new');
  await building.commit();
  assert.equal((await contentCache(options)).hit, false);
});

test('unchanged generated metadata keeps its mtime for HMR', async t => {
  const { output } = await fixture(t);
  const file = join(output, 'guide.json');
  await writeIfChanged(file, '{}');
  await utimes(file, new Date(0), new Date(0));
  await writeIfChanged(file, '{}');
  assert.equal((await stat(file)).mtimeMs, 0);
  await writeIfChanged(file, '{"changed":true}');
  assert.equal(await readFile(file, 'utf8'), '{"changed":true}');
});
