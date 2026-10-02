"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import Script from "next/script";

import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Star, Award, Users, Home, TrendingUp, Shield,
  Phone, CheckCircle2, Building2, MapPin, Search, IndianRupee,
  ChevronDown, Mail, Clock, Send, MessageSquare, Key, BarChart2,
  CreditCard, Filter, Target, ShieldCheck, Handshake, FileCheck,
  Heart, Globe, Sparkles, ChevronLeft, ChevronRight, Crown, Lock, HelpCircle
} from "lucide-react";
import { useTranslation } from "react-i18next";

import PropertyCard from "@/components/PropertyCard";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import NewProjects from "@/components/NewProjects";
import YouTubeSection from "@/components/YouTubeSection";
import EducationSection from "@/components/EducationSection";
import StampDutyCalculator from "@/components/StampDutyCalculator";

import { AnimeNumberCounter, AnimeAura } from "@/components/AnimeEffects";
import { onlyProperties, propertyTypes } from "@/data/properties";
import { services } from "@/data/services";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[420px] rounded-2xl bg-navy-900 animate-pulse flex items-center justify-center border border-navy-800">
      <MapPin size={32} className="text-gold/40" />
    </div>
  ),
});

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function SectionLabel({ text }) {
  return (
    <div className="inline-flex items-center gap-2.5 text-gold font-bold text-xs uppercase tracking-[0.2em] mb-4">
      <span className="w-8 h-px bg-gold/60" />{text}<span className="w-8 h-px bg-gold/60" />
    </div>
  );
}

const iconMap = { Home, TrendingUp, Key, BarChart2, CreditCard, Shield };
const svcColors = {
  orange: { icon: "bg-amber-500/20 text-gold", border: "border-gold/30", pill: "bg-gold/15 text-gold-light" },
  blue:   { icon: "bg-blue-500/20 text-blue-400", border: "border-blue-500/30", pill: "bg-blue-500/15 text-blue-300" },
  green:  { icon: "bg-emerald-500/20 text-emerald-400", border: "border-emerald-500/30", pill: "bg-emerald-500/15 text-emerald-300" },
  purple: { icon: "bg-purple-500/20 text-purple-400", border: "border-purple-500/30", pill: "bg-purple-500/15 text-purple-300"},
  red:    { icon: "bg-rose-500/20 text-rose-400", border: "border-rose-500/30", pill: "bg-rose-500/15 text-rose-300" },
  teal:   { icon: "bg-cyan-500/20 text-cyan-400", border: "border-cyan-500/30", pill: "bg-cyan-500/15 text-cyan-300" },
};

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
}

