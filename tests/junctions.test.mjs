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
  const old=paintedRegion(before['keyboard-return'].variants[g.s][g.corner].nodes.slice(1,2),g);
  const probe=paintedRegion([['rect',{x:f.u(7),y:f.u(12.75),width:f.u(4),height:f.u(.5),fill:'currentColor',stroke:'none'}]],g);
  const joint=paintedRegion([['circle',{...f.circle(8,13,6)[1],fill:'currentColor',stroke:'none'}]],g);
  const currentOutside=shaft.copy(),oldOutside=old.copy();
  try{
   contained(shaft,old,`${g.s}/${g.corner}: added shaft ink`);
   currentOutside.op(joint,P.PathOp.DIFFERENCE);oldOutside.op(joint,P.PathOp.DIFFERENCE);
   contained(currentOutside,oldOutside,'return route changed');contained(oldOutside,currentOutside,'return route erased');
   // At the original apex the shaft cannot extend beyond the painted head.
   const cap=shaft.copy(),tip=paintedRegion([['rect',{x:f.u(6),y:f.u(11.5),width:f.u(2),height:f.u(3),fill:'currentColor',stroke:'none'}]],g);
   try{cap.op(tip,P.PathOp.INTERSECT);contained(cap,head,'shaft protrudes ahead of head');}finally{cap.delete();tip.delete();}
   const joined=shaft.copy();try{joined.op(head,P.PathOp.INTERSECT);joined.op(probe,P.PathOp.INTERSECT);assert.notEqual(joined.toSVGString(),'','disconnected arrow joint');}finally{joined.delete();}
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
