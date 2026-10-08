import { useEffect, useRef } from 'react'

type RGB = [number, number, number]
const hex = (h: string): RGB => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as RGB

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`
// Animated fbm field, quantized to a 4-tone palette through an 8x8 Bayer matrix in square cells.
// uDev drives the one-time "pixel develop" entrance: cells switch on in Bayer order.
const FRAG = `
precision highp float;
uniform vec2 uRes; uniform float uTime, uCell, uDev, uTop;
uniform vec3 c0, c1, c2, c3;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(hash(i), hash(i+vec2(1.,0.)), f.x), mix(hash(i+vec2(0.,1.)), hash(i+vec2(1.,1.)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; for (int i = 0; i < 5; i++){ v += a*noise(p); p *= 2.03; a *= .5; } return v; }
float b2(vec2 a){ a = floor(a); return fract(a.x/2. + a.y*a.y*.75); }
float b4(vec2 a){ return b2(.5*a)*.25 + b2(a); }
float b8(vec2 a){ return b4(.5*a)*.25 + b2(a); }
void main(){
  vec2 cell = floor(gl_FragCoord.xy / uCell);
  vec2 uv = cell * uCell / uRes.y;
  float t = uTime * .045;
  float n = fbm(uv*1.8 + vec2(t, -t*.55)) + .45*fbm(uv*4.6 - vec2(t*1.4, t*.8));
  float y = cell.y * uCell / uRes.y;             // 0 bottom .. 1 top
  float x = abs(cell.x * uCell / uRes.x - .5)*2.; // 0 centre .. 1 edge
  float mask = smoothstep(uTop, uTop - .3, y) * (.78 + .32*x);
  float v = clamp((n - .3) * 2.15 * mask, 0., 1.);
  float th = b8(cell);
  float lv = v * 3.; float base = floor(lv);
  float q = base + step(th, lv - base);
  vec3 col = q < .5 ? c0 : q < 1.5 ? c1 : q < 2.5 ? c2 : c3;
  if (th > uDev) col = c0;
  gl_FragColor = vec4(col, 1.);
}`

export function Dither({ palette, top = 0.92, cell = 2, className = '' }: { palette: [string, string, string, string]; top?: number; cell?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current!
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false })
    if (!gl) return
    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s }
    const prog = gl.createProgram()!
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog); gl.useProgram(prog)
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = (n: string) => gl.getUniformLocation(prog, n)
    palette.forEach((c, i) => gl.uniform3fv(u('c' + i), hex(c)))
    gl.uniform1f(u('uTop'), top)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(2, devicePixelRatio || 1)
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.round(r.width * dpr)); canvas.height = Math.max(1, Math.round(r.height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(u('uRes'), canvas.width, canvas.height); gl.uniform1f(u('uCell'), cell * dpr)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(canvas)
    let raf = 0, visible = true, last = 0
    const t0 = performance.now(), devDelay = 180, devDur = 1200
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting }); io.observe(canvas)
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible || now - last < 33) return // ~30fps ambient, paused offscreen
      last = now
      const dev = reduce ? 1 : Math.min(1, Math.max(0, (now - t0 - devDelay) / devDur))
      gl.uniform1f(u('uDev'), dev * dev * (3 - 2 * dev))
      gl.uniform1f(u('uTime'), reduce ? 8 : (now - t0) / 1000 + 8)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    if (reduce) { gl.uniform1f(u('uDev'), 1); gl.uniform1f(u('uTime'), 8); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4) } else raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [palette, top, cell])
  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none block h-full w-full [image-rendering:pixelated] ${className}`} />
}
