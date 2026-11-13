# DESIGN.md — Sistema de diseño del portafolio

Fuente de verdad de los tokens: `app/globals.css` (variables CSS en `:root` / `.dark`, expuestas a Tailwind v4 mediante `@theme inline`). Los componentes usan las utilidades generadas (`bg-surface-1`, `text-ink-muted`, `rounded-card`, `shadow-elev-2`, `ease-out-expo`…) o `var(--token)`; no se escriben valores hex sueltos en componentes nuevos.

## 1. Identidad

- **Concepto:** "taller de un ingeniero que diseña". Superficies neutras de zinc, un único acento esmeralda que marca lo accionable y lo vivo, índigo como acento secundario escaso.
- **Modo:** claro por defecto, oscuro conmutable (regla A de `AGENTS.md`). Cada token tiene pareja clara/oscura.
- **Dónde se gasta la audacia:** en tres momentos — el teclado 3D (Hero y Skills), el **Device Lab** (Projects) y el panel de moods de **Fuera del código**. Todo lo demás es sobrio.

## 2. Color

| Token | Claro | Oscuro | Uso | Contraste (texto) |
|---|---|---|---|---|
| `--surface-0` | `#fafafa` | `#09090b` | fondo de página | — |
| `--surface-1` | `#ffffff` | `#18181b` | tarjetas | — |
| `--surface-2` | `#f4f4f5` | `#27272a` | chips, insets | — |
| `--ink` | `#18181b` | `#fafafa` | texto principal | 17.7:1 / 19.1:1 |
| `--ink-muted` | `#52525b` | `#d4d4d8` | texto secundario | 7.7:1 / 13.5:1 |
| `--ink-subtle` | `#71717a` | `#a1a1aa` | metadatos (≥14 px) | 4.8:1 / 7.8:1 |
| `--accent` | `#047857` | `#34d399` | enlaces, texto de acento | 5.5:1 / 10.4:1 |
| `--accent-fill` | `#10b981` | `#10b981` | rellenos, anillo de foco, brillos | no se usa para texto pequeño |
| `--accent-2` | `#4f46e5` | `#818cf8` | acento secundario | 6.3:1 / 6.7:1 |
| `--warn` | `#b45309` | `#fbbf24` | estado "En desarrollo" | 5.0:1 / 11.9:1 |

Todo texto cumple WCAG AA (≥4.5:1 normal, ≥3:1 grande). Los moods de la sección *Fuera del código* tienen su propia tabla en §8.

## 3. Tipografía (máx. 2 familias)

- **Display:** *Bricolage Grotesque* (500–800) — grotesca con carácter y ejes ópticos; títulos, cifras, nombres de proyecto.
- **Texto:** *IBM Plex Sans* (400–700) — precisa y técnica, excelente legibilidad en párrafos y UI.
- **Mono:** pila del sistema (`ui-monospace`, Cascadia Code, Consolas) — no se descarga ninguna tercera familia.
- **Serif de moods:** pila del sistema (`Iowan Old Style`, Palatino, Georgia) — solo dentro de los moods (RDR2, Bloodborne); no es una familia descargada.

Escala fluida (clamp): `--text-display` 2.6→5.25 rem · `--text-h2` 2→3.25 rem · `--text-h3` 1.25→1.5 rem · `--text-lead` 1.05→1.25 rem · cuerpo 1 rem · small 0.875 rem · micro 0.75 rem. Interlineado: títulos 1.05, cuerpo 1.6. Línea de lectura ≤ 70 caracteres (`max-w-prose`/`max-w-2xl`).

## 4. Espaciado y layout

- Base 4 px (escala de Tailwind). Ritmo de sección `--space-section` (5→9 rem), gutter `--space-gutter` (1→2 rem).
- Contenedor `max-w-7xl`, grid de 12 columnas en escritorio; 1 / 2 / 3 columnas para tarjetas de proyecto.
- Breakpoints verificados: 375, 768, 1280, 1920 px. Nunca scroll horizontal.

## 5. Radios y elevación

- Radios con jerarquía: `--radius-chip` 8 px (chips, badges) · `--radius-control` 12 px (botones, inputs) · `--radius-card` 20 px (tarjetas) · `--radius-stage` 32 px (escenarios: Device Lab, panel Beyond).
- Elevación: `--shadow-1` (reposo), `--shadow-2` (hover/tarjeta destacada), `--shadow-3` (paneles flotantes, diálogo), `--glow-accent` (foco/selección del Device Lab).

## 6. Movimiento

