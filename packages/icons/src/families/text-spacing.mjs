import {line} from '../geometry.mjs';
import {capitalA} from './letter-case.mjs';

// Adapt Lucide's letter-between-rules construction. The letter is shared
// with the case family; native layout keeps its counter and the rule gaps.
export const textSpacing={
  'line-height'(g) {
    const left=g.v(2.5,3,3.5),top=g.v(2,2.5,3);
    const width=g.v(5.5,7,8.5),height=g.v(5.5,7,8.5);
    return [line(left,top,g.s-left,top),line(left,g.s-top,g.s-left,g.s-top),
      ...capitalA(g,{left:g.c-width/2,top:g.c-height/2,width,height})];
  },
  'letter-spacing'(g) {
    const left=g.v(2,2.5,3),top=g.v(2.5,3,3.5);
    const width=g.v(5.25,6.5,7.75),height=g.v(8,10,12);
    return [line(left,top,left,g.s-top),line(g.s-left,top,g.s-left,g.s-top),
      ...capitalA(g,{left:g.c-width/2,top:g.c-height/2,width,height})];
  },
};
