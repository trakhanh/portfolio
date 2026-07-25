import path from "node:path";
import { fileURLToPath } from "node:url";
import { PROJECT_IDS, writeProjectPages } from "./project-routes.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

await writeProjectPages({
  templatePath: path.join(root, "project.html"),
  targetRoot: root
});

console.log(`Generated ${PROJECT_IDS.length} static project routes.`);
