import type { BilingualText } from "./projects";

/**
 * Real testimonials, published with permission. The quote text (`content`)
 * must stay exactly as provided.
 *
 * Avatars: drop `public/images/testimonials/<id>.(webp|jpg|png)` and it is
 * picked up at build time (lib/media.ts); otherwise initials are shown.
 */
export interface Testimonial {
  id: string;
  name: BilingualText;
  role: BilingualText;
  /** Short descriptor of the delivered work shown as a chip. */
  impactMetric: BilingualText;
  /**
   * Optional verification badge. Only rendered when `confirmed` is true —
   * none is confirmed yet, so no "verified" claim is shown.
   */
  badge?: BilingualText & { confirmed: boolean };
  projectUrl?: string;
  content: BilingualText;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "brisal",
    name: { es: "Brisal by Salvador", en: "Brisal by Salvador" },
    role: {
      es: "Cliente E-Commerce de Accesorios (brisal.com.co)",
      en: "Accessories E-Commerce Client (brisal.com.co)",
    },
    impactMetric: {
      es: "Catálogo Mayorista & Minorista en Producción",
      en: "Live Wholesale & Retail E-Commerce",
    },
    projectUrl: "https://brisal.com.co",
    content: {
      es: "Gabriel diseñó y desplegó nuestra tienda online de joyería y accesorios en acero y rodio (brisal.com.co) superando cada expectativa. La velocidad de carga, el catálogo mayorista/minorista y la experiencia móvil impulsaron nuestras ventas en toda Colombia.",
      en: "Gabriel designed and deployed our steel and rhodium jewelry & accessories online store (brisal.com.co), exceeding every expectation. The loading speed, wholesale/retail catalog, and mobile checkout boosted our nationwide sales.",
    },
  },
  {
    id: "electrotech",
    name: {
      es: "Dirección Corporativa — ElectroTech Pasto",
      en: "Corporate Management — ElectroTech Pasto",
    },
    role: {
      es: "Cliente Comercial de Automatización Industrial (electrotechpasto.com)",
      en: "Industrial Automation Commercial Client (electrotechpasto.com)",
    },
    impactMetric: {
      es: "Cotizaciones Automatizadas con Resend API",
      en: "Automated Quoting via Resend API",
    },
    projectUrl: "https://electrotechpasto.com",
    content: {
      es: "La plataforma web corporativa y el sistema de cotización automatizada con Resend API que Gabriel desarrolló para ElectroTech Pasto modernizaron por completo nuestra captación de clientes industriales en Nariño.",
      en: "The corporate web platform and automated quoting system with Resend API that Gabriel developed for ElectroTech Pasto completely modernized our industrial client acquisition across Nariño.",
    },
  },
  {
    id: "ucc-docente",
    name: {
      es: "Docente de Ingeniería de Software",
      en: "Software Engineering Professor",
    },
    role: {
      es: "Profesor Universitario, UCC Pasto",
      en: "Software Engineering Professor, UCC",
    },
    impactMetric: {
      es: "5 Proyectos Universitarios con IA Integrada",
      en: "5 University Systems with Integrated AI",
    },
    content: {
      es: "Gabriel destaca en la facultad por su rigor arquitectónico y su capacidad para llevar conceptos avanzados de algoritmos, nube e inteligencia artificial hacia productos reales en producción antes de graduarse.",
      en: "Gabriel stands out in the faculty for his architectural rigor and his ability to translate advanced concepts in algorithms, cloud, and artificial intelligence into live production products before graduation.",
    },
  },
  {
    id: "bluevelvet-carlin",
    name: { es: "Blue Velvet & Carlin Cosméticos", en: "Blue Velvet & Carlin Cosmetics" },
    role: {
      es: "Clientes Comerciales E-Commerce (bluevelvet0.com · carlincosmeticos.com)",
      en: "Commercial E-Commerce Clients (bluevelvet0.com · carlincosmeticos.com)",
    },
    impactMetric: {
      es: "Tiendas Online de Moda y Cosméticos en Producción",
      en: "Live Fashion & Cosmetics E-Commerce Stores",
    },
    projectUrl: "https://bluevelvet0.com",
    content: {
      es: "A través de su agencia VICARDEV, Gabriel construyó y puso en producción nuestras tiendas online con un diseño impecable, buscador multicategoría ultrarrápido y gestión de pedidos lista para escalar.",
      en: "Through his agency VICARDEV, Gabriel architected and launched our live online stores with an impeccable editorial design, lightning-fast multi-category search, and scalable order workflows.",
    },
  },
];
