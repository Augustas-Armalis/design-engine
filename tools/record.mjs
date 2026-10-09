#!/usr/bin/env node
// Record a page's load-in as a frame-exact video with Reel (deterministic headless capture, virtual clock).
//   node tools/record.mjs <url> [--name ferry-hero] [--fps 60] [--duration 8] [--scale 2.6667] [--dark] [--preset h264|prores4444|x|gif|webp]
// Defaults: 1440x900 viewport at scale 2.6667 = 3840x2400 (4K 16:10), 60 fps, 8 s, H.264 MP4.
// Output: work/<name>/<name>-loadin-4k60.mp4 (+ the Reel recording folder next to it, lossless master included).
// Finds Reel at $REEL_DIR, else ../reel (the team package layout), else ~/Documents/web video recorder.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const [url, ...rest] = process.argv.slice(2);
const flag = (n, d) => { const i = rest.indexOf(`--${n}`); return i > -1 ? rest[i + 1] : d; };
const has = (n) => rest.includes(`--${n}`);
if (!url || url.startsWith('--')) {
  console.error('usage: node tools/record.mjs <url> [--name n] [--fps 60] [--duration 8] [--scale 2.6667] [--dark] [--preset h264] [--out file]');
  process.exit(2);
}

const candidates = [process.env.REEL_DIR, path.join(root, '..', 'reel'), path.join(os.homedir(), 'Documents', 'web video recorder')].filter(Boolean);
const reel = candidates.find((d) => fs.existsSync(path.join(d, 'apps/cli/bin/reel.js')));
if (!reel) {
  console.error(`Reel not found. Looked in:\n  ${candidates.join('\n  ')}\nSet REEL_DIR or run ./setup.sh from the package root.`);
  process.exit(1);
}

const fps = flag('fps', '60');
const scale = flag('scale', '2.6667');
const duration = flag('duration', '8');
const preset = flag('preset', 'h264');
const name = flag('name', new URL(url).port ? `localhost-${new URL(url).port}` : new URL(url).hostname.replace(/\W+/g, '-'));
const ext = { h264: 'mp4', hevc: 'mp4', x: 'mp4', 'x-api': 'mp4', prores4444: 'mov', prores422hq: 'mov', vp9: 'webm', gif: 'gif', webp: 'webp' }[preset] || 'mp4';
const k = Math.round(Number(scale) * 1440) >= 3800 ? '4k' : `${Math.round(Number(scale) * 1440)}w`;
const dir = path.join(root, 'work', name);
fs.mkdirSync(dir, { recursive: true });
const out = path.resolve(flag('out', path.join(dir, `${name}-loadin-${k}${fps}.${ext}`)));

const args = ['apps/cli/bin/reel.js', 'record', url, '--fps', fps, '--scale', scale, '--duration', duration, '--hold', flag('hold', '0.5'),
  '--preset', preset, '--out', out, '--dir', path.join(dir, `reel-${k}${fps}`)];
if (has('dark')) args.push('--dark');
if (flag('selector')) args.push('--selector', flag('selector'));
if (flag('css')) args.push('--css', flag('css'));
console.log(`Reel: ${url} -> ${path.relative(root, out)} (${k}, ${fps} fps, ${duration}s, ${preset})`);
const r = spawnSync(process.execPath, args, { cwd: reel, stdio: 'inherit' });
if (r.status !== 0) process.exit(r.status ?? 1);
console.log(`saved ${out}`);
