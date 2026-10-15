// Engraved sound landscape (Quorum hero v3 art). Five ridgelines shaped like slow audio envelopes, rendered as an
// etching: fine horizontal hatching whose stroke width follows the tone, lines bending with each ridge, a thin unlit
// rim on every crest. One slate ink on cream (aakib/Native's engraved-landscape panel, abstracted into sound).
// Drifts a few px per second; reduced motion renders one still frame.
import { useEffect, useRef } from 'react'

const FRAG = `
precision highp float;
uniform vec2 uRes; uniform float uT; uniform float uDpr; uniform float uIn;
float h(float p){ return fract(sin(p * 127.1) * 43758.5453); }
float n1(float x){ float i = floor(x), f = fract(x); f = f * f * (3. - 2. * f); return mix(h(i), h(i + 1.), f); }
float env(float x, float s){ return n1(x * .0045 + s) * .62 + n1(x * .013 + s * 1.7) * .28 + n1(x * .04 + s * 2.9) * .1; }
void main(){
  vec2 px = gl_FragCoord.xy / uDpr; px.y = uRes.y - px.y;
  float x = px.x, y = px.y;
  float shade = .05 + .03 * (y / uRes.y);
  float bend = 0.;
  for (int k = 0; k < 5; k++) {
    float fk = float(k);
    float base = uRes.y * (.34 + .14 * fk);
    float amp = 90. + fk * 26.;
    float e = env(x + uT * (3. + fk * 2.5), fk * 5.3 + 1.);
    float ridge = base - amp * e;
    float d = y - ridge;
    if (d > 0.) {
      float body = (.15 + .065 * fk) * (.55 + .45 * exp(-d / (60. + fk * 26.)));
      body *= smoothstep(0., 3.5, d);
      shade = body; bend = (ridge - base) * .35;
    }
  }
  float period = 3.2;
  float yy = y - bend;
  float dist = abs(fract(yy / period) - .5) * period;
  float half_w = clamp(shade, 0., 1.) * period * .5;
  float a = clamp((half_w - dist) * uDpr + .5, 0., 1.);
  a *= smoothstep(0., .2, uIn * 1.2 - (1. - y / uRes.y));
  vec3 ink = vec3(.2, .23, .29);
  gl_FragColor = vec4(ink * a * .72, a * .72);
}`
const VERT = 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }'

export default function Engraving({ at = 0.5, w, h }: { at?: number; w: number; h: number }) {
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
    gl.uniform2f(U('uRes'), w, h); gl.uniform1f(U('uDpr'), dpr)
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const t0 = performance.now(); let raf = 0
    const frame = (now: number) => {
      const s = (now - t0) / 1000
      const k = Math.min(1, Math.max(0, (s - at) / 1.8)), e = 1 - Math.pow(1 - k, 3)
      gl.uniform1f(U('uT'), still ? 0 : s); gl.uniform1f(U('uIn'), still ? 1 : e)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      if (!still || k < 1) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [at, w, h])
  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute left-0 top-0" style={{ width: w, height: h }} />
}
