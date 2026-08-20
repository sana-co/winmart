import { WinmartCommunity } from "../components/winmart-community";

export function FeedbackPage() {
  return (
    <div className="bg-[#f7f7f7]">
      <section
        className="w-full px-4 py-12 sm:px-6 sm:py-16"
        style={{ background: "linear-gradient(135deg, #273777 0%, #273777 20%, #405397 60%, #c8d3f5 100%)" }}
      >
        <div className="max-w-[700px] mx-auto text-center">
          <span
            className="text-[#F4C542] uppercase tracking-widest"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px" }}
          >
            Your Voice Matters
          </span>
          <h1
            className="text-white mt-3 mb-4"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: "1.1", letterSpacing: "-0.5px" }}
          >
            Share Your Feedback
          </h1>
          <p
            className="text-white/75"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.6vw, 18px)" }}
          >
            Help us improve your Winmart Fashion experience — every message is read by our team.
          </p>
        </div>
      </section>
      <WinmartCommunity />
    </div>
  );
}
