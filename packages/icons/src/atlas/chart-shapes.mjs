import {exteriorDetails} from '../occlusion.mjs';
import {analytics} from '../families/analytics.mjs';
const axis=g=>analytics['chart-line'](g)[0];

export function chartRadar({g,o,l}){
 const center=[12,12],ends=[[12,2],[21.5,8.8],[18,21],[6,21],[2.5,8.8]],fractions=[.75,.8,.65,.85,.8];
 const data=ends.map(([x,y],i)=>[12+(x-12)*fractions[i],12+(y-12)*fractions[i]]);
 return [...ends.map(([x,y])=>l(...center,x,y)),o(data,true,g.tip)];
}
export function chartCandlestick({g,r,l}){
 const left=r(7,9,4,6,g.tip),right=r(15,5,4,8,g.tip);
 return [axis(g),...exteriorDetails(left,[l(9,5,9,17)],g),...exteriorDetails(right,[l(17,2.5,17,16.5)],g)];
}
export function chartWaterfall({g,l}){return [axis(g),l(8,5,8,11),l(12,11,12,14),l(16,8,16,14),l(20,14,20,17)]}
export function chartBubble({c}){return [c(6,16,3),c(16,19,2),c(14.5,7.5,4.5)]}
export function chartNetwork({g,c,l}){
 const rings=[c(12,5.5,2.25),c(17,12,2.25),c(9,15,2.25)];
 let links=[l(12,5.5,17,12),l(17,12,9,15),l(12,5.5,21,3)];
 for(const ring of rings)links=exteriorDetails(ring,links,g).slice(1);
 return [axis(g),...rings,...links];
}
export function chartHistogram({g,p,l}){
 const bars=[[8,16],[12,13],[16,16],[20,18]].map(([x,y])=>l(x,y,x,20.5));
 return [axis(g),p('M3.5 10C8 10 8 5 12 5S16 10 21 10'),...bars];
}
export function chartSankey({p}){return [p('M4 6C10.944 6 13.056 14 20 14'),p('M4 12C10.37 12 13.63 18 20 18'),p('M20 6C12.474 6 11.905 18 4 18')]}
export function chartSpline({g,p}){return [axis(g),p('M7 16C7.5 14 8.5 9 11 9C13 9 13 12 15 12C17.5 12 19.5 7 20 5')]}
export function chartBellCurve({g,p}){return [axis(g),p('M7 16C10.5 16 9.5 6 13 6S15.5 16 19 16')]}
export function chartCombo({g,l,o}){return [o([[2,15],[9,8],[13,12],[22,3]],false,g.tip),...[[4,18],[9,13.5],[14,16],[20,10]].map(([x,y])=>l(x,y,x,21))]}
