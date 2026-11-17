import {figure} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';
import {media} from '../families/media.mjs';

function thumbnail(g,x,y,width,height) {
  const f=figure(g),bottom=y+height;
  const frame=f.rect(x,y,width,height,Math.min(g.r,f.u(height*.18)));
  // A single ridge sitting on the shared bottom edge survives in small thumbnails.
  // Raise the peak in the 16px master to open its triangular counter.
  const peak=g.v(.36,.41,.45);
  const ridge=f.contour([[x+width*.16,bottom],[x+width*.56,y+height*peak],[x+width*.87,bottom]]);
  return [frame,ridge];
}
function alignedImage(g,x) {
  const f=figure(g);
  return [...thumbnail(g,x,4.2,11,10.7),f.line(3,19.3,21,19.3)];
}
function wrappedImage(g,left) {
  const f=figure(g),x=left?2.8:12, start=left?15.2:2.8;
  return [...thumbnail(g,x,4,9.2,9.5),f.line(start,6,start+5.9,6),
    f.line(start,11.5,start+5,11.5),f.line(2.8,18.4,21.2,18.4)];
}
export const images={
  'image-align-left':g=>alignedImage(g,3),'image-align-center':g=>alignedImage(g,6.5),
  'image-align-right':g=>alignedImage(g,10),
  'image-wrap-left':g=>wrappedImage(g,true),'image-wrap-right':g=>wrappedImage(g,false),
  'image-inline'(g) {
    const f=figure(g);
    return [...thumbnail(g,7.4,6.2,9.2,9.6),f.line(2.4,15.8,4.6,15.8),f.line(19.4,15.8,21.6,15.8)];
  },
  'image-caption'(g) {
    const f=figure(g);
    return [...thumbnail(g,4,3.3,16,12.6),f.dot(8.7,7.5,g.stroke*.5),f.line(7.5,20.3,16.5,20.3)];
  },
  'image-alt'(g) {
    const f=figure(g);
    const glyph=[f.contour([[13.7,21],[17.7,11.6],[21.7,21]]),f.line(15,18.1,20.4,18.1)];
    return knockout(thumbnail(g,2.8,3.7,16.8,13.8),glyph,g);
  },
  'image-replace'(g) {
    const f=figure(g);
    return knockout(thumbnail(g,2.8,5.7,16.7,14.2),
      f.arrow([f.path('M13 7.3C14.5 2.5 20.1 3 21 7.5')],[[17.3,6.2],[21,7.5],[21.6,3.6]]),g);
  },
  'image-off':g=>knockout(media.image(g),[figure(g).line(3,2.8,21,21.2)],g),
};
