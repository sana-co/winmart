import { useState } from "react";
import { CheckCircle, Truck, Tag, Users, TrendingUp, Globe, ShieldCheck } from "lucide-react";

const benefits = [
  { icon: <Globe size={28} />, title: "Global Reach", desc: "List your products in front of thousands of active fashion shoppers across multiple markets." },
  { icon: <TrendingUp size={28} />, title: "Grow Your Sales", desc: "Leverage our marketing, promotions, and seasonal campaigns to boost your revenue." },
  { icon: <Truck size={28} />, title: "Logistics Support", desc: "We connect you with reliable delivery partners so you focus on what you do best — making great products." },
  { icon: <Tag size={28} />, title: "Competitive Pricing Tools", desc: "Our smart pricing dashboard helps you stay competitive without guesswork." },
  { icon: <Users size={28} />, title: "Dedicated Account Manager", desc: "Every supplier gets a dedicated point of contact to help onboard and grow." },
  { icon: <ShieldCheck size={28} />, title: "Secure Payments", desc: "Guaranteed weekly payouts with full transparency on every transaction." },
];

const steps = [
  { num: "01", title: "Submit Application", desc: "Fill out the form below with your business details and product category." },
  { num: "02", title: "Review & Approval", desc: "Our team reviews your application within 2–3 business days." },
  { num: "03", title: "Onboarding Call", desc: "We schedule a quick call to walk you through the platform and tools." },
  { num: "04", title: "Go Live", desc: "Upload your catalogue and start selling to Winmart Fashion customers." },
];

type Form = { business: string; contact: string; email: string; phone: string; category: string; website: string; message: string };

const categories = ["Ladies' Wear", "Gents' Wear", "Kids' Wear", "Accessories", "Footwear", "Sportswear", "Luxury / Designer", "Other"];

