import type { BilingualText } from "./projects";

/**
 * Direct download URLs of published GitHub Releases, keyed by project id.
 * A button is rendered ONLY when `url` is non-empty. Fill after the release exists:
 * https://github.com/itsGabo22/<Repo>/releases/download/v1.0.0/<file>
 */
export interface ReleaseLink {
  label: BilingualText;
  url: string;
}

export const RELEASE_LINKS: Record<string, ReleaseLink> = {
  "wgo-smartwatch": { label: { es: "Descargar APK (Wear OS)", en: "Download APK (Wear OS)" }, url: "https://github.com/itsGabo22/WGO/releases/download/v1.0.0/WGO-1.0.0.apk" },
  "gamerbox-ai": { label: { es: "Descargar APK", en: "Download APK" }, url: "https://github.com/itsGabo22/GamerBox/releases/download/v1.0.0/GamerBox-1.0.0.apk" },
  "ocioflex-desktop": { label: { es: "Descargar instalador (Windows)", en: "Download installer (Windows)" }, url: "https://github.com/itsGabo22/OcioFlex/releases/download/v1.0.0/OcioFlex_1.0.0_x64-setup.exe" },
  "nexo-protocolo-sombra": { label: { es: "Descargar juego (Windows)", en: "Download game (Windows)" }, url: "https://github.com/itsGabo22/NexoProtocoloSombra/releases/download/v1.0.0/NexoProtocoloSombra-v1.0.0-win64.zip" },
};
