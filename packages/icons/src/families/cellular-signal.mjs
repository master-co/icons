import {line} from '../geometry.mjs';

export function cellularBars(g){
  const {v}=g,left=v(3.5,4,4.5),step=v(3,4,5),bottom=v(13,16,19.5),rise=v(2.5,3,3.75);
  // Independent strokes keep the antenna signal separate from chart columns.
  // Native spacing retains a clear channel at the heaviest supported weight.
  return Array.from({length:4},(_,i)=>line(left+i*step,bottom-rise*(i+1),left+i*step,bottom));
}
export const cellularSignal={'signal-bars':cellularBars};
