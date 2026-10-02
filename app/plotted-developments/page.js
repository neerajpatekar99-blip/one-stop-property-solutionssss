import PlottedDevelopments from "@/components/PlottedDevelopments";
import { onlyPlottedDevelopments } from "@/data/properties";
import { generateCollectionPageSchema } from "@/lib/seo-schemas";

export const metadata = {
  title: "Plotted Developments near Mumbai | Riverfront Villa Plots | One Stop Property Solutions",
  description: "Explore curated plotted developments near Mumbai, including premium riverfront NA villa plots in Karjat with verified documents, media and expert guidance.",
  keywords: "plotted developments near Mumbai, villa plots Karjat, riverfront plots, NA plots near Mumbai, land investment Maharashtra",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Plotted Developments near Mumbai",
    description: "Verified plotted developments and villa plot opportunities curated by One Stop Property Solutions.",
    type: "website",
    url: "https://onestoppropertysolution.in/plotted-developments",
    siteName: "One Stop Property Solutions",
    images: [
      {
        url: "https://onestoppropertysolution.in/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/01.jpeg",
        width: 1200,
        height: 630,
        alt: "Plotted Developments near Mumbai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plotted Developments near Mumbai",
    description: "Premium riverfront NA villa plots and plotted developments near Mumbai.",
    images: ["https://onestoppropertysolution.in/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/01.jpeg"],
  },
  alternates: {
    canonical: "https://onestoppropertysolution.in/plotted-developments",
  },
};

export default function PlottedDevelopmentsPage() {
  const collectionSchema = generateCollectionPageSchema(
    "Plotted Developments near Mumbai",
    `All ${onlyPlottedDevelopments.length} currently available plotted development listings from One Stop Property Solutions.`,
    onlyPlottedDevelopments
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <main className="min-h-screen bg-gray-50 pt-28 sm:pt-32 pb-16">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2.5 text-brand font-bold text-xs uppercase tracking-[0.2em] mb-4">
                <span className="w-8 h-px bg-brand" />
                Land Investments
                <span className="w-8 h-px bg-brand" />
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy-800 leading-tight">
                Plotted Developments
              </h1>
              <p className="section-sub mt-3 max-w-2xl">
                Curated NA villa plots and land-led developments for lifestyle, weekend homes and long-term investment.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm text-navy-600 shadow-sm">
              <strong className="text-navy-900">{onlyPlottedDevelopments.length}</strong> verified listing available
            </div>
          </div>
          <PlottedDevelopments />
        </section>
      </main>
    </>
  );
}
