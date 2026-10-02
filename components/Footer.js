"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import InternalLinkingMesh from "@/components/InternalLinkingMesh";

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <footer className="bg-navy-950 text-white border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="relative h-14 w-48 mb-5 mx-auto sm:mx-0">
              <Image src="/logo.png" alt="One Stop Property Solutions" fill className="object-contain object-left" />
            </div>
            <p className="text-navy-300 text-sm leading-relaxed mb-5">
              Kamothe&apos;s most trusted property partner since 2014. Helping families buy, sell, rent and invest with complete transparency and MahaRERA certified advisory.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, href: "https://www.facebook.com/p/One-Stop-Property-Solutions-100078497191034/" },
                { Icon: Instagram, href: "https://www.instagram.com/sachinbhoir_realestate/" },
                { Icon: Youtube, href: "https://www.youtube.com/@sachinbhoir9361" }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-navy-900 border border-gold/20 hover:border-gold hover:text-gold transition-colors">
                  <social.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-sans font-semibold text-gold mb-5 text-xs uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Sachin Bhoir", id: "about" },
                { label: "Properties for Sale", id: "properties" },
                { label: "New Projects", id: "new-projects" },
                { label: "Our Services", id: "services" },
                { label: "Visual Gallery", id: "gallery" },
                { label: "Contact Us", id: "contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={`#${link.id}`}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                    className="text-navy-300 hover:text-gold text-sm transition-colors cursor-pointer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Locations Hub */}
          <div>
            <h4 className="font-sans font-semibold text-gold mb-5 text-xs uppercase tracking-widest">Prime Locations</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Kamothe Property", href: "/kamothe-property" },
                { label: "Kharghar Property", href: "/kharghar-property" },
                { label: "Panvel Property", href: "/panvel-property" },
                { label: "Pushpak Nagar (NMIA)", href: "/pushpak-nagar-property" },
                { label: "Ulwe (Atal Setu)", href: "/ulwe-property" },
                { label: "Navi Mumbai Real Estate", href: "/navi-mumbai-real-estate" },
              ].map((loc) => (
                <li key={loc.href}>
                  <Link href={loc.href} className="text-navy-300 hover:text-gold text-sm transition-colors">
                    {loc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="font-sans font-semibold text-gold mb-5 text-xs uppercase tracking-widest">Configurations</h4>
            <ul className="space-y-2.5">
              {["1 BHK Flats in Kamothe", "2 BHK Flats in Kamothe", "3 BHK Luxury Homes", "Ready to Move Options", "Commercial Properties"].map((label) => (
                <li key={label}>
                  <a href="#properties"
                    onClick={(e) => { e.preventDefault(); scrollTo("properties"); }}
                    className="text-navy-300 hover:text-gold text-sm transition-colors cursor-pointer">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-semibold text-gold mb-5 text-xs uppercase tracking-widest">Office &amp; Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm text-navy-300">
                <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                <span>Shop No. 3, Tulsi Corner, Plot No. 87 88,<br />Sector 21, Kamothe, Navi Mumbai – 410209</span>
              </li>
              <li>
                <a href="tel:+919870178204" className="flex gap-3 text-sm text-navy-300 hover:text-gold transition-colors whitespace-nowrap">
                  <Phone size={16} className="text-gold flex-shrink-0" />+91 98701 78204
                </a>
              </li>
              <li>
                <a href="mailto:sachin@onestoppropertysolution.in" className="flex gap-3 text-sm text-navy-300 hover:text-gold transition-colors">
                  <Mail size={16} className="text-gold flex-shrink-0" />sachin@onestoppropertysolution.in
                </a>
              </li>
            </ul>
            <div className="mt-5 p-3.5 rounded-xl bg-navy-900/90 border border-gold/20">
              <p className="text-xs text-white font-semibold">Consultation Hours:</p>
              <p className="text-xs text-navy-300">Mon - Sun: 10:00 AM - 10:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Programmatic Internal Backlink Directory (800+ Contextual Links) */}
      <InternalLinkingMesh />

      <div className="border-t border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <p className="text-navy-400 text-xs text-center sm:text-left">
              © {new Date().getFullYear()} One Stop Property Solutions. All rights reserved. | MahaRERA Reg. No. A51900019872
            </p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-navy-400 hover:text-gold text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-navy-400 hover:text-gold text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
