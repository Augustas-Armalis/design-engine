const { chromium } = require('/Users/augustas/dev/design-engine/node_modules/playwright');
const fs = require('fs');
const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  const src = 'data:image/png;base64,' + fs.readFileSync(process.argv[3]).toString('base64');
  const jobs = [];
  const names = ['retool', 'digitalocean', 'stripe', 'square', 'loom', 'superhuman', 'notion', 'webflow', 'miro', 'linear'];
  const people = ['emily', 'ethan', 'javier', 'ava', 'liam', 'sophia', 'alex', 'lucas', 'sofia', 'maria'];
  names.forEach((n, k) => jobs.push([`logo-${n}`, 272, 188 + 36 * k, 16, 16, false]));
  people.forEach((n, k) => jobs.push([`av-${n}`, 811, 190 + 36 * k, 12, 12, true]));
  jobs.push(['ws-logo', 10, 12, 24, 24, false]);
  // top avatars inner 20px photos: ring 24 at x 1051 + 16*k ; inner at +2
  jobs.push(['top-1', 1053, 15, 20, 20, true]); jobs.push(['top-3', 1085, 15, 20, 20, true]);
  const res = await p.evaluate(async ({ src, jobs }) => {
    const i = new Image(); i.src = src; await i.decode();
    const r = {};
    for (const [name, x, y, w, h, circle] of jobs) {
      const c = document.createElement('canvas'); c.width = w * 4; c.height = h * 4; const g = c.getContext('2d');
      if (circle) { g.beginPath(); g.arc(w * 2, h * 2, w * 2, 0, Math.PI * 2); g.clip(); }
      g.drawImage(i, x * 4, y * 4, w * 4, h * 4, 0, 0, w * 4, h * 4);
      r[name] = c.toDataURL('image/png');
    }
    return r;
  }, { src, jobs });
  for (const [k, v] of Object.entries(res)) fs.writeFileSync(`${out}/${k}.png`, Buffer.from(v.split(',')[1], 'base64'));
  console.log(Object.keys(res).length, 'assets');
  await b.close();
})();
