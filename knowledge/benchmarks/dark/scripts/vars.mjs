import { chromium } from 'playwright';
const b = await chromium.launch(); 
const sites = {
 vercel:['https://vercel.com',/^--ds-(gray|background|gray-alpha)/],
 linear:['https://linear.app',/^--color-(bg|text|border|line|brand|accent)/],
 raycast:['https://www.raycast.com',/^--(grey|gray|background|bg|border|text)/],
 github:['https://github.com',/^--(bgColor|fgColor|borderColor)-(default|muted|emphasis|inset)/],
 railway:['https://railway.com',/^--(color|bg|background|border|text|gray|grey|foreground)/],
 supabase:['https://supabase.com',/^--(color|bg|background|border|foreground|surface|text|brand)/],
 resend:['https://resend.com',/^--(color-(slate|gray|neutral)|background|foreground|border)/],
 neon:['https://neon.com',/^--(color|background|foreground|border|gray)/],
};
for (const [n,[u,re]] of Object.entries(sites)) {
  const ctx = await b.newContext({viewport:{width:1440,height:900}, colorScheme:'dark'}); const p = await ctx.newPage();
  try { await p.goto(u,{waitUntil:'domcontentloaded',timeout:40000}); await p.waitForTimeout(3000); } catch(e){}
  const r = await p.evaluate((src)=>{ const re=new RegExp(src); const out={}; const cs=getComputedStyle(document.documentElement);
    for (const sh of document.styleSheets){ let rules; try{rules=sh.cssRules}catch(e){continue}
      const walk=(rule)=>{ if(rule.style && /:root|html|\.dark|body|\[data/.test(rule.selectorText||'')) for(const p of rule.style) if(re.test(p)) out[p]=cs.getPropertyValue(p).trim().slice(0,70); if(rule.cssRules) for(const x of rule.cssRules) walk(x)}; for(const rule of rules) walk(rule)} return out;}, re.source);
  const ents=Object.entries(r); console.log('=====',n,ents.length); console.log(ents.slice(0,70).map(([k,v])=>k+': '+v).join('\n'));
  await ctx.close();
}
await b.close();
