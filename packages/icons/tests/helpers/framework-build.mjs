import { readFile, mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';
import { compile } from 'svelte/compiler';
import { transform } from '@astrojs/compiler-rs';

export const repo = fileURLToPath(new URL('../../../../', import.meta.url));
const compiled = new Map();

export function componentPlugin(generate = 'server') {
  return {
    name: 'native-framework-components',
    setup(builder) {
      builder.onLoad({ filter: /\.(svelte|astro)$/ }, async ({ path }) => {
        const key = `${generate}:${path}`;
        if (!compiled.has(key)) {
          const source = await readFile(path, 'utf8');
          let code;
          if (path.endsWith('.svelte')) {
            const result = compile(source, { filename: path, generate, dev: false });
            if (result.warnings.length) throw new Error(JSON.stringify(result.warnings));
            code = result.js.code;
          } else {
            const result = transform(source, {
              filename: path, internalURL: 'astro/compiler-runtime',
              resultScopedSlot: true, resolvePath: specifier => specifier,
            });
            const errors = result.diagnostics.filter(item => item.severity === 'error');
            if (errors.length) throw new Error(JSON.stringify(errors));
            code = result.code;
          }
          compiled.set(key, { contents: code, loader: 'ts', resolveDir: dirname(path) });
        }
        return compiled.get(key);
      });
    },
  };
}

export async function bundle(contents, { browser = false, resolveDir = repo, external = true } = {}) {
  return build({
    stdin: { contents, resolveDir, sourcefile: 'framework-consumer.js' },
    bundle: true, format: 'esm', platform: browser ? 'browser' : 'node',
    minify: true, write: false, metafile: true,
    conditions: browser ? ['svelte', 'browser'] : ['svelte'],
    external: external ? ['react', 'react/*', 'vue', 'vue/*', 'preact', 'preact/*', 'svelte', 'svelte/*', 'astro', 'astro/*'] : [],
    plugins: [componentPlugin(browser ? 'client' : 'server')],
  });
}

export async function importBundle(result) {
  await mkdir(resolve(repo, 'work'), { recursive: true });
  const folder = await mkdtemp(resolve(repo, 'work/framework-consumer-'));
  const file = resolve(folder, 'consumer.mjs');
  await writeFile(file, result.outputFiles[0].contents);
  return import(pathToFileURL(file).href);
}
