import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import imgHero from "../../imports/ShoppingApp/f8062e00ad23ffe6bfbbb9c47ff59e5f7932e7e0.png";
import imgModel from "../../imports/ShoppingApp/116cf92ffce852e6dcfea7d382714f1c60578ad2.png";
import imgCoats from "../../imports/ShoppingApp/3329758ce2776638d2390797575fe0652468591a.png";

const slides = [
  {
    bg: "linear-gradient(135deg, #253A8F 0%, #253A8F 20%, #3a52b8 60%, #c8d3f5 100%)",
    tag: "New Season",
    headline: ["FASHION", "THAT", "DEFINES", "YOU."],
    sub: "Live for Influential and Innovative fashion!",
    cta: { label: "EXPLORE", to: "/hot-pics" },
    img: imgHero,
  },
  {
    bg: "linear-gradient(135deg, #1B2A6B 0%, #253A8F 40%, #4a6ac8 100%)",
    tag: "Payday Sale",
    headline: ["UP TO", "30% OFF", "YOUR NEXT", "ORDER."],
    sub: "Spend $100 and get a voucher code for your next purchase.",
    cta: { label: "VIEW DEALS", to: "/new-arrivals" },
    img: imgModel,
  },
  {
    bg: "linear-gradient(135deg, #0f1d4d 0%, #1B2A6B 30%, #253A8F 70%, #7a95d4 100%)",
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
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="relative flex min-h-[500px] w-full shrink-0 items-center overflow-hidden sm:min-h-[600px] lg:min-h-[720px]"
              style={{ background: slide.bg }}
            >
              {/* Decorative stars */}
              <div className="absolute top-8 right-[38%] opacity-20 text-white text-4xl select-none pointer-events-none">★</div>
              <div className="absolute bottom-16 left-[38%] opacity-15 text-white text-3xl select-none pointer-events-none">★</div>
              <div className="absolute top-1/3 left-[28%] opacity-10 text-white text-5xl select-none pointer-events-none">★</div>

              {/* Text block */}
              <div className="relative z-10 w-full max-w-[600px] px-4 py-8 sm:px-8 sm:py-14 lg:px-20">
                <span
                  className="mb-3 inline-block rounded-full bg-[#D9043D] px-3 py-1 text-white sm:mb-5 sm:px-4"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "1.5px" }}
                >
                  {slide.tag.toUpperCase()}
                </span>

                <div className="relative mb-4">
                  <div
                    className="absolute"
                    style={{
                      background: "#1B2A6B",
                      height: "clamp(34px, 7vw, 52px)",
                      width: "clamp(210px, 55vw, 320px)",
                      transform: "rotate(-1.5deg)",
                      top: "clamp(44px, 8vw, 52px)",
                      left: "-4px",
                      borderRadius: "4px",
                    }}
                  />
                  <h1
                    className="relative"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(35px, 11.5vw, 80px)",
                      lineHeight: "1.04",
                      color: "white",
                    }}
                  >
                    {slide.headline.map((line, li) => (
                      <span key={li} className={`block ${li === 1 ? "relative z-10" : ""}`}>{line}</span>
                    ))}
                  </h1>
                </div>

                <p
                  className="mb-5 mt-4 max-w-[340px] text-white/85 sm:mb-8 sm:mt-6 sm:max-w-none"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(15px, 1.5vw, 20px)",
                  }}
                >
                  {slide.sub}
                </p>

                <Link
                  to={slide.cta.to}
                  className="inline-flex min-h-11 items-center rounded-[8px] bg-[#D9043D] px-7 py-3 text-white shadow-lg transition-all duration-200 hover:bg-[#b8032f] hover:shadow-xl active:scale-95 sm:rounded-[10px] sm:px-10 sm:py-4"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "clamp(15px, 4vw, 20px)" }}
                >
                  {slide.cta.label}
                </Link>
              </div>

              {/* Model image */}
              <div className="pointer-events-none absolute bottom-0 right-[-42%] h-[66%] w-full opacity-30 sm:right-[-15%] sm:h-[82%] sm:w-[70%] md:right-0 md:h-full md:w-[50%] md:opacity-100 lg:w-[55%]">
                <img
                  src={slide.img}
                  alt={slide.tag}
                  className="absolute bottom-0 right-0 h-full object-contain object-bottom"
                  style={{ maxWidth: "none" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
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
                background: i === selected ? "#D9043D" : "rgba(255,255,255,0.5)",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
