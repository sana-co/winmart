import { useState } from "react";

type Field = { label: string; type: string; placeholder: string; id: string };

const fields: Field[] = [
  { id: "name",  label: "Full Name",     type: "text",  placeholder: "e.g. Amara Johnson" },
];

const topics = ["Product Quality", "Pricing", "Customer Service", "Music", "Ambience", "Other"];

export function WinmartCommunity() {
  const [form, setForm] = useState({ name: "", topic: "", message: "", rating: 0 });
  const [hover, setHover] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const set = (k: string, v: string | number) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!form.name || !form.message) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
      <section className="w-full py-20 bg-[#f7f7f7]">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-[#D9043D] flex items-center justify-center mx-auto mb-6 shadow-lg">
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
            onClick={() => { setSubmitted(false); setForm({ name: "", topic: "", message: "", rating: 0 }); }}
            className="bg-[#D9043D] hover:bg-[#b8032f] transition-colors text-white rounded-[8px] px-8 py-3"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px" }}
          >
            Submit Another
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 bg-[#f7f7f7]">
      <div className="max-w-[860px] mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-10">
          <span
            className="text-[#D9043D] uppercase tracking-widest"
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
          className="bg-white rounded-[24px] p-8 lg:p-10 shadow-md border border-gray-100"
        >
          {/* Name */}
          <div className="mb-5">
            {fields.map(f => (
              <div key={f.id} className="flex flex-col gap-1.5">
                <label
                  className="text-[#191919]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}
                >
                  {f.label} <span className="text-[#D9043D]">*</span>
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.id as keyof typeof form] as string}
                  onChange={e => set(f.id, e.target.value)}
                  required
                  className="border border-gray-200 bg-[#f7f7f7] rounded-[10px] px-4 py-3 text-[#191919] placeholder-gray-400 outline-none focus:border-[#253A8F] focus:bg-white transition-all"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                />
              </div>
            ))}
          </div>

          {/* Topic */}
          <div className="mb-5">
            <div className="flex flex-col gap-1.5">
              <label
                className="text-[#191919]"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}
              >
                Topic
              </label>
              <select
                value={form.topic}
                onChange={e => set("topic", e.target.value)}
                className="border border-gray-200 bg-[#f7f7f7] rounded-[10px] px-4 py-3 text-[#191919] outline-none focus:border-[#253A8F] focus:bg-white transition-all appearance-none cursor-pointer"
                style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
              >
                <option value="" disabled>Select a topic…</option>
                {topics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Star rating */}
          <div className="mb-5">
            <label
              className="text-[#191919] block mb-2"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}
            >
              Overall Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => set("rating", star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform hover:scale-110"
                  style={{ fontSize: "30px", color: star <= (hover || form.rating) ? "#D9043D" : "#d1d5db" }}
                >
                  ★
                </button>
              ))}
              {form.rating > 0 && (
                <span
                  className="text-[#7f7f7f] ml-3"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px" }}
                >
                  {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][form.rating]}
                </span>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5 mb-7">
            <label
              className="text-[#191919]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}
            >
              Your Message <span className="text-[#D9043D]">*</span>
            </label>
            <textarea
              rows={4}
              placeholder="Tell us what you think — the good, the bad, and everything in between…"
              value={form.message}
              onChange={e => set("message", e.target.value)}
              required
              className="border border-gray-200 bg-[#f7f7f7] rounded-[10px] px-4 py-3 text-[#191919] placeholder-gray-400 outline-none focus:border-[#253A8F] focus:bg-white transition-all resize-none"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
            />
          </div>

          {/* Submit row */}
          {submitError && (
            <p className="text-[#D9043D] mb-5" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px" }}>
              {submitError}
            </p>
          )}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p
              className="text-gray-400"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
            >
              * Required fields
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#D9043D] hover:bg-[#b8032f] active:scale-95 transition-all duration-200 text-white rounded-[10px] px-10 py-3.5 shadow-md"
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
