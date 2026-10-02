import Link from "next/link";
import {
  Home,
  TrendingUp,
  Key,
  BarChart2,
  CreditCard,
  Shield,
  ArrowRight,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { services } from "@/data/services";
import { generateBreadcrumbSchema } from "@/lib/seo-schemas";

export const metadata = {
  title: "Real Estate Services | Buy, Sell, Rent & Investment | Navi Mumbai",
  description:
    "Complete real estate solutions in Navi Mumbai. Buy, sell, rent, invest, home loans, legal assistance & property consultation. 10+ years expertise in Kamothe, Panvel & Navi Mumbai.",
  keywords: "real estate services, buy property, sell property, rent flat, investment property, home loans, legal assistance, Navi Mumbai, Kamothe, Panvel, property consultation",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Real Estate Services | One Stop Property Solutions",
    description: "Complete real estate solutions - Buy, Sell, Rent, Invest, Home Loans & Legal Assistance in Navi Mumbai.",
    type: "website",
    url: "https://onestoppropertysolution.in/services",
    siteName: "One Stop Property Solutions",
    images: [
      {
        url: "/gallery/services.webp",
        width: 1200,
        height: 630,
        alt: "Real Estate Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Services in Navi Mumbai",
    description: "Buy, Sell, Rent, and invest with expert consultation",
    images: ["/gallery/services.webp"],
  },
  alternates: {
    canonical: "https://onestoppropertysolution.in/services",
  },
};

const iconMap = { Home, TrendingUp, Key, BarChart2, CreditCard, Shield };

const colorMap = {
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-600 bg-orange-100",
    border: "border-orange-100",
    tag: "bg-orange-100 text-orange-700",
  },
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600 bg-blue-100",
    border: "border-blue-100",
    tag: "bg-blue-100 text-blue-700",
  },
  green: {
    bg: "bg-green-50",
    icon: "text-green-600 bg-green-100",
    border: "border-green-100",
    tag: "bg-green-100 text-green-700",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600 bg-purple-100",
    border: "border-purple-100",
    tag: "bg-purple-100 text-purple-700",
  },
  red: {
    bg: "bg-red-50",
    icon: "text-red-600 bg-red-100",
    border: "border-red-100",
    tag: "bg-red-100 text-red-700",
  },
  teal: {
    bg: "bg-teal-50",
    icon: "text-teal-600 bg-teal-100",
    border: "border-teal-100",
    tag: "bg-teal-100 text-teal-700",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-navy-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand/20 border border-brand/30 text-brand rounded-full px-4 py-2 text-sm font-medium mb-6">
            Complete Real Estate Solutions
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-5">
            Everything You Need,{" "}
            <span className="text-brand italic">Under One Roof</span>
          </h1>
          <p className="text-navy-400 text-lg leading-relaxed max-w-2xl mx-auto">
            From finding your first home to building an investment portfolio —
            One Stop Property Solutions handles every step with expertise and
            care.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = iconMap[service.icon];
              const colors = colorMap[service.color];
              return (
                <div
                  key={service.id}
                  className={`bg-white rounded-2xl border ${colors.border} p-7 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group`}
                >
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${colors.icon}`}
                  >
                    <Icon size={26} />
                  </div>

                  {/* Tag */}
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors.tag} mb-4 inline-block`}
                  >
                    {service.tagline}
                  </span>

                  <h3 className="font-sans font-bold text-navy-800 text-xl mb-3">
                    {service.title}
                  </h3>
                  <p className="text-navy-500 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2.5 text-sm text-navy-700"
                      >
                        <CheckCircle2 size={13} className="text-brand flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:gap-2.5 transition-all group-hover:text-brand-dark"
                  >
                    Get Started
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-brand font-medium text-sm uppercase tracking-wide mb-3">
              Simple & Transparent
            </p>
            <h2 className="section-heading">How We Work</h2>
          </div>

          <div className="relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand/20 via-brand to-brand/20" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Share Your Requirement",
                  desc: "Tell us what you're looking for — budget, location, type. Takes 5 minutes.",
                },
                {
                  step: "02",
                  title: "Get Matched Listings",
                  desc: "We shortlist properties that genuinely fit your criteria — no time-wasters.",
                },
                {
                  step: "03",
                  title: "Site Visits & Negotiation",
                  desc: "We accompany you to visits and negotiate the best price on your behalf.",
                },
                {
                  step: "04",
                  title: "Registration & Handover",
                  desc: "Full legal support through documentation, registration, and possession.",
                },
              ].map((step) => (
                <div key={step.step} className="relative text-center">
                  <div className="w-20 h-20 bg-brand rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand/25">
                    <span className="font-serif text-2xl text-white font-bold">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="font-sans font-semibold text-navy-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-navy-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 mb-8">
            Talk to Sachin sir directly. Free consultation, no obligations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919870178204"
              className="flex items-center justify-center gap-2 bg-white text-brand font-semibold px-8 py-4 rounded-xl hover:bg-brand-light transition-colors shadow-lg"
            >
              <Phone size={18} />
              Call: +91 98701 78204
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
            >
              Send Enquiry
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
