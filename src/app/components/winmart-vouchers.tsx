const photos = [
  { file: "DSC02726.webp", alt: "Winmart dress collection" },
  { file: "DSC02733.webp", alt: "Winmart fashion racks" },
  { file: "DSC02756.webp", alt: "Winmart menswear display" },
  { file: "DSC02803.webp", alt: "Winmart denim corner" },
  { file: "DSC02833.webp", alt: "Winmart saree corner" },
  { file: "DSC02816.webp", alt: "Winmart footwear display" },
  { file: "DSC02859.webp", alt: "Winmart bag collection" },
  { file: "DSC02822.webp", alt: "Winmart accessories aisle" },
  { file: "DSC02808.webp", alt: "Winmart baby fashion area" },
  { file: "DSC02751.webp", alt: "Winmart fashion showroom floor" },
];

function PhotoTrack({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-3 pr-3 sm:gap-5 sm:pr-5" aria-hidden={hidden ? "true" : undefined}>
      {photos.map((photo, index) => (
        <div
          key={photo.file}
          className="relative h-[230px] w-[180px] shrink-0 overflow-hidden rounded-[10px] shadow-sm sm:h-[340px] sm:w-[270px] sm:rounded-[18px] lg:h-[420px] lg:w-[330px]"
        >
          <img
            src={`/winmartpics/vouchers/${photo.file}`}
            alt={photo.alt}
            className="h-full w-full object-cover"
            loading={index < 3 && !hidden ? "eager" : "lazy"}
            decoding="async"
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
