"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone, ShoppingBag, User, LogOut, Sparkles, Crown, ChevronDown, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  
  // Reordered to place About 2nd, and removed Plotted Developments
  const navLinks = [
    { href: "#hero", label: t('nav.home') || "Home" },
    { href: "#about", label: t('nav.about') || "About" },
    { href: "#properties", label: t('nav.properties') || "Properties" },
    { href: "#new-projects", label: t('nav.new_projects') || "New Projects" },
    { href: "#services", label: t('nav.services') || "Services" },
    { href: "#gallery", label: t('nav.gallery') || "Gallery" },
    { href: "#contact", label: t('nav.contact') || "Contact" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const sectionIds = [
        "hero", 
        "about",
        "properties", 
        "new-projects", 
        "services", 
        "gallery",
        "youtube", 
        "office", 
        "reviews", 
        "contact"
      ];
      let current = "hero";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            current = id;
          }
        }
      }

      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) {
        current = "contact";
      }

      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);

    if (!href.startsWith('#')) {
      window.location.href = href;
      return;
    }

    if (window.location.pathname !== "/" && href.startsWith('#')) {
      window.location.href = `/${href}`;
      return;
    }

    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    } else if (href.startsWith('#')) {
      window.location.href = `/${href}`;
    }
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(nextLang);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#050814] shadow-2xl border-b border-gold/20 py-2"
            : "bg-[#050814] border-b border-white/10 py-3"
        }`}
        style={{ backgroundColor: "#050814" }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <div className="flex items-center gap-6">
              <a href="/" onClick={(e) => handleNavClick(e, "#hero")} className="flex items-center flex-shrink-0 group">
                <div className="relative h-11 w-44 sm:h-12 sm:w-52 transition-transform duration-300 group-hover:scale-105">
                  <Image 
                    src="/logo.png" 
                    alt="One Stop Property Solutions" 
                    fill 
                    className="object-contain object-left" 
                    priority 
                  />
                </div>
              </a>

              {/* Desktop Nav Links */}
              <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <div key={link.href} className="flex items-center">
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`relative px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                          isActive
                            ? "text-gold font-bold bg-gold/10"
                            : "text-navy-200 hover:text-gold hover:bg-white/5"
                        }`}
                      >
                        {link.label}
                        {isActive && (
                          <motion.div
                            layoutId="nav-pill"
                            className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-gold via-brand to-gold rounded-full"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </a>

                      {link.href === "#properties" && (
                        <div className="relative group ml-1">
                          <button
                            type="button"
                            className="relative px-2.5 py-1.5 rounded-xl text-xs xl:text-sm font-medium text-navy-200 hover:text-gold hover:bg-white/5 transition-all duration-200 inline-flex items-center gap-1"
                          >
                            <span>Locations</span>
                            <ChevronDown size={13} className="group-hover:rotate-180 transition-transform duration-200 text-gold" />
                          </button>

                          <div 
                            className="absolute left-0 top-full mt-2 w-64 p-3.5 rounded-2xl border border-gold/40 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-[100]"
                            style={{ backgroundColor: "#070c1e" }}
                          >
                            <div className="text-[10px] uppercase font-bold tracking-wider text-gold px-2 pb-2.5 border-b border-navy-800 flex items-center justify-between">
                              <span className="flex items-center gap-1.5"><MapPin size={11} className="text-gold" /> Navi Mumbai Nodes</span>
                              <span className="text-emerald-400 font-bold">11 Hubs</span>
                            </div>
                            <div className="mt-2 space-y-1">
                              {[
                                { name: "Kamothe (Sectors 1-36)", href: "/kamothe-property", tag: "Primary" },
                                { name: "Kharghar (Metro & Hills)", href: "/kharghar-property", tag: "Premium" },
                                { name: "Panvel (Junction Hub)", href: "/panvel-property", tag: "Growth" },
                                { name: "Navi Mumbai Regional Hub", href: "/navi-mumbai-real-estate", tag: "All Nodes" },
                                { name: "Pushpak Nagar (Airport)", href: "/pushpak-nagar-property", tag: "Hot" },
                                { name: "Ulwe (Atal Setu MTHL)", href: "/ulwe-property", tag: "Express" },
                                { name: "Kalamboli & Roadpali", href: "/kalamboli-property", tag: "Towers" },
                                { name: "Karanjade Node", href: "/karanjade-property", tag: "Affordable" },
                                { name: "Taloja Phase 1 & 2", href: "/taloja-property", tag: "Metro" },
                                { name: "Nerul & Seawoods", href: "/nerul-property", tag: "Luxury" },
                                { name: "Vashi Commercial", href: "/vashi-property", tag: "Central" },
                              ].map((node) => (
                                <Link
                                  key={node.href}
                                  href={node.href}
                                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-navy-100 hover:text-gold hover:bg-navy-900 transition-colors"
                                  style={{ backgroundColor: "transparent" }}
                                >
                                  <span className="font-medium">{node.name}</span>
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-navy-950 text-gold-light border border-gold/30 font-bold">
                                    {node.tag}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Clean Sign In / Account Link */}
                <Link
                  href={user ? "/cart" : "/login"}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold/40 hover:border-gold bg-gold/10 hover:bg-gold text-gold hover:text-navy-950 font-semibold text-xs transition-all duration-200 ml-1 whitespace-nowrap"
                >
                  <User size={13} />
                  <span>{user ? (user.displayName?.split(" ")[0] || "Account") : "Sign In"}</span>
                </Link>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4 flex-shrink-0">
              {/* Language Toggle */}
              <button 
                onClick={toggleLanguage}
                className="flex items-center px-2.5 py-1 rounded-full border border-gold/30 text-[10px] font-bold tracking-widest text-gold-light hover:bg-gold/15 transition-all"
                title="Toggle Language"
              >
                {i18n.language === 'en' ? 'EN' : 'हिन्दी'}
              </button>

              {/* Consultation Bag */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-xl text-gold-light hover:bg-white/10 transition-all"
                title="View Consultation Bag"
                aria-label="Consultation Bag"
              >
                <ShoppingBag size={19} className="text-gold" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-gold to-gold-dark text-navy-950 text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Account / Sign Out if logged in */}
              {user && (
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="flex items-center gap-1 text-xs text-navy-400 hover:text-rose-400 transition-colors"
                >
                  <LogOut size={14} />
                  <span className="text-[11px]">Logout</span>
                </button>
              )}

              {/* Phone */}
              <a 
                href="tel:+919870178204" 
                className="flex items-center gap-1.5 text-xs xl:text-sm font-medium text-navy-200 hover:text-gold transition-colors whitespace-nowrap"
              >
                <Phone size={13} className="text-gold" />
                <span>+91 98701 78204</span>
              </a>

              {/* Free Consultation CTA */}
              <Link 
                href="/cart" 
                className="btn-gold text-xs font-bold py-2 px-3.5 shadow-md whitespace-nowrap"
              >
                {t('nav.free_consultation') || "Book Consultation"}
              </Link>
            </div>

            {/* Mobile Actions: Bag + Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-xl text-gold hover:bg-white/10"
                aria-label="Consultation Bag"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-navy-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setMobileOpen(!mobileOpen)} 
                aria-expanded={mobileOpen} 
                className="p-2 rounded-xl text-gold hover:bg-white/10 transition-all" 
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            transition={{ duration: 0.2 }} 
            className="fixed inset-0 z-40 pt-20 px-6 lg:hidden overflow-y-auto border-b border-gold/20"
            style={{ backgroundColor: "#050814" }}
          >
            <div className="flex flex-col gap-1.5 py-4">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <motion.div 
                    key={link.href} 
                    initial={{ opacity: 0, x: -16 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: i * 0.04 }}
                  >
                    <a 
                      href={link.href} 
                      onClick={(e) => handleNavClick(e, link.href)} 
                      className={`flex items-center justify-between py-3.5 px-4 rounded-xl font-medium text-base transition-all ${
                        isActive 
                          ? "bg-gold/15 text-gold border border-gold/30 font-bold" 
                          : "text-navy-200 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.label}
                      {isActive && <span className="w-2 h-2 bg-gold rounded-full" />}
                    </a>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Locations Quick Hub */}
            <div className="py-3 px-3.5 rounded-xl bg-navy-900/80 border border-gold/25 mt-1">
              <div className="flex items-center justify-between text-xs font-bold text-gold uppercase tracking-wider mb-2.5">
                <span className="flex items-center gap-1.5"><MapPin size={13} /> Location Hubs</span>
                <span className="text-[10px] text-emerald-400 font-bold">11 Nodes</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { name: "Kamothe", href: "/kamothe-property" },
                  { name: "Kharghar", href: "/kharghar-property" },
                  { name: "Panvel", href: "/panvel-property" },
                  { name: "Navi Mumbai", href: "/navi-mumbai-real-estate" },
                  { name: "Pushpak Nagar", href: "/pushpak-nagar-property" },
                  { name: "Ulwe", href: "/ulwe-property" },
                  { name: "Kalamboli", href: "/kalamboli-property" },
                  { name: "Karanjade", href: "/karanjade-property" },
                  { name: "Taloja", href: "/taloja-property" },
                  { name: "Nerul", href: "/nerul-property" },
                  { name: "Vashi", href: "/vashi-property" },
                ].map((node) => (
                  <Link
                    key={node.href}
                    href={node.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-2.5 py-1.5 rounded-lg bg-navy-800/90 text-navy-200 hover:text-gold hover:bg-navy-700/80 transition-colors truncate"
                  >
                    {node.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-navy-800 space-y-3 pb-12">
              {/* Clean Account / Sign In Action */}
              {user ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-navy-900/80 border border-gold/30">
                  <div className="flex-1 flex items-center gap-2 text-white text-xs font-semibold">
                    <User size={16} className="text-gold" />
                    <span className="truncate">{user.displayName || user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-400 text-xs font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gold/15 border border-gold/40 text-gold font-bold text-xs hover:bg-gold hover:text-navy-950 transition-all"
                >
                  <User size={14} /> Sign In
                </Link>
              )}

              <div className="flex items-center justify-between gap-3">
                <button 
                  onClick={toggleLanguage}
                  className="flex-1 flex items-center justify-center py-2.5 rounded-xl border border-gold/30 text-xs font-bold text-gold-light bg-navy-900/60"
                >
                  Language: {i18n.language === 'en' ? 'ENGLISH' : 'हिन्दी'}
                </button>
              </div>

              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between w-full p-4 rounded-xl bg-gradient-to-r from-navy-900 to-navy-800 border border-gold/30 text-white font-medium text-sm"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-gold" />
                  <span>Consultation Bag</span>
                </div>
                {cartCount > 0 && (
                  <span className="bg-gold text-navy-950 text-xs font-extrabold px-2.5 py-0.5 rounded-full">
                    {cartCount} items
                  </span>
                )}
              </Link>

              <a 
                href="tel:+919870178204" 
                className="flex items-center justify-center gap-2 w-full btn-outline py-3.5"
              >
                <Phone size={16} /> Call: +91 98701 78204
              </a>
              <a 
                href="https://wa.me/919870178204?text=Hi%2C%20I%27m%20interested%20in%20a%20property." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#25D366] text-white font-bold"
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
