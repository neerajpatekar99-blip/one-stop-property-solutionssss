"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Phone,
  MessageSquare,
  Send,
  MapPin,
  BedDouble,
  Maximize2,
  CheckCircle2,
  Share2,
  Heart,
  ChevronLeft,
  ChevronRight,
  Building,
  Calendar,
  Car,
  Layers,
  Compass,
  Shield,
  Play,
  FileText,
  Download,
  Globe,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function PropertyDetailClient({ property, relatedProperties = [] }) {
  const { addToCart, isInCart } = useCart();
  const [currentImg, setCurrentImg] = useState(0);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    title,
    type,
    category,
    priceLabel,
    area,
    location,
    city,
    floor,
    building,
    facing,
    parking,
    furnished,
    possession,
    tags,
    shortDescription,
    description,
    highlights,
    amenities,
    nearby,
    externalLinks,
    images,
    documents,
    videos,
    googleMapsUrl,
    rera,
    age,
    lat,
    lng,
  } = property;

  const waMessage = encodeURIComponent(
    `Hi, I'm interested in ${title}. Please share more details and availability.`
  );

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shortDescription, url: window.location.href });
      } catch (err) {
        console.log(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const nextImg = () => setCurrentImg((i) => (i + 1) % images.length);
  const prevImg = () => setCurrentImg((i) => (i - 1 + images.length) % images.length);

  const isPlottedDevelopment = tags?.includes("plotted-development");
  const categoryLabel = isPlottedDevelopment
    ? "Plotted Development"
    : category === "rent"
      ? "For Rent"
      : "For Sale";
  const categoryHref = isPlottedDevelopment ? "/plotted-developments" : "/properties";
  const areaLabel = area
    ? typeof area === "number"
      ? `${area} sq.ft`
      : area
    : "On request";

  const specs = [
    { icon: BedDouble, label: "Type", value: type },
    { icon: Maximize2, label: "Area", value: areaLabel },
    { icon: Layers, label: "Floor", value: floor ?? "Not specified" },
    { icon: Compass, label: "Facing", value: facing ?? "Not specified" },
    { icon: Car, label: "Parking", value: parking ? "Available" : "Not Available" },
    { icon: Building, label: "Project", value: building ?? city },
    { icon: Calendar, label: "Possession", value: possession },
    { icon: Shield, label: "Furnishing", value: furnished },
  ];

  const documentItems = documents.map((doc) => {
    if (typeof doc === "string") {
      const filename = doc.split("/").pop();
      return {
        href: doc,
        label: filename ? filename.replace(/[-_]/g, " ") : "Download document",
      };
    }
    return doc;
  });

  const videoItems = videos.map((video, index) => {
    if (typeof video === "string") {
      const label = `${title} ${index === 0 ? "project tour" : `video ${index + 1}`}`;
      return {
        src: video,
        title: label,
      };
    }
    return video;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20 overflow-x-hidden">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-2 text-xs sm:text-sm text-navy-500 overflow-x-auto no-scrollbar">
          <Link href="/" className="hover:text-brand transition-colors whitespace-nowrap">
            Home
          </Link>
          <span className="text-navy-300">/</span>
          <Link href={categoryHref} className="hover:text-brand transition-colors whitespace-nowrap">
            {isPlottedDevelopment ? "Plotted Developments" : "Properties"}
          </Link>
          <span className="text-navy-300">/</span>
          <span className="text-navy-800 font-medium truncate text-[11px] sm:text-sm">{title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2 space-y-6 min-w-0">
            <div className="card overflow-hidden">
              <div className="relative h-60 sm:h-80 md:h-96 group bg-gray-100">
                {images && images.length > 0 ? (
                  <>
                    <Image
                      src={images[currentImg]}
                      alt={`${title} - Image ${currentImg + 1}`}
                      fill
                      className="object-cover transition-opacity duration-300"
                      priority
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImg}
                          className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          onClick={nextImg}
                          className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 text-white items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}
                    <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-lg">
                      {currentImg + 1} / {images.length}
                    </div>
                  </>
                ) : videoItems.length > 0 ? (
                  <div className="relative h-full bg-black">
                    <video
                      controls
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={videoItems[0].src} type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-4 px-4 text-white pointer-events-none">
                      <p className="text-sm uppercase tracking-[0.2em] text-white/70">Video preview</p>
                      <p className="text-xl font-semibold">{videoItems[0].title}</p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand/15 to-navy-100 text-navy-800 px-5 text-center">
                    <Play size={32} className="text-brand" />
                    <div className="text-lg font-semibold">Media Preview Coming Soon</div>
                    <div className="text-sm text-navy-500 max-w-sm">
                      This property is building its showcase. Full media is available below.
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${category === "rent" ? "bg-blue-600 text-white" : "bg-brand text-white"}`}>
                    {categoryLabel}
                  </span>
                  {tags.includes("premium") && <span className="tag-premium">Premium</span>}
                  {tags.includes("hot") && <span className="tag-hot">Hot Deal</span>}
                </div>
              </div>
              {images && images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto bg-gray-50 no-scrollbar">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImg(i)}
                      className={`relative flex-shrink-0 w-16 sm:w-20 h-12 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                        currentImg === i
                          ? "border-brand"
                          : "border-transparent opacity-60 hover:opacity-90"
                      }`}
                    >
                      <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="card p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <h1 className="font-serif text-2xl sm:text-3xl text-navy-800 leading-tight mb-2">
                    {title}
                  </h1>
                  <div className="flex items-center gap-1.5 text-navy-500 text-xs sm:text-sm">
                    <MapPin size={13} className="text-brand flex-shrink-0" />
                    <span className="truncate">{location}, {city}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setSaved(!saved)}
                    className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl border transition-all ${
                      saved ? "bg-red-50 border-red-200 text-red-500" : "border-gray-200 text-navy-400 hover:border-red-200 hover:text-red-400"
                    }`}
                    title="Save property"
                  >
                    <Heart size={16} fill={saved ? "currentColor" : "none"} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl border border-gray-200 text-navy-400 hover:border-brand/50 hover:text-brand transition-all"
                    title="Share property"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-4 sm:mb-5">
                <span className="font-serif text-2xl sm:text-3xl text-brand font-bold">{priceLabel}</span>
                {area && <span className="text-navy-500 text-xs sm:text-sm">· {areaLabel}</span>}
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {tags.includes("budget") && <span className="tag-budget">Budget</span>}
                {tags.includes("hot") && <span className="tag-hot">Hot Deal</span>}
                {tags.includes("premium") && <span className="tag-premium">Premium</span>}
                {rera && (
                  <span className="tag bg-purple-50 text-purple-700 border border-purple-100">
                    RERA: {rera}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1 text-navy-400 text-[10px] sm:text-xs mb-1">
                      <Icon size={12} className="shrink-0" />
                      <span className="truncate">{label}</span>
                    </div>
                    <span className="text-navy-800 text-sm font-semibold line-clamp-2">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-4 sm:p-6 space-y-4 sm:space-y-5">
              <div>
                <h2 className="font-sans font-semibold text-navy-800 text-base sm:text-lg mb-3 sm:mb-4">About this Property</h2>
                <p className="text-navy-600 leading-relaxed text-sm">{description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-navy-800 mb-4">Key Highlights</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {highlights.map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-navy-700 bg-gray-50 rounded-xl p-3">
                      <CheckCircle2 size={14} className="text-brand mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-sans font-semibold text-navy-800 text-lg mb-4">Amenities & Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2.5 text-sm text-navy-700 bg-gray-50 rounded-xl p-3">
                    <CheckCircle2 size={14} className="text-brand flex-shrink-0" />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            {documents.length > 0 && (
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-sans font-semibold text-navy-800 text-lg">Downloads</h2>
                    <p className="text-sm text-navy-500">Project brochures, cost sheets and legal documents.</p>
                  </div>
                  <FileText size={24} className="text-brand" />
                </div>
                <div className="grid gap-3">
                  {documentItems.map((doc) => (
                    <a
                      key={doc.href}
                      href={doc.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-4 py-4 hover:border-brand/50 hover:shadow-sm transition-all"
                    >
                      <div>
                        <p className="font-medium text-navy-800">{doc.label}</p>
                        <p className="text-xs text-navy-500">PDF document</p>
                      </div>
                      <Download size={18} className="text-brand group-hover:text-brand-dark" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {videoItems.length > 0 && (
              <div className="card p-6">
                <h2 className="font-sans font-semibold text-navy-800 text-lg mb-5">Video Tour</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {videoItems.map((video) => (
                    <div key={video.src} className="group rounded-[2rem] overflow-hidden border border-gray-100 bg-black shadow-sm hover:shadow-lg transition-all duration-300">
                      <div className="aspect-video relative bg-black">
                        <video controls className="w-full h-full object-cover">
                          <source src={video.src} type="video/mp4" />
                          Your browser does not support HTML5 video.
                        </video>
                      </div>
                      <div className="flex items-center justify-between gap-2 p-4 bg-white border-t border-gray-50">
                        <div className="min-w-0">
                          <p className="font-bold text-navy-800 text-xs sm:text-sm truncate">{video.title}</p>
                          <p className="text-[10px] text-navy-400 uppercase tracking-widest font-black mt-0.5">Walkthrough</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand shrink-0 group-hover:bg-brand group-hover:text-white transition-colors">
                          <Play size={14} fill="currentColor" className="ml-0.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="card p-6">
              <h2 className="font-sans font-semibold text-navy-800 text-lg mb-4">Location & Map</h2>
              <p className="text-sm text-navy-500 mb-4">{location}, {city}</p>
              <MapView properties={[property]} centerAddress={`${location}, ${city}`} />
            </div>

            {relatedProperties.length > 0 && (
              <div className="card p-6">
                <h2 className="font-sans font-semibold text-navy-800 text-lg mb-4">Related Properties</h2>
                <div className="grid gap-3">
                  {relatedProperties.map((item) => (
                    <Link
                      key={item.id}
                      href={`/property/${item.slug}`}
                      className="block rounded-3xl border border-gray-200 bg-white p-4 hover:border-brand/50 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden relative">
                          {item.images?.[0] ? (
                            <Image src={item.images[0]} alt={item.title} fill className="object-cover" sizes="64px" />
                          ) : (
                            <div className="flex items-center justify-center h-full text-navy-400 text-xs">No Image</div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy-800">{item.title}</p>
                          <p className="text-xs text-navy-500 mt-1">{item.priceLabel}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-4">
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white border border-gray-100 overflow-hidden">
                    <Image 
                      src="/logo.png" 
                      alt="One Stop Property Solutions Logo" 
                      width={48}
                      height={48}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-navy-800">Sachin Bhoir</div>
                    <div className="text-xs text-navy-500">Property Expert · 10+ Yrs Exp</div>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-navy-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-brand" />
                    <span>{building ?? location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-brand" />
                    <a href="tel:+919870178204" className="text-brand font-semibold whitespace-nowrap">+91 98701 78204</a>
                  </div>
                </div>
                <div className="mt-6 grid gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: property.id || property.slug,
                        title: property.title,
                        priceLabel: property.priceLabel,
                        location: property.location,
                        type: property.type || "Property",
                        images: property.images,
                        rera: property.rera,
                      })
                    }
                    className={`w-full py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      isInCart(property.id || property.slug)
                        ? "bg-navy-950 text-gold-light border border-gold"
                        : "bg-gold text-navy-950 hover:bg-gold-light shadow-md"
                    }`}
                  >
                    <ShoppingBag size={16} />
                    <span>
                      {isInCart(property.id || property.slug)
                        ? "In Consultation Bag ✓"
                        : "Add to Consultation Bag"}
                    </span>
                  </button>
                  <a
                    href="tel:+919870178204"
                    className="btn-primary justify-center w-full"
                  >
                    <Phone size={16} /> Call Now
                  </a>
                  <a
                    href={`https://wa.me/919870178204?text=${waMessage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1da851] transition-all"
                  >
                    <MessageSquare size={16} /> WhatsApp
                  </a>
                </div>
              </div>

              <div className="card p-6">
                <h2 className="font-sans font-semibold text-navy-800 text-lg mb-4">Quick Enquiry</h2>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-navy-600 mb-1.5">Name *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="input-field"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-navy-600 mb-1.5">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="input-field"
                        placeholder="10 digit number"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-navy-600 mb-1.5">Message</label>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="input-field resize-none"
                        placeholder="Tell us what you need"
                      />
                    </div>
                    <button type="submit" className="btn-primary w-full justify-center py-3.5" disabled={loading}>
                      {loading ? "Sending..." : "Request Callback"}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={28} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-serif text-navy-800 mb-2">Request sent</h3>
                    <p className="text-sm text-navy-500 mb-4">Sachin sir will call you back within one hour.</p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setForm({ name: "", phone: "", message: "" });
                      }}
                      className="btn-outline py-2.5 px-6"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
