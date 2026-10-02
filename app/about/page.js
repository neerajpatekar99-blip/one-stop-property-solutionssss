import Image from "next/image";
import Script from "next/script";
import {
  Award,
  Users,
  Star,
  CheckCircle2,
  Phone,
  TrendingUp,
  ShieldCheck,
  MapPin,
  Handshake,
  Building2,
  FileCheck,
  Heart,
  Target,
  Globe,
  Clock
} from "lucide-react";
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo-schemas";

export const revalidate = 0; // Forces dynamic rendering and prevents caching issues

export const metadata = {
  title: "About Adv. Sachin Bhoir | One Stop Property Solutions - 10 Years of Trust & 500+ Deals",
  description: "Discover Sachin Bhoir's decade-long legacy in Navi Mumbai real estate. 500+ families served with absolute transparency, legal expertise, and local knowledge in Kamothe & Panvel. MahaRERA certified agent.",
  keywords: "Sachin Bhoir, One Stop Property Solutions, Kamothe real estate, Navi Mumbai property consultant, MahaRERA certified, real estate agent, property dealer",
  robots: { index: true, follow: true },
  openGraph: {
    title: "About Sachin Bhoir | One Stop Property Solutions",
    description: "Discover Sachin Bhoir's decade-long legacy in Navi Mumbai real estate with 500+ families served.",
    type: "website",
    url: "https://onestoppropertysolution.in/about",
    images: [
      {
        url: "/gallery/sachin.jpeg",
        width: 400,
        height: 400,
        alt: "Sachin Bhoir - Founder, One Stop Property Solutions",
      },
    ],
  },
  alternates: {
    canonical: "https://onestoppropertysolution.in/about",
  },
};

