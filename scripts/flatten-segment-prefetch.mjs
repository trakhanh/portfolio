// Next 16's static export writes per-segment prefetch payloads into nested
// folders (projects/x/__next.projects/$d$slug/__PAGE__.txt) while the client
// asks for flat names (projects/x/__next.projects.$d$slug.__PAGE__.txt).
// Hosts with rewrites paper over it; GitHub Pages answers 404, so every
// prefetch failed. Copy each nested payload to its flat name after the build.
import { copyFile, readdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve(process.argv[2] ?? "out");

async function files(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await files(p)));
    else out.push(p);
  }
  return out;
}

async function walk(dir) {
  let copied = 0;
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name);
    if (e.name.startsWith("__next.")) {
      for (const f of await files(p)) {
        const flat = path.relative(dir, f).split(path.sep).join(".");
        await copyFile(f, path.join(dir, flat));
        copied++;
      }
    } else {
      copied += await walk(p);
    }
  }
  return copied;
}

const n = await walk(OUT);
console.log(`flatten-segment-prefetch: ${n} payload(s) copied to flat names`);
