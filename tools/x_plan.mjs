#!/usr/bin/env node
// "Designs for the day": plans 3-5 X posts across the four founder accounts from the asset library and what already went out.
//
//   node tools/x_plan.mjs plan --date 2026-10-23 [--count 4] [--label "sample day 1"]
//       picks the day's posts (open series first, then the rotation), assigns account + Vilnius slot, drafts each caption in
//       that account's voice, checks it, and writes library/x-days/<date>/plan.json, plan.md and x-handoff.json
//   node tools/x_plan.mjs sheet --date 2026-10-23     renders library/x-days/<date>/day.png: every post at X's 514px feed
//       tile (the crop X shows) with account, time and caption, for the founder's verdict
//   node tools/x_plan.mjs posted --date 2026-10-23 [--ids p1,p2]   appends a day's posts to library/x-days/posted.json
//       once the founder confirms they went out (the design engine never posts, schedules or sends anything)
//   node tools/x_plan.mjs history                     what went out, by account, format and series
//
// Rules: knowledge/x/x-strategy.md (XS-01..27), knowledge/x/caption-voice.md (CV-01..13); numbers from knowledge/x/cadence.json,
// with system/x/rotation.json as the fallback. Formats: system/x/formats.json. Hand-off: system/x/x-handoff.schema.json.
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { spawnSync } from 'node:child_process'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const [cmd, ...rest] = process.argv.slice(2)
const flag = (n, d) => { const i = rest.indexOf(`--${n}`); return i > -1 && rest[i + 1] && !rest[i + 1].startsWith('--') ? rest[i + 1] : d }
const rj = (p, d = null) => { try { return JSON.parse(fs.readFileSync(path.join(root, p), 'utf8')) } catch { return d } }
const wj = (p, v) => fs.writeFileSync(path.join(root, p), JSON.stringify(v, null, 2) + '\n')
const TZ = 'Europe/Vilnius'
const DAY = 86400000

const formats = rj('system/x/formats.json').formats
const fmt = (id) => formats.find((f) => f.id === id)
const rotation = rj('system/x/rotation.json')
const cadence = rj('knowledge/x/cadence.json', {})
const accounts = rj('system/x/accounts.json').accounts
const captions = rj('system/x/captions.json')
const ledgerPath = 'library/x-days/posted.json'
const posted = rj(ledgerPath, { posts: [] }).posts
const familyOf = (fid) => Object.entries(rotation.families).find(([, l]) => l.includes(fid))?.[0] || 'other'
const voiceOf = (handle) => accounts.find((a) => a.handle === handle)?.voice

// ---- settings: cadence.json wins, rotation.json fills (overrides are listed in the plan's notes) ----
const notes = []
const D = { ...rotation.daily, ...(cadence.dailyPosts && { min: cadence.dailyPosts.min, max: cadence.dailyPosts.max, perAccountMax: cadence.dailyPosts.perAccountMaxMedia, minGapMinutes: (cadence.dailyPosts.minGapSameAccountHours ?? 6) * 60 }) }
if (cadence.dailyPosts) notes.push(`daily volume from knowledge/x/cadence.json: ${D.min}-${D.max} posts, <= ${cadence.dailyPosts.augustasMaxPerDay} on @augustasdesign, <= ${cadence.dailyPosts.coFounderMaxPerDay} per co-founder, >= ${cadence.dailyPosts.minGapSameAccountHours} h apart on one account (XS-01, XS-02)`)
// who gets scheduled (system/x/accounts.json): manual accounts post by hand and only get a 'yours to post' list
const acct = (h) => accounts.find((a) => a.handle === h)
const scheduled = accounts.filter((a) => a.scheduled !== false), manualAccts = accounts.filter((a) => a.manual)
const isSched = (h) => scheduled.some((a) => a.handle === h)
const freshOnly = scheduled.length > 0 && scheduled.every((a) => a.freshOnly)
notes.push(`scheduled accounts: ${scheduled.map((a) => `@${a.handle} (<= ${a.maxPerDay ?? 1}/day${a.freshOnly ? ', never-posted designs only' : ''})`).join(', ') || 'none'}; by hand only: ${manualAccts.map((a) => `@${a.handle}`).join(', ') || 'none'} (system/x/accounts.json)`)
const maxFor = (h) => acct(h)?.maxPerDay ?? (h === 'augustasdesign' ? (cadence.dailyPosts?.augustasMaxPerDay ?? 2) : (cadence.dailyPosts?.coFounderMaxPerDay ?? 1))
const slotTimes = [...new Set([...(cadence.slotsLocal || rotation.slotsLocal).map((s) => s.time), ...scheduled.flatMap((a) => a.slots || [])])].sort()
const slots = slotTimes.map((t) => {
  const s = (cadence.slotsLocal || rotation.slotsLocal).find((x) => x.time === t) || { time: t, role: 'account slot', accounts: [] }
  const hs = [...new Set([...(s.accounts || []), ...scheduled.filter((a) => a.slots?.includes(t)).map((a) => a.handle)])]
  return { time: t, role: s.role || '', accounts: hs.filter((h) => isSched(h) && (!acct(h).slots || acct(h).slots.includes(t))), optional: /optional/.test(s.role || '') || !!s.optional, why: s.why }
}).filter((s) => s.accounts.length)
const S = cadence.series || {}
const gapOf = (prev, stage) => ({ 'closeup>full': S.closeupToFullDays, 'full>strips': S.fullToStripsDays, 'strips>motion': S.stillToMotionQuoteDays, 'hero>motion': S.stillToMotionQuoteDays, 'section>closeup': S.closeupToFullDays })[`${prev}>${stage}`] || rotation.series.gapsDays[stage] || [1, 3]
const maxShowings = S.maxShowingsPerAsset ?? 3, maxParallel = S.projectSeries?.maxParallel ?? 2
const mult = (key) => cadence.formatMultipliers?.[key] ?? 1
const subj = (s) => cadence.subjectMultipliers?.[s] ?? 1

