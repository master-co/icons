import {mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';

// macOS protects the real Firefox app-data directory independently of -profile.
// Give test launches their own app data; never access the user's browser state.
// https://github.com/microsoft/playwright/issues/42768
export function firefoxLaunchOptions(){
 if(process.platform!=='darwin')return {};
 const path=fileURLToPath(new URL(`../../work/firefox-test-data/${process.pid}/`,import.meta.url));
 mkdirSync(path,{recursive:true});
 return {env:{...process.env,CFFIXED_USER_HOME:path}};
}
