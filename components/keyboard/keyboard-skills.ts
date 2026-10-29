export interface KeyboardSkillData {
  id: number;
  name: string;
  label: string;
  category: {
    es: string;
    en: string;
  };
  shortDescription: {
    es: string;
    en: string;
  };
  color: string;
  keyboardColor: string;
  icon: string;
  shortcut?: string;
}

export const KEYBOARD_SKILLS: KeyboardSkillData[] = [
  {
    id: 1,
    name: "js",
    label: "JavaScript",
    category: { es: "Lenguaje Base", en: "Core Language" },
    shortDescription: {
      es: "Dominio de ES2024+, asincronía avanzada, manipulación del DOM y optimización de eventos en el navegador.",
      en: "Mastery of ES2024+, advanced async patterns, DOM manipulation, and browser event loop optimization.",
    },
    color: "#f0db4f",
    keyboardColor: "#ff9408",
    icon: "/assets/keyboard/logos/js.svg",
  },
  {
    id: 2,
    name: "ts",
    label: "TypeScript",
    category: { es: "Tipado Estricto", en: "Strict Typing" },
    shortDescription: {
      es: "Arquitectura con strict: true, genéricos avanzados y contratos de datos seguros en todo el ecosistema VICARDEV.",
      en: "Strict-mode architecture, advanced generics, and type-safe data contracts across the VICARDEV ecosystem.",
    },
    color: "#007acc",
    keyboardColor: "#008fd5",
    icon: "/assets/keyboard/logos/ts.svg",
  },
  {
    id: 3,
    name: "react",
    label: "React 19",
    category: { es: "UI & Estado", en: "UI & State" },
    shortDescription: {
      es: "Diseño de componentes modulares, hooks personalizados, sincronización de estado externo y renderizado concurrente.",
      en: "Modular component design, custom hooks, external store synchronization, and concurrent rendering.",
    },
    color: "#61dafb",
    keyboardColor: "#00cce8",
    icon: "/assets/keyboard/logos/react.svg",
  },
  {
    id: 4,
    name: "nextjs",
    label: "Next.js 16",
    category: { es: "Framework Full-Stack", en: "Full-Stack Framework" },
    shortDescription: {
      es: "App Router, Server Components, optimización de LCP/SEO y despliegues en producción para Brisal y ElectroTech Pasto.",
      en: "App Router, Server Components, LCP/SEO optimization, and production deployments for Brisal and ElectroTech Pasto.",
    },
    color: "#10b981",
    keyboardColor: "#27272a",
    icon: "/assets/keyboard/logos/nextjs.svg",
  },
  {
    id: 5,
    name: "vue",
    label: "Tauri & Híbridos",
    category: { es: "Desktop & Multiplataforma", en: "Desktop & Cross-Platform" },
    shortDescription: {
      es: "Construcción de suites de escritorio ligeras y reactivas como OcioFlex combinando tecnologías web modernas con Tauri v2.",
      en: "Building lightweight reactive desktop suites like OcioFlex combining modern web frontends with Tauri v2.",
    },
    color: "#41b883",
    keyboardColor: "#00b880",
    icon: "/assets/keyboard/logos/vue.svg",
  },
  {
    id: 6,
    name: "expo",
    label: "Capacitor & Mobile",
    category: { es: "Apps Móviles & Wear OS", en: "Mobile Apps & Wear OS" },
    shortDescription: {
      es: "Empaquetado nativo multiplataforma para Android y Wear OS, aplicado en asistentes tácticos como GamerBox AI.",
      en: "Cross-platform native packaging for Android and Wear OS, powering tactical assistants like GamerBox AI.",
    },
    color: "#6366f1",
    keyboardColor: "#1b1f2e",
    icon: "/assets/keyboard/logos/expo.svg",
  },
  {
    id: 7,
    name: "tailwind",
    label: "Tailwind CSS",
    category: { es: "Sistemas de Diseño", en: "Design Systems" },
    shortDescription: {
      es: "Sistemas de diseño dual-theme (Modo Claro/Oscuro), cuadrículas suizas y micro-interacciones de alto contraste.",
      en: "Dual-theme design systems (Light/Dark mode), Swiss grids, and high-contrast micro-interactions.",
    },
    color: "#38bdf8",
    keyboardColor: "#00bfd8",
    icon: "/assets/keyboard/logos/tailwind.svg",
  },
  {
    id: 8,
    name: "nodejs",
    label: "Node.js",
    category: { es: "Runtime Backend", en: "Backend Runtime" },
    shortDescription: {
      es: "Servicios backend escalables, integración de webhooks, correo transaccional con Resend API y procesamiento asíncrono.",
      en: "Scalable backend services, webhook integrations, Resend API transactional email, and async pipelines.",
    },
    color: "#6cc24a",
    keyboardColor: "#00952c",
    icon: "/assets/keyboard/logos/nodejs.svg",
  },
  {
    id: 9,
    name: "express",
    label: "FastAPI & REST",
    category: { es: "APIs de Baja Latencia", en: "Low-Latency APIs" },
    shortDescription: {
      es: "Diseño de APIs RESTful en Python/FastAPI y Node.js para motores de optimización como Viberoute.",
      en: "RESTful API architecture in Python/FastAPI and Node.js powering optimization engines like Viberoute.",
    },
    color: "#10b981",
    keyboardColor: "#343638",
    icon: "/assets/keyboard/logos/express.svg",
  },
  {
    id: 10,
    name: "bun",
    label: "Python & OR-Tools",
    category: { es: "Algoritmos & IA", en: "Algorithms & AI" },
    shortDescription: {
      es: "Resolución de problemas de ruteo vehicular (VRP) con Google OR-Tools y automatización inteligente en Obsidion.",
      en: "Solving vehicle routing problems (VRP) with Google OR-Tools and intelligent automation at Obsidion.",
    },
    color: "#ec6fa5",
    keyboardColor: "#ec6fa5",
    icon: "/assets/keyboard/logos/bun.svg",
  },
  {
    id: 11,
    name: "postgres",
    label: "PostgreSQL",
    category: { es: "Base de Datos Relacional", en: "Relational Database" },
    shortDescription: {
      es: "Modelado relacional normalizado, índices de alto rendimiento y persistencia transaccional para e-commerce.",
      en: "Normalized relational modeling, high-performance indexing, and transactional persistence for e-commerce.",
    },
    color: "#336791",
    keyboardColor: "#146888",
    icon: "/assets/keyboard/logos/postgres.svg",
  },
  {
    id: 12,
    name: "mongodb",
    label: "Redis & NoSQL",
    category: { es: "Caché & Tiempo Real", en: "Cache & Real-Time" },
    shortDescription: {
      es: "Almacenamiento en memoria de baja latencia, colas de trabajo y estructuras de documentos flexibles.",
      en: "Low-latency in-memory caching, job queues, and flexible document data structures.",
    },
    color: "#00c51b",
    keyboardColor: "#00c51b",
    icon: "/assets/keyboard/logos/mongodb.svg",
  },
  {
    id: 13,
    name: "linux",
    label: "Linux & C/ASM",
    category: { es: "Sistemas & Bajo Nivel", en: "Systems & Low-Level" },
    shortDescription: {
      es: "Administración de servidores Linux, scripting de automatización y optimización de rutinas en C y ensamblador.",
      en: "Linux server administration, automation scripting, and low-level routine optimization in C and Assembly.",
    },
    color: "#f59e0b",
    keyboardColor: "#333537",
    icon: "/assets/keyboard/logos/linux.svg",
  },
  {
    id: 14,
    name: "git",
    label: "Git & GitHub",
    category: { es: "Control de Versiones", en: "Version Control" },
    shortDescription: {
      es: "Flujos de trabajo colaborativos en @itsGabo22, integración continua y despliegues automatizados.",
      en: "Collaborative workflows on @itsGabo22, continuous integration, and automated deployments.",
    },
    color: "#f1502f",
    keyboardColor: "#ff4622",
    icon: "/assets/keyboard/logos/git.svg",
  },
  {
    id: 15,
    name: "vim",
    label: "Java & Spring Boot",
    category: { es: "Ingeniería Empresarial", en: "Enterprise Engineering" },
    shortDescription: {
      es: "Programación orientada a objetos, patrones de diseño de software y microservicios empresariales con Spring Boot.",
      en: "Object-oriented programming, software design patterns, and enterprise microservices with Spring Boot.",
    },
    color: "#009f18",
    keyboardColor: "#009f18",
    icon: "/assets/keyboard/logos/vim.svg",
  },
  {
    id: 16,
    name: "docker",
    label: "Docker",
    category: { es: "Contenedores & DevOps", en: "Containers & DevOps" },
    shortDescription: {
      es: "Empaquetado reproducible de microservicios, entornos aislados de desarrollo y despliegue en la nube.",
      en: "Reproducible microservice containerization, isolated dev environments, and cloud deployment.",
    },
    color: "#2496ed",
    keyboardColor: "#009fe8",
    icon: "/assets/keyboard/logos/docker.svg",
  },
  {
    id: 17,
    name: "nginx",
    label: "Hostinger & DNS",
    category: { es: "Infraestructura Web", en: "Web Infrastructure" },
    shortDescription: {
      es: "Configuración de registros DNS, certificados SSL, dominios personalizados y proxies inversos de alta disponibilidad.",
      en: "DNS record management, SSL certificates, custom domains, and high-availability reverse proxies.",
    },
    color: "#00a20b",
    keyboardColor: "#00a20b",
    icon: "/assets/keyboard/logos/nginx.svg",
  },
  {
    id: 18,
    name: "claude",
    label: "Gemini AI & LLMs",
    category: { es: "Inteligencia Artificial", en: "Artificial Intelligence" },
    shortDescription: {
      es: "Orquestación de agentes generativos, ingeniería de prompts estructurados e integración de Gemini AI en producción.",
      en: "Generative agent orchestration, structured prompt engineering, and production Gemini AI integrations.",
    },
    color: "#d97757",
    keyboardColor: "#d97757",
    icon: "/assets/keyboard/logos/claude.svg",
  },
  {
    id: 19,
    name: "cloudflare",
    label: "Vercel & Edge",
    category: { es: "Despliegue Cloud", en: "Cloud Deployment" },
    shortDescription: {
      es: "Despliegue continuo en el Edge, funciones serverless globales y distribución CDN de baja latencia.",
      en: "Continuous Edge deployment, global serverless functions, and low-latency CDN distribution.",
    },
    color: "#f38020",
    keyboardColor: "#f38020",
    icon: "/assets/keyboard/logos/cloudflare.svg",
  },
  {
    id: 20,
    name: "gcp",
    label: "Google Cloud & APIs",
    category: { es: "Servicios Cloud", en: "Cloud Services" },
    shortDescription: {
      es: "Integración de APIs en la nube, motores de optimización logística y servicios de inteligencia artificial.",
      en: "Cloud API integration, logistics optimization engines, and artificial intelligence services.",
    },
    color: "#4285f4",
    keyboardColor: "#008fd5",
    icon: "/assets/keyboard/logos/gcp.svg",
  },
  {
    id: 21,
    name: "aws",
    label: "AWS Serverless",
    category: { es: "Nube & Infraestructura", en: "Cloud & Infrastructure" },
    shortDescription: {
      es: "Arquitecturas serverless con AWS Lambda, almacenamiento seguro en S3 y gestión de permisos con IAM.",
      en: "Serverless architectures with AWS Lambda, secure S3 object storage, and IAM access management.",
    },
    color: "#ff9900",
    keyboardColor: "#ff9208",
    icon: "/assets/keyboard/logos/aws.svg",
  },
  {
    id: 22,
    name: "homeassistant",
    label: "Arduino & IoT",
    category: { es: "Hardware & Automatización", en: "Hardware & Automation" },
    shortDescription: {
      es: "Prototipado electrónico, sensores industriales, microcontroladores Arduino y automatización electromecánica.",
      en: "Electronic prototyping, industrial sensors, Arduino microcontrollers, and electromechanical automation.",
    },
    color: "#18bcf2",
    keyboardColor: "#03a9f4",
    icon: "/assets/keyboard/logos/homeassistant.svg",
  },
  {
    id: 23,
    name: "proxmox",
    label: "VICARDEV Cloud",
    category: { es: "Arquitectura de Sistemas", en: "Systems Architecture" },
    shortDescription: {
      es: "Infraestructura dedicada para proyectos empresariales, monitoreo de servicios y alta disponibilidad.",
      en: "Dedicated infrastructure for enterprise projects, service telemetry, and high availability.",
    },
    color: "#e57000",
    keyboardColor: "#e57000",
    icon: "/assets/keyboard/logos/proxmox.svg",
  },
  {
    id: 24,
    name: "steam",
    label: "Steam API & Gaming",
    category: { es: "Integración de Ecosistemas", en: "Ecosystem Integration" },
    shortDescription: {
      es: "Consumo de telemetría de videojuegos y rastreo de ofertas en tiempo real integrado en GamerBox AI.",
      en: "Real-time game telemetry consumption and deal tracking integrated into GamerBox AI.",
    },
    color: "#66c0f4",
    keyboardColor: "#1b2838",
    icon: "/assets/keyboard/logos/steam.svg",
  },
];
