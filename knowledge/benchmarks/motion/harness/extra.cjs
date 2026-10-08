const fs=require('fs'),path=require('path');
const OUT='/Users/augustas/dev/design-engine/knowledge/benchmarks/motion';
const med=a=>{a=a.filter(Number.isFinite).sort((x,y)=>x-y);if(!a.length)return null;const m=a.length>>1;return a.length%2?a[m]:(a[m-1]+a[m])/2};
const res={};
for(const f of fs.readdirSync(path.join(OUT,'raw')).filter(f=>!f.startsWith('_'))){
  const r=JSON.parse(fs.readFileSync(path.join(OUT,'raw',f)));const n=r.name; if(!r.hero) continue;
  const o={};
  // loops census in the hero viewport (rect top < 900) from hero dump
  const inf=r.hero.anims.filter(a=>a.iterations==='Infinity'||a.iterations===Infinity||a.iterations===null);
  const inView=inf.filter(a=>a.rect&&a.rect[1]<900&&a.rect[1]>-50&&a.rect[2]>0);
  const kind=a=>{const p=a.props.join('+');const d=a.duration;const e=String(a.easing);
    if(/steps\(1/.test(e)||(d<=1200&&/opacity/.test(p)&&a.name&&/blink|cursor|caret/i.test(a.name))) return 'blink';
    if(/rotate\(360/.test(JSON.stringify(a.to))) return 'spin';
    if(/transform/.test(p)&&d>=20000&&/linear/.test(e)) return 'marquee';
    if(/background/i.test(p)) return 'shimmer';
    if(/strokeDashoffset/.test(p)) return 'stroke-flow';
    if(/opacity|transform|filter/.test(p)) return 'pulse/float';
    return 'other';};
  const tally=a=>{const t={};a.forEach(x=>{const k=kind(x);t[k]=(t[k]||0)+1});return t};
  o.heroLoops={totalInfinite:inf.length,inViewport:inView.length,kinds:tally(inView),durMedInView:med(inView.map(a=>a.duration)),durRangeInView:inView.length?[Math.min(...inView.map(a=>a.duration)),Math.max(...inView.map(a=>a.duration))]:null};
  // marquee candidates across hero+scroll
  const all=[...r.hero.anims,...(r.scroll?r.scroll.dump.anims:[])].filter(a=>(a.iterations==='Infinity')&&a.props.includes('transform')&&a.duration>=15000&&/linear/.test(String(a.easing)));
  o.marquees=all.slice(0,6).map(a=>({name:a.name,target:a.target.slice(0,30),duration:a.duration,easing:a.easing,from:a.from.transform,to:a.to.transform,width:a.rect[2],dir:a.direction}));
  // tickers
  o.tickers=(r.scroll?r.scroll.dump.texts:[]).map(t=>({desc:t.desc,from:t.series[0][1],to:t.series[t.series.length-1][1],steps:t.series.length,dur:Math.round(t.series[t.series.length-1][0]-t.series[1][0])})).filter(t=>t.from!==t.to).slice(0,8);
  o.heroTickers=r.hero.texts.map(t=>({desc:t.desc,from:t.series[0][1],to:t.series[t.series.length-1][1],steps:t.series.length,dur:Math.round(t.series[t.series.length-1][0]-t.series[1][0])})).filter(t=>t.from!==t.to).slice(0,8);
  // scroll-driven timelines
  const sd=[...r.hero.anims,...(r.scroll?r.scroll.dump.anims:[])].filter(a=>a.tl&&a.tl!=='DocumentTimeline');
  o.scrollDriven=sd.length; o.scrollDrivenKinds=[...new Set(sd.map(a=>a.tl+':'+(a.name||'')))].slice(0,8);
  // sticky/lenis? detect smooth scroll lib hints
  res[n]=o;
}
fs.writeFileSync('/tmp/mx_extra.json',JSON.stringify(res,null,1));
for(const [n,o] of Object.entries(res)) console.log(n,'loops',JSON.stringify(o.heroLoops),'| tickers',JSON.stringify(o.tickers.slice(0,3)),JSON.stringify(o.heroTickers.slice(0,3)),'| marq',JSON.stringify(o.marquees.slice(0,2)),'| sd',o.scrollDriven,JSON.stringify(o.scrollDrivenKinds.slice(0,3)));
