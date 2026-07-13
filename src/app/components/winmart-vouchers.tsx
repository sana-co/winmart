import imgHoodies from "../../imports/ShoppingApp/0a942bfb32d058cabd76d21b35a037c539dd1710.png";
import imgCoats from "../../imports/ShoppingApp/3329758ce2776638d2390797575fe0652468591a.png";
import imgTees from "../../imports/ShoppingApp/4dfc8cb29eb86a3efe124ecd15816859f3ea4e88.png";
import imgTrending from "../../imports/ShoppingApp/10bf3bec2c4f58be63e329813d793a3b46aed29a.png";
import imgUnder40 from "../../imports/ShoppingApp/1471526dcf6573c4c47ff0eec42429d39cb60775.png";
import imgModel from "../../imports/ShoppingApp/116cf92ffce852e6dcfea7d382714f1c60578ad2.png";
import imgHero from "../../imports/ShoppingApp/f8062e00ad23ffe6bfbbb9c47ff59e5f7932e7e0.png";

const photos = [
  { src: imgHero, alt: "Winmart fashion model" },
  { src: imgCoats, alt: "Winmart coats collection" },
  { src: imgHoodies, alt: "Winmart hoodies collection" },
  { src: imgTees, alt: "Winmart t-shirts collection" },
  { src: imgTrending, alt: "Winmart trending styles" },
  { src: imgUnder40, alt: "Winmart budget picks" },
  { src: imgModel, alt: "Winmart showroom model" },
];

function PhotoTrack({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-3 sm:gap-5 sm:pr-5" aria-hidden={hidden ? "true" : undefined}>
      {photos.map(photo => (
        <div
          key={photo.src}
          className="relative h-[230px] w-[180px] shrink-0 overflow-hidden rounded-[10px] shadow-sm sm:h-[340px] sm:w-[270px] sm:rounded-[18px] lg:h-[420px] lg:w-[330px]"
        >
          <img
            src={photo.src}
            alt={photo.alt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

export function WinmartVouchers() {
  return (
    <section className="w-full overflow-hidden bg-[#f7f7f7] py-8 sm:py-16">
      <div className="flex w-max animate-winmart-marquee items-center">
        <PhotoTrack />
        <PhotoTrack hidden />
      </div>
    </section>
  );
}
