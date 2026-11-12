"use strict";

const core = require("../lib/core");

module.exports = async (req, res) => {
  try {
    await core.handler(req, res);
  } catch (error) {
    console.error("API Error:", error);

    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        error: "Internal server error"
      }));
    }
  }
};