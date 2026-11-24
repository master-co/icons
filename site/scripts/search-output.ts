import type {AstroIntegration} from 'astro'
import {readFile,writeFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {escapeXml} from '@master/icons/runtime'

export function sitemapDocument(urls:Iterable<string>) {
 const entries=[...urls].sort().map(url=>`  <url><loc>${escapeXml(url)}</loc></url>`)
 return ['<?xml version="1.0" encoding="UTF-8"?>','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',...entries,'</urlset>',''].join('\n')
}

/** Use the canonical addresses in the final HTML, including only indexable pages. */
export function searchOutput(origin:string):AstroIntegration {
 return {
  name:'master-icons:search-output',
  hooks:{
   'astro:config:setup':({command,injectRoute})=>{
    if(command==='dev')injectRoute({pattern:'/sitemap.xml',entrypoint:fileURLToPath(new URL('./dev-sitemap.ts',import.meta.url))})
   },
   'astro:build:done':async({dir,pages})=>{
    const urls=new Set<string>()
    for(const {pathname} of pages){
     const file=new URL((pathname||'index')+'.html',dir)
     const html=await readFile(file,'utf8')
     const head=html.slice(0,html.indexOf('</head>'))
     if(/<meta name="robots" content="[^"]*noindex/.test(head))continue
     const canonical=/<link rel="canonical" href="([^"]+)"/.exec(head)?.[1]
     if(canonical!==new URL('/'+pathname,origin).href)continue
     urls.add(canonical)
     const guide=/(?:^|\/)(guide\/[\w-]+)$/.exec(pathname)
     if(guide){
      // Master Site emits a dynamic social URL; Pages serves our build-time PNG.
      const image=new URL('/social/'+guide[1]+'.png',origin).href
      const updated=head.replace(/(<meta (?:property="og:image"|name="twitter:image") content=")[^"]*\/api\/og-image\?[^"]*"/g,(_,prefix)=>prefix+image+'"')
      if(updated!==head)await writeFile(file,updated+html.slice(head.length))
     }
    }
    await writeFile(new URL('sitemap.xml',dir),sitemapDocument(urls))
   }
  }
 }
}
