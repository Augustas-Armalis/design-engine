// Generative line-engraving landscape (WebGL2): sky with drifting clouds, three mountain ridges, a pine treeline, a lake.
// Tone is rendered as engraved lines that follow the ridges; dark tones add a cross-hatch. Ink "develops" in on load.
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

const VERT = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`

const FRAG = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2 res; uniform float t, dev, dpr, seed, sun, quiet, hero;
uniform vec3 ink, paper;
const float lake = .20;

float h(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32+seed); return fract(p.x*p.y); }
float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ float a=.5, s=0.; for(int i=0;i<5;i++){ s+=a*n(p); p=p*2.03+17.1; a*=.5; } return s; }
float n1(float x){ return n(vec2(x, seed*3.1)); }
float f1(float x){ return fbm(vec2(x, seed*7.7)); }

// ridge heights (0 bottom .. 1 top). Ordered far > mid > near; rising to the right so the top-left stays quiet for copy.
float ridged(float x){ return 1.-abs(2.*f1(x)-1.); }
float r1(float x){ float base = .46 + .34*pow(ridged(x*1.6+seed),2.2) + .10*smoothstep(.3,1.,x);
  float right = smoothstep(.38,.92,x); float heroR = .24 + .36*pow(ridged(x*2.5+seed+1.3),2.)*mix(.2,1.,right) + .19*right;
  return mix(base, heroR, hero); }
float r2(float x){ float base = .35 + .20*pow(ridged(x*2.6+4.3),1.8) + .04*smoothstep(.5,1.,x);
  float heroR = .20 + .16*pow(ridged(x*2.6+4.3),1.8)*mix(.3,1.,smoothstep(.45,.95,x)) + .10*smoothstep(.5,1.,x);
  return min(mix(base, heroR, hero), r1(x)-.025); }
float trees(float x){ float k = x*84.; float cell = floor(k); float tri = 1.-abs(fract(k)-.5)*2.;
  float hgt = (.35 + .65*h(vec2(cell,3.))) * .055 * smoothstep(.42,.62,n1(x*5.5)); return pow(tri,1.25)*hgt; }
float r3(float x){ return min(mix(.255, .17, hero) + .03*f1(x*4.+9.) + trees(x), r2(x)-.02); }

// tone 0 = paper .. 1 = ink, plus a line offset that depends on x only (lines follow ridges, spacing stays even)
vec2 scene(vec2 uv, float asp, float R){
  float x = uv.x, y = uv.y;
  float tone, warp;
  bool water = y < lake;
  if (water) { y = 2.*lake - y + .003*sin(uv.x*160.+t*1.4) * (1.-uv.y/lake); }
  float a = r1(x), b = r2(x), c = r3(x);
  if (y > a) { // sky + clouds
    float cl = fbm(vec2(x*asp*1.1 - t*.01, y*3.6) + vec2(seed));
    float cloud = smoothstep(.55,.70,cl);
    float under = smoothstep(.47,.58,cl) - smoothstep(.58,.70,cl);
    tone = (mix(.07 + .12*smoothstep(.5,1.,y), .0, cloud) + under*.26) * mix(1., .78, hero);
    warp = .004*sin(x*7.+t*.05);
    if (sun > 0.) { vec2 sp = vec2(.80,.86); float d = length((uv-sp)*vec2(asp,1.)); tone = mix(tone, .0, smoothstep(.07,.064,d)); tone += .16*smoothstep(.17,.07,d)*step(.07,d)*(.5+.5*sin(d*260.)); }
    tone *= mix(1., .35, quiet*smoothstep(.6,.2,x)*smoothstep(.3,.6,y));
  } else if (y > b) { // far range: 2D terrain lit from the upper left, snow on lit crests, hazier toward the base
    float depth = a - y;
    vec2 q = vec2(x*asp*2.6, depth*7.5 + x*1.3);
    float e = .02; vec2 g = vec2(fbm(q+vec2(e,0))-fbm(q-vec2(e,0)), fbm(q+vec2(0,e))-fbm(q-vec2(0,e)))/(2.*e);
    float xs = x + (fbm(vec2(x*9., depth*14.)) - .5)*depth*1.6;
    float flank = -(r1(xs+.008)-r1(xs-.008))/.016;
    float light = clamp(.5 + .46*clamp(flank*1.3,-1.,1.) + .10*g.x - .04*g.y, 0., 1.);
    float snow = smoothstep(.09,.0,depth) * smoothstep(.35,.7,light);
    tone = .04 + .58*pow(1.-light,1.3) - .10*snow + .05*smoothstep(.0,.25,depth);
    tone = mix(tone, .08, smoothstep(.1,.32,depth)*.35); // aerial haze
    tone = max(tone, .85*smoothstep(1.6/R, .0, abs(depth)));
    warp = (a - .62)*.45;
  } else if (y > c) { // mid range: closer, darker, same lighting
    float depth = b - y;
    vec2 q = vec2(x*asp*4., depth*10. + x*2.1 + 3.);
    float e = .02; vec2 g = vec2(fbm(q+vec2(e,0))-fbm(q-vec2(e,0)), fbm(q+vec2(0,e))-fbm(q-vec2(0,e)))/(2.*e);
    float xs = x + (fbm(vec2(x*11., depth*16.)+5.) - .5)*depth*1.8;
    float flank = -(r2(xs+.008)-r2(xs-.008))/.016;
    float light = clamp(.5 + .46*clamp(flank*1.3,-1.,1.) + .10*g.x - .05*g.y, 0., 1.);
    tone = .16 + .62*pow(1.-light,1.2);
    tone = max(tone, .9*smoothstep(1.6/R, .0, abs(depth)));
    warp = (b - .48)*.55;
  } else { // near shore and pines
    tone = .74 + .08*fbm(uv*vec2(50.,16.));
    warp = 0.;
  }
  if (water) { tone = tone*.38 + .05 + .04*sin(uv.y*900.)*0.; warp = .0015*sin(uv.x*50.+t*.8); }
  return vec2(clamp(tone,0.,1.), warp);
}

void main(){
  vec2 fc = gl_FragCoord.xy / dpr; vec2 R = res / dpr;
  vec2 uv = fc / R; float asp = R.x / R.y;
  vec2 s = scene(uv, asp, R.y);
  float front = clamp(dev*1.5 - (1.-uv.y)*.55 - n(uv*vec2(12.,4.))*.25, 0., 1.);
  float tone = s.x * smoothstep(0.,1.,front);
  float S = 2.9;
  float ph = (fc.y + s.y*R.y) / S;
  float d = abs(fract(ph) - .5);
  float w = tone*.5;
  float aa = fwidth(ph)*.9;
  float line = 1. - smoothstep(w - aa, w + aa, d);
  float ph2 = (fc.x*.5 + fc.y*.866) / (S*1.15);
  float d2 = abs(fract(ph2) - .5);
  float w2 = clamp((tone - .58)*1.3, 0., .5);
  float hatch = 1. - smoothstep(w2 - aa, w2 + aa, d2);
  float cover = max(line, hatch*step(.001,w2));
  float grain = (h(fc*.71) - .5)*.035;
  vec3 col = mix(paper + grain, ink, cover*.95);
  o = vec4(col, 1.);
}`

