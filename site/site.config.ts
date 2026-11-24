import { defineSite } from '@master/internal-site/config'
import { locales, hreflangOfLocale, nameOfLocale } from '@master/internal-site/common/locales.js'
import translations from './i18n/translations'
const section = (name: string) => new URL(import.meta.resolve(`@master/internal-site/sections/${name}.astro`))
export default defineSite({
 id:'icons', name:'Master Icons', origin:process.env.PUBLIC_URL || 'http://localhost:4321',
 content:new URL('./content/',import.meta.url), app:new URL('./app-config.ts',import.meta.url),
 i18n:{defaultLocale:'en',locales,hreflangOfLocale,nameOfLocale,localizablePathnameRoots:['icons','guide'],translations,
 validation:{reviews:new URL('./i18n/reviews.json',import.meta.url),resources:new URL('./i18n/resources.ts',import.meta.url)}},
 sections:{home:section('home'),page:section('page'),icons:section('page'),guide:section('guide')},
 navigation:{guide:new URL('./.categories/guide.json',import.meta.url)},
 documents:{guide:{layout:new URL('./layouts/Doc.astro',import.meta.url),dictionaries:new URL('./dictionaries.ts',import.meta.url),categories:new URL('./.categories/guide.json',import.meta.url)}},
 styles:{site:new URL('./styles/site.ts',import.meta.url)}
})
