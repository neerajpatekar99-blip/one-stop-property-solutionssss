import dynamic from "next/dynamic";
import { getAllProperties } from "@/lib/properties/service";
import { generateCollectionPageSchema } from "@/lib/seo-schemas";

const PropertiesPage = dynamic(() => import("@/components/PropertiesPage"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 pt-32 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export async function generateMetadata() {
  const allProperties = await getAllProperties();
  const propertyNames = allProperties.map((property) => property.title).join(", ");

  return {
    title: "Buy Properties & Projects in Kamothe, Panvel & Navi Mumbai | One Stop Property Solutions",
    description: "Explore verified properties for sale in Navi Mumbai. Browse 1 BHK, 2 BHK, 3 BHK flats, ready-to-move homes, and premium projects in Kamothe, Panvel. ₹40L - ₹1.25Cr range.",
    keywords: "buy property Navi Mumbai, flats for sale Kamothe, 1 BHK 2 BHK 3 BHK, residential projects Panvel, ready to move homes, property listings near me, affordable houses",
    robots: { index: true, follow: true },
    other: {
      "property-listings": propertyNames,
    },
    openGraph: {
      title: "Buy Properties & Projects in Kamothe, Panvel & Navi Mumbai",
      description: "Verified property listings across Navi Mumbai. 1 BHK, 2 BHK, 3 BHK flats, projects, and ready-to-move homes at best prices.",
      type: "website",
      url: "https://onestoppropertysolution.in/properties",
      siteName: "One Stop Property Solutions",
      images: [
        {
          url: "https://onestoppropertysolution.in/gallery/01.webp",
          width: 1024,
          height: 768,
          alt: "Property Listings - Navi Mumbai",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Buy Properties in Navi Mumbai | One Stop Property Solutions",
      description: "Verified properties and projects for sale in Kamothe, Panvel, Navi Mumbai",
      images: ["https://onestoppropertysolution.in/gallery/01.webp"],
    },
    alternates: {
      canonical: "https://onestoppropertysolution.in/properties",
    },
  };
}

export default async function Properties() {
  const allProperties = await getAllProperties();
  
  const collectionSchema = generateCollectionPageSchema(
    "Verified Properties and Projects in Navi Mumbai",
    `All ${allProperties.length} currently available property listings from One Stop Property Solutions.`,
    allProperties
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <PropertiesPage initialProperties={allProperties} />
    </>
  );
}
