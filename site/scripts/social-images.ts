import {mkdir,readFile,readdir,rm} from 'node:fs/promises'
import {join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {Resvg} from '@resvg/resvg-js'
import {escapeXml} from '@master/icons/runtime'
import {writeIfChanged} from '../../scripts/lib/content-cache.mjs'
import type {CatalogIcon} from '../components/catalog'
import type {GuidePage} from './llms'

export async function generateHomeSocialImage(site:string) {
 const logo=await readFile(join(site,'assets/brand/logo/master-icons/master-icons-horizontal-on-dark.svg'),'utf8')
 // Centers, display sizes and ink opacity are composed for this cover, not a UI grid.
 // The 24 px soft masters retain their geometry and stroke proportions when enlarged.
 const placements:[name:string,x:number,y:number,size:number,opacity:number][]=[
  ['ruler',64,59,40,.24],
  ['cloud',214,44,48,.28],
  ['database',368,65,44,.32],
  ['moon',528,43,40,.25],
  ['sun',690,55,44,.30],
  ['music',852,44,40,.25],
  ['link',1010,65,44,.30],
  ['star',1160,49,40,.22],

  ['camera',108,177,56,.48],
  ['compass',274,163,64,.66],
  ['layers',440,167,56,.57],
  ['sparkles',608,147,52,.65],
  ['globe',778,169,60,.56],
  ['heart',946,161,60,.62],
  ['headphones',1106,182,52,.42],

  ['settings',59,319,52,.32],
  ['search',224,311,64,.64],
  ['command',976,315,60,.62],
  ['bell',1144,321,48,.32],

  ['folder',102,455,52,.43],
  ['pen-tool',269,466,60,.60],
  ['shield',436,458,56,.53],
  ['code',600,480,60,.65],
  ['palette',768,460,56,.60],
  ['calendar',939,467,60,.54],
  ['mail',1100,450,52,.44],

  ['key',58,581,40,.23],
  ['book-open',213,594,44,.28],
  ['mouse-pointer',370,574,40,.29],
  ['terminal',530,595,44,.25],
  ['diamond',690,578,40,.30],
  ['chart-bar',851,596,44,.24],
  ['coffee',1010,575,44,.29],
  ['zap',1158,588,40,.23],
 ]
 const glyphs=await Promise.all(placements.map(async([name,x,y,size,opacity])=>{
  const source=await readFile(join(site,'../packages/icons/icons/24/soft',name+'.svg'),'utf8')
  const glyph=source.slice(source.indexOf('<svg'))
   .replace('<svg ',`<svg x="${x-size/2}" y="${y-size/2}" `)
   .replace('width="24" height="24"',`width="${size}" height="${size}"`)
   .replaceAll('currentColor','#c5c3c0')
  return `<g opacity="${opacity}">${glyph}</g>`
 }))
 // Embed the approved vector wordmark unchanged; no font or external image is needed.
 const width=480
 const height=width*130.26/727.98
 const signature=logo.replace('<svg ',`<svg x="${(1200-width)/2}" y="${(630-height)/2}" width="${width}" height="${height}" `)
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
   <radialGradient id="home-light" cx="50%" cy="48%" r="65%">
    <stop stop-color="#292725"/>
    <stop offset=".58" stop-color="#1b1b1d"/>
    <stop offset="1" stop-color="#111113"/>
   </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#home-light)"/>
  ${glyphs.join('\n')}
  ${signature}
 </svg>`
 return new Resvg(svg,{font:{loadSystemFonts:false}}).render().asPng()
}

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
 await writeIfChanged(join(root,'master-icons.png'),await generateHomeSocialImage(site))
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
