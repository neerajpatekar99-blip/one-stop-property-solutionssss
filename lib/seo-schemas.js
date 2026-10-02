/**
 * SEO & AEO (Answer Engine Optimization) Schema Generator
 * Generates JSON-LD structured data for Google AI Overviews, ChatGPT Search, Perplexity, and SERPs.
 */

export const SITE_URL = 'https://onestoppropertysolution.in';
export const BUSINESS_HOURS_LABEL = 'Mon - Sun: 10 AM - 10 PM';
export const BUSINESS_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const PRIMARY_OFFICE_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Shop No. 3, Tulsi Corner, Plot No. 87 88, Sector 21, Kamothe',
  addressLocality: 'Kamothe, Navi Mumbai',
  addressRegion: 'Maharashtra',
  postalCode: '410209',
  addressCountry: 'IN',
};

export const PRIMARY_GEO = {
  '@type': 'GeoCoordinates',
  latitude: 19.0145,
  longitude: 73.0891,
};

const absoluteUrl = (path, fallback = `${SITE_URL}/logo.png`) => {
  if (!path) return fallback;
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
};

export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${SITE_URL}/#organization`,
    name: 'One Stop Property Solution',
    alternateName: ['One Stop Property Solutions', 'OSPS Real Estate'],
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    description: "Kamothe's #1 rated real estate agency & property consultant led by Adv. Sachin Bhoir. 10+ years of verified 1 BHK & 2 BHK resale and new project transactions with zero hidden charges.",
    telephone: '+919870178204',
    email: 'sachin@onestoppropertysolution.in',
    priceRange: '₹₹ - ₹₹₹₹',
    address: PRIMARY_OFFICE_ADDRESS,
    geo: PRIMARY_GEO,
    areaServed: [
      { '@type': 'City', name: 'Navi Mumbai' },
      { '@type': 'City', name: 'Kamothe' },
      { '@type': 'City', name: 'Khandeshwar' },
      { '@type': 'City', name: 'Kharghar' },
      { '@type': 'City', name: 'Panvel' },
      { '@type': 'City', name: 'Ulwe' },
      { '@type': 'City', name: 'Taloja' },
      { '@type': 'City', name: 'Pushpak Nagar (NMIA Airport Zone)' },
      { '@type': 'City', name: 'Vashi' },
      { '@type': 'City', name: 'CBD Belapur' },
      { '@type': 'City', name: 'Nerul' },
      { '@type': 'City', name: 'Seawoods' },
      { '@type': 'City', name: 'Roadpali' },
      { '@type': 'City', name: 'Kalamboli' },
      { '@type': 'City', name: 'Dronagiri' },
    ],
    sameAs: [
      'https://www.youtube.com/@sachinbhoir9361',
      'https://www.instagram.com/sachinbhoir_realestate',
      'https://www.linkedin.com/in/sachin-bhoir-3493a822',
      'https://www.facebook.com/sachinbhoir786',
      'https://www.facebook.com/p/One-Stop-Property-Solutions-100078497191034/',
      'https://wa.me/919870178204',
      'https://www.justdial.com/Navi-Mumbai/One-Stop-Property-Solution-Near-Jeevan-Jyot-Hospital-Kamothe/',
      'https://www.sulekha.com/one-stop-property-solutions-kamothe-navi-mumbai',
      'https://maharera.mahaonline.gov.in/',
      'https://www.indiamart.com/one-stop-property-solutions/',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '255',
      bestRating: '5',
      worstRating: '1',
    },
    knowsAbout: [
      'Best real estate agent in Navi Mumbai',
      'Top real estate agents in Navi Mumbai',
      'Property consultant in Navi Mumbai',
      'Best property dealer in Navi Mumbai',
      'Real estate broker Navi Mumbai',
      'Best real estate agent in Kamothe',
      'Property consultant in Kamothe',
      'Real estate agent in Kharghar Navi Mumbai',
      'Real estate agent in Panvel Navi Mumbai',
      'Real estate agent in Ulwe Navi Mumbai',
      'Real estate agent near Khandeshwar',
      'Real estate agent near Navi Mumbai International Airport NMIA',
      'Property consultant in Vashi Belapur Nerul Seawoods',
      '1 BHK for sale in Kamothe & Navi Mumbai',
      '2 BHK for sale in Kamothe & Navi Mumbai',
      '3 BHK luxury flats in Navi Mumbai',
      'Property dealer in Kamothe',
      'Resale flat in Kamothe',
      'Resale flats in Navi Mumbai with OC',
      'Kamothe property market rates 2026',
      'Navi Mumbai property price trends 2026',
      'CIDCO transfer and legal title verification',
      'MahaRERA verification A51900019872',
      'Adv. Sachin Bhoir One Stop Property Solution',
    ],
    founder: {
      '@type': 'Person',
      name: 'Adv. Sachin Bhoir',
      jobTitle: 'Founder & Managing Director',
      url: `${SITE_URL}/about`,
      sameAs: [
        'https://www.instagram.com/sachinbhoir_realestate/',
        'https://www.youtube.com/@sachinbhoir9361',
      ],
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'MahaRERA Real Estate Agent Registration',
      credentialCategory: 'Government License',
      recognizedBy: {
        '@type': 'GovernmentOrganization',
        name: 'Maharashtra Real Estate Regulatory Authority (MahaRERA)',
      },
      identifier: 'A51900019872',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales & Legal Consultation',
      telephone: '+919870178204',
      email: 'sachin@onestoppropertysolution.in',
      areaServed: ['IN'],
      availableLanguage: ['English', 'Hindi', 'Marathi'],
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: BUSINESS_DAYS,
        opens: '10:00',
        closes: '22:00',
      },
    },
  };
};

