# Automatic per-image census on originals (numpy). Writes census.tsv.
# canvas = median of the 4 corner 12x12 patches; solid if corner spread small.
# content box = bbox of pixels differing from canvas by > tol (after 1% outlier trim);
# insets in % of width/height; bleed side = content touches that edge.
# sat_share = share of pixels with chroma > 40 (0-255 max-min); hues = number of 30deg hue bins holding > 0.4% of pixels among saturated ones.
# greys = top neutral colours (chroma < 10) quantised to 4 levels.
import sys,os,colorsys
import numpy as np
from PIL import Image
Image.MAX_IMAGE_PIXELS=None
rows=[l.rstrip('\n').split('\t') for l in open('manifest.tsv')][1:]
out=open('census.tsv','w')
out.write('id\tw\th\taspect\tcanvas\tcanvas_solid\tinset_l\tinset_t\tinset_r\tinset_b\tbleed\tsat_share\thue_bins\ttop_hue\tgreys\n')
for r in rows:
  iid,src,date,url,f=r[:5]
  if f=='MISSING' or r[10]: continue
  try:
    im=Image.open(f).convert('RGB')
  except Exception as e: print('err',f,e); continue
  W,H=im.size; s=min(1.0,900/W); t=im.resize((max(1,round(W*s)),max(1,round(H*s))),Image.BILINEAR)
  a=np.asarray(t).astype(np.int16); h,w,_=a.shape; k=max(4,int(min(h,w)*0.015))
  cs=[a[:k,:k],a[:k,-k:],a[-k:,:k],a[-k:,-k:]]
  meds=np.array([np.median(c.reshape(-1,3),axis=0) for c in cs])
  canvas=np.median(meds,axis=0); spread=float(np.abs(meds-canvas).max())
  solid='yes' if spread<=8 else 'no'
  diff=np.abs(a-canvas).max(axis=2)>18
  rowsany=diff.mean(axis=1)>0.004; colsany=diff.mean(axis=0)>0.004
  ys=np.nonzero(rowsany)[0]; xs=np.nonzero(colsany)[0]
  if len(ys) and len(xs):
    l,tp,rr,b=xs.min()/w,ys.min()/h,(w-1-xs.max())/w,(h-1-ys.max())/h
  else: l=tp=rr=b=0
  bleed=''.join(c for c,v in zip('LTRB',[l,tp,rr,b]) if v<0.004)
  mx=a.max(axis=2); mn=a.min(axis=2); chroma=mx-mn
  sat=chroma>40; satshare=float(sat.mean())
  hb=0; tophue=''
  if sat.sum()>50:
    px=a[sat][::max(1,int(sat.sum()//20000))]/255.0
    hs=np.array([colorsys.rgb_to_hsv(*p)[0] for p in px])
    hist=np.histogram(hs,bins=12,range=(0,1))[0]/len(hs)
    hb=int(((hist*satshare)>0.004).sum()); tophue=str(int(np.argmax(hist)*30))
  neu=a[chroma<10]; greys=''
  if len(neu):
    q=(neu[:,0]//4*4); vals,cnt=np.unique(q,return_counts=True); o=np.argsort(-cnt)[:5]
    greys=' '.join('#%02x%02x%02x'%(v,v,v)+f':{c/len(q):.2f}' for v,c in zip(vals[o],cnt[o]))
  cv='#%02x%02x%02x'%tuple(int(x) for x in canvas)
  out.write(f'{iid}\t{W}\t{H}\t{W/H:.3f}\t{cv}\t{solid}\t{l:.3f}\t{tp:.3f}\t{rr:.3f}\t{b:.3f}\t{bleed}\t{satshare:.3f}\t{hb}\t{tophue}\t{greys}\n')
print('ok')
