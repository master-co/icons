import {readFile,writeFile} from 'node:fs/promises'
import {auditTranslations,reviewTranslation} from '@master/internal-site/build/localization.ts'
import resources from '../i18n/resources'
const file=new URL('../i18n/reviews.json',import.meta.url)
const reviews=JSON.parse(await readFile(file,'utf8'))
const items=await resources()
const [command,...ids]=process.argv.slice(2)
if(command==='review'){
 if(!ids.length)throw new Error('Supply independently reviewed resource ids')
 for(const id of ids){const resource=items.find(x=>x.id===id);if(!resource)throw new Error(id);reviews.resources[id]={tw:reviewTranslation(resource,'tw')}}
 await writeFile(file,JSON.stringify(reviews,null,2)+'\n')
}else{
 const errors=auditTranslations(items,reviews,{locales:['en','tw']});console.log(JSON.stringify(errors,null,2));if(errors.length)process.exitCode=1
}
