import { Link } from "react-router";
import imgTrending from "../../imports/ShoppingApp/10bf3bec2c4f58be63e329813d793a3b46aed29a.png";
import imgUnder40 from "../../imports/ShoppingApp/1471526dcf6573c4c47ff0eec42429d39cb60775.png";
import imgHero from "../../imports/ShoppingApp/f8062e00ad23ffe6bfbbb9c47ff59e5f7932e7e0.png";

const milestones = [
  { year: "2021", label: "Grand Opening" },
  { year: "2024", label: "Excellence Award" },
  { year: "2025", label: "Major Expansion" },
  { year: "2025", label: "Saree Corner" },
];

const values = [
  {
    icon: "★",
    title: "Premium Quality",
    desc: "Every piece is sourced and crafted to the highest standard so you always look and feel your best.",
  },
  {
    icon: "♻",
    title: "Sustainable Fashion",
    desc: "We're committed to eco-conscious production — fashion that respects both people and the planet.",
  },
  {
    icon: "❤",
    title: "Style for All",
    desc: "Inclusive sizing, diverse styles, and designs that celebrate every body and every culture.",
  },
];

export function WinmartYoungsFavourite() {
  return (
    <section className="w-full bg-[#f7f7f7] py-10 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section heading */}
        <div className="relative mb-12 inline-block">
          <div
            className="absolute bottom-0 left-0 h-[10px] bg-[#D9043D] opacity-30 rounded"
            style={{ width: "70%", transform: "rotate(-1deg)" }}
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
            Our Story
          </h2>
        </div>

        {/* Hero banner — image left, text right */}
        <div className="relative rounded-[18px] overflow-hidden mb-10 min-h-[360px] flex sm:rounded-[24px] lg:min-h-[460px] lg:mb-12">
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(120deg, #1B2A6B 0%, #253A8F 60%, #3a52b8 100%)" }}
          />

          {/* Model image pinned to right */}
          <div className="absolute right-0 bottom-0 h-full w-[45%] pointer-events-none hidden md:block">
            <img
              src={imgHero}
              alt="Winmart Fashion model"
              className="absolute bottom-0 right-0 h-full object-contain object-bottom"
              style={{ maxWidth: "none" }}
            />
          </div>

          {/* Text */}
          <div className="relative z-10 flex flex-col justify-center px-5 py-9 sm:px-8 lg:px-16 lg:py-12 max-w-[640px]">
            <span
              className="text-[#D9043D] uppercase tracking-widest mb-3"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "13px" }}
            >
              Who We Are
            </span>
            <h3
              className="text-white mb-5"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(26px, 3.5vw, 46px)",
                lineHeight: "1.15",
                letterSpacing: "-0.5px",
              }}
            >
              Fashion Your Life,<br />Define Your World.
            </h3>
            <p
              className="text-white/75 mb-8 leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.4vw, 18px)" }}
            >
              Winmart Fashion was born from a simple belief — that great style should be accessible to everyone.
              From our first collection to thousands of happy customers worldwide, we've stayed true to our mission:
              clothes that make you feel confident, seen, and unstoppable.
            </p>
            <Link
              to="/our-story"
              className="w-fit inline-block bg-[#D9043D] hover:bg-[#b8032f] transition-all duration-200 text-white rounded-[10px] px-8 py-3 hover:scale-105 active:scale-95"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "16px" }}
            >
              Learn More →
            </Link>
          </div>
        </div>

        {/* Milestone timeline */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10 lg:mb-12">
          {milestones.map((m) => (
            <div
              key={m.year}
              className="bg-white rounded-[14px] p-4 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow sm:rounded-[16px] sm:p-6"
            >
              <p
                className="text-[#D9043D] mb-1"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(28px, 3vw, 38px)" }}
              >
                {m.year}
              </p>
              <p
                className="text-[#555]"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "15px" }}
              >
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-[20px] p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div
                className="w-12 h-12 rounded-full bg-[#253A8F]/10 group-hover:bg-[#253A8F] flex items-center justify-center mb-5 transition-colors"
                style={{ fontSize: "22px" }}
              >
                <span className="group-hover:text-white transition-colors">{v.icon}</span>
              </div>
              <p
                className="text-[#191919] mb-2"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "18px" }}
              >
                {v.title}
              </p>
              <p
                className="text-[#7f7f7f] leading-relaxed"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "15px" }}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Photo gallery strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="group relative rounded-[18px] overflow-hidden h-[240px] sm:h-[280px] lg:h-[360px] cursor-pointer sm:rounded-[20px]">
            <img
              src={imgTrending}
              alt="Trending styles"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A6B]/70 to-transparent" />
            <div className="absolute bottom-5 left-5 sm:left-6">
              <p
                className="text-white"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(16px, 2vw, 24px)" }}
              >
                Trending Styles
              </p>
              <p className="text-white/70 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                Explore Now →
              </p>
            </div>
          </div>
          <div className="group relative rounded-[18px] overflow-hidden h-[240px] sm:h-[280px] lg:h-[360px] cursor-pointer sm:rounded-[20px]">
            <img
              src={imgUnder40}
              alt="Budget picks"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A6B]/70 to-transparent" />
            <div className="absolute bottom-5 left-5 sm:left-6">
              <p
                className="text-white"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(16px, 2vw, 24px)" }}
              >
                All Under $40
              </p>
              <p className="text-white/70 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
                Explore Now →
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
