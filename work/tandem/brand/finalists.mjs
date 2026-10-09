// Tandem finalists after round 1 of the mark study (rejected: in-step = generic slashes, whole-half = reads as Medium,
// pair-quarters = reads as a prohibition sign, two-seats = reads as a spinner). Refinements apply the craft note:
// one slit width per mark, slits >= 0.06 H, overshoot rounds ~2%, horizontal slit ~6% thinner than the vertical one.
const mask = (id, cut) => `<mask id="${id}" maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120"><rect x="-10" y="-10" width="120" height="120" fill="#fff"/>${cut}</mask>`
const tcut = (id, y, v, h) => `${mask(id, `<rect x="-5" y="${y}" width="110" height="${h}" fill="#000"/><rect x="${50 - v / 2}" y="${y}" width="${v}" height="70" fill="#000"/>`)}<circle cx="50" cy="50" r="51" mask="url(#${id})"/>`

export default {
  'T-cut · classic': { idea: 'B refined: crossbar at 34%, slits 7.5 / 8 (horizontal optically thinner), disc overshoots 2%.', svg: tcut('a', 30, 8, 7.5) },
  'T-cut · high bar': { idea: 'B with a lower cap (crossbar at 26%): the T reads sooner, the base gets heavier and calmer.', svg: tcut('b', 22, 8.5, 8) },
  'T-cut · offset stem': { idea: 'B with the stem slit shifted right of centre: the two lower parts become unequal, one leads, one follows (the owned break).', svg: `${mask('c', `<rect x="-5" y="30" width="110" height="7.5" fill="#000"/><rect x="56" y="30" width="8" height="70" fill="#000"/>`)}<circle cx="50" cy="50" r="51" mask="url(#c)"/>` },
  'Halves · wide': { idea: 'C refined: two half discs, flat sides facing, a 7-unit slit and a 22-unit step: leader and follower.', svg: `<path d="M2 46.5 A33 33 0 0 1 68 46.5 Z"/><path d="M32 53.5 A33 33 0 0 0 98 53.5 Z"/>` },
  'Halves · stacked tall': { idea: 'C turned upright: the halves sit side by side and step down, like two riders seen from the side.', svg: `<path d="M46.5 2 A33 33 0 0 0 46.5 68 Z"/><path d="M53.5 32 A33 33 0 0 1 53.5 98 Z"/>` },
  'One behind · open': { idea: 'A refined: the discs sit further apart (centres 30/70, r 30) so the back crescent stays >= 0.13 H at its widest and survives 16 px.', svg: `${mask('d', `<circle cx="32" cy="50" r="37" fill="#000"/>`)}<circle cx="32" cy="50" r="31"/><circle cx="68" cy="50" r="31" mask="url(#d)"/>` },
}
