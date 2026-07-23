import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 4173);
const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml"],
  [".ico", "image/x-icon"]
]);

http
  .createServer((request, response) => {
    const url = new URL(request.url || "/", "http://localhost");
    let relative = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    if (!relative || relative === "index.html") relative = "index.html";
    if (relative === "og.png") relative = "public/og.png";

    const candidate = path.resolve(root, relative);
    if (!candidate.startsWith(root) || !existsSync(candidate) || statSync(candidate).isDirectory()) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "content-type": types.get(path.extname(candidate).toLowerCase()) || "application/octet-stream",
      "cache-control": "no-cache"
    });
    createReadStream(candidate).pipe(response);
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`Local URL: http://127.0.0.1:${port}`);
  });
