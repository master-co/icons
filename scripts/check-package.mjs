import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, writeFile, readFile, readdir, rm, rename } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
import { catalog } from '../packages/icons/src/catalog.mjs';
import { checkPackedFrameworks } from '../packages/icons/tests/helpers/packed-frameworks.mjs';
import { packIcons } from './pack-icons.mjs';

await mkdir('work',{recursive:true});
const packages=await packIcons();
const {entries}=packages[0];
assert.equal(entries.filter(x=>x.endsWith('.svg')).length,catalog.length*9);
for(const path of ['package/LICENSE','package/THIRD_PARTY_NOTICES.md','package/licenses/hugeicons-MIT.txt','package/licenses/lucide.txt','package/licenses/simple-icons-CC0.txt','package/licenses/simple-icons-DISCLAIMER.md','package/licenses/openai-brand.txt','package/licenses/brand-additions.txt','package/dist/runtime.d.ts','package/dist/presentation.js','package/skills/master-icons/SKILL.md','package/skills/master-icons/scripts/search.mjs'])assert.ok(entries.includes(path),path);
assert.ok(!entries.some(path=>/\/(react|vue|svelte|preact|astro)(\/|-runtime\.)/.test(path)),'Core must not ship framework components');
assert.equal(packages[0].manifest.peerDependencies,undefined,'Core must not install any framework');
const consumer=await mkdtemp(resolve('work/package-consumer-'));
await mkdir(consumer+'/node_modules/@master',{recursive:true});
for(const pkg of packages){
 assert.ok(!pkg.entries.some(x=>/\/(src|references|preview|tests|work|node_modules)\//.test(x)));
 if(pkg.name!=='@master/icons'){
  const framework=pkg.name.replace('@master/icons-','');
  assert.deepEqual(pkg.manifest.dependencies,{'@master/icons':packages[0].manifest.version},'Packed dependencies must use the matching version, not workspace paths');
  assert.deepEqual(Object.keys(pkg.manifest.peerDependencies),[framework]);
  assert.equal(pkg.entries.filter(path=>path.endsWith('.svg')).length,0,'Adapters share geometry from core');
  for(const other of ['react','vue','svelte','preact','astro'].filter(name=>name!==framework))assert.ok(!pkg.entries.some(path=>path.endsWith('.'+other)),`Unexpected ${other} in ${pkg.name}`);
 }
 execFileSync('tar',['-xzf',pkg.archive,'-C',consumer]);
 await rename(consumer+'/package',consumer+'/node_modules/'+pkg.name);
}
await writeFile(consumer+'/package.json','{"private":true,"type":"module"}');
await writeFile(consumer+'/smoke.mjs',`
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { readFileSync } from 'node:fs';
import { Search, User, Bell, Ticket, ChartArea, FolderSearch, FileArchive, Webhook, Selection, DatabaseBackup, GitPullRequest, renderSvg, escapeXml, opticalSizes } from '@master/icons';
import { SearchIcon, TicketIcon, ChartAreaIcon, PinOffIcon, HandshakeIcon, FileArchiveIcon, DatabaseSearchIcon, PackageReturnIcon } from '@master/icons-react';
import { SearchIcon as Fixed } from '@master/icons-react/16/soft';
assert.equal(opticalSizes.length,3);
assert.match(renderSvg(Selection,{size:16}), /stroke-linecap="butt"/);
assert.match(renderSvg(DatabaseBackup,{size:24}), /fill-rule="evenodd"/);
assert.match(renderSvg(GitPullRequest,{size:20}), /viewBox="0 0 20 20"/);
assert.match(renderToStaticMarkup(createElement(DatabaseSearchIcon,{size:16,label:'Query'})), /aria-label="Query"/);
assert.match(renderToStaticMarkup(createElement(PackageReturnIcon,{corner:'sharp'})), /viewBox="0 0 24 24"/);
assert.match(renderSvg(Webhook,{size:16}), /rotate/);
assert.match(renderSvg(FileArchive,{size:16}), /stroke-dasharray/);
assert.match(renderToStaticMarkup(createElement(FileArchiveIcon,{size:16})), /stroke-dasharray/);
assert.match(renderToStaticMarkup(createElement(HandshakeIcon,{size:20,label:'Collaborate'})), /aria-label="Collaborate"/);
assert.match(renderSvg(FolderSearch,{size:16}), /viewBox="0 0 16 16"/);
assert.match(renderToStaticMarkup(createElement(PinOffIcon,{size:20,label:'Unpin'})), /aria-label="Unpin"/);
assert.match(renderSvg(User,{size:16}), /viewBox="0 0 16 16"/);
assert.match(renderSvg(Bell), /<svg/);
assert.match(renderSvg(Ticket,{size:16}), /stroke-dasharray/);
assert.doesNotMatch(renderSvg(ChartArea), /opacity=|fill="currentColor"/);
assert.match(renderToStaticMarkup(createElement(TicketIcon,{size:16})), /stroke-dasharray/);
assert.doesNotMatch(renderToStaticMarkup(createElement(ChartAreaIcon)), /opacity=|fill="currentColor"/);
assert.equal(escapeXml('<'), '&lt;');
assert.match(renderSvg(Search), /viewBox="0 0 24 24"/);
assert.match(renderToStaticMarkup(createElement(SearchIcon,{size:20,label:'Search'})), /aria-label="Search"/);
assert.match(renderToStaticMarkup(createElement(Fixed)), /viewBox="0 0 16 16"/);
assert.match(renderToStaticMarkup(createElement(Fixed,{strokeWidth:2})), /stroke-width="1.5"/);
assert.match(renderToStaticMarkup(createElement(SearchIcon,{strokeWidth:2})), /stroke-width="2"/);
assert.match(readFileSync(new URL(import.meta.resolve('@master/icons/svg/16/soft/search.svg')),'utf8'), /MIT License/);
console.log('Packed consumer: data, runtime, dynamic/static React, SVG subpath and notices passed.');
`);
execFileSync(process.execPath,[consumer+'/smoke.mjs'],{stdio:'inherit'});
// The shipped skill finds real names in the installed catalog, never an invented one.
const search=(...args)=>execFileSync(process.execPath,['node_modules/@master/icons/skills/master-icons/scripts/search.mjs',...args],{cwd:consumer,encoding:'utf8'});
assert.match(search('search','--limit','1'),/^search\tSearchIcon\tactions\n$/);
assert.ok(JSON.parse(search('folder','--json')).some(icon=>icon.component==='FolderSearchIcon'));
assert.throws(()=>search('zzzz-no-such-icon'));
console.log('Packed skill: catalog search passed.');
await checkPackedFrameworks(consumer);
// Use an actual package-manager install outside this repository, so ancestor
// workspace links cannot hide a missing dependency or pull in other adapters.
const installed=await mkdtemp(resolve(tmpdir(),'master-icons-install-'));
try{
 const core='file:'+packages[0].archive;
 const svelte=JSON.parse(await readFile(new URL(import.meta.resolve('svelte/package.json')),'utf8')).version;
 await writeFile(resolve(installed,'package.json'),JSON.stringify({private:true,type:'module',
  dependencies:{'@master/icons':core,'@master/icons-svelte':'file:'+packages.find(pkg=>pkg.name==='@master/icons-svelte').archive,svelte},
  overrides:{'@master/icons':core}
 }));
 // Svelte comes from the registry (a frozen CI install caches no registry metadata, so --offline cannot resolve
 // it); both Master packages must come from the archives packed here, and no other adapter may be installed.
 execFileSync('bun',['install','--ignore-scripts'],{cwd:installed,stdio:['ignore','pipe','pipe']});
 assert.deepEqual((await readdir(resolve(installed,'node_modules/@master'))).sort(),['icons','icons-svelte']);
 for(const name of ['icons','icons-svelte']){
  const installedManifest=JSON.parse(await readFile(resolve(installed,'node_modules/@master',name,'package.json'),'utf8'));
  const packedManifest=packages.find(pkg=>pkg.name===`@master/${name}`).manifest;
  assert.deepEqual(installedManifest,packedManifest,`@master/${name} must be installed from its packed archive`);
 }
 console.log('Isolated installation: only the packed core and the requested Svelte adapter installed.');
}finally{await rm(installed,{recursive:true,force:true});}
console.log(`All ${packages.length} packages validated; framework dependency isolation and packed consumers passed. Fixture: ${consumer}`);
