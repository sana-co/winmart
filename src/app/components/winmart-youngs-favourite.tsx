import { Link } from "react-router";
import { ArrowRight, Briefcase, Phone } from "lucide-react";
import imgHero from "../../imports/ShoppingApp/f8062e00ad23ffe6bfbbb9c47ff59e5f7932e7e0.png";
import imgCareerFlyer from "../../imports/ShoppingApp/b69fa348-2d7d-4449-bac3-8eef5c0ee02e.png";

const milestones = [
  { year: "2021", label: "Grand Opening" },
  { year: "2024", label: "Excellence Award" },
  { year: "2025", label: "Major Expansion" },
  { year: "2025", label: "Saree Corner" },
];

export function WinmartYoungsFavourite() {
  return (
    <section className="w-full bg-[#f7f7f7] py-8 sm:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section heading */}
        <div className="relative mb-7 inline-block sm:mb-12">
          <div
            className="absolute bottom-0 left-0 h-[10px] bg-[#e30b43] opacity-30 rounded"
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

        {/* Hero banner - image left, text right */}
        <div className="relative mb-8 flex min-h-[360px] overflow-hidden rounded-[12px] sm:mb-10 sm:rounded-[24px] lg:mb-12 lg:min-h-[460px]">
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(120deg, #1d285f 0%, #273777 60%, #405397 100%)" }}
          />

          <div className="absolute right-0 bottom-0 h-full w-[45%] pointer-events-none hidden md:block">
            <img
              src={imgHero}
              alt="Winmart Fashion model"
              className="absolute bottom-0 right-0 h-full object-contain object-bottom"
              style={{ maxWidth: "none" }}
            />
          </div>

          <div className="relative z-10 flex max-w-[640px] flex-col justify-center px-5 py-8 sm:px-8 sm:py-9 lg:px-16 lg:py-12">
            <span
              className="text-[#e30b43] uppercase tracking-widest mb-3"
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
              Fashion Your Life,<span className="block">Define Your World.</span>
            </h3>
            <p
              className="text-white/75 mb-8 leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.4vw, 18px)" }}
            >
              Winmart Fashion was born from a simple belief - that great style should be accessible to everyone.
              From our first collection to thousands of happy customers worldwide, we've stayed true to our mission:
              clothes that make you feel confident, seen, and unstoppable.
            </p>
            <Link
              to="/our-story"
              className="w-fit inline-block bg-[#e30b43] hover:bg-[#c90839] transition-all duration-200 text-white rounded-[10px] px-8 py-3 hover:scale-105 active:scale-95"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "16px" }}
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Milestone timeline */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:mb-10 sm:gap-4 lg:mb-12 lg:grid-cols-4">
          {milestones.map((m) => (
            <div
              key={`${m.year}-${m.label}`}
              className="min-w-0 rounded-[8px] border border-gray-100 bg-white p-3 text-center shadow-sm transition-shadow hover:shadow-md sm:rounded-[16px] sm:p-6"
            >
              <p
                className="text-[#e30b43] mb-1"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(28px, 3vw, 38px)" }}
              >
                {m.year}
              </p>
              <p
                className="break-words text-xs text-[#555] sm:text-[15px]"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500 }}
              >
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Careers redirect banner */}
        <div className="relative overflow-hidden rounded-[12px] border border-gray-100 bg-white shadow-sm sm:rounded-[24px]">
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, #273777 0%, #3049ad 100%)" }}
          />
          <div className="relative grid grid-cols-1 items-center gap-7 px-5 py-7 sm:px-8 sm:py-8 lg:grid-cols-[1fr_320px] lg:px-12 lg:py-10">
            <div className="max-w-[720px]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white">
                <Briefcase size={24} />
              </div>
              <span
                className="text-[#ffced9] uppercase tracking-widest"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "12px" }}
              >
                Careers at Winmart
              </span>
              <h3
                className="mt-3 text-white"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(28px, 4vw, 48px)",
                  lineHeight: "1.08",
                }}
              >
                Start Your Fashion Career With Us
              </h3>
              <p
                className="mt-4 max-w-[620px] text-white/80"
                style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(14px, 1.4vw, 17px)", lineHeight: "1.7" }}
              >
                We are hiring energetic team members for in-store roles. Explore open positions, benefits, and application details on our careers page.
              </p>
              <div className="mt-7 grid gap-3 min-[390px]:flex min-[390px]:flex-wrap">
                <Link
                  to="/careers"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] bg-[#e30b43] px-5 py-3 text-white transition-all duration-200 hover:bg-[#c90839] active:scale-95 sm:px-7"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "15px" }}
                >
                  View Careers <ArrowRight size={18} />
                </Link>
                <a
                  href="tel:0777009697"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border border-white/30 bg-white/10 px-5 py-3 text-white transition-colors hover:bg-white/20 sm:px-7"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "15px" }}
                >
                  <Phone size={18} /> Call HR
                </a>
              </div>
            </div>
            <Link to="/careers" className="hidden justify-self-end lg:block" aria-label="Open careers page">
              <img
                src={imgCareerFlyer}
                alt="Winmart Fashion hiring flyer"
                className="h-[260px] w-auto rounded-[18px] object-cover shadow-xl transition-transform duration-300 hover:scale-[1.03]"
              />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
