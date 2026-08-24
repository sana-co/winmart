import { WinmartHero } from "../components/winmart-hero";
import { WinmartNewArrivals } from "../components/winmart-new-arrivals";
import { WinmartTopPicks } from "../components/winmart-top-picks";
import { WinmartBanner } from "../components/winmart-banner";
import { WinmartYoungsFavourite } from "../components/winmart-youngs-favourite";
import { WinmartVouchers } from "../components/winmart-vouchers";
import { WinmartCommunity } from "../components/winmart-community";

export function HomePage() {
  return (
    <>
      <WinmartHero />
      <WinmartNewArrivals />
      <WinmartTopPicks />
      <WinmartBanner />
      <WinmartYoungsFavourite />
      <WinmartVouchers />
      <WinmartCommunity />
    </>
  );
}
