"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function CTAProfessionalDark() {
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedPhone = phone.trim();

    if (!trimmedPhone) {
      setError("Please enter your mobile number!");
      return;
    }

    // Clean the phone number - remove all non-digits
    const digitsOnly = trimmedPhone.replace(/\D/g, "");

    // Validate phone format (10 digits for Indian numbers)
    if (digitsOnly.length !== 10) {
      setError("Please enter a valid 10-digit mobile number!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        name: "CTA Callback Request",
        email: `callback-${digitsOnly}@nextgencallbackrequest.co.in`,
        phone: digitsOnly,
        message: "Requesting free consultation callback from homepage CTA",
        domain: "nextgencallbackrequest.co.in",
        service: "Free Consultation",
        // Empty captcha field (if API still expects it)
        captchaAnswer: "",
      };

      // Replace with your actual API endpoint
      const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setPhone("");
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error(result.error || "Unable to submit. Please try again.");
      }
    } catch (error) {
      console.error("CTA Submission Error:", error);
      setError("Unable to submit. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const numbersOnly = value.replace(/\D/g, "").slice(0, 10);
    setPhone(numbersOnly);
  };

  return (
    <section className="w-full py-16 flex justify-center items-center bg-[#ebf2f8]">
      {/* CTA Card */}
      <div className="relative flex flex-col lg:flex-row items-center justify-between max-w-7xl w-full mx-4 lg:mx-8 bg-gradient-to-r from-[#05325f] to-[#5b93ca] rounded-3xl shadow-2xl overflow-hidden border border-[#245586] px-8 lg:px-12 py-10 lg:py-8">
        {/* Left Side: Text Content */}
        <div className="flex-1 lg:pr-8 mb-6 lg:mb-0">
          <h2 className="text-3xl lg:text-4xl font-bold leading-tight text-white">
            Get a <span className="text-[#a8c8e8]">Free Consultation</span> Call
          </h2>
          <p className="text-gray-200 text-base lg:text-sm mt-3 leading-relaxed">
            Enter your mobile number for a free callback. Our experts will
            contact you within 24 hours to discuss your needs.
          </p>
          <div className="mt-4 flex items-center text-sm text-gray-300">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>No spam. 100% confidential.</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 lg:flex-none lg:min-w-[480px]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full"
          >
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-600 text-sm">+91</span>
              </div>
              <input
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full pl-10 pr-5 py-4 rounded-xl border-2 border-white/30 bg-white text-gray-800 placeholder-gray-500 outline-none focus:border-white focus:ring-2 focus:ring-white/50 transition"
                required
                maxLength={10}
                pattern="[0-9]{10}"
                inputMode="numeric"
              />
            </div>
            <button
              type="submit"
              disabled={loading || phone.length !== 10}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#1e4976] to-[#4a7ba7] text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl hover:shadow-[#76a5d3]/50 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </>
              ) : submitted ? (
                "✅ Booked!"
              ) : (
                <>
                  Get Callback
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {submitted && (
            <div className="mt-3 p-3 bg-green-900/30 border border-green-500/50 rounded-lg animate-fadeIn">
              <p className="text-green-300 text-sm font-medium">
                ✅ Thank you! Our team will call you within 24 hours.
              </p>
            </div>
          )}
          {error && (
            <div className="mt-3 p-3 bg-red-900/30 border border-red-500/50 rounded-lg animate-fadeIn">
              <p className="text-red-300 text-sm font-medium">{error}</p>
            </div>
          )}

          <p className="text-gray-300 text-xs mt-3 text-center">
            By submitting, you agree to our{" "}
            <a href="/privacy-policy" className="underline hover:text-white">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
