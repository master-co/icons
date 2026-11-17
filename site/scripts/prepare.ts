import { readFile, cp, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import {buildStrokes} from '../../scripts/lib/build-strokes.mjs'
import {contentCache, writeIfChanged} from '../../scripts/lib/content-cache.mjs'
import {lockGeneration} from '../../scripts/lib/generation-lock.mjs'

const started=performance.now()
const site=fileURLToPath(new URL('../',import.meta.url))
const repo=join(site,'..')
const icons=join(repo,'packages/icons')
const force=process.argv.includes('--force')
await lockGeneration(repo)
const catalog=JSON.parse(await readFile(join(icons,'dist/catalog.json'),'utf8'))
const strokes=await buildStrokes({force})
const common=['site/scripts/prepare.ts','scripts/lib/content-cache.mjs','bun.lock'].map(path=>join(repo,path))

// The catalog contains every default SVG's content hash; the stroke key covers
// geometry, metadata, generator code and licenses. Don't rehash 35k stroke SVGs.
const assets=await contentCache({
 inputs:[...common,...['dist/catalog.json','dist/downloads','LICENSE','THIRD_PARTY_NOTICES.md'].map(path=>join(icons,path)),join(strokes,'key')],
 outputs:['data','icons','strokes','downloads','catalog.json','THIRD_PARTY_NOTICES.md','LICENSE.txt'].map(path=>join(site,'public',path)),
 file:join(repo,'work/cache/site-assets.json'),force
})
if(!assets.hit){
 for(const [target,source] of [['data',join(strokes,'data')],['icons',join(icons,'icons')],['strokes',join(strokes,'icons')],['downloads',join(icons,'dist/downloads')]]){
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

const guides=await contentCache({
 inputs:[...common,join(site,'content'),join(site,'i18n')],
 outputs:[join(site,'.categories/guide.json'),...['en','tw'].map(locale=>join(site,`public/search/${locale}.json`))],
 file:join(repo,'work/cache/site-guides.json'),force
})
if(!guides.hit){
 const slugs=['getting-started','svg','react','vue','svelte','preact','astro','optical-sizes','accessibility','license']
 const pages=[]
 for(const slug of slugs){const {default:metadata}=await import(new URL(`../content/guide/${slug}/metadata.ts`,import.meta.url).href);pages.push(metadata)}
 await writeIfChanged(join(site,'.categories/guide.json'),JSON.stringify([{name:'Guide',pages}],null,2)+'\n')
 const {generateSearchPages}=await import('@master/internal-site/utils/search-pages')
 const search=await generateSearchPages({cwd:site,defaultLocale:'en',locales:['en','tw'],dictionariesDir:join(site,'i18n'),write:false})
 for(const locale of ['en','tw'])await writeIfChanged(join(site,`public/search/${locale}.json`),JSON.stringify(search[locale]))
 await guides.commit()
}
// Tracked Master brand sources live outside the generated/ignored public tree.
for(const name of ['favicon.svg','favicon.ico'])await writeIfChanged(join(site,'public',name),await readFile(join(site,'assets',name)))
console.log(`Guides: ${guides.hit?'content cache hit':'generated'}`)
console.log(`Prepared ${catalog.iconCount} icons and bilingual guides in ${((performance.now()-started)/1000).toFixed(2)}s`)
