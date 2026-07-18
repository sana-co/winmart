import { getSupabaseClient, type Product } from "./supabase";

export type ProductPayload = {
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_new_arrival: boolean;
  is_top_pick: boolean;
};

const productColumns = "id,name,description,price,image_url,category,is_new_arrival,is_top_pick,created_at,updated_at";

export async function getProductsBySection(section: "new-arrivals" | "top-picks") {
  const supabase = getSupabaseClient();
  const flag = section === "new-arrivals" ? "is_new_arrival" : "is_top_pick";

  const { data, error } = await supabase
    .from("products")
    .select(productColumns)
    .eq(flag, true)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as Product[];
}

export async function getAllProducts() {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .select(productColumns)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as Product[];
}

export async function addProduct(payload: ProductPayload) {
  const supabase = getSupabaseClient();
  const { data, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  const token = data.session?.access_token;

  if (!token) {
    throw new Error("Sign in before adding products.");
  }

  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(typeof result.error === "string" ? result.error : "Could not add product.");
  }

  return result.product as Product;
}

export async function updateProduct(id: string, payload: Partial<ProductPayload>) {
  const supabase = getSupabaseClient();
  const { data, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  const token = data.session?.access_token;

  if (!token) {
    throw new Error("Sign in before updating products.");
  }

  const response = await fetch("/api/products", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, product: payload }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(typeof result.error === "string" ? result.error : "Could not update product.");
  }

  return result.product as Product;
}

export async function deleteProduct(id: string) {
  const supabase = getSupabaseClient();
  const { data, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  const token = data.session?.access_token;

  if (!token) {
    throw new Error("Sign in before deleting products.");
  }

  const response = await fetch("/api/products", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(typeof result.error === "string" ? result.error : "Could not delete product.");
  }
}

export async function uploadProductImage(file: File) {
  const supabase = getSupabaseClient();
  const { data, error: sessionError } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  const token = data.session?.access_token;

  if (!token) {
    throw new Error("Sign in before uploading product images.");
  }

  const response = await fetch("/api/products", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action: "create-image-upload", fileName: file.name }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(typeof result.error === "string" ? result.error : "Could not prepare image upload.");
  }

  const upload = result.upload as { path: string; token: string; publicUrl: string } | undefined;

  if (!upload?.path || !upload.token || !upload.publicUrl) {
    throw new Error("Could not prepare image upload.");
  }

  const { error } = await supabase.storage.from("product-images").uploadToSignedUrl(upload.path, upload.token, file, {
    cacheControl: "3600",
    contentType: file.type || undefined,
  });

  if (error) {
    throw error;
  }

  return upload.publicUrl;
}

export async function isCurrentUserProductManager(userId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("product_managers")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return Boolean(data);
}

export async function isCurrentUserAdmin(userId: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return Boolean(data);
}

export function formatPrice(price: number) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
  }).format(price);

  return `LKR ${formattedPrice}`;
}
