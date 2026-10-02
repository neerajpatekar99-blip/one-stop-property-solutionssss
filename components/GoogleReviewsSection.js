import Script from "next/script";
import { Star, ArrowRight, MapPin } from "lucide-react";

export default function GoogleReviewsSection() {
  return (
    <div className="w-full">
      <Script src="https://featurable.com/assets/v2/masonry_default.min.js" strategy="afterInteractive" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <span className="font-bold text-slate-900 text-lg">4.9 / 5.0</span>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div className="text-sm font-medium text-slate-500">215+ Google Reviews</div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto overflow-hidden rounded-[32px] border border-slate-200 bg-white min-h-[400px]">
          <div id="featurable-860c55b9-e8a7-4366-819c-300253fc557e" data-featurable-async className="min-h-[400px]" />
        </div>
      </div>
    </div>
  );
}
