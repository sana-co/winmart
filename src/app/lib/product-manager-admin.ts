import { getSupabaseClient } from "./supabase";

export type ManagedProductManager = {
  user_id: string;
  created_at: string;
  user: {
    id: string;
    email: string;
    created_at: string | null;
    last_sign_in_at: string | null;
  } | null;
};

export async function getManagedProductManagers() {
  const token = await getAccessToken();
  const response = await fetch("/api/admin-product-managers", {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(typeof result.error === "string" ? result.error : "Could not load product managers.");
  }

  return (result.productManagers ?? []) as ManagedProductManager[];
}

export async function addManagedProductManager(email: string, password: string) {
  return runProductManagerAction({ action: "add", email, password });
}

export async function removeManagedProductManager(userId: string) {
  return runProductManagerAction({ action: "remove", userId });
}

async function runProductManagerAction(payload: { action: "add"; email: string; password: string } | { action: "remove"; userId: string }) {
  const token = await getAccessToken();
  const response = await fetch("/api/admin-product-managers", {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await readJsonResponse(response);

  if (!response.ok) {
    throw new Error(typeof result.error === "string" ? result.error : "Could not update product managers.");
  }

  return (result.productManagers ?? []) as ManagedProductManager[];
}

async function readJsonResponse(response: Response) {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Product manager API returned an unexpected response. Refresh the admin page and try again.");
  }
}

async function getAccessToken() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  const token = data.session?.access_token;

  if (!token) {
    throw new Error("Sign in as an admin first.");
  }

  return token;
}
