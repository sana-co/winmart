import type { Product } from "./supabase";

export const savedItemsKey = "winmart-saved-items";
export const savedItemsChangedEvent = "winmart-saved-items-changed";

export function getSavedProducts() {
  try {
    const savedProducts = JSON.parse(localStorage.getItem(savedItemsKey) || "[]");
    return Array.isArray(savedProducts) ? (savedProducts as Product[]) : [];
  } catch {
    return [];
  }
}

export function isProductSaved(productId: string) {
  return getSavedProducts().some((item) => item.id === productId);
}

export function toggleSavedProduct(product: Product) {
  const savedProducts = getSavedProducts();
  const alreadySaved = savedProducts.some((item) => item.id === product.id);
  const nextSavedProducts = alreadySaved
    ? savedProducts.filter((item) => item.id !== product.id)
    : [{ ...product }, ...savedProducts];

  localStorage.setItem(savedItemsKey, JSON.stringify(nextSavedProducts));
  window.dispatchEvent(new Event(savedItemsChangedEvent));

  return !alreadySaved;
}
