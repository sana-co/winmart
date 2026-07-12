import { cleanString, requirePost, sendJson, supabase } from "./_supabase.js";

export default async function handler(request, response) {
  if (!requirePost(request, response)) return;

  const name = cleanString(request.body?.name);
  const message = cleanString(request.body?.message);
  const quality = Number(request.body?.quality || 0);
  const service = Number(request.body?.service || 0);
  const music = Number(request.body?.music || 0);
  const ambience = Number(request.body?.ambience || 0);
  const price = Number(request.body?.price || 0);
  const rating = Number(request.body?.rating || 0);

  if (!name || !message) {
    sendJson(response, 400, { error: "Name and message are required." });
    return;
  }

  // each category rating must be an integer between 1 and 5 (mandatory in UI)
  const cats = { quality, service, music, ambience, price };
  for (const [k, v] of Object.entries(cats)) {
    if (!Number.isInteger(v) || v < 1 || v > 5) {
      sendJson(response, 400, { error: `${k} rating must be an integer between 1 and 5.` });
      return;
    }
  }

  if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
    sendJson(response, 400, { error: "Rating must be between 0 and 5." });
    return;
  }

  const { error } = await supabase.from("feedback").insert({
    name,
    message,
    rating,
    quality,
    service,
    music,
    ambience,
    price,
  });

  if (error) {
    sendJson(response, 500, { error: error.message });
    return;
  }

  sendJson(response, 201, { ok: true });
}
