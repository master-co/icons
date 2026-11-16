import {enclosedDetails} from '../occlusion.mjs';
import {figure,rotate} from '../families/shared.mjs';

export const utilities={
  power:g=>{
    const f=figure(g);
    // Open circle retains the power stem's negative space at every size.
    return [f.path('M6.2 5.8A8.5 8.5 0 1 0 17.8 5.8'),f.line(12,3,12,11)];
  },
  zap:g=>{
    const f=figure(g);
    return [f.contour([[13.5,3],[4,13],[11,13],[10,21],[20,10],[13,10]],true,g.tip)];
  },
  lightbulb:g=>{
    const f=figure(g);
    return [f.path('M9 15C9 13 6 12.5 6 9A6 6 0 0 1 18 9C18 12.5 15 13 15 15'),
      f.line(9,18,15,18),f.line(10,21,14,21)];
  },
  'life-buoy':g=>{
    const f=figure(g),inner=4/Math.sqrt(2),outer=9/Math.sqrt(2);
    const ties=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,y])=>
      f.line(12+x*inner,12+y*inner,12+x*outer,12+y*outer));
    return [f.circle(12,12,9),f.circle(12,12,4),...ties];
  },
  languages:g=>{
    const f=figure(g);
    return [f.line(3,6,13,6),f.line(7.5,3,7.5,6),
      f.path('M5 8C6.5 11.5 9 13 12 14M11 6C10 10 7 13 3.5 15'),
      ...enclosedDetails(f.contour([[12,21],[16.5,11],[21,21]],false,g.tip),[f.line(13.8,17,19.2,17)],g)];
  },
  wrench:g=>{
    const f=figure(g);
    // The open jaw, neck and rounded handle are structural curves, including
    // in sharp mode. No tiny end hole that would close at 16px.
    // Construct around x=12, then rotate the whole tool. Both jaws, shoulders,
    // handle rails and the end cap share the same physical symmetry axis.
    return rotate([f.path('M9 3C5 4.2 4.8 10.2 10 12V19.5A2 2 0 0 0 14 19.5V12C19.2 10.2 19 4.2 15 3V6.5L12 8.5L9 6.5Z')],45,g);
  },
  command:g=>{
    const f=figure(g);
    return [f.path('M9 9V6.5A2.5 2.5 0 1 0 6.5 9H17.5A2.5 2.5 0 1 0 15 6.5V17.5A2.5 2.5 0 1 0 17.5 15H6.5A2.5 2.5 0 1 0 9 17.5V9Z')];
  },
  backspace:g=>{
    const f=figure(g);
    return [f.contour([[8.5,5],[21,5],[21,19],[8.5,19],[2.5,12]],true,g.r),
      f.line(12,10,16,14),f.line(16,10,12,14)];
  },
  'keyboard-return':g=>{
    const f=figure(g);
    return [f.rect(3,5,18,14),...f.arrow([f.contour([[17,9],[17,13],[8,13]],false,g.r/2)],[[11,10],[8,13],[11,16]])];
  },
  locate:g=>{
    const f=figure(g);
    return [f.circle(12,12,6.5),f.line(12,3,12,5.5),f.line(12,18.5,12,21),
      f.line(3,12,5.5,12),f.line(18.5,12,21,12)];
  },
};
