import { cleanString, isEmail, sendJson, supabase } from "./_supabase.js";

function getBearerToken(request) {
  const authorization = request.headers?.authorization || request.headers?.Authorization || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || "";
}

async function verifyAdmin(request, response) {
  const token = getBearerToken(request);

  if (!token) {
    sendJson(response, 401, { error: "Sign in as an admin first." });
    return null;
  }

  const { data: userData, error: userError } = await supabase.auth.getUser(token);

  if (userError || !userData.user) {
    sendJson(response, 401, { error: "Your admin session could not be verified." });
    return null;
  }

  const { data: admin, error: adminError } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userData.user.id)
    .maybeSingle();

  if (adminError) {
    sendJson(response, 500, { error: adminError.message });
    return null;
  }

  if (!admin) {
    sendJson(response, 403, { error: "Only admins can manage product managers." });
    return null;
  }

  return userData.user;
}

async function listAuthUsers() {
  const users = [];
  let page = 1;

  while (page < 20) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 1000 });

    if (error) {
      throw error;
    }

    users.push(...(data.users ?? []));

    if (!data.users || data.users.length < 1000) {
      break;
    }

    page += 1;
  }

  return users;
}

function userSummary(user) {
  if (!user) return null;

  return {
    id: user.id,
    email: user.email ?? "",
    created_at: user.created_at ?? null,
    last_sign_in_at: user.last_sign_in_at ?? null,
  };
}

async function getProductManagers() {
  const [{ data: managers, error }, users] = await Promise.all([
    supabase.from("product_managers").select("user_id,created_at").order("created_at", { ascending: false }),
    listAuthUsers(),
  ]);

  if (error) {
    throw error;
  }

  const usersById = new Map(users.map((user) => [user.id, userSummary(user)]));

  return (managers ?? []).map((manager) => ({
    ...manager,
    user: usersById.get(manager.user_id) ?? null,
  }));
}

async function findUserByEmail(email) {
  const users = await listAuthUsers();
  return users.find((user) => (user.email ?? "").toLowerCase() === email.toLowerCase()) ?? null;
}

async function handleAdd(request, response) {
  const email = cleanString(request.body?.email);
  const password = cleanString(request.body?.password);

  if (!isEmail(email)) {
    sendJson(response, 400, { error: "Enter a valid product manager email." });
    return;
  }

  let user = await findUserByEmail(email);

  if (!user) {
    if (password.length < 6) {
      sendJson(response, 400, { error: "Enter a temporary password with at least 6 characters to create this user." });
      return;
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: "product_manager",
      },
    });

    if (error || !data.user) {
      sendJson(response, 500, { error: error?.message || "Could not create product manager user." });
      return;
    }

    user = data.user;
  }

  const { error } = await supabase.from("product_managers").upsert({ user_id: user.id });

  if (error) {
    sendJson(response, 500, { error: error.message });
    return;
  }

  sendJson(response, 200, { productManagers: await getProductManagers() });
}

async function handleRemove(request, response) {
  const userId = cleanString(request.body?.userId);

  if (!userId) {
    sendJson(response, 400, { error: "Product manager id is required." });
    return;
  }

  const { error } = await supabase.from("product_managers").delete().eq("user_id", userId);

  if (error) {
    sendJson(response, 500, { error: error.message });
    return;
  }

  sendJson(response, 200, { productManagers: await getProductManagers() });
}

export default async function handler(request, response) {
  const admin = await verifyAdmin(request, response);
  if (!admin) {
    return;
  }

  try {
    if (request.method === "GET") {
      sendJson(response, 200, { productManagers: await getProductManagers() });
      return;
    }

    if (request.method !== "POST") {
      response.setHeader("Allow", "GET, POST");
      sendJson(response, 405, { error: "Method not allowed" });
      return;
    }

    if (request.body?.action === "add") {
      await handleAdd(request, response);
      return;
    }

    if (request.body?.action === "remove") {
      await handleRemove(request, response);
      return;
    }

    sendJson(response, 400, { error: "Unknown product manager action." });
  } catch (error) {
    sendJson(response, 500, { error: error instanceof Error ? error.message : "Could not manage product managers." });
  }
}