// ---- time helpers (slots are Vilnius local; XS-04) ----
const offsetOn = (date, tz) => { const p = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'longOffset' }).formatToParts(new Date(`${date}T12:00:00Z`)).find((x) => x.type === 'timeZoneName').value; return p === 'GMT' ? '+00:00' : p.replace('GMT', '') }
const iso = (date, time) => `${date}T${time}:00${offsetOn(date, TZ)}`
const etOf = (date, time) => new Intl.DateTimeFormat('en-GB', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date(iso(date, time)))
const daysBetween = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / DAY)

// ---- library ----
const index = rj('library/index.json')
if (!index) { console.error('library/index.json missing: run node tools/library.mjs index'); process.exit(1) }
const manifest = (a) => rj(path.join(a.dir, 'manifest.json'))
const projects = index.projects
const projectFile = (id) => rj(`library/${id}/project.json`, {})

// caption.md: "## <format> [first|follow|second]" sections with "- <handle>: <caption>" lines, plus "reply <voice>: ..." lines
const captionMd = (a) => {
  const p = path.join(root, a.dir, 'caption.md'); if (!fs.existsSync(p)) return { lines: {}, replies: {} }
  const lines = {}, replies = {}; let sec = null
  for (const l of fs.readFileSync(p, 'utf8').split('\n')) {
    const h = l.match(/^##\s+([\w-]+)(?:\s+(first|follow|second))?\s*$/); if (h) { sec = `${h[1]}:${h[2] || 'first'}`; continue }
    const c = l.match(/^-\s+@?(\w+):\s+(.+)$/); if (c && sec) { ((lines[sec] ||= {})[c[1]] ||= []).push(c[2].trim()); continue }
    const r = l.match(/^reply\s+(\w+):\s+(.+)$/); if (r) replies[r[1]] = r[2].trim()
  }
  return { lines, replies }
}

// ---- caption checks: Larpo copy rules (mirrors larpo-x-engine shared/gate.mjs) + the voice rules (CV-01..13) ----
let xGate = null
for (const dir of [process.env.X_ENGINE_DIR, path.join(os.homedir(), 'dev', 'larpo-x-engine')].filter(Boolean)) {
  const g = path.join(dir, 'shared', 'gate.mjs')
  if (fs.existsSync(g)) { try { xGate = (await import(pathToFileURL(g).href)).checkCaption; notes.push(`captions also pass the X engine's own checkCaption (~/${path.relative(os.homedir(), g)}), the check its Worker runs before Buffer`) } catch {} break }
}
const EMOJI = /\p{Extended_Pictographic}/gu
const checkCaption = (text, voice, conceptNames, allowEmoji) => {
  const f = []
  if (!text) return ['empty']
  if (/\{[a-z]+\}/.test(text)) f.push(`needs words: ${text.match(/\{[a-z]+\}/g).join(' ')}`)
  if (/[A-Z]/.test(text)) f.push('not lowercase (CV-01)')
  if (text.includes('—')) f.push('em dash (CV-12)')
  if (/\?/.test(text)) f.push('question (CV-05, XS-21)')
  if (/(^|\s)#\w/.test(text)) f.push('hashtag')
  if (/(^|\W)@\w/.test(text)) f.push('@mention in the post (XS-22)')
  if (/https?:|www\.|\.(com|studio|io|dev|app)\b/.test(text)) f.push('link in the post (XS-22)')
  if (text.includes('!')) f.push('exclamation mark')
  const emo = text.match(EMOJI) || []
  if (emo.length > 1 || (emo.length && !allowEmoji)) f.push(`emoji (${emo.length}; only @augustasdesign, one at the end, CV-06)`)
  if (emo.length === 1 && allowEmoji && !text.trim().endsWith(emo[0])) f.push('emoji not at the end (CV-06)')
  const words = text.replace(EMOJI, '').split(/\s+/).filter(Boolean).length, band = captions.voices[voice]?.words
  if (band && (words < band[0] || words > band[1])) f.push(`${words} words, ${voice} writes ${band[0]}-${band[1]} (CV-03)`)
  for (const b of captions.banned) if (new RegExp(`(^|[^\\w-])${b}(?![\\w-])`, 'i').test(text)) f.push(`banned word "${b}" (CV-12)`)
  for (const n of conceptNames) if (new RegExp(`\\b${n}\\b`, 'i').test(text)) f.push(`names the fictional brand "${n}" (CV-02, XS-24)`)
  if (!captions.voices[voice]?.judgement) for (const w of captions.judgementWords) if (new RegExp(`\\b${w}\\b`, 'i').test(text)) f.push(`verdict word "${w}" on a co-founder account (CV-04)`)
  if (xGate) { const r = xGate(text, { conceptName: conceptNames.join(', '), allowEmoji }); for (const x of r.findings) f.push(`x-engine gate: ${x.rule}`) }
  return f
}
const trigrams = (t) => { const w = t.toLowerCase().replace(EMOJI, '').replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean); const s = new Set(); for (let i = 0; i + 2 < w.length; i++) s.add(w.slice(i, i + 3).join(' ')); return s }

// ================= plan =================
function plan() {
  const date = flag('date'); if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '')) { console.error('usage: node tools/x_plan.mjs plan --date YYYY-MM-DD [--count N] [--label "..."]'); process.exit(2) }
  const capacity = scheduled.reduce((n, a) => n + maxFor(a.handle), 0)
  const target = Math.min(capacity, Math.max(D.min, Math.min(D.max, +flag('count', D.default ?? 4))))

  const before = posted.filter((p) => p.date < date)
  const cands = [], toMake = [], skipped = []

  // 1. open and new series, per project (XS-15..17)
  const activeProjects = new Set(before.filter((p) => p.series && daysBetween(p.date, date) <= 21).map((p) => p.project))
  for (const pr of projects) for (const s of pr.series) {
    const done = before.filter((p) => p.series?.id === s.id)
    const doneStages = new Set(done.map((p) => p.series.stage))
    const next = s.stages.find((st) => !doneStages.has(st))
    if (!next) continue
    const i = s.stages.indexOf(next), prev = i ? s.stages[i - 1] : null
    const prevPost = prev ? done.filter((p) => p.series.stage === prev).sort((a, b) => a.date.localeCompare(b.date)).at(-1) : null
    if (prev && !prevPost) continue
    const gap = prev ? gapOf(prev, next) : [0, 0], since = prevPost ? daysBetween(prevPost.date, date) : null
    if (prevPost && since < gap[0]) { skipped.push(`${s.id}: ${next} not due until ${gap[0]} day(s) after ${prev} (${prevPost.date})`); continue }
    if (!prevPost && !activeProjects.has(pr.id) && activeProjects.size >= maxParallel) { skipped.push(`${s.id}: ${maxParallel} projects already in series (XS-17)`); continue }
    const assetId = s.assets[next]
    if (!assetId) { toMake.push({ series: s.id, stage: next, due: prevPost ? `${since >= gap[1] ? 'overdue' : 'due'} (${since} d after ${prev})` : 'can start now', how: s[`${next}ToMake`] || s.motionToMake || 'design it, then add it to the library' }); continue }
    const a = index.assets.find((x) => x.id === assetId)
    if (!a || !a.postable) { skipped.push(`${s.id}: ${assetId} not postable`); continue }
    if (a.reservedFor && !isSched(a.reservedFor)) continue // yours to post by hand: listed below, never scheduled
    const f = formats.find((x) => x.seriesStage === next && a.formats.includes(x.id))
    if (!f) { skipped.push(`${s.id}: ${assetId} has no render for stage ${next}`); continue }
    cands.push({ a, f, series: { id: s.id, stage: next, index: i + 1, of: s.stages.length, prev, prevPost }, relation: prev ? 'follow' : 'first', overdue: prevPost && since >= gap[1], project: pr.id })
  }
  // 2. assets outside a series: never shown, or a second showing in the 7-14 / 30-60 day windows (XS-18)
  const inSeries = new Set(projects.flatMap((p) => p.series.flatMap((s) => Object.values(s.assets).filter(Boolean))))
  for (const a of index.assets) {
    if (!a.postable || inSeries.has(a.id) || (a.reservedFor && !isSched(a.reservedFor))) continue
    const shows = before.filter((p) => p.assetId === a.id), last = shows.map((p) => p.date).sort().at(-1)
    if (freshOnly && shows.length) continue // the scheduled accounts only get designs never posted anywhere
    const windows = S.secondShowingDays || [[7, 14], [30, 60]]
    if (shows.length >= maxShowings) continue
    if (shows.length && !windows.some(([lo, hi]) => daysBetween(last, date) >= lo && daysBetween(last, date) <= hi)) continue
    for (const fid of a.formats) cands.push({ a, f: fmt(fid), series: null, relation: shows.length ? 'second' : 'first', project: a.project })
  }
  // 3. score (explainable): status x format multiplier x sqrt(subject multiplier), + series and project-focus bonuses
  for (const c of cands) {
    const m = manifest(c.a)
    const st = rotation.statusWeight[c.a.status] ?? 0.5
    const key = c.relation === 'follow' && c.f.multiplierKeyFollow ? c.f.multiplierKeyFollow : c.f.multiplierKey
    const fm = mult(key), sm = Math.sqrt(subj(m.subject))
    const focus = activeProjects.has(c.project) || cands.some((o) => o !== c && o.series && o.project === c.project)
    const bonus = (c.series ? (c.overdue ? 0.5 : c.series.prev ? 0.3 : 0.15) : 0) + (focus ? 0.3 : 0)
    c.score = +(st * fm * sm + bonus).toFixed(3)
    c.why = `${c.a.status} ${st} x ${key} ${fm} x sqrt(${m.subject} ${subj(m.subject)}) + ${bonus.toFixed(2)}${c.series ? ` (series ${c.series.id} step ${c.series.index}/${c.series.of}${c.overdue ? ', overdue' : ''})` : ''}${focus ? ', project in series (XS-17 focus)' : ''}`
    c.m = m
  }
  cands.sort((x, y) => y.score - x.score)
  // 4. pick: the lead is product UI or a hero (XS-08); one per family, series and asset; the family rule relaxes only below the minimum
  const picks = [], fam = new Set(), ser = new Set(), ast = new Set()
  const leadOk = (c) => ['product', 'hero'].includes(familyOf(c.f.id))
  // relaxed pass: a family may repeat to reach the target, a format at most sameFormatMaxPerDay times (never twice on one account)
  const sameFmtMax = S.sameFormatMaxPerDay ?? 1
  const take = (relax) => {
    for (const c of cands) {
      if (picks.length >= target) break
      if (picks.includes(c) || ast.has(c.a.id) || (c.series && ser.has(c.series.id))) continue
      if (!picks.length && !leadOk(c)) continue
      if (!relax && fam.has(familyOf(c.f.id))) continue
      if (relax && picks.filter((p) => p.f.id === c.f.id).length >= sameFmtMax) continue
      picks.push(c); fam.add(familyOf(c.f.id)); ast.add(c.a.id); if (c.series) ser.add(c.series.id)
    }
  }
  take(false); if (picks.length < target) take(true)
  if (picks.length < target) toMake.push({ series: null, stage: 'any', due: `${target - picks.length} more post(s) to reach ${target}`, how: `nothing postable left in the ${Object.keys(rotation.families).filter((k) => !fam.has(k)).join(', ')} families without repeating one today; design one (a component post, a pricing or changelog section, a light/dark pair) and add it to the library` })

  // the lead keeps 08:00; the rest are placed by reach on the lead account's audience (format x subject multiplier), so
  // @augustasdesign's second slot gets the subject his followers reward (hero 1.21x over bento 0.73x), not the top status score
  const reach = (c) => mult(c.f.multiplierKey) * subj(c.m.subject)
  picks.splice(1, picks.length, ...picks.slice(1).sort((x, y) => reach(y) - reach(x)))
  // 5. accounts and slots (XS-02, XS-03, XS-19): the lead goes 08:00 on @augustasdesign; a series step moves to another account
  // than the step before (a motion follow-up stays with the account whose still it quotes); co-founders swap 16:00/19:30 daily
  const parity = Math.floor(Date.parse(date) / DAY) % 2
  const used = {}, out = []
  const toMin = (t) => +t.slice(0, 2) * 60 + +t.slice(3)
  const free = slots.map((s) => ({ ...s, accounts: /co-founder/.test(s.role) && parity ? [...s.accounts].reverse() : s.accounts }))
  const fmtOn = {}
  const okAt = (h, t, fid) => (used[h] || []).length < maxFor(h) && (used[h] || []).every((u) => Math.abs(toMin(u) - toMin(t)) >= D.minGapMinutes) && !(fmtOn[h] || []).includes(fid)
  for (const [k, c] of picks.entries()) {
    // the lead keeps @augustasdesign's 08:00 even when he posted the step before (the co-founders have ~4 followers, XS-06)
    const avoid = k > 0 && c.series?.prevPost && c.series.stage !== 'motion' ? c.series.prevPost.account : null
    const keep = c.series?.stage === 'motion' ? c.series.prevPost?.account : null
    let best = null
    for (const s of free) {
      if (s.taken || (s.optional && picks.length < 5)) continue
      const order = keep && s.accounts.includes(keep) ? [keep, ...s.accounts.filter((h) => h !== keep)] : s.accounts
      const h = order.find((x) => okAt(x, s.time, c.f.id) && x !== avoid)
      if (h) { best = { s, h }; break }
    }
    // one scheduled account: moving a series step to another account is impossible, so it stays
    if (!best && avoid) for (const s of free) { if (s.taken) continue; const h = s.accounts.find((x) => okAt(x, s.time, c.f.id)); if (h) { best = { s, h }; break } }
    if (!best) { skipped.push(`${c.a.id}: no free slot or account left today`); continue }
    best.s.taken = true; (used[best.h] ||= []).push(best.s.time); (fmtOn[best.h] ||= []).push(c.f.id)
    out.push({ c, slot: best.s, account: best.h })
  }
  out.sort((x, y) => x.slot.time.localeCompare(y.slot.time))

  // 6. captions per account voice, checked; no shared three-word run between the day's captions (CV-10)
  const label = flag('label', '')
  const items = out.map(({ c, slot, account }, k) => {
    const voice = voiceOf(account), md = captionMd(c.a), vars = c.m.captionVars || {}
    const opts = md.lines[`${c.f.id}:${c.relation}`]?.[account] ?? md.lines[`${c.f.id}:first`]?.[account] ?? []
    const usedCaps = new Set(posted.filter((p) => daysBetween(p.date, date) <= 30).map((p) => p.caption))
    let caption = opts.find((o) => !usedCaps.has(o)), src = caption ? 'caption.md' : null
    if (!caption) {
      const t = c.relation === 'second' ? captions.templates._second.second : captions.templates[c.f.id]?.[c.relation] || captions.templates[c.f.id]?.first
      caption = t?.[voice] ? t[voice].replace(/\{(\w+)\}/g, (m, v) => vars[v] ?? m) : '{caption}'
      src = `template ${captions.templates[c.f.id]?.id || ''}`.trim()
    }
    const reply = md.replies[voice] || (captions.replies[voice] || '').replace(/\{(\w+)\}/g, (m, v) => vars[v] ?? m)
    const pf = projectFile(c.project), concept = pf.conceptNames || []
    const findings = checkCaption(caption, voice, concept, voice === 'augustas')
    if (pf.fictional && !/\bconcept\b/.test(`${caption} ${reply}`)) findings.push('fictional work without "concept" in the caption or reply (CV-08)')
    const renders = c.m.renders.filter((r) => r.format === c.f.id || (c.f.id === 'full-plus-strips' && ['dashboard-full', 'dashboard-strips-3'].includes(r.format)))
    const media = renders.map((r, j) => ({ path: path.join(c.a.dir, r.file), w: r.w, h: r.h, bytes: r.bytes, sha256: r.sha256, role: r.role === 'strip' ? `strip ${r.index}/${r.of}` : r.role, name: `post-${j + 1}.png` }))
    const crop = c.m.source?.crop
    return {
      n: k + 1, postId: `${account.toLowerCase().replace(/[^a-z0-9]/g, '')}-${date}-${slot.time.replace(':', '')}`, account, platform: 'x', time: slot.time, scheduledAt: iso(date, slot.time), et: etOf(date, slot.time), slotRole: slot.role, optional: slot.optional,
      assetId: c.a.id, project: c.project, title: c.a.title, kind: c.a.kind, status: c.a.status, verdict: c.a.verdict,
      format: c.f.id, family: familyOf(c.f.id), xEngineFormat: c.f.xEngineFormat, size: media.map((x) => `${x.w}x${x.h}`).join(' + '), feed: c.f.feed,
      crop: crop ? `${crop.anchor} corner of ${crop.src} at [${crop.rect.join(', ')}] (x, y, w, h), insets ${Object.entries(crop.insets).map(([e, v]) => `${e} ${v}px`).join(', ')}; ${crop.snapped}` : c.f.crop,
      media, alt: c.m.alt, series: c.series && { id: c.series.id, stage: c.series.stage, step: c.series.index, of: c.series.of }, relation: c.relation, quotes: c.series?.prevPost?.postId || null,
      caption, captionSource: src, reply, replyAfterMinutes: [30, 150], captionFindings: findings, score: c.score, why: c.why,
      preflight: c.m.preflight ? { fail: c.m.preflight.fail, warn: c.m.preflight.warn, reports: c.m.preflight.results.map((r) => path.join(c.a.dir, r.report)) } : null,
      approval: { state: label ? 'draft' : c.a.status === 'accepted' ? 'ready' : 'hold', designVerdict: c.a.status === 'accepted' ? 'accepted' : c.a.verdict === 'partial' ? 'partial' : 'none', requireConfirm: true },
    }
  })
  for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
    const shared = [...trigrams(items[i].caption)].filter((t) => trigrams(items[j].caption).has(t))
    if (shared.length) items[j].captionFindings.push(`shares "${shared[0]}" with @${items[i].account}'s caption today (CV-10)`)
  }
  const recent = posted.filter((p) => daysBetween(p.date, date) <= (rotation.cooldowns.captionRepeatDays || 30)).map((p) => p.caption)
  for (const it of items) if (recent.includes(it.caption)) it.captionFindings.push('caption used in the last 30 days')

  // 7. yours to post by hand: assets reserved for a manual account, not yet posted, in series order, with caption options
  const stageRank = (a) => Math.min(...(manifest(a).series || []).map((x) => rotation.series.stageOrder.indexOf(x.stage)).filter((i) => i >= 0), 99)
  const manual = manualAccts.map((m) => ({
    account: m.handle,
    kit: index.assets.filter((a) => a.postable && a.reservedFor === m.handle && !posted.some((p) => p.assetId === a.id && p.date < date)).sort((x, y) => stageRank(x) - stageRank(y)).map((a) => {
      const mf = manifest(a), md = captionMd(a)
      return {
        assetId: a.id, title: a.title, status: a.status, verdict: a.verdict, series: mf.series || [],
        preflight: mf.preflight ? { fail: mf.preflight.fail, warn: mf.preflight.warn } : null, reply: md.replies[m.voice] || null,
        formats: a.formats.map((fid) => ({ format: fid, media: mf.renders.filter((r) => r.format === fid).map((r) => ({ path: path.join(a.dir, r.file), w: r.w, h: r.h })), captions: md.lines[`${fid}:first`]?.[m.handle] || md.lines[`${fid}:follow`]?.[m.handle] || [] })),
      }
    }),
  })).filter((m) => m.kit.length)

  const dir = `library/x-days/${date}`; fs.mkdirSync(path.join(root, dir), { recursive: true })
  const commit = spawnSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: root, encoding: 'utf8' }).stdout.trim()
  const planObj = { schema: 'design-engine.x-day-plan/v1', date, weekday: new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', { weekday: 'long', timeZone: TZ }), timezone: TZ, label: label || null, status: label ? `${label}, awaiting founder verdict` : 'planned, awaiting founder approval', generated: new Date().toISOString(), engine: commit, target, posts: items, manual, toMake, skipped, notes, candidates: cands.map((c) => ({ asset: c.a.id, format: c.f.id, relation: c.relation, score: c.score, picked: picks.includes(c) })) }
  wj(`${dir}/plan.json`, planObj)
  wj(`${dir}/x-handoff.json`, handoff(planObj, dir, commit))
  fs.writeFileSync(path.join(root, dir, 'plan.md'), planMd(planObj))
  console.log(planMd(planObj))
  const bad = items.filter((i) => i.captionFindings.length || (i.preflight && i.preflight.fail))
  console.log(`wrote ${dir}/plan.md, plan.json, x-handoff.json${bad.length ? `\n${bad.length} post(s) need attention (caption findings or preflight FAIL): fix before handing off` : ''}`)
  if (bad.length) process.exitCode = 1
}

