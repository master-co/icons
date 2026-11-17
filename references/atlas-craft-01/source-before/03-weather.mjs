import {author} from './helpers.mjs';
const cloud=p=>p('M6 14C1 14 1 7 6 7C7 1 16 2 17 8C23 7 24 14 18 14Z');
const low=p=>p('M6 21C1 21 1 14 6 14C7 8 15 9 16 15C22 14 23 21 18 21Z');
export const batch=author([
['cloud-rain','雨天','cloud-rain','cloud-rain','雲底與三道雨線',({p,l,small})=>[cloud(p),l(7,18,6,21),l(17,18,16,21),...small?[]:[l(12,17,11,20)]]],
['cloud-snow','降雪','cloud-snow','cloud-snow','雲底與分離雪點',({p,d,detail})=>[cloud(p),d(7,18.5),d(12,21),d(17,18.5),...detail(d(12,17),d(7,22),d(17,22))]],
['cloud-lightning','雷雨','cloud-lightning','cloud-storm','雲底下的折線閃電',({p,o})=>[cloud(p),o([[13,17],[10,20],[14,20],[11,23]])]],
['cloud-fog','霧','cloud-fog','cloud-fog','雲下兩道霧帶',({p,l})=>[cloud(p),l(5,18,19,18),l(8,22,16,22)]],
['cloud-sun','晴時多雲','cloud-sun','~cloud','雲層上露出的太陽與光芒',({p,l})=>[low(p),p('M12 7A4 4 0 0 1 20 11'),l(16,2,16,3),l(21,4,22,3),l(22,8,23,8)]],
['cloud-moon','夜間多雲','cloud-moon','~cloud','低雲與彎月外露輪廓',({p})=>[low(p),p('M12 6C12 3 15 2 17 2C15 6 18 9 22 8C22 10 21 12 19 12')]],
['sunrise','日出','sunrise','sunrise','地平線半日與向上箭頭',({p,l,o,a})=>[p('M6 17A6 6 0 0 1 18 17'),l(3,20,21,20),...a([l(12,8,12,2.5)],[[9,5.5],[12,2.5],[15,5.5]]),l(3,12,4,13),l(20,13,21,12)]],
['sunset','日落','sunset','sunset','地平線半日與向下箭頭',({p,l,o,a})=>[p('M6 17A6 6 0 0 1 18 17'),l(3,20,21,20),...a([l(12,2,12,8)],[[9,5],[12,8],[15,5]]),l(3,12,4,13),l(20,13,21,12)]],
['wind','風','wind','wind','三道不同長度的迴旋氣流',({p})=>[p('M3 8H12C16 8 16 2 12 3'),p('M3 12H19C23 12 23 6 19 7'),p('M3 16H12C16 16 16 22 12 21')]],
['snowflake','雪花','snowflake','snowflake','六條等角主枝與分叉',({l,o,small})=>{const a=[];for(let i=0;i<6;i++){const t=i*Math.PI/3,pt=(r,w=0)=>[12+Math.sin(t)*r+Math.cos(t)*w,12-Math.cos(t)*r+Math.sin(t)*w];a.push(l(12,12,...pt(9)),o([pt(7,2),pt(5),pt(7,-2)]));}return a;}]
], 'weather','天氣與自然');
