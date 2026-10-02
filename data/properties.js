/**
 * SEO Automation Helper
 * Automatically generates SEO metadata and Schema if missing.
 */
const enrichProperty = (p) => {
  const domain = "https://onestoppropertysolution.in";
  const firstImage = p.images?.[0] || p.ogImage || (p.videos?.[0] ? null : "/logo.png");
  const toAbsoluteUrl = (path) => {
    if (!path) return `${domain}/logo.png`;
    return path.startsWith('http') ? path : `${domain}${path}`;
  };
  const imageUrls = p.images?.length ? p.images.map(toAbsoluteUrl) : [toAbsoluteUrl(firstImage)];
  
  const autoTitle = `${p.title} | ${p.location}, ${p.city} | One Stop Property Solution`;
  const autoDesc = `${p.shortDescription || p.title}. ${p.type} property in ${p.location}. ${p.priceLabel ? 'Price: ' + p.priceLabel : 'Contact for price'}. Ready to move options available.`;
  
  const canonicalUrl = `${domain}/property/${p.slug}`;
  const mergedKeywords = p.keywords || [
    p.title,
    p.type,
    p.location,
    p.city,
    "property for sale",
    "flat for sale",
    "real estate Navi Mumbai",
    "One Stop Property Solutions",
  ].filter(Boolean).join(", ");
  const existingSchema = p.schema || {};
  const offers = p.price ? {
    "@type": "Offer",
    "price": p.price,
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "url": canonicalUrl,
    ...(existingSchema.offers || {})
  } : existingSchema.offers;

  return {
    ...p,
    ogImage: p.ogImage || imageUrls[0],
    seoTitle: p.seoTitle || autoTitle,
    metaDescription: p.metaDescription || autoDesc,
    keywords: mergedKeywords,
    schema: {
      ...existingSchema,
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "@id": `${canonicalUrl}#listing`,
      "name": p.title,
      "description": p.metaDescription || autoDesc,
      "url": canonicalUrl,
      "image": imageUrls,
      "address": {
        ...(existingSchema.address || {}),
        "@type": "PostalAddress",
        "streetAddress": p.location,
        "addressLocality": p.city || "Navi Mumbai",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN",
      },
      "areaServed": {
        "@type": "City",
        "name": p.city || "Navi Mumbai",
      },
      "seller": {
        "@type": "RealEstateAgent",
        "name": "One Stop Property Solutions",
        "url": domain,
        "telephone": "+919870178204",
      },
      "category": p.category || "sale",
      "propertyType": p.type,
      "amenityFeature": p.amenities?.map((amenity) => ({
        "@type": "LocationFeatureSpecification",
        "name": amenity,
      })),
      ...(p.area ? {
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": p.area,
          "unitCode": "FTK",
        }
      } : {}),
      ...(offers ? { "offers": offers } : {}),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
    }
  };
};

