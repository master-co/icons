import {line,weightDelta} from '../geometry.mjs';
import {capitalA} from './letter-case.mjs';

// The same A as case and spacing controls, with room below for the colour rule.
// The monochrome rule identifies the command; live colour belongs to the UI.
export const textColor={
  'text-color':g=>{
    const {s,c,v}=g,width=v(8.5,10.5,12.5),left=v(2.5,3,3.5),rule=v(14,17.5,21);
    return [...capitalA(g,{left:c-width/2,top:v(2.5,3,3.5),width,height:v(8.5,11,13.5)-weightDelta(g)*.5}),
      line(left,rule,s-left,rule)];
  },
};