type Props = { seed?: number; sun?: boolean; quiet?: boolean; hero?: boolean; ink?: string; paper?: string; delay?: number; className?: string }
const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)

export default function Engraving({ seed = 1.7, sun = false, quiet = true, hero = false, ink = '#1f3a68', paper = '#f2efe7', delay = 0, className = '' }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const still = useReducedMotion()
  useEffect(() => {
    const c = ref.current!; const gl = c.getContext('webgl2', { antialias: false, premultipliedAlpha: false, preserveDrawingBuffer: true })
    if (!gl) return
    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s)); return s }
    const pr = gl.createProgram()!; gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(pr); gl.useProgram(pr)
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = (n: string) => gl.getUniformLocation(pr, n)
    gl.uniform3fv(u('ink'), rgb(ink)); gl.uniform3fv(u('paper'), rgb(paper)); gl.uniform1f(u('seed'), seed); gl.uniform1f(u('sun'), sun ? 1 : 0); gl.uniform1f(u('quiet'), quiet ? 1 : 0); gl.uniform1f(u('hero'), hero ? 1 : 0)
    let raf = 0, visible = true; const t0 = performance.now()
    const size = () => { const d = Math.min(devicePixelRatio || 1, 2); c.width = Math.round(c.clientWidth * d); c.height = Math.round(c.clientHeight * d); gl.viewport(0, 0, c.width, c.height); gl.uniform2f(u('res'), c.width, c.height); gl.uniform1f(u('dpr'), d) }
    size(); const ro = new ResizeObserver(size); ro.observe(c)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame) }); io.observe(c)
    function frame(now: number) {
      raf = 0
      const s = (now - t0) / 1000
      const dev = still ? 1 : Math.min(1, Math.max(0, (s - delay) / 2.2))
      gl!.uniform1f(u('t'), still ? 0 : s); gl!.uniform1f(u('dev'), 1 - Math.pow(1 - dev, 3))
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)
      if (visible && !still) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [seed, sun, quiet, hero, ink, paper, delay, still])
  return <canvas ref={ref} aria-hidden className={`block h-full w-full ${className}`} />
}
