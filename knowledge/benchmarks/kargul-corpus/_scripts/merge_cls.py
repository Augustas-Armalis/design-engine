# Merge visual classifications into classification.tsv.
# inputs: manifest.tsv; _scripts/cls/*.map (id\tkind\ttheme\tfamily\tnote); case mapping from earlier studies.
import json,os,glob
B='..'
M=[l.rstrip('\n').split('\t') for l in open('manifest.tsv')][1:]
cls={}
for f in sorted(glob.glob('_scripts/cls/*.map')):
  for l in open(f):
    p=l.rstrip('\n').split('\t')
    if len(p)>=5: cls[p[0]]=p[1:5]
# earlier case classes
G={l.split('\t')[0]:l.rstrip('\n').split('\t')[1:] for l in open(f'{B}/kargul-x/gallery-classification.tsv')}
KM={'landing-hero':'hero','landing':'landing section','bento':'bento','brand':'brand or logo','dashboard':'dashboard','mobile':'mobile',
    'table':'product app screen','settings':'product app screen','detail':'product app screen','form':'product app screen','modal':'component',
    'empty-state':'product app screen','canvas':'product app screen','onboarding':'product app screen'}
H={}
for l in list(open(f'{B}/kargul-heroes/index.tsv'))[1:]:
  f=l.rstrip('\n').split('\t'); H[os.path.basename(f[0]).replace('case-','').replace('.png','')]=(f[3],f[4].split(' ')[0])
C=json.load(open(f'{B}/kargul-studio-2026-10/cases.json'))
for k,v in C.items():
  for i,im in enumerate(v['images']):
    iid=f'case-{k}-{i:02d}'; g=(im.get('gallery_match') or '').replace('.jpg','')
    if iid in cls or g not in G: continue
    c,note=G[g][0],G[g][1] if len(G[g])>1 else ''
    fam=H.get(g,('',''))[1] if c=='landing-hero' else ''
    cls[iid]=[KM.get(c,'other'),'',fam,note]
out=open('classification.tsv','w')
out.write('id\tsource\tkind\ttheme\tlayout_family\tnote\tdup_of\n')
miss=0
byid={r[0]:r for r in M}
for r in M:
  iid=r[0]; dup=r[10] if len(r)>10 else ''
  if r[4]=='MISSING': continue
  key=dup if dup else iid
  c=cls.get(key)
  if not c: miss+=1; c=['','','','']
  theme=c[1] or ('dark' if float(byid[key][8] or 1)<0.35 else 'light')
  out.write('\t'.join([iid,r[1],c[0],theme,c[2],c[3],dup])+'\n')
print('unclassified',miss)
