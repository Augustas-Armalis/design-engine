// Slim raw FixTweet pages into one study file per handle.
// Usage: node slim.mjs <rawDir> <outDir> <handle> [mergeFile ...]
//   mergeFile: older slim/raw captures in this repo (kargul-x/posts.json, heyrico-x/posts.json, ...)
//   whose statuses are added only when the fresh pages do not contain that id (marked src: <file>).
import fs from 'node:fs';
import path from 'node:path';

const [rawDir, outDir, handle, ...mergeFiles] = process.argv.slice(2);
const H = handle.toLowerCase();
const byId = new Map();
const selfReposted = new Set();
const repostsOfOthers = []; // {id, author, created} reposts of other people's posts shown on this timeline

function links(s) {
  const f = s.raw_text?.facets || [];
  return f.filter(x => x.type === 'url').map(x => x.replacement || x.display || x.original).filter(Boolean);
}
function media(s) {
  return (s.media?.all || []).map(m => ({
    type: m.type, w: m.width, h: m.height,
    dur: m.duration ? Math.round(m.duration * 10) / 10 : undefined,
    url: m.type === 'photo' ? m.url : undefined,
    thumb: m.type !== 'photo' ? m.thumbnail_url : undefined,
  }));
}
function slimRaw(s, src) {
  const author = s.author?.screen_name || '';
  const rt = s.replying_to;
  return {
    id: s.id, url: s.url, created: new Date(s.created_timestamp * 1000).toISOString(), ts: s.created_timestamp,
    author, text: s.text || '', lang: s.lang,
    is_reply: !!rt, reply_to: rt ? { handle: rt.screen_name, id: rt.status } : null,
    self_reply: !!rt && (rt.screen_name || '').toLowerCase() === author.toLowerCase(),
    quote: s.quote ? { id: s.quote.id, author: s.quote.author?.screen_name, text: (s.quote.text || '').slice(0, 160), created: s.quote.created_timestamp ? new Date(s.quote.created_timestamp * 1000).toISOString() : null, media: (s.quote.media?.all || []).map(m => ({ type: m.type, w: m.width, h: m.height, dur: m.duration })) } : null,
    likes: s.likes ?? 0, reposts: s.reposts ?? 0, replies: s.replies ?? 0, quotes: s.quotes ?? 0, bookmarks: s.bookmarks ?? 0, views: s.views ?? 0,
    media: media(s), links: links(s), note_tweet: !!s.is_note_tweet, src,
  };
}
// older slim formats in this repo (kargul-x/posts.json uses created_at/replying_to/quote_of; heyrico-x uses ts/replying/quote)
function slimOld(s, src) {
  const created = new Date(s.created_at || s.ts).toISOString();
  const rt = s.replying_to || s.replying || null;
  const rtHandle = typeof rt === 'string' ? rt : rt?.screen_name;
  const author = s.author || s.author_handle || handle;
  return {
    id: s.id, url: s.url, created, ts: Math.round(Date.parse(created) / 1000), author, text: s.text || '', lang: s.lang,
    is_reply: !!rt, reply_to: rt ? { handle: rtHandle, id: rt.status || null } : null,
    self_reply: !!rt && (rtHandle || '').toLowerCase() === String(author).toLowerCase(),
    quote: s.quote_of || s.quote ? { id: typeof s.quote === 'string' ? s.quote : null, author: s.quote_of || s.quote_author || null, text: '', created: null, media: [] } : null,
    likes: s.likes ?? 0, reposts: s.reposts ?? 0, replies: s.replies ?? 0, quotes: s.quotes ?? 0, bookmarks: s.bookmarks ?? 0, views: s.views ?? 0,
    media: (s.media || []).map(m => ({ type: m.type, w: m.w ?? m.width, h: m.h ?? m.height, dur: m.dur ?? m.duration, url: m.type === 'photo' ? m.url : undefined })),
    links: s.links || [], note_tweet: false, src,
  };
}

