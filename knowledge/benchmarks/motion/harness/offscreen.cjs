const fs=require('fs');const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const SITES = { linear: 'https://linear.app', vercel: 'https://vercel.com', stripe: 'https://stripe.com', raycast: 'https://www.raycast.com', resend: 'https://resend.com', clerk: 'https://clerk.com', attio: 'https://attio.com', framer: 'https://www.framer.com', cursor: 'https://cursor.com', dub: 'https://dub.co', granola: 'https://www.granola.ai', plain: 'https://www.plain.com', commslayer: 'https://commslayer.com', alignui: 'https://alignui.com' };
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const out={};
 await Promise.all(Object.entries(SITES).map(async([n,u])=>{const ctx=await b.newContext({viewport:{width:1440,height:900},userAgent:'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'});const p=await ctx.newPage();
 try{await p.goto(u,{waitUntil:'load',timeout:40000}).catch(()=>{});await sleep(3000);
  // scroll to 55% of page, in steps
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);const target=Math.min(H*0.55,H-900);
  await p.mouse.move(720,450);for(let y=0;y<target;y+=500){await p.mouse.wheel(0,500);await sleep(120);} await sleep(2500);
  out[n]=await p.evaluate(()=>{const vh=innerHeight;const inf=document.getAnimations().filter(a=>{const t=a.effect&&a.effect.getTiming?a.effect.getTiming():{};return t.iterations===Infinity&&a.effect.target&&a.effect.target.getBoundingClientRect});
   let off=0,offRunning=0,offPaused=0,on=0;
   inf.forEach(a=>{const r=a.effect.target.getBoundingClientRect();const isOff=r.bottom<-150||r.top>vh+150||r.width===0;if(isOff){off++;if(a.playState==='running')offRunning++;else offPaused++;}else on++;});
   const vids=[...document.querySelectorAll('video')].map(v=>{const r=v.getBoundingClientRect();return {off:r.bottom<0||r.top>vh,paused:v.paused,autoplay:v.autoplay||v.hasAttribute('autoplay'),loop:v.loop}});
   return {scrollY,H:document.documentElement.scrollHeight,infTotal:inf.length,infOnscreen:on,infOffscreen:off,offRunning,offPaused,videosOff:vids.filter(v=>v.off).length,videosOffPlaying:vids.filter(v=>v.off&&!v.paused).length,videosTotal:vids.length}});
 }catch(e){out[n]={error:e.message.slice(0,60)}} await ctx.close();}));
 fs.writeFileSync('/tmp/mx_offscreen.json',JSON.stringify(out,null,1));for(const [n,o] of Object.entries(out)) console.log(n,JSON.stringify(o));await b.close();})();
