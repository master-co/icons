import {enclosedDetails,exteriorDetails,knockout} from '../occlusion.mjs';
import {coreDrawings} from '../families/core.mjs';
import {connectivity} from '../families/connectivity.mjs';
import {mark} from '../families/shared.mjs';
const calendar=g=>coreDrawings.calendar(g).slice(0,4);
const alarm=g=>connectivity['alarm-clock'](g).filter((_,i)=>i!==1);
export function hourglass({g,p,l,o}){
 const sides=[o([[7,3],[7,6.5],[17,17.5],[17,21]],false,g.tip),o([[17,3],[17,6.5],[7,17.5],[7,21]],false,g.tip)];
 return [l(5,3,19,3),l(5,21,19,21),...sides];
}
export function calendarHeart({g,p}){
 const heart=p('M18 22C16.3 20.8 13 18.6 13.7 16.2C14.3 14.1 16.6 14 18 15.6C19.4 14 21.7 14.1 22.3 16.2C23 18.6 19.7 20.8 18 22Z');
 return knockout(calendar(g),[heart],g,{silhouettes:[heart]});
}
export function calendarLock({g,p,r,d}){
 const body=r(13.5,15,7.5,6.5,Math.min(g.r,g.v(.5,.65,.8)));
 const shackle=p('M15 15V13.5A2.25 2.25 0 0 1 19.5 13.5V15');
 const silhouette=p('M15 15V13.5A2.25 2.25 0 0 1 19.5 13.5V15Z');
 return knockout(calendar(g),[...exteriorDetails(body,[shackle],g),...(g.s===16?[]:[d(17.25,18.25,g.stroke/2)])],g,{silhouettes:[body,silhouette]});
}
export function calendarRecurring({g,p,c,a}){
 return knockout(calendar(g),a([p('M20.5 20.95A3.5 3.5 0 1 1 18 15H22')],[[20,13],[22,15],[20,17]]),g,{silhouettes:[c(18,18.5,3.5)]});
}
export function alarmPlus({g}){return [...alarm(g),...mark(g,'plus',12,13)]}
export function alarmMinus({g}){return [...alarm(g),...mark(g,'minus',12,13)]}
export function alarmCheck({g}){return [...alarm(g),...mark(g,'check',12,13)]}
export function timerReset({g,p,l,a}){
 return [l(9.5,2.5,14.5,2.5),l(12,2.5,12,6),l(12,13.5,15,10.5),...a([p('M4.5 12.5A7.5 7.5 0 1 1 6.7 18.8L4 16.1')],[[9,16.1],[4,16.1],[4,21.1]])];
}
export function calendarSearch({g,c,l}){
 const radius=3.1,x=16.5,y=17,t=radius/Math.sqrt(2),circle=c(x,y,radius);
 return knockout(calendar(g),[circle,l(x+t,y+t,21.5,22)],g,{silhouettes:[circle]});
}
export function calendarOff({g,l}){return knockout(calendar(g),[l(3,3,21,21)],g)}
