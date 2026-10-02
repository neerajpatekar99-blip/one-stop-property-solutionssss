"use client";

import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, BookOpen, Info, ChevronRight } from "lucide-react";
import Image from "next/image";

const ResourceCard = ({ icon: Icon, title, description, items, color, iconBg }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-navy-900/90 backdrop-blur-xl p-6 lg:p-8 rounded-[2rem] border border-navy-700/80 hover:border-gold/50 shadow-2xl h-full flex flex-col transition-all"
  >
    <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center mb-6`}>
      <Icon size={28} className={color} />
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-navy-300 text-sm leading-relaxed mb-6 font-light">{description}</p>
    <div className="space-y-3 mt-auto border-t border-navy-800 pt-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2 text-xs font-bold text-navy-200 uppercase tracking-tight">
          <ChevronRight size={14} className="text-gold" />
          {item}
        </div>
      ))}
    </div>
  </motion.div>
);

export default function EducationSection() {
  return (
    <section id="resources" className="py-20 lg:py-28 bg-navy-950 border-t border-gold/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2.5 text-gold font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <span className="w-8 h-px bg-gold/60" /> Buyer Intelligence <span className="w-8 h-px bg-gold/60" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
              Empowering Your <br /> Property Journey
            </h2>
          </div>
          <div className="hidden md:block relative h-14 w-48 opacity-40">
            <Image src="/logo.png" alt="OSPS" fill className="object-contain" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <ResourceCard 
            icon={ShieldCheck}
            iconBg="bg-gold/15 border border-gold/30"
            color="text-gold"
            title="What is MahaRERA?"
            description="MahaRERA ensures transparency and efficiency in the real estate sector. It protects your hard-earned investment from project delays and fraud."
            items={[
              "Safe Escrow Accounts",
              "Verified Legal Titles",
              "Timely Possession Guarantee",
              "Compulsory Developer Disclosure"
            ]}
          />

          <ResourceCard 
            icon={TrendingUp}
            iconBg="bg-blue-500/15 border border-blue-500/30"
            color="text-blue-400"
            title="Why Invest in Navi Mumbai?"
            description="With the Navi Mumbai International Airport and Atal Setu (MTHL), the Kamothe & Panvel belt is experiencing historic appreciation."
            items={[
              "International Airport Corridor",
              "Atal Setu (MTHL) Expressway",
              "Navi Mumbai Metro Connectivity",
              "CIDCO Planned Infrastructure"
            ]}
          />

          <ResourceCard 
            icon={BookOpen}
            iconBg="bg-emerald-500/15 border border-emerald-500/30"
            color="text-emerald-400"
            title="Essential Property Terms"
            description="Master the legal vocabulary before signing agreements. Understanding these terms saves you lakhs during your property purchase."
            items={[
              "Carpet vs Built-up Area",
              "Occupancy Certificate (OC)",
              "Ready Reckoner Rates 2026",
              "Society Conveyance Deed"
            ]}
          />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-16 bg-gradient-to-r from-navy-900 to-navy-800 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden border border-gold/30 shadow-2xl"
        >
          <div className="relative z-10 grid md:grid-cols-2 items-center gap-8">
            <div>
              <h4 className="text-2xl md:text-3xl font-serif mb-4 text-gold-light italic">Need personalized clarity?</h4>
              <p className="text-navy-300 text-sm md:text-base leading-relaxed font-light">
                Property laws and market rates change constantly. Schedule a 1-on-1 advisory session with Adv. Sachin Bhoir 
                to get honest legal insights on your selected society.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
              <a href="tel:+919870178204" className="btn-gold py-3.5 px-8 text-sm font-bold shadow-lg text-center">
                Consult Sachin Sir
              </a>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}