#!/usr/bin/env node
// Find Master Icons by name, label, keyword or alias in the installed catalog.
// Usage: node search.mjs <query...> [--catalog <path>] [--limit <n>] [--json]
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const option = name => {
  const index = args.indexOf(name);
  if (index < 0) return undefined;
  const [, value] = args.splice(index, 2);
  if (value === undefined) fail(`${name} needs a value`);
  return value;
};
function fail(message) {
  console.error(message);
  process.exit(2);
}
const json = args.includes('--json');
if (json) args.splice(args.indexOf('--json'), 1);
const explicit = option('--catalog');
const limit = Number(option('--limit') ?? 10);
const query = args.join(' ').trim();
if (!query || args.some(arg => arg.startsWith('--'))) fail('Usage: node search.mjs <query> [--catalog <path>] [--limit <n>] [--json]');

function findCatalog() {
  if (explicit) return resolve(explicit);
  const candidates = [];
  for (let dir = process.cwd(); ; dir = dirname(dir)) {
    candidates.push(join(dir, 'node_modules/@master/icons/dist/catalog.json'));
    if (dirname(dir) === dir) break;
  }
  // Shipped inside @master/icons: skills/use-master-icons/scripts -> package root.
  candidates.push(fileURLToPath(new URL('../../../dist/catalog.json', import.meta.url)));
  return candidates.find(existsSync);
}
const file = findCatalog();
if (!file || !existsSync(file)) fail('Cannot find @master/icons/dist/catalog.json. Install @master/icons or pass --catalog <path>.');
const catalog = JSON.parse(readFileSync(file, 'utf8'));

const normalize = text => String(text).toLowerCase().replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_\s]+/g, ' ').trim();
const compact = text => normalize(text).replace(/ /g, '');
const terms = normalize(query).split(' ').filter(Boolean);
const whole = compact(query).replace(/icon$/, '');

function score(icon) {
  const name = normalize(icon.name);
  const names = [icon.name, icon.component?.replace(/Icon$/, ''), icon.concept, ...(icon.aliases ?? [])].filter(Boolean).map(compact);
  const words = [icon.label, icon.categoryLabel, icon.category, ...(icon.keywords ?? [])].filter(Boolean).map(normalize);
  if (names.includes(whole)) return names[0] === whole ? 1000 : 900;
  let total = 0;
  if (words.some(word => compact(word) === whole)) total += 400;
  for (const term of terms) {
    if (name.split(' ').includes(term)) total += 60;
    else if (name.includes(term)) total += 30;
    else if (words.some(word => word.split(' ').includes(term))) total += 20;
    else if (words.some(word => word.includes(term))) total += 8;
    else return 0;
  }
  return total - name.length / 100;
}

const matches = catalog.icons
  .map(icon => ({ icon, score: score(icon) }))
  .filter(match => match.score > 0)
  .sort((a, b) => b.score - a.score || a.icon.name.localeCompare(b.icon.name))
  .slice(0, limit)
  .map(({ icon }) => ({ name: icon.name, component: icon.component, category: icon.category, label: icon.label }));

if (json) console.log(JSON.stringify(matches, null, 2));
else if (!matches.length) {
  console.log(`No icon matches "${query}". Do not invent a name; try a broader or different word.`);
  process.exitCode = 1;
} else for (const match of matches) console.log(`${match.name}\t${match.component}\t${match.category}`);
