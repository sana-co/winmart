import { useEffect, useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import imgLogo from "../../imports/image-5.png";
import { getSavedProducts, savedItemsChangedEvent } from "../lib/saved-items";

const navLinks = [
  { label: "NEW ARRIVALS", to: "/new-arrivals" },
  { label: "TOP PICKS", to: "/hot-pics" },
  { label: "LOYALTY CARD", to: "/loyalty-card" },
  { label: "BECOME A SUPPLIER", to: "/become-a-supplier" },
  { label: "OUR STORY", to: "/our-story" },
];

export function WinmartNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const updateSavedCount = () => setSavedCount(getSavedProducts().length);

    updateSavedCount();
    window.addEventListener(savedItemsChangedEvent, updateSavedCount);
    window.addEventListener("storage", updateSavedCount);

    return () => {
      window.removeEventListener(savedItemsChangedEvent, updateSavedCount);
      window.removeEventListener("storage", updateSavedCount);
    };
  }, []);

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
                className="relative whitespace-nowrap rounded-[8px] px-3 py-2 transition-all duration-200 hover:text-[#e30b43] hover:bg-[#f7f7f7] hover:shadow-sm"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 600,
                  fontSize: "15px",
                  letterSpacing: "0.3px",
                  color: active ? "#273777" : "#444",
                }}
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#e30b43] rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/feedback"
            className="hidden md:block bg-[#e30b43] hover:bg-[#c90839] transition-colors text-white rounded-[7px] px-5 py-2.5 whitespace-nowrap"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "14px" }}
          >
            FEEDBACK
          </Link>
          <Link
            to="/saved-items"
            className="relative hidden h-11 w-11 items-center justify-center rounded-[8px] border border-[#e30b43]/15 bg-[#e30b43]/5 text-[#e30b43] transition-colors hover:bg-[#e30b43] hover:text-white md:flex"
            aria-label={`Saved items${savedCount > 0 ? `, ${savedCount} saved` : ""}`}
          >
            <Heart size={20} fill={savedCount > 0 ? "currentColor" : "none"} />
            {savedCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#273777] px-1 text-[11px] font-bold text-white">
                {savedCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-[8px] text-[#273777] xl:hidden"
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
                  color: active ? "#e30b43" : "#555",
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/feedback"
            onClick={() => setMobileOpen(false)}
            className="bg-[#e30b43] text-white rounded-[7px] px-5 py-2.5 w-fit mt-3"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "15px" }}
          >
            FEEDBACK
          </Link>
          <Link
            to="/saved-items"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex w-fit items-center gap-2 rounded-[7px] border border-[#e30b43]/15 bg-[#e30b43]/5 px-5 py-2.5 text-[#e30b43]"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px" }}
          >
            <Heart size={18} fill={savedCount > 0 ? "currentColor" : "none"} />
            SAVED ITEMS{savedCount > 0 ? ` (${savedCount})` : ""}
          </Link>
        </div>
      )}
    </nav>
  );
}
