import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { networkInterfaces } from "node:os";
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
    if (/^projects\/[^/]+\/?$/.test(relative)) {
      const routeIndex = path.posix.join(
        relative.replace(/\/$/, ""),
        "index.html"
      );
      relative = existsSync(path.resolve(root, routeIndex))
        ? routeIndex
        : "project.html";
    }
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
  .listen(port, "0.0.0.0", () => {
    console.log(`Local URL:   http://localhost:${port}`);
    const nets = networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const net of nets[name] || []) {
        if (net.family === "IPv4" && !net.internal) {
          console.log(`Network URL: http://${net.address}:${port}`);
        }
      }
    }
  });
