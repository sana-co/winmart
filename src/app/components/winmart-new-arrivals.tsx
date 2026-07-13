import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import imgLadies from "../../imports/ShoppingApp/1471526dcf6573c4c47ff0eec42429d39cb60775.png";
import imgGents from "../../imports/ShoppingApp/0a942bfb32d058cabd76d21b35a037c539dd1710.png";
import imgAccessories from "../../imports/ShoppingApp/4dfc8cb29eb86a3efe124ecd15816859f3ea4e88.png";

const categoryCards = [
  { category: "Ladies", image: imgLadies, alt: "Ladies fashion" },
  { category: "Gents", image: imgGents, alt: "Gents fashion" },
  { category: "Accessories", image: imgAccessories, alt: "Fashion accessories" },
];

export function WinmartNewArrivals() {
  return (
    <section className="w-full bg-[#f7f7f7] py-8 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section heading */}
        <div className="relative mb-7 inline-block sm:mb-10">
          <div
            className="absolute bottom-0 left-0 h-[10px] bg-[#253A8F] opacity-30 rounded"
            style={{ width: "85%", transform: "rotate(-1deg)" }}
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
            NEW ARRIVALS
          </h2>
        </div>

        <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:gap-8">
          {categoryCards.map(({ category, image, alt }) => (
            <Link
              key={category}
              to={`/new-arrivals?category=${encodeURIComponent(category)}`}
              className="group flex w-[44vw] min-w-[150px] max-w-[190px] shrink-0 snap-start flex-col gap-3 sm:w-auto sm:max-w-none sm:gap-5"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-gray-100 sm:aspect-auto sm:h-[420px] sm:rounded-[8px] lg:h-[520px]">
                <img
                  src={image}
                  alt={alt}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#253A8F] opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
                <span
                  className="absolute right-2 top-2 rounded-full bg-[#D9043D] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white sm:right-4 sm:top-4 sm:px-3 sm:text-[12px]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  NEW
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p
                  className="break-words text-sm text-[#191919] sm:text-[22px]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
                >
                  {category}
                </p>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#253A8F] transition-colors group-hover:bg-[#D9043D] sm:h-9 sm:w-9">
                  <ArrowRight size={15} color="white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
