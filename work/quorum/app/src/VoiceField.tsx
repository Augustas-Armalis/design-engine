// Voice field: a live WebGL halftone of one interview's audio. Ink dots trace a speech waveform that drifts left like a
// playing recording; inside the three highlighted moments the dots take the tag's colour (import amber, pricing blue,
// delight green) and tighten, so the texture shows the product working. One ink, colour only where it means something.
import { useEffect, useRef } from 'react'

export const HIGHLIGHTS = [
  { a: 0.14, b: 0.26, rgb: [0.906, 0.635, 0.114] },
  { a: 0.47, b: 0.56, rgb: [0.302, 0.482, 1.0] },
  { a: 0.76, b: 0.87, rgb: [0.184, 0.694, 0.455] },
] as const

const FRAG = `
precision highp float;
uniform vec2 uRes; uniform float uT; uniform float uDpr; uniform float uIn; uniform float uCy;
uniform vec3 uH[3]; uniform vec3 uC[3];
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(h(i), h(i + vec2(1., 0.)), f.x), mix(h(i + vec2(0., 1.)), h(i + vec2(1., 1.)), f.x), f.y); }
void main(){
  vec2 px = gl_FragCoord.xy / uDpr; px.y = uRes.y - px.y;
  float cell = 7.;
  vec2 id = floor(px / cell); vec2 c = (id + .5) * cell; vec2 lp = px - c;
  float x = c.x / uRes.x;
  float xs = c.x + uT * 26.;
  float speech = smoothstep(.28, .5, n(vec2(xs * .0065, 2.)));
  for (int i = 0; i < 3; i++) speech = max(speech, .85 * smoothstep(uH[i].x - .02, uH[i].x + .015, x) * smoothstep(uH[i].y + .02, uH[i].y - .015, x));
  float amp = (.18 + .82 * pow(n(vec2(xs * .045, 7.)), 1.4)) * speech * 118. + 6.;
  float dy = abs(c.y - uCy);
  float core = smoothstep(amp, amp * .35, dy);
  float mist = .2 * exp(-pow(dy / (amp + 70.), 2.) * 2.) * (.4 + .6 * n(c * .03 + uT * .2));
  float v = max(core * (.55 + .45 * n(c * .05 + vec2(uT * .4, 0.))), mist);
  vec3 col = vec3(.11, .11, .1);
  float alpha = .82;
  for (int i = 0; i < 3; i++) {
    float inside = step(uH[i].x, x) * step(x, uH[i].y);
    if (inside > .5 && core > .25) { col = uC[i]; alpha = 1.; v = max(v, .5 + .5 * core); }
  }
  v *= smoothstep(0., .12, uIn * 1.15 - x);
  float r = sqrt(clamp(v, 0., 1.)) * cell * .47;
  float a = clamp((r - length(lp)) * uDpr + .5, 0., 1.) * alpha;
  gl_FragColor = vec4(col * a, a);
}`
const VERT = 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }'

export default function VoiceField({ at = 0.6, w, h, cy }: { at?: number; w: number; h: number; cy: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const cv = ref.current!, dpr = window.devicePixelRatio || 1
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr)
    const gl = cv.getContext('webgl', { premultipliedAlpha: true, antialias: false, preserveDrawingBuffer: true })!
    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s)); return s }
    const pg = gl.createProgram()!
    gl.attachShader(pg, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(pg, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(pg); gl.useProgram(pg)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(pg, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const U = (k: string) => gl.getUniformLocation(pg, k)
    gl.uniform2f(U('uRes'), w, h); gl.uniform1f(U('uDpr'), dpr); gl.uniform1f(U('uCy'), cy)
    gl.uniform3fv(U('uH'), HIGHLIGHTS.flatMap((s) => [s.a, s.b, 0]))
    gl.uniform3fv(U('uC'), HIGHLIGHTS.flatMap((s) => [...s.rgb]))
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const t0 = performance.now(); let raf = 0
    const frame = (now: number) => {
      const s = (now - t0) / 1000
      const k = Math.min(1, Math.max(0, (s - at) / 1.6)), e = 1 - Math.pow(1 - k, 3)
      gl.uniform1f(U('uT'), still ? 0 : s * 0.5); gl.uniform1f(U('uIn'), still ? 1 : e)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!still || k < 1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [at, w, h, cy])
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute left-0 top-0" style={{ width: w, height: h }} />
}
