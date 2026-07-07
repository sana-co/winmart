import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

import imgHoodies from "../../imports/ShoppingApp/0a942bfb32d058cabd76d21b35a037c539dd1710.png";
import imgCoats from "../../imports/ShoppingApp/3329758ce2776638d2390797575fe0652468591a.png";
import imgTees from "../../imports/ShoppingApp/4dfc8cb29eb86a3efe124ecd15816859f3ea4e88.png";
import imgTrending from "../../imports/ShoppingApp/10bf3bec2c4f58be63e329813d793a3b46aed29a.png";
import imgUnder40 from "../../imports/ShoppingApp/1471526dcf6573c4c47ff0eec42429d39cb60775.png";
import imgModel from "../../imports/ShoppingApp/116cf92ffce852e6dcfea7d382714f1c60578ad2.png";
import imgHero from "../../imports/ShoppingApp/f8062e00ad23ffe6bfbbb9c47ff59e5f7932e7e0.png";

const slides = [
  {
    img: imgHero,
    label: "New Season",
    title: "Effortless Elegance",
    sub: "Premium coats & outerwear for every occasion.",
    tag: "OUTERWEAR",
  },
  {
    img: imgCoats,
    label: "Collection",
    title: "Coats & Parkas",
    sub: "Stay warm without compromising on style.",
    tag: "WINTER EDIT",
  },
  {
    img: imgHoodies,
    label: "Casual Wear",
    title: "Hoodies & Sweatshirts",
    sub: "Comfort meets streetwear in every stitch.",
    tag: "STREET STYLE",
  },
  {
    img: imgTees,
    label: "Essentials",
    title: "Tees & T-Shirts",
    sub: "Everyday basics that never go out of style.",
    tag: "ESSENTIALS",
  },
  {
    img: imgTrending,
    label: "Hot Right Now",
    title: "Trending on Instagram",
    sub: "The looks everyone is talking about this season.",
    tag: "TRENDING",
  },
  {
    img: imgUnder40,
    label: "Budget Picks",
    title: "All Under $40",
    sub: "Big style, small price — no compromise.",
    tag: "DEALS",
  },
  {
    img: imgModel,
    label: "Featured",
    title: "Payday Sale",
    sub: "Spend $100, get 30% off your next purchase.",
    tag: "SALE",
  },
];

export function WinmartVouchers() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: false },
    [Autoplay({ delay: 3500, stopOnInteraction: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <section className="w-full bg-[#f7f7f7] py-10 overflow-hidden sm:py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Heading + controls */}
        <div className="flex items-end justify-between gap-4 mb-8">
          <div className="relative inline-block">
            <div
              className="absolute bottom-0 left-0 h-[10px] bg-[#253A8F] opacity-30 rounded"
              style={{ width: "70%", transform: "rotate(-1deg)" }}
            />
            <h2
              className="relative"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(28px, 3.5vw, 48px)",
                color: "#191919",
                letterSpacing: "2px",
              }}
            >
              Showroom
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={scrollPrev}
              className="w-11 h-11 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-[#253A8F] hover:border-[#253A8F] hover:text-white transition-all shadow-sm group"
            >
              <ChevronLeft size={20} className="text-gray-600 group-hover:text-white" />
            </button>
            <button
              onClick={scrollNext}
              className="w-11 h-11 rounded-full bg-[#253A8F] flex items-center justify-center hover:bg-[#D9043D] transition-all shadow-sm"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Carousel viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-5" style={{ touchAction: "pan-y" }}>
            {slides.map((slide, i) => {
              const isActive = i === selectedIndex;
              return (
                <div
                  key={slide.title}
                  className="relative rounded-[22px] overflow-hidden shrink-0 transition-all duration-500"
                  style={{
                    width: isActive ? "min(520px, calc(100vw - 32px))" : "min(300px, 76vw)",
                    height: isActive ? "min(560px, 118vw)" : "min(440px, 104vw)",
                    alignSelf: "flex-end",
                    opacity: isActive ? 1 : 0.6,
                  }}
                  onClick={() => scrollTo(i)}
                >
                  {/* Background image */}
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                    style={{ transform: isActive ? "scale(1.02)" : "scale(1)" }}
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: isActive
                        ? "linear-gradient(to top, rgba(27,42,107,0.85) 0%, rgba(27,42,107,0.2) 55%, transparent 100%)"
                        : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 100%)",
                    }}
                  />

                  {/* Tag pill */}
                  <div className="absolute top-5 left-5">
                    <span
                      className="bg-[#D9043D] text-white rounded-full px-3 py-1"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "1px" }}
                    >
                      {slide.tag}
                    </span>
                  </div>

                  {/* Text — only fully visible on active */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-500"
                    style={{ opacity: isActive ? 1 : 0.5 }}
                  >
                    <p
                      className="text-white/70 mb-1"
                      style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px", letterSpacing: "1px" }}
                    >
                      {slide.label.toUpperCase()}
                    </p>
                    <p
                      className="text-white leading-tight mb-2"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 900,
                        fontSize: isActive ? "clamp(20px, 2.2vw, 28px)" : "18px",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {slide.title}
                    </p>
                    {isActive && (
                      <p
                        className="text-white/75 mb-5"
                        style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "15px" }}
                      >
                        {slide.sub}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-7">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === selectedIndex ? "28px" : "8px",
                height: "8px",
                background: i === selectedIndex ? "#D9043D" : "#253A8F",
                opacity: i === selectedIndex ? 1 : 0.3,
              }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
