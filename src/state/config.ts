import {
  mkdirSync,
  existsSync,
  writeFileSync,
  readFileSync,
} from "fs";
import os from "os";
import path from "path";

import { detectMpv } from "../system/detectMpv";

export const CONFIG_DIR = path.join(os.homedir(), ".sonaris");
export const CONFIG_PATH = path.join(CONFIG_DIR, "config.json");

export type Config = {
    jamendoApiKey?: string;
    mpvPath?: string;
}

export function initializeConfig(): Config {
    if( !existsSync(CONFIG_DIR)) {
        mkdirSync(CONFIG_DIR, { recursive: true });
    }
    
    const config: Config = {
        mpvPath: detectMpv() ?? undefined,
    }
    
    writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
    return config;
}

export function loadConfig(): Config {
    if (!existsSync(CONFIG_PATH)) {
        return initializeConfig();
    }

    return JSON.parse(readFileSync(CONFIG_PATH, "utf-8"));
}

export function saveConfig(config: Config): void {
    if (!existsSync(CONFIG_DIR)) {
        mkdirSync(CONFIG_DIR, { recursive: true });
    }
    writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

export function updateConfig(updates: Partial<Config>): void {
    const currentConfig = loadConfig();
    const newConfig = { ...currentConfig, ...updates };
    saveConfig(newConfig);
}