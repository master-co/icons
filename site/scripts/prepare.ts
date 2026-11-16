import { mkdir, readFile, writeFile, cp, rm } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'
import { generateSearchPages } from '@master/internal-site/utils/search-pages'
const site=fileURLToPath(new URL('../',import.meta.url))
const icons=join(site,'../packages/icons')
const catalog=JSON.parse(await readFile(join(icons,'dist/catalog.json'),'utf8'))
const definitions=JSON.parse(await readFile(join(icons,'dist/definitions.json'),'utf8'))
await rm(join(site,'public/data'),{recursive:true,force:true})
await mkdir(join(site,'public/data'),{recursive:true})
for(const [name,definition] of Object.entries(definitions))await writeFile(join(site,`public/data/${name}.json`),JSON.stringify(definition))
const slugs=['getting-started','svg','react','optical-sizes','accessibility','license']
const pages=[]
for(const slug of slugs){const {default:metadata}=await import(new URL(`../content/guide/${slug}/metadata.ts`,import.meta.url).href);pages.push(metadata)}
await mkdir(join(site,'.categories'),{recursive:true})
await writeFile(join(site,'.categories/guide.json'),JSON.stringify([{name:'Guide',pages}],null,2)+'\n')
await mkdir(join(site,'public'),{recursive:true})
for(const dir of ['icons','downloads']){await rm(join(site,'public',dir),{recursive:true,force:true});await cp(join(icons,dir==='icons'?'icons':'dist/downloads'),join(site,'public',dir),{recursive:true})}
await writeFile(join(site,'public/catalog.json'),JSON.stringify(catalog)+'\n')
await cp(join(icons,'THIRD_PARTY_NOTICES.md'),join(site,'public/THIRD_PARTY_NOTICES.md'))
await cp(join(icons,'LICENSE'),join(site,'public/LICENSE.txt'))
const search=await generateSearchPages({cwd:site,defaultLocale:'en',locales:['en','tw'],dictionariesDir:join(site,'i18n'),write:false})
await mkdir(join(site,'public/search'),{recursive:true})
for(const locale of ['en','tw'])await writeFile(join(site,`public/search/${locale}.json`),JSON.stringify(search[locale]))
console.log(`Prepared ${catalog.iconCount} icons and bilingual guides`)
