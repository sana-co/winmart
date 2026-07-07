import imgModel from "../../imports/ShoppingApp/116cf92ffce852e6dcfea7d382714f1c60578ad2.png";

export function WinmartBanner() {
  return (
    <section className="w-full bg-[#f7f7f7] py-6 sm:py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative rounded-[16px] overflow-hidden sm:rounded-[24px]">
          <img
            src={imgModel}
            alt="Winmart Banner"
            className="w-full h-auto block"
          />
        </div>
      </div>
    </section>
  );
}
