import {watch,statSync,readdirSync} from 'node:fs';
import {dirname,basename,join,relative,sep} from 'node:path';

function signature(file){
 try{const {mtimeMs,size,ino}=statSync(file);return `${mtimeMs}:${size}:${ino}`;}
 catch(error){if(error.code==='ENOENT')return 'missing';throw error;}
}
// Watch parents to survive atomic saves and ignore access-only macOS events.
// Turbo writes task logs inside each workspace; these are never source edits.
export function watchSource(file,changed,recursive=false){
 const signatures=new Map(),folder=recursive?file:dirname(file);
 const ignored=path=>relative(folder,path).split(sep).some(part=>part==='.turbo'||part==='node_modules');
 const remember=path=>{if(!ignored(path))signatures.set(path,signature(path));};
 if(recursive)for(const entry of readdirSync(file,{recursive:true,withFileTypes:true}))remember(join(entry.parentPath,entry.name));
 else remember(file);
 return watch(folder,{recursive},(_event,name)=>{
  if(!name){changed();return;}
  if(!recursive&&name!==basename(file))return;
  const target=join(folder,name);
  if(ignored(target))return;
  const next=signature(target);
  // macOS can report the watched folder's own basename. That resolves to a
  // nonexistent child, not a source edit. Still report deletion of known files.
  if(next==='missing'&&!signatures.has(target))return;
  if(signatures.get(target)===next)return;
  signatures.set(target,next);changed();
 });
}
