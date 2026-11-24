/**
 * What coding agents read, written into public/ with the guides:
 *   /llms.txt, /tw/llms.txt                the index: package rules, then every guide as Markdown
 *   /guide/<slug>.md, /tw/guide/<slug>.md  each guide page as portable Markdown
 *   /llms-full.txt, /tw/llms-full.txt      every guide in one file
 */
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import type {CatalogIcon} from '../components/catalog'

export const origin='https://icons.master.co'
export const locales=['en','tw'] as const
type Locale=typeof locales[number]
export type GuidePage={slug:string;title:string;description:string;category:string;order:number}

const prefix=(locale:Locale)=>locale==='en'?'':`/${locale}`
const heading={en:{intro:'Optically sized interface icons for React, Vue, Svelte, Preact, Astro and plain SVG.',rules:'Rules for agents',skill:'Agent skill'},tw:{intro:'依光學尺寸繪製的介面圖示，支援 React、Vue、Svelte、Preact、Astro 與純 SVG。',rules:'給 agent 的規則',skill:'Agent skill'}}
const rules=`- Install exactly one package: \`@master/icons-react\`, \`@master/icons-vue\`, \`@master/icons-svelte\`, \`@master/icons-preact\`, \`@master/icons-astro\`, or \`@master/icons\` without a framework. Never a similarly named package.
- Never invent an icon name. Look it up in \`node_modules/@master/icons/dist/catalog.json\` (also \`@master/icons/catalog\`) or with \`node node_modules/@master/icons/skills/master-icons/scripts/search.mjs <query>\`. Components end in \`Icon\` (\`SearchIcon\`).
- Choose the drawing with \`size\` (16, 20 or 24); never resize icons with CSS.
- \`strokeWidth\` ranges 0.75–1.5 at 16 px, 1–2 at 20 px and 1.25–2.5 at 24 px in steps of 0.25; never override \`stroke-width\` in CSS.
- An icon beside visible text is decorative; an icon-only button carries its name on the button; a meaningful standalone icon gets \`label\`.`
const skillNote={en:'The `@master/icons` package ships an agent skill at `node_modules/@master/icons/skills/master-icons/SKILL.md`; copy it into your agent\'s skills folder to load these rules automatically.',tw:'`@master/icons` 套件內附 agent skill：`node_modules/@master/icons/skills/master-icons/SKILL.md`，複製到 agent 的 skills 資料夾即可自動載入上述規則。'}

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
  const directory=icons.toSorted((a,b)=>a.name.localeCompare(b.name,'en')).map(icon=>{
   const url=`${origin}${at}/icons/${icon.aliasOf??icon.name}`
   const alias=icon.aliasOf?` · ${locale==='en'?'alias of':'別名對應'} \`${icon.aliasOf}\``:''
   return `- [${icon.name}](${url}) · \`${icon.component}\`${locale==='tw'?' · '+icon.label:''}${alias}`
  })
  await write(`${locale==='en'?'':'tw/'}icons.md`,`# Master Icons · ${locale==='en'?'Icon names':'圖示名稱'}\n\n${directory.join('\n')}\n`)
  const sections:string[]=[],full:string[]=[]
  for(const category of categories){
   const items:string[]=[]
   for(const page of category.pages){
    const result=await edition(site,page,locale)??await edition(site,page,'en')
    if(!result)throw new Error(`Guide ${page.slug} has no content`)
    const url=`${origin}${at}/guide/${page.slug}.md`
    await write(`${at.slice(1)}${at?'/':''}guide/${page.slug}.md`,result.markdown)
    items.push(`- [${result.title}](${url}): ${result.description}`)
    full.push(result.markdown+`\nSource: ${url}\n`)
   }
   sections.push(`## ${t(locale,category.name)}\n\n${items.join('\n')}`)
  }
  const index=`# Master Icons

> ${heading[locale].intro}

Website: ${origin}${at}/ · Icons: ${origin}${at}/icons · Full text: ${origin}${at}/llms-full.txt${locale==='en'?` · 繁體中文: ${origin}/tw/llms.txt`:` · English: ${origin}/llms.txt`}

- [${locale==='en'?'Icon names, components and pages':'圖示名稱、元件與內頁'}](${origin}${at}/icons.md)
- [${locale==='en'?'Full icon catalog (JSON)':'完整圖示目錄（JSON）'}](${origin}/catalog.json)

## ${heading[locale].rules}

${rules}

${skillNote[locale]}

${sections.join('\n\n')}
`
  await write(`${at.slice(1)}${at?'/':''}llms.txt`,index)
  await write(`${at.slice(1)}${at?'/':''}llms-full.txt`,`# Master Icons\n\n> ${heading[locale].intro}\n\n${full.join('\n---\n\n')}`)
 }
}
