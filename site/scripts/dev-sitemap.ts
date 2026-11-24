import config from 'virtual:master-site/config'
import {getStaticPaths} from 'virtual:master-site/routes'
import {sitemapDocument} from './search-output'

export async function GET() {
 const paths=await getStaticPaths()
 const urls=paths.map(({params})=>new URL('/'+(params.path??''),config.origin).href)
 return new Response(sitemapDocument(urls),{headers:{'Content-Type':'application/xml; charset=utf-8'}})
}
