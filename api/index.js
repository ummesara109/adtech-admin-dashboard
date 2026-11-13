"use strict";

/* Temporary minimal handler to verify Vercel Node runtime is healthy. */
module.exports = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(
    JSON.stringify({
      ok: true,
      url: req.url || null,
      method: req.method || null,
      node: process.version
    })
  );
};
