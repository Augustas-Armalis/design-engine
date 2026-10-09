// Signature visual: night sky over a planet horizon; dawn breaks behind the product as the load-in completes.
// WebGL2, one full-screen triangle. Stars twinkle; a thin rim light and a layered atmosphere glow rise with `dawn`.
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

const VERT = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`

const FRAG = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2 res; uniform float t, dawn, stars, horizon;

float h(vec2 p){ p = fract(p*vec2(443.897, 441.423)); p += dot(p, p.yx+19.19); return fract((p.x+p.y)*p.x); }

void main(){
  vec2 fc = gl_FragCoord.xy;
  vec2 p = (fc - .5*res) / res.y;              // centred, y up, units of height
  float R = 2.7;                                 // planet radius: a wide, gentle arc
  vec2 c = vec2(0., horizon - .5 - R);           // arc top sits at 'horizon' (0 bottom .. 1 top)
  float d = length(p - c) - R;                   // < 0 inside the planet

  // night sky
  vec3 col = mix(vec3(.027,.031,.051), vec3(.012,.014,.024), smoothstep(-.1,.5,p.y));

  // stars: sparse grid, soft points, slow twinkle, dimmed near the glow
  vec2 g = fc / 3.2; vec2 id = floor(g / 9.); vec2 f = fract(g / 9.) - .5;
  float r = h(id); vec2 off = (vec2(h(id+3.1), h(id+7.7)) - .5) * .7;
  float star = step(.895, r) * smoothstep(.10, .0, length(f - off)) * (.55 + .45*sin(t*(.6+r*1.8) + r*40.));
  star *= stars * smoothstep(.0, .25, d) * (.35 + .65*smoothstep(.0,.6,p.y+.2)) * (1. - .7*smoothstep(.36,.46,p.y));
  col += vec3(.80,.85,1.) * star * .75;

  // atmosphere: layered glow above the rim, warm at the centre, cooling toward the edges
  float centre = exp(-p.x*p.x*1.4);
  vec3 warm = vec3(1., .70, .42), rose = vec3(.95,.45,.36), cool = vec3(.25,.36,.95);
  vec3 tint = mix(cool, mix(rose, warm, smoothstep(.25,.9,centre)), smoothstep(.05,.6,centre));
  float above = step(0., d);
  float glow = (exp(-d*7.)*.38 + exp(-d*26.)*.55 + exp(-d*120.)*.7) * above;
  col += tint * glow * centre * dawn;
  col += cool * exp(-max(d,0.)*4.) * .05 * dawn;

  // planet: dark disc with a terminator glow just under the rim
  float inside = 1. - above;
  vec3 ground = mix(vec3(.010,.012,.020), vec3(.028,.030,.045), smoothstep(-.35,.0,d));
  col = mix(col, ground + tint * exp(d*30.) * .22 * centre * dawn, inside);

  // rim light: a hairline that is brightest at the centre
  float rim = exp(-abs(d)*res.y*.9);
  col += mix(warm, vec3(1.), .55) * rim * (.25 + .75*centre) * dawn * 1.2;

  // grain against banding
  col += (h(fc + fract(t)) - .5) / 255. * 2.;
  o = vec4(col, 1.);
}`

export default function Dawn({ horizon = 0.478, delay = 0.5 }: { horizon?: number; delay?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const still = useReducedMotion()
  useEffect(() => {
    const c = ref.current!; const gl = c.getContext('webgl2', { antialias: false, preserveDrawingBuffer: true })
    if (!gl) return
    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s)); return s }
    const pr = gl.createProgram()!; gl.attachShader(pr, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(pr); gl.useProgram(pr)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = (n: string) => gl.getUniformLocation(pr, n)
    gl.uniform1f(u('horizon'), horizon)
    let raf = 0, visible = true; const t0 = performance.now()
    const size = () => { const d = Math.min(devicePixelRatio || 1, 2); c.width = Math.round(c.clientWidth * d); c.height = Math.round(c.clientHeight * d); gl.viewport(0, 0, c.width, c.height); gl.uniform2f(u('res'), c.width, c.height) }
    size(); const ro = new ResizeObserver(size); ro.observe(c)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(frame) }); io.observe(c)
    const easeOut = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3)
    function frame(now: number) {
      raf = 0
      const s = (now - t0) / 1000
      const dawn = still ? 1 : easeOut((s - delay) / 2.8) * (1 + 0.03 * Math.sin(s * 0.6))
      gl!.uniform1f(u('t'), still ? 0 : s); gl!.uniform1f(u('dawn'), dawn); gl!.uniform1f(u('stars'), still ? 1 : easeOut(s / 1.4))
      gl!.drawArrays(gl!.TRIANGLES, 0, 3)
      if (visible && !still) raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect() }
  }, [horizon, delay, still])
  return <canvas ref={ref} aria-hidden className="block h-full w-full" />
}
