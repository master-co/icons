import {readFile} from 'node:fs/promises';
const json=async path=>JSON.parse(await readFile(path,'utf8'));
export async function comparisonReferences(){
  const config=await json('references/current.json');
  const manifests=await Promise.all(config.manifests.map(json));
  return {references:manifests.flatMap(x=>x.references)};
}
export async function beforeDefinitions(){
  return json((await json('references/current.json')).before);
}
