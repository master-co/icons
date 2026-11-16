import test from 'node:test';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {draw} from '../src/drawings.mjs';
import {context} from '../src/geometry.mjs';
import {paintedRegion,offsetRegion,pathKit as P} from '../src/occlusion.mjs';
const masters=()=>[16,20,24].flatMap(s=>['sharp','soft','rounded'].map(c=>context(s,c)));
function contained(ink,boundary,label){
  const allowed=offsetRegion(boundary,.003),extra=ink.copy();
  try{extra.op(allowed,P.PathOp.DIFFERENCE);assert.equal(extra.toSVGString(),'',label);}
  finally{allowed.delete();extra.delete();}
}
test('symmetric objects retain symmetric painted contours at their closing seams',()=>{
  for(const g of masters())for(const name of ['heart','shield','book-open','magnet']){
    const ink=paintedRegion(draw(name,g),g),mirror=ink.copy();
    try{
      mirror.transform(-1,0,g.s,0,1,0,0,0,1);
      contained(ink,mirror,`${g.s}/${g.corner}: asymmetric closing tip`);
      contained(mirror,ink,`${g.s}/${g.corner}: asymmetric reflected tip`);
    }finally{ink.delete();mirror.delete();}
  }
});
test('structural details preserve their enclosing silhouette',()=>{
  for(const g of masters())for(const name of ['file','file-text','globe','image','images','mail-open','inbox','send','book-open']){
    // The rear image is intentionally outside the front frame; only its own
    // landscape and sun must be contained by the front frame.
    const nodes=draw(name,g).slice(name==='images'?1:0),[tag,attrs]=nodes[0];
    const shell=paintedRegion([[tag,{...attrs,fill:'currentColor'}]],g),ink=paintedRegion(nodes,g);
    try{contained(ink,shell,`${name}/${g.s}/${g.corner}: seam extends outside shell`);}
    finally{shell.delete();ink.delete();}
  }
});
test('radial chart partitions preserve both the outer ring and donut hole',()=>{
  for(const g of masters())for(const name of ['chart-pie','chart-donut','life-buoy']){
    const nodes=draw(name,g),[tag,attrs]=nodes[0];
    const shell=paintedRegion([[tag,{...attrs,fill:'currentColor'}]],g),ink=paintedRegion(nodes,g);
    try{
      contained(ink,shell,`${name}/${g.s}/${g.corner}: protruding partition cap`);
      if(name==='chart-donut'||name==='life-buoy'){
        const [innerTag,inner]=nodes[1];
        const hole=paintedRegion([[innerTag,{...inner,r:inner.r-g.stroke/2-.003,fill:'currentColor',stroke:'none'}]],g),overlap=ink.copy();
        try{overlap.op(hole,P.PathOp.INTERSECT);assert.equal(overlap.toSVGString(),'',`${g.s}/${g.corner}: partition intrudes into donut hole`);}
        finally{hole.delete();overlap.delete();}
      }
    }finally{shell.delete();ink.delete();}
  }
});
test('exterior attachments connect to the shell without entering its cavity',()=>{
  for(const g of masters())for(const name of ['video','mouse-pointer','workflow','paintbrush','award','lasso']){
    const [shell,...details]=draw(name,g).slice(name==='workflow'?1:0),[tag,attrs]=shell;
    const cavity=paintedRegion([[tag,{...attrs,fill:'currentColor',stroke:'none'}]],g);
    const border=paintedRegion([shell],g),tolerantBorder=offsetRegion(border,.003),attachment=paintedRegion(details,g),join=attachment.copy();
    try{
      cavity.op(tolerantBorder,P.PathOp.DIFFERENCE);
      cavity.op(attachment,P.PathOp.INTERSECT);
      assert.equal(cavity.toSVGString(),'',`${name}/${g.s}/${g.corner}: attachment intrudes into the cavity`);
      join.op(border,P.PathOp.INTERSECT);
      assert.notEqual(join.toSVGString(),'',`${name}/${g.s}/${g.corner}: attachment has detached from shell`);
    }finally{cavity.delete();border.delete();tolerantBorder.delete();attachment.delete();join.delete();}
  }
});
test('folded map and front coin keep internal seams inside their own shell',()=>{
  for(const g of masters())for(const name of ['map','coins']){
    const nodes=draw(name,g).slice(name==='coins'?1:0),[tag,attrs]=nodes[0];
    const boundary=paintedRegion([[tag,{...attrs,fill:'currentColor'}]],g),ink=paintedRegion(nodes,g);
    try{contained(ink,boundary,`${name}/${g.s}/${g.corner}: protruding internal seam`);}
    finally{boundary.delete();ink.delete();}
  }
});

