import {figure} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

// Like the stops on a typesetter's ruler, the foot indicates which side
// of the insertion point receives text. The dotted stop aligns decimals.
function tabStop(g,kind) {
  const f=figure(g),stem=kind==='left'?8:kind==='right'?16:12;
  const foot=kind==='decimal'?[6.8,14.8]:[kind==='left'?stem:7.5,kind==='right'?stem:16.5];
  const x=kind==='decimal'?10.8:stem;
  return [f.path('M3 4.5V7M3 4.5H21M9 4.5V6.3M15 4.5V6.3M21 4.5V7'),
    f.line(x,10.6,x,18.5),f.line(foot[0],18.5,foot[1],18.5),
    ...(kind==='decimal'?[f.dot(18.5,16.2,g.stroke*.63)]:[])];
}

export const typeTools={
  'hard-break'(g) {
    const f=figure(g);
    return [f.line(3.5,5.3,14,5.3),
      ...f.arrow([f.contour([[19.8,5.3],[19.8,15],[4,15]],false,g.r)],[[8.5,10.5],[4,15],[8.5,19.5]])];
  },
  'nonbreaking-space'(g) {
    const f=figure(g);
    return [f.contour([[4,13.5],[4,18],[20,18],[20,13.5]],false,g.r),f.circle(12,8.3,2.7)];
  },
  'soft-hyphen'(g) {
    const f=figure(g);
    return [f.contour([[4.5,9.6],[18.5,9.6],[18.5,15.1]],false,g.tip)];
  },
  'tab-stop-left':g=>tabStop(g,'left'),
  'tab-stop-right':g=>tabStop(g,'right'),
  'tab-stop-center':g=>tabStop(g,'center'),
  'tab-stop-decimal':g=>tabStop(g,'decimal'),
};

function findMatch(g,up) {
  const f=figure(g),end=up?4:19,tail=up?19:4,wing=up?7.3:15.7;
  return [f.circle(8.6,9.8,5.6),f.line(12.4,14,15,17),
    ...f.arrow([f.line(19,tail,19,end)],[[16.3,wing],[19,end],[21.7,wing]])];
}
function replacement(g,all) {
  const f=figure(g),x=all?13.4:14;
  return [f.circle(6.5,6.2,3.35),f.rect(x,13.7,all?5.1:7,6.4,Math.min(g.r,1)),
    ...(all?[f.contour([[16.4,10],[21.7,10],[21.7,16.4]],false,g.r)]:[]),
    ...f.arrow([f.contour([[4,12],[4,17],[x-3,17]],false,g.r)],[[x-5.6,14.4],[x-3,17],[x-5.6,19.6]])];
}
function proof(g) {
  const f=figure(g);
  return [f.contour([[2.6,18.5],[7.9,4.5],[13.2,18.5]]),f.line(4.4,14,11.4,14),
    f.contour([[14,13],[16.8,15.8],[21.5,9.5]])];
}
function countMark(f,x,y) {
  return [f.path(`M${x+3} ${y}l-1.5 8M${x+7} ${y}l-1.5 8M${x} ${y+2.5}h9M${x-.5} ${y+5.8}h9`)];
}
export const proofing={
  'find-next':g=>findMatch(g,false),'find-previous':g=>findMatch(g,true),
  replace:g=>replacement(g,false),'replace-all':g=>replacement(g,true),
  'match-whole-word'(g) {
    const f=figure(g);
    return [f.path('M5.3 5.5L8.6 13.6L12 6.5L15.4 13.6L18.7 5.5'),
      f.contour([[3.2,16.7],[3.2,20],[20.8,20],[20.8,16.7]],false,g.tip)];
  },
  'search-selection'(g) {
    const f=figure(g);
    return [f.path('M3 7V3H7M17 3H21V7M21 17V21H17M7 21H3V17'),
      f.circle(10.7,10.7,4.1),f.line(13.6,13.6,16.6,16.6)];
  },
  'spell-check':proof,
  'spell-check-off':g=>knockout(proof(g),[figure(g).line(3,2.8,21,21.2)],g),
  'word-count'(g) {
    const f=figure(g);
    return [f.path('M3 5H10M14 5H21M3 10H7.5M11.5 10H18.5'),...countMark(f,9.3,13.3)];
  },
  'character-count'(g) {
    const f=figure(g);
    return [f.contour([[2.1,16.5],[6.3,4.4],[10.5,16.5]]),f.line(3.7,12,8.9,12),...countMark(f,13.1,12.5)];
  },
};
