import test from 'node:test';
import assert from 'node:assert/strict';
import {catalog} from '../src/catalog.mjs';
import {draw} from '../src/drawings.mjs';
import {context} from '../src/geometry.mjs';
import {simplifyNodes,simplifyPathData,tolerance} from '../src/simplify.mjs';

// Dense polylines of every subpath, from an evaluator independent of the fitting code.
function flatten(d){ // → array of subpath polylines, dense
  const subs=[];let cur=null,p=[0,0],start=[0,0];
  for(const m of d.matchAll(/([MLHVQCAZ])([^MLHVQCAZ]*)/g)){
    const v=(m[2].match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi)||[]).map(Number),c=m[1];
    const add=q=>{cur.push(q);p=q;};
    if(c==='M'){cur=[[v[0],v[1]]];subs.push(cur);p=start=[v[0],v[1]];for(let i=2;i<v.length;i+=2)add([v[i],v[i+1]]);}
    else if(c==='Z'){add(start);}
    else if(c==='H')for(const x of v){const q=[x,p[1]];for(let t=1;t<=8;t++)cur.push([p[0]+(q[0]-p[0])*t/8,p[1]]);p=q;}
    else if(c==='V')for(const y of v){const q=[p[0],y];for(let t=1;t<=8;t++)cur.push([p[0],p[1]+(q[1]-p[1])*t/8]);p=q;}
    else if(c==='L')for(let i=0;i<v.length;i+=2){const q=[v[i],v[i+1]],n=Math.max(1,Math.ceil(Math.hypot(q[0]-p[0],q[1]-p[1])/.02));for(let t=1;t<=n;t++)cur.push([p[0]+(q[0]-p[0])*t/n,p[1]+(q[1]-p[1])*t/n]);p=q;}
    else if(c==='Q')for(let i=0;i<v.length;i+=4){const a=[v[i],v[i+1]],q=[v[i+2],v[i+3]],n=Math.max(2,Math.ceil((Math.hypot(a[0]-p[0],a[1]-p[1])+Math.hypot(q[0]-a[0],q[1]-a[1]))/.02));for(let k=1;k<=n;k++){const t=k/n,u=1-t;cur.push([u*u*p[0]+2*u*t*a[0]+t*t*q[0],u*u*p[1]+2*u*t*a[1]+t*t*q[1]]);}p=q;}
    else if(c==='C')for(let i=0;i<v.length;i+=6){const a=[v[i],v[i+1]],b=[v[i+2],v[i+3]],q=[v[i+4],v[i+5]],n=Math.max(3,Math.ceil((Math.hypot(a[0]-p[0],a[1]-p[1])+Math.hypot(b[0]-a[0],b[1]-a[1])+Math.hypot(q[0]-b[0],q[1]-b[1]))/.02));for(let k=1;k<=n;k++){const t=k/n,u=1-t;cur.push([u*u*u*p[0]+3*u*u*t*a[0]+3*u*t*t*b[0]+t*t*t*q[0],u*u*u*p[1]+3*u*u*t*a[1]+3*u*t*t*b[1]+t*t*t*q[1]]);}p=q;}
    else if(c==='A')for(let i=0;i<v.length;i+=7){let r=v[i];const large=v[i+3],sweep=v[i+4],q=[v[i+5],v[i+6]];
      const dx=(p[0]-q[0])/2,dy=(p[1]-q[1])/2,h2=dx*dx+dy*dy;if(r*r<h2)r=Math.sqrt(h2);
      const k=(large!==sweep?1:-1)*Math.sqrt(Math.max(0,(r*r-h2)/h2));const cx=(p[0]+q[0])/2+k*dy,cy=(p[1]+q[1])/2-k*dx;
      let a0=Math.atan2(p[1]-cy,p[0]-cx),a1=Math.atan2(q[1]-cy,q[0]-cx),da=a1-a0;if(sweep&&da<0)da+=2*Math.PI;if(!sweep&&da>0)da-=2*Math.PI;
      const n=Math.max(2,Math.ceil(Math.abs(da)*r/.02));for(let t=1;t<=n;t++)cur.push([cx+r*Math.cos(a0+da*t/n),cy+r*Math.sin(a0+da*t/n)]);p=q;}
  }
  return subs;
}
const segDist=(pt,poly)=>{let best=Infinity;for(let i=1;i<poly.length;i++){const a=poly[i-1],b=poly[i],dx=b[0]-a[0],dy=b[1]-a[1],l=dx*dx+dy*dy;let t=l?((pt[0]-a[0])*dx+(pt[1]-a[1])*dy)/l:0;t=Math.max(0,Math.min(1,t));const d=Math.hypot(pt[0]-a[0]-t*dx,pt[1]-a[1]-t*dy);if(d<best)best=d;}return best;};
const hausdorff=(A,B)=>{let m=0;for(const pt of A){const d=segDist(pt,B);if(d>m)m=d;}return m;};
const changed=(raw,simplified,visit)=>raw.forEach((node,i)=>{
  if(node[2])changed(node[2],simplified[i][2],visit);
  else if(node[1].d&&node[1].d!==simplified[i][1].d)visit(node[1].d,simplified[i][1].d);
});
const published=catalog.filter(entry=>!(entry.category==='brands'&&!entry.styleOf));

