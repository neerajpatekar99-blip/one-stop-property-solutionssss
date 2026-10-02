import { properties as hardcodedProperties } from '@/data/properties';

/**
 * Normalizes a property record to match the frontend component expectations.
 */
function normalizeProperty(property) {
  if (!property) return null;
  return {
    ...property,
    id: property.id || property.slug,
    title: property.title || '',
    slug: property.slug || '',
    category: (property.category || property.listing_type || 'sale').toLowerCase(),
    type: property.type || property.property_type || '1 BHK',
    price: property.price ? Number(property.price) : null,
    priceLabel: property.priceLabel || '',
    area: property.area || property.carpet_area || '',
    location: property.location || property.locality || '',
    city: property.city || 'Navi Mumbai',
    images: property.images || (property.cover_image ? [property.cover_image] : []),
    highlights: property.highlights || [],
    amenities: property.amenities || [],
    nearby: property.nearby || property.nearby_places || [],
    description: property.description || property.shortDescription || '',
  };
}

/**
 * Fetches a single property by slug directly from static data.
 */
export async function getPropertyBySlug(slug) {
  const hardcoded = hardcodedProperties.find((p) => p.slug === slug);
  if (hardcoded) {
    return normalizeProperty(hardcoded);
  }
  return null;
}

/**
 * Helper to get all published properties from static data.
 */
export async function getAllProperties() {
  return hardcodedProperties.map(normalizeProperty);
}
