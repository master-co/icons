import defaultTheme from '@master/ui/theme.css?raw'
import {styles,styleClass} from './styles'

/** The custom properties declared directly in the default theme's @theme blocks. */
function themeTokens(source:string):[string,string][] {
 const css=source.replace(/\/\*[\s\S]*?\*\//g,'')
 const found:[string,string][]=[]
 for(const match of css.matchAll(/@theme\s*\{([^}]*)\}/g)){
  for(const declaration of match[1].split(';')){
   const text=declaration.trim()
   if(!text.startsWith('--'))continue
   const colon=text.indexOf(':')
   found.push([text.slice(0,colon).trim(),text.slice(colon+1).replace(/\s+/g,' ').trim()])
  }
 }
 return found
}

/*
 * A custom property that reads another is resolved where it is declared, at the root. Scoped to one element, the
 * default theme's derived tokens (a shadow that reads a line, a line that reads another) are declared again there so
 * they read the style's values; so is the preset's font family, which reads --font-sans.
 */
const derived:[string,string][]=[
 ...themeTokens(defaultTheme).filter(([,value])=>value.includes('var(')),
 ['--font-family-sans',"var(--font-sans, ui-sans-serif), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif"],
]

/** Every style's tokens, scoped to its class; a style with a fixed scheme keeps it whatever the page's. */
export function scopedStyles() {
 return styles.map(style=>{
  const tokens=[...derived,...style.tokens,...(style.scheme?[['color-scheme',style.scheme] as [string,string]]:[])]
  return `.${styleClass(style.id)}{${tokens.map(([name,value])=>`${name}:${value}`).join(';')}}`
 }).join('\n')
}