export function BecomeASupplierPage() {
  const [form, setForm] = useState<Form>({ business: "", contact: "", email: "", phone: "", category: "", website: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const set = (k: keyof Form, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    if (!form.business || !form.email || !form.contact || !form.category) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/supplier-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Could not submit your application.");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not submit your application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f7f7f7]">

      {/* Hero */}
      <section
        className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:py-24"
        style={{ background: "linear-gradient(135deg, #253A8F 0%, #253A8F 20%, #3a52b8 60%, #c8d3f5 100%)" }}
      >
        <div className="max-w-[860px] mx-auto text-center">
          <span
            className="text-[#F4C542] uppercase tracking-widest"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px" }}
          >
            Partner With Us
          </span>
          <h1
            className="text-white mt-3 mb-5"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", lineHeight: "1.1", letterSpacing: "-0.5px" }}
          >
            Become a Winmart<span className="block">Fashion Supplier</span>
          </h1>
          <p
            className="text-white/75 max-w-[580px] mx-auto"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.6vw, 19px)" }}
          >
            Join our growing network of fashion suppliers and reach thousands of customers who love great style.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="w-full px-4 py-10 sm:px-6 sm:py-16">
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="mb-7 text-center text-[#191919] sm:mb-10"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(24px, 3vw, 38px)", letterSpacing: "1px" }}
          >
            Why Sell on Winmart Fashion?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map(b => (
              <div key={b.title} className="group mx-auto w-full max-w-[500px] rounded-[10px] border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:max-w-none sm:rounded-[20px] sm:p-7">
                <div className="w-12 h-12 rounded-full bg-[#253A8F]/10 group-hover:bg-[#253A8F] flex items-center justify-center mb-5 transition-colors text-[#253A8F] group-hover:text-white">
                  {b.icon}
                </div>
                <p className="text-[#191919] mb-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "17px" }}>{b.title}</p>
                <p className="text-[#7f7f7f] leading-relaxed" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "14px" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full bg-white px-4 py-10 sm:px-6 sm:py-16">
        <div className="max-w-[1000px] mx-auto">
          <h2
            className="mb-8 text-center text-[#191919] sm:mb-12"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(24px, 3vw, 38px)", letterSpacing: "1px" }}
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.num} className="flex flex-col items-center text-center relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+28px)] right-[-50%] h-[2px] bg-[#253A8F]/15" />
                )}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shrink-0"
                  style={{ background: "linear-gradient(135deg, #253A8F, #3a52b8)" }}
                >
                  <span className="text-white" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "18px" }}>{s.num}</span>
                </div>
                <p className="text-[#191919] mb-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "16px" }}>{s.title}</p>
                <p className="text-[#7f7f7f]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "13px", lineHeight: "1.6" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="w-full bg-[#f7f7f7] px-4 py-10 sm:px-6 sm:py-16">
        <div className="max-w-[780px] mx-auto">
          <div className="mb-7 text-center sm:mb-10">
            <h2
              className="text-[#191919]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(24px, 3vw, 36px)" }}
            >
              Apply to Become a Supplier
            </h2>
            <p className="text-[#7f7f7f] mt-2" style={{ fontFamily: "Poppins, sans-serif", fontSize: "15px" }}>
              We'll review your application and get back to you within 2–3 business days.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-[10px] border border-gray-100 bg-white p-6 text-center shadow-md sm:rounded-[24px] sm:p-12">
              <CheckCircle size={56} className="text-[#253A8F] mx-auto mb-5" />
              <h3 className="text-[#191919] mb-3" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "26px" }}>
                Application Received!
              </h3>
              <p className="text-[#7f7f7f]" style={{ fontFamily: "Poppins, sans-serif", fontSize: "15px" }}>
                Thanks, <strong>{form.business}</strong>. Our team will reach out to <strong>{form.email}</strong> within 2–3 business days.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[10px] border border-gray-100 bg-white p-5 shadow-md sm:rounded-[24px] sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {[
                  { id: "business", label: "Business Name", placeholder: "Your brand or company name", required: true },
                  { id: "contact",  label: "Contact Person",  placeholder: "Your full name", required: true },
                  { id: "email",    label: "Email Address",   placeholder: "business@example.com", required: true },
                  { id: "phone",    label: "Phone Number",    placeholder: "+234 800 000 0000", required: false },
                  { id: "website",  label: "Website / Social", placeholder: "instagram.com/yourbrand", required: false },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-1.5">
                    <label className="text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}>
                      {f.label} {f.required && <span className="text-[#D9043D]">*</span>}
                    </label>
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={form[f.id as keyof Form]}
                      onChange={e => set(f.id as keyof Form, e.target.value)}
                      required={f.required}
                      className="border border-gray-200 bg-[#f7f7f7] rounded-[10px] px-4 py-3 text-[#191919] placeholder-gray-400 outline-none focus:border-[#253A8F] focus:bg-white transition-all"
                      style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}>
                    Product Category <span className="text-[#D9043D]">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={e => set("category", e.target.value)}
                    required
                    className="border border-gray-200 bg-[#f7f7f7] rounded-[10px] px-4 py-3 text-[#191919] outline-none focus:border-[#253A8F] focus:bg-white transition-all appearance-none cursor-pointer"
                    style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                  >
                    <option value="" disabled>Choose a category…</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 mb-7">
                <label className="text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}>
                  Tell Us About Your Business
                </label>
                <textarea
                  rows={4}
                  placeholder="Brief description of your products, production capacity, and why you'd like to partner with us…"
                  value={form.message}
                  onChange={e => set("message", e.target.value)}
                  className="border border-gray-200 bg-[#f7f7f7] rounded-[10px] px-4 py-3 text-[#191919] placeholder-gray-400 outline-none focus:border-[#253A8F] focus:bg-white transition-all resize-none"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                />
              </div>
              {submitError && (
                <p className="text-[#D9043D] mb-5" style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px" }}>
                  {submitError}
                </p>
              )}
              <div className="flex flex-col items-stretch gap-4 min-[430px]:flex-row min-[430px]:items-center min-[430px]:justify-between">
                <p className="text-gray-400" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>* Required fields</p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-11 rounded-[8px] bg-[#253A8F] px-6 py-3.5 text-white shadow-md transition-all hover:bg-[#1B2A6B] active:scale-95 sm:rounded-[10px] sm:px-10"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "16px", opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}
                >
                  Submit Application →
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
