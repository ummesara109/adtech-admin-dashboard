"use strict";

/**
 * Single Vercel entry: serves /api/* and static files from /public.
 * vercel.json rewrites all routes here.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "public");
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".map": "application/json"
};

function sendJson(res, code, obj) {
  if (res.headersSent) return;
  res.statusCode = code;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(obj));
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const type = TYPES[ext] || "application/octet-stream";
  const data = fs.readFileSync(filePath);
  res.statusCode = 200;
  res.setHeader("Content-Type", type);
  if (ext === ".html" || ext === ".js") res.setHeader("Cache-Control", "no-store");
  res.end(data);
}

module.exports = async (req, res) => {
  try {
    let pathname = "/";
    try {
      pathname = new URL(req.url || "/", "http://localhost").pathname || "/";
    } catch (e) {
      return sendJson(res, 400, { error: "Bad request" });
    }

    if (pathname === "/api" || pathname.startsWith("/api/")) {
      const core = require("../lib/core");
      return await core.handler(req, res);
    }

    let rel = decodeURIComponent(pathname);
    if (rel.includes("\0") || rel.includes("..")) {
      return sendJson(res, 400, { error: "Bad request" });
    }
    if (rel === "/") rel = "/index.html";

    const file = path.normalize(path.join(ROOT, rel));
    if (!file.startsWith(ROOT + path.sep) && file !== ROOT) {
      res.statusCode = 403;
      return res.end("Forbidden");
    }

    if (fs.existsSync(file) && fs.statSync(file).isFile()) {
      return sendFile(res, file);
    }

    const index = path.join(ROOT, "index.html");
    if (fs.existsSync(index)) return sendFile(res, index);

    res.statusCode = 404;
    res.end("Not found");
  } catch (error) {
    console.error("Entry error:", error);
    sendJson(res, error.code || 500, {
      error: error.message || "Internal server error"
    });
  }
};
