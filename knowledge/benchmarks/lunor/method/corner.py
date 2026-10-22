import sys,numpy as np
from PIL import Image
def fit(a,x0,y0,ymid,tol=6,maxr=60):
    """x0: outer left edge column, y0: outer top edge row, ymid: a row in the straight part. outside colour sampled at (x0-3,ymid)"""
    out=a[ymid,max(0,x0-3)].astype(float)
    prof=[]
    for k in range(0,maxr):
        col=a[:,x0+k].astype(float)
        yy=None
        for y in range(max(0,y0-2),ymid):
            if np.abs(col[y]-out).max()>tol: yy=y;break
        prof.append(yy-y0 if yy is not None else None)
    best=None
    for R in range(0,maxr):
        e=0;n=0
        for k,o in enumerate(prof[:max(3,R+2)]):
            if o is None: continue
            dx=R-(k+0.5); off=R-np.sqrt(max(0,R*R-dx*dx)) if dx>0 else 0
            e+=abs(off-o); n+=1
        e=e/max(1,n)
        if best is None or e<best[0]: best=(e,R)
    return best[1],round(best[0],2),prof[:12]
if __name__=='__main__':
    a=np.asarray(Image.open(sys.argv[1]).convert('RGB'))
    for spec in sys.argv[2:]:
        x0,y0,ym=map(int,spec.split(','))
        r,e,p=fit(a,x0,y0,ym)
        print(spec,'radius',r,'err',e,'ring px',a[ym,x0],a[ym,x0+1],a[ym,x0+2],'top px',a[y0,x0+40],a[y0+1,x0+40],a[y0+2,x0+40])
