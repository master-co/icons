import {monitorShape,smartphoneShape} from './layout.mjs';
import {knockout} from '../occlusion.mjs';

export function crossDeviceParts(g){
  const k=24/g.s,v=g.v;
  // At 16px quarter-pixel right/bottom edges keep the .75px stroke from
  // splitting equally across two rows and weakening the tiny device corners.
  const monitor=monitorShape(g,{
    left:v(1.5,1.75,2)*k,top:v(2.25,2.75,3.25)*k,
    width:v(10.75,13.25,16)*k,height:v(7,8.75,10.5)*k,
    standBottom:v(13.25,16.75,20.25)*k,footHalf:v(3,3.75,4.5)*k,
  });
  const phone=smartphoneShape(g,{
    left:v(10.25,12.75,15.5)*k,top:v(6.5,8.25,10)*k,
    width:v(4.25,5.25,6.5)*k,height:v(7.75,9.5,11.5)*k,
    radius:Math.min(g.r,v(1.275,1.575,1.95)),homeIndicator:false,
  });
  return {monitor,phone};
}
export const crossDevice={
  // More air than a small badge: these are two independently readable devices.
  'monitor-smartphone':g=>{const {monitor,phone}=crossDeviceParts(g);return knockout(monitor,phone,g,{silhouettes:phone,gap:g.v(1.5,1.5,1.75)});},
};
