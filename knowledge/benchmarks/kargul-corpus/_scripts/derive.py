# Build manifest.tsv + study JPGs + dedupe signatures.
# usage: .venv/bin/python -I derive.py   (run from kargul-corpus/)
import json,os,glob,re,sys
import numpy as np
from PIL import Image
Image.MAX_IMAGE_PIXELS=None
ROOT='.'; BEN='..'
rows=[]
# swipe
for l in open('_scripts/swipe-list.tsv'):
  iid,url,out=l.rstrip('\n').split('\t'); cat=iid.split('-')[1]
  rows.append(dict(id=iid,source=f'swipe-{cat}',date='',url=url,orig=out,study=f'swipe-file/{cat}/{iid}.jpg',post=''))
# x
for pref,folder in [('xm','x-marcelkargul'),('xs','x-kargulstudio')]:
  pf=f'{folder}/posts.json'
  if not os.path.exists(pf): continue
  P={p['id']:p for p in json.load(open(pf))}
  for l in open(f'_scripts/{pref}-list.tsv'):
    iid,url,out=l.rstrip('\n').split('\t'); pid=iid.split('-')[1]; p=P[pid]
    rows.append(dict(id=iid,source=folder,date=p['date'],url=p['url'],orig=out,study=f'{folder}/img/{iid}.jpg',post=pid))
# cases (existing files, referenced in place)
C=json.load(open(f'{BEN}/kargul-studio-2026-10/cases.json'))
for k,v in C.items():
  for i,im in enumerate(v['images']):
    g=(im.get('gallery_match') or '')
    cand=[f'{BEN}/kargul-studio-2026-10/{k}/{k}-{i:02d}.png']
    if g: cand.append(f'{BEN}/kargul-deep/gallery/{g}' if g.endswith('.jpg') else f'{BEN}/kargul-deep/gallery/{g}.jpg')
    loc=next((c for c in cand if os.path.exists(c)),cand[-1])
    rows.append(dict(id=f'case-{k}-{i:02d}',source='case',date='',url=im['source'],orig=loc,study=loc,post=''))
# canonical order for dedupe: case originals first, then swipe, then X
rows=[r for r in rows if r['source']=='case']+[r for r in rows if r['source'].startswith('swipe')]+[r for r in rows if r['source'].startswith('x-')]
sig={}
out=open('manifest.tsv','w')
out.write('id\tsource\tdate\turl\tlocal_file\tstudy_file\twidth\theight\tmean_L\tdark_share\tdup_of\n')
miss=0
for r in rows:
  f=r['orig']
  if not os.path.exists(f): miss+=1; out.write('\t'.join([r['id'],r['source'],r['date'],r['url'],'MISSING',r['study'],'','','','',''])+'\n'); continue
  try:
    im=Image.open(f); im.load(); W,H=im.size
    g=np.asarray(im.convert('L').resize((64,48)),dtype=np.float32)/255
    s=np.asarray(im.convert('L').resize((32,24)),dtype=np.float32)
    meanL=float(g.mean()); dark=float((g<0.35).mean())
    if not os.path.exists(r['study']):
      os.makedirs(os.path.dirname(r['study']),exist_ok=True)
      t=im.convert('RGB'); 
      if t.width>800: t=t.resize((800,round(t.height*800/t.width)),Image.LANCZOS)
      t.save(r['study'],quality=78,optimize=True)
  except Exception as e:
    print('err',f,e); continue
  dup=''
  for k2,(s2,src2) in sig.items():
    if s2.shape==s.shape and np.abs(s2-s).mean()<=3: dup=k2; break
  if not dup: sig[r['id']]=(s,r['source'])
  out.write('\t'.join([r['id'],r['source'],r['date'],r['url'],f,r['study'],str(W),str(H),f'{meanL:.3f}',f'{dark:.3f}',dup])+'\n')
print(len(rows),'rows',miss,'missing')
