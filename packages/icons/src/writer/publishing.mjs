import {figure,mark,rotate} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

function orientation(g,landscape) {
  const f=figure(g),w=landscape?19:13.3,h=landscape?13.3:19;
  const x=(24-w)/2,y=(24-h)/2;
  return [f.rect(x,y,w,h),f.line(x+3,y+h-3.5,x+7,y+h-3.5)];
}
function fitWidth(g) {
  const f=figure(g);
  const edge=g.s===16?2.4:2.8,tip=edge+3.8;
  return [f.line(edge,4.5,edge,19.5),f.line(24-edge,4.5,24-edge,19.5),
    f.line(tip,12,24-tip,12),f.contour([[tip+3.3,8.7],[tip,12],[tip+3.3,15.3]]),
    f.contour([[24-tip-3.3,8.7],[24-tip,12],[24-tip-3.3,15.3]])];
}
export const publishing={
  'page-number'(g) {
    const f=figure(g);
    return [f.rect(4.6,2.6,14.8,18.8),f.line(8.1,6.7,15.6,6.7),
      f.path('M9.7 12.6L12.8 10.5V17.8M10.2 17.8H15.3')];
  },
  'page-margins'(g) {
    const f=figure(g);
    return [f.rect(4.4,2.6,15.2,18.8),f.path('M8 9V6.5H10.5M13.5 6.5H16V9M16 15V17.5H13.5M10.5 17.5H8V15')];
  },
  'page-orientation-portrait':g=>orientation(g,false),
  'page-orientation-landscape':g=>orientation(g,true),
  'facing-pages'(g) {
    const f=figure(g);
    return [f.rect(2.1,4.7,8.1,14.6,Math.min(g.r,1)),f.rect(13.8,4.7,8.1,14.6,Math.min(g.r,1)),
      f.line(4.7,15.8,7.6,15.8),f.line(16.4,15.8,19.3,15.8)];
  },
  'page-add'(g) {
    const f=figure(g);
    return knockout([f.rect(4.5,2.6,14,18.8),f.line(7.7,17.9,10.9,17.9)],mark(g,'plus',18.3,16.8),g);
  },
  'page-duplicate'(g) {
    const f=figure(g);
    return [f.contour([[3.3,16.3],[3.3,2.7],[15.6,2.7]],false,g.r),
      f.rect(7.5,6.9,12.5,14.5),f.line(10.5,18,13.9,18)];
  },
  'fit-page-width':fitWidth,'fit-page-height':g=>rotate(fitWidth(g),90,g),
  'print-preview'(g) {
    const f=figure(g),lens=f.circle(16.1,15.5,3.8);
    return knockout([f.contour([[6,8.3],[6,3.1],[17,3.1],[17,8.3]],false,g.r),
      f.rect(2.5,8.3,18.2,9.8),f.contour([[6,18.1],[6,21],[14.5,21]],false,g.r),f.dot(6.3,12.1,g.stroke/2)],
      [lens,f.line(18.8,18.3,21.6,21.1)],g,{silhouettes:[lens]});
  },
};
