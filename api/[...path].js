"use strict";

/* Catch-all so /api/login, /api/bootstrap, etc. hit this function on Vercel
   without fragile rewrites that can loop on /api/index. */
module.exports = require("./_handler");
