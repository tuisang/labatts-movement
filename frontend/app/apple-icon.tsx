import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#a83300",
          borderRadius: "32px",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 88,
            fontWeight: 800,
            fontFamily: "sans-serif",
            letterSpacing: "-3px",
          }}
        >
          LM
        </div>
      </div>
    ),
    { ...size }
  );
}
