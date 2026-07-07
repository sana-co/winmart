import { Outlet } from "react-router";
import { AnnouncementBar } from "./announcement-bar";
import { WinmartNav } from "./winmart-nav";
import { WinmartFooter } from "./winmart-footer";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-[#f7f7f7]" style={{ fontFamily: "Poppins, sans-serif" }}>
      <header className="sticky top-0 z-50 w-full">
        <AnnouncementBar />
        <WinmartNav />
      </header>
      <main>
        <Outlet />
      </main>
      <WinmartFooter />
    </div>
  );
}
