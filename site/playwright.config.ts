import {defineConfig} from '@playwright/test'
import {firefoxLaunchOptions} from '../scripts/lib/playwright-firefox.mjs'
const port=Number(process.env.MASTER_ICONS_TEST_PORT||4321)
const origin=`http://127.0.0.1:${port}`
export default defineConfig({
 testDir:'./tests',testMatch:'*.spec.ts',fullyParallel:true,workers:2,timeout:60000,
 use:{baseURL:origin,viewport:{width:1440,height:1000}},
 projects:['chromium','firefox','webkit'].map(browserName=>({name:browserName,use:{browserName:browserName as 'chromium'|'firefox'|'webkit',...(browserName==='firefox'?{launchOptions:firefoxLaunchOptions()}:{})}})),
 webServer:{command:`bun run --cwd site preview --port ${port}`,cwd:'..',url:origin,reuseExistingServer:!process.env.CI&&!process.env.MASTER_ICONS_TEST_PORT,gracefulShutdown:{signal:'SIGTERM',timeout:10000},timeout:60000}
})
