// Analyse slim timelines: cadence, hours (Europe/Vilnius and US Eastern), format mix, aspect ratios,
// normalised engagement, series/sequencing, captions. Writes data/_analysis.json and prints a digest.
// Usage: node analyze.mjs <dataDir> [ricoClassificationTsv]
import fs from 'node:fs';
import path from 'node:path';

const [dataDir, ricoTsv] = process.argv.slice(2);
const FOUNDERS = ['augustasdesign', 'faulkner_Design', 'marius_vanagas', 'rokasrem'];
const BENCH = ['marcelkargul', 'kargulstudio', '_heyrico'];
const NOW = Date.parse('2026-10-22T23:59:00Z') / 1000;
const DAY = 86400;

const med = a => { const b = a.filter(x => Number.isFinite(x)).sort((x, y) => x - y); if (!b.length) return null; const m = b.length >> 1; return b.length % 2 ? b[m] : (b[m - 1] + b[m]) / 2; };
const q = (a, p) => { const b = a.filter(Number.isFinite).sort((x, y) => x - y); if (!b.length) return null; const i = (b.length - 1) * p; const lo = Math.floor(i), hi = Math.ceil(i); return b[lo] + (b[hi] - b[lo]) * (i - lo); };
const r2 = x => x == null ? null : Math.round(x * 100) / 100;
const mean = a => a.length ? a.reduce((s, x) => s + x, 0) / a.length : null;

const fmtV = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Vilnius', hour: 'numeric', hourCycle: 'h23', weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', minute: '2-digit' });
const fmtE = new Intl.DateTimeFormat('en-GB', { timeZone: 'America/New_York', hour: 'numeric', hourCycle: 'h23' });
function local(ts) {
  const parts = Object.fromEntries(fmtV.formatToParts(new Date(ts * 1000)).map(p => [p.type, p.value]));
  return { hour: Number(parts.hour), minute: Number(parts.minute), weekday: parts.weekday, date: `${parts.year}-${parts.month}-${parts.day}` };
}
const etHour = ts => Number(Object.fromEntries(fmtE.formatToParts(new Date(ts * 1000)).map(p => [p.type, p.value])).hour);

function aspect(w, h) {
  const r = w / h;
  if (r < 0.6) return 'tall-phone(<0.6)';
  if (r < 0.78) return 'portrait-3:4';
  if (r < 0.835) return '4:5';
  if (r < 0.905) return '7:8';
  if (r < 0.95) return 'near-square-portrait';
  if (r <= 1.05) return 'square';
  if (r < 1.2) return 'near-square-landscape';
  if (r < 1.36) return '4:3/5:4';
  if (r < 1.45) return '1.4:1(2880x2070)';
  if (r < 1.55) return '3:2';
  if (r < 1.68) return '16:10';
  if (r < 1.84) return '16:9';
  if (r < 2.3) return '2:1';
  return '3:1-strip';
}
function format(s) {
  const v = s.media.filter(m => m.type === 'video' || m.type === 'gif');
  const p = s.media.filter(m => m.type === 'photo');
  if (v.length && p.length) return 'mixed';
  if (v.length) return v.length > 1 ? 'video-multi' : 'video';
  if (p.length) return p.length === 1 ? 'single' : `${p.length}up`;
  return s.quote ? 'quote-text' : 'text';
}
const isMedia = f => !['text', 'quote-text'].includes(f);

