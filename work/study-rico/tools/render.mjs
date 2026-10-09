#!/usr/bin/env node
// Build the study app, serve dist on a throwaway port, screenshot a screen at the reference's pixel size, then shut down.
//   node render.mjs <screen> <cssW> <cssH> <dpr> <out.png> [--no-build]
import { chromium } from 'playwright';
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url)); const app = path.join(here, '../app'); const dist = path.join(app, 'dist');
const [screen, w, h, dpr, out] = process.argv.slice(2);
if (!process.argv.includes('--no-build')) execSync('npx vite build --logLevel error', { cwd: app, stdio: 'inherit' });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' };
const srv = http.createServer((req, res) => { let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const f = path.join(dist, p); if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); });
await new Promise((r) => srv.listen(0, r)); const port = srv.address().port;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: +dpr });
await p.goto(`http://127.0.0.1:${port}/?s=${screen}`); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
await p.screenshot({ path: out }); await b.close(); srv.close(); console.log('rendered', out);
