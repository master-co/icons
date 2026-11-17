import {runTurbo} from './lib/turbo.mjs';
process.exitCode=await runTurbo(process.argv.slice(2));
