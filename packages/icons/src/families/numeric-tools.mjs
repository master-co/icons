import {line} from '../geometry.mjs';
import {chartBars} from './core.mjs';

export const numericTools={
  'chart-bar-increasing':g=>chartBars(g,{tops:[g.v(8,10,12),g.v(6,7.5,9),g.v(3,4,4.5)]}),
  hash:g=>{
    const {c,s,v}=g,edge=v(2.5,3,3.5),row=v(5.75,7,8.5);
    const half=v(2.5,3,3.5),slant=v(1,1.25,1.5);
    // Intersections are continuous strokes, not tiny rounded boxes. Preserve
    // a spacious central counter and the four protruding stems at native 16px.
    return [line(edge,row,s-edge,row),line(edge,s-row,s-edge,s-row),
      ...[-half,half].map(x=>line(c+x+slant,edge,c+x-slant,s-edge))];
  },
};
