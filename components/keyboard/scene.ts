import headingMetrics from "./heading-metrics.json";
import { addCounterModel, type CounterModel } from "./counter-model";
import { createKeyWell } from "./key-well";
import type { KeyboardSkillData } from "./keyboard-skills";
import {
  createDocument,
  createMaterial,
  newId,
  type ChibiDocument,
  type ChibiMaterial,
  type ChibiNode,
  type Vec3,
} from "@chibi3d/runtime/schema";

export type KeyboardSkill = KeyboardSkillData;

export type BilingualLabelIds = {
  es: string;
  en: string;
};

export type KeyboardKey = {
  skill: KeyboardSkill;
  nodeId: string;
  motionId: string;
  materialId: string;
  pressedStateId: string;
  labelId: BilingualLabelIds;
};

export type KeyboardScene = {
  document: ChibiDocument;
  keys: KeyboardKey[];
  boardId: string;
  spinId: string;
  revealId: string;
  catId: string;
  frameIds: [string, string];
  labelsId: string;
  defaultLabelId: BilingualLabelIds;
  allLabelIds: string[];
  pointerTargets: string[];
  counter: CounterModel;
  counterId: string;
  columns: number;
  caseMaterialId: string;
  plateMaterialId: string;
  textMaterialId: string;
};

// Geometry contract of assets/keyboard/keycaps.glb, in key-width units.
const KIT = {
  pitch: 1.04468,
  keyY: 1.21117,
  keyHeight: 0.7629,
  logoY: 0.13985,
  keyTop: 0.13102987408638,
  cutX: 3.189,
  cutZ: 2.053,
  halfW: 3.67448,
  halfD: 2.57744,
};

export const KEYBOARD_MODEL_URL = "/assets/keyboard/keycaps.glb";

