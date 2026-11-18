import {figure} from '../families/shared.mjs';

function fold(g,inward) {
  const f=figure(g),tip=inward?8.6:3.1,tail=inward?2.8:8.9,wing=inward?5.9:5.8;
  return [f.line(3.1,12,8.6,12),f.line(15.4,12,20.9,12),
    ...f.arrow([f.line(12,tail,12,tip)],[[9.2,wing],[12,tip],[14.8,wing]]),
    ...f.arrow([f.line(12,24-tail,12,24-tip)],[[9.2,24-wing],[12,24-tip],[14.8,24-wing]])];
}
function caret(f,x,y) {
  return [f.line(x,y,x,y+10),f.path('M'+(x-2.8)+' '+(y-.6)+'Q'+x+' '+(y+1.4)+' '+(x+2.8)+' '+(y-.6)),
    f.path('M'+(x-2.8)+' '+(y+10.6)+'Q'+x+' '+(y+8.6)+' '+(x+2.8)+' '+(y+10.6))];
}
export const codeTools={
  'fold-code':g=>fold(g,true),
  'unfold-code':g=>fold(g,false),
  'toggle-line-comment'(g) {
    const f=figure(g);
    return [f.line(3,16.5,7,7.5),f.line(8.2,16.5,12.2,7.5),f.line(15.1,12,21.2,12)];
  },
  'toggle-block-comment'(g) {
    const f=figure(g);
    return [f.line(4.1,11.5,8.3,3.5),f.line(14.6,3.7,14.6,10.1),f.line(11.8,5.3,17.4,8.6),f.line(11.8,8.6,17.4,5.3),
      f.line(4.1,15.7,20.9,15.7),f.line(4.1,20.3,15.3,20.3)];
  },
  'show-whitespace'(g) {
    const f=figure(g);
    return [f.dot(3.7,12,1.3),...f.arrow([f.line(8,12,16.2,12)],[[12.8,8.6],[16.2,12],[12.8,15.4]]),f.line(20.3,7.6,20.3,16.4)];
  },
  'multi-cursor'(g) {
    const f=figure(g);
    return [...caret(f,7.1,4),...caret(f,16.9,10)];
  },
  'go-to-line'(g) {
    const f=figure(g);
    return [f.line(11.8,4.8,20.7,4.8),f.line(13.4,12,20.7,12),f.line(11.8,19.2,20.7,19.2),
      ...f.arrow([f.contour([[3.6,6.2],[3.6,12],[9.6,12]],false,g.r)],[[6.9,9.3],[9.6,12],[6.9,14.7]])];
  },
  'matching-brackets'(g) {
    const f=figure(g);
    return [f.contour([[7,4.3],[3,4.3],[3,19.7],[7,19.7]],false,g.r),
      f.contour([[17,4.3],[21,4.3],[21,19.7],[17,19.7]],false,g.r),
      f.contour([[10,9.8],[7.8,12],[10,14.2]]),f.line(8.2,12,15.8,12),f.contour([[14,9.8],[16.2,12],[14,14.2]])];
  },
};
