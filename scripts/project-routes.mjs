import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const PROJECT_IDS = Object.freeze([
  "computer-vision-inspection",
  "multi-task-learning",
  "finger-counting",
  "recruitment-chatbot",
  "internal-automation",
  "preorder-workshop-web",
  "hrm-application",
  "ai-creative-production"
]);

export async function writeProjectPages({ templatePath, targetRoot }) {
  const template = await readFile(templatePath, "utf8");

  await Promise.all(
    PROJECT_IDS.map(async (projectId) => {
      const routeDirectory = path.join(targetRoot, "projects", projectId);
      await mkdir(routeDirectory, { recursive: true });
      await writeFile(path.join(routeDirectory, "index.html"), template, "utf8");
    })
  );
}
