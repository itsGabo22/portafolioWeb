import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import InteractiveStage from "@/components/InteractiveStage";
import "./globals.css";

// Two families only (see DESIGN.md): a characterful display grotesque + a precise text face.
const display = Bricolage_Grotesque({
  variable: "--font-display-face",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const text = IBM_Plex_Sans({
  variable: "--font-text",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title:
    "Gabriel Esteban Paz Guerrero | Desarrollador Full-Stack y fundador de VICARDEV",
  description:
    "Portafolio profesional de Gabriel Esteban Paz Guerrero (@itsGabo22). Desarrollador Full-Stack, estudiante de 5.º semestre de Ingeniería de Software en la UCC (Pasto, Colombia) y fundador de VICARDEV.",
  keywords: [
    "Gabriel Esteban Paz Guerrero",
    "itsGabo22",
    "VICARDEV",
    "Full-Stack Developer",
    "Ingeniería de Software",
    "Pasto Colombia",
    "Next.js",
    "TypeScript",
  ],
  authors: [
    { name: "Gabriel Esteban Paz Guerrero", url: "https://github.com/itsGabo22" },
  ],
  openGraph: {
    title:
      "Gabriel Esteban Paz Guerrero | Desarrollador Full-Stack y fundador de VICARDEV",
    description:
      "Arquitectando plataformas web escalables, comercio electrónico en producción e integraciones de inteligencia artificial desde Pasto, Colombia.",
    type: "website",
    locale: "es_CO",
    siteName: "Portafolio de Gabriel Esteban Paz Guerrero",
  },
  twitter: {
    card: "summary",
    title:
      "Gabriel Esteban Paz Guerrero | Desarrollador Full-Stack y fundador de VICARDEV",
    description:
      "Portafolio profesional: plataformas web, e-commerce y apps con IA desde Pasto, Colombia.",
  },
  // favicon: app/favicon.ico is picked up automatically by Next.js
  // TODO_GABO: set metadataBase + an Open Graph image once the Vercel production URL is known.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${display.variable} ${text.variable} min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 antialiased selection:bg-emerald-500/25 selection:text-emerald-900 dark:selection:text-emerald-200 flex flex-col transition-colors duration-200`}
      >
        <AppProvider>
          <InteractiveStage />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