// x-handoff v1 (system/x/x-handoff.schema.json): media paths relative to the hand-off file; nothing is sent anywhere
function handoff(p, dir, commit) {
  const assets = [...new Map(p.posts.map((x) => [x.assetId, x])).values()].map((x) => {
    const m = manifest(index.assets.find((a) => a.id === x.assetId))
    return {
      assetId: x.assetId, designFormat: x.xEngineFormat, kind: x.kind, conceptName: (projectFile(x.project).conceptNames || []).join(', '), sample: !!m.sample,
      ledgerId: m.verdict?.ledger ? path.basename(m.verdict.ledger, '.json') : null,
      gate: { preflight: m.preflight ? (m.preflight.fail ? 'fail' : 'pass') : 'skipped', ranAt: m.preflight?.ran || null },
      series: x.series ? { seriesId: x.series.id, label: x.series.stage, index: x.series.step } : null,
      media: x.media.map((md) => ({ path: path.relative(dir, md.path), name: md.name, mime: 'image/png', width: md.w, height: md.h, bytes: md.bytes, sha256: md.sha256, role: /strip/.test(md.role) ? 'detail' : x.media.length > 1 ? 'lead' : 'single', altText: x.alt })),
    }
  })
  const acct = (h) => accounts.find((a) => a.handle === h)
  return {
    schema: 'larpo.x-handoff/v1', handoffId: `de-${p.date}-${p.label ? 'sample' : '01'}`, createdAt: p.generated, day: p.date, timezone: TZ,
    producer: { name: 'design-engine', version: p.engine, operator: 'augustas' }, assets,
    posts: p.posts.map((x) => ({ postId: x.postId, assetId: x.assetId, account: { profileId: acct(x.account).profileId, handle: x.account, channelId: null }, platform: 'x', scheduledAt: x.scheduledAt, caption: x.caption, reply: x.reply || null, quotesPostId: x.quotes, approval: x.approval })),
  }
}

