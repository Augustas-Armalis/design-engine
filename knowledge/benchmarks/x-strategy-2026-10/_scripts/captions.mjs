// Caption study for knowledge/x/caption-patterns.md (CP-01..).
// Reads every on-disk capture of the studied design accounts (captions-load.mjs), keeps original posts
// with media, tags each caption (length, casing, emoji, punctuation, line breaks, subject, format, pattern)
// and writes per-author and pooled tables with relative engagement (likes / author median likes on media
// originals in the window; views and bookmarks the same way where present).
// Excluded: @rokasrem, @faulkner_Design, @marius_vanagas (X-engine output, negative evidence only:
// ledger/entries/x-engine-posts.json r1, x-captions.json r1).
// Usage: node captions.mjs <benchmarksDir> <outFile>
//   e.g. node captions.mjs ../.. ../data/_captions.json
import fs from 'node:fs';
import path from 'node:path';
import { load, EXCLUDED } from './captions-load.mjs';

const [benchArg, outArg] = process.argv.slice(2);
const bench = path.resolve(benchArg || path.join(import.meta.dirname, '../..'));
const outFile = path.resolve(outArg || path.join(import.meta.dirname, '../data/_captions.json'));

// author key -> [handle, from, to, group]
const AUTHORS = {
  marcelkargul: ['marcelkargul', '2026-09-07', '2026-10-23', 'studio'],
  _heyrico: ['_heyrico', '2026-05-16', '2026-10-23', 'studio'],
  basit_designs: ['basit_designs', '2025-01-01', '2026-10-23', 'studio'],
  uisabor: ['uisabor', '2025-01-01', '2026-10-23', 'studio'],
  kargulstudio: ['kargulstudio', '2026-09-01', '2026-10-23', 'studio'],
  flohoeller: ['flohoeller', '2025-01-01', '2026-10-23', 'craft'],
  mrncst: ['mrncst', '2023-01-01', '2026-10-23', 'craft'],
  oguzyagizkara: ['oguzyagizkara', '2025-01-01', '2026-10-23', 'craft'],
  pacocoursey: ['pacocoursey', '2021-01-01', '2026-10-23', 'craft'],
  raunofreiberg: ['raunofreiberg', '2023-01-01', '2026-10-23', 'craft'],
  steveschoger: ['steveschoger', '2025-01-01', '2026-10-23', 'craft'],
  d__raptis: ['d__raptis', '2025-01-01', '2026-10-23', 'craft'],
  'augustasdesign-era1': ['augustasdesign', '2025-07-19', '2026-03-06', 'augustas'],
  'augustasdesign-now': ['augustasdesign', '2026-08-20', '2026-10-23', 'augustas'],
};
for (const [, [h]] of Object.entries(AUTHORS)) if (EXCLUDED.includes(h)) throw new Error('excluded account in AUTHORS: ' + h);

const med = (a) => { const b = a.filter(Number.isFinite).sort((x, y) => x - y); if (!b.length) return null; const m = b.length >> 1; return b.length % 2 ? b[m] : (b[m - 1] + b[m]) / 2; };
const r2 = (x) => (x == null || !Number.isFinite(x) ? null : Math.round(x * 100) / 100);
const seg = new Intl.Segmenter('en', { granularity: 'grapheme' });
const EMO = /\p{Extended_Pictographic}/u;
const short = (t, n = 10) => { const w = t.replace(/\s+/g, ' ').trim().split(' '); return w.length > n ? w.slice(0, n).join(' ') + ' ...' : w.join(' '); };

