"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Phone, MapPin, Mail, Clock, CheckCircle2, Send } from "lucide-react";
import { motion } from "framer-motion";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function ContactPageClient() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  };

  const contactInfo = [
    {
      icon: Phone,
      label: "Call / WhatsApp",
      value: "+91 98701 78204",
      href: "tel:+919870178204",
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: MapPin,
      label: "Office Address",
      value: "Office No. 12, Sector 5, Kamothe, Navi Mumbai – 410209",
      href: "https://maps.google.com/?q=19.0145,73.0891",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Mail,
      label: "Email",
      value: "sachin@onestoppropertysolution.in",
      href: "mailto:sachin@onestoppropertysolution.in",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Clock,
      label: "Office Hours",
      value: "Mon - Sun: 10 AM - 10 PM",
      href: null,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-navy-800 py-16 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-brand/10 to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand/20 border border-brand/30 text-brand rounded-full px-4 py-2 text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 bg-brand rounded-full animate-pulse" />
            We Respond Within 1 Hour
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Let's Talk Property
          </h1>
          <p className="text-navy-400 text-lg">
            Reach Sachin sir directly — or drop us a message and we'll get back
            within the hour.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Contact Info + Map */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-50">
                  <h2 className="font-sans font-semibold text-navy-800 text-lg">Contact Information</h2>
                </div>
                <div className="p-6 space-y-5">
                  {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                    <div key={label} className="flex gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                        <Icon size={17} />
                      </div>
                      <div>
                        <div className="text-xs text-navy-400 font-medium mb-0.5">{label}</div>
                        {href ? (
                          <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="text-navy-800 text-sm font-medium hover:text-brand transition-colors">
                            {value}
                          </a>
                        ) : (
                          <span className="text-navy-800 text-sm">{value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 pt-0 flex gap-3">
                  <a href="tel:+919870178204" className="flex-1 btn-primary justify-center py-3 text-sm">
                    <Phone size={14} /> Call Now
                  </a>
                  <a href="https://wa.me/919870178204?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20property." target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl py-3 text-sm font-medium transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg> WhatsApp
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                <MapView properties={[]} />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="p-6 md:p-8 border-b border-gray-50">
                  <h2 className="font-sans font-semibold text-navy-800 text-xl">Send Us a Message</h2>
                  <p className="text-navy-500 text-sm mt-1">Fill the form below and Sachin sir will respond within 1 hour.</p>
                </div>
                <div className="p-6 md:p-8">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} name="contact-form" method="POST" netlify className="space-y-5">
                      <input type="hidden" name="form-name" value="contact-form" />
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-semibold text-navy-600 mb-2">Full Name *</label>
                          <input type="text" name="name" placeholder="Your full name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-navy-600 mb-2">Phone Number *</label>
                          <input type="tel" name="phone" placeholder="+91 00000 00000" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy-600 mb-2">Email Address (optional)</label>
                        <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input-field" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy-600 mb-2">I am looking to...</label>
                        <select name="interest" value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })} className="input-field">
                          <option value="">Select your requirement</option>
                          <option value="buy-1bhk">Buy a 1 BHK</option>
                          <option value="buy-2bhk">Buy a 2 BHK</option>
                          <option value="buy-3bhk">Buy a 3 BHK</option>
                          <option value="buy-luxury">Buy Luxury / 4 BHK</option>
                          <option value="rent">Rent a Property</option>
                          <option value="sell">Sell my Property</option>
                          <option value="invest">Investment Advisory</option>
                          <option value="loan">Home Loan Assistance</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-navy-600 mb-2">Your Message</label>
                        <textarea name="message" placeholder="Tell us your requirements — budget, preferred area, timeline, etc." rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input-field resize-none" />
                      </div>
                      <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base disabled:opacity-70">
                        {loading ? (
                          <span className="flex items-center gap-2"><span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />Sending your message...</span>
                        ) : (
                          <><Send size={18} />Send Message</>
                        )}
                      </button>
                      <p className="text-xs text-navy-400 text-center">By submitting, you agree to be contacted by Sachin Bhoir regarding your enquiry.</p>
                    </form>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={36} className="text-green-600" />
                      </div>
                      <h3 className="font-serif text-2xl text-navy-800 mb-3">Message Received!</h3>
                      <p className="text-navy-500 mb-2">Thank you, <strong>{form.name}</strong>. Sachin sir will call you on <strong className="text-brand">{form.phone}</strong> within 1 hour.</p>
                      <p className="text-navy-400 text-sm mb-8">Office hours: Mon - Sun 10 AM - 10 PM</p>
                      <div className="flex gap-3 justify-center">
                        <a href="tel:+919870178204" className="btn-primary py-3 px-6"><Phone size={16} />Call Now Anyway</a>
                        <button onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", interest: "", message: "" }); }} className="btn-outline py-3 px-6">Send Another</button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What is your brokerage fee?", a: "For buyers, we typically charge 1% of the property value or a flat fee agreed in advance. For sellers, it's 1–2% depending on the deal. Everything is discussed upfront — no surprises." },
              { q: "How quickly can I see a property?", a: "We typically arrange site visits within 24 hours of your enquiry during business days. Call us directly for same-day visits." },
              { q: "Do you help with home loans?", a: "Yes! We partner with SBI, HDFC, ICICI, Axis, and other leading banks. We help you compare rates and get pre-approval with minimal paperwork." },
              { q: "Are your listings RERA verified?", a: "All new project listings are verified under RERA Maharashtra. Resale properties are legally vetted by our documentation team before being listed." },
            ].map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl p-5 hover:border-brand/30 transition-colors">
                <h3 className="font-sans font-semibold text-navy-800 mb-2">{faq.q}</h3>
                <p className="text-navy-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
