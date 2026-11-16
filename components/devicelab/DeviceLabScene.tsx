"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { drawPlaceholderScreen, type DeviceKind, type LabItem, type ScreenCopy } from "./shared";

const SPACING = 5.2;
const BODY = "#18181b";
const BODY_EDGE = "#27272a";
const ACCENT = new THREE.Color("#10b981");

interface SceneProps {
  items: LabItem[];
  copies: ScreenCopy[];
  progressRef: RefObject<number>;
  focusIndex: number | null;
  activeIndex: number;
  playing: boolean;
  onSelect: (index: number) => void;
  onHover: (index: number | null) => void;
}

/** Screen texture: real demo video/poster when present, else the honest placeholder. */
function useScreenTexture(item: LabItem, copy: ScreenCopy, playing: boolean) {
  const placeholder = useMemo(() => {
    const canvas = document.createElement("canvas");
    drawPlaceholderScreen(canvas, item.kind, copy);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    return texture;
  }, [item.kind, copy]);
  useEffect(() => () => placeholder.dispose(), [placeholder]);

  const [poster, setPoster] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    if (!item.media?.poster) return;
    let disposed = false;
    let loaded: THREE.Texture | null = null;
    new THREE.TextureLoader().load(item.media.poster, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      loaded = texture;
      if (disposed) texture.dispose();
      else setPoster(texture);
    });
    return () => {
      disposed = true;
      loaded?.dispose();
    };
  }, [item.media?.poster]);

  const [video, setVideo] = useState<THREE.VideoTexture | null>(null);
  useEffect(() => {
    const src = item.media?.video;
    if (!src || !playing) return;
    const element = document.createElement("video");
    element.muted = true;
    element.loop = true;
    element.playsInline = true;
    element.preload = "none";
    element.crossOrigin = "anonymous";
    element.src = src;
    const texture = new THREE.VideoTexture(element);
    texture.colorSpace = THREE.SRGBColorSpace;
    element.play().then(() => setVideo(texture)).catch(() => {});
    return () => {
      element.pause();
      element.removeAttribute("src");
      element.load();
      texture.dispose();
      setVideo(null);
    };
  }, [item.media?.video, playing]);

  return video ?? poster ?? placeholder;
}

function ScreenPlane({
  item,
  copy,
  playing,
  size,
  position,
  rotation,
  circle,
}: {
  item: LabItem;
  copy: ScreenCopy;
  playing: boolean;
  size: [number, number];
  position: [number, number, number];
  rotation?: [number, number, number];
  circle?: boolean;
}) {
  const map = useScreenTexture(item, copy, playing);
  return (
    <mesh position={position} rotation={rotation}>
      {circle ? <circleGeometry args={[size[0] / 2, 64]} /> : <planeGeometry args={size} />}
      <meshBasicMaterial map={map} toneMapped={false} />
    </mesh>
  );
}

