import {figure} from '../families/shared.mjs';
import {coreDrawings} from '../families/core.mjs';
import {support} from '../families/support.mjs';
import {knockout} from '../occlusion.mjs';
import {withClock} from './badges.mjs';

function openTray(g) {
  const f=figure(g);
  return [f.contour([[5.6,9.4],[3.1,14.1],[3.1,20.3],[20.9,20.3],[20.9,14.1],[18.4,9.4]],false,g.r),
    f.contour([[3.4,14.1],[8.4,14.1],[10,16.6],[14,16.6],[15.6,14.1],[20.6,14.1]],false,Math.min(g.r,.9))];
}
function trayArrow(g,inward) {
  const f=figure(g),tip=inward?11.7:3.2,wing=inward?8.6:6.3;
  return [...openTray(g),...f.arrow([f.line(12,inward?3.2:11.7,12,tip)],[[8.8,wing],[12,tip],[15.2,wing]])];
}
function unread(g,base) {
  const f=figure(g);
  return knockout(base,[f.dot(19.3,5.2,g.v(2.3,2.2,2.1))],g);
}
function mailRoute(g,forward) {
  const f=figure(g),x=p=>forward?p:35-p;
  const shaft=f.path('M'+x(12.8)+' 20.4Q'+x(13.4)+' 15.9 '+x(17.9)+' 15.9H'+x(21.6));
  return knockout(coreDrawings.mail(g),f.arrow([shaft],[[x(18.3),12.8],[x(21.6),15.9],[x(18.3),19.1]]),g);
}
export const inbox={
  'inbox-in':g=>trayArrow(g,true),
  'inbox-out':g=>trayArrow(g,false),
  'inbox-unread':g=>unread(g,support.inbox(g)),
  'inbox-done':g=>[...openTray(g),figure(g).contour([[8,7.7],[10.8,10.6],[16.3,4.9]])],
  'mail-unread':g=>unread(g,coreDrawings.mail(g)),
  'mail-forward':g=>mailRoute(g,true),
  'mail-reply':g=>mailRoute(g,false),
  'mail-scheduled':g=>withClock(g,coreDrawings.mail(g)),
  'mail-attachment'(g) {
    const f=figure(g),clip=f.path('M17.3 16.1L19.5 13.9C21.1 12.3 23 14.4 21.5 15.9L17.4 20C14.4 23 10.9 19.5 13.6 16.7L18.2 12.1');
    return knockout(coreDrawings.mail(g),[clip],g);
  },
  'mail-important'(g) {
    const f=figure(g);
    return knockout(coreDrawings.mail(g),[f.line(19.3,10.9,19.3,16),f.dot(19.3,20,1.1)],g);
  },
};
