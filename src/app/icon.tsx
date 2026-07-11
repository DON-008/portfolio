import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Simple on-brand monogram favicon (void background, indigo accent) since
// no logo asset has been supplied. Replace with a real mark if Don has one.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050914",
          color: "#7c8cff",
          fontSize: 18,
          fontWeight: 700,
        }}
      >
        DD
      </div>
    ),
    { ...size }
  );
}
