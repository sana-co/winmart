import { X } from "lucide-react";

type ProductQuickViewProps = {
  product: {
    img: string;
    name: string;
    price: string;
    original?: string | null;
    tag?: string;
    cat?: string[];
  } | null;
  onClose: () => void;
};

export function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  if (!product) {
    return null;
  }

  const categories = product.cat?.filter((cat) => cat !== "All").slice(0, 3) ?? [];

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
              src={product.img}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {product.tag && (
              <span
                className="absolute left-4 top-4 rounded-full bg-[#D9043D] px-3 py-1 text-[12px] font-semibold tracking-wide text-white"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {product.tag}
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
                {product.price}
              </span>
              {product.original && (
                <span
                  className="text-gray-400 line-through"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "17px" }}
                >
                  {product.original}
                </span>
              )}
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
              A customer-ready Winmart pick with easy everyday styling, clean finishing, and a polished fit.
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
