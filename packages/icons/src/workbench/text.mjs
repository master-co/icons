import {figure,mark} from '../families/shared.mjs';

function capitalA(f,x,y,w,h) {
  const mid=x+w/2;
  return [f.contour([[x,y+h],[mid,y],[x+w,y+h]]),f.line(x+w*.19,y+h*.64,x+w*.81,y+h*.64)];
}
function sizeChange(g,increase) {
  const f=figure(g);
  return [...capitalA(f,2.9,5.5,10.8,13),...mark(g,increase?'plus':'minus',18.4,8.6)];
}
function underline(g,style) {
  const f=figure(g),base=style==='double'?13.6:15.2;
  const u=f.path('M6.8 3.6V9.2C6.8 '+(base+1.4)+' 17.2 '+(base+1.4)+' 17.2 9.2V3.6');
  if(style==='double')return [u,f.line(4.2,16.5,19.8,16.5),f.line(4.2,20.8,19.8,20.8)];
  if(style==='dotted')return [u,...[4.4,8.2,12,15.8,19.6].map(x=>f.dot(x,19.8,1))];
  return [u,f.path('M3.5 20C4.8 20 5.1 18.4 6.6 18.4C8.3 18.4 8.7 20.8 10.4 20.8S12.7 18.4 14.3 18.4S16.5 20.8 18.2 20.8Q19.3 20.8 20.5 19.4')];
}
export const textTools={
  'font-size-increase':g=>sizeChange(g,true),
  'font-size-decrease':g=>sizeChange(g,false),
  'double-underline':g=>underline(g,'double'),
  'dotted-underline':g=>underline(g,'dotted'),
  'wavy-underline':g=>underline(g,'wavy'),
  overline(g) {
    const f=figure(g);
    return [f.line(4.3,3.8,19.7,3.8),...capitalA(f,5.9,8.4,12.2,11.8)];
  },
  'text-outline'(g) {
    return [figure(g).contour([[3.8,4.3],[20.2,4.3],[20.2,9.3],[14.5,9.3],[14.5,20.2],[9.5,20.2],[9.5,9.3],[3.8,9.3]],true,Math.min(g.r,.85))];
  },
  'drop-cap'(g) {
    const f=figure(g);
    return [...capitalA(f,2.8,4.3,10.4,11),f.line(15.9,5.2,21,5.2),f.line(15.9,10.4,21,10.4),
      f.line(15.9,15.3,20.2,15.3),f.line(3,20.3,19.1,20.3)];
  },
  'vertical-text'(g) {
    const f=figure(g);
    return [...capitalA(f,4.1,3.2,7.5,7.4),f.path('M5.3 14.1H8C11 14.1 11.3 17 8.4 17.1H5.3M8.4 17.1C11.9 17.1 11.7 20.6 8.2 20.6H5.3V14.1'),
      ...f.arrow([f.line(17.9,4.2,17.9,19.9)],[[15.2,17.2],[17.9,19.9],[20.6,17.2]])];
  },
};
