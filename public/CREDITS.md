# Créditos y licencias de assets

## Teclado 3D (Hero y Skills)

- **Escena, modelo `assets/keyboard/keycaps.glb`, sonidos `assets/keycap-sounds/*.mp3`, logos monocromos `assets/logos/*` / `assets/keyboard/logos/*` y la lógica del cursor personalizado (`components/CustomCursor.tsx`)**: adaptados del portafolio de **Naresh Khatri** — <https://github.com/Naresh-Khatri/3d-portfolio> — publicado bajo **licencia MIT** (© 2026 Naresh Khatri). Se conserva este aviso conforme a la licencia.
- **Bongo Cat** (`assets/keyboard/bongo-frames.glb`, dos fotogramas de patas): el gato que asoma del teclado es el personaje del meme "Bongo Cat", **creación de terceros** — no es obra original del autor de este portafolio y sus derechos pertenecen a su creador. Se incluye por decisión expresa del autor como **elemento de fan, sin fines comerciales**. El archivo del modelo proviene del portafolio de Naresh Khatri citado arriba; la licencia MIT cubre ese código y archivo, **no** al personaje. Si el titular lo solicita, se retira.
- Los logos de tecnologías identifican herramientas reales que se usan en los proyectos; pertenecen a sus respectivos dueños.

## Device Lab (Projects)

- Smartwatch, teléfono, portátil y monitor son **geometría procedural** creada en código (`components/devicelab/`); no se usa ningún modelo GLB de terceros.
- Las pantallas muestran solo grabaciones propias en `public/media/<id>/` (cuando existan) o un marcador honesto generado en canvas.

## Fuera del código (sección personal)

- **Paletas, texturas y composiciones de los moods son interpretaciones originales** del ambiente general de cada artista, juego y club. No se usan portadas de álbumes, logos, escudos, tipografías oficiales, letras de canciones ni fotos de jugadores.
- **Fotografías de fondo (temporal).** Por decisión del autor, durante la semana de exhibición del curso cada mood muestra una fotografía real detrás de una veladura de color (`public/images/beyond/`, interruptor `BEYOND_PHOTOS` en `components/beyond/photos.ts`; al ponerlo en `false` el sitio vuelve a las texturas procedurales). Todas fueron redimensionadas, recortadas, recomprimidas a WebP y oscurecidas/veladas en pantalla:
  - `joji.webp` — ["Joji Performing Live in 2018"](https://commons.wikimedia.org/wiki/File:Joji_Performing_Live_in_2018.png), foto de **Samuel Kenwright**, [**CC BY 2.0**](https://creativecommons.org/licenses/by/2.0/), Wikimedia Commons.
  - `radiohead.webp` — ["2025 Radiohead live concert at Uber Arena, Berlin 92"](https://commons.wikimedia.org/wiki/File:2025_Radiohead_live_concert_at_Uber_Arena,_Berlin_92.jpg), foto de **Raph_PH**, [**CC BY 4.0**](https://creativecommons.org/licenses/by/4.0/), Wikimedia Commons.
  - `macdemarco.webp` — ["2021 Shaky Knees - Mac DeMarco (5)"](https://commons.wikimedia.org/wiki/File:2021_Shaky_Knees_-_Mac_DeMarco_(5).jpg), foto de **Thomson200**, [**CC0**](https://creativecommons.org/publicdomain/zero/1.0/) (dominio público), Wikimedia Commons.
  - `barca.webp` — ["2014. Camp Nou. Més que un club. Barcelona B40"](https://commons.wikimedia.org/wiki/File:2014._Camp_Nou._M%C3%A9s_que_un_club._Barcelona_B40.jpg), foto de **Luis Miguel Bugallo Sánchez (Lmbuga)**, [**CC BY-SA 3.0**](https://creativecommons.org/licenses/by-sa/3.0/), Wikimedia Commons. Se recortó la franja superior (escudo y vallas de patrocinadores) y se desenfocó la línea de vallas publicitarias restante, para que no aparezcan escudos ni marcas; la versión adaptada se comparte bajo la misma licencia CC BY-SA 3.0.
  - `rdr2.webp` / `rdr2-tile.webp` — captura oficial de *Red Dead Redemption 2* (página de Steam), **© Rockstar Games / Take-Two Interactive**.
  - `skyrim.webp` / `skyrim-tile.webp` — captura oficial de *The Elder Scrolls V: Skyrim Special Edition* (página de Steam), **© Bethesda Softworks / ZeniMax Media**.
  - `eldenring.webp` / `eldenring-tile.webp` — captura oficial de *Elden Ring* (página de Steam), **© Bandai Namco Entertainment / FromSoftware**.
  - `bloodborne.webp` / `bloodborne-tile.webp` — arte promocional oficial de *Bloodborne* (PlayStation Store), **© Sony Interactive Entertainment / FromSoftware**.
  - Las imágenes de videojuegos **no tienen licencia libre**: se muestran como elemento de fan, sin fines comerciales, de forma temporal y se retiran a petición del titular.
- El menú de juegos imita el *estilo* de una pantalla de inicio de consola (fila de portadas, arte a pantalla completa); no usa logos, iconos, sonidos ni tipografías de ninguna consola.
- Los nombres (Joji, Radiohead, Mac DeMarco, Red Dead Redemption 2, Skyrim, Elden Ring, Bloodborne, FC Barcelona) aparecen solo como texto para identificar gustos personales; las marcas pertenecen a sus titulares.
- FC Barcelona: se usan únicamente los colores `#004D98` y `#A50044` como color plano (sin escudo ni logos de patrocinadores o equipación).
- Texturas (grano, papel, niebla, nieve, brasas, franjas) generadas con CSS y filtros SVG `feTurbulence` en `components/beyond/beyond.css`.
- **Spotify:** el reproductor embebido es contenido de terceros que solo se carga cuando la persona pulsa "Reproducir"; se rige por los términos de Spotify.

## Archivos propios

- `cv.pdf`, `images/avatar.jpeg` e `images/avatar.svg`: CV y foto de perfil del autor.

## Capturas de proyectos

- `images/projects/*.png` son capturas de pantalla hechas por el autor de sus proyectos y de los sitios públicos que desarrolló para clientes.

## Tipografías

- **Bricolage Grotesque** y **IBM Plex Sans** — SIL Open Font License 1.1 (servidas mediante `next/font/google`, autoalojadas en el build).
- **Archivo Black** (`fonts/ArchivoBlack-OFL.txt`, `fonts/helvetiker_regular.typeface.json` con glifos de Archivo Black) — SIL Open Font License 1.1, © The Archivo Black Project Authors.

## Iconos

- **lucide-react** — licencia ISC.
- Marcas de GitHub y LinkedIn usadas solo para enlazar los perfiles del autor.
