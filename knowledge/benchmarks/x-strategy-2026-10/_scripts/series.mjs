// Series / sequencing statistics: own-quote chains (a new post quoting an earlier one of the same author),
// still -> motion follow-ups, close-up -> full pairs, and a compact media log per account for reading series by eye.
// Usage: node series.mjs <dataDir> [--log handle]
import fs from 'node:fs';
import path from 'node:path';

const [dataDir, flag, logHandle] = process.argv.slice(2);
const HANDLES = ['marcelkargul', 'kargulstudio', '_heyrico', 'augustasdesign', 'faulkner_Design', 'marius_vanagas', 'rokasrem'];
const DAY = 86400;
const med = a => { const b = a.filter(Number.isFinite).sort((x, y) => x - y); if (!b.length) return null; const m = b.length >> 1; return b.length % 2 ? b[m] : (b[m - 1] + b[m]) / 2; };
const q = (a, p) => { const b = a.filter(Number.isFinite).sort((x, y) => x - y); if (!b.length) return null; const i = (b.length - 1) * p, lo = Math.floor(i), hi = Math.ceil(i); return b[lo] + (b[hi] - b[lo]) * (i - lo); };
const r2 = x => x == null ? null : Math.round(x * 100) / 100;
const fmt = s => { const v = s.media.filter(m => m.type !== 'photo'), p = s.media.filter(m => m.type === 'photo'); if (v.length && p.length) return 'mixed'; if (v.length) return 'video'; if (p.length) return p.length === 1 ? 'single' : p.length + 'up'; return s.quote ? 'quote-text' : 'text'; };
const isMedia = f => !['text', 'quote-text'].includes(f);

const all = {};
for (const h of HANDLES) { const f = path.join(dataDir, `${h}.json`); if (fs.existsSync(f)) all[h] = JSON.parse(fs.readFileSync(f)); }
const byId = new Map();
for (const d of Object.values(all)) for (const s of d.statuses) { s._fmt = fmt(s); byId.set(s.id, s); }

if (flag === '--log') {
  const d = all[logHandle];
  const orig = d.statuses.filter(s => !s.is_reply).sort((a, b) => a.ts - b.ts);
  for (const s of orig) {
    const loc = new Date(s.ts * 1000).toLocaleString('en-GB', { timeZone: 'Europe/Vilnius', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    const qq = s.quote ? ` Q@${s.quote.author}:${s.quote.id ? (byId.get(s.quote.id)?.created.slice(5, 10) || '?') : '?'}` : '';
    console.log(`${loc} ${s._fmt.padEnd(10)} ${s.media.map(m => `${m.type[0]}${m.w}x${m.h}${m.dur ? '/' + m.dur : ''}`).join(',').padEnd(34)} L${String(s.likes).padStart(5)} V${String(s.views).padStart(7)} B${String(s.bookmarks).padStart(5)}${qq} | ${s.text.replace(/\s+/g, ' ').slice(0, 95)}`);
  }
  process.exit(0);
}

const out = {};
for (const [h, d] of Object.entries(all)) {
  const own = d.statuses.filter(s => !s.is_reply);
  const media = own.filter(s => isMedia(s._fmt));
  const base = med(media.map(s => s.likes)) || 1, baseV = med(media.map(s => s.views)) || 1;
  const qOwn = own.filter(s => s.quote && (s.quote.author || '').toLowerCase() === h.toLowerCase());
  const qOwnMedia = qOwn.filter(s => isMedia(s._fmt));
  const notQ = media.filter(s => !s.quote);
  const gaps = qOwn.map(s => { const b = byId.get(s.quote.id); const t = s.quote.created ? Date.parse(s.quote.created) / 1000 : b?.ts; return t ? (s.ts - t) / DAY : null; }).filter(x => x != null && x >= 0);
  // is the quoted post the author's immediately previous original? (a chain)
  const sorted = [...own].sort((a, b) => a.ts - b.ts);
  const prevMedia = new Map(); let last = null;
  for (const s of sorted) { prevMedia.set(s.id, last); if (isMedia(s._fmt)) last = s; }
  const chain = qOwn.filter(s => { const p = prevMedia.get(s.id); return p && p.id === s.quote.id; }).length;
  // transitions (quoted fmt -> quoting fmt)
  const trans = {};
  for (const s of qOwn) { const b = byId.get(s.quote.id); const from = b ? b._fmt : (s.quote.media?.length ? (s.quote.media.some(m => m.type !== 'photo') ? 'video' : (s.quote.media.length === 1 ? 'single' : s.quote.media.length + 'up')) : 'text'); const k = `${isMedia(from) ? (from === 'video' ? 'video' : 'still') : 'text'}->${isMedia(s._fmt) ? (s._fmt === 'video' ? 'video' : 'still') : 'text'}`; (trans[k] ||= []).push({ rel: s.likes / base, relV: s.views / baseV, ratio: b?.likes ? s.likes / b.likes : null, gap: b ? (s.ts - b.ts) / DAY : null }); }
  const transOut = Object.fromEntries(Object.entries(trans).map(([k, v]) => [k, { n: v.length, relLikes: r2(med(v.map(x => x.rel))), relViews: r2(med(v.map(x => x.relV))), likesVsQuoted: r2(med(v.map(x => x.ratio))), gapDaysMedian: r2(med(v.map(x => x.gap))) }]));
  // still -> motion: video posts whose caption or quote ties them to an earlier still of the same author
  const motion = own.filter(s => s._fmt === 'video' && s.quote && (s.quote.author || '').toLowerCase() === h.toLowerCase()).map(s => { const b = byId.get(s.quote.id); return { id: s.id, gap: b ? r2((s.ts - b.ts) / DAY) : null, likes: s.likes, quotedLikes: b?.likes, quotedFmt: b?._fmt, text: s.text.slice(0, 50) }; });
  out[h] = {
    originals: own.length, media: media.length,
    ownQuotes: qOwn.length, ownQuoteShareOfOriginals: r2(qOwn.length / Math.max(1, own.length)), ownQuoteMedia: qOwnMedia.length,
    chainShare: r2(chain / Math.max(1, qOwn.length)),
    gapDays: { median: r2(med(gaps)), p25: r2(q(gaps, 0.25)), p75: r2(q(gaps, 0.75)), under1: gaps.filter(g => g < 1).length, d1to3: gaps.filter(g => g >= 1 && g <= 3).length, over3: gaps.filter(g => g > 3).length },
    relLikesQuotingMedia: r2(med(qOwnMedia.map(s => s.likes / base))), relLikesNotQuotingMedia: r2(med(notQ.map(s => s.likes / base))),
    relViewsQuotingMedia: r2(med(qOwnMedia.map(s => s.views / baseV))), relViewsNotQuotingMedia: r2(med(notQ.map(s => s.views / baseV))),
    transitions: transOut, motionFollowUps: motion,
  };
}
console.log(JSON.stringify(out, null, 1));
fs.writeFileSync(path.join(dataDir, '_series.json'), JSON.stringify(out, null, 1));
