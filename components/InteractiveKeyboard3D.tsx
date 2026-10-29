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
import {
  ChibiScene,
  type ChibiSceneApi,
  type ScenePointerEvent,
  type RuntimeEvent,
} from "@chibi3d/runtime";
import { Keyboard, Volume2, VolumeX, Sparkles } from "lucide-react";
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
  const { theme, lang } = useApp();
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
  const [muted, setMuted] = useState(false);
  const [pressCount, setPressCount] = useState(1428);

  const playSound = useKeyboardSounds(muted);
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
  // Light Mode: Teenage Engineering / Apple Studio anodized warm silver (#e4e4e7) + graphite plate (#27272a)
  // Dark Mode: Stealth matte obsidian (#18181b) + deep carbon plate (#09090b)
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
        setSelected(shown?.skill ?? null);
        playSound(pressed);
      }),
    [input, scene, playSound, ready, lang, syncActive3DLabel]
  );

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

  // Window-to-Canvas pointer bridge: ensures raycasting works 100% of the time in #hero, #skills, and #contact
  // even if a transparent DOM wrapper sits above the fixed canvas
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
  }, []);

  const onError = useCallback((error: Error) => {
    failed.current = true;
    console.warn("3D Keyboard scene fallback active:", error);
  }, []);

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

      {/* Floating Audio Switch + Key Counter Pill (Bottom Left) */}
      {ready && (
        <div className="fixed bottom-5 left-5 z-30 hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => setMuted((prev) => !prev)}
            aria-label={
              muted
                ? lang === "es"
                  ? "Activar sonido mecánico"
                  : "Enable mechanical switch sound"
                : lang === "es"
                  ? "Silenciar sonido mecánico"
                  : "Mute mechanical switch sound"
            }
            className="cursor-can-hover inline-flex items-center gap-2 rounded-full border border-zinc-200/90 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-900/80 px-3.5 py-2 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 shadow-lg backdrop-blur-md transition-all hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400"
          >
            {muted ? (
              <VolumeX className="h-3.5 w-3.5 text-zinc-400" />
            ) : (
              <Volume2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            )}
            <span>
              {muted
                ? lang === "es"
                  ? "SONIDO OFF"
                  : "SFX OFF"
                : lang === "es"
                  ? "SONIDO ON"
                  : "SFX ON"}
            </span>
            <span className="h-3 w-px bg-zinc-200 dark:bg-zinc-800" />
            <Keyboard className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
            <span
              title={
                lang === "es"
                  ? "Teclas presionadas en el teclado 3D"
                  : "Keypresses on the 3D keyboard"
              }
              className="tabular-nums font-semibold text-zinc-900 dark:text-zinc-100"
            >
              {pressCount.toLocaleString()}
            </span>
          </button>
        </div>
      )}

      {/* Bilingual Live Keycap HUD Banner when inspecting any keycap (#hero, #skills, #contact, etc.) */}
      {ready && (selected || section === "skills") && (
        <div className="pointer-events-none fixed inset-x-4 bottom-5 z-30 flex justify-center">
          <div
            aria-live="polite"
            className="pointer-events-auto flex max-w-xl items-center gap-4 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-900/95 px-5 py-3.5 shadow-2xl backdrop-blur-xl transition-all duration-200"
          >
            {selected ? (
              <>
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 shadow-inner"
                  style={{ backgroundColor: `${selected.color}22` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={selected.icon}
                    alt={selected.label}
                    className="h-6 w-6 object-contain"
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
              </>
            ) : (
              <div className="flex items-center gap-3 py-0.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                    {lang === "es"
                      ? "Explora mis habilidades en 3D"
                      : "Explore my skills in 3D"}
                  </p>
                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                    {lang === "es"
                      ? "Pasa el cursor sobre las teclas, haz clic o presiona tu teclado físico (1-6, Q-Y, A-H, Z-N)"
                      : "Hover over the keycaps, click, or press your physical keyboard (1-6, Q-Y, A-H, Z-N)"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
