// Reference crops for knowledge/benchmarks/effects/ (DPR 2, element + 24px padding). Read-only: no clicks, no logins.
// usage: node crops.mjs [only-name]
import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const only = process.argv[2];
// [file, url, scheme, css selector, nth match, padding]
const JOBS = [
  ['raycast-window-glass', 'https://www.raycast.com/', 'dark', '[class*="RaycastWindow-module"][class*="rayc"]', 0, 40],
  ['raycast-keycaps', 'https://www.raycast.com/', 'dark', '[class*="index-module__h8MSgW__keyboard"]', 0, 0],
  ['raycast-gradient-border-pill', 'https://www.raycast.com/', 'dark', '[class*="ExtensionHighlight-module"][class*="3Yq4t"]', 1, 24],
  ['linear-frame-edge-light', 'https://linear.app/', 'dark', '[class*="WS84WW_shine"]', 0, 24],
  ['linear-comment-card-edge', 'https://linear.app/', 'dark', '[class*="KFZpfa_commentCard"]', 0, 24],
  ['liveblocks-hero-grain', 'https://liveblocks.io/', 'dark', '[class*="hero-3d-module"][class*="scene"]', 0, 0],
  ['apple-mbp-glass-controls', 'https://www.apple.com/macbook-pro/', 'light', 'li.control-item', 0, 60],
  ['apple-store-card-shadow', 'https://www.apple.com/store', 'light', '.rf-ccard-content', 1, 32],
  ['mercury-glass-pill', 'https://mercury.com/', 'light', 'a.group.inline-flex[class*="rounded"]', 0, 60],
  ['clerk-squircle-tiles', 'https://clerk.com/', 'light', 'div.size-8.rounded-xl', 0, 24],
  ['framer-superellipse-card', 'https://www.framer.com/', 'dark', '.framer-vex8h8', 0, 24],
  ['stripe-floating-card', 'https://stripe.com/', 'light', '[class*="platform-graphic__feature-card"]', 0, 48],
  ['stripe-glass-window', 'https://stripe.com/', 'light', '.browser-graphic__window', 0, 40],
  ['stripe-dot-grid', 'https://stripe.com/', 'light', '[class*="developer-systems-animation__dot"]', 0, 0],
  ['attio-frame-shadow', 'https://attio.com/', 'light', 'div.relative.origin-center.touch-none', 0, 48],
  ['cal-card-contact-shadow', 'https://cal.com/', 'light', '.framer-11t5dr2', 0, 40],
  ['granola-tray-ring', 'https://www.granola.ai/', 'light', 'div.flex.flex-col.gap-4[class*="rounded-[28px]"]', 0, 32],
  ['cursor-frame-and-shimmer', 'https://cursor.com/', 'dark', '#demo-window-cursor-ide', 0, 40],
  ['affectui-dof-blur', 'https://affectui.com/', 'light', '.lp-iso', 0, 0],
  ['affectui-card-stage', 'https://affectui.com/', 'light', '.card__stage', 0, 24],
  ['resend-glass-button', 'https://resend.com/', 'dark', 'a.relative.inline-flex.items-center', 0, 32],
  ['evervault-live-gradient', 'https://evervault.com/', 'dark', '.live-gradient-background-inner', 0, 24],
];

const browser = await chromium.launch();
for (const [file, url, scheme, sel, nth, pad, minW = 8] of JOBS) {
  if (only && only !== file) continue;
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, colorScheme: scheme });
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(3000);
    await page.addStyleTag({ content: '[id*=cookie i],[class*=cookie i],[id*=consent i],[class*=consent i],#onetrust-banner-sdk,.iubenda-cs-container{display:none!important}' }).catch(() => {});
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < Math.min(H, 14000); y += 800) { await page.evaluate(v => scrollTo(0, v), y); await page.waitForTimeout(150); }
    const els = await page.$$(sel);
    const vis = [];
    for (const e of els) { const b = await e.boundingBox(); if (b && b.width > minW && b.height > 8) vis.push(e); }
    const el = vis[nth] || vis[0];
    if (!el) { console.log('MISS', file, sel, els.length); await ctx.close(); continue; }
    await el.evaluate(n => n.scrollIntoView({ block: 'center' })).catch(() => {}); await page.waitForTimeout(1200);
    const b = await el.boundingBox();
    const clip = { x: Math.max(0, b.x - pad), y: Math.max(0, b.y - pad), width: Math.min(1440 - Math.max(0, b.x - pad), b.width + 2 * pad), height: Math.min(900, b.height + 2 * pad) };
    await page.screenshot({ path: path.join(OUT, file + '.png'), clip });
    console.log('ok', file, Math.round(b.width) + 'x' + Math.round(b.height));
  } catch (e) { console.log('ERR', file, e.message.slice(0, 120)); }
  await ctx.close();
}
await browser.close();
