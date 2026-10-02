"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { consultationServices } from "@/data/consultationServices";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Calendar,
  Clock,
  Video,
  Phone,
  Car,
  Trash2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building,
  Plus,
  Compass,
  MessageSquare,
  Sparkles
} from "lucide-react";

export default function CartPage() {
  const { cartItems, removeFromCart, addToCart, clearCart, isInCart } = useCart();
  const { user } = useAuth();

  // Booking Form State
  const [selectedMode, setSelectedMode] = useState("video"); // 'video' | 'phone' | 'in_person'
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [selectedSlot, setSelectedSlot] = useState("morning"); // 'morning' | 'afternoon' | 'evening'
  const [clientInfo, setClientInfo] = useState({
    name: user?.displayName || "",
    phone: user?.phoneNumber || "",
    email: user?.email || "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!clientInfo.phone && !clientInfo.email) {
      alert("Please provide at least a phone number or email for your consultation booking.");
      return;
    }

    setSubmitting(true);

    const bookingPayload = {
      userId: user?.uid || null,
      userEmail: clientInfo.email,
      userName: clientInfo.name,
      userPhone: clientInfo.phone,
      consultationMode: selectedMode,
      preferredDate: selectedDate,
      timeSlot: selectedSlot,
      notes: clientInfo.notes,
      items: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        type: item.type || "property",
        price: item.priceLabel || item.price || "Complimentary",
      })),
    };

    const referenceId = "OSPS-" + Math.floor(100000 + Math.random() * 900000);
    setBookingConfirmed({
      referenceId,
      date: selectedDate,
      slot: selectedSlot,
      mode: selectedMode,
      phone: clientInfo.phone,
    });
    clearCart();
    setSubmitting(false);
  };

  // If Booking Confirmed, render Royal Celebration screen
  if (bookingConfirmed) {
    const whatsappText = encodeURIComponent(
      `Hi One Stop Property Solutions! I have confirmed my consultation booking #${bookingConfirmed.referenceId} for ${bookingConfirmed.date} (${bookingConfirmed.slot} slot). Please assign my Senior Advisor.`
    );
    const whatsappUrl = `https://wa.me/919870178204?text=${whatsappText}`;

    return (
      <div className="min-h-screen bg-cream pt-28 pb-20 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 md:p-12 border border-gold/30 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-dark bg-gold/10 px-3 py-1 rounded-full">
              Booking Confirmed
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-navy-950 mt-3">
              Your Consultation is Scheduled
            </h1>
            <p className="text-navy-600 text-sm md:text-base mt-2 max-w-md mx-auto">
              Your Senior Real Estate Advisory Lead has been assigned. You will receive an SMS and WhatsApp itinerary shortly.
            </p>
          </div>

          {/* Reference Card */}
          <div className="bg-navy-950 text-white rounded-2xl p-6 text-left border border-gold/30 space-y-4">
            <div className="flex justify-between items-center border-b border-navy-800 pb-3">
              <span className="text-xs text-navy-400 uppercase tracking-wider">Booking Reference</span>
              <span className="font-mono text-base font-bold text-gold-light">
                {bookingConfirmed.referenceId}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-navy-400">Scheduled Date</p>
                <p className="font-medium text-white mt-0.5">{bookingConfirmed.date}</p>
              </div>
              <div>
                <p className="text-navy-400">Preferred Slot</p>
                <p className="font-medium text-white capitalize mt-0.5">{bookingConfirmed.slot} Slot</p>
              </div>
              <div>
                <p className="text-navy-400">Mode</p>
                <p className="font-medium text-white capitalize mt-0.5">
                  {bookingConfirmed.mode === "in_person"
                    ? "In-Person Site Visit"
                    : bookingConfirmed.mode === "video"
                    ? "Virtual Video Call"
                    : "Phone Advisory"}
                </p>
              </div>
              <div>
                <p className="text-navy-400">Service Fee</p>
                <p className="font-medium text-emerald-400 mt-0.5">100% Free</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-gold py-4 text-center flex items-center justify-center font-semibold text-sm shadow-lg"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              <span>Connect on WhatsApp for Instant Itinerary</span>
            </a>

            <Link
              href="/"
              className="w-full btn-outline py-3.5 text-center flex items-center justify-center text-sm font-medium"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title Banner */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-widest uppercase text-gold-dark bg-gold/10 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultation & Property Bag</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy-950 tracking-tight">
            Review Your Consultation & Site Visits
          </h1>
          <p className="text-navy-600 text-sm sm:text-base mt-2 max-w-2xl">
            Schedule a 1-on-1 advisory call, arrange chauffeured inspections, or review property brochures with our verified real estate team.
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Bag State */
          <div className="bg-white rounded-3xl p-12 border border-brand/20 shadow-sm text-center max-w-xl mx-auto space-y-6">
            <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/20 text-gold flex items-center justify-center mx-auto">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-navy-950">Your Consultation Bag is Empty</h2>
              <p className="text-navy-600 text-sm mt-2 leading-relaxed">
                Add verified Navi Mumbai estates or choose from our complimentary VIP advisory consultations below to begin.
              </p>
            </div>

            <div className="pt-2">
              <Link href="/#properties" className="btn-gold py-3.5 px-8 inline-flex items-center text-sm">
                <span>Browse Verified Properties</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Quick Add Services Grid */}
            <div className="pt-8 border-t border-gray-100 text-left">
              <h3 className="text-xs font-bold uppercase tracking-wider text-navy-400 mb-4">
                Popular Consultation Packages (Instant 1-Click Add):
              </h3>
              <div className="space-y-3">
                {consultationServices.slice(0, 3).map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-cream border border-brand/20 hover:border-gold transition-colors"
                  >
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-navy-950">{service.title}</h4>
                      <p className="text-xs text-navy-500">{service.subtitle}</p>
                    </div>
                    <button
                      onClick={() => addToCart(service)}
                      className="px-3 py-1.5 rounded-xl bg-navy-900 text-gold-light text-xs font-semibold hover:bg-navy-800 transition-colors flex items-center"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Free
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Two Column Shopping Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Items List & Services */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand/20 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h2 className="font-serif text-xl text-navy-950 font-semibold">
                    Selected Items ({cartItems.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-xs text-navy-500 hover:text-rose-600 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-gray-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-start space-x-4">
                      <div className="w-20 h-20 rounded-2xl bg-navy-50 overflow-hidden flex-shrink-0 relative border border-gray-100 flex items-center justify-center">
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
                              <Phone className="w-8 h-8" />
                            ) : (
                              <Building className="w-8 h-8" />
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-dark bg-gold/10 px-2 py-0.5 rounded-full">
                            {item.type === "service" ? "Consultation" : "Property"}
                          </span>
                          {item.rera && (
                            <span className="text-[10px] text-navy-400 font-mono">
                              RERA: {item.rera}
                            </span>
                          )}
                        </div>

                        <h3 className="font-serif text-base text-navy-950 font-semibold mt-1 truncate">
                          {item.title}
                        </h3>

                        <p className="text-xs text-navy-600 mt-0.5">
                          {item.location || item.subtitle || "Navi Mumbai, Maharashtra"}
                        </p>

                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs font-semibold text-emerald-800">
                            {item.priceLabel || item.price || "Free Consultation"}
                          </span>
                          {item.originalPrice && (
                            <span className="text-xs text-navy-400 line-through">
                              {item.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-rose-600 transition-colors rounded-lg"
                        title="Remove from bag"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add More Consultation Services (Shopping-Style Add-ons) */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand/20 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-navy-950 font-semibold">
                      Add Complimentary Advisory Services
                    </h3>
                    <p className="text-xs text-navy-500 mt-0.5">
                      Included with your property inquiry at zero cost
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {consultationServices.map((service) => {
                    const alreadyInCart = isInCart(service.id);
                    return (
                      <div
                        key={service.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                          alreadyInCart
                            ? "bg-navy-950 text-white border-gold/40 shadow-sm"
                            : "bg-cream/60 border-brand/20 hover:border-gold"
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                alreadyInCart
                                  ? "bg-gold/20 text-gold-light"
                                  : service.badgeColor
                              }`}
                            >
                              {service.tag}
                            </span>
                            <span className="text-xs font-semibold text-emerald-600">
                              Free
                            </span>
                          </div>
                          <h4
                            className={`font-serif text-sm font-semibold mt-2 ${
                              alreadyInCart ? "text-white" : "text-navy-950"
                            }`}
                          >
                            {service.title}
                          </h4>
                          <p
                            className={`text-xs line-clamp-2 mt-1 ${
                              alreadyInCart ? "text-navy-300" : "text-navy-600"
                            }`}
                          >
                            {service.description}
                          </p>
                        </div>

                        <div className="pt-3 mt-2 border-t border-brand/10 flex items-center justify-between">
                          <span
                            className={`text-[11px] ${
                              alreadyInCart ? "text-navy-400" : "text-navy-500"
                            }`}
                          >
                            {service.duration}
                          </span>
                          {alreadyInCart ? (
                            <button
                              onClick={() => removeFromCart(service.id)}
                              className="text-xs text-rose-300 hover:text-rose-100 font-medium"
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              onClick={() => addToCart(service)}
                              className="text-xs font-semibold text-gold-dark hover:text-navy-900 flex items-center"
                            >
                              <Plus className="w-3.5 h-3.5 mr-1" /> Add to Bag
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Schedule & Checkout Card */}
            <div className="lg:col-span-5 space-y-6">
              <form
                onSubmit={handleBookingSubmit}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-brand/20 shadow-md space-y-6"
              >
                <div>
                  <h2 className="font-serif text-xl text-navy-950 font-semibold">
                    Schedule Your Consultation
                  </h2>
                  <p className="text-xs text-navy-500 mt-1">
                    Select your preferred mode, date, and contact details
                  </p>
                </div>

                {/* Step 1: Mode Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700">
                    1. Consultation Format
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedMode("video")}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                        selectedMode === "video"
                          ? "bg-navy-950 text-white border-gold shadow-sm"
                          : "bg-cream/40 border-gray-200 text-navy-700 hover:border-gold"
                      }`}
                    >
                      <Video className="w-4 h-4 text-gold" />
                      <span className="text-[11px] font-medium">Video Call</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedMode("phone")}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                        selectedMode === "phone"
                          ? "bg-navy-950 text-white border-gold shadow-sm"
                          : "bg-cream/40 border-gray-200 text-navy-700 hover:border-gold"
                      }`}
                    >
                      <Phone className="w-4 h-4 text-gold" />
                      <span className="text-[11px] font-medium">Phone Call</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedMode("in_person")}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                        selectedMode === "in_person"
                          ? "bg-navy-950 text-white border-gold shadow-sm"
                          : "bg-cream/40 border-gray-200 text-navy-700 hover:border-gold"
                      }`}
                    >
                      <Car className="w-4 h-4 text-gold" />
                      <span className="text-[11px] font-medium">Site Visit</span>
                    </button>
                  </div>
                </div>

                {/* Step 2: Date & Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1.5">
                      2. Preferred Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="input-field pl-10 text-xs"
                        required
                      />
                      <Calendar className="w-4 h-4 text-navy-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy-700 mb-1.5">
                      3. Time Slot
                    </label>
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="input-field text-xs"
                    >
                      <option value="morning">Morning (10:00 AM - 1:00 PM)</option>
                      <option value="afternoon">Afternoon (2:00 PM - 5:00 PM)</option>
                      <option value="evening">Evening (5:30 PM - 8:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Step 3: Contact Info */}
                <div className="space-y-3 pt-2 border-t border-gray-100">
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy-700">
                    4. Contact Details
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={clientInfo.name}
                    onChange={handleInputChange}
                    placeholder="Full Name *"
                    required
                    className="input-field text-xs"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="tel"
                      name="phone"
                      value={clientInfo.phone}
                      onChange={handleInputChange}
                      placeholder="WhatsApp / Phone No. *"
                      required
                      className="input-field text-xs"
                    />
                    <input
                      type="email"
                      name="email"
                      value={clientInfo.email}
                      onChange={handleInputChange}
                      placeholder="Email Address"
                      className="input-field text-xs"
                    />
                  </div>

                  <textarea
                    name="notes"
                    value={clientInfo.notes}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Special requirements (e.g. 2 BHK budget under 65 Lakhs, near Station)"
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-brand/30"
                  />
                </div>

                {/* Order Summary */}
                <div className="bg-cream/60 rounded-2xl p-4 border border-brand/20 space-y-2 text-xs">
                  <div className="flex justify-between text-navy-600">
                    <span>Consultation & Advisory</span>
                    <span className="font-semibold text-emerald-700">100% Free</span>
                  </div>
                  <div className="flex justify-between text-navy-600">
                    <span>Chauffeured Site Visit</span>
                    <span className="font-semibold text-emerald-700">Complimentary</span>
                  </div>
                  <div className="flex justify-between text-navy-600">
                    <span>Documentation & RERA Packet</span>
                    <span className="font-semibold text-emerald-700">Included</span>
                  </div>
                  <div className="border-t border-brand/20 pt-2 flex justify-between font-serif text-sm font-bold text-navy-950">
                    <span>Total Due Today</span>
                    <span className="text-emerald-700">₹0.00</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full btn-gold py-4 text-center flex items-center justify-center font-semibold text-sm shadow-xl disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Securing Your Booking...</span>
                  ) : (
                    <>
                      <span>Confirm & Book Consultation</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center space-x-2 text-[11px] text-navy-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Verified Advisors • Zero Spam Guarantee</span>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
