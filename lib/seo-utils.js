/**
 * SEO Utilities
 * Helper functions for SEO optimization across the application
 */

export const DOMAIN = 'https://onestoppropertysolution.in';

/**
 * Generate canonical URL for a page
 */
export const getCanonicalUrl = (path) => {
  // Remove trailing slashes and ensure proper formatting
  const cleanPath = path?.startsWith('/') ? path : `/${path}`;
  return `${DOMAIN}${cleanPath}`.replace(/\/$/, '') || DOMAIN;
};

/**
 * Generate Open Graph metadata
 */
export const generateOGMetadata = (title, description, image, url) => {
  return {
    title,
    description,
    type: 'website',
    url: getCanonicalUrl(url),
    images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : [],
    siteName: 'One Stop Property Solutions',
    locale: 'en_IN',
  };
};

/**
 * Generate Twitter Card metadata
 */
export const generateTwitterMetadata = (title, description, image) => {
  return {
    card: 'summary_large_image',
    title,
    description,
    image: image || '/logo.png',
    creator: '@onestopproperty',
  };
};

/**
 * Generate breadcrumb schema for navigation
 */
export const generateBreadcrumbSchema = (breadcrumbs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: getCanonicalUrl(item.url),
    })),
  };
};

/**
 * Generate JSON-LD structured data wrapper
 */
export const structuredData = (data) => {
  return {
    __html: JSON.stringify(data),
  };
};

/**
 * Generate page metadata with SEO defaults
 */
export const generatePageMetadata = (options) => {
  const {
    title,
    description,
    keywords,
    image,
    url,
    type = 'website',
    robots = { index: true, follow: true },
  } = options;

  return {
    title,
    description,
    keywords,
    robots,
    openGraph: generateOGMetadata(title, description, image, url),
    twitter: generateTwitterMetadata(title, description, image),
    alternates: {
      canonical: getCanonicalUrl(url),
    },
    authors: [{ name: 'One Stop Property Solutions', url: DOMAIN }],
    creator: 'One Stop Property Solutions',
    publisher: 'One Stop Property Solutions',
  };
};

/**
 * Format property for SEO
 */
export const formatPropertyForSEO = (property) => {
  return {
    ...property,
    canonicalUrl: getCanonicalUrl(`/property/${property.slug}`),
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'RealEstateListing',
      name: property.title,
      description: property.metaDescription || property.description,
      image: property.images?.map(img => `${DOMAIN}${img}`) || [],
      address: {
        '@type': 'PostalAddress',
        streetAddress: property.location,
        addressLocality: property.city,
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },
      url: getCanonicalUrl(`/property/${property.slug}`),
      priceCurrency: 'INR',
      price: property.price?.toString(),
      availability: property.possession,
    },
  };
};

/**
 * Get image URL with domain
 */
export const getImageUrl = (path) => {
  if (!path) return `${DOMAIN}/logo.png`;
  if (path.startsWith('http')) return path;
  return `${DOMAIN}${path}`;
};

/**
 * Sanitize text for meta descriptions
 */
export const sanitizeMetaDescription = (text, maxLength = 160) => {
  if (!text) return '';
  const cleaned = text.replace(/\s+/g, ' ').trim();
  return cleaned.length > maxLength ? `${cleaned.substring(0, maxLength - 3)}...` : cleaned;
};

/**
 * Generate schema for pricing information
 */
export const generatePricingSchema = (property) => {
  if (!property.price && !property.priceLabel) return null;

  return {
    '@type': 'PriceSpecification',
    priceCurrency: 'INR',
    price: property.price?.toString() || property.priceLabel,
    description: property.priceLabel,
  };
};

/**
 * Generate FAQSchema
 */
export const generatePropertyFAQSchema = (property) => {
  const faqs = [
    {
      question: `What is the price of ${property.title}?`,
      answer: property.priceLabel || 'Contact us for pricing information',
    },
    {
      question: `Where is ${property.title} located?`,
      answer: `${property.title} is located in ${property.location}, ${property.city}`,
    },
    {
      question: `What are the amenities in ${property.title}?`,
      answer: property.amenities?.join(', ') || 'Various amenities available',
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};
