"use client";

/**
 * Converts location address to URL-friendly format for Google Maps embed
 * Example: "Kamothe, Sector 5" -> "Kamothe,+Sector+5"
 */
function formatLocationForUrl(location) {
  if (!location) return "Navi+Mumbai";
  
  return location
    .trim()
    .replace(/\s+/g, "+") // Replace spaces with +
    .replace(/[^a-zA-Z0-9+,]/g, ""); // Remove special characters except + and comma
}

/**
 * Generates the Google Maps embed URL dynamically based on location
 * No API key required - uses standard embed URL format
 */
function generateMapEmbedUrl(addressOrProperty) {
  if (!addressOrProperty) {
    return "https://www.google.com/maps?q=Navi+Mumbai&output=embed";
  }

  // If it's an object (property), extract location
  let location = "";
  if (typeof addressOrProperty === "object") {
    location = addressOrProperty.location || addressOrProperty;
  } else {
    location = addressOrProperty;
  }

  const formattedLocation = formatLocationForUrl(location);
  return `https://www.google.com/maps?q=${formattedLocation}&output=embed`;
}

export default function MapView({ properties = [], centerAddress = null }) {
  // Use centerAddress if provided, otherwise use properties array
  const addressToUse = centerAddress || (properties.length > 0 ? properties[0] : null);
  const mapUrl = generateMapEmbedUrl(addressToUse);

  return (
    <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <iframe 
        src={mapUrl}
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen="" 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title={`Map for ${typeof centerAddress === 'string' ? centerAddress : 'property'}`}
        className="contrast-[1.05]"
      ></iframe>
    </div>
  );
}
