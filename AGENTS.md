<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Reglas de Arquitectura y Estándares del Proyecto (`mi-portafolio`)

## 1. Contexto del Proyecto
Portafolio web profesional y académico de **Gabriel Esteban Paz Guerrero** (`@itsGabo22`), estudiante de 5.º semestre de Ingeniería de Software en la Universidad Cooperativa de Colombia (Pasto, Nariño), Desarrollador Full-Stack y fundador de **VICARDEV**, **ElectroTech Pasto** y **Obsidion**.

## 2. Stack Tecnológico
- **Framework**: Next.js (App Router)
- **Lenguaje**: TypeScript (`strict: true`)
- **Estilos**: Tailwind CSS v4 (con variante `@custom-variant dark (&:where(.dark, .dark *));`)
- **Iconografía**: `lucide-react` (CERO emojis en la interfaz de usuario)
- **Animaciones**: `framer-motion`
- **Estado Global**: Contexto React (`context/AppContext.tsx`) para Tema (`light` / `dark`) e Idioma (`es` / `en`)
- **Despliegue**: Vercel

## 3. Reglas Globales Innegociables (Tema, Idioma y Estructura)

### Regla A — Tema Claro por Defecto + Modo Oscuro Conmutable (`light` default / `dark` toggle)
- **Tema por defecto**: El portafolio DEBE cargar estrictamente en **Modo Claro (`light`)** en la primera visita (sin la clase `dark` en `<html>`).
- **Prohibido hardcodear solo modo oscuro**: Toda superficie, fondo, texto, borde y tarjeta en todos los componentes DEBE usar clases emparejadas claro/oscuro:
  - Fondos principales: `bg-white dark:bg-zinc-950` o `bg-zinc-50 dark:bg-zinc-900`
  - Superficies / Tarjetas: `bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800/80`
  - Tipografía principal: `text-zinc-900 dark:text-zinc-50`
  - Tipografía secundaria: `text-zinc-600 dark:text-zinc-300` y `text-zinc-500 dark:text-zinc-400`
  - Acentos: Esmeralda (`emerald-600 dark:emerald-400`) e Índigo (`indigo-600 dark:indigo-400`).

### Regla B — Soporte Bilingüe Completo (`es` por defecto / `en` conmutable)
- **Idioma por defecto**: El portafolio DEBE cargar en **Español (`es`)** por defecto en la primera visita.
- **Conmutación instantánea**: Todos los componentes deben consumir el contexto de idioma (`useApp()` / `useLanguage()`) desde `context/AppContext.tsx` para alternar todos los textos visibles entre Español (`es`) e Inglés (`en`) sin recargar la página.

### Regla C — Estructura Académica y Cero Emojis
- **Restricción Estricta**: Prohibido el uso de emojis en el diseño y en el texto de la interfaz. Todos los indicadores visuales deben emplear íconos vectoriales de `lucide-react` o primitivas geométricas CSS/SVG.
- **Árbol de Archivos Obligatorio**:

```text
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── context/
│   └── AppContext.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Testimonials.tsx
│   ├── Experience.tsx
│   ├── Skills.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── data/
│   └── projects.ts
└── public/
    ├── cv.pdf
    └── images/
```

## 4. Reglas de Evaluación Académica
1. **Configuración de `<html lang="es" className="scroll-smooth">`**: En `app/layout.tsx`, la etiqueta raíz debe incluir `lang="es"` y `className="scroll-smooth"` (sin `dark` forzado por defecto).
2. **Navegación por Anclas (`#id`)**: Cada sección renderizada en `app/page.tsx` debe poseer su atributo `id` semántico exacto:
   - `#hero` (`components/Hero.tsx`)
   - `#about` (`components/About.tsx`)
   - `#projects` (`components/Projects.tsx`)
   - `#testimonials` (`components/Testimonials.tsx`)
   - `#experience` (`components/Experience.tsx`)
   - `#skills` (`components/Skills.tsx`)
   - `#contact` (`components/Contact.tsx`)
3. **Descarga de CV Real**: El botón principal de llamada a la acción en `components/Hero.tsx` debe implementarse con `<a href="/cv.pdf" download>` apuntando a `public/cv.pdf`.
4. **Calidad de Compilación**: Cualquier entrega o fase debe superar `npm run build` con código de salida `0`, sin errores de TypeScript ni de ESLint.
