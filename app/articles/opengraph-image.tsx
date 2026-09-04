import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Articles — Reza Peyman Amiri";

export default function ArticlesOpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #05070d 0%, #0a0e17 55%, #0d1220 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: 28,
            fontWeight: 700,
            color: "#22d3c9",
            letterSpacing: "-0.02em",
          }}
        >
          WRITING
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 72,
            fontWeight: 700,
            color: "#f4f5f8",
            letterSpacing: "-0.03em",
          }}
        >
          Articles & Thoughts
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 28,
            color: "#9aa3b8",
            maxWidth: 820,
          }}
        >
          Notes on full-stack development, backend engineering, and building
          real things with AI.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 22,
            color: "#4b5468",
          }}
        >
          Reza Peyman Amiri · peymanamiri.com
        </div>
      </div>
    ),
    { ...size }
  );
}
