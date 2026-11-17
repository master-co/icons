import {readFile} from 'node:fs/promises';
const json=async path=>JSON.parse(await readFile(path,'utf8'));
export async function comparisonReferences(){
  const config=await json('references/current.json');
  const manifests=await Promise.all(config.manifests.map(json));
  return {references:manifests.flatMap(x=>x.references)};
}
export async function beforeDefinitions(){
  const config=await json('references/current.json');
  return Object.assign({},...await Promise.all([config.before,...(config.additionalBefore||[])].map(json)));
}
