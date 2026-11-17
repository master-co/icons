import {author} from './helpers.mjs';
import {car,bus,train,tram,bicycle,motorcycle,scooter,plane,helicopter,sailboat} from './vehicles.mjs';
export const batch=author([
['car','汽車','car','car','側向車頂、前傾擋風玻璃與雙輪',car],
['bus','公車','bus','bus','長窗帶、圓弧車頭與雙輪',bus],
['train','列車','train-front','phosphor/train','平頂圓肩、下收車頭、全寬前窗與軌腳',train],
['tram','電車','tram-front','phosphor/tram','頂部集電桿、方形車廂與軌腳',tram],
['bicycle','自行車','phosphor/bicycle','iconoir/bicycle','雙大輪、開放車架與前叉',bicycle],
['motorcycle','機車','phosphor/motorcycle','motorbike','座墊、弧形油箱及斜前叉',motorcycle],
['scooter','滑板車','phosphor/scooter','scooter','低踏板、前傾立管與雙輪',scooter],
['plane','飛機','plane','plane','圓弧機鼻、對稱機翼與窄尾翼',plane],
['helicopter','直升機','helicopter','helicopter','旋翼、圓弧座艙與起落架',helicopter],
['sailboat','帆船','sailboat','sailboat','共邊雙帆、桅杆與弧形船殼',sailboat]
], 'travel','交通與旅行');
