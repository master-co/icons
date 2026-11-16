import {figure} from '../families/shared.mjs';
import {file,folder} from '../families/core.mjs';

function gitRequest(g,compare=false){
  const f=figure(g);
  return [f.circle(6,5.5,2.5),f.circle(18,18.5,2.5),
    f.path('M18 16V9.5Q18 5.5 14 5.5H12.5'),
    compare?f.path('M6 8V14.5Q6 18.5 10 18.5H11.5'):f.line(6,8,6,21)];
}
function puzzle(g){
  const f=figure(g),r=g.r*24/g.s;
  // Knobs and sockets are structural curves in all three corner presets.
  if(r===0)return [f.path('M4 6H10C9 2 15 2 14 6H20V10C24 9 24 15 20 14V20H14C15 16 9 16 10 20H4V14C8 15 8 9 4 10Z')];
  return [f.path(`M${4+r} 6H10C9 2 15 2 14 6H${20-r}Q20 6 20 ${6+r}`+
    `V10C24 9 24 15 20 14V${20-r}Q20 20 ${20-r} 20`+
    `H14C15 16 9 16 10 20H${4+r}Q4 20 4 ${20-r}`+
    `V14C8 15 8 9 4 10V${6+r}Q4 6 ${4+r} 6Z`)];
}
export const development={
  'git-commit':g=>{const f=figure(g);return [f.circle(12,12,3.5),f.line(3,12,8.5,12),f.line(15.5,12,21,12)];},
  'git-pull-request':g=>gitRequest(g),
  'git-compare':g=>gitRequest(g,true),
  'git-fork':g=>{const f=figure(g);return [f.circle(6,5.5,2.5),f.circle(18,5.5,2.5),f.circle(12,18.5,2.5),
    f.path('M6 8V9Q6 12 9 12H15Q18 12 18 9V8'),f.line(12,12,12,16)];},
  brackets:g=>{const f=figure(g);return [f.contour([[8.5,3],[5,3],[5,21],[8.5,21]],false,g.tip),
    f.contour([[15.5,3],[19,3],[19,21],[15.5,21]],false,g.tip)];},
  regex:g=>{const f=figure(g),cx=16,cy=8.5,r=4.5;return [f.dot(6.5,17,g.v(1.1,1.4,1.6)),
    ...[Math.PI/2,Math.PI/6,-Math.PI/6].map(a=>f.line(cx-r*Math.cos(a),cy-r*Math.sin(a),cx+r*Math.cos(a),cy+r*Math.sin(a)))];},
  variable:g=>{const f=figure(g);return [f.path('M7 3C2.5 7 2.5 17 7 21'),f.path('M17 3C21.5 7 21.5 17 17 21'),
    f.path('M8.5 8.5H9.25C10.75 8.5 10.75 15.5 14.25 15.5H15.25'),
    f.path('M8.5 15.5C10.5 15.5 13.5 8.5 15.5 8.5')];},
  'file-json':g=>{const f=figure(g);return [...file(g),
    f.path('M10 10.5H9.5Q9 10.5 9 11.5V12.5Q9 14 8 14Q9 14 9 15.5V16.5Q9 17.5 9.5 17.5H10'),
    f.path('M14 10.5H14.5Q15 10.5 15 11.5V12.5Q15 14 16 14Q15 14 15 15.5V16.5Q15 17.5 14.5 17.5H14')];},
  'folder-code':g=>{const f=figure(g);return [...folder(g),f.contour([[10,10.5],[7.5,13],[10,15.5]],false,g.tip),
    f.contour([[14,10.5],[16.5,13],[14,15.5]],false,g.tip)];},
  puzzle,
};
