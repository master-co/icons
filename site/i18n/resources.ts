import {readFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {discoverDocumentResources, type TranslationResource} from '@master/internal-site/build/localization.ts'
import shared from '@master/internal-site/common/translations.js'
export default async function resources():Promise<TranslationResource[]> {
 const documents=await discoverDocumentResources({contentRoot:fileURLToPath(new URL('../content',import.meta.url)),locales:['en','tw']})
 const en=JSON.parse(await readFile(new URL('./en.json',import.meta.url),'utf8'))
 const tw=JSON.parse(await readFile(new URL('./tw.json',import.meta.url),'utf8'))
 for(const key of Object.keys(en))if(!tw[key]?.trim())throw new Error(`Missing Traditional Chinese: ${key}`)
 return [...documents,{id:'ui/product',source:JSON.stringify(en),translations:{tw:JSON.stringify(tw)}},{id:'ui/shell',source:JSON.stringify(shared.en),translations:{tw:JSON.stringify(shared.tw)}}]
}
