import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const client = path.join(dist, "client");

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, "server"), { recursive: true });
await mkdir(client, { recursive: true });

for (const entry of ["index.html", "project.html", "css", "js", "img", "files"]) {
  const source = path.join(root, entry);
  if (!existsSync(source)) continue;
  await cp(source, path.join(client, entry), { recursive: true });
}

const publicDir = path.join(root, "public");
if (existsSync(publicDir)) {
  await cp(publicDir, client, { recursive: true });
}

if (existsSync(path.join(root, "CNAME"))) {
  await cp(path.join(root, "CNAME"), path.join(client, "CNAME"));
}

const html = await readFile(path.join(client, "index.html"), "utf8");
if (!html.includes("AI × ERP Operating System") || !html.includes("portfolio.js")) {
  throw new Error("Built HTML is missing required portfolio content.");
}

const detailHtml = await readFile(path.join(client, "project.html"), "utf8");
if (
  !detailHtml.includes("project-detail.js") ||
  !existsSync(path.join(client, "js", "project-details-data.js"))
) {
  throw new Error("Built project case study is missing required content.");
}

const worker = `const INDEX_PATH = "/index.html";
const PROJECT_PATH = "/project.html";

export default {
  async fetch(request, env) {
    if (!env?.ASSETS?.fetch) {
      return new Response("Static asset binding is unavailable.", { status: 503 });
    }

    const response = await env.ASSETS.fetch(request);
    if (response.status !== 404) return response;

    const url = new URL(request.url);
    if (request.method === "GET" && /^\\/projects\\/[^/]+\\/?$/.test(url.pathname)) {
      return env.ASSETS.fetch(new Request(new URL(PROJECT_PATH, url), request));
    }

    if (request.method === "GET" && !url.pathname.includes(".")) {
      return env.ASSETS.fetch(new Request(new URL(INDEX_PATH, url), request));
    }

    return response;
  }
};
`;

await writeFile(path.join(dist, "server", "index.js"), worker, "utf8");

console.log("Portfolio build completed: dist/client + dist/server/index.js");
