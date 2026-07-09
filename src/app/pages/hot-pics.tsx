import { useEffect, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ProductCard, ProductGridSkeleton } from "../components/product-card";
import { ProductQuickView } from "../components/product-quick-view";
import { productFilters } from "../lib/product-categories";
import { getProductsBySection } from "../lib/products";
import type { Product } from "../lib/supabase";

export function HotPicsPage() {
  const [active, setActive] = useState("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        className="w-full py-20 px-6"
        style={{ background: "linear-gradient(135deg, #253A8F 0%, #253A8F 20%, #3a52b8 60%, #c8d3f5 100%)" }}
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
      <section className="w-full bg-white border-b border-gray-100 sticky top-[84px] z-40">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center gap-3 overflow-x-auto">
          <SlidersHorizontal size={16} className="text-[#7f7f7f] shrink-0" />
          {productFilters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="shrink-0 rounded-full px-5 py-2 transition-all"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
                fontSize: "13px",
                background: active === f ? "#253A8F" : "#f7f7f7",
                color: active === f ? "white" : "#555",
                border: active === f ? "1.5px solid #253A8F" : "1.5px solid #e5e7eb",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Products grid */}
      <section className="w-full py-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="mb-8 text-[#7f7f7f]" style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}>
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
