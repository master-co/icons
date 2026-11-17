import {weightDelta} from '../geometry.mjs';
import {figure,mark} from '../families/shared.mjs';
import {enclosedDetails} from '../occlusion.mjs';
import {file} from '../families/core.mjs';
import {files} from '../families/files.mjs';

export const knowledge={
  book:g=>{
    const f=figure(g),k=g.corner==='sharp'?0:g.corner==='soft'?.6:1.2;
    return [f.path(`M4.5 18.5V5.5Q4.5 3 7 3H${19.5-k}Q19.5 3 19.5 ${3+k}`+
      `V${21-k}Q19.5 21 ${19.5-k} 21H7Q4.5 21 4.5 18.5Z`),
      f.path('M4.5 18.5Q4.5 16 7 16H19.5')];
  },
  'book-open':g=>{
    const f=figure(g),k=g.corner==='sharp'?0:g.corner==='soft'?.45:.9;
    const shell=f.path(`M3 ${4.5+k}`+(k?`Q3 4.5 ${3+k} ${4.5-k*.25}`:'')+
      `C6 3.5 9.5 4 12 6C14.5 4 18 3.5 ${21-k} ${4.5-k*.25}`+(k?`Q21 4.5 21 ${4.5+k}`:'')+
      `V${19-k}`+(k?`Q21 19 ${21-k} ${19-k*.25}`:'')+`C18 18 14.5 18.5 12 20.5`+
      `C9.5 18.5 6 18 ${3+k} ${19-k*.25}`+(k?`Q3 19 3 ${19-k}`:'')+'Z');
    return enclosedDetails(shell,[f.line(12,6,12,20.5)],g);
  },
  notebook:g=>{
    const f=figure(g),rings=g.s===16?[6.5,12,17.5]:[6,10,14,18];
    return [f.rect(5,3,15,18),f.line(16.5,3,16.5,21),...rings.map(y=>f.line(3,y,7,y))];
  },
  'sticky-note':g=>{
    const f=figure(g);
    // The fold's two perimeter contacts stay exact, even with a rounded sheet.
    return [f.contour([[4,4],[20,4],[20,13.5],[13.5,20],[4,20]],true,[g.r,g.r,0,0,g.r]),
      f.contour([[13.5,20],[13.5,13.5],[20,13.5]],false,g.tip)];
  },
  newspaper:g=>{
    const f=figure(g);
    return [f.contour([[7,19],[7,3],[21,3],[21,21],[5,21]],false,g.r),
      f.path('M7 9H4.5Q3 9 3 10.5V19A2 2 0 0 0 7 19'),
      f.rect(10,6.5,8,4.5,g.v(.3,.4,.5)),
      ...(g.s===16?[f.line(10,16,18,16)]:[f.line(10,14.5,18,14.5),f.line(10,18,15.5,18)])];
  },
  'bookmark-plus':g=>[...files.bookmark(g),...mark(g,'plus',12,10)],
  'bookmark-minus':g=>[...files.bookmark(g),...mark(g,'minus',12,10)],
  'file-question':g=>{
    const f=figure(g);
    return [...file(g),f.path(weightDelta(g)?'M10 12.5C10 10.75 14 10.75 14 12.5C14 13.5 12 13.5 12 14.5':'M10 12C10 9.8 14 9.8 14 12C14 13.5 12 13.2 12 14.5'),
      f.dot(12,17.7,g.v(.65,.75,.85))];
  },
};
