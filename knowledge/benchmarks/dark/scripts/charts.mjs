import { chromium } from 'playwright';
const b = await chromium.launch();
const sites={railway:'https://railway.com',linear:'https://linear.app',supabase:'https://supabase.com',resend:'https://resend.com',framer:'https://www.framer.com',raycast:'https://www.raycast.com',vercel:'https://vercel.com',neon:'https://neon.com',github:'https://github.com'};
for(const [n,u] of Object.entries(sites)){
  const ctx=await b.newContext({viewport:{width:1440,height:900},colorScheme:'dark'}); const p=await ctx.newPage();
  try{await p.goto(u,{waitUntil:'domcontentloaded',timeout:40000});await p.waitForTimeout(2500);}catch(e){}
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<Math.min(H,12000);y+=500){await p.evaluate(yy=>scrollTo(0,yy),y);await p.waitForTimeout(150);}
  const r=await p.evaluate(()=>{
    const cv=document.createElement('canvas');cv.width=cv.height=1;const ctx=cv.getContext('2d',{willReadFrequently:true});
    const rgb=c=>{if(!c||c==='none')return null;ctx.clearRect(0,0,1,1);ctx.fillStyle='#000';ctx.fillStyle=c.replace(/\/\s*[\d.]+%?\s*\)/,')');ctx.fillRect(0,0,1,1);const d=ctx.getImageData(0,0,1,1).data;return [d[0],d[1],d[2]]};
    const lin=v=>{v/=255;return v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4)};
    const ok=(r,g,b)=>{const R=lin(r),G=lin(g),B=lin(b);const l=Math.cbrt(0.4122214708*R+0.5363325363*G+0.0514459929*B),m=Math.cbrt(0.2119034982*R+0.6806995451*G+0.1073969566*B),s=Math.cbrt(0.0883024619*R+0.2817188376*G+0.6299787005*B);const L=0.2104542553*l+0.793617785*m-0.0040720468*s,A=1.9779984951*l-2.428592205*m+0.4505937099*s,Bb=0.0259040371*l+0.7827717662*m-0.808675766*s;return {L,C:Math.hypot(A,Bb),H:(Math.atan2(Bb,A)*180/Math.PI+360)%360}};
    const h={};
    document.querySelectorAll('svg *').forEach(e=>{const s=getComputedStyle(e);for(const c of [s.fill,s.stroke]){const v=rgb(c);if(!v)continue;const o=ok(...v);if(o.C>0.06){const k='#'+v.map(x=>x.toString(16).padStart(2,'0')).join('');h[k]=h[k]||{n:0,L:+o.L.toFixed(3),C:+o.C.toFixed(3),H:Math.round(o.H)};h[k].n++}}});
    return Object.entries(h).sort((a,b)=>b[1].n-a[1].n).slice(0,8).map(([k,v])=>k+' n'+v.n+' L'+v.L+' C'+v.C+' H'+v.H);
  });
  console.log('==',n); console.log(r.join('\n')); await ctx.close();
}
await b.close();
