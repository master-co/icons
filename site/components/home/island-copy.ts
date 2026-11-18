import {styles} from './styles'

/**
 * The words an island says: every `t('…')` key in its source, plus the style and corner names it translates by
 * variable. Islands receive only these, not the whole dictionary.
 */
export function islandCopy(source:string,t:(key:string)=>string) {
 const keys=new Set([...source.matchAll(/\bt\('((?:[^'\\]|\\.)*)'\)/g)].map(match=>match[1]))
 for(const style of styles){keys.add(style.name);keys.add(style.summary)}
 for(const corner of ['Sharp','Soft','Rounded'])keys.add(corner)
 return Object.fromEntries([...keys].map(key=>[key,t(key)]))
}
