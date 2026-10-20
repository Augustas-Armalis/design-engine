/**
 * Demo.tsx: specimen page for system/iso/iso.tsx. One cell per primitive, dark (Kargul services bento values) and
 * light (Opero / Boomtax values), plus two composed bento cells that follow the composition rules in
 * knowledge/web/isometric-line-art.md (one hero object, exploded layers, guides to the edge, callout, one accent).
 *
 * Render: import Demo into any Vite + React app (e.g. the product-hero kit template) and mount <Demo />.
 */
import * as React from "react";
import {
  Box,
  Callout,
  Card,
  Connector,
  GuideLines,
  Hatch,
  IsoGrid,
  IsoScene,
  Node,
  Plate,
  Plus,
  Stack,
  Texture,
  Tower,
  Wall,
  planeCircle,
  planeRoundRect,
  polyPath,
  topPlane,
  useIso,
  useStroke,
} from "./iso";
import type { IsoMode, Plane } from "./iso";

const W = 360;
const H = 280;

function Cell(props: { title: string; mode: IsoMode; note: string; children: React.ReactNode }) {
  const dark = props.mode === "dark";
  return (
    <figure
      style={{
        margin: 0,
        borderRadius: 18,
        overflow: "hidden",
        background: dark ? "#313131" : "#ffffff",
        boxShadow: dark ? "none" : "0 0 0 1px rgba(17,17,17,0.08)",
        color: dark ? "#fff" : "#111",
      }}
    >
      {props.children}
      <figcaption style={{ padding: "0 20px 18px", font: "500 14px/20px var(--font-sans, Inter, system-ui)" }}>
        {props.title}
        <div style={{ font: "400 13px/19px var(--font-sans, Inter, system-ui)", color: dark ? "#9d9d9d" : "#6b6b6b" }}>{props.note}</div>
      </figcaption>
    </figure>
  );
}

/** Logo glyph drawn on a plane: four in-plane rounded bars (Kargul's mark-on-plate move). Solid = the one accent. */
function PlaneGlyph(props: { pl: Plane; a: number; b: number; s?: number }) {
  const { P, T } = useIso();
  const s = props.s ?? 1;
  const bars: [number, number, number, number][] = [
    [0, 0, 8, 6],
    [11, 0, 14, 6],
    [0, 9, 14, 6],
    [17, 9, 8, 6],
  ];
  return (
    <g>
      {bars.map(([a, b, w, h], i) => (
        <path key={i} d={planeRoundRect(P, props.pl, props.a + a * s, props.b + b * s, w * s, h * s, 3 * s)} fill={T.accent} />
      ))}
    </g>
  );
}

/** Text placeholder bars on a plane: grain-filled bar + hairlines (Kargul text treatment). */
function TextBars(props: { pl: Plane; a: number; b: number; w: number; lines?: number }) {
  const { P } = useIso();
  const s = useStroke("detail");
  const n = props.lines ?? 3;
  const bar = planeRoundRect(P, props.pl, props.a, props.b, props.w * 0.55, 5, 0);
  return (
    <g>
      <Texture d={bar} kind="grain" opacity={0.55} />
      {Array.from({ length: n }, (_, i) => (
        <path
          key={i}
          d={polyPath(P, [
            [props.pl.o[0] + props.a, props.pl.o[1] + props.b + 9 + i * 4, props.pl.o[2]],
            [props.pl.o[0] + props.a + props.w * (i === n - 1 ? 0.6 : 1), props.pl.o[1] + props.b + 9 + i * 4, props.pl.o[2]],
          ])}
          {...s}
        />
      ))}
    </g>
  );
}

