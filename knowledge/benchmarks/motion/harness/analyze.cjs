const fs = require('fs'), path = require('path');
const OUT = '/Users/augustas/dev/design-engine/knowledge/benchmarks/motion';
const files = fs.readdirSync(path.join(OUT, 'raw')).filter((f) => f.endsWith('.json') && !f.startsWith('_'));

const med = (a) => { a = a.filter((x) => Number.isFinite(x)).sort((x, y) => x - y); if (!a.length) return null; const m = a.length >> 1; return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2; };
const rng = (a) => { a = a.filter((x) => Number.isFinite(x)); return a.length ? [Math.min(...a), Math.max(...a)] : null; };
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);

function parseTf(s) {
  if (!s || s === 'none') return { tx: 0, ty: 0, sc: 1, rot: 0 };
  let m = s.match(/matrix3d\(([^)]+)\)/);
  if (m) { const v = m[1].split(',').map(Number); return { tx: v[12], ty: v[13], sc: Math.hypot(v[0], v[1]), rot: Math.atan2(v[1], v[0]) * 180 / Math.PI }; }
  m = s.match(/matrix\(([^)]+)\)/);
  if (m) { const v = m[1].split(',').map(Number); return { tx: v[4], ty: v[5], sc: Math.hypot(v[0], v[1]), rot: Math.atan2(v[1], v[0]) * 180 / Math.PI }; }
  return { tx: 0, ty: 0, sc: 1, rot: 0 };
}
const blur = (f) => { const m = (f || '').match(/blur\(([\d.]+)px\)/); return m ? parseFloat(m[1]) : 0; };

// cubic-bezier solver
function bez(x1, y1, x2, y2) {
  return (x) => {
    if (x <= 0) return 0; if (x >= 1) return 1;
    let lo = 0, hi = 1, t = x;
    for (let i = 0; i < 40; i++) { const cx = 3 * x1 * t * (1 - t) ** 2 + 3 * x2 * t * t * (1 - t) + t ** 3; if (cx < x) lo = t; else hi = t; t = (lo + hi) / 2; }
    return 3 * y1 * t * (1 - t) ** 2 + 3 * y2 * t * t * (1 - t) + t ** 3;
  };
}
const CURVES = { linear: (x) => x, ease: bez(0.25, 0.1, 0.25, 1), 'ease-out': bez(0, 0, 0.58, 1), 'ease-in-out': bez(0.42, 0, 0.58, 1), outCubic: bez(0.215, 0.61, 0.355, 1), outQuart: bez(0.165, 0.84, 0.44, 1), outQuint: bez(0.22, 1, 0.36, 1), outExpo: bez(0.16, 1, 0.3, 1), 'vercel-ish(0.16,1,0.3,1)': null, 'kaching-reveal(.26,.32,.14,1)': bez(0.26, 0.32, 0.14, 1), 'accordion(.32,.72,0,1)': bez(0.32, 0.72, 0, 1), inOutQuint: bez(0.83, 0, 0.17, 1) };
delete CURVES['vercel-ish(0.16,1,0.3,1)'];

function interp(pts, x) { // pts [[x,y]] sorted by x
  if (x <= pts[0][0]) return pts[0][1]; if (x >= pts[pts.length - 1][0]) return pts[pts.length - 1][1];
  for (let i = 1; i < pts.length; i++) if (pts[i][0] >= x) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i]; return y0 + (y1 - y0) * (x - x0) / (x1 - x0 || 1); }
}

