import {line,rect,weightDelta} from '../geometry.mjs';
import {enclosedDetails,knockout} from '../occlusion.mjs';
import {horizontalArrow,plus} from './core.mjs';
import {contactPortrait} from './identity.mjs';
import {archiveBox} from './files.mjs';
import {media} from './media.mjs';
import {rotate} from './shared.mjs';

export const identityMediaActions={
  'id-card':g=>{
    const v=g.v,k=24/g.s,l=v(1.5,2,2.5),top=v(3,3.75,4.5),bottom=g.s-top;
    const frame=rect(l,top,g.s-l*2,bottom-top,g.r);
    const portrait=contactPortrait(g,{
      x:v(5.25,6.5,7.75)*k,y:v(6.5,8,9.5)*k,radius:v(1.4,1.7,2)*k,
      left:v(3.25,4,4.75)*k,right:v(7.25,9,10.75)*k,
      bottom:bottom*k,rise:v(.5,.75,1)*k,control:v(9,11.25,13.5)*k,
      // A thick outline closes this miniature head's counter and touches its
      // shoulders at 16px. Keep the portrait cue as a deliberate solid head.
      solidHead:g.s===16&&g.stroke>1.5,
    });
    return [...enclosedDetails(frame,[portrait[1]],g),portrait[0],
      ...[v(7,8.75,10.5),v(10,12.5,15)].map(y=>line(v(10,12.5,15),y,v(12,15,18),y))];
  },
  'archive-restore':g=>{
    const extra=weightDelta(g),top=g.v(8,10,12)+extra*.75,
      bottom=g.v(11.5,14.5,17.5)-extra*.5,half=g.v(1.75,2.25,2.75)-extra*.25;
    const arrow=horizontalArrow(g,{start:g.s-bottom,end:g.s-top,wing:g.s-top-half,half});
    return [...archiveBox(g,{handle:false}),...rotate(arrow,-90,g)];
  },
  'image-plus':g=>knockout(media.image(g),plus(g,{
    // Lift the 16px badge a quarter pixel so its clearance removes the whole
    // sharp upper-right frame corner instead of leaving a detached ink fleck.
    x:g.v(12.5,15.75,19),y:g.v(3.25,4.25,5),half:g.v(2,2.5,3),
  }),g),
};
