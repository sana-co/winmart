import { createClient } from "@supabase/supabase-js";
import { loadLocalEnvFiles } from "./_env.js";

loadLocalEnvFiles();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
}

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
  },
});

export function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

export function requirePost(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { error: "Method not allowed" });
    return false;
  }

  return true;
}

export function isEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}
