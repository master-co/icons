import {batch as transport} from './01-transport.mjs';
import {batch as travel} from './02-travel.mjs';
import {batch as weather} from './03-weather.mjs';
import {batch as nature} from './04-nature.mjs';
import {batch as animals} from './05-animals.mjs';
import {batch as produce} from './06-produce.mjs';
import {batch as drinks} from './07-drinks.mjs';
import {batch as food} from './08-food.mjs';
import {batch as home} from './09-home.mjs';
import {batch as appliances} from './10-appliances.mjs';
import {batch as clothing} from './11-clothing.mjs';

import {batch as medical} from './12-medical.mjs';

import {batch as body} from './13-body.mjs';

import {batch as sports} from './14-sports.mjs';
import {batch as outdoor} from './15-outdoor.mjs';
import {batch as science} from './16-science.mjs';
import {batch as math} from './17-math.mjs';
import {batch as education} from './18-education.mjs';
import {batch as music} from './19-music.mjs';
import {batch as mediaEquipment} from './20-media.mjs';
import {batch as tools} from './21-tools.mjs';

import {batch as industry} from './22-industry.mjs';

import {batch as energy} from './23-energy.mjs';

import {batch as safety} from './24-safety.mjs';
import {batch as commerceTools} from './25-commerce.mjs';

// Only individually reviewed batches enter the public catalog.
export const atlasEntries=[...transport,...travel,...weather,...nature,...animals,...produce,...drinks,...food,...home,...appliances,...clothing,...medical,...body,...sports,...outdoor,...science,...math,...education,...music,...mediaEquipment,...tools,...industry,...energy,...safety,...commerceTools];
export const atlas=Object.fromEntries(atlasEntries.map(entry=>[entry.name,entry.draw]));
