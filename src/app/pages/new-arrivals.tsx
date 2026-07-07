import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "react-router";
import { ProductQuickView } from "../components/product-quick-view";
import imgHoodies from "../../imports/ShoppingApp/0a942bfb32d058cabd76d21b35a037c539dd1710.png";
import imgCoats from "../../imports/ShoppingApp/3329758ce2776638d2390797575fe0652468591a.png";
import imgTees from "../../imports/ShoppingApp/4dfc8cb29eb86a3efe124ecd15816859f3ea4e88.png";
import imgTrending from "../../imports/ShoppingApp/10bf3bec2c4f58be63e329813d793a3b46aed29a.png";
import imgUnder40 from "../../imports/ShoppingApp/1471526dcf6573c4c47ff0eec42429d39cb60775.png";
import imgHero from "../../imports/ShoppingApp/f8062e00ad23ffe6bfbbb9c47ff59e5f7932e7e0.png";
import imgModel from "../../imports/ShoppingApp/116cf92ffce852e6dcfea7d382714f1c60578ad2.png";

const filters = ["All", "Men", "Women", "Accessories"];

const products = [
  { img: imgHoodies,  name: "Classic Hoodie Set",       price: "$45",  original: "$65",  tag: "NEW",  badge: "bg-[#253A8F]", cat: ["All", "Casual"] },
  { img: imgCoats,    name: "Premium Winter Coat",      price: "$120", original: "$160", tag: "NEW",  badge: "bg-[#253A8F]", cat: ["All", "Women", "Outerwear"] },
  { img: imgTees,     name: "Essential Tee Pack",       price: "$28",  original: null,   tag: "NEW",  badge: "bg-[#253A8F]", cat: ["All", "Men", "Essentials"] },
  { img: imgHoodies,  name: "Everyday Accessory Set",   price: "$24",  original: null,   tag: "NEW",  badge: "bg-[#253A8F]", cat: ["All", "Accessories"] },
  { img: imgTrending, name: "Floral Wrap Dress",        price: "$52",  original: "$80",  tag: "SALE", badge: "bg-[#D9043D]", cat: ["All", "Women", "Sale"] },
  { img: imgUnder40,  name: "Summer Linen Set",         price: "$38",  original: null,   tag: "NEW",  badge: "bg-[#253A8F]", cat: ["All", "Women", "Casual"] },
  { img: imgHero,     name: "Luxury Faux Fur Coat",     price: "$95",  original: "$140", tag: "SALE", badge: "bg-[#D9043D]", cat: ["All", "Women", "Outerwear", "Sale"] },
  { img: imgModel,    name: "Streetwear Jumpsuit",      price: "$60",  original: null,   tag: "NEW",  badge: "bg-[#253A8F]", cat: ["All", "Women", "Casual"] },
  { img: imgHoodies,  name: "Oversized Crewneck",       price: "$42",  original: "$55",  tag: "SALE", badge: "bg-[#D9043D]", cat: ["All", "Men", "Casual", "Sale"] },
  { img: imgTees,     name: "Minimal Cap & Tee Bundle", price: "$34",  original: "$48",  tag: "SALE", badge: "bg-[#D9043D]", cat: ["All", "Accessories", "Men"] },
];

export function NewArrivalsPage() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCategory = searchParams.get("category") || "All";
  const selectedCategory = filters.includes(requestedCategory) ? requestedCategory : "All";
  const visibleProducts = selectedCategory === "All"
    ? products
    : products.filter(product => product.cat.includes(selectedCategory));

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
            {filters.map(filter => {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleProducts.map((p, i) => (
              <div key={i} className="group bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(p)}
                  className="relative block h-[300px] w-full overflow-hidden text-left"
                  aria-label={`View ${p.name}`}
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className={`absolute top-3 left-3 ${p.badge} text-white rounded-full px-3 py-1`}
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "1px" }}
                  >
                    {p.tag}
                  </span>
                </button>
                <div className="p-4">
                  <p className="text-[#191919] mb-1" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px" }}>{p.name}</p>
                  <span className="text-[#253A8F]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "16px" }}>{p.price}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(p)}
                    className="mt-3 w-full flex items-center justify-center gap-2 bg-[#f7f7f7] group-hover:bg-[#253A8F] group-hover:text-white rounded-[8px] py-2.5 transition-all text-[#253A8F]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}
                  >
                    View Item <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductQuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
