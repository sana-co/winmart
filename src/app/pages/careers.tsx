import { useState } from "react";
import { Phone, CheckCircle, MapPin, Clock, DollarSign, Users, Briefcase, Upload } from "lucide-react";
import imgFlyer from "../../imports/ShoppingApp/b69fa348-2d7d-4449-bac3-8eef5c0ee02e.png";
import { getSupabaseClient } from "../lib/supabase";

const roleOptions = ["Cashier", "Sales Representative", "Accounting Assistant"];

const openRoles = [
  {
    title: "Cashier",
    type: "Full-Time",
    location: "In-Store",
    salary: "Competitive + Benefits",
    requirements: [
      "O/L or A/L qualification (or equivalent)",
      "Age between 18 and 35 years",
      "Good communication and interpersonal skills",
      "Smart appearance and professional attitude",
      "Ability to work in a team environment",
      "Prior retail experience is an advantage",
    ],
    perks: ["High salary package", "Staff benefits & allowances", "Career growth opportunities", "Supportive team environment"],
  },
  {
    title: "Sales Representative",
    type: "Full-Time",
    location: "In-Store",
    salary: "Competitive + Benefits",
    requirements: [
      "O/L or A/L qualification (or equivalent)",
      "Confident communication and customer service skills",
      "Friendly, energetic, and target-focused attitude",
      "Good product presentation and selling skills",
      "Ability to work flexible retail shifts",
      "Prior fashion or retail sales experience is an advantage",
    ],
    perks: ["Attractive salary package", "Sales incentives", "Staff benefits & allowances", "Career growth opportunities"],
  },
  {
    title: "Accounting Assistant",
    type: "Full-Time",
    location: "Office / Store",
    salary: "Competitive + Benefits",
    requirements: [
      "A/L qualification in commerce or relevant accounting studies",
      "Basic knowledge of bookkeeping and accounting documents",
      "Good attention to detail and accuracy",
      "Computer literacy with Excel or similar tools",
      "Professional attitude and confidentiality",
      "Prior accounting or cashiering experience is an advantage",
    ],
    perks: ["Stable career path", "Staff benefits & allowances", "Practical accounting exposure", "Supportive team environment"],
  },
];

const whyJoin = [
  { icon: <DollarSign size={24} />, title: "Competitive Pay", desc: "We offer market-leading salaries with performance bonuses and regular reviews." },
  { icon: <Users size={24} />, title: "Great Team", desc: "Work alongside passionate, driven people who love fashion and great service." },
  { icon: <Briefcase size={24} />, title: "Career Growth", desc: "We promote from within - your hard work opens doors to bigger roles." },
  { icon: <Clock size={24} />, title: "Flexible Schedules", desc: "We work with you to find shift patterns that fit your life." },
  { icon: <MapPin size={24} />, title: "Prime Locations", desc: "Our stores are in accessible, busy locations with great footfall." },
  { icon: <CheckCircle size={24} />, title: "Staff Benefits", desc: "Enjoy staff discounts, allowances, and a benefits package from day one." },
];

type AppForm = { name: string; phone: string; email: string; role: string; message: string; cv: File | null };

