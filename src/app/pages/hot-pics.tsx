import { useState } from "react";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { ProductQuickView } from "../components/product-quick-view";
import imgHoodies from "../../imports/ShoppingApp/0a942bfb32d058cabd76d21b35a037c539dd1710.png";
import imgCoats from "../../imports/ShoppingApp/3329758ce2776638d2390797575fe0652468591a.png";
import imgTees from "../../imports/ShoppingApp/4dfc8cb29eb86a3efe124ecd15816859f3ea4e88.png";
import imgTrending from "../../imports/ShoppingApp/10bf3bec2c4f58be63e329813d793a3b46aed29a.png";
import imgUnder40 from "../../imports/ShoppingApp/1471526dcf6573c4c47ff0eec42429d39cb60775.png";
import imgHero from "../../imports/ShoppingApp/f8062e00ad23ffe6bfbbb9c47ff59e5f7932e7e0.png";
import imgModel from "../../imports/ShoppingApp/116cf92ffce852e6dcfea7d382714f1c60578ad2.png";
import imgProduct1 from "../../imports/ShoppingApp/d116b77f94c47cb34085ecba93d7086e56c30f3f.png";
import imgProduct2 from "../../imports/ShoppingApp/07a2197ffea83241a255453a3cb8b757720d1f55.png";
import imgProduct3 from "../../imports/ShoppingApp/48808eb510ad5e1b50f1a6ccc453a45585230074.png";
import imgProduct4 from "../../imports/ShoppingApp/f1a4be3a6330f9e5d839f54ed80f0c08fd07bf09.png";

const filters = ["All", "Ladies", "Gents", "Outerwear", "Casual", "Formal"];

const products = [
  { img: imgHero,      name: "Luxury Faux Fur Coat",       price: "$95",  original: "$140", cat: ["All", "Ladies", "Outerwear"] },
  { img: imgCoats,     name: "Premium Winter Coat",         price: "$120", original: "$160", cat: ["All", "Ladies", "Outerwear"] },
  { img: imgTrending,  name: "Floral Wrap Dress",           price: "$52",  original: "$80",  cat: ["All", "Ladies", "Casual"] },
  { img: imgProduct1,  name: "Polkadot Red Dress",          price: "$48",  original: null,   cat: ["All", "Ladies", "Casual", "Formal"] },
  { img: imgProduct2,  name: "Striped Pink Dress",          price: "$44",  original: "$60",  cat: ["All", "Ladies", "Casual"] },
  { img: imgHoodies,   name: "Classic Hoodie Set",          price: "$45",  original: "$65",  cat: ["All", "Gents", "Casual"] },
  { img: imgProduct3,  name: "Blue Polka Dot Dress",        price: "$42",  original: null,   cat: ["All", "Ladies", "Formal"] },
  { img: imgUnder40,   name: "Summer Linen Co-ord Set",     price: "$38",  original: null,   cat: ["All", "Ladies", "Casual"] },
  { img: imgModel,     name: "Streetwear Jumpsuit",         price: "$60",  original: "$85",  cat: ["All", "Ladies", "Casual", "Formal"] },
  { img: imgTees,      name: "Essential Tee Pack (3-in-1)", price: "$28",  original: null,   cat: ["All", "Gents", "Casual"] },
  { img: imgProduct4,  name: "Green Skirt & Sweater Set",   price: "$46",  original: "$58",  cat: ["All", "Ladies", "Casual"] },
  { img: imgCoats,     name: "Oversized Wool Blend Coat",   price: "$110", original: "$145", cat: ["All", "Gents", "Outerwear"] },
];

export function HotPicsPage() {
  const [active, setActive] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[number] | null>(null);

  const visible = products.filter(p => p.cat.includes(active));

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
          {filters.map(f => (
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
          <p className="text-[#7f7f7f] mb-8" style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}>
            {visible.length} items
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visible.map((p, i) => (
              <div
                key={i}
                className="group bg-white rounded-[20px] overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
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
                </button>
                <div className="p-4">
                  <p className="text-[#191919] mb-1" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px" }}>
                    {p.name}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[#253A8F]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "16px" }}>
                      {p.price}
                    </span>
                    {p.original && (
                      <span className="text-gray-400 line-through" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px" }}>
                        {p.original}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(p)}
                    className="w-full flex items-center justify-center gap-2 bg-[#f7f7f7] group-hover:bg-[#253A8F] group-hover:text-white text-[#253A8F] rounded-[8px] py-2.5 transition-all"
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
