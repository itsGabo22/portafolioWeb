import { ImageResponse } from "next/og";

export const alt = "Gabriel Esteban Paz Guerrero — Desarrollador Full-Stack y fundador de VICARDEV";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Open Graph / social preview, generated at build time in the site's tokens. */
export default function OpengraphImage() {
  const keys = ["N", "T", "R", "P", "S", "A", "K", "G"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(16,185,129,0.28), transparent 45%), radial-gradient(circle at 10% 90%, rgba(99,102,241,0.2), transparent 45%)",
          color: "#fafafa",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#a1a1aa" }}>
            <div style={{ width: 14, height: 14, borderRadius: 999, background: "#10b981" }} />
            <span>gabodevportafolio.netlify.app</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>Gabriel Esteban</div>
            <div style={{ fontSize: 84, fontWeight: 800, letterSpacing: -3, lineHeight: 1.05 }}>Paz Guerrero</div>
            <div style={{ marginTop: 28, fontSize: 34, color: "#d4d4d8" }}>
              Desarrollador Full-Stack · Fundador de VICARDEV
            </div>
            <div style={{ marginTop: 10, fontSize: 26, color: "#34d399" }}>
              Ingeniería de Software · UCC Pasto, Colombia
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: 300,
            gap: 14,
            alignContent: "center",
            transform: "rotate(-8deg)",
          }}
        >
          {keys.map((key, index) => (
            <div
              key={key}
              style={{
                width: 128,
                height: 96,
                borderRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 40,
                fontWeight: 700,
                background: index % 3 === 0 ? "#10b981" : "#27272a",
                color: index % 3 === 0 ? "#04130d" : "#e4e4e7",
                boxShadow: "0 10px 0 #000000",
              }}
            >
              {key}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
