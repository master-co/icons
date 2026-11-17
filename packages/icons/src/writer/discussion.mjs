import {figure,mark} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

// Set the tail on the lower left and keep the right-hand corner available for
// editing badges. The tail has a tighter radius than the four body corners.
function bubble(g,x=3,y=4,w=18,h=13.5) {
  const f=figure(g),r=g.r;
  return f.contour([[x,y],[x+w,y],[x+w,y+h],[x+w*.44,y+h],[x+w*.17,y+h+3.1],[x+w*.17,y+h],[x,y+h]],true,
    [r,r,r,g.tip,g.tip,g.tip,r]);
}
function threadNavigation(g,previous) {
  const f=figure(g),tip=previous?5:19,wing=previous?8:16;
  return [bubble(g,2.4,5.3,11.8,10.5),
    ...f.arrow([f.line(19,previous?19:5,19,tip)],[[16.2,wing],[19,tip],[21.8,wing]])];
}
export const discussion={
  'message-reply'(g) {
    const f=figure(g);
    return [bubble(g),...f.arrow([f.path('M16.8 13.4C16.6 10.2 14.4 9.9 11.9 9.9H7.4')],[[10.3,7.2],[7.4,9.9],[10.3,12.6]])];
  },
  'message-quote'(g) {
    const f=figure(g);
    const quote=x=>f.path(`M${x} 8.1h2.8v2.6c0 1.3-.6 2.1-1.9 2.8`);
    return [bubble(g),quote(7.6),quote(13.5)];
  },
  'message-pin'(g) {
    const f=figure(g);
    // The head's bevels keep the outside miter inside the viewBox at
    // the heaviest sharp stroke. The shank narrows before the flange.
    const pin=f.contour([[16.9,3],[21,7.1],[19.9,8.2],[18.7,7.9],[17.2,9.5],
      [17.1,11],[12.9,6.8],[14.4,6.7],[16,5.2],[15.8,4.1]],true,g.tip);
    return knockout([bubble(g)],[pin,f.line(15,8.9,11.8,12.1)],g,{silhouettes:[pin]});
  },
  'message-pen'(g) {
    const f=figure(g),pen=f.contour([[12.6,16.9],[18.9,10.6],[21.7,13.4],[15.4,19.7],[11.8,20.5]],true,g.tip);
    return knockout([bubble(g)],[pen],g,{silhouettes:[pen]});
  },
  'message-x':g=>[bubble(g),...mark(g,'x',12,10.6)],
  'message-off':g=>knockout([bubble(g)],[figure(g).line(3,2.5,21,21.3)],g),
  'message-clock'(g) {
    const f=figure(g),face=f.circle(17.3,16.8,4.8);
    return knockout([bubble(g)],[face,f.contour([[17.3,14.1],[17.3,16.9],[19.2,18]])],g,{silhouettes:[face]});
  },
  'message-reopen'(g) {
    const f=figure(g);
    return [bubble(g),...f.arrow([f.path('M15.7 11.7C15 14.3 11.5 14.8 9.7 13.1C7.4 11 8.7 7.4 11.8 7.3C13.6 7.2 14.8 8.1 15.6 9.6')],[[12.9,9.6],[15.6,9.6],[15.6,6.9]])];
  },
  'thread-next':g=>threadNavigation(g,false),'thread-previous':g=>threadNavigation(g,true),
};
