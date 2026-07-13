import { Link } from "react-router";
import imgLogo from "../../imports/image-5.png";

function FacebookIcon() {
  return (
    <a href="https://www.facebook.com/winmart.horana" target="_blank" rel="noopener noreferrer">
      <svg width="44" height="44" fill="none" viewBox="0 0 44 44">
        <rect width="44" height="44" rx="12" fill="#D9043D" />
        <path d="M24.5 22.5H27l.5-3H24.5V18c0-.83.4-1.5 1.67-1.5H27.5V14.1S26.5 14 25.4 14c-2.6 0-4.4 1.6-4.4 4.4V19.5H18v3h3V31h3.5V22.5z" fill="white" />
      </svg>
    </a>
  );
}

function InstagramIcon() {
  return (
    <a href="https://www.instagram.com/winmartfashion" target="_blank" rel="noopener noreferrer">
      <svg width="44" height="44" fill="none" viewBox="0 0 44 44">
        <rect width="44" height="44" rx="12" fill="#D9043D" />
        <rect x="12" y="12" width="20" height="20" rx="6" stroke="white" strokeWidth="2" />
        <circle cx="22" cy="22" r="5" stroke="white" strokeWidth="2" />
        <circle cx="28.5" cy="15.5" r="1.5" fill="white" />
      </svg>
    </a>
  );
}

function ThreadsIcon() {
  return (
    <a href="https://www.threads.net/@winmartfashion" target="_blank" rel="noopener noreferrer">
      <svg width="44" height="44" fill="none" viewBox="0 0 44 44" aria-label="Threads">
        <rect width="44" height="44" rx="12" fill="#D9043D" />
        <path
          d="M29.7 17.2c-1.1-4.2-4.2-6.2-8.1-6.2-5.6 0-9.6 4.1-9.6 11s3.8 11 9.7 11c5 0 8.6-2.6 8.6-6.4 0-3.1-2.4-5.2-6.7-5.5-4.1-.3-6.4 1.1-6.4 3.2 0 1.9 1.8 3 4.1 3 2.7 0 4.3-1.8 4.3-4.8 0-3.8-1.7-6-4.9-6-2 0-3.6.8-4.7 2.2"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

function TikTokIcon() {
    return (
      <a
      href="https://www.tiktok.com/@winmartfashion"
      target="_blank"
      rel="noopener noreferrer"
    > 
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="44" height="44" rx="12" fill="#D9043D" />

      {/* TikTok Note */}
      <path
        d="M27.8 11.5C28.4 13.3 29.9 14.8 31.8 15.4V18.2C30.3 18.1 28.8 17.5 27.6 16.5V24.8C27.6 28.3 24.8 31 21.4 31C18.1 31 15.4 28.3 15.4 25C15.4 21.7 18.1 19 21.4 19C21.8 19 22.2 19 22.6 19.1V22C22.2 21.8 21.8 21.7 21.4 21.7C19.6 21.7 18.2 23.2 18.2 25C18.2 26.8 19.6 28.2 21.4 28.2C23.2 28.2 24.7 26.8 24.7 25V11.5H27.8Z"
        fill="white"
      />
    </svg>
    </a>
  );
}

export function WinmartFooter() {
  return (
    <footer className="w-full bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 sm:py-14 lg:px-12">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-12">
          <div className="mx-auto flex max-w-[320px] flex-col items-center gap-6 text-center sm:mx-0 sm:items-start sm:text-left">
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
              <button className="hover:opacity-80 transition-opacity"><ThreadsIcon /></button>
              <button className="hover:opacity-80 transition-opacity"><TikTokIcon /></button>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-1 gap-x-6 gap-y-8 text-center min-[430px]:grid-cols-2 min-[430px]:text-left lg:gap-10 xl:grid-cols-4 xl:gap-16">
            <div className="flex flex-col gap-3">
              <p className="text-[#1B2A6B]" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "18px", letterSpacing: "0.3px" }}>
                Company
              </p>
              <Link to="/our-story" className="text-[#4f5874] hover:text-[#D9043D] transition-colors leading-relaxed" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                About
              </Link>
              <Link to="/careers" className="text-[#4f5874] hover:text-[#D9043D] transition-colors leading-relaxed" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                Careers
              </Link>
              <Link to="/feedback" className="text-[#4f5874] hover:text-[#D9043D] transition-colors leading-relaxed" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                Contact Us
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[#1B2A6B]" style={{ fontFamily: "Roboto, sans-serif", fontWeight: 700, fontSize: "18px", letterSpacing: "0.3px" }}>
                Quick Link
              </p>
              <a
                href="https://maps.app.goo.gl/TxykJ1ChRMhNKGNo8"
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
                Contact
              </p>
              <a href="tel:+94777009697" className="text-[#4f5874] hover:text-[#D9043D] transition-colors leading-relaxed" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                077 700 9697
              </a>
              <a href="mailto:winmartfashion.social@gmail.com" className="text-[#4f5874] hover:text-[#D9043D] transition-colors leading-relaxed break-words" style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}>
                winmartfashion.social@gmail.com
              </a>
              <a
                href="https://maps.app.goo.gl/TxykJ1ChRMhNKGNo8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4f5874] hover:text-[#D9043D] transition-colors leading-relaxed"
                style={{ fontFamily: "Roboto, sans-serif", fontSize: "15px" }}
              >
                No.109/4 Sumangala Mw, Ratnapura Road, Horana
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

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[#1B2A6B]/15 pt-6 sm:flex-row sm:items-center">
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
