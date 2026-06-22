import { Outlet } from "react-router";
import { WinmartNav } from "./winmart-nav";
import { WinmartFooter } from "./winmart-footer";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-[#f7f7f7]" style={{ fontFamily: "Poppins, sans-serif" }}>
      <WinmartNav />
      <main>
        <Outlet />
      </main>
      <WinmartFooter />
    </div>
  );
}
