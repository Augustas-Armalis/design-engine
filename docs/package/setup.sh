#!/usr/bin/env bash
# Larpo Engine V1: one-time setup. Run from the package root (the folder holding engine/ and reel/).
set -euo pipefail
cd "$(dirname "$0")"

say() { printf '\n\033[1m%s\033[0m\n' "$1"; }
need() { command -v "$1" >/dev/null 2>&1 || { echo "Missing: $1. $2"; exit 1; }; }

need node "Install Node 22.18+ (https://nodejs.org or nvm)."
need python3 "Install Python 3."
node -e 'const [a,b]=process.versions.node.split(".").map(Number); if(a<22||(a===22&&b<18)){console.error("Node "+process.versions.node+" found; Reel needs 22.18+");process.exit(1)}'

say "1/4  Engine tools (Playwright + Chromium, axe-core)"
(cd engine && npm install --no-audit --no-fund && npx playwright install chromium)
# logo drawing kit (tools/logo_drawkit.cjs): paper.js + offset + opentype, installed without touching package.json
(cd engine && npm install --no-save --no-audit --no-fund paper@0.12.18 paperjs-offset@2.2.1 opentype.js@2.0.0)

say "2/4  Python venv for the rule index (stdlib only; ingest deps are optional)"
python3 -m venv engine/.venv
echo "     Optional, only to ingest new PDFs/books: engine/.venv/bin/pip install -r engine/requirements-ingest.txt"

say "3/4  Reel recorder (pnpm via corepack, headless Chromium, bundled ffmpeg)"
(cd reel && corepack pnpm install && corepack pnpm --filter @reel/capture exec playwright-core install chromium-headless-shell)

say "4/4  Rule index"
(cd engine && .venv/bin/python tools/build_index.py | tail -1)

say "Done."
cat <<'EOF'
Next:
  cd engine && claude          # open Claude Code here and give it a brief
  node tools/record.mjs <url>  # 4K 60fps load-in video of any page or localhost build
Read START-HERE.md for the rest.
EOF
