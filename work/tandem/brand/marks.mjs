// Tandem mark candidates. Each is one constructed idea on a 100-unit box (ink = currentColor, holes are real holes via
// masks), measured against knowledge/web/logo-craft.md: 1-3 parts, slit regime (gap 0.05-0.09 H) unless stated, filled
// strokes >= 0.13 H. The concept for every one: two parties that move together, one leads and one follows (a tandem).
const SLIT = 6 // one slit width for the whole set (0.06 H, 1px at 16px)
const mask = (id, cut) => `<mask id="${id}" maskUnits="userSpaceOnUse" x="-10" y="-10" width="120" height="120"><rect x="-10" y="-10" width="120" height="120" fill="#fff"/>${cut}</mask>`

export default {
  // one disc rides behind the other: the back disc is cut by the front one plus a slit
  'one-behind': {
    idea: 'Two equal discs in a row; the front one is whole, the back one shows only where it is not covered. A tandem: one behind the other.',
    svg: `${mask('a', `<circle cx="36" cy="50" r="${30 + SLIT}" fill="#000"/>`)}<circle cx="36" cy="50" r="30"/><circle cx="64" cy="50" r="30" mask="url(#a)"/>`,
  },
  // a T found in negative space: a disc cut by a horizontal slit and a vertical one
  't-cut': {
    idea: 'A solid disc cut into three by a T of slits: the letter lives in the space between the parts.',
    svg: `${mask('b', `<rect x="-5" y="36" width="110" height="${SLIT + 2}" fill="#000"/><rect x="${50 - (SLIT + 2) / 2}" y="36" width="${SLIT + 2}" height="70" fill="#000"/>`)}<circle cx="50" cy="50" r="50" mask="url(#b)"/>`,
  },
  // leader and follower: two half discs, offset by a step
  'halves': {
    idea: 'Two half discs, flat sides facing, offset by one step: one leads, one follows; together they read as an S of motion.',
    svg: `<path d="M8 47 A30 30 0 0 1 68 47 Z"/><path d="M32 53 A30 30 0 0 0 92 53 Z"/>`,
  },
  // two strokes in step: parallel capsules at 45deg, the second shifted along the axis
  'in-step': {
    idea: 'Two identical capsules at 45 degrees, side by side, the second shifted forward: two riders, in step, one slightly ahead.',
    svg: `<g transform="rotate(-45 50 50)"><rect x="10" y="${50 - 19 - SLIT / 2 - 2}" width="64" height="19" rx="9.5"/><rect x="26" y="${50 + SLIT / 2 + 2}" width="64" height="19" rx="9.5"/></g>`,
  },
  // half and whole: a full disc followed by a half disc (flat side towards it)
  'whole-half': {
    idea: 'A whole disc and a half disc that follows it, flat side to the disc: the agent (half) behind the person (whole).',
    svg: `<circle cx="34" cy="50" r="30"/><path d="M${64 + SLIT} 20 A30 30 0 0 1 ${64 + SLIT} 80 Z"/>`,
  },
  // pause, then act: two bars; the right one splits into a dot above (ask) and a bar below (act)
  'ask-act': {
    idea: 'A pause sign whose second bar becomes an i: the agent stops and asks before it acts.',
    svg: `<rect x="18" y="12" width="24" height="76" rx="12"/><circle cx="70" cy="24" r="12"/><rect x="58" y="${36 + SLIT + 2}" width="24" height="${88 - 36 - SLIT - 2}" rx="12"/>`,
  },
  // two quarter discs meeting at a slit: a pair that makes one round form
  'pair-quarters': {
    idea: 'One disc split on the diagonal into two halves that slide past each other by a step: a pair that still makes one shape.',
    svg: `${mask('c', `<rect x="-20" y="${50 - SLIT / 2}" width="140" height="${SLIT}" fill="#000" transform="rotate(-45 50 50)"/>`)}<g mask="url(#c)"><path d="M14.6 85.4 A50 50 0 0 1 85.4 14.6 Z" transform="translate(-4 -4)"/><path d="M85.4 14.6 A50 50 0 0 1 14.6 85.4 Z" transform="translate(4 4)"/></g>`,
  },
  // the T as two strokes that do not touch: a cap and a stem with a slit between
  't-pair': {
    idea: 'A T made of two strokes that never touch: a cap and a stem, two parts doing one job.',
    svg: `<rect x="6" y="10" width="88" height="24" rx="12"/><rect x="38" y="${34 + SLIT + 2}" width="24" height="${90 - 34 - SLIT - 2}" rx="12"/>`,
  },
  // ring and disc: the person (ring) holds the agent (disc) in view
  'ring-disc': {
    idea: 'A ring and a disc of the same size overlapping by a third; the ring passes over the disc with a slit: one holds the other in view.',
    svg: `${mask('d', `<circle cx="36" cy="50" r="${29 + 8 + SLIT}" fill="#000"/><circle cx="36" cy="50" r="${29 - 8 - SLIT}" fill="#fff"/>`)}<circle cx="64" cy="50" r="30" mask="url(#d)"/><circle cx="36" cy="50" r="29" fill="none" stroke="currentColor" stroke-width="16"/>`,
  },
  // two arcs of one circle, the second offset inward: two seats on one path
  'two-seats': {
    idea: 'Two thick arcs of one circle with slits between them; the second sits one step inside: two seats on one path.',
    svg: `<path d="M50 8 A42 42 0 1 1 8 50" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="butt"/><path d="M8 ${50 - SLIT - 2} A42 42 0 0 1 ${50 - SLIT - 2} 8" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="butt" transform="translate(9 9) scale(0.82)"/>`,
  },
}
