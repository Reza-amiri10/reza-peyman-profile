import { ImageResponse } from "next/og";
import { OgFrame } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Articles — Reza Peyman Amiri";

export default function ArticlesOpengraphImage() {
  return new ImageResponse(
    (
      <OgFrame code="SYS/06" footer="WRITING">
        <div style={{ display: "flex", fontSize: 140, fontWeight: 600, letterSpacing: "-0.06em", lineHeight: 0.9 }}>
          Build log<span style={{ color: "#ff6a1a" }}>.</span>
        </div>
        <div style={{ display: "flex", marginTop: 30, fontSize: 32, color: "#a29f97", maxWidth: 900 }}>
          Notes on full-stack development, backend engineering, and building real things with AI.
        </div>
      </OgFrame>
    ),
    { ...size }
  );
}
