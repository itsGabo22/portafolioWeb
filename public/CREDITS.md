# Créditos y licencias de assets

## Teclado 3D (Hero y Skills)

- **Escena, modelo `assets/keyboard/keycaps.glb`, sonidos `assets/keycap-sounds/*.mp3`, logos monocromos `assets/logos/*` / `assets/keyboard/logos/*` y la lógica del cursor personalizado (`components/CustomCursor.tsx`)**: adaptados del portafolio de **Naresh Khatri** — <https://github.com/Naresh-Khatri/3d-portfolio> — publicado bajo **licencia MIT** (© 2026 Naresh Khatri). Se conserva este aviso conforme a la licencia.
- **Bongo Cat** (`assets/keyboard/bongo-frames.glb`, dos fotogramas de patas): el gato que asoma del teclado es el personaje del meme "Bongo Cat", **creación de terceros** — no es obra original del autor de este portafolio y sus derechos pertenecen a su creador. Se incluye por decisión expresa del autor como **elemento de fan, sin fines comerciales**. El archivo del modelo proviene del portafolio de Naresh Khatri citado arriba; la licencia MIT cubre ese código y archivo, **no** al personaje. Si el titular lo solicita, se retira.
- Los logos de tecnologías identifican herramientas reales que se usan en los proyectos; pertenecen a sus respectivos dueños.

## Device Lab (Projects)

- Smartwatch, teléfono, portátil y monitor son **geometría procedural** creada en código (`components/devicelab/`); no se usa ningún modelo GLB de terceros.
- Las pantallas muestran solo grabaciones propias en `public/media/<id>/` (cuando existan) o un marcador honesto generado en canvas.

## Fuera del código (sección personal)

- **Interfaz inspirada en la pantalla de inicio de PlayStation 5.** La sección recrea la *estructura, proporciones y movimiento* del menú de inicio de la consola (pestañas, fila de portadas, arte a pantalla completa, panel de trofeos). **PlayStation, PS5 y las marcas relacionadas pertenecen a Sony Interactive Entertainment**; este portafolio no tiene ninguna afiliación con Sony ni cuenta con su respaldo. Uso educativo y sin fines comerciales, para **una única presentación del curso** de Diseño de Interfaces. No se reproduce ningún logo, icono de la tienda, tipografía (SST), arte de botones del mando, arte de trofeos ni sonido de Sony: los iconos son de `lucide-react`, las fuentes son las del sitio y el "tic" opcional de la interfaz se sintetiza con WebAudio (apagado por defecto).
- **Trofeos:** las cifras (progreso, ganados y trofeos por tipo de Elden Ring, Red Dead Redemption 2, Bloodborne, Resident Evil Requiem y Death Stranding Director's Cut) son **datos de la consola del propio autor**, transcritos de sus capturas; las fotos de la TV no se publican.
- **Clásico del 11 de mayo de 2025:** el marcador (Barça 4–3 Real Madrid en Montjuïc), la presencia de Travis Scott en el palco y la camiseta con su logo Cactus Jack (colaboración del artista con Spotify y el FC Barcelona para el Clásico) se citan de la página del club: <https://www.fcbarcelona.com/en/club/news/4263015/travis-scott-in-the-crowd-at-montjuic>. La página da el 11 de mayo de 2025 como fecha de publicación y sitúa el partido "el domingo"; no se añade ningún otro dato.
- **Arte opcional:** los archivos de `public/images/ps5Menu/` (cuando existan) los aporta el autor y se optimizan con `npm run ps5:images`; los derechos siguen siendo de sus titulares. Mientras no haya arte, Resident Evil Requiem, Death Stranding Director's Cut, Nexo: Protocolo Sombra, Pedri y el Clásico usan una portada tipográfica.
- **Paletas, texturas y composiciones de los moods son interpretaciones originales** del ambiente general de cada artista, juego y club. No se usan portadas de álbumes, logos, escudos, tipografías oficiales, letras de canciones ni fotos de jugadores.
- **Fotografías de fondo (temporal).** Por decisión del autor, durante la presentación del curso el menú muestra fotografías e imágenes reales bajo una veladura de color (`public/images/beyond/`, interruptor `BEYOND_PHOTOS` en `components/beyond/photos.ts`; al ponerlo en `false` el menú queda 100 % tipográfico). Todas fueron redimensionadas, recortadas, recomprimidas a WebP y oscurecidas/veladas en pantalla. Las imágenes de juegos las usa el autor con ese único fin y siguen siendo propiedad de sus dueños:
  - `joji.webp` — ["Joji Performing Live in 2018"](https://commons.wikimedia.org/wiki/File:Joji_Performing_Live_in_2018.png), foto de **Samuel Kenwright**, [**CC BY 2.0**](https://creativecommons.org/licenses/by/2.0/), Wikimedia Commons.
  - `radiohead.webp` — ["2025 Radiohead live concert at Uber Arena, Berlin 92"](https://commons.wikimedia.org/wiki/File:2025_Radiohead_live_concert_at_Uber_Arena,_Berlin_92.jpg), foto de **Raph_PH**, [**CC BY 4.0**](https://creativecommons.org/licenses/by/4.0/), Wikimedia Commons.
  - `macdemarco.webp` — ["2021 Shaky Knees - Mac DeMarco (5)"](https://commons.wikimedia.org/wiki/File:2021_Shaky_Knees_-_Mac_DeMarco_(5).jpg), foto de **Thomson200**, [**CC0**](https://creativecommons.org/publicdomain/zero/1.0/) (dominio público), Wikimedia Commons.
  - `barca.webp` — ["2014. Camp Nou. Més que un club. Barcelona B40"](https://commons.wikimedia.org/wiki/File:2014._Camp_Nou._M%C3%A9s_que_un_club._Barcelona_B40.jpg), foto de **Luis Miguel Bugallo Sánchez (Lmbuga)**, [**CC BY-SA 3.0**](https://creativecommons.org/licenses/by-sa/3.0/), Wikimedia Commons. Se recortó la franja superior (escudo y vallas de patrocinadores) y se desenfocó la línea de vallas publicitarias restante, para que no aparezcan escudos ni marcas; la versión adaptada se comparte bajo la misma licencia CC BY-SA 3.0.
  - `rdr2.webp` / `rdr2-tile.webp` — captura oficial de *Red Dead Redemption 2* (página de Steam), **© Rockstar Games / Take-Two Interactive**.
  - `skyrim.webp` / `skyrim-tile.webp` — captura oficial de *The Elder Scrolls V: Skyrim Special Edition* (página de Steam), **© Bethesda Softworks / ZeniMax Media**.
  - `eldenring.webp` / `eldenring-tile.webp` — captura oficial de *Elden Ring* (página de Steam), **© Bandai Namco Entertainment / FromSoftware**.
  - `bloodborne.webp` / `bloodborne-tile.webp` — arte promocional oficial de *Bloodborne* (PlayStation Store), **© Sony Interactive Entertainment / FromSoftware**.
  - Las imágenes de videojuegos **no tienen licencia libre**: se muestran como elemento de fan, sin fines comerciales, de forma temporal y se retiran a petición del titular.
- Los nombres (Joji, Radiohead, Mac DeMarco, Elden Ring, Red Dead Redemption 2, Bloodborne, Resident Evil Requiem, Death Stranding Director's Cut, Skyrim, FC Barcelona, Pedri, Real Madrid, Travis Scott, Cactus Jack, Spotify) aparecen solo como texto para identificar gustos personales o citar un hecho; las marcas pertenecen a sus titulares.
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
