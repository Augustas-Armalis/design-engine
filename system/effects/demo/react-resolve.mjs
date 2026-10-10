// Node module hook: resolve bare `react` / `react-dom` imports from a work app's node_modules, because the repo root
// has no React dependency (and must not get one). Used by squircle.test.ts and build.mjs:
//   node --import ./system/effects/demo/react-resolve.mjs --test system/effects/squircle.test.ts
import { register } from 'node:module';
import { pathToFileURL, fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const candidates = (process.env.REACT_NODE_MODULES ? [process.env.REACT_NODE_MODULES] : [])
  .concat(fs.readdirSync(path.join(repo, 'work')).map((d) => path.join(repo, 'work', d, 'app', 'node_modules')));
const nm = candidates.find((p) => fs.existsSync(path.join(p, 'react', 'package.json')) && fs.existsSync(path.join(p, 'react-dom', 'package.json')));
if (!nm) throw new Error('react-resolve: no work/*/app/node_modules with react + react-dom; set REACT_NODE_MODULES');
const parent = pathToFileURL(path.join(nm, '_resolve_anchor.js')).href;

register('data:text/javascript,' + encodeURIComponent(`
export async function resolve(spec, ctx, next) {
  if (/^(react|react-dom)(\\/|$)/.test(spec)) return next(spec, { ...ctx, parentURL: ${JSON.stringify(parent)} });
  return next(spec, ctx);
}`));
