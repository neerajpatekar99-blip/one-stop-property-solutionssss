"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, IndianRupee, SlidersHorizontal } from "lucide-react";

const locationOptions = [
  "Kamothe",
  "Sector 5",
  "Sector 7",
  "Sector 9",
  "Sector 12",
  "Kharghar",
  "Belapur",
  "Panvel",
];

const typeOptions = [
  "All Types",
  "1 BHK",
  "2 BHK",
  "3 BHK",
  "4 BHK",
  "Studio",
  "Penthouse",
];

const budgetOptions = [
  { label: "Any Budget", value: "" },
  { label: "Up to ₹30 Lakh", value: "0-3000000" },
  { label: "₹30L – ₹60L", value: "3000000-6000000" },
  { label: "₹60L – ₹1 Cr", value: "6000000-10000000" },
  { label: "₹1 Cr – ₹2 Cr", value: "10000000-20000000" },
  { label: "Above ₹2 Cr", value: "20000000-999999999" },
];

export default function SearchBar({ variant = "hero" }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("buy");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("All Types");
  const [budget, setBudget] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (activeTab === "rent") params.set("category", "rent");
    if (activeTab === "buy") params.set("category", "sale");
    if (location) params.set("location", location);
    if (type && type !== "All Types") params.set("type", type);
    if (budget) params.set("budget", budget);
    router.push(`/properties?${params.toString()}`);
  };

  const isHero = variant === "hero";

  return (
    <div
      className={`w-full ${
        isHero
          ? "bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-3 md:p-4 border border-gray-100"
          : "bg-white border border-gray-200 rounded-2xl p-3 shadow-sm"
      }`}
    >
      {/* Tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100/80 p-1 rounded-2xl w-fit">
        {[
          { key: "buy", label: "Buy" },
          { key: "rent", label: "Rent" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
              activeTab === tab.key
                ? "bg-white text-brand shadow-md shadow-brand/5 scale-[1.02]"
                : "text-navy-500 hover:text-navy-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Fields */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Location */}
        <div className="flex-1 relative">
          <MapPin
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand"
          />
          <input
            type="text"
            placeholder="Search location, project, area..."
            list="location-suggestions"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-9 pr-3 py-3 border border-gray-150 rounded-xl text-sm text-navy-800 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-brand/25 focus:border-brand transition-all bg-gray-50/60"
          />
          <datalist id="location-suggestions">
            {locationOptions.map((loc) => (
              <option key={loc} value={loc} />
            ))}
          </datalist>
        </div>

        {/* Type */}
        <div className="md:w-40 relative">
          <Home
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full pl-9 pr-3 py-3 border border-gray-150 rounded-xl text-sm text-navy-800 focus:outline-none focus:ring-2 focus:ring-brand/25 focus:border-brand transition-all bg-gray-50/60 appearance-none cursor-pointer"
          >
            {typeOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Budget */}
        <div className="md:w-48 relative">
          <IndianRupee
            size={15}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none"
          />
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full pl-9 pr-3 py-3 border border-gray-150 rounded-xl text-sm text-navy-800 focus:outline-none focus:ring-2 focus:ring-brand/25 focus:border-brand transition-all bg-gray-50/60 appearance-none cursor-pointer"
          >
            {budgetOptions.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 active:scale-95 shadow-xl shadow-brand/20 whitespace-nowrap"
        >
          <Search size={16} />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>
    </div>
  );
}
