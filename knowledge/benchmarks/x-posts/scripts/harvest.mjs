// Harvest public X timelines via api.fxtwitter.com (public FixTweet API, no login).
import fs from 'node:fs';
const out = process.argv[2];
const pages = Number(process.argv[3] || 5);
const handles = process.argv.slice(4);
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function get(url) {
  for (let i = 0; i < 6; i++) {
    try {
      const r = await fetch(url, { headers: { 'user-agent': 'design-engine-research/1.0' } });
      const j = await r.json();
      if (j.results && j.results.length) return j;
      if (j.code && j.code !== 200) return j;
    } catch (e) {}
    await sleep(2500 * (i + 1));
  }
  return { results: [] };
}
for (const h of handles) {
  const file = `${out}/${h}.json`;
  if (fs.existsSync(file)) { console.log('skip', h); continue; }
  let all = [], cursor = null, author = null;
  for (let p = 0; p < pages; p++) {
    const url = `https://api.fxtwitter.com/2/profile/${h}/statuses` + (cursor ? `?cursor=${encodeURIComponent(cursor)}` : '');
    const j = await get(url);
    const res = j.results || [];
    if (!res.length) { if (p === 0) console.log('EMPTY', h, j.code, j.message); break; }
    for (const s of res) { if (!author && s.author?.screen_name?.toLowerCase() === h.toLowerCase()) author = s.author; const c = { ...s }; c.author_handle = s.author?.screen_name; delete c.author; if (c.quote) { c.quote = { id: c.quote.id, text: c.quote.text, author: c.quote.author?.screen_name, media_n: c.quote.media?.all?.length || 0 }; } all.push(c); }
    cursor = j.cursor?.bottom; if (!cursor) break;
    await sleep(1200);
  }
  if (all.length) fs.writeFileSync(file, JSON.stringify({ handle: h, fetched: new Date().toISOString(), author, statuses: all }, null, 1));
  console.log(h, all.length, author ? `${author.name} | ${author.followers} | ${(author.description||'').replace(/\n/g,' ')}` : 'no author');
  await sleep(4000);
}
