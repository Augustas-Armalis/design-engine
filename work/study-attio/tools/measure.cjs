// node measure.cjs <url> <outdir> <name> "<anchor text>" <levelsUp> [scrollY]
const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const fs = require('fs');
const [url, out, name, anchor, up, sy] = process.argv.slice(2);
(async () => {
  const b = await chromium.launch();
  const pg = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await pg.goto(url, { waitUntil: 'load', timeout: 60000 });
  await pg.waitForTimeout(2500);
  await pg.evaluate(() => { for (const el of document.querySelectorAll('div,section,aside')) if (/We use cookies/.test(el.textContent) && el.textContent.length < 300) el.style.display = 'none'; });
  const h = await pg.evaluate(() => document.body.scrollHeight);
  if (sy !== "noscroll") for (let y = 0; y < h; y += 800) { await pg.evaluate(y => window.scrollTo(0, y), y); await pg.waitForTimeout(120); }
  const res = await pg.evaluate(({ anchor, up }) => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node, hit = null;
    while ((node = walker.nextNode())) if (node.textContent.trim() === anchor) { hit = node.parentElement; break; }
    if (!hit) return { error: 'anchor not found' };
    let root = hit; for (let i = 0; i < +up; i++) root = root.parentElement;
    root.setAttribute('data-measure-root', '1');
    root.scrollIntoView({ block: 'center' });
    return { ok: true, tag: root.tagName, cls: root.className && root.className.baseVal === undefined ? String(root.className).slice(0, 120) : '' };
  }, { anchor, up });
  if (res.error) { console.log(res.error); await b.close(); return; }
  await pg.waitForTimeout(3500); // let animations settle
  const data = await pg.evaluate(() => {
    const root = document.querySelector('[data-measure-root]');
    const R = root.getBoundingClientRect();
    const els = [root, ...root.querySelectorAll('*')];
    const rows = [];
    for (const el of els) {
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || +cs.opacity === 0) continue;
      const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join(' ').trim();
      rows.push({
        tag: el.tagName.toLowerCase(), text: own.slice(0, 40),
        x: Math.round(r.x - R.x), y: Math.round(r.y - R.y), w: +r.width.toFixed(1), h: +r.height.toFixed(1),
        fs: cs.fontSize, fw: cs.fontWeight, lh: cs.lineHeight, ls: cs.letterSpacing, ff: cs.fontFamily.split(',')[0], color: cs.color,
        bg: cs.backgroundColor, bgi: cs.backgroundImage !== 'none' ? cs.backgroundImage.slice(0, 80) : '',
        br: cs.borderRadius, bt: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`, bb: `${cs.borderBottomWidth} ${cs.borderBottomStyle} ${cs.borderBottomColor}`,
        bl: `${cs.borderLeftWidth} ${cs.borderLeftStyle} ${cs.borderLeftColor}`, br_: `${cs.borderRightWidth} ${cs.borderRightStyle} ${cs.borderRightColor}`,
        sh: cs.boxShadow !== 'none' ? cs.boxShadow : '', pad: cs.padding, gap: cs.gap, disp: cs.display, op: cs.opacity, tr: cs.transform !== 'none' ? cs.transform : '',
        td: cs.textDecorationLine !== 'none' ? `${cs.textDecorationLine} ${cs.textDecorationColor} ${cs.textDecorationThickness} off ${cs.textUnderlineOffset}` : '',
        transition: cs.transition && cs.transition !== 'all 0s ease 0s' ? cs.transition.slice(0, 80) : '',
      });
    }
    return { root: { w: R.width, h: R.height, x: R.x, y: R.y }, rows };
  });
  fs.writeFileSync(`${out}/measure-${name}.json`, JSON.stringify(data, null, 1));
  const el = await pg.$('[data-measure-root]');
  await el.screenshot({ path: `${out}/crop-${name}.png` });
  console.log('rows', data.rows.length, 'root', JSON.stringify(data.root));
  await b.close();
})();
