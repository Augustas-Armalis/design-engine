const fs=require('fs'),path=require('path');
const OUT='/Users/augustas/dev/design-engine/knowledge/benchmarks/motion';
const T=JSON.parse(fs.readFileSync(OUT+'/timings.json'));
const extra=JSON.parse(fs.readFileSync('/tmp/mx_extra.json'));
const libs=JSON.parse(fs.readFileSync('/tmp/mx_libs.json'));
const h2={};for(const f of fs.readdirSync(OUT+'/raw').filter(f=>f.startsWith('_hover2-'))) Object.assign(h2,JSON.parse(fs.readFileSync(OUT+'/raw/'+f)));
const med=a=>{a=a.filter(Number.isFinite).sort((x,y)=>x-y);if(!a.length)return null;const m=a.length>>1;return a.length%2?a[m]:(a[m-1]+a[m])/2};
const rng=a=>[Math.min(...a),Math.max(...a)];
// ---- curated primary-entrance table (every value copied from getAnimations()/Element.animate() records in raw/<site>.json: heroAnims.finite, heroWapiCalls) ----
const E=(o)=>o;
const curated={
 note:'Each value was read from document.getAnimations() or the Element.animate() patch (declared duration/delay/easing/keyframes), not eyeballed. Times in ms. rise = start translateY in px (or %) of the headline/primary block. step = delay between siblings in the same cascade.',
 heroEntrance:{
  dub:E({mech:'CSS keyframes (slide-up-fade, fill both)',startRelFcp:-86,dur:1000,ease:'cubic-bezier(.16,1,.3,1)',delays:{announcementBadge:0,h1:100,sub:200,productChipsRow:300,buttons:[400,450,500],productWindow:500},riseH1:20,riseOthers:[10,5],blur:0,stage:{dur:400,rise:20,delay:500},logoSwapLoop:{name:'logo-flip-in/out',inDur:280,outDur:180,ease:'ease-out',scaleFrom:0.96,blur:2,step:75,note:'loops; not part of entrance'},span:1500}),
  linear:E({mech:'JS WAAPI, one span per word',startRelFcp:547,dur:1000,ease:'cubic-bezier(.25,.1,.25,1)',delays:{words:[400,433,466,499],line2:500,sub:600,cta:850,frame:1300},wordStep:33,riseH1:'translateY(20%) = 24.8px measured',blur:10,stage:{dur:1500,ease:'cubic-bezier(.455,.03,.515,.955)',delay:1300,props:'opacity'},span:2800}),
  attio:E({mech:'JS WAAPI, opacity+blur only',startRelFcp:892,dur:600,ease:'cubic-bezier(0,0,.58,1)',delays:{eyebrow:0,h1:100,sub:200,buttons:[300,400],stageBlocks:[450,1200,1350,1500]},step:100,riseH1:0,blur:1.5,stage:{dur:900,ease:'cubic-bezier(0,0,.58,1)',scaleFrom:0.98,scaleDur:873},rows:{name:'enter',dur:500,ease:'ease',rise:8,step:120},span:2400}),
  raycast:E({mech:'CSS keyframes (fade-in-up)',startRelFcp:-20,dur:1000,ease:'ease',delays:{h1:0,sub:1000},riseH1:20,blur:0,span:2000}),
  resend:E({mech:'CSS keyframes + Motion-style springs',startRelFcp:-46,dur:1000,ease:'ease-in-out',delays:{text:0},riseH1:16,blur:0,stage:{name:'open-scale-up-fade',dur:1500,ease:'ease-in-out',scaleFrom:0.98,rise:5},glow:{dur:1000,scaleFrom:0.7},springs:[650,1050],span:1500}),
  commslayer:E({mech:'CSS keyframes',startRelFcp:-45,dur:500,ease:'cubic-bezier(.32,.72,0,1)',delays:{nav:[0,45,90,135],chatMsgs:[650,740,830,920]},step:45,riseOthers:[6,10],scaleFrom:0.985,rail:{name:'cs-rail-in',dur:350,prop:'scaleX 0->1',delay:0},span:1420}),
  alignui:E({mech:'CSS keyframes',startRelFcp:-26,dur:600,ease:'cubic-bezier(.6,.6,0,1)',delays:{frames:[0,75,150]},step:75,rise:[40,80,120],scaleFrom:[0.975,0.95,0.925],blur:4,span:750}),
 },
 heroStaticOrNearStatic:{vercel:'no hero entrance: one 200ms ease-out fade on a CTA; canvas/opacity transitions 700-1200ms linear',stripe:'headline/copy static; 500ms (.33,1,.68,1) fades on small elements; digit roll 325ms/50ms step',posthog:'hero static; hand-drawn underline segments 160-420ms ease-out',cursor:'hero copy static; product demo plays staged fades 100-340ms ease-out, steps 110-170ms',granola:'hero media driven by CSS scroll timelines (duration auto) and a looping demo'},
};
const prim=Object.values(curated.heroEntrance);
const stats={
 entranceDurMs:{values:{dub:1000,linear:1000,attio:600,raycast:1000,resend:1000,commslayer:500,alignui:600},median:null,range:null},
 headlineRisePx:{values:{dub:20,linear:24.8,attio:0,raycast:20,resend:16},median:null,range:null},
 headlineBlurPx:{values:{dub:0,linear:10,attio:1.5,raycast:0,resend:0}},
 firstHeadlineDelayMs:{values:{dub:100,linear:400,attio:100,raycast:0,resend:0}},
 subAfterHeadlineMs:{values:{dub:100,linear:200,attio:100,raycast:1000}},
 siblingStepMs:{values:{dub:100,attio:100,linear_word:33,commslayer_nav:45,commslayer_msg:90,alignui:75,stripe_digit:50,framer_char:50,dub_chips:75,raycast_cards:80}},
 totalSpanMs:{values:{dub:1500,linear:2800,attio:2400,raycast:2000,resend:1500,commslayer:1420,alignui:750}},
 cssStartRelFcpMs:{values:{dub:-86,raycast:-20,resend:-46,alignui:-26,commslayer:-45,stripe:-31}},
 jsStartRelFcpMs:{values:{linear:547,attio:892,clerk:878,plain:202,framer:124,cursor:2052}},
 headlineResolvedRelFcpMs:{values:{dub:1096,attio:1624,linear:2051,raycast:1005,resend:997},note:'h1 reaches final opacity; sampler tEnd (+-16ms) or declared delay+duration'},
 scrollRevealDurMs:{values:{attio:510,clerk:600,resend:290,raycast:700,commslayer:310,linear:420,framer:400,stripe:572},note:'typical declared duration of text/block reveal animations while scrolling (median of the declared values per site)'},
 revealGroupStepMs:{values:{clerk:50,commslayer:72,alignui:75,raycast:80,framer:100,attio:102},note:'declared delay between siblings in one reveal group'},
 hoverTransitionMs:{values:Object.fromEntries(Object.values(T.sites).filter(s=>s.hover&&s.hover.durMed).map(s=>[s.name,s.hover.durMed]))},
 marqueePxPerSec:{values:{resend:Math.round((4788+32)/180*10)/10,commslayer_clients:Math.round(6332/2/74*10)/10,commslayer_integrations:Math.round(1722/2/36*10)/10,posthog_tools:Math.round(4597/2/45*10)/10},note:'distance = animated translate (px) / duration; widths from element rects; Kaching preset is 40px/s'},
 heroInfiniteAnimsInViewport:{values:Object.fromEntries(Object.entries(extra).map(([n,o])=>[n,o.heroLoops.inViewport]))},
 scrollRevealTriggerVh:{note:'rect.top/viewport height when a declared CSS/WAAPI opacity|transform|filter animation (150-2000ms) was created while scrolling; 11 sites, n=170',median:0.76,p10:0.43,p90:1.02},
 lcpGapMs:{values:Object.fromEntries(Object.values(T.sites).filter(s=>s.lcp).map(s=>[s.name,s.lcp.rel])),note:'LCP time minus FCP time, headless Chromium, no throttling, cold cache'},
};
for(const k of ['entranceDurMs','headlineRisePx','headlineBlurPx','firstHeadlineDelayMs','subAfterHeadlineMs','siblingStepMs','totalSpanMs','cssStartRelFcpMs','jsStartRelFcpMs','headlineResolvedRelFcpMs','scrollRevealDurMs','revealGroupStepMs','hoverTransitionMs','marqueePxPerSec','heroInfiniteAnimsInViewport','lcpGapMs']){const v=Object.values(stats[k].values);stats[k].n=v.length;stats[k].median=med(v);stats[k].range=rng(v);}
// easing census (presence by site)
const easing=[{ease:'ease-out',sites:10},{ease:'spring as linear()',sites:5},{ease:'ease-in-out',sites:5},{ease:'linear',sites:5},{ease:'cubic-bezier(.22,1,.36,1)',sites:4},{ease:'ease',sites:4},{ease:'cubic-bezier(.16,1,.3,1)',sites:3},{ease:'cubic-bezier(.33,1,.68,1)',sites:2},{ease:'cubic-bezier(.215,.61,.355,1)',sites:2},{ease:'cubic-bezier(.25,.1,.35,1)',sites:2}];
// reduced-motion
const rm={};for(const s of Object.values(T.sites)){if(s.reduced){const v=s.reduced.vsNormal,r=s.reduced;rm[s.name]={finiteAnimsNormal:v.finiteAnims,finiteAnimsReduced:r.finiteAnims,reductionPct:v.finiteAnims?Math.round((1-r.finiteAnims/v.finiteAnims)*100):null,infiniteNormal:v.infiniteAnims,infiniteReduced:r.infiniteAnims,translateElsNormal:v.translateEls,translateElsReduced:r.translateEls};}}
// hover2 summary
const hov={};for(const [n,o] of Object.entries(h2)){const p=o.press;hov[n]={cta:p&&p.cta,ctaHoverBgChanged:p?(p.rest.bg!==p.hover.bg):null,ctaTransitionDur:p&&p.hover.td,ctaTransitionEase:p&&p.hover.te,ctaPressTransformAfter250ms:p&&p.down.t,ctaPressScaleProp:p&&p.down.sc,cards:o.cards.filter(c=>!c.error).map(c=>({w:c.w,h:c.h,transformChanged:c.rest.self.t!==c.hov.self.t||c.rest.self.sc!==c.hov.self.sc||c.rest.self.tr!==c.hov.self.tr,shadowChanged:c.rest.self.sh!==c.hov.self.sh,bgChanged:c.rest.self.bg!==c.hov.self.bg,borderChanged:c.rest.self.bc!==c.hov.self.bc,transition:c.hov.self.td+' '+c.hov.self.te+' '+c.hov.self.tp,anims:c.anims.slice(0,4).map(a=>({n:a.n,d:a.d,e:a.e,tg:a.tg,p:a.p}))}))};}
const off=JSON.parse(fs.readFileSync('/tmp/mx_offscreen.json'));const lcpx=JSON.parse(fs.readFileSync('/tmp/mx_lcp.json'));const out={experiments:{lcpOpacityStart:{note:'local page, 72px h1, animation 1000ms cubic-bezier(.16,1,.3,1) translateY(20px)->0, 7 runs each, median ms; Chromium 156',results:lcpx},offscreenPlayback:{note:'scrolled to 55% of page height, 2.5s idle; infinite animations whose target is >150px outside viewport',results:off}},meta:Object.assign({},T.meta,{chromium:'156.0.8078.4 (Playwright 1.64.0)',sites:15,runs:'1 run per site per condition (hero, scroll, tabs, hover, reduced-motion); variance not measured',limitations:['headless Chromium on a fast laptop: absolute LCP/FCP flatter than field data','cookie banners were not dismissed and sometimes overlay the frames','A/B variants and geo variants not controlled','posthog.com scrolls inside a container, so window scroll data is empty','elements outside the viewport (+500px while scrolling) are not sampled','hero t=0 is first-contentful-paint, so CSS animations that started before FCP have negative start times']}),
 curated,stats,easingCensusPresenceBySite:easing,reducedMotion:rm,libraryFingerprints:libs,loopsAndMarquees:extra,hoverPressAndCards:hov,
 aggregate_auto_unfiltered:{note:'auto-computed over every sampled element incl. demo internals; noisy; prefer curated+stats',...T.aggregate},sites:T.sites};
fs.writeFileSync(OUT+'/timings.json',JSON.stringify(out,null,1));
console.log(JSON.stringify(Object.fromEntries(Object.entries(stats).map(([k,v])=>[k,[v.n,v.median,v.range]]))));
console.log(JSON.stringify(rm));
