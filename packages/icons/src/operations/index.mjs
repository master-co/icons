import {planning} from './planning.mjs';
import {tasks} from './tasks.mjs';
import {dates} from './calendar.mjs';
import {inbox} from './inbox.mjs';
import {views} from './views.mjs';
import {access} from './access.mjs';
import {fields} from './forms.mjs';
import {files} from './files.mjs';
import {flow} from './flow.mjs';
import {controls} from './controls.mjs';

export const operationsDrawings={...planning,...tasks,...dates,...inbox,...views,...access,...fields,...files,...flow,...controls};
