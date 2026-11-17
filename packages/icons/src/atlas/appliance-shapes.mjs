import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function refrigerator({g,r,l,d}){
 const body=r(5,2,14,20,g.r);
 return [...enclosedDetails(body,[l(5,10,19,10)],g),l(8.5,5.5,8.5,6.5),l(8.5,13.5,8.5,17.5)];
}
export function washingMachine({g,r,c,p,l,d}){
 const body=r(3,2,18,20,g.r),drum=c(12,13.5,5.5);
 return [...enclosedDetails(body,[l(3,5.5,7,5.5)],g),d(17.5,5.5,g.v(.55,.65,.75)),...enclosedDetails(drum,[p('M12 8C8.5 8 8.5 13.5 12 13.5C15.5 13.5 15.5 19 12 19')],g)];
}
export function microwave({g,r,l,d}){
 const body=r(2,5.5,20,13,g.r);
 return [...exteriorDetails(body,[l(5,18.5,5,20.5),l(19,18.5,19,20.5)],g),r(5.5,9,9,6,g.tip),d(18.5,10,g.v(.6,.7,.8)),d(18.5,14,g.v(.6,.7,.8))];
}

export function oven({g,r,l,d}){
 const body=r(3,2,18,19,g.r);
 return [...exteriorDetails(body,[l(6,21,6,22.5),l(18,21,18,22.5)],g),r(6.5,10,11,7.5,g.tip),...[8,12,16].map(x=>d(x,6,g.v(.55,.65,.75)))];
}
export function airConditioner({g,r,l,p,d}){
 const rr=g.r*24/g.s;
 const top=rr?`M2 ${3+rr}Q2 3 ${2+rr} 3H${22-rr}Q22 3 22 ${3+rr}V9.5`:'M2 3H22V9.5';
 const unit=p(top+'L21.1 12.1Q20.6 13.5 19.1 13.5H4.9Q3.4 13.5 2.9 12.1L2 9.5Z');
 return [...enclosedDetails(unit,[l(2,9.5,22,9.5)],g),d(18,6,g.v(.55,.65,.75)),p('M7 17C7 20 6 21 4 22'),l(12,17,12,22),p('M17 17C17 20 18 21 20 22')];
}
export function fan({g,c,p}){
 const hub=c(12,12,2.5);
 const blade='M10 10C5 9 5.5 2 12 2C14 2 15.5 2.5 16.5 3Q17.2 3.5 16.5 4.5L13 10Z';
 const blades=[0,120,240].map(angle=>{
  const cos=Math.cos(angle*Math.PI/180),sin=Math.sin(angle*Math.PI/180);
  return p(blade.replace(/([MCQL])([^MCQLZ]+)/g,(_,command,body)=>{
   const values=body.trim().split(/\s+/).map(Number),points=[];
   for(let i=0;i<values.length;i+=2){const x=values[i]-12,y=values[i+1]-12;points.push(12+x*cos-y*sin,12+x*sin+y*cos)}
   return command+points.join(' ');
  }));
 });
 return exteriorDetails(hub,blades,g);
}

export function vacuumCleaner({g,p,l,c}){
 const body=p('M4.5 17V11.5Q4.5 10.5 5.5 10.5C9.1 10.5 11.3 12.7 12 16L13 21H6Z');
 const wheel=c(6,19,2.5);
 const hose=p('M5 12C1 12 1 3 6 3C10 3 12 6 14 10L19.5 21');
 return [...exteriorDetails(wheel,[body],g),...exteriorDetails(body,[hose],g).slice(1),l(16,21,22,21)];
}
export function hairDryer({g,p,c}){
 const rr=g.tip*24/g.s;
 const nozzle=rr?`L${21-rr} ${4.5-rr*2.4/13}Q21 4.5 21 ${4.5+rr}V${10.5-rr}Q21 10.5 ${21-rr} ${10.5+rr*2.4/13}`:'L21 4.5V10.5';
 const body=p('M8 2.1'+nozzle+'L8 12.9A5.5 5.5 0 1 1 8 2.1Z');
 const grip=p('M7 12L7.5 18.5Q7.5 19.5 8.5 19.5H12Q13 19.5 12.8 18.5L11 11.5Z');
 const cord=p('M10.5 19.5V20.5Q10.5 22 12 22H14.5');
 return [...exteriorDetails(body,[grip],g),c(7,7.5,2),...exteriorDetails(grip,[cord],g).slice(1)];
}
export function iron({g,p}){
 const rr=g.tip*24/g.s;
 const heel=rr?`L${21.5-rr*2/8.5} ${19-rr}Q21.5 19 ${21.5-rr} 19`:'L21.5 19';
 const body=p('M2.5 19C2.5 13.5 6 10.5 11 10.5H19.5'+heel+'Z');
 return exteriorDetails(body,[p('M8 5H15Q18.5 5 19.5 10.5')],g);
}
export function heater({g,r,p,l}){
 const rr=g.r*24/g.s,body=r(2,8,20,12,g.r);
 const outline=rr?`M5.5 8H${2+rr}Q2 8 2 ${8+rr}V${20-rr}Q2 20 ${2+rr} 20H${22-rr}Q22 20 22 ${20-rr}V${8+rr}Q22 8 ${22-rr} 8H18.5`:'M5.5 8H2V20H22V8H18.5';
 return [p(outline),...exteriorDetails(body,[l(5,20,5,22),l(19,20,19,22)],g).slice(1),...[7,12,17].map(x=>l(x,12.5,x,16.5)),p('M9.5 7.5C11.5 4.75 7.5 4.75 9.5 2'),p('M14.5 7.5C16.5 4.75 12.5 4.75 14.5 2')];
}
