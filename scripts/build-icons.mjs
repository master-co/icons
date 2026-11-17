import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const flags=process.argv.slice(2).filter(arg=>['--cache','--force'].includes(arg));
execFileSync(process.execPath,['packages/icons/scripts/build.mjs',...flags],{cwd:root,stdio:'inherit'});
const frameworks=process.argv.includes('--site')?['svelte','astro']:['react','vue','svelte','preact','astro'];
for(const framework of frameworks)execFileSync(process.execPath,['scripts/build-frameworks.mjs',framework,...flags],{cwd:root,stdio:'inherit'});
