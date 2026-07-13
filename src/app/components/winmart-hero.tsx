import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import imgHero from "../../imports/ShoppingApp/f8062e00ad23ffe6bfbbb9c47ff59e5f7932e7e0.png";
import imgModel from "../../imports/ShoppingApp/116cf92ffce852e6dcfea7d382714f1c60578ad2.png";
import imgCoats from "../../imports/ShoppingApp/3329758ce2776638d2390797575fe0652468591a.png";

const slides = [
  {
    bg: "radial-gradient(circle at 72% 38%, rgba(255,255,255,0.12) 0 18%, transparent 19%), linear-gradient(112deg, #201d78 0%, #352078 34%, #7b2b83 63%, #e01865 100%)",
    tag: "New Season",
    headline: ["STYLE THAT", "SPEAKS", "CONFIDENCE."],
    sub: "Timeless looks. Modern vibes. Built to inspire, made for you.",
    cta: { label: "EXPLORE", to: "/hot-pics" },
    img: imgHero,
  },
  {
    bg: "linear-gradient(112deg, #1e1b72 0%, #3f247f 42%, #d80f58 100%)",
    tag: "Payday Sale",
    headline: ["UP TO", "30% OFF", "YOUR NEXT", "ORDER."],
    sub: "Spend $100 and get a voucher code for your next purchase.",
    cta: { label: "VIEW DEALS", to: "/new-arrivals" },
    img: imgModel,
  },
  {
    bg: "linear-gradient(112deg, #191967 0%, #2d2676 44%, #cf1b64 100%)",
    tag: "Top Picks",
    headline: ["STYLE", "LOVED BY", "THOUSANDS", "OF FANS."],
    sub: "Our highest-rated pieces chosen by our community.",
    cta: { label: "TOP PICKS", to: "/hot-pics" },
    img: imgCoats,
  },
];

export function WinmartHero() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );
  const [selected, setSelected] = useState(0);

  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="relative flex min-h-[560px] w-full shrink-0 items-center overflow-hidden sm:min-h-[640px] lg:min-h-[720px]"
              style={{ background: slide.bg }}
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -bottom-16 -left-16 h-44 w-44 rounded-full border-[42px] border-white/10 sm:h-64 sm:w-64" />
                <div
                  className="absolute right-[7%] top-[13%] h-16 w-28 opacity-30 sm:h-20 sm:w-36"
                  style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.75) 2px, transparent 2px)",
                    backgroundSize: "18px 18px",
                  }}
                />
                <div
                  className="absolute bottom-[16%] left-[35%] hidden h-20 w-36 opacity-25 md:block"
                  style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.7) 2px, transparent 2px)",
                    backgroundSize: "17px 17px",
                  }}
                />
                <div className="absolute left-[42%] top-[17%] hidden h-8 w-8 rounded-full border-4 border-white/25 md:block" />
                <div className="absolute right-[6%] bottom-[28%] h-8 w-8 rounded-full border-4 border-white/25" />
                <div className="absolute left-[50%] top-[24%] hidden text-5xl font-bold leading-none text-white/25 md:block">+</div>
                <div className="absolute right-[10%] bottom-[12%] text-6xl font-bold leading-none text-white/25">+</div>
              </div>

              <div className="relative z-10 w-full max-w-[720px] px-5 py-10 sm:px-10 sm:py-16 lg:px-20">
                <span
                  className="mb-6 inline-flex min-h-8 items-center rounded-full bg-[#ff0052] px-5 py-2 text-white shadow-[0_10px_24px_rgba(255,0,82,0.28)] sm:mb-9 sm:px-6"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 800,
                    fontSize: "12px",
                    letterSpacing: "2.6px",
                  }}
                >
                  {slide.tag.toUpperCase()}
                </span>

                <div className="relative mb-4">
                  <div
                    className="absolute hidden sm:block"
                    style={{
                      background: "rgba(20, 22, 92, 0.7)",
                      height: "clamp(44px, 5vw, 64px)",
                      width: "clamp(330px, 44vw, 650px)",
                      top: "clamp(48px, 6vw, 76px)",
                      left: "-10px",
                      borderRadius: "4px",
                    }}
                  />
                  <h1
                    className="relative"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(44px, 9.2vw, 88px)",
                      lineHeight: "1.12",
                      color: "white",
                      letterSpacing: "0",
                      textShadow: "0 7px 0 rgba(13, 17, 84, 0.18)",
                    }}
                  >
                    {slide.headline.map((line, li) => (
                      <span key={li} className="block">
                        {line}
                      </span>
                    ))}
                  </h1>
                </div>

                <p
                  className="mb-7 mt-6 max-w-[420px] text-white/90 sm:mb-10 sm:mt-7"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(16px, 1.7vw, 25px)",
                    lineHeight: "1.35",
                  }}
                >
                  {slide.sub}
                </p>

                <Link
                  to={slide.cta.to}
                  className="inline-flex min-h-14 items-center rounded-[8px] bg-[#ff0052] px-10 py-4 text-white shadow-[0_14px_30px_rgba(255,0,82,0.32)] transition-all duration-200 hover:bg-[#e10049] hover:shadow-[0_18px_34px_rgba(255,0,82,0.38)] active:scale-95 sm:min-h-[72px] sm:px-14"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(16px, 2vw, 22px)",
                  }}
                >
                  {slide.cta.label}
                </Link>
              </div>

              <div className="pointer-events-none absolute bottom-0 right-[-38%] h-[58%] w-full opacity-35 sm:right-[-26%] sm:h-[72%] sm:w-[78%] md:right-[-8%] md:h-[92%] md:w-[55%] md:opacity-100 lg:right-[2%] lg:h-[94%] lg:w-[48%]">
                <img
                  src={slide.img}
                  alt={slide.tag}
                  className="absolute bottom-0 right-0 h-full w-full object-contain object-bottom"
                  style={{ maxWidth: "none" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-0 z-20 flex w-full justify-center py-1 sm:bottom-6">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollTo(i)}
            className="flex h-11 w-10 items-center justify-center"
            aria-label={`Go to slide ${i + 1}`}
          >
            <span
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === selected ? "28px" : "8px",
                background: i === selected ? "#ff0052" : "rgba(255,255,255,0.5)",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
