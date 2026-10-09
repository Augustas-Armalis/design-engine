import fs from 'node:fs'; import { PNG } from 'pngjs';
const D='/Users/augustas/dev/design-engine/knowledge/benchmarks/dark/';
const lin=v=>{v/=255;return v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4)};
const okL=(r,g,b)=>{const R=lin(r),G=lin(g),B=lin(b);const l=Math.cbrt(0.4122214708*R+0.5363325363*G+0.0514459929*B),m=Math.cbrt(0.2119034982*R+0.6806995451*G+0.1073969566*B),s=Math.cbrt(0.0883024619*R+0.2817188376*G+0.6299787005*B);return 0.2104542553*l+0.793617785*m-0.0040720468*s};
const names=['linear','raycast','vercel','cursor','supabase','resend','railway','framer','github','neon','nocturne','vigil'];
for(const n of names){
  const f=D+n+'-fold-1440x900@2x.png'; if(!fs.existsSync(f)) continue;
  const png=PNG.sync.read(fs.readFileSync(f)); const {width:W,height:H,data}=png;
  const cols=12, rows=8, bw=Math.floor(W/cols), bh=Math.floor(H/rows); const Ls=[]; let minStd=1e9;
  for(let by=0;by<rows;by++)for(let bx=0;bx<cols;bx++){
    const vals=[]; for(let y=by*bh;y<(by+1)*bh;y+=7)for(let x=bx*bw;x<(bx+1)*bw;x+=7){const i=(W*y+x)*4;vals.push(okL(data[i],data[i+1],data[i+2]));}
    vals.sort((a,b)=>a-b); Ls.push(vals[Math.floor(vals.length/2)]);
    const mean=vals.reduce((a,b)=>a+b,0)/vals.length; const sd=Math.sqrt(vals.reduce((a,b)=>a+(b-mean)**2,0)/vals.length); if(sd<minStd)minStd=sd;
  }
  const s=[...Ls].sort((a,b)=>a-b); const q=p=>s[Math.floor(p*(s.length-1))];
  // grain: pixel-level std of luminance in the block with the lowest blockwise std, full res
  console.log(n.padEnd(10),'medianL',q(.5).toFixed(3),'p5',q(.05).toFixed(3),'p95',q(.95).toFixed(3),'max',s[s.length-1].toFixed(3),'range(p95-p5)',(q(.95)-q(.05)).toFixed(3));
}
