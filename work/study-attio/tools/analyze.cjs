const fs = require('fs');
const d = JSON.parse(fs.readFileSync(process.argv[2]));
const rows = d.rows;
const cnt = (f) => { const m = {}; for (const r of rows) { const k = f(r); if (k == null) continue; m[k] = (m[k] || 0) + 1; } return Object.entries(m).sort((a, b) => b[1] - a[1]); };
console.log('ROOT', d.root);
console.log('\nTYPE (text els) fs/fw/lh/ls/color:'); cnt(r => r.text ? `${r.fs} ${r.fw} lh${r.lh} ls${r.ls} ${r.color} ${r.ff}` : null).slice(0, 25).forEach(x => console.log(' ', x[1], x[0]));
console.log('\nRADIUS by h:'); cnt(r => r.br !== '0px' ? `h${Math.round(r.h)} w${Math.round(r.w)} r${r.br} ${r.tag}` : null).slice(0, 40).forEach(x => console.log(' ', x[1], x[0]));
console.log('\nBORDERS:'); cnt(r => { const s = [r.bt, r.bb, r.bl, r.br_].filter(b => !b.startsWith('0px')); return s.length ? s.join(' | ') : null; }).slice(0, 20).forEach(x => console.log(' ', x[1], x[0]));
console.log('\nSHADOWS:'); cnt(r => r.sh || null).slice(0, 15).forEach(x => console.log(' ', x[1], x[0]));
console.log('\nBG:'); cnt(r => r.bg !== 'rgba(0, 0, 0, 0)' ? r.bg : null).slice(0, 20).forEach(x => console.log(' ', x[1], x[0]));
console.log('\nSVG sizes:'); cnt(r => r.tag === 'svg' ? `${r.w}x${r.h} ${r.color}` : null).slice(0, 15).forEach(x => console.log(' ', x[1], x[0]));
console.log('\nIMG sizes:'); cnt(r => r.tag === 'img' ? `${r.w}x${r.h} r${r.br}` : null).slice(0, 15).forEach(x => console.log(' ', x[1], x[0]));
console.log('\nUNDERLINE:'); cnt(r => r.td || null).slice(0, 5).forEach(x => console.log(' ', x[1], x[0]));
console.log('\nTRANSITIONS:'); cnt(r => r.transition || null).slice(0, 8).forEach(x => console.log(' ', x[1], x[0]));
if (process.argv[3]) { console.log('\nTEXT ROWS:'); rows.filter(r => r.text || r.tag==='svg' || r.tag==='img' || r.tag==='input' || r.tag==='button').slice(0, +process.argv[3]).forEach(r => console.log(`${r.tag} "${r.text}" @${r.x},${r.y} ${r.w}x${r.h} ${r.fs}/${r.fw}/${r.lh}/${r.ls} ${r.color} bg ${r.bg} r${r.br} pad ${r.pad} ${r.sh?'SH':''} ${r.bt.startsWith('0px')?'':'B:'+r.bt}`)); }
