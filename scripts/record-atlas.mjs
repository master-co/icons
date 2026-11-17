// Explicit reviewer input only; rendering never promotes review status.
import {readFile,writeFile} from 'node:fs/promises';
const file='docs/review/atlas-01/decisions.json',decisions=JSON.parse(await readFile(file));
for(const row of (await readFile(process.argv[2],'utf8')).trim().split('\n')){const [name,confusable,sourceObservation,decision]=row.split('|');if(!decision)throw Error(name);decisions[name]={confusableWith:confusable.split(','),sourceObservation,decision,reviewedThemes:['light','dark'],reviewedSizes:[16,20,24],reviewedCorners:['sharp','soft','rounded'],status:'visually-reviewed-candidate'};}
await writeFile(file,JSON.stringify(decisions,null,2)+'\n');
