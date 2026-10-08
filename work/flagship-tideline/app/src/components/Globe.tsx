import { geoEquirectangular, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { useEffect, useRef } from 'react'
import landTopo from '../data/land-50m.json'
import { VIEW } from './geo'

type RGB = [number, number, number]
const hex = (h: string): RGB => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as RGB

// Real coastlines (Natural Earth, public domain) drawn once into an equirectangular mask.
function landMask(w = 2048, h = 1024) {
  const c = document.createElement('canvas'); c.width = w; c.height = h
  const ctx = c.getContext('2d')!
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const land = feature(landTopo as any, (landTopo as any).objects.land)
  const proj = geoEquirectangular().scale(w / (2 * Math.PI)).translate([w / 2, h / 2])
  ctx.fillStyle = '#fff'; ctx.beginPath(); geoPath(proj, ctx)(land as never); ctx.fill()
  return c
}

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`
// Orthographic globe as an ink halftone: every cell inverts the projection, samples the land mask,
// lights the sphere, and is quantised to four inks through an 8x8 Bayer matrix.
const FRAG = `
precision highp float;
uniform vec2 uRes, uCenter; uniform float uR, uCell, uTime, uDev, uLon0, uLat0;
uniform vec3 c0, c1, c2, c3; uniform sampler2D uLand;
const float PI = 3.14159265;
float b2(vec2 a){ a = floor(a); return fract(a.x/2. + a.y*a.y*.75); }
float b4(vec2 a){ return b2(.5*a)*.25 + b2(a); }
float b8(vec2 a){ return b4(.5*a)*.25 + b2(a); }
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main(){
  vec2 cell = floor(gl_FragCoord.xy / uCell);
  vec2 pc = (cell + .5) * uCell;                       // cell centre, GL coords (y up)
  vec2 q = vec2(pc.x - uCenter.x, pc.y - (uRes.y - uCenter.y)) / uR;
  float r = length(q);
  float th = b8(cell);
  float D = 0.;
  if (r < 1.) {
    float z = sqrt(1. - r*r);
    vec3 n = vec3(q, z);
    float lat = asin(q.y * cos(uLat0) + z * sin(uLat0));
    float lon = uLon0 + atan(q.x, z * cos(uLat0) - q.y * sin(uLat0));
    vec2 uv = vec2(fract((lon + PI) / (2.*PI)), (PI*.5 - lat) / PI);
    float land = step(.5, texture2D(uLand, uv).r);
    float shade = clamp(dot(n, normalize(vec3(-.35, .55, .76))) * .9 + .18, 0., 1.);
    float grat = (1. - smoothstep(.0, .012, abs(fract(lon / (PI/9.)) - .5) * 2. - .975)) ;
    float gl = max(step(.986, 1. - abs(fract(lon*9./PI) - .5)*2.), step(.986, 1. - abs(fract(lat*9./PI) - .5)*2.));
    float twinkle = .06 * hash(cell + floor(uTime*1.5));
    float ocean = .05 + .13*(1. - shade) + .18*gl + twinkle;
    float ground = .5 + .34*(1. - shade) + .1*smoothstep(.3, 0., shade);
    D = mix(ocean, ground, land);
    D *= smoothstep(1., .965, r) * .35 + .65;           // soften the limb
  } else {
    D = .2 * smoothstep(1.075, 1., r);                    // dotted atmosphere
  }
  float lv = clamp(D, 0., .999) * 3.; float base = floor(lv);
  float lvl = base + ((lv - base) > th ? 1. : 0.);
  vec3 col = lvl < .5 ? c0 : lvl < 1.5 ? c1 : lvl < 2.5 ? c2 : c3;
  if (th > uDev) col = c0;
  gl_FragColor = vec4(col, 1.);
}`

export function Globe({ width, height, cx, cy, r, palette, cell = 2 }: { width: number; height: number; cx: number; cy: number; r: number; palette: [string, string, string, string]; cell?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current!
    const gl = canvas.getContext('webgl', { antialias: false })
    if (!gl) return
    const dpr = Math.min(2, devicePixelRatio || 1)
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
    gl.viewport(0, 0, canvas.width, canvas.height)
    const sh = (t: number, s: string) => { const o = gl.createShader(t)!; gl.shaderSource(o, s); gl.compileShader(o); return o }
    const prog = gl.createProgram()!
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog); gl.useProgram(prog)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, landMask())
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    const u = (n: string) => gl.getUniformLocation(prog, n)
    palette.forEach((c, i) => gl.uniform3fv(u('c' + i), hex(c)))
    gl.uniform2f(u('uRes'), canvas.width, canvas.height); gl.uniform2f(u('uCenter'), cx * dpr, cy * dpr)
    gl.uniform1f(u('uR'), r * dpr); gl.uniform1f(u('uCell'), cell * dpr)
    gl.uniform1f(u('uLon0'), (VIEW.lon0 * Math.PI) / 180); gl.uniform1f(u('uLat0'), (VIEW.lat0 * Math.PI) / 180)
    gl.uniform1i(u('uLand'), 0)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0, last = 0
    const t0 = performance.now()
    const draw = (now: number) => {
      const dev = reduce ? 1 : Math.min(1, Math.max(0, (now - t0 - 150) / 1300))
      gl.uniform1f(u('uDev'), dev * dev * (3 - 2 * dev)); gl.uniform1f(u('uTime'), (now - t0) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    const loop = (now: number) => { raf = requestAnimationFrame(loop); if (now - last > 40) { last = now; draw(now) } }
    if (reduce) draw(performance.now()); else raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [width, height, cx, cy, r, palette, cell])
  return <canvas ref={ref} aria-hidden="true" style={{ width, height }} className="pointer-events-none block [image-rendering:pixelated]" />
}
