import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { formatPrice, getProductsBySection } from "../lib/products";
import type { Product } from "../lib/supabase";

export function WinmartNewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    getProductsBySection("new-arrivals")
      .then((items) => {
        if (mounted) {
          setProducts(items.slice(0, 3));
          setError("");
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Could not load new arrivals.");
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="w-full bg-[#f7f7f7] py-10 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section heading */}
        <div className="relative mb-10 inline-block">
          <div
            className="absolute bottom-0 left-0 h-[10px] bg-[#253A8F] opacity-30 rounded"
            style={{ width: "85%", transform: "rotate(-1deg)" }}
          />
          <h2
            className="relative"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(28px, 3.5vw, 48px)",
              color: "#191919",
              letterSpacing: "2px",
            }}
          >
            NEW ARRIVALS
          </h2>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-[420px] animate-pulse rounded-[8px] bg-gray-200 lg:h-[520px]" />
            ))}
          </div>
        )}
        {error && <p className="rounded-[8px] bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        {!loading && !error && products.length === 0 && (
          <p className="rounded-[8px] bg-white p-6 text-center text-[#606779]">No new arrivals are available yet.</p>
        )}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/new-arrivals${product.category ? `?category=${encodeURIComponent(product.category)}` : ""}`}
                className="group flex flex-col gap-5"
              >
                <div className="relative h-[320px] overflow-hidden rounded-[8px] bg-gray-100 sm:h-[420px] lg:h-[520px]">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#253A8F] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                  <span
                    className="absolute right-4 top-4 rounded-full bg-[#D9043D] px-3 py-1 text-[12px] font-semibold tracking-wide text-white"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    NEW
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-[#191919]"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "22px" }}
                    >
                      {product.name}
                    </p>
                    <p
                      className="text-[#7f7f7f] transition-colors group-hover:text-[#D9043D]"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "16px" }}
                    >
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#253A8F] transition-colors group-hover:bg-[#D9043D]">
                    <ArrowRight size={16} color="white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
