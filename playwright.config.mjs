import { defineConfig } from '@playwright/test';
import {firefoxLaunchOptions} from './scripts/lib/playwright-firefox.mjs';
export default defineConfig({
  testDir:'./tests/browser',fullyParallel:true,workers:3,timeout:60000,
  reporter:'list',use:{baseURL:'http://127.0.0.1:4173',viewport:{width:1440,height:1000}},
  projects:['chromium','firefox','webkit'].flatMap(browserName=>[1,2].map(deviceScaleFactor=>({name:`${browserName}-${deviceScaleFactor}x`,use:{browserName,deviceScaleFactor,...(browserName==='firefox'?{launchOptions:firefoxLaunchOptions()}:{})}}))),
  webServer:{command:'bun run dev:review',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI,timeout:60000},
});
