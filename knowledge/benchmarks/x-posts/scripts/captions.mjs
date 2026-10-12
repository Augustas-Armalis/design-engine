// Caption pattern classifier + normalised engagement (post likes / designer median likes).
import fs from 'node:fs';
const dir = process.argv[2];
const skip = new Set(['benjitaylor','jsngr','ryolu_','pablostanley']); // leaders whose feeds are mostly life/company news; reported separately
const pats = [
  ['component-label', /\b(component|components)\b/i],
  ['introducing/launch', /^(introducing|announcing|launching|just shipped|shipped|we('re| are) (launching|shipping)|now (live|available)|new:)|\bis (now )?(live|out)\b|\bjust launched\b/i],
  ['before/after', /before\s*(\/|->|→|vs\.?|and|&)\s*after|before \/ after|\bbefore\b.*\bafter\b/i],
  ['wip/exploring', /\b(wip|exploring|exploration|explorations|experiment|experimenting|playing with|sketch|concept|in the making|work in progress)\b/i],
  ['made/built', /^(i )?(made|built|building|designed|recreated|doodled|put together)\b|\bi (made|built|designed|recreated)\b/i],
  ['detail/craft', /\b(detail|details|interaction|micro|animation|hover|easing|spring|transition|motion)\b/i],
  ['lesson/tip', /\b(don'?t|should|tip|rule|if you|make sure|the trick|pro tip|lesson|always|never)\b/i],
  ['question', /\?\s*$|\b(which one|thoughts\?|what do you think|agree\?|how does it look)/i],
  ['from-brand (recreation)', /\bfrom (spotify|stripe|linear|vercel|apple|arc|notion|figma|raycast|github|x)\b|\b(recreated|recreation|inspired by|h\/t)\b/i],
  ['version/number', /\bv\d|\bv\.\d|№|#\d|\bpart \d|\bday \d/i],
  ['ai-tool-mention', /\b(claude|codex|opus|cursor|gpt|chatgpt|fable|astra|ai)\b/i],
  ['lowercase-start', /^[a-z]/],
  ['emoji', /\p{Extended_Pictographic}/u],
  ['link', /https?:\/\//],
  ['no-caption', /^\s*$/],
];
const rows = []; const per = {};
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json') && !f.startsWith('_'))) {
  const d = JSON.parse(fs.readFileSync(`${dir}/${f}`)); const h = d.handle; if (skip.has(h)) continue;
  const posts = d.statuses.filter(s => !s.reposted_by && (s.author_handle||'').toLowerCase() === h.toLowerCase() && !s.replying_to && s.media?.all?.length);
  if (posts.length < 5) continue;
  const likes = posts.map(s => s.likes || 0).sort((a,b)=>a-b); const med = likes[Math.floor(likes.length/2)] || 1;
  for (const s of posts) {
    const t = (s.text || '').replace(/https?:\/\/\S+/g, m => m).trim();
    const m = s.media.all; const nImg = m.filter(x=>x.type==='photo').length, nVid = m.filter(x=>x.type==='video'||x.type==='gif').length;
    const fmt = nVid ? (nVid>1?'video-multi':'video') : `image x${nImg}`;
    const words = t ? t.split(/\s+/).length : 0;
    const lenB = words === 0 ? '0 words' : words <= 5 ? '1-5 words' : words <= 15 ? '6-15 words' : words <= 40 ? '16-40 words' : '41+ words';
    const tags = pats.filter(([, re]) => re.test(t)).map(([n]) => n);
    rows.push({ h, id: s.id, rel: (s.likes||0)/med, likes: s.likes, fmt, lenB, tags, t: t.slice(0, 110), bm: s.bookmarks||0, views: s.views||0 });
  }
}
const agg = (key) => { const g = {}; for (const r of rows) for (const k of [].concat(key(r))) { (g[k] ||= []).push(r.rel); } return Object.fromEntries(Object.entries(g).map(([k, v]) => { v.sort((a,b)=>a-b); return [k, { n: v.length, medianRel: +v[Math.floor(v.length/2)].toFixed(2), meanRel: +(v.reduce((a,b)=>a+b,0)/v.length).toFixed(2) }]; }).sort((a,b)=>b[1].n-a[1].n)); };
const out = { n: rows.length, designers: [...new Set(rows.map(r=>r.h))], byFormat: agg(r => r.fmt), byLength: agg(r => r.lenB), byTag: agg(r => r.tags.length ? r.tags : ['untagged']),
  bmPerLike: (() => { const v = rows.filter(r=>r.likes>20).map(r=>r.bm/r.likes).sort((a,b)=>a-b); return { median: +v[Math.floor(v.length/2)].toFixed(2), p25: +v[Math.floor(v.length*0.25)].toFixed(2), p75: +v[Math.floor(v.length*0.75)].toFixed(2) }; })(),
  likePerView: (() => { const v = rows.filter(r=>r.views>1000).map(r=>r.likes/r.views).sort((a,b)=>a-b); return { median: +(v[Math.floor(v.length/2)]*100).toFixed(2)+'%', p25: +(v[Math.floor(v.length*0.25)]*100).toFixed(2)+'%', p75: +(v[Math.floor(v.length*0.75)]*100).toFixed(2)+'%' }; })(),
  topRel: rows.sort((a,b)=>b.rel-a.rel).slice(0, 40).map(r => `${r.h} ${r.id} x${r.rel.toFixed(1)} ${r.likes}♥ ${r.fmt} | ${r.t}`) };
fs.writeFileSync(`${dir}/_captions.json`, JSON.stringify(out, null, 1));
console.log(JSON.stringify({ n: out.n, designers: out.designers.length, byFormat: out.byFormat, byLength: out.byLength, byTag: out.byTag, bmPerLike: out.bmPerLike, likePerView: out.likePerView }, null, 0));
console.log(out.topRel.join('\n'));
