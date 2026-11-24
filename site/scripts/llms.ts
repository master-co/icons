/** Portable guide editions and icon indexes, published alongside the HTML pages. */
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type {CatalogIcon} from '../components/catalog'

import {locales,nameOfLocale,type Locale} from '@master/internal-site/common/locales.js'
import {iconLabel} from '../i18n/icon-label'

export const origin='https://icons.master.co'

export type GuidePage={slug:string;title:string;description:string;category:string;order:number}

const prefix=(locale:Locale)=>locale==='en'?'':`/${locale}`
/** Keep authored heading ids as anchors and turn a copyable prompt into a fenced block. */
function portable(source:string,locale:Locale){
 let fence=false
 const lines=source
  .replace(/^---\n[\s\S]*?\n---\n/,'')
  .trimStart()
  .replace(/^(?:import .*\n)+/,'')
  .replace(/<DocumentPrompt\s+title="([^"]+)"\s+text=\{`((?:\\.|[^`])*)`\}\s*\/>/g,(_,title,text)=>{
   if(/(?<!\\)\$\{/.test(text))throw new Error('Markdown prompts need a static template literal')
   return `**${title}**\n\n\`\`\`\`text\n${text.replace(/\\([`\\$])/g,'$1')}\n\`\`\`\``
  })
  .split('\n')
 return lines.map(line=>{
  if(/^ {0,3}(`{3,}|~{3,})/.test(line)){fence=!fence;return line}
  if(fence)return line
  return line
   .replace(/^(#{1,6}[ \t]+.+?) \\\{#([\w-]+)\\\}[ \t]*$/,'<a id="$2"></a>\n\n$1')
   .replace(/\]\(\/guide\/([\w-]+)(#[\w-]+)?\)/g,(_,slug,hash='')=>`](${origin}${prefix(locale)}/guide/${slug}.md${hash})`)
   .replace(/\]\(\/(?!\/)([^)]*)\)/g,(_,path)=>`](${origin}${path.startsWith('icons')?prefix(locale):''}/${path})`)
 }).join('\n').replace(/\n{3,}/g,'\n\n').trim()
}

async function edition(site:string,page:GuidePage,locale:Locale){
 const file=join(site,'content/guide',page.slug,locale==='en'?'content.mdx':`content.${locale}.mdx`)
 if(!existsSync(file))return undefined
 const source=await readFile(file,'utf8')
 const front=(key:string)=>new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`,'m').exec(/^---\n([\s\S]*?)\n---/.exec(source)?.[1]??'')?.[1]
 const title=locale==='en'?page.title:front('title')??page.title
 const description=locale==='en'?page.description:front('description')??page.description
 return {title,description,markdown:`# ${title}\n\n${description}\n\n${portable(source,locale)}\n`}
}

/** Every file this module writes, relative to public/, for the content cache. */
export const llmsOutputs=(slugs:string[])=>locales.flatMap(locale=>{
 const at=locale==='en'?'':`${locale}/`
 return [`${at}icons.md`,`${at}llms.txt`,`${at}llms-full.txt`,...slugs.map(slug=>`${at}guide/${slug}.md`)]
})

export async function generateLlms(site:string,icons:CatalogIcon[],categories:{name:string;pages:GuidePage[]}[],write:(path:string,content:string)=>Promise<unknown>,t:(locale:Locale,text:string)=>string){
 for(const locale of locales){
  const at=prefix(locale)
  const folder=locale==='en'?'':locale+'/'
  const indexCopy:typeof import('../i18n/agent-index/en.json')=JSON.parse(await readFile(join(site,'i18n/agent-index',locale+'.json'),'utf8'))
  const copy={Outline:t(locale,'Outline')}
  const directory=icons.toSorted((a,b)=>a.name.localeCompare(b.name,'en')).map(icon=>{
   const url=`${origin}${at}/icons/${icon.aliasOf??icon.name}`
   const alias=icon.aliasOf?` · ${indexCopy.alias} \`${icon.aliasOf}\``:''
   return `- [${icon.name}](${url}) · \`${icon.component}\`${locale==='en'?'':' · '+iconLabel(icon,locale,copy)}${alias}`
  })
  await write(`${folder}icons.md`,`# Master Icons · ${indexCopy.names}\n\n${directory.join('\n')}\n`)
  const sections:string[]=[],full:string[]=[]
  for(const category of categories){
   const items:string[]=[]
   for(const page of category.pages){
    const result=await edition(site,page,locale)
    if(!result)continue // Development can temporarily have an unpublished edition.
    const url=`${origin}${at}/guide/${page.slug}.md`
    await write(`${folder}guide/${page.slug}.md`,result.markdown)
    items.push(`- [${result.title}](${url}): ${result.description}`)
    full.push(result.markdown+`\n${indexCopy.source}: ${url}\n`)
   }
   sections.push(`## ${t(locale,category.name)}\n\n${items.join('\n')}`)
  }
  const index=`# Master Icons

> ${indexCopy.intro}

${indexCopy.website}: ${origin}${at||'/'} · ${indexCopy.icons}: ${origin}${at}/icons · ${indexCopy.full}: ${origin}${at}/llms-full.txt

${locales.filter(other=>other!==locale).map(other=>`[${nameOfLocale[other]}](${origin}${prefix(other)}/llms.txt)`).join(' · ')}

- [${indexCopy.directory}](${origin}${at}/icons.md)
- [${indexCopy.catalog}](${origin}/catalog.json)

## ${indexCopy.heading}

${indexCopy.rules.map(rule=>'- '+rule).join('\n')}

${indexCopy.skill}

${sections.join('\n\n')}
`
  await write(`${folder}llms.txt`,index)
  await write(`${folder}llms-full.txt`,`# Master Icons\n\n> ${indexCopy.intro}\n\n${full.join('\n---\n\n')}`)
 }
}
