import imgModel from "../../imports/ShoppingApp/116cf92ffce852e6dcfea7d382714f1c60578ad2.png";

export function WinmartBanner() {
  return (
    <section className="w-full bg-[#f7f7f7] py-4 sm:py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="relative h-[180px] overflow-hidden rounded-[12px] sm:h-auto sm:rounded-[24px]">
          <img
            src={imgModel}
            alt="Winmart Banner"
            className="block h-full w-full object-cover object-center sm:h-auto"
          />
        </div>
      </div>
    </section>
  );
}
