import {readFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {discoverDocumentResources,type TranslationResource} from '@master/internal-site/build/localization.ts'
import {locales} from '@master/internal-site/common/locales.js'
import shared from '@master/internal-site/common/translations.js'
import {product} from './translations.ts'
import {iconLabels} from './icon-label.ts'
import type {CatalogIcon} from '../components/catalog'

function checkDictionary(id:string,source:Record<string,string>,translation:Record<string,string>) {
 for(const [key,value] of Object.entries(source)){
  if(!translation[key]?.trim())throw new Error(`Missing ${id} translation: ${key}`)
  const placeholders=(text:string)=>text.match(/\{\w+\}/g)?.sort().join()??''
  if(placeholders(value)!==placeholders(translation[key]))throw new Error(`Mismatched placeholders in ${id}: ${key}`)
 }
}

export default async function resources():Promise<TranslationResource[]> {
 const documents=await discoverDocumentResources({contentRoot:fileURLToPath(new URL('../content',import.meta.url)),locales})
 const catalog: {icons:CatalogIcon[];categories:{id:string}[]} = JSON.parse(await readFile(new URL(import.meta.resolve('@master/icons/catalog')),'utf8'))
 const sourceLabels=Object.fromEntries(catalog.icons.filter(icon=>icon.category!=='brands').map(icon=>[icon.name,icon.label]).sort(([a],[b])=>a.localeCompare(b,'en')))
 const productCopy:Record<string,string>={},shell:Record<string,string>={},labels:Record<string,string>={},index:Record<string,string>={}
 for(const {id} of catalog.categories){
  if(!('category:'+id in product.en))throw new Error('Missing catalog category: '+id)
 }
 for(const locale of locales){
  checkDictionary('ui/product ('+locale+')',product.en,product[locale])
  productCopy[locale]=JSON.stringify(product[locale])
  shell[locale]=JSON.stringify(shared[locale])
  index[locale]=await readFile(new URL(`./agent-index/${locale}.json`,import.meta.url),'utf8')
  if(iconLabels[locale]){
   checkDictionary('catalog/labels ('+locale+')',sourceLabels,iconLabels[locale])
   labels[locale]=JSON.stringify(iconLabels[locale])
  }
 }
 return [...documents,
  {id:'ui/product',source:productCopy.en,translations:productCopy},
  {id:'ui/shell',source:shell.en,translations:shell},
  {id:'catalog/labels',source:JSON.stringify(sourceLabels),locales:Object.keys(labels),translations:labels},
  {id:'guides/agent-index',source:index.en,translations:index}
 ]
}
