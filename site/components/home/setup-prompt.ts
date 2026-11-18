import {readFileSync} from 'node:fs'

/**
 * The getting-started guide's "Set up Master Icons" prompt in the page's language, read from the guide at build time
 * so the homepage copies exactly what the guide shows.
 */
export function setupPrompt(locale:string) {
 const file=locale==='en'?'content.mdx':`content.${locale}.mdx`
 const source=readFileSync(new URL(`../../content/guide/getting-started/${file}`,import.meta.url),'utf8')
 const text=/<DocumentPrompt\b[^>]*?\btitle="Set up Master Icons"[^>]*?\btext=\{`((?:\\.|[^`])*)`\}/.exec(source)?.[1]
 if(text===undefined||/(?<!\\)\$\{/.test(text))throw new Error(`The getting-started guide (${file}) has no static "Set up Master Icons" prompt.`)
 return text.replace(/\\([`\\$])/g,'$1')
}
