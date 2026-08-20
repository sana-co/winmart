import imgHero from "../../imports/ShoppingApp/f8062e00ad23ffe6bfbbb9c47ff59e5f7932e7e0.png";
import awardMain from "../../imports/award-retail-excellence-2024.png";
import artCompetitionOne from "../../imports/childrens-art-competition-1.jpeg";
import artCompetitionTwo from "../../imports/childrens-art-competition-2.jpeg";
import artCompetitionThree from "../../imports/childrens-art-competition-3.jpeg";
import noodlesDansalOne from "../../imports/noodles-dansal-1.jpeg";
import noodlesDansalTwo from "../../imports/noodles-dansal-2.jpeg";
import noodlesDansalThree from "../../imports/noodles-dansal-3.jpeg";

const milestones = [
  { year: "2021", title: "Grand Opening", desc: "Officially opened as the region's newest shopping destination." },
  { year: "2024", title: "Excellence Award", desc: "Won the Retail Services Excellence Award (Medium Scale) at the 2024 Pinnacle Awards." },
  { year: "2025", title: "Major Expansion", desc: "Relaunched with extensive upgrades, becoming the largest retail mall in the region." },
  { year: "2025", title: "Saree Corner", desc: "Opened a dedicated saree section with an extensive collection for every occasion." },
  { year: "2026", title: "Website Launch", desc: "Launched our official website, making it easy for visitors to explore stores, services, events, and mall information online." },
];

const values = [
  { icon: "*", title: "Premium Quality",       desc: "Every piece is inspected and curated to meet our high standards before it reaches you." },
  { icon: "R", title: "Sustainable Fashion",   desc: "We're actively reducing our carbon footprint through eco-conscious sourcing and packaging." },
  { icon: "+", title: "Style for Everyone",    desc: "Inclusive sizing, diverse collections, and designs that celebrate every culture and body." },
  { icon: "&", title: "Community First",       desc: "We grow because of our community - customers, suppliers, and creators who believe in us." },
];

