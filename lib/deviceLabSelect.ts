import type { DeviceLabId } from "@/data/projects";

/** Cross-section request: "scroll to #projects and select this project in the Device Lab". */
export const DEVICE_LAB_SELECT = "devicelab:select";

export function selectInDeviceLab(id: DeviceLabId) {
  window.dispatchEvent(new CustomEvent<DeviceLabId>(DEVICE_LAB_SELECT, { detail: id }));
}