function planMd(p) {
  const L = [`# X plan: ${p.weekday} ${p.date}${p.label ? ` (${p.label})` : ''}`, '', `Status: **${p.status}**. Slots in ${p.timezone} (US Eastern in brackets). Nothing here is posted or scheduled: the founder approves, then the X engine imports \`x-handoff.json\` (its Telegram confirm and Buffer stay theirs).`, '',
    '| # | time | account | format | asset | size | caption | checks |', '|---|---|---|---|---|---|---|---|',
    ...p.posts.map((x) => `| ${x.n} | ${x.time} (${x.et} ET) | @${x.account} | ${x.format}${x.series ? ` · ${x.series.id} ${x.series.step}/${x.series.of}` : ''} | ${x.assetId} | ${x.size} | ${x.caption.replace(/\|/g, '\\|')} | ${x.captionFindings.length ? `caption: ${x.captionFindings.join('; ')}` : 'caption ok'}; preflight ${x.preflight ? `${x.preflight.fail} fail, ${x.preflight.warn} warn` : 'none'} |`), '']
  for (const x of p.posts) {
    L.push(`## ${x.n}. ${x.time} @${x.account}: ${x.title}`, '',
      `- **Format:** \`${x.format}\` (X engine: \`${x.xEngineFormat}\`), ${x.media.length} image${x.media.length > 1 ? 's' : ''}: ${x.media.map((m) => `\`${m.path}\` ${m.w}x${m.h}`).join(', ')}`,
      `- **Crop:** ${x.crop}`, `- **In the feed:** ${x.feed}`,
      `- **Caption** (${x.captionSource}): "${x.caption}"`, `- **First reply** (${x.replyAfterMinutes.join('-')} min later): "${x.reply}"`,
      x.quotes ? `- **Quotes:** ${x.quotes} (the previous step of the series, XS-16)` : `- **Quotes:** none (${x.series ? 'series start' : 'standalone'})`,
      `- **Why this, why now:** ${x.why}`,
      `- **Verdict:** ${x.status}${x.verdict ? ` (last: ${x.verdict})` : ''}; approval \`${x.approval.state}\`, Telegram confirm required`,
      `- **Preflight:** ${x.preflight ? `${x.preflight.fail} FAIL, ${x.preflight.warn} WARN (${x.preflight.reports.map((r) => `\`${r}\``).join(', ')})` : 'not run'}`, '')
  }
  for (const m of p.manual || []) {
    L.push(`## Yours to post by hand: @${m.account} (never scheduled)`, '', 'In series order: post one a day, the close-up first, then the hero or full view, then the thirds (XS-15). Caption options are written for your account; the first reply carries "concept".', '')
    for (const [i, k] of m.kit.entries()) {
      L.push(`${i + 1}. **${k.title}** (\`${k.assetId}\`, ${k.status}${k.verdict ? `, last verdict ${k.verdict}` : ''}; preflight ${k.preflight ? `${k.preflight.fail} FAIL` : 'not run'})`)
      for (const f of k.formats) L.push(`   - \`${f.format}\`: ${f.media.map((x) => `\`${x.path}\` ${x.w}x${x.h}`).join(', ')}${f.captions.length ? `; captions: ${f.captions.map((c) => `"${c}"`).join(' / ')}` : ''}`)
      if (k.reply) L.push(`   - first reply: "${k.reply}"`)
    }
    L.push('')
  }
  if (p.toMake.length) L.push('## To make (the library could not fill these)', '', ...p.toMake.map((t) => `- ${t.series ? `**${t.series}** ${t.stage}, ${t.due}: ` : `**${t.due}:** `}${t.how}`), '')
  if (p.skipped.length) L.push('## Held back', '', ...p.skipped.map((s) => `- ${s}`), '')
  L.push('## Notes', '', ...p.notes.map((n) => `- ${n}`), `- candidates: ${p.candidates.map((c) => `${c.asset} ${c.format} ${c.score}${c.picked ? ' (picked)' : ''}`).join('; ')}`, '')
  return L.join('\n')
}

// ================= sheet: the day as X shows it =================
async function sheet() {
  const date = flag('date'), dir = `library/x-days/${date}`, p = rj(`${dir}/plan.json`)
  if (!p) { console.error(`no ${dir}/plan.json: run plan first`); process.exit(1) }
  const { chromium } = await import('playwright')
  const src = (f) => pathToFileURL(path.join(root, f)).href
  // X's feed tiles (system/variety/x-post-formats.json measured_feed_tiles): 1 image at its own ratio (portrait down to 0.84),
  // 2 = two 7:8, 3 = a 7:8 left + two 16:9 right, 4 = 2x2 16:9; every tile centre-cropped
  const tiles = (media) => {
    const n = media.length, img = (m, w, h, l, t) => `<div style="position:absolute;left:${l}px;top:${t}px;width:${w}px;height:${h}px;overflow:hidden"><img src="${src(m.path)}" style="width:100%;height:100%;object-fit:cover"></div>`
    if (n === 1) { const r = Math.max(media[0].w / media[0].h, 0.84), h = Math.round(514 / r); return { h, html: img(media[0], 514, h, 0, 0) } }
    if (n === 2) return { h: 289, html: img(media[0], 256, 289, 0, 0) + img(media[1], 256, 289, 258, 0) }
    if (n === 3) return { h: 289, html: img(media[0], 256, 289, 0, 0) + img(media[1], 256, 144, 258, 0) + img(media[2], 256, 144, 258, 145) }
    return { h: 290, html: media.slice(0, 4).map((m, i) => img(m, 256, 144, (i % 2) * 258, Math.floor(i / 2) * 146)).join('') }
  }
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
  const card = (x) => { const t = tiles(x.media); return `<section><header><b>${x.time}</b> <span>${x.et} ET</span> · @${x.account}</header><p class="cap">${esc(x.caption)}</p><div class="tile" style="height:${t.h}px">${t.html}</div><p class="meta">${x.format}${x.series ? ` · ${x.series.id} step ${x.series.step}/${x.series.of}` : ''} · ${x.size}${x.quotes ? ` · quotes ${x.quotes}` : ''}</p><p class="meta">first reply: ${esc(x.reply)}</p><p class="meta ${x.captionFindings.length ? 'bad' : 'ok'}">${x.captionFindings.length ? esc(x.captionFindings.join('; ')) : 'caption checks pass'} · preflight ${x.preflight ? `${x.preflight.fail} fail` : 'n/a'}</p></section>` }
  const kitCards = (p.manual || []).flatMap((m) => m.kit.map((k) => { const f = k.formats[0]; return card({ time: 'by hand', et: '', account: m.account, caption: f.captions[0] || '(captions in plan.md)', media: f.media, format: f.format, series: null, size: f.media.map((x) => `${x.w}x${x.h}`).join(' + '), quotes: null, reply: k.reply || '', captionFindings: [], preflight: k.preflight }) }))
  const html = `<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:40px;background:#f4f4f5;font:14px/1.45 "Inter",system-ui,sans-serif;color:#0e121b;width:${Math.max(p.posts.length, Math.min(4, (p.manual || []).reduce((n, m) => n + m.kit.length, 0)), 1) * 554 + 40}px}h1{font-size:20px;margin:0 0 4px}.sub{color:#6b7180;margin:0 0 24px}main{display:flex;gap:40px;align-items:flex-start}section{width:514px;background:#fff;border-radius:16px;box-shadow:0 0 0 1px #e9eaee;padding:16px}header{color:#525866}header span{color:#a3a9b6}.cap{font-size:15px;margin:8px 0 10px}.tile{position:relative;width:514px;border-radius:14px;overflow:hidden;box-shadow:0 0 0 1px #e9eaee}.meta{color:#6b7180;font-size:12px;margin:8px 0 0}.bad{color:#b42318}.ok{color:#178c4e}</style><h1>${p.weekday} ${p.date}${p.label ? `: ${esc(p.label)}` : ''}</h1><p class="sub">${esc(p.status)}. Each post as X's feed shows it (514px wide, tiles centre-cropped). Concept work, sample data. Nothing here is posted.</p><main>${p.posts.map(card).join('')}</main>${kitCards.length ? `<h1 style="margin-top:40px">Yours to post by hand</h1><p class="sub">Reserved for the account owner, never scheduled. Caption options in plan.md.</p><main style="flex-wrap:wrap">${kitCards.join('')}</main>` : ''}`
  const htmlPath = path.join(root, dir, 'day.html'); fs.writeFileSync(htmlPath, html)
  const cols = Math.max(p.posts.length, Math.min(4, (p.manual || []).reduce((n, m) => n + m.kit.length, 0)), 1)
  const b = await chromium.launch(); const page = await b.newPage({ viewport: { width: cols * 554 + 120, height: 900 }, deviceScaleFactor: 2 })
  await page.goto(pathToFileURL(htmlPath).href); await page.waitForTimeout(800)
  await page.screenshot({ path: path.join(root, dir, 'day.png'), fullPage: true }); await b.close(); fs.unlinkSync(htmlPath)
  console.log(`wrote ${dir}/day.png`)
}

