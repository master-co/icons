import test from 'node:test';
import assert from 'node:assert/strict';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {h as vueH} from 'vue';
import {renderToString as vueSSR} from 'vue/server-renderer';
import {h as preactH} from 'preact';
import {render as preactSSR} from 'preact-render-to-string';
import {render as svelteSSR} from 'svelte/server';
import {experimental_AstroContainer} from 'astro/container';
import {context} from '../src/geometry.mjs';
import {draw} from '../src/drawings.mjs';
import {renderSvg, resolveIcon, strokeRanges, strokeWidths} from '../dist/runtime.js';
import {Search} from '../dist/index.js';
import {bundle, importBundle} from './helpers/framework-build.mjs';

function normalizedGeometry(html) {
  let value=html.replace(/<!--[\s\S]*?-->/g,'').replace(/ xmlns="http:\/\/www.w3.org\/2000\/svg"/g,'').replace(/\s*>\s*</g,'><').trim();
  const ids=new Map([...value.matchAll(/\bid="([^"]+)"/g)].map(([_,id],i)=>[id,`mask-${i}`]));
  value=value.replace(/\bid="([^"]+)"/g,(_,id)=>`id="${ids.get(id)}"`).replace(/url\(#([^)]+)\)/g,(_,id)=>`url(#${ids.get(id)??id})`);
  value=value.replace(/><\/(circle|line|path|rect|ellipse|polygon|polyline)>/g,'/>');
  return value.slice(value.indexOf('>')+1,value.lastIndexOf('</svg>'));
}
const names={Search:'search',BellOff:'bell-off',DatabaseSearch:'database-search',ArrowRight:'arrow-right',BrandDiscord:'brand-discord',BrandWechatOutline:'brand-wechat-outline',BrandSoundcloudOutline:'brand-soundcloud-outline',BrandGithubOutline:'brand-github-outline',BrandGitlabOutline:'brand-gitlab-outline',BrandDiscordOutline:'brand-discord-outline',BrandTiktokOutline:'brand-tiktok-outline',BrandVimeoOutline:'brand-vimeo-outline',BrandRedditOutline:'brand-reddit-outline',BrandPinterestOutline:'brand-pinterest-outline'};
const oracle=new Map();
function expected(name,size,corner,width){
  const key=`${name}/${size}/${corner}/${width}`;
  if(!oracle.has(key)){
    const master={strokeWidth:width,nodes:draw(name,{...context(size,corner),stroke:width,variableStroke:true})};
    oracle.set(key,normalizedGeometry(renderSvg({name,direction:'fixed',variants:{[size]:{[corner]:master}}},{size,corner})));
  }
  return oracle.get(key);
}

test('strokeWidth validates increments and clamps to the selected optical master',()=>{
  for(const [size,width,clamped] of [[16,2.5,1.5],[20,0.75,1],[24,0.75,1.25]])assert.equal(resolveIcon(Search,{size,strokeWidth:width}).strokeWidth,clamped);
  for(const strokeWidth of [0,-1,NaN,Infinity,1.1,'2'])assert.throws(()=>resolveIcon(Search,{strokeWidth}),/strokeWidth/);
  assert.equal(resolveIcon(Search).nodes,Search.variants[24].soft.nodes);
});

for(const framework of ['react','vue','svelte','preact','astro'])test(`${framework}: custom widths match independently drawn geometry across optical sizes and fixed entries`,async()=>{
  let entry=`export { ${Object.keys(names).map(name=>name+'Icon').join(', ')} } from '@master/icons-${framework}';\n`;
  for(const size of [16,20,24])for(const corner of ['sharp','soft','rounded'])entry+=`export {BellOffIcon as Fixed${size}${corner}} from '@master/icons-${framework}/${size}/${corner}';\n`;
  const icons=await importBundle(await bundle(entry));
  const astro=framework==='astro'?await experimental_AstroContainer.create():null;
  const render=async(component,props)=>framework==='react'?renderToStaticMarkup(createElement(component,props))
    :framework==='vue'?vueSSR(vueH(component,props)):framework==='preact'?preactSSR(preactH(component,props))
    :framework==='svelte'?(await svelteSSR(component,{props})).body:astro.renderToString(component,{props});
  for(const size of [16,20,24])for(const corner of ['sharp','soft','rounded']){
    const [min,max]=strokeRanges[size];
    for(const width of strokeWidths.filter(value=>value>=min&&value<=max)){
      for(const [component,name] of Object.entries(names)){
        const html=await render(icons[component+'Icon'],{size:48,opticalSize:size,corner,strokeWidth:width});
        assert.equal(normalizedGeometry(html),expected(name,size,corner,width),`${name}/${size}/${corner}/${width}`);
        assert.match(html,new RegExp(`stroke-width="${width}"`));
        assert.doesNotMatch(html,/strokeWidth=|strokes=|opticalSize=|corner=/);
      }
      const html=await render(icons[`Fixed${size}${corner}`],{size:48,strokeWidth:width});
      assert.equal(normalizedGeometry(html),expected('bell-off',size,corner,width));
      assert.match(html,/width="48"/);
    }
  }
  const clamped=await render(icons.Fixed16soft,{strokeWidth:2.5});
  assert.equal(normalizedGeometry(clamped),expected('bell-off',16,'soft',1.5));
  if(framework==='astro'){
    const path=new URL('./native/StrokePair.astro',import.meta.url).pathname;
    const {default:Pair}=await importBundle(await bundle(`export {default} from ${JSON.stringify(path)};`));
    const html=await astro.renderToString(Pair);
    const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
    assert.ok(ids.length>=3);assert.equal(new Set(ids).size,ids.length);
    for(const [_,id] of html.matchAll(/url\(#([^)]+)\)/g))assert.ok(ids.includes(id));
  }
  if(framework==='vue')assert.equal(normalizedGeometry(await render(icons.Fixed16soft,{'stroke-width':1.5})),normalizedGeometry(clamped));
});
