import {path,line,n} from '../geometry.mjs';
import {textSymbol} from './typography.mjs';
import {cross} from './core.mjs';

export function paragraphSymbol(g,{compact=false}={}) {
    const top=compact?g.v(1.75,2.25,2.75):g.v(2.5,3,3.5);
    const bottom=compact?g.v(8.75,11,13.25):g.v(13.5,17,20.5);
    const stem=compact?g.v(8.5,10.5,12.5):g.v(9,11.25,13.5);
    const right=compact?g.v(11.5,14.5,17.5):g.v(12,15,18);
    const capEnd=compact?g.v(12.5,15.75,19):g.v(13,16.25,19.5);
    const bowlX=compact?g.v(6.25,7.75,9.25):g.v(6.5,8,9.5);
    const radius=compact?g.v(2.5,3,3.5):g.v(3,3.75,4.5),bowlBottom=top+radius*2;
    return [path(`M${n(capEnd)} ${n(top)}H${n(bowlX)}A${n(radius)} ${n(radius)} 0 0 0 ${n(bowlX)} ${n(bowlBottom)}H${n(stem)}`),
      line(stem,top,stem,bottom),line(right,top,right,bottom)];
}

export const paragraphTools={
  pilcrow:g=>paragraphSymbol(g),
  'remove-formatting':g=>[...textSymbol(g,{clearing:true}),
    ...cross(g,{x:g.v(12.25,15.5,19),y:g.v(11.75,15,18.5),half:g.v(1.75,2.25,2.5)})],
};
