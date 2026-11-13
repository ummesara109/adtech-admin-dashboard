"use strict";

/**
 * Shared Vercel serverless entry.
 * Lazy-load core so import failures become JSON errors instead of
 * FUNCTION_INVOCATION_FAILED with an empty body.
 */
module.exports = async (req, res) => {
  const json = (code, obj) => {
    try {
      res.statusCode = code;
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.setHeader("Cache-Control", "no-store");
      res.end(JSON.stringify(obj));
    } catch (e) {
      console.error("Failed to write response:", e);
    }
  };

  try {
    const core = require("../lib/core");
    return await core.handler(req, res);
  } catch (error) {
    console.error("API Error:", error);
    if (!res.headersSent) {
      json(error.code || 500, {
        error: error.message || "Internal server error"
      });
    }
  }
};
