import {browser} from './browser.mjs';
import {devices} from './devices.mjs';
import {playback} from './playback.mjs';
import {accounts} from './accounts.mjs';
import {strokes} from './strokes.mjs';
import {shapes} from './shapes.mjs';
import {selection} from './selection.mjs';
import {imageAdjustments} from './image.mjs';
import {paste} from './paste.mjs';
import {sheet} from './sheet.mjs';
import {codeTools} from './code.mjs';
import {textTools} from './text.mjs';

export const workbenchDrawings={
  ...browser,...devices,...playback,...accounts,...strokes,...shapes,
  ...selection,...imageAdjustments,...paste,...sheet,...codeTools,...textTools,
};
