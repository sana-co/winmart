import { cleanString, isEmail, requirePost, sendJson, supabase } from "./_supabase.js";

function createCardNumber(id) {
  return `WM-${id.replace(/-/g, "").slice(0, 10).toUpperCase()}`;
}

export default async function handler(request, response) {
  if (!requirePost(request, response)) return;

  const fullName = cleanString(request.body?.fullName);
  const address = cleanString(request.body?.address);
  const email = cleanString(request.body?.email);
  const contactNumber = cleanString(request.body?.contactNumber);

  if (!fullName || !address || !isEmail(email) || !contactNumber) {
    sendJson(response, 400, { error: "Full name, address, valid email, and contact number are required." });
    return;
  }

  const { data, error } = await supabase
    .from("loyalty_card_requests")
    .insert({
      full_name: fullName,
      address,
      email,
      contact_number: contactNumber,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Failed to insert loyalty card request:", error);
    sendJson(response, 500, { error: error.message });
    return;
  }

  sendJson(response, 201, { ok: true, cardNumber: createCardNumber(data.id) });
}