// ---------- caption features ----------
function features(raw) {
  const noUrl = raw.replace(/https?:\/\/\S+/g, ' ').replace(/\b[\w-]+\.(com|co|dev|app|io|studio|design|me|supply)\b\S*/gi, (m) => (/^(kargul|lunor|alignui|bentogrids|grainient|mobbin|uilabs|devouringdetails|rauno|paco|beautifului|supermotion|brandbird|maillayer)\./i.test(m) ? ' ' : m)).trim();
  const graphemes = [...seg.segment(noUrl)].map((s) => s.segment);
  const emoji = graphemes.filter((g) => EMO.test(g) || g === '♥︎' || g === '♥');
  const textOnly = graphemes.filter((g) => !(EMO.test(g) || g === '♥︎' || g === '♥')).join('');
  const letters = textOnly.replace(/@\w+/g, ' ');
  const words = letters.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
  const chars = noUrl.length;
  // casing
  let casing = 'none';
  if (/[a-z]/i.test(letters)) {
    const first = letters.match(/[a-z]/i)[0];
    const capsTokens = words.filter((w) => /[A-Z]/.test(w));
    const acronymOk = (w) => /^[^a-z]*$/.test(w.replace(/[^\w]/g, '')) || /^(SaaS|iOS|macOS|iPhone|iPad|AirPods|FaceTime|GitHub|LinkedIn|TikTok|YouTube|Next\.js|ChatGpt|ChatGPT|SuperMotion|BrandBird)\W*$/.test(w) || /^I(['’]\w+)?\W*$/.test(w);
    if (!/[A-Z]/.test(letters)) casing = 'lower';
    else if (first === first.toLowerCase() && capsTokens.every((w) => acronymOk(w) || /^[A-Z][a-z]+\W*$/.test(w) && capsTokens.length <= 2)) casing = 'lower+names';
    else {
      const long = words.filter((w) => w.replace(/\W/g, '').length >= 4);
      casing = long.length >= 3 && long.filter((w) => /^[A-Z]/.test(w)).length / long.length >= 0.6 ? 'title' : 'sentence';
    }
  }
  const lowerVoice = casing === 'lower' || casing === 'lower+names';
  // emoji position
  const trimmed = noUrl.trim();
  const lastG = [...seg.segment(trimmed)].map((s) => s.segment).pop() || '';
  const firstG = [...seg.segment(trimmed)].map((s) => s.segment)[0] || '';
  const emojiPos = !emoji.length ? null : !words.length ? 'only' : (EMO.test(lastG) || lastG === '♥︎') ? 'end' : EMO.test(firstG) ? 'start' : 'middle';
  // punctuation and structure
  const t0 = textOnly.trim();
  const endPunct = !t0 ? 'none' : /\.\.\.$|…$/.test(t0) ? 'ellipsis' : /\?$/.test(t0) ? 'question' : /!$/.test(t0) ? 'exclaim' : /\.$/.test(t0) ? 'period' : /:$/.test(t0) ? 'colon' : 'none';
  const beats = raw.replace(/https?:\/\/\S+/g, '').split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean).length;
  const lines = raw.replace(/https?:\/\/\S+/g, '').split('\n').filter((s) => s.trim()).length;
  const listLines = raw.split('\n').filter((l) => /^\s*([-•→]|\d+\.)\s+/.test(l)).length;
  return {
    words: words.length, chars, casing, lowerVoice, emoji, emojiN: emoji.length, emojiPos, endPunct, beats, lines, listLines,
    question: /\?/.test(textOnly), exclaim: /!/.test(textOnly), link: /https?:\/\//.test(raw) || /\b\w+\.(com|co|dev|studio|design|app|io|me)\b/.test(raw.replace(/@\w+/g, '')),
    mention: /(^|[^\w])@\w+/.test(raw), hashtag: /(^|\s)#\w/.test(raw), arrow: /->|→|>>>|\s>\s/.test(textOnly), emdash: /—/.test(textOnly), parenNum: /\(\d\)/.test(textOnly),
    text: trimmed, lc: trimmed.toLowerCase(),
  };
}

// ---------- subject (what the media shows, read from the caption, plus rico's image kinds) ----------
const SUBJECTS = [
  ['dashboard', /dashboard|analytics|metrics|report\b|leaderboard|kanban|data table|lead table|chart/],
  ['crm-table', /\bcrm\b|table\b|sales platform/],
  ['inbox-chat', /inbox|email|e-mail|mail\b|chat|composer|comments?\b|thread|unibox|message/],
  ['calendar', /calendar|booking|schedul/],
  ['sidebar-nav', /sidebar|navigation|\bnav\b|dock|dropdown|drop down|menu|search modal|command/],
  ['settings-onboarding', /setting|onboarding|setup|set up|login|log in|sign-?in|sign-?up|auth|profile|team members|invite|integrations?|connect mcp|empty state|skeleton/],
  ['modal-component', /modal|component|widget|card|button|toggle|slider|dropzone|meter|breakdown|spinner|focus ring|scrollbar|input|tabs|caret|underline|cursor|carousel|banner|filters?\b|states?\b|node\b|toolbar|form\b|calculator/],
  ['hero-landing', /hero|landing|website|web design|site\b|homepage|home page|marketing kit|product page|section|footer|faq|pricing|feature illustration/],
  ['bento', /bento/],
  ['workflow-agent', /workflow|agent|automation|ai (chat|search)|mcp|skills/],
  ['mobile', /mobile|ios|app store|iphone/],
  ['branding-illustration', /brand|logo|illustration|poster|pictogram|pitch deck|identity|isometric|artwork|shader|generative|clouds|font|typeface|gradient/],
];
const RICO_KIND = { dashboard: 'dashboard', chart: 'dashboard', table: 'crm-table', list: 'crm-table', inbox: 'inbox-chat', chat: 'inbox-chat', composer: 'inbox-chat', sidebar: 'sidebar-nav', menu: 'sidebar-nav', settings: 'settings-onboarding', onboarding: 'settings-onboarding', auth: 'settings-onboarding', 'empty-state': 'settings-onboarding', form: 'settings-onboarding', modal: 'modal-component', card: 'modal-component', component: 'modal-component', 'card-grid': 'bento', pricing: 'hero-landing', marketing: 'hero-landing', 'agent-panel': 'workflow-agent', workflow: 'workflow-agent', mobile: 'mobile', illustration: 'branding-illustration', 'app-shell': 'app-shell', code: 'app-shell' };
const subjectOf = (lc, ricoKind) => { for (const [k, re] of SUBJECTS) if (re.test(lc)) return k; if (ricoKind && RICO_KIND[ricoKind]) return RICO_KIND[ricoKind]; return /\b(ui|design|interface|app|product|screen|project|work|view)\b/.test(lc) ? 'generic-product' : 'unnamed'; };

// UI nouns: does the caption name the thing? (a specific part, not the generic "product design" / "interface")
const UI_NOUN = /\b(dashboards?|sidebars?|inbox|e-?mails?|calendar|crm|tables?|modals?|menus?|dropdowns?|composer|chat|comments?|threads?|onboarding|settings?|setup|login|sign-?in|sign-?up|auth|pricing|footers?|heroe?s?|hero section|landing( page)?s?|websites?|site|pages?|sections?|bento|cards?|components?|widgets?|buttons?|toolbar|navigation|nav|search|forms?|profile|leaderboard|kanban|workflows?|editor|app|apps|mobile|screens?|empty states?|skeleton|notifications?|tabs|inputs?|cursor|carousel|illustrations?|icons?|logos?|branding|brand|posters?|pitch deck|fonts?|typography|gradients?|shaders?|charts?|analytics|report|calculator|booking|team members|integrations?|agents?|panel|spinner|focus rings|scrollbar|dock|toggle|slider|dropzone|meter|breakdown|states?|banners?|filters?|nodes?|caret|underline|identity|pictograms?|deck|feed|unibox|table|cheat ?sheet|clouds?|environment|composition|links?|modal|folders?|graph|text editors?|load in|waitlist)\b/;
const JUDGE = /\b(clean|cleaner|cleanest|detailed|cute|lovely|polished|crispy|crisp|beautiful|gorgeous|insane|cool|cooler|coolest|good|great|fresh|aesthetic|aesthetics|stunning|smooth|love|loving|in love|obsessed|perfect|perfection|masterpiece|masterpieces|next[- ]level|banger|bangers|hits different|hits differently|too damn|so good|incredible|incredibly|amazing|awesome|pure|best|most|favorite|favourite|ultra|sick|fire|cooked|cooking|unreal|mesmerizing|calm|peaceful|minimal|simple|sharp|expensive|premium)\b/;
const VIEW = /\b(closer view|close[- ]?ups?|closer look|full ?view|in full|zoomed?( in| out)?|up close|details?|detail shot|dark mode version|light mode|dark mode|dark version|light version|mobile version|pdf version|darker version|lighter version|isometric view)\b/;
const PRONOUN = /\b(i|i'm|i’m|i've|i’ve|we|we're|we’re|you|your|you're|my|our|me|us)\b/;

// question: a tail ("clean?", "thoughts?") on a caption that says something else, or the whole caption
function questionInfo(raw) {
  const parts = raw.replace(/https?:\/\/\S+/g, '').split(/\n+/).map((s) => s.trim()).filter(Boolean);
  const q = parts.filter((l) => /\?\s*\p{Extended_Pictographic}*\s*$/u.test(l) || /\?/.test(l));
  if (!q.length) return { kind: null, rest: raw };
  const rest = parts.filter((l) => !q.includes(l)).join('\n');
  const ql = q.join(' ').toLowerCase();
  const kind = /which (one|option|is|navigation)|which one|a or b|dark or light|light or dark|\bor\b[^?]*\?|\bvs\b|better\?/.test(ql) ? 'binary-choice'
    : /clean\?|clean enough|thoughts\?|is it (good|clean)|did (we|i) cook|cooking\?|cook\?|how did i do|aesthetic\?|mesmerizing\?|isn'?t it|so you'?re|do you agree|can you tell|how does it look|does it look|look good|right\?|how amazing|is this (design )?clean|guess how|should i/.test(ql) ? 'verdict-ask' : 'open';
  return { kind, rest: rest.trim() ? rest : '', whole: !rest.trim() };
}

// ---------- patterns ----------
// order = priority for the primary pattern (computed on the caption without its question tail);
// every post also gets the full multi-label set
const label = (f) => f.words >= 1 && f.words <= 8 && !PRONOUN.test(f.lc) && !f.question;
const PATTERNS = [
  ['spec-list', (f) => f.listLines >= 2 || /cheat ?sheet|bookmark this|steal this|feed this|blueprint|take notes/.test(f.lc)],
  ['resource-launch', (f) => /open[- ]source|github|free figma|figma file|dropping a free|copy-paste components|introducing|is live|now live|now available|are available|made it open|launched|just shipped|is finally out|tutorial|video (on|where)|one hour video|should be illegal to know|added to (the|my) (font )?(collection|gallery)|have been added|are added to|added some|collections? added/.test(f.lc)],
  ['teaching', (f) => /^(design tip|tip:|designer'?s notes|the secret|how to |here is how|here's how|reminder:|if you'?re still|want your|easiest way to|just use this|after using)|get this wrong|proper way|nothing beats|junior designer/.test(f.lc)],
  ['before-after', (f) => (f.arrow && /(before|after|old|new|wireframe|final|good|great|static|dynamic|idea|learn)/.test(f.lc)) || /how it started|before ?(->|→|\/) ?after|old → new|old -> new/.test(f.lc)],
  ['money-brag', (f) => /\$\d|€\d|\d+k\/mo|\bk\/mo|6 figures|7-figure|5-fig|revenue|charge/.test(f.lc)],
  ['series-follow', (f) => /\b(animated|animating|now moving|in motion|even (better|cooler)|(dark|light|mobile|pdf|animated|motion|desktop|full|darker|lighter)( mode)? version|version \d|part \d|round \d|another iteration|iterations? again|time for animation|here is what the [\w ]+ looks like|how it looks in|and that'?s how|works with the mobile)\b|\(\d\)|№/.test(f.lc)],
  ['principle', (f) => f.words <= 40 && (/^(when |you don'?t explain|slow is smooth|best products are|less is more|good design|great design (works|is)|design is |simplicity|minimalism is|people love simple|details matter|sweat the details|push things beyond|the goal is to make|the (smoother|cleaner|simpler|calmer)|a premium|premium design|ai is moving)/.test(f.lc) || /\b(investors? assume|doesn'?t chase|it earns them|is the new (normal|luxury)|is king|trust infrastructure|isn'?t trying to impress|feels? expensive|that'?s how a)\b/.test(f.lc))],
  ['normalise-standard', (f) => /^(no one|nobody|most (apps|companies|products|people|websites)|every (b2b|website|saas|landing|product|app)|everyone|never seen|empty state still|setting page should|who said|people are busy|everyone'?s building)/.test(f.lc) || /\b(should (at least )?looks? (like )?this|should looks? this|should be normali[sz]ed|will never (reach|look)|never reach this|the real flex|deserves better|level of (clean|design|animation))\b/.test(f.lc)],
  ['imagine', (f) => /^imagine|^what if|^how your|^how product design looks/.test(f.lc)],
  ['this-is-what', (f) => /\bthis is (what|how|why)\b|\bwhat [\w\s$,]+ looks? like\b|\bhere is what\b/.test(f.lc)],
  ['superlative', (f) => /\b(cleanest|best|coolest|finest|most [\w-]+|perfect|perfection|ever|you'?ll ever see|one of (the|my) (best|favou?rite)|favou?rite)\b/.test(f.lc)],
  ['twist', (f) => /^[\w\s/&-]{2,40},? but (make it|with|on|in|the|simple|shader|[\w-]+maxx+ing)|^[\w\s-]{2,30}, but /.test(f.lc) || /\bbut [\w-]+maxx+ing\b/.test(f.lc)],
  ['view-label', (f) => f.words <= 6 && VIEW.test(f.lc)],
  ['work-log', (f) => /\b(recent|recently|lately|latest|this week|today|past (client )?works?|previous work|from (a |an |the )?(recent|upcoming|past|new|current) project|new project|current project|sneak peek|wip|work in progress|in progress|still at it|making progress|midnight work|explorations?|exploring|experiments?|archives?|old (work|archive|banger)|year old|from last week|design session|loading\.\.\.|testing|still cooking|recap|delivered|completed|wrapped)\b/.test(f.lc)],
  ['client-tag', (f) => /\bfor (an? |the )?([\w-]+ ){0,3}(company|companies|startups?|platform|brand|agency|tool|client|saas|project|team|summit)\b|\bwe (designed|did|built) .* for\b|\bwork for\b|\bfor @\w+|\bat @\w+|\bw\/ ?@\w+/.test(f.lc) || /\bfor [A-Z][\w]+/.test(f.text)],
  ['process-claim', (f) => /\b(spent|took|hours?|in (a|one) (single )?day|in \d+ (hours|days)|made (with|in)|built (with|in|w\/)|built interactive|designed in|animated with|crafted by hand|by hand|no ai|not made by ai|from scratch|with @?figma|with claude|w\/ claude|made w\/|at 2am|1 prompt|with opus|with fable|prompt)\b/.test(f.lc)],
  ['another-daily', (f) => /^another\b|\banother day\b|^yet another\b|^daily /.test(f.lc)],
  ['callout', (f) => /^(the|this|that|these) ([\w-]+ ){1,4}(is|are|looks?|feels?|steals|makes|hits|really|just|definitely|might)\b/.test(f.lc) && (JUDGE.test(f.lc) || /steals the show|even better|next level/.test(f.lc))],
  ['reaction', (f) => JUDGE.test(f.lc) && (PRONOUN.test(f.lc) || /\b(this|these|omg|wow|ok|damn|so|too|just|love|loved|obsessed|falling)\b/.test(f.lc))],
  ['vibe-craft', (f) => f.words <= 8 && /\b(vibes?|vibin|mood|aesthetics?|craft|craftsmanship|taste|quality|culture|polish|crafted)\b/.test(f.lc) && !UI_NOUN.test(f.lc)],
  ['named-judged', (f) => label(f) && JUDGE.test(f.lc) && UI_NOUN.test(f.lc)],
  ['category-judged', (f) => label(f) && JUDGE.test(f.lc)],
  ['named-thing', (f) => label(f) && UI_NOUN.test(f.lc)],
  ['category-label', (f) => label(f)],
  ['bare', (f) => f.words === 0],
  ['statement', () => true],
];

function patternsOf(f, raw) {
  const q = questionInfo(raw);
  if (q.kind && q.whole) return { primary: 'question-only', all: ['question-only'], qKind: q.kind };
  const g = q.kind ? { ...features(q.rest), question: false } : f;
  const all = PATTERNS.filter(([, fn]) => fn(g)).map(([k]) => k);
  return { primary: all[0], all: all.filter((k) => k !== 'statement'), qKind: q.kind };
}

// ---------- topic: design post or not ----------
function topicOf(f, subject) {
  const lc = f.lc;
  if (/\b(giveaway|comment(ing)? "|lunor|hire me|dm me|link in bio|follow me|subscribe|drop your testimonials|winners announced|hit the like)\b/.test(lc)) return 'promo';
  if (/\b(followers|payout|from posting|bookmarks is crazy|gitub stars|github stars|1,2m impressions|impressions 🧑|my linkedin|linkedin profile|following me on linkedin|outreach from 2024|x payout|life story|17y\/o|go to school|just woke up to)\b/.test(lc)) return 'life-meta';
  if (/\b(setup breakdown|surface laptop|apple watch|whoop|oura|standing desk|games that shaped|sofa|merch|touched some grass|touching grass|weekends in the nature|christmas|meeting new and old friends|nyc 20|toronto|the specs 💀|mogging|gold is scratching|best decision ever|locked in|we’ve come so far|we've come so far|back on the grind|the tweet that changed|iphone duo|desktop clean|office ready|still got it|the luck|tesla|let’s go @apple|let's go @apple|x is ready to payoff|appreciate every single person|best product team on twitter|last week at @vercel|my last week|statue|1000 days streak|1,000 days streak|ipod)\b/.test(lc)) return 'life-meta';
  if (f.words > 25 && /\b(clients?|deals|revenue|positioning|retainer|close rate|leads|case study|agencies|acquired|trial|founders?|investors?)\b/.test(lc)) return 'business';
  if (/\b(hire us|taking on \d|book a call)\b/.test(lc)) return 'business';
  return 'design';
}

// ---------- format ----------
function formatOf(s) {
  const ph = s.media.filter((m) => m.type === 'photo'), v = s.media.filter((m) => m.type !== 'photo');
  if (v.length) { if (v.length > 1) return 'video-multi'; if (ph.length) return 'mixed'; return (v[0].dur || 0) > 30 ? 'video-long' : 'video-loop'; }
  const r = ph.map((m) => m.w / m.h);
  if (ph.length === 1) return r[0] < 0.95 ? 'single-portrait' : r[0] <= 1.05 ? 'single-square' : 'single-landscape';
  if (ph.length === 2) return r.every((x) => x >= 0.7 && x <= 0.95) ? '2up-pair' : r.every((x) => x < 0.7) ? '2up-tall' : '2up-landscape';
  if (ph.length === 3) return r.every((x) => x < 0.62) ? '3up-thirds' : '3up-other';
  if (ph.length === 4) return '4up';
  return `${ph.length}up`;
}

// rico image reuse: post id -> earlier post id whose image it re-shows (heyrico-x/img-classification.tsv)
const ricoReuse = new Map(), ricoKind = new Map();
const tsv = path.join(bench, 'heyrico-x/img-classification.tsv');
if (fs.existsSync(tsv)) {
  const rows = fs.readFileSync(tsv, 'utf8').trim().split('\n').slice(1).map((l) => l.split('\t'));
  for (const r of rows) {
    const [file, pid, , , , kind, , , , dup] = r;
    if (!ricoKind.has(pid)) ricoKind.set(pid, kind);
    const m = (dup || '').match(/repost of (\d+)-/);
    if (m && m[1] !== pid) ricoReuse.set(pid, m[1]);
  }
}

// ---------- per post ----------
const posts = [];
const authors = {};
for (const [key, [handle, from, to, group]] of Object.entries(AUTHORS)) {
  const all = load(bench, handle);
  const own = all.filter((s) => !s.isReply && s.created.slice(0, 10) >= from && s.created.slice(0, 10) < to);
  const media = own.filter((s) => s.media.length);
  const byId = new Map(all.map((s) => [s.id, s]));
  const baseL = med(media.map((s) => s.likes)) || 1;
  const vs = media.map((s) => s.views).filter((x) => x > 0), bs = media.map((s) => s.bookmarks);
  const baseV = vs.length >= media.length * 0.6 ? med(vs) : null, baseB = med(bs) || null;
  const seen = new Map();
  for (const s of [...media].sort((a, b) => a.created.localeCompare(b.created))) {
    const f = features(s.text);
    const fmt = formatOf(s);
    const quotesOwn = !!s.quoteAuthor && String(s.quoteAuthor).toLowerCase() === handle.toLowerCase();
    const p = { isVideo: /^video|mixed/.test(fmt), quotesOwn };
    const rk = handle === '_heyrico' ? ricoKind.get(s.id) : null;
    const subject = subjectOf(f.lc, rk);
    const topic = topicOf(f, subject);
    const pat = patternsOf(f, s.text);
    const repeatOf = f.words ? seen.get(f.lc.replace(/[^\p{L}\p{N} ]/gu, '').replace(/\s+/g, ' ').trim()) : null;
    if (f.words) seen.set(f.lc.replace(/[^\p{L}\p{N} ]/gu, '').replace(/\s+/g, ' ').trim(), s.id);
    const quoted = s.quoteId ? byId.get(s.quoteId) : null;
    const reshowOf = handle === '_heyrico' ? ricoReuse.get(s.id) || null : null;
    const roles = [];
    if (fmt === '3up-thirds') roles.push('vertical-thirds');
    if (/^2up/.test(fmt)) roles.push('pair');
    if (fmt === '4up') roles.push('four-up');
    if (p.isVideo && quotesOwn) roles.push('motion-followup');
    else if (p.isVideo) roles.push('motion-standalone');
    if (/\b(closer view|close[- ]?up|closer look|up close|details?\b|zoom)/.test(f.lc) || (/^single-(portrait|square)/.test(fmt) && subject === 'modal-component')) roles.push('closeup-detail');
    if (fmt === 'single-landscape' && ['dashboard', 'crm-table', 'inbox-chat', 'calendar', 'settings-onboarding', 'app-shell', 'generic-product', 'workflow-agent', 'sidebar-nav'].includes(subject) && !roles.includes('closeup-detail')) roles.push('full-screen');
    if (subject === 'hero-landing' && /hero|landing|website|site\b|homepage/.test(f.lc)) roles.push('hero-landing');
    if (subject === 'bento' || /footer|faq|pricing|section|bento/.test(f.lc)) roles.push('bento-section');
    if (subject === 'modal-component' || /component|modal|widget|menu|dropdown|composer/.test(f.lc)) roles.push('component');
    if (reshowOf || repeatOf || /\(\d\)|\bstill one of|year old|from the archives|old archive|past (client )?works?|previous work|found one of my first|exactly one year/.test(f.lc)) roles.push('re-show');
    const rel = s.likes / baseL;
    posts.push({
      key, handle, group, id: s.id, created: s.created, text: s.text, short: short(s.text),
      likes: s.likes, views: s.views, bookmarks: s.bookmarks,
      rel: r2(rel), relV: baseV && s.views > 0 ? r2(s.views / baseV) : null, relB: baseB ? r2(s.bookmarks / baseB) : null,
      fmt, subject, topic, roles, quotesOwn, quotedText: quoted ? short(quoted.text, 8) : null, reshowOf, repeatOf,
      primary: pat.primary, patterns: pat.all, qKind: pat.qKind,
      words: f.words, chars: f.chars, casing: f.casing, lowerVoice: f.lowerVoice, emoji: f.emoji, emojiN: f.emojiN, emojiPos: f.emojiPos,
      endPunct: f.endPunct, beats: f.beats, lines: f.lines, question: f.question, exclaim: f.exclaim, link: f.link, mention: f.mention, hashtag: f.hashtag,
      uiNoun: UI_NOUN.test(f.lc), judge: JUDGE.test(f.lc),
    });
  }
  authors[key] = { handle, group, window: [from, to], posts: own.length, media: media.length, baseLikes: baseL, baseViews: baseV, baseBookmarks: baseB };
}

// ---------- aggregation helpers ----------
const share = (arr, fn) => (arr.length ? r2(arr.filter(fn).length / arr.length) : null);
const relStats = (arr) => ({ n: arr.length, rel: r2(med(arr.map((p) => p.rel))), relV: r2(med(arr.map((p) => p.relV).filter((x) => x != null))), relB: r2(med(arr.map((p) => p.relB).filter((x) => x != null))) });
const bucketWords = (w) => (w === 0 ? '0' : w <= 2 ? '1-2' : w <= 4 ? '3-4' : w <= 6 ? '5-6' : w <= 9 ? '7-9' : w <= 15 ? '10-15' : w <= 40 ? '16-40' : '41+');
const groupBy = (arr, fn) => { const g = {}; for (const p of arr) for (const k of [].concat(fn(p))) (g[k] ||= []).push(p); return g; };
const table = (arr, fn, min = 1) => Object.fromEntries(Object.entries(groupBy(arr, fn)).filter(([, v]) => v.length >= min).map(([k, v]) => [k, relStats(v)]).sort((a, b) => b[1].n - a[1].n));
const examples = (arr, n = 4) => [...arr].sort((a, b) => b.rel - a.rel).slice(0, n).map((p) => `${p.short} (${p.rel}x)`);
const emojiFreq = (arr) => { const c = {}; for (const p of arr) for (const e of p.emoji) c[e] = (c[e] || 0) + 1; return Object.fromEntries(Object.entries(c).sort((a, b) => b[1] - a[1]).slice(0, 12)); };

function summarise(arr) {
  const design = arr.filter((p) => p.topic === 'design');
  const words = design.map((p) => p.words), chars = design.map((p) => p.chars);
  return {
    n: arr.length, design: design.length, topics: Object.fromEntries(Object.entries(groupBy(arr, (p) => p.topic)).map(([k, v]) => [k, relStats(v)])),
    length: { medianWords: med(words), p25Words: med(words.filter((w) => w <= med(words))), p75Words: med(words.filter((w) => w >= med(words))), medianChars: med(chars), byWords: table(design, (p) => bucketWords(p.words)) },
    casing: { shares: Object.fromEntries(Object.entries(groupBy(design, (p) => p.casing)).map(([k, v]) => [k, r2(v.length / design.length)])), lowerVoiceShare: share(design, (p) => p.lowerVoice), byCasing: table(design, (p) => p.casing) },
    emoji: { share: share(design, (p) => p.emojiN > 0), oneShare: share(design, (p) => p.emojiN === 1), position: Object.fromEntries(Object.entries(groupBy(design.filter((p) => p.emojiN), (p) => p.emojiPos)).map(([k, v]) => [k, v.length])), freq: emojiFreq(design), withVsWithout: { with: relStats(design.filter((p) => p.emojiN)), without: relStats(design.filter((p) => !p.emojiN)) } },
    questions: { byKind: table(design.filter((p) => p.qKind), (p) => p.qKind), tail: relStats(design.filter((p) => p.qKind && p.primary !== 'question-only')), only: relStats(design.filter((p) => p.primary === 'question-only')), none: relStats(design.filter((p) => !p.qKind)) },
    punctuation: { endPunct: table(design, (p) => p.endPunct), questionShare: share(design, (p) => p.question), exclaimShare: share(design, (p) => p.exclaim), linkShare: share(design, (p) => p.link), mentionShare: share(design, (p) => p.mention), hashtagShare: share(design, (p) => p.hashtag) },
    lineBreaks: { twoBeatShare: share(design, (p) => p.beats >= 2), byBeats: table(design, (p) => (p.beats >= 3 ? '3+' : String(p.beats))) },
    uiNoun: { with: relStats(design.filter((p) => p.uiNoun)), without: relStats(design.filter((p) => !p.uiNoun)) },
    judgement: { with: relStats(design.filter((p) => p.judge)), without: relStats(design.filter((p) => !p.judge)) },
    patternsPrimary: Object.fromEntries(Object.entries(groupBy(design, (p) => p.primary)).map(([k, v]) => [k, { ...relStats(v), medianWords: med(v.map((p) => p.words)), examples: examples(v, 3) }]).sort((a, b) => b[1].n - a[1].n)),
    patternsAny: Object.fromEntries(Object.entries(groupBy(design, (p) => p.patterns.length ? p.patterns : ['none'])).map(([k, v]) => [k, relStats(v)]).sort((a, b) => b[1].n - a[1].n)),
    formats: Object.fromEntries(Object.entries(groupBy(design, (p) => p.fmt)).map(([k, v]) => [k, { ...relStats(v), medianWords: med(v.map((p) => p.words)), topPatterns: Object.entries(groupBy(v, (p) => p.primary)).sort((a, b) => b[1].length - a[1].length).slice(0, 4).map(([pk, pv]) => `${pk} ${pv.length} (${r2(med(pv.map((p) => p.rel)))}x)`) }]).sort((a, b) => b[1].n - a[1].n)),
    roles: Object.fromEntries(Object.entries(groupBy(design, (p) => p.roles.length ? p.roles : ['other'])).map(([k, v]) => [k, { ...relStats(v), medianWords: med(v.map((p) => p.words)), topPatterns: Object.entries(groupBy(v, (p) => p.primary)).sort((a, b) => b[1].length - a[1].length).slice(0, 5).map(([pk, pv]) => `${pk} ${pv.length} (${r2(med(pv.map((p) => p.rel)))}x)`), examples: examples(v, 4) }]).sort((a, b) => b[1].n - a[1].n)),
    subjects: table(design, (p) => p.subject),
    quotesOwn: { share: share(design, (p) => p.quotesOwn), with: relStats(design.filter((p) => p.quotesOwn)), without: relStats(design.filter((p) => !p.quotesOwn)) },
    repeats: { share: share(design, (p) => !!p.repeatOf), repeated: relStats(design.filter((p) => p.repeatOf)) },
  };
}

// top 10% and bottom 20% per author (design posts), then pooled
function extremes(arr) {
  const d = arr.filter((p) => p.topic === 'design').sort((a, b) => b.rel - a.rel);
  if (d.length < 10) return null;
  const top = d.slice(0, Math.max(1, Math.round(d.length * 0.1))), bottom = d.slice(-Math.max(2, Math.round(d.length * 0.2)));
  return { top, bottom, all: d };
}
function profile(arr) {
  if (!arr.length) return null;
  const pc = Object.fromEntries(Object.entries(groupBy(arr, (p) => p.primary)).map(([k, v]) => [k, r2(v.length / arr.length)]).sort((a, b) => b[1] - a[1]));
  const anyc = Object.fromEntries(Object.entries(groupBy(arr, (p) => p.patterns)).map(([k, v]) => [k, r2(v.length / arr.length)]).sort((a, b) => b[1] - a[1]).slice(0, 10));
  const fm = Object.fromEntries(Object.entries(groupBy(arr, (p) => p.fmt)).map(([k, v]) => [k, r2(v.length / arr.length)]).sort((a, b) => b[1] - a[1]));
  const sj = Object.fromEntries(Object.entries(groupBy(arr, (p) => p.subject)).map(([k, v]) => [k, r2(v.length / arr.length)]).sort((a, b) => b[1] - a[1]).slice(0, 6));
  return {
    n: arr.length, medianWords: med(arr.map((p) => p.words)), lowerVoice: share(arr, (p) => p.lowerVoice), emoji: share(arr, (p) => p.emojiN > 0), question: share(arr, (p) => p.question),
    uiNoun: share(arr, (p) => p.uiNoun), judgement: share(arr, (p) => p.judge), twoBeat: share(arr, (p) => p.beats >= 2), link: share(arr, (p) => p.link), mention: share(arr, (p) => p.mention), quotesOwn: share(arr, (p) => p.quotesOwn), bare: share(arr, (p) => p.words === 0),
    primary: pc, anyPattern: anyc, formats: fm, subjects: sj,
  };
}

const out = { generated: new Date().toISOString().slice(0, 10), method: 'captions.mjs: original posts with media; rel = likes / author median likes on media originals in the window (relV views, relB bookmarks where present); topic, subject, format, role and pattern are regex tags (see script). Excluded: ' + EXCLUDED.map((h) => '@' + h).join(', ') + ' (X-engine output; ledger x-engine-posts r1, x-captions r1).', excluded: EXCLUDED, authors: {}, pools: {}, extremes: {}, roleExamples: {} };
for (const key of Object.keys(AUTHORS)) {
  const arr = posts.filter((p) => p.key === key);
  const ex = extremes(arr);
  out.authors[key] = { ...authors[key], ...summarise(arr) };
  if (ex) out.extremes[key] = { top10: profile(ex.top), bottom20: profile(ex.bottom), all: profile(ex.all), topExamples: ex.top.slice(0, 6).map((p) => `${p.short} [${p.fmt}] (${p.rel}x)`), bottomExamples: ex.bottom.slice(-6).map((p) => `${p.short} [${p.fmt}] (${p.rel}x)`) };
}
const POOLS = {
  studio: (p) => ['marcelkargul', '_heyrico', 'basit_designs', 'uisabor'].includes(p.key),
  craft: (p) => p.group === 'craft',
  benchmarks: (p) => p.group !== 'augustas' && p.key !== 'kargulstudio',
  augustas: (p) => p.group === 'augustas',
  all: (p) => p.key !== 'kargulstudio',
};
for (const [k, fn] of Object.entries(POOLS)) {
  const arr = posts.filter(fn);
  out.pools[k] = summarise(arr);
  const tops = [], bottoms = [];
  for (const key of Object.keys(AUTHORS)) { const ex = extremes(arr.filter((p) => p.key === key)); if (ex) { tops.push(...ex.top); bottoms.push(...ex.bottom); } }
  out.extremes['pool:' + k] = { top10: profile(tops), bottom20: profile(bottoms) };
}
// role examples across the benchmark pool (short quotes, best first) for the per-format section
const bm = posts.filter((p) => POOLS.benchmarks(p) && p.topic === 'design');
for (const [role, v] of Object.entries(groupBy(bm, (p) => p.roles.length ? p.roles : ['other']))) {
  out.roleExamples[role] = { ...relStats(v), medianWords: med(v.map((p) => p.words)), byAuthor: Object.fromEntries(Object.entries(groupBy(v, (p) => p.key)).map(([a, pv]) => [a, pv.length])), primary: Object.fromEntries(Object.entries(groupBy(v, (p) => p.primary)).map(([pk, pv]) => [pk, relStats(pv)]).sort((a, b) => b[1].n - a[1].n)), best: [...v].sort((a, b) => b.rel - a.rel).slice(0, 8).map((p) => `@${p.handle}: ${p.short} (${p.rel}x)`) };
}
// rico re-shows: caption of the re-show vs the original
const reshows = posts.filter((p) => p.reshowOf);
out.ricoReshows = { n: reshows.length, sameCaptionShare: share(reshows, (p) => { const o = posts.find((q) => q.id === p.reshowOf); return o && o.text.toLowerCase().trim() === p.text.toLowerCase().trim(); }), rel: relStats(reshows), byPrimary: table(reshows, (p) => p.primary), examples: reshows.slice(0, 8).map((p) => { const o = posts.find((q) => q.id === p.reshowOf); return `${short(p.text, 8)} <- ${o ? short(o.text, 8) : '?'} (${p.rel}x vs ${o ? o.rel : '?'}x)`; }) };
// the register the founder asked for: short studio captions (Marcel, rico, Augustas both eras), <= 12 words
const shortStudio = posts.filter((p) => ['marcelkargul', '_heyrico', 'augustasdesign-era1', 'augustasdesign-now'].includes(p.key) && p.topic === 'design' && p.words <= 12);
out.shortStudio = { n: shortStudio.length, byPrimary: Object.fromEntries(Object.entries(groupBy(shortStudio, (p) => p.primary)).map(([k, v]) => [k, { ...relStats(v), byAuthor: Object.fromEntries(Object.entries(groupBy(v, (p) => p.key)).map(([a, pv]) => [a, pv.length])) }]).sort((a, b) => b[1].n - a[1].n)), byWords: table(shortStudio, (p) => bucketWords(p.words)), emoji: { with: relStats(shortStudio.filter((p) => p.emojiN)), without: relStats(shortStudio.filter((p) => !p.emojiN)) }, twoBeat: { two: relStats(shortStudio.filter((p) => p.beats === 2)), one: relStats(shortStudio.filter((p) => p.beats === 1)) } };
// label suffixes: how a label ends ("{x} design", "{x} UI", "{x} component" ...)
const suffixOf = (p) => { const t = p.short.toLowerCase().replace(/\p{Extended_Pictographic}|\u200d|\ufe0f/gu, '').replace(/[.!…]+$/, '').trim(); if (p.words === 0 || p.words > 8) return null; if (/\bui$/.test(t)) return '{x} ui'; if (/\bdesigns?$/.test(t)) return '{x} design'; if (/\bcomponents?$/.test(t)) return '{x} component'; if (/\b(page|section|screen|view|flow)s?$/.test(t)) return '{x} page/section/screen/view'; return 'other ending'; };
out.labelSuffix = Object.fromEntries(Object.entries(groupBy(posts.filter((p) => p.topic === 'design' && p.key !== 'kargulstudio' && suffixOf(p)), (p) => suffixOf(p))).map(([k, v]) => [k, { ...relStats(v), byAuthor: Object.fromEntries(Object.entries(groupBy(v, (p) => p.key)).map(([a, pv]) => [a, pv.length])) }]));
out.posts = posts.map(({ text, ...p }) => p);
fs.writeFileSync(outFile, JSON.stringify(out, null, 1));
console.log('wrote', outFile, 'posts', posts.length);
for (const [k, a] of Object.entries(out.authors)) console.log(k.padEnd(22), 'media', String(a.media).padStart(4), 'design', String(a.design).padStart(4), 'words', a.length.medianWords, 'lower', a.casing.lowerVoiceShare, 'emoji', a.emoji.share, 'q', a.punctuation.questionShare);
