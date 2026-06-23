import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import imgLogo from "../../imports/image-5.png";

const navLinks = [
  { label: "NEW ARRIVALS", to: "/new-arrivals" },
  { label: "TOP PICKS", to: "/hot-pics" },
  { label: "BECOME A SUPPLIER", to: "/become-a-supplier" },
  { label: "OUR STORY", to: "/our-story" },
];

export function WinmartNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="w-full bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-[84px] flex items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img
            src={imgLogo}
            alt="Winmart Fashion"
            style={{ height: "68px", width: "auto" }}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(item => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.label}
                to={item.to}
                className="relative whitespace-nowrap transition-colors hover:text-[#D9043D]"
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
            className="lg:hidden text-[#253A8F]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-1">
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
