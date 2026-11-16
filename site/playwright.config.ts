import {defineConfig} from '@playwright/test'
export default defineConfig({
 testDir:'./tests',testMatch:'*.spec.ts',fullyParallel:true,workers:2,timeout:60000,
 use:{baseURL:'http://127.0.0.1:4321',viewport:{width:1440,height:1000}},
 projects:['chromium','firefox','webkit'].map(browserName=>({name:browserName,use:{browserName:browserName as 'chromium'|'firefox'|'webkit'}})),
 webServer:{command:'bun run --cwd site preview',cwd:'..',url:'http://127.0.0.1:4321',reuseExistingServer:!process.env.CI,timeout:60000}
})
