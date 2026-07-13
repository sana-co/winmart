import { useState } from "react";
import { Phone, CheckCircle, MapPin, Clock, DollarSign, Users, Briefcase } from "lucide-react";
import imgFlyer from "../../imports/ShoppingApp/b69fa348-2d7d-4449-bac3-8eef5c0ee02e.png";

const openRoles = [
  {
    title: "Cashier / Sales Assistant",
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
];

const whyJoin = [
  { icon: <DollarSign size={24} />, title: "Competitive Pay",      desc: "We offer market-leading salaries with performance bonuses and regular reviews." },
  { icon: <Users size={24} />,      title: "Great Team",           desc: "Work alongside passionate, driven people who love fashion and great service." },
  { icon: <Briefcase size={24} />,  title: "Career Growth",        desc: "We promote from within — your hard work opens doors to bigger roles." },
  { icon: <Clock size={24} />,      title: "Flexible Schedules",   desc: "We work with you to find shift patterns that fit your life." },
  { icon: <MapPin size={24} />,     title: "Prime Locations",      desc: "Our stores are in accessible, busy locations with great footfall." },
  { icon: <CheckCircle size={24} />, title: "Staff Benefits",      desc: "Enjoy staff discounts, allowances, and a benefits package from day one." },
];

type AppForm = { name: string; phone: string; email: string; role: string; message: string };

export function CareersPage() {
  const [form, setForm] = useState<AppForm>({ name: "", phone: "", email: "", role: "Cashier / Sales Assistant", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const set = (k: keyof AppForm, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#f7f7f7]">

      {/* Hero */}
      <section
        className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:py-20"
        style={{ background: "linear-gradient(135deg, #253A8F 0%, #253A8F 20%, #3a52b8 60%, #c8d3f5 100%)" }}
      >
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-8 text-center sm:gap-12 lg:flex-row lg:text-left">
          <div className="min-w-0 flex-1">
            <span
              className="inline-block bg-[#D9043D] text-white rounded-full px-4 py-1 mb-5 uppercase tracking-widest"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "12px" }}
            >
              We Are Hiring Now!
            </span>
            <h1
              className="text-white mb-5"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(32px, 5vw, 60px)", lineHeight: "1.1", letterSpacing: "-0.5px" }}
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
                className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[#D9043D] px-6 py-3 text-white transition-colors hover:bg-[#b8032f] sm:rounded-[10px] sm:px-8 sm:py-3.5"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "16px" }}
              >
                Apply Now →
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

          {/* Flyer image */}
          <div className="w-full max-w-[260px] shrink-0 sm:max-w-[300px] lg:w-[300px]">
            <img
              src={imgFlyer}
              alt="Winmart Fashion is Hiring"
              className="w-full rounded-[20px] shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="w-full bg-white px-4 py-10 sm:px-6 sm:py-16">
        <div className="max-w-[900px] mx-auto">
          <h2
            className="mb-7 text-center text-[#191919] sm:mb-10"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(24px, 3vw, 38px)", letterSpacing: "1px" }}
          >
            Open Positions
          </h2>

          {openRoles.map(role => (
            <div key={role.title} className="overflow-hidden rounded-[10px] border border-gray-100 bg-[#f7f7f7] shadow-sm sm:rounded-[24px]">
              {/* Role header */}
              <div className="flex flex-col justify-between gap-4 bg-[#253A8F] px-5 py-5 text-center sm:flex-row sm:items-center sm:px-8 sm:py-6 sm:text-left">
                <div>
                  <h3 className="text-white" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "22px" }}>
                    {role.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {[role.type, role.location, role.salary].map(tag => (
                      <span
                        key={tag}
                        className="bg-white/15 text-white/90 rounded-full px-3 py-0.5"
                        style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px", fontWeight: 500 }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href="#apply"
                  className="min-h-11 shrink-0 rounded-[8px] bg-[#D9043D] px-6 py-2.5 text-center text-white transition-colors hover:bg-[#b8032f]"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "14px" }}
                >
                  Apply →
                </a>
              </div>

              {/* Requirements & Perks */}
              <div className="grid grid-cols-1 gap-7 p-5 sm:p-8 md:grid-cols-2 md:gap-8">
                <div>
                  <p className="text-[#191919] mb-4" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "16px" }}>
                    Requirements
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {role.requirements.map(req => (
                      <li key={req} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#253A8F]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle size={12} className="text-[#253A8F]" />
                        </span>
                        <span className="text-[#555]" style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", lineHeight: "1.5" }}>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[#191919] mb-4" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "16px" }}>
                    What You Get
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {role.perks.map(perk => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#D9043D]/10 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle size={12} className="text-[#D9043D]" />
                        </span>
                        <span className="text-[#555]" style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", lineHeight: "1.5" }}>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why join us */}
      <section className="w-full bg-[#f7f7f7] px-4 py-10 sm:px-6 sm:py-16">
        <div className="max-w-[1100px] mx-auto">
          <h2
            className="mb-7 text-center text-[#191919] sm:mb-10"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(24px, 3vw, 38px)", letterSpacing: "1px" }}
          >
            Why Work With Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyJoin.map(w => (
              <div key={w.title} className="group mx-auto w-full max-w-[500px] rounded-[10px] border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:max-w-none sm:rounded-[20px] sm:p-7">
                <div className="w-12 h-12 rounded-full bg-[#253A8F]/10 group-hover:bg-[#253A8F] flex items-center justify-center mb-4 transition-colors text-[#253A8F] group-hover:text-white">
                  {w.icon}
                </div>
                <p className="text-[#191919] mb-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "16px" }}>{w.title}</p>
                <p className="text-[#7f7f7f] leading-relaxed" style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact + Application form */}
      <section id="apply" className="w-full bg-white px-4 py-10 sm:px-6 sm:py-16">
        <div className="max-w-[860px] mx-auto">
          <div className="mb-7 text-center sm:mb-10">
            <h2
              className="text-[#191919]"
              style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "clamp(24px, 3vw, 36px)" }}
            >
              Apply for This Role
            </h2>
            <p className="text-[#7f7f7f] mt-2" style={{ fontFamily: "Poppins, sans-serif", fontSize: "15px" }}>
              Fill in your details or call us directly and we'll be in touch within 24 hours.
            </p>

            {/* Direct contact */}
            <div className="mt-6 grid gap-3 min-[390px]:flex min-[390px]:flex-wrap min-[390px]:justify-center">
              {["077 700 9697", "034 226 1926"].map(num => (
                <a
                  key={num}
                  href={`tel:${num.replace(/\s/g, "")}`}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-[8px] bg-[#253A8F] px-5 py-3 text-white transition-colors hover:bg-[#1B2A6B] sm:rounded-[10px] sm:px-6"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "16px" }}
                >
                  <Phone size={18} /> {num}
                </a>
              ))}
            </div>
          </div>

          {submitted ? (
            <div className="rounded-[10px] border border-gray-100 bg-[#f7f7f7] p-6 text-center sm:rounded-[24px] sm:p-12">
              <CheckCircle size={52} className="text-[#253A8F] mx-auto mb-4" />
              <h3 className="text-[#191919] mb-2" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 900, fontSize: "24px" }}>
                Application Sent!
              </h3>
              <p className="text-[#7f7f7f]" style={{ fontFamily: "Poppins, sans-serif", fontSize: "15px" }}>
                Thanks, <strong>{form.name}</strong>! We'll reach out to you at <strong>{form.phone}</strong> very soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-[10px] border border-gray-100 bg-[#f7f7f7] p-5 sm:rounded-[24px] sm:p-8 lg:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                {[
                  { id: "name",  label: "Full Name",    placeholder: "Your full name",     required: true },
                  { id: "phone", label: "Phone Number", placeholder: "077 000 0000",       required: true },
                  { id: "email", label: "Email Address", placeholder: "you@example.com",   required: false },
                ].map(f => (
                  <div key={f.id} className="flex flex-col gap-1.5">
                    <label className="text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}>
                      {f.label} {f.required && <span className="text-[#D9043D]">*</span>}
                    </label>
                    <input
                      type="text"
                      placeholder={f.placeholder}
                      value={form[f.id as keyof AppForm]}
                      onChange={e => set(f.id as keyof AppForm, e.target.value)}
                      required={f.required}
                      className="border border-gray-200 bg-white rounded-[10px] px-4 py-3 text-[#191919] placeholder-gray-400 outline-none focus:border-[#253A8F] transition-all"
                      style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}>
                    Position Applying For
                  </label>
                  <select
                    value={form.role}
                    onChange={e => set("role", e.target.value)}
                    className="border border-gray-200 bg-white rounded-[10px] px-4 py-3 text-[#191919] outline-none focus:border-[#253A8F] transition-all appearance-none cursor-pointer"
                    style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                  >
                    <option>Cashier / Sales Assistant</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 mb-7">
                <label className="text-[#191919]" style={{ fontFamily: "Poppins, sans-serif", fontWeight: 500, fontSize: "13px" }}>
                  Tell Us About Yourself
                </label>
                <textarea
                  rows={4}
                  placeholder="Brief introduction — your experience, availability, and why you'd like to join Winmart Fashion…"
                  value={form.message}
                  onChange={e => set("message", e.target.value)}
                  className="border border-gray-200 bg-white rounded-[10px] px-4 py-3 text-[#191919] placeholder-gray-400 outline-none focus:border-[#253A8F] transition-all resize-none"
                  style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px" }}
                />
              </div>
              <div className="flex flex-col items-stretch gap-4 min-[430px]:flex-row min-[430px]:items-center min-[430px]:justify-between">
                <p className="text-gray-400" style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}>* Required fields</p>
                <button
                  type="submit"
                  className="min-h-11 rounded-[8px] bg-[#D9043D] px-6 py-3.5 text-white shadow-md transition-all hover:bg-[#b8032f] active:scale-95 sm:rounded-[10px] sm:px-10"
                  style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "16px" }}
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
