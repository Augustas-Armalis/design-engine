// Shared loader for the caption study (captions.mjs): reads every on-disk capture of the studied
// design accounts, normalises them to one shape and de-duplicates by status id (newest capture wins).
// Excluded on purpose: @rokasrem, @faulkner_Design, @marius_vanagas (X-engine generated posts; founder
// verdicts ledger/entries/x-engine-posts.json r1 and x-captions.json r1: negative evidence only).
import fs from 'node:fs';
import path from 'node:path';

export const EXCLUDED = ['rokasrem', 'faulkner_Design', 'marius_vanagas'];

// author -> list of [file, kind] in priority order (first wins on duplicate ids; put the freshest capture first)
export function sources(bench) {
  const xs = (h) => path.join(bench, 'x-strategy-2026-10/data', `${h}.json`);
  const xp = (h) => path.join(bench, 'x-posts/data', `${h}.json`);
  return {
    marcelkargul: [[xs('marcelkargul'), 'slim'], [path.join(bench, 'kargul-x/posts-latest.json'), 'old'], [xp('marcelkargul'), 'xp'], [path.join(bench, 'kargul-x/posts.json'), 'old']],
    _heyrico: [[xs('_heyrico'), 'slim'], [xp('_heyrico'), 'raw'], [path.join(bench, 'heyrico-x/posts.json'), 'old']],
    basit_designs: [[xs('basit_designs'), 'slim'], [xp('basit_designs'), 'xp']],
    kargulstudio: [[xs('kargulstudio'), 'slim']],
    augustasdesign: [[xs('augustasdesign'), 'slim']],
    flohoeller: [[xp('flohoeller'), 'xp']],
    mrncst: [[xp('mrncst'), 'xp']],
    oguzyagizkara: [[xp('oguzyagizkara'), 'xp']],
    uisabor: [[xp('uisabor'), 'xp']],
    pacocoursey: [[xp('pacocoursey'), 'xp']],
    raunofreiberg: [[xp('raunofreiberg'), 'xp']],
    steveschoger: [[xp('steveschoger'), 'xp']],
    d__raptis: [[xp('d__raptis'), 'xp']],
  };
}

const iso = (x) => new Date(x).toISOString();
const clean = (t) => String(t || '').replace(/\s*https:\/\/t\.co\/\w+\s*$/g, '').replace(/&amp;/g, '&').replace(/&gt;/g, '>').replace(/&lt;/g, '<').trim();

function norm(s, kind, handle) {
  if (kind === 'slim') {
    return { id: s.id, author: s.author, created: s.created, text: clean(s.text), likes: s.likes, views: s.views, bookmarks: s.bookmarks, reposts: s.reposts, replies: s.replies,
      isReply: !!s.is_reply, selfReply: !!s.self_reply, replyTo: s.reply_to?.id || null, quoteAuthor: s.quote?.author || null, quoteId: s.quote?.id || null,
      media: (s.media || []).map((m) => ({ type: m.type, w: m.w, h: m.h, dur: m.dur })), reposted: false, src: kind };
  }
  if (kind === 'xp' || kind === 'raw') {
    const ms = s.media?.all || [];
    return { id: s.id, author: s.author_handle || s.author?.screen_name || handle, created: iso((s.created_timestamp || 0) * 1000), text: clean(s.text), likes: s.likes, views: s.views, bookmarks: s.bookmarks, reposts: s.reposts, replies: s.replies,
      isReply: !!s.replying_to, selfReply: !!s.replying_to && String(s.replying_to.screen_name || s.replying_to).toLowerCase() === handle.toLowerCase(), replyTo: s.replying_to?.status || null,
      quoteAuthor: s.quote?.author?.screen_name || s.quote?.author || null, quoteId: s.quote?.id || null,
      media: ms.map((m) => ({ type: m.type, w: m.width, h: m.height, dur: m.duration })), reposted: !!s.reposted || !!s.reposted_by, src: kind };
  }
  // old slim formats (kargul-x posts.json / posts-latest.json, heyrico-x posts.json)
  const rt = s.replying_to || s.replying || null;
  return { id: s.id, author: s.author || handle, created: iso(s.created_at || s.ts), text: clean(s.text), likes: s.likes, views: s.views, bookmarks: s.bookmarks, reposts: s.reposts, replies: s.replies,
    isReply: !!rt, selfReply: !!rt && String(rt.screen_name || rt).toLowerCase() === handle.toLowerCase(), replyTo: rt?.status || null,
    quoteAuthor: s.quote_of || s.quote_author || null, quoteId: typeof s.quote === 'string' ? s.quote : null,
    media: (s.media || []).map((m) => ({ type: m.type, w: m.w ?? m.width, h: m.h ?? m.height, dur: m.dur ?? m.duration })), reposted: false, src: kind };
}

export function load(bench, handle) {
  const byId = new Map();
  for (const [file, kind] of sources(bench)[handle] || []) {
    if (!fs.existsSync(file)) continue;
    const j = JSON.parse(fs.readFileSync(file, 'utf8'));
    const arr = Array.isArray(j) ? j : (j.statuses || []);
    for (const s of arr) {
      const n = norm(s, kind, handle);
      if (String(n.author).toLowerCase() !== handle.toLowerCase() || n.reposted) continue;
      if (!byId.has(n.id)) byId.set(n.id, n);
    }
  }
  return [...byId.values()].sort((a, b) => b.created.localeCompare(a.created));
}
