import { useEffect, useRef } from 'react'

// A glass lens over the alert field (Heckel MH-26/27/29: refraction, per-channel dispersion, Fresnel rim).
// The field: 3,412 alerts on a 15px grid. Inside the lens they are magnified and the threats light up.
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`
const FRAG = `
precision highp float;
uniform vec2 uRes, uLens; uniform float uLR, uDpr, uTime, uDev;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
// one channel of the dot field at p (css px); returns coverage and whether the dot is a threat
vec2 dots(vec2 p, float grow){
  float cell = 12.;
  vec2 g = floor(p / cell), c = (g + .5) * cell;
  float h = hash(g);
  float threat = step(.991, h);
  float rad = mix(1.45 + .5 * step(.8, h), 2.2, threat) * grow;
  float a = 1. - smoothstep(rad - .55, rad + .55, length(p - c));
  float reveal = step(hash(g + 9.7), uDev);
  float tw = .55 + .45 * sin(uTime * 1.4 + h * 40.);
  return vec2(a * reveal * mix(tw, 1., threat), threat);
}
void main(){
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uDpr;
  vec2 d = p - uLens; float r = length(d) / uLR;
  vec3 grey = vec3(.42, .47, .53), lime = vec3(.64, .9, .21);
  vec3 col; float alpha;
  if (r < 1.) {
    float k = .48 + .52 * r * r;                       // ~2x magnification at the centre
    vec2 R = dots(uLens + d * k * .982, 1.), G = dots(uLens + d * k, 1.), B = dots(uLens + d * k * 1.018, 1.);
    vec3 base = vec3(R.x, G.x, B.x) * (grey * 1.55);
    vec3 hot = vec3(R.x * R.y, G.x * G.y, B.x * B.y) * lime * 1.25;
    col = mix(base, hot, max(max(R.y, G.y), B.y));
    float fres = pow(r, 5.) * .22;                     // Fresnel rim
    float rim = smoothstep(.955, .99, r) * (1. - smoothstep(.99, 1., r));
    float spec = pow(max(0., dot(normalize(vec2(-.6, -.8)), normalize(d))), 6.) * smoothstep(.75, .97, r) * .5;
    col += vec3(.8, .88, .84) * (rim * .7 + spec) + lime * fres * .3;
    col += vec3(.035, .045, .05) * (1. - r) * smoothstep(-.2, .9, -d.x / uLR - d.y / uLR); // glass body, lighter to the top-left
    alpha = .16 + .84 * max(max(col.r, col.g), col.b);
    col = col + vec3(.012, .016, .02);                 // faint glass tint
  } else {
    vec2 o = dots(p, 1.);
    float fall = mix(.55, 1.05, smoothstep(1., 2.4, r)); // the lens's soft shadow on the field
    col = grey * o.x * fall;                           // threats only light up under the lens
    alpha = o.x * fall;
  }
  gl_FragColor = vec4(col, clamp(alpha, 0., 1.));
}`

export function Lens({ width, height, home, radius, onMove }: { width: number; height: number; home: { x: number; y: number }; radius: number; onMove?: (x: number, y: number) => void }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current!
    const gl = canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: false })
    if (!gl) return
    const dpr = Math.min(2, devicePixelRatio || 1)
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    const sh = (t: number, s: string) => { const o = gl.createShader(t)!; gl.shaderSource(o, s); gl.compileShader(o); return o }
    const prog = gl.createProgram()!
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog); gl.useProgram(prog)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = (n: string) => gl.getUniformLocation(prog, n)
    gl.uniform2f(u('uRes'), canvas.width, canvas.height); gl.uniform1f(u('uDpr'), dpr); gl.uniform1f(u('uLR'), radius)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0, last = 0, mx: number | null = null, my = 0, lx = home.x, ly = home.y
    const t0 = performance.now()
    const onPointer = (e: PointerEvent) => { const b = canvas.getBoundingClientRect(); mx = e.clientX - b.left; my = e.clientY - b.top }
    const onLeave = () => { mx = null }
    window.addEventListener('pointermove', onPointer); document.addEventListener('pointerleave', onLeave)
    const frame = (now: number) => {
      const t = (now - t0) / 1000
      // a slow orbit around home; the pointer pulls it gently when it is over the field's right half
      let tx = home.x + Math.cos(t * 0.23) * 60, ty = home.y + Math.sin(t * 0.31) * 34
      if (mx !== null && mx > width * 0.52) { tx = mx; ty = Math.min(Math.max(my, 220), height - 140) }
      lx += (tx - lx) * (reduce ? 1 : 0.06); ly += (ty - ly) * (reduce ? 1 : 0.06)
      gl.uniform2f(u('uLens'), lx, ly); gl.uniform1f(u('uTime'), reduce ? 4 : t + 4)
      gl.uniform1f(u('uDev'), reduce ? 1 : Math.min(1, Math.max(0, (t - 0.15) / 1.2)))
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      onMove?.(lx, ly)
    }
    const loop = (now: number) => { raf = requestAnimationFrame(loop); if (now - last > 16) { last = now; frame(now) } }
    if (reduce) frame(performance.now()); else raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onPointer); document.removeEventListener('pointerleave', onLeave) }
  }, [width, height, home.x, home.y, radius, onMove])
  return <canvas ref={ref} aria-hidden="true" style={{ width, height }} className="pointer-events-none block" />
}
