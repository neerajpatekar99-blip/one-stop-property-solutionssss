"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Maximize2, BedDouble, CheckCircle2, Sparkles, ArrowRight, Phone, MessageSquare, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useCart } from "@/context/CartContext";

export default function PropertyCard({ property, index = 0 }) {
  const { addToCart, isInCart } = useCart();
  const {
    id,
    slug,
    title,
    type,
    category,
    price,
    priceLabel,
    area,
    location,
    city,
    images,
    tags,
    shortDescription,
    furnished,
    possession,
  } = property;

  const url = slug ? `/property/${slug}` : `/properties/${id}`;
  const isPlottedDevelopment = tags?.includes("plotted-development");
  const categoryLabel = isPlottedDevelopment
    ? "Plotted Development"
    : category === "rent"
      ? "For Rent"
      : "For Sale";

  const fallbackList = ["/gallery/01.webp", "/gallery/02.webp", "/gallery/03.webp", "/gallery/04.webp", "/gallery/05.webp"];
  const defaultImage = images?.[0] || fallbackList[index % fallbackList.length];
  const [currentImg, setCurrentImg] = useState(defaultImage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      itemScope itemType="https://schema.org/ListItem"
    >
      <div className="group card bg-navy-900/90 border border-navy-700/80 hover:border-gold/50 shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden" itemProp="item" itemScope itemType="https://schema.org/RealEstateListing">
        <meta itemProp="name" content={title} />
        <meta itemProp="url" content={`https://onestoppropertysolution.in${url}`} />
        <meta itemProp="image" content={images?.[0] ? `https://onestoppropertysolution.in${images[0]}` : "https://onestoppropertysolution.in/logo.png"} />
        
        {/* Image */}
        <Link href={url} className="relative h-44 sm:h-52 md:h-56 overflow-hidden bg-navy-950 block" itemProp="url">
          <Image
            src={currentImg}
            alt={`${title} - ${location}, ${city}`}
            itemProp="image"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => {
              setCurrentImg(fallbackList[index % fallbackList.length]);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-black/30" />

          {/* Category Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className={clsx(
                "text-xs font-semibold px-2.5 py-1 rounded-lg shadow-md border",
                category === "rent"
                  ? "bg-blue-600/90 text-white border-blue-400/40"
                  : "bg-gold text-navy-950 border-gold-light/40 font-bold"
              )}
            >
              {categoryLabel}
            </span>
          </div>

          {/* Featured Badge */}
          {tags?.includes("featured") && (
            <div className="absolute top-3 right-3 z-10">
              <span className="flex items-center gap-1 text-xs font-semibold bg-amber-500/90 text-white px-2.5 py-1 rounded-lg shadow-md border border-amber-300/40">
                <Sparkles size={10} />
                Featured
              </span>
            </div>
          )}

          {/* Price */}
          <div className="absolute bottom-3 left-3 z-10">
            <span className="text-white font-serif text-2xl font-bold drop-shadow-md text-gold-light">
              {priceLabel}
            </span>
            {category === "rent" && (
              <span className="text-white/80 text-xs ml-1">/ month</span>
            )}
            {price && <meta itemProp="price" content={price} />}
            <meta itemProp="priceCurrency" content="INR" />
          </div>
        </Link>

        {/* Body */}
        <div className="p-4 sm:p-5">
          <Link href={url} title={`View complete details for ${title}`} itemProp="url">
            <h3 className="font-sans font-semibold text-white text-base leading-snug mb-2 hover:text-gold transition-colors line-clamp-2" itemProp="name">
              {title}
            </h3>
          </Link>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-navy-300 text-sm mb-3">
            <MapPin size={13} className="text-gold flex-shrink-0" />
            <span className="truncate">
              {location}, {city}
            </span>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-4 text-sm text-navy-200 mb-3 border-t border-navy-800 pt-3">
            <div className="flex items-center gap-1.5">
              <BedDouble size={14} className="text-gold/70" />
              <span className="font-medium" itemProp="numberOfRooms">{type}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 size={13} className="text-gold/70" />
              <span itemProp="floorSize" itemScope itemType="https://schema.org/QuantitativeValue">
                <span itemProp="value">{area || 'On Request'}</span> <span itemProp="unitCode">FTK</span>
              </span>
            </div>
            <div className="ml-auto">
              <span className="text-xs text-navy-400">{furnished}</span>
            </div>
          </div>

          {/* Short Description */}
          {shortDescription && (
            <p className="text-sm text-navy-300 leading-relaxed mb-4 line-clamp-2">
              {shortDescription}
            </p>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.includes("featured") && (
                <span className="tag-new">Featured</span>
              )}
              {tags.includes("hot") && (
                <span className="tag-hot">Hot Deal</span>
              )}
              {tags.includes("budget") && (
                <span className="tag-budget">Budget</span>
              )}
              {tags.includes("premium") && (
                <span className="tag-premium">Premium</span>
              )}
              {tags.includes("verified") && (
                <span className="tag-verified">
                  <CheckCircle2 size={10} /> Verified
                </span>
              )}
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-navy-800">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-3">
              <div className="text-xs text-navy-400">
                <div>{possession}</div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <a
                  href="tel:+919870178204"
                  title="Call for enquiry"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-navy-700 bg-navy-800/80 px-3 py-1.5 text-xs font-semibold text-navy-200 hover:border-gold hover:text-gold transition-all"
                >
                  <Phone size={12} className="text-gold" /> Call
                </a>
                <a
                  href={`https://wa.me/919870178204?text=${encodeURIComponent(
                    `Hi, I am interested in ${title}. Please share more details and availability.`
                  )}`}
                  title="Message on WhatsApp"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1da851] transition-all"
                >
                  <MessageSquare size={12} /> WhatsApp
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  addToCart({
                    id: property.id || property.slug,
                    title: property.title,
                    priceLabel: property.priceLabel,
                    location: property.location,
                    type: property.type || "Property",
                    images: property.images,
                    rera: property.rera,
                  });
                }}
                className={`inline-flex items-center justify-center gap-1.5 rounded-xl border text-xs font-semibold py-2.5 transition-all ${
                  isInCart(property.id || property.slug)
                    ? "bg-gold text-navy-950 border-gold shadow-md font-bold"
                    : "border-gold/30 text-gold-light bg-navy-800/80 hover:bg-gold/15 hover:border-gold"
                }`}
              >
                <ShoppingBag size={13} className={isInCart(property.id || property.slug) ? "text-navy-950" : "text-gold"} />
                <span>{isInCart(property.id || property.slug) ? "In Bag ✓" : "+ Add to Bag"}</span>
              </button>
              <Link
                href={url}
                title={`View complete details for ${title}`}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-navy-800 to-navy-700 text-gold-light border border-gold/30 px-3 py-2.5 text-xs font-semibold hover:border-gold hover:from-navy-700 hover:to-navy-600 transition-all"
              >
                <span>Details</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
