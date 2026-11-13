"use strict";

/* Explicit /api/login function so login never depends on catch-all rewrites */
module.exports = require("./_handler");
