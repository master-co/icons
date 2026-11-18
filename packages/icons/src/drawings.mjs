import {workflowDirectionDrawings} from './families/workflow-directions.mjs';
import {signatureDrawings} from './families/signature.mjs';
import {transposeDrawings} from './families/table-transpose.mjs';
import {sectorDrawings} from './families/sector.mjs';
import {toneToolDrawings} from './families/tone-tools.mjs';
import {spiralDrawings} from './families/spiral.mjs';
import {dropCapDrawings} from './families/drop-cap.mjs';
import {decimalDrawings} from './families/decimal-places.mjs';
import {selectionInvertDrawings} from './families/selection-invert.mjs';
import {footnoteDrawings} from './families/footnote.mjs';
import {imageFlowDrawings} from './families/image-flow.mjs';
import {rotationNotificationDrawings} from './families/rotation-notification.mjs';
import {deviceConnectivityDrawings} from './families/device-connectivity.mjs';
import {tabStopDrawings} from './families/tab-stops.mjs';
import {cellularSignal} from './families/cellular-signal.mjs';
import {pageBreakDrawings} from './families/page-break.mjs';
import {incognitoDrawings} from './families/incognito.mjs';
import {layerMask} from './families/layer-mask.mjs';
import { n } from './geometry.mjs';
import { expansion } from './expansion/index.mjs';
import { coreDrawings } from './families/core.mjs';
import { additions } from './families/index.mjs';
import {brandDrawings} from './brands.mjs';
import {atlas} from './atlas/index.mjs';
import {circleStates} from './families/circle-states.mjs';
import {directionalControls} from './families/directional-controls.mjs';
import {projectSymbols} from './families/project-symbols.mjs';
import {headingLevels} from './families/heading-levels.mjs';
import {paragraphTools} from './families/paragraph-tools.mjs';
import {taskPriorities} from './families/task-priorities.mjs';
import {objectAlignment} from './families/object-alignment.mjs';
import {identityMediaActions} from './families/identity-media-actions.mjs';
import {booleanOperations} from './families/boolean-operations.mjs';
import {letterCase} from './families/letter-case.mjs';
import {textSearch} from './families/text-search.mjs';
import {replacementDrawings} from './families/replacement.mjs';
import {textSpacing} from './families/text-spacing.mjs';
import {writingDirections} from './families/writing-direction.mjs';
import {multiColumn} from './families/multi-column.mjs';
import {tableControls} from './families/table-controls.mjs';
import {cellAlignment} from './families/cell-alignment.mjs';
import {canvasTransform} from './families/canvas-transform.mjs';
import {vectorEditing} from './families/vector-editing.mjs';
import {strokeStyles} from './families/stroke-style.mjs';
import {numericTools} from './families/numeric-tools.mjs';
import {strokeProperties} from './families/stroke-properties.mjs';
import {strokePatterns} from './families/stroke-patterns.mjs';
import {cellBorderDrawings} from './families/cell-borders.mjs';
import {textColor} from './families/text-color.mjs';
import {voting} from './families/voting.mjs';
import {milestoneState} from './families/milestone-state.mjs';
import {crossDevice} from './families/cross-device.mjs';
import {clickGesture} from './families/click-gesture.mjs';
import {lineTools} from './families/line-tools.mjs';
import {polygonTools} from './families/polygon-tools.mjs';
export const drawings={...workflowDirectionDrawings,...signatureDrawings,...transposeDrawings,...toneToolDrawings,...sectorDrawings,...spiralDrawings,...dropCapDrawings,...decimalDrawings,...selectionInvertDrawings,
  ...footnoteDrawings,...imageFlowDrawings,
  ...rotationNotificationDrawings,...deviceConnectivityDrawings,...tabStopDrawings,...pageBreakDrawings,...incognitoDrawings,...layerMask,...cellularSignal,...replacementDrawings,...textSearch,...polygonTools,...lineTools,...clickGesture,...crossDevice,...milestoneState,...cellBorderDrawings,...textColor,...strokePatterns,...strokeProperties,...strokeStyles,...numericTools,...voting,...vectorEditing,...canvasTransform,...tableControls,...cellAlignment,...writingDirections,...multiColumn,...textSpacing,...letterCase,...booleanOperations,...identityMediaActions,...objectAlignment,...taskPriorities,...paragraphTools,...headingLevels,...projectSymbols,...directionalControls,...circleStates,...coreDrawings,...additions,...expansion,...atlas,...brandDrawings};

export function draw(name,g){
  if(!drawings[name])throw new Error(`Missing drawing: ${name}`);
  // Preserve compact source path grammar (e.g. adjacent .5.6 coordinates).
  // Replacing numeric tokens in-place can merge them and invalidate the path.
  if(name.startsWith('brand-'))return drawings[name](g);
  const normalize=nodes=>nodes.map(([tag,attrs,children])=>[tag,Object.fromEntries(Object.entries(attrs).map(([key,value])=>[key,
    typeof value==='number'?n(value):key==='d'?value.replace(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi,x=>String(n(Number(x)))):value
  ])),...(children?[normalize(children)]:[])]);
  return normalize(drawings[name](g));
}
