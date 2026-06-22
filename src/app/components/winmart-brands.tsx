import imgBrand1 from "../../imports/ShoppingApp/6727a8858d00a02b0b4bec9702fa68ec3b56d7b7.png";
import imgBrand2 from "../../imports/ShoppingApp/e60611b9ac42f4afaa9949d0868567342538febe.png";
import imgBrand3 from "../../imports/ShoppingApp/7719abf7afb7449512b1ea7f0bd90831a9212f2d.png";
import imgBrand4 from "../../imports/ShoppingApp/4c0ee1df851e97e4b211f11887041fc17feb317e.png";
import imgBrand5 from "../../imports/ShoppingApp/b86b86f1690142716d2184aa647b069962af25a4.png";
import imgBrand6 from "../../imports/ShoppingApp/7fc5fb3a0f757f418de48ab8c3a5e1583f56a769.png";

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

export function WinmartBrands() {
  return (
    <section className="w-full bg-[#253A8F]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-7">
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {svgBrands.map((b) => (
            <div
              key={b.id}
              className="h-[36px] opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ width: b.w }}
            >
              {b.el}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}