function PrimitiveCells(props: { mode: IsoMode }) {
  const m = props.mode;
  return (
    <>
      <Cell mode={m} title="Plate" note="Rounded slab, exact projected corners, hatched shade face, grain lit face.">
        <IsoScene width={W} height={H} mode={m} origin={{ x: W / 2, y: 110 }}>
          <GuideLines through={[[-70, -50, 0], [70, 50, 0]]} reach={260} />
          <Plate at={[-70, -50, 0]} w={140} d={100} h={14} r={10} level="focal" shadow={m === "light" ? 10 : 0} />
        </IsoScene>
      </Cell>
      <Cell mode={m} title="Stack" note="Exploded layers, dashed corner connectors, diamond nodes; focal layer brightest.">
        <IsoScene width={W} height={H} mode={m} origin={{ x: W / 2, y: 150 }}>
          <GuideLines through={[[-55, -55, 0]]} reach={240} />
          <Stack
            at={[-55, -55, 0]}
            w={110}
            d={110}
            layers={3}
            gap={34}
            connectors
            content={(i) => (i === 2 ? <PlaneGlyph pl={topPlane(-55, -55, 68)} a={40} b={45} s={1.2} /> : null)}
          />
        </IsoScene>
      </Cell>
      <Cell mode={m} title="Box and Tower" note="Extruded prisms; one tower raised as the answer, the rest secondary.">
        <IsoScene width={W} height={H} mode={m} origin={{ x: W / 2, y: 190 }}>
          <IsoGrid cells={8} step={30} style="dotted" />
          <Box at={[-60, -10, 0]} w={40} d={40} h={30} level="secondary" />
          <Tower at={[-12, -10, 0]} size={30} h={56} level="secondary" />
          <Tower at={[30, -10, 0]} size={30} h={104} level="focal" topFill={m === "dark" ? "#3f3f3f" : "#f2f2f2"} />
        </IsoScene>
      </Cell>
      <Cell mode={m} title="Card" note="UI card on a plate: grain title bar, iso avatars, rows, chips; one row in the accent.">
        <IsoScene width={W} height={H} mode={m} origin={{ x: W / 2, y: 80 }} accent={m === "dark" ? "#ffffff" : "#1e1e1e"}>
          <GuideLines through={[[-75, -55, 0]]} reach={240} />
          <Card at={[-75, -55, 0]} w={150} d={115} rows={3} highlight={1} />
        </IsoScene>
      </Cell>
      <Cell mode={m} title="Node, Plus, Connector" note="Squares drawn in-plane (diamonds), + marks, cables on iso axes with rounded elbows.">
        <IsoScene width={W} height={H} mode={m} origin={{ x: W / 2, y: 140 }}>
          <Connector points={[[-110, 0, 0], [-20, 0, 0], [-20, 60, 0], [70, 60, 0]]} endNodes />
          <Connector points={[[-60, -80, 0], [-60, -30, 0], [40, -30, 0]]} dashed level="secondary" />
          <Node at={[-20, 0, 0]} tone="on" />
          <Node at={[40, -30, 0]} tone="off" />
          <Node at={[90, -60, 0]} plane="left" />
          <Node at={[110, -80, 0]} plane="right" />
          <Plus at={[0, -100, 0]} arm={4} />
          <Plus at={[30, -100, 0]} arm={4} />
        </IsoScene>
      </Cell>
      <Cell mode={m} title="Callout" note="Anchor node, dotted leader with one elbow, upright mono-caps pill.">
        <IsoScene width={W} height={H} mode={m} origin={{ x: 150, y: 140 }}>
          <Plate at={[-50, -40, 0]} w={100} d={80} h={8} r={0} level="primary" cornerNodes="on" />
          <Callout at={[50, -40, 8]} dx={40} dy={-44} label="12px grid" />
          <Callout at={[50, 40, 8]} dx={60} dy={36} label="Answer" tone="accent" />
        </IsoScene>
      </Cell>
      <Cell mode={m} title="Hatch, Dots, Grain" note="Fills clipped to faces: 3px hatch on the iso axis, 5px dots, 3px halftone, grain.">
        <IsoScene width={W} height={H} mode={m} origin={{ x: W / 2, y: 140 }}>
          <FillSwatches />
        </IsoScene>
      </Cell>
      <Cell mode={m} title="GuideLines and IsoGrid" note="Construction lines fade from the object to the edge; dashed grid with + marks.">
        <IsoScene width={W} height={H} mode={m} origin={{ x: W / 2, y: 140 }}>
          <IsoGrid cells={6} step={36} style="dashed" plus />
          <GuideLines through={[[0, 0, 0]]} axes={["x", "y", "z"]} reach={300} />
          <Node at={[0, 0, 0]} />
        </IsoScene>
      </Cell>
    </>
  );
}

function FillSwatches() {
  const { P } = useIso();
  const s = useStroke("primary");
  const a = planeRoundRect(P, topPlane(-110, -40, 0), 0, 0, 60, 60, 4);
  const b = planeRoundRect(P, topPlane(-30, -40, 0), 0, 0, 60, 60, 4);
  const c = planeRoundRect(P, topPlane(50, -40, 0), 0, 0, 60, 60, 4);
  const d = planeCircle(P, topPlane(0, 70, 0), 0, 0, 34);
  return (
    <g>
      <Hatch d={a} angle={P.angle} spacing={3} color={s.stroke as string} />
      <path d={a} {...s} />
      <Texture d={b} kind="dots" opacity={0.6} />
      <path d={b} {...s} />
      <Texture d={c} kind="dots3" opacity={0.45} />
      <path d={c} {...s} />
      <Texture d={d} kind="grain" opacity={0.5} />
      <path d={d} {...s} />
    </g>
  );
}

