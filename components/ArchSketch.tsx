"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Draws a small architecture sketch from a project's stack tags:
 * each tag becomes a node, packets travel through the chain.
 */
export function ArchSketch({ nodes, id }: { nodes: string[]; id: string }) {
  const reduce = useReducedMotion();
  const list = nodes.slice(0, 6);
  const n = list.length;
  const W = 600;
  const H = 230;
  const bw = 112;
  const bh = 34;
  const pad = 70;
  const pts = list.map((label, i) => ({
    label,
    x: n === 1 ? W / 2 : pad + (i * (W - pad * 2)) / (n - 1),
    y: i % 2 === 0 ? 78 : 158,
  }));
  const d = pts
    .map((p, i) => {
      if (i === 0) return `M${p.x},${p.y}`;
      const prev = pts[i - 1];
      const mx = (prev.x + p.x) / 2;
      return `C${mx},${prev.y} ${mx},${p.y} ${p.x},${p.y}`;
    })
    .join(" ");
  const pathId = `arch-${id}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label={`Stack: ${list.join(", ")}`}>
      <defs>
        <pattern id={`${pathId}-dots`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="rgb(var(--fg))" fillOpacity="0.12" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={`url(#${pathId}-dots)`} />
      <path id={pathId} d={d} fill="none" stroke="rgb(var(--fg))" strokeOpacity="0.28" strokeWidth="1" />
      <path
        d={d}
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth="1.4"
        strokeDasharray="5 9"
        className="opacity-0 transition-opacity duration-500 group-hover:animate-dash group-hover:opacity-100"
      />
      {!reduce &&
        [0, 1, 2].map((k) => (
          <circle key={k} r="3.2" fill="rgb(var(--accent))">
            <animateMotion dur="4.2s" begin={`${k * 1.4}s`} repeatCount="indefinite">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
        ))}
      {pts.map((p, i) => (
        <g key={p.label} transform={`translate(${p.x - bw / 2}, ${p.y - bh / 2})`}>
          <rect width={bw} height={bh} fill="rgb(var(--bg))" stroke="rgb(var(--fg))" strokeOpacity="0.35" />
          <text x="8" y="12" fontSize="8" fontFamily="var(--font-geist-mono)" fill="rgb(var(--accent))">
            {String(i + 1).padStart(2, "0")}
          </text>
          <text
            x={bw / 2}
            y={bh / 2 + 7}
            textAnchor="middle"
            fontSize="11.5"
            fontFamily="var(--font-geist-mono)"
            fill="rgb(var(--fg))"
          >
            {p.label.length > 14 ? `${p.label.slice(0, 13)}…` : p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
