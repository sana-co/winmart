import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { ProductCard, ProductGridSkeleton } from "../components/product-card";
import { ProductQuickView } from "../components/product-quick-view";
import { productFilters } from "../lib/product-categories";
import { getProductsBySection } from "../lib/products";
import type { Product } from "../lib/supabase";

export function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCategory = searchParams.get("category") || "All";
  const selectedCategory = productFilters.includes(requestedCategory as (typeof productFilters)[number]) ? requestedCategory : "All";
  const visibleProducts = selectedCategory === "All"
    ? products
    : products.filter(product => product.category === selectedCategory);

  useEffect(() => {
    let mounted = true;

    getProductsBySection("new-arrivals")
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

  const selectCategory = (category: string) => {
    if (category === "All") {
      setSearchParams({});
      return;
    }

    setSearchParams({ category });
  };

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
            Fresh Drops
          </span>
          <h1
            className="text-white mt-3 mb-4"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", lineHeight: "1.1", letterSpacing: "-0.5px" }}
          >
            New Arrivals
          </h1>
          <p
            className="text-white/75"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.6vw, 18px)" }}
          >
            The latest styles just landed — shop before they sell out.
          </p>
        </div>
      </section>

      {/* Products grid */}
      <section className="w-full py-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            {productFilters.map(filter => {
              const active = selectedCategory === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => selectCategory(filter)}
                  className={`rounded-[8px] px-5 py-2.5 transition-all ${
                    active
                      ? "bg-[#253A8F] text-white shadow-md"
                      : "bg-white text-[#253A8F] hover:bg-[#eef1ff] border border-gray-100"
                  }`}
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "14px" }}
                >
                  {filter}
                </button>
              );
            })}
          </div>
          {loading && <ProductGridSkeleton />}
          {error && <p className="rounded-[8px] bg-red-50 p-4 text-sm text-red-700">{error}</p>}
          {!loading && !error && visibleProducts.length === 0 && (
            <p className="rounded-[8px] bg-white p-6 text-center text-[#606779]">No new arrivals are available yet.</p>
          )}
          {!loading && !error && visibleProducts.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} badge="NEW" onView={setSelectedProduct} />
              ))}
            </div>
          )}
        </div>
      </section>

      <ProductQuickView product={selectedProduct} tag="NEW" onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
