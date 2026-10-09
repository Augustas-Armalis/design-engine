# Acquisity dashboard: redesign exercise

**Brief (founder):** redesign one page, the dashboard of the "Acquisity v2 kit" artifact (https://claude.ai/artifact/XsgdisyTm5soJvEavJb5xF), from scratch "in our style... like alignui.com (my favorite)". Same content and information architecture; product UI, light theme. Reference captured offline (network blocked) in `reference/`.

## What changed and why (engine sources)
- **One consistency contract in code** (`src/ui.tsx`): control ladder xs 24/r6, sm 32/r8, md 36/r8, lg 40/r10; icon 16 at <=32px, 20 at >=36px; icons centred by flex on line-height-1 rows (Kargul CRM teardown: 0.00px offset). Checker: icon-centring pass, radius ladder consistent.
- **AlignUI grammar**: role tokens (bg-weak #f7f7f7, stroke-soft #ebebeb, text strong/sub/soft), closed type list (title-h5, label-lg/md/sm/xs, para-sm/xs), one accent #335cff, status tints, segmented control r10/p4/items 28 r6 with a sliding thumb, table head bg-weak r8, cards r16 ring + xs shadow, stroke/neutral/ghost button grammar (alignui-system.md).
- **KPI strip as one instrument** (four cells, hairline dividers) instead of four boxes; value + delta on one line; sparklines.
- **Data reconciles** (the original's KPIs, chart and table disagreed: 1,284 replies vs 748): replies 720 = last 4 weeks = campaign replies; meetings 27; reply rate 720/27,910 = 2.58%. Sample data labelled per card.
- **Motion budget** (founder Nocturne rule): nothing parades in on load; the one live element is the AI SDR run (steps resolve, intent breakdown expands, timer ticks). Hovers 150ms on cubic-bezier(.25,1,.5,1) (Kargul), press 0.97 (Emil/Jakub for dense app buttons), hover only on real pointers.
- **Heyrico moves**: segmented tick meter for credits, agent panel that shows its work.
- **Checks**: 0 fail. Fixed along the way: soft grey contrast (#737373 -> #6b6b6b on #f7f7f7), status text darkened for AA on tints, blue text on tints uses primary-dark, meter role, table header for actions. Checker improved: controls scrolled out of view in an overflow container are no longer reported as "covered".
