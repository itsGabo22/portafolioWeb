"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import { AnimatePresence, motion as fmMotion } from "framer-motion";
import {
  ChibiScene,
  type ChibiSceneApi,
  type ScenePointerEvent,
  type RuntimeEvent,
} from "@chibi3d/runtime";
import { useApp } from "@/context/AppContext";
import { KEYBOARD_SKILLS } from "./keyboard/keyboard-skills";
import {
  createKeyboardScene,
  resolveKeyboardAsset,
  type KeyboardKey,
  type KeyboardSkill,
} from "./keyboard/scene";
import { createKeyInput, isTypingTarget } from "./keyboard/input";
import { createKeyboardMotion, type KeyboardSection } from "./keyboard/motion";
import { useKeyboardSounds } from "./keyboard/use-keyboard-sounds";
import { createCounterMotion } from "./keyboard/counter-motion";

const SceneCanvas = memo(ChibiScene);

const SCENE_STYLE: CSSProperties = {
  position: "fixed",
  inset: 0,
  width: "100vw",
  height: "100dvh",
  zIndex: 1,
};

function subscribeNoop() {
  return () => {};
}

let cachedWebGLSupport: boolean | null = null;

function getWebGLSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  if (cachedWebGLSupport !== null) return cachedWebGLSupport;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    cachedWebGLSupport = Boolean(gl);
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    cachedWebGLSupport = false;
  }
  return cachedWebGLSupport;
}

function getServerSnapshot(): boolean {
  return false;
}

const INTERACTIVE_HTML_SELECTOR =
  'a, button, input, textarea, select, label, [role="button"], [role="tab"]';

