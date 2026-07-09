import { X } from "lucide-react";
import { formatPrice } from "../lib/products";
import type { Product } from "../lib/supabase";

type ProductQuickViewProps = {
  product: Product | null;
  tag?: string;
  onClose: () => void;
};

export function ProductQuickView({ product, tag, onClose }: ProductQuickViewProps) {
  if (!product) {
    return null;
  }

  const categories = product.category ? [product.category] : [];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[860px] overflow-hidden rounded-[16px] bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#253A8F] shadow-md transition-colors hover:bg-[#253A8F] hover:text-white"
          aria-label="Close item details"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_0.85fr]">
          <div className="relative min-h-[340px] bg-[#f2f4fb] md:min-h-[520px]">
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

          <div className="flex flex-col justify-center p-6 md:p-8">
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
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "28px" }}
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
              className="mt-6 text-[#606779]"
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px", lineHeight: "1.7" }}
            >
              {product.description || "A customer-ready Winmart pick with easy everyday styling, clean finishing, and a polished fit."}
            </p>

            <div className="mt-7">
              <button
                type="button"
                className="w-full rounded-[8px] border border-[#D9043D] px-5 py-3 text-[#D9043D] transition-colors hover:bg-[#D9043D] hover:text-white"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "14px" }}
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
