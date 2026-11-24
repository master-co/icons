import ja from './icons/ja.json' with {type:'json'}
import ko from './icons/ko.json' with {type:'json'}
import cn from './icons/cn.json' with {type:'json'}
import type {CatalogIcon} from '../components/catalog'

export const iconLabels:Record<string,Record<string,string>> = {ja,ko,cn}

// The catalog supplies Traditional Chinese names and the official spelling of brand names.
export function iconLabel(icon:CatalogIcon,locale:string,copy:Record<string,string>) {
 if(locale==='tw')return icon.label
 if(icon.category==='brands') {
  return locale!=='en' && icon.styleOf ? icon.label.replace(/ Outline$/, ' · '+copy.Outline) : icon.label
 }
 if(locale==='en')return icon.name.replaceAll('-',' ').replace(/^./,c=>c.toUpperCase())
 return iconLabels[locale]?.[icon.name] ?? icon.name
}
