"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { skillCategories } from "@/lib/data";

/* ------------------------------------------------------------------ */
/*  The system map: you → interface → API → data / AI, on the cloud.  */
/* ------------------------------------------------------------------ */

type NodeId = "user" | "web" | "mobile" | "api" | "data" | "ai" | "cloud";

type SysNode = {
  id: NodeId;
  code: string;
  name: string;
  sub: string;
  x: number; // centre, in viewBox units (1000 × 470)
  y: number;
  skill?: number; // index into skillCategories
};

const VB_W = 1000;
const VB_H = 470;

const NODES: SysNode[] = [
  { id: "user", code: "N-00", name: "You", sub: "where it all starts", x: 95, y: 190 },
  { id: "web", code: "N-01", name: "Interface · Web", sub: "React · Next.js", x: 365, y: 110, skill: 0 },
  { id: "mobile", code: "N-02", name: "Interface · Mobile", sub: "React Native", x: 365, y: 270, skill: 3 },
  { id: "api", code: "N-03", name: "API", sub: "Node · NestJS · Go", x: 635, y: 190, skill: 1 },
  { id: "data", code: "N-04", name: "Data", sub: "Postgres · Redis", x: 905, y: 110, skill: 2 },
  { id: "ai", code: "N-05", name: "AI", sub: "LLMs · RAG · Agents", x: 905, y: 270, skill: 4 },
  { id: "cloud", code: "N-06", name: "Cloud & DevOps", sub: "Docker · AWS · Vercel · CI/CD", x: 635, y: 405, skill: 5 },
];

type Wire = { id: string; from: NodeId; to: NodeId; d: string; kind: "flow" | "infra" | "sync" };

const WIRES: Wire[] = [
  { id: "u-w", from: "user", to: "web", d: "M95,190 C230,190 230,110 365,110", kind: "flow" },
  { id: "u-m", from: "user", to: "mobile", d: "M95,190 C230,190 230,270 365,270", kind: "flow" },
  { id: "w-a", from: "web", to: "api", d: "M365,110 C500,110 500,190 635,190", kind: "flow" },
  { id: "m-a", from: "mobile", to: "api", d: "M365,270 C500,270 500,190 635,190", kind: "flow" },
  { id: "a-d", from: "api", to: "data", d: "M635,190 C770,190 770,110 905,110", kind: "flow" },
  { id: "a-i", from: "api", to: "ai", d: "M635,190 C770,190 770,270 905,270", kind: "flow" },
  { id: "d-i", from: "data", to: "ai", d: "M905,110 L905,270", kind: "sync" },
  { id: "m-c", from: "mobile", to: "cloud", d: "M365,270 L365,405 L635,405", kind: "infra" },
  { id: "a-c", from: "api", to: "cloud", d: "M635,190 L635,405", kind: "infra" },
  { id: "i-c", from: "ai", to: "cloud", d: "M905,270 L905,405 L635,405", kind: "infra" },
];

const CYCLE: NodeId[] = ["web", "api", "data", "ai", "mobile", "cloud", "user"];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

