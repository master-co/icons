import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {zipSync,strToU8,unzipSync} from 'fflate';
import assert from 'node:assert/strict';
import {brandCatalog} from '../packages/icons/src/brands.mjs';
const files={};
for(const size of [16,20,24])for(const corner of ['sharp','soft','rounded'])for(const b of brandCatalog){
 const path=`${size}/${corner}/${b.name}.svg`;
 files[path]=new Uint8Array(await readFile(`packages/icons/icons/${path}`));
}
const licenseFiles = brandCatalog.map(entry => entry.source.licenseFile).filter(Boolean);
for(const path of new Set(['LICENSE','THIRD_PARTY_NOTICES.md','licenses/simple-icons-CC0.txt','licenses/simple-icons-DISCLAIMER.md',...licenseFiles]))files[path]=new Uint8Array(await readFile(path));
files['README.txt']=strToU8(`Master Icons — ${brandCatalog.length} brand exports / ${brandCatalog.length*9} SVG assets\n\n16, 20 and 24 native sizes; sharp, soft and rounded preserve the same brand silhouette. Paths inherit currentColor. Original marks keep fixed geometry; outline components support calibrated stroke widths. This archive contains the native default weights.\n\nSource and brand notices: THIRD_PARTY_NOTICES.md\nBrand names and marks remain the property of their respective owners.\n`);
const bytes=zipSync(files,{level:9,mtime:new Date('2026-11-17T00:00:00Z')});
const verify=unzipSync(bytes);assert.equal(Object.keys(verify).filter(p=>p.endsWith('.svg')).length,brandCatalog.length*9);
for(const [key,value]of Object.entries(files))assert.deepEqual(verify[key],value,key);
await mkdir('work',{recursive:true});await writeFile('work/master-icons-brands.zip',bytes);
console.log(`Packaged and verified ${brandCatalog.length} brand exports / ${brandCatalog.length*9} SVGs: work/master-icons-brands.zip`);