export const properties = [ enrichProperty(
  {
    id: "kamothe-1bhk-sector-18",
    slug: "1-bhk-flat-kamothe-sector-18",
    title: "1 BHK Flat for Sale – Kamothe (Sector 18)",
    type: "1 BHK",
    availableTypes: ["1 BHK"],
    category: "sale",
    price: 6500000,
    priceLabel: "₹65 Lakh",
    area: null,
    location: "Sector 18, Kamothe",
    city: "Navi Mumbai",
    floor: "4th Floor",
    building: "G+13 Storey",
    facing: null,
    parking: false,
    furnished: "Not Furnished",
    possession: "Ready to Move",
    tags: ["featured", "budget"],
    shortDescription: "Well-maintained and spacious 1 BHK flat located in a peaceful residential colony with good ventilation and daily convenience nearby.",
    description: `1 BHK FLAT FOR SALE – KAMOTHE (SECTOR 18)
Property Overview
Well-maintained and spacious 1 BHK flat located in a peaceful residential colony with good ventilation and daily convenience nearby.
Location: Sector 18, Kamothe, Navi Mumbai
Building: G+13 Storey
Floor: 4th Floor

Property Details
Configuration: 1 BHK
Ventilation: Well-ventilated
Condition: Well-maintained
Water Supply: 24 Hours
Society: Peaceful residential colony

Location Advantages
Near Gokul Dairy – 5 minutes walking distance
Close to local markets, hospitals, and daily essentials.`,
    highlights: [
      "4th floor in a G+13 building",
      "Well-ventilated 1 BHK flat",
      "Close to Gokul Dairy and local markets",
      "Peaceful residential society",
      "24-hour water supply",
    ],
    amenities: [
      "24-hour water supply",
      "Good ventilation",
      "Close to daily essentials",
      "Good connectivity",
      "Peaceful residential society",
    ],
    nearby: [
      "Gokul Dairy - 5 mins walk",
      "Local market",
      "Hospitals and daily essentials",
    ],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sector+18,+Kamothe,+Navi+Mumbai",
    externalLinks: [
      {
        label: "Nearby Landmark: Gokul Dairy",
        href: "https://www.google.com/maps/search/?api=1&query=Gokul+Dairy+Kamothe",
      },
    ],
    images: [
      "/properties/kamothe-1bhk-sector-18/images/001.jpeg",
      "/properties/kamothe-1bhk-sector-18/images/005.jpeg",
      "/properties/kamothe-1bhk-sector-18/images/009.jpeg",
      "/properties/kamothe-1bhk-sector-18/images/002.jpeg",
      "/properties/kamothe-1bhk-sector-18/images/007.jpeg",
      "/properties/kamothe-1bhk-sector-18/images/004.jpeg",
      "/properties/kamothe-1bhk-sector-18/images/003.jpeg",
      "/properties/kamothe-1bhk-sector-18/images/010.jpeg",
      "/properties/kamothe-1bhk-sector-18/images/008.jpeg",
      "/properties/kamothe-1bhk-sector-18/images/006.jpeg",
    ],
    videos: [],
    documents: [],
    seoTitle: "1 BHK Flat for Sale in Kamothe Sector 18 | Affordable Homes Navi Mumbai",
    metaDescription: "Buy a well-maintained 1 BHK flat in Kamothe Sector 18, Navi Mumbai. ₹65 Lakh, ready to move, near Gokul Dairy and essentials. Contact for best deals.",
    keywords: "1 BHK flat Kamothe Sector 18, buy flat Navi Mumbai, affordable homes Kamothe, Gokul Dairy nearby, ready to move flats Kamothe",
    ogImage: "/properties/kamothe-1bhk-sector-18/images/001.jpeg",
    schema: {
      "@context": "https://schema.org",
      "@type": "Accommodation",
      "name": "1 BHK Flat for Sale – Kamothe (Sector 18)",
      "description": "Well-maintained and spacious 1 BHK flat located in a peaceful residential colony with good ventilation and daily convenience nearby.",
      "numberOfRooms": 1,
      "occupancy": {
        "@type": "QuantitativeValue",
        "minValue": 1,
        "maxValue": 4
      },
      "floorSize": { "@type": "QuantitativeValue", "value": 650, "unitCode": "FTK" },
      "address": "Sector 18, Kamothe, Navi Mumbai",
      "url": "https://onestoppropertysolution.in/property/1-bhk-flat-kamothe-sector-18",
      "location": {
        "@type": "Place",
        "address": "Sector 18, Kamothe, Navi Mumbai"
      },
      "image": "https://onestoppropertysolution.in/properties/kamothe-1bhk-sector-18/images/001.jpeg"
    }
  }), enrichProperty(
  {
    id: "kamothe-2bhk-sector-8",
    slug: "2-bhk-flat-kamothe-sector-8",
    title: "2 BHK Flat for Sale – Kamothe (Sector 8)",
    type: "2 BHK",
    availableTypes: ["2 BHK"],
    category: "sale",
    price: 8500000,
    priceLabel: "₹85 Lakh",
    area: null,
    location: "Sector 8, Kamothe",
    city: "Navi Mumbai",
    floor: "2nd Floor",
    building: "G+4 Storey",
    facing: null,
    parking: false,
    furnished: "Not Furnished",
    possession: "Ready to Move",
    tags: ["featured", "premium"],
    shortDescription: "Spacious 2 BHK flat located in a prime main road touch location with excellent connectivity and easy access to daily essentials.",
    description: `2 BHK FLAT FOR SALE – KAMOTHE (SECTOR 8)
Property Overview
Spacious 2 BHK flat located in a prime main road touch location with excellent connectivity and easy access to daily essentials.
Location: Sector 8, Kamothe, Navi Mumbai
Building: G+4 Storey
Floor: 2nd Floor
Lift: Not Available

Property Details
Configuration: 2 BHK
Ventilation: Good ventilation
Water Supply: Regular
Property Type: Main road touch
Condition: Suitable for comfortable living

Location Advantages
Main road touch property
Excellent connectivity
Easy access to daily essentials.`,
    highlights: [
      "2nd floor in a G+4 building",
      "Main road touch location",
      "Good ventilation",
      "Excellent connectivity",
      "Easy access to daily essentials",
    ],
    amenities: [
      "Regular water supply",
      "Good ventilation",
      "Main road touch",
      "Excellent connectivity",
      "Suitable for comfortable living",
    ],
    nearby: [
      "Main road",
      "Daily essentials",
      "Good connectivity",
    ],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sector+8,+Kamothe,+Navi+Mumbai",
    externalLinks: [
      {
        label: "Kamothe Sector 8 Location",
        href: "https://www.google.com/maps/search/?api=1&query=Sector+8+Kamothe+Navi+Mumbai",
      },
    ],
    images: [
      "/properties/kamothe-2bhk-sector-8/images/003.jpeg",
      "/properties/kamothe-2bhk-sector-8/images/001.jpeg",
      "/properties/kamothe-2bhk-sector-8/images/005.jpeg",
      "/properties/kamothe-2bhk-sector-8/images/004.jpeg",
      "/properties/kamothe-2bhk-sector-8/images/002.jpeg",
      "/properties/kamothe-2bhk-sector-8/images/006.jpeg",
      "/properties/kamothe-2bhk-sector-8/images/007.jpeg",
    ],
    videos: [],
    documents: [],
    seoTitle: "2 BHK Flat for Sale in Kamothe Sector 8 | Premium Homes Navi Mumbai",
    metaDescription: "Buy a spacious 2 BHK flat in Kamothe Sector 8, Navi Mumbai. ₹85 Lakh, main road touch, excellent connectivity. Contact for best deals.",
    keywords: "2 BHK flat Kamothe Sector 8, buy flat Navi Mumbai, main road touch homes Kamothe",
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": "2 BHK Flat for Sale – Kamothe (Sector 8)",
      "description": "Spacious 2 BHK flat located in a prime main road touch location with excellent connectivity and easy access to daily essentials.",
      "url": "https://onestoppropertysolution.in/property/2-bhk-flat-kamothe-sector-8",
      "price": "8500000",
      "priceCurrency": "INR",
      "location": {
        "@type": "Place",
        "address": "Sector 8, Kamothe, Navi Mumbai"
      },
      "image": "https://onestoppropertysolution.in/properties/kamothe-2bhk-sector-8/images/003.jpeg"
    }
  }), enrichProperty(
  {
    id: "sai-world-city-panvel",
    slug: "sai-world-city-panvel",
    title: "Sai World City – Premium Residential Township in Panvel",
    type: "Residential Project",
    availableTypes: ["1 BHK", "2 BHK", "3 BHK"],
    category: "sale",
    price: null,
    priceLabel: "Price on Request",
    area: "38 Acres",
    location: "Palaspe Junction, Palaspe Phata, Panvel",
    city: "Navi Mumbai",
    floor: null,
    building: "13 Towers",
    facing: null,
    parking: true,
    furnished: "Unfurnished",
    possession: "Under Construction",
    tags: ["featured", "premium", "project"],
    shortDescription: "Sai World City is a large residential township inspired by world-famous cities. It offers modern homes with premium amenities and excellent connectivity.",
    description: `SAI WORLD CITY – PANVEL
Project Overview
Sai World City is a large residential township inspired by world-famous cities. It offers modern homes with premium amenities and excellent connectivity.       
Location: Palaspe Junction, Palaspe Phata, Panvel, Navi Mumbai
Total Land Area: 38 Acres
Open Space & Amenities: Approx. 50%
Total Towers: 13
Clubhouse: 50,000 sq. ft. (Club Vegas)

Project Phases
Phase 1 (RERA: P52000006318)
Towers: Marina, Opera, Acropolis (G+27 Floors)
Tower: Manhattan (G+31 Floors)
Configurations: 1, 2 & 3 BHK Homes`,
    highlights: [
      "38 Acres township",
      "13 Towers",
      "50,000 sq. ft. clubhouse",
      "Inspired by world-famous cities",
      "Premium amenities",
      "Excellent connectivity",
    ],
    amenities: [
      "Clubhouse (Club Vegas)",
      "Open spaces",
      "Modern amenities",
      "Premium facilities",
      "World-class design",
    ],
    nearby: [
      "Palaspe Junction",
      "Panvel City",
      "Navi Mumbai connectivity",
    ],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Palaspe+Junction,+Palaspe+Phata,+Panvel,+Navi+Mumbai",
    externalLinks: [
      {
        label: "Panvel Location",
        href: "https://www.google.com/maps/search/?api=1&query=Panvel+Navi+Mumbai",
      },
    ],
    images: [],
    videos: [
      "/properties/sai-world-city-panvel/videos/video001.mp4",
      "/properties/sai-world-city-panvel/videos/video002.mp4",
    ],
    documents: [
      "/properties/sai-world-city-panvel/documents/CostSheet_SWC_P1_P2_P3_28-10-2025.pdf",
      "/properties/sai-world-city-panvel/documents/PS_SWC_P2&3.pdf",
      "/properties/sai-world-city-panvel/documents/Brochure_SWC_HD.pdf",
    ],
    seoTitle: "Sai World City Panvel | Premium Residential Township Navi Mumbai",
    metaDescription: "Discover Sai World City in Panvel, Navi Mumbai. 38-acre township with 13 towers, premium amenities, and world-class design. Price on request.",
    keywords: "Sai World City Panvel, residential township Navi Mumbai, premium homes Panvel, 38 acre project",
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": "Sai World City – Premium Residential Township in Panvel",
      "description": "Sai World City is a large residential township inspired by world-famous cities. It offers modern homes with premium amenities and excellent connectivity.",
      "location": {
        "@type": "Place",
        "address": "Palaspe Junction, Palaspe Phata, Panvel, Navi Mumbai"
      },
      "image": "/properties/sai-world-city-panvel/videos/video001.mp4"
    }
  }), enrichProperty(
  {
    id: "unimont-imperia-signature-tower",
    slug: "unimont-imperia-signature-tower",
    title: "Unimont Imperia – Signature Tower (A Wing)",
    type: "Residential Project",
    availableTypes: ["1 BHK", "2 BHK"],
    category: "sale",
    price: null,
    priceLabel: "Starting from ₹24.75 Lakhs",
    area: null,
    location: "Unimont Imperia",
    city: "Navi Mumbai",
    floor: null,
    building: "G+14 Storey",
    facing: null,
    parking: true,
    furnished: "Unfurnished",
    possession: "Under Construction",
    tags: ["featured", "budget", "project"],
    shortDescription: "Signature Tower (A Wing) at Unimont Imperia offers well-designed 1 & 2 BHK homes with modern amenities and functional layouts.",
    description: `UNIMONT IMPERIA – SIGNATURE TOWER (A WING)     
Project Overview
Signature Tower (A Wing) at Unimont Imperia offers well-designed 1 & 2 BHK homes with modern amenities and functional layouts. The project focuses on affordability along with comfortable living.
Project Name: Unimont Imperia
Tower: Signature Tower – A Wing
Total Towers: 5
Structure: G+14 Storey
Construction Status: Approx. 70% Completed

Configuration & Pricing
1 BHK – Starting from ₹24.75 Lakhs*
2 BHK – Starting from ₹44.89 Lakhs*
EMI: Available`,
    highlights: [
      "Signature Tower A Wing",
      "1 & 2 BHK homes",
      "Modern amenities",
      "Functional layouts",
      "Affordable pricing",
      "70% construction completed",
    ],
    amenities: [
      "Modern amenities",
      "Functional layouts",
      "Comfortable living",
      "Affordable homes",
      "Quality construction",
    ],
    nearby: [
      "Navi Mumbai",
      "Well-connected area",
    ],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Unimont+Imperia+Navi+Mumbai",
    externalLinks: [
      {
        label: "Unimont Imperia Location",
        href: "https://www.google.com/maps/search/?api=1&query=Unimont+Imperia+Navi+Mumbai",
      },
    ],
    images: [
      "/properties/unimont-imperia-signature-tower/images/007.jpeg",
      "/properties/unimont-imperia-signature-tower/images/013.jpeg",
      "/properties/unimont-imperia-signature-tower/images/010.jpeg",
      "/properties/unimont-imperia-signature-tower/images/008.jpeg",
      "/properties/unimont-imperia-signature-tower/images/002.jpeg",
      "/properties/unimont-imperia-signature-tower/images/014.jpeg",
      "/properties/unimont-imperia-signature-tower/images/001.jpeg",
      "/properties/unimont-imperia-signature-tower/images/005.jpeg",
      "/properties/unimont-imperia-signature-tower/images/003.jpeg",
      "/properties/unimont-imperia-signature-tower/images/015.jpeg",
      "/properties/unimont-imperia-signature-tower/images/009.jpeg",
      "/properties/unimont-imperia-signature-tower/images/004.jpeg",
      "/properties/unimont-imperia-signature-tower/images/016.jpeg",
      "/properties/unimont-imperia-signature-tower/images/011.jpeg",
      "/properties/unimont-imperia-signature-tower/images/012.jpeg",
      "/properties/unimont-imperia-signature-tower/images/006.jpeg",
    ],
    videos: [],
    documents: [],
    seoTitle: "Unimont Imperia Signature Tower | Affordable 1 & 2 BHK Homes Navi Mumbai",
    metaDescription: "Buy 1 & 2 BHK homes in Unimont Imperia Signature Tower, Navi Mumbai. Starting from ₹24.75 Lakhs, modern amenities, 70% completed.",
    keywords: "Unimont Imperia Signature Tower, 1 BHK 2 BHK Navi Mumbai, affordable homes, under construction",
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": "Unimont Imperia – Signature Tower (A Wing)",
      "description": "Signature Tower (A Wing) at Unimont Imperia offers well-designed 1 & 2 BHK homes with modern amenities and functional layouts.",
      "location": {
        "@type": "Place",
        "address": "Unimont Imperia, Navi Mumbai"
      },
      "image": "/properties/unimont-imperia-signature-tower/images/007.jpeg"
    }
  }), enrichProperty(
  {
    id: "rudra-chapter-2",
    slug: "rudra-chapter-2",
    title: "Rudra Chapter 2 – Premium Residential Living",
    type: "Residential Project",
    availableTypes: ["1 BHK", "2 BHK"],
    category: "sale",
    price: 7000000,
    priceLabel: "₹70 Lakh onwards",
    area: 392,
    location: "Taloja",
    city: "Navi Mumbai",
    floor: null,
    building: "Residential Tower",
    facing: null,
    parking: true,
    furnished: "Unfurnished",
    possession: "Under Construction",
    tags: ["project", "featured"],
    shortDescription: "Rudra Chapter 2 offers modern living spaces in the heart of Karanjade, featuring contemporary architecture and lifestyle amenities.",
    description: `RUDRA CHAPTER 2 – KARANJADE
Property Overview
Rudra Chapter 2 is a newly launched residential project offering premium 1 & 2 BHK apartments. Designed for modern families, the project combines structural excellence with strategic location advantages.
Location: Taloja, Navi Mumbai
Status: Under Construction

Property Details
Configuration: 1 & 2 BHK
Amenities: Modern clubhouse, landscaped areas, and secure environment
Water Supply: 24 Hours

Location Advantages
Prime location in Taloja
Excellent connectivity to the upcoming International Airport
Proximity to schools, markets, and healthcare facilities.`,
    highlights: [
      "Strategic location in Karanjade",
      "Contemporary building design",
      "High-speed elevators",
      "Earthquake resistant structure",
      "Premium internal fittings",
    ],
    amenities: [
      "Clubhouse",
      "CCTV Security",
      "Power Backup",
      "Gated Community",
      "Kids Play Area",
    ],
    nearby: [
      "Upcoming International Airport",
      "Panvel Railway Station",
      "Local Schools and Hospitals",
    ],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Karanjade,+Navi+Mumbai",
    externalLinks: [],
    images: [
      "/properties/rudra-chapter-2/images/01.jpg",
    ],
    videos: [
      "/properties/rudra-chapter-2/videos/01.mp4",
      "/properties/rudra-chapter-2/videos/02.mp4",
    ],
    documents: [],
    seoTitle: "Rudra Chapter 2 Taloja | New Residential Project in Navi Mumbai",
    metaDescription: "Explore Rudra Chapter 2 in Karanjade, Navi Mumbai. Premium 1 & 2 BHK flats with modern amenities. Book your dream home in a fast-developing hub.",
    keywords: "Rudra Chapter 2 Karanjade, new projects in Karanjade, buy flat in Navi Mumbai, 1 BHK 2 BHK Karanjade",
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": "Rudra Chapter 2 – Premium Residential Living",
      "location": {
        "@type": "Place",
        "address": "Karanjade, Navi Mumbai"
      },
      "image": "/properties/rudra-chapter-2/images/01.jpg"
    }
  }), enrichProperty(
  {
    id: "karanjade-1bhk-kalash-chs",
    slug: "1bhk-semi-furnished-flat-karanjade-kalash-chs",
    title: "1 BHK Semi-Furnished Flat – Kalash CHS (Karanjade)",
    type: "1 BHK",
    availableTypes: ["1 BHK"],
    category: "sale",
    price: 4200000,
    priceLabel: "₹42 Lakh + Taxes",
    area: 650,
    location: "Karanjade",
    city: "Navi Mumbai",
    floor: "Middle Floor",
    building: "Kalash CHS",
    facing: "East-West",
    parking: true,
    furnished: "Semi-Furnished",
    possession: "Ready to Move",
    tags: ["featured", "budget"],
    shortDescription: "Beautifully maintained semi-furnished 1 BHK flat in Kalash CHS, Karanjade. Perfect for those looking for a ready-to-move-in home.",
    description: `1 BHK SEMI-FURNISHED FLAT FOR SALE – KALASH CHS
Property Overview
Move into this ready-to-occupy 1 BHK flat located in the well-known Kalash CHS in Karanjade. The flat is semi-furnished with essential woodwork and fittings.
Location: Kalash CHS, Karanjade, Navi Mumbai
Condition: Excellent / Ready to Move

Property Details
Configuration: 1 BHK
Furnishing: Kitchen cabinets, wardrobes, and light/fan fittings
Society: Well-maintained society with security

Location Advantages
Close to main market areas
Easy transport access to Panvel station
Peaceful residential locality.`,
    highlights: [
      "Ready to Move status",
      "Semi-furnished with quality woodwork",
      "Located in Kalash CHS",
      "Prime Karanjade location",
    ],
    amenities: [
      "Kitchen Cabinets",
      "24/7 Water Supply",
      "Intercom",
      "Security Guard",
    ],
    nearby: [
      "Panvel Railway Station",
      "Shopping Centers",
      "Healthcare Centers",
    ],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kalash+CHS,+Karanjade,+Navi+Mumbai",
    externalLinks: [],
    images: [
      "/properties/1bhk-semi-furnished-flat-karanjade-kalash-chs/images/01.png",
    ],
    videos: [
      "/properties/1bhk-semi-furnished-flat-karanjade-kalash-chs/videos/01.mp4",
      "/properties/1bhk-semi-furnished-flat-karanjade-kalash-chs/videos/02.mp4",
    ],
    documents: [],
    seoTitle: "1 BHK Flat for Sale in Kalash CHS Karanjade | ₹42 Lakh + Taxes",
    metaDescription: "Buy a semi-furnished 1 BHK flat in Kalash CHS, Karanjade. Ready to move, excellent condition, prime location in Navi Mumbai. Contact for price.",
    keywords: "1 BHK Kalash CHS Karanjade, semi-furnished flat Karanjade, buy flat Panvel, ready to move homes Navi Mumbai",
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": "1 BHK Semi-Furnished Flat – Kalash CHS (Karanjade)",
      "location": {
        "@type": "Place",
        "address": "Kalash CHS, Karanjade, Navi Mumbai"
      },
      "image": "/properties/1bhk-semi-furnished-flat-karanjade-kalash-chs/images/01.png"
    }
  }), enrichProperty(
  {
    id: "landmaark-lifestyle-navi-mumbai",
    slug: "landmaark-lifestyle-navi-mumbai",
    title: "Landmaark Lifestyle (La Palacio) – Premium Residential Project",
    type: "Residential Project",
    availableTypes: ["1 BHK", "2 BHK"],
    category: "sale",
    price: null,
    priceLabel: "Price on Request",
    area: "Premium Layouts",
    location: "Kharghar/Panvel, Navi Mumbai",
    city: "Navi Mumbai",
    floor: null,
    building: "High-Rise Tower",
    facing: null,
    parking: true,
    furnished: "Unfurnished",
    possession: "Under Construction",
    tags: ["project", "featured", "premium"],
    shortDescription: "Experience modern living at Landmaark Lifestyle (La Palacio). A premium residential project offering luxury apartments with world-class amenities in the heart of Navi Mumbai.",
    ogImage: "/properties/landmaark-lifestyle-navi-mumbai/images/01.jpeg",
    description: `LANDMAARK LIFESTYLE (LA PALACIO) – NAVI MUMBAI
Project Overview
Landmaark Lifestyle, featuring the magnificent La Palacio tower, is a signature residential development designed for those who seek elegance and comfort. Strategically located in Navi Mumbai, this project offers a blend of architectural excellence and functional living spaces.

Property Details
Configuration: 1 & 2 BHK Premium Residences
Status: Under Construction
Structure: Modern High-Rise
Water Supply: 24/7 Available
Security: Gated community with advanced surveillance

Amenities
- Modern Clubhouse & Gymnasium
- Landscaped Garden & Children's Play Area
- Jogging Track & Yoga Deck
- Senior Citizen Seating Area
- Ample Car Parking Space

Location Advantages
- Situated in a fast-developing residential hub of Navi Mumbai
- Excellent connectivity to upcoming International Airport
- Proximity to major Railway Stations and Highway Junctions
- Near reputed Schools, Hospitals, and Shopping Malls

Contact Section
For personalized site visits, floor plans, and detailed cost sheets, please get in touch with our sales team.`,
    highlights: [
      "Signature tower 'La Palacio'",
      "Premium 1 & 2 BHK configurations",
      "Earthquake resistant R.C.C structure",
      "Grand entrance lobby",
      "Proximity to upcoming infrastructure projects",
    ],
    amenities: [
      "Clubhouse",
      "Gymnasium",
      "Landscaped Garden",
      "CCTV Security",
      "Children's Play Area",
    ],
    nearby: [
      "Upcoming Navi Mumbai International Airport",
      "Proximity to Local Stations",
      "Hospitals and Educational Institutions",
    ],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Landmaark+Lifestyle+Navi+Mumbai",
    externalLinks: [],
    images: [
      "/properties/landmaark-lifestyle-navi-mumbai/images/01.jpeg",
      "/properties/landmaark-lifestyle-navi-mumbai/images/02.jpeg",
    ],
    videos: [],
    documents: [
      "/properties/landmaark-lifestyle-navi-mumbai/documents/Brochure.pdf",
      "/properties/landmaark-lifestyle-navi-mumbai/documents/LANDMARK_LA_PALACIO_COST_SHEET.pdf",
    ],
    seoTitle: "Landmaark Lifestyle Navi Mumbai | La Palacio 1 & 2 BHK Residences",
    metaDescription: "Explore Landmaark Lifestyle (La Palacio) in Navi Mumbai. Premium under-construction 1 & 2 BHK flats with modern amenities and strategic connectivity. Download Brochure.",
    keywords: "Landmaark Lifestyle Navi Mumbai, La Palacio project, new projects in Navi Mumbai, buy 1 BHK 2 BHK Panvel Kharghar",
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateListing", 
      "name": "Landmaark Lifestyle – Premium Residential Project",
      "url": "https://onestoppropertysolution.in/property/landmaark-lifestyle-navi-mumbai",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kharghar/Panvel",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "telephone": "+91-9870178204",
      "priceRange": "Price on Request",
      "image": "/properties/landmaark-lifestyle-navi-mumbai/images/01.jpeg"
    }
  }), enrichProperty(
  {
    id: "tejas-vaishnavi",
    slug: "tejas-vaishnavi-kamothe",
    title: "Tejas Vaishnavi – Premium Residential Project",
    type: "Residential Project",
    availableTypes: ["1 BHK", "2 BHK"],
    category: "sale",
    price: null,
    priceLabel: "Price on Request",
    area: "Modern Layouts",
    location: "Kamothe",
    city: "Navi Mumbai",
    floor: null,
    building: "High-Rise Tower",
    facing: null,
    parking: true,
    furnished: "Unfurnished",
    possession: "Under Construction",
    tags: ["project", "featured"],
    shortDescription: "Experience modern living at Tejas Vaishnavi, a premium residential project in Kamothe offering elegant 1 & 2 BHK homes with top-tier amenities.",
    description: `TEJAS VAISHNAVI – KAMOTHE
Project Overview
Tejas Vaishnavi is a signature residential development designed for elegance and comfort. Strategically located in Kamothe, this project offers a perfect blend of architectural excellence and functional living.

Property Details
- Configuration: 1 & 2 BHK Premium Residences
- Status: Under Construction
- Connectivity: Excellent access to Mansarovar & Khandeshwar stations
- Security: Gated community with modern surveillance`,
    highlights: [
      "Strategic location in Kamothe",
      "Modern building elevation",
      "Premium internal fittings",
      "Proximity to schools and hospitals",
    ],
    amenities: [
      "Grand Entrance Lobby",
      "High-speed Elevators",
      "24/7 Water Supply",
      "Fire Fighting System",
    ],
    nearby: [
      "Mansarovar Railway Station",
      "Khandeshwar Railway Station",
      "MGM Hospital",
    ],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kamothe,+Navi+Mumbai",
    externalLinks: [],
    images: [
      "/properties/tejas-vaishnavi/images/01.jpg",
      "/properties/tejas-vaishnavi/images/02.jpg",
    ],
    videos: [
      "/properties/tejas-vaishnavi/videos/01.mp4",
      "/properties/tejas-vaishnavi/videos/02.mp4",
      "/properties/tejas-vaishnavi/videos/03.mp4",
    ],
    documents: [
      "/properties/tejas-vaishnavi/documents/Brochure.pdf",
      "/properties/tejas-vaishnavi/documents/02.jpeg",
    ],
    seoTitle: "Tejas Vaishnavi Kamothe | Premium 1 & 2 BHK Residences",
    metaDescription: "Explore Tejas Vaishnavi in Kamothe, Navi Mumbai. Modern under-construction 1 & 2 BHK flats with prime connectivity and amenities.",
    keywords: "Tejas Vaishnavi Kamothe, new projects Navi Mumbai, buy 1 BHK 2 BHK Kamothe",
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": "Tejas Vaishnavi – Premium Residential Project",
      "location": { "@type": "Place", "address": "Kamothe, Navi Mumbai" },
      "image": "/properties/tejas-vaishnavi/images/01.jpg"
    }
  }), enrichProperty(
  {
    id: "fully-furnished-1bhk-sale-kamothe",
    slug: "fully-furnished-1bhk-sale-kamothe-navi-mumbai",
    title: "Exquisite Fully Furnished 1 BHK Flat for Sale",
    type: "1 BHK",
    availableTypes: ["1 BHK"],
    category: "sale",
    price: null,
    priceLabel: "Price on Request",
    area: 650,
    location: "Kamothe",
    city: "Navi Mumbai",
    floor: "Middle Floor",
    building: "Residential CHS",
    facing: "East-West",
    parking: true,
    furnished: "Fully Furnished",
    possession: "Ready to Move",
    tags: ["featured", "budget"],
    shortDescription: "Move into a beautifully maintained, fully furnished 1 BHK flat in the heart of Kamothe. Perfect for families looking for a turn-key home.",
    description: `FULLY FURNISHED 1 BHK FLAT FOR SALE – KAMOTHE
Property Overview
This ready-to-occupy 1 BHK flat comes with complete woodwork, designer furniture, and modern electrical fittings. Located in a peaceful society with excellent connectivity.

Property Details
- Configuration: 1 BHK
- Furnishing: Fully Furnished (Wardrobes, Sofa, Bed, Modular Kitchen)
- Condition: Excellent / Well-maintained`,
    highlights: [
      "Ready to Move status",
      "Complete designer furniture included",
      "Well-ventilated living spaces",
      "Close to major amenities",
    ],
    amenities: [
      "Modular Kitchen",
      "Intercom Facility",
      "Security Guard",
      "Parking Space",
    ],
    nearby: ["Local Markets", "Railway Station", "Schools & Colleges"],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kamothe,+Navi+Mumbai",
    externalLinks: [],
    images: [
      "/properties/fully-furnished-1bhk-sale-kamothe-navi-mumbai/images/001.jpeg",
      "/properties/fully-furnished-1bhk-sale-kamothe-navi-mumbai/images/002.jpeg",
      "/properties/fully-furnished-1bhk-sale-kamothe-navi-mumbai/images/003.jpeg",
      "/properties/fully-furnished-1bhk-sale-kamothe-navi-mumbai/images/004.jpeg",
      "/properties/fully-furnished-1bhk-sale-kamothe-navi-mumbai/images/005.jpeg",
      "/properties/fully-furnished-1bhk-sale-kamothe-navi-mumbai/images/006.jpeg",
      "/properties/fully-furnished-1bhk-sale-kamothe-navi-mumbai/images/007.jpeg",
      "/properties/fully-furnished-1bhk-sale-kamothe-navi-mumbai/images/008.jpeg",
    ],
    videos: [],
    documents: [],
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": "Exquisite Fully Furnished 1 BHK Flat for Sale",
      "image": "/properties/fully-furnished-1bhk-sale-kamothe-navi-mumbai/images/001.jpeg"
    }
  }), enrichProperty(
  {
    id: "2bhk-kamothe-sector-21-higher-floor",
    slug: "2bhk-flat-for-sale-kamothe-sector-21-higher-floor-navi-mumbai",
    title: "Spacious 2 BHK on Higher Floor – Sector 21, Kamothe",
    type: "2 BHK",
    availableTypes: ["2 BHK"],
    category: "sale",
    price: null,
    priceLabel: "Price on Request",
    area: 1025,
    location: "Sector 21, Kamothe",
    city: "Navi Mumbai",
    floor: "Higher Floor",
    building: "Premium Tower",
    facing: "Open View",
    parking: true,
    furnished: "Unfurnished",
    possession: "Ready to Move",
    tags: ["featured", "hot"],
    shortDescription: "High-floor 2 BHK flat offering panoramic city views and exceptional ventilation in Sector 21, Kamothe.",
    description: `2 BHK FLAT FOR SALE – SECTOR 21, KAMOTHE
A well-designed 2 BHK apartment located on a higher floor of a premium building in Sector 21. The flat enjoys abundant natural light and an open view.`,
    highlights: ["Higher floor advantage", "Unobstructed open views", "Prime location in Sector 21"],
    amenities: ["Ample Parking", "24/7 Security", "Lift Facility"],
    nearby: ["Jeevan Jyot Hospital", "Kamothe Railway Station"],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sector+21,+Kamothe,+Navi+Mumbai",
    images: ["/properties/2bhk-flat-for-sale-kamothe-sector-21-higher-floor-navi-mumbai/images/01.png"],
    videos: ["/properties/2bhk-flat-for-sale-kamothe-sector-21-higher-floor-navi-mumbai/videos/01.mp4"],
    documents: [],
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": "Spacious 2 BHK on Higher Floor – Sector 21, Kamothe",
      "image": "/properties/2bhk-flat-for-sale-kamothe-sector-21-higher-floor-navi-mumbai/images/01.png"
    }
  }), enrichProperty(
  {
    id: "codename-delta-terminal-pushpak-nagar",
    slug: "codename-delta-terminal-pushpak-nagar",
    title: "Codename Delta Terminal – Premium Residential Project",
    type: "Residential Project",
    availableTypes: ["1 BHK", "2 BHK"],
    category: "sale",
    price: null,
    priceLabel: "Price on Request",
    area: "Modern Layouts",
    location: "Pushpak Nagar",
    city: "Navi Mumbai",
    floor: null,
    building: "Premium Towers",
    facing: null,
    parking: true,
    furnished: "Unfurnished",
    possession: "Under Construction",
    tags: ["project", "featured", "premium", "new-launch"],
    shortDescription: "Experience modern living at Codename Delta Terminal in the rapidly developing Pushpak Nagar hub near the upcoming International Airport.",
    description: `CODENAME DELTA TERMINAL – PUSHPAK NAGAR
Project Overview
Codename Delta Terminal is a landmark residential development designed for the future. Strategically located in Pushpak Nagar, it offers a perfect blend of high-growth investment potential and a luxury lifestyle.

Property Details
- Configuration: 1 & 2 BHK Premium Residences
- Status: Under Construction
- Connectivity: Prime location with proximity to the upcoming International Airport and MTHL.
- Security: Advanced gated community features.`,
    highlights: [
      "Strategic location in Pushpak Nagar",
      "Proximity to Navi Mumbai International Airport",
      "Modern lifestyle amenities",
      "High potential for ROI"
    ],
    amenities: ["Clubhouse", "Gymnasium", "Landscaped Garden", "CCTV Security", "Kids Play Area"],
    nearby: ["International Airport", "MTHL Connectivity", "Local Markets"],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pushpak+Nagar,+Navi+Mumbai",
    images: [
      "/properties/codename-delta-terminal-pushpak-nagar/images/01.jpeg",
      "/properties/codename-delta-terminal-pushpak-nagar/images/02.jpeg",
      "/properties/codename-delta-terminal-pushpak-nagar/images/03.jpeg",
      "/properties/codename-delta-terminal-pushpak-nagar/images/04.jpeg",
      "/properties/codename-delta-terminal-pushpak-nagar/images/05.jpg",
    ],
    videos: ["/properties/codename-delta-terminal-pushpak-nagar/videos/01.mp4"],
    documents: [
      "/properties/codename-delta-terminal-pushpak-nagar/documents/Brochure.pdf",
      "/properties/codename-delta-terminal-pushpak-nagar/documents/CP_Ladder.jpeg"
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": "Codename Delta Terminal",
      "image": "/properties/codename-delta-terminal-pushpak-nagar/images/01.jpeg"
    }
  }), enrichProperty(
  {
    id: "furnished-2bhk-kamothe-sector-22",
    slug: "furnished-2bhk-kamothe-sector-22",
    title: "Fully Furnished 2 BHK Flat – Sector 22, Kamothe",
    type: "2 BHK",
    availableTypes: ["2 BHK"],
    category: "sale",
    price: 7800000,
    priceLabel: "₹78 Lakh",
    area: 1050,
    location: "Sector 22, Kamothe",
    city: "Navi Mumbai",
    floor: "7th Floor",
    building: "Residential CHS",
    facing: "East-West",
    parking: true,
    furnished: "Fully Furnished",
    possession: "Ready to Move",
    tags: ["featured", "furnished", "ready-to-move"],
    shortDescription: "Beautifully maintained, ready-to-move-in fully furnished 2 BHK flat in the heart of Sector 22, Kamothe.",
    description: "This move-in ready 2 BHK apartment comes with complete high-quality woodwork, modular kitchen, and modern furniture. Situated in a prime residential sector with all daily conveniences within walking distance.",
    highlights: ["Fully furnished with designer interiors", "7th floor with great ventilation", "Ready to move in"],
    amenities: ["Modular Kitchen", "Intercom", "Security", "Reserved Parking"],
    nearby: ["Local Schools", "Sector 22 Market", "Hospitals"],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sector+22,+Kamothe,+Navi+Mumbai",
    images: ["/properties/furnished-2bhk-kamothe-sector-22/images/01.png"],
    videos: ["/properties/furnished-2bhk-kamothe-sector-22/videos/01.mp4"],
    documents: []
  }), enrichProperty(
  {
    id: "3bhk-flat-sale-maitree-street-kamothe",
    slug: "3bhk-flat-sale-maitree-street-kamothe",
    title: "Spacious 3 BHK Flat – Maitree Street, Kamothe",
    type: "3 BHK",
    availableTypes: ["3 BHK"],
    category: "sale",
    price: 12500000,
    priceLabel: "₹1.25 Cr",
    area: 1450,
    location: "Maitree Street, Kamothe",
    city: "Navi Mumbai",
    floor: "Middle Floor",
    building: "Premium Residency",
    tags: ["featured", "luxury", "spacious"],
    shortDescription: "Premium 3 BHK flat available for sale at Maitree Street, Kamothe, offering expansive living spaces and excellent ventilation.",
    description: "Experience luxury in this spacious 3 BHK apartment located on the highly connected Maitree Street. The property features large rooms, premium finishes, and is surrounded by top-tier infrastructure.",
    highlights: ["Extra large living area", "Prime location on Maitree Street", "Excellent natural light"],
    amenities: ["High-speed Lifts", "24/7 Power Backup", "Clubhouse Access"],
    nearby: ["Railway Station", "Maitree Street Hub", "Banks & ATMs"],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Maitree+Street,+Kamothe,+Navi+Mumbai",
    images: ["/properties/3bhk-flat-sale-maitree-street-kamothe/images/01.png"],
    videos: ["/properties/3bhk-flat-sale-maitree-street-kamothe/videos/01.mp4"],
    documents: []
  }), enrichProperty(
  {
    id: "2bhk-flat-haware-nirmiti-sector-22-kamothe",
    slug: "2bhk-flat-haware-nirmiti-sector-22-kamothe",
    title: "2 BHK Flat in Haware Nirmiti, Sector 22 Kamothe",
    type: "2 BHK",
    availableTypes: ["2 BHK"],
    category: "sale",
    price: 8300000,
    priceLabel: "₹82–85 Lakhs (Negotiable)",
    area: null,
    location: "Sector 22, Kamothe",
    city: "Navi Mumbai",
    floor: "Higher Floor",
    building: "Haware Nirmiti",
    facing: null,
    parking: true,
    furnished: "Unfurnished",
    possession: "Ready to Move",
    tags: ["featured", "ready-to-move"],
    shortDescription: "Spacious 2 BHK flat in Haware Nirmiti, Sector 22 with open views and covered car parking. Prime residential location with excellent connectivity to schools, markets, and hospitals.",
    description: `2 BHK FLAT IN HAWARE NIRMITI, SECTOR 22 KAMOTHE

Property Overview
Looking for a spacious and well-located home in Kamothe? This 2 BHK flat in Haware Nirmiti, Sector 22 is a perfect opportunity for homebuyers and investors alike.

Location: Sector 22, Kamothe, Navi Mumbai
Building: Haware Nirmiti
Floor: Higher Floor with Open View

Property Highlights
- Situated on a higher floor with beautiful open view
- Ample natural light and ventilation throughout the day
- Covered car parking included
- Well-maintained building
- Prime location with excellent connectivity

Location Advantages
- Close to schools, markets, hospitals
- Good transport facilities
- Excellent connectivity to major areas
- Urgent sale – great deal

Ideal For
- Families looking for comfortable home
- Investors seeking good returns in Navi Mumbai`,
    highlights: [
      "Higher floor with open view",
      "Covered car parking",
      "Well-maintained Haware Nirmiti building",
      "Prime Sector 22 location",
      "Excellent connectivity",
      "Urgent sale with negotiable price"
    ],
    amenities: [
      "Covered car parking",
      "Natural light and ventilation",
      "Open view",
      "Well-maintained building",
      "Good connectivity"
    ],
    nearby: ["Schools", "Markets", "Hospitals", "Transport Facilities"],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sector+22,+Kamothe,+Navi+Mumbai",
    images: ["/properties/2bhk-flat-haware-nirmiti-sector-22-kamothe/images/01.png"],
    videos: ["/properties/2bhk-flat-haware-nirmiti-sector-22-kamothe/videos/01.mp4"],
    documents: []
  }), enrichProperty(
  {
    id: "welkin-imperial-one-kalamboli-navi-mumbai",
    slug: "welkin-imperial-one-kalamboli-navi-mumbai",
    title: "Welkin Imperial – Codename One (Premium Residential Tower, Kalamboli)",
    type: "Residential Project",
    availableTypes: ["1 BHK", "2 BHK", "3 BHK"],
    category: "sale",
    price: null,
    priceLabel: "1 BHK from ₹56 Lakhs | 2 BHK from ₹77 Lakhs | 3 BHK from ₹1.20 Cr",
    area: "CIDCO Tender Plot",
    location: "Kalamboli",
    city: "Navi Mumbai",
    floor: null,
    building: "G+20 Standalone Tower",
    facing: null,
    parking: true,
    furnished: "Unfurnished",
    possession: "Under Construction",
    tags: ["featured", "project", "premium", "new-launch"],
    shortDescription: "Premium residential project - Welkin Imperial at Kalamboli. G+20 standalone tower with luxury amenities, RERA & CC approved, offering spacious 1, 2 & 3 BHK apartments with excellent NH48 connectivity.",
    description: `WELKIN IMPERIAL – CODENAME ONE (KALAMBOLI)

Project Overview
Discover elevated living at Welkin Imperial, a premium G+20 standalone tower located in the heart of Kalamboli on a CIDCO tender plot. This RERA & CC approved residential + commercial project is designed for modern families seeking luxury, connectivity, and convenience.

Offering thoughtfully designed 1, 2 & 3 BHK apartments, this project blends spacious layouts with world-class amenities and excellent connectivity to NH48, making it an ideal choice for both homebuyers and investors.

Project Specifications
- Building Type: G+20 Standalone Tower
- Plot Type: CIDCO Tender Plot
- Status: RERA & CC Approved
- Development: Residential + Commercial
- Location: Main Road, Kalamboli

Floor Plan Options
- 1 BHK: 740 / 755 sq.ft
- 2 BHK: 1005 / 1075 / 1240 sq.ft
- 3 BHK: 1580 – 1725 sq.ft

Luxury Amenities
- Swimming Pool
- Fully Equipped Gym
- Jogging Track
- Yoga Lawn
- Indoor & Outdoor Games
- Library
- Senior Citizen Area
- Multipurpose Hall

Premium Features
- 24/7 Security System
- Assisted Desk Service
- Digital Door Locks
- Covered + Open Parking

Location Advantages
- Located on Main Road, Kalamboli
- Excellent connectivity to NH48
- Close to D-Mart
- Nearby Schools, Hospitals & Banks
- Easy access to Panvel, Kharghar & Kamothe

Investment Opportunity
- Limited Terrace Flats Available (5th Floor)
- Spot Booking Offers Available – Limited Time
- Prime location with high growth potential`,
    highlights: [
      "G+20 standalone premium tower",
      "CIDCO tender plot with RERA & CC approval",
      "Luxury amenities – swimming pool, gym, yoga lawn",
      "1, 2 & 3 BHK spacious layouts",
      "Excellent NH48 connectivity",
      "Prime Kalamboli location",
      "Limited terrace flats available"
    ],
    amenities: [
      "Swimming Pool",
      "Fully Equipped Gym",
      "Jogging Track",
      "Yoga Lawn",
      "Indoor & Outdoor Games",
      "Library",
      "Senior Citizen Area",
      "Multipurpose Hall",
      "24/7 Security",
      "Digital Door Locks",
      "Covered + Open Parking"
    ],
    nearby: [
      "D-Mart",
      "Schools & Hospitals",
      "Banks & ATMs",
      "Panvel",
      "Kharghar",
      "Kamothe"
    ],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Kalamboli,+Main+Road,+Navi+Mumbai",
    images: ["/properties/welkin-imperial-one-kalamboli-navi-mumbai/images/01.jpg"],
    videos: ["/properties/welkin-imperial-one-kalamboli-navi-mumbai/videos/01.mp4"],
    documents: [],
    seoTitle: "Welkin Imperial Kalamboli | Premium G+20 Residential Tower Navi Mumbai",
    metaDescription: "Welkin Imperial (Codename One) in Kalamboli - RERA approved premium residential tower. 1/2/3 BHK luxury apartments from ₹56 Lakhs. Excellent NH48 connectivity.",
    keywords: "Welkin Imperial Kalamboli, premium residential tower Navi Mumbai, 1 2 3 BHK apartments, RERA approved project Kalamboli",
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": "Welkin Imperial – Premium Residential Tower, Kalamboli",
      "description": "Premium G+20 residential tower with luxury amenities, RERA & CC approved, offering 1, 2 & 3 BHK apartments with excellent NH48 connectivity.",
      "location": {
        "@type": "Place",
        "address": "Main Road, Kalamboli, Navi Mumbai"
      },
      "image": "/properties/welkin-imperial-one-kalamboli-navi-mumbai/images/01.jpg"
    }
  }), enrichProperty(
  {
    id: "2bhk-flat-rent-tricity-luxuria-sector-17-new-panvel",
    slug: "2bhk-flat-rent-tricity-luxuria-sector-17-new-panvel",
    title: "2 BHK Flat for Rent in Tricity Luxuria, Sector 17 New Panvel",
    type: "2 BHK",
    availableTypes: ["2 BHK"],
    category: "rent",
    price: 31500,
    priceLabel: "INR 31,500/month",
    area: null,
    location: "Sector 17, Khanda Colony, New Panvel",
    city: "Navi Mumbai",
    floor: null,
    building: "Tricity Luxuria",
    facing: null,
    parking: true,
    furnished: "Semi Furnished",
    possession: "Available from 20 May",
    tags: ["featured", "rent", "ready-to-move"],
    shortDescription: "Well-maintained 2 BHK flat for rent in Tricity Luxuria, Sector 17, Khanda Colony, New Panvel, ideal for families looking for a comfortable home in a prime location.",
    description: `2 BHK Flat for Rent in Tricity Luxuria, Sector 17 New Panvel (Khanda Colony)

A well-maintained 2 BHK flat available for rent in Tricity Luxuria, located in Sector 17, Khanda Colony, New Panvel. This property is ideal for families looking for a comfortable home in a prime and well-connected area.

The flat comes with a modular kitchen, 24-hour water supply, and parking facility, ensuring a convenient and hassle-free lifestyle. The location offers excellent connectivity, being just near Khandeshwar Railway Station, with easy access to daily essentials and transport.

Possession Available from: 20 May

Rental Details
- Rent: INR 31,500 (Final)
- Goodwill: INR 4 Lakhs

Location
- Sector 17, Khanda Colony, New Panvel
- Near Khandeshwar Railway Station
- Nearby schools, markets and daily essentials`,
    highlights: [
      "2 BHK spacious apartment",
      "Modular kitchen",
      "Parking available",
      "Well-connected Sector 17 location",
      "Close to Khandeshwar Railway Station",
      "Possession available from 20 May"
    ],
    amenities: [
      "Modular Kitchen",
      "24x7 Water Supply",
      "Parking",
      "Good Connectivity",
      "Close to Daily Essentials"
    ],
    nearby: [
      "Khandeshwar Railway Station",
      "Schools",
      "Markets",
      "Daily Essentials",
      "Transport Facilities"
    ],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Tricity+Luxuria,+Sector+17,+Khanda+Colony,+New+Panvel,+Navi+Mumbai",
    images: ["/properties/New folder/2bhk-flat-rent-tricity-luxuria-sector-17-new-panvel/images/01.png"],
    videos: ["/properties/New folder/2bhk-flat-rent-tricity-luxuria-sector-17-new-panvel/videos/01.mp4"],
    documents: []
  }), enrichProperty(
  {
    id: "2bhk-flat-akshar-geomatrix-sector-25-khandeshwar",
    slug: "2bhk-flat-akshar-geomatrix-sector-25-khandeshwar",
    title: "2 BHK Flat for Sale in Akshar Geomatrix, Sector 25 Khandeshwar",
    type: "2 BHK",
    availableTypes: ["2 BHK"],
    category: "sale",
    price: 12500000,
    priceLabel: "INR 1.25 Cr (Negotiable)",
    area: null,
    location: "Sector 25, Khandeshwar",
    city: "Navi Mumbai",
    floor: "Higher Floor",
    building: "Akshar Geomatrix",
    facing: "Station Facing",
    parking: true,
    furnished: "Unfurnished",
    possession: "Ready to Move",
    tags: ["featured", "premium", "ready-to-move"],
    shortDescription: "Spacious higher-floor 2 BHK flat in Akshar Geomatrix, Sector 25 Khandeshwar with station-facing open views and excellent connectivity.",
    description: `2 BHK Flat for Sale in Akshar Geomatrix, Sector 25 Khandeshwar

Looking for a premium home in a prime Navi Mumbai location? This spacious 2 BHK flat in Akshar Geomatrix, Sector 25 Khandeshwar offers modern living with excellent connectivity and a peaceful lifestyle.

Located on a higher floor, this station-facing apartment enjoys beautiful open views, ample natural light, and excellent ventilation throughout the day. Situated just steps away from Khandeshwar Railway Station, the property is ideal for families and working professionals seeking convenience and comfort.

The society offers modern amenities including 24x7 security, CCTV surveillance, parking, lift access, gym/club facilities, and kids play area, ensuring a complete lifestyle experience.

Expected Price: INR 1.25 Cr (Negotiable)`,
    highlights: [
      "Spacious 2 BHK apartment",
      "Higher floor with station-facing view",
      "Prime location near Khandeshwar Railway Station",
      "Excellent natural light and ventilation",
      "Modern amenities and secure society",
      "Well-maintained residential complex",
      "Ideal for families and investment"
    ],
    amenities: [
      "Lift",
      "24x7 Security",
      "CCTV Surveillance",
      "Parking Facility",
      "Garden / Kids Play Area",
      "Gym & Club Facilities"
    ],
    nearby: [
      "Khandeshwar Railway Station",
      "Panvel",
      "Navi Mumbai",
      "Schools",
      "Hospitals",
      "Markets",
      "Banks"
    ],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Akshar+Geomatrix,+Sector+25,+Khandeshwar,+Navi+Mumbai",
    images: ["/properties/2bhk-flat-akshar-geomatrix-sector-25-khandeshwar/images/01.jpeg"],
    videos: [],
    documents: [],
    seoTitle: "2 BHK Flat for Sale in Akshar Geomatrix Khandeshwar | Sector 25 Navi Mumbai",
    metaDescription: "Buy a spacious 2 BHK flat in Akshar Geomatrix, Sector 25 Khandeshwar. Higher floor, station-facing open view, modern amenities, near Khandeshwar Railway Station.",
    keywords: "2 BHK Akshar Geomatrix Khandeshwar, flat for sale Sector 25 Khandeshwar, station facing flat Navi Mumbai, property near Khandeshwar railway station",
    ogImage: "/properties/2bhk-flat-akshar-geomatrix-sector-25-khandeshwar/images/01.jpeg",
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": "2 BHK Flat for Sale in Akshar Geomatrix, Sector 25 Khandeshwar",
      "description": "Spacious higher-floor 2 BHK flat in Akshar Geomatrix with station-facing open views and excellent connectivity.",
      "location": {
        "@type": "Place",
        "address": "Akshar Geomatrix, Sector 25, Khandeshwar, Navi Mumbai"
      },
      "image": "/properties/2bhk-flat-akshar-geomatrix-sector-25-khandeshwar/images/01.jpeg"
    }
  }), enrichProperty(
  {
    id: "venice-of-mumbai-3-riverfront-plots-karjat",
    slug: "venice-of-mumbai-3-riverfront-plots-karjat",
    title: "Venice of Mumbai 3.0 - Luxury Riverfront Plotted Development in Karjat",
    type: "NA Villa Plots",
    availableTypes: ["Villa Plots", "Weekend Home Plots", "Investment Plots"],
    category: "plotted-development",
    price: null,
    priceLabel: "Price on Request",
    area: "2,280 - 7,315 sq.ft plots",
    location: "Karjat",
    city: "Raigad",
    floor: null,
    building: "108 Premium NA Villa Plots",
    facing: "Riverfront",
    parking: true,
    furnished: "Land Parcel",
    possession: "Expected March 2027",
    tags: ["featured", "premium", "plotted-development", "riverfront"],
    shortDescription: "Premium gated riverfront NA plotted development in Karjat by Tulsi Realty, spread across 12 acres with 108 villa plots and clubhouse amenities.",
    description: `Venice of Mumbai 3.0 - Luxury Riverfront Plotted Development in Karjat

Discover a premium investment and lifestyle opportunity at Venice of Mumbai 3.0, an exclusive riverfront gated plotted development in Karjat by Tulsi Realty. Strategically located in the rapidly developing Mumbai 3.0 corridor, this luxury project offers the perfect blend of nature, connectivity, and future appreciation.

Spread across 12 acres, the development features 108 premium NA villa plots ranging from 2,280 sq.ft to 7,315 sq.ft, thoughtfully planned for luxury villas, weekend homes, and long-term real estate investment.

With peaceful riverfront surroundings, modern infrastructure, and strong government-backed infrastructure growth nearby, Venice of Mumbai 3.0 is positioned as one of the most promising plotted developments near Mumbai.

Expected Possession: March 2027`,
    highlights: [
      "Premium gated NA plotted development",
      "108 exclusive villa plots",
      "Riverfront plotted inventory",
      "Plot sizes from 2,280 to 7,315 sq.ft",
      "R-Zone residential land",
      "Municipal approved location",
      "Clear title assurance",
      "High FSI up to 2.54",
      "Excellent future appreciation potential"
    ],
    amenities: [
      "25,000+ sq.ft Clubhouse",
      "Swimming Pool",
      "Jogging & Cycling Track",
      "River Viewing Deck",
      "Cafe by the River",
      "Meditation Lawn & Temple Area",
      "Amphitheatre",
      "Kids Play Area",
      "Pet Park",
      "Landscaped Open Spaces",
      "Wide Internal Roads",
      "Underground Electricity System",
      "Underground Water Infrastructure",
      "Rainwater Harvesting & Drainage Systems",
      "Gated Security & Controlled Access"
    ],
    nearby: [
      "Karjat Railway Station - 5 Minutes",
      "Matheran - 15 Minutes",
      "Panvel - 40 Minutes",
      "Navi Mumbai International Airport - 40 Minutes",
      "Lonavala - 40 Minutes",
      "Radisson Blu Karjat - 10 Minutes",
      "ND Studio - 10 Minutes"
    ],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Karjat,+Raigad,+Maharashtra",
    images: [
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/01.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/02.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/03.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/04.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/05.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/06.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/07.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/08.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/09.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/10.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/11.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/12.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/13.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/14.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/15.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/16.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/17.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/18.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/19.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/20.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/21.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/22.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/23.jpeg",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/24.jpeg"
    ],
    videos: [
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/videos/01.mp4",
      "/properties/venice-of-mumbai-3-riverfront-plots-karjat/videos/02.mp4"
    ],
    documents: [
      {
        href: "/properties/venice-of-mumbai-3-riverfront-plots-karjat/documents/Tulsi-OppDoc-FINAL.pdf",
        label: "Tulsi Opportunity Document"
      },
      {
        href: "/properties/venice-of-mumbai-3-riverfront-plots-karjat/documents/Tulsi-RERA-Certificate.pdf",
        label: "Tulsi RERA Certificate"
      }
    ],
    seoTitle: "Venice of Mumbai 3.0 Karjat | Riverfront NA Villa Plots Near Mumbai",
    metaDescription: "Explore Venice of Mumbai 3.0 in Karjat, a 12-acre riverfront gated NA plotted development by Tulsi Realty with 108 villa plots, clubhouse amenities and March 2027 possession.",
    keywords: "Venice of Mumbai 3.0 Karjat, riverfront plots Karjat, NA villa plots near Mumbai, plotted development Karjat, weekend home plots, Tulsi Realty Karjat",
    ogImage: "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/01.jpeg",
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": "Venice of Mumbai 3.0 - Luxury Riverfront Plotted Development in Karjat",
      "description": "Premium gated riverfront NA plotted development in Karjat by Tulsi Realty with 108 villa plots across 12 acres.",
      "location": {
        "@type": "Place",
        "address": "Karjat, Raigad, Maharashtra"
      },
      "image": "/properties/venice-of-mumbai-3-riverfront-plots-karjat/images/01.jpeg"
    }
  }), enrichProperty(
  {
    id: "2bhk-semi-furnished-rent-juhi-niharika-sector-10-kamothe",
    slug: "2bhk-semi-furnished-rent-juhi-niharika-sector-10-kamothe",
    title: "Semi-Furnished 2 BHK Flat for Rent in Juhi Niharika, Sector 10 Kamothe",
    type: "2 BHK",
    availableTypes: ["2 BHK"],
    category: "rent",
    price: 31000,
    priceLabel: "INR 31,000/month",
    area: null,
    location: "Sector 10, Kamothe",
    city: "Navi Mumbai",
    floor: null,
    building: "Juhi Niharika",
    facing: null,
    parking: false,
    furnished: "Semi Furnished",
    possession: "Ready to Move",
    tags: ["featured", "rent", "semi-furnished"],
    shortDescription: "Well-located 2 BHK semi-furnished flat for rent in Juhi Niharika, Sector 10, Kamothe, with essential furnishings and excellent connectivity.",
    description: `Semi-Furnished 2 BHK Flat for Rent in Juhi Niharika, Sector 10 Kamothe

A well-located 2 BHK semi-furnished flat available for rent in Juhi Niharika, Sector 10, Kamothe. Ideal for families looking for a comfortable and budget-friendly home in a prime area.

The flat comes with essential furnishings including 2 sofas, 2 beds, and a modular kitchen, making it ready to move in. Located close to Khandeshwar Railway Station, it offers excellent connectivity along with access to nearby markets, schools, and daily essentials.

Rental Details
- Rent: INR 31,000/month
- Deposit: INR 1,00,000

Location Highlights
- Juhi Niharika, Sector 10 Kamothe
- Close to Khandeshwar Station
- Nearby schools, markets and daily needs
- Easy connectivity to Panvel and Navi Mumbai`,
    highlights: [
      "2 BHK semi-furnished apartment",
      "2 sofas and 2 beds included",
      "Modular kitchen",
      "Well-maintained society",
      "Prime Sector 10 Kamothe location",
      "Near Khandeshwar Railway Station"
    ],
    amenities: [
      "Semi Furnished",
      "2 Sofas",
      "2 Beds",
      "Modular Kitchen",
      "Well-maintained Society",
      "Good Connectivity"
    ],
    nearby: [
      "Khandeshwar Railway Station",
      "Schools",
      "Markets",
      "Daily Needs",
      "Panvel",
      "Navi Mumbai"
    ],
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Juhi+Niharika,+Sector+10,+Kamothe,+Navi+Mumbai",
    images: ["/properties/New folder/2bhk-semi-furnished-rent-juhi-niharika-sector-10-kamothe/images/01.png"],
    videos: ["/properties/New folder/2bhk-semi-furnished-rent-juhi-niharika-sector-10-kamothe/videos/01.mp4"],
    documents: []
  }), enrichProperty(
  {
    id: "precious-majestic-pushpak-nagar-navi-mumbai",
    slug: "precious-majestic-pushpak-nagar-navi-mumbai",
    title: "Precious Majestic - Premium 1 & 2 BHK Homes in Pushpak Nagar, Navi Mumbai",
    type: "Residential Project",
    availableTypes: ["1 BHK", "2 BHK"],
    category: "sale",
    price: null,
    priceLabel: "1 BHK from INR 42.80 Lakhs | 2 BHK from INR 72.23 Lakhs",
    area: "3090 sq.mtrs",
    location: "Pushpak Nagar (Dapoli)",
    city: "Navi Mumbai",
    floor: null,
    building: "1 Tower | 2 Wings | Basement + Stilt + 10 Floors",
    facing: "Airport View",
    parking: true,
    furnished: "Unfurnished",
    possession: "Expected December 2029",
    tags: ["project", "featured", "premium", "new-launch"],
    shortDescription: "Precious Majestic is a modern residential development by Precious Group in Pushpak Nagar, offering premium 1 & 2 BHK homes with excellent connectivity and lifestyle amenities.",
    description: `Precious Majestic - Premium 1 & 2 BHK Homes in Pushpak Nagar, Navi Mumbai

Welcome to Precious Majestic, a modern residential development by Precious Group, strategically located in the heart of Pushpak Nagar (Dapoli), Navi Mumbai. Designed for comfortable urban living, this thoughtfully planned project offers premium 1 & 2 BHK homes with excellent connectivity, modern amenities, and strong future appreciation potential.

Spread across a 3090 sq.mtrs land parcel, the project features 1 tower with 2 wings, comprising Basement + Stilt + 10 Floors, making it an ideal choice for both end-users and investors.

With proximity to the upcoming Navi Mumbai International Airport, major highways, railway stations, and business hubs, Precious Majestic offers a perfect blend of lifestyle and connectivity.

Project Highlights
- Premium residential project by Precious Group
- 1 Tower | 2 Wings
- Basement + Stilt + 10 Floors
- Located in prime Pushpak Nagar
- Road-touch project
- Airport view apartments
- Vastu-compliant homes
- Multi-level parking
- 100% clear title project

Configuration & Pricing
1 BHK
- 414 Sq.ft Usable Carpet
- Starting INR 42.80 Lakhs*

2 BHK
- 699 Sq.ft Usable Carpet
- Starting INR 72.23 Lakhs*

RERA Possession Date: December 2029

Amenities
- Fitness Centre
- Meditation Room
- Indoor Games
- Kids Play Area
- Jogging Track
- Party Lawn
- Reflexology Pathway
- Gazebo Lawn
- Outdoor Yoga & Zumba
- Recreational Amenities
- 4 Lifts in Each Wing

Prime Location Advantages
- 10 Minutes from Khandeshwar & Panvel Railway Station
- 5 Minutes from Kalamboli Junction
- 5 Minutes to Navi Mumbai International Airport
- 30 Minutes to Mumbai via Atal Setu
- Walking distance from Auto & Bus Stand
- Upcoming D-Mart, Hotels & Petrol Pump nearby
- Pune-Bangalore-Goa Highway - 4 Minutes
- JNPT Port - 7 Minutes
- MGM Hospital - 10 Minutes
- Upcoming Biggest University - 5 Minutes
- School & Playground nearby

Why Invest in Precious Majestic?
Precious Majestic is located in one of Navi Mumbai's fastest-growing infrastructure zones. With the upcoming international airport, Atal Setu connectivity, expanding commercial development, and excellent transport infrastructure, Pushpak Nagar is emerging as a high-potential residential destination.

The project combines strategic location, affordable luxury pricing, strong future appreciation, lifestyle-focused amenities, and trusted developer legacy, making it an excellent opportunity for both homebuyers and investors.`,
    highlights: [
      "Premium residential project by Precious Group",
      "1 tower with 2 wings",
      "Basement + Stilt + 10 Floors",
      "Prime Pushpak Nagar location",
      "Road-touch project",
      "Airport view apartments",
      "Vastu-compliant homes",
      "Multi-level parking",
      "100% clear title project"
    ],
    amenities: [
      "Fitness Centre",
      "Meditation Room",
      "Indoor Games",
      "Kids Play Area",
      "Jogging Track",
      "Party Lawn",
      "Reflexology Pathway",
      "Gazebo Lawn",
      "Outdoor Yoga & Zumba",
      "Recreational Amenities",
      "4 Lifts in Each Wing"
    ],
    nearby: [
      "Khandeshwar & Panvel Railway Station - 10 Minutes",
      "Kalamboli Junction - 5 Minutes",
      "Navi Mumbai International Airport - 5 Minutes",
      "Mumbai via Atal Setu - 30 Minutes",
      "Auto & Bus Stand - Walking Distance",
      "Pune-Bangalore-Goa Highway - 4 Minutes",
      "JNPT Port - 7 Minutes",
      "MGM Hospital - 10 Minutes",
      "Upcoming Biggest University - 5 Minutes",
      "School & Playground nearby"
    ],
    googleMapsUrl: "https://maps.app.goo.gl/1Rj8vP1jSB16GnNR9",
    externalLinks: [
      {
        label: "Precious Majestic Location",
        href: "https://maps.app.goo.gl/1Rj8vP1jSB16GnNR9"
      }
    ],
    images: [
      "/properties/precious-majestic-pushpak-nagar-navi-mumbai/images/01.jpeg",
      "/properties/precious-majestic-pushpak-nagar-navi-mumbai/images/02.jpeg",
      "/properties/precious-majestic-pushpak-nagar-navi-mumbai/images/03.jpeg"
    ],
    videos: [
      "/properties/precious-majestic-pushpak-nagar-navi-mumbai/videos/01.mp4",
      "/properties/precious-majestic-pushpak-nagar-navi-mumbai/videos/02.mp4"
    ],
    documents: [
      "/properties/precious-majestic-pushpak-nagar-navi-mumbai/documents/PRECIOUS-KRISHNA-HILLS.pdf",
      "/properties/precious-majestic-pushpak-nagar-navi-mumbai/documents/PRECIOUS-MAJESTICS.pdf"
    ],
    seoTitle: "Precious Majestic Pushpak Nagar | Premium 1 & 2 BHK Homes Navi Mumbai",
    metaDescription: "Explore Precious Majestic in Pushpak Nagar, Navi Mumbai by Precious Group. Premium 1 & 2 BHK homes from INR 42.80 Lakhs with modern amenities and airport connectivity.",
    keywords: "Precious Majestic Pushpak Nagar, 1 BHK 2 BHK Navi Mumbai, Precious Group, Pushpak Nagar project, airport view apartments Navi Mumbai",
    ogImage: "/properties/precious-majestic-pushpak-nagar-navi-mumbai/images/01.jpeg",
    schema: {
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": "Precious Majestic - Premium 1 & 2 BHK Homes in Pushpak Nagar, Navi Mumbai",
      "description": "Modern residential development by Precious Group in Pushpak Nagar with premium 1 & 2 BHK homes, lifestyle amenities, and excellent airport connectivity.",
      "location": {
        "@type": "Place",
        "address": "Pushpak Nagar (Dapoli), Navi Mumbai"
      },
      "image": "/properties/precious-majestic-pushpak-nagar-navi-mumbai/images/01.jpeg"
    }
  })
];

/** 
 * Clear Segregation Helpers 
 * These fix the issue of mixed listings across the site.
 */
export const onlyProjects = properties.filter(p => p.tags?.includes('project'));
export const onlyPlottedDevelopments = properties.filter(p => p.tags?.includes('plotted-development'));
export const onlyProperties = properties.filter(p => !p.tags?.includes('project') && !p.tags?.includes('plotted-development'));

export const categories = [
  "All",
  "New Projects",
  ...Array.from(new Set(onlyProperties.map((property) => property.category)))
];
export const locations = [
  "All Locations",
  ...Array.from(new Set(properties.map((property) => property.location))).sort(),
];

export const propertyTypes = [
  "All Types",
  ...Array.from(
    new Set([
      ...onlyProperties.map((p) => p.type),
      ...onlyProperties.flatMap((p) => p.availableTypes || []),
    ])
  )
    .filter(Boolean)
    .sort(),
];

export const findPropertyBySlug = (slug) =>
  properties.find((property) => property.slug === slug);
export const findPropertyById = (id) =>
  properties.find((property) => property.id === id);
