import { readFile, writeFile, readdir, copyFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { gzipSync, strToU8 } from 'fflate';

// Run by build.mjs from the package root. A self-contained review file also
// works over file://, without a running server or external fonts/scripts.
const data = JSON.parse(await readFile('dist/preview/data.json', 'utf8'));
data.thirdPartyNotices = await readFile('THIRD_PARTY_NOTICES.md','utf8');
data.upstreamLicenses = Object.fromEntries(await Promise.all((await readdir('licenses')).sort().map(async name=>[name,await readFile('licenses/'+name,'utf8')])));
data.inlineReferences = Object.fromEntries(await Promise.all(data.references.references.map(async ref => [ref.localPath, await readFile(ref.localPath, 'utf8')])));
const bundle = await build({entryPoints:['preview/app.js'],bundle:true,write:false,format:'esm',minify:true,plugins:[{name:'local-runtime',setup(builder){builder.onResolve({filter:/^\/dist\/runtime\.js$/},()=>({path:process.cwd()+'/src/runtime.mjs'}));}}]});
const css = await readFile('preview/style.css','utf8');
delete data.catalog.inventory;
const payload=Buffer.from(gzipSync(strToU8(JSON.stringify(data)),{level:9,mtime:0})).toString('base64');
const inline='globalThis.MASTER_ICONS_PAYLOAD='+JSON.stringify(payload)+';\n'+bundle.outputFiles[0].text;
await writeFile('dist/preview/app.js',bundle.outputFiles[0].text);
let html = await readFile('preview/index.html','utf8');
html = html.replace('<link rel="stylesheet" href="/dist/preview/style.css">',()=>`<style>${css}</style>`)
  .replace('<script type="module" src="/dist/preview/app.js"></script>',()=>`<script type="module">${inline.replace(/<\/script/gi,'<\\/script')}</script>`)
  .replace('href="/"','href="#"').replaceAll('href="/docs/','href="./').replace('href="/THIRD_PARTY_NOTICES.md"','href="./THIRD_PARTY_NOTICES.md"');
await writeFile('dist/preview.html',html);

for (const name of ['design-system.md','research.md']) await copyFile('docs/'+name,'dist/'+name);
await copyFile('THIRD_PARTY_NOTICES.md','dist/THIRD_PARTY_NOTICES.md');