export function createKeyboardScene(
  skills: readonly KeyboardSkill[],
  columns = 6
): KeyboardScene {
  if (!skills.length || skills.length > 96) {
    throw new RangeError("Choose between 1 and 96 keyboard skills");
  }
  if (!Number.isInteger(columns) || columns < 1 || columns > 12) {
    throw new RangeError("Keyboard columns must be between 1 and 12");
  }
  if (new Set(skills.map((s) => s.name)).size !== skills.length) {
    throw new Error("Keyboard skill names must be unique");
  }

  const cols = Math.min(columns, skills.length);
  const rows = Math.ceil(skills.length / cols);
  const doc = createDocument("Gabriel Paz Portfolio 3D Keyboard");
  doc.root = [];
  doc.nodes = {};
  doc.materials = {};
  doc.environment = {
    ...doc.environment,
    preset: "product",
    shadows: true,
    softShadows: true,
    exposure: 0.96,
    toneMapping: "linear",
    ao: false,
    bloom: false,
  };
  doc.camera = {
    position: [-9, 9.6, 9],
    target: [0, 0.6, 0],
    fov: 36,
    parallax: 0,
  };
  doc.editor.grid = false;

  const assetId = newId("as");
  doc.assets[assetId] = {
    id: assetId,
    kind: "glb",
    name: "keycaps.glb",
    hash: "0101f5f6f7ac426e0cca9bdbc1c96a752b06b03d9d24d3553209a44b028f3b8e",
    size: 204284,
  };

  const add = (node: ChibiNode, parent?: string) => {
    doc.nodes[node.id] = node;
    (parent ? doc.nodes[parent].children : doc.root).push(node.id);
    return node.id;
  };
  const transform = (
    position: Vec3 = [0, 0, 0],
    scale: Vec3 = [1, 1, 1]
  ) => ({
    position,
    rotation: [0, 0, 0] as Vec3,
    scale,
  });
  const group = (
    name: string,
    parent?: string,
    position?: Vec3,
    scale?: Vec3
  ) =>
    add(
      {
        id: newId("nd"),
        name,
        type: "group",
        visible: true,
        transform: transform(position, scale),
        children: [],
      },
      parent
    );
  const material = (name: string, patch: Partial<ChibiMaterial>) => {
    const id = newId("mt");
    doc.materials[id] = { ...createMaterial(id, name), ...patch };
    return id;
  };
  const model = (
    name: string,
    path: string,
    materialId: string,
    parent: string,
    position?: Vec3,
    scale?: Vec3
  ) =>
    add(
      {
        id: newId("nd"),
        name,
        type: "model",
        assetId,
        path,
        materialId,
        visible: true,
        castShadow: true,
        receiveShadow: true,
        children: [],
        transform: transform(position, scale),
      },
      parent
    );

  for (const [name, position, intensity, castShadow] of [
    ["Key light", [-6, 9, -2], 2.9, true],
    ["Fill", [5, 7, 6], 0.32, false],
  ] as const) {
    add({
      id: newId("nd"),
      name,
      type: "light",
      visible: true,
      children: [],
      transform: transform([...position]),
      light: {
        kind: "directional",
        color: "#ffffff",
        intensity,
        castShadow,
      },
    });
  }

  const boardId = group(
    "Keyboard placement",
    undefined,
    [1.8, 0.42, 1.8],
    [0.84, 0.84, 0.84]
  );
  doc.nodes[boardId].visible = true;
  const revealId = group("Keyboard reveal", boardId);
  const spinId = group("Keyboard rotation", revealId);
  const innerX = KIT.cutX + ((cols - 6) * KIT.pitch) / 2;
  const innerZ = KIT.cutZ + ((rows - 4) * KIT.pitch) / 2;
  const span = innerX + innerZ + KIT.halfW - KIT.cutX + KIT.halfD - KIT.cutZ;
  const fit = Math.min(1.2, (KIT.halfW + KIT.halfD) / span);
  const keyboardCenterY = (KIT.keyY + KIT.keyTop) / 2;
  const layout = group(
    "Keyboard layout",
    spinId,
    [0, -keyboardCenterY * fit, 0],
    [fit, fit, fit]
  );

  // Default Light Mode: Teenage Engineering / Apple Studio Anodized Silver-Alabaster Chassis
  const caseMaterialId = material("Case", {
    color: "#e4e4e7",
    roughness: 0.36,
    metalness: 0.14,
    clearcoat: 0.18,
    clearcoatRoughness: 0.28,
  });
  const counterId = group("Left side counter", layout);
  doc.nodes[counterId].visible = true;
  const outerX = innerX + KIT.halfW - KIT.cutX;
  const outerZ = innerZ + KIT.halfD - KIT.cutZ;
  const counter = addCounterModel(doc, counterId, [
    -outerX - 0.003,
    0.36,
    -0.3,
  ]);
  const well = createKeyWell(
    outerX,
    outerZ,
    (cols - 1) * KIT.pitch + 1,
    (rows - 1) * KIT.pitch + 1
  );
  const plateMaterialId = material("Recessed switch plate", {
    color: "#27272a",
    roughness: 0.72,
  });

  for (const [name, geometry, materialId, x] of [
    ["Case left edge", well.edge, caseMaterialId, 0],
    ["Case top rim", well.shelf, caseMaterialId, well.shelfCenter],
    ["Case body", well.body, caseMaterialId, 0],
    ["Recessed switch plate", well.plate, plateMaterialId, 0],
  ] as const) {
    const position: Vec3 = [x, 0, 0];
    const scale: Vec3 = [1, 1, 1];
    add(
      {
        id: newId("nd"),
        name,
        type: "mesh",
        geometry,
        materialId,
        visible: true,
        castShadow: true,
        receiveShadow: true,
        children: [],
        transform: transform(position, scale),
      },
      layout
    );
  }

  // 3D Extruded Skill Labels — Hidden in #hero so they NEVER collide with HTML Hero text; revealed in #skills
  const labelsId = group("Skill labels", layout, [
    -outerX + KIT.pitch / 2,
    1.15,
    -outerZ - 0.75,
  ]);
  doc.nodes[labelsId].visible = false;

  const textMaterialId = material("Skill text", {
    color: "#065f46",
    roughness: 0.35,
    metalness: 0.12,
  });

  const allLabelIds: string[] = [];

  const createSingleLabel = (
    title: string,
    description: string,
    langTag: string
  ) => {
    const id = group(`Label ${title} (${langTag})`, labelsId);
    doc.nodes[id].visible = false;
    allLabelIds.push(id);
    const bounds = headingBounds(title);
    const size = Math.min(0.62, 4.8 / Math.max(bounds.width, 1));
    add(
      {
        id: newId("nd"),
        name: `Heading ${title} (${langTag})`,
        type: "mesh",
        materialId: textMaterialId,
        geometry: {
          kind: "text3d",
          params: { text: title, size, depth: 0.1, bevel: 0.005 },
        },
        transform: {
          ...transform([-bounds.left * size, 0, -0.68]),
          rotation: [-Math.PI / 2, 0, 0],
        },
        visible: true,
        castShadow: true,
        receiveShadow: true,
        children: [],
      },
      id
    );
    const descriptionId = newId("as");
    doc.assets[descriptionId] = {
      id: descriptionId,
      kind: "texture",
      name: descriptionArtwork(description),
      hash: `description-${id}`,
      size: 0,
    };
    const descriptionMaterial = material(`Description ${title} (${langTag})`, {
      color: "#ffffff",
      roughness: 1,
      transparent: true,
      maps: { map: descriptionId, normalMap: null, roughnessMap: null },
    });
    add(
      {
        id: newId("nd"),
        name: `Description ${title} (${langTag})`,
        type: "mesh",
        materialId: descriptionMaterial,
        geometry: { kind: "plane", params: { width: 5.0, height: 1.45 } },
        transform: {
          ...transform([2.5, 0, 0.15]),
          rotation: [-Math.PI / 2, 0, 0],
        },
        visible: true,
        castShadow: false,
        receiveShadow: false,
        children: [],
      },
      id
    );
    return id;
  };

  const createBilingualLabel = (
    titleEs: string,
    descEs: string,
    titleEn: string,
    descEn: string
  ): BilingualLabelIds => ({
    es: createSingleLabel(titleEs, descEs, "es"),
    en: createSingleLabel(titleEn, descEn, "en"),
  });

  const defaultLabelId = createBilingualLabel(
    "Explora mis skills",
    "Pasa el cursor, haz clic o presiona una tecla",
    "Explore my skills",
    "Hover, tap, or press any key on your keyboard"
  );
  doc.nodes[defaultLabelId.es].visible = true;

  const keys = skills.map((skill, index): KeyboardKey => {
    const slot = group(`Slot ${skill.name}`, layout, [
      ((index % cols) - (cols - 1) / 2) * KIT.pitch,
      KIT.keyY,
      (Math.floor(index / cols) - (rows - 1) / 2) * KIT.pitch,
    ]);
    const motionId = group(`Motion ${skill.name}`, slot);
    const capColor = skill.keyboardColor ?? skill.color;
    const color = /^#[0-9a-f]{3}$/i.test(capColor)
      ? `#${capColor
          .slice(1)
          .split("")
          .map((c: string) => c + c)
          .join("")}`
      : capColor;
    const materialId = material(`Key ${skill.name}`, {
      color,
      roughness: 0.3,
      clearcoat: 0.18,
      clearcoatRoughness: 0.3,
    });
    const nodeId = model(skill.name, "0", materialId, motionId);
    if (skill.icon) {
      const iconId = newId("as");
      doc.assets[iconId] = {
        id: iconId,
        kind: "texture",
        name: skill.icon,
        hash: `icon-${skill.name}`,
        size: 0,
      };
      const logoMaterial = material(`Logo ${skill.name}`, {
        color: "#ffffff",
        roughness: 0.55,
        transparent: true,
        maps: { map: iconId, normalMap: null, roughnessMap: null },
      });
      add(
        {
          id: newId("nd"),
          name: `Logo ${skill.name}`,
          type: "mesh",
          materialId: logoMaterial,
          geometry: { kind: "plane", params: { width: 0.52, height: 0.52 } },
          transform: {
            ...transform([0, KIT.logoY, 0]),
            rotation: [-Math.PI / 2, 0, 0],
          },
          visible: true,
          castShadow: false,
          receiveShadow: true,
          children: [],
        },
        nodeId
      );
    }
    const pressedStateId = newId("st");
    doc.states[pressedStateId] = {
      id: pressedStateId,
      nodeId,
      name: "Pressed",
      overrides: {
        [nodeId]: { "transform.position": [0, -KIT.keyHeight * 0.6, 0] },
      },
    };
    return {
      skill,
      nodeId,
      motionId,
      materialId,
      pressedStateId,
      labelId: createBilingualLabel(
        skill.label,
        skill.shortDescription.es,
        skill.label,
        skill.shortDescription.en
      ),
    };
  });

  // Keep Bongo Cat anchored to the exact Spline showcase edge from naresh_ref
  const catId = group("Bongo cat", layout, [-0.277, 2.356, outerZ - 0.631]);
  doc.nodes[catId].transform.rotation = [
    -141.199253,
    -1.535221,
    -167.469916,
  ].map((angle) => (angle * Math.PI) / 180) as Vec3;
  doc.nodes[catId].visible = false;

  const catAssetId = newId("as");
  doc.assets[catAssetId] = {
    id: catAssetId,
    kind: "glb",
    name: "/assets/keyboard/bongo-frames.glb",
    hash: "2a16506ae6e6b571fc02a73e6822345a73e15de05a5a13b86a391fafd94fa908",
    size: 28292,
  };
  const frameIds = [0, 1].map((frame) =>
    add(
      {
        id: newId("nd"),
        name: `Bongo frame ${frame + 1}`,
        type: "model",
        assetId: catAssetId,
        path: String(frame),
        transform: transform(
          [0, (-5.336 * 289) / 457 / 2, 0],
          [5.336, (5.336 * 289) / 457, 1]
        ),
        visible: frame === 0,
        castShadow: false,
        receiveShadow: false,
        children: [],
      },
      catId
    )
  ) as [string, string];

  return {
    document: doc,
    keys,
    boardId,
    spinId,
    revealId,
    catId,
    frameIds,
    labelsId,
    defaultLabelId,
    allLabelIds,
    counter,
    counterId,
    columns: cols,
    caseMaterialId,
    plateMaterialId,
    textMaterialId,
    pointerTargets: keys.map((k) => k.nodeId),
  };
}

