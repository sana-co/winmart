import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import imgLadies from "../../imports/ShoppingApp/10bf3bec2c4f58be63e329813d793a3b46aed29a.png";
import imgGents from "../../imports/ShoppingApp/0a942bfb32d058cabd76d21b35a037c539dd1710.png";
import imgAccessories from "../../imports/ShoppingApp/4dfc8cb29eb86a3efe124ecd15816859f3ea4e88.png";

const categoryCards = [
  { category: "Ladies", image: imgLadies, alt: "Ladies top picks" },
  { category: "Gents", image: imgGents, alt: "Gents top picks" },
  { category: "Accessories", image: imgAccessories, alt: "Fashion accessories top picks" },
];

export function WinmartTopPicks() {
  return (
    <section className="w-full bg-[#f7f7f7] py-8 sm:py-16">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12">
        <div className="relative mb-7 inline-block sm:mb-10">
          <div
            className="absolute bottom-0 left-0 h-[10px] rounded bg-[#D9043D] opacity-30"
            style={{ width: "75%", transform: "rotate(-1deg)" }}
          />
          <h2
            className="relative leading-tight"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(28px, 3.5vw, 48px)",
              color: "#191919",
              letterSpacing: "2px",
            }}
          >
            TOP PICKS
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {categoryCards.map(({ category, image, alt }) => (
            <Link
              key={category}
              to={`/hot-pics?category=${encodeURIComponent(category)}`}
              className="group flex flex-col gap-5"
            >
              <div className="relative h-[320px] overflow-hidden rounded-[8px] bg-gray-100 sm:h-[420px] lg:h-[520px]">
                <img
                  src={image}
                  alt={alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#253A8F] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                <span
                  className="absolute right-4 top-4 rounded-full bg-[#D9043D] px-3 py-1 text-[12px] font-semibold tracking-wide text-white"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  TOP
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className="break-words text-lg text-[#191919] sm:text-[22px]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
                >
                  {category}
                </p>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#253A8F] transition-colors group-hover:bg-[#D9043D]">
                  <ArrowRight size={16} color="white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
