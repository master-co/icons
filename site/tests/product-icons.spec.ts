import {expect, test} from '@playwright/test'
import {readFile} from 'node:fs/promises'
import scope from '../../packages/icons/src/product-scope.json' with {type:'json'}
// The site publishes no SVG files; compare with the files the core package publishes.
const published=(path:string)=>readFile(new URL(`../../packages/icons/icons/${path}`,import.meta.url),'utf8')

test('product controls open from their searchable names and expose all native masters',async({page})=>{
  await page.goto('/icons?size=16')
  await expect(page.locator('astro-island[ssr]')).toHaveCount(0)
  const search=page.getByRole('searchbox',{name:'Search icons',exact:true})
  for(const {name} of scope){
    await search.fill(name)
    await page.getByTestId('icon-grid').getByRole('link',{name:name.replaceAll('-',' '),exact:true}).click()
    const dialog=page.getByRole('dialog')
    await expect(dialog.locator('.master-cell svg')).toHaveCount(9)
    const code=await dialog.locator('textarea').inputValue()+'\n'
    expect(await published('16/soft/'+name+'.svg')).toBe(code)
    await page.keyboard.press('Escape')
  }
  for(const [query,name] of [['chart-column-increasing','chart bar increasing'],['unfold-more','chevrons up down'],['corner-down-left','keyboard return'],['SourceCode','code']]){
    await search.fill(query)
    await expect(page.getByTestId('icon-grid').getByRole('link',{name,exact:true})).toBeVisible()
  }
})
