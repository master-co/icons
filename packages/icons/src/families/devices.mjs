import { figure } from './shared.mjs';
import { exteriorDetails } from '../occlusion.mjs';

// Input devices use sparse keys and controls, not miniature product drawings.
export const devices = {
  keyboard(g) {
    const f=figure(g),xs=g.s===16?[6.5,12,17.5]:[6,10,14,18];
    return [f.rect(2.5,5,19,14),
      ...xs.map(x=>f.dot(x,9,g.stroke/2)),
      ...(g.s===16?[]:[6,12,18].map(x=>f.dot(x,12.5,g.stroke/2))),
      f.line(7,16,17,16)];
  },
  mouse(g) {
    const f=figure(g);
    // Curved shell stays curved even in sharp mode, like a physical mouse.
    return [f.path('M6 9A6 6 0 0 1 18 9V15A6 6 0 0 1 6 15Z'),f.line(12,6.5,12,10)];
  },
  'mouse-pointer'(g) {
    const f=figure(g);
    const shell=f.contour([[4,3],[20.5,10],[13,12.5],[10,20.5]],true,g.tip);
    return exteriorDetails(shell,[f.line(13,12.5,19.5,20)],g);
  },
  touchpad(g) {
    const f=figure(g);
    return [f.rect(3,4.5,18,15),f.line(3,14.5,21,14.5),f.line(12,14.5,12,19.5)];
  },
  tablet(g) {
    const f=figure(g);
    return [f.rect(5,2.5,14,19),f.dot(12,18,g.stroke/2)];
  },
  laptop(g) {
    const f=figure(g);
    return [f.contour([[4.5,16.5],[4.5,4],[19.5,4],[19.5,16.5]],false,g.r),
      f.contour([[4.5,16.5],[19.5,16.5],[22,20],[2,20]],true,Math.min(g.r,g.v(.5,.65,.8)))];
  },
  bluetooth(g) {
    const f=figure(g);
    return [f.contour([[6.5,6.5],[17,16.5],[12,21],[12,3],[17,7.5],[6.5,17.5]],false,g.tip)];
  },
  usb(g) {
    const f=figure(g),r=Math.min(g.r,g.v(.3,.4,.5));
    // At 16px the terminal holes would be only .75px wide. Filled circle and
    // square terminals preserve USB's three distinct signals without tiny holes.
    const terminal=(x,y)=>g.s===16?f.dot(x,y,1):f.circle(x,y,1.5);
    const square=f.rect(16.5,5,3,3,r);
    if(g.s===16)Object.assign(square[1],{fill:'currentColor',stroke:'none'});
    const branch=points=>{
      const node=f.contour(points,false,r);
      // Both ends join another structure. Square caps must not grow spurs
      // across the central stem or intrude into the terminal holes.
      node[1]['stroke-linecap']='butt';
      return node;
    };
    return [terminal(12,20),...f.arrow([f.line(12,18.5,12,3)],[[9.5,5.5],[12,3],[14.5,5.5]]),
      branch([[12,16],[6.5,12.5],[6.5,9.5]]),terminal(6.5,8),
      branch([[12,13],[18,10],[18,8]]),square];
  },
  cast(g) {
    const f=figure(g);
    return [f.contour([[3,7],[3,4],[21,4],[21,19],[16,19]],false,g.r),
      f.path('M3 11A10 10 0 0 1 13 21'),f.path('M3 16A5 5 0 0 1 8 21'),f.dot(3,21,g.stroke/2)];
  },
  accessibility(g) {
    const f=figure(g);
    return [g.s===16?f.dot(12.5,4,1.25):f.circle(12.5,4,1.6),f.contour([[11,8],[10,13],[17,13],[19,20],[22,19]],false,g.tip),
      f.line(10.6,10,16,10),f.path('M6.5 10.5A5.5 5.5 0 1 0 13 18.5')];
  },
};
