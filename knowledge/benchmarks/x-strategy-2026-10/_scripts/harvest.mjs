// Harvest a public X timeline through api.fxtwitter.com (the public FixTweet API).
// No login, no x.com, nothing liked, followed or posted. Sequential, 2.5 s between requests.
// Usage: node harvest.mjs <rawDir> <handle> [maxPages=60] [stopBeforeISO]
//   rawDir: where raw pages are written (page-NN.json); keep it out of the repo (scratchpad).
//   stopBeforeISO: stop once a whole page is older than this date (e.g. 2026-09-15).
import fs from 'node:fs';
import path from 'node:path';

const [rawDir, handle, maxPagesArg, stopBefore] = process.argv.slice(2);
if (!rawDir || !handle) { console.error('usage: harvest.mjs <rawDir> <handle> [maxPages] [stopBeforeISO]'); process.exit(1); }
const maxPages = Number(maxPagesArg || 60);
const stopTs = stopBefore ? Date.parse(stopBefore) / 1000 : 0;
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36';
const sleep = ms => new Promise(r => setTimeout(r, ms));
const dir = path.join(rawDir, handle);
fs.mkdirSync(dir, { recursive: true });

async function get(url) {
  // the mirror answers 404 intermittently for valid handles; retry with backoff
  for (let i = 0; i < 7; i++) {
    try {
      const r = await fetch(url, { headers: { 'user-agent': UA, accept: 'application/json' } });
      const j = await r.json();
      if (j.results && j.results.length) return j;
    } catch (e) { /* retry */ }
    await sleep(2500 + 2000 * i);
  }
  return { results: [], cursor: {} };
}

let cursor = null, empty = 0, total = 0;
for (let p = 0; p < maxPages; p++) {
  const url = `https://api.fxtwitter.com/2/profile/${handle}/statuses` + (cursor ? `?cursor=${encodeURIComponent(cursor)}` : '');
  const j = await get(url);
  const res = j.results || [];
  fs.writeFileSync(path.join(dir, `page-${String(p).padStart(2, '0')}.json`), JSON.stringify(j));
  total += res.length;
  const own = res.filter(s => (s.author?.screen_name || '').toLowerCase() === handle.toLowerCase());
  const oldest = own.length ? Math.min(...own.map(s => s.created_timestamp)) : null;
  console.log(handle, 'page', p, 'n', res.length, 'oldest', oldest ? new Date(oldest * 1000).toISOString().slice(0, 10) : '-');
  if (!res.length) { empty++; if (empty >= 3) break; } else empty = 0;
  const next = j.cursor?.bottom;
  if (!next || next === cursor) { if (!res.length) break; }
  cursor = next || cursor;
  if (stopTs && oldest && oldest < stopTs) {
    // the pinned post can be old; require the newest own post on the page to be older too
    const newest = Math.max(...own.map(s => s.created_timestamp));
    if (newest < stopTs) break;
  }
  await sleep(2500);
}
console.log('done', handle, 'statuses', total);
