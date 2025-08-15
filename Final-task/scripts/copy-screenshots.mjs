import { existsSync, mkdirSync, readdirSync, copyFileSync } from "fs";
import { join } from "path";

const SRC = join(process.cwd(), "cypress", "screenshots");
const DEST = join(process.cwd(), "docs", "screenshots");

if (!existsSync(SRC)) {
  console.log("No Cypress screenshots directory found, skipping.");
  process.exit(0);
}
if (!existsSync(DEST)) {
  mkdirSync(DEST, { recursive: true });
}

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.match(/\.png$/i)) {
      const base = entry.name;
      const dest = join(DEST, base);
      let finalDest = dest;
      let i = 1;
      while (existsSync(finalDest)) {
        const parts = base.split(".");
        const ext = parts.pop();
        finalDest = join(DEST, parts.join(".") + `-${i}.` + ext);
        i++;
      }
      copyFileSync(full, finalDest);
      console.log("Copied", full, "->", finalDest);
    }
  }
}

walk(SRC);
console.log("Screenshot copy complete.");
