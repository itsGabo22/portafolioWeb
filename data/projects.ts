export interface BilingualText {
  es: string;
  en: string;
}

/**
 * UI groups:
 * - "multiplatform": the four apps shown in the Device Lab (featured)
 * - "academic": other academic projects
 * - "commercial": client / VICARDEV production work
 */
export type ProjectCategory = "multiplatform" | "academic" | "commercial";
/** Decides the demo button label: live site, recorded video, downloadable build, or README. */
export type DemoType = "live" | "video" | "release" | "readme";
export type ProjectStatus = "completed" | "in-progress";
export type ProjectPlatform = "web" | "mobile" | "desktop" | "smartwatch" | "game";
export type ProjectKind = "commercial" | "academic";

/** Placeholder prefix for facts only the owner can provide (URLs, media). */
export const TODO_PREFIX = "TODO_GABO";
export const isTodo = (value: string): boolean => value.startsWith(TODO_PREFIX);

export interface Project {
  id: string;
  title: BilingualText;
  description: BilingualText;
  /** Short context line shown under the title (e.g. "UCC Academic Project · Wearable"). */
  tagline: BilingualText;
  tags: string[];
  /** Empty string = no screenshot yet (card renders a title placeholder). */
  image: string;
  /** Empty string only when `nda` or `privateRepo` is true. */
  github: string;
  /** Live demo URL, or a `TODO_GABO...` placeholder. */
  demo: string;
  category: ProjectCategory;
  demoType: DemoType;
  /** Only set where the owner confirmed it; renders "Terminado" / "En desarrollo". */
  status?: ProjectStatus;
  platform?: ProjectPlatform;
  /** Client code under NDA (implies a private repo). */
  nda?: boolean;
  /** Private repository without a client NDA. */
  privateRepo?: boolean;
  featured?: boolean;
  /** Pill shown on the card: real client work vs university work. */
  projectType: ProjectKind;
}

