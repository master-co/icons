import {mkdir,readFile,readdir,rm} from 'node:fs/promises'
import {join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {Resvg} from '@resvg/resvg-js'
import {escapeXml} from '@master/icons/runtime'
import {writeIfChanged} from '../../scripts/lib/content-cache.mjs'
import type {CatalogIcon} from '../components/catalog'
import type {GuidePage} from './llms'

export async function generateSocialImages(site:string,icons:CatalogIcon[],guides:GuidePage[]) {
 const root=join(site,'public/social')
 const logo=await readFile(join(site,'assets/brand/logo/master-icons/master-icons-horizontal-on-light.svg'),'utf8')
 const fontFile=fileURLToPath(import.meta.resolve('@master/internal-site/assets/fonts/Geist-Medium.ttf'))
 const wanted=new Set<string>()
 await mkdir(join(root,'icons'),{recursive:true})
 await mkdir(join(root,'guide'),{recursive:true})
 async function card(path:string,title:string,subtitle:string,iconName:string) {
  const native=await readFile(join(site,'../packages/icons/icons/24/soft',iconName+'.svg'),'utf8')
  const glyph=native.slice(native.indexOf('<svg')).replace('<svg ','<svg x="760" y="184" ').replace('width="24" height="24"','width="252" height="252"')
  const signature=logo.replace('<svg ','<svg x="66" y="66" width="245" height="44" ')
  const fontSize=Math.min(60,Math.floor(1000/title.length))
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
   <rect width="1200" height="630" fill="#fafafa"/>${signature}
   <rect x="680" y="62" width="450" height="502" rx="30" fill="#efeff1"/>
   <g color="#28282c">${glyph}</g>
   <g font-family="Geist" fill="#252528"><text x="67" y="336" font-size="${fontSize}">${escapeXml(title)}</text>
   <text x="69" y="389" font-size="25" fill="#53535b">${escapeXml(subtitle)}</text>
   <text x="69" y="548" font-size="20">icons.master.co</text></g></svg>`
  const png=new Resvg(svg,{font:{loadSystemFonts:false,fontFiles:[fontFile],defaultFontFamily:'Geist'}}).render().asPng()
  await writeIfChanged(join(root,path),png)
  wanted.add(path)
 }
 await card('master-icons.png','Master Icons','Optically sized SVG icons','search')
 for(const guide of guides)await card(`guide/${guide.slug}.png`,guide.title,'Master Icons · '+guide.category,'book-open')
 for(const icon of icons){
  if(!icon.aliasOf)await card(`icons/${icon.name}.png`,icon.rendering?icon.label:icon.name.replaceAll('-',' '),icon.component,icon.name)
 }
 for(const folder of ['icons','guide']){
  for(const file of await readdir(join(root,folder))){
   const path=folder+'/'+file
   if(file.endsWith('.png')&&!wanted.has(path))await rm(join(root,path))
  }
 }
}
