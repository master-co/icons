import {axes} from './analytics.mjs';
import {histogramBars} from '../atlas/chart-shapes.mjs';
import {circle,path,n} from '../geometry.mjs';
import {triangle} from '../expansion/composition-location.mjs';

export function toneCurveParts(g){
 const start=[g.v(5,6.2,7.3),g.v(10.7,13.5,16.3)],end=[g.v(13.6,17,20.5),g.v(3,3.8,4.5)],dx=end[0]-start[0];
 const controls=[[start[0]+dx*.78,start[1]],[end[0]-dx*.78,end[1]]];
 const center=[(start[0]+end[0])/2,(start[1]+end[1])/2],radius=Math.max(g.v(.95,1.1,1.3),g.stroke*.7);
 const curve=path(`M${start.map(n).join(' ')}C${[...controls.flat(),...end].map(n).join(' ')}`),node=circle(...center,radius,{fill:'currentColor',stroke:'none'});
 return {axis:axes(g),curve,node,start,end,controls,center,radius};
}
export function toneLevelsParts(g){
 const axis=axes(g,{bottom:16.5}),bars=histogramBars(g,{baseline:16.5,samples:[[7,12],[11,5],[15,8],[19,10]]});
 const y=g.v(13,16.3,19.5),half=g.v(1,1.25,1.5),height=g.v(1.6,2,2.4),xs=[g.v(4,5,6),g.v(8,10,12),g.v(12.5,15.65,18.8)];
 const radius=g.corner==='sharp'?0:g.corner==='soft'?g.v(.08,.1,.12):g.v(.16,.2,.24);
 const markers=xs.map(x=>{const points=[[x,y],[x+half,y+height],[x-half,y+height]].map(p=>p.map(v=>v*24/g.s));const [marker]=triangle({...g,r:radius/.55},{points});return [marker[0],{...marker[1],fill:'currentColor',stroke:'none'}];});
 return {axis,bars,markers,xs,y,half,height};
}
export const toneToolDrawings={
 'color-curves':g=>{const p=toneCurveParts(g);return [...p.axis,p.curve,p.node];},
 'color-levels':g=>{const p=toneLevelsParts(g);return [...p.axis,...p.bars,...p.markers];}
};