export function OurStoryPage() {
  return (
    <div className="bg-[#f7f7f7]">

      {/* Hero */}
      <section
        className="relative flex min-h-[440px] w-full items-center overflow-hidden sm:min-h-[500px]"
        style={{ background: "linear-gradient(135deg, #273777 0%, #273777 20%, #405397 60%, #c8d3f5 100%)" }}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center gap-8 px-4 py-12 text-center sm:px-6 sm:py-16 lg:flex-row lg:gap-12 lg:px-20 lg:py-24 lg:text-left">
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
              className="mx-auto max-w-[500px] text-white/75 lg:mx-0"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: "1.7" }}
            >
              Winmart Fashion was born from a simple belief - that great style should be accessible to everyone. Since 2010, we've stayed true to our mission: clothes that make you feel confident, seen, and unstoppable.
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
      <section className="w-full bg-white px-4 py-10 sm:px-6 sm:py-16">
        <div className="max-w-[800px] mx-auto">
          <h2
            className="text-[#191919] text-center mb-12"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(24px, 3vw, 38px)", letterSpacing: "1px" }}
          >
            Our Milestones
          </h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute bottom-0 left-[20px] top-0 w-[2px] bg-[#273777]/15 sm:left-[28px] lg:left-1/2 lg:-translate-x-px" />
            <div className="flex flex-col gap-10">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex flex-row items-start gap-3 sm:gap-6 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}
                >
                  {/* Dot */}
                  <div className="absolute left-[20px] lg:left-1/2 lg:-translate-x-1/2 w-4 h-4 rounded-full bg-[#e30b43] border-2 border-white shadow-md mt-1" />
                  {/* Spacer for desktop alternating */}
                  <div className="hidden lg:block flex-1" />
                  {/* Card */}
                  <div className="ml-8 min-w-0 flex-1 rounded-[10px] border border-gray-100 bg-[#f7f7f7] p-4 transition-shadow hover:shadow-md sm:ml-14 sm:rounded-[16px] sm:p-6 lg:ml-0">
                    <span
                      className="text-[#e30b43] block mb-1"
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
      <section className="w-full bg-[#f7f7f7] px-4 py-10 sm:px-6 sm:py-16">
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
                className="group mx-auto w-full max-w-[500px] rounded-[10px] border border-gray-100 bg-white p-5 text-center shadow-sm transition-shadow hover:shadow-md sm:max-w-none sm:rounded-[20px] sm:p-7"
              >
                <div
                  className="w-14 h-14 rounded-full bg-[#273777]/10 group-hover:bg-[#273777] flex items-center justify-center mx-auto mb-4 transition-colors"
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

      {/* Award recognition */}
      <section className="w-full bg-white px-4 py-10 sm:px-6 sm:py-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 items-center">
            <div>
              <span
                className="text-[#e30b43] uppercase tracking-widest"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "13px" }}
              >
                Award Recognition
              </span>
              <h2
                className="text-[#191919] mt-3 mb-4"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(26px, 4vw, 44px)", lineHeight: "1.12", letterSpacing: "0px" }}
              >
                Retail Services Excellence Award 2024
              </h2>
              <p
                className="text-[#4f5874] max-w-[560px] mb-7"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "1.8" }}
              >
                Winmart Fashion was honored at the Sri Lanka Pinnacle 2024 awards for excellence in textile retail services, recognizing our commitment to quality, service, and a better shopping experience for every customer.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[620px]">
                <div className="bg-[#f7f7f7] border border-gray-100 rounded-[12px] p-5">
                  <p
                    className="text-[#273777]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "28px" }}
                  >
                    2024
                  </p>
                  <p
                    className="text-[#7f7f7f]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px", lineHeight: "1.5" }}
                  >
                    Pinnacle Awards
                  </p>
                </div>
                <div className="bg-[#f7f7f7] border border-gray-100 rounded-[12px] p-5">
                  <p
                    className="text-[#273777]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "28px" }}
                  >
                    Textile
                  </p>
                  <p
                    className="text-[#7f7f7f]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px", lineHeight: "1.5" }}
                  >
                    Retail services
                  </p>
                </div>
                <div className="bg-[#f7f7f7] border border-gray-100 rounded-[12px] p-5">
                  <p
                    className="text-[#273777]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "28px" }}
                  >
                    Medium
                  </p>
                  <p
                    className="text-[#7f7f7f]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px", lineHeight: "1.5" }}
                  >
                    Scale category
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              <div className="relative overflow-hidden rounded-[18px] shadow-xl bg-[#0f1b3f]">
                <img
                  src={awardMain}
                  alt="Textiles Retailer Services Excellence Award 2024 trophy"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Children's art competition */}
      <section className="w-full bg-[#f7f7f7] px-4 py-10 sm:px-6 sm:py-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <span
              className="text-[#e30b43] uppercase tracking-widest"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "13px" }}
            >
              Community Event
            </span>
            <h2
              className="text-[#191919] mt-3 mb-4"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(26px, 4vw, 42px)", lineHeight: "1.15", letterSpacing: "0px" }}
            >
              In Store Art Competition for Children Day
            </h2>
            <p
              className="text-[#4f5874] max-w-[680px] mx-auto"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "1.8" }}
            >
              A joyful in-store celebration where children, families, and teachers came together for creativity, encouragement, and memorable moments at Winmart Fashion.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-5">
            <div className="relative overflow-hidden rounded-[18px] shadow-xl bg-white">
              <img
                src={artCompetitionOne}
                alt="Children gathered at Winmart Fashion for the in-store art competition"
                className="h-[240px] w-full object-cover object-center sm:h-[430px] lg:h-full"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
              <div className="relative overflow-hidden rounded-[18px] shadow-xl bg-white">
                <img
                  src={artCompetitionTwo}
                  alt="Families and children participating in the art competition event"
                  className="h-[220px] w-full object-cover object-center sm:h-[260px]"
                />
              </div>
              <div className="relative overflow-hidden rounded-[18px] shadow-xl bg-white">
                <img
                  src={artCompetitionThree}
                  alt="Award presentation during the children's art competition"
                  className="h-[220px] w-full object-cover object-center sm:h-[260px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dansal giving */}
      <section className="w-full bg-white px-4 py-10 sm:px-6 sm:py-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-10 items-center">
            <div>
              <span
                className="text-[#e30b43] uppercase tracking-widest"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "13px" }}
              >
                Community Giving
              </span>
              <h2
                className="text-[#191919] mt-3 mb-4"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(26px, 4vw, 42px)", lineHeight: "1.15", letterSpacing: "0px" }}
              >
                Dansal at Winmart Fashion
              </h2>
              <p
                className="text-[#4f5874] mb-6"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "16px", lineHeight: "1.8" }}
              >
                Winmart Fashion also organized dansal, a Sinhala tradition of giving freely, as part of our community care. The team held an incense stick and flower dansal, and also served a noodles dansal for visitors and families.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#f7f7f7] border border-gray-100 rounded-[12px] p-5">
                  <p
                    className="text-[#273777] mb-1"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "18px" }}
                  >
                    Incense Stick & Flower Dansal
                  </p>
                  <p
                    className="text-[#7f7f7f]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "13px", lineHeight: "1.6" }}
                  >
                    Offered freely as a gesture of respect, kindness, and community spirit.
                  </p>
                </div>
                <div className="bg-[#f7f7f7] border border-gray-100 rounded-[12px] p-5">
                  <p
                    className="text-[#273777] mb-1"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 800, fontSize: "18px" }}
                  >
                    Noodles Dansal
                  </p>
                  <p
                    className="text-[#7f7f7f]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "13px", lineHeight: "1.6" }}
                  >
                    Served freely to people visiting and passing by Winmart Fashion.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="relative overflow-hidden rounded-[18px] shadow-xl bg-[#f7f7f7] sm:row-span-2">
                <img
                  src={noodlesDansalOne}
                  alt="Winmart Fashion team serving noodles dansal outside the store"
                  className="h-[300px] w-full object-cover object-center sm:h-full"
                />
              </div>
              <div className="relative overflow-hidden rounded-[18px] shadow-xl bg-[#f7f7f7]">
                <img
                  src={noodlesDansalTwo}
                  alt="Noodles dansal cups prepared for free giving"
                  className="h-[220px] w-full object-cover object-center sm:h-[250px]"
                />
              </div>
              <div className="relative overflow-hidden rounded-[18px] shadow-xl bg-[#f7f7f7]">
                <img
                  src={noodlesDansalThree}
                  alt="Child receiving noodles dansal at Winmart Fashion"
                  className="h-[220px] w-full object-cover object-center sm:h-[250px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="w-full px-4 py-12 text-center sm:px-6 sm:py-16 lg:py-20"
        style={{ background: "linear-gradient(135deg, #273777 0%, #1d285f 100%)" }}
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
          Whether you're a customer, a supplier, or a style creator - there's a place for you at Winmart Fashion.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/new-arrivals"
            className="inline-flex h-12 w-full max-w-[220px] items-center justify-center rounded-[8px] bg-[#e30b43] px-6 text-white transition-colors hover:bg-[#c90839] sm:h-[58px] sm:w-[190px] sm:rounded-[10px] sm:px-8"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px" }}
          >
            New Arrivals
          </a>
          <a
            href="/become-a-supplier"
            className="inline-flex h-12 w-full max-w-[220px] items-center justify-center rounded-[8px] border border-white/30 bg-white/10 px-6 text-white transition-colors hover:bg-white/20 sm:h-[58px] sm:w-[190px] sm:rounded-[10px] sm:px-8"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px" }}
          >
            Supplier
          </a>
        </div>
      </section>
    </div>
  );
}
