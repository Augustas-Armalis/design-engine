import { useEffect, useRef } from 'react'

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`
// Dithered radar field: rings, spokes, a rotating sweep and short-lived alert specks.
// Empty cells are transparent so the page rails show through.
const FRAG = `
precision highp float;
uniform vec2 uRes, uC; uniform float uR, uCell, uTime, uDev; uniform vec3 c1, c2, c3;
float b2(vec2 a){ a = floor(a); return fract(a.x/2. + a.y*a.y*.75); }
float b4(vec2 a){ return b2(.5*a)*.25 + b2(a); }
float b8(vec2 a){ return b4(.5*a)*.25 + b2(a); }
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
void main(){
  vec2 cell = floor(gl_FragCoord.xy / uCell);
  vec2 pc = (cell + .5) * uCell;
  vec2 q = vec2(pc.x - uC.x, (uRes.y - pc.y) - uC.y);
  float r = length(q) / uR;
  float ang = atan(q.x, -q.y);
  float D = 0.;
  if (r < 1.) {
    float ring = 1. - smoothstep(0., .004, abs(fract(r * 7.) - .5) * 2. - .99);
    float spoke = 1. - smoothstep(0., .01, abs(fract(ang / .2618 + .5) - .5) * 2. - .98);
    float sweepA = mod(uTime * .35, 3.0) - 1.5;
    float d = ang - sweepA;
    float sweep = d < 0. ? exp(d * 4.) : 0.;
    vec2 g = cell;                                      // single-cell specks: fine, not blocky
    float life = fract(uTime * .16 + hash(g) * 7.);
    float speck = step(.993, hash(g + 3.1)) * smoothstep(1., .5, life) * smoothstep(0., .08, life);
    D = .04 + .62 * ring + .07 * spoke + .2 * sweep + .9 * speck;
    D *= smoothstep(1., .82, r);
  }
  float th = b8(cell);
  float lv = clamp(D, 0., .999) * 3.; float base = floor(lv);
  float lvl = base + ((lv - base) > th ? 1. : 0.);
  vec3 col = lvl < 1.5 ? c1 : lvl < 2.5 ? c2 : c3;
  float a = (lvl < .5 || th > uDev) ? 0. : 1.;
  gl_FragColor = vec4(col * a, a);
}`

export function Radar({ width, height, cx, cy, r, palette, cell = 2 }: { width: number; height: number; cx: number; cy: number; r: number; palette: [string, string, string]; cell?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current!
    const gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: true })
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
    const u = (n: string) => gl.getUniformLocation(prog, n)
    palette.forEach((c, i) => gl.uniform3fv(u('c' + (i + 1)), hex(c)))
    gl.uniform2f(u('uRes'), canvas.width, canvas.height); gl.uniform2f(u('uC'), cx * dpr, cy * dpr)
    gl.uniform1f(u('uR'), r * dpr); gl.uniform1f(u('uCell'), cell * dpr)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0, last = 0
    const t0 = performance.now()
    const draw = (now: number) => {
      const dev = reduce ? 1 : Math.min(1, Math.max(0, (now - t0 - 200) / 1300))
      gl.uniform1f(u('uDev'), dev * dev * (3 - 2 * dev)); gl.uniform1f(u('uTime'), reduce ? 2.4 : (now - t0) / 1000 + 2.4)
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    const loop = (now: number) => { raf = requestAnimationFrame(loop); if (now - last > 33) { last = now; draw(now) } }
    if (reduce) draw(performance.now()); else raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [width, height, cx, cy, r, palette, cell])
  return <canvas ref={ref} aria-hidden="true" style={{ width, height }} className="pointer-events-none block [image-rendering:pixelated]" />
}
