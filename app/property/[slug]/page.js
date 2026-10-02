import { notFound } from "next/navigation";
import PropertyDetailClient from "@/components/PropertyDetailClient";
import { getPropertyBySlug, getAllProperties } from "@/lib/properties/service";

const SITE_URL = "https://onestoppropertysolution.in";

export async function generateStaticParams() {
  const allProperties = await getAllProperties();
  return allProperties.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({ params }) {
  const property = await getPropertyBySlug(params.slug);
  if (!property) {
    return {
      title: "Property not found | One Stop Property Solutions",
      description: "The property you are looking for is not available. Explore our latest curated listings in Navi Mumbai.",
    };
  }

  return {
    title: property.seoTitle,
    description: property.metaDescription,
    keywords: property.keywords,
    openGraph: {
      title: property.seoTitle,
      description: property.metaDescription,
      type: "website",
      url: `${SITE_URL}/property/${property.slug}`,
      images: property.images?.length
        ? [{ url: `${SITE_URL}${property.images[0]}`, width: 1200, height: 630 }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: property.seoTitle,
      description: property.metaDescription,
      images: property.images?.length ? [`${SITE_URL}${property.images[0]}`] : undefined,
    },
    alternates: {
      canonical: `${SITE_URL}/property/${property.slug}`,
    },
  };
}

export default async function PropertySlugPage({ params }) {
  const property = await getPropertyBySlug(params.slug);
  if (!property) notFound();

  // Get all properties to calculate related properties
  const allProperties = await getAllProperties();

  // Simple related properties logic using the unified data
  const relatedProperties = allProperties
    .filter((item) => item.id !== property.id && item.category === property.category)
    .slice(0, 3);

  const schema = property.schema;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PropertyDetailClient property={property} relatedProperties={relatedProperties} />
    </>
  );
}
