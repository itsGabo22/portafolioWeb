# Gabriel Esteban Paz Guerrero (@itsGabo22) — Portafolio Web 3D & Full-Stack

Portafolio profesional y académico de **Gabriel Esteban Paz Guerrero** (`@itsGabo22`), estudiante de 5.º semestre de Ingeniería de Software en la Universidad Cooperativa de Colombia (Pasto, Nariño), Desarrollador Full-Stack y fundador de **VICARDEV**, **ElectroTech Pasto** y **Obsidion**.

## Stack Tecnológico & Arquitectura

- **Framework**: Next.js 16 (App Router) + React 19
- **Lenguaje**: TypeScript (`strict: true`)
- **Backend ligero**: Route Handler de Next.js (`/api/contact`) + Resend
- **Despliegue**: Netlify (adaptador OpenNext de Next.js, cero configuración)
- **Estilos**: Tailwind CSS v4 (Modo Claro de estudio por defecto + Modo Oscuro conmutable)
- **Escenario 3D Interactivo**: `@chibi3d/runtime` (teclado mecánico 3D de 24 teclas con sonido de switches, vívido solo en Hero y Skills) + **Device Lab** con `@react-three/fiber` (dispositivos procedurales para las apps de Diseño de Interfaces)
- **Coreografía & Animaciones**: GSAP (`ScrollTrigger`) + Framer Motion
- **Internacionalización (i18n)**: catálogos tipados `messages/es.ts` / `messages/en.ts` (paridad de claves comprobada por TypeScript) + `context/AppContext.tsx`
- **Sistema de diseño**: ver [`DESIGN.md`](./DESIGN.md) (tokens en `app/globals.css`)
- **Créditos y licencias de assets**: [`public/CREDITS.md`](./public/CREDITS.md)

## Proyectos Destacados (Comerciales & Académicos UCC)

### Producción Comercial & E-Commerce
1. **VICARDEV** — Agencia de desarrollo web y e-commerce (`https://vicardev.digital/`)
2. **ElectroTech Pasto** — Ingeniería electromecánica y automatización industrial (`https://electrotechpasto.com/`)
3. **Brisal by Salvador** — E-commerce de joyería y accesorios en acero y rodio (`https://brisal.com.co/`)
4. **Blue Velvet** — E-commerce de calzado y moda (`https://bluevelvet0.com/`)
5. **Carlin Cosméticos** — E-commerce de maquillaje, accesorios y mayoristas (`https://carlincosmeticos.com/`)

### Proyectos Académicos (Ingeniería de Software UCC + IA)
6. **GamerBox** — App móvil/PWA tipo Letterboxd de videojuegos con Steam API e IA (`https://github.com/itsGabo22/GamerBox`)
7. **VibeRoute Colombia** — Sistema de logística geoespacial con Java 17, Spring Boot, PostGIS y Gemini AI (`https://vibe-route-colombia-frontend.vercel.app/`)
8. **WGO (Where We Go?)** — Navegador conversacional con IA para Smartwatch / Wear OS (`https://github.com/itsGabo22/WGO`)
9. **OcioFlex** — App nativa de escritorio (Tauri v2 + Rust + Next.js 16) para gestión de tiempos de uso de apps e IA (`https://github.com/itsGabo22/OcioFlex`)
10. **MusicScript** — Estación y reproductor musical WebAPK con chat de IA que recomienda canciones y adopta la personalidad de cantantes (`https://musicscript.vercel.app/`)

## Ejecución Local

```bash
npm install
cp .env.example .env.local   # completa las variables del formulario de contacto
npm run dev
```

Verificación y compilación de producción:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Variables de entorno

El formulario de contacto (`app/api/contact/route.ts`) envía correos con [Resend](https://resend.com). Sin estas variables el endpoint responde `503` y el formulario muestra un mensaje de error con el correo directo.

| Variable | Descripción |
| --- | --- |
| `RESEND_API_KEY` | API key de Resend |
| `CONTACT_TO_EMAIL` | Bandeja que recibe los mensajes |
| `CONTACT_FROM_EMAIL` | Remitente verificado en Resend (`onboarding@resend.dev` sirve para pruebas) |

Nunca subas valores reales al repositorio (`.env*` está ignorado; solo `.env.example` se versiona).

## Medios de demostración (Device Lab)

Cada dispositivo del Device Lab reproduce un video si existe en `public/media/<id>/` (se detecta al compilar; si falta, se muestra una pantalla honesta y nunca se pide un archivo inexistente):

| Proyecto | Carpeta | Archivos |
| --- | --- | --- |
| WGO | `public/media/wgo-smartwatch/` | `demo.webm` (o `demo.mp4`) + `poster.webp` |
| GamerBox | `public/media/gamerbox-ai/` | `demo.webm` (o `demo.mp4`) + `poster.webp` |
| OcioFlex | `public/media/ocioflex-desktop/` | `demo.webm` (o `demo.mp4`) + `poster.webp` |
| Nexo: Protocolo Sombra | `public/media/nexo-protocolo-sombra/` | `demo.webm` (o `demo.mp4`) + `poster.webp` |

Recomendado: video sin audio, ≤ 15 s en bucle, ≤ 4 MB, 1280 px de ancho. Los avatares de testimonios siguen el mismo patrón: `public/images/testimonials/<id>.webp|jpg|png`.

## Despliegue en Netlify

Netlify ejecuta Next.js 16 sin configuración mediante su adaptador OpenNext (los Route Handlers como `/api/contact` funcionan como Netlify Functions). No hace falta `netlify.toml`, `output: "export"` ni instalar `@netlify/plugin-nextjs`.

1. En Netlify: **Add new site → Import an existing project** y conecta este repositorio de GitHub.
2. Build command: `npm run build` (Netlify detecta Next.js y gestiona el directorio de publicación).
3. Versión de Node: la toma de `.nvmrc` (22; Next 16 requiere ≥ 20.9).
4. En **Site configuration → Environment variables** agrega `RESEND_API_KEY`, `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL` con un *scope* que incluya **Functions / Runtime**.
5. **Deploy previews:** abre un *draft pull request* contra `main`; Netlify publica una vista previa por cada push a esa rama. Hacer merge a `main` publica producción en `https://gabodevportafolio.netlify.app`.
