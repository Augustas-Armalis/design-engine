import { chromium } from '/Users/augustas/Documents/Larpo front-end engine/node_modules/playwright/index.mjs'
import { readFileSync, writeFileSync } from 'node:fs'
const cands=JSON.parse(readFileSync('cands.json'))
const b=await chromium.launch(); const p=await b.newPage()
await p.goto('file://'+process.cwd()+'/render/page.html',{waitUntil:'networkidle'})
const res=await p.evaluate(async (cands)=>{
  const out={}; const c=document.createElement('canvas').getContext('2d')
  for(const k of cands){ const fam=k.fam; const key=k.id.replace(/-\d+$/,''); if(out[key]) continue
    // load via a span so the face is fetched
    const s=document.createElement('span'); s.style.fontFamily=`'${fam}'`; s.style.fontWeight=k.w; s.textContent='Hxg'; document.body.appendChild(s)
    await document.fonts.ready
    c.font=`${k.w} 100px '${fam}'`; const m=c.measureText('Hxg'); const H=c.measureText('H'); const x=c.measureText('x')
    out[key]={asc:m.fontBoundingBoxAscent/100,desc:m.fontBoundingBoxDescent/100,cap:H.actualBoundingBoxAscent/100,xh:x.actualBoundingBoxAscent/100}
  } return out },cands)
writeFileSync('fontmetrics.json',JSON.stringify(res,null,1)); console.log(res['inter-disp'],res['geist'],res['dmsans'])
await b.close()