// ================= posted / history =================
function markPosted() {
  const date = flag('date'), p = rj(`library/x-days/${date}/plan.json`); if (!p) { console.error('no plan for that date'); process.exit(1) }
  const ids = flag('ids') ? flag('ids').split(',') : p.posts.map((x) => x.postId)
  const led = rj(ledgerPath)
  for (const x of p.posts.filter((y) => ids.includes(y.postId))) {
    if (led.posts.some((y) => y.postId === x.postId)) continue
    led.posts.push({ postId: x.postId, date, time: x.time, account: x.account, platform: x.platform, assetId: x.assetId, project: x.project, format: x.format, series: x.series && { id: x.series.id, stage: x.series.stage }, quotes: x.quotes, caption: x.caption, url: null, metrics: null, recorded: new Date().toISOString() })
  }
  wj(ledgerPath, led); console.log(`${ledgerPath}: ${led.posts.length} posts`)
}
function history() {
  const by = (k) => posted.reduce((m, p) => ((m[p[k]] = (m[p[k]] || 0) + 1), m), {})
  console.log(`${posted.length} posts`, { account: by('account'), format: by('format') })
  for (const p of posted.slice(-20)) console.log(`${p.date} ${p.time} @${p.account} ${p.format} ${p.assetId}${p.series ? ` ${p.series.id}:${p.series.stage}` : ''}`)
}

if (cmd === 'plan') plan()
else if (cmd === 'sheet') await sheet()
else if (cmd === 'posted') markPosted()
else if (cmd === 'history') history()
else { console.error('usage: node tools/x_plan.mjs plan|sheet|posted|history --date YYYY-MM-DD'); process.exit(2) }
