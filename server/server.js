const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const rootDir = path.resolve(__dirname, "..");
const dataDir = path.join(rootDir, "data");
const submissionsFile = path.join(dataDir, "submissions.json");
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon"
};

async function ensureStorage() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(submissionsFile);
  } catch {
    await fs.writeFile(submissionsFile, "[]\n", "utf8");
  }
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  const chunks = [];
  let size = 0;

  for await (const chunk of req) {
    size += chunk.length;
    if (size > 1_000_000) {
      throw new Error("Request body too large");
    }
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function required(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateSubmission(type, payload) {
  const errors = [];

  if (type === "quote") {
    ["name", "phone", "year", "make", "model", "service", "urgency", "message"].forEach((field) => {
      if (!required(payload[field])) errors.push(`${field} is required`);
    });
  }

  if (type === "contact") {
    ["name", "phone", "message"].forEach((field) => {
      if (!required(payload[field])) errors.push(`${field} is required`);
    });
  }

  return errors;
}

function cleanPayload(payload) {
  const clean = {};
  Object.entries(payload || {}).forEach(([key, value]) => {
    if (typeof value === "string") {
      clean[key] = value.trim().slice(0, 4000);
    }
  });
  return clean;
}

async function saveSubmission(type, payload) {
  await ensureStorage();
  const current = JSON.parse(await fs.readFile(submissionsFile, "utf8"));
  const entry = {
    id: crypto.randomUUID(),
    type,
    createdAt: new Date().toISOString(),
    status: "new",
    payload
  };

  current.unshift(entry);
  await fs.writeFile(submissionsFile, `${JSON.stringify(current, null, 2)}\n`, "utf8");
  return entry;
}

async function handleApi(req, res, pathname) {
  if (req.method === "GET" && pathname === "/api/health") {
    sendJson(res, 200, { ok: true, service: "dad-bod-garage-site" });
    return;
  }

  if (req.method === "POST" && ["/api/quote", "/api/contact"].includes(pathname)) {
    try {
      const type = pathname.endsWith("quote") ? "quote" : "contact";
      const payload = cleanPayload(await readBody(req));
      const errors = validateSubmission(type, payload);

      if (errors.length) {
        sendJson(res, 422, { ok: false, errors });
        return;
      }

      const entry = await saveSubmission(type, payload);
      sendJson(res, 201, {
        ok: true,
        id: entry.id,
        createdAt: entry.createdAt,
        message: type === "quote" ? "Estimate request received." : "Message received."
      });
    } catch (error) {
      sendJson(res, 400, { ok: false, error: error.message || "Invalid request" });
    }
    return;
  }

  sendJson(res, 404, { ok: false, error: "API route not found" });
}

async function serveStatic(req, res, pathname) {
  const urlPath = pathname === "/" ? "/index.html" : pathname;
  const resolvedPath = path.resolve(rootDir, `.${decodeURIComponent(urlPath)}`);

  if (!resolvedPath.startsWith(rootDir + path.sep) && resolvedPath !== rootDir) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const stat = await fs.stat(resolvedPath);
    const filePath = stat.isDirectory() ? path.join(resolvedPath, "index.html") : resolvedPath;
    const ext = path.extname(filePath).toLowerCase();
    const body = await fs.readFile(filePath);

    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

async function main() {
  await ensureStorage();

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || `localhost:${port}`}`);

    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url.pathname);
      return;
    }

    await serveStatic(req, res, url.pathname);
  });

  server.listen(port, host || undefined, () => {
    console.log(`Dad Bod Garage site running at http://localhost:${port}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
