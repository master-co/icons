// Authoring only: preserve reference ink and optical bounds. The drawing pipeline
// calibrates strokes in native units before baking each size/weight; no geometry
// engine ships in the runtime. Brand corners remain fixed.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {bakeBrandSvg} from './lib/brand-ink.mjs';
const sha=data=>createHash('sha256').update(data).digest('hex');
const records=JSON.parse(await readFile('packages/icons/src/brands.json'));
const manifest=JSON.parse(await readFile('references/brand-outlines/authoring/manifest.json'));
const commit='85e870dbe8680c2d6deefd062122d30ef1544a41';
const tablerLicense=(await readFile('licenses/tabler-brands-MIT.txt','utf8')).trim();
for(const item of manifest){
 const base=records.find(b=>b.name==='brand-'+item.name);
 const authoringPath=`references/brand-outlines/authoring/${item.name}.svg`;
 const svg=await readFile(authoringPath,'utf8');
 const outlineSvgs={},opticalSources=[];
 for(const [size,file]of Object.entries(item.opticalSources??{})){
  const path=`references/brand-outlines/authoring/${file}`,text=await readFile(path,'utf8');
  outlineSvgs[size]=text;opticalSources.push({size:Number(size),path,sha256:sha(text)});
 }
 const {d,fillRule,bounds}=bakeBrandSvg(svg);
 const localPath=`references/brand-outlines/finished/${item.name}.svg`;
 const finished=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="${fillRule}" d="${d}"/></svg>\n`;
 await writeFile(localPath,finished);
 const tabler=item.upstream==='tabler',tdesign=item.upstream==='tdesign';
 const originalPath=tdesign?'references/brand-outlines/wechat.svg':tabler?`references/brand-outlines/tabler/${item.name}.svg`:base.source.localPath;
 const source={kind:'brand-adaptation',library:tdesign?'Master Icons; Tencent TDesign Icons':tabler?'Master Icons; Tabler Icons; Simple Icons brand contours':'Master Icons, based on Simple Icons',author:tdesign?'TDesign; Master and contributors':tabler?'Paweł Kuna; Master and contributors':'Simple Icons contributors; Master and contributors; respective brand owners',license:'MIT',licenseFile:tdesign?'licenses/tdesign-MIT.txt':tabler?'licenses/tabler-brands-MIT.txt':'licenses/simple-icons-CC0.txt',commit:tdesign?'8bbfc0d06237828d8843d47ca71992423071f4be':tabler?commit:base.source.commit,reference:tdesign?'https://github.com/Tencent/tdesign-icons/blob/8bbfc0d06237828d8843d47ca71992423071f4be/svg/logo-wechat-stroke.svg':tabler?`https://github.com/tabler/tabler-icons/blob/${commit}/icons/outline/brand-${item.name}.svg`:base.source.reference,official:base.source.official,guidelines:base.source.guidelines,localPath,sha256:sha(finished),originalPath,originalSha256:sha(await readFile(originalPath)),authoringPath,authoringSha256:sha(svg),identitySource:{reference:base.source.reference,localPath:base.source.localPath,sha256:base.source.sha256,license:base.source.license},modifications:`Unofficial outline interpretation for social links. ${item.observation} Editable strokes baked at each supported weight; optical placement at 16/20/24 px. Brand-specific corners retained.`,...(tdesign?{notice:(await readFile('licenses/tdesign-MIT.txt','utf8')).trim()}:tabler?{notice:tablerLicense}:{upstreamLicense:'CC0-1.0'})};
 const record={name:`brand-${item.name}-outline`,styleOf:base.name,label:`${base.label} Outline`,profile:base.profile,keywords:[...base.keywords,'outline','線條','描邊'],viewBox:[0,0,24,24],bounds,paths:[d],fillRule,outlineSvg:svg,optical:Object.fromEntries([16,20,24].map((s,i)=>[s,{extent:item.extents[i],dx:0,dy:0}])),source};
 const index=records.findIndex(b=>b.name===record.name);
 if(opticalSources.length){record.outlineSvgs=outlineSvgs;record.source.opticalSources=opticalSources;}
 if(index>=0)records[index]=record;else records.push(record);
}
await writeFile('packages/icons/src/brands.json',JSON.stringify(records,null,2)+'\n');
console.log(`Baked ${manifest.length} reviewed social outlines; existing brand marks preserved.`);
