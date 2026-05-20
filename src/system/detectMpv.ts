import { existsSync } from "fs";

const MPV_PATHS = [
  "/mnt/c/Program Files/mpv.exe",
  "/mnt/c/Program Files/mpv/mpv.exe",
  "/usr/bin/mpv",
  "/usr/local/bin/mpv",
];

export function detectMpv(): string | null {
  for (const path of MPV_PATHS) {
    if (existsSync(path)) {
      return path;
    }
  }
  return null;
}