"use strict";
require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
/* Accept either name — dashboards have used both in docs/env examples. */
const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY;

let client = null;

function getSupabase() {
  if (client) return client;
  if (!supabaseUrl || !supabaseSecretKey) {
    const err = new Error(
      "Server is not configured: set SUPABASE_URL and SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY) on Vercel."
    );
    err.code = 500;
    throw err;
  }
  client = createClient(supabaseUrl, supabaseSecretKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  return client;
}

module.exports = new Proxy(
  {},
  {
    get(_t, prop) {
      const sb = getSupabase();
      const value = sb[prop];
      return typeof value === "function" ? value.bind(sb) : value;
    }
  }
);
