import {weightDelta} from '../geometry.mjs';
import {figure,rotate} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

function distribute(g){
  const f=figure(g),r=Math.min(g.r,g.v(.5,.65,.8));
  // Two object centers, not the names of a library's frame-edge orientation,
  // determine the distribution axis. Guides meet the actual object boundaries.
  return [f.rect(4,6,5,12,r),f.rect(15,8,5,8,r),
    f.line(6.5,3,6.5,6),f.line(6.5,18,6.5,21),
    f.line(17.5,3,17.5,8),f.line(17.5,16,17.5,21)];
}

function mapPinned(g){
  const f=figure(g),pin=f.path('M 12 16.5 C 9.85 14.35 7 11.5 7 8.3 A 5 5 0 0 1 17 8.3 C 17 11.5 14.15 14.35 12 16.5 Z');
  // This placement context gives the pin a smaller envelope while preserving
  // map-pin's round head, tapered lower curves and central aperture.
  const plane=f.contour([[5,13],[19,13],[21,21],[3,21]],true,Math.min(g.r,g.v(.6,.8,1)));
  return knockout([plane],[pin,f.circle(12,8.3,1.9)],g,{silhouettes:[pin]});
}

export function triangle(g,{points=[[12,3],[22-(weightDelta(g)?.5:0),20.5],[2+(weightDelta(g)?.5:0),20.5]]}={}) {
  const f=figure(g);
  return [f.contour(points,true,Math.min(g.r*.55,g.v(.8,1,1.2)))];
}
export function quadrilateral(g,points){
 return [figure(g).contour(points,true,g.r*.65)];
}

export const compositionLocation={
  triangle:g=>triangle(g),
  diamond:g=>quadrilateral(g,[[12,2.5],[21.5,12],[12,21.5],[2.5,12]]),
  hexagon:g=>{const f=figure(g);return [f.contour([[12,2.5],[20.25,7.25],[20.25,16.75],[12,21.5],[3.75,16.75],[3.75,7.25]],true,g.r*.8)];},
  contrast:g=>{const f=figure(g),[tag,a]=f.path('M 12 6.5 A 5.5 5.5 0 0 1 12 17.5 Z');return [f.circle(12,12,9),[tag,{...a,fill:'currentColor',stroke:'none'}]];},
  blend:g=>{const f=figure(g);return [f.circle(14.75,9.25,6.75),f.circle(9.25,14.75,6.75)];},
  'distribute-horizontal':distribute,
  'distribute-vertical':g=>rotate(distribute(g),90,g),
  compass:g=>{
    const f=figure(g),reach=g.corner==='sharp'?3.5:4.5;
    // Sharp miters lengthen acute needle tips. Compensate the centerline so
    // the painted needle keeps visible air from the dial, as the round tips do.
    return [f.circle(12,12,9),f.contour([[12+reach,12-reach],[14,14],[12-reach,12+reach],[10,10]],true,g.tip)];
  },
  navigation:g=>{const f=figure(g);return [f.contour([[21-(weightDelta(g)?.75:0),3+(weightDelta(g)?.75:0)],[14,21-(weightDelta(g)?.5:0)],[11,13],[3+(weightDelta(g)?.5:0),10]],true,g.tip)];},
  route:g=>{const f=figure(g);return [f.circle(5,5,2.5),f.circle(19,19,2.5),f.path('M 7.5 5 H 17.5 C 22.2 5 22.2 12 17.5 12 H 6.5 C 1.8 12 1.8 19 6.5 19 H 16.5')];},
  signpost:g=>{const f=figure(g),r=Math.min(g.r,g.v(.5,.65,.8));return [f.contour([[3,6],[17,6],[21,10],[17,14],[3,14]],true,[r,r,g.tip,r,r]),f.line(10,3,10,6),f.line(10,14,10,21)];},
  'map-pinned':mapPinned,
};
