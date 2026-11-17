import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {chromium} from '@playwright/test';
const id=process.argv[2],pairs=process.argv.slice(3).map(x=>x.split(':'));
const {reference}=await import('./lib/atlas-reference.mjs');
const rows=[];
for(const pair of pairs){let row=`<b>${pair[0]}</b>`;for(let i=0;i<2;i++){const ref=await reference(pair[0],pair[i+1]||pair[0],i?'tabler':'lucide');row+=`<div>${ref.svg(48)}<small>${ref.record.library} · ${ref.record.sourceName}</small></div>`;}rows.push(`<article>${row}</article>`);}
const html=`<meta charset="utf-8"><style>body{font:12px system-ui;margin:24px;color:#27272a;background:#fafafa}main{display:grid;grid-template-columns:1fr 1fr;gap:18px}article{display:grid;grid-template-columns:120px 1fr 1fr;align-items:center;border-bottom:1px solid #ddd;padding:15px 0}svg{display:block}small{display:block;font-size:9px;margin-top:8px}</style><h2>${id} · pinned source study</h2><main>${rows.join('')}</main>`;
await mkdir(`docs/review/atlas-01/${id}`,{recursive:true});await writeFile(`docs/review/atlas-01/${id}/sources.html`,html);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1000,height:650}});await p.setContent(html);await p.screenshot({path:`docs/review/atlas-01/${id}/sources.png`,fullPage:true});await b.close();
