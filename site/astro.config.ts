import { defineConfig } from 'astro/config'
import masterSite from '@master/internal-site/astro'
import site from './site.config'
import iconsPackage from '@master/icons/package.json' with {type:'json'}
Object.assign(process.env, { PUBLIC_PROJECT: 'Master Icons', PUBLIC_URL: site.origin, PUBLIC_IMAGE_TRANSFORMATIONS: 'false', PUBLIC_VERSION: iconsPackage.version })
export default defineConfig({
 outDir: './out',
 server: {host: '127.0.0.1', port: 4321},
 devToolbar: {enabled:false},
 integrations: [masterSite(site)],
 vite: {
  cacheDir: process.env.MASTER_ICONS_VITE_CACHE_DIR,
  // Cold server dependency optimization can invalidate Astro's registered
  // development environment mid-request. Keep Svelte's server imports as ESM;
  // client prebundling remains enabled for browser hydration.
  environments: {
   astro: {optimizeDeps: {noDiscovery:true, exclude:['svelte']}},
   ssr: {optimizeDeps: {noDiscovery:true, exclude:['svelte']}}
  }
 }
})
