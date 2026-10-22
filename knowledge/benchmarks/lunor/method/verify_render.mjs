// node verify_render.mjs jobs.json outdir : jobs=[{id, items:[{fam,w,fvs,size,ls,fg,bg,text}]}]
import { chromium } from '/Users/augustas/Documents/Larpo front-end engine/node_modules/playwright/index.mjs'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
const [jf,out]=process.argv.slice(2); const jobs=JSON.parse(readFileSync(jf))
const page0=readFileSync('/private/tmp/claude-501/-Users-augustas-Documents-Larpo-front-end-engine/c7ae5869-cc65-4450-bbb6-04aec004ab65/scratchpad/lunor/render/page.html','utf8')
writeFileSync(out+'/page.html',page0)
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1600,height:1000},deviceScaleFactor:1})
await p.goto('file://'+out+'/page.html',{waitUntil:'networkidle'})
for(const j of jobs){
  const name=`${out}/${j.id}`; if(existsSync(name+'.json')) continue
  const boxes=await p.evaluate(async (items)=>{
    const root=document.getElementById('root'); root.innerHTML=''; let y=0; const res=[]
    for(const it of items){ const d=document.createElement('div'); d.className='r'; Object.assign(d.style,{top:y+'px',left:'40px',fontFamily:`'${it.fam}'`,fontWeight:it.w,fontSize:it.size+'px',letterSpacing:it.ls+'px',lineHeight:(Math.ceil(it.size*1.6))+'px',color:`rgb(${it.fg})`,background:`rgb(${it.bg})`,padding:'0 30px'}); if(it.fvs) d.style.fontVariationSettings=it.fvs; d.textContent=it.text; root.appendChild(d); y+=Math.ceil(it.size*1.6)+10 }
    document.body.style.height=(y+20)+'px'; await document.fonts.ready
    return [...root.children].map(e=>{const r=e.getBoundingClientRect();return [r.x,r.y,r.width,r.height]})
  }, j.items)
  await p.screenshot({path:name+'.png',fullPage:true}); writeFileSync(name+'.json',JSON.stringify(boxes))
}
await b.close()
