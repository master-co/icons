import {defineConfig} from '@playwright/test'
export default defineConfig({
 testDir:'./tests',testMatch:'dev.smoke.ts',workers:1,timeout:60000,
 use:{baseURL:'http://127.0.0.1:4326'},
 webServer:{
  command:'node site/scripts/test-dev-server.mjs',cwd:'..',
  gracefulShutdown:{signal:'SIGTERM',timeout:10000},
  url:'http://127.0.0.1:4326',reuseExistingServer:false,
  // The server starts after Turbo prepares the site; on a cold CI cache that alone can take over a minute.
  timeout:300000
 }
})
