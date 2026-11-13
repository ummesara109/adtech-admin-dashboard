"use strict";

module.exports = async (req, res) => {
  const json = (code, obj) => {
    if (res.headersSent) return;
    res.statusCode = code;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(JSON.stringify(obj));
  };

  try {
    const core = require("../lib/core");
    return await core.handler(req, res);
  } catch (error) {
    console.error("API Error:", error);
    json(error.code || 500, { error: error.message || "Internal server error" });
  }
};
