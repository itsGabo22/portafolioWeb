import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Euler, Quaternion } from "three";
import type { ChibiSceneApi, Vec3 } from "@chibi3d/runtime";
import type { KeyboardScene } from "./scene";

export type KeyboardSection =
  | "hero"
  | "about"
  | "projects"
  | "testimonials"
  | "experience"
  | "contact"
  | "skills"
  | "beyond";

/** Sections where the keyboard is shown at full strength; everywhere else it is parked (hidden + paused). */
export const VIVID_SECTIONS: readonly KeyboardSection[] = ["hero", "skills"];
export const isVividSection = (s: KeyboardSection) => VIVID_SECTIONS.includes(s);

/**
 * Whether the keyboard may be drawn right now without sitting behind text:
 * - #hero only on wide layouts (>=1024px), where the copy and the keyboard
 *   occupy separate columns; on single-column layouts it would cover the bio.
 * - #skills only while its empty stage (#skills-stage) is centred in the
 *   viewport, so the heading above and the cards below stay clear.
 */
export function isKeyboardVivid(section: KeyboardSection): boolean {
  if (typeof window === "undefined") return false;
  if (section === "hero") return window.innerWidth >= 1024;
  if (section !== "skills") return false;
  const stage = document.getElementById("skills-stage");
  if (!stage) return false;
  const rect = stage.getBoundingClientRect();
  const vh = window.innerHeight;
  const offset = rect.top + rect.height / 2 - vh / 2;
  return Math.abs(offset) < vh * 0.12 && rect.height >= vh * 0.7;
}

const SECTION_ORDER: readonly KeyboardSection[] = [
  "hero",
  "about",
  "projects",
  "testimonials",
  "experience",
  "contact",
  "skills",
  "beyond",
];

/** Deterministic section detection based on scroll position (works before the scene loads). */
export function detectKeyboardSection(): KeyboardSection {
  if (typeof window === "undefined") return "hero";
  // Pages without the home sections (e.g. the 404) keep the keyboard parked.
  if (!document.getElementById("hero")) return "contact";
  if (window.scrollY < 160) return "hero";
  const probeY = window.innerHeight * 0.48;
  let active: KeyboardSection = "hero";
  for (const id of SECTION_ORDER) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= probeY) active = id;
  }
  return active;
}

type Vector = { x: number; y: number; z: number };
const vector = (v: Vec3): Vector => ({ x: v[0], y: v[1], z: v[2] });
const array = (v: Vector): Vec3 => [v.x, v.y, v.z];

// Exact quaternion composition from naresh_ref/src/components/keyboard/motion.ts
function sectionRotation(rotation: Vector, mobile: boolean): Vec3 {
  const skills = new Quaternion().setFromEuler(
    new Euler(0.119863065, 0.007200782, 0.119863065)
  );
  const reference = new Quaternion().setFromEuler(
    new Euler(0, mobile ? -Math.PI / 6 : -Math.PI / 12, 0)
  );
  const legacy = new Quaternion().setFromEuler(
    new Euler(rotation.x, rotation.y, rotation.z)
  );
  const euler = new Euler().setFromQuaternion(
    skills.multiply(reference).multiply(legacy)
  );
  return [euler.x, euler.y, euler.z];
}

