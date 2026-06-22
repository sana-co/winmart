import imgModel from "../../imports/ShoppingApp/116cf92ffce852e6dcfea7d382714f1c60578ad2.png";

export function WinmartBanner() {
  return (
    <section className="w-full bg-[#f7f7f7] py-8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className="relative overflow-hidden rounded-[24px] min-h-[520px] lg:min-h-[680px] flex items-center"
          style={{
            background: "linear-gradient(135deg, #253A8F 0%, #1B2A6B 60%, #0f1d4d 100%)",
          }}
        >
          {/* Decorative star shapes */}
          {[
            { top: "12%", left: "6%", size: 52, opacity: 0.15 },
            { top: "22%", left: "26%", size: 60, opacity: 0.12 },
            { top: "68%", left: "8%", size: 44, opacity: 0.12 },
            { top: "78%", left: "34%", size: 36, opacity: 0.10 },
          ].map((s, i) => (
            <div
              key={i}
              className="absolute pointer-events-none select-none text-white"
              style={{ top: s.top, left: s.left, fontSize: s.size, opacity: s.opacity, transform: "rotate(-27deg)" }}
            >
              ★
            </div>
          ))}

          {/* Model image */}
          <div className="absolute left-0 bottom-0 h-[90%] w-[48%] pointer-events-none hidden lg:block">
            <img
              src={imgModel}
              alt="Fashion model"
              className="absolute bottom-0 left-0 h-full object-contain object-bottom-left"
              style={{ maxWidth: "none" }}
            />
          </div>

          {/* Text content */}
          <div className="relative z-10 ml-auto w-full lg:w-[56%] px-8 lg:pr-16 lg:pl-8 py-16">
            {/* White highlight bar */}
            <div className="relative mb-2">
              <div
                className="absolute bg-white/10"
                style={{ height: "88px", width: "105%", transform: "rotate(-1.5deg)", top: "8px", left: "-4px", borderRadius: "4px" }}
              />
              <h2
                className="relative text-white"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(48px, 6vw, 90px)",
                  lineHeight: "1.05",
                  letterSpacing: "1px",
                }}
              >
                PAYDAY
              </h2>
              <h2
                className="relative text-white"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 900,
                  fontSize: "clamp(48px, 6vw, 90px)",
                  lineHeight: "1.05",
                  letterSpacing: "1px",
                }}
              >
                SALE NOW
              </h2>
            </div>

            <p
              className="text-white/85 mt-6"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "clamp(16px, 1.6vw, 26px)", letterSpacing: "-0.5px" }}
            >
              Spend minimal $100 get 30% off
              <br />
              voucher code for your next purchase
            </p>

            <p
              className="text-white/70 mt-3"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "clamp(14px, 1.4vw, 22px)", letterSpacing: "0.5px" }}
            >
              1 June – 30 June 2025
            </p>
            <p
              className="text-white/50 text-sm mb-8"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "clamp(13px, 1.2vw, 18px)" }}
            >
              *Terms &amp; Conditions apply
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}
