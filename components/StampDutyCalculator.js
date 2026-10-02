'use client';

import { useState } from 'react';
import { Calculator, ShieldCheck, Share2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function StampDutyCalculator() {
  const [propertyValue, setPropertyValue] = useState(6500000); // 65 Lakhs default
  const [buyerGender, setBuyerGender] = useState('male'); // male, female, joint

  // Calculate Maharashtra / Navi Mumbai Stamp Duty 2026
  // Navi Mumbai has 1% Metro Cess applicable
  const stampDutyRate = buyerGender === 'female' ? 0.05 : 0.06; // 5% for female (1% discount), 6% for male/joint
  const stampDutyAmount = Math.round(propertyValue * stampDutyRate);
  
  // Registration Fee: 1% capped at max ₹30,000 for residential above ₹30L
  const registrationFee = Math.min(Math.round(propertyValue * 0.01), 30000);

  // TDS (1% if property price >= 50 Lakhs under Section 194-IA)
  const tdsApplicable = propertyValue >= 5000000;
  const tdsAmount = tdsApplicable ? Math.round(propertyValue * 0.01) : 0;

  // Total government outgo
  const totalGovtCharges = stampDutyAmount + registrationFee + tdsAmount;
  const grandTotalCost = propertyValue + totalGovtCharges;

  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleShareWhatsApp = () => {
    const text = `*Navi Mumbai Property Stamp Duty & Registration Breakdown (2026)*%0A%0A` +
      `🏠 *Property Value:* ${formatINR(propertyValue)}%0A` +
      `📑 *Stamp Duty (${(stampDutyRate * 100).toFixed(0)}% incl. 1% Metro Cess):* ${formatINR(stampDutyAmount)}%0A` +
      `🏛️ *Registration Fee (Govt Cap):* ${formatINR(registrationFee)}%0A` +
      `💳 *TDS (Section 194-IA):* ${formatINR(tdsAmount)}%0A` +
      `💰 *Total Govt Charges:* ${formatINR(totalGovtCharges)}%0A` +
      `🔑 *Total Estimated Outgo:* ${formatINR(grandTotalCost)}%0A%0A` +
      `Verified via Adv. Sachin Bhoir | One Stop Property Solution Kamothe%0A` +
      `https://onestoppropertysolution.in`;

    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div id="calculator" className="my-12 p-6 sm:p-10 rounded-3xl bg-navy-900/90 border border-gold/40 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-navy-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold-light text-[11px] font-bold uppercase tracking-wider mb-2">
            <Sparkles size={12} className="text-gold" />
            <span>2026 Ready Reckoner Compliance Tool</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Navi Mumbai Stamp Duty &amp; Registration Calculator
          </h3>
          <p className="text-xs sm:text-sm text-navy-300 mt-1">
            Calculate accurate Maharashtra statutory charges for Kamothe, Kharghar, Panvel &amp; Navi Mumbai.
          </p>
        </div>

        <button
          onClick={handleShareWhatsApp}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/30 text-xs font-bold transition-all w-fit shrink-0"
        >
          <Share2 size={14} />
          <span>Share Breakdown on WhatsApp</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-2">
              Property Agreement Value: <span className="text-white text-base ml-1">{formatINR(propertyValue)}</span>
            </label>
            <input
              type="range"
              min="2000000"
              max="30000000"
              step="100000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full h-2 bg-navy-950 rounded-lg appearance-none cursor-pointer accent-gold"
            />
            <div className="flex justify-between text-[10px] text-navy-400 mt-1">
              <span>₹20 Lakhs</span>
              <span>₹1.5 Crores</span>
              <span>₹3.0 Crores</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gold mb-2">
              Buyer Category (Concession Rules):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'male', label: 'Male Buyer (6%)' },
                { id: 'female', label: 'Female Buyer (5%)' },
                { id: 'joint', label: 'Joint Ownership (6%)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setBuyerGender(cat.id)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                    buyerGender === cat.id
                      ? 'bg-gold text-navy-950 border-gold font-bold shadow-md'
                      : 'bg-navy-950 border-navy-700 text-navy-300 hover:border-gold/40 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            {buyerGender === 'female' && (
              <p className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                <CheckCircle2 size={12} /> 1% Maharashtra Govt concession applied for exclusive female ownership!
              </p>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-navy-950/70 border border-gold/20 text-xs text-navy-300 space-y-1.5">
            <div className="flex items-center gap-1.5 text-gold font-bold">
              <ShieldCheck size={14} /> Legal Title Guarantee by Adv. Sachin Bhoir
            </div>
            <p className="text-[11px] text-navy-400">
              Includes complimentary verification of CIDCO transfer NOC, society deed clearance, and 30-year search report prior to registration.
            </p>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 bg-navy-950/80 rounded-2xl border border-gold/30 p-6 flex flex-col justify-between shadow-xl">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-navy-800">
              <span className="text-navy-300">Base Agreement Cost</span>
              <span className="text-white font-bold">{formatINR(propertyValue)}</span>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-navy-800">
              <div>
                <span className="text-navy-300">Stamp Duty (incl. 1% Metro Cess)</span>
                <span className="block text-[10px] text-gold">Rate: {(stampDutyRate * 100).toFixed(0)}%</span>
              </div>
              <span className="text-gold-light font-bold">{formatINR(stampDutyAmount)}</span>
            </div>
            <div className="flex justify-between items-center text-xs pb-2 border-b border-navy-800">
              <div>
                <span className="text-navy-300">Registration Charges</span>
                <span className="block text-[10px] text-navy-400">Govt Capped at ₹30,000</span>
              </div>
              <span className="text-white font-bold">{formatINR(registrationFee)}</span>
            </div>
            {tdsApplicable && (
              <div className="flex justify-between items-center text-xs pb-2 border-b border-navy-800">
                <div>
                  <span className="text-navy-300">1% TDS (Sec 194-IA)</span>
                  <span className="block text-[10px] text-navy-400">Applicable on ₹50L+ value</span>
                </div>
                <span className="text-amber-400 font-bold">{formatINR(tdsAmount)}</span>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gold/30">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs uppercase tracking-wider text-navy-300 font-bold">Total Estimated Outgo:</span>
              <span className="font-serif text-2xl sm:text-3xl font-extrabold text-gold">{formatINR(grandTotalCost)}</span>
            </div>
            <p className="text-[10px] text-navy-400 mb-4">
              *Approximate statutory estimate as per Maharashtra Ready Reckoner 2026.
            </p>
            <Link
              href="/cart"
              className="btn-gold w-full text-xs font-bold py-3 flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Book Priority Title Verification with Sachin Sir</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
