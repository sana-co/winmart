import { useState } from "react";
import { Heart, Gift, Zap, Star, Clock, Check } from "lucide-react";
import loyaltyCardImg from "../../imports/ShoppingApp/loyalty-card.png";

type FormData = {
  fullName: string;
  address: string;
  email: string;
  contactNumber: string;
};

type FormErrors = {
  fullName?: string;
  address?: string;
  email?: string;
  contactNumber?: string;
};

export function LoyaltyCardPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    address: "",
    email: "",
    contactNumber: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [emailWarning, setEmailWarning] = useState("");

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!validatePhoneNumber(formData.contactNumber)) {
      newErrors.contactNumber = "Please enter a valid contact number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitError("");
    setEmailWarning("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/loyalty-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Could not submit your loyalty card request.");
      }

      const data = await response.json();
      const cardNumber = data?.cardNumber;

      if (!cardNumber) {
        throw new Error("Your loyalty card was saved, but the card number was not returned.");
      }

      const emailResponse = await fetch("/api/send-loyalty-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.fullName,
          email: formData.email,
          cardNumber,
        }),
      });

      if (!emailResponse.ok) {
        const emailData = await emailResponse.json().catch(() => null);
        setEmailWarning(emailData?.error || "Your card was created, but we could not send the confirmation email.");
      }

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          fullName: "",
          address: "",
          email: "",
          contactNumber: "",
        });
        setIsSubmitted(false);
        setEmailWarning("");
      }, 3000);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Could not submit your loyalty card request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Star,
      title: "Exclusive Discounts",
      description: "Enjoy special discounts on selected products",
    },
    {
      icon: Gift,
      title: "Earn Points",
      description: "Earn points every time you shop",
    },
    {
      icon: Zap,
      title: "Redeem Rewards",
      description: "Redeem points on future purchases",
    },
    {
      icon: Heart,
      title: "Member Offers",
      description: "Special member-only offers and deals",
    },
    {
      icon: Clock,
      title: "Easy Registration",
      description: "Quick and simple sign-up process",
    },
    {
      icon: Check,
      title: "Instant Benefits",
      description: "Start earning rewards immediately",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafaf8" }}>
      {/* Hero Section */}
      <section
        className="relative overflow-hidden px-4 py-12 sm:px-6 md:py-20 lg:py-28"
        style={{
          background: "linear-gradient(135deg, #273777 0%, #273777 20%, #405397 60%, #c8d3f5 100%)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2 lg:items-center">
            {/* Content */}
            <div className="flex flex-col justify-center space-y-5 text-center sm:space-y-6 lg:text-left">
              <div>
                <span
                className="text-[#F4C542] uppercase tracking-widest"
                style={{ fontFamily: "Poppins, sans-serif", fontWeight: 600, fontSize: "15px" }}
                >
                Premium Benefits
                </span>
                <h1
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(30px, 8vw, 64px)",
                    lineHeight: "1.15",
                    color: "#ffffff",
                    textShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  }}
                >
                  Get Your Free Loyalty Card
                </h1>
              </div>

              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "clamp(16px, 3vw, 22px)",
                  fontWeight: 500,
                  color: "rgba(255, 255, 255, 0.95)",
                  lineHeight: 1.6,
                }}
              >
                100% Free • Special Discounts • Earn Points On Every Purchase
              </p>

              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "15px",
                  color: "rgba(255, 255, 255, 0.85)",
                  lineHeight: 1.8,
                }}
              >
                Completely free. No annual fees. Exclusive discounts, earn points on every purchase, and unlock member-only offers.
              </p>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => {
                    document
                      .getElementById("form-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    backgroundColor: "#e30b43",
                    color: "#ffffff",
                  }}
                  className="inline-flex min-h-11 items-center justify-center rounded-[8px] px-6 py-3 font-bold tracking-wider transition-all duration-300 hover:shadow-lg active:scale-95 sm:rounded-full sm:px-8"
                >
                  Get Your Loyalty Card
                </button>
              </div>
            </div>

            {/* Card Visual */}
            <div className="flex items-center justify-center">
              <div
                className="relative w-full max-w-[560px] lg:max-w-2xl"
                style={{
                  perspective: "1000px",
                }}
              >
                <img
                  src={loyaltyCardImg}
                  alt="Win Mart Loyalty Card"
                  className="h-auto w-full rounded-[10px] shadow-2xl sm:rounded-[24px]"
                  style={{
                    transform: "rotateY(-5deg) rotateX(2deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-10 sm:px-6 sm:py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center sm:mb-12">
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(26px, 6vw, 48px)",
                color: "#1a1a1a",
                marginBottom: "16px",
              }}
            >
              Why Join Our Loyalty Program?
            </h2>
            <div
              style={{
                width: "60px",
                height: "3px",
                backgroundColor: "#273777",
                margin: "0 auto",
              }}
            ></div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="group mx-auto w-full max-w-[500px] rounded-[10px] border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg sm:max-w-none sm:rounded-xl sm:p-6"
                >
                  <div
                    className="mb-4 inline-block rounded-lg p-3 transition-colors group-hover:bg-opacity-80"
                    style={{
                      backgroundColor: "#f0e8f5",
                    }}
                  >
                    <IconComponent size={28} color="#273777" />
                  </div>
                  <h3
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontSize: "18px",
                      color: "#1a1a1a",
                      marginBottom: "8px",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      color: "#666",
                      lineHeight: 1.6,
                    }}
                  >
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section
        id="form-section"
        className="px-4 py-10 sm:px-6 sm:py-16 md:py-24"
        style={{
          backgroundColor: "#f7f7f7",
        }}
      >
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center sm:mb-12">
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 800,
                fontSize: "clamp(26px, 6vw, 48px)",
                color: "#1a1a1a",
                marginBottom: "16px",
              }}
            >
              Apply for Your Card
            </h2>
            <p
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "16px",
                color: "#666",
                lineHeight: 1.6,
              }}
            >
              Complete the form below to get started with exclusive rewards
            </p>
          </div>

          {isSubmitted ? (
            <div
              className="rounded-[10px] border border-green-200 bg-green-50 p-5 text-center sm:rounded-xl sm:p-8"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: "#273777" }}>
                <Check size={32} color="#ffffff" />
              </div>
              <h3
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontWeight: 700,
                  fontSize: "22px",
                  color: "#1a1a1a",
                  marginBottom: "8px",
                }}
              >
                Thank You!
              </h3>
              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  color: emailWarning ? "#b45309" : "#666",
                  lineHeight: 1.6,
                }}
              >
                {emailWarning ||
                  "Your loyalty card request has been submitted. We'll process it shortly and send you a confirmation email."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 rounded-[10px] bg-white p-5 shadow-md sm:space-y-6 sm:rounded-xl sm:p-8">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#1a1a1a",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors focus:border-transparent focus:outline-none focus:ring-2"
                  style={{
                    borderColor: errors.fullName ? "#ef4444" : "#e5e7eb",
                    backgroundColor: "#f9fafb",
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    color: "#1a1a1a",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#273777";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37, 58, 143, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                {errors.fullName && (
                  <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "4px", fontFamily: "Poppins" }}>
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#1a1a1a",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your full address"
                  rows={3}
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    borderColor: errors.address ? "#ef4444" : "#e5e7eb",
                    backgroundColor: "#f9fafb",
                    color: "#1a1a1a",
                  }}
                  className="w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:outline-none focus:ring-2"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#273777";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37, 58, 143, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                {errors.address && (
                  <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "4px", fontFamily: "Poppins" }}>
                    {errors.address}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#1a1a1a",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    borderColor: errors.email ? "#ef4444" : "#e5e7eb",
                    backgroundColor: "#f9fafb",
                    color: "#1a1a1a",
                  }}
                  className="w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:outline-none focus:ring-2"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#273777";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37, 58, 143, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                {errors.email && (
                  <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "4px", fontFamily: "Poppins" }}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label
                  htmlFor="contactNumber"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#1a1a1a",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  Contact Number *
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your contact number"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    borderColor: errors.contactNumber ? "#ef4444" : "#e5e7eb",
                    backgroundColor: "#f9fafb",
                    color: "#1a1a1a",
                  }}
                  className="w-full rounded-lg border px-4 py-3 transition-colors focus:border-transparent focus:outline-none focus:ring-2"
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#273777";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37, 58, 143, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                {errors.contactNumber && (
                  <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "4px", fontFamily: "Poppins" }}>
                    {errors.contactNumber}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              {submitError && (
                <p style={{ color: "#ef4444", fontSize: "13px", fontFamily: "Poppins" }}>
                  {submitError}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  fontFamily: "Poppins, sans-serif",
                  backgroundColor: isSubmitting ? "#1d285f" : "#273777",
                  color: "#ffffff",
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                }}
                className="w-full rounded-lg px-6 py-3 font-bold tracking-wider transition-all duration-300 hover:shadow-lg disabled:hover:shadow-none"
              >
                {isSubmitting ? "Submitting..." : "Apply Now"}
              </button>

              <p
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "12px",
                  color: "#999",
                  textAlign: "center",
                }}
              >
                Your information is secure and will only be used to process your loyalty card application.
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
