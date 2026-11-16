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

function Body({ geometry, highlight }: { geometry: THREE.BufferGeometry; highlight: number }) {
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
        color={BODY}
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

function Laptop(props: DeviceProps) {
  const lid = useRounded(3.9, 2.45, 0.1, 0.06);
  const base = useRounded(3.9, 0.14, 2.5, 0.06);
  return (
    <group position={[0, -0.2, 0]}>
      <group position={[0, -1.15, 0.9]}>
        <Body geometry={base} highlight={props.highlight} />
      </group>
      <group position={[0, 0, 0]} rotation={[-0.12, 0, 0]}>
        <Body geometry={lid} highlight={props.highlight} />
        <ScreenPlane {...props} size={[3.6, 2.2]} position={[0, 0.02, 0.055]} />
      </group>
    </group>
  );
}

function Monitor(props: DeviceProps) {
  const panel = useRounded(4.2, 2.5, 0.14, 0.06);
  const neck = useRounded(0.3, 1.1, 0.16, 0.05);
  const foot = useRounded(1.7, 0.08, 0.9, 0.04);
  return (
    <group position={[0, 0.25, 0]}>
      <Body geometry={panel} highlight={props.highlight} />
      <ScreenPlane {...props} size={[3.96, 2.24]} position={[0, 0, 0.075]} />
      <mesh geometry={neck} position={[0, -1.7, -0.2]}>
        <meshStandardMaterial color={BODY_EDGE} metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh geometry={foot} position={[0, -2.25, -0.1]}>
        <meshStandardMaterial color={BODY_EDGE} metalness={0.6} roughness={0.35} />
      </mesh>
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
