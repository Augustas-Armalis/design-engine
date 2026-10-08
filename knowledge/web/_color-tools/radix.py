import re,sys
from clib import *
D='../dl/'
def load(fn):
    t=open(D+fn).read()
    out={}
    for m in re.finditer(r'export const (\w+) = \{(.*?)\};',t,re.S):
        name=m.group(1)
        vals=re.findall(r'"(#[0-9a-fA-F]{6})"',m.group(2))
        if len(vals)==12: out[name]=vals
    return out
for fn,tag in (('rlight.ts','LIGHT'),('rdark.ts','DARK')):
    s=load(fn)
    print('==',tag)
    for n in ('gray','slate','sand','blue','green','amber','red','indigo'):
        k=n if n in s else n+'Dark'
        if k not in s: print('missing',n,list(s)[:5]);continue
        print(k)
        print('  L:',' '.join('%.3f'%hex2oklch(h)[0] for h in s[k]))
        print('  C:',' '.join('%.3f'%hex2oklch(h)[1] for h in s[k]))
        print('  H:',' '.join('%3.0f'%hex2oklch(h)[2] for h in s[k]))
        print('  s12 on s2: wcag %.1f apca %.0f ; s11 on s2: wcag %.1f apca %.0f'%(wcag(s[k][11],s[k][1]),apca(s[k][11],s[k][1]),wcag(s[k][10],s[k][1]),apca(s[k][10],s[k][1])))