export const resolveKeyboardAsset = async (
  asset: ChibiDocument["assets"][string]
): Promise<string> =>
  asset.name === "keycaps.glb" ? KEYBOARD_MODEL_URL : asset.name;

/** High-contrast badge texture for 3D skill descriptions in both Light Mode and Dark Mode */
function descriptionArtwork(text: string): string {
  const lines: string[] = [];
  const caption = text.trim();
  for (const word of caption.split(/\s+/)) {
    if (!lines.length || lines[lines.length - 1].length + word.length > 36) {
      lines.push(word);
    } else {
      lines[lines.length - 1] += ` ${word}`;
    }
  }
  const escape = (line: string) =>
    line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const size = Math.min(48, 200 / Math.max(lines.length, 1));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="300" viewBox="0 0 1024 300"><rect x="4" y="12" width="1016" height="276" rx="28" fill="#18181b" fill-opacity="0.92" stroke="#10b981" stroke-width="4"/><g fill="#f4f4f5" font-family="Arial, sans-serif" font-weight="600" font-size="${size}" text-anchor="start">${lines
    .map(
      (line, index) =>
        `<text x="36" y="${84 + index * size * 1.28}">${escape(line)}</text>`
    )
    .join("")}</g></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function headingBounds(text: string): { width: number; left: number } {
  const metrics: Record<string, number[]> = headingMetrics;
  let advance = 0;
  let left = Infinity;
  let right = -Infinity;
  for (const character of text) {
    const [width, min, max] = metrics[character] ?? metrics["?"];
    left = Math.min(left, advance + min);
    right = Math.max(right, advance + max);
    advance += width;
  }
  return text ? { width: right - left, left } : { width: 0, left: 0 };
}
