import {buildStrokes} from './lib/build-strokes.mjs';
import {runTurbo} from './lib/turbo.mjs';
if(!process.env.TURBO_HASH)process.exit(await runTurbo(['run','build:strokes',...process.argv.slice(2)]));
// Turbo owns cache decisions here. A task miss must regenerate its own outputs.
await buildStrokes({force:true});
