# DESIGN.md — Sistema de diseño del portafolio

Fuente de verdad de los tokens: `app/globals.css` (variables CSS en `:root` / `.dark`, expuestas a Tailwind v4 mediante `@theme inline`). Los componentes usan las utilidades generadas (`bg-surface-1`, `text-ink-muted`, `rounded-card`, `shadow-elev-2`, `ease-out-expo`…) o `var(--token)`; no se escriben valores hex sueltos en componentes nuevos.

## 1. Identidad

- **Concepto:** "taller de un ingeniero que diseña". Superficies neutras de zinc, un único acento esmeralda que marca lo accionable y lo vivo, índigo como acento secundario escaso.
- **Modo:** claro por defecto, oscuro conmutable (regla A de `AGENTS.md`). Cada token tiene pareja clara/oscura: los componentes usan tokens semánticos (`text-ink`, `bg-surface-1`, `border-line`…) definidos en `:root` y redefinidos en `.dark`, equivalentes al patrón `bg-white dark:bg-zinc-950` de la regla. **Excepciones documentadas:** las tres bandas del color primario (Experiencia, Contacto, Footer, §2.1) son verde profundo en ambos temas por diseño, y los moods de *Fuera del código* (§8) tienen paleta propia; la página sigue cargando en claro y el conmutador global no cambia.
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

### 2.1 Primary color — verde bosque profundo

**Rol.** El color primario es la identidad de marca del portafolio: marca *lo que se puede hacer* (CTA principales, descarga del CV, enlace activo del menú, enlaces de texto, chips, etiquetas de sección, foco) y da cuerpo a tres bandas a sangre completa. El esmeralda brillante (`--accent-fill`) queda como **acento** más claro para brillos, puntos de estado y detalles vivos; el índigo sigue siendo acento secundario escaso.

**Escala.** Derivada de la familia esmeralda pero más profunda y menos turquesa, definida en OKLCH con un único tono: `--primary-hue: 158`. Cambiar ese token (p. ej. `255` para azul profundo) cambia toda la escala y todos los alias manteniendo AA (verificado para ambos tonos).

| Token | OKLCH (L C) | Hex (tono 158) | Uso |
|---|---|---|---|
| `--primary-50` | 0.975 0.015 | `#effaf3` | lavados muy suaves |
| `--primary-100` | 0.937 0.036 | `#d7f2e1` | — |
| `--primary-200` | 0.875 0.067 | `#b1e4c5` | anillo de foco dentro de bandas |
| `--primary-300` | 0.787 0.101 | `#7fcea1` | texto primario en tema oscuro y en bandas |
| `--primary-400` | 0.692 0.124 | `#4db37e` | rellenos/indicadores dentro de bandas |
| `--primary-500` | 0.603 0.125 | `#2b9763` | selección de texto |
| `--primary-600` | 0.516 0.108 | `#1f7a4f` | **CTA en tema oscuro**, scrollbar |
| `--primary-700` | 0.449 0.092 | `#1b6441` | **primario en superficies claras**: CTA, texto, foco |
| `--primary-800` | 0.383 0.075 | `#174f33` | hover/pressed de CTA en claro |
| `--primary-900` | 0.330 0.061 | `#143f29` | bandas (inicio del degradado) |
| `--primary-950` | 0.231 0.039 | `#0b2316` | bandas (final), Footer |

**Alias semánticos** (`app/globals.css`, expuestos en Tailwind como `bg-primary`, `text-primary-ink`, `bg-primary-900`…):

| Alias | Claro | Oscuro |
|---|---|---|
| `--primary` (relleno de CTA) | `primary-700` | `primary-600` |
| `--primary-strong` (hover) | `primary-800` | `primary-700` |
| `--on-primary` (texto sobre CTA) | `#ffffff` | `#ffffff` |
| `--primary-ink` (texto/enlaces/etiquetas) | `primary-700` | `primary-300` |
| `--primary-soft` / `--primary-line` (chips) | 11 % / 35 % de `primary-600` | 15 % / 35 % de `primary-400` |

**Reglas de uso.**
1. **En todas partes, en pequeño y constante:** CTA principales (incluido "Descargar CV" del Hero y el botón CV del menú), indicador del enlace activo, enlaces de texto, etiquetas numeradas de sección, chips/tags, anillo de foco, selección de texto y scrollbar.
2. **Bandas a sangre completa solo en tres lugares:** Experiencia (degradado `900→950` con retícula sutil), Contacto (`950→900`) y Footer (`950`). Una banda es verde oscuro en **ambos temas**: activa el set de tokens oscuros en su subárbol y re-tiñe la rampa neutra oscura hacia el tono primario (`.band-primary` en `globals.css`).
3. **Sin cambios:** Hero, Proyectos, Testimonios, Habilidades y *Fuera del código* conservan su superficie zinc (los moods mantienen su paleta propia).
4. Nunca texto pequeño en `primary-400/500` sobre blanco; el primario como texto sobre claro es siempre `primary-700`.

**Contraste (fórmula WCAG 2.x, calculado por script; azul `255` entre paréntesis):**