function useRounded(w: number, h: number, d: number, r: number) {
  const geometry = useMemo(() => new RoundedBoxGeometry(w, h, d, 4, r), [w, h, d, r]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return geometry;
}

function Body({ geometry, highlight, color = BODY }: { geometry: THREE.BufferGeometry; highlight: number; color?: string }) {
  const material = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(() => {
    const m = material.current;
    if (!m) return;
    m.emissiveIntensity += (highlight * 0.09 - m.emissiveIntensity) * 0.12;
  });
  return (
    <mesh geometry={geometry} castShadow>
      <meshStandardMaterial
        ref={material}
        color={color}
        roughness={0.38}
        metalness={0.55}
        emissive={ACCENT}
        emissiveIntensity={0}
      />
    </mesh>
  );
}

function Watch(props: DeviceProps) {
  const strap = useRounded(1.05, 1.5, 0.22, 0.1);
  const body = useMemo(() => new THREE.CylinderGeometry(1.05, 1.05, 0.36, 64), []);
  useEffect(() => () => body.dispose(), [body]);
  return (
    <group>
      <mesh geometry={strap} position={[0, 1.55, -0.05]}>
        <meshStandardMaterial color={BODY_EDGE} roughness={0.85} />
      </mesh>
      <mesh geometry={strap} position={[0, -1.55, -0.05]}>
        <meshStandardMaterial color={BODY_EDGE} roughness={0.85} />
      </mesh>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <Body geometry={body} highlight={props.highlight} />
      </group>
      <mesh position={[1.1, 0.15, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.22, 24]} />
        <meshStandardMaterial color={BODY_EDGE} metalness={0.7} roughness={0.3} />
      </mesh>
      <ScreenPlane {...props} size={[1.8, 1.8]} position={[0, 0, 0.185]} circle />
    </group>
  );
}

function Phone(props: DeviceProps) {
  const body = useRounded(1.6, 3.2, 0.2, 0.18);
  return (
    <group>
      <Body geometry={body} highlight={props.highlight} />
      <ScreenPlane {...props} size={[1.44, 3.0]} position={[0, 0, 0.105]} />
    </group>
  );
}

/** Soft top-left glass sheen laid over a screen (original artwork, one tiny canvas texture shared by all). */
let sheenTexture: THREE.CanvasTexture | null = null;
function getSheen(): THREE.CanvasTexture {
  if (sheenTexture) return sheenTexture;
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,0.22)");
  g.addColorStop(0.42, "rgba(255,255,255,0.05)");
  g.addColorStop(0.43, "rgba(255,255,255,0)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  sheenTexture = new THREE.CanvasTexture(canvas);
  return sheenTexture;
}

let haloTexture: THREE.CanvasTexture | null = null;
function getHalo(): THREE.CanvasTexture {
  if (haloTexture) return haloTexture;
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(64, 64, 8, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,0.9)");
  g.addColorStop(0.55, "rgba(255,255,255,0.25)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  haloTexture = new THREE.CanvasTexture(canvas);
  return haloTexture;
}

function Sheen({ size, position }: { size: [number, number]; position: [number, number, number] }) {
  return (
    <mesh position={position} renderOrder={2}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={getSheen()} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

/** Key rows as relative widths (ANSI-like layout); each row is normalised to the full deck width. */
const KEY_ROWS: number[][] = [
  Array(14).fill(1),
  [...Array(13).fill(1), 2],
  [1.5, ...Array(12).fill(1), 1.5],
  [1.75, ...Array(11).fill(1), 2.25],
  [2.25, ...Array(10).fill(1), 2.75],
  [1.25, 1.25, 1.25, 6.25, 1.25, 1.25, 1, 1, 1],
];

/** Every keycap of a keyboard deck in ONE InstancedMesh: width x depth in world units, key bottoms at y = 0. */
function KeyDeck({
  width,
  depth,
  keyColor = "#3a3a46",
  position,
  glow,
}: {
  width: number;
  depth: number;
  keyColor?: string;
  position: [number, number, number];
  glow?: React.Ref<THREE.MeshStandardMaterial>;
}) {
  const geometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = KEY_ROWS.reduce((n, row) => n + row.length, 0);
  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const rows = KEY_ROWS.length;
    const pitchZ = depth / rows;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const pos = new THREE.Vector3();
    const scale = new THREE.Vector3();
    let i = 0;
    KEY_ROWS.forEach((row, r) => {
      const total = row.reduce((a, b) => a + b, 0);
      const unit = width / total;
      let x = -width / 2;
      const z = -depth / 2 + pitchZ * (r + 0.5);
      const h = r === 0 ? 0.035 : 0.05;
      row.forEach((w) => {
        const kw = w * unit;
        pos.set(x + kw / 2, h / 2, z);
        scale.set(Math.max(0.03, kw - unit * 0.16), h, pitchZ * (r === 0 ? 0.62 : 0.84));
        m.compose(pos, q, scale);
        mesh.setMatrixAt(i++, m);
        x += kw;
      });
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [width, depth]);
  return (
    <instancedMesh ref={ref} args={[geometry, undefined, count]} position={position}>
      <meshStandardMaterial
        ref={glow}
        color={keyColor}
        roughness={0.5}
        metalness={0.2}
        emissive="#6366f1"
        emissiveIntensity={glow ? 0.3 : 0}
      />
    </instancedMesh>
  );
}

function Laptop(props: DeviceProps) {
  const lid = useRounded(3.9, 2.45, 0.1, 0.06);
  const base = useRounded(3.9, 0.16, 2.6, 0.07);
  const pad = useRounded(1.1, 0.02, 0.62, 0.04);
  const hinge = useMemo(() => new THREE.CylinderGeometry(0.07, 0.07, 3.1, 20), []);
  useEffect(() => () => hinge.dispose(), [hinge]);
  // Tilted toward the camera so the keyboard deck is visible; the lid still leans back ~7 degrees net.
  return (
    <group position={[0, -1.15, -0.7]} rotation={[0.3, 0, 0]}>
      <group position={[0, 0, 1.3]}>
        <Body geometry={base} highlight={props.highlight} color={LAPTOP} />
        {/* key well + keycaps */}
        <mesh position={[0, 0.082, -0.15]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.62, 1.5]} />
          <meshStandardMaterial color="#17171d" roughness={0.9} />
        </mesh>
        <KeyDeck width={3.5} depth={1.4} keyColor="#8b8d99" position={[0, 0.082, -0.15]} />
        {/* trackpad */}
        <mesh geometry={pad} position={[0, 0.085, 0.95]}>
          <meshStandardMaterial color="#6b6d79" roughness={0.25} metalness={0.5} />
        </mesh>
      </group>
      {/* hinge barrel */}
      <mesh geometry={hinge} position={[0, 0.07, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#0c0c10" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* lid pivots on the hinge */}
      <group position={[0, 0.08, 0]} rotation={[-0.42, 0, 0]}>
        <group position={[0, 1.25, 0]}>
          <Body geometry={lid} highlight={props.highlight} color={LAPTOP} />
          <ScreenPlane {...props} size={[3.6, 2.2]} position={[0, 0.02, 0.055]} />
          <Sheen size={[3.6, 2.2]} position={[0, 0.02, 0.058]} />
        </group>
      </group>
    </group>
  );
}

const LAPTOP = "#4b4d57";
const RGB = new THREE.Color();
/** Slow cyan, blue, violet, magenta drift (the portfolio's indigo family), never a full rainbow. */
function rgbAt(t: number, offset = 0, lightness = 0.55) {
  return RGB.setHSL(0.62 + Math.sin(t * 0.45 + offset) * 0.18, 0.85, lightness);
}

function Monitor(props: DeviceProps) {
  const panel = useRounded(4.3, 2.46, 0.12, 0.05);
  const leg = useRounded(0.11, 1.5, 0.08, 0.03);
  const foot = useRounded(2.1, 0.06, 0.8, 0.03);
  const desk = useRounded(6.2, 0.08, 3.4, 0.04);
  const tower = useRounded(1.2, 2.55, 2.3, 0.07);
  const mouse = useRounded(0.2, 0.09, 0.34, 0.07);
  const board = useRounded(3.6, 0.07, 1.25, 0.05);
  const ring = useMemo(() => new THREE.TorusGeometry(0.36, 0.03, 12, 48), []);
  const hub = useMemo(() => new THREE.CylinderGeometry(0.1, 0.1, 0.03, 20), []);
  useEffect(
    () => () => {
      ring.dispose();
      hub.dispose();
    },
    [ring, hub]
  );

  const strip = useRef<THREE.MeshStandardMaterial>(null);
  const back = useRef<THREE.MeshBasicMaterial>(null);
  const fans = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const deckGlow = useRef<THREE.MeshStandardMaterial>(null);
  const rings = useRef<(THREE.Mesh | null)[]>([]);
  const reduce = useMemo(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  useFrame((state) => {
    const t = reduce ? 0 : state.clock.elapsedTime;
    const c = rgbAt(t, 0);
    if (strip.current) {
      strip.current.color.copy(c);
      strip.current.emissive.copy(c);
    }
    if (back.current) back.current.color.copy(c);
    fans.current.forEach((m, i) => {
      if (!m) return;
      const col = rgbAt(t, i * 0.9 + 0.6);
      m.color.copy(col);
      m.emissive.copy(col);
    });
    if (deckGlow.current) deckGlow.current.emissive.copy(rgbAt(t, 2.2, 0.5));
    rings.current.forEach((r, i) => {
      if (r) r.rotation.z = t * (0.9 + i * 0.2);
    });
  });

  return (
    <group scale={0.72} position={[0, 0.2, 0]}>
    <group position={[-1.0, 0.25, 0]}>
      {/* soft RGB halo behind the screen */}
      <mesh position={[0, 0, -0.35]}>
        <planeGeometry args={[5.4, 3.6]} />
        <meshBasicMaterial
          ref={back}
          map={getHalo()}
          transparent
          opacity={0.55}
          depthWrite={false}
          toneMapped={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* slim-bezel gaming panel */}
      <Body geometry={panel} highlight={props.highlight} />
      <ScreenPlane {...props} size={[4.14, 2.33]} position={[0, 0, 0.065]} />
      <Sheen size={[4.14, 2.33]} position={[0, 0, 0.068]} />
      {/* RGB light bar under the chin */}
      <mesh position={[0, -1.19, 0.045]}>
        <boxGeometry args={[1.5, 0.025, 0.02]} />
        <meshStandardMaterial ref={strip} color="#6366f1" emissive="#6366f1" emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
      {/* V-shaped stand + wide foot */}
      <mesh geometry={leg} position={[-0.42, -1.75, -0.28]} rotation={[0, 0, 0.32]}>
        <meshStandardMaterial color="#2c2c35" metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh geometry={leg} position={[0.42, -1.75, -0.28]} rotation={[0, 0, -0.32]}>
        <meshStandardMaterial color="#2c2c35" metalness={0.2} roughness={0.4} />
      </mesh>
      <mesh geometry={foot} position={[0, -2.28, -0.12]}>
        <meshStandardMaterial color="#2c2c35" metalness={0.2} roughness={0.4} />
      </mesh>

      {/* desk, mouse pad, keyboard and mouse silhouettes */}
      <mesh geometry={desk} position={[1.2, -2.36, 0.4]}>
        <meshStandardMaterial color="#23232b" roughness={0.9} metalness={0} />
      </mesh>
      <mesh geometry={board} position={[-0.1, -2.31, 1.15]}>
        <meshStandardMaterial color="#17171d" roughness={0.9} />
      </mesh>
      <KeyDeck width={1.9} depth={0.62} position={[-0.55, -2.275, 1.1]} glow={deckGlow} />
      <mesh geometry={mouse} position={[1.05, -2.26, 1.12]}>
        <meshStandardMaterial color="#1f1f27" roughness={0.4} metalness={0.4} />
      </mesh>

      {/* tempered-glass tower with fan rings */}
      <group position={[3.2, -1.03, -0.15]} rotation={[0, 0.55, 0]}>
        <mesh geometry={tower}>
          <meshStandardMaterial color="#34343f" roughness={0.5} metalness={0.15} />
        </mesh>
        <mesh position={[-0.68, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[2.1, 2.4]} />
          <meshPhysicalMaterial color="#1b2236" transparent opacity={0.32} roughness={0.08} metalness={0.2} clearcoat={1} />
        </mesh>
        {[0.78, 0, -0.78].map((y, i) => (
          <group key={i} position={[-0.64, y, 0.35]} rotation={[0, -Math.PI / 2, 0]}>
            <mesh
              geometry={ring}
              ref={(el) => {
                rings.current[i] = el;
              }}
            >
              <meshStandardMaterial
                ref={(el) => {
                  fans.current[i] = el;
                }}
                color="#6366f1"
                emissive="#6366f1"
                emissiveIntensity={1.4}
                toneMapped={false}
              />
            </mesh>
            <mesh geometry={hub} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#09090b" roughness={0.5} metalness={0.6} />
            </mesh>
          </group>
        ))}
        {/* power light on the front-top */}
        <mesh position={[0, 1.05, 1.16]}>
          <boxGeometry args={[0.5, 0.03, 0.02]} />
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.9} toneMapped={false} />
        </mesh>
      </group>
    </group>
    </group>
  );
}

interface DeviceProps {
  item: LabItem;
  copy: ScreenCopy;
  playing: boolean;
  highlight: number;
}

const DEVICES: Record<DeviceKind, (props: DeviceProps) => React.ReactElement> = {
  watch: Watch,
  phone: Phone,
  laptop: Laptop,
  monitor: Monitor,
};

function Rig({
  items,
  copies,
  progressRef,
  focusIndex,
  activeIndex,
  playing,
  onSelect,
  onHover,
}: SceneProps) {
  const groups = useRef<(THREE.Group | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const count = items.length;

  useFrame((state, delta) => {
    const camera = state.camera;
    const scrollPos = (progressRef.current ?? 0) * (count - 1);
    const pos = focusIndex ?? scrollPos;
    const targetX = pos * SPACING;
    const ease = 1 - Math.pow(0.0025, delta);
    camera.position.x += (targetX - camera.position.x) * ease;
    camera.position.y += (0.35 - camera.position.y) * ease;
    camera.lookAt(camera.position.x, 0, 0);
    // Which device is centered (QA hook; only written when it changes).
    const centered = String(Math.round(camera.position.x / SPACING));
    const canvas = state.gl.domElement;
    if (canvas.dataset.centered !== centered) canvas.dataset.centered = centered;

    const t = state.clock.elapsedTime;
    groups.current.forEach((group, index) => {
      if (!group) return;
      const offset = index * SPACING - camera.position.x;
      // turntable: devices face the camera when centered, turn away at the sides
      group.rotation.y = THREE.MathUtils.clamp(-offset * 0.16, -0.7, 0.7) + Math.sin(t * 0.6 + index) * 0.04;
      group.position.y = Math.sin(t * 0.9 + index * 1.3) * 0.08;
      const s = hovered === index ? 1.04 : 1;
      group.scale.setScalar(group.scale.x + (s - group.scale.x) * 0.15);
    });
  });

  const enter = (index: number) => (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    setHovered(index);
    onHover(index);
    document.body.style.cursor = "pointer";
  };
  const leave = () => {
    setHovered(null);
    onHover(null);
    document.body.style.cursor = "";
  };
  useEffect(() => () => {
    document.body.style.cursor = "";
  }, []);

  return (
    <>
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#e6fff5", "#0b0b10", 0.6]} />
      <directionalLight position={[4, 6, 8]} intensity={1.6} />
      <directionalLight position={[-6, 2, -4]} intensity={0.6} color="#818cf8" />
      {items.map((item, index) => {
        const Device = DEVICES[item.kind];
        const highlight = hovered === index || activeIndex === index ? 1 : 0;
        return (
          <group
            key={item.project.id}
            position={[index * SPACING, 0, 0]}
            ref={(el) => {
              groups.current[index] = el;
            }}
            onPointerOver={enter(index)}
            onPointerOut={leave}
            onClick={(event) => {
              event.stopPropagation();
              onSelect(index);
            }}
          >
            <Device item={item} copy={copies[index]} playing={playing} highlight={highlight} />
          </group>
        );
      })}
    </>
  );
}

export default function DeviceLabScene(props: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={props.playing ? "always" : "never"}
      camera={{ position: [0, 0.35, 9.5], fov: 34, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <Rig {...props} />
    </Canvas>
  );
}
