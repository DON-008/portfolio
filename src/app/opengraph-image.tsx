import { ImageResponse } from "next/og";
import { profile } from "@/content/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated once as a static asset per tech doc §7 — real profile copy,
// on-brand Zero Gravity tokens. next/og's Satori renderer can't load our
// Google fonts without fetching font buffers, so this uses system
// sans-serif rather than Space Grotesk/Inter; acceptable for a v1 OG image.
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
          alignItems: "center",
          background: "#050914",
          color: "#e8edf7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 6,
            color: "#2fd4a7",
            textTransform: "uppercase",
          }}
        >
          {profile.eyebrow}
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 28 }}>{profile.name}</div>
        <div style={{ fontSize: 34, color: "#93a0b8", marginTop: 14 }}>{profile.role}</div>
      </div>
    ),
    { ...size }
  );
}
