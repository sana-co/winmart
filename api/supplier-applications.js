import { cleanString, isEmail, requirePost, sendJson, supabase } from "./_supabase.js";

export default async function handler(request, response) {
  if (!requirePost(request, response)) return;

  const business = cleanString(request.body?.business);
  const contact = cleanString(request.body?.contact);
  const email = cleanString(request.body?.email);
  const phone = cleanString(request.body?.phone);
  const category = cleanString(request.body?.category);
  const website = cleanString(request.body?.website);
  const message = cleanString(request.body?.message);

  if (!business || !contact || !isEmail(email) || !category) {
    sendJson(response, 400, { error: "Business, contact person, valid email, and category are required." });
    return;
  }

  const { error } = await supabase.from("supplier_applications").insert({
    business,
    contact,
    email,
    phone: phone || null,
    category,
    website: website || null,
    message: message || null,
  });

  if (error) {
    sendJson(response, 500, { error: error.message });
    return;
  }

  sendJson(response, 201, { ok: true });
}
