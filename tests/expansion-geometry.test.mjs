import test from 'node:test';
import assert from 'node:assert/strict';
import {draw} from '../src/drawings.mjs';
import {context} from '../src/geometry.mjs';
import {figure} from '../src/families/shared.mjs';
import {pathKit as P,paintedRegion} from '../src/occlusion.mjs';
const masters=()=>[16,20,24].flatMap(s=>['sharp','soft','rounded'].map(c=>context(s,c)));
function hasInk(nodes,probe,g){
 const ink=paintedRegion(nodes,g),area=paintedRegion([[probe[0],{...probe[1],fill:'currentColor',stroke:'none'}]],g);
 try{ink.op(area,P.PathOp.INTERSECT);return ink.toSVGString()!=='';}finally{ink.delete();area.delete();}
}
test('structural seams do not paint outside the actual package and drive shells',()=>{
 for(const g of masters())for(const name of['package','hard-drive']){
  const nodes=draw(name,g),[tag,a]=nodes[0];
  const shell=paintedRegion([[tag,{...a,fill:'currentColor'}]],g),ink=paintedRegion(nodes,g);
  try{ink.op(shell,P.PathOp.DIFFERENCE);assert.equal(ink.toSVGString(),'',`${name}/${g.s}/${g.corner}: protruding seam ink`);}
  finally{shell.delete();ink.delete();}
 }
});
test('database state drawings retain empty upper compartments after Boolean operations',()=>{
 for(const g of masters())for(const name of['database-backup','database-search']){
  // A witness square strictly inside the upper compartment, clear of badges.
  const x=g.v(5.5,6.5,7.5),y=g.v(7.5,8,10),probe=['rect',{x,y,width:.5,height:.5,rx:0}];
  assert.equal(hasInk(draw(name,g),probe,g),false,`${name}/${g.s}/${g.corner}: filled upper compartment`);
 }
});
test('circular foreground badges leave no background fragments inside their loops',()=>{
 for(const g of masters())for(const [name,cx,cy]of[['cloud-sync',12,17.5],['database-backup',17,17.5]]){
  const f=figure(g),probe=f.circle(cx,cy,2);
  assert.equal(hasInk(draw(name,g).slice(0,1),probe,g),false,`${name}/${g.s}/${g.corner}: background ink inside badge`);
 }
});
test('clipboard pen sharp miter and all new service badges stay within the native canvas',()=>{
 for(const g of masters())for(const name of['clipboard-pen','cloud-sync','database-backup','database-search','server-cog','puzzle']){
  const p=paintedRegion(draw(name,g),g);
  try{const b=p.computeTightBounds();assert.ok(b.fLeft>=0&&b.fTop>=0&&b.fRight<=g.s&&b.fBottom<=g.s,`${name}/${g.s}/${g.corner}: ${JSON.stringify(b)}`);}
  finally{p.delete();}
 }
});
