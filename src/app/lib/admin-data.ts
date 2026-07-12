import { getSupabaseClient } from "./supabase";

export type FeedbackEntry = {
  id: string;
  name: string;
  email: string | null;
  subject: string | null;
  topic: string | null;
  message: string;
  rating: number;
  quality?: number;
  service?: number;
  music?: number;
  ambience?: number;
  price?: number;
  status: string;
  created_at: string;
};

export type SupplierApplication = {
  id: string;
  business: string;
  contact: string;
  email: string;
  phone: string | null;
  category: string;
  website: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

export type LoyaltyRequest = {
  id: string;
  full_name: string;
  address: string;
  email: string;
  contact_number: string;
  status: string;
  created_at: string;
};

export async function getAdminInfoData() {
  const supabase = getSupabaseClient();
  const [feedback, suppliers, loyalty, user] = await Promise.all([
    supabase.from("feedback").select("*").order("created_at", { ascending: false }),
    supabase.from("supplier_applications").select("*").order("created_at", { ascending: false }),
    supabase.from("loyalty_card_requests").select("*").order("created_at", { ascending: false }),
    supabase.auth.getUser(),
  ]);

  if (feedback.error) throw feedback.error;
  if (suppliers.error) throw suppliers.error;
  if (loyalty.error) throw loyalty.error;
  if (user.error) throw user.error;

  return {
    feedback: (feedback.data ?? []) as FeedbackEntry[],
    suppliers: (suppliers.data ?? []) as SupplierApplication[],
    loyalty: (loyalty.data ?? []) as LoyaltyRequest[],
    user: user.data.user,
  };
}

export async function deleteFeedbackEntry(id: string) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("feedback").delete().eq("id", id);

  if (error) throw error;
}

export async function deleteSupplierApplication(id: string) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("supplier_applications").delete().eq("id", id);

  if (error) throw error;
}

export async function deleteLoyaltyRequest(id: string) {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from("loyalty_card_requests").delete().eq("id", id);

  if (error) throw error;
}

export function formatDateTime(value?: string | null) {
  if (!value) return "Not available";

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
