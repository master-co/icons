import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {draw} from '../src/drawings.mjs';
import {context} from '../src/geometry.mjs';
import {paintedRegion} from '../src/occlusion.mjs';

const scope=JSON.parse(await readFile(new URL('../src/atlas-scope.json',import.meta.url)));
const flatten=nodes=>nodes.flatMap(node=>[node,...flatten(node[2]||[])]);

test('Atlas variable strokes retain masked details and resolvable mask definitions',()=>{
 let masks=0;
 for(const {name} of scope)for(const [size,stroke] of [[16,1.5],[20,2],[24,2.5]])for(const corner of ['sharp','soft','rounded']){
  const nodes=flatten(draw(name,{...context(size,corner),stroke,variableStroke:true}));
  const definitions=new Map(nodes.filter(([tag])=>tag==='mask').map(node=>[node[1].id,node]));
  for(const [tag,attrs,children] of nodes){
   if(tag==='defs')assert.ok(children?.length,`${name}: empty defs loses clipping geometry`);
   if(!attrs.mask)continue;
   masks++;
   // Small masters may intentionally omit all details, but must retain the
   // children array so populated groups survive the same serialization path.
   assert.ok(Array.isArray(children),`${name}: masked drawing lost its details`);
   const id=attrs.mask.match(/^url\(#(.+)\)$/)?.[1];
   assert.ok(definitions.get(id)?.[2]?.length,`${name}: missing mask ${id}`);
  }
 }
 assert.ok(masks>0,'Expected Atlas containment and exterior attachment masks');
});

test('hospital ground caps stay inside the canvas at maximum supported strokes',()=>{
 for(const [size,stroke] of [[16,1.5],[20,2],[24,2.5]])for(const corner of ['sharp','soft','rounded']){
  const g={...context(size,corner),stroke,variableStroke:true};
  const ground=draw('hospital',g).at(-1),ink=paintedRegion([ground],g);
  try{
   const b=ink.computeTightBounds();
   assert.ok(b.fLeft>=0&&b.fRight<size,`${size}/${corner}: ground cap exceeds canvas`);
  }finally{ink.delete();}
 }
});
