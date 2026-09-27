import { ImageResponse } from "next/og";
import { OgFrame } from "@/lib/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Reza Peyman Amiri — Full-Stack Software Developer";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <OgFrame code="SYS/00" footer="FULL-STACK SOFTWARE DEVELOPER">
        <div style={{ display: "flex", fontSize: 128, fontWeight: 600, letterSpacing: "-0.06em", lineHeight: 0.9 }}>
          Reza Peyman
        </div>
        <div style={{ display: "flex", fontSize: 128, fontWeight: 600, letterSpacing: "-0.06em", lineHeight: 0.95 }}>
          Amiri<span style={{ color: "#ff6a1a" }}>.</span>
        </div>
        <div style={{ display: "flex", marginTop: 30, fontSize: 32, color: "#a29f97" }}>
          Building software from interface to infrastructure.
        </div>
      </OgFrame>
    ),
    { ...size }
  );
}