export function createKeyboardMotion(
  api: ChibiSceneApi,
  scene: KeyboardScene,
  onSection: (section: KeyboardSection) => void,
  onActivity?: () => void
) {
  gsap.registerPlugin(ScrollTrigger);
  const setTransform: ChibiSceneApi["setNodeTransform"] = (id, patch) => {
    onActivity?.();
    return api.setNodeTransform(id, patch);
  };

  let section: KeyboardSection = "hero";
  let disposed = false;
  let revealed = false;

  // Base pose animated by section transitions
  const position = vector([0, 0, 0]);
  const scale = vector([1, 1, 1]);
  const rotation = vector([0, 0, 0]);

  // Additive offsets for subtle breathing float + cursor parallax tilt
  const idleOffset = { y: 0, rotY: 0, rotZ: 0 };
  const pointerTilt = { x: 0, y: 0 };
  const revealScale = { value: 1 };

  const keyOffsets = scene.keys.map(() => ({ y: 0 }));
  const keyRevealOffsets = scene.keys.map(() => ({ y: 0 }));

  const applyKey = (index: number) => {
    setTransform(scene.keys[index].motionId, {
      position: [0, keyOffsets[index].y + keyRevealOffsets[index].y, 0],
    });
  };

  const sectionTweens: gsap.core.Tween[] = [];
  const loops: gsap.core.Tween[] = [];
  const revealTweens: gsap.core.Tween[] = [];
  const keyTweens: gsap.core.Tween[] = [];
  let idleLoop: gsap.core.Tween | null = null;
  let counterEnabled = true;
  // Parked = outside hero/skills: the canvas is faded out by the component and rendering is paused.
  let parked = false;
  let parkTimer = 0;

  const updateVisibilityForSection = (currentSection: KeyboardSection) => {
    // 3D Extruded labels ONLY appear in #skills so they never overlap the #hero subtitle
    const show3DLabels = currentSection === "skills";
    const showCounter =
      (currentSection === "hero" || currentSection === "skills") &&
      counterEnabled;
    api.setNodeVisible(scene.labelsId, show3DLabels);
    api.setNodeVisible(scene.counterId, showCounter);
    onActivity?.();
  };

  const applyPose = () => {
    if (disposed) return;
    const mobile = window.innerWidth < 768;
    const composedRotation: Vector = {
      x: rotation.x + pointerTilt.x,
      y: rotation.y + idleOffset.rotY + pointerTilt.y,
      z: rotation.z + idleOffset.rotZ,
    };
    const composedPosition: Vector = {
      x: position.x,
      y: position.y + idleOffset.y,
      z: position.z,
    };
    setTransform(scene.boardId, {
      position: array(composedPosition),
      scale: array(scale),
      rotation: sectionRotation(composedRotation, mobile),
    });
  };

  // Exact naresh_ref choreographed poses across all 7 sections
  const poseFor = (targetSection: KeyboardSection) => {
    const mobile = window.innerWidth < 768;
    const fit = Math.min(1, (window.innerWidth / window.innerHeight) * 1.05);
    const [centerX, centerY, centerZ] = scene.document.camera.target;

    let sizeFactor = 0.85;
    let right = 0;
    let up = 0;
    let rot: Vector = { x: 0, y: 0, z: 0 };

    switch (targetSection) {
      case "hero":
        sizeFactor = mobile ? 0.74 : 0.82;
        right = mobile ? 0 : 2.55;
        up = mobile ? -1.6 : -0.15;
        rot = { x: 0, y: 0, z: 0 };
        break;
      case "about":
        sizeFactor = mobile ? 0.72 : 0.88;
        right = mobile ? 0 : 2.25;
        up = -0.15;
        rot = { x: Math.PI, y: Math.PI / 3, z: Math.PI };
        break;
      case "projects":
        sizeFactor = mobile ? 0.76 : 0.92;
        right = mobile ? 0 : 2.15;
        up = -0.12;
        rot = { x: Math.PI, y: Math.PI / 3, z: Math.PI };
        break;
      case "testimonials":
        sizeFactor = mobile ? 0.7 : 0.8;
        right = mobile ? 0 : 2.35;
        up = -0.28;
        rot = { x: 0.14, y: -Math.PI / 6, z: -0.05 };
        break;
      case "experience":
        sizeFactor = mobile ? 0.7 : 0.82;
        right = mobile ? 0 : 2.3;
        up = -0.25;
        rot = { x: 0.12, y: Math.PI / 7, z: 0.04 };
        break;
      case "beyond":
      case "contact":
        sizeFactor = mobile ? 0.72 : 0.76;
        right = mobile ? 0 : 3.5;
        up = -0.75;
        rot = mobile
          ? { x: Math.PI, y: Math.PI / 3, z: Math.PI }
          : { x: 0, y: 0, z: 0 };
        break;
      case "skills":
        sizeFactor = mobile ? 0.88 : 1.05;
        right = 0;
        up = mobile ? -0.4 : -0.32;
        rot = { x: 0, y: mobile ? Math.PI / 6 : Math.PI / 12, z: 0 };
        break;
    }

    const size = fit * sizeFactor;
    return {
      position: {
        x: centerX + right / Math.sqrt(2) + up / Math.sqrt(6),
        y: centerY + up * Math.sqrt(2 / 3),
        z: centerZ + right / Math.sqrt(2) - up / Math.sqrt(6),
      },
      rotation: rot,
      scale: { x: size, y: size, z: size },
    };
  };

  const kill = (tweens: gsap.core.Tween[]) => {
    tweens.splice(0).forEach((tween) => tween.kill());
  };

  // Keys settle back to rest whenever the section changes.
  const syncKeyAnimations = (immediate: boolean) => {
    kill(keyTweens);
    scene.keys.forEach((_, keyIndex) => {
      const offset = keyOffsets[keyIndex];
      if (immediate || Math.abs(offset.y) < 0.001) {
        offset.y = 0;
        applyKey(keyIndex);
      } else {
        keyTweens.push(
          gsap.to(offset, {
            y: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.7)",
            overwrite: "auto",
            onUpdate: () => {
              applyKey(keyIndex);
            },
          })
        );
      }
    });
  };

  const applySection = (next: KeyboardSection, immediate = false) => {
    if (disposed) return;
    if (!immediate && section === next) return;
    section = next;
    onSection(next);
    kill(sectionTweens);
    kill(loops);

    const target = poseFor(next);
    const duration = immediate ? 0 : next === "hero" ? 0.55 : 0.85;

    if (immediate) {
      position.x = target.position.x;
      position.y = target.position.y;
      position.z = target.position.z;
      rotation.x = target.rotation.x;
      rotation.y = target.rotation.y;
      rotation.z = target.rotation.z;
      scale.x = target.scale.x;
      scale.y = target.scale.y;
      scale.z = target.scale.z;
      applyPose();
    } else {
      for (const [value, destination] of [
        [position, target.position],
        [rotation, target.rotation],
        [scale, target.scale],
      ] as const) {
        sectionTweens.push(
          gsap.to(value, {
            ...destination,
            duration,
            ease: "power2.out",
            overwrite: "auto",
            onUpdate: applyPose,
          })
        );
      }
    }

    // Exact naresh_ref 10-second yoyo spin in #hero
    if (next === "hero") {
      loops.push(
        gsap.to(rotation, {
          y: Math.PI * 2 + target.rotation.y,
          duration: 10,
          delay: immediate ? 1.2 : 0.8,
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
          ease: "back.inOut",
          onUpdate: applyPose,
        })
      );
    }


    updateVisibilityForSection(next);
    syncKeyAnimations(immediate);

  };

  // Continuous, gentle breathing float that composes additively
  idleLoop = gsap.to(idleOffset, {
    y: 0.09,
    rotY: 0.04,
    rotZ: 0.015,
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    onUpdate: applyPose,
  });

  // Responsive cursor parallax tilt so the 3D keyboard responds to every cursor movement
  const onPointerMove = (e: PointerEvent) => {
    if (disposed || parked || window.innerWidth < 768) return;
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    const strength = section === "hero" || section === "skills" ? 0.095 : 0.05;
    gsap.to(pointerTilt, {
      x: ny * strength,
      y: nx * strength,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
      onUpdate: applyPose,
    });
  };

  const setParked = (next: boolean) => {
    window.clearTimeout(parkTimer);
    if (next) {
      // wait for the CSS fade-out before freezing the render loop
      parkTimer = window.setTimeout(() => {
        parked = true;
        onVisibility();
      }, 520);
    } else {
      parked = false;
      onVisibility();
    }
  };

  const onVisibility = () => {
    const hidden = document.hidden || parked;
    api.setPaused(hidden);
    [
      ...loops,
      ...sectionTweens,
      ...revealTweens,
      ...keyTweens,
    ].forEach((t) => t.paused(hidden));
    idleLoop?.paused(hidden);
  };

  const detectSection = detectKeyboardSection;

  let scrollRaf = 0;

  const onScroll = () => {
    if (scrollRaf || !revealed || disposed) return;
    scrollRaf = window.requestAnimationFrame(() => {
      scrollRaf = 0;
      if (!revealed || disposed) return;

      const next = detectSection();
      if (next !== section) {
        applySection(next, false);
      }
    });
  };

  const resize = () => {
    if (revealed && !disposed) {
      applySection(detectSection(), true);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("resize", resize);
  document.addEventListener("visibilitychange", onVisibility);

  return {
    /** Parking is decided by the component from the live layout (see isKeyboardVivid). */
    setParked,
    setCounterEnabled(enabled: boolean) {
      if (disposed || enabled === counterEnabled) return;
      counterEnabled = enabled;
      updateVisibilityForSection(section);
    },
    reveal() {
      if (revealed || disposed) return;
      revealed = true;
      api.setNodeVisible(scene.boardId, true);

      // Make all 24 keys immediately visible & interactive in #hero with zero blocking delay
      scene.keys.forEach((key, index) => {
        api.setNodeVisible(key.motionId, true);
        const offset = keyRevealOffsets[index];
        offset.y = 0.28;
        applyKey(index);
        revealTweens.push(
          gsap.to(offset, {
            y: 0,
            delay: index * 0.018,
            duration: 0.42,
            ease: "bounce.out",
            onUpdate: () => {
              applyKey(index);
            },
          })
        );
      });

      const currentSection = detectSection();
      applySection(currentSection, true);

      revealScale.value = 0.72;
      setTransform(scene.revealId, { scale: [0.72, 0.72, 0.72] });
      revealTweens.push(
        gsap.to(revealScale, {
          value: 1,
          duration: 0.75,
          ease: "elastic.out(1, 0.65)",
          onUpdate: () => {
            setTransform(scene.revealId, {
              scale: [revealScale.value, revealScale.value, revealScale.value],
            });
          },
        })
      );
      onVisibility();
    },
    dispose() {
      disposed = true;
      window.clearTimeout(parkTimer);
      if (scrollRaf) {
        window.cancelAnimationFrame(scrollRaf);
        scrollRaf = 0;
      }
      kill(loops);
      kill(sectionTweens);
      kill(revealTweens);
      kill(keyTweens);
      idleLoop?.kill();
      gsap.killTweensOf(pointerTilt);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      [
        scene.boardId,
        scene.spinId,
        scene.revealId,
        ...scene.keys.map((key) => key.motionId),
        scene.labelsId,
      ].forEach((id) => api.clearNodeOverrides(id));
      api.clearNodeOverrides(scene.counterId);
    },
  };
}