/** Composed cell 1 (dark): Kargul "full-stack" grammar: app slab, satellite plates on connectors, guides, callout. */
function ComposedDark() {
  return (
    <Cell mode="dark" title="Composed: product slab" note="One hero object, satellites on axis connectors, guides to the edge, solid accent only on the mark.">
      <IsoScene width={W * 2 + 16} height={300} mode="dark" origin={{ x: 380, y: 120 }} edgeFade={0.35}>
        <IsoGrid at={[0, 0, 0]} cells={12} step={40} style="dotted" />
        <GuideLines through={[[-80, -60, 0], [80, 60, 0], [80, -60, 0]]} reach={420} />
        <Connector points={[[-80, 10, 0], [-150, 10, 0]]} level="secondary" />
        <Connector points={[[40, -60, 0], [40, -130, 0]]} level="secondary" />
        <Plate at={[-230, -20, 0]} w={80} d={60} r={0} level="secondary" cornerNodes="off" />
        <Plate at={[0, -230, 0]} w={80} d={100} r={0} level="secondary" cornerNodes="off" />
        <Plate at={[-80, -60, 0]} w={160} d={120} h={16} r={0} level="focal" cornerNodes="on" dashedEdges>
          <AppFace />
        </Plate>
        <Callout at={[80, 60, 16]} dx={90} dy={20} label="8 / 12 / 16" />
      </IsoScene>
    </Cell>
  );
}

function AppFace() {
  const { P } = useIso();
  const s = useStroke("detail");
  const pl = topPlane(-80, -60, 16);
  return (
    <g>
      <PlaneGlyph pl={pl} a={12} b={12} s={0.9} />
      <path d={planeRoundRect(P, pl, 44, 10, 46, 9, 4.5)} {...s} />
      <path d={planeRoundRect(P, pl, 98, 10, 50, 9, 4.5)} {...s} />
      <path d={planeRoundRect(P, pl, 44, 30, 104, 78, 6)} {...s} />
      <TextBars pl={pl} a={12} b={40} w={24} lines={4} />
    </g>
  );
}

/** Composed cell 2 (light): exploded UI walls stacked along y, dotted leader to a px label, grid floor. */
function ComposedLight() {
  return (
    <Cell mode="light" title="Composed: exploded screens" note="Walls stepped along y, back layers dimmer, front layer focal with hatch; dotted leader.">
      <IsoScene width={W * 2 + 16} height={300} mode="light" origin={{ x: 360, y: 230 }} edgeFade={0.3}>
        <IsoGrid cells={10} step={40} style="dashed" plus />
        <Wall at={[-90, -60, 0]} w={150} h={110} level="secondary" texture="dots" />
        <Wall at={[-90, -20, 0]} w={150} h={110} level="primary" />
        <Wall at={[-90, 20, 0]} w={150} h={110} level="focal" texture="hatch">
          {(pl) => <WallUI pl={pl} />}
        </Wall>
        <Callout at={[60, 20, 110]} dx={110} dy={-30} label="px perfect" />
      </IsoScene>
    </Cell>
  );
}

function WallUI(props: { pl: Plane }) {
  const { P, T } = useIso();
  const s = useStroke("focal");
  return (
    <g>
      <path d={planeRoundRect(P, props.pl, 14, 14, 80, 12, 3)} fill={T.accent} />
      <path d={planeCircle(P, props.pl, 120, 60, 18)} {...s} fill={T.top} />
      <path d={planeRoundRect(P, props.pl, 14, 40, 70, 50, 4)} {...s} fill={T.top} />
    </g>
  );
}

export default function Demo() {
  return (
    <main style={{ padding: 32, background: "#232323", minHeight: "100vh" }}>
      <h1 style={{ color: "#fff", font: "500 20px/28px var(--font-sans, Inter, system-ui)", margin: "0 0 16px" }}>system/iso specimen</h1>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(4, ${W}px)`, gap: 16 }}>
        <PrimitiveCells mode="dark" />
        <PrimitiveCells mode="light" />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(2, ${W * 2 + 16}px)`, gap: 16, marginTop: 16 }}>
        <ComposedDark />
        <ComposedLight />
      </div>
    </main>
  );
}