export function CareersPage() {
  const [form, setForm] = useState<AppForm>({ name: "", phone: "", email: "", role: roleOptions[0], message: "", cv: null });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const set = (k: keyof AppForm, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!form.name || !form.phone || !form.role || !form.cv) {
      setSubmitError("Please fill the required fields and upload your CV.");
      return;
    }

    if (form.cv.size > 8 * 1024 * 1024) {
      setSubmitError("Please upload a CV smaller than 8MB.");
      return;
    }

    setSubmitting(true);
    try {
      const uploadResponse = await fetch("/api/career-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create-cv-upload",
          fileName: form.cv.name,
          fileType: form.cv.type,
          fileSize: form.cv.size,
        }),
      });
      const uploadData = await uploadResponse.json().catch(() => ({}));

      if (!uploadResponse.ok) {
        throw new Error(uploadData?.error || "Could not prepare your CV upload.");
      }

      const upload = uploadData.upload as { path?: string; token?: string } | undefined;
      if (!upload?.path || !upload.token) {
        throw new Error("Could not prepare your CV upload.");
      }

      const supabase = getSupabaseClient();
      const { error: uploadError } = await supabase.storage.from("career-cvs").uploadToSignedUrl(upload.path, upload.token, form.cv, {
        contentType: form.cv.type,
      });

      if (uploadError) {
        throw uploadError;
      }

      const response = await fetch("/api/career-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          role: form.role,
          message: form.message,
          cvFileName: form.cv.name,
          cvPath: upload.path,
        }),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Could not submit your application.");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not submit your application.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f7f7f7]">
      <section
        className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:py-20"
        style={{ background: "linear-gradient(135deg, #273777 0%, #273777 20%, #405397 60%, #c8d3f5 100%)" }}
      >
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-8 text-center sm:gap-12 lg:flex-row lg:text-left">
          <div className="min-w-0 flex-1">
            <span
              className="mb-5 inline-block rounded-full bg-[#e30b43] px-4 py-1 uppercase tracking-widest text-white"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "12px" }}
            >
              We Are Hiring Now!
            </span>
            <h1
              className="mb-5 text-white"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", lineHeight: "1.1", letterSpacing: "0" }}
            >
              Join the Winmart<span className="block">Fashion Family</span>
            </h1>
            <p
              className="mx-auto mb-7 max-w-[500px] text-white/75 lg:mx-0 lg:mb-8"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.6vw, 18px)", lineHeight: "1.7" }}
            >
              Be part of a fast-growing fashion brand that values people, style, and ambition. We're looking for passionate individuals to join our team.
            </p>
            <div className="grid gap-3 min-[390px]:flex min-[390px]:flex-wrap min-[390px]:justify-center lg:justify-start">
              <a
                href="#apply"
                className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[#e30b43] px-6 py-3 text-white transition-colors hover:bg-[#c90839] sm:rounded-[10px] sm:px-8 sm:py-3.5"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "16px" }}
              >
                Apply Now
              </a>
              <a
                href="tel:0777009697"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[8px] border border-white/30 bg-white/15 px-6 py-3 text-white transition-colors hover:bg-white/25 sm:rounded-[10px] sm:px-8 sm:py-3.5"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "16px" }}
              >
                <Phone size={18} /> Call Us
              </a>
            </div>
          </div>

          <div className="w-full max-w-[260px] shrink-0 sm:max-w-[300px] lg:w-[300px]">
            <img src={imgFlyer} alt="Winmart Fashion is Hiring" className="w-full rounded-[20px] shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1000px]">
          <h2
            className="mb-7 text-center text-[#191919] sm:mb-10"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(24px, 3vw, 38px)", letterSpacing: "1px" }}
          >
            Open Positions
          </h2>

          <div className="grid gap-5 lg:grid-cols-3">
            {openRoles.map((role) => (
              <div key={role.title} className="overflow-hidden rounded-[10px] border border-gray-100 bg-[#f7f7f7] shadow-sm sm:rounded-[20px]">
                <div className="flex flex-col justify-between gap-4 bg-[#273777] px-5 py-5 text-center sm:px-6 sm:text-left">
                  <div>
                    <h3 className="text-white" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "22px" }}>
                      {role.title}
                    </h3>
                    <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
                      {[role.type, role.location, role.salary].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/15 px-3 py-0.5 text-white/90"
                          style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px", fontWeight: 500 }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href="#apply"
                    onClick={() => set("role", role.title)}
                    className="min-h-11 shrink-0 rounded-[8px] bg-[#e30b43] px-6 py-2.5 text-center text-white transition-colors hover:bg-[#c90839]"
                    style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "14px" }}
                  >
                    Apply
                  </a>
                </div>

                <div className="grid gap-7 p-5 sm:p-6">
                  <div>
                    <p className="mb-4 text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "16px" }}>
                      Requirements
                    </p>
                    <ul className="flex flex-col gap-2.5">
                      {role.requirements.map((req) => (
                        <li key={req} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#273777]/10">
                            <CheckCircle size={12} className="text-[#273777]" />
                          </span>
                          <span className="text-[#555]" style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", lineHeight: "1.5" }}>
                            {req}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-4 text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "16px" }}>
                      What You Get
                    </p>
                    <ul className="flex flex-col gap-2.5">
                      {role.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e30b43]/10">
                            <CheckCircle size={12} className="text-[#e30b43]" />
                          </span>
                          <span className="text-[#555]" style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", lineHeight: "1.5" }}>
                            {perk}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f7f7f7] px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1100px]">
          <h2
            className="mb-7 text-center text-[#191919] sm:mb-10"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(24px, 3vw, 38px)", letterSpacing: "1px" }}
          >
            Why Work With Us?
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyJoin.map((w) => (
              <div key={w.title} className="group mx-auto w-full max-w-[500px] rounded-[10px] border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:max-w-none sm:rounded-[20px] sm:p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#273777]/10 text-[#273777] transition-colors group-hover:bg-[#273777] group-hover:text-white">
                  {w.icon}
                </div>
                <p className="mb-2 text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "16px" }}>{w.title}</p>
                <p className="leading-relaxed text-[#7f7f7f]" style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="w-full bg-white px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[860px]">
          <div className="mb-7 text-center sm:mb-10">
            <h2
              className="text-[#191919]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(24px, 3vw, 36px)" }}
            >
              Apply for a Role
            </h2>
            <p className="mt-2 text-[#7f7f7f]" style={{ fontFamily: "Poppins, sans-serif", fontSize: "15px" }}>
              Fill in your details, upload your CV, and we'll be in touch within 24 hours.
            </p>

            <div className="mt-6 grid gap-3 min-[390px]:flex min-[390px]:flex-wrap min-[390px]:justify-center">
              {["077 700 9697", "034 226 1926"].map((num) => (
                <a
                  key={num}
                  href={`tel:${num.replace(/\s/g, "")}`}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-[8px] bg-[#273777] px-5 py-3 text-white transition-colors hover:bg-[#1d285f] sm:rounded-[10px] sm:px-6"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "16px" }}
                >
                  <Phone size={18} /> {num}
                </a>
              ))}
            </div>
          </div>

          {submitted ? (
            <div className="rounded-[10px] border border-gray-100 bg-[#f7f7f7] p-6 text-center sm:rounded-[24px] sm:p-12">
              <CheckCircle size={52} className="mx-auto mb-4 text-[#273777]" />
              <h3 className="mb-2 text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "24px" }}>
                Application Sent!
              </h3>
              <p className="text-[#7f7f7f]" style={{ fontFamily: "Poppins, sans-serif", fontSize: "15px" }}>
                Thanks, <strong>{form.name}</strong>! We'll reach out to you at <strong>{form.phone}</strong> very soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[10px] border border-gray-100 bg-[#f7f7f7] p-5 sm:rounded-[24px] sm:p-8 lg:p-10">
              <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {[
                  { id: "name", label: "Full Name", placeholder: "Your full name", required: true },
                  { id: "phone", label: "Phone Number", placeholder: "077 000 0000", required: true },
                  { id: "email", label: "Email Address", placeholder: "you@example.com", required: false },
                ].map((f) => (
                  <div key={f.id} className="flex flex-col gap-1.5">
                    <label className="text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}>
                      {f.label} {f.required && <span className="text-[#e30b43]">*</span>}
                    </label>
                    <input
                      type={f.id === "email" ? "email" : "text"}
                      placeholder={f.placeholder}
                      value={form[f.id as "name" | "phone" | "email"]}
                      onChange={(e) => set(f.id as keyof AppForm, e.target.value)}
                      required={f.required}
                      className="rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-[#191919] outline-none transition-all placeholder:text-gray-400 focus:border-[#273777]"
                      style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}>
                    Position Applying For <span className="text-[#e30b43]">*</span>
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => set("role", e.target.value)}
                    className="cursor-pointer appearance-none rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-[#191919] outline-none transition-all focus:border-[#273777]"
                    style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                    required
                  >
                    {roleOptions.map((role) => (
                      <option key={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-5 flex flex-col gap-1.5">
                <label className="text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}>
                  Upload CV <span className="text-[#e30b43]">*</span>
                </label>
                <label className="relative flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-[10px] border border-dashed border-[#273777]/40 bg-white px-4 py-5 text-center transition-colors hover:border-[#273777]">
                  <Upload size={22} className="text-[#273777]" />
                  <span className="break-all text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "14px" }}>
                    {form.cv ? form.cv.name : "Choose PDF, DOC, or DOCX file"}
                  </span>
                  <span className="text-[#7f7f7f]" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>
                    Maximum file size: 8MB
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    required
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={(event) => setForm((current) => ({ ...current, cv: event.target.files?.[0] ?? null }))}
                  />
                </label>
              </div>

              <div className="mb-7 flex flex-col gap-1.5">
                <label className="text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}>
                  Tell Us About Yourself
                </label>
                <textarea
                  rows={4}
                  placeholder="Brief introduction - your experience, availability, and why you'd like to join Winmart Fashion..."
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  className="resize-none rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-[#191919] outline-none transition-all placeholder:text-gray-400 focus:border-[#273777]"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                />
              </div>

              {submitError && <p className="mb-5 rounded-[8px] bg-red-50 p-3 text-sm text-red-700">{submitError}</p>}

              <div className="flex flex-col items-stretch gap-4 min-[430px]:flex-row min-[430px]:items-center min-[430px]:justify-between">
                <p className="text-gray-400" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>* Required fields</p>
                <button
                  type="submit"
                  disabled={submitting}
                  className="min-h-11 rounded-[8px] bg-[#e30b43] px-6 py-3.5 text-white shadow-md transition-all hover:bg-[#c90839] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 sm:rounded-[10px] sm:px-10"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "16px" }}
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
