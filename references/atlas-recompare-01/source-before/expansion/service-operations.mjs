import {figure,mark} from '../families/shared.mjs';
import {coreDrawings} from '../families/core.mjs';
import {connectivity} from '../families/connectivity.mjs';
import {systems} from '../families/systems.mjs';
import {accountGear} from '../families/collaboration.mjs';
import {knockout,paintedRegion,regionPathData} from '../occlusion.mjs';

// Canonicalize each stroked ellipse/arc before the multi-contour Boolean.
// Directly combining raw Skia stroke contours can fill the database's upper
// compartment. Each isolated painted region preserves the mother's open space.
function databaseBase(g){
  return coreDrawings.database(g).map(node=>{
    const region=paintedRegion([node],g);
    try{return ['path',{d:regionPathData(region),fill:'currentColor',stroke:'none','fill-rule':region.getFillTypeString()}];}
    finally{region.delete();}
  });
}

const flat=node=>[node[0],{...node[1],'stroke-linecap':'butt'}];
function syncArrows(g){
  const f=figure(g),dx=4.5*Math.sqrt(3)/2,l=12-dx,r=12+dx;
  return [flat(f.path(`M${l} 15.25A4.5 4.5 0 0 1 ${r} 15.25`)),
    f.contour([[r,12.25],[r,15.25],[r-3,15.25]],false,g.tip),
    flat(f.path(`M${r} 19.75A4.5 4.5 0 0 1 ${l} 19.75`)),
    f.contour([[l,22.75],[l,19.75],[l+3,19.75]],false,g.tip)];
}
function driveTransfer(g,up){
  const f=figure(g),y=up?3:10,h=3;
  const arrow=f.arrow([f.line(12,3,12,10)],[[12-h,y+(up?h:-h)],[12,y],[12+h,y+(up?h:-h)]]);
  // Keep the actual drive chassis, including its sloping top, under the arrow.
  return knockout(systems['hard-drive'](g),arrow,g);
}
export const serviceOperations={
  'cloud-check':g=>knockout(connectivity.cloud(g),mark(g,'check',12,18),g),
  'cloud-off':g=>knockout(connectivity.cloud(g),[figure(g).line(3,3,21,21)],g),
  'cloud-sync':g=>knockout(connectivity.cloud(g),syncArrows(g),g,{silhouettes:[figure(g).circle(12,17.5,4.5)]}),
  'database-backup':g=>{const f=figure(g),x=17-4.5*Math.sqrt(3)/2,y=15.25;
    const arrow=[flat(f.path(`M${x} ${y}A4.5 4.5 0 1 1 14.75 ${17.5+4.5*Math.sqrt(3)/2}`)),
      f.contour([[x,y-3.5],[x,y],[x+3.5,y]],false,g.tip)];
    return knockout(databaseBase(g),arrow,g,{silhouettes:[f.circle(17,17.5,4.5)]});},
  'database-search':g=>{const f=figure(g),r=3.1,cx=16.5,cy=17,q=r/Math.sqrt(2),lens=f.circle(cx,cy,r);
    return knockout(databaseBase(g),[lens,f.line(cx+q,cy+q,21.5,22)],g,{silhouettes:[lens]});},
  'server-cog':g=>{const gear=accountGear(g);return knockout(systems.server(g),gear,g,{silhouettes:[gear[0]]});},
  'hard-drive-upload':g=>driveTransfer(g,true),
  'hard-drive-download':g=>driveTransfer(g,false),
};
