import {test} from 'node:test';
import assert from 'node:assert/strict';
import {renderToStaticMarkup} from 'react-dom/server';
import {drawReact} from '../../icons-react/dist/runtime.js';
test('per-stroke dashes and opacity survive React serialization',()=>{
 const master={size:16,opticalSize:16,corner:'soft',strokeWidth:1.25,nodes:[['path',{d:'M2 8H14','stroke-dasharray':'2 3','stroke-dashoffset':1,'stroke-opacity':.45}],['circle',{cx:8,cy:8,r:2,fill:'currentColor','fill-opacity':.2,opacity:.8}]]};
 const svg=renderToStaticMarkup(drawReact(master,'fixed'));
 for(const value of ['stroke-dasharray="2 3"','stroke-dashoffset="1"','stroke-opacity="0.45"','fill-opacity="0.2"','opacity="0.8"'])assert.ok(svg.includes(value),value);
});
