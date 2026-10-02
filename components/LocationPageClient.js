"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronDown, Phone, MessageSquare, CheckCircle2, 
  MapPin, Train, Plane, Building2, Send, ArrowRight, ShieldCheck
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";

export default function LocationPageClient({ location, properties }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [formState, setFormState] = useState({ name: "", phone: "", requirement: "1 BHK" });
  const [formSent, setFormSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormSent(true);
    }, 800);
  };

  return (
    <div className="space-y-20 pb-20">
      {/* ═══════════════════ §1 HERO BANNER ═══════════════════ */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-navy-950 border-b border-gold/20">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-navy-900/60 via-navy-950 to-navy-950 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-navy-400 mb-6 font-medium">
            {location.breadcrumbs.map((crumb, idx) => (
              <span key={crumb.url} className="flex items-center gap-2">
                {idx > 0 && <span className="text-navy-600">/</span>}
                <Link href={crumb.url} className="hover:text-gold transition-colors">
                  {crumb.name}
                </Link>
              </span>
            ))}
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold-light rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              {location.heroBadge}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4 tracking-tight">
              {location.h1}
            </h1>

            <p className="text-gold text-base sm:text-lg lg:text-xl font-medium mb-6">
              {location.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="tel:+919870178204" 
                className="btn-gold py-3 px-6 text-xs sm:text-sm font-bold flex items-center gap-2"
              >
                <Phone size={16} /> Call Adv. Sachin Bhoir
              </a>
              <a 
                href={`https://wa.me/919870178204?text=Hi%2C%20I%27m%20interested%20in%20properties%20in%20${encodeURIComponent(location.name)}.`}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline py-3 px-6 text-xs sm:text-sm font-bold flex items-center gap-2"
              >
                <MessageSquare size={16} className="text-gold" /> WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ §2 OVERVIEW & MARKET INTELLIGENCE ═══════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">Locality Overview</span>
              <h2 className="font-serif text-2xl sm:text-4xl text-white mt-1 mb-6 leading-tight">
                Living &amp; Investing in {location.name}, Navi Mumbai
              </h2>
            </div>
            {location.overview.map((para, i) => (
              <p key={i} className="text-navy-200 text-sm sm:text-base leading-relaxed font-light">
                {para}
              </p>
            ))}

            {/* Key Sectors */}
            <div className="pt-6">
              <h3 className="font-serif text-xl text-white mb-4 flex items-center gap-2">
                <Building2 size={20} className="text-gold" /> Prominent Sectors &amp; Enclaves
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {location.keySectors.map((sec, idx) => (
                  <div key={idx} className="bg-navy-900/80 p-4 rounded-2xl border border-navy-800">
                    <h4 className="text-sm font-bold text-white mb-1">{sec.name}</h4>
                    <p className="text-xs text-navy-300 leading-relaxed">{sec.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 2026 Price Index & Capital Yields */}
          <div className="lg:col-span-5 bg-navy-900/90 p-6 sm:p-8 rounded-[2rem] border border-gold/30 shadow-2xl space-y-6">
            <div className="border-b border-navy-800 pb-4">
              <span className="text-gold text-[10px] font-bold uppercase tracking-widest">Market Intelligence</span>
              <h3 className="font-serif text-xl sm:text-2xl text-white mt-1">2026 Property Price Index</h3>
              <p className="text-xs text-navy-300 mt-1">Current market rates analyzed by Adv. Sachin Bhoir</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-2.5 border-b border-navy-800/80 text-xs sm:text-sm">
                <span className="text-navy-300">Average Rate / Sq.Ft.</span>
                <span className="font-bold text-gold-light font-mono">{location.priceTrends2026.avgRate}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-navy-800/80 text-xs sm:text-sm">
                <span className="text-navy-300">1 BHK Price Band</span>
                <span className="font-bold text-white">{location.priceTrends2026.oneBhk}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-navy-800/80 text-xs sm:text-sm">
                <span className="text-navy-300">2 BHK Price Band</span>
                <span className="font-bold text-white">{location.priceTrends2026.twoBhk}</span>
              </div>
              {location.priceTrends2026.threeBhk && (
                <div className="flex justify-between items-center py-2.5 border-b border-navy-800/80 text-xs sm:text-sm">
                  <span className="text-navy-300">3 BHK Luxury</span>
                  <span className="font-bold text-white">{location.priceTrends2026.threeBhk}</span>
                </div>
              )}
              <div className="pt-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-navy-400 block mb-1">Rental Yield &amp; Demand</span>
                <p className="text-xs text-navy-200 leading-relaxed bg-navy-950 p-3.5 rounded-xl border border-navy-800">
                  {location.priceTrends2026.rentalYield}
                </p>
              </div>
            </div>

            <div className="p-4 bg-emerald-950/60 rounded-xl border border-emerald-500/30 flex items-center gap-3">
              <ShieldCheck size={24} className="text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-tight">100% Legal Title Guarantee</p>
                <p className="text-[11px] text-emerald-300">Every property vetted by Adv. Sachin Bhoir</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ §3 CONNECTIVITY & INFRASTRUCTURE ═══════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900/60 p-8 sm:p-12 rounded-[2.5rem] border border-gold/20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">Infrastructure Advantage</span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white mt-1">
              Connectivity &amp; Transit Networks
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {location.connectivity.map((conn, idx) => (
              <div key={idx} className="bg-navy-950/80 p-6 rounded-2xl border border-navy-800">
                <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold mb-4">
                  {idx === 0 ? <Train size={20} /> : idx === 1 ? <Building2 size={20} /> : idx === 2 ? <Plane size={20} /> : <MapPin size={20} />}
                </div>
                <h4 className="text-sm font-bold text-white mb-2">{conn.mode}</h4>
                <p className="text-xs text-navy-300 leading-relaxed">{conn.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ §4 PROPERTIES IN THIS LOCALITY ═══════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">Verified Inventory</span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white mt-1 leading-tight">
              Properties Available in {location.name}
            </h2>
            <p className="text-navy-300 text-sm mt-2">
              Showing handpicked properties in {location.name} with verified MahaRERA &amp; CIDCO documentation.
            </p>
          </div>
          <Link href="/properties" className="btn-outline text-sm py-2.5 whitespace-nowrap shrink-0">
            Browse All Properties <ArrowRight size={14} />
          </Link>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((prop, idx) => (
              <PropertyCard key={prop.id || idx} property={prop} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center p-12 bg-navy-900/60 rounded-2xl border border-navy-800">
            <Building2 size={36} className="text-gold/60 mx-auto mb-3" />
            <h3 className="text-lg font-serif text-white mb-2">Off-Market Inventory Available in {location.name}</h3>
            <p className="text-sm text-navy-300 max-w-md mx-auto mb-6">
              We have private resale and builder listings in {location.name} that are confidential. Connect directly with Adv. Sachin Bhoir.
            </p>
            <a href="tel:+919870178204" className="btn-gold py-2.5 px-6 text-xs font-bold inline-flex items-center gap-2">
              <Phone size={14} /> Inquire Off-Market Deals
            </a>
          </div>
        )}
      </section>

      {/* ═══════════════════ §5 LOCALIZED FAQ SECTION ═══════════════════ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">Buyer Guidance</span>
          <h2 className="font-serif text-2xl sm:text-4xl text-white mt-1 mb-2">
            Frequently Asked Questions — {location.name}
          </h2>
          <p className="text-navy-300 text-xs sm:text-sm">
            Answers to common buyer questions regarding pricing, documentation, and handover in {location.name}.
          </p>
        </div>

        <div className="space-y-4">
          {location.faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl bg-navy-900/90 border border-gold/25 overflow-hidden transition-colors">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
              >
                <span className="font-serif text-sm sm:text-base text-white font-semibold">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-gold shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-navy-200 leading-relaxed border-t border-navy-800">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ §6 NEIGHBOR NODES (INTERNAL LINKING) ═══════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-navy-800 pt-16">
        <div className="text-center mb-8">
          <h3 className="font-serif text-xl sm:text-2xl text-white mb-2">
            Explore Neighboring Navi Mumbai Real Estate Nodes
          </h3>
          <p className="text-navy-400 text-xs">Compare real estate prices and investment prospects in adjacent localities.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {location.neighborNodes.map((n) => (
            <Link
              key={n.slug}
              href={`/${n.slug}`}
              className="bg-navy-900 hover:bg-gold/15 text-navy-200 hover:text-white px-5 py-2.5 rounded-full border border-navy-700 hover:border-gold/40 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>{n.name}</span>
              <ArrowRight size={12} className="text-gold" />
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════ §7 CONTACT & PRIORITY CONSULTATION ═══════════════════ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 p-8 sm:p-12 rounded-[2.5rem] border border-gold/40 shadow-2xl text-center">
          <span className="text-gold text-xs font-bold uppercase tracking-[0.2em] block mb-2">Speak With The Expert</span>
          <h2 className="font-serif text-2xl sm:text-4xl text-white mb-3">
            Looking for a Verified Home in {location.name}?
          </h2>
          <p className="text-navy-200 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Schedule a 1-on-1 consultation with Adv. Sachin Bhoir. Get handpicked verified options and 100% legal title vetting.
          </p>

          {formSent ? (
            <div className="p-6 bg-emerald-950/80 rounded-2xl border border-emerald-500/40 text-emerald-300 text-sm">
              ✓ Thank you! Adv. Sachin Bhoir will review your requirements for {location.name} and call you shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-navy-950/90 border border-navy-700 rounded-xl px-4 py-3 text-white text-xs sm:text-sm focus:border-gold focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="Mobile Phone Number"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  className="w-full bg-navy-950/90 border border-navy-700 rounded-xl px-4 py-3 text-white text-xs sm:text-sm focus:border-gold focus:outline-none"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="btn-gold w-full py-3.5 text-xs sm:text-sm font-bold justify-center flex items-center gap-2"
              >
                {loading ? "Sending..." : `Request ${location.name} Property Callback`}
                <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
