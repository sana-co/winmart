import { existsSync, readFileSync } from "node:fs";

export function loadLocalEnvFiles() {
  for (const path of [".env", ".env.local"]) {
    if (!existsSync(path)) continue;

    const file = readFileSync(path, "utf8");
    for (const line of file.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (!match) continue;

      const key = match[1].trim();
      let value = match[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      process.env[key] ||= value;
    }
  }
}
