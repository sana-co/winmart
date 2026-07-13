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

        {/* Hero banner - image left, text right */}
        <div className="relative rounded-[18px] overflow-hidden mb-10 min-h-[360px] flex sm:rounded-[24px] lg:min-h-[460px] lg:mb-12">
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(120deg, #1B2A6B 0%, #253A8F 60%, #3a52b8 100%)" }}
          />

          <div className="absolute right-0 bottom-0 h-full w-[45%] pointer-events-none hidden md:block">
            <img
              src={imgHero}
              alt="Winmart Fashion model"
              className="absolute bottom-0 right-0 h-full object-contain object-bottom"
              style={{ maxWidth: "none" }}
            />
          </div>

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
              Winmart Fashion was born from a simple belief - that great style should be accessible to everyone.
              From our first collection to thousands of happy customers worldwide, we've stayed true to our mission:
              clothes that make you feel confident, seen, and unstoppable.
            </p>
            <Link
              to="/our-story"
              className="w-fit inline-block bg-[#D9043D] hover:bg-[#b8032f] transition-all duration-200 text-white rounded-[10px] px-8 py-3 hover:scale-105 active:scale-95"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "16px" }}
            >
              Learn More
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

        {/* Careers redirect banner */}
        <div className="relative overflow-hidden rounded-[18px] bg-white shadow-sm border border-gray-100 sm:rounded-[24px]">
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(120deg, #253A8F 0%, #3049ad 54%, #f5f7ff 100%)" }}
          />
          <div className="relative grid grid-cols-1 items-center gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_320px] lg:px-12 lg:py-10">
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
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/careers"
                  className="inline-flex items-center gap-2 rounded-[10px] bg-[#D9043D] px-7 py-3 text-white transition-all duration-200 hover:bg-[#b8032f] hover:scale-105 active:scale-95"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "15px" }}
                >
                  View Careers <ArrowRight size={18} />
                </Link>
                <a
                  href="tel:0777009697"
                  className="inline-flex items-center gap-2 rounded-[10px] border border-white/30 bg-white/10 px-7 py-3 text-white transition-colors hover:bg-white/20"
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
