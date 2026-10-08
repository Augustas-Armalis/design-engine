(() => {
  if (window.__mx) return;
  const M = window.__mx = { els: new Map(), ids: new WeakMap(), seq: 0, marks: [], anims: [], wapi: [], seenAnim: new WeakSet(), active: new Set(), tact: new Set(), texts: new Map(), fcp: null, lcp: null, extend: 0, phase: 'load', infinite: [] };
  const now = () => performance.now();
  const SKIP = {SCRIPT:1,STYLE:1,HEAD:1,META:1,LINK:1,NOSCRIPT:1,BR:1,TITLE:1,PATH:1,LINE:1,CIRCLE:1,RECT:1,DEFS:1,STOP:1,G:0};
  const desc = (el) => {
    if (!el || !el.tagName) return String(el);
    let s = el.tagName.toLowerCase();
    if (el.id) s += '#' + el.id;
    const c = typeof el.className === 'string' ? el.className.trim().split(/\s+/).slice(0, 2).join('.') : '';
    if (c) s += '.' + c.slice(0, 40);
    let t = ''; for (const n of el.childNodes) if (n.nodeType === 3) t += n.textContent; t = t.trim().replace(/\s+/g, ' ').slice(0, 24);
    if (t) s += ' "' + t + '"';
    return s;
  };
  const role = (el) => {
    const r = el.getBoundingClientRect();
    if (el.closest('h1')) return 'h1';
    if (el.closest('header,nav')) return 'nav';
    if (el.closest('h2,h3')) return 'h2';
    if (el.closest('a,button,[role=button]')) return 'cta';
    if (/^(IMG|VIDEO|CANVAS|PICTURE|SVG)$/i.test(el.tagName) || (r.width > 260 && r.height > 160)) return 'visual';
    if (el.closest('p')) return 'copy';
    return 'other';
  };
  try { new PerformanceObserver((l) => { for (const e of l.getEntries()) if (e.name === 'first-contentful-paint') M.fcp = e.startTime; }).observe({ type: 'paint', buffered: true }); } catch (e) {}
  try { new PerformanceObserver((l) => { const es = l.getEntries(); const e = es[es.length - 1]; if (!e) return; const chain = []; let n = e.element; while (n && n.tagName) { track(n, true); chain.push(M.ids.get(n)); n = n.parentElement; } M.lcp = { t: e.startTime, el: e.element ? desc(e.element) : null, size: e.size, chain }; }).observe({ type: 'largest-contentful-paint', buffered: true }); } catch (e) {}
  const cstate = (el) => { const cs = getComputedStyle(el); return [cs.opacity, cs.transform, cs.filter, cs.clipPath]; };
  function track(el, force) {
    if (M.ids.has(el)) return M.ids.get(el);
    const id = ++M.seq; M.ids.set(el, id);
    const r = el.getBoundingClientRect();
    const st = cstate(el);
    M.els.set(id, { id, el, desc: desc(el), role: role(el), rect: [Math.round(r.left), Math.round(r.top + scrollY), Math.round(r.width), Math.round(r.height)], parent: el.parentElement && M.ids.get(el.parentElement) || null, series: [[now()].concat(st)], r0: null, last: st.join('|') });
    M.active.add(id); return id;
  }
  const numRe = /^[\s$€£+\-−~<]?\d[\d,.\s]*\s?[%kKmMbBx+×]?$/;
  function gather() {
    const vh = innerHeight, ext = M.extend;
    const all = document.querySelectorAll('*'); let added = 0;
    for (const el of all) {
      if (SKIP[el.tagName.toUpperCase()] || M.ids.has(el) && !M.tseen) { }
      if (SKIP[el.tagName.toUpperCase()]) continue;
      if (M.ids.has(el)) continue;
      if (M.els.size > 4500) break;
      const r = el.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      if (r.bottom < -ext || r.top > vh + ext) continue;
      track(el); added++;
    }
    // drop far-away elements from the active set
    for (const id of [...M.active]) { const e = M.els.get(id); if (!e.el.isConnected) { M.active.delete(id); continue; } const r = e.el.getBoundingClientRect(); if (r.bottom < -ext - 600 || r.top > vh + ext + 600) M.active.delete(id); }
    for (const el of all) {
      if (el.children.length || M.texts.has(el)) continue;
      const t = el.textContent.trim();
      if (t.length > 0 && t.length < 14 && numRe.test(t)) { const r = el.getBoundingClientRect(); if (r.width > 0 && r.bottom > -ext && r.top < vh + ext) { M.texts.set(el, { desc: desc(el), series: [[now(), t]], last: t }); M.tact.add(el); } }
    }
  }
  const origAnimate = Element.prototype.animate;
  Element.prototype.animate = function (kf, opts) { try { M.wapi.push({ t: now(), target: desc(this), kf: JSON.stringify(kf).slice(0, 360), opts: typeof opts === 'number' ? { duration: opts } : JSON.parse(JSON.stringify(opts || {})) }); if (M.wapi.length > 600) M.wapi.shift(); } catch (e) {} return origAnimate.apply(this, arguments); };
  const KEEP = { opacity: 1, transform: 1, filter: 1, clipPath: 1, translate: 1, scale: 1, rotate: 1, backgroundColor: 1, color: 1, borderColor: 1, boxShadow: 1, width: 1, height: 1, strokeDashoffset: 1, backgroundPosition: 1 };
  function pollAnims() {
    let list; try { list = document.getAnimations(); } catch (e) { return; }
    for (const a of list) {
      if (M.seenAnim.has(a)) continue; M.seenAnim.add(a);
      if (M.anims.length > 700) continue;
      try {
        const eff = a.effect, tg = eff && eff.target; const tm = eff && eff.getTiming ? eff.getTiming() : {};
        let kf = []; try { kf = eff.getKeyframes(); } catch (e) {}
        const props = new Set(); const from = {}, to = {};
        kf.forEach((k, i) => { for (const p in k) { if (p === 'offset' || p === 'computedOffset' || p === 'composite') continue; if (p === 'easing') continue; props.add(p); if (i === 0) from[p] = String(k[p]).slice(0, 80); if (i === kf.length - 1) to[p] = String(k[p]).slice(0, 80); } });
        const r = tg && tg.getBoundingClientRect ? tg.getBoundingClientRect() : { left: 0, top: 0, width: 0, height: 0 };
        M.anims.push({ t: now(), type: a.constructor.name, name: a.animationName || a.transitionProperty || a.id || null, target: desc(tg), role: tg && tg.getBoundingClientRect ? role(tg) : null, startTime: a.startTime, delay: tm.delay, duration: tm.duration, endDelay: tm.endDelay, easing: tm.easing, iterations: tm.iterations === Infinity ? 'Infinity' : tm.iterations, direction: tm.direction, fill: tm.fill, props: [...props], from, to, nkf: kf.length, kfEasing: kf[0] && kf[0].easing, rect: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)], vh: innerHeight, ps: a.playState, ct: a.currentTime, tl: a.timeline && a.timeline.constructor.name });
      } catch (e) {}
    }
  }
  let lastGather = 0, frame = 0;
  function loop() {
    const t = now(); frame++;
    if (t - lastGather > (M.phase === 'load' && t < 3000 ? 80 : 250)) { try { gather(); } catch (e) {} lastGather = t; }
    for (const id of M.active) {
      const e = M.els.get(id); if (!e.el.isConnected) continue;
      const st = cstate(e.el), k = st.join('|');
      if (k !== e.last) { e.last = k; if (!e.r0) { const r = e.el.getBoundingClientRect(); e.r0 = [Math.round(r.top), innerHeight]; } if (e.series.length < 400) e.series.push([t].concat(st)); }
    }
    for (const el of M.tact) { const o = M.texts.get(el), tx = el.textContent.trim(); if (tx !== o.last) { o.last = tx; if (o.series.length < 200) o.series.push([t, tx]); } }
    pollAnims();
    requestAnimationFrame(loop);
  }
  M.mark = (n, extra) => M.marks.push(Object.assign({ n, t: now(), y: scrollY }, extra || {}));
  M.reset = (phase, extend) => { M.phase = phase; M.extend = extend || 0; for (const [id, e] of M.els) { e.series = [[now()].concat(cstate(e.el))]; e.last = cstate(e.el).join('|'); e.r0 = null; } M.anims = []; M.wapi = []; M.seenAnim = new WeakSet(); M.texts = new Map(); M.tact = new Set(); M.marks = []; gather(); };
  M.dump = () => {
    const els = []; for (const [id, e] of M.els) if (e.series.length >= 2) els.push({ id, desc: e.desc, role: e.role, rect: e.rect, parent: e.parent, series: e.series, r0: e.r0 });
    const texts = []; for (const [el, o] of M.texts) if (o.series.length >= 2) texts.push(o);
    return { els, texts, anims: M.anims, wapi: M.wapi, marks: M.marks, fcp: M.fcp, lcp: M.lcp, tracked: M.els.size, origin: performance.timeOrigin, now: now(), docH: document.documentElement.scrollHeight };
  };
  requestAnimationFrame(loop);
})();
