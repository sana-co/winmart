import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Heart } from "lucide-react";
import { ProductCard } from "../components/product-card";
import { ProductQuickView } from "../components/product-quick-view";
import { getSavedProducts, savedItemsChangedEvent } from "../lib/saved-items";
import type { Product } from "../lib/supabase";

export function SavedItemsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const updateSavedProducts = () => setProducts(getSavedProducts());

    updateSavedProducts();
    window.addEventListener(savedItemsChangedEvent, updateSavedProducts);
    window.addEventListener("storage", updateSavedProducts);

    return () => {
      window.removeEventListener(savedItemsChangedEvent, updateSavedProducts);
      window.removeEventListener("storage", updateSavedProducts);
    };
  }, []);

  useEffect(() => {
    if (selectedProduct && !products.some((product) => product.id === selectedProduct.id)) {
      setSelectedProduct(null);
    }
  }, [products, selectedProduct]);

  return (
    <div className="bg-[#f7f7f7]">
      <section
        className="w-full px-4 py-12 text-center sm:px-6 sm:py-16 lg:py-20"
        style={{ background: "linear-gradient(135deg, #273777 0%, #273777 22%, #405397 62%, #dce4ff 100%)" }}
      >
        <div className="mx-auto max-w-[700px] text-center">
          <span
            className="text-[#F4C542] uppercase tracking-widest"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px" }}
          >
            Your Picks
          </span>
          <h1
            className="mb-4 mt-3 text-white"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(32px, 5vw, 58px)", lineHeight: "1.1" }}
          >
            Saved Items
          </h1>
          <p
            className="text-white/75"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.6vw, 18px)" }}
          >
            Keep track of the Winmart items you want to come back to.
          </p>
        </div>
      </section>

      <section className="w-full px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-[1200px]">
          {products.length > 0 ? (
            <>
              <p className="mb-5 text-center text-[#7f7f7f] sm:mb-8 sm:text-left" style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}>
                {products.length} saved items
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} badge="SAVED" onView={setSelectedProduct} />
                ))}
              </div>
            </>
          ) : (
            <div className="mx-auto flex max-w-[520px] flex-col items-center rounded-[8px] bg-white px-6 py-12 text-center shadow-sm">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#e30b43]/10 text-[#e30b43]">
                <Heart size={26} />
              </div>
              <h2 className="text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "24px" }}>
                No saved items yet
              </h2>
              <p className="mt-3 text-[#606779]" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px", lineHeight: "1.7" }}>
                Tap Save Item from a product quick view and it will appear here.
              </p>
              <Link
                to="/new-arrivals"
                className="mt-6 rounded-[8px] bg-[#273777] px-5 py-3 text-white transition-colors hover:bg-[#202f69]"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "14px" }}
              >
                Browse New Arrivals
              </Link>
            </div>
          )}
        </div>
      </section>

      <ProductQuickView product={selectedProduct} tag="SAVED" onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
