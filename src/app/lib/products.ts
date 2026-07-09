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
  const { data, error } = await supabase
    .from("products")
    .insert(payload)
    .select(productColumns)
    .single();

  if (error) {
    throw error;
  }

  return data as Product;
}

export async function updateProduct(id: string, payload: Partial<ProductPayload>) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from("products")
    .update(payload)
    .eq("id", id)
    .select(productColumns)
    .single();

  if (error) {
    throw error;
  }

  return data as Product;
}

export async function deleteProduct(id: string) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    throw error;
  }
}

export async function uploadProductImage(file: File) {
  const supabase = getSupabaseClient();
  const extension = file.name.split(".").pop() || "jpg";
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9-]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
  const path = `products/${crypto.randomUUID()}-${safeName || "item"}.${extension}`;

  const { error } = await supabase.storage.from("product-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from("product-images").getPublicUrl(path);
  return data.publicUrl;
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
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
  }).format(price);
}
