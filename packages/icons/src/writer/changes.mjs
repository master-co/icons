import {figure,mark} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

function suggestion(g,insert) {
  const f=figure(g);
  return [f.path('M3 7V4.5H13V7M8 4.5V16M5.6 16H10.4'),
    f.line(2.9,insert?20:11.2,13.2,insert?20:11.2),
    ...mark(g,insert?'plus':'minus',18.7,13.5)];
}
function changeDecision(g,accept,all) {
  const f=figure(g);
  const page=all?f.rect(6.8,6.4,12.8,14.4):f.rect(4.6,3.1,14.3,17.7);
  const background=all?[f.contour([[3,16],[3,2.8],[15.6,2.8]],false,g.r),page]:[page];
  background.push(all?f.line(10,10.9,15.8,10.9):f.line(8,8.3,14.8,8.3));
  const sign=accept?[f.contour([[13.2,17.3],[16.2,20.3],[21.7,14.5]])]:[
    f.line(14.4,14.8,20.6,21),f.line(20.6,14.8,14.4,21)];
  return knockout(background,sign,g);
}
export const changes={
  'suggestion-insert':g=>suggestion(g,true),'suggestion-delete':g=>suggestion(g,false),
  'accept-change':g=>changeDecision(g,true,false),'reject-change':g=>changeDecision(g,false,false),
  'accept-all-changes':g=>changeDecision(g,true,true),'reject-all-changes':g=>changeDecision(g,false,true),
  'compare-documents'(g) {
    const f=figure(g);
    return [f.rect(2.2,3.8,8.2,16.4,Math.min(g.r,1.2)),f.rect(13.6,3.8,8.2,16.4,Math.min(g.r,1.2)),
      f.line(4.6,8.8,7.9,8.8),f.line(16.1,8.8,19.3,8.8),f.line(16.1,14.2,19.3,14.2)];
  },
  'version-restore'(g) {
    const f=figure(g);
    return knockout([f.rect(4,3,14.8,17.8),f.line(7.2,7.4,13,7.4)],
      f.arrow([f.path('M12.2 17.5C12.5 20.3 15.5 21.8 18 20.8C21.2 19.5 21.6 15.3 19 13.4C17.4 12.1 14.7 12.2 13.1 13.9L11.8 15.2')],[[11.8,11.6],[11.8,15.2],[15.5,15.2]]),g);
  },
  'version-save'(g) {
    const f=figure(g);
    const camera=f.contour([[10.6,13],[13.1,13],[14.5,11.1],[17.8,11.1],[19.1,13],[21.6,13],[21.6,20.4],[10.6,20.4]],true,Math.min(g.r,.7));
    return knockout([f.rect(3.7,2.7,14.2,17.6),f.line(7,7,13.1,7)],
      [camera,f.circle(16.2,16.6,g.v(2.2,2,1.8))],g,{silhouettes:[camera]});
  },
  'track-changes'(g) {
    const f=figure(g);
    return [f.line(3.2,4,3.2,20),f.line(7,5.5,20.5,5.5),f.line(7,10.6,12.8,10.6),f.line(7,15.6,9.8,15.6),
      f.contour([[13.6,16.2],[18.7,11.1],[21.2,13.6],[16.1,18.7],[12.7,19.6]],true,g.tip)];
  },
};
