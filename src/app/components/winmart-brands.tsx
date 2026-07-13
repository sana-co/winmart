/* SVG wordmark logos for well-known brands */
function AmazonLogo() {
  return (
    <svg
      viewBox="0 0 100 32"
      fill="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="2"
        y="22"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="20"
        fill="white"
        letterSpacing="-0.5"
      >
        amazon
      </text>
      <path
        d="M6 27 Q30 33 55 27"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M53 24 L57 27 L53 30"
        stroke="white"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NikeLogo() {
  return (
    <svg
      viewBox="0 0 100 32"
      fill="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Nike Swoosh */}
      <path d="M8 22 Q40 4 88 10 Q60 18 8 22Z" fill="white" />
    </svg>
  );
}

function ZaraLogo() {
  return (
    <svg
      viewBox="0 0 100 32"
      fill="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="50"
        y="23"
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontSize="22"
        fill="white"
        letterSpacing="6"
        textAnchor="middle"
      >
        ZARA
      </text>
    </svg>
  );
}

function AdidasLogo() {
  return (
    <svg
      viewBox="0 0 100 38"
      fill="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Three stripes mountain */}
      <path
        d="M30 30 L50 6 L70 30"
        stroke="white"
        strokeWidth="4"
        fill="none"
        strokeLinejoin="round"
      />
      <line
        x1="24"
        y1="30"
        x2="76"
        y2="30"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <text
        x="50"
        y="40"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        fontSize="11"
        fill="white"
        letterSpacing="2"
        textAnchor="middle"
      >
        ADIDAS
      </text>
    </svg>
  );
}

function GucciLogo() {
  return (
    <svg
      viewBox="0 0 110 32"
      fill="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="55"
        y="23"
        fontFamily="Georgia, serif"
        fontWeight="bold"
        fontSize="20"
        fill="white"
        letterSpacing="3"
        textAnchor="middle"
      >
        GUCCI
      </text>
    </svg>
  );
}

function PradaLogo() {
  return (
    <svg
      viewBox="0 0 110 32"
      fill="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="55"
        y="23"
        fontFamily="Georgia, serif"
        fontWeight="bold"
        fontSize="20"
        fill="white"
        letterSpacing="3"
        textAnchor="middle"
      >
        PRADA
      </text>
    </svg>
  );
}

function VersaceLogo() {
  return (
    <svg
      viewBox="0 0 130 32"
      fill="none"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="65"
        y="23"
        fontFamily="Georgia, serif"
        fontWeight="bold"
        fontSize="18"
        fill="white"
        letterSpacing="3"
        textAnchor="middle"
      >
        VERSACE
      </text>
    </svg>
  );
}

const svgBrands = [
  { id: "amazon", el: <AmazonLogo />, w: 110 },
  { id: "nike", el: <NikeLogo />, w: 80 },
  { id: "zara", el: <ZaraLogo />, w: 90 },
  { id: "adidas", el: <AdidasLogo />, w: 90 },
  { id: "gucci", el: <GucciLogo />, w: 100 },
  { id: "prada", el: <PradaLogo />, w: 100 },
  { id: "versace", el: <VersaceLogo />, w: 120 },
];

function BrandTrack({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      className="flex shrink-0 items-center gap-10 pr-10"
      aria-hidden={hidden ? "true" : undefined}
    >
      {svgBrands.map((b) => (
        <div
          key={b.id}
          className="h-[30px] shrink-0 opacity-75"
          style={{ width: `${b.w}px` }}
        >
          {b.el}
        </div>
      ))}
    </div>
  );
}

export function WinmartBrands() {
  return (
    <section className="w-full bg-[#253A8F]">
      <div className="mx-auto max-w-[1400px] py-4 sm:px-6 sm:py-7 lg:px-12">
        <div className="overflow-hidden sm:hidden">
          <div className="flex w-max animate-winmart-marquee items-center">
            <BrandTrack />
            <BrandTrack hidden />
          </div>
        </div>

        <div className="hidden items-center gap-8 sm:flex sm:flex-wrap sm:justify-center lg:gap-12">
          {svgBrands.map((b) => (
            <div
              key={b.id}
              className="h-[36px] shrink-0 cursor-pointer opacity-70 transition-opacity hover:opacity-100"
              style={{ width: `${b.w}px` }}
            >
              {b.el}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
