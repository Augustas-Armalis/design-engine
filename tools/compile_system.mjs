#!/usr/bin/env node
// Design-system compiler: a few owned decisions (seed.json) -> a complete, contrast-safe system.
//   node tools/compile_system.mjs <slug>        (reads system/systems/<slug>/seed.json)
//   node tools/compile_system.mjs --all
// Writes tokens.json, theme.css (CSS vars + Tailwind v4 @theme), GUIDE.md (LLM-readable must/never guide), showcase.html.
// Idea sources: Ant (theme as a function of a seed), SLDS/shadcn (paired surface/foreground roles), Fluent (5 states per role),
// Radix (each ramp step has one job), USWDS (contrast by construction), AlignUI (closed vocabularies, 3 token layers),
// Linear/Supabase (whole theme from a few OKLCH inputs).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SYS = path.join(root, 'system', 'systems');

// ---------- colour math (OKLCH -> sRGB, gamut-mapped by chroma reduction) ----------
const toLin = (L, C, H) => {
  const a = C * Math.cos((H * Math.PI) / 180), b = C * Math.sin((H * Math.PI) / 180);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b, m_ = L - 0.1055613458 * a - 0.0638541728 * b, s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s];
};
const inGamut = (rgb) => rgb.every((v) => v >= -0.0005 && v <= 1.0005);
function oklch(L, C, H) {
  let c = C;
  if (!inGamut(toLin(L, c, H))) { let lo = 0, hi = C; for (let i = 0; i < 24; i++) { const mid = (lo + hi) / 2; if (inGamut(toLin(L, mid, H))) lo = mid; else hi = mid; } c = lo; }
  const lin = toLin(L, c, H).map((v) => Math.min(1, Math.max(0, v)));
  const enc = lin.map((v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055));
  const hex = '#' + enc.map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
  return { L: +L.toFixed(3), C: +c.toFixed(3), H: +H.toFixed(1), css: `oklch(${(L * 100).toFixed(1)}% ${c.toFixed(3)} ${H.toFixed(1)})`, hex, lum: 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2] };
}
const contrast = (a, b) => { const [x, y] = [a.lum, b.lum].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

// ---------- ramps ----------
const NEUTRAL_L = [0.993, 0.982, 0.962, 0.94, 0.915, 0.885, 0.84, 0.76, 0.62, 0.5, 0.38, 0.21]; // 12 steps, light -> dark (Radix-style jobs)
const BRAND_L = [0.975, 0.945, 0.9, 0.84, 0.77, 0.69, 0.61, 0.53, 0.45, 0.37, 0.28];
const neutralTint = { cool: [0.012, 255], neutral: [0.004, 90], warm: [0.014, 75] };
function ramp(Ls, hue, peakC, shape = 'bell') {
  return Ls.map((L, i) => {
    const t = i / (Ls.length - 1);
    const f = shape === 'flat' ? 1 : Math.max(0.22, 1 - ((t - 0.62) / 0.62) ** 2); // chroma peaks around the solid steps
    return oklch(L, Math.max(0.004, peakC * f), hue);
  });
}
// dark ramps keep each step's JOB (0 = canvas/tint, 11 = strongest text) with their own lightness curve
const DARK_NEUTRAL_L = [0.16, 0.19, 0.225, 0.26, 0.3, 0.35, 0.42, 0.52, 0.66, 0.76, 0.86, 0.965];
const DARK_BRAND_L = [0.2, 0.25, 0.3, 0.36, 0.43, 0.5, 0.58, 0.66, 0.74, 0.82, 0.9];

// pick the first step (in the given order) whose contrast against every bg >= target
function pick(rampArr, bgs, target, order) {
  for (const i of order) { const c = Math.min(...bgs.map((b) => contrast(rampArr[i], b))); if (c >= target) return { i, c: +c.toFixed(2) }; }
  let best = { i: order[0], c: 0 };
  for (let i = 0; i < rampArr.length; i++) { const c = Math.min(...bgs.map((b) => contrast(rampArr[i], b))); if (c > best.c) best = { i, c: +c.toFixed(2) }; }
  return best; // reported as a breach by the contract check
}

// ---------- presets ----------
const RADIUS = { sharp: [0, 0, 2, 2, 4], tight: [2, 3, 4, 6, 10], default: [4, 6, 8, 12, 16], soft: [6, 8, 12, 16, 24], pill: [6, 10, 999, 20, 28] };
const DENSITY = { compact: { sm: 28, md: 32, lg: 40 }, default: { sm: 32, md: 40, lg: 48 }, comfortable: { sm: 36, md: 44, lg: 52 } };
const MOTION = {
  calm: { durations: [100, 180, 280, 420], ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)', enter: 'cubic-bezier(0.16, 1, 0.3, 1)', exit: 'cubic-bezier(0.4, 0, 1, 1)' },
  snappy: { durations: [70, 120, 200, 300], ease: 'cubic-bezier(0.2, 0, 0, 1)', enter: 'cubic-bezier(0.05, 0.7, 0.1, 1)', exit: 'cubic-bezier(0.3, 0, 0.8, 0.15)' },
  springy: { durations: [90, 160, 260, 380], ease: 'cubic-bezier(0.34, 1.3, 0.64, 1)', enter: 'cubic-bezier(0.34, 1.56, 0.64, 1)', exit: 'cubic-bezier(0.4, 0, 1, 1)' },
};

function shadows(style, ink) {
  const sh = (y, b, a, spread = 0) => `0 ${y}px ${b}px ${spread}px rgb(${ink} / ${a})`;
  switch (style) {
    case 'flat': return { raised: '0 0 0 1px var(--border-hairline)', float: `0 0 0 1px var(--border-control)`, modal: `0 0 0 1px var(--border-strong)` };
    case 'border': return { raised: `0 0 0 1px var(--border-hairline)`, float: `0 0 0 1px var(--border-hairline), ${sh(12, 24, 0.14, -12)}`, modal: `0 0 0 1px var(--border-hairline), ${sh(32, 64, 0.28, -24)}` };
    case 'crisp': return { raised: `0 0 0 1px var(--border-strong)`, float: `0 0 0 1px var(--text-strong), 4px 4px 0 0 var(--text-strong)`, modal: `0 0 0 1px var(--text-strong), 8px 8px 0 0 var(--text-strong)` };
    case 'layered': return { raised: `${sh(1, 2, 0.06)}, ${sh(2, 4, 0.04)}`, float: `${sh(1, 2, 0.05)}, ${sh(4, 8, 0.06)}, ${sh(12, 24, 0.08)}`, modal: `${sh(2, 4, 0.06)}, ${sh(12, 24, 0.1)}, ${sh(32, 64, 0.16)}` };
    default: return { raised: sh(1, 3, 0.08), float: `${sh(8, 24, 0.12)}`, modal: `${sh(24, 48, 0.2)}` }; // soft
  }
}

// ---------- type scale ----------
function typeScale(t) {
  const r = t.ratio || 1.25, base = t.basePx || 16;
  const px = (n) => Math.round(base * r ** n);
  const track = (size) => (size >= 56 ? t.displayTracking ?? -0.025 : size >= 32 ? -0.015 : size >= 20 ? -0.008 : size <= 13 ? 0.01 : 0);
  const lh = (size) => (size >= 56 ? t.displayLeading || 1.0 : size >= 32 ? 1.1 : size >= 20 ? 1.25 : t.bodyLeading || 1.55);
  const roles = {
    'display-xl': { min: Math.round((t.displayMaxPx || px(7)) * 0.48), max: t.displayMaxPx || px(7), family: 'display', weight: t.displayWeight || 600 },
    'display-lg': { min: Math.round(px(5) * 0.66), max: px(5), family: 'display', weight: t.displayWeight || 600 },
    'heading-lg': { px: px(3), family: 'display', weight: t.headingWeight || t.displayWeight || 600 },
    'heading-md': { px: px(2), family: t.headingFamily || 'display', weight: t.headingWeight || t.displayWeight || 600 },
    'heading-sm': { px: px(1), family: 'body', weight: 600 },
    'body-lg': { px: Math.round(base * 1.125), family: 'body', weight: 400 },
    'body-md': { px: base, family: 'body', weight: 400 },
    'body-sm': { px: Math.round(base * 0.875), family: 'body', weight: 400 },
    'label-md': { px: Math.round(base * 0.9375), family: 'body', weight: 500 },
    'label-sm': { px: Math.round(base * 0.8125), family: 'body', weight: 500 },
    'mono-sm': { px: Math.round(base * 0.8125), family: 'mono', weight: 400 },
  };
  for (const [k, v] of Object.entries(roles)) {
    const ref = v.max || v.px;
    v.lineHeight = /^(body|mono)/.test(k) ? (t.bodyLeading || 1.55) : /^label/.test(k) ? 1.3 : lh(ref); v.tracking = track(ref);
    if (v.max) v.clamp = `clamp(${v.min}px, ${((v.max - v.min) / 10.5).toFixed(2)}vw + ${(v.min - ((v.max - v.min) / 10.5) * 3.9).toFixed(1)}px, ${v.max}px)`; // linear from 390px to 1440px
  }
  return roles;
}

// ---------- compile ----------
function compile(slug) {
  const dir = path.join(SYS, slug);
  const seed = JSON.parse(fs.readFileSync(path.join(dir, 'seed.json'), 'utf8'));
  const P = seed.personality;
  const [nC, nH] = P.neutralHue != null ? [P.neutralChroma ?? 0.012, P.neutralHue] : neutralTint[P.neutralTemperature || 'neutral'];
  const bC = P.brandChroma ?? 0.16;
  const N = ramp(NEUTRAL_L, nH, nC, 'flat');
  const B = ramp(BRAND_L, P.brandHue, bC);
  const ND = ramp(DARK_NEUTRAL_L, nH, nC * 1.1, 'flat');
  const BD = ramp(DARK_BRAND_L, P.brandHue, bC * 0.9);
  const STATES = { danger: [27, 0.2], warning: [70, 0.15], success: [150, 0.15], info: [245, 0.14] };
  const white = oklch(1, 0, 0);

  const mode = (n, b, dark) => {
    const canvas = n[0], raised = dark ? n[1] : (P.raisedIsCanvas ? n[0] : oklch(1, 0, 0)), sunken = dark ? n[0] : n[2];
    const ink = n[11];
    const bgs = [canvas, raised];
    const order = [11, 10, 9, 8, 7];
    const strong = pick(n, bgs, 12, [11, 10]);
    const body = pick(n, bgs, 7, order), muted = pick(n, bgs, 4.6, [8, 9, 10, 11]);
    const ctrl = pick(n, bgs, 3, [6, 7, 8, 9, 10]);
    // accent solid: brand step where white or ink text reaches 4.5 and the fill itself is visible (>= 3:1) on canvas
    const solidOrder = P.accentStep != null ? [P.accentStep, 6, 5, 7, 4, 8, 3, 9] : [6, 5, 7, 8, 4, 9, 3];
    let solid, onSolid;
    const wantInk = P.onAccent === 'ink';
    // first pass: the preferred text colour (white unless the seed asks for ink); second pass: either
    for (const i of solidOrder) { const c = contrast(b[i], wantInk ? ink : white); if (c >= 4.5 && contrast(b[i], canvas) >= 3) { solid = i; onSolid = wantInk ? ink : white; break; } }
    if (solid == null) for (const i of solidOrder) { const w = contrast(b[i], white), k = contrast(b[i], ink); if (Math.max(w, k) >= 4.5 && contrast(b[i], canvas) >= 3) { solid = i; onSolid = w >= k ? white : ink; break; } }
    if (solid == null) for (const i of [7, 8, 9, 6, 5]) { const w = contrast(b[i], white), k = contrast(b[i], ink); if (Math.max(w, k) >= 4.5) { solid = i; onSolid = w >= k ? white : ink; break; } }
    const hoverIdx = Math.min(b.length - 1, Math.max(0, solid + (onSolid === white ? 1 : -1)));
    const accentText = pick(b, bgs, 4.5, [8, 9, 7, 10, 6]);
    const tintIdx = 1;
    const states = {};
    for (const [k, [h, c]] of Object.entries(STATES)) {
      const r = ramp(dark ? DARK_BRAND_L : BRAND_L, h, c);
      let si = 7; for (const i of [6, 7, 8, 5]) if (Math.max(contrast(r[i], white), contrast(r[i], ink)) >= 4.5) { si = i; break; }
      const txt = pick(r, [r[tintIdx], canvas], 4.5, [8, 9, 10, 7]);
      states[k] = { solid: r[si], onSolid: contrast(r[si], white) >= contrast(r[si], ink) ? white : ink, tint: r[tintIdx], text: r[txt.i], border: r[4] };
    }
    const roles = {
      'surface-canvas': canvas, 'surface-raised': raised, 'surface-sunken': sunken, 'surface-inverse': ink, 'surface-hover': n[2], 'surface-active': n[3],
      'text-strong': n[strong.i], 'text-body': n[body.i], 'text-muted': n[muted.i], 'text-inverse': n[0], 'text-on-accent': onSolid,
      'border-hairline': n[dark ? 3 : 4], 'border-control': n[ctrl.i], 'border-strong': n[dark ? 7 : 8],
      'accent-solid': b[solid], 'accent-solid-hover': b[hoverIdx], 'accent-tint': b[tintIdx], 'accent-tint-hover': b[2], 'accent-text': b[accentText.i], 'accent-border': b[4], 'focus-ring': b[accentText.i],
    };
    for (const [k, s] of Object.entries(states)) { roles[`${k}-solid`] = s.solid; roles[`${k}-on-solid`] = s.onSolid; roles[`${k}-tint`] = s.tint; roles[`${k}-text`] = s.text; roles[`${k}-border`] = s.border; }
    const report = {
      textStrong: +contrast(roles['text-strong'], canvas).toFixed(2), textBody: body.c, textMuted: muted.c, controlBorder: ctrl.c,
      onAccent: +contrast(roles['text-on-accent'], roles['accent-solid']).toFixed(2), accentTextOnCanvas: accentText.c,
      accentSolidVsCanvas: +contrast(roles['accent-solid'], canvas).toFixed(2), focusRing: +contrast(roles['focus-ring'], canvas).toFixed(2),
      dangerOnSolid: +contrast(roles['danger-on-solid'], roles['danger-solid']).toFixed(2),
      dangerTextOnTint: +contrast(roles['danger-text'], roles['danger-tint']).toFixed(2),
    };
    return { roles, report };
  };
  const light = mode(N, B, false), dark = mode(ND, BD, true);
  const contract = { textStrong: 12, textBody: 7, textMuted: 4.5, controlBorder: 3, onAccent: 4.5, accentTextOnCanvas: 4.5, focusRing: 3, dangerOnSolid: 4.5, dangerTextOnTint: 4.5 };
  const breaches = [];
  for (const [m, rep] of [['light', light.report], ['dark', dark.report]]) for (const [k, min] of Object.entries(contract)) if (rep[k] < min) breaches.push(`${m}.${k} ${rep[k]} < ${min}`);

  const R = RADIUS[P.radiusPreset || 'default'];
  const D = DENSITY[P.density || 'default'];
  const M = MOTION[P.motionPersonality || 'calm'];
  const type = typeScale(seed.type || {});
  const h = light.roles['text-strong'].hex;
  const inkRGB = `${parseInt(h.slice(1, 3), 16)} ${parseInt(h.slice(3, 5), 16)} ${parseInt(h.slice(5, 7), 16)}`;
  const SH = shadows(P.depthStyle || 'soft', inkRGB);
  const space = [0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160];
  const fam = { display: seed.fonts.display, body: seed.fonts.body, mono: seed.fonts.mono };
  const pill = P.radiusPreset === 'pill';

  const tokens = {
    meta: { name: seed.name, slug, version: seed.version || '1.0.0', status: 'approved', signature: seed.signature, personality: P, bestFor: seed.bestFor, avoidFor: seed.avoidFor, owned: seed.owned, never: seed.never, compiledWith: 'tools/compile_system.mjs' },
    primitive: {
      color: { neutral: Object.fromEntries(N.map((c, i) => [i + 1, c.css])), brand: Object.fromEntries(B.map((c, i) => [i + 1, c.css])), neutralDark: Object.fromEntries(ND.map((c, i) => [i + 1, c.css])), brandDark: Object.fromEntries(BD.map((c, i) => [i + 1, c.css])) },
      space: Object.fromEntries(space.map((v) => [v, `${v}px`])), radius: { xs: R[0], sm: R[1], md: R[2], lg: R[3], xl: R[4], full: 9999 },
      size: { control: D, icon: { sm: 16, md: 20, lg: 24 }, hitTarget: { min: 24, touch: 44 } },
      type: { families: fam, scale: type }, shadow: SH,
      motion: { duration: { instant: M.durations[0], fast: M.durations[1], base: M.durations[2], slow: M.durations[3] }, easing: { standard: M.ease, enter: M.enter, exit: M.exit }, reducedMotion: 'opacity-only, durations <= 120ms' },
      container: { content: seed.layout?.content || 1200, text: '65ch' },
    },
    semantic: {
      light: Object.fromEntries(Object.entries(light.roles).map(([k, v]) => [k, v.hex])), dark: Object.fromEntries(Object.entries(dark.roles).map(([k, v]) => [k, v.hex])),
      contract, contrastReport: { light: light.report, dark: dark.report }, breaches,
    },
    component: {
      button: { sizes: Object.fromEntries(Object.entries(D).map(([s, hh]) => [s, { height: hh, paddingX: Math.round(hh * 0.4), gap: 8, font: s === 'lg' ? 'label-md' : 'label-sm', radius: pill ? 'full' : 'md', icon: s === 'lg' ? 20 : 16 }])), variants: ['solid', 'soft', 'outline', 'ghost', 'link'], tones: ['accent', 'neutral', 'danger'], states: ['rest', 'hover', 'pressed', 'focus-visible', 'disabled', 'loading'] },
      input: { sizes: Object.fromEntries(Object.entries(D).map(([s, hh]) => [s, { height: hh, paddingX: Math.round(hh * 0.3), font: s === 'sm' ? 'body-sm' : 'body-md', radius: 'md' }])), states: ['rest', 'hover', 'focus', 'filled', 'invalid', 'disabled', 'read-only'] },
      badge: { sizes: { sm: { height: 20, paddingX: 6, font: 'label-sm' }, md: { height: 24, paddingX: 8, font: 'label-sm' } }, radius: P.radiusPreset === 'sharp' ? 'xs' : 'full', tones: ['neutral', 'accent', 'success', 'warning', 'danger', 'info'] },
      card: { padding: { sm: 16, md: 24, lg: 32 }, radius: 'lg', depth: 'raised' },
    },
    naming: { cssVarPattern: '--{group}-{role}[-{modifier}]', groups: ['surface', 'text', 'border', 'accent', 'danger', 'warning', 'success', 'info', 'focus'], forbidden: ['raw hex/rgb in components', 'primitive ramp steps in components', 'font sizes off the type scale', 'spacing off the space scale', 'radius outside the radius ramp'] },
  };
  fs.writeFileSync(path.join(dir, 'tokens.json'), JSON.stringify(tokens, null, 2));

  // ---------- theme.css ----------
  const vars = (roles) => Object.entries(roles).map(([k, v]) => `  --${k}: ${v.css};`).join('\n');
  const tvars = Object.entries(type).map(([k, v]) => `  --text-${k}: ${v.clamp || v.px + 'px'};\n  --text-${k}--line-height: ${v.lineHeight};\n  --text-${k}--letter-spacing: ${v.tracking}em;\n  --text-${k}--font-weight: ${v.weight};`).join('\n');
  const css = `/* ${seed.name}: compiled by tools/compile_system.mjs. Do not edit; change seed.json and recompile. */
:root {
  color-scheme: light;
  --font-display: ${fam.display};
  --font-sans: ${fam.body};
  --font-mono: ${fam.mono};
${vars(light.roles)}
  --radius-xs: ${R[0]}px; --radius-sm: ${R[1]}px; --radius-md: ${R[2]}px; --radius-lg: ${R[3]}px; --radius-xl: ${R[4]}px; --radius-full: 9999px;
  --control-sm: ${D.sm}px; --control-md: ${D.md}px; --control-lg: ${D.lg}px;
  --shadow-raised: ${SH.raised}; --shadow-float: ${SH.float}; --shadow-modal: ${SH.modal};
  --dur-instant: ${M.durations[0]}ms; --dur-fast: ${M.durations[1]}ms; --dur-base: ${M.durations[2]}ms; --dur-slow: ${M.durations[3]}ms;
  --ease-standard: ${M.ease}; --ease-enter: ${M.enter}; --ease-exit: ${M.exit};
${space.map((v) => `  --space-${v}: ${v}px;`).join('\n')}
  --content-max: ${tokens.primitive.container.content}px;
${tvars}
}
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { color-scheme: dark;
${vars(dark.roles)}
} }
:root[data-theme="dark"] { color-scheme: dark;
${vars(dark.roles)}
}
@media (prefers-reduced-motion: reduce) { :root { --dur-fast: 0ms; --dur-base: 0ms; --dur-slow: 0ms; } }
@media (pointer: coarse) { :root { --control-sm: 44px; --control-md: 44px; --control-lg: ${Math.max(48, D.lg)}px; } }

/* Tailwind v4 (paste below @import "tailwindcss"): role utilities like bg-surface-canvas, text-text-muted, border-border-hairline, rounded-md, shadow-float */
@theme inline {
${Object.keys(light.roles).map((k) => `  --color-${k}: var(--${k});`).join('\n')}
  --shadow-raised: var(--shadow-raised); --shadow-float: var(--shadow-float); --shadow-modal: var(--shadow-modal);
}
`;
  fs.writeFileSync(path.join(dir, 'theme.css'), css);

  // ---------- GUIDE.md (Primer-style: must / never, pairings, signature) ----------
  const guide = `# ${seed.name}

${seed.signature}

**Best for:** ${(seed.bestFor || []).join('; ')}
**Avoid for:** ${(seed.avoidFor || []).join('; ')}
**Personality knobs:** hue ${P.brandHue}, ${P.neutralTemperature || 'custom'} neutrals, ${P.radiusPreset} radius, ${P.depthStyle} depth, ${P.density} density, ${P.motionPersonality} motion.
**Load:** \`<link rel="stylesheet" href="${seed.fonts.href || ''}">\` then \`theme.css\`.

## Owned decisions (what makes this system recognisable; keep them)
${(seed.owned || []).map((o) => `- ${o}`).join('\n')}

## Type
Display: ${fam.display.split(',')[0]} · Body: ${fam.body.split(',')[0]} · Mono: ${fam.mono.split(',')[0]}

| role | size | line-height | tracking | weight | family |
|---|---|---|---|---|---|
${Object.entries(type).map(([k, v]) => `| ${k} | ${v.clamp ? `${v.min}-${v.max}px fluid` : v.px + 'px'} | ${v.lineHeight} | ${v.tracking}em | ${v.weight} | ${v.family} |`).join('\n')}

## Colour roles (use roles, never ramp steps or hex)
| role | light | dark |
|---|---|---|
${Object.keys(light.roles).map((k) => `| --${k} | ${light.roles[k].hex} | ${dark.roles[k].hex} |`).join('\n')}

Contrast (computed, WCAG 2.x): light ${JSON.stringify(light.report)}; dark ${JSON.stringify(dark.report)}.${breaches.length ? `\n\n**BREACHES:** ${breaches.join('; ')}` : ' All contract targets met.'}

## Allowed pairings
- Text on surface-*: text-strong, text-body, text-muted. text-muted never below body-sm.
- On accent-solid: text-on-accent only. On *-tint: matching *-text only.
- Borders: border-hairline separates, border-control outlines inputs/controls (>= 3:1), border-strong for emphasis.
- Focus: 2px focus-ring outline, 2px offset, on every focusable element.

## Must
- MUST use only the radius ramp (xs ${R[0]} / sm ${R[1]} / md ${R[2] === 999 ? 'full' : R[2]} / lg ${R[3]} / xl ${R[4]}); nested radius = outer - padding.
- MUST use control heights ${D.sm}/${D.md}/${D.lg}px; buttons and inputs at the same size sit flush.
- MUST space on the scale (${space.join(', ')}).
- MUST use durations ${M.durations.join('/')}ms with ease-enter for entrances, ease-exit for exits; reduced motion = opacity only.
- MUST use depth "${P.depthStyle}": raised = \`${SH.raised}\`.

## Never
- NEVER invent token names. If a role is missing, use the nearest existing role and flag it.
- NEVER use raw colours, off-scale sizes, or a second accent hue.
${(seed.never || []).map((x) => `- NEVER ${x}`).join('\n')}
`;
  fs.writeFileSync(path.join(dir, 'GUIDE.md'), guide);

  // ---------- showcase.html ----------
  const btn = (v, s, extra = '', label = 'Continue') => `<button class="btn btn-${v} btn-${s} ${extra}" ${extra.includes('disabled') ? 'disabled' : ''}>${label}</button>`;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${seed.name}: design system showcase</title>
${seed.fonts.href ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="${seed.fonts.href}">` : ''}
<link rel="stylesheet" href="theme.css">
<style>
*{box-sizing:border-box;margin:0}body{background:var(--surface-canvas);color:var(--text-body);font:400 var(--text-body-md)/var(--text-body-md--line-height) var(--font-sans);-webkit-font-smoothing:antialiased}
.wrap{max-width:var(--content-max);margin:0 auto;padding:var(--space-64) var(--space-24)}
section{padding:var(--space-48) 0;border-top:1px solid var(--border-hairline)}
h1{font-family:var(--font-display);font-size:var(--text-display-xl);line-height:var(--text-display-xl--line-height);font-weight:var(--text-display-xl--font-weight);letter-spacing:var(--text-display-xl--letter-spacing);color:var(--text-strong);max-width:16ch}
h2{font-family:var(--font-display);font-size:var(--text-heading-md);line-height:var(--text-heading-md--line-height);font-weight:var(--text-heading-md--font-weight);letter-spacing:var(--text-heading-md--letter-spacing);color:var(--text-strong);margin-bottom:var(--space-24)}
.lede{font-size:var(--text-body-lg);line-height:var(--text-body-lg--line-height);color:var(--text-muted);max-width:60ch;margin-top:var(--space-20)}
.row{display:flex;flex-wrap:wrap;gap:var(--space-12);align-items:center;margin-bottom:var(--space-16)}
.lbl{font:500 var(--text-label-sm)/1.4 var(--font-mono);color:var(--text-muted);width:110px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid transparent;font-family:var(--font-sans);font-weight:500;line-height:1;font-size:var(--text-label-md);border-radius:var(--radius-md);cursor:pointer;transition:background var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard);min-width:44px}
.btn-sm{height:var(--control-sm);padding:0 12px;font-size:var(--text-label-sm)}.btn-md{height:var(--control-md);padding:0 16px}.btn-lg{height:var(--control-lg);padding:0 20px}
.btn-solid{background:var(--accent-solid);color:var(--text-on-accent)}.btn-solid:hover,.btn-solid.is-hover{background:var(--accent-solid-hover)}
.btn-soft{background:var(--accent-tint);color:var(--accent-text)}.btn-soft:hover,.btn-soft.is-hover{background:var(--accent-tint-hover)}
.btn-outline{background:var(--surface-raised);color:var(--text-strong);border-color:var(--border-control)}.btn-outline:hover,.btn-outline.is-hover{background:var(--surface-hover)}
.btn-ghost{background:transparent;color:var(--text-strong)}.btn-ghost:hover,.btn-ghost.is-hover{background:var(--surface-hover)}
.btn-danger{background:var(--danger-solid);color:var(--danger-on-solid)}
.btn:focus-visible,.btn.is-focus{outline:2px solid var(--focus-ring);outline-offset:2px}
.btn:disabled{opacity:.5;cursor:not-allowed}
.field{display:grid;gap:8px;width:260px}.field label{font:500 var(--text-label-md)/1.3 var(--font-sans);color:var(--text-strong)}
.input{height:var(--control-md);padding:0 12px;border:1px solid var(--border-control);border-radius:var(--radius-md);background:var(--surface-raised);color:var(--text-strong);font:400 var(--text-body-md)/1 var(--font-sans)}
.input:focus,.input.is-focus{outline:2px solid var(--focus-ring);outline-offset:1px;border-color:var(--accent-border)}
.input.invalid{border-color:var(--danger-text)}.hint{font-size:var(--text-body-sm);color:var(--text-muted)}.err{font-size:var(--text-body-sm);color:var(--danger-text)}
.badge{display:inline-flex;align-items:center;height:24px;padding:0 8px;border-radius:${P.radiusPreset === 'sharp' ? 'var(--radius-xs)' : 'var(--radius-full)'};font:500 var(--text-label-sm)/1 var(--font-sans)}
.b-neutral{background:var(--surface-active);color:var(--text-strong)}.b-accent{background:var(--accent-tint);color:var(--accent-text)}
.b-success{background:var(--success-tint);color:var(--success-text)}.b-warning{background:var(--warning-tint);color:var(--warning-text)}.b-danger{background:var(--danger-tint);color:var(--danger-text)}.b-info{background:var(--info-tint);color:var(--info-text)}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:var(--space-24)}
.card{background:var(--surface-raised);border-radius:var(--radius-lg);padding:var(--space-24);box-shadow:var(--shadow-raised)}
.card h3{font:600 var(--text-heading-sm)/1.3 var(--font-sans);color:var(--text-strong);margin-bottom:8px}.card p{color:var(--text-muted);font-size:var(--text-body-sm);line-height:1.55}
.card.float{box-shadow:var(--shadow-float)}
table{width:100%;border-collapse:collapse;font-size:var(--text-body-sm)}th{text-align:left;font:500 var(--text-label-sm)/1.3 var(--font-sans);color:var(--text-muted);padding:12px;border-bottom:1px solid var(--border-strong)}
td{padding:12px;border-bottom:1px solid var(--border-hairline);color:var(--text-body)}td.num{font-family:var(--font-mono);font-variant-numeric:tabular-nums;text-align:right;color:var(--text-strong)}
.swatches{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:var(--space-16)}.sw{display:grid;gap:8px;font:500 var(--text-label-sm)/1.3 var(--font-mono);color:var(--text-body)}.sw i{display:block;height:56px;border-radius:var(--radius-sm);border:1px solid var(--border-hairline)}
.spec{font:400 var(--text-mono-sm)/1.5 var(--font-mono);color:var(--text-muted)}
</style></head><body><main class="wrap">
<header><p class="spec">${seed.name} · design system showcase · compiled</p><h1>${seed.showcaseHeadline || seed.name}</h1><p class="lede">${seed.signature}</p></header>
<section><h2>Buttons</h2>
${['solid', 'soft', 'outline', 'ghost'].map((v) => `<div class="row"><span class="lbl">${v}</span>${btn(v, 'sm')}${btn(v, 'md')}${btn(v, 'lg')}${btn(v, 'md', 'is-hover', 'Hover')}${btn(v, 'md', 'is-focus', 'Focus')}${btn(v, 'md', 'disabled', 'Disabled')}</div>`).join('')}
<div class="row"><span class="lbl">danger</span>${btn('danger', 'md', '', 'Delete project')}</div></section>
<section><h2>Inputs</h2><div class="row" style="align-items:flex-start;gap:var(--space-24)">
<div class="field"><label for="a">Work email</label><input id="a" class="input" placeholder="name@company.com"><span class="hint">We send the invite here.</span></div>
<div class="field"><label for="b">Focused</label><input id="b" class="input is-focus" value="ada@northwind.dev"></div>
<div class="field"><label for="c">Invalid</label><input id="c" class="input invalid" value="ada@" aria-invalid="true" aria-describedby="ce"><span class="err" id="ce">Enter a full email address.</span></div>
<div class="field"><label for="d">Disabled</label><input id="d" class="input" value="Locked" disabled></div></div></section>
<section><h2>Badges</h2><div class="row">${['neutral', 'accent', 'success', 'warning', 'danger', 'info'].map((t) => `<span class="badge b-${t}">${t[0].toUpperCase() + t.slice(1)}</span>`).join('')}</div></section>
<section><h2>Cards and depth</h2><div class="cards"><div class="card"><h3>Raised</h3><p>Default container depth for grouped content. Uses the raised shadow token only.</p></div><div class="card float"><h3>Floating</h3><p>Menus, popovers and anything above the page plane use the float token.</p></div><div class="card"><h3>Nested radius</h3><p>Inner elements take the outer radius minus the padding between them.</p></div></div></section>
<section><h2>Table</h2><table><thead><tr><th>Account</th><th>Plan</th><th style="text-align:right">MRR</th><th>Status</th></tr></thead><tbody>
<tr><td>Northwind Labs</td><td>Growth</td><td class="num">$4,280</td><td><span class="badge b-success">Active</span></td></tr>
<tr><td>Halden &amp; Co</td><td>Starter</td><td class="num">$640</td><td><span class="badge b-warning">Past due</span></td></tr>
<tr><td>Orbital Freight</td><td>Scale</td><td class="num">$12,900</td><td><span class="badge b-info">Trial</span></td></tr></tbody></table><p class="spec" style="margin-top:12px">Sample data.</p></section>
<section><h2>Colour roles</h2><div class="swatches">${Object.keys(light.roles).filter((k) => !/-(border|hover)$/.test(k) && !/on-solid|on-accent|inverse/.test(k)).map((k) => `<div class="sw"><i style="background:var(--${k})"></i>--${k}</div>`).join('')}</div></section>
<section><h2>Type scale</h2>${Object.entries(type).map(([k, v]) => `<p style="font-family:var(--font-${v.family === 'body' ? 'sans' : v.family});font-size:var(--text-${k});line-height:${v.lineHeight};font-weight:${v.weight};letter-spacing:${v.tracking}em;color:var(--text-strong);margin-bottom:12px">${k} · The ledger closes itself</p>`).join('')}</section>
</main></body></html>`;
  fs.writeFileSync(path.join(dir, 'showcase.html'), html);
  return { slug, breaches, light: light.report, dark: dark.report };
}

const arg = process.argv[2];
if (!arg) { console.error('usage: compile_system.mjs <slug>|--all'); process.exit(2); }
const slugs = arg === '--all' ? fs.readdirSync(SYS).filter((d) => fs.existsSync(path.join(SYS, d, 'seed.json'))) : [arg];
let bad = 0;
for (const s of slugs) {
  try { const r = compile(s); console.log(`${s}: ${r.breaches.length ? 'BREACH ' + r.breaches.join('; ') : 'contract met'}`); if (r.breaches.length) bad++; }
  catch (e) { console.log(`${s}: ERROR ${e.stack}`); bad++; }
}
process.exit(bad ? 1 : 0);
