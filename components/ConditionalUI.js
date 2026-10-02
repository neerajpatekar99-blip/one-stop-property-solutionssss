"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: false });
const StickyMobileBar = dynamic(() => import("@/components/StickyMobileBar"), { ssr: false });

export default function ConditionalUI({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return (
      <AuthProvider>
        <main>{children}</main>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <main>{children}</main>
        <CartDrawer />
        <Footer />
        <WhatsAppButton />
        <StickyMobileBar />
      </CartProvider>
    </AuthProvider>
  );
}
