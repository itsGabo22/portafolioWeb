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

Netlify ejecuta Next.js 16 mediante su adaptador OpenNext (los Route Handlers como `/api/contact` funcionan como Netlify Functions). No se usa `output: "export"` ni se instala/fija `@netlify/plugin-nextjs`; el `netlify.toml` solo declara el comando y la carpeta de publicación.

1. En Netlify: **Add new site → Import an existing project** y conecta este repositorio de GitHub.
2. **Project configuration → Build & deploy → Build settings → Runtime: `Next.js`.** Sin esto el adaptador no se ejecuta y `/` responde 404 (le pasó a este sitio porque se creó para la versión estática).
3. Build: lo fija `netlify.toml` (`npm run build`, publicación `.next`). Node lo toma de `.nvmrc` (22; Next 16 requiere ≥ 20.9).
4. **Variables de entorno** (Site configuration → Environment variables): `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, con *scope* **Functions / Runtime** y en los contextos **Production** y **Deploy Previews**. Sin ellas `/api/contact` responde `503` (el formulario lo muestra como "no disponible"), es lo esperado.
5. **Deploy Preview (flujo de revisión):** Netlify solo despliega `main` y los *pull requests*; una rama sin PR no tiene URL. Abre un **draft PR** contra `main` (`gh pr create --draft --base main --head <rama>`): cada push genera `https://deploy-preview-<n>--gabodevportafolio.netlify.app` y el enlace aparece en los checks y en un comentario del PR. Por defecto Netlify protege los previews con login del equipo (401 para visitantes); para compartirlo, usa *Share* en la barra de Netlify del preview o desactiva la protección en **Access & security → Visitor access**.
6. Hacer merge a `main` publica producción en `https://gabodevportafolio.netlify.app`.
