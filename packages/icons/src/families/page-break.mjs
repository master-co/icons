import {fileParts} from './core.mjs';
import {line} from '../geometry.mjs';
import {paintedRegion,pathKit,regionPathData,enclosedDetails} from '../occlusion.mjs';

export function pageBreakParts(g){
 const {shell,fold}=fileParts(g),y=g.v(9.5,12,14.5),half=g.v(1.5,1.75,2)+g.stroke/2;
 // Slice the painted file mother, including its true corner profiles. This
 // is a page-wide break band, not a badge knockout or a second file outline.
 const ink=paintedRegion([shell],g),cut=pathKit.FromSVGString(`M-4 ${y-half}H${g.s+4}V${y+half}H-4Z`);
 let boundary;
 try{ink.op(cut,pathKit.PathOp.DIFFERENCE);boundary=['path',{d:regionPathData(ink),fill:'currentColor',stroke:'none','fill-rule':ink.getFillTypeString()}];}finally{ink.delete();cut.delete();}
 const details=enclosedDetails(shell,[fold],g).slice(1);
 const dashes=[[g.v(2,2.5,3),g.v(4,5,6)],[g.v(7,8.75,10.5),g.v(9,11.25,13.5)],[g.v(12,15,18),g.v(14,17.5,21)]].map(([a,b])=>line(a,y,b,y));
 return {boundary,details,dashes,y,half};
}
export const pageBreakDrawings={'page-break':g=>{const {boundary,details,dashes}=pageBreakParts(g);return [boundary,...details,...dashes];}};
