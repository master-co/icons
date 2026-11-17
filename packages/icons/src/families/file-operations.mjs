import { figure, mark } from './shared.mjs';
import { file, folder } from './core.mjs';

// Keep the original native file/folder outlines and fold, including 16px edits.
function folderArrow(g,up) {
  // Reserve visible air below the inner arrow in each native master.
  const f=figure(g),bottom=g.v(15.75,16.25,16.75),tip=up?10.5:bottom,tail=up?bottom:10.5,wing=up?13.5:bottom-3;
  return [...folder(g),...f.arrow([f.line(12,tail,12,tip)],[[9,wing],[12,tip],[15,wing]])];
}
export const fileOperations = {
  'file-code'(g) {
    const f=figure(g);
    return [...file(g),f.contour([[10.5,12.5],[8.75,14.5],[10.5,16.5]],false,g.tip),
      f.contour([[13.5,12.5],[15.25,14.5],[13.5,16.5]],false,g.tip)];
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
    // A filled notehead is both conventional and clearer than a subpixel hole.
    return [...file(g),f.dot(10.5,17,g.v(1.15,1.45,1.75)),f.contour([[12,17],[12,10.5],[15.5,12]],false,g.tip)];
  },
  'file-archive'(g) {
    const f=figure(g),small=g.s===16,track=f.line(12,9,12,small?13.125:13);
    // Separated zipper teeth are semantic, not a faded or broken file outline.
    return [...file(g),[track[0],{...track[1],
      ...(small?{'stroke-width':1}:{}),
      'stroke-linecap':'butt',
      'stroke-dasharray':`${g.v(.75,.75,.9)} ${g.v(1.25,2,2.4)}`}],f.circle(12,small?16.5:17,small?1.9:1.5)];
  },
  'folder-minus':g=>[...folder(g),...mark(g,'minus',12,14)],
  'folder-check':g=>[...folder(g),...mark(g,'check',12,14)],
  'folder-x':g=>[...folder(g),...mark(g,'x',12,14)],
  'folder-up':g=>folderArrow(g,true),
  'folder-down':g=>folderArrow(g,false),
};