// Every third icon keeps the brute-force distance check to a few seconds; each optical size is covered in turn.
test('refitted Boolean outlines stay within the tolerance of the raw export',()=>{
  let compared=0;
  for(const [index,entry] of published.entries()){
    if(index%3)continue;
    const size=[16,20,24][(index/3)%3];
    const g=context(size,'soft'),raw=draw(entry.name,g),simplified=simplifyNodes(raw);
    changed(raw,simplified,(before,after)=>{
      const a=flatten(before),b=flatten(after);
      assert.equal(a.length,b.length,`${entry.name}/${size}: subpaths`);
      // Both directions: the fit may neither cut a corner nor add a bulge. Printed coordinates add half a unit in the last place.
      for(let i=0;i<a.length;i++)assert.ok(Math.max(hausdorff(a[i],b[i]),hausdorff(b[i],a[i]))<=tolerance*1.5,`${entry.name}/${size}: deviation`);
      assert.ok(after.length<before.length,`${entry.name}/${size}: no smaller`);
      compared++;
    });
  }
  assert.ok(compared>100,'Boolean outlines are refitted across the collection');
});

test('round caps become arcs, straight edges become lines, and authored geometry is left alone',()=>{
  const size=nodes=>JSON.stringify(nodes).length;
  for(const name of ['arrow-right','arrow-up','download','upload','refresh','arrow-left-right']){
    const raw=draw(name,context(16,'soft')),simplified=simplifyNodes(raw);
    assert.ok(size(simplified)<size(raw)/3,`${name}: ${size(raw)} → ${size(simplified)}`);
    assert.ok(size(simplified)<1280,`${name}: ${size(simplified)}`);
  }
  const shaft=simplifyNodes(draw('arrow-right',context(16,'soft')))[0][1].d;
  assert.match(shaft,/A0\.5 0\.5 0 0 0/,'the shaft cap is one circular arc');
  assert.doesNotMatch(shaft,/Q/);
  // A chord and its neighbour always share a circle; only sampled chords tell a corner from an arc.
  assert.doesNotMatch(simplifyPathData('M0 0L10 0L10.2 .2L10.2 5Z'),/A/);
  assert.equal(simplifyPathData('M0 0L4 0L10 0L10 5Z'),'M0 0H10V5Z');
  assert.equal(simplifyPathData('M2 8H14'),'M2 8H14','other commands are not reinterpreted');
  const stroke=[['path',{d:'M2 2L5 2L8 2'}]];
  assert.deepEqual(simplifyNodes(stroke),stroke,'a short authored stroke keeps its vertices');
});
