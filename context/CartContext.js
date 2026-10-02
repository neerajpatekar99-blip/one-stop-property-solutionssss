"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  isInCart: () => false,
  isCartOpen: false,
  setIsCartOpen: () => {},
  toast: null,
});

const CART_STORAGE_KEY = "os_royal_property_cart";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const { user } = useAuth();

  // Load initial cart from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Failed to save cart to storage", e);
    }
  }, [cartItems]);

  const showToast = (message, title = "Added to Consultation Bag") => {
    setToast({ title, message });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const addToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        showToast(`"${item.title}" is already in your consultation bag.`);
        return prev;
      }
      showToast(
        `"${item.title}" added to your bag. Schedule your booking anytime.`,
        "Bag Updated"
      );
      return [...prev, { ...item, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (e) {}
  };

  const isInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: cartItems.length,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        isCartOpen,
        setIsCartOpen,
        toast,
      }}
    >
      {children}
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[9999] max-w-sm bg-navy-950 border border-gold/40 text-white p-4 rounded-2xl shadow-2xl flex items-start space-x-3 animate-fade-in backdrop-blur-md">
          <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center flex-shrink-0 text-gold-light font-bold">
            ✓
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-light">
              {toast.title}
            </h4>
            <p className="text-xs text-navy-300 mt-0.5 leading-relaxed">
              {toast.message}
            </p>
          </div>
        </div>
      )}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
