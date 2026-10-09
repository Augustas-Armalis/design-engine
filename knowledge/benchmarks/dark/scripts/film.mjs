import { chromium } from 'playwright';
import fs from 'node:fs';
const D='/Users/augustas/dev/design-engine/knowledge/benchmarks/dark';
const [name,url]=process.argv.slice(2);
const b = await chromium.launch();
const ctx = await b.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1,colorScheme:'dark'});
const p = await ctx.newPage();
await ctx.addInitScript(()=>{ window.__paint={}; try{ new PerformanceObserver(l=>{for(const e of l.getEntries()) window.__paint[e.name]=e.startTime+performance.timeOrigin}).observe({type:'paint',buffered:true}); }catch(e){} });
const cdp = await ctx.newCDPSession(p);
const frames=[];
cdp.on('Page.screencastFrame', async f=>{ frames.push({t:f.metadata.timestamp*1000,data:f.data}); try{await cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId});}catch(e){} });
await cdp.send('Page.startScreencast',{format:'jpeg',quality:70,maxWidth:1440,maxHeight:900,everyNthFrame:1});
try{ await p.goto(url,{waitUntil:'domcontentloaded',timeout:40000}); }catch(e){}
await p.waitForTimeout(4500);
const paint = await p.evaluate(()=>{const o={};for(const e of performance.getEntriesByType('paint')) o[e.name]=e.startTime+performance.timeOrigin; return o;});
await cdp.send('Page.stopScreencast');
const fcp = paint['first-contentful-paint'];
const marks=[0,300,800,1500,2500];
const pick = marks.map(m=>{ const target=fcp+m; let best=null; for(const f of frames){ if(f.t<=target+40) best=f; } return {m, f:best||frames[0], dt:best?Math.round(best.t-fcp):null}; });
// compose html
const html = `<body style="margin:0;background:#222;font:14px monospace;color:#fff"><div style="display:grid;grid-template-columns:repeat(5,576px);gap:6px;padding:6px">${pick.map(x=>`<div><div style="padding:2px 4px">${name} FCP+${x.m}ms (frame at ${x.dt}ms)</div><img src="data:image/jpeg;base64,${x.f.data}" style="width:576px;display:block"></div>`).join('')}</div></body>`;
const pg = await ctx.newPage(); await pg.setViewportSize({width:2940,height:420}); await pg.setContent(html); await pg.waitForTimeout(300);
await pg.screenshot({path:`${D}/${name}-film.png`});
console.log(name,'fcp',Math.round(fcp-(await p.evaluate(()=>performance.timeOrigin))),'frames',frames.length, pick.map(x=>x.dt));
await b.close();
