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
    <section className="w-full overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="relative w-full shrink-0 min-h-[560px] lg:min-h-[720px] flex items-center"
              style={{ background: slide.bg }}
            >
              {/* Decorative stars */}
              <div className="absolute top-8 right-[38%] opacity-20 text-white text-4xl select-none pointer-events-none">★</div>
              <div className="absolute bottom-16 left-[38%] opacity-15 text-white text-3xl select-none pointer-events-none">★</div>
              <div className="absolute top-1/3 left-[28%] opacity-10 text-white text-5xl select-none pointer-events-none">★</div>

              {/* Text block */}
              <div className="relative z-10 max-w-[600px] px-8 lg:px-20 py-14">
                <span
                  className="inline-block bg-[#D9043D] text-white rounded-full px-4 py-1 mb-5"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "12px", letterSpacing: "1.5px" }}
                >
                  {slide.tag.toUpperCase()}
                </span>

                <div className="relative mb-4">
                  <div
                    className="absolute"
                    style={{
                      background: "#1B2A6B",
                      height: "52px",
                      width: "320px",
                      transform: "rotate(-1.5deg)",
                      top: "52px",
                      left: "-4px",
                      borderRadius: "4px",
                    }}
                  />
                  <h1
                    className="relative"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(44px, 5.5vw, 80px)",
                      lineHeight: "1.1",
                      color: "white",
                      letterSpacing: "-1px",
                    }}
                  >
                    {slide.headline.map((line, li) => (
                      <span key={li} className={`block ${li === 1 ? "relative z-10" : ""}`}>{line}</span>
                    ))}
                  </h1>
                </div>

                <p
                  className="text-white/80 mt-6 mb-8"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(15px, 1.5vw, 20px)",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {slide.sub}
                </p>

                <Link
                  to={slide.cta.to}
                  className="inline-block bg-[#D9043D] hover:bg-[#b8032f] transition-all duration-200 text-white rounded-[10px] px-10 py-4 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "20px", letterSpacing: "-0.5px" }}
                >
                  {slide.cta.label}
                </Link>
              </div>

              {/* Model image */}
              <div className="absolute right-0 bottom-0 h-full w-[50%] lg:w-[55%] pointer-events-none">
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
      <div
        className="flex justify-center gap-2 py-4 absolute w-full"
        style={{ marginTop: "-52px" }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === selected ? "28px" : "8px",
              height: "8px",
              background: i === selected ? "#D9043D" : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
