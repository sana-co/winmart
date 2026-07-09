import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string;
  category: string | null;
  is_new_arrival: boolean;
  is_top_pick: boolean;
  created_at: string;
  updated_at: string;
};

let client: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey === "your-anon-key") {
    throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
  }

  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }

  return client;
}
