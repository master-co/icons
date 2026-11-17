import {enclosedDetails} from '../occlusion.mjs';
import {layout} from '../families/layout.mjs';
import {files} from '../families/files.mjs';
export function layoutList({g,r,l}){
 const radius=Math.min(g.r,g.v(.8,1,1.25));
 return [r(3,3,7,7,radius),r(3,14,7,7,radius),l(14,4,21,4),l(14,9,19,9),l(14,15,21,15),l(14,20,19,20)];
}
export function layoutTemplate({g,r}){const k=Math.min(g.r,g.v(.8,1,1.25));return [r(3,3,18,7,k),r(3,14,9,7,k),r(16,14,5,7,k)]}
export function layoutPanelLeft({g,r}){const k=Math.min(g.r,g.v(.8,1,1.25));return [r(3,3,7,18,k),r(14,3,7,7,k),r(14,14,7,7,k)]}
export function splitHorizontal({g,l,a}){return [l(9,3,9,21),l(15,3,15,21),...a([l(9,12,2,12)],[[5,9],[2,12],[5,15]]),...a([l(15,12,22,12)],[[19,9],[22,12],[19,15]])]}
export function splitVertical({g,l,a}){return [l(3,9,21,9),l(3,15,21,15),...a([l(12,9,12,2)],[[9,5],[12,2],[15,5]]),...a([l(12,15,12,22)],[[9,19],[12,22],[15,19]])]}
export function pictureInPicture({g,r,o}){
 const mainRadius=Math.min(g.r,g.v(1.5,1.875,2.25));
 const main=o([[8.25,18],[2,18],[2,4],[21,4],[21,9.25]],false,mainRadius);
 return [main,r(12,13,10,7,Math.min(g.r,1.5))];
}
export function panelsTopLeft({g,l}){return enclosedDetails(layout['panel-top'](g)[0],[l(3,9,21,9),l(9,9,9,20)],g)}
export function panelBottomOpen({g,o}){return [...layout['panel-bottom'](g),o([[9,11],[12,8],[15,11]],false,g.tip)]}
export function panelTopOpen({g,o}){return [...layout['panel-top'](g),o([[9,13],[12,16],[15,13]],false,g.tip)]}
export function focus({g,c}){return [...files.scan(g).slice(0,4),c(12,12,3)]}
