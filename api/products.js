import { randomUUID } from "crypto";
import { cleanString, sendJson, supabase } from "./_supabase.js";

const productColumns = "id,name,description,price,image_url,category,is_new_arrival,is_top_pick,created_at,updated_at";

function getBearerToken(request) {
  const authorization = request.headers?.authorization || request.headers?.Authorization || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

async function verifyProductManager(request, response, action) {
  const token = getBearerToken(request);

  if (!token) {
    sendJson(response, 401, { error: `Sign in before ${action} products.` });
    return null;
  }

  const { data: userData, error: userError } = await supabase.auth.getUser(token);

  if (userError || !userData.user) {
    sendJson(response, 401, { error: "Your session could not be verified." });
    return null;
  }

  const { data: manager, error: managerError } = await supabase
    .from("product_managers")
    .select("user_id")
    .eq("user_id", userData.user.id)
    .maybeSingle();

  if (managerError) {
    sendJson(response, 500, { error: managerError.message });
    return null;
  }

  if (!manager) {
    sendJson(response, 403, { error: `Only product managers can ${action} products.` });
    return null;
  }

  return userData.user;
}

function cleanProductPayload(body, partial = false) {
  const payload = {};

  if (!partial || "name" in body) {
    payload.name = cleanString(body.name);
  }

  if (!partial || "description" in body) {
    payload.description = cleanString(body.description);
  }

  if (!partial || "price" in body) {
    const price = Number(body.price);
    if (!Number.isFinite(price) || price < 0) {
      throw new Error("Enter a valid product price.");
    }
    payload.price = price;
  }

  if (!partial || "image_url" in body) {
    payload.image_url = cleanString(body.image_url);
  }

  if (!partial || "category" in body) {
    payload.category = cleanString(body.category);
  }

  if (!partial || "is_new_arrival" in body) {
    payload.is_new_arrival = Boolean(body.is_new_arrival);
  }

  if (!partial || "is_top_pick" in body) {
    payload.is_top_pick = Boolean(body.is_top_pick);
  }

  if (!partial && (!payload.name || !payload.image_url)) {
    throw new Error("Product name and image are required.");
  }

  return payload;
}

function getImagePath(fileName) {
  const extension = cleanString(fileName).split(".").pop() || "jpg";
  const safeName = cleanString(fileName)
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  return `products/${randomUUID()}-${safeName || "item"}.${extension}`;
}

async function handleCreateImageUpload(request, response) {
  const user = await verifyProductManager(request, response, "adding");
  if (!user) {
    return;
  }

  const path = getImagePath(request.body?.fileName);
  const { data, error } = await supabase.storage
    .from("product-images")
    .createSignedUploadUrl(path);

  if (error) {
    sendJson(response, 500, { error: error.message });
    return;
  }

  const { data: publicUrlData } = supabase.storage.from("product-images").getPublicUrl(path);

  sendJson(response, 200, {
    upload: {
      path: data.path,
      token: data.token,
      publicUrl: publicUrlData.publicUrl,
    },
  });
}

async function handleCreate(request, response) {
  const user = await verifyProductManager(request, response, "adding");
  if (!user) {
    return;
  }

  let payload;
  try {
    payload = cleanProductPayload(request.body ?? {});
  } catch (error) {
    sendJson(response, 400, { error: error instanceof Error ? error.message : "Invalid product details." });
    return;
  }

  const { data, error } = await supabase
    .from("products")
    .insert(payload)
    .select(productColumns)
    .single();

  if (error) {
    sendJson(response, 500, { error: error.message });
    return;
  }

  sendJson(response, 201, { product: data });
}

async function handleUpdate(request, response) {
  const user = await verifyProductManager(request, response, "updating");
  if (!user) {
    return;
  }

  const id = cleanString(request.body?.id);

  if (!id) {
    sendJson(response, 400, { error: "Product id is required." });
    return;
  }

  let payload;
  try {
    payload = cleanProductPayload(request.body?.product ?? {}, true);
  } catch (error) {
    sendJson(response, 400, { error: error instanceof Error ? error.message : "Invalid product details." });
    return;
  }

  if (Object.keys(payload).length === 0) {
    sendJson(response, 400, { error: "No product fields were provided." });
    return;
  }

  const { data, error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", id)
    .select(productColumns)
    .maybeSingle();

  if (error) {
    sendJson(response, 500, { error: error.message });
    return;
  }

  if (!data) {
    sendJson(response, 404, { error: "Product was not found." });
    return;
  }

  sendJson(response, 200, { product: data });
}

async function handleDelete(request, response) {
  const user = await verifyProductManager(request, response, "deleting");
  if (!user) {
    return;
  }

  const id = cleanString(request.body?.id);

  if (!id) {
    sendJson(response, 400, { error: "Product id is required." });
    return;
  }

  const { data: deletedProduct, error: deleteError } = await supabase
    .from("products")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (deleteError) {
    sendJson(response, 500, { error: deleteError.message });
    return;
  }

  if (!deletedProduct) {
    sendJson(response, 404, { error: "Product was not found or was already deleted." });
    return;
  }

  sendJson(response, 200, { ok: true });
}

export default async function handler(request, response) {
  if (request.method === "POST" && request.body?.action === "create-image-upload") {
    await handleCreateImageUpload(request, response);
    return;
  }

  if (request.method === "POST") {
    await handleCreate(request, response);
    return;
  }

  if (request.method === "PATCH") {
    await handleUpdate(request, response);
    return;
  }

  if (request.method === "DELETE") {
    await handleDelete(request, response);
    return;
  }

  if (!["POST", "PATCH", "DELETE"].includes(request.method)) {
    response.setHeader("Allow", "POST, PATCH, DELETE");
    sendJson(response, 405, { error: "Method not allowed" });
    return;
  }
}
