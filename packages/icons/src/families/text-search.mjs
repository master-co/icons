import {contour} from '../geometry.mjs';
import {capitalA,lowerA,lowerB} from './letter-case.mjs';
import {enclosedCheck} from './core.mjs';

export const textSearch={
  'match-whole-word':g=>{
    const {v,s}=g,width=v(4.5,5.5,6.75),top=v(4.75,6.5,8),height=v(4.75,6,7);
    const left=v(1.75,2.25,3),right=s-left-width;
    const edge=v(1.75,2,2.5),base=v(14,17,20.5),end=v(12,15.25,18.5);
    return [...lowerA(g,{left,top,width,height}),
      ...lowerB(g,{left:right,top,width,height,stemTop:v(2.75,4,5)}),
      contour([[edge,end],[edge,base],[s-edge,base],[s-edge,end]],Math.min(g.r,v(.65,.85,1)))];
  },
  'spell-check':g=>[
    ...capitalA(g,{left:g.v(2,2.5,3),top:g.v(1.75,2.5,3),width:g.v(7,8.75,10.5),height:g.v(7.75,9.5,11.25)}),
    enclosedCheck(g,{offsetX:g.v(3,4,5),offsetY:g.v(4,5,6.5)}),
  ],
};
