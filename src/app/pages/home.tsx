import { WinmartHero } from "../components/winmart-hero";
import { WinmartBrands } from "../components/winmart-brands";
import { WinmartNewArrivals } from "../components/winmart-new-arrivals";
import { WinmartBanner } from "../components/winmart-banner";
import { WinmartYoungsFavourite } from "../components/winmart-youngs-favourite";
import { WinmartVouchers } from "../components/winmart-vouchers";
import { WinmartCommunity } from "../components/winmart-community";

export function HomePage() {
  return (
    <>
      <WinmartHero />
      <WinmartBrands />
      <WinmartNewArrivals />
      <WinmartBanner />
      <WinmartYoungsFavourite />
      <WinmartVouchers />
      <WinmartCommunity />
    </>
  );
}