export default function InteractiveKeyboard3D() {
  const { theme, lang, sfxMuted, setSceneReady } = useApp();
  const hasWebGL = useSyncExternalStore(
    subscribeNoop,
    getWebGLSnapshot,
    getServerSnapshot
  );

  const stageWrapperRef = useRef<HTMLDivElement>(null);
  const api = useRef<ChibiSceneApi>(null);
  const failed = useRef(false);
  const motion = useRef<ReturnType<typeof createKeyboardMotion> | null>(null);
  const counterMotion = useRef<ReturnType<typeof createCounterMotion> | null>(
    null
  );

  const [loadVersion, setLoadVersion] = useState(0);
  const ready = loadVersion > 0;
  const [section, setSection] = useState<KeyboardSection>("hero");
  const [selected, setSelected] = useState<KeyboardSkill | null>(null);
  const [isFooterOrContactInView, setIsFooterOrContactInView] = useState(false);
  const [pressCount, setPressCount] = useState(1428);
  const hudDismissTimerRef = useRef<number | null>(null);

  const playSound = useKeyboardSounds(sfxMuted);
  const scene = useMemo(() => createKeyboardScene(KEYBOARD_SKILLS, 6), []);

  const environment = useMemo(
    () => ({
      ...scene.document.environment,
      shadows: true,
      softShadows: true,
      ao: false,
      bloom: false,
      contactShadows: false,
      vignette: false,
      exposure: theme === "dark" ? 0.92 : 1.06,
      preset: scene.document.environment.preset,
    }),
    [scene, theme]
  );

  const dpr = useMemo<[number, number]>(() => [0.75, 1.75], []);
  const heldKeys = useRef<KeyboardKey[]>([]);
  const activeKeyRef = useRef<KeyboardKey | null>(null);
  const input = useMemo(
    () => createKeyInput(scene.keys, scene.columns),
    [scene]
  );

  // Sync 3D bilingual extruded label whenever active key or language (es/en) changes
  const syncActive3DLabel = useCallback(
    (activeKey: KeyboardKey | null, currentLang: "es" | "en") => {
      if (!api.current) return;
      const targetId = activeKey
        ? activeKey.labelId[currentLang]
        : scene.defaultLabelId[currentLang];
      for (const id of scene.allLabelIds) {
        api.current.setNodeVisible(id, id === targetId);
      }
    },
    [scene]
  );

  // Sync 3D chassis and 3D extruded heading material with Light/Dark theme
  useEffect(() => {
    if (!ready || !api.current) return;
    if (theme === "dark") {
      api.current.setMaterial(scene.textMaterialId, {
        color: "#fafafa",
        roughness: 0.5,
        metalness: 0.05,
      });
      api.current.setMaterial(scene.caseMaterialId, {
        color: "#18181b",
        roughness: 0.58,
        metalness: 0.08,
      });
      api.current.setMaterial(scene.plateMaterialId, {
        color: "#09090b",
        roughness: 0.82,
      });
    } else {
      api.current.setMaterial(scene.textMaterialId, {
        color: "#065f46",
        roughness: 0.35,
        metalness: 0.12,
      });
      api.current.setMaterial(scene.caseMaterialId, {
        color: "#e4e4e7",
        roughness: 0.36,
        metalness: 0.14,
      });
      api.current.setMaterial(scene.plateMaterialId, {
        color: "#27272a",
        roughness: 0.72,
      });
    }
  }, [ready, loadVersion, scene, theme]);

  // Initialize 3D mechanical odometer counter on the keyboard left edge
  useEffect(() => {
    if (!ready || !api.current) return;
    const controller = createCounterMotion(api.current, scene.counter, () => {});
    counterMotion.current = controller;
    controller.update(pressCount, true);
    return () => {
      controller.dispose();
      counterMotion.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, loadVersion, scene]);

  useEffect(() => {
    counterMotion.current?.update(pressCount, true);
  }, [pressCount, ready, loadVersion]);

  // Subscribe to key press/release events (hover, click, physical keyboard)
  useEffect(
    () =>
      input.subscribe((key, pressed) => {
        api.current?.transitionNodeTo(
          key.nodeId,
          pressed ? key.pressedStateId : "base",
          { duration: 0.09, ease: "easeInOut" }
        );
        api.current?.setMaterial(key.materialId, {
          emissive: scene.document.materials[key.materialId].color,
          emissiveIntensity: pressed ? 0.65 : 0,
        });
        heldKeys.current = heldKeys.current.filter((held) => held !== key);
        if (pressed) {
          if (ready && !document.hidden) {
            setPressCount((prev) => prev + 1);
          }
          heldKeys.current.push(key);
          motion.current?.tapBongoCat();
        }
        const shown = heldKeys.current.at(-1) ?? null;
        activeKeyRef.current = shown;
        syncActive3DLabel(shown, lang);

        if (hudDismissTimerRef.current) {
          window.clearTimeout(hudDismissTimerRef.current);
          hudDismissTimerRef.current = null;
        }

        if (shown) {
          setSelected(shown.skill);
          hudDismissTimerRef.current = window.setTimeout(() => {
            if (heldKeys.current.length === 0) {
              setSelected(null);
            }
          }, 1800);
        } else {
          hudDismissTimerRef.current = window.setTimeout(() => {
            setSelected(null);
          }, 350);
        }

        playSound(pressed);
      }),
    [input, scene, playSound, ready, lang, syncActive3DLabel]
  );

  // Monitor #contact and <footer> visibility so the HUD card NEVER covers Footer.tsx or Contact
  useEffect(() => {
    const checkBottomSections = () => {
      const contactEl = document.getElementById("contact");
      const footerEl = document.querySelector("footer");
      const vh = window.innerHeight;
      let nearBottom = false;

      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top < vh * 0.65) {
          nearBottom = true;
        }
      }
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        if (rect.top < vh) {
          nearBottom = true;
        }
      }

      setIsFooterOrContactInView(nearBottom);
      if (nearBottom) {
        input.release("hover");
        setSelected(null);
      }
    };

    window.addEventListener("scroll", checkBottomSections, { passive: true });
    checkBottomSections();
    return () => window.removeEventListener("scroll", checkBottomSections);
  }, [input]);

  const onPointerEvent = useCallback(
    (event: ScenePointerEvent) => {
      const pointer = `pointer:${event.pointerId}`;
      switch (event.type) {
        case "hoverEnter":
          if (event.pointerType === "mouse") {
            input.press("hover", event.nodeId);
          }
          break;
        case "hoverExit":
          input.release("hover", event.nodeId);
          break;
        case "pointerDown":
          input.press(pointer, event.nodeId);
          break;
        case "pointerUp":
        case "pointerCancel":
          input.release(pointer);
          break;
      }
    },
    [input]
  );

  // Window-to-Canvas pointer bridge
  useEffect(() => {
    if (!ready) return;

    const getCanvas = (): HTMLCanvasElement | null =>
      stageWrapperRef.current?.querySelector("canvas") ?? null;

    const forwardPointer = (event: PointerEvent) => {
      const canvas = getCanvas();
      if (!canvas) return;
      const target = event.target as Element | null;
      if (!target || target === canvas || canvas.contains(target)) return;
      if (target.closest?.(INTERACTIVE_HTML_SELECTOR)) {
        input.release("hover");
        return;
      }

      const cloned = new PointerEvent(event.type, {
        bubbles: true,
        cancelable: true,
        clientX: event.clientX,
        clientY: event.clientY,
        screenX: event.screenX,
        screenY: event.screenY,
        pointerId: event.pointerId,
        pointerType: event.pointerType || "mouse",
        isPrimary: event.isPrimary,
        button: event.button,
        buttons: event.buttons,
      });
      canvas.dispatchEvent(cloned);
    };

    const forwardClick = (event: MouseEvent) => {
      const canvas = getCanvas();
      if (!canvas) return;
      const target = event.target as Element | null;
      if (!target || target === canvas || canvas.contains(target)) return;
      if (target.closest?.(INTERACTIVE_HTML_SELECTOR)) return;

      const cloned = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        clientX: event.clientX,
        clientY: event.clientY,
        button: event.button,
        buttons: event.buttons,
      });
      canvas.dispatchEvent(cloned);
    };

    window.addEventListener("pointermove", forwardPointer, { passive: true });
    window.addEventListener("pointerdown", forwardPointer, { passive: true });
    window.addEventListener("pointerup", forwardPointer, { passive: true });
    window.addEventListener("click", forwardClick, { passive: true });

    return () => {
      window.removeEventListener("pointermove", forwardPointer);
      window.removeEventListener("pointerdown", forwardPointer);
      window.removeEventListener("pointerup", forwardPointer);
      window.removeEventListener("click", forwardClick);
    };
  }, [ready, input]);

  const onLoad = useCallback(() => {
    if (failed.current) return;
    setLoadVersion((version) => version + 1);
    setSceneReady(true);
  }, [setSceneReady]);

  const onError = useCallback(
    (error: Error) => {
      failed.current = true;
      setSceneReady(true);
      console.warn("3D Keyboard scene fallback active:", error);
    },
    [setSceneReady]
  );

  const onEvent = useCallback(
    (event: RuntimeEvent) => {
      if (event.type === "contextLost") {
        onError(new Error("WebGL context lost"));
      }
    },
    [onError]
  );

  // Initialize scroll-driven 3D camera & pose choreography
  useEffect(() => {
    if (!ready || !api.current) return;
    const controller = createKeyboardMotion(api.current, scene, (next) => {
      setSection(next);
    });
    motion.current = controller;
    controller.setCounterEnabled(true);
    controller.reveal();
    return () => {
      controller.dispose();
      motion.current = null;
    };
  }, [ready, loadVersion, scene]);

  // Restore visible 3D label on remount or language switch (ES/EN)
  useEffect(() => {
    if (!ready) return;
    syncActive3DLabel(activeKeyRef.current, lang);
  }, [ready, loadVersion, lang, syncActive3DLabel]);

  // Physical keyboard listener (press keys 1-6, Q-Y, A-H, Z-N to trigger 3D keycaps)
  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        isTypingTarget(event.target)
      ) {
        return;
      }
      const key = input.shortcuts.get(event.code);
      if (key) input.press(`key:${event.code}`, key.nodeId);
    };
    const up = (event: KeyboardEvent) => input.release(`key:${event.code}`);
    const release = () => input.releaseAll();
    const visibility = () => {
      if (document.hidden) release();
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", release);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", release);
      document.removeEventListener("visibilitychange", visibility);
      release();
    };
  }, [input]);

  if (!hasWebGL) return null;

  const showFloatingHud =
    ready &&
    selected !== null &&
    section !== "contact" &&
    !isFooterOrContactInView;

  return (
    <div ref={stageWrapperRef}>
      <SceneCanvas
        document={scene.document}
        environment={environment}
        resolveAsset={resolveKeyboardAsset}
        api={api}
        style={SCENE_STYLE}
        dpr={dpr}
        transparent
        orbit={false}
        orthographic
        pauseWhenOffscreen={false}
        pointerTargets={scene.pointerTargets}
        onPointerEvent={onPointerEvent}
        onLoad={onLoad}
        onError={onError}
        onEvent={onEvent}
      />

      {/* Bilingual Live Keycap HUD Card — ONLY mounted when actively inspecting a keycap AND never blocking #contact or <footer> */}
      <AnimatePresence>
        {showFloatingHud && selected && (
          <fmMotion.div
            key={selected.name}
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-none fixed inset-x-4 bottom-5 z-30 flex justify-center"
          >
            <div
              aria-live="polite"
              className="pointer-events-auto flex max-w-xl items-center gap-4 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-900/95 px-5 py-3.5 shadow-2xl backdrop-blur-xl"
            >
              {/* High-Contrast Obsidian Pedestal for Keycap SVG Logo */}
              <div
                className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 dark:bg-zinc-950 shadow-inner"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1"
                  style={{ backgroundColor: selected.color }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected.icon}
                  alt={selected.label}
                  className="h-6 w-6 object-contain [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.6))]"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {selected.label}
                  </span>
                  <span className="rounded-md bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                    {selected.category[lang]}
                  </span>
                  {selected.shortcut && (
                    <kbd className="rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-300">
                      {selected.shortcut.replace("Key", "").replace("Digit", "")}
                    </kbd>
                  )}
                </div>
                <p className="mt-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                  {selected.shortDescription[lang]}
                </p>
              </div>
            </div>
          </fmMotion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
