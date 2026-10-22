#!/usr/bin/env node
// Lossless crop of a PNG with Chromium canvas: node crop.mjs <in> <out.png> x y w h
import { chromium } from 'playwright'
import fs from 'node:fs'
const [inp, out, x, y, w, h] = process.argv.slice(2)
const b = await chromium.launch(); const p = await b.newPage()
const data = await p.evaluate(async ({ src, x, y, w, h }) => {
  const im = new Image(); im.src = src; await im.decode()
  const c = new OffscreenCanvas(w, h); c.getContext('2d').drawImage(im, -x, -y)
  const blob = await c.convertToBlob({ type: 'image/png' }); const buf = new Uint8Array(await blob.arrayBuffer())
  let s = ''; for (let i = 0; i < buf.length; i += 0x8000) s += String.fromCharCode(...buf.subarray(i, i + 0x8000)); return btoa(s)
}, { src: `data:image/png;base64,${fs.readFileSync(inp).toString('base64')}`, x: +x, y: +y, w: +w, h: +h })
fs.writeFileSync(out, Buffer.from(data, 'base64')); await b.close(); console.log('saved', out)
