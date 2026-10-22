import numpy as np
from collections import Counter
def bg_of(a, x0,y0,x1,y1):
    border=np.concatenate([a[y0,x0:x1],a[y1-1,x0:x1],a[y0:y1,x0],a[y0:y1,x1-1]])
    q=(border//8).astype(int)
    k=Counter(map(tuple,q)).most_common(1)[0][0]
    return border[(q==np.array(k)).all(1)].mean(0)
def line_metrics(a, box, px=4, pyf=0.3):
    H,W,_=a.shape
    py=int(box['h']*pyf)+2
    x0=max(0,int(box['x'])-px); x1=min(W,int(box['x']+box['w'])+px)
    y0=max(0,int(box['y'])-py); y1=min(H,int(box['y']+box['h'])+py)
    if x1-x0<4 or y1-y0<4: return None
    bg=bg_of(a,x0,y0,x1,y1)
    reg=a[y0:y1,x0:x1]
    d=np.sqrt(((reg-bg)**2).sum(2))
    if d.max()<30: return None
    thr=max(28,0.35*np.percentile(d,99.5))
    m=d>thr
    rows=m.sum(1)
    on=rows>0
    # band containing OCR centre row
    c=int(box['y']+box['h']/2)-y0
    c=min(max(c,0),len(on)-1)
    if not on[c]:
        # nearest on row
        idx=np.where(on)[0]
        if len(idx)==0: return None
        c=idx[np.argmin(abs(idx-c))]
    t=c
    while t>0 and on[t-1]: t-=1
    b=c
    while b<len(on)-1 and on[b+1]: b+=1
    # attach small bands just above (dots/accents) within 0.2*height
    hgt=b-t+1; tt=t-1; gap=0
    while tt>=0 and gap<=max(2,int(0.08*hgt)):
        if on[tt]: t=tt; gap=0
        else: gap+=1
        tt-=1
    band=rows[t:b+1]; mx=band.max()
    dense=np.where(band>=0.25*mx)[0]
    base=t+dense[-1]+1
    core=band[dense[0]:dense[-1]+1]; lvl=np.median(core)
    xt=None
    for yy in range(t,base):
        if rows[yy]>=0.6*lvl: xt=yy; break
    mm=m[t:b+1]; cols=np.where(mm.sum(0)>0)[0]
    strong=d[t:b+1][:,cols[0]:cols[-1]+1]
    sel=strong>=np.percentile(strong,97)
    tc=reg[t:b+1][:,cols[0]:cols[-1]+1][sel].mean(0)
    alpha=np.clip(strong/max(1,np.sqrt(((tc-bg)**2).sum())),0,1)
    return dict(left=x0+int(cols[0]), right=x0+int(cols[-1])+1, top=y0+int(t), bottom=y0+int(b)+1, base=y0+int(base),
                xtop=y0+int(xt) if xt is not None else None, asc=int(base-t), xh=int(base-xt) if xt is not None else None,
                bg=[int(v) for v in bg], fg=[int(v) for v in tc], area=round(float(alpha.sum()),1))
