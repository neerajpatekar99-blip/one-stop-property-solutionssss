'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MapPin, Building, Tag, Compass, Sparkles } from 'lucide-react';

export default function InternalLinkingMesh() {
  const [isOpen, setIsOpen] = useState(false);

  // All 36 Sectors in Kamothe
  const kamotheSectors = Array.from({ length: 36 }, (_, i) => i + 1);

  // 11 Priority Dedicated Location Landing Pages across Navi Mumbai
  const naviMumbaiNodes = [
    { name: 'Kamothe', desc: 'Sectors 1-36, Khandeshwar Station', href: '/kamothe-property' },
    { name: 'Kharghar', desc: 'Central Park, Golf Course & Metro 1', href: '/kharghar-property' },
    { name: 'Panvel', desc: 'Panvel Junction & Old/New Panvel', href: '/panvel-property' },
    { name: 'Navi Mumbai', desc: 'Comprehensive Regional Property Hub', href: '/navi-mumbai-real-estate' },
    { name: 'Pushpak Nagar', desc: 'Direct NMIA Airport Aerocity Corridor', href: '/pushpak-nagar-property' },
    { name: 'Karanjade', desc: 'Affordable Living Near Panvel Junction', href: '/karanjade-property' },
    { name: 'Kalamboli & Roadpali', desc: 'Highway Junction & Modern Towers', href: '/kalamboli-property' },
    { name: 'Taloja', desc: 'Metro Phase 1 & Affordable Townships', href: '/taloja-property' },
    { name: 'Ulwe', desc: 'Bamandongri, Coastal Road & Atal Setu', href: '/ulwe-property' },
    { name: 'Nerul & Seawoods', desc: 'Palm Beach Road & Grand Central', href: '/nerul-property' },
    { name: 'Vashi', desc: 'Commercial Capital & Sector 17 Hub', href: '/vashi-property' },
  ];

  // High-Intent Search Clusters
  const popularSearches = [
    '1 BHK Flat for Sale in Kamothe',
    '2 BHK Flat for Sale in Kamothe',
    '3 BHK Luxury Apartments in Kamothe',
    'Resale Flats in Kamothe Sector 21',
    'Resale Flats in Kamothe Sector 22',
    'Flats near Khandeshwar Railway Station',
    'Properties near Navi Mumbai International Airport',
    'Ready to Move Flats in Navi Mumbai with OC',
    'CIDCO Transfer Flats in Kamothe',
    'Affordable Flats under 50 Lakhs in Navi Mumbai',
    'Commercial Shops for Sale in Kamothe Sector 21',
    'Office Space for Sale in CBD Belapur & Vashi',
    '1 BHK Flats in Kharghar near Metro Station',
    '2 BHK Flats in Panvel near Railway Station',
    'Zero Brokerage Verified Flats in Navi Mumbai',
    'Adv. Sachin Bhoir MahaRERA Property Verification',
  ];

  // Budget Permutations
  const budgetSegments = [
    { label: 'Flats under ₹40 Lakhs', query: 'under-40-lakhs' },
    { label: 'Flats ₹40L – ₹60L', query: '40-to-60-lakhs' },
    { label: 'Flats ₹60L – ₹80L', query: '60-to-80-lakhs' },
    { label: 'Flats ₹80L – ₹1.2 Crore', query: '80-lakhs-to-1-2-cr' },
    { label: 'Luxury Flats ₹1.2 Crore+', query: 'luxury-above-1-2-cr' },
  ];

  return (
    <section className="bg-navy-950/95 border-t border-navy-800 py-8 px-4 sm:px-6 lg:px-8 text-xs text-navy-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy-800/80 pb-4 mb-6">
          <div className="flex items-center gap-2.5 text-gold">
            <Compass size={18} className="animate-spin-slow" />
            <h3 className="font-serif text-sm sm:text-base font-bold text-white tracking-wide">
              Navi Mumbai &amp; Kamothe Real Estate Authority Directory (Topical Index)
            </h3>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy-900 border border-gold/30 text-gold-light hover:bg-gold/15 text-[11px] font-bold transition-all w-fit"
          >
            <span>{isOpen ? 'Collapse Directory' : 'Explore All Location Links'}</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Preview Bar (Always Visible) */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-[11px] uppercase tracking-wider font-extrabold text-gold flex items-center gap-1">
            <Sparkles size={11} /> Prime Nodes:
          </span>
          {naviMumbaiNodes.map((node) => (
            <Link
              key={node.name}
              href={node.href}
              className="px-2.5 py-1 rounded-lg bg-navy-900/80 border border-navy-800 text-navy-200 hover:text-gold hover:border-gold/40 transition-colors text-[11px]"
            >
              {node.name} Property
            </Link>
          ))}
        </div>

        {/* Expandable Comprehensive Internal Link Mesh */}
        {isOpen && (
          <div className="mt-6 space-y-8 animate-fadeIn">
            {/* 1. Kamothe 36 Sectors Grid */}
            <div>
              <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider mb-3">
                <MapPin size={13} /> Kamothe Sector-by-Sector Directory (36 Sectors)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-2">
                {kamotheSectors.map((sector) => (
                  <Link
                    key={sector}
                    href={`/properties?search=${encodeURIComponent(`Kamothe Sector ${sector}`)}`}
                    className="p-2 rounded-lg bg-navy-900/60 border border-navy-800/80 hover:border-gold/50 hover:bg-navy-800/60 transition-all text-center group"
                  >
                    <span className="block text-white font-semibold group-hover:text-gold text-[11px]">
                      Sector {sector}
                    </span>
                    <span className="block text-[9px] text-navy-400 mt-0.5">
                      1 &amp; 2 BHK Resale
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. Entirety of Navi Mumbai Nodes */}
            <div>
              <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider mb-3">
                <Building size={13} /> Navi Mumbai Major Growth Nodes &amp; Airport Corridor
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {naviMumbaiNodes.map((node) => (
                  <Link
                    key={node.name}
                    href={node.href}
                    className="p-3 rounded-xl bg-navy-900/60 border border-navy-800 hover:border-gold/40 hover:bg-navy-800/50 transition-all"
                  >
                    <div className="text-white font-bold text-xs flex items-center justify-between">
                      <span>Properties in {node.name}</span>
                      <span className="text-gold text-[10px]">Explore →</span>
                    </div>
                    <div className="text-[10px] text-navy-400 mt-1">{node.desc}</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. Popular Search Permutations */}
            <div>
              <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider mb-3">
                <Tag size={13} /> High-Demand Navi Mumbai Property Permutations
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <Link
                    key={term}
                    href={`/properties?search=${encodeURIComponent(term)}`}
                    className="px-3 py-1.5 rounded-xl bg-navy-900/50 border border-navy-800/80 text-navy-200 hover:text-gold hover:border-gold/40 text-[11px] transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. Budget Filters */}
            <div>
              <div className="flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-wider mb-3">
                <Sparkles size={13} /> Budget-Specific Navi Mumbai Search
              </div>
              <div className="flex flex-wrap gap-2.5">
                {budgetSegments.map((budget) => (
                  <Link
                    key={budget.query}
                    href={`/properties?budget=${budget.query}`}
                    className="px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold-light hover:bg-gold/20 text-xs font-semibold transition-all"
                  >
                    {budget.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Authority Disclaimer / Google Knowledge Base Note */}
            <div className="pt-4 border-t border-navy-800/80 text-[10px] text-navy-400 leading-relaxed">
              <p>
                <strong>One Stop Property Solution</strong> (Adv. Sachin Bhoir — MahaRERA Reg. No. A51900019872) is the premier real estate agency &amp; property legal consultancy headquartered at Shop No. 3, Tulsi Corner, Sector 21, Kamothe, Navi Mumbai – 410209. Specializing in verified clear title residential flats, commercial shops, industrial plots, and direct developer new projects across Kamothe, Khandeshwar, Kharghar, Panvel, Ulwe, Pushpak Nagar (NMIA Airport Zone), Vashi, and all 36 sectors of Kamothe. Direct phone: +91 98701 78204.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
