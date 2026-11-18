import { defineConfig } from 'astro/config'
import {fileURLToPath} from 'node:url'
import masterSite from '@master/internal-site/astro'
import site from './site.config'
import iconsPackage from '@master/icons/package.json' with {type:'json'}
import {generatedAssets} from './scripts/generated-assets'
import {homeShowcase} from './scripts/home-showcase'
Object.assign(process.env, { PUBLIC_PROJECT: 'Master Icons', PUBLIC_URL: site.origin, PUBLIC_IMAGE_TRANSFORMATIONS: 'false', PUBLIC_VERSION: process.env.PUBLIC_VERSION || iconsPackage.version })
export default defineConfig({
 outDir: './out',
 server: {host: '127.0.0.1', port: 4321},
 devToolbar: {enabled:false},
 integrations: [masterSite(site)],
 vite: {
  plugins: [generatedAssets(),homeShowcase()],
  // These generated trees contain tens of thousands of files. The dev runner
  // reloads once after preparation, rather than sending every file through HMR.
  server: {watch: {ignored: [fileURLToPath(new URL('./public/**', import.meta.url)), '**/.turbo/**']}},
  // Keep SVG components in Vite so import.meta.env is transformed in dev.
  resolve:{alias:{'astro/assets/runtime':fileURLToPath(import.meta.resolve('astro/assets/runtime'))}},
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
