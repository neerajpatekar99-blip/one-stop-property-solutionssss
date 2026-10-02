import ContactPageClient from "@/components/ContactPageClient";

export const metadata = {
  title: "Contact One Stop Property Solutions | Call Sachin Bhoir | Navi Mumbai Real Estate",
  description:
    "Get in touch with Sachin Bhoir at One Stop Property Solutions. Call +91 98701 78204, WhatsApp or visit our Kamothe office. 1-hour response guarantee for all enquiries.",
  keywords: "contact, call Sachin Bhoir, One Stop Property Solutions, Navi Mumbai real estate, property enquiry, real estate consultation",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Contact One Stop Property Solutions",
    description: "Get in touch with Sachin Bhoir. Call +91 98701 78204 or fill our contact form for instant response.",
    type: "website",
    url: "https://onestoppropertysolution.in/contact",
  },
  alternates: {
    canonical: "https://onestoppropertysolution.in/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
