#!/usr/bin/env bash
# Build the team package: "Larpo Engine V1.zip" = START-HERE.md + setup.sh + engine/ + reel/.
#   tools/export_package.sh [output-dir]        (default: ~/Documents)
# Excludes what setup.sh reinstalls (node_modules, .venv), git history, build output, raw web captures,
# third-party source that was only studied (no licence to redistribute) and multi-GB lossless video masters.
set -euo pipefail
NAME="Larpo Engine V1"
ENGINE="$(cd "$(dirname "$0")/.." && pwd)"
REEL="${REEL_DIR:-$HOME/Documents/web video recorder}"
OUT_DIR="${1:-$HOME/Documents}"
[ -f "$REEL/apps/cli/bin/reel.js" ] || { echo "Reel not found at $REEL (set REEL_DIR)"; exit 1; }

STAGE_ROOT="$(mktemp -d)"
STAGE="$STAGE_ROOT/$NAME"
mkdir -p "$STAGE"
trap 'rm -rf "$STAGE_ROOT"' EXIT

echo "engine -> $STAGE/engine"
rsync -a \
  --exclude 'node_modules/' --exclude '.venv/' --exclude '.git/' --exclude 'dist/' --exclude '.DS_Store' \
  --exclude 'reports/' --exclude 'corpus/kargul-src/' --exclude 'corpus/web/' --exclude 'corpus/*/pages/' \
  --exclude '*.nut' --exclude 'frames/' --exclude 'posters/' \
  "$ENGINE/" "$STAGE/engine/"

echo "reel   -> $STAGE/reel"
rsync -a \
  --exclude 'node_modules/' --exclude '.git/' --exclude '.next/' --exclude 'dist/' --exclude '.turbo/' \
  --exclude 'coverage/' --exclude '.env' --exclude '.DS_Store' \
  "$REEL/" "$STAGE/reel/"

cp "$ENGINE/docs/package/START-HERE.md" "$STAGE/START-HERE.md"
cp "$ENGINE/docs/package/setup.sh" "$STAGE/setup.sh"
chmod +x "$STAGE/setup.sh"

mkdir -p "$OUT_DIR"
ZIP="$OUT_DIR/$NAME.zip"
rm -f "$ZIP"
(cd "$STAGE_ROOT" && zip -qry -X "$ZIP" "$NAME")
echo "staged size: $(du -sh "$STAGE" | cut -f1)   zip: $(du -h "$ZIP" | cut -f1)"
echo "saved $ZIP"
