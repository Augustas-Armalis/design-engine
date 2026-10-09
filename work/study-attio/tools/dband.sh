#!/bin/zsh
# dband.sh <round> x0 x1 y0 y1 axis [th]
S=$(cd "$(dirname "$0")" && pwd)
W=/Users/augustas/dev/design-engine/work/study-attio
N=$1; shift
paste <(node $S/bands.cjs $W/ref/reference.png 4 "$@") <(node $S/bands.cjs $W/render-$N.png 4 "$@") | awk -F'\t' '{printf "%-28s | %s\n",$1,$2}'
