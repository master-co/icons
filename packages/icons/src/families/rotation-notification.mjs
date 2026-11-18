import {path,contour,n,weightDelta} from '../geometry.mjs';
import {smartphoneShape} from './layout.mjs';
import {bell} from './core.mjs';
import {rotate} from './shared.mjs';

export function screenRotateParts(g){
 const k=24/g.s,width=g.v(4,5,6),height=g.v(7.5,9.25,11.5);
 const phone=rotate(smartphoneShape(g,{left:(g.c-width/2)*k,top:(g.c-height/2)*k,width:width*k,height:height*k,homeIndicator:false,radius:g.corner==='sharp'?0:g.corner==='soft'?g.v(.4,.5,.6):g.v(.8,1,1.2)}),-45,g);
 const top=g.v(1.5,2,2.5),r=g.c-top,wing=g.v(1.5,2,2.5);
 const trim=g.corner==='sharp'?0:g.corner==='soft'?g.v(.2,.25,.3):g.v(.45,.55,.65),angle=trim/r;
 const end=[g.c+r*Math.sin(angle),g.c-r*Math.cos(angle)],join=trim/Math.SQRT2;
 const tangent=r*(1-1/Math.cos(angle))/(1-Math.tan(angle));
 // A continuous turn arc with one inward wing keeps the compact device clear.
 // The opposite arrow is this exact path rotated, not a separately drawn arc.
 const first=[path(`M${g.c+r} ${g.c}A${r} ${r} 0 0 0 ${n(end[0])} ${n(end[1])}`+(trim?`Q${n(g.c+tangent)} ${n(top+tangent)} ${n(g.c+join)} ${n(top+join)}`:'')+`L${g.c+wing} ${top+wing}`)];
 return {phone,first,second:rotate(first,180,g)};
}

export function bellSnoozeParts(g){
 const delta=weightDelta(g),clapperDrop=g.corner==='sharp'?delta:0;
 const shell=bell(g,false,{clapperDrop}),half=g.v(1.5,2,2.5)-delta*.4;
 const top=g.v(5.75,7,8.25)+delta*g.v(2,1.5,1),bottom=g.v(9.25,11.5,13.75)+delta*g.v(0,.5,2/3);
 // One Z, inside the existing crown. It indicates paused delivery, not a clock.
 const sleep=contour([[g.c-half,top],[g.c+half,top],[g.c-half,bottom],[g.c+half,bottom]],Math.min(g.tip,g.v(.15,.2,.25)));
 // A letter Z has clipped, sharp joins rather than protruding miter spikes.
 // Soft/rounded still use their real contour fillets above.
 if(g.corner==='sharp')sleep[1]['stroke-linejoin']='bevel';
 return {shell,sleep,half,top,bottom,clapperDrop};
}

export const rotationNotificationDrawings={
 'screen-rotate':g=>{const p=screenRotateParts(g);return [...p.phone,...p.first,...p.second];},
 'bell-snooze':g=>{const p=bellSnoozeParts(g);return [...p.shell,p.sleep];},
};
