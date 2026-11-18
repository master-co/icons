import {path,circle,rect,n,weightDelta} from '../geometry.mjs';
import {fileParts} from './core.mjs';

export function hotspotParts(g){
 const x=g.c,y=g.v(9,11.25,13.5),radii=[g.v(6.5,8,9.5),g.v(3.75,4.75,5.75)];
 // Two concentric, open-bottom wavefronts. The emitter is a point, not a ring.
 const angle=40*Math.PI/180;
 const waves=radii.map(r=>path(`M${n(x-r*Math.cos(angle))} ${n(y+r*Math.sin(angle))}A${r} ${r} 0 1 1 ${n(x+r*Math.cos(angle))} ${n(y+r*Math.sin(angle))}`));
 const emitter=circle(x,y,g.v(1,1,1.1)+weightDelta(g)*.12,{fill:'currentColor',stroke:'none'});
 return {waves,emitter,x,y,radii};
}

export function simCardParts(g){
 // The shared cut-corner shell is physical here: no paper fold or new outline.
 const {shell}=fileParts(g),height=g.v(2,2,3);
 const xs=[g.v(5.5,7.25,9),g.c,g.v(10.5,12.75,15)],ys=[g.v(8,10.5,12),g.v(11,14.5,17)];
 const radius=g.corner==='sharp'?0:g.corner==='soft'?g.v(.15,.2,.25):g.v(.35,.4,.5);
 // At 16/20 the middle contact is optically wider so the side channels remain
 // visible on the native pixel grid; the three columns are not scaled copies.
 const contacts=ys.flatMap(y=>xs.map((x,i)=>{const width=i===1?2:g.v(1,1.5,2);const node=rect(x-width/2,y-height/2,width,height,radius);return [node[0],{...node[1],fill:'currentColor',stroke:'none'}];}));
 return {shell,contacts};
}

export const deviceConnectivityDrawings={
 hotspot:g=>{const {waves,emitter}=hotspotParts(g);return [...waves,emitter];},
 'sim-card':g=>{const {shell,contacts}=simCardParts(g);return [shell,...contacts];},
};