export const projects: Project[] = [
  {
    id: "gamerbox-ai",
    title: {
      es: "GamerBox — Letterboxd de Videojuegos con Steam API & IA",
      en: "GamerBox — Video Game Letterboxd with Steam API & AI",
    },
    tagline: {
      es: "Proyecto Académico UCC · App Móvil & IA",
      en: "UCC Academic Project · Mobile App & AI",
    },
    category: "multiplatform",
    demoType: "readme",
    status: "completed",
    platform: "mobile",
    featured: true,
    projectType: "academic",
    image: "/images/projects/gamerbox.png",
    description: {
      es: "Rastreador social de videojuegos para Android: guarda tu backlog en La Bóveda, descubre juegos con búsqueda global, ofertas de Steam y el Oráculo (Gemini, con respaldo local), publica reseñas, arma tu escuadrón y sube de nivel con XP. Incluye intro 3D, tutorial guiado, temas claro/oscuro y español/inglés.",
      en: "Social game tracker for Android: keep your backlog in La Bóveda, discover games through global search, Steam deals and the Oracle (Gemini, with a local fallback), post reviews, build a squad and level up with XP. Includes a 3D intro, a guided tutorial, light/dark themes and Spanish/English.",
    },
    tags: ["Next.js", "Capacitor Mobile", "Steam API", "Gemini AI", "TypeScript"],
    github: "https://github.com/itsGabo22/GamerBox",
    demo: "https://github.com/itsGabo22/GamerBox#readme",
  },
  {
    id: "ocioflex-desktop",
    title: {
      es: "OcioFlex — App de Escritorio de Gestión de Tiempo & IA",
      en: "OcioFlex — Desktop App for App-Time Management & AI",
    },
    tagline: {
      es: "Proyecto Académico UCC · App Desktop & IA",
      en: "UCC Academic Project · Desktop App & AI",
    },
    category: "multiplatform",
    demoType: "readme",
    status: "completed",
    platform: "desktop",
    featured: true,
    projectType: "academic",
    image: "/images/projects/ocioflex.png",
    description: {
      es: "Aplicación de escritorio para Windows (Tauri 2 + Next 16) que cronometra bloques de trabajo profundo, mantiene honesto el descanso y te resume tu semana. Incluye el asistente Flex (divisor de tareas, sugeridor de descansos y análisis semanal), cuentas locales con Argon2id y diseño bilingüe con ambientes Foco y Ocio.",
      en: "Windows desktop app (Tauri 2 + Next 16) that times deep-work blocks, keeps rest honest and reads your week back to you. Includes the Flex assistant (Task Splitter, Break Suggester and weekly analysis), local accounts hashed with Argon2id, and a bilingual design with Foco and Ocio moods.",
    },
    tags: ["Tauri v2 / Rust", "Next.js 16", "AI Analytics", "Tailwind CSS v4", "TypeScript"],
    github: "https://github.com/itsGabo22/OcioFlex",
    demo: "https://github.com/itsGabo22/OcioFlex#readme",
  },
  {
    id: "wgo-smartwatch",
    title: {
      es: "WGO (Where We Go?) — Navegador por Voz para Wear OS",
      en: "WGO (Where We Go?) — Voice Navigator for Wear OS",
    },
    tagline: {
      es: "Proyecto Académico UCC · Smartwatch",
      en: "UCC Academic Project · Smartwatch",
    },
    category: "multiplatform",
    demoType: "video",
    status: "completed",
    platform: "smartwatch",
    featured: true,
    projectType: "academic",
    image: "/images/projects/wgo.png",
    description: {
      es: "Navegador controlado por voz para Wear OS en Pasto, Colombia: dices un destino y recibes la ruta paso a paso en la muñeca.",
      en: "Voice-driven navigator for Wear OS in Pasto, Colombia: speak a destination and get turn-by-turn directions on your wrist.",
    },
    tags: ["Kotlin", "Jetpack Compose for Wear OS", "osmdroid", "Groq Whisper", "OSRM"],
    github: "https://github.com/itsGabo22/WGO",
    // TODO_GABO: add the demo video URL (or drop public/media/wgo-smartwatch/demo.mp4).
    demo: "TODO_GABO: demo video URL",
  },
  {
    id: "nexo-protocolo-sombra",
    title: {
      es: "Nexo: Protocolo Sombra — Videojuego 3D",
      en: "Nexo: Protocolo Sombra — 3D Video Game",
    },
    tagline: {
      es: "Proyecto Académico UCC · Videojuego en equipo",
      en: "UCC Academic Project · Team Video Game",
    },
    category: "multiplatform",
    demoType: "readme",
    status: "completed",
    platform: "game",
    featured: true,
    projectType: "academic",
    image: "/images/projects/nexo.png",
    description: {
      es: "Videojuego 3D en primera persona desarrollado en equipo con Unity 6 (6000.6.7f1), C# y UI Toolkit, con una interfaz de HUD propia y un personaje con IA (Gemini).",
      en: "Team-built first-person 3D video game made with Unity 6 (6000.6.7f1), C# and UI Toolkit, featuring a custom HUD interface and an AI-driven character (Gemini).",
    },
    tags: ["Unity 6", "C#", "UI Toolkit", "Gemini AI"],
    github: "https://github.com/itsGabo22/NexoProtocoloSombra",
    demo: "https://github.com/itsGabo22/NexoProtocoloSombra#readme",
  },
  {
    id: "vicardev-agency",
    title: {
      es: "VICARDEV — Agencia de Desarrollo Web & E-Commerce",
      en: "VICARDEV — Web Development & E-Commerce Agency",
    },
    tagline: {
      es: "Comercial · Agencia & Cloud",
      en: "Commercial · Agency & Cloud",
    },
    category: "commercial",
    demoType: "live",
    platform: "web",
    projectType: "commercial",
    image: "/images/projects/vicardev.png",
    description: {
      es: "Plataforma oficial de mi marca comercial de desarrollo de tiendas online (e-commerce) y landing pages de alta gama en Pasto, Nariño, enfocada en velocidad extrema, SEO técnico y conversión.",
      en: "Official platform for my commercial web development brand building high-end online stores (e-commerce) and landing pages in Pasto, Nariño, engineered for speed, technical SEO, and conversion.",
    },
    tags: ["Astro", "Next.js", "TypeScript", "Supabase", "Vercel"],
    github: "https://github.com/itsGabo22/VicarWeb",
    demo: "https://vicardev.digital/",
  },
  {
    id: "electrotech-pasto",
    title: {
      es: "ElectroTech Pasto — Ingeniería & Automatización",
      en: "ElectroTech Pasto — Engineering & Automation",
    },
    tagline: {
      es: "Cliente Comercial · Automatización Industrial",
      en: "Commercial Client · Industrial Automation",
    },
    category: "commercial",
    demoType: "live",
    platform: "web",
    projectType: "commercial",
    image: "/images/projects/electrotech.png",
    description: {
      es: "Plataforma corporativa en producción desarrollada para ElectroTech Pasto, especializada en soluciones de electromecánica, tableros eléctricos, transferencia automática (ATS) y automatización industrial.",
      en: "Live corporate platform developed for ElectroTech Pasto, specializing in electromechanical solutions, electrical control panels, automatic transfer switches (ATS), and industrial automation.",
    },
    tags: ["Next.js", "TypeScript", "Resend API", "Tailwind CSS"],
    github: "https://github.com/itsGabo22/ElectroTechCol",
    demo: "https://electrotechpasto.com/",
  },
  {
    id: "brisal-ecommerce",
    title: {
      es: "Brisal by Salvador — E-Commerce de Accesorios",
      en: "Brisal by Salvador — Accessories E-Commerce",
    },
    tagline: {
      es: "Cliente Comercial · E-Commerce en Producción",
      en: "Commercial Client · Live E-Commerce",
    },
    category: "commercial",
    demoType: "live",
    platform: "web",
    projectType: "commercial",
    nda: true,
    image: "/images/projects/brisal.png",
    description: {
      es: "Tienda online comercial de joyería y accesorios premium en acero, oro laminado y rodio entregada a cliente real, con catálogo minorista/mayorista, gestión de inventario y compras en toda Colombia.",
      en: "Commercial online store for premium steel, gold-filled, and rhodium jewelry and accessories delivered to a private client, featuring retail/wholesale catalogs and nationwide checkout.",
    },
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    github: "",
    demo: "https://brisal.com.co/",
  },
  {
    id: "bluevelvet-ecommerce",
    title: {
      es: "Blue Velvet — E-Commerce de Calzado & Moda",
      en: "Blue Velvet — Footwear & Fashion E-Commerce",
    },
    tagline: {
      es: "Cliente Comercial · E-Commerce en Producción",
      en: "Commercial Client · Live E-Commerce",
    },
    category: "commercial",
    demoType: "live",
    platform: "web",
    projectType: "commercial",
    nda: true,
    image: "/images/projects/bluevelvet.png",
    description: {
      es: "Plataforma e-commerce exclusiva de venta de zapatos, tenis y moda en Colombia desarrollada y entregada a cliente comercial, con diseño editorial de lujo moderno y flujo de conversión rápida.",
      en: "Exclusive footwear, sneakers, and fashion e-commerce platform in Colombia developed for a commercial client, featuring a modern luxury editorial aesthetic and fast conversion checkout.",
    },
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    github: "",
    demo: "https://bluevelvet0.com/",
  },
  {
    id: "carlin-cosmeticos",
    title: {
      es: "Carlin Cosméticos — E-Commerce & Mayoristas",
      en: "Carlin Cosmetics — E-Commerce & Wholesale",
    },
    tagline: {
      es: "Cliente Comercial · E-Commerce en Producción",
      en: "Commercial Client · Live E-Commerce",
    },
    category: "commercial",
    demoType: "live",
    platform: "web",
    projectType: "commercial",
    nda: true,
    image: "/images/projects/carlin.png",
    description: {
      es: "E-commerce de accesorios, maquillaje y cuidado facial en producción con buscador multicategoría, catálogo interactivo y módulo especializado para red de mayoristas.",
      en: "Live cosmetics, skincare, and accessories e-commerce platform featuring multi-category search, interactive catalog management, and a dedicated wholesale partner portal.",
    },
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    github: "",
    demo: "https://carlincosmeticos.com/",
  },
  {
    id: "viberoute-colombia",
    title: {
      es: "VibeRoute Colombia — Logística Geoespacial & Backend IA",
      en: "VibeRoute Colombia — Geospatial Logistics & AI Backend",
    },
    tagline: {
      es: "Proyecto Académico UCC · Backend Pesado & IA",
      en: "UCC Academic Project · Heavy Backend & AI",
    },
    category: "academic",
    demoType: "live",
    platform: "web",
    projectType: "academic",
    image: "/images/projects/viberoute.png",
    description: {
      es: "Sistema académico de inteligencia logística nacional con arquitectura backend robusta en Java 17 y Spring Boot, persistencia espacial en PostgreSQL/PostGIS, seguridad JWT e integración con Google Gemini AI.",
      en: "Academic national logistics intelligence system built on a heavy Java 17 & Spring Boot backend architecture, PostgreSQL/PostGIS spatial persistence, JWT security, and Google Gemini AI.",
    },
    tags: ["Java 17", "Spring Boot", "PostgreSQL / PostGIS", "Gemini AI", "TypeScript"],
    github: "https://github.com/itsGabo22/VibeRouteColombia-Backend",
    demo: "https://vibe-route-colombia-frontend.vercel.app/",
  },
  {
    id: "musicscript-ai",
    title: {
      es: "MusicScript — Reproductor WebAPK & Chat Musical con IA",
      en: "MusicScript — WebAPK Music Player & AI Artist Chat",
    },
    tagline: {
      es: "Proyecto Académico UCC · WebAPK & IA",
      en: "UCC Academic Project · WebAPK & AI",
    },
    category: "academic",
    demoType: "live",
    platform: "mobile",
    projectType: "academic",
    privateRepo: true,
    image: "/images/projects/musicscript.png",
    description: {
      es: "Estación de audio y reproductor musical web instalable como WebAPK en móvil con Inteligencia Artificial integrada: incluye un chat musical inteligente que recomienda canciones y adopta la personalidad de tu artista o cantante favorito.",
      en: "Pro web audio station and mobile-installable WebAPK music player with integrated Artificial Intelligence: features an AI music chat that recommends tracks and roleplays the persona of your favorite singer.",
    },
    tags: ["Next.js", "WebAPK / PWA", "Conversational AI", "Web Audio API", "TypeScript"],
    github: "",
    demo: "https://musicscript.vercel.app/",
  },
];

/** Projects shown as 3D devices in the Device Lab, in stage order. */
export const DEVICE_LAB_IDS = [
  "wgo-smartwatch",
  "gamerbox-ai",
  "ocioflex-desktop",
  "nexo-protocolo-sombra",
] as const;
export type DeviceLabId = (typeof DEVICE_LAB_IDS)[number];

/** Demo media found at build time in public/media/<id>/ (see lib/media.ts). */
export interface ProjectMedia {
  video?: string;
  poster?: string;
}
export type MediaManifest = Partial<Record<string, ProjectMedia>>;
