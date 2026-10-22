import sys,json,glob,os,numpy as np
sys.path.insert(0,'scripts')
from ink import line_metrics
from PIL import Image
texts=json.load(open(sys.argv[1])); rdir=sys.argv[2]; out=sys.argv[3]
CH=120
cands=json.load(open('cands.json'))
res={}
for c in cands:
    res[c['id']]={}
    for ci in range(0,(len(texts)+CH-1)//CH):
        f=f"{rdir}/{c['id']}-{ci}"
        if not os.path.exists(f+'.png'): continue
        a=np.asarray(Image.open(f+'.png').convert('RGB')).astype(float)
        bx=json.load(open(f+'.json'))['b']
        for j,b in enumerate(bx):
            t=texts[ci*CH+j]
            m=line_metrics(a,dict(x=b[0],y=b[1]+12,w=b[2],h=76),pyf=0.15)
            if m: res[c['id']][t]=dict(asc=m['asc'],xh=m['xh'],w=m['right']-m['left'],area=m['area'])
json.dump(res,open(out,'w'))
print(len(res))