test('compass needle leaves a visible gap from the ring in every corner preset',()=>{
 for(const g of masters()){
  const [ring,...needle]=draw('compass',g),border=paintedRegion([ring],g),ink=paintedRegion(needle,g);
  const near=offsetRegion(ink,.35);
  try{near.op(border,P.PathOp.INTERSECT);assert.equal(near.toSVGString(),'',`${g.s}/${g.corner}: needle nearly touches ring`);}
  finally{border.delete();ink.delete();near.delete();}
 }
});

test('adjacent list-collapse arrows remain distinct instead of forming a zigzag',()=>{
 for(const g of masters()){
  // The reviewed 16px sharp master has 0.393px clearance; the old
  // sharp rows intersected and the old soft rows had only 0.083px.
  const nodes=draw('list-collapse',g),arrows=nodes.filter((_,i)=>i%2===0);
  assert.equal(arrows.length,3);
  for(let i=1;i<arrows.length;i++){
   const a=paintedRegion([arrows[i-1]],g),b=paintedRegion([arrows[i]],g),near=offsetRegion(a,.35);
   try{near.op(b,P.PathOp.INTERSECT);assert.equal(near.toSVGString(),'',`${g.s}/${g.corner}: arrow rows visually join`);}
   finally{a.delete();b.delete();near.delete();}
  }
 }
});

// Negative controls use the real pre-refinement masters, not invented fixtures.
// These demonstrate that the geometric gates detect the defects they protect.
test('contour regressions reject the actual pre-Craft-05 defects',async()=>{
 const old=JSON.parse(await readFile('references/craft-05/master-before.json'));
 const g=context(24,'sharp'),get=name=>old[name].variants[24].sharp.nodes;
 for(const name of ['file','globe','image','chart-pie']){
  const nodes=get(name),[tag,a]=nodes[0],shell=paintedRegion([[tag,{...a,fill:'currentColor'}]],g),ink=paintedRegion(nodes,g);
  try{assert.throws(()=>contained(ink,shell,name),assert.AssertionError,`${name}: baseline must reproduce the protrusion`);}
  finally{shell.delete();ink.delete();}
 }
 for(const name of ['compass','list-collapse']){
  const nodes=get(name),a=paintedRegion([nodes[name==='compass'?1:0]],g),b=paintedRegion([nodes[name==='compass'?0:2]],g),near=offsetRegion(a,.35);
  try{near.op(b,P.PathOp.INTERSECT);assert.notEqual(near.toSVGString(),'',`${name}: baseline must reproduce insufficient clearance`);}
  finally{a.delete();b.delete();near.delete();}
 }
 const heart=paintedRegion(get('heart'),g),mirror=heart.copy();
 try{mirror.transform(-1,0,g.s,0,1,0,0,0,1);assert.throws(()=>contained(heart,mirror,'heart'),assert.AssertionError);}
 finally{heart.delete();mirror.delete();}
 for(const [name,shellIndex] of [['mouse-pointer',0],['video',0],['paintbrush',1],['lasso',1]]){
  const nodes=get(name),shell=nodes[shellIndex],[tag,a]=shell;
  const cavity=paintedRegion([[tag,{...a,fill:'currentColor',stroke:'none'}]],g),border=paintedRegion([shell],g),allowed=offsetRegion(border,.003),details=paintedRegion(nodes.filter((_,i)=>i!==shellIndex),g);
  try{cavity.op(allowed,P.PathOp.DIFFERENCE);cavity.op(details,P.PathOp.INTERSECT);assert.notEqual(cavity.toSVGString(),'',`${name}: baseline must reproduce the inner protrusion`);}
  finally{cavity.delete();border.delete();allowed.delete();details.delete();}
 }
});