// Analyse one element series -> descriptor or null
function analyseEl(e, fcp) {
  const S = e.series; if (S.length < 3) return null;
  const op = S.map((s) => parseFloat(s[1])), tf = S.map((s) => parseTf(s[2])), bl = S.map((s) => blur(s[3]));
  const clip = S.map((s) => s[4]);
  const rngOf = (a) => Math.max(...a) - Math.min(...a);
  const props = [];
  if (rngOf(op) > 0.02) props.push('opacity');
  if (rngOf(tf.map((t) => t.ty)) > 0.4) props.push('translateY');
  if (rngOf(tf.map((t) => t.tx)) > 0.4) props.push('translateX');
  if (rngOf(tf.map((t) => t.sc)) > 0.004) props.push('scale');
  if (rngOf(tf.map((t) => t.rot)) > 0.5) props.push('rotate');
  if (rngOf(bl) > 0.2) props.push('blur');
  if (new Set(clip).size > 3) props.push('clip-path');
  if (!props.length) return null;
  // dominant series
  let dom = null, name = null;
  const cand = { opacity: op, translateY: tf.map((t) => t.ty), translateX: tf.map((t) => t.tx), scale: tf.map((t) => t.sc), blur: bl, rotate: tf.map((t) => t.rot) };
  for (const p of ['opacity', 'translateY', 'scale', 'blur', 'translateX', 'rotate']) if (props.includes(p)) { dom = cand[p]; name = p; break; }
  if (!dom) { dom = op; name = props[0]; }
  const t0 = S[0][0], tS = S[1][0], tE = S[S.length - 1][0];
  // reversals
  let rev = 0, lastD = 0; for (let i = 1; i < dom.length; i++) { const d = dom[i] - dom[i - 1]; if (Math.abs(d) < 1e-4) continue; const s = Math.sign(d); if (lastD && s !== lastD) rev++; lastD = s; }
  const v0 = dom[0], v1 = dom[dom.length - 1];
  // progress curve from first change to last change
  const span = tE - tS; let p25 = null, p50 = null, fit = null, fitErr = null;
  if (span > 80 && Math.abs(v1 - v0) > 1e-3 && rev === 0) {
    const pts = S.slice(1).map((s, i) => [(s[0] - tS) / span, (dom[i + 1] - v0) / (v1 - v0)]);
    pts.unshift([0, 0]);
    p25 = interp(pts, 0.25); p50 = interp(pts, 0.5);
    let best = null; for (const [n, f] of Object.entries(CURVES)) { let se = 0, c = 0; for (let k = 0.05; k < 1; k += 0.05) { const d = interp(pts, k) - f(k); se += d * d; c++; } const rm = Math.sqrt(se / c); if (best == null || rm < best[1]) best = [n, rm]; }
    fit = best[0]; fitErr = r1(best[1] * 100) / 100;
  }
  return {
    id: e.id, role: e.role, desc: e.desc, rect: e.rect, parent: e.parent, props, dom: name,
    from: { opacity: r1(op[0]), ty: r1(tf[0].ty), tx: r1(tf[0].tx), sc: Math.round(tf[0].sc * 1000) / 1000, blur: r1(bl[0]), rot: r1(tf[0].rot) },
    to: { opacity: r1(op[op.length - 1]), ty: r1(tf[tf.length - 1].ty), tx: r1(tf[tf.length - 1].tx), sc: Math.round(tf[tf.length - 1].sc * 1000) / 1000, blur: r1(bl[bl.length - 1]), rot: r1(tf[tf.length - 1].rot) },
    tStart: Math.round(tS - fcp), tEnd: Math.round(tE - fcp), dur: Math.round(span), n: S.length, reversals: rev, loop: rev >= 2, p25: p25 == null ? null : Math.round(p25 * 100) / 100, p50: p50 == null ? null : Math.round(p50 * 100) / 100, fit, fitErr,
    trig: e.r0 ? Math.round(e.r0[0] / e.r0[1] * 100) / 100 : null, rise: Math.abs(tf[0].ty - tf[tf.length - 1].ty),
    startedBeforeTrack: t0 < 0,
  };
}

function staggers(list, key = 'tStart') {
  // group by parent, need >=3 siblings with same dom prop, start cluster 5ms
  const byP = {}; list.forEach((x) => { (byP[x.parent] = byP[x.parent] || []).push(x); });
  const out = [];
  for (const [p, arr] of Object.entries(byP)) {
    if (arr.length < 3) continue;
    const starts = [...new Set(arr.map((a) => Math.round(a[key] / 6) * 6))].sort((a, b) => a - b);
    if (starts.length < 3) continue;
    const d = []; for (let i = 1; i < starts.length; i++) d.push(starts[i] - starts[i - 1]);
    out.push({ parent: p, n: starts.length, step: med(d), diffs: d.slice(0, 8), roles: [...new Set(arr.map((a) => a.role))].join('+'), sample: arr[0].desc.slice(0, 40) });
  }
  return out;
}

function easingOf(a) {
  let e = a.easing; if ((e === 'linear' || !e) && a.kfEasing && a.kfEasing !== 'linear') e = a.kfEasing;
  return e;
}

