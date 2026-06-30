import imgTrending from "../../imports/ShoppingApp/10bf3bec2c4f58be63e329813d793a3b46aed29a.png";
import imgUnder40 from "../../imports/ShoppingApp/1471526dcf6573c4c47ff0eec42429d39cb60775.png";
import imgHero from "../../imports/ShoppingApp/f8062e00ad23ffe6bfbbb9c47ff59e5f7932e7e0.png";
import imgCoats from "../../imports/ShoppingApp/3329758ce2776638d2390797575fe0652468591a.png";

const milestones = [
  { year: "2021", title: "Grand Opening", desc: "Officially opened as the region's newest shopping destination." },
  { year: "2024", title: "First Escalators", desc: "Installed two escalators—the first shopping mall in the region to do so." },
  { year: "2025", title: "Major Expansion", desc: "Relaunched with extensive upgrades, becoming the largest retail mall in the region." },
  { year: "2025", title: "Saree Corner", desc: "Opened a dedicated saree section with an extensive collection for every occasion." },
  { year: "2026", title: "Website Launch", desc: "Launched our official website, making it easy for visitors to explore stores, services, events, and mall information online." },
];

const team = [
  { name: "Adaeze Okonkwo", role: "Founder & CEO",         img: imgHero,     quote: "Fashion is more than fabric — it's identity." },
  { name: "Tunde Fashola",   role: "Head of Design",        img: imgCoats,    quote: "Every stitch tells a story worth wearing." },
  { name: "Ngozi Eze",       role: "Customer Experience",   img: imgTrending, quote: "We don't sell clothes. We sell confidence." },
  { name: "Emeka Dike",      role: "Logistics & Ops",       img: imgUnder40,  quote: "Getting your order right is our love language." },
];

const values = [
  { icon: "★", title: "Premium Quality",       desc: "Every piece is inspected and curated to meet our high standards before it reaches you." },
  { icon: "♻", title: "Sustainable Fashion",   desc: "We're actively reducing our carbon footprint through eco-conscious sourcing and packaging." },
  { icon: "❤", title: "Style for Everyone",    desc: "Inclusive sizing, diverse collections, and designs that celebrate every culture and body." },
  { icon: "🤝", title: "Community First",       desc: "We grow because of our community — customers, suppliers, and creators who believe in us." },
];

export function OurStoryPage() {
  return (
    <div className="bg-[#f7f7f7]">

      {/* Hero */}
      <section
        className="relative w-full min-h-[500px] flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #253A8F 0%, #253A8F 20%, #3a52b8 60%, #c8d3f5 100%)" }}
      >
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-20 py-24 w-full flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <span
              className="text-[#F4C542] uppercase tracking-widest"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px" }}
            >
              Our Journey
            </span>
            <h1
              className="text-white mt-3 mb-5"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", lineHeight: "1.1", letterSpacing: "-0.5px" }}
            >
              Fashion Your Life,<br />Define Your World.
            </h1>
            <p
              className="text-white/75 max-w-[500px]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: "1.7" }}
            >
              Winmart Fashion was born from a simple belief — that great style should be accessible to everyone. Since 2010, we've stayed true to our mission: clothes that make you feel confident, seen, and unstoppable.
            </p>
          </div>
          <div className="lg:w-[380px] shrink-0 hidden lg:block">
            <img
              src={imgHero}
              alt="Winmart Fashion"
              className="w-full h-[470px] object-cover object-top rounded-[24px] shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="w-full py-16 px-6 bg-white">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="text-[#191919] text-center mb-12"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(24px, 3vw, 38px)", letterSpacing: "1px" }}
          >
            Our Milestones
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[28px] lg:left-1/2 top-0 bottom-0 w-[2px] bg-[#253A8F]/15 lg:-translate-x-px" />
            <div className="flex flex-col gap-10">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex items-start gap-6 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} flex-row`}
                >
                  {/* Dot */}
                  <div className="absolute left-[20px] lg:left-1/2 lg:-translate-x-1/2 w-4 h-4 rounded-full bg-[#D9043D] border-2 border-white shadow-md mt-1" />
                  {/* Spacer for desktop alternating */}
                  <div className="hidden lg:block flex-1" />
                  {/* Card */}
                  <div className="ml-14 lg:ml-0 flex-1 bg-[#f7f7f7] rounded-[16px] p-6 border border-gray-100 hover:shadow-md transition-shadow">
                    <span
                      className="text-[#D9043D] block mb-1"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "22px" }}
                    >
                      {m.year}
                    </span>
                    <p
                      className="text-[#191919] mb-1"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "16px" }}
                    >
                      {m.title}
                    </p>
                    <p
                      className="text-[#7f7f7f]"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "1.6" }}
                    >
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-16 px-6 bg-[#f7f7f7]">
        <div className="max-w-[1100px] mx-auto">
          <h2
            className="text-[#191919] text-center mb-10"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(24px, 3vw, 38px)", letterSpacing: "1px" }}
          >
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div
                key={v.title}
                className="bg-white rounded-[20px] p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group text-center"
              >
                <div
                  className="w-14 h-14 rounded-full bg-[#253A8F]/10 group-hover:bg-[#253A8F] flex items-center justify-center mx-auto mb-4 transition-colors"
                  style={{ fontSize: "24px" }}
                >
                  {v.icon}
                </div>
                <p
                  className="text-[#191919] mb-2"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "16px" }}
                >
                  {v.title}
                </p>
                <p
                  className="text-[#7f7f7f]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "13px", lineHeight: "1.6" }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the team */}
      <section className="w-full py-16 px-6 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <h2
            className="text-[#191919] text-center mb-10"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(24px, 3vw, 38px)", letterSpacing: "1px" }}
          >
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(t => (
              <div key={t.name} className="group text-center">
                <div className="relative rounded-[20px] overflow-hidden h-[280px] mb-4">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A6B]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <p
                      className="text-white/90 italic"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "13px", lineHeight: "1.5" }}
                    >
                      "{t.quote}"
                    </p>
                  </div>
                </div>
                <p
                  className="text-[#191919]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "16px" }}
                >
                  {t.name}
                </p>
                <p
                  className="text-[#D9043D]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}
                >
                  {t.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="w-full py-20 px-6 text-center"
        style={{ background: "linear-gradient(135deg, #253A8F 0%, #1B2A6B 100%)" }}
      >
        <h2
          className="text-white mb-4"
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(24px, 3.5vw, 42px)" }}
        >
          Be Part of Our Story
        </h2>
        <p
          className="text-white/70 mb-8 max-w-[480px] mx-auto"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "16px" }}
        >
          Whether you're a customer, a supplier, or a style creator — there's a place for you at Winmart Fashion.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/new-arrivals"
            className="inline-flex h-[58px] w-full max-w-[220px] sm:w-[190px] items-center justify-center bg-[#D9043D] hover:bg-[#b8032f] transition-colors text-white rounded-[10px] px-8"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px" }}
          >
            New Arrivals
          </a>
          <a
            href="/become-a-supplier"
            className="inline-flex h-[58px] w-full max-w-[220px] sm:w-[190px] items-center justify-center bg-white/10 hover:bg-white/20 border border-white/30 transition-colors text-white rounded-[10px] px-8"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px" }}
          >
            Supplier
          </a>
        </div>
      </section>
    </div>
  );
}
