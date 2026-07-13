import { Outlet } from "react-router";
import { AnnouncementBar } from "./announcement-bar";
import { ScrollToTop } from "./scroll-to-top";
import { WinmartNav } from "./winmart-nav";
import { WinmartFooter } from "./winmart-footer";

export function RootLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f7f7]" style={{ fontFamily: "Poppins, sans-serif" }}>
      <ScrollToTop />
      <header className="sticky top-0 z-50 w-full">
        <AnnouncementBar />
        <WinmartNav />
      </header>
      <main className="w-full min-w-0">
        <Outlet />
      </main>
      <WinmartFooter />
    </div>
  );
}