export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'One Stop Property Solution',
    url: SITE_URL,
    image: `${SITE_URL}/logo.png`,
    address: PRIMARY_OFFICE_ADDRESS,
    telephone: '+919870178204',
    email: 'sachin@onestoppropertysolution.in',
    priceRange: '₹₹₹',
    areaServed: [
      'Navi Mumbai',
      'Kamothe',
      'Kharghar',
      'Panvel',
      'Pushpak Nagar',
      'Karanjade',
      'Kalamboli',
      'Taloja',
      'Ulwe',
      'Nerul',
      'Vashi',
    ],
    sameAs: [
      'https://www.youtube.com/@sachinbhoir9361',
      'https://www.instagram.com/sachinbhoir_realestate',
      'https://www.linkedin.com/in/sachin-bhoir-3493a822',
      'https://www.facebook.com/sachinbhoir786',
      'https://wa.me/919870178204',
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: BUSINESS_DAYS,
        opens: '10:00',
        closes: '22:00',
      },
    ],
    geo: PRIMARY_GEO,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '255',
      bestRating: '5',
      worstRating: '1',
    },
  };
};

export const generateKamotheFAQSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is One Stop Property Solution RERA registered?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, One Stop Property Solution is fully MahaRERA certified under Registration Number A51900019872. All property deals adhere strictly to statutory disclosures, legal title vetting, and government compliance under the leadership of Adv. Sachin Bhoir.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which areas do you cover?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We specialize across prime Navi Mumbai growth corridors including Kamothe, Khandeshwar, Kharghar, Panvel, Pushpak Nagar (NMIA Airport Zone), Karanjade, Kalamboli, Taloja, Ulwe, Nerul, and Vashi.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you deal in resale flats?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we have an extensive portfolio of verified resale 1 BHK, 2 BHK, and 3 BHK flats across Kamothe and Navi Mumbai with Occupancy Certificate (OC), clear CIDCO transfer papers, and pre-screened bank loan approvals.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you help with property rentals?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide end-to-end residential and commercial rental solutions, including tenant background verification, registered rent agreement execution, and inventory matching.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you deal in commercial properties?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we facilitate buying, leasing, and investments in prime retail shops, office spaces, doctor clinics, and commercial showrooms across Kamothe, Kharghar, and Panvel.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you help with property documentation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'As a consultancy led by practicing advocate Sachin Bhoir, we specialize in 50-point legal title verification, 30-year search reports, CIDCO transfer documentation, society NOC processing, stamp duty computation, and sale deed registration.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which areas near Navi Mumbai International Airport do you cover?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We cover all high-appreciation nodes around NMIA, including Pushpak Nagar, Ulwe, Karanjade, Khandeshwar, Kamothe, and New Panvel, offering strategic residential and commercial investment opportunities.',
        },
      },
    ],
  };
};

export const generatePropertySchema = (property) => {
  const imageArray = property.images?.length > 0
    ? property.images.map(img => absoluteUrl(img))
    : [`${SITE_URL}/logo.png`];

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `${SITE_URL}/property/${property.slug}#listing`,
    name: property.title || property.name,
    description: property.metaDescription || property.shortDescription || property.description,
    image: imageArray,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.location || property.address,
      addressLocality: property.city || 'Navi Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: property.pincode || '410209',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: property.latitude || 19.0145,
      longitude: property.longitude || 73.0891,
    },
    price: property.price ? property.price.toString() : undefined,
    priceCurrency: 'INR',
    seller: {
      '@type': 'RealEstateAgent',
      name: 'Adv. Sachin Bhoir - One Stop Property Solution',
      url: SITE_URL,
      telephone: '+919870178204',
    },
    propertyType: property.type || 'Apartment',
    numberOfRooms: property.bhk ? parseInt(property.bhk) : undefined,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: property.area || property.sqft || undefined,
      unitCode: 'FTK',
    },
    availability: property.possession === 'Ready to Move' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
    areaServed: {
      '@type': 'City',
      name: property.city || 'Navi Mumbai',
    },
  };
};

export const generateBreadcrumbSchema = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
};

export const generateFAQSchema = (faqs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
};

export const generateWebSiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'One Stop Property Solution',
    alternateName: ['One Stop Property Solutions', 'OSPS Real Estate'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/properties?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
};

export const generateServicePageSchema = (serviceName, serviceDescription) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'RealEstateAgent',
      name: 'One Stop Property Solution',
      url: SITE_URL,
      telephone: '+919870178204',
      address: PRIMARY_OFFICE_ADDRESS,
    },
    areaServed: ['Kamothe', 'Panvel', 'Kharghar', 'Navi Mumbai'],
    availableLanguage: ['English', 'Hindi', 'Marathi'],
    serviceType: 'Real Estate Consultation',
  };
};

export const generateCollectionPageSchema = (title, description, items = []) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: description,
    url: `${SITE_URL}/properties`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: item.slug ? `${SITE_URL}/property/${item.slug}` : SITE_URL,
        name: item.title || item.name || `Property ${index + 1}`,
      })),
    },
  };
};

