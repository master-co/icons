import {author} from './helpers.mjs';
import {coffee,cupSoda,wine,beer,milk,bottle,teapot,kettle,glassWater,cookingPot} from './drink-shapes.mjs';
export const batch=author([
 ['coffee','咖啡','coffee','coffee','圓底杯身、外接把手與上升蒸氣',coffee],
 ['cup-soda','外帶飲料','cup-soda','cup','上寬下窄杯身、杯緣與彎吸管',cupSoda],
 ['wine','葡萄酒','wine','phosphor/wine','收口酒杯、酒面與細長杯腳',wine],
 ['beer','啤酒','beer','phosphor/beer-stein','泡沫頂、直立杯身與側把手',beer],
 ['milk','牛奶','milk','hugeicons/milk-carton','紙盒斜頂、側折面與寬主面',milk],
 ['bottle','飲料瓶','bottle-wine','bottle','窄瓶頸、寬瓶腹與瓶口分界',bottle],
 ['teapot','茶壺','openmoji/1FAD6','teapot','圓壺腹、上揚壺嘴與側把手',teapot],
 ['kettle','煮水壺','hugeicons/kettle-01','mdi/kettle-outline','上提弓形把手、寬壺腹與短壺嘴',kettle],
 ['glass-water','水杯','glass-water','iconoir/glass-half','橢圓杯口、收窄杯底與水面',glassWater],
 ['cooking-pot','烹飪鍋','cooking-pot','phosphor/cooking-pot','寬鍋身、鍋蓋提把及外展雙耳',cookingPot],
], 'food','食物與飲品');
