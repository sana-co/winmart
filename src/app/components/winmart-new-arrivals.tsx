import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import imgHoodies from "../../imports/ShoppingApp/0a942bfb32d058cabd76d21b35a037c539dd1710.png";
import imgCoats from "../../imports/ShoppingApp/3329758ce2776638d2390797575fe0652468591a.png";
import imgTees from "../../imports/ShoppingApp/4dfc8cb29eb86a3efe124ecd15816859f3ea4e88.png";

const categories = [
  { img: imgTees, title: "Men", category: "Men" },
  { img: imgCoats, title: "Women", category: "Women" },
  { img: imgHoodies, title: "Accessories", category: "Accessories" },
];

export function WinmartNewArrivals() {
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

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={`/new-arrivals?category=${encodeURIComponent(cat.category)}`}
              className="group flex flex-col gap-5"
            >
              <div className="relative rounded-[16px] sm:rounded-[20px] overflow-hidden bg-gray-100 h-[320px] sm:h-[420px] lg:h-[520px]">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#253A8F] opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-[20px]" />
                {/* Sale badge */}
                <span
                  className="absolute top-4 right-4 bg-[#D9043D] text-white rounded-full px-3 py-1 text-[12px] font-semibold tracking-wide"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  NEW
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-[#191919]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "22px", letterSpacing: "-0.9px" }}
                  >
                    {cat.title}
                  </p>
                  <p
                    className="text-[#7f7f7f] group-hover:text-[#D9043D] transition-colors"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "16px", letterSpacing: "-0.6px" }}
                  >
                    Explore Now!
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#253A8F] flex items-center justify-center group-hover:bg-[#D9043D] transition-colors shrink-0">
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