export default function HomePage() {
  const { t } = useTranslation();
  const [searchTab, setSearchTab] = useState("buy");
  const [searchLoc, setSearchLoc] = useState("");
  const [searchType, setSearchType] = useState("All Types");
  const [propCategory, setPropCategory] = useState("all");
  const [propType, setPropType] = useState("All Types");
  const [showAll, setShowAll] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", phone: "", email: "", interest: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [randomTitle, setRandomTitle] = useState("");
  const [randomQuote, setRandomQuote] = useState("");
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroList, setHeroList] = useState([]);
  const [openFaq, setOpenFaq] = useState(0);

  // Milestones
  const milestones = [
    { year: "2014", title: "The Foundation", desc: "Sachin Bhoir launched OSPS to eliminate hidden agendas in real estate.", icon: Target },
    { year: "2017", title: "150+ Deals", desc: "Became the most referred consultant for residential resale.", icon: TrendingUp },
    { year: "2019", title: "RERA Certified", desc: "Registered under MahaRERA (A51900019872) for 100% legal security.", icon: ShieldCheck },
    { year: "2024", title: "Decade Milestone", desc: "Celebrating 10 years with 500+ families served.", icon: Award },
  ];

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Zero Opaque Deals",
      desc: "Every document, from land title to water supply history, is disclosed before booking.",
      gradient: "from-amber-500 to-yellow-600"
    },
    {
      icon: MapPin,
      title: "Hyper-Local Expert",
      desc: "A Kamothe native who knows every developer's track record and building's age.",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: Handshake,
      title: "After-Sales Care",
      desc: "We assist with utility name transfers, rental management, and loan processing.",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: FileCheck,
      title: "Title Verification",
      desc: "We only list properties that pass our rigorous 50-point legal checklist.",
      gradient: "from-gold to-brand-dark"
    },
  ];

  const achievements = [
    { number: 500, suffix: "+", label: "Happy Families Served", icon: Heart },
    { prefix: "₹", number: 200, suffix: "Cr+", label: "Deals Negotiated", icon: TrendingUp },
    { number: 10, suffix: "+", label: "Years Experience", icon: Clock },
    { number: 4.9, suffix: "/5", decimals: 1, label: "Google Rating", icon: Star },
  ];

  const galleryImages = [
    { src: "01.webp", alt: "One Stop Property Solutions - On-site property viewing with clients and Sachin Bhoir" },
    { src: "02.webp", alt: "Happy clients receiving property handover from One Stop Property Solutions" },
    { src: "03.webp", alt: "Real estate consultation meeting - discussing property investment opportunities" },
    { src: "04.webp", alt: "Verified property listing - New residential flat in Kamothe, Navi Mumbai" },
    { src: "05.webp", alt: "Property documentation review - MahaRERA verified property papers" },
    { src: "06.webp", alt: "One Stop Property Solutions office in Kamothe - Real estate headquarters" },
  ];

  // Filter properties based on current selections
  const filtered = useMemo(() =>
    onlyProperties.filter((p) => {
      if (p.tags?.includes("project") || p.tags?.includes("plotted-development")) return false;
      if (propCategory !== "all" && p.category !== propCategory) return false;
      if (propType !== "All Types" && p.type !== propType) return false;
      return true;
    }),
    [propCategory, propType]
  );

  const visible = showAll ? filtered : filtered.slice(0, 3);

  useEffect(() => {
    const titles = [
      "Featured Property Spotlight",
      "Today's Top Pick",
      "Exclusive Showcase",
      "Prime Selection",
      "Market Highlight",
      "Curated Choice",
      "Premium Listing",
      "Best Deal Today",
    ];
    const quotes = [
      "Dream home awaits",
      "Your perfect match",
      "Prime investment opportunity",
      "Luxury living redefined",
      "Smart choice for tomorrow",
      "Exceptional value proposition",
      "Premium location advantage",
      "Ready for your lifestyle",
    ];

    setRandomTitle(titles[Math.floor(Math.random() * titles.length)]);
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);

    const propsOnly = onlyProperties.filter(p => !p.tags?.includes('project') && !p.tags?.includes('plotted-development'));
    const shuffled = [...propsOnly].sort(() => 0.5 - Math.random());
    setHeroList(shuffled.slice(0, 5));
  }, []);

  const nextHero = () => setHeroIndex((prev) => (prev + 1) % heroList.length);
  const prevHero = () => setHeroIndex((prev) => (prev - 1 + heroList.length) % heroList.length);

  const handleSearch = (e) => {
    e.preventDefault();
    setPropCategory(searchTab === "buy" ? "sale" : "rent");
    if (searchType !== "All Types") setPropType(searchType);
    scrollTo("properties");
  };

  const handleContact = (e) => {
    e.preventDefault();
    setContactLoading(true);
    setTimeout(() => { setContactLoading(false); setContactSent(true); }, 1200);
  };

  return (
    <div className="min-h-screen bg-navy-950 text-navy-100">

      {/* ═══════════════════ §1 HERO ═══════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-navy-950">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=80"
            alt="Luxury Architecture Navi Mumbai" 
            fill 
            className="object-cover opacity-25" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-navy-950 via-navy-950/95 to-navy-900/80" />
        </div>
        
        {/* Glow Spheres */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-gold/15 blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-navy-800/40 blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-28">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div className="flex flex-col items-start">
              <motion.div 
                initial={{ opacity: 0, y: 12 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold-light rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider mb-6 backdrop-blur-md shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                MahaRERA Certified Property Solutions
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 24 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.65, delay: 0.1 }}
                className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-4 tracking-tight"
              >
                Trusted Real Estate Consultant in Navi Mumbai
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-gold font-medium text-base sm:text-lg lg:text-xl mb-4 tracking-wide"
              >
                Residential &amp; Commercial Property | Buy • Sell • Rent • Invest
              </motion.p>

              <motion.p 
                initial={{ opacity: 0, y: 16 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-navy-200 text-sm sm:text-base leading-relaxed mb-8 max-w-xl font-light"
              >
                500+ verified properties with 100% legal title vetting by Adv. Sachin Bhoir (MahaRERA A51900019872). Dedicated real estate solutions across Kamothe, Kharghar, Panvel &amp; Navi Mumbai.
              </motion.p>

              {/* Search Box */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.55, delay: 0.3 }}
                className="w-full max-w-xl bg-navy-900/90 backdrop-blur-xl border border-gold/30 rounded-2xl p-3 sm:p-4 shadow-2xl"
              >
                <div className="flex items-center gap-2 mb-3 border-b border-navy-800 pb-3">
                  <button 
                    onClick={() => setSearchTab("buy")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      searchTab === "buy" ? "bg-gold text-navy-950 shadow-md" : "text-navy-300 hover:text-white"
                    }`}
                  >
                    Buy
                  </button>
                  <button 
                    onClick={() => setSearchTab("rent")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      searchTab === "rent" ? "bg-gold text-navy-950 shadow-md" : "text-navy-300 hover:text-white"
                    }`}
                  >
                    Rent
                  </button>
                </div>
                
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                  <select 
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="flex-1 bg-navy-950 border border-navy-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold"
                  >
                    <option value="All Types">All Configurations</option>
                    <option value="1 BHK">1 BHK Flat</option>
                    <option value="2 BHK">2 BHK Flat</option>
                    <option value="3 BHK">3 BHK Flat</option>
                    <option value="4 BHK">4 BHK Luxury</option>
                  </select>

                  <button 
                    type="submit"
                    className="btn-gold py-3 px-6 text-sm font-bold shadow-lg"
                  >
                    <Search size={16} /> Search
                  </button>
                </form>

                {/* Tempting VIP Prompt */}
                <div className="mt-3.5 pt-3 border-t border-navy-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    <span className="text-[11px] sm:text-xs text-navy-300">
                      Seeking off-market Kamothe deals?
                    </span>
                  </div>
                  <Link
                    href="/login?redirect=/#properties"
                    className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-gold hover:text-gold-light transition-colors group"
                  >
                    <Crown size={12} className="text-gold group-hover:scale-110 transition-transform" />
                    <span>Unlock 40+ VIP Unlisted Deals</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right: Featured Property Spotlight Slider */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.65, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative p-2 rounded-3xl bg-gradient-to-b from-gold/20 via-navy-800/40 to-navy-900 border border-gold/30 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between px-4 py-2 text-xs font-bold text-gold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Sparkles size={13} /> {randomTitle}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={prevHero} className="p-1 rounded-lg hover:bg-white/10 text-gold-light" aria-label="Previous property">
                      <ChevronLeft size={16} />
                    </button>
                    <button onClick={nextHero} className="p-1 rounded-lg hover:bg-white/10 text-gold-light" aria-label="Next property">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {heroList.length > 0 ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={heroList[heroIndex]?.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <PropertyCard property={heroList[heroIndex]} index={0} />
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <div className="h-[400px] bg-navy-900 rounded-2xl animate-pulse" />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ §2 ABOUT US / OUR STORY (Sachin Bhoir) ═══════════════════ */}
      {/* Transfered to Section 2 immediately after Hero as requested */}
      <section id="about" className="py-20 lg:py-28 bg-gradient-to-b from-navy-950 via-navy-900/70 to-navy-950 border-t border-gold/15 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
            
            {/* Left: Founder Profile Card */}
            <div className="lg:col-span-5">
              <FadeUp>
                <AnimeAura>
                  <div className="relative bg-navy-900/90 backdrop-blur-2xl p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-gold/30">
                    <div className="text-center mb-8">
                      <div className="mx-auto mb-6 h-36 w-36 overflow-hidden rounded-full border-4 border-gold/50 shadow-2xl relative">
                        <Image 
                          src="/gallery/sachin.jpeg" 
                          alt="Adv. Sachin Bhoir - Founder & Managing Director, One Stop Property Solutions" 
                          fill
                          className="object-cover" 
                          priority 
                          quality={85}
                        />
                      </div>
                      <div className="inline-flex items-center gap-2 bg-gold/15 text-gold border border-gold/30 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4">
                        <Heart size={12} className="text-gold" /> The Visionary
                      </div>
                      <h3 className="font-serif text-3xl sm:text-4xl text-white mb-1.5">Sachin Bhoir</h3>
                      <p className="text-gold-light/80 text-sm font-medium">Founder &amp; Managing Director</p>
                    </div>

                    {/* Stats Grid with AnimeJS Animated Counters */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
                      {achievements.map((stat, idx) => (
                        <div key={idx} className="text-center p-4 bg-navy-950/80 rounded-2xl border border-gold/20 hover:border-gold/50 transition-colors">
                          <div className="text-2xl sm:text-3xl font-serif font-bold text-gold-light">
                            <AnimeNumberCounter 
                              prefix={stat.prefix || ""} 
                              endValue={stat.number} 
                              suffix={stat.suffix || ""} 
                              decimals={stat.decimals || 0}
                            />
                          </div>
                          <div className="text-[10px] text-navy-300 uppercase tracking-widest font-bold mt-1">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Certifications */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 p-4 bg-emerald-950/60 rounded-2xl border border-emerald-500/30">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                          <Award className="text-emerald-400" size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white uppercase tracking-tight">MahaRERA Certified</p>
                          <p className="text-xs text-emerald-300 font-mono">Reg. No. A51900019872</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-navy-950/70 rounded-2xl border border-gold/25">
                        <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
                          <Globe className="text-gold" size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white uppercase tracking-tight">Local Market Authority</p>
                          <p className="text-xs text-navy-300">Kamothe, Khandeshwar &amp; Panvel Specialist</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimeAura>
              </FadeUp>
            </div>

            {/* Right: Narrative Detail */}
            <div className="lg:col-span-7">
              <FadeUp delay={0.1}>
                <SectionLabel text="About Adv. Sachin Bhoir" />
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-3 leading-tight">
                  About Adv. Sachin Bhoir
                </h2>
                <p className="text-gold text-lg sm:text-xl font-medium mb-6">
                  A Decade of <span className="italic underline decoration-gold/40 decoration-4 underline-offset-8">Unfiltered Truth</span> in Real Estate
                </p>
                <div className="space-y-6 text-navy-200 text-base sm:text-lg leading-relaxed mb-10 font-light">
                  <p>
                    In 2014, Sachin Bhoir founded One Stop Property Solutions with a rebellious idea: <strong className="text-white font-semibold">What if a real estate agent told the whole truth?</strong> Growing up in Kamothe, Sachin witnessed the area&apos;s transformation from CIDCO layouts to a premier residential hub and developed an unparalleled understanding of its legal and market dynamics.
                  </p>
                  <p>
                    Today, Sachin isn&apos;t just a broker—he&apos;s a trusted consultant who personally vets every single project, conducts trilingual sessions (Marathi, Hindi, English), and ensures families are protected from &quot;hidden agendas&quot; and inflated developer pricing.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-10">
                  {[
                    "10+ Years Local Market History",
                    "Fluent in Marathi, Hindi & English",
                    "Zero Hidden Charges Policy",
                    "Expert Legal Title Verification"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-navy-900/80 p-4 rounded-2xl border border-gold/20 hover:border-gold transition-colors">
                      <CheckCircle2 className="text-gold shrink-0" size={18} />
                      <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wide">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/about" className="btn-gold py-3.5 px-7">
                    Full Story <ArrowRight size={16} className="ml-2" />
                  </Link>
                  <a href="tel:+919870178204" className="btn-outline py-3.5 px-7">
                    <Phone size={16} className="mr-2 text-gold" /> Call Sachin Sir
                  </a>
                </div>
              </FadeUp>
            </div>
          </div>

          {/* Value Pillars */}
          <FadeUp className="text-center mb-14">
            <SectionLabel text="The OSPS Foundation" />
            <h2 className="text-3xl sm:text-4xl text-white font-serif">Why Choose One Stop Property Solution?</h2>
          </FadeUp>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {pillars.map((pillar, idx) => (
              <FadeUp key={idx} delay={idx * 0.1}>
                <div className="group relative h-full">
                  <div className="relative bg-navy-900/90 backdrop-blur-xl p-8 rounded-3xl border border-navy-700/80 hover:border-gold/50 shadow-xl transition-all h-full hover:-translate-y-1">
                    <div className={`w-14 h-14 bg-gradient-to-r ${pillar.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      <pillar.icon size={26} className="text-navy-950 font-bold" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-gold transition-colors">{pillar.title}</h4>
                    <p className="text-navy-300 text-sm leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Timeline */}
          <FadeUp className="text-center mb-14">
            <SectionLabel text="Evolution" />
            <h3 className="text-3xl sm:text-4xl text-white font-serif">A Legacy of Growth</h3>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((item, idx) => (
              <FadeUp key={idx} delay={idx * 0.1}>
                <div className="bg-navy-900/90 backdrop-blur-xl p-8 rounded-[2rem] border border-navy-700/80 shadow-xl h-full group hover:border-gold/50 transition-colors">
                  <div className="text-gold font-serif text-3xl font-bold mb-4">{item.year}</div>
                  <h4 className="font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-navy-300 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ §3 PROPERTIES ═══════════════════ */}
      <section id="properties" className="py-20 lg:py-28 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <SectionLabel text="Verified Listings" />
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
                {propCategory === "rent" ? "Properties for Rent in Navi Mumbai" : "Properties for Sale in Navi Mumbai"}
              </h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xs text-gold uppercase tracking-wider font-semibold">
                  1 BHK • 2 BHK • 3 BHK • Resale Flats • Luxury Homes
                </span>
              </div>
              <p className="section-sub mt-2 max-w-lg">Curated properties across Kamothe &amp; Navi Mumbai — every listing personally verified with 100% legal title clearance by Adv. Sachin Bhoir.</p>
            </div>
            <Link href="/properties" className="btn-outline text-sm py-2.5 whitespace-nowrap shrink-0">
              Full Listings <ArrowRight size={14} />
            </Link>
          </FadeUp>

          {/* Filter Bar */}
          <FadeUp delay={0.05} className="flex flex-wrap items-center gap-2 mb-8 p-3 sm:p-4 bg-navy-900/90 backdrop-blur-md rounded-2xl border border-navy-800 shadow-xl">
            <div className="flex items-center gap-1 mr-2 text-gold">
              <Filter size={14} />
              <span className="text-xs font-bold text-navy-300 uppercase tracking-wide">Filter:</span>
            </div>
            {[{ v: "all", l: "All" }, { v: "sale", l: "For Sale" }, { v: "rent", l: "For Rent" }].map((c) => (
              <button 
                key={c.v} 
                onClick={() => setPropCategory(c.v)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                  propCategory === c.v 
                    ? "bg-gold text-navy-950 border-gold shadow-md font-bold" 
                    : "bg-navy-950 border-navy-700 text-navy-200 hover:border-gold/40 hover:text-white"
                }`}
              >
                {c.l}
              </button>
            ))}
            <div className="w-px bg-navy-800 self-stretch mx-1 hidden sm:block" />
            {["All Types", "1 BHK", "2 BHK", "3 BHK", "4 BHK"].map((t) => (
              <button 
                key={t} 
                onClick={() => setPropType(t)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
                  propType === t 
                    ? "bg-navy-800 text-gold-light border-gold/40 shadow-sm" 
                    : "bg-navy-950 border-navy-700 text-navy-300 hover:border-navy-600 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
            {(propCategory !== "all" || propType !== "All Types") && (
              <button 
                onClick={() => { setPropCategory("all"); setPropType("All Types"); }}
                className="ml-auto text-xs text-gold hover:underline underline-offset-2"
              >
                Clear Filters
              </button>
            )}
          </FadeUp>

          {/* VIP Off-Market Property Vault Teaser */}
          <FadeUp delay={0.08} className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-800/90 to-navy-900 border border-gold/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shrink-0">
                <Crown size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gold-light mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Private Client Vault • 12 Unlisted Kamothe Deals
                </div>
                <p className="text-xs sm:text-sm text-navy-200">
                  Confidential resale 1 &amp; 2 BHK flats in Sectors 21, 22 &amp; near Khandeshwar station. Direct owner rates with zero brokerage.
                </p>
              </div>
            </div>
            <Link
              href="/login?redirect=/#properties"
              className="btn-gold py-2.5 px-4 text-xs font-bold whitespace-nowrap shrink-0 shadow-md flex items-center gap-1.5"
            >
              <Key size={13} /> Sign In to Unlock VIP Deals
            </Link>
          </FadeUp>

          {/* Property Grid */}
          <FadeUp delay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visible.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </FadeUp>

          {filtered.length > 3 && (
            <FadeUp delay={0.15} className="text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="btn-outline text-sm py-2.5 px-8"
              >
                {showAll ? "Show Less" : `Show All ${filtered.length} Properties`}
              </button>
            </FadeUp>
          )}
        </div>
      </section>

      {/* ═══════════════════ §4 NEW PROJECTS & RESALE ═══════════════════ */}
      <section id="new-projects" className="py-20 lg:py-28 bg-gradient-to-b from-navy-950 via-navy-900/60 to-navy-950 border-y border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <SectionLabel text="Developer & Resale Inventory" />
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight">New Projects &amp; Resale Properties</h2>
              <p className="section-sub mt-2 max-w-lg">Handpicked direct builder launches and certified resale flats across Kamothe, Kharghar, Panvel &amp; Navi Mumbai.</p>
            </div>
            <Link href="/properties?tag=project" className="btn-outline text-sm py-2.5 whitespace-nowrap shrink-0">
              View all projects <ArrowRight size={14} />
            </Link>
          </FadeUp>
          <NewProjects />
        </div>
      </section>

      {/* ═══════════════════ §4.5 COMMERCIAL PROPERTIES & LAND/PLOTS ═══════════════════ */}
      <section id="commercial-land" className="py-20 lg:py-28 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Commercial Properties */}
            <FadeUp className="bg-navy-900/80 p-8 sm:p-10 rounded-[2.5rem] border border-gold/25 shadow-xl flex flex-col justify-between">
              <div>
                <SectionLabel text="Business Spaces &amp; Retail" />
                <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight mb-4">Commercial Properties</h2>
                <p className="text-navy-300 text-sm sm:text-base leading-relaxed mb-6">
                  High-visibility retail shops, corporate offices, clinics, and investment showrooms in prime commercial hubs across Kamothe, Kharghar, and Panvel.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Main road retail shops with heavy footfall in Kamothe & Kharghar",
                    "Ready & under-construction corporate office spaces",
                    "Doctor clinics & diagnostic center spaces near hospitals",
                    "Attractive 7%–9% annual commercial rental yields"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-navy-200">
                      <CheckCircle2 className="text-gold shrink-0" size={16} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/contact?type=commercial" className="btn-gold py-3 px-6 text-xs sm:text-sm font-bold justify-center">
                Enquire Commercial Spaces <ArrowRight size={14} className="ml-2" />
              </Link>
            </FadeUp>

            {/* Land & Plots */}
            <FadeUp delay={0.1} className="bg-navy-900/80 p-8 sm:p-10 rounded-[2.5rem] border border-gold/25 shadow-xl flex flex-col justify-between">
              <div>
                <SectionLabel text="Plotted Investments &amp; Estates" />
                <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight mb-4">Land &amp; Plots</h2>
                <p className="text-navy-300 text-sm sm:text-base leading-relaxed mb-6">
                  Clear-title NA residential plots, riverfront estates, and agricultural investment land across the Panvel-Karjat growth corridor and near NMIA Airport.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Gated riverfront plots at Venice of Mumbai 3, Karjat",
                    "Collector & CIDCO sanctioned NA residential land parcels",
                    "Individual 7/12 land title deed verification by Adv. Sachin Bhoir",
                    "Gated villa communities with water, electricity & road connectivity"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-navy-200">
                      <CheckCircle2 className="text-gold shrink-0" size={16} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/plotted-developments" className="btn-outline py-3 px-6 text-xs sm:text-sm font-bold justify-center">
                Explore Plotted Developments <ArrowRight size={14} className="ml-2" />
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════ §5 GALLERY ═══════════════════ */}
      <section id="gallery" className="py-20 lg:py-28 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <SectionLabel text="Visual Gallery" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight">Moments from Our Property Journeys</h2>
            <p className="section-sub mt-4 max-w-2xl mx-auto">
              A glimpse of our on-site client viewings, handovers, and the verified spaces we help families discover in Kamothe.
            </p>
          </FadeUp>
          <FadeUp delay={0.1} className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {galleryImages.map((image, idx) => (
              <article 
                key={image.src} 
                className="overflow-hidden rounded-3xl border border-gold/20 bg-navy-900/90 shadow-xl group"
              >
                <div className="relative overflow-hidden h-56 sm:h-64 w-full bg-navy-950">
                  <Image 
                    src={`/gallery/${image.src}`} 
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    loading={idx === 0 ? "eager" : "lazy"}
                    quality={80}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </article>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════ §6 SERVICES ═══════════════════ */}
      <section id="services" className="py-20 lg:py-28 bg-gradient-to-b from-navy-950 via-navy-900/50 to-navy-950 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <SectionLabel text="Our Expertise" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight">Property Services</h2>
            <p className="section-sub mt-4 max-w-2xl mx-auto">
              End-to-end property solutions from residential advisory and resale negotiations to legal title deed vetting.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Home;
              const colors = svcColors[service.color] || svcColors.orange;

              return (
                <FadeUp key={service.id} delay={index * 0.1} className="group">
                  <div className={`card p-6 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border ${colors.border}`}>
                    <div className={`w-12 h-12 rounded-xl ${colors.icon} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={24} />
                    </div>
                    <h3 className="font-semibold text-lg text-white mb-3 group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-navy-300 leading-relaxed mb-4 text-sm">
                      {service.description}
                    </p>
                    <div className={`inline-flex items-center gap-2 ${colors.pill} px-3 py-1 rounded-full text-xs font-semibold`}>
                      <span>{service.features?.length || 0} Key Features</span>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════ §7 YOUTUBE ═══════════════════ */}
      <section id="youtube" className="py-20 lg:py-28 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <SectionLabel text="Visual Tours" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              From Our YouTube Channel
            </h2>
            <p className="section-sub mt-4 max-w-2xl mx-auto">
              Step inside the most exclusive properties in Kamothe through immersive video walkthroughs and legal insights by Sachin sir.
            </p>
          </FadeUp>
          <YouTubeSection />
        </div>
      </section>

      {/* ═══════════════════ §8 EDUCATION ═══════════════════ */}
      <EducationSection />

      {/* ═══════════════════ §9 INSTAGRAM ═══════════════════ */}
      <section id="instagram" className="py-20 lg:py-28 bg-navy-950 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <SectionLabel text="Community & Updates" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              Join Our Community
            </h2>
            <p className="section-sub mt-4 max-w-2xl mx-auto">
              Stay updated with our latest property walkthroughs, market alerts, and real-time community stories.
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="elfsight-app-c0de3d75-270d-42e8-8b7d-534acf719027 min-h-[400px]" data-elfsight-app-lazy></div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════ §10 OFFICE SHOWCASE ═══════════════════ */}
      <section id="office" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-navy-950 via-navy-900/60 to-navy-950 border-y border-gold/15 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeUp>
              <SectionLabel text="Our Presence" />
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-6 sm:mb-8">
                Visit Our Professional <br />
                <span className="text-gold italic font-normal">Consultation Space</span>
              </h2>
              <div className="bg-navy-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-gold/30 shadow-2xl mb-8">
                <div className="flex gap-4 mb-5 sm:mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
                    <Building2 className="text-gold" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">ONE STOP PROPERTY SOLUTIONS</h3>
                    <p className="text-gold text-[10px] font-black uppercase tracking-[0.2em]">Corporate Office</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <MapPin className="text-gold mt-1 shrink-0" size={18} />
                    <p className="text-navy-200 leading-relaxed font-medium text-sm sm:text-base">
                      Shop No. 3, Tulsi Corner, Plot No. 87 88,<br />
                      Sector 21, Kamothe, Navi Mumbai – 410209<br />
                      <span className="text-xs text-gold/80">Landmark: Near Jeevan Jyot Hospital</span>
                    </p>
                  </div>
                </div>
              </div>
              <button onClick={() => scrollTo("location")} className="btn-gold w-full sm:w-auto justify-center py-3.5 px-8">
                View on Map <ArrowRight size={16} className="ml-2" />
              </button>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gold/15 rounded-[3rem] blur-2xl group-hover:bg-gold/25 transition-colors" />
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-gold/30">
                  <Image
                    src="/gallery/office.webp"
                    alt="One Stop Property Solutions Office Interior"
                    width={800}
                    height={600}
                    className="w-full h-[320px] sm:h-[420px] md:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════ §10.5 2026 KAMOTHE PROPERTY RATES & AEO FAQ ═══════════════════ */}
      <section id="kamothe-rates" className="py-20 lg:py-28 bg-navy-900/60 border-t border-b border-gold/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center max-w-3xl mx-auto mb-14">
            <SectionLabel text="Market Intelligence &amp; 2026 Price Index" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              Property Consultant in Kamothe, Kharghar &amp; Panvel
            </h2>
            <p className="text-navy-300 text-sm sm:text-base mt-3 leading-relaxed">
              Navi Mumbai &amp; Kamothe Property Rates 2026 &amp; Real Estate Guide analyzed by Adv. Sachin Bhoir. Rated the #1 Real Estate Consultant with 255+ verified 4.9★ Google reviews.
            </p>
          </FadeUp>

          {/* 4 Rate Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                bhk: "1 BHK Flat",
                price: "₹42 L – ₹68 L",
                carpet: "380 – 465 sq.ft.",
                rate: "₹9,200 – ₹12,800/sq.ft.",
                popular: "Kamothe, Khandeshwar, Panvel",
                highlight: "Best for First-Time Buyers"
              },
              {
                bhk: "2 BHK Flat",
                price: "₹70 L – ₹1.25 Cr",
                carpet: "580 – 750 sq.ft.",
                rate: "₹10,500 – ₹14,200/sq.ft.",
                popular: "Kamothe, Kharghar, Ulwe",
                highlight: "Highest Rental Demand"
              },
              {
                bhk: "3 BHK Luxury",
                price: "₹1.35 Cr – ₹2.10 Cr",
                carpet: "900 – 1,300 sq.ft.",
                rate: "₹12,000 – ₹15,000/sq.ft.",
                popular: "Kharghar, Seawoods, Vashi",
                highlight: "Spacious Gated Townships"
              },
              {
                bhk: "Avg Index 2026",
                price: "₹9,200 – ₹14,500",
                carpet: "Per Sq.Ft. Rate",
                rate: "+8.4% Annual Appreciation",
                popular: "10-15 Min from NMIA Airport",
                highlight: "MahaRERA Approved Nodes"
              }
            ].map((item, idx) => (
              <FadeUp key={idx} delay={idx * 0.05} className="p-6 rounded-3xl bg-navy-950/90 border border-gold/30 shadow-xl hover:border-gold transition-all group">
                <div className="text-[11px] font-bold text-gold uppercase tracking-wider mb-2">
                  {item.highlight}
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-1">{item.bhk}</h3>
                <div className="font-serif text-2xl font-bold text-gold-light my-2">{item.price}</div>
                <div className="space-y-1 pt-3 border-t border-navy-800 text-xs text-navy-300">
                  <p><span className="text-navy-400">Carpet Area:</span> {item.carpet}</p>
                  <p><span className="text-navy-400">Rate Range:</span> {item.rate}</p>
                  <p><span className="text-navy-400">Key Nodes:</span> <span className="text-white font-medium">{item.popular}</span></p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Interactive Link Magnet: Stamp Duty & Ready Reckoner Calculator */}
          <FadeUp delay={0.08}>
            <StampDutyCalculator />
          </FadeUp>

          {/* Tempting VIP Access Banner */}
          <FadeUp delay={0.1} className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border border-gold/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold shrink-0">
                <Crown size={28} />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gold-light mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Exclusive Member Privileges
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-bold">
                  Unlock 40+ Off-Market Kamothe Listings &amp; Distress Sales
                </h3>
                <p className="text-xs sm:text-sm text-navy-300 mt-1 max-w-2xl">
                  Access confidential seller agreements, direct builder rates, and 50-point RERA legal title dossiers reserved exclusively for VIP patrons.
                </p>
              </div>
            </div>
            <Link
              href="/login?redirect=/#kamothe-rates"
              className="btn-gold py-3 px-6 text-xs font-bold whitespace-nowrap shrink-0 shadow-xl flex items-center gap-2"
            >
              <Sparkles size={14} /> Sign In for VIP Access
            </Link>
          </FadeUp>

          {/* AEO Search FAQ Knowledge Base */}
          <FadeUp delay={0.15} className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gold mb-2">
                <HelpCircle size={14} />
                Frequently Asked Real Estate Questions
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white leading-tight mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-navy-300 text-sm sm:text-base max-w-xl mx-auto">
                Everything you need to know before buying, selling, or renting property in Kamothe, Kharghar, Panvel and Navi Mumbai.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Is One Stop Property Solution RERA registered?",
                  a: "Yes, One Stop Property Solution is fully MahaRERA certified under Registration Number A51900019872. All property deals adhere strictly to statutory disclosures, legal title vetting, and government compliance under the leadership of Adv. Sachin Bhoir."
                },
                {
                  q: "Which areas do you cover?",
                  a: "We specialize across prime Navi Mumbai growth corridors including Kamothe, Khandeshwar, Kharghar, Panvel, Pushpak Nagar (NMIA Airport Zone), Karanjade, Kalamboli, Taloja, Ulwe, Nerul, and Vashi."
                },
                {
                  q: "Do you deal in resale flats?",
                  a: "Yes, we have an extensive portfolio of verified resale 1 BHK, 2 BHK, and 3 BHK flats across Kamothe and Navi Mumbai with Occupancy Certificate (OC), clear CIDCO transfer papers, and pre-screened bank loan approvals."
                },
                {
                  q: "Do you help with property rentals?",
                  a: "Yes, we provide end-to-end residential and commercial rental solutions, including tenant background verification, registered rent agreement execution, and inventory matching."
                },
                {
                  q: "Do you deal in commercial properties?",
                  a: "Yes, we facilitate buying, leasing, and investments in prime retail shops, office spaces, doctor clinics, and commercial showrooms across Kamothe, Kharghar, and Panvel."
                },
                {
                  q: "Can you help with property documentation?",
                  a: "As a consultancy led by practicing advocate Sachin Bhoir, we specialize in 50-point legal title verification, 30-year search reports, CIDCO transfer documentation, society NOC processing, stamp duty computation, and sale deed registration."
                },
                {
                  q: "Which areas near Navi Mumbai International Airport do you cover?",
                  a: "We cover all high-appreciation nodes around NMIA, including Pushpak Nagar, Ulwe, Karanjade, Khandeshwar, Kamothe, and New Panvel, offering strategic residential and commercial investment opportunities."
                }
              ].map((faq, i) => (
                <div key={i} className="rounded-2xl bg-navy-950/90 border border-gold/30 overflow-hidden transition-colors">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                  >
                    <span className="font-serif text-base sm:text-lg text-white font-semibold">{faq.q}</span>
                    <ChevronDown
                      size={18}
                      className={`text-gold shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-navy-200 leading-relaxed border-t border-navy-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════ §11 CONTACT ═══════════════════ */}
      <section id="contact" className="relative py-20 lg:py-32 bg-navy-950 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5">
              <FadeUp>
                <SectionLabel text="Get In Touch" />
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight">
                  Contact One Stop Property Solution
                </h2>
                <p className="text-gold font-medium text-base sm:text-lg mb-4">
                  Schedule a Priority Consultation with Adv. Sachin Bhoir
                </p>
                <p className="text-navy-300 text-sm sm:text-base mb-10 max-w-md font-light">
                  Skip the endless searching. Receive handpicked, legally verified residential and commercial property matches across Kamothe &amp; Navi Mumbai.
                </p>

                <div className="space-y-4 sm:space-y-5">
                  {[
                    { 
                      icon: MapPin, 
                      title: "Visit Our Office", 
                      content: "Shop No. 3, Tulsi Corner, Sector 21, Kamothe, Navi Mumbai - 410209",
                      sub: "Near Jeevan Jyot Hospital" 
                    },
                    { 
                      icon: Phone, 
                      title: "Direct Consultation", 
                      content: "+91 98701 78204", 
                      href: "tel:+919870178204" 
                    },
                    { 
                      icon: Clock, 
                      title: "Consultation Hours", 
                      content: "Mon - Sun: 10:00 AM - 10:00 PM",
                      sub: "Prior appointment recommended" 
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 sm:p-5 bg-navy-900/90 rounded-2xl border border-navy-800 shadow-xl hover:border-gold/40 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
                        <item.icon className="text-gold" size={20} />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-gold uppercase tracking-widest mb-1">{item.title}</h4>
                        {item.href ? (
                          <a href={item.href} className="text-white font-bold hover:text-gold transition-colors text-sm sm:text-base">{item.content}</a>
                        ) : (
                          <p className="text-white font-bold text-sm sm:text-base">{item.content}</p>
                        )}
                        {item.sub && <p className="text-navy-300 text-xs mt-0.5">{item.sub}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right: Form Card */}
            <div className="lg:col-span-7">
              <FadeUp delay={0.1}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gold/10 blur-3xl rounded-[3rem] -z-10 translate-y-10 scale-95" />
                  <div className="bg-navy-900/95 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-gold/30">
                    <h3 className="text-2xl font-serif text-white mb-2">Book a Priority Consultation</h3>
                    <p className="text-navy-300 text-sm mb-8">Sachin sir will review your requirements and call you back directly.</p>
                    
                    <form onSubmit={handleContact} className="space-y-4 sm:space-y-5">
                      <input type="hidden" name="form-name" value="contact" />
                      <input type="hidden" name="bot-field" />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gold ml-1">Your Full Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="input-field"
                            placeholder="e.g. Rajesh Sharma"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-gold ml-1">Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={contactForm.phone}
                            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                            className="input-field"
                            placeholder="+91 98701 78204"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gold ml-1">Property Requirement</label>
                        <select
                          name="interest"
                          value={contactForm.interest}
                          onChange={(e) => setContactForm({ ...contactForm, interest: e.target.value })}
                          className="input-field appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-navy-950">Select your requirement...</option>
                          <option value="buy" className="bg-navy-950">Buy Residential Flat in Kamothe</option>
                          <option value="rent" className="bg-navy-950">Rent Flat / Apartment</option>
                          <option value="sell" className="bg-navy-950">Sell My Property with OSPS</option>
                          <option value="invest" className="bg-navy-950">Commercial / Land Investment</option>
                          <option value="legal" className="bg-navy-950">Legal Verification Consultation</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gold ml-1">Message / Specific Preferences</label>
                        <textarea
                          rows={3}
                          name="message"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="input-field resize-none"
                          placeholder="Preferred sector, budget range, BHK type, timeline..."
                        />
                      </div>

                      <button 
                        type="submit" 
                        disabled={contactLoading}
                        className="w-full btn-gold py-4 rounded-xl text-sm font-bold shadow-xl flex items-center justify-center gap-2"
                      >
                        {contactLoading ? (
                          <div className="w-5 h-5 border-2 border-navy-950/40 border-t-navy-950 rounded-full animate-spin" />
                        ) : (
                          <><Send size={18} /> Request Callback from Sachin Sir</>
                        )}
                      </button>

                      {contactSent && (
                        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-emerald-400 font-bold text-sm bg-emerald-950/60 py-3 rounded-xl border border-emerald-500/40">
                          ✅ Thank you! Sachin sir will connect with you within 1 hour.
                        </motion.p>
                      )}
                    </form>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ §12 REVIEWS ═══════════════════ */}
      <section id="reviews" className="py-20 lg:py-28 bg-gradient-to-b from-navy-950 via-navy-900/40 to-navy-950 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <SectionLabel text="Patron Reviews" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight">What Our Clients Say</h2>
            <p className="section-sub mt-4 max-w-2xl mx-auto">
              Rated 4.9★ across 255+ verified reviews. Read first-hand experiences from families we have helped settle in Kamothe.
            </p>
          </FadeUp>
          <GoogleReviewsSection />
        </div>
      </section>

      {/* ═══════════════════ §13 LOCATION ═══════════════════ */}
      <section id="location" className="py-20 lg:py-28 bg-navy-950 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-16">
            <SectionLabel text="Visit Our Office" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              Find Us in Kamothe
            </h2>
            <p className="section-sub mt-4 max-w-2xl mx-auto">
              Located at the heart of Sector 21, Kamothe, Navi Mumbai. Use the map below to get instant directions.
            </p>
          </FadeUp>
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-gold/30">
            <MapView centerAddress="One Stop Property Solutions, Shop No. 3, Tulsi Corner, Plot No. 87 88, Sector 21, Kamothe, Navi Mumbai – 410209" />
          </div>
        </div>
      </section>


      <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />

      {/* Hidden static form for Netlify build-time detection */}
      <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="bot-field" />
        <input type="text" name="name" />
        <input type="tel" name="phone" />
        <select name="interest">
          <option value="buy">Buy Property</option>
          <option value="rent">Rent Property</option>
          <option value="sell">Sell Property</option>
          <option value="invest">Investment</option>
        </select>
        <textarea name="message"></textarea>
      </form>
    </div>
  );
}
