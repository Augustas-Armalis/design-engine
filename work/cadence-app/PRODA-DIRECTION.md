# Cadence product screen r2, AlignUI + affectUI grammar (`#/cproda`)

scope: one product screen (Cadence overview dashboard), 1600x1200 frame, light, grey canvas, whole app frame visible
motion: none
mode: C (design in a style), floor = AlignUI dashboards (`knowledge/benchmarks/alignui-dashboards/hr-1.png`, `ai-1.png`, ALN-01..18) + affectUI decision tray (AK-01..33, `decision-affectui-replica@2x.png`), sample data
kind: product-ui
why r2: cprodk r1 rejected ("too similar to marcel... no apple like stuff at the top... too little rounded... too little small details or shadows... lacks proper dashboard sidebar and components").

- **No browser or OS chrome.** No traffic lights, no URL bar. The app sits in a double-bezel frame: frame r36 on `#F5F7FA`, an 8px inset, then the white main panel r28 (concentric).
- **Rounder ladder (founder):** frame 36 / panel 28 / tray 20 / cards 16 / controls and tiles 10 / segmented option 8 / chips 6-7 / pills and avatars round.
- **AlignUI parts:** slate role tokens, Inter, 14/500 labels + 14/400 copy + 12 meta, 36 controls, Remix icons. Workspace switcher with a selector button, search with a ⌘K kbd, MAIN / TEAMS / CALENDARS labels, nav badge, team kbd shortcuts, coloured calendar checkboxes, trial card with progress, verified user row with an online dot. Stroke status badges with a dot, avatar tints (200 fill / 950 ink).
- **affectUI parts:** "2 need your input" tray (grey r20, white card r16, tactile ink buttons, footer strip), the segmented control.
- **Details:** KPI cards with an icon tile, a delta badge and a mini visual (bars, progress ring, sparkline, avatar stack). The timeline rail is drawn in segments that stop short of every marker, and the live-row highlight covers only the content column. The chart's today column is an opaque band over the gridlines, with the tooltip above the plot, so no line runs behind it. Availability strip per person; booking link with a copy button and a switch.
- **One accent:** violet `#7D52F4`. Status colour only where it means something (red = live or in a call, green = free / improvement, orange = needs input).

- override: radius.ladder.product because the founder asked for rounder than the Kestrel/Kargul ladder; the ladder above is AlignUI's, scaled up one step
- override: shadow.levels.product because AlignUI layers many named recipes (ALN-13: xs controls, card, floating, primary, ink, switch thumb); every one comes from the six constants at the top of the file
- override: edge.ring+inset because the "+N" pills in avatar stacks need a 2px white cut-out ring plus their own hairline, and the primary is a button material (AlignUI button-primary)
