import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { ProductCard, ProductGridSkeleton } from "../components/product-card";
import { ProductQuickView } from "../components/product-quick-view";
import { productFilters } from "../lib/product-categories";
import { getProductsBySection } from "../lib/products";
import type { Product } from "../lib/supabase";

export function HotPicsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCategory = searchParams.get("category") || "All";
  const active = productFilters.includes(requestedCategory as (typeof productFilters)[number]) ? requestedCategory : "All";

  const visible = active === "All" ? products : products.filter(p => p.category === active);

  useEffect(() => {
    let mounted = true;

    getProductsBySection("top-picks")
      .then((items) => {
        if (mounted) {
          setProducts(items);
          setError("");
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Could not load products.");
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
    <div className="bg-[#f7f7f7]">

      {/* Hero */}
      <section
        className="w-full px-4 py-12 text-center sm:px-6 sm:py-16 lg:py-20"
        style={{ background: "linear-gradient(135deg, #273777 0%, #273777 20%, #405397 60%, #c8d3f5 100%)" }}
      >
        <div className="max-w-[700px] mx-auto text-center">
          <span
            className="text-[#F4C542] uppercase tracking-widest"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px" }}
          >
            Customer Favourites
          </span>
          <h1
            className="text-white mt-3 mb-4"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", lineHeight: "1.1", letterSpacing: "-0.5px" }}
          >
            Top Picks
          </h1>
          <p
            className="text-white/75"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.6vw, 18px)" }}
          >
            Our most-loved items — handpicked from thousands of happy customers.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-[88px] z-40 w-full border-b border-gray-100 bg-white sm:top-[124px]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-start gap-3 overflow-x-auto px-4 py-4 sm:justify-center sm:gap-4 sm:px-6 sm:py-5">
          {productFilters.map(f => (
            <button
              key={f}
              onClick={() => {
                if (f === "All") {
                  setSearchParams({});
                  return;
                }

                setSearchParams({ category: f });
              }}
              className="min-h-12 shrink-0 rounded-[8px] px-6 py-3 text-center shadow-sm transition-all hover:-translate-y-0.5 sm:min-w-[100px] sm:px-7"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                background: active === f ? "#273777" : "white",
                color: active === f ? "white" : "#273777",
                border: active === f ? "1px solid #273777" : "1px solid #eef0f5",
                boxShadow: active === f
                  ? "0 4px 10px rgba(37, 58, 143, 0.22)"
                  : "0 1px 4px rgba(15, 23, 42, 0.04)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Products grid */}
      <section className="w-full px-4 py-8 sm:px-6 sm:py-12">
        <div className="max-w-[1200px] mx-auto">
          <p className="mb-5 text-center text-[#7f7f7f] sm:mb-8 sm:text-left" style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}>
            {visible.length} items
          </p>
          {loading && <ProductGridSkeleton />}
          {error && <p className="rounded-[8px] bg-red-50 p-4 text-sm text-red-700">{error}</p>}
          {!loading && !error && visible.length === 0 && (
            <p className="rounded-[8px] bg-white p-6 text-center text-[#606779]">No top picks are available yet.</p>
          )}
          {!loading && !error && visible.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} badge="TOP" onView={setSelectedProduct} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ProductQuickView product={selectedProduct} tag="TOP PICK" onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