| Par | Ratio | Requisito |
|---|---|---|
| texto blanco sobre `--primary` claro (`700`) | 7.13:1 (7.50) | AA ≥ 4.5 — cumple |
| texto blanco sobre `--primary` oscuro (`600`) | 5.31:1 (5.62) | AA ≥ 4.5 — cumple |
| `primary-700` como texto sobre `#ffffff` / `#fafafa` | 7.13 / 6.83:1 (7.50 / 7.18) | AA — cumple |
| `primary-300` como texto sobre zinc-950 / zinc-900 | 10.65 / 9.49:1 (10.22 / 9.10) | AA — cumple |
| zinc-50 sobre banda `primary-900` | 11.35:1 (11.74) | AA — cumple |
| texto secundario de banda (zinc-300 / zinc-400 re-teñido) sobre `900` | 8.01 / 6.43:1 | AA — cumple |
| `primary-300` sobre banda `900` | 6.34:1 (6.30) | AA — cumple |
| anillo de foco `primary-200` sobre `950` | 11.67:1 | 1.4.11 ≥ 3 — cumple |

## 3. Tipografía (máx. 2 familias)

- **Display:** *Bricolage Grotesque* (500–800) — grotesca con carácter y ejes ópticos; títulos, cifras, nombres de proyecto.
- **Texto:** *IBM Plex Sans* (400–700) — precisa y técnica, excelente legibilidad en párrafos y UI.
- **Mono:** pila del sistema (`ui-monospace`, Cascadia Code, Consolas) — no se descarga ninguna tercera familia.
- **Serif de moods:** pila del sistema (`Iowan Old Style`, Palatino, Georgia) — solo dentro de los moods (RDR2, Bloodborne); no es una familia descargada.

Escala fluida (clamp): `--text-display` 2.6→5.25 rem · `--text-h2` 2.25→4.5 rem · `--text-h3` 1.25→1.5 rem · `--text-lead` 1.05→1.25 rem · cuerpo 1 rem · small 0.875 rem · micro 0.75 rem. Interlineado: títulos 1.05, cuerpo 1.6. Línea de lectura ≤ 70 caracteres (`max-w-prose`/`max-w-2xl`).

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
4. **Geometría procedural** preferida; GLB ≤ 300 KB, CC0, MIT o propios, acreditados en `public/CREDITS.md` (el Bongo Cat es un personaje de terceros incluido por decisión del autor).
5. Como mucho dos contextos WebGL vivos a la vez, y nunca ambos renderizando: el teclado está aparcado mientras el Device Lab está en pantalla.

## 8. Moods de *Fuera del código*

Cada ítem define `--mood-bg/-surface/-fg/-muted/-accent/-accent-2/-line` (registradas con `@property`, así que el panel interpola colores). Texturas 100 % procedurales (CSS/SVG). Son **interpretaciones originales** del ambiente general, sin arte, logos, escudos ni tipografías oficiales. **Temporal (semana de exhibición):** con `BEYOND_PHOTOS = true` (`components/beyond/photos.ts`) cada mood muestra además una fotografía real con parallax bajo una veladura direccional del color del mood (densa bajo el texto, abierta sobre el arte) que mantiene AA; la pestaña de juegos adopta un inicio estilo consola. Procedencia y licencias en `public/CREDITS.md`; con `false` se vuelve a las texturas procedurales.

| Ítem | Fondo | Superficie | Texto | Acento | Textura / composición | Easing |
|---|---|---|---|---|---|---|
| Base (sin selección) | `#0b1210` | `#13201c` | `#ecfdf5` | `#34d399` | rejilla de puntos | expo |
| Joji | `#14112b` | `#1f1a45` | `#f3eefe` | `#ff5ad9` | grano de película, funda de vinilo (el disco sale al hover), fundidos lentos | in-out lento |
| Radiohead | `#0d0d0d` | `#1a1a1a` | `#f2f2f2` | `#ff5a2e` | scanlines, funda geométrica, glitch corto al hover | `steps(6)` |
| Mac DeMarco | `#fff4d6` | `#ffeab3` | `#2b2111` | `#9a4507` | sol cálido, Polaroid inclinada | spring |
| Red Dead Redemption 2 | `#2a1d12` | `#3a2918` | `#f4e7d0` | `#e8ad62` | papel (ruido SVG), cartel serif en mayúsculas, polvo | in-out |
| Skyrim | `#0f1a24` | `#182837` | `#eaf3fa` | `#9ccbee` | trazos angulares originales, nieve | expo |
| Elden Ring | `#0b0a08` | `#18150e` | `#f5ecd6` | `#d9b65c` | haces verticales dorados, brasas | in-out lento |
| Bloodborne | `#1a0709` | `#2a0d11` | `#f1e6e6` | `#ea7880` | viñeta, niebla, serif itálica de sistema | in-out lento |
| FC Barcelona | `#0a1630` | `#13255a` | `#ffffff` | `#ffd23f` | franjas `#004D98` / `#A50044` (solo color), ticket de partido | spring |

Contraste (calculado con la fórmula WCAG): texto/fondo y texto/superficie ≥ 11:1, texto secundario ≥ 7:1 y acento ≥ 5.4:1 en todos los moods (verificado con axe en la revisión).

## 9. Accesibilidad

Foco visible único (`outline 2px var(--focus-ring)`, primario `700` en claro, `300` en oscuro, `200` en bandas; offset 3 px); objetivos táctiles ≥ 44 px; iconos de `lucide-react` (cero emojis); cada icono-botón con `aria-label` traducido; tabs con patrón ARIA completo (flechas, Home/End); diálogos con Esc y retorno de foco.
