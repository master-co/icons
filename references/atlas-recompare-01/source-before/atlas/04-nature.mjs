import {author} from './helpers.mjs';
import {leaf,sprout,treePine,treeDeciduous,flower,cactus,mountain,mountainSnow} from './nature-shapes.mjs';
export const batch=author([
['leaf','葉子','leaf','leaf','尖葉緣、舒展葉腹與延伸葉脈',leaf],
['sprout','幼苗','sprout','seedling','錯落雙葉與單一莖',sprout],
['tree-pine','松樹','tree-pine','christmas-tree','三層針葉剪影與單一樹幹',treePine],
['tree-deciduous','闊葉樹','tree-deciduous','tree','圓冠輪廓與分叉樹幹',treeDeciduous],
['flower','花朵','flower','flower','六瓣共同曲線與獨立花心',flower],
['cactus','仙人掌','phosphor/cactus','cactus','寬肉質莖與錯落側枝',cactus],
['mountain','山脈','mountain','phosphor/mountains','高低雙峰與開放谷口',mountain],
['mountain-snow','雪山','mountain-snow','mountain','雙峰輪廓與曲線雪界',mountainSnow],
['waves','波浪','waves-horizontal','ripple','三層同節奏起伏水線',({p})=>[...([6,12,18].map(y=>p(`M3 ${y}C6 ${y-4} 9 ${y+4} 12 ${y}S18 ${y+4} 21 ${y}`)))]],
['droplet','水滴','droplet','droplet','上尖下圓的單一水滴輪廓',({p,g})=>[p(`M12 3C10 7 5 10 5 15A7 7 0 0 0 19 15C19 10 14 7 12 3Z`)]]
], 'nature','自然與動物');
