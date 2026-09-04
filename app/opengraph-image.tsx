import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Reza Peyman Amiri — Full-Stack Software Developer";

export default function OpengraphImage() {
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
            color: "#7c9dff",
            letterSpacing: "-0.02em",
          }}
        >
          <span>{"<"}</span>
          <span style={{ color: "#f4f5f8" }}>Reza.dev</span>
          <span>{" />"}</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 72,
            fontWeight: 700,
            color: "#f4f5f8",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Reza Peyman Amiri
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 34,
            fontWeight: 500,
            color: "#7c9dff",
          }}
        >
          Full-Stack Software Developer
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 26,
            color: "#9aa3b8",
            maxWidth: 820,
          }}
        >
          Building modern, scalable, and user-focused software — from
          interface to infrastructure.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 22,
            color: "#4b5468",
          }}
        >
          peymanamiri.com
        </div>
      </div>
    ),
    { ...size }
  );
}
