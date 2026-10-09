#!/usr/bin/env python3
"""Aggregate raw/*.json from measure-live.mjs into summary.json and summary.md tables."""
import json, glob, os, statistics as st, collections
D = os.path.dirname(os.path.abspath(__file__))
def med(a): return round(st.median(a), 2) if a else None
def pct(a, p):
    if not a: return None
    a = sorted(a); i = min(len(a)-1, max(0, int(round(p/100*(len(a)-1))))); return round(a[i], 2)
S = {}
for f in sorted(glob.glob(D + '/raw/*.json')):
    d = json.load(open(f)); slug = d['meta']['slug']; ic = d['icons']; ct = d['controls']; rd = d['radii']
    o = {'url': d['meta']['url'], 'fonts': d['meta'].get('fonts'), 'svgs': d['meta']['svgCount']}
    # icon-only (square-ish control)
    io = [i for i in ic if i['kind'] == 'icon-only' and i['boxW'] >= 16 and abs(i['boxW'] - i['boxH']) <= 0.5 and i['boxW'] <= 64]
    o['iconOnly'] = {'n': len(io),
        'centred_le_0.25': round(sum(1 for i in io if abs(i['dx']) <= .25 and abs(i['dy']) <= .25) / len(io), 3) if io else None,
        'centred_le_0.5': round(sum(1 for i in io if abs(i['dx']) <= .5 and abs(i['dy']) <= .5) / len(io), 3) if io else None,
        'worst': sorted([(round(max(abs(i['dx']), abs(i['dy'])), 2), i['boxW'], i['svgW'], i['tag'], i['cls'][:30]) for i in io], reverse=True)[:4],
        'halfPx': sum(1 for i in io if abs(abs(i['relLeft']) % 1 - .5) < .01 or abs(abs(i['relTop']) % 1 - .5) < .01),
        'sizePairs': collections.Counter(f"{i['boxW']:g}/{i['svgW']:g}" for i in io).most_common(8)}
    it = [i for i in ic if i['kind'] == 'icon+text' and 'textCapDy' in i and 12 <= i['boxH'] <= 80]
    o['iconText'] = {'n': len(it),
        'boxDy_le_0.5': round(sum(1 for i in it if abs(i['dy']) <= .5) / len(it), 3) if it else None,
        'lineDy_med': med([i['textLineDy'] for i in it]), 'capDy_med': med([i['textCapDy'] for i in it]), 'capDy_p10': pct([i['textCapDy'] for i in it], 10), 'capDy_p90': pct([i['textCapDy'] for i in it], 90),
        'xDy_med': med([i['textXDy'] for i in it]),
        'iconToFont_med': med([i['iconToFont'] for i in it]), 'gap_mode': collections.Counter(round(i['gap']) for i in it).most_common(4),
        'iconSizes': collections.Counter(f"{i['boxH']:g}h/{i['svgH']:g}i" for i in it).most_common(8)}
    # ink offsets
    ink = [i for i in ic if 'inkDx' in i and i['svgW'] <= 32]
    o['ink'] = {'n': len(ink), 'offcentre_gt_0.5px': sum(1 for i in ink if abs(i['inkDx']) > .5 or abs(i['inkDy']) > .5), 'maxAbs': round(max([max(abs(i['inkDx']), abs(i['inkDy'])) for i in ink] or [0]), 2)}
    # controls
    ctl = [c for c in ct if c['tag'] != 'textarea' and 20 <= c['h'] <= 72]
    byh = collections.defaultdict(list)
    for c in ctl: byh[round(c['h'])].append(c)
    o['heights'] = sorted([(h, len(v)) for h, v in byh.items()], key=lambda x: -x[1])[:8]
    rt = {}
    for h, v in sorted(byh.items()):
        if len(v) < 2: continue
        rc = collections.Counter(round(c['radius'], 1) for c in v).most_common(3)
        tup = collections.Counter((c['fs'], c['lh'], c['fw'], c['ls']) for c in v).most_common(1)[0][0]
        rt[h] = {'n': len(v), 'radius': rc, 'ratio_med': med([c['radius'] / c['h'] for c in v]), 'type': tup,
                 'pad': collections.Counter((c['pt'], c['pr']) for c in v).most_common(1)[0][0]}
    o['radiusByHeight'] = rt
    btn = [c for c in ctl if 'capDy' in c and c['tag'] in ('button', 'a')]
    o['textCentre'] = {'n': len(btn), 'capDy_med': med([c['capDy'] for c in btn]), 'capDy_p10': pct([c['capDy'] for c in btn], 10), 'capDy_p90': pct([c['capDy'] for c in btn], 90),
                       'lineDy_med': med([c['lineDy'] for c in btn]), 'gt_1px': sum(1 for c in btn if abs(c['capDy']) > 1)}
    # radius vocabulary
    ints = [r for r in rd if r['inter']]
    o['radiusVocab'] = {'interactive_distinct': len(set(round(r['r']) for r in ints if not r['pill'])), 'all_distinct': len(set(round(r['r']) for r in rd if not r['pill'])), 'pill_share_interactive': round(sum(1 for r in ints if r['pill']) / len(ints), 2) if ints else None,
                        'top': collections.Counter(round(r['r']) for r in rd if not r['pill']).most_common(8)}
    # nests
    ne = d['nests']
    if ne:
        err = [abs(n['rc'] - n['expected']) for n in ne]
        o['nests'] = {'n': len(ne), 'within_1px': round(sum(1 for e in err if e <= 1) / len(err), 3), 'median_abs_err': med(err)}
    S[slug] = o
json.dump(S, open(D + '/summary.json', 'w'), indent=1, default=list)
print(json.dumps({k: {kk: vv for kk, vv in v.items() if kk in ('iconOnly', 'iconText', 'textCentre', 'radiusVocab', 'nests')} for k, v in S.items()}, indent=1, default=list)[:200])
