import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {draw} from '../src/drawings.mjs';
import {context} from '../src/geometry.mjs';
import {figure} from '../src/families/shared.mjs';
import {paintedRegion,offsetRegion,pathKit as P} from '../src/occlusion.mjs';
const masters=()=>[16,20,24].flatMap(s=>['sharp','soft','rounded'].map(c=>context(s,c)));
const before=JSON.parse(await readFile('references/craft-04/master-before.json'));
function contained(ink,shell,message){
 const tolerance=offsetRegion(shell,.003),extra=ink.copy();
 try{extra.op(tolerance,P.PathOp.DIFFERENCE);assert.equal(extra.toSVGString(),'',message);}
 finally{extra.delete();tolerance.delete();}
}
test('keyboard return trims only the tip and keeps its return route and connected shaft',()=>{
 for(const g of masters()){
  const nodes=draw('keyboard-return',g),f=figure(g),shaft=paintedRegion(nodes.slice(1,2),g),head=paintedRegion(nodes.slice(2),g);
  // The refined arrow is 0.5 construction units higher; compare the historic
  // untrimmed shaft at that position so this still detects tip over-trimming.
  const old=paintedRegion(before['keyboard-return'].variants[g.s][g.corner].nodes.slice(1,2),g);
  old.transform(1,0,0,0,1,f.u(-.5),0,0,1);
  const probe=paintedRegion([['rect',{x:f.u(7),y:f.u(12.25),width:f.u(4),height:f.u(.5),fill:'currentColor',stroke:'none'}]],g);
  const joint=paintedRegion([['circle',{...f.circle(8,12.5,6)[1],fill:'currentColor',stroke:'none'}]],g);
  const currentOutside=shaft.copy(),oldOutside=old.copy();
  try{
   contained(shaft,old,`${g.s}/${g.corner}: added shaft ink`);
   currentOutside.op(joint,P.PathOp.DIFFERENCE);oldOutside.op(joint,P.PathOp.DIFFERENCE);
   contained(currentOutside,oldOutside,'return route changed');contained(oldOutside,currentOutside,'return route erased');
   // At the original apex the shaft cannot extend beyond the painted head.
   const cap=shaft.copy(),tip=paintedRegion([['rect',{x:f.u(6),y:f.u(11),width:f.u(2),height:f.u(3),fill:'currentColor',stroke:'none'}]],g);
   try{cap.op(tip,P.PathOp.INTERSECT);contained(cap,head,'shaft protrudes ahead of head');}finally{cap.delete();tip.delete();}
   const joined=shaft.copy();try{joined.op(head,P.PathOp.INTERSECT);joined.op(probe,P.PathOp.INTERSECT);assert.notEqual(joined.toSVGString(),'','disconnected arrow joint');}finally{joined.delete();}
   const bottomGap=f.u(19)-g.stroke/2-head.computeTightBounds().fBottom;
   assert.ok(bottomGap>=1,`${g.s}/${g.corner}: arrow crowds bottom of key (${bottomGap})`);
  }finally{shaft.delete();head.delete();old.delete();probe.delete();joint.delete();currentOutside.delete();oldOutside.delete();}
 }
});
test('languages crossbar and briefcase seam stay inside their structural shells',()=>{
 for(const g of masters())for(const [name,shellIndex,detailIndex]of[['languages',3,4],['briefcase',0,1]]){
  const nodes=draw(name,g),[tag,a]=nodes[shellIndex];
  const shell=paintedRegion([[tag,{...a,fill:'currentColor'}]],g),detail=paintedRegion([nodes[detailIndex]],g);
  try{contained(detail,shell,`${name}/${g.s}/${g.corner}: protruding seam`);}finally{shell.delete();detail.delete();}
 }
});
test('wrench jaw, shoulders and handle share a genuine reflection axis',()=>{
 for(const g of masters()){
  const nodes=draw('wrench',g).map(([t,{transform,...a}])=>[t,a]);
  const ink=paintedRegion(nodes,g),mirror=ink.copy();
  try{mirror.transform(-1,0,g.s,0,1,0,0,0,1);contained(mirror,ink,`${g.s}/${g.corner}: asymmetric tool`);contained(ink,mirror,'asymmetric reflected tool');}
  finally{ink.delete();mirror.delete();}
 }
});
