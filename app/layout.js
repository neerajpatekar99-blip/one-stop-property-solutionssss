import "./globals.css";
import { DM_Sans, Playfair_Display } from "next/font/google";
import dynamic from "next/dynamic";
import Script from "next/script";
import "@/components/i18n";
import { 
  generateOrganizationSchema, 
  generateLocalBusinessSchema, 
  generateWebSiteSchema,
  generateKamotheFAQSchema 
} from "@/lib/seo-schemas";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://onestoppropertysolution.in"),
  title: "Real Estate Agent in Navi Mumbai & Kamothe | One Stop Property Solution",
  description:
    "Buy, sell, rent and invest in residential, commercial, land and industrial properties in Navi Mumbai, Kamothe, Kharghar, Panvel, Pushpak Nagar, Karanjade, Taloja and Kalamboli with Adv. Sachin Bhoir.",
  keywords:
    "Real Estate Agent in Navi Mumbai, Property Consultant in Navi Mumbai, Real Estate Consultant in Navi Mumbai, Property Dealer in Navi Mumbai, Real Estate Agent in Kamothe, Property Consultant in Kamothe, Flats for Sale in Kamothe, 1 BHK in Kamothe, 2 BHK in Kamothe, Flats for Rent in Kamothe, Real Estate Agent in Panvel, Property Consultant in Panvel, Flats for Sale in Panvel, New Projects in Panvel, Property for Sale in Panvel, Property in Pushpak Nagar, Property in Karanjade, Property in Kalamboli, Property in Taloja, Property in Ulwe, Property near Navi Mumbai International Airport",
  authors: [{ name: "Adv. Sachin Bhoir - One Stop Property Solution", url: "https://onestoppropertysolution.in" }],
  creator: "Adv. Sachin Bhoir",
  publisher: "One Stop Property Solution",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
    "other": {
      "bing-site-verification": "insert-bing-verification-code",
    },
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Real Estate Agent in Navi Mumbai & Kamothe | One Stop Property Solution",
    description:
      "Buy, sell, rent and invest in residential, commercial, land and industrial properties in Navi Mumbai, Kamothe, Kharghar, Panvel, Pushpak Nagar, Karanjade, Taloja and Kalamboli with Adv. Sachin Bhoir.",
    type: "website",
    locale: "en_IN",
    url: "https://onestoppropertysolution.in",
    siteName: "One Stop Property Solution",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "One Stop Property Solution - Adv. Sachin Bhoir",
        type: "image/png",
      },
      {
        url: "/gallery/sachin.jpeg",
        width: 800,
        height: 800,
        alt: "Adv. Sachin Bhoir - Founder & Managing Director",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Agent in Navi Mumbai & Kamothe | One Stop Property Solution",
    description:
      "Buy, sell, rent and invest in residential, commercial, land and industrial properties in Navi Mumbai, Kamothe, Kharghar, Panvel, Pushpak Nagar, Karanjade, Taloja and Kalamboli with Adv. Sachin Bhoir.",
    creator: "@onestopproperty",
    images: ["/logo.png"],
  },
  appLinks: {
    ios: {
      url: "https://wa.me/919870178204?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20property.",
      app_store_id: "585027354",
    },
    android: {
      url: "https://wa.me/919870178204?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20a%20property.",
      package: "com.whatsapp",
    },
  },
  alternates: {
    canonical: "https://onestoppropertysolution.in",
    languages: {
      en: "https://onestoppropertysolution.in",
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

import ConditionalUI from "@/components/ConditionalUI";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  const organizationSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebSiteSchema();
  const faqSchema = generateKamotheFAQSchema();

  return (
    <html lang="en" className={`scroll-smooth ${dmSans.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Structured Data: Organization & RealEstateAgent */}
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
          strategy="afterInteractive"
        />
        {/* Structured Data: LocalBusiness */}
        <Script
          id="schema-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
          strategy="afterInteractive"
        />
        {/* Structured Data: WebSite */}
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
          strategy="afterInteractive"
        />
        {/* Structured Data: AEO / High-Intent Kamothe Real Estate FAQ */}
        <Script
          id="schema-kamothe-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
          strategy="afterInteractive"
        />
        
        {/* Google Search Console */}
        <meta name="google-site-verification" content="insert-google-verification-code" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#050814" />
      </head>
      <body className="bg-navy-950 text-navy-100 antialiased font-sans">
        <ConditionalUI>
          {children}
        </ConditionalUI>
      </body>
    </html>
  );
}
