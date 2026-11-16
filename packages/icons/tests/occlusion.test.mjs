import test from 'node:test';import assert from 'node:assert/strict';
import{draw}from'../src/drawings.mjs';import{context}from'../src/geometry.mjs';
import{pathKit as P,paintedRegion,offsetRegion,clearance}from'../src/occlusion.mjs';
const names=['phone-off','mail-x','file-lock','folder-lock'];
test('occluded ink stays outside the foreground clearance, including solid badge interiors',()=>{
 for(const size of[16,20,24])for(const corner of['sharp','soft','rounded'])for(const name of names){
  const g=context(size,corner),nodes=draw(name,g),back=paintedRegion(nodes.slice(0,1),g),front=paintedRegion(nodes.slice(1),g);
  let forbidden;
  try{
   if(name.endsWith('lock')){const solid=paintedRegion(nodes.slice(1,3).map(([t,a])=>[t,{...a,fill:'currentColor',...(t==='path'?{d:a.d+'Z'}:{})}]),g);try{front.op(solid,P.PathOp.UNION);}finally{solid.delete();}}
   // 0.01px accommodates serialization to four decimals; it is not a visual gap.
   forbidden=offsetRegion(front,clearance(g)-.01);
   back.op(forbidden,P.PathOp.INTERSECT);
   assert.equal(back.toSVGString(),'',`${name}/${size}/${corner}: ink inside clearance`);
  }finally{back.delete();front.delete();forbidden?.delete();}
 }
});
test('all four phone cuts follow parallel offset boundaries, instead of rounded path endpoints',()=>{
 for(const size of[16,20,24])for(const corner of['sharp','soft','rounded']){
  const g=context(size,corner),p=P.FromSVGString(draw('phone-off',g)[0][1].d),bounds=[size-Math.SQRT2*(g.stroke/2+clearance(g)),size+Math.SQRT2*(g.stroke/2+clearance(g))];
  let start,last,cuts=0;
  const lineTo=q=>{if(last&&bounds.some(v=>Math.abs(last[0]+last[1]-v)<.002&&Math.abs(q[0]+q[1]-v)<.002)&&Math.hypot(q[0]-last[0],q[1]-last[1])>g.stroke*.7)cuts++;last=q;};
  try{for(const cmd of p.toCmds()){if(cmd[0]===0){start=last=cmd.slice(-2);}else if(cmd[0]===1)lineTo(cmd.slice(-2));else if(cmd[0]===5)lineTo(start);else last=cmd.slice(-2);}assert.equal(cuts,4,`${size}/${corner}: four full-width planar cuts`);}finally{p.delete();}
 }
});
