import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {cp, mkdir, mkdtemp, readFile, rm, symlink, writeFile} from 'node:fs/promises';
import {dirname, join, relative, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

// Exercise the real task graph and generators in a disposable checkout. Never
// edit the user's sources or remove outputs used by a running dev server.
const root=fileURLToPath(new URL('../',import.meta.url));
await mkdir(join(root,'work'),{recursive:true});
const fixture=await mkdtemp(join(root,'work/turbo-test-'));
const env={...process.env,MASTER_ICONS_NODE_VERSION:process.versions.node,TURBO_TELEMETRY_DISABLED:'1'};
delete env.TURBO_HASH;
const ignored=new Set(['node_modules','.turbo','dist','icons','out','public','.astro','.categories','.agents']);
const read=path=>readFile(join(fixture,path),'utf8');
async function edit(path,body){await mkdir(dirname(join(fixture,path)),{recursive:true});await writeFile(join(fixture,path),body);}
function turbo(args,extraEnv={}){
 return execFileSync(process.execPath,['scripts/turbo.mjs','run',...args],{cwd:fixture,env:{...env,...extraEnv},encoding:'utf8',maxBuffer:32*1024*1024,stdio:['ignore','pipe','pipe']});
}
function graph(args=['build'],extraEnv={}){
 const result=JSON.parse(turbo([...args,'--dry=json'],extraEnv));
 return Object.fromEntries(result.tasks.map(task=>[task.taskId,task]));
}
const hash=(tasks,id)=>tasks[id].hash;
try{
 for(const name of ['package.json','bun.lock','turbo.json','.nvmrc','.gitignore','LICENSE','THIRD_PARTY_NOTICES.md','licenses','patches','scripts','skills','preview','site','tests']){
  const source=join(root,name);
  await cp(source,join(fixture,name),{recursive:true,filter:path=>!ignored.has(relative(source,path).split(sep)[0])});
 }
 for(const name of ['icons','icons-react','icons-vue','icons-svelte','icons-preact','icons-astro']){
  const source=join(root,'packages',name);
  await cp(source,join(fixture,'packages',name),{recursive:true,filter:path=>!ignored.has(relative(source,path).split(sep)[0])});
 }
 await mkdir(join(fixture,'references'),{recursive:true});
 await cp(join(root,'references/manifest.json'),join(fixture,'references/manifest.json'));
 await symlink(join(root,'node_modules'),join(fixture,'node_modules'),'dir');
 execFileSync('git',['init','--quiet'],{cwd:fixture});
 await edit('packages/icons/icons/24/soft/turbo-output.svg','tracked generated output');
 execFileSync('git',['add','package.json','bun.lock','turbo.json','.gitignore','packages/icons/icons'],{cwd:fixture});
 execFileSync('git',['-c','user.name=Turbo test','-c','user.email=test@example.invalid','-c','commit.gpgsign=false','commit','--quiet','-m','Fixture'],{cwd:fixture});

 const baseline=graph();
 const generated='@master/icons#generate',core='@master/icons#build',svelte='@master/icons-svelte#build',vue='@master/icons-vue#build',site='@master/icons-site#build';
 for(const framework of ['react','vue','svelte','preact','astro'])assert.ok(baseline[`@master/icons-${framework}#build`].dependencies.includes(core));
 assert.ok(baseline['@master/icons-site#prepare-site'].dependencies.includes('//#build:strokes'));
 assert.ok(baseline['@master/icons-review#build'].dependencies.includes('//#build:strokes'));
 const dev=graph(['dev','--filter=@master/icons-site']);
 assert.deepEqual(Object.keys(dev).sort(),['//#build:strokes',generated,core,svelte,'@master/icons-astro#build','@master/icons-site#prepare-site','@master/icons-site#dev'].sort());
 assert.equal(dev['@master/icons-site#dev'].resolvedTaskDefinition.cache,false);
 assert.equal(dev['@master/icons-site#dev'].resolvedTaskDefinition.persistent,true);
 const checks=graph(['test','test:types','--filter=@master/icons-tests']);
 for(const id of ['@master/icons-tests#test','@master/icons-tests#test:types'])assert.equal(checks[id].dependencies.length,6);
 console.log('✓ Task ordering, shared strokes, dev scope and test dependencies');

 await edit('packages/icons/icons/24/soft/turbo-output.svg','generated output');
 await edit('packages/icons/dist/turbo-output.js','generated output');
 const outputsGraph=graph();
 if(hash(outputsGraph,core)!==hash(baseline,core))console.log('Changed inputs:',Object.keys({...baseline[core].inputs,...outputsGraph[core].inputs}).filter(key=>baseline[core].inputs[key]!==outputsGraph[core].inputs[key]));
 assert.equal(hash(outputsGraph,core),hash(baseline,core),'Generated artifacts must not invalidate their own task');
 await rm(join(fixture,'packages/icons/icons'),{recursive:true});
 await rm(join(fixture,'packages/icons/dist'),{recursive:true});
 await edit('packages/icons-svelte/src/turbo-input.js','// source change');
 const adapterChange=graph();
 assert.notEqual(hash(adapterChange,svelte),hash(baseline,svelte));
 assert.notEqual(hash(adapterChange,site),hash(baseline,site));
 assert.equal(hash(adapterChange,vue),hash(baseline,vue));
 assert.equal(hash(adapterChange,core),hash(baseline,core));
 await rm(join(fixture,'packages/icons-svelte/src/turbo-input.js'));
 const publicUrl=graph(['build'],{PUBLIC_URL:'https://turbo-test.invalid'});
 assert.notEqual(hash(publicUrl,site),hash(baseline,site));
 assert.equal(hash(publicUrl,core),hash(baseline,core));
 const nodeVersion=graph(['build'],{MASTER_ICONS_NODE_VERSION:'test-version'});
 // The launcher intentionally derives Node's actual version, never trusts a
 // caller-supplied value, and forwards it to every task's global cache key.
 assert.equal(hash(nodeVersion,core),hash(baseline,core));
 console.log('✓ Source-selective invalidation, output exclusion and PUBLIC_URL hashing');

 turbo(['build','--filter=@master/icons']);
 assert.equal(graph(['build','--filter=@master/icons'])[generated].cache.status,'HIT');
 await edit('work/cache/icons.json',JSON.stringify({key:'stale standalone marker'}));
 const warm=turbo(['build','--filter=@master/icons']);
 assert.match(warm,/1 cached, 2 total/);
 await assert.rejects(read('work/cache/icons.json'),{code:'ENOENT'});
 const output='packages/icons/dist/data/24/soft/search.js';
 const expected=await read(output);
 await rm(join(fixture,output));
 const restored=turbo(['build','--filter=@master/icons']);
 assert.match(restored,/1 cached, 2 total/);
 assert.equal(await read(output),expected);
 const svg='packages/icons/icons/24/soft/search.svg',svgBody=await read(svg);
 await rm(join(fixture,svg));
 turbo(['build','--filter=@master/icons']);
 assert.equal(await read(svg),svgBody,'Tracked SVGs must be restored from cached archives');
 const source='packages/icons/src/catalog.mjs',original=await read(source);
 await edit(source,original+'\n// Turbo invalidation test\n');
 const coreChange=graph();
 for(const id of [core,svelte,vue,site])assert.notEqual(hash(coreChange,id),hash(baseline,id));
 assert.equal(coreChange[generated].cache.status,'MISS');
 turbo(['build','--filter=@master/icons']);
 await edit(source,original);
 assert.equal(graph(['build','--filter=@master/icons'])[generated].cache.status,'HIT');
 turbo(['build','--filter=./packages/*']);
 const allWarm=turbo(['build','--filter=./packages/*']);
 assert.match(allWarm,/6 cached, 7 total/);
 console.log('✓ Real cold build, warm cache, missing-output restoration and core invalidation');
 console.log('Warm package build: '+allWarm.match(/Time:\s+([^\n]+)/)?.[1].trim()+' (6 cached generators + SVG synchronization)');
}finally{await rm(fixture,{recursive:true,force:true});}
