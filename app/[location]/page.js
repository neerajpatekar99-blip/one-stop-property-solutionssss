import { getAllLocationSlugs, getLocationBySlug } from "@/data/locations";
import { getAllProperties } from "@/lib/properties/service";
import { notFound } from "next/navigation";
import LocationPageClient from "@/components/LocationPageClient";

export function generateStaticParams() {
  return getAllLocationSlugs().map((slug) => ({ location: slug }));
}

export async function generateMetadata({ params }) {
  const location = getLocationBySlug(params.location);
  if (!location) return {};

  const pageUrl = `https://onestoppropertysolution.in/${location.slug}`;

  return {
    title: location.seoTitle,
    description: location.metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: location.seoTitle,
      description: location.metaDescription,
      url: pageUrl,
      type: "website",
      siteName: "One Stop Property Solution",
      images: [
        {
          url: "https://onestoppropertysolution.in/logo.png",
          width: 1200,
          height: 630,
          alt: `${location.name} Property - Adv. Sachin Bhoir`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: location.seoTitle,
      description: location.metaDescription,
      creator: "@onestopproperty",
      images: ["https://onestoppropertysolution.in/logo.png"],
    },
  };
}

export default async function LocationPage({ params }) {
  const location = getLocationBySlug(params.location);
  if (!location) {
    notFound();
  }

  const allProperties = await getAllProperties();

  // Filter properties matching this locality's keywords
  const filteredProperties = allProperties.filter((p) => {
    const locString = `${p.location || ""} ${p.city || ""} ${p.title || ""}`.toLowerCase();
    return location.filterKeywords.some((keyword) =>
      locString.includes(keyword.toLowerCase())
    );
  });

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: location.breadcrumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: `https://onestoppropertysolution.in${crumb.url}`,
    })),
  };

  // Localized FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: location.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  // Local RealEstateAgent Schema
  const localAgentSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: `One Stop Property Solution - ${location.name}`,
    url: `https://onestoppropertysolution.in/${location.slug}`,
    telephone: "+919870178204",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop No. 3, Tulsi Corner, Plot No. 87 88, Sector 21, Kamothe",
      addressLocality: "Kamothe, Navi Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "410209",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.0145,
      longitude: 73.0891,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: location.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localAgentSchema) }}
      />

      <LocationPageClient location={location} properties={filteredProperties} />
    </>
  );
}
