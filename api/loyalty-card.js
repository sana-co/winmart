import { cleanString, isEmail, requirePost, sendJson, supabase } from "./_supabase.js";

function createCardNumber(id) {
  return `WM-${id.replace(/-/g, "").slice(0, 10).toUpperCase()}`;
}

function isDuplicateContactNumberError(error) {
  if (error?.code !== "23505") return false;

  const text = `${error.message ?? ""} ${error.details ?? ""} ${error.hint ?? ""}`.toLowerCase();
  return text.includes("contact_number") || text.includes("loyalty_card_requests");
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
    if (isDuplicateContactNumberError(error)) {
      sendJson(response, 409, {
        error: "This contact number is already registered for a loyalty card. Please use another number or contact us if you need help.",
      });
      return;
    }

    sendJson(response, 500, { error: "Could not submit your loyalty card request. Please try again shortly." });
    return;
  }

  sendJson(response, 201, { ok: true, cardNumber: createCardNumber(data.id) });
}
