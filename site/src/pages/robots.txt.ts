import config from 'virtual:master-site/config'

export function GET() {
 return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml',config.origin).href}\n`,{headers:{'Content-Type':'text/plain; charset=utf-8'}})
}
