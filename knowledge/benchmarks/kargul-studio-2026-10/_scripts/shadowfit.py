import json,sys,math
def lum(h): h=h.lstrip('#'); r,g,b=int(h[0:2],16),int(h[2:4],16),int(h[4:6],16); return (r+g+b)/3
def t_layer(d,side,oy,b,a):
    s=max(b/2,0.25); off={'bottom':oy,'top':-oy,'side':0}[side]
    return a*0.5*math.erfc((d-off)/(s*math.sqrt(2)))
def model(d,side,layers):
    p=1
    for (oy,b,a) in layers: p*=1-t_layer(d,side,oy,b,a)
    return 1-p
def fit(spec):
    sc=spec['scale']; bg=spec.get('bg',255)
    obs=[]
    for side,arr in spec['profiles'].items():
        for i,h in enumerate(arr):
            d=(i+0.5)/sc; obs.append((side,d,max(0,1-lum(h)/bg)))
    def err(layers): return sum((model(d,s,layers)-t)**2 for s,d,t in obs)/len(obs)
    best1=None
    for oy in [x*0.5 for x in range(0,17)]:
        for b in range(1,41):
            for a in [x*0.005 for x in range(1,41)]:
                e=err([(oy,b,a)])
                if best1 is None or e<best1[0]: best1=(e,(oy,b,a))
    best2=None
    for oy1 in [0,0.5,1,2]:
      for b1 in [1,2,3,4]:
        for a1 in [x*0.01 for x in range(1,13)]:
          for oy2 in [0,1,2,4,6,8,12]:
            for b2 in [4,6,8,12,16,20,24,32,40]:
              for a2 in [x*0.01 for x in range(1,11)]:
                e=err([(oy1,b1,a1),(oy2,b2,a2)])
                if best2 is None or e<best2[0]: best2=(e,((oy1,b1,a1),(oy2,b2,a2)))
    return {'one':{'rms':round(math.sqrt(best1[0]),4),'css':'0 %gpx %gpx rgb(0 0 0 / %.3f)'%best1[1]},'two':{'rms':round(math.sqrt(best2[0]),4),'css':', '.join('0 %gpx %gpx rgb(0 0 0 / %.2f)'%l for l in best2[1])},'obs_near':[round(t,3) for s,d,t in obs[:6]]}
specs=json.load(open(sys.argv[1]))
for k,v in specs.items(): print(k, json.dumps(fit(v)))
