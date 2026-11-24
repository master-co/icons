import {readFile} from 'node:fs/promises'
import {iconLabel} from '../i18n/icon-label'
import {createRequire} from 'node:module'

export interface CatalogIcon {
 name:string
 label:string
 component:string
 category:string
 keywords:string[]
 rendering?:'brand-silhouette'|'brand-outline'
 styleOf?:string
 aliasOf?:string
}

interface Catalog {
 icons:CatalogIcon[]
 categories:{id:string}[]
}

export async function readCatalog():Promise<Catalog> {
 return JSON.parse(await readFile(createRequire(import.meta.url).resolve('@master/icons/catalog'),'utf8'))
}

// A build renders all languages from the same inventory. Development reads fresh generated data.
let inventory:Promise<Map<string,CatalogIcon>> | undefined
export async function iconInventory() {
 const load=async()=>new Map((await readCatalog()).icons.map(icon=>[icon.name,icon]))
 return import.meta.env.DEV ? load() : inventory??=load()
}

export function iconText(icon:CatalogIcon,locale:string,copy:Record<string,string>) {
 const name=iconLabel(icon,locale,copy)
 const category=copy['category:'+icon.category]
 const kind=icon.rendering==='brand-silhouette'?copy['Monochrome mark']:icon.rendering==='brand-outline'?copy['Outline']:'SVG'
 const title=`${name} SVG · ${icon.component}`
 const description=`${name} (${icon.component}) · ${category} · ${kind} · 16 / 20 / 24 px. ${copy['Use plain SVG or optical icon components for React, Vue, Svelte, Preact and Astro.']}`
 return {name,title,category,kind,description}
}
