import sys,json,numpy as np
sys.path.insert(0,'scripts')
from ink import line_metrics
from PIL import Image
CANDS={c['id']:c for c in json.load(open('cands.json'))}
def jobs_for(hid, rows, sols, fg, bg):
    items=[]
    for s in sols:
        c=CANDS[s['c']]
        for r in rows:
            items.append(dict(fam=c['fam'],w=c['w'],fvs=c.get('fvs'),size=s['size'],ls=round(s['track']*s['size'],3),fg=','.join(map(str,fg)),bg=','.join(map(str,bg)),text=r['t'],cid=s['c']))
    return dict(id=hid,items=items)
def gray(x): return x.mean(2)
def score(img, rows, job, rdir):
    R=np.asarray(Image.open(f"{rdir}/{job['id']}.png").convert('RGB')).astype(float)
    bx=json.load(open(f"{rdir}/{job['id']}.json"))
    res={}
    for it,b in zip(job['items'],bx):
        r=[r for r in rows if r['t']==it['text']][0]
        m=line_metrics(R,dict(x=b[0]+25,y=b[1]+b[3]*0.15,w=b[2]-50,h=b[3]*0.7),pyf=0.1)
        if not m: continue
        # crop image row region
        top=r['top']-3; bot=r['base']+int(0.3*r['asc'])+2; L=r['left']-3; Rr=r['right']+3
        A=gray(img[top:bot,L:Rr])
        best=1e9
        for dy in (-1,0,1):
            for dx in (-1,0,1):
                y0=m['base']-(r['base']-top)+dy; x0=m['left']-(r['left']-L)+dx
                Bc=gray(R[y0:y0+(bot-top), x0:x0+(Rr-L)])
                if Bc.shape!=A.shape: continue
                e=np.abs(A-Bc).mean()
                best=min(best,e)
        res.setdefault(it['cid'],[]).append(best)
    return sorted([(float(np.mean(v)),k) for k,v in res.items()])