export default function AboutPage() {
  const milestones = [
    {
      year: "2014",
      title: "The Foundation",
      desc: "Sachin Bhoir launched OSPS with a mission to eliminate 'hidden agendas' in Kamothe real estate.",
      icon: Target
    },
    {
      year: "2017",
      title: "150+ Deals",
      desc: "Became the most referred local consultant for residential resale transactions.",
      icon: TrendingUp
    },
    {
      year: "2019",
      title: "RERA Certified",
      desc: "Registered under MahaRERA (A51900019872) to provide 100% legal security to clients.",
      icon: ShieldCheck
    },
    {
      year: "2022",
      title: "Township Expansion",
      desc: "Expanded expertise to premium township projects across Panvel and Kharghar.",
      icon: Building2
    },
    {
      year: "2024",
      title: "Decade Milestone",
      desc: "Celebrating 10 years with 500+ successful closures and ₹200Cr+ transacted value.",
      icon: Award
    },
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
    { number: "500+", label: "Happy Families", icon: Users },
    { number: "₹200Cr+", label: "Deals Done", icon: TrendingUp },
    { number: "10+", label: "Years Experience", icon: Clock },
    { number: "4.9/5", label: "Client Rating", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-navy-100">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-navy-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/15 via-navy-950 to-navy-950" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-gold/10 backdrop-blur-sm border border-gold/30 text-gold-light rounded-full px-6 py-2.5 mb-8 shadow-sm">
              <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">MahaRERA Certified • Est. 2014</span>
              <Award size={16} className="text-gold" />
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight">
              A Decade of <span className="text-gold italic font-normal">Unwavering Trust</span>
            </h1>

            <p className="text-navy-200 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 font-light">
              Sachin Bhoir&apos;s One Stop Property Solutions isn&apos;t just a business—it&apos;s a personal pledge.
              A commitment to transparency, legal integrity, and putting families first in Navi Mumbai&apos;s real estate landscape.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+919870178204" className="btn-gold py-4 px-8 text-base font-bold shadow-xl">
                <Phone size={20} />
                Connect with Sachin Sir
              </a>
            </div>

            <div className="mt-16 flex justify-center">
              <div className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-gold/30 shadow-2xl">
                <Image 
                  src="/gallery/sachin.jpeg" 
                  alt="Sachin Bhoir - Founder and Real Estate Expert, One Stop Property Solutions" 
                  width={1100} 
                  height={650} 
                  className="h-[340px] w-full object-cover sm:h-[420px]" 
                  priority 
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white text-left">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold font-bold mb-1">Founder Profile</p>
                  <h2 className="text-3xl font-serif font-semibold">Meet Sachin Bhoir</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story Section */}
      <section className="py-24 bg-gradient-to-b from-navy-950 via-navy-900/60 to-navy-950 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-16 items-center">

            {/* Left: Founder Profile Card */}
            <div className="lg:col-span-5">
              <div className="relative bg-navy-900/90 backdrop-blur-xl p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-gold/30">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-gold/15 text-gold border border-gold/30 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4">
                    <Heart size={12} />
                    The Visionary
                  </div>
                  <h3 className="font-serif text-4xl text-white mb-2">Sachin Bhoir</h3>
                  <p className="text-gold-light/80 font-medium text-sm">Founder &amp; Managing Director</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {achievements.map((stat, idx) => (
                    <div key={idx} className="text-center p-4 bg-navy-950/80 rounded-2xl border border-gold/20 hover:border-gold transition-colors">
                      <stat.icon className="w-5 h-5 text-gold mx-auto mb-2" />
                      <div className="text-2xl font-serif font-bold text-white">{stat.number}</div>
                      <div className="text-[10px] text-navy-300 uppercase tracking-wider font-bold mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-4 bg-emerald-950/60 rounded-2xl border border-emerald-500/30">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                      <Award className="text-emerald-400" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">MahaRERA Certified</p>
                      <p className="text-xs text-emerald-300 font-mono">Reg. No. A51900019872</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-navy-950/70 rounded-2xl border border-gold/25">
                    <div className="w-10 h-10 bg-gold/15 rounded-xl flex items-center justify-center">
                      <Globe className="text-gold" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">Local Market Authority</p>
                      <p className="text-xs text-navy-300">Kamothe &amp; Panvel Specialist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Story Content */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h4 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
                  From Kamothe Streets to <span className="text-gold italic font-normal">Navi Mumbai&apos;s Most Trusted Name</span>
                </h4>

                <div className="space-y-6 text-navy-200 text-base sm:text-lg leading-relaxed font-light">
                  <p>
                    Sachin Bhoir&apos;s journey began not in corporate boardrooms, but on the bustling streets of Kamothe.
                    Growing up in the neighborhood he now serves, Sachin witnessed firsthand the transformation of this
                    vibrant community and developed an unparalleled understanding of its real estate dynamics.
                  </p>

                  <p>
                    In 2014, frustrated by the opacity and hidden agendas prevalent in the industry, Sachin founded
                    One Stop Property Solutions with a radical approach: <strong className="text-white font-semibold">complete transparency</strong>.
                    Every deal, every document, every conversation conducted with absolute clarity in Marathi, Hindi, and English.
                  </p>

                  <p>
                    Today, Sachin isn&apos;t just a broker—he&apos;s a consultant, mentor, and guardian. His expertise spans
                    legal title verification, market analysis, investment strategies, and post-sale support.
                  </p>
                </div>
              </div>

              {/* Key Expertise Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Specialized in Resale & New Projects",
                  "Fluent in Marathi, Hindi & English",
                  "10+ Years Local Market Knowledge",
                  "Zero Hidden Charges Policy",
                  "255+ Verified Client Reviews",
                  "Expert Legal Documentation Support"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-navy-900/80 p-4 rounded-2xl border border-gold/20 hover:border-gold transition-colors">
                    <CheckCircle2 className="text-gold shrink-0" size={18} />
                    <span className="font-semibold text-white text-sm">{item}</span>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="bg-gradient-to-r from-navy-900 to-navy-800 p-8 rounded-3xl text-white border border-gold/30 relative overflow-hidden shadow-2xl">
                <p className="text-lg italic leading-relaxed mb-4 text-gold-light">
                  &quot;I grew up in this city. Every family I help becomes my extended family. My mission is simple:
                  be the advisor I wish my own parents had when they were searching for their first home.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-gold/30" />
                  <span className="text-gold font-bold uppercase text-xs tracking-widest">Adv. Sachin Bhoir</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-navy-950 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 border border-gold/30">
              <Clock size={12} />
              Our Journey
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-serif mb-4">A Decade of Growth &amp; Trust</h2>
            <p className="text-navy-300 text-base sm:text-lg max-w-2xl mx-auto font-light">
              From humble beginnings to becoming Kamothe&apos;s highest-rated property advisory firm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {milestones.map((item, idx) => (
              <div key={idx} className="bg-navy-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-navy-700/80 shadow-xl group hover:border-gold/50 transition-colors">
                <div className="text-gold font-serif text-3xl font-bold mb-3">{item.year}</div>
                <h4 className="font-bold text-white text-lg mb-2">{item.title}</h4>
                <p className="text-navy-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="py-24 bg-gradient-to-b from-navy-950 via-navy-900/50 to-navy-950 border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gold/10 text-gold rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 border border-gold/30">
              <Target size={12} />
              Our Foundation
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white font-serif mb-4">What Sets OSPS Apart</h2>
            <p className="text-navy-300 text-base sm:text-lg max-w-2xl mx-auto font-light">
              Four pillars that define our commitment to client satisfaction and legal protection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="bg-navy-900/90 backdrop-blur-xl p-8 rounded-3xl border border-navy-700/80 shadow-xl group hover:border-gold/50 transition-all hover:-translate-y-1">
                <div className={`w-14 h-14 bg-gradient-to-r ${pillar.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <pillar.icon size={26} className="text-navy-950 font-bold" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">{pillar.title}</h4>
                <p className="text-navy-300 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 border-t border-gold/20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 leading-tight">
            Ready to Experience <span className="text-gold italic font-normal">Trust in Action?</span>
          </h2>
          <p className="text-navy-200 text-lg sm:text-xl mb-10 leading-relaxed font-light">
            Join 500+ families who found their perfect home with Sachin Bhoir&apos;s guidance.
            Your dream property is just one conversation away.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919870178204" className="btn-gold py-4 px-8 text-base font-bold shadow-xl">
              <Phone size={20} /> Call Sachin Sir Now
            </a>
            <a href="/properties" className="btn-outline py-4 px-8 text-base">
              <Building2 size={20} className="text-gold" /> Explore Properties
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
