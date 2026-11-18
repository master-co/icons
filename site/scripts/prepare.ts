import { readFile, readdir, cp, rm, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'
import {buildStrokes} from '../../scripts/lib/build-strokes.mjs'
import {contentCache, writeIfChanged} from '../../scripts/lib/content-cache.mjs'
import {lockGeneration} from '../../scripts/lib/generation-lock.mjs'
import {generateLlms,llmsOutputs} from './llms.ts'

const started=performance.now()
const site=fileURLToPath(new URL('../',import.meta.url))
const repo=join(site,'..')
const icons=join(repo,'packages/icons')
const force=Boolean(process.env.TURBO_HASH)||process.argv.includes('--force')
await lockGeneration(repo)
const catalog=JSON.parse(await readFile(join(icons,'dist/catalog.json'),'utf8'))
const strokes=process.env.TURBO_HASH?join(repo,'work/stroke-assets'):await buildStrokes({force})
const common=['site/scripts/prepare.ts','scripts/lib/content-cache.mjs','bun.lock'].map(path=>join(repo,path))

// The catalog contains every default SVG's content hash; the stroke key covers
// geometry, metadata, generator code and licenses. Don't rehash the stroke sets.
const assets=await contentCache({
 inputs:[...common,...['dist/catalog.json','dist/downloads','LICENSE','THIRD_PARTY_NOTICES.md'].map(path=>join(icons,path)),join(strokes,'key')],
 outputs:['data','icons','downloads','catalog.json','THIRD_PARTY_NOTICES.md','LICENSE.txt'].map(path=>join(site,'public',path)),
 file:join(repo,'work/cache/site-assets.json'),force
})
// Older checkouts generated a per-file stroke tree; it must never be published.
await rm(join(site,'public/strokes'),{recursive:true,force:true})
if(!assets.hit){
 for(const [target,source] of [['data',join(strokes,'data')],['icons',join(icons,'icons')],['downloads',join(icons,'dist/downloads')]]){
  await rm(join(site,'public',target),{recursive:true,force:true})
  await cp(source,join(site,'public',target),{recursive:true})
 }
 await cp(join(strokes,'downloads'),join(site,'public/downloads'),{recursive:true})
 await writeIfChanged(join(site,'public/catalog.json'),JSON.stringify(catalog)+'\n')
 await writeIfChanged(join(site,'public/THIRD_PARTY_NOTICES.md'),await readFile(join(icons,'THIRD_PARTY_NOTICES.md')))
 await writeIfChanged(join(site,'public/LICENSE.txt'),await readFile(join(icons,'LICENSE')))
 await assets.commit()
}
console.log(`Site assets: ${assets.hit?'content cache hit':'copied'}`)

const guideSlugs=(await readdir(join(site,'content/guide'),{withFileTypes:true})).filter(entry=>entry.isDirectory()).map(entry=>entry.name)
const guides=await contentCache({
 inputs:[...common,join(site,'scripts/llms.ts'),join(site,'content'),join(site,'i18n')],
 outputs:[join(site,'.categories/guide.json'),...['en','tw'].map(locale=>join(site,`public/search/${locale}.json`)),...llmsOutputs(guideSlugs).map(path=>join(site,'public',path))],
 file:join(repo,'work/cache/site-guides.json'),force
})
if(!guides.hit){
 // Every guide folder is a page; its metadata names the sidebar group and its order there.
 const groups=['Getting started','Frameworks','Design','Reference']
 const pages:{category:string;order:number}[]=[]
 for(const entry of await readdir(join(site,'content/guide'),{withFileTypes:true})){
  if(!entry.isDirectory())continue
  const {default:metadata}=await import(new URL(`../content/guide/${entry.name}/metadata.ts`,import.meta.url).href)
  if(!groups.includes(metadata.category))throw new Error(`Guide ${entry.name} has an unknown category: ${metadata.category}`)
  pages.push({...metadata,slug:entry.name})
 }
 const categories=groups.map(name=>({name,pages:pages.filter(page=>page.category===name).sort((a,b)=>a.order-b.order)}))
 await writeIfChanged(join(site,'.categories/guide.json'),JSON.stringify(categories,null,2)+'\n')
 const {generateSearchPages}=await import('@master/internal-site/utils/search-pages')
 const search=await generateSearchPages({cwd:site,defaultLocale:'en',locales:['en','tw'],dictionariesDir:join(site,'i18n'),write:false})
 for(const locale of ['en','tw'])await writeIfChanged(join(site,`public/search/${locale}.json`),JSON.stringify(search[locale]))
 // llms.txt and each guide as Markdown for coding agents; see scripts/llms.ts.
 const dictionary={en:{},tw:JSON.parse(await readFile(join(site,'i18n/tw.json'),'utf8'))} as Record<string,Record<string,string>>
 await rm(join(site,'public/guide'),{recursive:true,force:true});await rm(join(site,'public/tw/guide'),{recursive:true,force:true})
 await generateLlms(site,categories as any,async(path,content)=>{await mkdir(dirname(join(site,'public',path)),{recursive:true});await writeIfChanged(join(site,'public',path),content)},(locale,text)=>dictionary[locale][text]??text)
 await guides.commit()
}
// Tracked Master brand sources live outside the generated/ignored public tree.
for(const name of ['favicon.svg','favicon.ico'])await writeIfChanged(join(site,'public',name),await readFile(join(site,'assets',name)))
console.log(`Guides: ${guides.hit?'content cache hit':'generated'}`)
console.log(`Prepared ${catalog.iconCount} icons and bilingual guides in ${((performance.now()-started)/1000).toFixed(2)}s`)
