import {readFile,writeFile} from 'node:fs/promises'
import {auditTranslations,rehashTranslationReviews,reviewTranslation} from '@master/internal-site/build/localization.ts'
import {locales} from '@master/internal-site/common/locales.js'
import resources from '../i18n/resources'

const file=new URL('../i18n/reviews.json',import.meta.url)
const reviews=JSON.parse(await readFile(file,'utf8'))
const items=await resources()
const [command,...args]=process.argv.slice(2)

if(command==='review'){
 // Existing review commands without a locale refer to the Traditional Chinese edition.
 const locale=locales.find(id=>id===args[0])??'tw'
 const ids=args[0]===locale?args.slice(1):args
 if(locale==='en' || !ids.length)throw new Error('Supply a target locale and independently reviewed resource ids')
 for(const id of ids){
  const resource=items.find(item=>item.id===id)
  if(!resource)throw new Error('Unknown translation resource: '+id)
  const record=reviews.resources[id]??={}
  record[locale]=reviewTranslation(resource,locale)
 }
 await writeFile(file,JSON.stringify(reviews,null,2)+'\n')
}else if(command==='rehash'){
 // A source fingerprint leaves out an imported component's own <style> block. Move each review whose source and
 // translation are exactly as reviewed to the current fingerprint; no review is extended to content nobody read.
 const {reviews:next,moved}=rehashTranslationReviews(items,reviews)
 await writeFile(file,JSON.stringify(next,null,2)+'\n')
 console.log(`Moved ${moved} unchanged reviews to the current source fingerprint.`)
}else{
 const errors=auditTranslations(items,reviews,{locales})
 console.log(JSON.stringify(errors,null,2))
 if(errors.length)process.exitCode=1
}
