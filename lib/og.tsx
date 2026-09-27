import type { ReactNode } from "react";

/** Shared frame for Open Graph images in the "Living System" style. */
export function OgFrame({ code, children, footer }: { code: string; children: ReactNode; footer: string }) {
  const lines = [
    ...Array.from({ length: 19 }, (_, i) => ({ left: (i + 1) * 60, top: 0, width: 1, height: 630 })),
    ...Array.from({ length: 10 }, (_, i) => ({ left: 0, top: (i + 1) * 60, width: 1200, height: 1 })),
  ];
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "#090a0c",
        color: "#ece9e2",
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      {lines.map((l, i) => (
        <div
          key={i}
          style={{ position: "absolute", display: "flex", background: "rgba(236,233,226,0.05)", ...l }}
        />
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          letterSpacing: "0.14em",
          color: "#6a6965",
          borderBottom: "1px solid #25262a",
          paddingBottom: 18,
        }}
      >
        <span style={{ display: "flex" }}>
          <span style={{ color: "#ff6a1a" }}>{code}</span>
          <span style={{ marginLeft: 14 }}>REZA PEYMAN AMIRI</span>
        </span>
        <span style={{ display: "flex", alignItems: "center" }}>
          <span style={{ width: 10, height: 10, borderRadius: 10, background: "#4ade80", marginRight: 12 }} />
          ONLINE
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          letterSpacing: "0.14em",
          color: "#6a6965",
          borderTop: "1px solid #25262a",
          paddingTop: 18,
        }}
      >
        <span>{footer}</span>
        <span>PEYMANAMIRI.COM</span>
      </div>
    </div>
  );
}