| Token | Valor | Uso |
|---|---|---|
| `--dur-instant` | 90 ms | pulsación de teclas, press de botón |
| `--dur-fast` | 160 ms | hover, color |
| `--dur-base` | 260 ms | cambios de estado, tabs |
| `--dur-slow` | 520 ms | revelado de sección, fade del teclado |
| `--dur-mood` | 700 ms | morph de variables del panel de moods |
| `--ease-out-expo` | `cubic-bezier(0.16,1,0.3,1)` | entradas |
| `--ease-in-out` | `cubic-bezier(0.65,0,0.35,1)` | desplazamientos de cámara, loops |
| `--ease-spring` | `cubic-bezier(0.34,1.56,0.64,1)` | micro-interacciones "con rebote" (mood Mac DeMarco, botones magnéticos) |

Reglas: un único sistema de revelado (`[data-reveal]`, se activa con `.reveal-armed` desde JS, así el contenido es visible sin JS); el movimiento responde a la persona (hover, foco, clic) o explica un cambio; `prefers-reduced-motion: reduce` desactiva animaciones, pinning y partículas y deja el estado final visible; nada bloquea la interacción.

## 7. Reglas 3D

1. **Teclado:** vívido **solo** en `#hero` y `#skills`. En cualquier otra sección se *aparca*: opacidad 0 + `visibility:hidden` (transición 480 ms) y el render loop se pausa (`api.setPaused`). Nunca queda detrás de texto ni de tarjetas en 375/768/1280/1920. Los eventos de puntero/teclado no se reenvían al canvas aparcado.
2. **Device Lab:** canvas propio (`@react-three/fiber`), importado dinámicamente (`ssr:false`) solo cuando la sección se acerca al viewport; `dpr` limitado a [1, 1.75]; `frameloop` pasa a `"never"` fuera de pantalla; canvas `aria-hidden`, nunca captura el scroll.
3. **Fallbacks:** sin WebGL o equipo modesto (viewport < 768 px, `deviceMemory ≤ 4`, `hardwareConcurrency ≤ 4`) → maquetas 2D en CSS; `prefers-reduced-motion` → composición estática sin pinning.
4. **Geometría procedural** preferida; GLB ≤ 300 KB, CC0/propios y acreditados en `public/CREDITS.md`.
5. Como mucho dos contextos WebGL vivos a la vez, y nunca ambos renderizando: el teclado está aparcado mientras el Device Lab está en pantalla.

## 8. Moods de *Fuera del código*

Cada ítem define `--mood-bg/-surface/-fg/-muted/-accent/-accent-2/-line` (registradas con `@property`, así que el panel interpola colores). Texturas 100 % procedurales (CSS/SVG). Son **interpretaciones originales** del ambiente general, sin arte, logos, escudos ni tipografías oficiales.

| Ítem | Fondo | Texto | Acento | Textura / composición | Easing |
|---|---|---|---|---|---|
| Base (sin selección) | `#0b1210` | `#ecfdf5` | `#34d399` | rejilla de puntos | expo |
| Joji | `#14112b` | `#f3eefe` | `#ff4fd8` | grano de película, funda de vinilo, fundidos lentos | in-out lento |
| Radiohead | `#0d0d0d` | `#f2f2f2` | `#ff4a1c` | scanlines, glitch sutil al hover, funda geométrica | steps cortos |
| Mac DeMarco | `#fff4d6` | `#2b2111` | `#a14a08` | marco Polaroid inclinado | spring |
| Red Dead Redemption 2 | `#2a1d12` | `#f4e7d0` | `#e0a458` | papel (ruido SVG), cartel serif, polvo | in-out |
| Skyrim | `#0f1a24` | `#eaf3fa` | `#9cc9ea` | trazos angulares originales, nieve | expo |
| Elden Ring | `#0b0a08` | `#f5ecd6` | `#d8b45a` | haces verticales dorados, brasas | in-out lento |
| Bloodborne | `#1a0709` | `#f1e6e6` | `#e0636c` | viñeta, niebla, serif gótica de sistema | in-out lento |
| FC Barcelona | `#0a1630` | `#ffffff` | `#ffd23f` | franjas `#004D98` / `#A50044` (solo color), ticket de partido | spring |

Contraste texto/fondo de todos los moods ≥ 13:1; acento sobre fondo ≥ 5:1 (verificado con axe en la revisión).

## 9. Accesibilidad

Foco visible único (`outline 2px var(--accent-fill)`, offset 3 px); objetivos táctiles ≥ 44 px; iconos de `lucide-react` (cero emojis); cada icono-botón con `aria-label` traducido; tabs con patrón ARIA completo (flechas, Home/End); diálogos con Esc y retorno de foco.
