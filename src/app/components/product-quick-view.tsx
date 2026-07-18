import { Check, Heart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { formatPrice } from "../lib/products";
import { isProductSaved, toggleSavedProduct } from "../lib/saved-items";
import type { Product } from "../lib/supabase";

type ProductQuickViewProps = {
  product: Product | null;
  tag?: string;
  onClose: () => void;
};

export function ProductQuickView({ product, tag, onClose }: ProductQuickViewProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (!product) {
      setIsSaved(false);
      setStatusMessage("");
      return;
    }

    setIsSaved(isProductSaved(product.id));
  }, [product]);

  useEffect(() => {
    if (!statusMessage) return;

    const timeout = window.setTimeout(() => setStatusMessage(""), 2400);
    return () => window.clearTimeout(timeout);
  }, [statusMessage]);

  if (!product) {
    return null;
  }

  const categories = product.category ? [product.category] : [];

  const toggleSavedItem = () => {
    try {
      const nextIsSaved = toggleSavedProduct(product);
      setIsSaved(nextIsSaved);
      setStatusMessage(nextIsSaved ? "Saved to your items" : "Removed from saved items");
    } catch {
      setStatusMessage("Could not save this item");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[calc(100dvh-24px)] w-full max-w-[860px] overflow-y-auto rounded-[10px] bg-white shadow-2xl sm:max-h-[calc(100dvh-48px)] sm:rounded-[16px]"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#253A8F] shadow-md transition-colors hover:bg-[#253A8F] hover:text-white sm:right-4 sm:top-4"
          aria-label="Close item details"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.85fr]">
          <div className="relative h-[230px] bg-[#f2f4fb] min-[430px]:h-[300px] md:h-auto md:min-h-[520px]">
            <img
              src={product.image_url}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {tag && (
              <span
                className="absolute left-4 top-4 rounded-full bg-[#D9043D] px-3 py-1 text-[12px] font-semibold tracking-wide text-white"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {tag}
              </span>
            )}
          </div>

          <div className="flex flex-col justify-center p-5 sm:p-6 md:p-8">
            <p
              className="mb-3 text-[#D9043D]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "13px", letterSpacing: "1.2px" }}
            >
              QUICK VIEW
            </p>
            <h2
              className="text-[#191919]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "clamp(26px, 4vw, 38px)", lineHeight: "1.1" }}
            >
              {product.name}
            </h2>

            <div className="mt-5 flex items-center gap-3">
              <span
                className="text-[#253A8F]"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "clamp(22px, 6vw, 28px)" }}
              >
                {formatPrice(product.price)}
              </span>
            </div>

            {categories.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full border border-[#253A8F]/15 bg-[#253A8F]/5 px-3 py-1 text-[#253A8F]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "12px" }}
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}

            <p
              className="mt-4 text-[#606779] sm:mt-6"
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px", lineHeight: "1.7" }}
            >
              {product.description || "A customer-ready Winmart pick with easy everyday styling, clean finishing, and a polished fit."}
            </p>

            <div className="mt-5 sm:mt-7">
              <button
                type="button"
                onClick={toggleSavedItem}
                className={`flex w-full items-center justify-center gap-2 rounded-[8px] border px-5 py-3 transition-colors ${
                  isSaved
                    ? "border-[#253A8F] bg-[#253A8F] text-white hover:bg-[#1f3179]"
                    : "border-[#D9043D] text-[#D9043D] hover:bg-[#D9043D] hover:text-white"
                }`}
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "14px" }}
                aria-pressed={isSaved}
              >
                {isSaved ? <Check size={17} /> : <Heart size={17} />}
                {isSaved ? "Saved" : "Save Item"}
              </button>
              {statusMessage && (
                <p
                  className="mt-3 text-center text-[#606779]"
                  style={{ fontFamily: "Roboto, sans-serif", fontSize: "13px" }}
                  role="status"
                >
                  {statusMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
