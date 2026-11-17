import {author} from './helpers.mjs';
import {refrigerator,washingMachine,microwave,oven,airConditioner,fan,vacuumCleaner,hairDryer,iron,heater} from './appliance-shapes.mjs';
export const batch=author([
 ['refrigerator','冰箱','refrigerator','fridge','高直雙門、分界與上下把手',refrigerator],
 ['washing-machine','洗衣機','washing-machine','phosphor/washing-machine','方形機身、控制點與圓形洗衣槽',washingMachine],
 ['microwave','微波爐','microwave','microwave','橫向機身、觀察窗、側控鈕與短腳',microwave],
 ['oven','烤箱','phosphor/oven','hugeicons/oven','直立機身、三顆控制鈕、方窗與雙腳',oven],
 ['air-conditioner','冷氣機','iconoir/air-conditioner','air-conditioning','橫向室內機、出風口與向下氣流',airConditioner],
 ['fan','風扇','fan','phosphor/fan','三片同向弧形葉片與中央輪轂',fan],
 ['vacuum-cleaner','吸塵器','hugeicons/vacuum-cleaner','mdi/vacuum-outline','帶輪機身、彎管與接地吸頭',vacuumCleaner],
 ['hair-dryer','吹風機','phosphor/hair-dryer','hugeicons/hair-dryer','圓機腹與進氣口、收窄風嘴、曲柄與電線',hairDryer],
 ['iron','熨斗','tabler/ironing','mdi/iron-outline','弧形前端、平底與上方開放把手',iron],
 ['heater','暖氣機','heater','hugeicons/heater','矮機身、三條格柵、雙腳與上升熱氣',heater],
], 'home','居家用品');
