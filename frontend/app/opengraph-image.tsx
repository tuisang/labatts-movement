import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f9fb",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 180,
            height: 180,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#a83300",
            borderRadius: "36px",
            marginBottom: 40,
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
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#191c1e",
            fontFamily: "sans-serif",
            marginBottom: 12,
          }}
        >
          Labatts Movement
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#5c4037",
            fontFamily: "sans-serif",
          }}
        >
          Elite Athletic Training &middot; Nairobi, Kenya
        </div>
      </div>
    ),
    { ...size }
  );
}
