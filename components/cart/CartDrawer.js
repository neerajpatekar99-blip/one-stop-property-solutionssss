"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, Calendar, ArrowRight, ShoppingBag, PhoneCall, Building } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartDrawer() {
  const { cartItems, removeFromCart, clearCart, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream border-l border-gold/20 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 bg-navy-950 text-white flex items-center justify-between border-b border-gold/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gold/10 border border-gold/30 text-gold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-lg tracking-wide text-white">Consultation Bag</h2>
                <p className="text-xs text-navy-400 font-sans">
                  {cartItems.length} {cartItems.length === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-navy-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 px-4 space-y-4">
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 text-gold flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-navy-900">Your Bag is Empty</h3>
                  <p className="text-xs text-navy-600 mt-1 max-w-xs mx-auto leading-relaxed">
                    Add verified properties for site visits or select our complimentary VIP advisory services.
                  </p>
                </div>
                <Link
                  href="/#properties"
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-navy-900 hover:text-gold border-b border-navy-900 hover:border-gold pb-0.5 pt-2 transition-colors"
                >
                  Explore Verified Estates →
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-brand/20 shadow-sm flex items-start space-x-3 relative group"
                >
                  {/* Thumbnail / Icon */}
                  <div className="w-16 h-16 rounded-xl bg-navy-50 overflow-hidden flex-shrink-0 relative border border-gray-100 flex items-center justify-center">
                    {item.images?.[0] ? (
                      <Image
                        src={item.images[0]}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="text-gold">
                        {item.type === "service" ? (
                          <PhoneCall className="w-6 h-6" />
                        ) : (
                          <Building className="w-6 h-6" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 pr-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark">
                      {item.type === "service" ? "Advisory Service" : item.type || "Property"}
                    </span>
                    <h4 className="font-serif text-sm text-navy-950 truncate font-semibold">
                      {item.title}
                    </h4>
                    <p className="text-xs text-navy-600 truncate mt-0.5">
                      {item.location || item.subtitle || "Navi Mumbai"}
                    </p>
                    <p className="text-xs font-semibold text-emerald-800 mt-1">
                      {item.priceLabel || item.price || "Complimentary"}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-4 right-4 text-gray-300 hover:text-rose-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer / Actions */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-brand/20 space-y-3">
              <div className="flex justify-between items-center text-xs text-navy-600 pb-2">
                <span>Advisory & Consultation Fee</span>
                <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  100% Free
                </span>
              </div>

              <Link
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="w-full btn-gold py-3.5 text-center flex items-center justify-center font-semibold text-sm shadow-md"
              >
                <span>Proceed to Schedule & Book</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-navy-500 hover:text-rose-600 transition-colors"
                >
                  Clear Bag
                </button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-[11px] font-medium text-navy-800 hover:text-gold transition-colors"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
