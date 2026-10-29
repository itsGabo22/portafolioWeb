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
  | "skills";

const SECTION_ORDER: readonly KeyboardSection[] = [
  "hero",
  "about",
  "projects",
  "testimonials",
  "experience",
  "contact",
  "skills",
];

type Vector = { x: number; y: number; z: number };
const vector = (v: Vec3): Vector => ({ x: v[0], y: v[1], z: v[2] });
const array = (v: Vector): Vec3 => [v.x, v.y, v.z];

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

  // Base pose animated by section transitions (never mutated by idle float or pointer tilt)
  const position = vector([0, 0, 0]);
  const scale = vector([1, 1, 1]);
  const rotation = vector([0, 0, 0]);

  // Additive offsets for subtle idle float + cursor parallax tilt
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

  const catFrame = { value: 0 };
  let activeBongoFrame = 0;
  const sectionTweens: gsap.core.Tween[] = [];
  const revealTweens: gsap.core.Tween[] = [];
  const keyTweens: gsap.core.Tween[] = [];
  let catLoop: gsap.core.Tween | null = null;
  let idleLoop: gsap.core.Tween | null = null;
  let counterEnabled = true;

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

  // Expressive, continuous top-facing poses across all 7 sections
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
        sizeFactor = mobile ? 0.72 : 0.84;
        right = mobile ? 0 : 2.68;
        up = mobile ? -1.45 : -0.22;
        rot = { x: 0.08, y: mobile ? 0.16 : 0.1, z: 0 };
        break;
      case "about":
        sizeFactor = mobile ? 0.68 : 0.78;
        right = mobile ? 0 : -2.1;
        up = -0.32;
        rot = { x: 0.16, y: -0.28, z: 0.04 };
        break;
      case "projects":
        sizeFactor = mobile ? 0.74 : 0.86;
        right = mobile ? 0 : 2.05;
        up = -0.35;
        rot = { x: 0.14, y: 0.32, z: -0.04 };
        break;
      case "testimonials":
        sizeFactor = mobile ? 0.68 : 0.76;
        right = mobile ? 0 : -2.05;
        up = -0.38;
        rot = { x: 0.16, y: -0.24, z: 0.04 };
        break;
      case "experience":
        sizeFactor = mobile ? 0.68 : 0.78;
        right = mobile ? 0 : 2.1;
        up = -0.35;
        rot = { x: 0.14, y: 0.25, z: -0.04 };
        break;
      case "contact":
        sizeFactor = mobile ? 0.72 : 0.82;
        right = mobile ? 0 : 2.65;
        up = -0.5;
        rot = { x: 0.12, y: -0.2, z: 0.04 };
        break;
      case "skills":
        sizeFactor = mobile ? 0.86 : 1.04;
        right = 0;
        up = mobile ? -0.45 : -0.38;
        rot = { x: 0.04, y: mobile ? Math.PI / 6 : Math.PI / 12, z: 0 };
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

  // Bongo Cat Topper: Visible in #hero, #about, #projects, #testimonials, and #experience
  // (Hidden in #skills so 3D extruded skill text has 100% clear space above the top bezel, and hidden in #contact during zero-G key levitation)
  const updateBongoCatForSection = (currentSection: KeyboardSection) => {
    if (catLoop) {
      catLoop.kill();
      catLoop = null;
    }
    const showCat =
      currentSection === "hero" ||
      currentSection === "about" ||
      currentSection === "projects" ||
      currentSection === "testimonials" ||
      currentSection === "experience";

    api.setNodeVisible(scene.catId, showCat);
    if (!showCat) {
      scene.frameIds.forEach((id) => api.setNodeVisible(id, false));
      return;
    }

    catFrame.value = 0;
    let displayedFrame = -1;
    const showFrame = () => {
      const frame = Math.floor(catFrame.value) % 2;
      if (frame === displayedFrame) return;
      displayedFrame = frame;
      activeBongoFrame = frame;
      scene.frameIds.forEach((id, index) =>
        api.setNodeVisible(id, index === frame)
      );
      onActivity?.();
    };
    showFrame();

    // Continuous paw-tapping animation loop during showcase sections
    if (
      currentSection === "about" ||
      currentSection === "projects" ||
      currentSection === "testimonials" ||
      currentSection === "experience"
    ) {
      catLoop = gsap.to(catFrame, {
        value: 2,
        duration: 0.24,
        repeat: -1,
        ease: "none",
        onUpdate: showFrame,
      });
    }
  };

  const syncKeyAnimations = (next: KeyboardSection, immediate: boolean) => {
    kill(keyTweens);
    if (next === "contact") {
      scene.keys.forEach((_, keyIndex) => {
        const offset = keyOffsets[keyIndex];
        keyTweens.push(
          gsap.to(offset, {
            y: 0.42 + (keyIndex % 5) * 0.14,
            duration: 1.5 + (keyIndex % 4) * 0.35,
            delay: (keyIndex % 6) * 0.07,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            overwrite: "auto",
            onUpdate: () => {
              applyKey(keyIndex);
            },
          })
        );
      });
    } else {
      scene.keys.forEach((_, keyIndex) => {
        const offset = keyOffsets[keyIndex];
        if (immediate || Math.abs(offset.y) < 0.001) {
          offset.y = 0;
          applyKey(keyIndex);
        } else {
          keyTweens.push(
            gsap.to(offset, {
              y: 0,
              duration: 0.4,
              ease: "power3.out",
              overwrite: "auto",
              onUpdate: () => {
                applyKey(keyIndex);
              },
            })
          );
        }
      });
    }
  };

  const applySection = (next: KeyboardSection, immediate = false) => {
    if (disposed) return;
    if (!immediate && section === next) return;
    section = next;
    onSection(next);
    kill(sectionTweens);

    const target = poseFor(next);
    const duration = immediate ? 0 : next === "hero" ? 0.4 : 0.52;

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
            ease: "power3.out",
            overwrite: "auto",
            onUpdate: applyPose,
          })
        );
      }
    }

    updateVisibilityForSection(next);
    updateBongoCatForSection(next);
    syncKeyAnimations(next, immediate);
    onVisibility();
  };

  // Continuous, gentle breathing float that composes additively and never blocks section transitions
  idleLoop = gsap.to(idleOffset, {
    y: 0.11,
    rotY: 0.055,
    rotZ: 0.018,
    duration: 3.2,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    onUpdate: applyPose,
  });

  // Responsive cursor parallax tilt so the 3D keyboard feels immediately alive in #hero and #skills
  const onPointerMove = (e: PointerEvent) => {
    if (disposed || window.innerWidth < 768) return;
    const nx = (e.clientX / window.innerWidth - 0.5) * 2;
    const ny = (e.clientY / window.innerHeight - 0.5) * 2;
    const strength = section === "hero" || section === "skills" ? 0.085 : 0.04;
    gsap.to(pointerTilt, {
      x: ny * strength,
      y: nx * strength,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
      onUpdate: applyPose,
    });
  };

  const onVisibility = () => {
    const hidden = document.hidden;
    api.setPaused(hidden);
    [...sectionTweens, ...revealTweens, ...keyTweens].forEach((t) =>
      t.paused(hidden)
    );
    catLoop?.paused(hidden);
    idleLoop?.paused(hidden);
  };

  // Deterministic section detection based on scroll position
  const detectSection = (): KeyboardSection => {
    if (typeof window === "undefined") return "hero";
    if (window.scrollY < 160) return "hero";

    const probeY = window.innerHeight * 0.48;
    let active: KeyboardSection = "hero";

    for (const id of SECTION_ORDER) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= probeY) {
        active = id;
      }
    }
    return active;
  };

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
    setCounterEnabled(enabled: boolean) {
      if (disposed || enabled === counterEnabled) return;
      counterEnabled = enabled;
      updateVisibilityForSection(section);
    },
    tapBongoCat() {
      if (disposed || !revealed) return;
      if (section === "skills" || section === "contact") return;
      activeBongoFrame = (activeBongoFrame + 1) % 2;
      scene.frameIds.forEach((id, index) =>
        api.setNodeVisible(id, index === activeBongoFrame)
      );
      onActivity?.();
    },
    reveal() {
      if (revealed || disposed) return;
      revealed = true;
      api.setNodeVisible(scene.boardId, true);

      // Make all 24 keys immediately visible & interactive in #hero with zero blocking delay
      scene.keys.forEach((key, index) => {
        api.setNodeVisible(key.motionId, true);
        const offset = keyRevealOffsets[index];
        offset.y = 0.25;
        applyKey(index);
        revealTweens.push(
          gsap.to(offset, {
            y: 0,
            delay: index * 0.016,
            duration: 0.36,
            ease: "back.out(1.7)",
            onUpdate: () => {
              applyKey(index);
            },
          })
        );
      });

      const currentSection = detectSection();
      section = currentSection;
      onSection(currentSection);

      const target = poseFor(currentSection);
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

      updateVisibilityForSection(currentSection);
      updateBongoCatForSection(currentSection);
      syncKeyAnimations(currentSection, true);

      revealScale.value = 0.76;
      setTransform(scene.revealId, { scale: [0.76, 0.76, 0.76] });
      revealTweens.push(
        gsap.to(revealScale, {
          value: 1,
          duration: 0.6,
          ease: "back.out(1.4)",
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
      if (scrollRaf) {
        window.cancelAnimationFrame(scrollRaf);
        scrollRaf = 0;
      }
      kill(sectionTweens);
      kill(revealTweens);
      kill(keyTweens);
      catLoop?.kill();
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
        ...scene.frameIds,
        scene.labelsId,
      ].forEach((id) => api.clearNodeOverrides(id));
      api.clearNodeOverrides(scene.counterId);
      api.setNodeVisible(scene.catId, false);
    },
  };
}
