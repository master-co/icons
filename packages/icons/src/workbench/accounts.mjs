import {figure,mark} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

function portrait(f) {
  return [f.circle(8.4,7.1,3.3),f.path('M2.8 20V18.5C2.8 12.1 13.9 12.1 13.9 18.5V20')];
}
export function teamPortrait(g) {
  const f=figure(g);
  return [...portrait(f),f.path('M14.3 4.3C19 3.3 20.1 10.3 15.3 10.8')];
}
export const accounts={
  passkey(g) {
    const f=figure(g);
    return [...portrait(f),f.circle(18,10,2.9),f.contour([[18,13],[18,20],[20.8,20],[20.8,17.8]],false,g.tip)];
  },
  'password-field'(g) {
    const f=figure(g);
    return [f.rect(2.8,5.8,18.4,12.4),...[7.1,12,16.9].map(x=>f.dot(x,12,1.12))];
  },
  'one-time-code'(g) {
    const f=figure(g);
    return [f.rect(2.3,5,8.1,14),f.rect(13.6,5,8.1,14),
      f.contour([[4.7,10.7],[6.6,9.1],[6.6,15.3]]),f.line(16,9.6,19.2,9.6),f.line(19.2,9.6,16.9,15.3)];
  },
  incognito(g) {
    const f=figure(g);
    return [f.path('M5.4 12L7.3 6.3Q7.8 4.6 9.4 5.4L12 6.5L14.6 5.4Q16.1 4.6 16.7 6.3L18.6 12'),
      f.line(2.8,12,21.2,12),f.circle(7.6,17.9,2.8),f.circle(16.4,17.9,2.8),f.path('M10.4 17.3Q12 16 13.6 17.3')];
  },
  'scan-qr-code'(g) {
    const f=figure(g),r=Math.min(g.r,.65);
    return [f.path('M3 7V3H7M17 3H21V7M21 17V21H17M7 21H3V17'),
      f.rect(7,7,3.5,3.5,r),f.rect(13.7,7,3.5,3.5,r),f.rect(7,13.7,3.5,3.5,r),
      f.contour([[14,17],[14,14],[17,14],[17,17]],false,g.tip)];
  },
  'user-switch'(g) {
    const f=figure(g);
    return [...portrait(f),...f.arrow([f.line(14.8,7.7,21.1,7.7)],[[18.8,5.3],[21.1,7.7],[18.8,10.1]]),
      ...f.arrow([f.line(21,14.4,15.1,14.4)],[[17.4,12.1],[15.1,14.4],[17.4,16.7]])];
  },
  'users-plus':g=>[...teamPortrait(g),...mark(g,'plus',18.8,16.5)],
  'shield-lock'(g) {
    const f=figure(g);
    return [f.path('M12 2.9C14.3 4.8 17.3 5.7 20.2 6V11.5C20.2 16.4 16.9 19.8 12 21.5C7.1 19.8 3.8 16.4 3.8 11.5V6C6.7 5.7 9.7 4.8 12 2.9Z'),
      f.rect(8.7,11.6,6.6,4.7,Math.min(g.r,.8)),f.path('M10.1 11.5V9.7C10.1 7.1 13.9 7.1 13.9 9.7V11.5')];
  },
  'bell-snooze'(g) {
    const f=figure(g);
    return knockout([f.path('M4.5 14.9C6.1 12.5 4.4 9.5 6.4 6.5C8.7 3.2 14.2 3.6 16 7.3C17.3 10 16 12.8 17.9 15.3L19 17.2H3.4Z'),f.path('M8.5 20C9.5 21.6 12.8 21.6 13.8 20')],
      [f.contour([[16,4.1],[20.2,4.1],[16,9],[20.6,9]])],g);
  },
};
