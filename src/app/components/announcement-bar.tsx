const announcementText = "Get Your Free Loyalty Card";
const announcementItems = Array.from({ length: 8 }, (_, index) => index);

function AnnouncementTrack({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-8 pr-8"
      aria-hidden={hidden ? "true" : undefined}
    >
      {announcementItems.map(item => (
        <span key={item} className="whitespace-nowrap">
          {announcementText}
        </span>
      ))}
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <div className="h-6 overflow-hidden bg-[#005DAA] text-white sm:h-10">
      <div className="flex h-full w-max animate-winmart-marquee items-center text-[11px] font-bold uppercase leading-none tracking-normal sm:text-xs">
        <AnnouncementTrack />
        <AnnouncementTrack hidden />
      </div>
    </div>
  );
}
