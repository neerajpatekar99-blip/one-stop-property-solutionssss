"use client";

import { useState } from "react";
import { Phone, MessageSquare, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WA_URL =
  "https://wa.me/919870178204?text=Hi%2C%20I%27m%20interested%20in%20a%20property%20listed%20on%20your%20website.";

export default function StickyMobileBar() {
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", interest: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <>
      {/* Sticky Bottom Bar – Mobile Only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl">
        <div className="grid grid-cols-3">
          <a
            href="tel:+919870178204"
            className="flex flex-col items-center justify-center gap-1 py-3.5 text-navy-700 hover:bg-gray-50 active:bg-gray-100 transition-colors border-r border-gray-100"
          >
            <Phone size={19} className="text-brand" />
            <span className="text-xs font-medium">Call Now</span>
          </a>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 py-3.5 text-navy-700 hover:bg-gray-50 active:bg-gray-100 transition-colors border-r border-gray-100"
          >
            <MessageSquare size={19} className="text-[#25D366]" />
            <span className="text-xs font-medium">WhatsApp</span>
          </a>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openPropertyQuiz"))}
            className="flex flex-col items-center justify-center gap-1 py-3.5 text-navy-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <Sparkles size={19} className="text-brand animate-pulse" />
            <span className="text-xs font-bold">Smart Match</span>
          </button>
        </div>
      </div>

      {/* Enquire Modal */}
      <AnimatePresence>
        {enquireOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 flex items-end md:items-center justify-center"
            onClick={() => setEnquireOpen(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white w-full md:max-w-md rounded-t-3xl md:rounded-2xl p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {!submitted ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-serif text-navy-800">
                        Quick Enquiry
                      </h3>
                      <p className="text-sm text-navy-500 mt-0.5">
                        We&apos;ll call you back within 1 hour
                      </p>
                    </div>
                    <button
                      onClick={() => setEnquireOpen(false)}
                      className="p-2 rounded-xl hover:bg-gray-100 text-navy-400"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-navy-600 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="input-field"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-navy-600 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 00000 00000"
                        className="input-field"
                        required
                        pattern="[0-9]{10}"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-navy-600 mb-1.5">
                        Looking for (optional)
                      </label>
                      <select
                        className="input-field"
                        value={form.interest}
                        onChange={(e) =>
                          setForm({ ...form, interest: e.target.value })
                        }
                      >
                        <option value="">Select property type</option>
                        <option value="1bhk-buy">Buy 1 BHK</option>
                        <option value="2bhk-buy">Buy 2 BHK</option>
                        <option value="3bhk-buy">Buy 3 BHK</option>
                        <option value="rent">Rental Property</option>
                        <option value="invest">Investment</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center py-3.5 disabled:opacity-70"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        "Send Enquiry"
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif text-navy-800 mb-2">
                    Enquiry Sent!
                  </h3>
                  <p className="text-navy-500 text-sm mb-6">
                    Sachin sir will call you back within 1 hour. Thank you!
                  </p>
                  <button
                    onClick={() => {
                      setEnquireOpen(false);
                      setSubmitted(false);
                      setForm({ name: "", phone: "", interest: "" });
                    }}
                    className="btn-outline py-2.5 px-6"
                  >
                    Done
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
