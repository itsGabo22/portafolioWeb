import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import InteractiveStage from "@/components/InteractiveStage";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Gabriel Esteban Paz Guerrero | Full-Stack Software Developer & Founder of VICARDEV",
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
      "Gabriel Esteban Paz Guerrero | Full-Stack Developer & Fundador de VICARDEV",
    description:
      "Arquitectando plataformas web escalables, comercio electrónico en producción e integraciones de inteligencia artificial desde Pasto, Colombia.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 antialiased selection:bg-emerald-500/25 selection:text-emerald-900 dark:selection:text-emerald-200 flex flex-col transition-colors duration-200`}
      >
        <AppProvider>
          <InteractiveStage />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
