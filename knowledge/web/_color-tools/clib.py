import math, re
def s2l(c):
    return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def l2s(c):
    return 12.92*c if c<=0.0031308 else 1.055*(abs(c)**(1/2.4))-0.055
def hex2rgb(h):
    h=h.lstrip('#'); return tuple(int(h[i:i+2],16)/255 for i in (0,2,4))
def rgb2hex(rgb):
    return '#%02x%02x%02x'%tuple(max(0,min(255,round(x*255))) for x in rgb)
def lin2oklab(r,g,b):
    l=0.4122214708*r+0.5363325363*g+0.0514459929*b
    m=0.2119034982*r+0.6806995451*g+0.1073969566*b
    s=0.0883024619*r+0.2817188376*g+0.6299787005*b
    l_,m_,s_=[math.copysign(abs(x)**(1/3),x) for x in (l,m,s)]
    return (0.2104542553*l_+0.7936177850*m_-0.0040720468*s_,
            1.9779984951*l_-2.4285922050*m_+0.4505937099*s_,
            0.0259040371*l_+0.7827717662*m_-0.8086757660*s_)
def oklab2lin(L,a,b):
    l_=L+0.3963377774*a+0.2158037573*b
    m_=L-0.1055613458*a-0.0638541728*b
    s_=L-0.0894841775*a-1.2914855480*b
    l,m,s=l_**3,m_**3,s_**3
    return (4.0767416621*l-3.3077115913*m+0.2309699292*s,
            -1.2684380046*l+2.6097574011*m-0.3413193965*s,
            -0.0041960863*l-0.7034186147*m+1.7076147010*s)
def oklch2lin(L,C,H):
    h=math.radians(H); return oklab2lin(L,C*math.cos(h),C*math.sin(h))
def hex2oklch(h):
    r,g,b=[s2l(x) for x in hex2rgb(h)]
    L,a,bb=lin2oklab(r,g,b)
    C=math.hypot(a,bb); H=math.degrees(math.atan2(bb,a))%360
    return L,C,H
def in_srgb(lin,eps=1e-4):
    return all(-eps<=x<=1+eps for x in lin)
def p3_lin(lin):
    r,g,b=lin
    X=0.4123908*r+0.3575843*g+0.1804808*b
    Y=0.2126390*r+0.7151687*g+0.0721923*b
    Z=0.0193308*r+0.1191948*g+0.9505322*b
    return (2.4934969*X-0.9313836*Y-0.4027108*Z,-0.8294890*X+1.7626641*Y+0.0236247*Z,0.0358458*X-0.0761724*Y+0.9568845*Z)
def in_p3(lin): return in_srgb(p3_lin(lin))
def map_srgb(L,C,H):
    """reduce chroma until in sRGB gamut (hue & L preserved)"""
    if in_srgb(oklch2lin(L,C,H)): return L,C,H
    lo,hi=0.0,C
    for _ in range(40):
        mid=(lo+hi)/2
        if in_srgb(oklch2lin(L,mid,H)): lo=mid
        else: hi=mid
    return L,lo,H
def to_hex(L,C,H):
    L,C,H=map_srgb(L,C,H)
    lin=oklch2lin(L,C,H)
    return rgb2hex([l2s(min(1,max(0,x))) for x in lin])
def lum_wcag(h):
    r,g,b=[s2l(x) for x in hex2rgb(h)]
    return 0.2126*r+0.7152*g+0.0722*b
def wcag(h1,h2):
    a,b=lum_wcag(h1),lum_wcag(h2)
    if a<b:a,b=b,a
    return (a+0.05)/(b+0.05)
def apca(txt,bg):
    def Y(h):
        r,g,b=hex2rgb(h)
        y=0.2126729*r**2.4+0.7151522*g**2.4+0.0721750*b**2.4
        return y+(0.022-y)**1.414 if y<0.022 else y
    yt,yb=Y(txt),Y(bg)
    if abs(yb-yt)<0.0005: return 0.0
    if yb>yt:
        s=(yb**0.56-yt**0.57)*1.14
        return 0.0 if s<0.1 else (s-0.027)*100
    s=(yb**0.65-yt**0.62)*1.14
    return 0.0 if s>-0.1 else (s+0.027)*100
if __name__=='__main__':
    print('apca black on white',apca('#000000','#ffffff'),'white on black',apca('#ffffff','#000000'))
    print('wcag black/white',wcag('#000000','#ffffff'))
    print('apca #888 on white',apca('#888888','#ffffff'),'#767676',apca('#767676','#ffffff'),wcag('#767676','#ffffff'))
    print(hex2oklch('#f3f7fa'))  # evil martians says 0.97 0.006 240
    print(hex2oklch('#0000ff'),hex2oklch('#ff0000'),hex2oklch('#ffffff'))
    print('tailwind blue-500 chk', to_hex(0.623,0.214,259.815))
