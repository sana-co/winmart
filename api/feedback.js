import { cleanString, requirePost, sendJson, supabase } from "./_supabase.js";

export default async function handler(request, response) {
  if (!requirePost(request, response)) return;

  const name = cleanString(request.body?.name);
  const topic = cleanString(request.body?.topic);
  const message = cleanString(request.body?.message);
  const rating = Number(request.body?.rating || 0);

  if (!name || !message) {
    sendJson(response, 400, { error: "Name and message are required." });
    return;
  }

  if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
    sendJson(response, 400, { error: "Rating must be between 0 and 5." });
    return;
  }

  const { error } = await supabase.from("feedback").insert({
    name,
    topic: topic || null,
    message,
    rating,
  });

  if (error) {
    sendJson(response, 500, { error: error.message });
    return;
  }

  sendJson(response, 201, { ok: true });
}
