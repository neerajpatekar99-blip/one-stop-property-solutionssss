import { ArrowRight, Phone, MessageSquare, MapPin, Star } from "lucide-react";

export default function JustdialEmbedCard() {
  return (
    <div className="max-w-sm rounded-[24px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/40">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Justdial Verified</p>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold">
          <Star size={10} fill="currentColor" /> 4.9
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 leading-tight">One Stop Property Solutions</h3>
        <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
          <MapPin size={12} className="text-brand" /> Sector 21, Kamothe, Navi Mumbai
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <a href="tel:+919870178204" className="flex items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-xs font-bold text-white transition hover:bg-brand-dark">
          <Phone size={16} /> Call
        </a>
        <a href="https://wa.me/919870178204" className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 transition hover:border-brand hover:text-brand">
          <MessageSquare size={14} className="text-emerald-500" /> WhatsApp
        </a>
      </div>

      <a 
        href="https://jsdl.in/DT-43CJ5SIC" 
        target="_blank" 
        rel="noreferrer" 
        className="flex items-center justify-center gap-2 w-full rounded-xl bg-slate-50 py-2.5 text-xs font-semibold text-slate-600 transition hover:text-brand"
      >
        View Detailed Profile <ArrowRight size={14} />
      </a>
    </div>
  );
}
