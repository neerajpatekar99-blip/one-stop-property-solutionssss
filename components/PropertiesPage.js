"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import {
  SlidersHorizontal,
  Map,
  LayoutGrid,
  Search,
  X,
  ChevronDown,
  Building2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PropertyCard from "@/components/PropertyCard";
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton";
// import { onlyProperties, propertyTypes } from "@/data/properties"; // Handled via props now

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Area: Largest First", value: "area-desc" },
];

function PropertiesInner({ initialProperties = [] }) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("grid");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState("newest");

  // Filters
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
    type: searchParams.get("type") || "All Types",
    location: searchParams.get("location") || "",
    minPrice: 0,
    maxPrice: 30000000,
    furnished: "all",
    tag: searchParams.get("tag") || "all",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const resetFilters = () =>
    setFilters({
      category: "all",
      type: "All Types",
      location: "",
      minPrice: 0,
      maxPrice: 30000000,
      furnished: "all",
      tag: "all",
    });

  const filtered = useMemo(() => {
    // Start with a copy to avoid mutating the original data
    let result = [...initialProperties];

    // Initial filtering
    result = result.filter((p) => {
      // Strict Separation Logic
      const isProject = p.tags?.includes("project");
      if (filters.tag === "project") {
        if (!isProject) return false;
      } else if (filters.tag === "all") {
        // By default, if viewing "all", don't mix projects into properties
        if (isProject) return false;
      } else if (filters.tag !== "all" && !p.tags?.includes(filters.tag)) {
        return false;
      }

      if (filters.category !== "all" && p.category !== filters.category)
        return false;

      // Logic: Match if the main type matches OR if the specific unit type is available
      if (
        filters.type !== "All Types" &&
        p.type !== filters.type &&
        !p.availableTypes?.includes(filters.type)
      )
        return false;

      if (
        filters.location &&
        !p.location.toLowerCase().includes(filters.location.toLowerCase())
      )
        return false;

      // Handle Budget: Properties with null price (Price on Request) are usually high-end/new projects
      // We keep them visible unless specific price bounds are strictly enforced
      if (p.price !== null) {
        if (p.price < filters.minPrice || p.price > filters.maxPrice)
          return false;
      }

      // Furnishing Normalization (Handling "Not Furnished" vs "Unfurnished")
      if (filters.furnished !== "all") {
        const propertyFurnished = p.furnished?.toLowerCase() || "";
        const filterValue = filters.furnished.toLowerCase();
        
        if (filterValue === "unfurnished") {
          if (!propertyFurnished.includes("unfurnished") && !propertyFurnished.includes("not furnished"))
            return false;
        } else if (!propertyFurnished.includes(filterValue)) {
          return false;
        }
      }

      return true;
    });

    // Apply Sorting
    if (sort === "newest") {
      // Assuming original properties array is oldest to newest, we reverse it
      // If you have a 'createdAt' field later, sort by that instead.
      result.reverse();
    } else if (sort === "price-asc")
      result.sort((a, b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER));
    else if (sort === "price-desc")
      result.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    else if (sort === "area-desc")
      result.sort((a, b) => (b.area ?? 0) - (a.area ?? 0));

    return result;
  }, [filters, sort, initialProperties]);

  const activeFilterCount = [
    filters.category !== "all",
    filters.type !== "All Types",
    filters.location !== "",
    filters.furnished !== "all",
    filters.tag !== "all",
  ].filter(Boolean).length;

  const formatPrice = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(0)} L`;
    return `₹${val.toLocaleString("en-IN")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 sm:pt-20">
      {/* Page Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-16 sm:top-20 z-30 shadow-sm overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 flex-wrap">
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0 -mx-1 px-1">
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium border transition-all shrink-0 ${
                  filtersOpen || activeFilterCount > 0
                    ? "bg-brand text-white border-brand"
                    : "bg-white text-navy-700 border-gray-200 hover:border-brand/50"
                }`}
              >
                <SlidersHorizontal size={15} />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-white text-brand text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Category Tabs */}
              <div className="flex gap-1 bg-gray-100 p-1 rounded-xl shrink-0">
                {["all", "sale", "rent"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => updateFilter("category", cat)}
                    className={`px-3 sm:px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                      filters.category === cat
                        ? "bg-white text-navy-800 shadow-sm"
                        : "text-navy-500 hover:text-navy-800"
                    }`}
                  >
                    {cat === "all" ? "All" : cat === "sale" ? "For Sale" : "For Rent"}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto">
              <span className="text-sm text-navy-500 hidden sm:block">
                <strong className="text-navy-800">{filtered.length}</strong>{" "}
                properties found
              </span>

              {/* Sort */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-3 pr-8 py-2 text-sm text-navy-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand/25"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-navy-400 pointer-events-none"
                />
              </div>

              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1 gap-1">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    view === "grid"
                      ? "bg-white shadow-sm text-navy-800"
                      : "text-navy-400 hover:text-navy-700"
                  }`}
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setView("map")}
                  className={`p-2 rounded-lg transition-colors ${
                    view === "map"
                      ? "bg-white shadow-sm text-navy-800"
                      : "text-navy-400 hover:text-navy-700"
                  }`}
                >
                  <Map size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Filters Panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden border-t border-gray-100"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Type */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-navy-400 mb-2">
                      Property Type
                    </label>
                    <select
                      value={filters.type}
                      onChange={(e) => updateFilter("type", e.target.value)}
                      className="input-field"
                    >
                      {propertyTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-navy-400 mb-2">
                      Location / Area
                    </label>
                    <div className="relative">
                      <Search
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400"
                      />
                      <input
                        type="text"
                        placeholder="e.g. Sector 5, Kamothe..."
                        value={filters.location}
                        onChange={(e) =>
                          updateFilter("location", e.target.value)
                        }
                        className="input-field pl-9"
                      />
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-navy-400 mb-2">
                      Max Budget:
                      <span className="text-brand font-bold ml-2">
                        {formatPrice(filters.maxPrice)}
                      </span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={30000000}
                      step={500000}
                      value={filters.maxPrice}
                      onChange={(e) =>
                        updateFilter("maxPrice", Number(e.target.value))
                      }
                      className="w-full accent-brand"
                    />
                  </div>

                  {/* Furnished */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-navy-400 mb-2">
                      Furnishing
                    </label>
                    <select
                      value={filters.furnished}
                      onChange={(e) =>
                        updateFilter("furnished", e.target.value)
                      }
                      className="input-field"
                    >
                      <option value="all">Any Furnishing</option>
                      <option value="fully-furnished">Fully Furnished</option>
                      <option value="semi-furnished">Semi-Furnished</option>
                      <option value="unfurnished">Unfurnished</option>
                    </select>
                  </div>
                </div>

                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="mt-4 flex items-center gap-1.5 text-sm text-brand hover:text-brand-dark font-medium"
                  >
                    <X size={14} />
                    Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        {view === "map" ? (
          <div>
            <MapView properties={filtered} />
            <p className="text-center text-navy-500 text-xs sm:text-sm mt-4">
              Showing {filtered.length} properties on map. Click markers to preview.
            </p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {filtered.map((prop, i) => (
              <PropertyCard key={prop.id} property={prop} index={i} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <Building2 size={56} className="text-gray-200 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-navy-700 mb-2">
              No Properties Found
            </h3>
            <p className="text-navy-500 mb-6">
              Try adjusting your filters or search criteria.
            </p>
            <button onClick={resetFilters} className="btn-primary">
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPageWrapper({ initialProperties }) {
  return (
    <Suspense fallback={<PropertyCardSkeleton />}>
      <PropertiesInner initialProperties={initialProperties} />
    </Suspense>
  );
}