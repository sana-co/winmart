import { ArrowRight } from "lucide-react";
import type { Product } from "../lib/supabase";
import { formatPrice } from "../lib/products";

type ProductCardProps = {
  product: Product;
  badge?: string;
  onView: (product: Product) => void;
};

export function ProductCard({ product, badge, onView }: ProductCardProps) {
  return (
    <div className="group mx-auto w-full max-w-[420px] overflow-hidden rounded-[8px] border border-gray-100 bg-white shadow-sm transition-all hover:shadow-lg sm:max-w-none">
      <button
        type="button"
        onClick={() => onView(product)}
        className="relative block h-[260px] w-full overflow-hidden text-left min-[430px]:h-[300px]"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image_url}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badge && (
          <span
            className="absolute left-3 top-3 rounded-full bg-[#273777] px-3 py-1 text-white"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "1px" }}
          >
            {badge}
          </span>
        )}
      </button>
      <div className="p-4">
        <p className="mb-1 text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px" }}>
          {product.name}
        </p>
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[#273777]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "16px" }}>
            {formatPrice(product.price)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => onView(product)}
          className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#f7f7f7] py-2.5 text-[#273777] transition-all group-hover:bg-[#273777] group-hover:text-white"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}
        >
          View Item <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-[8px] border border-gray-100 bg-white">
          <div className="h-[260px] animate-pulse bg-gray-200 min-[430px]:h-[300px]" />
          <div className="space-y-3 p-4">
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />
            <div className="h-10 w-full animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      ))}
    </div>
  );
}
