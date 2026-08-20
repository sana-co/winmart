import { useState } from "react";

type Field = { label: string; type: string; placeholder: string; id: string };

const fields: Field[] = [
  { id: "name",  label: "Full Name",     type: "text",  placeholder: "e.g. Amara Johnson" },
];

const ratingKeys = ["quality", "service", "music", "ambience", "price"] as const;

export function WinmartCommunity() {
  const [form, setForm] = useState<any>({ name: "", message: "", rating: 0, quality: 0, service: 0, music: 0, ambience: 0, price: 0 });
  const [hover, setHover] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (k: string, v: string | number) => setForm((f: any) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!form.name || !form.message) {
      setSubmitError("Name and message are required.");
      return;
    }

    // ensure all category ratings are provided
    const missing = ratingKeys.find(k => !(form[k] > 0));
    if (missing) {
      setSubmitError("Please rate all categories before submitting.");
      return;
    }

    // compute overall rating as rounded average
    const total = ratingKeys.reduce((s, k) => s + Number(form[k] || 0), 0);
    const overall = Math.round(total / ratingKeys.length);
    setForm((f: any) => ({ ...f, rating: overall }));

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating: Math.round((form.quality + form.service + form.music + form.ambience + form.price) / 5) }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Could not send your feedback.");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not send your feedback.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section className="w-full bg-[#f7f7f7] py-12 sm:py-20">
        <div className="mx-auto max-w-[600px] px-4 text-center sm:px-6">
          <div className="w-20 h-20 rounded-full bg-[#e30b43] flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2
            className="text-[#191919] mb-3"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(24px, 3vw, 36px)" }}
          >
            Thank You, {form.name.split(" ")[0]}!
          </h2>
          <p
            className="text-[#555] mb-8"
            style={{ fontFamily: "Poppins, sans-serif", fontSize: "17px" }}
          >
            Your feedback has been received. Thank you for helping us improve.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: "", message: "", rating: 0, quality: 0, service: 0, music: 0, ambience: 0, price: 0 }); }}
            className="bg-[#e30b43] hover:bg-[#c90839] transition-colors text-white rounded-[8px] px-8 py-3"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px" }}
          >
            Submit Another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#f7f7f7] py-10 sm:py-16">
      <div className="mx-auto max-w-[860px] px-4 sm:px-6">

        {/* Heading */}
        <div className="mb-7 text-center sm:mb-10">
          <span
            className="text-[#e30b43] uppercase tracking-widest"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "14px" }}
          >
            We'd love to hear from you
          </span>
          <h2
            className="text-[#191919] mt-2"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(26px, 3.5vw, 42px)", lineHeight: "1.2", letterSpacing: "0.5px" }}
          >
            Share Your Feedback
          </h2>
          <p
            className="text-[#7f7f7f] mt-3"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "16px" }}
          >
            Help us improve your Winmart Fashion experience.
          </p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-[12px] border border-gray-100 bg-white p-5 shadow-md sm:rounded-[24px] sm:p-8 lg:p-10"
        >
          {/* Name */}
          <div className="mb-5">
            {fields.map(f => (
              <div key={f.id} className="flex flex-col gap-1.5">
                <label
                  className="text-[#191919]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}
                >
                  {f.label} <span className="text-[#e30b43]">*</span>
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.id as keyof typeof form] as string}
                  onChange={e => set(f.id, e.target.value)}
                  required
                  className="border border-gray-200 bg-[#f7f7f7] rounded-[10px] px-4 py-3 text-[#191919] placeholder-gray-400 outline-none focus:border-[#273777] focus:bg-white transition-all"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                />
              </div>
            ))}
          </div>

          {/* Ratings for categories */}
          <div className="mb-5 grid gap-4">
            {([
              ["quality", "Quality"],
              ["service", "Service"],
              ["music", "Music"],
              ["ambience", "Ambience"],
              ["price", "Price"],
            ] as [string, string][]).map(([key, label]) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label
                  className="text-[#191919]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}
                >
                  {label} <span className="text-[#e30b43]">*</span>
                </label>
                <div className="flex min-w-0 flex-wrap items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => set(key, star)}
                      onMouseEnter={() => setHover(h => ({ ...h, [key]: star }))}
                      onMouseLeave={() => setHover(h => ({ ...h, [key]: 0 }))}
                      className="flex h-9 w-9 shrink-0 items-center justify-center transition-transform hover:scale-110"
                      style={{ fontSize: "24px", color: star <= ((hover[key] as number) || form[key]) ? "#e30b43" : "#d1d5db" }}
                    >
                      ★
                    </button>
                  ))}
                  <span
                    className="ml-2 text-[#7f7f7f]"
                    style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px" }}
                  >
                    {form[key] > 0 ? ["", "Poor", "Fair", "Good", "Very Good", "Excellent"][form[key]] : "Not rated"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5 mb-7">
            <label
              className="text-[#191919]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}
            >
              Your Message <span className="text-[#e30b43]">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Tell us what you think — the good, the bad, and everything in between…"
              value={form.message}
              onChange={e => set("message", e.target.value)}
              required
              className="border border-gray-200 bg-[#f7f7f7] rounded-[10px] px-4 py-3 text-[#191919] placeholder-gray-400 outline-none focus:border-[#273777] focus:bg-white transition-all resize-none"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
            />
          </div>

          {/* Submit row */}
          {submitError && (
            <p className="text-[#e30b43] mb-5" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px" }}>
              {submitError}
            </p>
          )}
          <div className="flex flex-col items-stretch gap-4 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
            <p
              className="text-gray-400"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
            >
              * Required fields
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="min-h-11 rounded-[8px] bg-[#e30b43] px-6 py-3.5 text-white shadow-md transition-all duration-200 hover:bg-[#c90839] active:scale-95 sm:rounded-[10px] sm:px-10"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "16px", letterSpacing: "0.3px", opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
            >
              Send Feedback →
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}
