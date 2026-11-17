import {defineConfig} from '@playwright/test';
import {firefoxLaunchOptions} from '../scripts/lib/playwright-firefox.mjs';
export default defineConfig({
 testDir:'../tests/browser',workers:2,timeout:60000,
 use:{baseURL:'http://127.0.0.1:4175',viewport:{width:1280,height:960}},
 projects:['chromium','firefox','webkit'].map(browserName=>({name:browserName+'-1x',use:{browserName,...(browserName==='firefox'?{launchOptions:firefoxLaunchOptions()}: {})}})),
 webServer:{command:'node scripts/dev.mjs --serve-only',cwd:'..',env:{PORT:'4175'},url:'http://127.0.0.1:4175',reuseExistingServer:false,gracefulShutdown:{signal:'SIGTERM',timeout:10000},timeout:60000}
});
