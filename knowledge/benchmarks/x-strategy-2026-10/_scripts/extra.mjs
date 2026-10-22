// Extra cuts used in knowledge/x/x-strategy.md: multi-image subtypes (vertical thirds, portrait pairs),
// US-Eastern hour blocks, first-reply timing, same-day posting load, link placement, caption case by era.
// Usage: node extra.mjs <dataDir>
import fs from 'node:fs';
import path from 'node:path';

const dataDir = process.argv[2];
const H = ['marcelkargul', 'kargulstudio', '_heyrico', 'augustasdesign', 'faulkner_Design', 'rokasrem'];
const med = a => { const b = a.filter(Number.isFinite).sort((x, y) => x - y); if (!b.length) return null; const m = b.length >> 1; return b.length % 2 ? b[m] : (b[m - 1] + b[m]) / 2; };
const r2 = x => x == null ? null : Math.round(x * 100) / 100;
const hourIn = (ts, tz) => Number(new Intl.DateTimeFormat('en-GB', { timeZone: tz, hour: 'numeric', hourCycle: 'h23' }).format(new Date(ts * 1000)));
const dateIn = (ts, tz) => new Intl.DateTimeFormat('en-CA', { timeZone: tz }).format(new Date(ts * 1000));
const WINDOW = { marcelkargul: ['2026-09-23', '2026-10-23'], kargulstudio: ['2026-09-01', '2026-10-23'], _heyrico: ['2026-08-24', '2026-10-23'], augustasdesign: ['2026-08-20', '2026-10-23'], faulkner_Design: ['2026-08-01', '2026-10-23'], rokasrem: ['2026-10-01', '2026-10-23'] };
const ERA1 = ['2025-07-19', '2026-03-05'];

function sub(s) {
  const ph = s.media.filter(m => m.type === 'photo'), v = s.media.filter(m => m.type !== 'photo');
  if (v.length) return v.length > 1 || ph.length ? 'video+' : 'video';
  if (!ph.length) return s.quote ? 'quote-text' : 'text';
  const r = ph.map(m => m.w / m.h);
  const same = ph.every(m => m.w === ph[0].w && m.h === ph[0].h);
  if (ph.length === 1) return r[0] < 0.95 ? 'single-portrait' : r[0] <= 1.05 ? 'single-square' : 'single-landscape';
  if (ph.length === 3) return r.every(x => x < 0.62) ? '3up-vertical-thirds' : '3up-other';
  if (ph.length === 2) return r.every(x => x >= 0.78 && x <= 0.92) ? '2up-portrait-pair(4:5-7:8)' : r.every(x => x < 0.78) ? '2up-tall' : '2up-landscape';
  if (ph.length === 4) return same ? '4up-same-size' : '4up-mixed';
  return ph.length + 'up';
}

