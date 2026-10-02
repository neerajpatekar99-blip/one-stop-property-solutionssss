import { getAllProperties } from '@/lib/properties/service';

export default async function sitemap() {
  const baseUrl = 'https://onestoppropertysolution.in';
  
  const allProperties = await getAllProperties();

  // Individual Property URLs
  const propertyUrls = allProperties.map((property) => ({
    url: `${baseUrl}/property/${property.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: property.tags?.includes('featured') ? 0.95 : 0.85,
  }));

  // 11 Dedicated High-Intent Location Landing Pages (Per Google SEO Action Report)
  const locationSlugs = [
    'navi-mumbai-real-estate',
    'kamothe-property',
    'kharghar-property',
    'panvel-property',
    'pushpak-nagar-property',
    'karanjade-property',
    'kalamboli-property',
    'taloja-property',
    'ulwe-property',
    'nerul-property',
    'vashi-property',
  ];

  const locationUrls = locationSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.92,
  }));

  return [
    // Core Authority Pages
    { 
      url: baseUrl, 
      lastModified: new Date(), 
      changeFrequency: 'daily', 
      priority: 1.0 
    },
    { 
      url: `${baseUrl}/properties`, 
      lastModified: new Date(), 
      changeFrequency: 'daily', 
      priority: 0.95 
    },
    {
      url: `${baseUrl}/plotted-developments`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    { 
      url: `${baseUrl}/about`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly', 
      priority: 0.85 
    },
    { 
      url: `${baseUrl}/services`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly', 
      priority: 0.85 
    },
    { 
      url: `${baseUrl}/contact`, 
      lastModified: new Date(), 
      changeFrequency: 'monthly', 
      priority: 0.85 
    },

    // 11 Priority Dedicated Location Pages
    ...locationUrls,

    // Verified Property Listings
    ...propertyUrls,
  ];
}
