/**
 * Gamepad polling for the Beyond menu (Standard Gamepad mapping). Dynamically
 * imported only while the menu is in the viewport AND a pad is connected;
 * the rAF loop stops as soon as either condition ends.
 */
export type PadCommand = "left" | "right" | "up" | "down" | "primary" | "back" | "prevTab" | "nextTab";

const BUTTONS: Record<number, PadCommand> = {
  0: "primary", // bottom face button
  1: "back", // right face button
  4: "prevTab", // L1
  5: "nextTab", // R1
  12: "up",
  13: "down",
  14: "left",
  15: "right",
};
const FIRST_REPEAT = 380;
const REPEAT = 150;
const DEAD_ZONE = 0.55;

export function startGamepad(onCommand: (command: PadCommand) => void): () => void {
  let raf = 0;
  const held = new Map<PadCommand, number>(); // command → next repeat timestamp

  const loop = (now: number) => {
    raf = window.requestAnimationFrame(loop);
    // Button indices below follow the Standard Gamepad layout only.
    const pad = navigator.getGamepads().find((p) => p && p.connected && p.mapping === "standard");
    if (!pad) return;
    const active = new Set<PadCommand>();
    pad.buttons.forEach((button, index) => {
      const command = BUTTONS[index];
      if (command && button.pressed) active.add(command);
    });
    const [x = 0, y = 0] = pad.axes;
    if (x < -DEAD_ZONE) active.add("left");
    if (x > DEAD_ZONE) active.add("right");
    if (y < -DEAD_ZONE) active.add("up");
    if (y > DEAD_ZONE) active.add("down");

    for (const command of active) {
      const next = held.get(command);
      if (next === undefined) {
        onCommand(command);
        held.set(command, now + FIRST_REPEAT);
      } else if (now >= next && ["left", "right"].includes(command)) {
        onCommand(command);
        held.set(command, now + REPEAT);
      }
    }
    for (const command of [...held.keys()]) if (!active.has(command)) held.delete(command);
  };

  raf = window.requestAnimationFrame(loop);
  return () => window.cancelAnimationFrame(raf);
}
