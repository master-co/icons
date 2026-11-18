import type {Plugin} from 'vite'
import {showcase} from '../components/home/showcase'

/*
 * The homepage bench's icon drawings, as a module of the client bundle: `import data from 'virtual:home-showcase'`.
 * Built once from the icon package at build time, it is cached with the script instead of being repeated in the page
 * as island props.
 */
const id='virtual:home-showcase'
export function homeShowcase():Plugin {
 return {
  name:'master-icons:home-showcase',
  resolveId(source){return source===id?`\0${id}`:undefined},
  load(resolved){return resolved===`\0${id}`?`export default ${JSON.stringify(showcase())}`:undefined}
 }
}