// caption features
function clean(t) { return (t || '').replace(/https?:\/\/\S+/g, '').replace(/@\w+/g, '').trim(); }
function caseOf(t) {
  const c = clean(t).replace(/\bI\b|\bI['’](m|ve|d|ll)\b/g, 'i').replace(/\b[A-Z]{2,}\b/g, '');
  if (!/[a-zA-Z]/.test(c)) return 'none';
  if (!/[A-Z]/.test(c)) return 'lowercase';
  const first = c.match(/[a-zA-Z]/)[0];
  return first === first.toUpperCase() ? 'sentence' : 'mixed';
}
const EMOJI = /\p{Extended_Pictographic}/gu;
const words = t => clean(t).split(/\s+/).filter(w => /[\p{L}\p{N}]/u.test(w));
const HOOKS = {
  'names-thing': /\b(hero|dashboard|component|card|bento|footer|pricing|landing|sidebar|ui|app|section|onboarding|table|modal|chart|graph|mobile|settings|crm|inbox|calendar|menu|nav|navbar|button|logo|branding|identity|website|site|page|screen|product design|interface|widget|form|login|sign ?up|feature|testimonial|faq|changelog|integrations?)s?\b/i,
  'superlative/opinion': /\b(cleanest|best|most|perfect|perfection|too (damn )?clean|next level|insane|incredible|incredibly|so (good|clean)|beautiful|love|lovely|cute|crazy|wild|stunning|gorgeous|elite|ever)\b/i,
  'question': /\?/,
  'before/after': /\b(before|after|vs\.?|versus|wireframe)\b/i,
  'redesign': /\bredesign/i,
  'resource/teach': /\b(free|figma file|template|download|open.?source|cheat ?sheet|steal|blueprint|guide|tips?|how to|lesson|use this|here'?s how|rules?|step)\b/i,
  'number': /\d/,
  'motion': /\b(animat\w*|motion|in motion|moving|move)\b/i,
  'process/story': /\b(2am|session|client|today|yesterday|built|building|designed|working on|shipping|shipped|made|making)\b/i,
  'concept': /\bconcept/i,
  'series-cue': /\b(part \d|pt\.? ?\d|full ?view|fullview|close.?up|zoom|detail(s|ed)?|v\d|version|another day|daily|day \d+|#\d+|№)\b/i,
  'cta/link': /👇|https?:\/\/|\blink\b|dm me|book a call|let'?s talk|hire/i,
};

function load(h) {
  const f = path.join(dataDir, `${h}.json`);
  if (!fs.existsSync(f)) return null;
  return JSON.parse(fs.readFileSync(f));
}

// eras: split originals at gaps >= 30 days; the current era is the last block
function eras(orig) {
  const s = [...orig].sort((a, b) => a.ts - b.ts);
  const out = []; let cur = [];
  for (const x of s) { if (cur.length && x.ts - cur[cur.length - 1].ts > 30 * DAY) { out.push(cur); cur = []; } cur.push(x); }
  if (cur.length) out.push(cur);
  return out.map(e => ({ from: e[0].created.slice(0, 10), to: e[e.length - 1].created.slice(0, 10), n: e.length, ids: new Set(e.map(x => x.id)) }));
}

function engagementTable(posts, key, baseL, baseV, baseB, minN = 1) {
  const g = {};
  for (const s of posts) { const k = key(s); if (k == null) continue; (g[k] ||= []).push(s); }
  const out = {};
  for (const [k, arr] of Object.entries(g)) {
    if (arr.length < minN) continue;
    out[k] = {
      n: arr.length,
      medLikes: med(arr.map(s => s.likes)), medViews: med(arr.map(s => s.views)),
      relLikes: r2(med(arr.map(s => s.likes / baseL))), relViews: baseV ? r2(med(arr.map(s => s.views / baseV))) : null,
      relBookmarks: baseB ? r2(med(arr.map(s => s.bookmarks / baseB))) : null,
      meanRelLikes: r2(mean(arr.map(s => s.likes / baseL))),
    };
  }
  return out;
}

function analyseAccount(h, windowDays) {
  const d = load(h);
  if (!d) return null;
  const all = d.statuses.filter(s => s.author.toLowerCase() === h.toLowerCase());
  const originals = all.filter(s => !s.is_reply);
  const selfReplies = all.filter(s => s.self_reply);
  const repliesOther = all.filter(s => s.is_reply && !s.self_reply);
  const er = eras(originals);
  const current = er[er.length - 1];
  // analysis window: benchmarks = last `windowDays`; founders = current era
  let win;
  if (windowDays) { const from = NOW - windowDays * DAY; win = originals.filter(s => s.ts >= from); }
  else win = originals.filter(s => current.ids.has(s.id));
  const winFrom = Math.min(...win.map(s => s.ts)), winTo = NOW;
  const spanDays = Math.max(1, (winTo - winFrom) / DAY);
  const winSelf = selfReplies.filter(s => s.ts >= winFrom);
  const winOther = repliesOther.filter(s => s.ts >= winFrom);
  for (const s of all) { s._fmt = format(s); s._loc = local(s.ts); s._et = etHour(s.ts); }
  const media = win.filter(s => isMedia(s._fmt));
  const baseL = med(media.map(s => s.likes)) || 1, baseV = med(media.map(s => s.views)) || 1, baseB = med(media.map(s => s.bookmarks)) || 1;
  const baseLAll = med(win.map(s => s.likes)) || 1;
  for (const s of all) { s._rel = s.likes / baseL; s._relV = s.views / baseV; s._relB = s.bookmarks / baseB; }

  // per day and weekday
  const perDate = {};
  for (const s of win) perDate[s._loc.date] = (perDate[s._loc.date] || 0) + 1;
  const daysWithPost = Object.keys(perDate).length;
  const dayCounts = [];
  for (let t = winFrom; t <= winTo; t += DAY) dayCounts.push(perDate[local(t).date] || 0);
  const mediaPerDate = {};
  for (const s of media) mediaPerDate[s._loc.date] = (mediaPerDate[s._loc.date] || 0) + 1;
  const weekday = {};
  for (const s of win) { const w = s._loc.weekday; weekday[w] ||= { n: 0, rel: [] }; weekday[w].n++; if (isMedia(s._fmt)) weekday[w].rel.push(s._rel); }
  for (const w of Object.keys(weekday)) { weekday[w].relLikes = r2(med(weekday[w].rel)); delete weekday[w].rel; }
  // gaps between originals (hours)
  const sorted = [...win].sort((a, b) => a.ts - b.ts);
  const gaps = sorted.slice(1).map((s, i) => (s.ts - sorted[i].ts) / 3600);
  const mediaSorted = [...media].sort((a, b) => a.ts - b.ts);
  const mediaGaps = mediaSorted.slice(1).map((s, i) => (s.ts - mediaSorted[i].ts) / 3600);

  // hours
  const hoursLocal = {}, hoursET = {};
  for (let i = 0; i < 24; i++) { hoursLocal[i] = 0; hoursET[i] = 0; }
  for (const s of win) { hoursLocal[s._loc.hour]++; hoursET[s._et]++; }
  const hourEng = engagementTable(media, s => s._loc.hour, baseL, baseV, baseB);
  const blockEng = engagementTable(media, s => { const b = Math.floor(s._loc.hour / 3) * 3; return `${String(b).padStart(2, '0')}-${String(b + 3).padStart(2, '0')}`; }, baseL, baseV, baseB);
  const bestHours = Object.entries(hourEng).filter(([, v]) => v.n >= 3).sort((a, b) => b[1].relLikes - a[1].relLikes).slice(0, 4).map(([k, v]) => ({ hour: Number(k), ...v }));

  // formats
  const fmtCount = {};
  for (const s of win) fmtCount[s._fmt] = (fmtCount[s._fmt] || 0) + 1;
  const fmtEng = engagementTable(win, s => s._fmt, baseL, baseV, baseB);
  const quoteOwn = win.filter(s => s.quote && (s.quote.author || '').toLowerCase() === h.toLowerCase());
  const quoteOther = win.filter(s => s.quote && (s.quote.author || '').toLowerCase() !== h.toLowerCase());
  // aspect ratios of photos
  const asp = {}, aspEng = {};
  const widths = [];
  for (const s of media) {
    const ph = s.media.filter(m => m.type === 'photo');
    for (const m of ph) { const a = aspect(m.w, m.h); asp[a] = (asp[a] || 0) + 1; widths.push(Math.max(m.w, m.h)); }
    if (ph.length) { const a = aspect(ph[0].w, ph[0].h); (aspEng[a] ||= []).push(s); }
  }
  const aspectEng = {};
  for (const [a, arr] of Object.entries(aspEng)) aspectEng[a] = { n: arr.length, relLikes: r2(med(arr.map(s => s._rel))), relViews: r2(med(arr.map(s => s._relV))) };
  const vids = media.flatMap(s => s.media.filter(m => m.type === 'video' || m.type === 'gif'));
  const vidAsp = {};
  for (const m of vids) { const a = aspect(m.w, m.h); vidAsp[a] = (vidAsp[a] || 0) + 1; }
  const sizes = {};
  for (const s of media) for (const m of s.media) { const k = `${m.type[0]}${m.w}x${m.h}`; sizes[k] = (sizes[k] || 0) + 1; }
  const topSizes = Object.entries(sizes).sort((a, b) => b[1] - a[1]).slice(0, 12);

  // captions
  const cap = win.map(s => ({ s, w: words(s.text).length, c: clean(s.text).length, cs: caseOf(s.text), e: (s.text.match(EMOJI) || []).length, hash: (s.text.match(/#\w+/g) || []).length, link: s.links.filter(l => !/x\.com\/\w+\/status/.test(l)).length > 0 || /https?:\/\/(?!x\.com|twitter\.com)/.test(s.text) }));
  const caseCount = {}; for (const c of cap) caseCount[c.cs] = (caseCount[c.cs] || 0) + 1;
  const hookEng = {};
  for (const [k, re] of Object.entries(HOOKS)) {
    const hit = media.filter(s => re.test(s.text)), miss = media.filter(s => !re.test(s.text));
    if (hit.length) hookEng[k] = { n: hit.length, relLikes: r2(med(hit.map(s => s._rel))), relViews: r2(med(hit.map(s => s._relV))), relLikesWithout: r2(med(miss.map(s => s._rel))) };
  }
  const lenEng = engagementTable(media, s => { const w = words(s.text).length; return w === 0 ? '0' : w <= 3 ? '1-3' : w <= 6 ? '4-6' : w <= 10 ? '7-10' : w <= 20 ? '11-20' : '21+'; }, baseL, baseV, baseB);
  const emojiEng = engagementTable(media, s => ((s.text.match(EMOJI) || []).length ? 'emoji' : 'none'), baseL, baseV, baseB);
  const caseEng = engagementTable(media, s => caseOf(s.text), baseL, baseV, baseB);
  const emojiFreq = {};
  for (const s of win) for (const e of s.text.match(EMOJI) || []) emojiFreq[e] = (emojiFreq[e] || 0) + 1;
  // self-reply link behaviour
  const selfLinks = winSelf.filter(s => s.links.length || /https?:\/\//.test(s.text));
  const withLinkReply = new Set(selfLinks.map(s => s.reply_to?.id));
  const linkReplyEng = engagementTable(media, s => (withLinkReply.has(s.id) ? 'link-in-first-reply' : 'no-link-reply'), baseL, baseV, baseB);
  // vocabulary
  const STOP = new Set('the a an and or of to in on for with is it this that i my me you your we our at by be are was as so just from its it’s it\'s all one de la el y en'.split(' '));
  const vocab = {}, bigram = {};
  for (const s of win) { const ws = words(s.text).map(w => w.toLowerCase().replace(/[^\p{L}\p{N}'’-]/gu, '')).filter(Boolean); ws.forEach((w, i) => { if (!STOP.has(w) && w.length > 1) vocab[w] = (vocab[w] || 0) + 1; if (i) { const b = ws[i - 1] + ' ' + w; bigram[b] = (bigram[b] || 0) + 1; } }); }
  const topVocab = Object.entries(vocab).sort((a, b) => b[1] - a[1]).slice(0, 30);
  const topBigram = Object.entries(bigram).filter(([, n]) => n > 1).sort((a, b) => b[1] - a[1]).slice(0, 20);

  const best = [...win].sort((a, b) => b.likes - a.likes).slice(0, 8).map(s => ({ id: s.id, date: s.created.slice(0, 10), fmt: s._fmt, likes: s.likes, views: s.views, bookmarks: s.bookmarks, rel: r2(s._rel), text: s.text.slice(0, 90), media: s.media.map(m => `${m.type[0]}${m.w}x${m.h}${m.dur ? '/' + m.dur + 's' : ''}`).join(',') }));
  const worst = [...media].sort((a, b) => a._rel - b._rel).slice(0, 5).map(s => ({ id: s.id, date: s.created.slice(0, 10), fmt: s._fmt, likes: s.likes, views: s.views, rel: r2(s._rel), text: s.text.slice(0, 80) }));

  return {
    handle: h, author: d.author, statusesInFile: d.count, range: d.range,
    eras: er.map(e => ({ from: e.from, to: e.to, n: e.n })),
    window: { from: new Date(winFrom * 1000).toISOString().slice(0, 10), to: '2026-10-22', days: r2(spanDays), kind: windowDays ? `last ${windowDays} days` : 'current era' },
    counts: { originals: win.length, media: media.length, selfReplies: winSelf.length, repliesToOthers: winOther.length, quoteOwn: quoteOwn.length, quoteOther: quoteOther.length, selfReposted: win.filter(s => s.self_reposted).length },
    perDay: { originals: r2(win.length / spanDays), media: r2(media.length / spanDays), selfReplies: r2(winSelf.length / spanDays), repliesToOthers: r2(winOther.length / spanDays), daysWithPostShare: r2(daysWithPost / Math.ceil(spanDays)), maxOnOneDay: Math.max(...dayCounts), medianOnPostingDays: med(Object.values(perDate)), mediaMedianOnPostingDays: med(Object.values(mediaPerDate)), mediaMaxOnOneDay: Math.max(0, ...Object.values(mediaPerDate)) },
    gapsHours: { median: r2(med(gaps)), p25: r2(q(gaps, 0.25)), p75: r2(q(gaps, 0.75)), max: r2(Math.max(0, ...gaps)), mediaMedian: r2(med(mediaGaps)), mediaP25: r2(q(mediaGaps, 0.25)), under1h: gaps.filter(g => g < 1).length },
    weekday,
    hoursLocal, hoursET, hourEng, blockEng, bestHours,
    base: { medianLikesMedia: baseL, medianViewsMedia: baseV, medianBookmarksMedia: baseB, medianLikesAll: baseLAll, likesPerView: r2(med(media.filter(s => s.views > 500).map(s => 100 * s.likes / s.views))), bookmarksPerLike: r2(med(media.filter(s => s.likes > 5).map(s => s.bookmarks / s.likes))), medianLikesText: med(win.filter(s => !isMedia(s._fmt)).map(s => s.likes)) },
    formats: { count: fmtCount, share: Object.fromEntries(Object.entries(fmtCount).map(([k, v]) => [k, r2(v / win.length)])), mediaShare: r2(media.length / win.length), engagement: fmtEng },
    aspects: { photos: asp, firstImageEngagement: aspectEng, videos: vidAsp, medianLongEdge: med(widths), topSizes },
    video: { n: vids.length, durMedian: med(vids.map(m => m.dur)), durP25: q(vids.map(m => m.dur), 0.25), durP75: q(vids.map(m => m.dur), 0.75), durs: vids.map(m => m.dur) },
    captions: { medianWords: med(cap.map(c => c.w)), p25Words: q(cap.map(c => c.w), 0.25), p75Words: q(cap.map(c => c.w), 0.75), medianChars: med(cap.map(c => c.c)), medianWordsMedia: med(cap.filter(c => isMedia(c.s._fmt)).map(c => c.w)), case: caseCount, lowercaseShare: r2((caseCount.lowercase || 0) / cap.length), emojiShare: r2(cap.filter(c => c.e).length / cap.length), hashtagShare: r2(cap.filter(c => c.hash).length / cap.length), linkInPostShare: r2(cap.filter(c => c.link).length / cap.length), questionShare: r2(cap.filter(c => /\?/.test(c.s.text)).length / cap.length), emojiFreq: Object.entries(emojiFreq).sort((a, b) => b[1] - a[1]).slice(0, 10), hooks: hookEng, length: lenEng, emoji: emojiEng, caseEngagement: caseEng, selfReplyLinkShare: r2(selfLinks.length / Math.max(1, winSelf.length)), linkReply: linkReplyEng, topVocab, topBigram },
    best, worst,
    _win: win, _media: media, _all: all,
  };
}

// ---------- series detection ----------
function seriesQuotes(acc, handlesSet) {
  // quote posts whose quoted post belongs to this account or to another account in the study set
  const out = [];
  const byId = new Map();
  for (const a of Object.values(acc)) if (a) for (const s of a._all) byId.set(s.id, s);
  for (const a of Object.values(acc)) {
    if (!a) continue;
    for (const s of a._win) {
      if (!s.quote || !s.quote.id) continue;
      const qa = (s.quote.author || '').toLowerCase();
      if (!handlesSet.has(qa)) continue;
      const base = byId.get(s.quote.id);
      const qts = s.quote.created ? Date.parse(s.quote.created) / 1000 : base?.ts;
      if (!qts) continue;
      const qFmt = base ? base._fmt : (s.quote.media?.length ? (s.quote.media.some(m => m.type !== 'photo') ? 'video' : (s.quote.media.length === 1 ? 'single' : s.quote.media.length + 'up')) : 'text');
      out.push({
        by: a.handle, quoted: s.quote.author, self: qa === a.handle.toLowerCase(), id: s.id, quotedId: s.quote.id,
        gapDays: r2((s.ts - qts) / DAY), fromFmt: qFmt, toFmt: s._fmt,
        likes: s.likes, views: s.views, quotedLikes: base?.likes ?? null, quotedViews: base?.views ?? null,
        ratioLikes: base?.likes ? r2(s.likes / base.likes) : null, rel: r2(s._rel), quotedRel: base ? r2(base._rel) : null,
        text: s.text.slice(0, 70), quotedText: (base?.text || s.quote.text || '').slice(0, 60),
      });
    }
  }
  return out;
}

const CUE = /\b(full ?view|fullview|part \d|pt\.? ?\d|close.?up|zoom(ed)?|animated|in motion|motion version|now animated|v2|version 2|light (mode|version)|dark (mode|version)|mobile version|same (design|one|ui)|again|remake|reworked|update[d]?|continued|more (screens|of)|another (angle|view|look))\b/i;
function captionCues(a) {
  return a._win.filter(s => CUE.test(s.text)).map(s => ({ id: s.id, date: s.created.slice(0, 10), fmt: s._fmt, rel: r2(s._rel), likes: s.likes, text: s.text.slice(0, 90), quote: s.quote ? s.quote.author : null }));
}

// threads: self-reply chains that add media
function threads(a) {
  const roots = {};
  for (const s of a._all) if (s.self_reply && s.thread_root) (roots[s.thread_root] ||= []).push(s);
  const out = [];
  for (const [root, reps] of Object.entries(roots)) {
    const r = a._all.find(s => s.id === root);
    if (!r || r.ts < Math.min(...a._win.map(x => x.ts))) continue;
    out.push({ root, date: r.created.slice(0, 10), rootFmt: r._fmt, replies: reps.length, mediaReplies: reps.filter(x => x.media.length).length, linkReplies: reps.filter(x => x.links.length || /https?:\/\//.test(x.text)).length, firstReplyMinutes: r2(Math.min(...reps.map(x => (x.ts - r.ts) / 60))), rootLikes: r.likes, rel: r2(r._rel), text: r.text.slice(0, 60), firstReply: reps.sort((x, y) => x.ts - y.ts)[0].text.slice(0, 80) });
  }
  return out.sort((x, y) => y.replies - x.replies);
}

// same-dimension sets: posts in one account sharing an uncommon exact media size within 21 days
function dimSeries(a, list) {
  const posts = list || a._media;
  const groups = {};
  for (const s of posts) {
    const k = [...new Set(s.media.map(m => `${m.w}x${m.h}`))].sort().join('+');
    (groups[k] ||= []).push(s);
  }
  const out = [];
  for (const [k, arr] of Object.entries(groups)) {
    if (arr.length < 2) continue;
    const share = arr.length / posts.length;
    if (share > 0.12 && arr.length > 3) continue; // a house export size, not a series
    const s = [...arr].sort((x, y) => x.ts - y.ts);
    const gaps = s.slice(1).map((x, i) => r2((x.ts - s[i].ts) / DAY));
    out.push({ size: k, n: arr.length, dates: s.map(x => x.created.slice(0, 10)), gapsDays: gaps, likes: s.map(x => x.likes), rels: s.map(x => r2(x._relEra ?? x._rel)), fmts: s.map(x => x._fmt), texts: s.map(x => x.text.slice(0, 40)) });
  }
  return out.sort((x, y) => y.n - x.n).slice(0, 25);
}

// Rico: near-duplicate image clusters from heyrico-x/img-classification.tsv (dHash clusters)
function ricoClusters(a, tsv) {
  if (!tsv || !fs.existsSync(tsv) || !a) return null;
  const rows = fs.readFileSync(tsv, 'utf8').trim().split('\n').slice(1).map(l => l.split('\t'));
  const posts = new Map(a._all.map(s => [s.id, s]));
  const cl = {};
  const products = {};
  for (const r of rows) {
    const [file, pid, likes, views, bm, kind, mode, size, cluster, dup, note, date] = r;
    (cl[cluster] ||= new Map()).set(pid, { pid, likes: +likes, views: +views, kind, note });
    const prod = (note.match(/\b(Alpaca|Aster|Scout|Langdock|Twin|Marketer|Clay|Attio|Linear|Stripe|Notion|ClickUp|Blackbox|Ramp|Mercury|Opus)\b/) || [])[1];
    if (prod) (products[prod] ||= new Map()).set(pid, { pid, likes: +likes });
  }
  const reuse = [];
  for (const [c, m] of Object.entries(cl)) {
    if (m.size < 2) continue;
    const arr = [...m.values()].map(x => ({ ...x, ts: posts.get(x.pid)?.ts, rel: posts.get(x.pid)?._rel, fmt: posts.get(x.pid)?._fmt })).filter(x => x.ts).sort((x, y) => x.ts - y.ts);
    if (arr.length < 2) continue;
    reuse.push({ cluster: c, n: arr.length, gapsDays: arr.slice(1).map((x, i) => r2((x.ts - arr[i].ts) / DAY)), likes: arr.map(x => x.likes), rels: arr.map(x => r2(x.rel)), kind: arr[0].kind });
  }
  const gaps2 = reuse.map(r => r.gapsDays[0]);
  const ratio2 = reuse.filter(r => r.likes[0] > 0).map(r => r.likes[1] / r.likes[0]);
  const ratio3 = reuse.filter(r => r.n >= 3 && r.likes[0] > 0).map(r => r.likes[2] / r.likes[0]);
  const relFirst = reuse.map(r => r.rels[0]), relSecond = reuse.map(r => r.rels[1]);
  // gap buckets
  const buckets = { '<=3d': [], '4-14d': [], '15-30d': [], '31-60d': [], '>60d': [] };
  for (const r of reuse) { const g = r.gapsDays[0]; const b = g <= 3 ? '<=3d' : g <= 14 ? '4-14d' : g <= 30 ? '15-30d' : g <= 60 ? '31-60d' : '>60d'; buckets[b].push(r.likes[0] ? r.likes[1] / r.likes[0] : null); }
  return {
    clustersReused: reuse.length,
    firstReuseGapDays: { median: med(gaps2), p25: q(gaps2, 0.25), p75: q(gaps2, 0.75) },
    secondVsFirstLikes: { median: r2(med(ratio2)), p25: r2(q(ratio2, 0.25)), p75: r2(q(ratio2, 0.75)) },
    thirdVsFirstLikes: { n: ratio3.length, median: r2(med(ratio3)) },
    relFirstMedian: r2(med(relFirst)), relSecondMedian: r2(med(relSecond)),
    byGap: Object.fromEntries(Object.entries(buckets).map(([k, v]) => [k, { n: v.length, medianRatio: r2(med(v.filter(x => x != null))) }])),
    products: Object.fromEntries(Object.entries(products).map(([k, m]) => { const arr = [...m.values()].map(x => ({ ...x, ts: posts.get(x.pid)?.ts })).filter(x => x.ts).sort((x, y) => x.ts - y.ts); const g = arr.slice(1).map((x, i) => (x.ts - arr[i].ts) / DAY); return [k, { posts: arr.length, medianGapDays: r2(med(g)), spanDays: arr.length ? r2((arr[arr.length - 1].ts - arr[0].ts) / DAY) : 0, likes: arr.map(x => x.likes) }]; })),
    sample: reuse.sort((x, y) => y.n - x.n).slice(0, 12),
  };
}

// ---------- run ----------
const acc = {};
for (const h of BENCH) acc[h] = analyseAccount(h, h === '_heyrico' ? 60 : h === 'kargulstudio' ? 365 : 30);
for (const h of FOUNDERS) acc[h] = analyseAccount(h, null);
const set = new Set([...BENCH, ...FOUNDERS].map(x => x.toLowerCase()));
const quotes = seriesQuotes(acc, set);
const series = {};
for (const [h, a] of Object.entries(acc)) if (a) series[h] = { cues: captionCues(a), threads: threads(a).slice(0, 15), dims: dimSeries(a) };
const rico = ricoClusters(acc._heyrico, ricoTsv);

// founders also over their full history (all eras), for format multipliers with more n
const foundersAll = {};
for (const h of FOUNDERS) {
  const a = acc[h]; if (!a) continue;
  const orig = a._all.filter(s => !s.is_reply);
  const er = eras(orig);
  foundersAll[h] = er.map(e => {
    const arr = orig.filter(s => e.ids.has(s.id));
    const media = arr.filter(s => isMedia(s._fmt));
    const bl = med(media.map(s => s.likes)) || 1, bv = med(media.map(s => s.views)) || 1;
    for (const p of arr) { p._relEra = p.likes / bl; p._relVEra = p.views / bv; }
    const blk = {}, wd = {};
    for (const p of media) { const b = Math.floor(p._loc.hour / 3) * 3; (blk[b] ||= []).push(p); (wd[p._loc.weekday] ||= []).push(p); }
    const tab = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, { n: v.length, relLikes: r2(med(v.map(x => x._relEra))), relViews: r2(med(v.map(x => x._relVEra))) }]));
    const bumped = media.filter(p => p.self_reposted), notB = media.filter(p => !p.self_reposted);
    const lags = bumped.map(p => p.bump_lag_hours?.[0]).filter(x => x != null);
    const days = Math.max(1, (Date.parse(e.to) - Date.parse(e.from)) / 86400000 + 1);
    const selfR = a._all.filter(s => s.self_reply && s.ts >= Date.parse(e.from) / 1000 && s.ts <= Date.parse(e.to) / 1000 + DAY);
    const linkRoots = new Set(selfR.filter(x => x.links.length || /https?:\/\//.test(x.text)).map(x => x.reply_to?.id));
    const lr = media.filter(p => linkRoots.has(p.id)), nlr = media.filter(p => !linkRoots.has(p.id));
    return { linkReply: { n: lr.length, relLikes: r2(med(lr.map(x => x._relEra))), relViews: r2(med(lr.map(x => x._relVEra))), nWithout: nlr.length, relLikesWithout: r2(med(nlr.map(x => x._relEra))), relViewsWithout: r2(med(nlr.map(x => x._relVEra))) }, from: e.from, to: e.to, originals: arr.length, perDay: r2(arr.length / days), mediaShare: r2(media.length / Math.max(1, arr.length)), medianLikesMedia: bl, medianViewsMedia: bv, selfReplies: selfR.length, selfReplyLinks: selfR.filter(s => s.links.length || /https?:\/\//.test(s.text)).length, hourBlocks: tab(blk), weekdays: tab(wd), bumps: { share: r2(bumped.length / Math.max(1, media.length)), lagLowerMedianH: med(lags), relLikesBumped: r2(med(bumped.map(x => x._relEra))), relLikesNot: r2(med(notB.map(x => x._relEra))), relViewsBumped: r2(med(bumped.map(x => x._relVEra))), relViewsNot: r2(med(notB.map(x => x._relVEra))) }, formats: engagementTable(arr, s => s._fmt, bl, bv, 1), hours: Object.entries(arr.reduce((m, s) => (m[s._loc.hour] = (m[s._loc.hour] || 0) + 1, m), {})).sort((x, y) => y[1] - x[1]).slice(0, 5) };
  });
}

for (const h of [...FOUNDERS, ...BENCH]) { const a = acc[h]; if (!a) continue; series[h].dimsAll = dimSeries(a, a._all.filter(s => !s.is_reply && isMedia(s._fmt))); }

// pooled normalised engagement by format and hour block
function pooled(list) {
  const posts = list.flatMap(h => acc[h] ? acc[h]._media.concat(acc[h]._win.filter(s => !isMedia(s._fmt))) : []);
  const g = {}, hb = {}, hr = {};
  for (const s of posts) {
    (g[s._fmt] ||= []).push(s);
    if (isMedia(s._fmt)) { const b = Math.floor(s._loc.hour / 3) * 3; (hb[b] ||= []).push(s); (hr[s._loc.hour] ||= []).push(s); }
  }
  const t = o => Object.fromEntries(Object.entries(o).map(([k, arr]) => [k, { n: arr.length, relLikes: r2(med(arr.map(s => s._rel))), relViews: r2(med(arr.map(s => s._relV))), relBookmarks: r2(med(arr.map(s => s._relB))) }]));
  return { byFormat: t(g), byHourBlockLocal: t(hb), byHourLocal: t(hr) };
}
const pool = { benchmarks: pooled(BENCH), founders: pooled(FOUNDERS), all: pooled([...BENCH, ...FOUNDERS]) };

const strip = a => { if (!a) return null; const { _win, _media, _all, ...rest } = a; return rest; };
const out = { generated: '2026-10-22', timezone: 'Europe/Vilnius', accounts: Object.fromEntries(Object.entries(acc).map(([k, v]) => [k, strip(v)])), foundersEras: foundersAll, pooled: pool, quotes, series, rico };
fs.writeFileSync(path.join(dataDir, '_analysis.json'), JSON.stringify(out, null, 1));

// digest
for (const [h, a] of Object.entries(acc)) {
  if (!a) { console.log(h, 'MISSING'); continue; }
  console.log(`\n== ${h} | followers ${a.author?.followers} | window ${a.window.from}..${a.window.to} (${a.window.kind}, ${a.window.days} d) | eras ${a.eras.map(e => e.from + '..' + e.to + ':' + e.n).join(' ')}`);
  console.log(' counts', JSON.stringify(a.counts), '\n perDay', JSON.stringify(a.perDay), '\n gapsH', JSON.stringify(a.gapsHours));
  console.log(' base', JSON.stringify(a.base));
  console.log(' formats', JSON.stringify(a.formats.share), '\n fmtEng', JSON.stringify(a.formats.engagement));
  console.log(' aspects', JSON.stringify(a.aspects.photos), 'vid', JSON.stringify(a.aspects.videos), 'longEdge', a.aspects.medianLongEdge, '\n aspEng', JSON.stringify(a.aspects.firstImageEngagement));
  console.log(' topSizes', JSON.stringify(a.aspects.topSizes));
  console.log(' video', a.video.n, 'dur med', a.video.durMedian, 'p25', a.video.durP25, 'p75', a.video.durP75);
  console.log(' hoursLocal', JSON.stringify(a.hoursLocal));
  console.log(' blockEng', JSON.stringify(a.blockEng));
  console.log(' bestHours', JSON.stringify(a.bestHours.map(b => [b.hour, b.n, b.relLikes, b.relViews])));
  console.log(' weekday', JSON.stringify(a.weekday));
  const c = a.captions;
  console.log(' captions words med', c.medianWords, 'p25', c.p25Words, 'p75', c.p75Words, 'chars', c.medianChars, 'mediaWords', c.medianWordsMedia, 'case', JSON.stringify(c.case), 'emoji', c.emojiShare, 'hash', c.hashtagShare, 'link', c.linkInPostShare, 'q', c.questionShare, 'selfReplyLink', c.selfReplyLinkShare);
  console.log(' emojiFreq', JSON.stringify(c.emojiFreq));
  console.log(' hooks', JSON.stringify(c.hooks));
  console.log(' length', JSON.stringify(Object.fromEntries(Object.entries(c.length).map(([k, v]) => [k, [v.n, v.relLikes, v.relViews]]))));
  console.log(' emojiEng', JSON.stringify(Object.fromEntries(Object.entries(c.emoji).map(([k, v]) => [k, [v.n, v.relLikes, v.relViews]]))), 'caseEng', JSON.stringify(Object.fromEntries(Object.entries(c.caseEngagement).map(([k, v]) => [k, [v.n, v.relLikes, v.relViews]]))), 'linkReply', JSON.stringify(Object.fromEntries(Object.entries(c.linkReply).map(([k, v]) => [k, [v.n, v.relLikes, v.relViews]]))));
  console.log(' vocab', c.topVocab.map(x => x.join(':')).join(' '));
  console.log(' bigram', c.topBigram.map(x => x.join(':')).join(' | '));
  console.log(' best'); for (const b of a.best) console.log('  ', b.date, b.fmt, b.likes, b.views, b.bookmarks, 'rel', b.rel, b.media, JSON.stringify(b.text));
  console.log(' worst'); for (const b of a.worst) console.log('  ', b.date, b.fmt, b.likes, b.views, 'rel', b.rel, JSON.stringify(b.text));
}
console.log('\n== foundersEras'); for (const [h, e] of Object.entries(foundersAll)) for (const x of e) { console.log(h, x.from, x.to, 'n', x.originals, 'perDay', x.perDay, 'media', x.mediaShare, 'medL', x.medianLikesMedia, 'medV', x.medianViewsMedia, 'selfR', x.selfReplies, 'links', x.selfReplyLinks, 'hours', JSON.stringify(x.hours), JSON.stringify(Object.fromEntries(Object.entries(x.formats).map(([k, v]) => [k, [v.n, v.relLikes, v.relViews]])))); console.log('   blocks', JSON.stringify(x.hourBlocks), '\n   weekdays', JSON.stringify(x.weekdays), '\n   bumps', JSON.stringify(x.bumps), 'linkReply', JSON.stringify(x.linkReply)); }
console.log('\n== pooled'); for (const [k, p] of Object.entries(pool)) { console.log(k, 'fmt', JSON.stringify(p.byFormat)); console.log(k, 'hourBlock', JSON.stringify(p.byHourBlockLocal)); }
console.log('\n== quotes (series via quote)'); for (const x of quotes) console.log(x.by, '->', x.quoted, x.self ? 'self' : 'cross', 'gapD', x.gapDays, x.fromFmt, '->', x.toFmt, 'likes', x.likes, 'vs', x.quotedLikes, 'ratio', x.ratioLikes, 'rel', x.rel, '/', x.quotedRel, JSON.stringify(x.text), '<=', JSON.stringify(x.quotedText));
console.log('\n== caption cues'); for (const [h, s] of Object.entries(series)) for (const c of s.cues) console.log(h, c.date, c.fmt, c.likes, 'rel', c.rel, c.quote ? 'Q@' + c.quote : '', JSON.stringify(c.text));
console.log('\n== threads'); for (const [h, s] of Object.entries(series)) for (const t of s.threads.slice(0, 8)) console.log(h, t.date, t.rootFmt, 'replies', t.replies, 'mediaR', t.mediaReplies, 'linkR', t.linkReplies, 'firstMin', t.firstReplyMinutes, 'rel', t.rel, JSON.stringify(t.text), '=>', JSON.stringify(t.firstReply));
console.log('\n== dim series (all captured originals)'); for (const [h, s] of Object.entries(series)) for (const t of (s.dimsAll || []).slice(0, 14)) console.log(h, t.size, 'n', t.n, JSON.stringify(t.dates), 'gaps', JSON.stringify(t.gapsDays), 'likes', JSON.stringify(t.likes), 'rels', JSON.stringify(t.rels), JSON.stringify(t.fmts), JSON.stringify(t.texts));
if (rico) { console.log('\n== rico clusters'); const { sample, ...r } = rico; console.log(JSON.stringify(r, null, 0)); for (const x of sample) console.log(JSON.stringify(x)); }