const out = {};
const pool = {};
for (const h of H) {
  const f = path.join(dataDir, `${h}.json`); if (!fs.existsSync(f)) continue;
  const d = JSON.parse(fs.readFileSync(f));
  const [from, to] = WINDOW[h];
  const inWin = s => s.created.slice(0, 10) >= from && s.created.slice(0, 10) < to;
  const own = d.statuses.filter(s => !s.is_reply);
  const eraSets = h === 'augustasdesign' ? { current: own.filter(inWin), era1: own.filter(s => s.created.slice(0, 10) >= ERA1[0] && s.created.slice(0, 10) < ERA1[1]) } : { current: own.filter(inWin) };
  out[h] = {};
  for (const [era, posts] of Object.entries(eraSets)) {
    const media = posts.filter(s => s.media.length);
    const base = med(media.map(s => s.likes)) || 1, baseV = med(media.map(s => s.views)) || 1;
    const g = {};
    for (const s of media) { const k = sub(s); (g[k] ||= []).push(s); (pool[k] ||= []).push({ rel: s.likes / base, relV: s.views / baseV, h }); }
    const subtypes = Object.fromEntries(Object.entries(g).map(([k, v]) => [k, { n: v.length, relLikes: r2(med(v.map(s => s.likes / base))), relViews: r2(med(v.map(s => s.views / baseV))) }]));
    // US Eastern blocks
    const et = {};
    for (const s of media) { const b = Math.floor(hourIn(s.ts, 'America/New_York') / 3) * 3; (et[b] ||= []).push(s); }
    const etBlocks = Object.fromEntries(Object.entries(et).map(([k, v]) => [`${String(k).padStart(2, '0')}-${String(+k + 3).padStart(2, '0')} ET`, { n: v.length, relLikes: r2(med(v.map(s => s.likes / base))), relViews: r2(med(v.map(s => s.views / baseV))) }]));
    // Vilnius exact slot minutes (scheduling signature)
    const mins = {};
    for (const s of posts) { const t = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Vilnius', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).format(new Date(s.ts * 1000)); const k = t.slice(0, 2) + ':' + (Number(t.slice(3)) < 15 ? '00' : Number(t.slice(3)) < 45 ? '30' : '00+'); mins[k] = (mins[k] || 0) + 1; }
    const topSlots = Object.entries(mins).sort((a, b) => b[1] - a[1]).slice(0, 8);
    // same-day load: media posts per local day vs engagement of the 1st, 2nd, 3rd+ post that day
    const byDay = {};
    for (const s of [...media].sort((a, b) => a.ts - b.ts)) (byDay[dateIn(s.ts, 'Europe/Vilnius')] ||= []).push(s);
    const ord = { first: [], second: [], third: [], 'fourth+': [] };
    for (const arr of Object.values(byDay)) arr.forEach((s, i) => ord[i === 0 ? 'first' : i === 1 ? 'second' : i === 2 ? 'third' : 'fourth+'].push(s.likes / base));
    const dayLoad = {};
    for (const arr of Object.values(byDay)) { const k = arr.length >= 4 ? '4+' : String(arr.length); (dayLoad[k] ||= []).push(med(arr.map(s => s.likes / base))); }
    // first self-reply timing and link placement
    const selfR = d.statuses.filter(s => s.self_reply && posts.some(p => p.id === s.reply_to?.id));
    const firstMin = {};
    for (const r of selfR) { const root = posts.find(p => p.id === r.reply_to.id); const m = (r.ts - root.ts) / 60; if (!(r.reply_to.id in firstMin) || m < firstMin[r.reply_to.id]) firstMin[r.reply_to.id] = m; }
    const linkInPost = media.filter(s => /https?:\/\/(?!x\.com|twitter\.com)/.test(s.text) || s.links.some(l => !/x\.com|twitter\.com/.test(l)));
    // caption case
    const lc = posts.filter(s => { const t = s.text.replace(/https?:\/\/\S+|@\w+/g, '').replace(/\bI\b|\bI['’]\w+/g, 'i'); return /[a-z]/i.test(t) && !/[A-Z]/.test(t); }).length;
    out[h][era] = {
      posts: posts.length, media: media.length, baseLikes: base, baseViews: baseV,
      subtypes, etBlocks, topSlots,
      nthPostOfDay: Object.fromEntries(Object.entries(ord).map(([k, v]) => [k, { n: v.length, relLikes: r2(med(v)) }])),
      dayLoad: Object.fromEntries(Object.entries(dayLoad).map(([k, v]) => [k, { days: v.length, medianRelLikes: r2(med(v)) }])),
      selfReplyRoots: Object.keys(firstMin).length, firstReplyMinutesMedian: r2(med(Object.values(firstMin))),
      linkInPost: { n: linkInPost.length, relLikes: r2(med(linkInPost.map(s => s.likes / base))), relViews: r2(med(linkInPost.map(s => s.views / baseV))) },
      lowercaseShare: r2(lc / Math.max(1, posts.length)),
    };
  }
}
out._pooledSubtypes = Object.fromEntries(Object.entries(pool).map(([k, v]) => [k, { n: v.length, accounts: [...new Set(v.map(x => x.h))].length, relLikes: r2(med(v.map(x => x.rel))), relViews: r2(med(v.map(x => x.relV))) }]));
fs.writeFileSync(path.join(dataDir, '_extra.json'), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 0).replace(/\},"/g, '},\n"'));