const sites = {};
for (const f of files) {
  const r = JSON.parse(fs.readFileSync(path.join(OUT, 'raw', f), 'utf8'));
  const name = r.name; const o = { name, url: r.url, title: r.title, error: r.error || null };
  if (r.error || !r.hero) { sites[name] = o; continue; }
  const H = r.hero, fcp = H.fcp || 0;
  o.fcp = Math.round(fcp); o.lcp = H.lcp ? { t: Math.round(H.lcp.t), el: H.lcp.el, rel: Math.round(H.lcp.t - fcp) } : null;
  o.film = r.film;
  const els = H.els.map((e) => analyseEl(e, fcp)).filter(Boolean);
  const nonLoop = els.filter((e) => !e.loop && e.tEnd < 4400);
  o.hero = {
    animatedEls: els.length, loopEls: els.filter((e) => e.loop).length,
    firstMotion: nonLoop.length ? Math.min(...nonLoop.map((e) => e.tStart)) : null,
    lastSettle: nonLoop.length ? Math.max(...nonLoop.map((e) => e.tEnd)) : null,
    byRole: {},
    events: nonLoop.sort((a, b) => a.tStart - b.tStart).slice(0, 80).map(({ id, ...x }) => x),
    staggers: staggers(nonLoop.filter((e) => e.props.includes('opacity') || e.props.includes('translateY'))),
  };
  ['nav', 'h1', 'copy', 'cta', 'visual', 'h2', 'other'].forEach((role) => {
    const a = nonLoop.filter((e) => e.role === role); if (!a.length) return;
    o.hero.byRole[role] = { n: a.length, tStartMin: Math.min(...a.map((x) => x.tStart)), tStartMed: med(a.map((x) => x.tStart)), durMed: med(a.map((x) => x.dur)), riseMed: med(a.map((x) => x.rise).filter((x) => x > 0)), blurMax: Math.max(...a.map((x) => x.from.blur)), scaleFromMin: Math.min(...a.map((x) => x.from.sc)) };
  });
  // CSS/WAAPI animations in hero
  const an = H.anims.filter((a) => a.iterations !== 'Infinity' && a.type !== 'CSSTransition');
  const tr = H.anims.filter((a) => a.type === 'CSSTransition');
  const inf = H.anims.filter((a) => a.iterations === 'Infinity');
  o.heroAnims = {
    total: H.anims.length, cssAnimations: H.anims.filter((a) => a.type === 'CSSAnimation').length, transitions: tr.length, waapi: H.anims.filter((a) => a.type === "Animation").length, infiniteCount: inf.length, scrollTimeline: H.anims.filter((a) => a.tl && a.tl !== 'DocumentTimeline').length,
    finite: an.slice(0, 60).map((a) => ({ type: a.type, name: a.name, role: a.role, target: a.target.slice(0, 40), delay: a.delay, duration: a.duration, easing: easingOf(a), props: a.props.slice(0, 6), from: a.from, to: a.to, startRelFcp: a.startTime != null ? Math.round(a.startTime - fcp) : Math.round(a.t - fcp), fill: a.fill })),
    transitionsSample: tr.slice(0, 20).map((a) => ({ name: a.name, duration: a.duration, easing: a.easing, delay: a.delay, target: a.target.slice(0, 30) })),
    infinite: inf.slice(0, 20).map((a) => ({ type: a.type, name: a.name, role: a.role, target: a.target.slice(0, 40), duration: a.duration, easing: easingOf(a), props: a.props.slice(0, 5), from: a.from, to: a.to, rect: a.rect, direction: a.direction, delay: a.delay })),
  };
  o.heroWapiCalls = H.wapi.slice(0, 40).map((w) => ({ t: Math.round(w.t - fcp), target: w.target.slice(0, 36), kf: w.kf.slice(0, 160), opts: w.opts }));
  // LCP opacity-0 check
  if (H.lcp && H.lcp.chain) {
    const ids = new Set(H.lcp.chain); let minOp = 1, who = null;
    H.els.forEach((e) => { if (ids.has(e.id)) { const o0 = parseFloat(e.series[0][1]); if (o0 < minOp) { minOp = o0; who = e.desc; } } });
    // also anim from opacity 0 on chain: check anims
    o.lcpOpacityCheck = { minInitialOpacityOnChain: minOp, who, lcpRelFcp: Math.round(H.lcp.t - fcp) };
  }
  // scroll
  if (r.scroll && r.scroll.dump) {
    const D = r.scroll.dump; D.anims = D.anims.filter((a) => a.ps !== "finished"); const marks = D.marks; const m0 = marks[0] ? marks[0].t : 0;
    const sEls = D.els.map((e) => { const a = analyseEl(e, m0); return a; }).filter(Boolean);
    const reveals = sEls.filter((e) => !e.loop && (e.props.includes('opacity') || e.props.includes('translateY') || e.props.includes('blur') || e.props.includes('clip-path') || e.props.includes('scale')) && e.dur < 3000 && e.n < 120);
    const scrub = sEls.filter((e) => e.n >= 25 && e.dur >= 600 && !e.loop);
    o.scroll = {
      steps: r.scroll.steps.length, pageHeight: D.docH, animatedEls: sEls.length, revealLike: reveals.length, scrubLike: scrub.length, loopEls: sEls.filter((e) => e.loop).length,
      reveals: reveals.slice(0, 70).map(({ id, ...x }) => x),
      staggers: staggers(reveals),
      numberTickers: D.texts.map((t) => ({ desc: t.desc, from: t.series[0][1], to: t.series[t.series.length - 1][1], steps: t.series.length, dur: Math.round(t.series[t.series.length - 1][0] - t.series[1][0]) })).filter((t) => t.from !== t.to).slice(0, 12),
      anims: {
        total: D.anims.length, css: D.anims.filter((a) => a.type === 'CSSAnimation').length, transitions: D.anims.filter((a) => a.type === 'CSSTransition').length, waapi: D.anims.filter((a) => a.type === 'Animation').length,
        scrollDriven: D.anims.filter((a) => a.tl && a.tl !== 'DocumentTimeline').length,
        finite: D.anims.filter((a) => a.iterations !== 'Infinity' && a.type !== 'CSSTransition' && a.duration > 100).slice(0, 50).map((a) => ({ type: a.type, name: a.name, role: a.role, target: a.target.slice(0, 36), delay: a.delay, duration: a.duration, easing: easingOf(a), props: a.props.slice(0, 5), from: a.from, to: a.to, tl: a.tl, trigTop: a.rect && a.vh ? Math.round(a.rect[1] / a.vh * 100) / 100 : null })),
        infinite: D.anims.filter((a) => a.iterations === 'Infinity').slice(0, 25).map((a) => ({ type: a.type, name: a.name, target: a.target.slice(0, 40), duration: a.duration, easing: easingOf(a), props: a.props.slice(0, 4), from: a.from, to: a.to, rect: a.rect, direction: a.direction })),
      },
      wapi: D.wapi.slice(0, 30).map((w) => ({ target: w.target.slice(0, 30), kf: w.kf.slice(0, 140), opts: w.opts })),
    };
  }
  // tabs
  if (r.tabs) {
    o.tabs = { count: r.tabs.tabs, trials: (r.tabs.trials || []).map((t) => {
      if (t.error) return { index: t.index, error: t.error };
      const D = t.dump; D.anims = D.anims.filter((a) => a.ps !== "finished"); const m0 = (D.marks.find((m) => m.n === 'click') || { t: 0 }).t;
      const els = D.els.map((e) => analyseEl(e, m0)).filter(Boolean);
      return { index: t.index, animatedEls: els.length, events: els.filter((e) => !e.loop).sort((a, b) => a.tStart - b.tStart).slice(0, 14).map(({ id, ...x }) => ({ role: x.role, desc: x.desc.slice(0, 36), rect: x.rect, props: x.props, tStart: x.tStart, tEnd: x.tEnd, dur: x.dur, from: x.from, to: x.to, fit: x.fit })), anims: D.anims.filter((a) => a.duration > 0).slice(0, 12).map((a) => ({ type: a.type, name: a.name, target: a.target.slice(0, 30), delay: a.delay, duration: a.duration, easing: easingOf(a), props: a.props.slice(0, 4), start: Math.round(a.t - m0) })), wapi: D.wapi.slice(0, 5).map((w) => ({ target: w.target.slice(0, 30), kf: w.kf.slice(0, 120), opts: w.opts, start: Math.round(w.t - m0) })) };
    }) };
  }
  // hover
  if (r.hover) {
    const cen = r.hover.census; const durs = []; const eases = {};
    (cen.sample || []).forEach((c) => { c.dur.split(',').forEach((d) => { const v = parseFloat(d) * (d.includes('ms') ? 1 : 1000); if (v > 0) durs.push(v); }); c.ease.split(/,(?![^(]*\))/).forEach((e) => { e = e.trim(); eases[e] = (eases[e] || 0) + 1; }); });
    o.hover = { clickables: cen.total, withTransition: cen.withTransition, durMed: med(durs), durRange: rng(durs), easeHistogram: Object.entries(eases).sort((a, b) => b[1] - a[1]).slice(0, 5), props: [...new Set((cen.sample || []).map((c) => c.props))].slice(0, 6), tests: r.hover.hovers.map((h) => ({ target: h.target, anims: h.anims.filter((a) => a.type === "CSSTransition").slice(0, 6), movedEls: h.els.slice(0, 4), wapi: h.wapi.slice(0, 2) })) };
  }
  // reduced
  if (r.reduced) {
    const rf = r.reduced.fcp || 0; const re = r.reduced.els.map((e) => analyseEl(e, rf)).filter(Boolean);
    const reNL = re.filter((e) => !e.loop && e.tEnd < 4400);
    o.reduced = { animatedEls: re.length, loopEls: re.filter((e) => e.loop).length, translateEls: re.filter((e) => e.props.some((p) => /translate|scale|rotate|blur/.test(p))).length, opacityOnlyEls: re.filter((e) => e.props.length === 1 && e.props[0] === 'opacity').length, infiniteAnims: r.reduced.anims.filter((a) => a.iterations === 'Infinity').length, finiteAnims: r.reduced.anims.filter((a) => a.iterations !== 'Infinity' && a.type !== 'CSSTransition').length, vsNormal: { animatedEls: els.length, loopEls: o.hero.loopEls, translateEls: els.filter((e) => e.props.some((p) => /translate|scale|rotate|blur/.test(p))).length, infiniteAnims: inf.length, finiteAnims: an.length } };
  }
  sites[name] = o;
}

