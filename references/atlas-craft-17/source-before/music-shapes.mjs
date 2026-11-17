import {enclosedDetails,exteriorDetails,knockout} from '../occlusion.mjs';

const acoustic='M8 10C8.5 8.7 9.3 8 11 8C13.8 8 16 10.2 16 13C16 14.7 15.3 15.5 14 16C12.7 16.5 12 16.8 12 18C12 20.4 10.4 22 8 22C4.7 22 2 19.3 2 16C2 13.6 3.6 12 6 12C7.2 12 7.5 11.3 8 10Z';
export function guitar({g,p,l,o}){
 const body=p(acoustic),head=o([[17,7],[17,4.5],[19.5,2],[22,4.5],[19.5,7]],true,g.tip);
 return [body,...exteriorDetails(head,[l(12,12,18,6)],g),l(6,16,8,18)];
}
export function electricGuitar({g,p,l,o}){
 const body=p('M8 10C8.6 8.5 9.5 8 10.5 8C10.5 11.1 12.9 13.5 16 13.5C16 14.5 15.5 15.4 14 16C12.7 16.5 12 16.8 12 18C12 20.4 10.4 22 8 22C4.7 22 2 19.3 2 16C2 13.6 3.6 12 6 12C7.2 12 7.5 11.3 8 10Z');
 const head=o([[17,7],[17,4.5],[22,2],[19.5,7]],true,g.tip);
 return [body,...exteriorDetails(head,[l(12.2,11.8,18,6)],g),l(6,16,8,18)];
}
export function piano({g,p,l}){
 const body=p('M2 9C2 5.134 5.134 2 9 2C11.8 2 14.2 3.65 15.3 6C15.9 7.3 17 8 18.5 8C20.433 8 22 9.567 22 11.5V19Q22 21 20 21H4Q2 21 2 19Z');
 return enclosedDetails(body,[l(2,13,22,13),...[6,10,14,18].map(x=>l(x,13,x,17))],g);
}
export function drum({g,p,l}){
 const body=p('M3 9C3 6.239 7.029 4 12 4C16.971 4 21 6.239 21 9V16C21 18.761 16.971 21 12 21C7.029 21 3 18.761 3 16Z');
 const inside=[p('M3 9C3 11.761 7.029 14 12 14C16.971 14 21 11.761 21 9'),l(8,13,8,22),l(16,13,16,22)];
 return knockout(enclosedDetails(body,inside,g),[l(12,9.5,21,3)],g);
}
export function violin({g,p,l}){
 const body=p('M9 6C6.8 6 5.5 7.8 5.5 10C7.7 10 8.5 11.5 8.5 13C8.5 14.5 7.7 16 5.5 16C5.5 20 7.8 22 12 22C16.2 22 18.5 20 18.5 16C16.3 16 15.5 14.5 15.5 13C15.5 11.5 16.3 10 18.5 10C18.5 7.8 17.2 6 15 6');
 return [body,l(12,2,12,13),l(10,18,14,18)];
}
export function trumpet({g,p,l,o}){
 const bell=p('M3 10H14C18 10 20 7.5 22 5V17C20 14.5 18 12 14 12H3');
 const loop=p('M5 12V17Q5 19 7 19H13Q15 19 15 17V12');
 return [bell,l(2,8.5,2,13.5),loop,l(8,7,8,10),l(12,7,12,10)];
}
export function saxophone({g,p,l}){
 const body=p('M3 3H7C10 3 11 5 11 8V15C11 16.5 12 17 13 17C14 17 15 16.5 15 15V13H21V15.5C21 19.1 18.1 22 14.5 22C10.9 22 8 19.1 8 15.5V8C8 6.3 7 5 5 5');
 return [body,l(14,13,22,13),l(11,8,13,8),l(11,11,13,11)];
}
export function metronome({g,o,l}){
 const body=o([[4,22],[9,3],[15,3],[20,22]],true,g.tip);
 return [...enclosedDetails(body,[l(5,17,19,17)],g),l(12,17,21,7)];
}
export function vinylRecord({g,c,p}){
 return [c(12,12,10),c(12,12,2),p('M6 12A6 6 0 0 1 7.7574 7.7574'),p('M18 12A6 6 0 0 1 16.2426 16.2426')];
}
export function musicKeyboard({g,r,l,d}){
 const body=r(2,4,20,17,g.r);
 return enclosedDetails(body,[l(2,12,22,12),...[6,10,14,18].map(x=>l(x,12,x,17)),l(6,8,10,8),d(17,8,g.v(.6,.7,.8))],g);
}
