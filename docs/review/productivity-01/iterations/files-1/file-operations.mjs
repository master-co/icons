import { figure, mark } from './shared.mjs';
import { file, folder } from './core.mjs';

// Keep the original native file/folder outlines and fold, including 16px edits.
function folderArrow(g,up) {
  const f=figure(g),tip=up?10.5:17.5,tail=up?17.5:10.5,wing=up?13.5:14.5;
  return [...folder(g),f.line(12,tail,12,tip),f.contour([[9,wing],[12,tip],[15,wing]],false,g.tip)];
}
export const fileOperations = {
  'file-code'(g) {
    const f=figure(g);
    return [...file(g),f.contour([[10.5,12],[8,14.5],[10.5,17]],false,g.tip),
      f.contour([[13.5,12],[16,14.5],[13.5,17]],false,g.tip)];
  },
  'file-image'(g) {
    const f=figure(g);
    return [...file(g),f.dot(9,10.5,g.stroke/2),
      f.contour([[8.5,17.5],[12,13],[15.5,17.5]],false,g.tip)];
  },
  'file-video'(g) {
    const f=figure(g);
    return [...file(g),f.contour([[9.5,11],[15.5,14.5],[9.5,18]],true,g.tip)];
  },
  'file-audio'(g) {
    const f=figure(g);
    return [...file(g),f.circle(10.5,17,1.5),f.contour([[12,17],[12,10.5],[15.5,12]],false,g.tip)];
  },
  'file-archive'(g) {
    const f=figure(g),r=Math.min(g.r,g.v(.35,.45,.6));
    return [...file(g),f.line(12,9.5,12,14),f.rect(10,14,4,4,r),
      ...(g.s===16?[]:[f.line(10.5,10.5,12,10.5)])];
  },
  'folder-minus':g=>[...folder(g),...mark(g,'minus',12,14)],
  'folder-check':g=>[...folder(g),...mark(g,'check',12,14)],
  'folder-x':g=>[...folder(g),...mark(g,'x',12,14)],
  'folder-up':g=>folderArrow(g,true),
  'folder-down':g=>folderArrow(g,false),
};
