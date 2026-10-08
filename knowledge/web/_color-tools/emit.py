import json
P=json.load(open('palettes_out.json')); DV=json.load(open('dv_out.json')); SPEC=json.load(open('pals.json'))
OUT='knowledge/web/'
import os; os.makedirs(OUT,exist_ok=True)
# JSON
json.dump({"schema":"design-engine/palette@1","contrast_gates":{"ink-1":"WCAG>=12 target (verified >=14)","ink-2":"WCAG>=7 and |APCA Lc|>=75","ink-3":"WCAG>=4.5 and |Lc|>=60","accent-text / state fg / accent2-text":"WCAG>=4.5 and |Lc|>=60 on page, card, sunken(where listed) and own soft bg","accent-on on accent":"WCAG>=4.5 and |Lc|>=60 (signal-orange: |Lc|>=50, large/bold labels only)","border-strong / ring":"WCAG>=3 and |Lc|>=30 on page and card"},
  "palettes":P,"dataviz":DV},open(OUT+'palettes.json','w'),indent=1)
ORDER=['surface-page','surface-card','surface-sunken','surface-raised','surface-inverse','ink-1','ink-2','ink-3','ink-inverse','border-subtle','border-strong','accent','accent-on','accent-hover','accent-soft','accent-text','ring','accent2','accent2-on','accent2-soft','accent2-text','success','success-soft','warning','warning-soft','danger','danger-soft','info','info-soft']
md=[]
for r,s in zip(P,SPEC):
    md.append(f"### {P.index(r)+1}. `{r['id']}` — {r['name']} ({r['archetype']})\n")
    md.append(f"- **Mood** {r['mood']}. **Suits** {r['suits']}. **Avoid** {r['avoid']}.")
    md.append(f"- **Accent hue** {r['accent_hue']}. Neutral hue/chroma: light {s['light']['nh']}/{s['light']['nc']}, dark {s['dark']['nh']}/{s['dark']['nc']}.")
    p3=[]
    if r.get('light_p3_accent'): p3.append('light `'+r['light_p3_accent']+'`')
    if r.get('dark_p3_accent'): p3.append('dark `'+r['dark_p3_accent']+'`')
    if p3: md.append("- **P3 accent upgrade** (same L and hue, more chroma; contrast gates were computed on the sRGB values above): "+'; '.join(p3)+'.')
    md.append("\n| token | light oklch | light hex | dark oklch | dark hex |\n|---|---|---|---|---|")
    for k in ORDER:
        if k in r['light']:
            a,b=r['light'][k],r['dark'][k]
            md.append(f"| {k} | `{a['oklch']}` | `{a['hex']}` | `{b['oklch']}` | `{b['hex']}` |")
    # contrast
    def find(m,f,b):
        for c in r[m+'_contrast']:
            if c['fg']==f and c['bg']==b: return c
    md.append("\n| key pair | light WCAG / Lc | dark WCAG / Lc |\n|---|---|---|")
    for f,b in [('ink-1','surface-page'),('ink-2','surface-sunken'),('ink-3','surface-sunken'),('accent-on','accent'),('accent-text','surface-page'),('accent-text','accent-soft'),('danger','surface-page'),('border-strong','surface-page')]:
        l,d=find('light',f,b),find('dark',f,b)
        md.append(f"| {f} on {b} | {l['wcag']} / {abs(l['apca']):.0f} | {d['wcag']} / {abs(d['apca']):.0f} |")
    # accent ramp
    ra=r['light_ramps']['accent']; rd=r['dark_ramps']['accent']
    md.append("\nAccent 12-step ramp (light): "+' '.join('`'+x['hex']+'`' for x in ra)+"\n\nAccent 12-step ramp (dark): "+' '.join('`'+x['hex']+'`' for x in rd)+"\n")
open('palette_tables.md','w').write('\n'.join(md))
# min table
from collections import defaultdict
mn=defaultdict(lambda:[99,999])
for r in P:
    for m in ('light','dark'):
        for c in r[m+'_contrast']:
            k=(c['fg'],c['bg'],m)
            mn[k][0]=min(mn[k][0],c['wcag']); mn[k][1]=min(mn[k][1],abs(c['apca']))
rows=[]
keys=sorted({(k[0],k[1]) for k in mn})
for f,b in keys:
    if f in('accent',): continue
    L=mn[(f,b,'light')];D=mn[(f,b,'dark')]
    rows.append(f"| {f} on {b} | {L[0]:.2f} | {L[1]:.0f} | {D[0]:.2f} | {D[1]:.0f} |")
open('mins.md','w').write("| pair | light min WCAG | light min Lc | dark min WCAG | dark min Lc |\n|---|---|---|---|---|\n"+'\n'.join(rows))
print(len(md), 'lines;', len(rows),'rows')
