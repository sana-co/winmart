import { useEffect, useState } from "react";
import { Link } from "react-router";

const heroPhotos = [
  { file: "DSC02686.webp", alt: "Winmart Fashion showroom aisle" },
  { file: "DSC02708.webp", alt: "Winmart Fashion store interior" },
  { file: "DSC02791.webp", alt: "Winmart Fashion kids section" },
  { file: "DSC02841.webp", alt: "Winmart Fashion display wall" },
];

export function WinmartHero() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [previousPhotoIndex, setPreviousPhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActivePhotoIndex((current) => {
        setPreviousPhotoIndex(current);
        return (current + 1) % heroPhotos.length;
      });
    }, 4000);

    return () => window.clearInterval(interval);
  }, []);

  const visiblePhotoIndexes =
    previousPhotoIndex === null || previousPhotoIndex === activePhotoIndex
      ? [activePhotoIndex]
      : [previousPhotoIndex, activePhotoIndex];

  return (
    <section className="winmart-hero w-full">
      <div className="relative mx-auto grid min-h-[540px] max-w-[1800px] grid-cols-1 overflow-hidden lg:min-h-[680px] lg:grid-cols-[52%_48%]">
        <div className="relative z-10 flex items-center px-5 py-10 sm:px-10 lg:px-16 xl:px-20">
          <div className="winmart-hero__star" aria-hidden="true" />
          <div className="max-w-[690px]">
            <span
              className="mb-5 inline-flex min-h-9 items-center rounded-[8px] bg-white/10 px-4 text-white ring-1 ring-white/15"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 800,
                fontSize: "13px",
                letterSpacing: "1.4px",
              }}
            >
              WINMART FASHION STORE
            </span>

            <h1
              className="text-white"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(42px, 5.8vw, 70px)",
                lineHeight: "1.08",
                letterSpacing: "0",
              }}
            >
              Style Made Simple For{" "}
              <span className="winmart-hero__highlight">Every Family</span>
            </h1>

            <p
              className="mt-6 max-w-[560px] text-white/76 sm:mt-8"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 400,
                fontSize: "clamp(16px, 1.35vw, 20px)",
                lineHeight: "1.7",
              }}
            >
              Fresh arrivals, everyday essentials, and standout pieces selected for real life and real budgets.
            </p>

            <Link
              to="/new-arrivals"
              className="mt-8 inline-flex min-h-13 items-center rounded-[8px] bg-[#e30b43] px-7 py-3.5 text-white shadow-[0_16px_34px_rgba(227,11,67,0.28)] transition-all duration-200 hover:bg-[#c90839] active:scale-95 sm:mt-10 sm:px-9"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(15px, 1.35vw, 19px)",
              }}
            >
              View Departments
            </Link>
          </div>
        </div>

        <div className="relative min-h-[360px] overflow-hidden lg:min-h-[680px]">
          <div className="winmart-hero__slash" aria-hidden="true" />
          <div className="hero-image-carousel h-full min-h-[360px] lg:min-h-[680px]">
            {visiblePhotoIndexes.map((photoIndex) => {
              const photo = heroPhotos[photoIndex];
              const isActive = photoIndex === activePhotoIndex;

              return (
                <img
                  key={photo.file}
                  src={`/winmartpics/hero/optimized/${photo.file}`}
                  alt={photo.alt}
                  className={`hero-image-carousel__image ${isActive ? "hero-image-carousel__image--active" : ""}`}
                  loading={photoIndex === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={photoIndex === 0 ? "high" : "low"}
                  sizes="(min-width: 1024px) 48vw, 100vw"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
