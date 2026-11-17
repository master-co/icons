import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const registry={openmoji:['OpenMoji','hfg-gmuend/openmoji','3e01de523ddefe9c5e46a7765b15efef04bf9002','black/svg','CC-BY-SA-4.0'],mdi:['Material Design Icons','Templarian/MaterialDesign','2424e748e0cc63ab7b9c095a099b9fe239b737c0','svg','Apache-2.0'],'lucide-lab':['Lucide Lab','lucide-icons/lucide','55782beff3a0133df79c417eb68f96e8f19e2404','lab','ISC AND MIT'],hugeicons:['Hugeicons Free','hugeicons/hugeicons','834e28d965946c1ee60d080027fe9dae4adc58d0','icons','MIT'],iconoir:['Iconoir','iconoir-icons/iconoir','39834e3f193bc0cca2c36bebb6a650471977433d','icons/regular','MIT'],lucide:['Lucide','lucide-icons/lucide','55782beff3a0133df79c417eb68f96e8f19e2404','icons','ISC AND MIT'],tabler:['Tabler','tabler/tabler-icons','4581ad20d8d13e24f6c3be75caaea1c4ad6c4b35','icons/outline','MIT'],phosphor:['Phosphor','phosphor-icons/core','2b75f3ad12b420c9504ef05df8d2564a28f8500e','assets/regular','MIT']};
export async function reference(name,spec,fallback){
 const match=spec.startsWith('~')?'structural':'exact';spec=spec.replace(/^~/,'');const [key,sourceName]=spec.includes('/')?spec.split('/'):[fallback,spec];
 const [library,repository,commit,dir,license]=registry[key],path=`${dir}/${sourceName}.svg`,localPath=`references/atlas-01/${key}-${sourceName}.svg`;
 const tree=JSON.parse(await readFile(`work/atlas-01/${key==='lucide-lab'?'lucide':key}-tree.json`)).tree;if(!tree.some(x=>x.path===path))throw Error(`Missing ${key} ${sourceName} (${name})`);
 let body;try{body=await readFile(localPath,'utf8')}catch{const r=await fetch(`https://raw.githubusercontent.com/${repository}/${commit}/${path}`);if(!r.ok)throw Error(path);body=await r.text();await writeFile(localPath,body)}
 const record={name,library,repository,commit,path,localPath,url:`https://github.com/${repository}/blob/${commit}/${path}`,sha256:createHash('sha256').update(body).digest('hex'),license,sourceName,match,role:'comparison-only'};
 // Compare monochrome paint at the same color without changing source
 // geometry, stroke widths, opacities, or the saved upstream SVG.
 const svg=(size)=>body.replace(/(stroke|fill)="(#[0-9a-f]+|black)"/gi,'$1="currentColor"').replace(/<svg\b([^>]*)>/,(_,attrs)=>'<svg '+attrs.replace(/\s(?:width|height)="[^"]*"/g,'')+(!/\bfill=/.test(attrs)?' fill="currentColor"':'')+` width="${size}" height="${size}">`);
 return {record,svg};
}
