import {author} from './helpers.mjs';
import {fuel,backpack,trafficCone,ship,caravan,trafficLight,anchor,luggage,tent} from './travel-objects.mjs';
export const batch=author([
['ship','輪船','ship','ship','寬船首、單層甲板與向下收束的船殼',ship],
['anchor','船錨','anchor','anchor','大環孔、連續錨臂與清楚回鉤',anchor],
['luggage','行李箱','luggage','luggage','拉桿、直立箱身與下方底輪',luggage],
['backpack','後背包','backpack','backpack','寬肩主袋、上提把與共享底邊的前袋',backpack],
['tent','帳篷','tent','tent','交叉營柱與三角開口',tent],
['caravan','露營車','caravan','caravan','單輪拖車、寬空腔與側窗',caravan],
['fuel','加油','fuel','gas-station','開闊油管迴圈與泵身上方的顯示區',fuel],
['traffic-cone','交通錐','traffic-cone','traffic-cone','窄平頂、兩段警示帶及單一寬底板',trafficCone],
['traffic-light','交通號誌','phosphor/traffic-signal','traffic-lights','直立三燈與簡潔外殼',trafficLight],
['road','道路','phosphor/road-horizon','road','向遠方收束的道路與中線',({l})=>[l(8,3,3,21),l(16,3,21,21),l(12,3,12,6),l(12,10,12,13),l(12,18,12,21)]]
], 'travel','交通與旅行');
