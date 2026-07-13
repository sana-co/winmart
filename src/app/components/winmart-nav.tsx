import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import imgLogo from "../../imports/image-5.png";

const navLinks = [
  { label: "NEW ARRIVALS", to: "/new-arrivals" },
  { label: "TOP PICKS", to: "/hot-pics" },
  { label: "LOYALTY CARD", to: "/loyalty-card" },
  { label: "BECOME A SUPPLIER", to: "/become-a-supplier" },
  { label: "OUR STORY", to: "/our-story" },
];

export function WinmartNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-100">
      <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between gap-3 px-4 sm:h-[84px] sm:gap-6 sm:px-6 lg:px-12">

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img
            src={imgLogo}
            alt="Winmart Fashion"
            className="h-[48px] w-auto sm:h-[68px]"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 xl:flex">
          {navLinks.map(item => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className="relative whitespace-nowrap rounded-[8px] px-3 py-2 transition-all duration-200 hover:text-[#D9043D] hover:bg-[#f7f7f7] hover:shadow-sm"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  letterSpacing: "0.3px",
                  color: active ? "#253A8F" : "#444",
                }}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#D9043D] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 text-gray-400 hover:text-[#253A8F] transition-colors">
            <Search size={20} />
          </button>
          <Link
            to="/feedback"
            className="hidden md:block bg-[#D9043D] hover:bg-[#b8032f] transition-colors text-white rounded-[7px] px-5 py-2.5 whitespace-nowrap"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "14px" }}
          >
            FEEDBACK
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-[8px] text-[#253A8F] xl:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="flex max-h-[calc(100dvh-88px)] flex-col gap-1 overflow-y-auto border-t border-gray-100 bg-white px-4 py-4 sm:max-h-[calc(100dvh-124px)] sm:px-6 xl:hidden">
          {navLinks.map(item => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="py-3 border-b border-gray-100 last:border-0 transition-colors"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 500,
                  fontSize: "15px",
                  color: active ? "#D9043D" : "#555",
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/feedback"
            onClick={() => setMobileOpen(false)}
            className="bg-[#D9043D] text-white rounded-[7px] px-5 py-2.5 w-fit mt-3"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "15px" }}
          >
            FEEDBACK
          </Link>
        </div>
      )}
    </nav>
  );
}
