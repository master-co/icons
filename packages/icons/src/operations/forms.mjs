import {figure} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

export const fields={
  'field-text'(g) {
    const f=figure(g);
    return [f.rect(2.9,6.3,18.2,11.4),f.line(7.6,9.1,7.6,14.9)];
  },
  'field-number'(g) {
    const f=figure(g);
    return [f.contour([[3.9,8.3],[7.2,5.8],[7.2,18.2]]),f.line(4.6,18.2,9.7,18.2),
      f.contour([[13.7,8.6],[17.1,5.3],[20.5,8.6]]),f.contour([[13.7,15.4],[17.1,18.7],[20.5,15.4]])];
  },
  'field-dropdown'(g) {
    const f=figure(g);
    return [f.rect(2.9,6.3,18.2,11.4),f.line(6.1,12,9.7,12),f.contour([[13,10.5],[15.4,13],[17.8,10.5]])];
  },
  'field-multiselect'(g) {
    const f=figure(g);
    return [f.contour([[3.1,11.3],[3.1,5.4],[14.9,5.4],[14.9,7.4]],false,g.r),
      f.rect(6.9,10.5,14.1,8.2),f.line(14.8,13.1,17.6,16),f.line(17.6,13.1,14.8,16)];
  },
  signature(g) {
    const f=figure(g);
    return [f.path('M3.2 16.6C7.8 15.2 15.4 4.4 12.4 3.7C9.2 3 4.5 13.3 6.1 16C7.4 18.1 11.4 13.1 12.9 11.1C12.1 13.7 11.5 16.3 13.1 16.1C14.5 16 15.9 13.8 16.8 13.4C16.7 15.3 17.4 15.9 20.8 15'),f.line(3.4,20.2,20.7,20.2)];
  },
  'form-section'(g) {
    const f=figure(g);
    return [f.rect(3.7,3.3,16.6,17.4),f.line(4.2,8.6,19.8,8.6),f.line(7.5,12.9,16.4,12.9),f.line(7.5,16.9,13.2,16.9)];
  },
  'field-required'(g) {
    const f=figure(g);
    const star=[f.line(18.2,3.2,18.2,10.8),f.line(14.9,5.1,21.5,8.9),f.line(14.9,8.9,21.5,5.1)];
    return knockout([f.rect(2.9,7.5,17.8,11.2)],star,g);
  },
  'field-attachment'(g) {
    const f=figure(g);
    return [f.contour([[3,9],[3,5.3],[7,5.3]],false,g.tip),f.contour([[17,5.3],[21,5.3],[21,9]],false,g.tip),
      f.contour([[3,14.9],[3,18.8],[7,18.8]],false,g.tip),f.contour([[17,18.8],[21,18.8],[21,14.9]],false,g.tip),
      f.path('M10.9 12.7L13.1 10.4C14.2 9.2 15.8 10.8 14.6 12L11.3 15.4C8.7 18 5.7 15 8.3 12.4L13.4 7.3')];
  },
  'field-rating'(g) {
    const f=figure(g);
    return [f.contour([[9.2,5.6],[10.8,10],[15.1,10.2],[11.8,13.2],[12.9,17.9],[9.2,15.3],[5.3,17.9],[6.5,13.2],[3.5,10.2],[7.7,10]],true,g.tip),
      f.dot(17.5,12,1.05),f.dot(21,12,1.05)];
  },
  'field-textarea'(g) {
    const f=figure(g);
    return [f.rect(2.9,4.8,18.2,14.4),f.line(6.4,9,16.6,9),f.line(6.4,13.3,12,13.3),f.line(16,18.8,20.7,14.1)];
  },
};
