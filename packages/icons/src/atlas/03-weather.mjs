import {author} from './helpers.mjs';
import {cloudRain,cloudSnow,cloudLightning,cloudFog,cloudSun,cloudMoon,horizonSun,wind} from './weather-shapes.mjs';
export const batch=author([
['cloud-rain','雨天','cloud-rain','cloud-rain','開放雲底與三道錯落雨線',cloudRain],
['cloud-snow','降雪','cloud-snow','cloud-snow','開放雲底與疏朗雪點',cloudSnow],
['cloud-lightning','雷雨','cloud-lightning','cloud-storm','開放雲底中央的折線閃電',cloudLightning],
['cloud-fog','霧','cloud-fog','cloud-fog','開放雲底與兩道水平霧帶',cloudFog],
['cloud-sun','晴時多雲','cloud-sun','phosphor/cloud-sun','前景雲與後方太陽及三道光芒',cloudSun],
['cloud-moon','夜間多雲','cloud-moon','phosphor/cloud-moon','前景雲與後方彎月',cloudMoon],
['sunrise','日出','sunrise','sunrise','地平線半日與向上箭頭',f=>horizonSun(f,'up')],
['sunset','日落','sunset','sunset','地平線半日與向下箭頭',f=>horizonSun(f,'down')],
['wind','風','wind','wind','三道錯落長度的圓弧氣流',wind],
['snowflake','雪花','snowflake','snowflake','六條等角主枝與分叉',({l,o,small})=>{const a=[];for(let i=0;i<6;i++){const t=i*Math.PI/3,pt=(r,w=0)=>[12+Math.sin(t)*r+Math.cos(t)*w,12-Math.cos(t)*r+Math.sin(t)*w];a.push(l(12,12,...pt(9)),o([pt(7,2),pt(5),pt(7,-2)]));}return a;}]
], 'weather','天氣與自然');