const hdir = path.join(rawDir, handle);
let author = null;
const timeline = []; // entries in timeline order: {id, rt, ts}
const seenEntry = new Set();
for (const f of fs.readdirSync(hdir).filter(f => f.endsWith('.json')).sort()) {
  const j = JSON.parse(fs.readFileSync(path.join(hdir, f)));
  for (const s of j.results || []) {
    const key = s.id + (s.reposted_by ? ':rt' : '');
    if (!seenEntry.has(key)) { seenEntry.add(key); timeline.push({ id: s.id, rt: !!s.reposted_by, own: (s.author?.screen_name || '').toLowerCase() === H, ts: s.created_timestamp }); }
    const a = (s.author?.screen_name || '').toLowerCase();
    if (s.reposted_by) {
      // a repost shown on this timeline; a repost of one's own post is a "bump"
      if ((s.reposted_by.screen_name || '').toLowerCase() === H && a === H) selfReposted.add(s.id);
      if (a !== H) { if ((s.reposted_by.screen_name || '').toLowerCase() === H && !repostsOfOthers.find(r => r.id === s.id)) repostsOfOthers.push({ id: s.id, author: s.author?.screen_name, created: new Date(s.created_timestamp * 1000).toISOString(), media_n: (s.media?.all || []).length }); continue; } // reposts of other people are not this account's work
    }
    if (a !== H) continue;
    if (!author) author = { name: s.author.name, followers: s.author.followers, following: s.author.following, statuses: s.author.statuses, media_count: s.author.media_count, description: s.author.description, joined: s.author.joined };
    byId.set(s.id, slimRaw(s, 'fixtweet-2026-10-22'));
  }
}
for (const mf of mergeFiles) {
  const j = JSON.parse(fs.readFileSync(mf));
  const arr = Array.isArray(j) ? j : (j.statuses || j.results || []);
  let added = 0;
  for (const s of arr) {
    const a = String(s.author?.screen_name || s.author || s.author_handle || handle).toLowerCase();
    if (a !== H || byId.has(s.id)) continue;
    byId.set(s.id, s.created_timestamp ? slimRaw(s, path.basename(mf)) : slimOld(s, path.basename(mf)));
    added++;
  }
  console.error('merged', mf, added);
}
const statuses = [...byId.values()].sort((a, b) => b.ts - a.ts);
// self-repost ("bump") timing: a repost sits in the timeline at the time of the repost, so the
// nearest non-repost entries above and below bound it. lagHours = [lower, upper] after the original.
const bumpLag = {};
timeline.forEach((e, i) => {
  if (!e.rt || !e.own) return;
  let lo = null, up = null;
  for (let j = i + 1; j < timeline.length; j++) if (!timeline[j].rt) { lo = timeline[j].ts; break; }
  for (let k = i - 1; k >= 0; k--) if (!timeline[k].rt) { up = timeline[k].ts; break; }
  bumpLag[e.id] = [lo != null ? Math.max(0, Math.round((lo - e.ts) / 360) / 10) : null, up != null ? Math.round((up - e.ts) / 360) / 10 : null];
});
// self-reply threads: walk reply_to chains that stay inside this account
const idx = new Map(statuses.map(s => [s.id, s]));
for (const s of statuses) {
  s.self_reposted = selfReposted.has(s.id) || undefined;
  if (bumpLag[s.id]) s.bump_lag_hours = bumpLag[s.id];
  if (!s.self_reply) continue;
  let root = s, guard = 0;
  while (root.self_reply && root.reply_to?.id && idx.has(root.reply_to.id) && guard++ < 50) root = idx.get(root.reply_to.id);
  s.thread_root = root.id !== s.id ? root.id : (s.reply_to?.id || null);
}
fs.mkdirSync(outDir, { recursive: true });
const out = {
  handle, source: `https://api.fxtwitter.com/2/profile/${handle}/statuses (public FixTweet mirror, cursor pages, no login)`,
  fetched: '2026-10-22', author, count: statuses.length, reposts_of_others: repostsOfOthers,
  range: statuses.length ? [statuses[statuses.length - 1].created, statuses[0].created] : null,
  statuses,
};
fs.writeFileSync(path.join(outDir, `${handle}.json`), JSON.stringify(out, null, 1));
console.log(handle, statuses.length, out.range, 'selfReposted', selfReposted.size);
