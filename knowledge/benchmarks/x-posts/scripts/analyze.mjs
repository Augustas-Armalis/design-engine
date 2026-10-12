import fs from 'node:fs';
const dir = process.argv[2];
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json') && !f.startsWith('_'));
const med = a => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const pct = (n, d) => d ? Math.round(100 * n / d) : 0;
const ratioName = r => { const c = [[16/9,'16:9'],[3/2,'3:2'],[4/3,'4:3'],[5/4,'5:4'],[1,'1:1'],[4/5,'4:5'],[3/4,'3:4'],[9/16,'9:16'],[2,'2:1'],[7/8,'7:8'],[1.91,'1.91:1']]; let best = c[0]; for (const x of c) if (Math.abs(Math.log(r / x[0])) < Math.abs(Math.log(r / best[0]))) best = x; return Math.abs(Math.log(r/best[0]))<0.04?best[1]:r.toFixed(2); };
const summary = {}; const global = { kinds: {}, ratios: {}, imgN: {}, vidDur: [], words: [], lower: 0, hash: 0, link: 0, emoji: 0, q: 0, n: 0, top: [] , ext: {}, widths: []};
for (const f of files) {
  const d = JSON.parse(fs.readFileSync(`${dir}/${f}`));
  const h = d.handle;
  const own = d.statuses.filter(s => !s.reposted_by && (s.author_handle || '').toLowerCase() === h.toLowerCase());
  const orig = own.filter(s => !s.replying_to || (s.replying_to?.screen_name || s.replying_to)?.toString().toLowerCase() === h.toLowerCase());
  const replies = own.filter(s => s.replying_to && (s.replying_to?.screen_name || '').toLowerCase() !== h.toLowerCase());
  const selfThreads = own.filter(s => s.replying_to && (s.replying_to?.screen_name || '').toLowerCase() === h.toLowerCase());
  const kinds = {}; const ratios = {}; const vd = []; const words = []; let lower = 0, hash = 0, link = 0, emoji = 0, q = 0; const likes = [], views = [], bm = [];
  const posts = [];
  for (const s of orig) {
    const m = s.media?.all || [];
    const nImg = m.filter(x => x.type === 'photo').length, nVid = m.filter(x => x.type === 'video').length, nGif = m.filter(x => x.type === 'gif').length;
    let kind = !m.length ? (s.quote ? 'quote-text' : 'text') : nVid && !nImg && !nGif ? (nVid > 1 ? `video x${nVid}` : 'video') : nGif && !nImg && !nVid ? 'gif' : nImg && !nVid && !nGif ? `image x${nImg}` : 'mixed';
    if (s.quote && m.length) kind += '+quote';
    kinds[kind] = (kinds[kind] || 0) + 1; global.kinds[kind] = (global.kinds[kind] || 0) + 1;
    if (nImg) { global.imgN[nImg] = (global.imgN[nImg] || 0) + 1; }
    for (const x of m) { if (x.width && x.height) { const rn = ratioName(x.width / x.height) + (x.type === 'photo' ? '' : ' (' + x.type + ')'); ratios[rn] = (ratios[rn] || 0) + 1; global.ratios[rn] = (global.ratios[rn] || 0) + 1; global.widths.push(x.width); } if (x.duration) { vd.push(x.duration); global.vidDur.push(x.duration); } const ext = (x.url || '').match(/\.(jpg|png|mp4|webp|gif)/)?.[1]; if (ext) global.ext[ext] = (global.ext[ext] || 0) + 1; }
    const t = (s.text || '').trim();
    const w = t ? t.split(/\s+/).length : 0; words.push(w); global.words.push(w);
    if (t && t[0] === t[0].toLowerCase() && /[a-z]/.test(t[0])) { lower++; global.lower++; }
    if (/#\w/.test(t)) { hash++; global.hash++; }
    if (/https?:\/\//.test(t)) { link++; global.link++; }
    if (/\p{Extended_Pictographic}/u.test(t)) { emoji++; global.emoji++; }
    if (/\?/.test(t)) { q++; global.q++; }
    global.n++;
    likes.push(s.likes || 0); views.push(s.views || 0); bm.push(s.bookmarks || 0);
    posts.push({ id: s.id, kind, likes: s.likes, views: s.views, bookmarks: s.bookmarks, replies: s.replies, text: t.slice(0, 160), w, media: m.map(x => `${x.type} ${x.width}x${x.height}${x.duration ? ' ' + x.duration.toFixed(1) + 's' : ''}`), created: s.created_at });
    global.top.push({ h, id: s.id, kind, likes: s.likes, views: s.views, bm: s.bookmarks, text: t.slice(0, 120) });
  }
  posts.sort((a, b) => (b.likes || 0) - (a.likes || 0));
  const dates = own.map(s => s.created_timestamp).filter(Boolean);
  const spanDays = dates.length ? (Math.max(...dates) - Math.min(...dates)) / 86400 : 0;
  summary[h] = { name: d.author?.name, followers: d.author?.followers, bio: d.author?.description, fetched: own.length, original: orig.length, replies: replies.length, selfThread: selfThreads.length, postsPerDay: spanDays ? +(own.length / spanDays).toFixed(1) : null, kinds, ratios, vidDurMedian: med(vd), vidDurRange: vd.length ? [Math.min(...vd).toFixed(1), Math.max(...vd).toFixed(1)] : null, wordsMedian: med(words), lowerPct: pct(lower, orig.length), hashtagPct: pct(hash, orig.length), linkPct: pct(link, orig.length), emojiPct: pct(emoji, orig.length), questionPct: pct(q, orig.length), likesMedian: med(likes), viewsMedian: med(views), bookmarksMedian: med(bm), top: posts.slice(0, 6), bottom: posts.slice(-3) };
}
global.top.sort((a, b) => (b.likes || 0) - (a.likes || 0));
const G = { ...global, vidDurMedian: med(global.vidDur), vidDurP: [0.1,0.25,0.5,0.75,0.9].map(p => { const s=[...global.vidDur].sort((a,b)=>a-b); return s.length? +s[Math.floor(p*(s.length-1))].toFixed(1):null; }), wordsMedian: med(global.words), wordsP: [0.25,0.5,0.75,0.9].map(p=>{const s=[...global.words].sort((a,b)=>a-b);return s[Math.floor(p*(s.length-1))]}), widthMedian: med(global.widths), top: global.top.slice(0, 40), lowerPct: pct(global.lower, global.n), hashtagPct: pct(global.hash, global.n), linkPct: pct(global.link, global.n), emojiPct: pct(global.emoji, global.n), questionPct: pct(global.q, global.n) };
delete G.vidDur; delete G.words; delete G.widths;
fs.writeFileSync(`${dir}/_summary.json`, JSON.stringify({ generated: new Date().toISOString(), global: G, designers: summary }, null, 1));
for (const [h, s] of Object.entries(summary)) console.log(h, s.followers, 'orig', s.original, 'rep', s.replies, 'thr', s.selfThread, '/day', s.postsPerDay, JSON.stringify(s.kinds), 'vid', s.vidDurMedian, 'words', s.wordsMedian, 'lc%', s.lowerPct, '#%', s.hashtagPct, 'likes', s.likesMedian, 'views', s.viewsMedian);
console.log('GLOBAL', JSON.stringify({ kinds: G.kinds, imgN: G.imgN, ratios: G.ratios, vid: G.vidDurP, words: G.wordsP, lc: G.lowerPct, hash: G.hashtagPct, link: G.linkPct, emoji: G.emojiPct, q: G.questionPct, ext: G.ext, wmed: G.widthMedian, n: G.n }));
