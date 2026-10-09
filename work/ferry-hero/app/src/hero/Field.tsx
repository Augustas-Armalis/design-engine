// Signature visual: a live sea chart. Domain-warped fbm drawn as bathymetric iso-lines (index contour every 5th),
// a pale depth tint between bands, drifting a few px per second like water. Fades behind the copy on the left.
// WebGL2, one full-screen triangle; contour width is in CSS px (fwidth / dpr) so it stays a hairline at any scale.
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

const VERT = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`

const FRAG = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2 res; uniform float t, dpr, k;

float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p), u = f*f*(3. - 2.*f);
  return mix(mix(h(i), h(i + vec2(1, 0)), u.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), u.x), u.y); }
float fbm(vec2 p){ float s = 0., a = .5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6); for (int i = 0; i < 5; i++){ s += a*n(p); p = m*p; a *= .5; } return s; }

void main(){
  vec2 fc = gl_FragCoord.xy, uv = fc / res;
  vec2 p = (fc / dpr) / 300. + vec2(t*.010, t*.004);
  vec2 w = vec2(fbm(p + vec2(3.1, 1.7) + t*.006), fbm(p + vec2(8.3, 2.8) - t*.005));
  float f = fbm(p + 1.35*w);

  float N = 16., x = f*N;
  float d = abs(fract(x - .5) - .5) / max(fwidth(x), 1e-4) / dpr;   // css px to the nearest contour
  float lev = floor(x + .5);
  float index = 1. - step(.5, abs(mod(lev, 5.)));                    // every 5th line is an index contour
  float line = 1. - smoothstep(index > .5 ? .55 : .3, index > .5 ? 1.45 : 1.05, d);

  // copy sits on the left: the chart is quiet there and full strength from ~45% across
  float m = .18 + .82*smoothstep(.2, .58, uv.x);
  m *= mix(.55, 1., smoothstep(1., .82, uv.y));                       // a touch quieter under the nav

  vec3 paper = vec3(.969, .976, .988), deep = vec3(.900, .932, .990), sea = vec3(.149, .427, .941);
  float depth = smoothstep(.38, .78, floor(x)/N);                     // banded tint, deeper water darker
  vec3 col = mix(paper, deep, depth*.55*m);
  col = mix(col, sea, line*(index > .5 ? .28 : .12)*m*k);
  col += (h(fc + fract(t)) - .5) / 255.;                             // grain against banding
  o = vec4(col, 1.);
}`

export default function Field() {
  const ref = useRef<HTMLCanvasElement>(null)
  const still = useReducedMotion()
  useEffect(() => {
    const c = ref.current!; const gl = c.getContext('webgl2', { antialias: false, preserveDrawingBuffer: true })
    if (!gl) return
    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s)); return s }
    const pr = gl.createProgram()!; gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(pr); gl.useProgram(pr)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = (name: string) => gl.getUniformLocation(pr, name)
    let raf = 0, visible = true; const t0 = performance.now()
    const size = () => { const d = Math.min(devicePixelRatio || 1, 2); c.width = Math.round(c.clientWidth * d); c.height = Math.round(c.clientHeight * d); gl.viewport(0, 0, c.width, c.height); gl.uniform2f(u('res'), c.width, c.height); gl.uniform1f(u('dpr'), d) }
    size(); const ro = new ResizeObserver(size); ro.observe(c)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame) }); io.observe(c)
    function frame(now: number) {
      raf = 0
      const s = (now - t0) / 1000
      gl!.uniform1f(u('t'), still ? 0 : s + 40); gl!.uniform1f(u('k'), still ? 1 : Math.min(1, s / 1.2))
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)
      if (visible && !still) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [still])
  return <canvas ref={ref} aria-hidden className="block size-full" />
}