function Inspector({ node }: { node: SysNode }) {
  const skill = node.skill !== undefined ? skillCategories[node.skill] : null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={node.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22 }}
        className="flex h-full flex-col"
      >
        <div className="flex items-center justify-between">
          <span className="mono-label">Inspector</span>
          <span className="font-mono text-[11px] text-accent">{node.code}</span>
        </div>
        <h3 className="mt-4 text-2xl font-medium tracking-[-0.03em]">
          {skill ? skill.title : "You — the person using it"}
        </h3>
        <p className="pretty mt-3 text-sm leading-relaxed text-muted">
          {skill
            ? skill.description
            : "Every system I build starts with a real person and a real problem. The interface, API, data and AI behind it all exist to serve that one moment of use."}
        </p>
        {skill ? (
          <ul className="mt-5 space-y-2 border-t border-line pt-5">
            {skill.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[13px] leading-snug text-fg/85">
                <span className="mt-[3px] font-mono text-[10px] text-accent">→</span>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <a href="#contact" className="btn-accent mt-6 self-start">
            Start a request
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export function SystemDiagram() {
  const [active, setActive] = React.useState<NodeId>("web");
  const [paused, setPaused] = React.useState(false);
  const [cursor, setCursor] = React.useState<{ x: number; y: number } | null>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { margin: "-20% 0px" });
  const reduce = useReducedMotion();

  // Auto-tour through the nodes until someone interacts.
  React.useEffect(() => {
    if (paused || !inView || reduce) return;
    const t = setInterval(() => {
      setActive((cur) => CYCLE[(CYCLE.indexOf(cur) + 1) % CYCLE.length]);
    }, 3200);
    return () => clearInterval(t);
  }, [paused, inView, reduce]);

  const activeNode = NODES.find((n) => n.id === active)!;
  const isLit = (w: Wire) => w.from === active || w.to === active;

  const onMove = (e: React.PointerEvent) => {
    const r = canvasRef.current?.getBoundingClientRect();
    if (!r) return;
    setCursor({
      x: Math.round(((e.clientX - r.left) / r.width) * VB_W),
      y: Math.round(((e.clientY - r.top) / r.height) * VB_H),
    });
  };

  return (
    <div
      ref={wrapRef}
      className="reg-marks grid border border-line bg-surface/70 backdrop-blur-sm xl:grid-cols-[minmax(0,1fr)_320px]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        setPaused(false);
        setCursor(null);
      }}
    >
      {/* ---------- canvas ---------- */}
      <div className="min-w-0 border-line xl:border-r">
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <div className="flex items-center gap-3">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-teal opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-teal" />
            </span>
            <span className="font-mono text-[11px] text-muted">system.map</span>
            <span className="hidden font-mono text-[11px] text-subtle sm:inline">— live</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.12em] text-subtle">
            <span className="hidden items-center gap-1.5 md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> request
            </span>
            <span className="hidden items-center gap-1.5 md:flex">
              <span className="h-1.5 w-1.5 rounded-full border border-fg/50" /> response
            </span>
            <span>{paused ? "inspecting" : "auto-tour"}</span>
          </div>
        </div>

        {/* desktop / tablet: spatial map */}
        <div
          ref={canvasRef}
          onPointerMove={onMove}
          className="relative hidden cursor-crosshair md:block"
          style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
        >
          <div aria-hidden className="absolute inset-0 bg-dots opacity-60" />

          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden
          >
            {WIRES.map((w) => {
              const lit = isLit(w);
              return (
                <g key={w.id}>
                  <path
                    id={`wire-${w.id}`}
                    d={w.d}
                    stroke="rgb(var(--fg))"
                    strokeOpacity={lit ? 0.55 : 0.16}
                    strokeWidth={lit ? 1.4 : 1}
                    strokeDasharray={w.kind === "flow" ? undefined : "4 5"}
                    className={w.kind !== "flow" && lit ? "animate-dash" : undefined}
                    style={{ transition: "stroke-opacity .4s, stroke-width .4s" }}
                  />
                  {lit && (
                    <path
                      d={w.d}
                      stroke="rgb(var(--accent))"
                      strokeWidth={1.6}
                      strokeDasharray="6 10"
                      className="animate-dash"
                      strokeOpacity={0.9}
                    />
                  )}
                </g>
              );
            })}

            {!reduce &&
              WIRES.filter((w) => w.kind === "flow").map((w, i) => (
                <g key={`pk-${w.id}`}>
                  <circle r={3.2} fill="rgb(var(--accent))">
                    <animateMotion dur={`${2.6 + (i % 3) * 0.5}s`} begin={`${i * 0.35}s`} repeatCount="indefinite" rotate="auto">
                      <mpath href={`#wire-${w.id}`} />
                    </animateMotion>
                  </circle>
                  <circle r={2.6} fill="rgb(var(--surface))" stroke="rgb(var(--fg))" strokeOpacity={0.55}>
                    <animateMotion
                      dur={`${3.4 + (i % 2) * 0.6}s`}
                      begin={`${1.2 + i * 0.4}s`}
                      repeatCount="indefinite"
                      keyPoints="1;0"
                      keyTimes="0;1"
                      calcMode="linear"
                    >
                      <mpath href={`#wire-${w.id}`} />
                    </animateMotion>
                  </circle>
                </g>
              ))}
          </svg>

          {/* nodes */}
          {NODES.map((n) => {
            const on = n.id === active;
            const wide = n.id === "cloud";
            return (
              <button
                key={n.id}
                type="button"
                onPointerEnter={() => setActive(n.id)}
                onFocus={() => setActive(n.id)}
                onClick={() => setActive(n.id)}
                aria-pressed={on}
                aria-label={`${n.name}: ${n.sub}`}
                className={`absolute -translate-x-1/2 -translate-y-1/2 border text-left transition-all duration-300 ${
                  wide ? "w-[46%]" : "w-[16.5%] min-w-[118px]"
                } ${
                  on
                    ? "z-10 border-accent bg-bg shadow-[0_0_0_4px_rgb(var(--accent)/0.12)]"
                    : "border-line bg-bg/95 hover:border-fg/40"
                }`}
                style={{ left: pct(n.x, VB_W), top: pct(n.y, VB_H) }}
              >
                <span className={`flex items-center justify-between border-b px-2.5 py-1 font-mono text-[9px] tracking-[0.1em] lg:text-[10px] ${on ? "border-accent/40 text-accent" : "border-line text-subtle"}`}>
                  {n.code}
                  <span className={`h-1.5 w-1.5 rounded-full ${on ? "bg-accent" : "bg-accent-teal/80"}`} />
                </span>
                <span className={`block px-2.5 pb-2 pt-1.5 ${wide ? "flex items-baseline justify-between gap-3" : ""}`}>
                  <span className="block text-[12px] font-medium leading-tight tracking-tight lg:text-[13px]">{n.name}</span>
                  <span className="mt-0.5 block truncate font-mono text-[9px] text-subtle lg:text-[10px]">{n.sub}</span>
                </span>
              </button>
            );
          })}

          {/* crosshair readout */}
          {cursor && (
            <div
              aria-hidden
              className="pointer-events-none absolute font-mono text-[10px] text-accent"
              style={{ left: pct(cursor.x, VB_W), top: pct(cursor.y, VB_H), transform: "translate(12px, 12px)" }}
            >
              x:{String(cursor.x).padStart(3, "0")} y:{String(cursor.y).padStart(3, "0")}
            </div>
          )}
        </div>

        {/* mobile: vertical trace */}
        <ol className="relative px-4 py-5 md:hidden">
          <span aria-hidden className="absolute bottom-8 left-[27px] top-8 w-px bg-line" />
          {!reduce && (
            <motion.span
              aria-hidden
              className="absolute left-[25px] h-1.5 w-1.5 rounded-full bg-accent"
              animate={{ top: ["8%", "90%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
            />
          )}
          {NODES.map((n) => {
            const on = n.id === active;
            return (
              <li key={n.id} className="relative py-1.5 pl-9">
                <span
                  aria-hidden
                  className={`absolute left-[9px] top-1/2 h-px w-4 ${on ? "bg-accent" : "bg-line"}`}
                />
                <button
                  type="button"
                  onClick={() => {
                    setActive(n.id);
                    setPaused(true);
                  }}
                  aria-pressed={on}
                  className={`flex w-full items-center justify-between border px-3 py-2.5 text-left transition-colors ${on ? "border-accent bg-bg" : "border-line bg-bg/70"}`}
                >
                  <span>
                    <span className="block text-sm font-medium">{n.name}</span>
                    <span className="block font-mono text-[10px] text-subtle">{n.sub}</span>
                  </span>
                  <span className={`font-mono text-[10px] ${on ? "text-accent" : "text-subtle"}`}>{n.code}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ---------- inspector ---------- */}
      <div className="min-h-[300px] border-t border-line p-5 sm:p-6 xl:border-t-0">
        <Inspector node={activeNode} />
      </div>
    </div>
  );
}
