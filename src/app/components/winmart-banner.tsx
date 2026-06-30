import imgModel from "../../imports/ShoppingApp/116cf92ffce852e6dcfea7d382714f1c60578ad2.png";

export function WinmartBanner() {
  return (
    <section className="w-full bg-[#f7f7f7] py-8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className="relative h-[680px] rounded-[24px] overflow-hidden flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #253A8F 0%, #1B2A6B 60%, #0F1D4D 100%)",
          }}
        >
          <img
            src={imgModel}
            alt="Winmart Banner"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}