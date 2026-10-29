export interface BilingualText {
  es: string;
  en: string;
}

export type ProjectKind = "commercial" | "academic";

export interface Project {
  id: string;
  title: BilingualText;
  description: BilingualText;
  category: BilingualText;
  projectType: ProjectKind;
  isPrivateRepo?: boolean;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

export const projects: Project[] = [
  {
    id: "vicardev-agency",
    title: {
      es: "VICARDEV — Agencia de Desarrollo Web & E-Commerce",
      en: "VICARDEV — Web Development & E-Commerce Agency",
    },
    category: {
      es: "Comercial // Agencia & Cloud",
      en: "Commercial // Agency & Cloud",
    },
    projectType: "commercial",
    image: "/images/projects/vicardev.png",
    description: {
      es: "Plataforma oficial de mi marca comercial de desarrollo de tiendas online (e-commerce) y landing pages de alta gama en Pasto, Nariño, enfocada en velocidad extrema, SEO técnico y conversión.",
      en: "Official platform for my commercial web development brand building high-end online stores (e-commerce) and landing pages in Pasto, Nariño, engineered for speed, technical SEO, and conversion.",
    },
    technologies: ["Astro", "Next.js", "TypeScript", "Supabase", "Vercel"],
    githubUrl: "https://github.com/itsGabo22/VicarWeb",
    liveUrl: "https://vicardev.digital/",
  },
  {
    id: "electrotech-pasto",
    title: {
      es: "ElectroTech Pasto — Ingeniería & Automatización",
      en: "ElectroTech Pasto — Engineering & Automation",
    },
    category: {
      es: "Comercial // Automatización Industrial",
      en: "Commercial // Industrial Automation",
    },
    projectType: "commercial",
    image: "/images/projects/electrotech.png",
    description: {
      es: "Plataforma corporativa en producción para soluciones de electromecánica, tableros eléctricos, transferencia automática (ATS) y automatización industrial en Nariño y Colombia.",
      en: "Live corporate platform for electromechanical solutions, electrical control panels, automatic transfer switches (ATS), and industrial automation across Nariño and Colombia.",
    },
    technologies: ["Next.js", "TypeScript", "Resend API", "Tailwind CSS"],
    githubUrl: "https://github.com/itsGabo22/ElectroTechCol",
    liveUrl: "https://electrotechpasto.com/",
  },
  {
    id: "brisal-ecommerce",
    title: {
      es: "Brisal by Salvador — E-Commerce de Accesorios",
      en: "Brisal by Salvador — Accessories E-Commerce",
    },
    category: {
      es: "Comercial // E-Commerce en Producción",
      en: "Commercial // Live E-Commerce",
    },
    projectType: "commercial",
    isPrivateRepo: true,
    image: "/images/projects/brisal.png",
    description: {
      es: "Tienda online comercial de joyería y accesorios premium en acero, oro laminado y rodio vendida a cliente real, con catálogo minorista/mayorista, gestión de inventario y compras en toda Colombia.",
      en: "Commercial online store for premium steel, gold-filled, and rhodium jewelry and accessories delivered to a private client, featuring retail/wholesale catalogs and nationwide checkout.",
    },
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com/itsGabo22/BrisalWeb",
    liveUrl: "https://brisal.com.co/",
  },
  {
    id: "bluevelvet-ecommerce",
    title: {
      es: "Blue Velvet — E-Commerce de Calzado & Moda",
      en: "Blue Velvet — Footwear & Fashion E-Commerce",
    },
    category: {
      es: "Comercial // E-Commerce en Producción",
      en: "Commercial // Live E-Commerce",
    },
    projectType: "commercial",
    isPrivateRepo: true,
    image: "/images/projects/bluevelvet.png",
    description: {
      es: "Plataforma e-commerce exclusiva de venta de zapatos, tenis y moda en Colombia desarrollada y entregada a cliente comercial, con diseño editorial de lujo moderno y flujo de conversión rápida.",
      en: "Exclusive footwear, sneakers, and fashion e-commerce platform in Colombia developed for a commercial client, featuring a modern luxury editorial aesthetic and fast conversion checkout.",
    },
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/itsGabo22/BlueVelvet0",
    liveUrl: "https://bluevelvet0.com/",
  },
  {
    id: "carlin-cosmeticos",
    title: {
      es: "Carlin Cosméticos — E-Commerce & Mayoristas",
      en: "Carlin Cosmetics — E-Commerce & Wholesale",
    },
    category: {
      es: "Comercial // E-Commerce en Producción",
      en: "Commercial // Live E-Commerce",
    },
    projectType: "commercial",
    isPrivateRepo: true,
    image: "/images/projects/carlin.png",
    description: {
      es: "E-commerce de accesorios, maquillaje y cuidado facial en producción con buscador multicategoría, catálogo interactivo y módulo especializado para red de mayoristas.",
      en: "Live cosmetics, skincare, and accessories e-commerce platform featuring multi-category search, interactive catalog management, and a dedicated wholesale partner portal.",
    },
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/itsGabo22/Carlin",
    liveUrl: "https://carlincosmeticos.com/",
  },
  {
    id: "gamerbox-ai",
    title: {
      es: "GamerBox — Letterboxd de Videojuegos con Steam API & IA",
      en: "GamerBox — Video Game Letterboxd with Steam API & AI",
    },
    category: {
      es: "Proyecto Académico UCC // App Móvil & IA",
      en: "UCC Academic Project // Mobile App & AI",
    },
    projectType: "academic",
    image: "/images/projects/gamerbox.png",
    description: {
      es: "Aplicación móvil y PWA universitaria que funciona como un Letterboxd de videojuegos: permite calificar tu biblioteca, consultar descuentos en tiempo real con la API de Steam y recibir recomendaciones con IA.",
      en: "University mobile & PWA application acting as a Letterboxd for video games: rate your collection, track real-time discounts via the Steam API, and get AI-powered recommendations.",
    },
    technologies: ["Next.js", "Capacitor Mobile", "Steam API", "Gemini AI", "TypeScript"],
    githubUrl: "https://github.com/itsGabo22/GamerBox",
    liveUrl: "https://github.com/itsGabo22/GamerBox",
  },
  {
    id: "viberoute-colombia",
    title: {
      es: "VibeRoute Colombia — Logística Geoespacial & Backend IA",
      en: "VibeRoute Colombia — Geospatial Logistics & AI Backend",
    },
    category: {
      es: "Proyecto Académico UCC // Backend Pesado & IA",
      en: "UCC Academic Project // Heavy Backend & AI",
    },
    projectType: "academic",
    image: "/images/projects/viberoute.png",
    description: {
      es: "Sistema académico de inteligencia logística nacional con arquitectura backend robusta en Java 17 y Spring Boot, persistencia espacial en PostgreSQL/PostGIS, seguridad JWT e integración con Google Gemini AI.",
      en: "Academic national logistics intelligence system built on a heavy Java 17 & Spring Boot backend architecture, PostgreSQL/PostGIS spatial persistence, JWT security, and Google Gemini AI.",
    },
    technologies: ["Java 17", "Spring Boot", "PostgreSQL / PostGIS", "Gemini AI", "TypeScript"],
    githubUrl: "https://github.com/itsGabo22/VibeRouteColombia-Backend",
    liveUrl: "https://vibe-route-colombia-frontend.vercel.app/",
  },
  {
    id: "wgo-smartwatch",
    title: {
      es: "WGO (Where We Go?) — Navegador IA para Smartwatch",
      en: "WGO (Where We Go?) — Smartwatch AI Navigator",
    },
    category: {
      es: "Proyecto Académico UCC // Wearable & IA",
      en: "UCC Academic Project // Wearable & AI",
    },
    projectType: "academic",
    image: "/images/projects/wgo.png",
    description: {
      es: "Aplicación académica para smartwatch diseñada para llevar al usuario a donde desee mediante navegación conversacional con Inteligencia Artificial, objetivos táctiles >48dp y alto contraste para Wear OS.",
      en: "Academic smartwatch application designed to guide users anywhere they want to go using conversational Artificial Intelligence, >48dp touch targets, and high-contrast Wear OS ergonomics.",
    },
    technologies: ["Kotlin / Wear OS", "Next.js", "Conversational AI", "Tailwind CSS"],
    githubUrl: "https://github.com/itsGabo22/WGO",
    liveUrl: "https://github.com/itsGabo22/WGO",
  },
  {
    id: "ocioflex-desktop",
    title: {
      es: "OcioFlex — App de Escritorio de Gestión de Tiempo & IA",
      en: "OcioFlex — Desktop App for App-Time Management & AI",
    },
    category: {
      es: "Proyecto Académico UCC // App Desktop & IA",
      en: "UCC Academic Project // Desktop App & AI",
    },
    projectType: "academic",
    image: "/images/projects/ocioflex.png",
    description: {
      es: "Aplicación nativa de escritorio universitaria para gestionar tiempos de uso de aplicaciones, alternando entre contextos de concentración profunda (Foco) y descanso consciente (Ocio) con analítica asistida por IA.",
      en: "University native desktop application for managing application usage time, switching between deep concentration (Foco) and mindful leisure (Ocio) contexts with AI-assisted analytics.",
    },
    technologies: ["Tauri v2 / Rust", "Next.js 16", "AI Analytics", "Tailwind CSS v4", "TypeScript"],
    githubUrl: "https://github.com/itsGabo22/OcioFlex",
    liveUrl: "https://github.com/itsGabo22/OcioFlex",
  },
  {
    id: "musicscript-ai",
    title: {
      es: "MusicScript — Reproductor WebAPK & Chat Musical con IA",
      en: "MusicScript — WebAPK Music Player & AI Artist Chat",
    },
    category: {
      es: "Proyecto Académico UCC // WebAPK & IA",
      en: "UCC Academic Project // WebAPK & AI",
    },
    projectType: "academic",
    image: "/images/projects/musicscript.png",
    description: {
      es: "Estación de audio y reproductor musical web instalable como WebAPK en móvil con Inteligencia Artificial integrada: incluye un chat musical inteligente que recomienda canciones y adopta la personalidad de tu artista o cantante favorito.",
      en: "Pro web audio station and mobile-installable WebAPK music player with integrated Artificial Intelligence: features an AI music chat that recommends tracks and roleplays the persona of your favorite singer.",
    },
    technologies: ["Next.js", "WebAPK / PWA", "Conversational AI", "Web Audio API", "TypeScript"],
    githubUrl: "https://github.com/itsGabo22/MusicScript",
    liveUrl: "https://musicscript.vercel.app/",
  },
];

export const projectsData = projects;
