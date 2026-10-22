import sys,numpy as np
from PIL import Image
from collections import Counter
def load(p): return np.asarray(Image.open(p).convert('RGB')).astype(int)
def runs(line,tol=4,minlen=30):
    out=[];s=0
    for i in range(1,len(line)+1):
        if i==len(line) or np.abs(line[i]-line[s]).max()>tol:
            if i-s>=minlen: out.append((s,i-1,'#%02x%02x%02x'%tuple(line[s])))
            s=i
    return out
def edges_profile(a,y0,y1,x0,x1,axis):
    pass
if __name__=='__main__':
    a=load(sys.argv[1]); mode=sys.argv[2]; tol=int(sys.argv[3]) if len(sys.argv)>3 else 4
    H,W,_=a.shape
    print(W,H,'corner',a[2,2],a[H-3,W-3])
    if mode=='rows':
        for y in range(20,H,int(sys.argv[4]) if len(sys.argv)>4 else 40):
            r=runs(a[y],tol,40); print('y',y,[(s,e,c) for s,e,c in r][:12])
    else:
        for x in range(20,W,int(sys.argv[4]) if len(sys.argv)>4 else 60):
            r=runs(a[:,x],tol,40); print('x',x,[(s,e,c) for s,e,c in r][:12])
