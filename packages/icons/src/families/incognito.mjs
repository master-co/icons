import {figure} from './shared.mjs';
import {roundSpectacleParts} from '../atlas/clothing-shapes.mjs';

export function incognitoParts(g){
 const f=figure(g),u=(a,b,c)=>g.v(a,b,c)*24/g.s;
 // Open crown meets the one shared brim; no doubled lower edge or hat band.
 const crown=f.contour([[5.5,10.5],[7.5,3.5],[12,4.75],[16.5,3.5],[18.5,10.5]],false,g.corner==='sharp'?0:g.corner==='soft'?g.v(.35,.45,.55):g.v(.8,1,1.25));
 crown[1]['stroke-linecap']='butt';
 const brim=f.line(2.5,10.5,21.5,10.5);
 const rims=roundSpectacleParts({g,c:f.circle,p:f.path},{leftX:u(4.5,5.75,7),rightX:u(11.5,14.25,17),y:u(12,15,18),radius:u(2.25,2.75,3.25)});
 return {hat:[crown,brim],spectacles:[rims.left,rims.right,...rims.bridge]};
}
export const incognitoDrawings={incognito:g=>{const {hat,spectacles}=incognitoParts(g);return [...hat,...spectacles];}};
