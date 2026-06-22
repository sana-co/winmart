import { Link } from "react-router";
import imgLogo from "../../imports/image-5.png";

function FacebookIcon() {
  return (
    <svg width="44" height="44" fill="none" viewBox="0 0 44 44">
      <rect width="44" height="44" rx="12" fill="#D9043D" />
      <path d="M24.5 22.5H27l.5-3H24.5V18c0-.83.4-1.5 1.67-1.5H27.5V14.1S26.5 14 25.4 14c-2.6 0-4.4 1.6-4.4 4.4V19.5H18v3h3V31h3.5V22.5z" fill="white" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="44" height="44" fill="none" viewBox="0 0 44 44">
      <rect width="44" height="44" rx="12" fill="#D9043D" />
      <rect x="12" y="12" width="20" height="20" rx="6" stroke="white" strokeWidth="2" />
      <circle cx="22" cy="22" r="5" stroke="white" strokeWidth="2" />
      <circle cx="28.5" cy="15.5" r="1.5" fill="white" />
    </svg>
  );
}

export function WinmartFooter() {
  return (
    <footer className="w-full bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14">
        <div className="flex flex-col lg:flex-row gap-12 justify-between">
          <div className="flex flex-col gap-6 max-w-[320px]">
            <img
              src={imgLogo}
              alt="Winmart Fashion"
              style={{ width: "220px", maxWidth: "100%", height: "auto", objectFit: "contain", display: "block" }}
            />
            <p className="text-[#4f5874] leading-relaxed" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px", letterSpacing: "0.3px" }}>
              Complete your style with awesome clothes from us.
            </p>
            <div className="flex items-center gap-3">
              <button className="hover:opacity-80 transition-opacity"><FacebookIcon /></button>
              <button className="hover:opacity-80 transition-opacity"><InstagramIcon /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 lg:gap-16 flex-1">
            <div className="flex flex-col gap-3">
              <p className="text-[#1B2A6B]" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "18px", letterSpacing: "0.3px" }}>
                Company
              </p>
              <Link to="/our-story" className="text-[#4f5874] hover:text-[#D9043D] transition-colors leading-relaxed" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                About
              </Link>
              {["Careers", "Support"].map(link => (
                <a key={link} href="#" className="text-[#4f5874] hover:text-[#D9043D] transition-colors leading-relaxed" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                  {link}
                </a>
              ))}
              <Link to="/feedback" className="text-[#4f5874] hover:text-[#D9043D] transition-colors leading-relaxed" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                Contact Us
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[#1B2A6B]" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "18px", letterSpacing: "0.3px" }}>
                Quick Link
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4f5874] hover:text-[#D9043D] transition-colors leading-relaxed"
                style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}
              >
                Find Our Store
              </a>
              <a href="#faqs" className="text-[#4f5874] hover:text-[#D9043D] transition-colors leading-relaxed" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                FAQs
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[#1B2A6B]" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "18px", letterSpacing: "0.3px" }}>
                Legal
              </p>
              {["Terms & Conditions", "Privacy Policy"].map(link => (
                <a key={link} href="#" className="text-[#4f5874] hover:text-[#D9043D] transition-colors leading-relaxed" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#1B2A6B]/15 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#4f5874]" style={{ fontFamily: "Roboto, sans-serif", fontSize: "14px" }}>
            &copy; 2026 Winmart Fashion. All rights reserved.
          </p>
          <div className="flex gap-2">
            <span className="w-2 h-2 rounded-full bg-[#253A8F]" />
            <span className="w-2 h-2 rounded-full bg-[#D9043D]" />
            <span className="w-2 h-2 rounded-full bg-[#1B2A6B]/30" />
          </div>
        </div>
      </div>
    </footer>
  );
}