// aggregates
const agg = {};
const A = (k, v) => { (agg[k] = agg[k] || []).push(v); };
for (const s of Object.values(sites)) {
  if (!s.hero) continue;
  if (s.hero.firstMotion != null) A('hero.firstMotionMs', s.hero.firstMotion);
  if (s.hero.lastSettle != null) A('hero.lastSettleMs', s.hero.lastSettle);
  for (const [role, v] of Object.entries(s.hero.byRole)) { A(`hero.${role}.tStartMin`, v.tStartMin); if (v.durMed) A(`hero.${role}.durMed`, v.durMed); if (v.riseMed) A(`hero.${role}.riseMed`, v.riseMed); }
  s.hero.staggers.forEach((g) => A('hero.staggerStep', g.step));
  s.heroAnims.finite.filter((a) => a.type === 'CSSAnimation' && a.duration >= 200 && a.duration <= 3000 && a.props.some((p) => /opacity|transform/.test(p))).forEach((a) => { A('hero.cssAnimDur', a.duration); if (a.delay) A('hero.cssAnimDelay', a.delay); });
  s.hero.events.forEach((e) => { if (e.dur >= 150 && e.p25 != null && e.props.includes('opacity')) { A('hero.fitDur', e.dur); } if (e.fit) A('hero.fit:' + e.fit, 1); });
  if (s.scroll) { s.scroll.reveals.forEach((e) => { if (e.dur >= 150) { A('scroll.revealDur', e.dur); if (e.rise > 0.5) A('scroll.revealRise', e.rise); if (e.trig != null && e.trig > 0 && e.trig < 1.2) A('scroll.trigger', e.trig); if (e.fit) A('scroll.fit:' + e.fit, 1); } }); s.scroll.staggers.forEach((g) => A('scroll.staggerStep', g.step)); }
  if (s.hover && s.hover.durMed) A('hover.durMed', s.hover.durMed);
}
const aggOut = {}; for (const [k, v] of Object.entries(agg)) aggOut[k] = { n: v.length, median: r1(med(v)), min: r1(Math.min(...v)), max: r1(Math.max(...v)), p: k.startsWith('hero.fit:') || k.startsWith('scroll.fit:') ? v.length : undefined };
fs.writeFileSync(path.join(OUT, 'timings.json'), JSON.stringify({ meta: { generated: new Date().toISOString(), viewport: '1440x900 dpr1', method: 'Playwright Chromium headless; rAF sampler of computed opacity/transform/filter/clip-path per element + document.getAnimations() + Element.animate patch; t=0 is first-contentful-paint; screencast filmstrip', notes: ['tStart = first frame where computed value differs; tEnd = last frame where it changes; +/- one frame (~16ms)', 'elements tracked in viewport only (hero) / viewport+500px (scroll)', 'filtered: loops (>=2 direction reversals) and anything ending after 4.4s are excluded from hero choreography'] }, aggregate: aggOut, sites }, null, 1));
console.log('sites', Object.keys(sites).length);
